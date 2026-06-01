import { readContent } from "@/lib/content-store";
import GalleryEditor from "./editor";

export const dynamic = "force-dynamic";

export default async function GalleryAdminPage() {
  const gallery = await readContent("gallery");
  return <GalleryEditor initial={gallery} />;
}
