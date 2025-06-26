"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import { motion } from "motion/react";
import PhotoCarousel from "./components/PhotoCarousel";
import LoadingScreen from "./components/LoadingScreen";

function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");

    if (hasVisited === "true") {
      setLoading(false);
      return;
    }

    const images = Array.from(document.images);
    let loaded = 0;

    const onLoad = () => {
      loaded++;
      if (loaded === images.length) {
        setTimeout(() => {
          localStorage.setItem("hasVisited", "true");
          setLoading(false);
        }, 500);
      }
    };

    if (images.length === 0) {
      localStorage.setItem("hasVisited", "true");
      setLoading(false);
    }

    images.forEach((img) => {
      if (img.complete) {
        onLoad();
      } else {
        img.addEventListener("load", onLoad);
        img.addEventListener("error", onLoad);
      }
    });

    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", onLoad);
        img.removeEventListener("error", onLoad);
      });
    };
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <>
      <Head>
        <link rel="preload" as="image" href="/backyard1.jpeg" />
        <link rel="preload" as="image" href="/dock1.jpeg" />
        <link rel="preload" as="image" href="/driveway1.jpeg" />
      </Head>

      <section className="min-h-screen px-6 py-12 space-y-20">
        {/* Welcome Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl font-extrabold text-[#0D47A1] text-center tracking-tight"
        >
          Welcome to Platypus Outdoor Solutions
        </motion.h1>

        {/* About Us */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="bg-white/90 border-l-8 border-[#00BCD4] rounded-2xl p-10 shadow-xl hover:shadow-2xl transition duration-300"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-[#01579B] mb-4 tracking-wide">
                About Us
              </h2>
              <p className="text-[#0D3B66] text-base leading-relaxed">
                Platypus Outdoor Solutions is a Florida-based outdoor
                maintenance company with a mission to restore and protect
                waterfront properties using eco-friendly, chemical-free methods.
                Specializing in lakefront vegetation removal, shoreline
                restoration, pressure washing, and post-construction cleaning,
                we help property owners reclaim the beauty of their outdoor
                spaces—naturally and sustainably.
                <br />
                <br />
                Built on the belief that clean water and well-maintained land
                are essential to a thriving community, Platypus blends modern
                tools with environmentally responsible practices to deliver
                lasting, high-quality results.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Why Choose Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="bg-white/90 rounded-2xl p-10 shadow-lg border-l-8 border-[#00BCD4]"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#01579B] mb-6 text-center">
            Why Choose Us?
          </h2>
          <ul className="space-y-4 text-[#0D3B66] text-base leading-relaxed max-w-3xl mx-auto">
            <li>✅ 100% eco-friendly and chemical-free solutions</li>
            <li>✅ Locally owned and operated by Florida residents</li>
            <li>✅ Focused on restoring beauty while protecting nature</li>
            <li>✅ Trusted by HOAs, homeowners, and real estate pros</li>
            <li>✅ Clear communication and dependable service</li>
          </ul>
        </motion.div>

        {/* Past Projects Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold text-[#01579B] text-center mb-2">
            Past Projects
          </h2>
          <p className="text-center text-[#0D3B66] max-w-2xl mx-auto text-sm md:text-base">
            Explore our gallery of recent lakefront transformations, cleanups,
            and exterior upgrades. Every image is a story of restored natural
            beauty.
          </p>
          <div className="mt-6">
            <PhotoCarousel />
          </div>
        </motion.div>
      </section>
    </>
  );
}

export default Home;
