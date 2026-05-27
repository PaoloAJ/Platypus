import { readContent } from "@/lib/content-store";
import ProjectsEditor from "./editor";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await readContent("projects");
  return <ProjectsEditor initial={projects} />;
}
