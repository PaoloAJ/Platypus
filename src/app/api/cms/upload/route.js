import crypto from "node:crypto";
import sharp from "sharp";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BUCKET = "cms-uploads";
const MAX_BYTES = 25 * 1024 * 1024;
const MAX_DIMENSION = 2000;
const WEBP_QUALITY = 80;
const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);

let cachedClient = null;
function getSupabase() {
  if (cachedClient) return cachedClient;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Supabase env vars missing (NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)",
    );
  }
  cachedClient = createClient(url, key, {
    auth: { persistSession: false },
  });
  return cachedClient;
}

// Extract the storage path (e.g. "uploads/123-abc.webp") from a Supabase public URL.
// Returns null if the URL doesn't point at our bucket.
export function pathFromPublicUrl(url) {
  if (typeof url !== "string" || !url) return null;
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  return url.slice(idx + marker.length).split("?")[0];
}

export async function POST(req) {
  const form = await req.formData().catch(() => null);
  if (!form) {
    return Response.json({ error: "Invalid form data" }, { status: 400 });
  }
  const file = form.get("file");
  if (!file || typeof file === "string") {
    return Response.json({ error: "Missing file" }, { status: 400 });
  }
  if (!ALLOWED.has(file.type)) {
    return Response.json({ error: `Unsupported type: ${file.type}` }, { status: 415 });
  }
  if (file.size > MAX_BYTES) {
    return Response.json(
      { error: `File too large (max ${MAX_BYTES / 1024 / 1024} MB)` },
      { status: 413 },
    );
  }

  const originalBytes = Buffer.from(await file.arrayBuffer());
  const originalSize = originalBytes.byteLength;

  let optimized;
  try {
    optimized = await sharp(originalBytes, { failOn: "none" })
      .rotate()
      .resize({
        width: MAX_DIMENSION,
        height: MAX_DIMENSION,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: WEBP_QUALITY, effort: 4 })
      .toBuffer();
  } catch (err) {
    console.error("[upload] sharp processing failed:", err);
    return Response.json({ error: "Could not process image" }, { status: 422 });
  }

  const hash = crypto.randomBytes(6).toString("hex");
  const filename = `uploads/${Date.now()}-${hash}.webp`;

  let supabase;
  try {
    supabase = getSupabase();
  } catch (err) {
    console.error("[upload] supabase init failed:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(filename, optimized, {
      contentType: "image/webp",
      cacheControl: "31536000",
      upsert: false,
    });

  if (uploadError) {
    console.error("[upload] supabase upload error:", {
      message: uploadError.message,
      name: uploadError.name,
      statusCode: uploadError.statusCode,
      error: uploadError.error,
      bucket: BUCKET,
      filename,
    });
    return Response.json(
      {
        error: uploadError.message,
        details: { statusCode: uploadError.statusCode, name: uploadError.name },
      },
      { status: 500 },
    );
  }

  console.log(
    "[upload] uploaded:",
    uploadData?.path,
    `${(originalSize / 1024).toFixed(0)}KB → ${(optimized.byteLength / 1024).toFixed(0)}KB`,
  );

  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(filename);
  return Response.json({
    src: urlData.publicUrl,
    size: optimized.byteLength,
    originalSize,
    type: "image/webp",
  });
}

// Delete one or more files from the bucket. Accepts either:
//   { paths: ["uploads/abc.webp", ...] }
//   { urls:  ["https://...uploads/abc.webp", ...] }
// Unknown / non-bucket URLs are silently ignored.
export async function DELETE(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const fromUrls = Array.isArray(body?.urls)
    ? body.urls.map(pathFromPublicUrl).filter(Boolean)
    : [];
  const fromPaths = Array.isArray(body?.paths) ? body.paths.filter(Boolean) : [];
  const paths = [...new Set([...fromUrls, ...fromPaths])];

  if (paths.length === 0) {
    return Response.json({ ok: true, deleted: [] });
  }

  let supabase;
  try {
    supabase = getSupabase();
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }

  const { data, error } = await supabase.storage.from(BUCKET).remove(paths);
  if (error) {
    console.error("[upload] supabase delete error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }

  console.log("[upload] deleted:", paths);
  return Response.json({ ok: true, deleted: data ?? [] });
}
