"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ArrowRight, Quote } from "lucide-react";

export default function ReviewsClient({ testimonialsData = [] }) {
  const avgRating =
    testimonialsData.length > 0
      ? (
          testimonialsData.reduce((acc, r) => acc + (r.stars || 5), 0) /
          testimonialsData.length
        ).toFixed(1)
      : "5.0";

  return (
    <div className="relative min-h-screen bg-[#0B132B] overflow-hidden">
      <div className="absolute inset-0 glow-cyan pointer-events-none" />
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#00BCD4]/[0.05] blur-3xl rounded-full pointer-events-none" />

      {/* Hero */}
      <section className="relative pt-32 sm:pt-36 lg:pt-40 pb-12 lg:pb-16 px-5 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00BCD4]/10 border border-[#00BCD4]/25 text-[#7DD3FC] text-[11.5px] uppercase tracking-[0.18em] font-semibold mb-6"
          >
            What customers say
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.05]"
          >
            Reviews from{" "}
            <span className="text-[#00BCD4]">real homeowners.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[16px] sm:text-[17px] text-gray-400 max-w-2xl mx-auto mt-5 leading-relaxed"
          >
            See what our neighbors in Central Florida are saying about our
            eco-friendly services.
          </motion.p>

          {testimonialsData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 inline-flex items-center gap-4 bg-[#1A1F3A]/60 backdrop-blur border border-white/[0.08] rounded-2xl px-5 py-3"
            >
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill="currentColor"
                    className="text-yellow-400"
                  />
                ))}
              </div>
              <div className="h-6 w-px bg-white/10" />
              <div className="text-left">
                <div className="text-white font-bold text-[18px] leading-none tabular-nums">
                  {avgRating}
                  <span className="text-gray-500 text-[13px] font-normal ml-1">
                    / 5
                  </span>
                </div>
                <div className="text-[11.5px] text-gray-400 mt-0.5">
                  {testimonialsData.length}{" "}
                  {testimonialsData.length === 1 ? "review" : "reviews"}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Reviews grid */}
      <section className="relative px-5 sm:px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          {testimonialsData.length === 0 ? (
            <div className="max-w-md mx-auto text-center text-gray-400 py-20 border border-dashed border-white/[0.08] rounded-2xl">
              No reviews yet. Once we collect a few, they&apos;ll show up here automatically.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {testimonialsData.map((r, i) => (
                <motion.article
                  key={r.id || i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="relative rounded-2xl bg-[#1A1F3A]/50 backdrop-blur border border-white/[0.06] p-6 sm:p-7 hover:border-[#00BCD4]/30 transition-all duration-300 flex flex-col group"
                >
                  <Quote className="absolute top-5 right-5 w-7 h-7 text-[#00BCD4]/15 group-hover:text-[#00BCD4]/30 transition-colors" />

                  <div className="flex items-center gap-0.5 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        size={15}
                        fill="currentColor"
                        className={
                          j < (r.stars || 5)
                            ? "text-yellow-400"
                            : "text-gray-700"
                        }
                      />
                    ))}
                  </div>

                  {r.title && (
                    <p className="text-white font-semibold text-[15px] mb-2 tracking-tight">
                      {r.title}
                    </p>
                  )}

                  <p className="text-gray-300 text-[14.5px] leading-relaxed flex-1">
                    &ldquo;{r.quote}&rdquo;
                  </p>

                  <div className="mt-6 pt-5 border-t border-white/[0.06] flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-white font-semibold text-[14.5px] truncate">
                        {r.name}
                      </div>
                      {r.loc && (
                        <div className="text-[#7DD3FC] text-[12.5px] truncate">
                          {r.loc}
                        </div>
                      )}
                    </div>
                    {r.date && (
                      <span className="shrink-0 text-[11px] text-gray-500 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06]">
                        {r.date}
                      </span>
                    )}
                  </div>

                  {r.service && (
                    <div className="mt-3 text-[11.5px] uppercase tracking-[0.12em] font-semibold text-gray-500">
                      Service:{" "}
                      <span className="text-[#7DD3FC]">{r.service}</span>
                    </div>
                  )}
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-5 sm:px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto relative rounded-2xl border border-[#00BCD4]/25 bg-gradient-to-br from-[#1A1F3A]/80 to-[#0B132B] p-8 sm:p-12 text-center overflow-hidden"
        >
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[#00BCD4]/[0.08] blur-3xl pointer-events-none" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Have you worked with us?
            </h2>
            <p className="text-gray-400 mt-4 max-w-md mx-auto text-[16px]">
              We&apos;d love to hear about your experience. Your feedback helps
              us keep providing top-tier service.
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 bg-[#00BCD4] text-[#0B132B] px-7 py-3.5 rounded-xl font-bold text-[15px] shadow-[0_10px_30px_-8px_rgba(0,188,212,0.6)] hover:scale-[1.03] transition-transform"
            >
              Leave a review
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
