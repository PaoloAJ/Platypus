import { readContent } from "@/lib/content-store";
import ServicesEditor from "./editor";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const services = await readContent("services");
  return <ServicesEditor initial={services} />;
}
