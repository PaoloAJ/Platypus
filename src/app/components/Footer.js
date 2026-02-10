"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: "Lakefront Restoration", href: "/services#lakefront" },
      { name: "Pressure Washing", href: "/services#pressure-washing" },
      { name: "Post-Construction Cleanup", href: "/services#construction" },
      { name: "Dumpster Cleaning", href: "/services#dumpster" },
      { name: "Real Estate Prep", href: "/services#real-estate" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Services", href: "/services" },
      { name: "Gallery", href: "/gallery" },
      { name: "Contact", href: "/contact" },
    ],
    contact: [
      { name: "Request Quote", href: "/contact" },
      { name: "Schedule Visit", href: "/contact" },
      { name: "Emergency Service", href: "/contact" },
    ],
  };

  return (
    <footer className="bg-[#0B132B] border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="block">
              <div className="relative w-48 h-14">
                <Image
                  src="/logo.png"
                  alt="Platypus Outdoor Solutions"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Florida's premier eco-friendly waterfront restoration specialists.
              Protecting nature while restoring beauty.
            </p>
            <div className="flex space-x-4"></div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#00BCD4] transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#00BCD4] transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Get Started</h3>
            <ul className="space-y-3 mb-6">
              {footerLinks.contact.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#00BCD4] transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-[#00BCD4]" />
                <span>Central Florida</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-[#00BCD4]" />
                <span>info@platypusoutdoor.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-[#00BCD4]" />
                <span>(555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Platypus Outdoor Solutions. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-[#00BCD4] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-[#00BCD4] transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
