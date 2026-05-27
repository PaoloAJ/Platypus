"use client";

import { motion } from "motion/react";

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[9999] bg-[#0B132B] flex flex-col items-center justify-center gap-6"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="absolute inset-0 glow-cyan pointer-events-none" />

      <div className="relative w-16 h-16">
        <span className="absolute inset-0 rounded-full border-2 border-[#1F2937]" />
        <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#00BCD4] border-r-[#00BCD4] animate-spin" />
        <span className="absolute inset-3 rounded-full bg-[#00BCD4]/20 pulse-dot" />
      </div>

      <span className="text-[12px] tracking-eyebrow uppercase text-[#9CA3AF] font-semibold">
        Loading
      </span>
    </motion.div>
  );
}
