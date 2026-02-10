"use client";

import React from "react";
import { motion } from "motion/react";

const sections = [
  {
    title: "Lakefront & Aquatic Services",
    items: [
      {
        name: "Lakefront Restoration",
        desc: "Manual aquatic vegetation removal, shoreline cleanup, dock/seawall clearing, visual enhancements.",
      },
      {
        name: "Lake & Pond Cleaning",
        desc: "Debris and trash removal for HOAs, waterfront homes, and commercial properties.",
      },
      {
        name: "Aquatic Vegetation Control (Chemical-Free)",
        desc: "Eco-friendly removal of hydrilla, water hyacinth, duckweed, algae mats.",
      },
      {
        name: "Water Access Restoration",
        desc: "Reopen canals, boat slips, and kayak paths through manual clearing.",
      },
      {
        name: "HOA & Community Waterway Management",
        desc: "Ongoing lake & canal maintenance and visual improvements.",
      },
    ],
  },
  {
    title: "Exterior Cleaning Services",
    items: [
      {
        name: "Pressure Washing & Soft Washing",
        desc: "Driveways, patios, siding, pool decks, fences — cleaned thoroughly and damage-free.",
      },
      {
        name: "Post-Construction Concrete Cleaning",
        desc: "Debris and dust removal for new concrete or renovation sites.",
      },
      {
        name: "Dumpster Pad & Enclosure Cleaning",
        desc: "Sanitize and restore dirty dumpster areas for businesses and communities.",
      },
      {
        name: "Boat Dock & Seawall Cleaning",
        desc: "Remove mold, algae, and grime from docks and seawalls.",
      },
      {
        name: "Outdoor Surface Detailing",
        desc: "Deep clean lanais, pool surrounds, and outdoor living spaces.",
      },
    ],
  },
  {
    title: "Real Estate & Property Services",
    items: [
      {
        name: "Curb Appeal Cleanups",
        desc: "Full exterior refresh: pressure washing, shoreline cleanup, and vegetation control before listings.",
      },
      {
        name: "Real Estate Photography Support",
        desc: "Assist with home prep and staging for waterfront property shoots.",
      },
    ],
  },
];

export default function Services() {
  return (
    <section className="relative min-h-screen px-6 pt-36 pb-24 space-y-16 overflow-hidden bg-[#0B132B]">
      {/* Background Effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#1A1F3A] to-[#0B132B] opacity-50" />

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-4xl md:text-5xl font-bold text-white text-center tracking-tight drop-shadow-sm"
      >
        Our <span className="text-[#00BCD4]">Services</span>
      </motion.h1>

      {sections.map((section, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: index * 0.2 }}
          className="bg-[#1A1F3A] border-l-8 border-[#00BCD4] rounded-2xl p-8 shadow-xl border-r border-t border-b border-gray-800"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 underline underline-offset-8 decoration-[#00BCD4]">
            {section.title}
          </h2>
          <ul className="space-y-6 text-gray-300">
            {section.items.map((item, idx) => (
              <li key={idx} className="group">
                <p className="font-semibold text-lg group-hover:text-[#00BCD4] transition-colors duration-300">
                  {item.name}
                </p>
                <p className="text-sm md:text-base text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                  {item.desc}
                </p>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </section>
  );
}