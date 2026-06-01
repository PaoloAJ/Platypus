import { readContent } from "@/lib/content-store";
import TeamEditor from "./editor";

export const dynamic = "force-dynamic";

export default async function TeamAdminPage() {
  const team = await readContent("team");
  return <TeamEditor initial={team} />;
}
