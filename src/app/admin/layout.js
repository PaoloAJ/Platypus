import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import {
  LayoutGrid,
  Image as ImageIcon,
  Images,
  Wrench,
  Star,
  Users,
  FileText,
  ExternalLink,
} from "lucide-react";

const NAV = [
  { href: "/admin", label: "Overview", icon: LayoutGrid, exact: true },
  { href: "/admin/projects", label: "Before / After", icon: ImageIcon },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/services", label: "Services", icon: Wrench },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/site-copy", label: "Site Copy", icon: FileText },
];

export const metadata = {
  title: "CMS · Platypus Outdoor Solutions",
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0B132B] text-[#EDEDED] relative">
      <div className="absolute inset-0 glow-cyan pointer-events-none opacity-60" />
      <div className="relative flex min-h-screen">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-white/[0.06] bg-[#0B132B]/80 backdrop-blur-xl sticky top-0 h-screen z-20">
          <div className="px-5 py-6 border-b border-white/[0.06]">
            <Link href="/admin" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 shrink-0">
                <Image
                  src="/logo.png"
                  alt="Platypus"
                  fill
                  sizes="40px"
                  className="object-contain brightness-0 invert"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[11px] tracking-[0.18em] uppercase text-[#7DD3FC] font-semibold">
                  Platypus
                </span>
                <span className="text-[15px] font-bold text-white -mt-0.5">
                  Content Studio
                </span>
              </div>
            </Link>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto hide-scrollbar">
            {NAV.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] text-[#9CA3AF] hover:text-white hover:bg-white/[0.04] transition-colors"
              >
                <Icon className="w-4 h-4 text-[#7DD3FC] group-hover:text-[#00BCD4] transition-colors" />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </nav>

          <div className="px-3 py-4 border-t border-white/[0.06] space-y-2">
            <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <UserButton
                afterSignOutUrl="/admin/login"
                appearance={{
                  elements: {
                    avatarBox: "w-7 h-7",
                  },
                }}
              />
              <span className="text-[12px] text-[#9CA3AF] font-medium">Signed in</span>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] text-[#6B7280] hover:text-[#00BCD4] hover:bg-white/[0.02] transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View live site
            </Link>
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          {/* Mobile Topbar */}
          <div className="md:hidden border-b border-white/[0.06] bg-[#0B132B]/90 backdrop-blur-xl sticky top-0 z-30">
            <div className="px-4 sm:px-5 py-3.5 flex items-center justify-between gap-3">
              <Link href="/admin" className="flex items-center gap-2.5 min-w-0">
                <div className="relative w-9 h-9 shrink-0">
                  <Image
                    src="/logo.png"
                    alt="Platypus"
                    fill
                    sizes="36px"
                    className="object-contain brightness-0 invert"
                  />
                </div>
                <div className="flex flex-col leading-tight min-w-0">
                  <span className="text-[9.5px] tracking-[0.18em] uppercase text-[#7DD3FC] font-semibold">
                    Platypus
                  </span>
                  <span className="text-[14px] font-bold text-white -mt-0.5 truncate">
                    Content Studio
                  </span>
                </div>
              </Link>
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href="/"
                  className="text-[12px] text-[#9CA3AF] hover:text-[#00BCD4] px-2.5 py-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] inline-flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span className="hidden sm:inline">Live</span>
                </Link>
                <UserButton
                  afterSignOutUrl="/admin/login"
                  appearance={{ elements: { avatarBox: "w-8 h-8" } }}
                />
              </div>
            </div>
            <nav className="px-3 pb-3 flex gap-1 overflow-x-auto hide-scrollbar">
              {NAV.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] text-[#9CA3AF] hover:text-white bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.04] transition-colors"
                >
                  <Icon className="w-3.5 h-3.5 text-[#7DD3FC]" />
                  <span className="font-medium whitespace-nowrap">{label}</span>
                </Link>
              ))}
            </nav>
          </div>

          <main className="px-4 sm:px-6 lg:px-10 pt-6 pb-16 lg:pt-10 lg:pb-20 max-w-5xl">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
