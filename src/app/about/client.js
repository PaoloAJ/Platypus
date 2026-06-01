"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Hammer, HeartHandshake, Clock, Lightbulb, ArrowRight } from "lucide-react";

const VALUES = [
  {
    title: "Quality Craftsmanship",
    description:
      "We take pride in every detail, using premium materials and proven techniques to create outdoor spaces that last.",
    Icon: Hammer,
  },
  {
    title: "Customer First",
    description:
      "Your vision drives our work. We listen, collaborate, and deliver exactly what you've dreamed of for your outdoor space.",
    Icon: HeartHandshake,
  },
  {
    title: "Reliability",
    description:
      "On-time delivery and transparent communication. When we commit to a timeline, you can count on us to deliver.",
    Icon: Clock,
  },
  {
    title: "Innovation",
    description:
      "We stay current with the latest trends and techniques to bring you cutting-edge outdoor living solutions.",
    Icon: Lightbulb,
  },
];

const AboutClient = ({ siteData = {}, teamData = [] }) => {
  const about = siteData.about || {};
  const teamMembers = teamData;

  return (
    <div className="relative min-h-screen bg-[#0B132B] text-white overflow-hidden">
      {/* Hero */}
      <section className="relative pt-32 sm:pt-36 lg:pt-40 pb-16 lg:pb-20 px-5 sm:px-6">
        <div className="absolute inset-0 glow-cyan pointer-events-none" />
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#00BCD4]/[0.05] blur-3xl rounded-full pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00BCD4]/10 border border-[#00BCD4]/25 text-[#7DD3FC] text-[11.5px] uppercase tracking-[0.18em] font-semibold mb-6"
          >
            About Platypus
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]"
          >
            <span className="bg-gradient-to-r from-white via-white to-[#7DD3FC] bg-clip-text text-transparent">
              {about.headline || "Crafting outdoor spaces"}
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-[16px] sm:text-[18px] text-gray-400 max-w-2xl mx-auto mt-5 leading-relaxed"
          >
            {about.subheadline}
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="relative px-5 sm:px-6 py-16 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="text-[11px] tracking-[0.18em] uppercase text-[#7DD3FC] font-semibold mb-3">
                Our story
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
                Family-owned. <span className="text-[#00BCD4]">Florida proud.</span>
              </h2>
              <div className="space-y-5 text-gray-300 leading-relaxed mt-6 text-[15.5px]">
                {about.story1 && <p>{about.story1}</p>}
                {about.story2 && <p>{about.story2}</p>}
                {about.story3 && <p>{about.story3}</p>}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-[#00BCD4]/5 blur-2xl rounded-3xl pointer-events-none" />
              <div className="relative rounded-2xl bg-[#1A1F3A]/60 backdrop-blur border border-white/[0.06] p-6 sm:p-8 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
                <div className="grid grid-cols-2 gap-5 sm:gap-6">
                  {[
                    { value: about.yearsFounded, label: "Years Experience" },
                    { value: about.projectsCount, label: "Projects Completed" },
                    { value: about.satisfaction, label: "Customer Satisfaction" },
                    { value: about.citiesServed, label: "Cities Served" },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="rounded-xl bg-[#0B132B]/60 border border-white/[0.04] p-4 sm:p-5 text-center"
                    >
                      <div className="text-3xl sm:text-4xl font-bold text-[#00BCD4] tabular-nums leading-none">
                        {stat.value || "—"}
                      </div>
                      <div className="text-gray-400 text-[12.5px] sm:text-[13px] mt-2 leading-tight">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative px-5 sm:px-6 py-16 lg:py-20 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-14"
          >
            <div className="text-[11px] tracking-[0.18em] uppercase text-[#7DD3FC] font-semibold mb-3">
              What we stand for
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Our values
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mt-3 text-[15.5px]">
              The principles that guide every project and interaction.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {VALUES.map((value, index) => {
              const Icon = value.Icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="group relative rounded-2xl bg-[#1A1F3A]/40 backdrop-blur border border-white/[0.06] p-6 hover:border-[#00BCD4]/30 hover:bg-[#1A1F3A]/60 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#00BCD4]/10 border border-[#00BCD4]/25 flex items-center justify-center mb-5 group-hover:bg-[#00BCD4]/15 transition-colors">
                    <Icon className="w-5 h-5 text-[#7DD3FC]" />
                  </div>
                  <h3 className="text-[16.5px] font-semibold text-white mb-2 tracking-tight">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 text-[14px] leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      {teamMembers.length > 0 && (
        <section className="relative px-5 sm:px-6 py-16 lg:py-20 border-t border-white/[0.04]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12 lg:mb-14"
            >
              <div className="text-[11px] tracking-[0.18em] uppercase text-[#7DD3FC] font-semibold mb-3">
                The crew
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Meet our team
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto mt-3 text-[15.5px]">
                The skilled professionals behind every beautiful outdoor space.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {teamMembers.map((member, index) => {
                const img = member.image;
                const hasPhoto = !!img?.src;
                const initials = member.name
                  ?.split(" ")
                  .filter(Boolean)
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase();
                return (
                  <motion.div
                    key={member.id || index}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="rounded-2xl bg-[#1A1F3A]/50 backdrop-blur border border-white/[0.06] p-6 sm:p-7 hover:border-[#00BCD4]/30 transition-colors text-center"
                  >
                    <div className="relative w-24 h-24 rounded-full mx-auto mb-5 overflow-hidden bg-gradient-to-br from-[#00BCD4] to-[#7DD3FC] flex items-center justify-center ring-4 ring-[#00BCD4]/10">
                      {hasPhoto ? (
                        <Image
                          src={img.src}
                          alt={member.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                          style={{
                            objectPosition: `${img.focalX ?? 50}% ${img.focalY ?? 50}%`,
                            transform:
                              img.zoom && img.zoom !== 1
                                ? `scale(${img.zoom})`
                                : undefined,
                          }}
                        />
                      ) : (
                        <span className="text-2xl font-bold text-[#0B132B]">
                          {initials}
                        </span>
                      )}
                    </div>
                    <h3 className="text-[17px] font-semibold text-white tracking-tight">
                      {member.name}
                    </h3>
                    {member.role && (
                      <p className="text-[#7DD3FC] font-semibold text-[13px] mt-1 uppercase tracking-[0.1em]">
                        {member.role}
                      </p>
                    )}
                    <div className="mt-4 pt-4 border-t border-white/[0.06] space-y-1.5 text-gray-400 text-[13.5px]">
                      {member.experience && (
                        <p>
                          <span className="text-gray-500">Experience:</span>{" "}
                          <span className="text-gray-300">{member.experience}</span>
                        </p>
                      )}
                      {member.specialty && (
                        <p>
                          <span className="text-gray-500">Specialty:</span>{" "}
                          <span className="text-gray-300">{member.specialty}</span>
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative px-5 sm:px-6 py-16 lg:py-24 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative rounded-2xl border border-[#00BCD4]/25 bg-gradient-to-br from-[#1A1F3A]/80 to-[#0B132B] p-8 sm:p-12 text-center overflow-hidden"
          >
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[#00BCD4]/[0.08] blur-3xl pointer-events-none" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Ready to transform your outdoor space?
              </h2>
              <p className="text-gray-400 mt-4 max-w-xl mx-auto text-[16px]">
                Let&apos;s discuss your vision and bring it to life with our expert craftsmanship.
              </p>
              <Link href="/contact">
                <motion.span
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-7 inline-flex items-center gap-2 bg-[#00BCD4] text-[#0B132B] px-7 py-3.5 rounded-xl font-bold text-[15px] shadow-[0_10px_30px_-8px_rgba(0,188,212,0.6)] transition-shadow"
                >
                  Get your FREE quote today
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutClient;
