import { readContent } from "@/lib/content-store";
import ReviewsClient from "./client";

export const dynamic = "force-dynamic";

export default async function ReviewsPage() {
  const testimonialsData = await readContent("testimonials");
  return <ReviewsClient testimonialsData={testimonialsData} />;
}
