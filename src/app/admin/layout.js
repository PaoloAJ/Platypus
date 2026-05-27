import Link from "next/link";
import { LayoutGrid, Image as ImageIcon, Wrench, Star, FileText, ExternalLink } from "lucide-react";

const NAV = [
  { href: "/admin", label: "Overview", icon: LayoutGrid, exact: true },
  { href: "/admin/projects", label: "Before / After", icon: ImageIcon },
  { href: "/admin/services", label: "Services", icon: Wrench },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star },
  { href: "/admin/site-copy", label: "Site Copy", icon: FileText },
];

export const metadata = {
  title: "CMS · Platypus Outdoor Solutions",
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0B132B] text-[#EDEDED]">
      <div className="absolute inset-0 glow-cyan pointer-events-none" />
      <div className="relative flex min-h-screen">
        <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-[#1F2937] bg-[#0B132B]/80 backdrop-blur sticky top-0 h-screen">
          <div className="px-6 py-7 border-b border-[#1F2937]">
            <div className="text-[11px] tracking-eyebrow uppercase text-[#7DD3FC] font-semibold">
              Platypus
            </div>
            <div className="text-[18px] font-bold mt-1">Content studio</div>
          </div>
          <nav className="flex-1 px-3 py-4 space-y-1">
            {NAV.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] text-[#9CA3AF] hover:text-white hover:bg-[#1A1F3A]/60 transition"
              >
                <Icon className="w-4 h-4 text-[#7DD3FC] group-hover:text-[#00BCD4]" />
                {label}
              </Link>
            ))}
          </nav>
          <div className="px-3 py-4 border-t border-[#1F2937]">
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] text-[#6B7280] hover:text-[#00BCD4] transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View live site
            </Link>
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <div className="md:hidden border-b border-[#1F2937] bg-[#0B132B]/80 backdrop-blur sticky top-0 z-10">
            <div className="px-5 py-4 flex items-center justify-between">
              <div>
                <div className="text-[10px] tracking-eyebrow uppercase text-[#7DD3FC] font-semibold">
                  Platypus
                </div>
                <div className="text-[15px] font-bold">Content studio</div>
              </div>
              <Link href="/" className="text-[12px] text-[#6B7280] hover:text-[#00BCD4]">
                Live site →
              </Link>
            </div>
            <nav className="px-3 pb-3 flex gap-1 overflow-x-auto hide-scrollbar">
              {NAV.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] text-[#9CA3AF] hover:text-white hover:bg-[#1A1F3A]/60"
                >
                  <Icon className="w-3.5 h-3.5 text-[#7DD3FC]" />
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <main className="px-5 sm:px-6 lg:px-10 pt-6 pb-16 lg:pt-12 lg:pb-20 max-w-5xl">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
