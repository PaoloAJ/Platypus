"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

export default function ServicesClient({ servicesData = { categories: [] } }) {
  const categories = servicesData.categories || [];

  return (
    <div className="relative min-h-screen bg-[#0B132B] overflow-hidden">
      <div className="absolute inset-0 glow-cyan pointer-events-none" />
      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#00BCD4]/[0.05] blur-3xl rounded-full pointer-events-none" />

      <section className="relative pt-32 sm:pt-36 lg:pt-40 pb-16 px-5 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00BCD4]/10 border border-[#00BCD4]/25 text-[#7DD3FC] text-[11.5px] uppercase tracking-[0.18em] font-semibold mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00BCD4] pulse-dot" />
            Full service list
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.05]"
          >
            Built for Florida{" "}
            <span className="text-[#00BCD4]">waterfront properties.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 text-[16px] sm:text-[17px] text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Soft-wash, restoration, and eco-friendly exterior cleaning — across
            every surface that touches your home.
          </motion.p>
        </div>
      </section>

      <section className="relative px-5 sm:px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          {categories.length === 0 ? (
            <div className="text-center text-gray-400 py-20 border border-dashed border-white/[0.08] rounded-2xl">
              Service list coming soon.
            </div>
          ) : (
            <div className="space-y-6 lg:space-y-8">
              {categories.map((section, index) => (
                <motion.article
                  key={section.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="relative rounded-2xl border border-white/[0.06] bg-[#1A1F3A]/40 backdrop-blur p-6 sm:p-8 lg:p-10 overflow-hidden group hover:border-[#00BCD4]/30 transition-colors"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#00BCD4] to-[#7DD3FC]" />

                  <div className="flex items-center gap-3 mb-6 lg:mb-8">
                    <div className="text-[11px] tracking-[0.14em] uppercase font-bold text-[#00BCD4]">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="h-px flex-1 bg-white/[0.06] max-w-[60px]" />
                    <h2 className="text-[22px] sm:text-[26px] lg:text-[28px] font-bold text-white tracking-tight">
                      {section.title}
                    </h2>
                  </div>

                  <ul
                    className={`grid gap-x-8 gap-y-5 ${
                      section.items.length === 1
                        ? "grid-cols-1"
                        : section.items.length >= 7
                        ? "sm:grid-cols-2 lg:grid-cols-3"
                        : "sm:grid-cols-2"
                    }`}
                  >
                    {section.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex gap-3 group/item"
                      >
                        <div className="mt-1 shrink-0 w-5 h-5 rounded-full bg-[#00BCD4]/10 border border-[#00BCD4]/25 flex items-center justify-center group-hover/item:bg-[#00BCD4]/20 transition-colors">
                          <Check className="w-3 h-3 text-[#00BCD4]" strokeWidth={3} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-[15px] lg:text-[15.5px] text-white group-hover/item:text-[#7DD3FC] transition-colors">
                            {item.name}
                          </p>
                          <p className="text-[13.5px] lg:text-[14px] text-gray-400 mt-1 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 lg:mt-16 relative rounded-2xl border border-[#00BCD4]/25 bg-gradient-to-br from-[#1A1F3A]/80 to-[#0B132B] p-8 sm:p-10 text-center overflow-hidden"
          >
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[#00BCD4]/[0.08] blur-3xl pointer-events-none" />
            <div className="relative">
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Need help picking a service?
              </h3>
              <p className="mt-3 text-gray-400 max-w-md mx-auto">
                Send photos or fill out the form — we&apos;ll get back within 24 hours.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 bg-[#00BCD4] text-[#0B132B] px-6 py-3.5 rounded-xl font-bold text-[15px] shadow-[0_10px_30px_-8px_rgba(0,188,212,0.6)] hover:scale-[1.03] transition-transform"
              >
                Get a free quote
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
