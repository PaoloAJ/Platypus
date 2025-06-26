import { motion } from "motion/react";

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] bg-white flex items-center justify-center"
    >
      <span className="text-[#0288D1] text-2xl font-bold animate-pulse">
        Loading...
      </span>
    </motion.div>
  );
}
