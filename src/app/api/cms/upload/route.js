import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const MAX_BYTES = 12 * 1024 * 1024;
const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);

function extFromType(type) {
  return (
    {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
      "image/avif": "avif",
    }[type] || "bin"
  );
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
    return Response.json(
      { error: `Unsupported type: ${file.type}` },
      { status: 415 }
    );
  }
  if (file.size > MAX_BYTES) {
    return Response.json(
      { error: `File too large (max ${MAX_BYTES / 1024 / 1024} MB)` },
      { status: 413 }
    );
  }

  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const hash = crypto.randomBytes(6).toString("hex");
  const filename = `${Date.now()}-${hash}.${extFromType(file.type)}`;
  const filepath = path.join(UPLOAD_DIR, filename);
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filepath, buffer);

  return Response.json({
    src: `/uploads/${filename}`,
    size: buffer.length,
    type: file.type,
  });
}
