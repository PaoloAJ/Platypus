import { readContent } from "@/lib/content-store";
import ServicesClient from "./client";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const servicesData = await readContent("services");
  return <ServicesClient servicesData={servicesData} />;
}
