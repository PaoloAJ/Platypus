// Walks any value (object/array/primitive) and collects every string that
// looks like a Supabase storage URL from our bucket.
function collectImageUrls(value, acc) {
  if (value == null) return;
  if (typeof value === "string") {
    if (value.includes("/storage/v1/object/public/cms-uploads/")) {
      acc.add(value);
    }
    return;
  }
  if (Array.isArray(value)) {
    for (const v of value) collectImageUrls(v, acc);
    return;
  }
  if (typeof value === "object") {
    for (const v of Object.values(value)) collectImageUrls(v, acc);
  }
}

// Returns URLs present in `before` but missing from `after` — i.e. images
// that were unset, replaced, or had their containing item removed.
export function orphanedImageUrls(before, after) {
  const oldUrls = new Set();
  const newUrls = new Set();
  collectImageUrls(before, oldUrls);
  collectImageUrls(after, newUrls);
  return [...oldUrls].filter((u) => !newUrls.has(u));
}

// Fire-and-forget delete. Save flow shouldn't fail just because cleanup did.
export async function deleteOrphanedImages(before, after) {
  const urls = orphanedImageUrls(before, after);
  if (urls.length === 0) return { deleted: [] };
  try {
    const res = await fetch("/api/cms/upload", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ urls }),
    });
    if (!res.ok) {
      console.warn("[image-cleanup] delete failed:", await res.text());
      return { deleted: [] };
    }
    return await res.json();
  } catch (err) {
    console.warn("[image-cleanup] delete error:", err);
    return { deleted: [] };
  }
}
