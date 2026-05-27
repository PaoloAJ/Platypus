import { readContent } from "@/lib/content-store";
import TestimonialsEditor from "./editor";

export const dynamic = "force-dynamic";

export default async function TestimonialsPage() {
  const testimonials = await readContent("testimonials");
  return <TestimonialsEditor initial={testimonials} />;
}
