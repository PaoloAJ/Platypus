"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // ✅ Import Image from next/image
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClasses = (path) =>
    `transition-colors hover:text-[#0288D1] ${
      pathname === path ? "text-[#0288D1] font-semibold underline" : ""
    }`;

  return (
    <>
      <nav className="h-36 bg-transparent px-6 py-4 flex items-center justify-between backdrop-blur-md relative z-50">
        {/* Logo */}
        <div className="w-full flex justify-center md:justify-start items-center pl-0 md:pl-4">
          <Link href="/private-dashboard">
            <div className="relative w-60 h-45 mt-7">
              <Image
                src="/logo.png"
                alt="Platypus Outdoor Logo"
                fill
                priority
                className="object-fill"
              />
            </div>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex space-x-10 text-md font-medium">
          <Link href="/" className={linkClasses("/")}>
            About
          </Link>
          <Link href="/services" className={linkClasses("/services")}>
            Services
          </Link>
        </div>

        {/* Contact Button */}
        <Link
          href="/contact"
          className={`hidden md:inline-block px-4 py-2 rounded shadow font-semibold transition ${
            pathname === "/contact"
              ? "bg-[#e0f7fa] text-[#0288D1]"
              : "bg-white text-[#0288D1] hover:bg-[#e0f7fa]"
          }`}
        >
          Get a Quote
        </Link>

        {/* Hamburger (Mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-[#0288D1] z-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full h-full bg-white z-[60] flex flex-col items-center justify-center space-y-6 px-6 py-10 shadow-2xl md:hidden"
          >
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="text-xl text-[#0288D1] font-semibold hover:underline"
            >
              About
            </Link>
            <Link
              href="/services"
              onClick={() => setMenuOpen(false)}
              className="text-xl text-[#0288D1] font-semibold hover:underline"
            >
              Services
            </Link>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="w-full max-w-xs bg-[#00BCD4] text-white text-center font-semibold py-2 rounded-md shadow hover:bg-[#008BA3] transition"
            >
              Get a Quote
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
