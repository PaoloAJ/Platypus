import { revalidatePath } from "next/cache";
import { CONTENT_TYPES, readContent, writeContent } from "@/lib/content-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isValidType(type) {
  return CONTENT_TYPES.includes(type);
}

// Which public pages each content type appears on.
// After a save, we revalidate these so the public site shows fresh data
// without requiring a manual reload.
const REVALIDATE_PATHS = {
  site: ["/", "/about", "/services", "/gallery", "/reviews", "/contact"],
  services: ["/", "/services"],
  projects: ["/"],
  testimonials: ["/", "/reviews"],
  gallery: ["/gallery"],
  team: ["/about"],
};

export async function GET(_req, { params }) {
  const { type } = await params;
  if (!isValidType(type)) {
    return Response.json({ error: "Unknown content type" }, { status: 404 });
  }
  try {
    const data = await readContent(type);
    return Response.json({ data });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { type } = await params;
  if (!isValidType(type)) {
    return Response.json({ error: "Unknown content type" }, { status: 404 });
  }
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (body == null || (typeof body !== "object" && !Array.isArray(body))) {
    return Response.json({ error: "Body must be array or object" }, { status: 400 });
  }
  try {
    await writeContent(type, body);

    // Invalidate the Next.js Router Cache and any cached RSC payloads
    // for every public page that renders this content type.
    const paths = REVALIDATE_PATHS[type] ?? [];
    for (const path of paths) {
      revalidatePath(path);
    }

    return Response.json({ ok: true, revalidated: paths });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
