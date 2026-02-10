"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClasses = (path) =>
    `relative transition-all duration-300 hover:text-[#00BCD4] ${
      pathname === path ? "text-[#00BCD4]" : "text-gray-300 hover:text-white"
    }`;

  const activeLinkIndicator = (path) =>
    pathname === path ? (
      <motion.div
        layoutId="activeLink"
        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#00BCD4] rounded-full"
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
          scrolled ? "py-3" : "py-4"
        }`}
      >
        {/* Subtle background rectangle */}
        <div className="max-w-7xl mx-auto px-4">
          <div
            className={`transition-all duration-500 rounded-2xl ${
              scrolled
                ? "bg-[#0B132B]/95 backdrop-blur-md border border-gray-800/30 shadow-xl"
                : "bg-[#0B132B]/20 backdrop-blur-sm border border-gray-800/10"
            }`}
          >
            <div className="flex items-center justify-between px-6 py-4">
              {/* Logo - Left side */}
              <Link href="/">
                <motion.div
                  className="relative w-40 h-12 md:w-48 md:h-14"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Image
                    src="/logo.png"
                    alt="Platypus Outdoor Solutions"
                    fill
                    priority
                    className="object-contain brightness-0 invert"
                  />
                </motion.div>
              </Link>

              {/* Desktop Navigation - Center */}
              <div className="hidden lg:flex items-center space-x-8">
                <Link href="/" className={linkClasses("/")}>
                  <span className="relative pb-1 text-base font-medium">
                    Home
                    {activeLinkIndicator("/")}
                  </span>
                </Link>
                <Link href="/about" className={linkClasses("/about")}>
                  <span className="relative pb-1 text-base font-medium">
                    About
                    {activeLinkIndicator("/about")}
                  </span>
                </Link>
                <Link href="/services" className={linkClasses("/services")}>
                  <span className="relative pb-1 text-base font-medium">
                    Services
                    {activeLinkIndicator("/services")}
                  </span>
                </Link>
                <Link href="/gallery" className={linkClasses("/gallery")}>
                  <span className="relative pb-1 text-base font-medium">
                    Gallery
                    {activeLinkIndicator("/gallery")}
                  </span>
                </Link>
                <Link
                  href="/reviews"
                  className={linkClasses("/reviews")}
                >
                  <span className="relative pb-1 text-base font-medium">
                    Reviews
                    {activeLinkIndicator("/reviews")}
                  </span>
                </Link>
                <Link
                  href="/areas-served"
                  className={linkClasses("/areas-served")}
                >
                  <span className="relative pb-1 text-base font-medium">
                    Areas Served
                    {activeLinkIndicator("/areas-served")}
                  </span>
                </Link>
              </div>

              {/* Right side - CTA Button and Mobile Menu */}
              <div className="flex items-center space-x-4">
                {/* CTA Button */}
                <Link href="/contact" className="hidden md:block">
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 25px rgba(0, 188, 212, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#00BCD4] text-[#0B132B] px-6 py-3 rounded-lg font-bold text-base shadow-lg shadow-[#00BCD4]/20 hover:shadow-[#00BCD4]/30 transition-all duration-300"
                  >
                    Get FREE Quote
                  </motion.div>
                </Link>

                {/* Mobile Menu Button */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="lg:hidden relative w-8 h-8 flex flex-col justify-center items-center"
                >
                  <motion.span
                    animate={
                      menuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }
                    }
                    className="w-6 h-0.5 bg-[#00BCD4] absolute transition-all duration-300"
                  />
                  <motion.span
                    animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                    className="w-6 h-0.5 bg-[#00BCD4] absolute transition-all duration-300"
                  />
                  <motion.span
                    animate={
                      menuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }
                    }
                    className="w-6 h-0.5 bg-[#00BCD4] absolute transition-all duration-300"
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
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 w-80 h-full bg-[#1A1F3A] border-l border-gray-800 z-50 lg:hidden"
            >
              <div className="flex flex-col h-full pt-24 px-8">
                {/* Navigation Links */}
                <div className="space-y-6">
                  <Link
                    href="/"
                    onClick={() => setMenuOpen(false)}
                    className="block text-xl font-semibold text-gray-300 hover:text-[#00BCD4] transition-colors duration-300"
                  >
                    Home
                  </Link>
                  <Link
                    href="/about"
                    onClick={() => setMenuOpen(false)}
                    className="block text-xl font-semibold text-gray-300 hover:text-[#00BCD4] transition-colors duration-300"
                  >
                    About
                  </Link>
                  <Link
                    href="/services"
                    onClick={() => setMenuOpen(false)}
                    className="block text-xl font-semibold text-gray-300 hover:text-[#00BCD4] transition-colors duration-300"
                  >
                    Services
                  </Link>
                  <Link
                    href="/gallery"
                    onClick={() => setMenuOpen(false)}
                    className="block text-xl font-semibold text-gray-300 hover:text-[#00BCD4] transition-colors duration-300"
                  >
                    Gallery
                  </Link>
                  <Link
                    href="/reviews"
                    onClick={() => setMenuOpen(false)}
                    className="block text-xl font-semibold text-gray-300 hover:text-[#00BCD4] transition-colors duration-300"
                  >
                    Reviews
                  </Link>
                  <Link
                    href="/areas-served"
                    onClick={() => setMenuOpen(false)}
                    className="block text-xl font-semibold text-gray-300 hover:text-[#00BCD4] transition-colors duration-300"
                  >
                    Areas Served
                  </Link>
                </div>

                {/* Mobile CTA */}
                <div className="mt-8">
                  <Link href="/contact" onClick={() => setMenuOpen(false)}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-[#00BCD4] text-[#0B132B] text-center font-bold py-4 rounded-lg shadow-lg shadow-[#00BCD4]/25 transition-all duration-300"
                    >
                      Get FREE Quote
                    </motion.div>
                  </Link>
                </div>

                {/* Decorative Element */}
                <div className="mt-auto mb-8">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-[#00BCD4] to-transparent rounded-full"></div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
