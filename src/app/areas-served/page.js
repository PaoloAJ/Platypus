"use client";

import React from "react";
import { motion } from "motion/react";
import { Construction } from "lucide-react";

export default function AreasServed() {
  return (
    <div className="min-h-screen bg-[#0B132B] pt-36 pb-20 px-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-8"
      >
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-[#00BCD4]/10 rounded-full flex items-center justify-center">
            <Construction size={48} className="text-[#00BCD4]" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
          Under <span className="text-[#00BCD4]">Construction</span>
        </h1>
        
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          We are currently mapping out all the areas we serve in Central Florida. 
          Check back soon for a detailed list of locations!
        </p>

        <div className="pt-8">
          <p className="text-gray-400">
            In the meantime, feel free to contacting us to ask if we cover your area.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
