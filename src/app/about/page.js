import { readContent } from "@/lib/content-store";
import AboutClient from "./client";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const [siteData, teamData] = await Promise.all([
    readContent("site"),
    readContent("team"),
  ]);
  return <AboutClient siteData={siteData} teamData={teamData} />;
}
