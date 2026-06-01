import { readContent } from "@/lib/content-store";
import FooterClient from "./FooterClient";

export default async function Footer() {
  const site = await readContent("site");
  return <FooterClient footer={site?.footer ?? {}} />;
}
