"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, MapPin } from "lucide-react";
import { GALLERY_CATEGORIES } from "@/lib/registries";

const CATEGORY_DEFS = [{ id: "all", label: "All Projects" }, ...GALLERY_CATEGORIES];

function CroppedFill({ image, sizes = "100vw" }) {
  const src = image?.src || "/placeholders/gallery.svg";
  const { focalX = 50, focalY = 50, zoom = 1 } = image || {};
  return (
    <Image
      src={src}
      alt=""
      fill
      sizes={sizes}
      className="object-cover transition-transform duration-500 group-hover:scale-105"
      style={{
        objectPosition: `${focalX}% ${focalY}%`,
        transform: zoom !== 1 ? `scale(${zoom})` : undefined,
        transformOrigin: `${focalX}% ${focalY}%`,
      }}
    />
  );
}

export default function GalleryClient({ galleryData = [], siteData = {} }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = useMemo(
    () =>
      CATEGORY_DEFS.map((cat) => ({
        ...cat,
        count:
          cat.id === "all"
            ? galleryData.length
            : galleryData.filter((p) => p.category === cat.id).length,
      })),
    [galleryData]
  );

  const filteredProjects =
    selectedCategory === "all"
      ? galleryData
      : galleryData.filter((p) => p.category === selectedCategory);

  const labelOf = (id) => categories.find((c) => c.id === id)?.label || id;
  const about = siteData.about || {};

  return (
    <div className="relative min-h-screen bg-[#0B132B] text-white overflow-hidden">
      <div className="absolute inset-0 glow-cyan pointer-events-none" />
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#00BCD4]/[0.05] blur-3xl rounded-full pointer-events-none" />

      {/* Hero */}
      <section className="relative pt-32 sm:pt-36 lg:pt-40 pb-10 lg:pb-12 px-5 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00BCD4]/10 border border-[#00BCD4]/25 text-[#7DD3FC] text-[11.5px] uppercase tracking-[0.18em] font-semibold mb-6"
          >
            Project gallery
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]"
          >
            Our work,{" "}
            <span className="text-[#00BCD4]">documented.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-[16px] sm:text-[17px] text-gray-400 max-w-2xl mx-auto mt-5 leading-relaxed"
          >
            A look at recent restorations and cleanings across Central Florida.
          </motion.p>
        </div>
      </section>

      {/* Category filters */}
      <section className="relative pb-10 px-5 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
            {categories.map((category) => {
              const active = selectedCategory === category.id;
              return (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-semibold text-[13px] sm:text-[13.5px] transition-all duration-300 inline-flex items-center gap-2 ${
                    active
                      ? "bg-[#00BCD4] text-[#0B132B] shadow-[0_8px_24px_-8px_rgba(0,188,212,0.6)]"
                      : "bg-white/[0.03] text-gray-300 border border-white/[0.08] hover:border-[#00BCD4]/40 hover:bg-white/[0.06]"
                  }`}
                >
                  {category.label}
                  <span
                    className={`text-[11px] px-1.5 py-0.5 rounded-full tabular-nums ${
                      active
                        ? "bg-[#0B132B]/15"
                        : "bg-white/[0.04] text-gray-500"
                    }`}
                  >
                    {category.count}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="relative pb-20 px-5 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {filteredProjects.length === 0 ? (
            <div className="text-center text-gray-400 py-20 border border-dashed border-white/[0.08] rounded-2xl max-w-md mx-auto">
              No photos in this category yet.
            </div>
          ) : (
            <motion.div
              layout
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: index * 0.04 }}
                    className="group relative bg-[#1A1F3A]/50 backdrop-blur rounded-2xl overflow-hidden border border-white/[0.06] hover:border-[#00BCD4]/40 transition-all duration-300 cursor-pointer flex flex-col"
                    onClick={() => setSelectedImage(project)}
                  >
                    <div className="relative h-60 overflow-hidden">
                      <CroppedFill
                        image={project.image}
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-[#0B132B]/40 to-transparent" />
                      <span className="absolute top-3 left-3 bg-[#0B132B]/80 backdrop-blur border border-white/10 text-[#7DD3FC] px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.1em]">
                        {labelOf(project.category)}
                      </span>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-[17px] font-bold text-white leading-tight tracking-tight">
                          {project.title}
                        </h3>
                        {project.location && (
                          <p className="text-[#7DD3FC] font-medium text-[12.5px] mt-1 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {project.location}
                          </p>
                        )}
                      </div>
                    </div>
                    {(project.description || project.size) && (
                      <div className="p-5 flex-1 flex flex-col">
                        {project.description && (
                          <p className="text-gray-400 text-[13.5px] leading-relaxed line-clamp-3 flex-1">
                            {project.description}
                          </p>
                        )}
                        {project.size && (
                          <div className="mt-3 text-[12px] text-[#7DD3FC] font-semibold uppercase tracking-[0.1em]">
                            {project.size}
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              className="bg-[#0F1530] rounded-2xl border border-white/[0.08] max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                aria-label="Close"
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/60 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-black/80 border border-white/10 transition-colors"
              >
                <X size={18} />
              </button>

              <div className="relative h-72 sm:h-96 shrink-0">
                <CroppedFill
                  image={selectedImage.image}
                  sizes="(max-width: 768px) 100vw, 800px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1530] via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto">
                <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {selectedImage.title}
                    </h2>
                    {selectedImage.location && (
                      <p className="text-[#7DD3FC] mt-1 flex items-center gap-1.5 text-[14px]">
                        <MapPin className="w-3.5 h-3.5" />
                        {selectedImage.location}
                      </p>
                    )}
                  </div>
                  {selectedImage.size && (
                    <span className="bg-[#00BCD4]/15 text-[#7DD3FC] px-3.5 py-1.5 rounded-full font-semibold text-[12px] uppercase tracking-[0.1em] border border-[#00BCD4]/25">
                      {selectedImage.size}
                    </span>
                  )}
                </div>

                {selectedImage.description && (
                  <p className="text-gray-300 text-[15px] leading-relaxed mb-6">
                    {selectedImage.description}
                  </p>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/contact"
                    className="flex-1 text-center bg-[#00BCD4] text-[#0B132B] py-3.5 rounded-xl font-bold text-[14.5px] shadow-[0_8px_24px_-8px_rgba(0,188,212,0.5)] hover:scale-[1.02] transition-transform inline-flex items-center justify-center gap-2"
                  >
                    Get a similar quote
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="flex-1 border border-white/[0.08] text-gray-300 py-3.5 rounded-xl font-semibold text-[14.5px] hover:bg-white/[0.04] hover:text-white transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats strip */}
      <section className="relative py-16 lg:py-20 px-5 sm:px-6 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { value: about.projectsCount, label: "Projects Completed" },
              { value: about.yearsFounded, label: "Years Experience" },
              { value: about.satisfaction, label: "Satisfaction Rate" },
              { value: about.citiesServed, label: "Cities Served" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="text-center rounded-2xl bg-[#1A1F3A]/40 border border-white/[0.06] py-6 px-4"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#00BCD4] tabular-nums leading-none">
                  {stat.value || "—"}
                </div>
                <div className="text-gray-400 text-[13px] sm:text-[14px] mt-2.5">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative pb-20 px-5 sm:px-6">
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
              Ready to restore your property?
            </h2>
            <p className="text-gray-400 mt-4 max-w-md mx-auto text-[16px]">
              Tell us about the job and we&apos;ll send a free quote within 24 hours.
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 bg-[#00BCD4] text-[#0B132B] px-7 py-3.5 rounded-xl font-bold text-[15px] shadow-[0_10px_30px_-8px_rgba(0,188,212,0.6)] hover:scale-[1.03] transition-transform"
            >
              Get my free quote
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
