"use client";

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { Star, MessageSquare } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "James Peterson",
    location: "Winter Park, FL",
    rating: 5,
    date: "2 weeks ago",
    text: "Absolutely transformed our lakefront! The team was professional, knowledgeable, and the eco-friendly approach makes me feel good about protecting the local wildlife. Highly recommend Platypus for any aquatic restoration needs.",
    service: "Lakefront Restoration"
  },
  {
    id: 2,
    name: "Maria Gonzalez",
    location: "Orlando, FL",
    rating: 5,
    date: "1 month ago",
    text: "We hired them for pressure washing our driveway and pool deck. The difference is night and day. They were prompt, efficient, and left everything spotless.",
    service: "Pressure Washing"
  },
  {
    id: 3,
    name: "Robert Chen",
    location: "Lake Mary, FL",
    rating: 5,
    date: "3 months ago",
    text: "Great experience from start to finish. The team cleared out the invasive weeds around our dock without using harsh chemicals. Our kids can finally swim safely again!",
    service: "Aquatic Vegetation Control"
  },
  {
    id: 4,
    name: "Sarah Williams",
    location: "Altamonte Springs, FL",
    rating: 5,
    date: "4 months ago",
    text: "Top-notch service. They handled our post-construction cleanup and it saved us so much time. Very detailed work.",
    service: "Post-Construction Cleanup"
  },
  {
    id: 5,
    name: "David Miller",
    location: "Maitland, FL",
    rating: 4,
    date: "5 months ago",
    text: "Solid work on the seawall cleaning. Looks almost new. Good communication throughout the process.",
    service: "Seawall Cleaning"
  },
  {
    id: 6,
    name: "Emily Davis",
    location: "Longwood, FL",
    rating: 5,
    date: "6 months ago",
    text: "I appreciate the dedication to chemical-free solutions. It's hard to find companies that care about the environment like this. Will definitely use them again for maintenance.",
    service: "Eco-Friendly Maintenance"
  }
];

export default function Reviews() {
  return (
    <div className="min-h-screen bg-[#0B132B] pt-36 pb-16">
      {/* Header Section */}
      <section className="relative px-6 mb-16">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-bold text-white tracking-tight"
          >
            Customer <span className="text-[#00BCD4]">Reviews</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            See what our neighbors in Central Florida are saying about our eco-friendly services.
          </motion.p>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#1A1F3A] rounded-2xl p-8 border border-gray-800 hover:border-[#00BCD4]/50 transition-all duration-300 shadow-lg"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold text-white">{review.name}</h3>
                  <p className="text-sm text-[#00BCD4]">{review.location}</p>
                </div>
                <span className="text-xs text-gray-400 bg-[#0B132B] px-2 py-1 rounded-full border border-gray-700">
                  {review.date}
                </span>
              </div>
              
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" className={i < review.rating ? "text-yellow-400" : "text-gray-600"} />
                ))}
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">"{review.text}"</p>

              <div className="mt-auto pt-4 border-t border-gray-700">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                  Service: <span className="text-[#00BCD4]">{review.service}</span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-20 px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-gradient-to-r from-[#1A1F3A] to-[#0B132B] rounded-3xl p-10 text-center border border-gray-800 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[#00BCD4]/5 pointer-events-none"></div>
          <h2 className="text-3xl font-bold text-white mb-4 relative z-10">Have you worked with us?</h2>
          <p className="text-gray-300 mb-8 relative z-10">We'd love to hear about your experience. Your feedback helps us continue to provide top-tier service.</p>
          <button className="bg-[#00BCD4] text-[#0B132B] px-8 py-3 rounded-xl font-bold text-lg hover:bg-[#00BCD4]/90 transition-all duration-300 shadow-lg shadow-[#00BCD4]/25 relative z-10">
            Leave a Review
          </button>
        </motion.div>
      </section>
    </div>
  );
}
