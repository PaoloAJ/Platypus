"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Leaf, ShieldCheck, Clock, Star, Waves, SprayCan, MessageSquare, Construction, HardHat, Hammer, HeartHandshake, Lightbulb, UserCheck, Ship, Anchor } from "lucide-react";
import LoadingScreen from "./components/LoadingScreen";

function Home() {
  const [loading, setLoading] = useState(true);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Define testimonials array at the top
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Lake Mary, FL",
      rating: 5,
      image: "/testimonial1.jpg",
      text: "Platypus transformed our overgrown lakefront into a beautiful, accessible waterfront. Their eco-friendly approach gave us peace of mind.",
    },
    {
      name: "Mike Rodriguez",
      location: "Winter Park, FL",
      rating: 5,
      image: "/testimonial2.jpg",
      text: "Outstanding pressure washing service! Our driveway and patio look brand new. Professional, punctual, and reasonably priced.",
    },
    {
      name: "Jennifer Chen",
      location: "Orlando, FL",
      rating: 5,
      image: "/testimonial3.jpg",
      text: "After our pool installation, Platypus cleaned up all the construction debris perfectly. They went above and beyond.",
    },
  ];

  useEffect(() => {
    // Simple loading timeout - no storage needed
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (loading) return <LoadingScreen />;

  const services = [
    {
      icon: (
        <div className="w-12 h-12 bg-[#00BCD4] rounded-lg flex items-center justify-center text-[#0B132B]">
          <Waves size={24} strokeWidth={2.5} />
        </div>
      ),
      title: "Lakefront Restoration",
      description:
        "Chemical-free removal of invasive shoreline vegetation to restore water access and natural beauty",
      link: "/services#lakefront",
    },
    {
      icon: (
        <div className="w-12 h-12 bg-[#00BCD4] rounded-lg flex items-center justify-center text-[#0B132B]">
          <SprayCan size={24} strokeWidth={2.5} />
        </div>
      ),
      title: "Pressure Washing",
      description:
        "Professional cleaning of driveways, patios, and exterior surfaces using eco-safe methods",
      link: "/services#pressure-washing",
    },
    {
      icon: (
        <div className="w-12 h-12 bg-[#00BCD4] rounded-lg flex items-center justify-center text-[#0B132B]">
          <Construction size={24} strokeWidth={2.5} />
        </div>
      ),
      title: "Post-Construction Cleanup",
      description:
        "Heavy-duty debris removal and surface preparation for new construction projects",
      link: "/services#construction",
    },
  ];

  const benefits = [
    {
      icon: (
        <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-white">
          <Leaf size={24} />
        </div>
      ),
      title: "Eco-Friendly Methods",
      description:
        "100% chemical-free solutions that protect your family and environment",
    },
    {
      icon: (
        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white">
          <ShieldCheck size={24} />
        </div>
      ),
      title: "Licensed & Insured",
      description: "Fully licensed, bonded, and insured for your peace of mind",
    },
    {
      icon: (
        <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center text-white">
          <Clock size={24} />
        </div>
      ),
      title: "Fast Turnaround",
      description:
        "Most projects completed within 1-3 days with same-day quotes",
    },
  ];

  return (
    <>
      <Head>
        <link rel="preload" as="image" href="/backyard1.jpeg" />
        <link rel="preload" as="image" href="/dock1.jpeg" />
        <link rel="preload" as="image" href="/driveway1.jpeg" />
      </Head>

      <div className="min-h-screen bg-[#0B132B] pt-36">
        {/* Enhanced Hero Section */}
        <section className="relative overflow-hidden">
          {/* Hero Background Video/Image */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B132B] via-[#1A1F3A] to-[#0B132B] opacity-50"></div>
          <div className="absolute inset-0">
            <Image
              src="/backyard1.jpeg"
              alt="Beautiful lakefront restoration"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>

          <div className="max-w-6xl mx-auto px-6 py-24 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-center space-y-8"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight">
                Platypus Outdoor
                <br />
                <span className="text-[#00BCD4]">Solutions</span>
              </h1>

              {/* Enhanced subheading with benefits */}
              <p className="text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed">
                Eco-friendly waterfront restoration that adds beauty, value, and
                protection to your Florida property
              </p>

              {/* Trust Elements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 text-[#00BCD4]"
              >
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={20} fill="currentColor" className="text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-gray-300">
                    Trusted by 100+ Florida homeowners
                  </span>
                </div>
                <div className="hidden sm:block w-px h-6 bg-gray-600"></div>
                <div className="text-gray-300">
                  Licensed & Insured Since 2018
                </div>
              </motion.div>

              {/* Enhanced CTA */}
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
                      boxShadow: "0 20px 40px rgba(0, 188, 212, 0.4)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block bg-[#00BCD4] text-[#0B132B] px-14 py-5 rounded-xl font-bold text-2xl transition-all duration-300 shadow-lg shadow-[#00BCD4]/25 mb-4"
                  >
                    Get My FREE Quote
                  </motion.div>
                </Link>
                <p className="text-gray-400 text-sm mt-2">
                  Same-day response guaranteed
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section (New) */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 + index * 0.1 }}
                className="text-center bg-[#1A1F3A] rounded-xl p-6 border border-gray-800"
              >
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-300">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Before/After Photo Gallery (Enhanced) */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Amazing Transformations
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              See the dramatic before and after results that prove our expertise
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                src: "/backyard1.jpeg",
                title: "Lakefront Restoration",
                location: "Winter Park, FL",
                beforeAfter: "BEFORE & AFTER",
              },
              {
                src: "/dock1.jpeg",
                title: "Dock Cleaning",
                location: "Lake Mary, FL",
                beforeAfter: "TRANSFORMATION",
              },
              {
                src: "/driveway1.jpeg",
                title: "Pressure Washing",
                location: "Orlando, FL",
                beforeAfter: "RENEWED",
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
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
                  <div className="absolute top-4 right-4 bg-[#00BCD4] text-[#0B132B] px-3 py-1 rounded-full text-xs font-bold">
                    {project.beforeAfter}
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                  <p className="text-[#00BCD4] text-sm">{project.location}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/gallery">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block border-2 border-[#00BCD4] text-[#00BCD4] px-8 py-3 rounded-lg font-semibold hover:bg-[#00BCD4] hover:text-[#0B132B] transition-all duration-300"
              >
                View Complete Gallery →
              </motion.div>
            </Link>
          </div>
        </section>

        {/* Enhanced Testimonials Carousel */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-400">
              Real testimonials from satisfied customers across Central Florida
            </p>
          </motion.div>

          <div className="relative">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-[#1A1F3A] rounded-2xl p-10 border border-gray-800 text-center"
            >
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map(
                  (_, i) => (
                    <span key={i} className="text-[#00BCD4]">
                      <Star size={24} fill="currentColor" />
                    </span>
                  )
                )}
              </div>
              <p className="text-gray-300 leading-relaxed mb-8 italic text-lg">
                "{testimonials[currentTestimonial].text}"
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-[#00BCD4] rounded-full flex items-center justify-center text-[#0B132B] font-bold">
                  {testimonials[currentTestimonial].name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-semibold">
                    {testimonials[currentTestimonial].name}
                  </p>
                  <p className="text-[#00BCD4] text-sm">
                    {testimonials[currentTestimonial].location}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-6 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial
                      ? "bg-[#00BCD4]"
                      : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Services Preview (Kept but streamlined) */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Our Specialty Services
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Comprehensive solutions tailored to Florida's unique environment
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
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
                    <div className="mb-4">{service.icon}</div>
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
        </section>

        {/* Enhanced Call to Action with Contact Form */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-r from-[#1A1F3A] to-[#0B132B] rounded-3xl p-8 md:p-12 border border-gray-800"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                  Summer Spots Are Filling Fast!
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Get your FREE consultation today and transform your waterfront
                  property before peak season.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link href="/contact">
                    <motion.div
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 20px 40px rgba(0, 188, 212, 0.3)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-[#00BCD4] text-[#0B132B] px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg shadow-[#00BCD4]/25"
                    >
                      Book FREE Consultation
                    </motion.div>
                  </Link>
                </div>
              </div>

              {/* Quick Contact Form */}
              <div className="bg-[#0B132B] rounded-2xl p-8 border border-gray-800">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  Get Your Quote in 24 Hours
                </h3>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-[#1A1F3A] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-[#00BCD4] focus:outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 bg-[#1A1F3A] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-[#00BCD4] focus:outline-none"
                  />
                  <select className="w-full px-4 py-3 bg-[#1A1F3A] border border-gray-700 rounded-lg text-white focus:border-[#00BCD4] focus:outline-none">
                    <option value="">Select Service Type</option>
                    <option value="lakefront">Lakefront Restoration</option>
                    <option value="pressure-washing">Pressure Washing</option>
                    <option value="construction">
                      Post-Construction Cleanup
                    </option>
                    <option value="other">Other</option>
                  </select>
                  <button
                    type="submit"
                    className="w-full bg-[#00BCD4] text-[#0B132B] py-3 rounded-lg font-bold text-lg hover:bg-[#00BCD4]/90 transition-all duration-300"
                  >
                    Get My Free Quote →
                  </button>
                </form>
                <p className="text-gray-400 text-sm text-center mt-4">
                  No spam, ever • Same-day response • Licensed & insured
                </p>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}

export default Home;
