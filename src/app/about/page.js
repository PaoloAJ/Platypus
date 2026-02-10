"use client";

import React from "react";
import { motion } from "framer-motion";
import { Hammer, HeartHandshake, Clock, Lightbulb } from "lucide-react";

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Mike Johnson",
      role: "Founder & Lead Contractor",
      experience: "15+ years",
      specialty: "Deck Construction & Outdoor Design",
      image: "/team/mike.jpg",
    },
    {
      name: "Sarah Chen",
      role: "Project Manager",
      experience: "8+ years",
      specialty: "Client Relations & Planning",
      image: "/team/sarah.jpg",
    },
    {
      name: "David Rodriguez",
      role: "Master Craftsman",
      experience: "12+ years",
      specialty: "Custom Woodwork & Finishing",
      image: "/team/david.jpg",
    },
  ];

  const values = [
    {
      title: "Quality Craftsmanship",
      description:
        "We take pride in every detail, using premium materials and proven techniques to create outdoor spaces that last.",
      icon: <Hammer size={40} className="text-[#00BCD4]" />,
    },
    {
      title: "Customer First",
      description:
        "Your vision drives our work. We listen, collaborate, and deliver exactly what you've dreamed of for your outdoor space.",
      icon: <HeartHandshake size={40} className="text-[#00BCD4]" />,
    },
    {
      title: "Reliability",
      description:
        "On-time delivery and transparent communication. When we commit to a timeline, you can count on us to deliver.",
      icon: <Clock size={40} className="text-[#00BCD4]" />,
    },
    {
      title: "Innovation",
      description:
        "We stay current with the latest trends and techniques to bring you cutting-edge outdoor living solutions.",
      icon: <Lightbulb size={40} className="text-[#00BCD4]" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B132B] via-[#1A1F3A] to-[#0B132B] text-white">
      {/* Hero Section */}
      <section className="relative pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#00BCD4] to-[#4FC3F7] bg-clip-text text-transparent">
              About Platypus Outdoor Solutions
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Transforming outdoor spaces across Central Florida since 2009.
              We're passionate about creating beautiful, functional outdoor
              living environments that bring families together.
            </p>
          </motion.div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00BCD4]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#00BCD4]/5 rounded-full blur-3xl"></div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-8 text-[#00BCD4]">
                Our Story
              </h2>
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p>
                  Founded in 2009 by Mike Johnson, Platypus Outdoor Solutions
                  began as a small family business with a simple mission: to
                  help Central Florida families make the most of their outdoor
                  spaces.
                </p>
                <p>
                  What started as weekend deck projects has grown into a
                  full-service outdoor construction company, but we've never
                  lost sight of our core values: quality craftsmanship, honest
                  communication, and treating every project like it's our own
                  backyard.
                </p>
                <p>
                  Today, we're proud to have transformed hundreds of outdoor
                  spaces across Orlando, Apopka, Winter Garden, and surrounding
                  communities. Each project tells a story, and we're honored to
                  be part of creating spaces where memories are made.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-[#1A1F3A] to-[#2A2F4A] rounded-2xl p-8 border border-gray-800">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#00BCD4] mb-2">
                      15+
                    </div>
                    <div className="text-gray-300">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#00BCD4] mb-2">
                      500+
                    </div>
                    <div className="text-gray-300">Projects Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#00BCD4] mb-2">
                      100%
                    </div>
                    <div className="text-gray-300">Customer Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#00BCD4] mb-2">
                      25+
                    </div>
                    <div className="text-gray-300">Cities Served</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-[#1A1F3A]/30">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 text-[#00BCD4]">
              Our Values
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              The principles that guide every project and interaction
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-[#1A1F3A] to-[#2A2F4A] rounded-2xl p-8 border border-gray-800 hover:border-[#00BCD4]/30 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-4 text-[#00BCD4]">
                  {value.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 text-[#00BCD4]">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              The skilled professionals behind every beautiful outdoor space
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-[#1A1F3A] to-[#2A2F4A] rounded-2xl p-8 border border-gray-800 hover:border-[#00BCD4]/30 transition-all duration-300"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-[#00BCD4] to-[#4FC3F7] rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#0B132B]">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">
                  {member.name}
                </h3>
                <p className="text-[#00BCD4] font-semibold text-center mb-4">
                  {member.role}
                </p>
                <div className="space-y-2 text-gray-300 text-center">
                  <p>
                    <strong>Experience:</strong> {member.experience}
                  </p>
                  <p>
                    <strong>Specialty:</strong> {member.specialty}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#00BCD4]/10 to-[#4FC3F7]/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Outdoor Space?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's discuss your vision and bring it to life with our expert
              craftsmanship.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#00BCD4] text-[#0B132B] px-8 py-4 rounded-lg font-bold text-lg shadow-lg shadow-[#00BCD4]/20 hover:shadow-[#00BCD4]/30 transition-all duration-300"
            >
              Get Your FREE Quote Today
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
