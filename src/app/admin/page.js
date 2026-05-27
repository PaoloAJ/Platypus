import Link from "next/link";
import { Image as ImageIcon, Wrench, Star, FileText, ArrowRight } from "lucide-react";
import { readContent } from "@/lib/content-store";
import { PageHeader, Card } from "./_components/ui";

export const dynamic = "force-dynamic";

async function loadCounts() {
  try {
    const [projects, services, testimonials] = await Promise.all([
      readContent("projects"),
      readContent("services"),
      readContent("testimonials"),
    ]);
    return {
      projects: projects.length,
      services: services.length,
      testimonials: testimonials.length,
    };
  } catch {
    return { projects: 0, services: 0, testimonials: 0 };
  }
}

const TILES = [
  {
    href: "/admin/projects",
    icon: ImageIcon,
    title: "Before / After projects",
    blurb: "Edit the dock, seawall and roof transformations shown on the homepage.",
    countKey: "projects",
    countLabel: "projects",
  },
  {
    href: "/admin/services",
    icon: Wrench,
    title: "Services & pricing",
    blurb: "Manage your service tiers, starting prices and feature bullets.",
    countKey: "services",
    countLabel: "services",
  },
  {
    href: "/admin/testimonials",
    icon: Star,
    title: "Testimonials",
    blurb: "Add, edit and reorder customer reviews displayed on the homepage.",
    countKey: "testimonials",
    countLabel: "reviews",
  },
  {
    href: "/admin/site-copy",
    icon: FileText,
    title: "Site copy",
    blurb: "Hero headline, about story, scarcity section, footer contact info.",
    countLabel: "4 sections",
  },
];

export default async function AdminHome() {
  const counts = await loadCounts();

  return (
    <>
      <PageHeader
        eyebrow="Welcome back"
        title="Content studio"
        description="Edit anything visible on the public site. Changes save instantly to JSON and reflect in development without restarting."
      />

      <div className="grid sm:grid-cols-2 gap-4">
        {TILES.map((t) => {
          const Icon = t.icon;
          const count = t.countKey ? counts[t.countKey] : null;
          return (
            <Link key={t.href} href={t.href} className="block group">
              <Card className="hover:border-[#00BCD4]/50 transition h-full">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#00BCD4]/10 border border-[#00BCD4]/30 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#7DD3FC]" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#6B7280] group-hover:text-[#00BCD4] transition" />
                </div>
                <h2 className="text-[17px] font-semibold tracking-tight">{t.title}</h2>
                <p className="text-[#9CA3AF] text-[13.5px] mt-1.5 leading-relaxed">{t.blurb}</p>
                <div className="mt-4 text-[11.5px] tracking-eyebrow uppercase text-[#6B7280] font-semibold">
                  {count != null ? `${count} ${t.countLabel}` : t.countLabel}
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 rounded-2xl border border-[#1F2937] bg-[#1A1F3A]/20 p-5 lg:p-6 text-[13.5px] text-[#9CA3AF] leading-relaxed">
        <div className="text-[11px] tracking-eyebrow uppercase text-[#7DD3FC] font-semibold mb-2">
          Heads up
        </div>
        This studio writes to JSON files in <code className="text-[#7DD3FC]">src/content/</code>.
        That works perfectly while running <code className="text-[#7DD3FC]">npm run dev</code> on your machine.
        On a hosted/serverless deploy (Vercel etc.) the filesystem is read-only — you&apos;ll want to
        swap the content store for a database before publishing edits from production.
      </div>
    </>
  );
}
