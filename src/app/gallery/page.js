import { readContent } from "@/lib/content-store";
import GalleryClient from "./client";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const [galleryData, siteData] = await Promise.all([
    readContent("gallery"),
    readContent("site"),
  ]);
  return <GalleryClient galleryData={galleryData} siteData={siteData} />;
}
