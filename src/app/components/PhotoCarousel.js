"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = [
  {
    src: "/backyard1.jpeg",
    label: "Backyard Cleanup",
    href: "/services/backyard",
  },
  {
    src: "/backyard2.jpeg",
    label: "Backyard Cleanup",
    href: "/services/landscaping",
  },
  { src: "/dock1.jpeg", label: "Dock Restoration", href: "/services/dock" },
  { src: "/dock2.jpeg", label: "Dock Restoration", href: "/services/dock" },
  {
    src: "/dock3.jpeg",
    label: "Dock Restoration",
    href: "/services/environmental",
  },
  { src: "/dock4.jpeg", label: "Dock Restoration", href: "/services/deck" },
  {
    src: "/dock5.jpeg",
    label: "Dock Restoration",
    href: "/services/waterfront",
  },
  {
    src: "/driveway1.jpeg",
    label: "Driveway Pressure Wash",
    href: "/services/driveway",
  },
  {
    src: "/driveway2.jpeg",
    label: "Driveway Pressure Wash",
    href: "/services/driveway",
  },
  {
    src: "/driveway3.jpeg",
    label: "Driveway Pressure Wash",
    href: "/services/driveway",
  },
  {
    src: "/sidewalk1.jpeg",
    label: "Sidewalk Cleanup",
    href: "/services/sidewalk",
  },
  { src: "/stairs1.jpeg", label: "Stairway Care", href: "/services/stairs" },
];

export default function PhotoCarousel() {
  return (
    <div className="w-full p-2">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={2}
        slidesPerGroup={2}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="rounded-xl shadow-lg"
      >
        {images.map(({ src, label, href }, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-80 overflow-hidden rounded-xl group">
              <img
                src={src}
                alt={label}
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <Link
                href={href}
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
              >
                <div className="bg-white/90 text-[#01579B] text-lg font-semibold px-4 py-2 rounded shadow">
                  {label}
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
