"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Construction } from "lucide-react";

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = [
    { id: "all", label: "All Projects", count: 48 },
    { id: "decks", label: "Custom Decks", count: 18 },
    { id: "pergolas", label: "Pergolas & Gazebos", count: 12 },
    { id: "patios", label: "Patios", count: 8 },
    { id: "kitchens", label: "Outdoor Kitchens", count: 6 },
    { id: "pools", label: "Pool Decks", count: 4 },
  ];

  // Sample project data with placeholders
  const projects = [
    {
      id: 1,
      title: "Modern Composite Deck",
      category: "decks",
      location: "Orlando, FL",
      size: "400 sq ft",
      description:
        "A stunning two-level composite deck with integrated lighting and custom railings.",
      image: "/gallery/deck-1.jpg",
      beforeImage: "/gallery/deck-1-before.jpg",
    },
    {
      id: 2,
      title: "Cedar Pergola with Retractable Canopy",
      category: "pergolas",
      location: "Winter Garden, FL",
      size: "12x16 ft",
      description:
        "Custom cedar pergola featuring a retractable canopy system and integrated planters.",
      image: "/gallery/pergola-1.jpg",
      beforeImage: "/gallery/pergola-1-before.jpg",
    },
    {
      id: 3,
      title: "Stamped Concrete Patio",
      category: "patios",
      location: "Apopka, FL",
      size: "600 sq ft",
      description:
        "Decorative stamped concrete patio with fire pit and seating walls.",
      image: "/gallery/patio-1.jpg",
      beforeImage: "/gallery/patio-1-before.jpg",
    },
    {
      id: 4,
      title: "Complete Outdoor Kitchen",
      category: "kitchens",
      location: "Windermere, FL",
      size: "200 sq ft",
      description:
        "Full outdoor kitchen with grill, sink, storage, and granite countertops.",
      image: "/gallery/kitchen-1.jpg",
      beforeImage: "/gallery/kitchen-1-before.jpg",
    },
    {
      id: 5,
      title: "Pool Deck Renovation",
      category: "pools",
      location: "Mount Dora, FL",
      size: "800 sq ft",
      description:
        "Complete pool deck renovation with slip-resistant composite decking.",
      image: "/gallery/pool-1.jpg",
      beforeImage: "/gallery/pool-1-before.jpg",
    },
    {
      id: 6,
      title: "Multi-Level Hardwood Deck",
      category: "decks",
      location: "Clermont, FL",
      size: "1200 sq ft",
      description:
        "Expansive multi-level Ipe hardwood deck with built-in seating and planters.",
      image: "/gallery/deck-2.jpg",
      beforeImage: "/gallery/deck-2-before.jpg",
    },
    // Additional projects for demonstration
    {
      id: 7,
      title: "Rustic Gazebo Installation",
      category: "pergolas",
      location: "Ocoee, FL",
      size: "14x14 ft",
      description:
        "Traditional octagonal gazebo with cedar shingles and decorative railings.",
      image: "/gallery/gazebo-1.jpg",
      beforeImage: "/gallery/gazebo-1-before.jpg",
    },
    {
      id: 8,
      title: "Stone Paver Patio",
      category: "patios",
      location: "Winter Park, FL",
      size: "450 sq ft",
      description:
        "Natural stone paver patio with curved design and integrated lighting.",
      image: "/gallery/patio-2.jpg",
      beforeImage: "/gallery/patio-2-before.jpg",
    },
  ];

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

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
              Our Work Gallery
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Explore our portfolio of stunning outdoor transformations. Each
              project represents our commitment to quality craftsmanship and
              customer satisfaction.
            </p>
          </motion.div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00BCD4]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#00BCD4]/5 rounded-full blur-3xl"></div>
      </section>

      {/* Filter Categories */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-[#00BCD4] text-[#0B132B] shadow-lg shadow-[#00BCD4]/25"
                    : "bg-[#1A1F3A] text-gray-300 border border-gray-700 hover:border-[#00BCD4]/30"
                }`}
              >
                {category.label}
                <span className="ml-2 text-sm opacity-75">
                  ({category.count})
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-[#1A1F3A] to-[#2A2F4A] rounded-2xl overflow-hidden border border-gray-800 hover:border-[#00BCD4]/30 transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedImage(project)}
                >
                  {/* Project Image */}
                  <div className="relative h-64 bg-gradient-to-br from-[#00BCD4]/20 to-[#4FC3F7]/10 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F3A]/80 to-transparent z-10"></div>
                    <div className="absolute top-4 right-4 z-20">
                      <span className="bg-[#00BCD4] text-[#0B132B] px-3 py-1 rounded-full text-sm font-semibold">
                        {
                          categories.find((c) => c.id === project.category)
                            ?.label
                        }
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 z-20">
                      <h3 className="text-xl font-bold text-white mb-1">
                        {project.title}
                      </h3>
                      <p className="text-[#00BCD4] font-medium text-sm">
                        {project.location}
                      </p>
                    </div>
                    {/* Placeholder for actual image */}
                    <div className="w-full h-full bg-gradient-to-br from-[#00BCD4]/30 to-[#4FC3F7]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <div className="text-6xl text-[#00BCD4]/40">
                        <Construction size={64} />
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-6">
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#00BCD4] font-semibold">
                        Size: {project.size}
                      </span>
                      <span className="text-gray-400">View Details →</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-gradient-to-br from-[#1A1F3A] to-[#2A2F4A] rounded-2xl border border-gray-800 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <X size={24} />
                </button>

                {/* Large Project Image */}
                <div className="h-96 bg-gradient-to-br from-[#00BCD4]/30 to-[#4FC3F7]/20 rounded-t-2xl flex items-center justify-center">
                  <div className="text-8xl text-[#00BCD4]/30">
                    <Construction size={96} />
                  </div>
                </div>

                {/* Project Information */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-[#00BCD4] mb-2">
                        {selectedImage.title}
                      </h2>
                      <p className="text-gray-300 text-lg">
                        {selectedImage.location}
                      </p>
                    </div>
                    <span className="bg-[#00BCD4]/20 text-[#00BCD4] px-4 py-2 rounded-full font-semibold">
                      {selectedImage.size}
                    </span>
                  </div>

                  <p className="text-gray-300 text-lg leading-relaxed mb-8">
                    {selectedImage.description}
                  </p>

                  {/* Before/After Section */}
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <h4 className="text-xl font-bold text-[#00BCD4] mb-4">
                        Before
                      </h4>
                      <div className="h-48 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400">Before Photo</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-[#00BCD4] mb-4">
                        After
                      </h4>
                      <div className="h-48 bg-gradient-to-br from-[#00BCD4]/30 to-[#4FC3F7]/20 rounded-lg flex items-center justify-center">
                        <span className="text-white">After Photo</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-[#00BCD4] text-[#0B132B] py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#00BCD4]/25"
                    >
                      Get Similar Quote
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 border-2 border-[#00BCD4] text-[#00BCD4] py-4 rounded-lg font-bold text-lg hover:bg-[#00BCD4]/10 transition-all duration-300"
                    >
                      View All Projects
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Section */}
      <section className="py-20 bg-[#1A1F3A]/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold text-[#00BCD4] mb-2">500+</div>
              <div className="text-gray-300 text-lg">Projects Completed</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold text-[#00BCD4] mb-2">15+</div>
              <div className="text-gray-300 text-lg">Years Experience</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold text-[#00BCD4] mb-2">100%</div>
              <div className="text-gray-300 text-lg">Satisfaction Rate</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold text-[#00BCD4] mb-2">25+</div>
              <div className="text-gray-300 text-lg">Cities Served</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Create Your Dream Outdoor Space?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's discuss your project and create something amazing together.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#00BCD4] text-[#0B132B] px-8 py-4 rounded-lg font-bold text-lg shadow-lg shadow-[#00BCD4]/20 hover:shadow-[#00BCD4]/30 transition-all duration-300"
            >
              Start Your Project Today
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;
