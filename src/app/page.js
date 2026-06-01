import { readContent } from "@/lib/content-store";
import HomeClient from "./home-client";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [projectsData, servicesData, testimonialsData, siteData] = await Promise.all([
    readContent("projects"),
    readContent("services"),
    readContent("testimonials"),
    readContent("site"),
  ]);

  return (
    <HomeClient
      projectsData={projectsData}
      servicesData={servicesData}
      testimonialsData={testimonialsData}
      siteData={siteData}
    />
  );
}
