import { readContent } from "@/lib/content-store";
import SiteCopyEditor from "./editor";

export const dynamic = "force-dynamic";

export default async function SiteCopyPage() {
  const site = await readContent("site");
  return <SiteCopyEditor initial={site} />;
}
