"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reviews", label: "Reviews" },
];

function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef(null);
  const longPressTimerRef = useRef(null);
  const longPressFiredRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
      if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  if (pathname?.startsWith("/admin")) return null;

  const goToAdmin = () => {
    clickCountRef.current = 0;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    router.push("/admin");
  };

  const handleLogoClick = (e) => {
    if (longPressFiredRef.current) {
      e.preventDefault();
      longPressFiredRef.current = false;
      return;
    }
    clickCountRef.current += 1;
    if (clickCountRef.current >= 3) {
      e.preventDefault();
      goToAdmin();
      return;
    }
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 600);
  };

  const handleLogoPointerDown = () => {
    longPressFiredRef.current = false;
    if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
    longPressTimerRef.current = setTimeout(() => {
      longPressFiredRef.current = true;
      goToAdmin();
    }, 800);
  };

  const cancelLongPress = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  const isActive = (path) =>
    path === "/" ? pathname === "/" : pathname?.startsWith(path);

  const linkClasses = (path) =>
    `relative transition-colors duration-300 ${
      isActive(path) ? "text-[#00BCD4]" : "text-gray-300 hover:text-white"
    }`;

  const activeLinkIndicator = (path) =>
    isActive(path) ? (
      <motion.div
        layoutId="activeLink"
        className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-[#00BCD4] rounded-full"
        initial={false}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
      />
    ) : null;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div
            className={`transition-all duration-500 rounded-2xl ${
              scrolled
                ? "bg-[#0B132B]/90 backdrop-blur-xl border border-white/[0.06] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)]"
                : "bg-[#0B132B]/40 backdrop-blur-md border border-white/[0.04]"
            }`}
          >
            <div className="flex items-center justify-between pl-3 pr-3 sm:pl-4 sm:pr-4 lg:pl-5 lg:pr-5 py-2.5 lg:py-3">
              {/* Logo - tightly bound to its content, no extra padding */}
              <Link
                href="/"
                onClick={handleLogoClick}
                onPointerDown={handleLogoPointerDown}
                onPointerUp={cancelLongPress}
                onPointerLeave={cancelLongPress}
                onPointerCancel={cancelLongPress}
                aria-label="Platypus Outdoor Solutions home"
                className="flex items-center shrink-0 -ml-1"
              >
                <motion.div
                  className="relative h-10 sm:h-11 lg:h-12 w-10 sm:w-11 lg:w-12 select-none"
                  whileHover={{ scale: 1.08, rotate: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <Image
                    src="/logo.png"
                    alt="Platypus Outdoor Solutions"
                    fill
                    priority
                    sizes="48px"
                    className="object-contain brightness-0 invert pointer-events-none"
                    draggable={false}
                  />
                </motion.div>
                <span className="ml-2.5 hidden sm:flex flex-col leading-tight select-none">
                  <span className="text-[15px] lg:text-[16px] font-bold text-white tracking-tight">
                    Platypus
                  </span>
                  <span className="text-[10px] lg:text-[11px] uppercase tracking-[0.18em] text-[#7DD3FC] font-semibold -mt-0.5">
                    Outdoor Solutions
                  </span>
                </span>
              </Link>

              {/* Desktop Navigation - Center */}
              <div className="hidden lg:flex items-center gap-1">
                {NAV_LINKS.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`${linkClasses(href)} px-3.5 py-2 rounded-lg hover:bg-white/[0.04]`}
                  >
                    <span className="relative text-[14.5px] font-medium">
                      {label}
                      {activeLinkIndicator(href)}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Right side - CTA + Mobile menu */}
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <Link href="/contact" className="hidden md:block">
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="bg-[#00BCD4] text-[#0B132B] px-4 lg:px-5 py-2.5 rounded-lg font-bold text-[13.5px] lg:text-[14px] shadow-[0_6px_20px_-6px_rgba(0,188,212,0.6)] hover:shadow-[0_10px_30px_-6px_rgba(0,188,212,0.8)] transition-shadow duration-300 whitespace-nowrap"
                  >
                    Get FREE Quote
                  </motion.div>
                </Link>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-label="Toggle menu"
                  aria-expanded={menuOpen}
                  className="lg:hidden relative w-10 h-10 flex flex-col justify-center items-center rounded-lg border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
                >
                  <motion.span
                    animate={menuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -5 }}
                    className="w-5 h-0.5 bg-[#00BCD4] absolute rounded-full"
                    transition={{ duration: 0.25 }}
                  />
                  <motion.span
                    animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                    className="w-5 h-0.5 bg-[#00BCD4] absolute rounded-full"
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    animate={menuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 5 }}
                    className="w-5 h-0.5 bg-[#00BCD4] absolute rounded-full"
                    transition={{ duration: 0.25 }}
                  />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 w-[88%] max-w-sm h-full bg-[#0F1530] border-l border-white/[0.06] z-50 lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-9 h-9">
                    <Image
                      src="/logo.png"
                      alt=""
                      fill
                      sizes="36px"
                      className="object-contain brightness-0 invert"
                    />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-[14px] font-bold text-white">Platypus</span>
                    <span className="text-[9.5px] uppercase tracking-[0.18em] text-[#7DD3FC] font-semibold -mt-0.5">
                      Outdoor Solutions
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="w-9 h-9 rounded-lg border border-white/[0.06] bg-white/[0.02] flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/[0.05] transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M1 1L13 13M13 1L1 13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-6">
                <div className="space-y-1">
                  {NAV_LINKS.map(({ href, label }, i) => (
                    <motion.div
                      key={href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.04 }}
                    >
                      <Link
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-[16px] font-semibold transition-all ${
                          isActive(href)
                            ? "bg-[#00BCD4]/10 text-[#00BCD4] border border-[#00BCD4]/30"
                            : "text-gray-200 hover:bg-white/[0.04] border border-transparent"
                        }`}
                      >
                        <span>{label}</span>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          className="opacity-50"
                        >
                          <path
                            d="M5 1L11 7L5 13"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="px-4 pb-6 pt-4 border-t border-white/[0.06]">
                <Link href="/contact" onClick={() => setMenuOpen(false)}>
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#00BCD4] text-[#0B132B] text-center font-bold py-4 rounded-xl shadow-[0_10px_30px_-8px_rgba(0,188,212,0.5)]"
                  >
                    Get FREE Quote
                  </motion.div>
                </Link>
                <p className="text-center text-[12px] text-gray-500 mt-4">
                  Central Florida • Licensed & Insured
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
