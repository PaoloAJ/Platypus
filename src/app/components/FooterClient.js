"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MapPin, Mail, Phone, Clock } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];

function FooterClient({ footer = {} }) {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="relative bg-[#0B132B] border-t border-white/[0.06] overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00BCD4]/40 to-transparent" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00BCD4]/[0.03] blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10">
        {/* Main row */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
          {/* Brand — large logo */}
          <div className="shrink-0">
            <Link href="/" className="inline-flex items-center gap-4 group">
              <div className="relative w-16 h-16 shrink-0">
                <Image
                  src="/logo.png"
                  alt="Platypus Outdoor Solutions"
                  fill
                  sizes="64px"
                  className="object-contain brightness-0 invert"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[20px] font-bold text-white tracking-tight">
                  Platypus
                </span>
                <span className="text-[11px] uppercase tracking-[0.18em] text-[#7DD3FC] font-semibold">
                  Outdoor Solutions
                </span>
              </div>
            </Link>
          </div>

          {/* Nav links — inline */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 lg:justify-center lg:flex-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[14px] text-gray-400 hover:text-[#00BCD4] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Contact — compact */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-gray-400 shrink-0">
            <div className="flex items-center gap-1.5">
              <MapPin size={13} className="text-[#7DD3FC] shrink-0" />
              <span>Central Florida</span>
            </div>
            {footer.phone && (
              <a
                href={`tel:${footer.phone.replace(/[^+\d]/g, "")}`}
                className="flex items-center gap-1.5 hover:text-[#00BCD4] transition-colors"
              >
                <Phone size={13} className="text-[#7DD3FC] shrink-0" />
                <span>{footer.phone}</span>
              </a>
            )}
            {footer.email && (
              <a
                href={`mailto:${footer.email}`}
                className="flex items-center gap-1.5 hover:text-[#00BCD4] transition-colors break-all"
              >
                <Mail size={13} className="text-[#7DD3FC] shrink-0" />
                <span>{footer.email}</span>
              </a>
            )}
            {footer.hours && (
              <div className="flex items-center gap-1.5">
                <Clock size={13} className="text-[#7DD3FC] shrink-0" />
                <span>{footer.hours}</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] mt-8 pt-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-gray-500 text-[12px]">
            © {currentYear} Platypus Outdoor Solutions. All rights reserved.
            {footer.licenseNumber && (
              <span className="ml-3 text-gray-600">
                License #{footer.licenseNumber}
              </span>
            )}
          </div>
          <div className="flex items-center gap-5 text-[12px]">
            <Link
              href="/privacy"
              className="text-gray-400 hover:text-[#00BCD4] transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-gray-400 hover:text-[#00BCD4] transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterClient;
