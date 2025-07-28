"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import LoadingScreen from "./components/LoadingScreen";

function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");

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
          sessionStorage.setItem("hasVisited", "true");
          setLoading(false);
        }, 500);
      }
    };

    if (images.length === 0) {
      sessionStorage.setItem("hasVisited", "true");
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

  const services = [
    {
      icon: "🌊",
      title: "Lakefront Restoration",
      description:
        "Chemical-free removal of invasive shoreline vegetation to restore water access and natural beauty",
      link: "/services#lakefront",
    },
    {
      icon: "🧽",
      title: "Pressure Washing",
      description:
        "Professional cleaning of driveways, patios, and exterior surfaces using eco-safe methods",
      link: "/services#pressure-washing",
    },
    {
      icon: "🏗️",
      title: "Post-Construction Cleanup",
      description:
        "Heavy-duty debris removal and surface preparation for new construction projects",
      link: "/services#construction",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Lake Mary, FL",
      rating: 5,
      text: "Platypus transformed our overgrown lakefront into a beautiful, accessible waterfront. Their eco-friendly approach gave us peace of mind knowing we weren't harming the local ecosystem.",
    },
    {
      name: "Mike Rodriguez",
      location: "Winter Park, FL",
      rating: 5,
      text: "Outstanding pressure washing service! Our driveway and patio look brand new. Professional, punctual, and reasonably priced. Highly recommend!",
    },
    {
      name: "Jennifer Chen",
      location: "Orlando, FL",
      rating: 5,
      text: "After our pool installation, Platypus cleaned up all the construction debris perfectly. They went above and beyond to make sure everything was spotless.",
    },
  ];

  return (
    <>
      <Head>
        <link rel="preload" as="image" href="/backyard1.jpeg" />
        <link rel="preload" as="image" href="/dock1.jpeg" />
        <link rel="preload" as="image" href="/driveway1.jpeg" />
      </Head>

      <div className="min-h-screen bg-[#0B132B] pt-26">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B132B] via-[#1A1F3A] to-[#0B132B] opacity-50"></div>
          <div className="max-w-6xl mx-auto px-6 py-24 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-center space-y-8"
            >
              <h1 className="text-6xl md:text-8xl font-bold text-white leading-tight tracking-tight">
                Platypus Outdoor
                <br />
                <span className="text-[#00BCD4]">Solutions</span>
              </h1>
              <p className="text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
                Florida's premier eco-friendly waterfront restoration
                specialists. Restoring natural beauty while protecting our
                environment.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="pt-8"
              >
                <Link href="/contact">
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(0, 188, 212, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block bg-[#00BCD4] text-[#0B132B] px-12 py-4 rounded-xl font-bold text-xl transition-all duration-300 shadow-lg shadow-[#00BCD4]/25"
                  >
                    Request a Quote
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Services Preview */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Our Services
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Comprehensive outdoor maintenance solutions tailored to Florida's
              unique environment
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                className="group"
              >
                <Link href={service.link}>
                  <div className="bg-[#1A1F3A] rounded-2xl p-8 border border-gray-800 hover:border-[#00BCD4]/50 transition-all duration-300 hover:transform hover:scale-105 h-full">
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#00BCD4] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <div className="text-[#00BCD4] font-semibold group-hover:underline">
                      Learn More →
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center"
          >
            <Link href="/services">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block border-2 border-[#00BCD4] text-[#00BCD4] px-8 py-3 rounded-lg font-semibold hover:bg-[#00BCD4] hover:text-[#0B132B] transition-all duration-300"
              >
                View All Services
              </motion.div>
            </Link>
          </motion.div>
        </section>

        {/* Before/After Photo Grid */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Transformations
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              See the dramatic before and after results of our eco-friendly
              restoration work
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                src: "/backyard1.jpeg",
                title: "Lakefront Restoration",
                location: "Winter Park, FL",
              },
              {
                src: "/dock1.jpeg",
                title: "Dock Cleaning",
                location: "Lake Mary, FL",
              },
              {
                src: "/driveway1.jpeg",
                title: "Pressure Washing",
                location: "Orlando, FL",
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-[#1A1F3A] border border-gray-800 hover:border-[#00BCD4]/50 transition-all duration-300"
              >
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={project.src}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                  <p className="text-[#00BCD4] text-sm">{project.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* About Us */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                  About Us
                </h2>
                <div className="w-16 h-1 bg-[#00BCD4] rounded-full mb-8"></div>
              </div>

              <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
                <p>
                  Platypus Outdoor Solutions is a Florida-based outdoor
                  maintenance company with a mission to restore and protect
                  waterfront properties using eco-friendly, chemical-free
                  methods.
                </p>
                <p>
                  Specializing in lakefront vegetation removal, shoreline
                  restoration, pressure washing, and post-construction cleaning,
                  we help property owners reclaim the beauty of their outdoor
                  spaces—naturally and sustainably.
                </p>
                <p>
                  Built on the belief that clean water and well-maintained land
                  are essential to a thriving community, Platypus blends modern
                  tools with environmentally responsible practices to deliver
                  lasting, high-quality results.
                </p>
              </div>
            </div>

            <div className="bg-[#1A1F3A] rounded-2xl p-10 border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-8 tracking-tight">
                Why Choose Us?
              </h3>

              <div className="space-y-6">
                {[
                  "100% eco-friendly and chemical-free solutions",
                  "Locally owned and operated by Florida residents",
                  "Focused on restoring beauty while protecting nature",
                  "Trusted by HOAs, homeowners, and real estate professionals",
                  "Clear communication and dependable service",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-3 h-3 bg-[#00BCD4] rounded-full mt-2"></div>
                    <p className="text-gray-300 leading-relaxed">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Customer Reviews */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Real testimonials from satisfied customers across Central Florida
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                className="bg-[#1A1F3A] rounded-2xl p-8 border border-gray-800 hover:border-gray-700 transition-all duration-300"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-[#00BCD4] text-xl">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="border-t border-gray-700 pt-4">
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-[#00BCD4] text-sm">
                    {testimonial.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-r from-[#1A1F3A] to-[#0B132B] rounded-3xl p-12 md:p-16 text-center border border-gray-800"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Ready to Transform Your Property?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Get a free, no-obligation quote for your outdoor restoration
              project. We'll work with you to create a customized solution that
              fits your needs and budget.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact">
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(0, 188, 212, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#00BCD4] text-[#0B132B] px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg shadow-[#00BCD4]/25"
                >
                  Get Free Quote
                </motion.div>
              </Link>

              <Link href="/services">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-[#00BCD4] text-[#00BCD4] px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#00BCD4] hover:text-[#0B132B] transition-all duration-300"
                >
                  View Services
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}

export default Home;
