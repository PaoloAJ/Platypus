"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Play,
  Check,
  ShieldCheck,
  Leaf,
  Droplets,
  Home as HomeIcon,
  Anchor,
  SprayCan,
  ChevronLeft,
  ChevronRight,
  Handshake,
  ClipboardList,
} from "lucide-react";
import LoadingScreen from "./components/LoadingScreen";

// ---------------- helpers ----------------
function useInView(opts = { threshold: 0.15 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setInView(true);
        io.disconnect();
      }
    }, opts);
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
}

function FadeRise({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`fade-rise ${inView ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const Eyebrow = ({ children, className = "" }) => (
  <div className={`eyebrow ${className}`}>{children}</div>
);

const StarRow = ({ value = 5, size = 16, color = "#FACC15" }) => (
  <div className="inline-flex items-center gap-0.5" style={{ color }}>
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={i < value ? "currentColor" : "rgba(250,204,21,0.18)"}
      >
        <path d="M12 2.5l2.9 6.5 7.1.7-5.4 4.8 1.6 7-6.2-3.7L5.8 21.5l1.6-7L2 9.7l7.1-.7L12 2.5Z" />
      </svg>
    ))}
  </div>
);

const GoogleIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path
      fill="#EA4335"
      d="M12 10.2v3.9h5.5c-.2 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6.2s2.7-6.2 6-6.2c1.9 0 3.1.8 3.9 1.5l2.7-2.6C16.8 3 14.6 2 12 2 6.9 2 2.8 6.1 2.8 11s4.1 9 9.2 9c5.3 0 8.8-3.7 8.8-8.9 0-.6 0-1-.2-1.9H12Z"
    />
  </svg>
);

const BbbIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <circle cx="12" cy="12" r="10" fill="#003366" />
    <text
      x="12"
      y="15"
      textAnchor="middle"
      fontSize="7"
      fontWeight="700"
      fill="#fff"
    >
      BBB
    </text>
  </svg>
);

// ---------------- HERO art ----------------
const BeforeArt = () => (
  <div className="absolute inset-0 water-bg">
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(70% 50% at 50% 70%, rgba(40,30,15,0.55), transparent 60%)",
      }}
    />
    <svg
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
    >
      <rect width="400" height="240" fill="#1A2742" />
      <rect y="240" width="400" height="260" fill="#0E1A2E" />
      <path d="M0 240 Q100 235 200 240 T400 240 V260 H0Z" fill="#152545" />
      {[40, 110, 180, 250, 320].map((x, i) => (
        <g key={i}>
          <rect x={x} y="170" width="14" height="180" fill="#4A3826" />
          <rect x={x - 2} y="170" width="18" height="6" fill="#2E2418" />
        </g>
      ))}
      <rect x="20" y="170" width="320" height="14" fill="#5C462E" />
      <rect x="20" y="170" width="320" height="14" fill="url(#stain)" opacity=".9" />
      <defs>
        <pattern id="stain" width="40" height="14" patternUnits="userSpaceOnUse">
          <rect width="40" height="14" fill="#4A3826" />
          <circle cx="8" cy="6" r="3" fill="#2A1F12" opacity=".7" />
          <circle cx="22" cy="9" r="4" fill="#3A2C1A" opacity=".8" />
          <circle cx="34" cy="4" r="2" fill="#2A1F12" opacity=".6" />
        </pattern>
      </defs>
      <rect x="20" y="178" width="320" height="6" fill="#2C5F3A" opacity=".7" />
      <path d="M40 170 L40 110 L110 60 L180 110 L180 170 Z" fill="#2A3550" opacity=".9" />
      <rect x="70" y="125" width="20" height="30" fill="#1A2742" />
      <rect x="135" y="125" width="20" height="30" fill="#1A2742" />
      <circle cx="240" cy="155" r="22" fill="#1E3A2A" opacity=".8" />
      <circle cx="280" cy="160" r="18" fill="#1E3A2A" opacity=".7" />
      <circle cx="320" cy="150" r="26" fill="#1E3A2A" opacity=".8" />
    </svg>
  </div>
);

const AfterArt = () => (
  <div className="absolute inset-0 water-bg-after">
    <svg
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
    >
      <rect width="400" height="240" fill="#1E3656" />
      <rect y="240" width="400" height="260" fill="#163455" />
      <path d="M0 240 Q100 235 200 240 T400 240 V270 H0Z" fill="#1B4068" />
      {[260, 290, 320, 350, 380, 410].map((y, i) => (
        <path
          key={i}
          d={`M0 ${y} Q100 ${y - 3} 200 ${y} T400 ${y}`}
          stroke="#7DD3FC"
          strokeWidth="1"
          fill="none"
          opacity={0.18 + i * 0.04}
        />
      ))}
      {[40, 110, 180, 250, 320].map((x, i) => (
        <g key={i}>
          <rect x={x} y="170" width="14" height="180" fill="#C9A57A" />
          <rect x={x - 2} y="170" width="18" height="6" fill="#A6824F" />
        </g>
      ))}
      <rect x="20" y="170" width="320" height="14" fill="#D9B989" />
      <rect x="20" y="170" width="320" height="14" fill="url(#wood)" opacity=".7" />
      <defs>
        <pattern id="wood" width="40" height="14" patternUnits="userSpaceOnUse">
          <rect width="40" height="14" fill="#D9B989" />
          <line x1="0" y1="6" x2="40" y2="6" stroke="#B0905F" strokeWidth=".5" />
          <line x1="20" y1="0" x2="20" y2="14" stroke="#B0905F" strokeWidth=".5" />
        </pattern>
      </defs>
      <path d="M40 170 L40 110 L110 60 L180 110 L180 170 Z" fill="#3E5074" />
      <rect x="70" y="125" width="20" height="30" fill="#7DD3FC" opacity=".7" />
      <rect x="135" y="125" width="20" height="30" fill="#7DD3FC" opacity=".7" />
      <path d="M40 110 L110 60 L180 110 Z" fill="#4D6390" />
      <circle cx="240" cy="155" r="22" fill="#2E5C3F" />
      <circle cx="280" cy="160" r="18" fill="#356945" />
      <circle cx="320" cy="150" r="26" fill="#3A7050" />
      <circle cx="350" cy="60" r="22" fill="#E5B97D" opacity=".85" />
      <circle cx="350" cy="60" r="34" fill="#E5B97D" opacity=".15" />
    </svg>
  </div>
);

// ---------------- HERO ----------------
function Hero() {
  const [baPos, setBaPos] = useState(54);
  const trackRef = useRef(null);
  const dragRef = useRef(false);

  const handleMove = (clientX) => {
    if (!trackRef.current) return;
    const r = trackRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100));
    setBaPos(pct);
  };

  useEffect(() => {
    const up = () => (dragRef.current = false);
    const move = (e) => {
      if (dragRef.current)
        handleMove(e.clientX || (e.touches?.[0]?.clientX ?? 0));
    };
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
    window.addEventListener("mousemove", move);
    window.addEventListener("touchmove", move, { passive: true });
    return () => {
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchend", up);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("touchmove", move);
    };
  }, []);

  return (
    <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-28 overflow-hidden">
      <div className="absolute inset-0 glow-cyan pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative">
        <FadeRise>
          <Eyebrow>Central Florida · Waterfront restoration</Eyebrow>
        </FadeRise>
        <div className="mt-5 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
          <div>
            <FadeRise delay={60}>
              <h1 className="display text-white">
                Reclaim your
                <br />
                <span className="text-[#00BCD4]">waterfront</span> —<br />
                chemical-free.
              </h1>
            </FadeRise>
            <FadeRise delay={140}>
              <p className="body-lg text-[#9CA3AF] mt-6 max-w-lg">
                Platypus Outdoor Solutions restores docks, seawalls, and
                lakefront homes across Central Florida — without the harsh
                chemicals. Most projects complete in under a week.
              </p>
            </FadeRise>
            <FadeRise delay={220}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/contact"
                  className="btn-cyan rounded-full px-6 py-3.5 font-semibold inline-flex items-center gap-2"
                >
                  Get my free quote <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/gallery"
                  className="btn-ghost rounded-full px-5 py-3.5 inline-flex items-center gap-2 font-medium"
                >
                  <Play className="w-4 h-4" />
                  See 30-second transformation
                </Link>
              </div>
            </FadeRise>

            <FadeRise delay={320}>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-[#9CA3AF]">
                <div className="flex items-center gap-2">
                  <GoogleIcon className="w-5 h-5" />
                  <StarRow value={5} size={14} />
                  <span className="text-[#EDEDED] font-semibold">4.9</span>
                  <span>· 87 reviews</span>
                </div>
                <div className="w-px h-4 bg-white/10" />
                <div className="flex items-center gap-2">
                  <BbbIcon className="w-5 h-5" />
                  <span>BBB A+ accredited</span>
                </div>
                <div className="w-px h-4 bg-white/10" />
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#7DD3FC]" />
                  <span>Licensed & insured since 2018</span>
                </div>
                <div className="w-px h-4 bg-white/10" />
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-[#7DD3FC]" />
                  <span>100+ Florida properties restored</span>
                </div>
              </div>
            </FadeRise>
          </div>

          {/* Hero before/after */}
          <FadeRise delay={180}>
            <div className="relative">
              <div className="absolute -inset-6 glow-cyan-strong pointer-events-none rounded-[3rem]" />
              <div
                className="relative rounded-3xl overflow-hidden border border-white/10"
                style={{
                  boxShadow:
                    "0 40px 80px -30px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,188,212,0.15)",
                }}
              >
                <div
                  ref={trackRef}
                  className="relative aspect-[4/5] sm:aspect-[5/6] select-none cursor-ew-resize"
                  onMouseDown={(e) => {
                    dragRef.current = true;
                    handleMove(e.clientX);
                  }}
                  onTouchStart={(e) => {
                    dragRef.current = true;
                    handleMove(e.touches[0].clientX);
                  }}
                >
                  <BeforeArt />
                  <div
                    className="absolute inset-0 ba-after"
                    style={{ "--ba": `${baPos}%` }}
                  >
                    <AfterArt />
                  </div>

                  <div className="absolute top-4 left-4 text-[11px] tracking-eyebrow uppercase font-semibold px-2.5 py-1 rounded-full bg-black/40 backdrop-blur border border-white/15">
                    Before
                  </div>
                  <div className="absolute top-4 right-4 text-[11px] tracking-eyebrow uppercase font-semibold px-2.5 py-1 rounded-full bg-[#00BCD4]/15 backdrop-blur border border-[#00BCD4]/40 text-[#7DD3FC]">
                    After
                  </div>

                  <div
                    className="absolute top-0 bottom-0 w-px bg-white/80 ba-handle pointer-events-none"
                    style={{ "--ba": `${baPos}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-white text-[#0B132B] flex items-center justify-center shadow-lg">
                      <ChevronLeft className="w-4 h-4" />
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="flex items-center justify-between text-[12px]">
                      <div className="flex items-center gap-2 text-[#EDEDED]">
                        <span className="w-2 h-2 rounded-full bg-[#00BCD4] pulse-dot inline-block"></span>
                        Live demo · drag the slider
                      </div>
                      <div className="text-[#9CA3AF]">
                        Lake Mary, FL · 3-day restore
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-4 hidden md:block">
                <div
                  className="bg-[#1A1F3A]/90 backdrop-blur border border-white/10 rounded-2xl px-4 py-3"
                  style={{
                    boxShadow:
                      "0 1px 0 rgba(255,255,255,0.04) inset, 0 30px 60px -30px rgba(0,0,0,0.6)",
                  }}
                >
                  <div className="text-[11px] tracking-eyebrow uppercase text-[#9CA3AF] font-semibold">
                    Avg. timeline
                  </div>
                  <div className="mt-1 text-2xl font-bold leading-none text-white">
                    4.2{" "}
                    <span className="text-base font-medium text-[#9CA3AF]">
                      days
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </FadeRise>
        </div>
      </div>
    </section>
  );
}

// ---------------- SOCIAL PROOF ----------------
function SocialProof() {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (!inView) return;
    const target = 127;
    let n = 0;
    const id = setInterval(() => {
      n += Math.max(1, Math.round((target - n) / 8));
      if (n >= target) {
        n = target;
        clearInterval(id);
      }
      setCount(n);
    }, 35);
    return () => clearInterval(id);
  }, [inView]);

  const towns = [
    "Lake Mary",
    "Winter Park",
    "Orlando",
    "Windermere",
    "Maitland",
    "Mount Dora",
    "Celebration",
    "Heathrow",
    "Longwood",
    "Oviedo",
  ];

  return (
    <section
      ref={ref}
      className="relative border-y border-[#1F2937]/70 py-10"
    >
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-[auto_1fr_auto] items-center gap-8">
        <div className="flex items-center gap-4">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00BCD4] inline-block pulse-dot"></span>
          <div>
            <div className="text-3xl font-bold leading-none tabular-nums text-white">
              {count}
            </div>
            <div className="text-[12px] text-[#9CA3AF] mt-1">
              properties restored this year
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div className="text-[11px] tracking-eyebrow uppercase font-semibold text-[#9CA3AF] mb-3">
            Trusted by communities in
          </div>
          <div
            className="relative overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
              WebkitMaskImage:
                "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
            }}
          >
            <div className="flex marquee-track gap-10 whitespace-nowrap">
              {[...towns, ...towns].map((t, i) => (
                <span
                  key={i}
                  className="text-[#EDEDED] text-[15px] font-medium inline-flex items-center gap-2"
                >
                  <Droplets className="w-3.5 h-3.5 text-[#7DD3FC]" />
                  {t}, FL
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5 text-[#9CA3AF]">
          {["Orlando Sentinel", "Florida Home", "Lake Living"].map((b) => (
            <div
              key={b}
              className="text-[12px] uppercase tracking-eyebrow font-semibold opacity-60 hover:opacity-100 transition"
            >
              {b}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------- BEFORE/AFTER cards ----------------
const DockBefore = () => (
  <svg
    viewBox="0 0 400 300"
    preserveAspectRatio="xMidYMid slice"
    className="absolute inset-0 w-full h-full"
  >
    <rect width="400" height="150" fill="#1A2742" />
    <rect y="150" width="400" height="150" fill="#0E1A2E" />
    {[30, 90, 150, 210, 270, 330].map((x, i) => (
      <rect key={i} x={x} y="120" width="12" height="120" fill="#3A2A1A" />
    ))}
    <rect x="20" y="115" width="350" height="12" fill="#4A3826" />
    <rect x="20" y="123" width="350" height="6" fill="#2C5F3A" opacity=".55" />
    <circle cx="80" cy="80" r="20" fill="#1E3A2A" opacity=".6" />
    <circle cx="320" cy="75" r="25" fill="#1E3A2A" opacity=".6" />
  </svg>
);
const DockAfter = () => (
  <svg
    viewBox="0 0 400 300"
    preserveAspectRatio="xMidYMid slice"
    className="absolute inset-0 w-full h-full"
  >
    <rect width="400" height="150" fill="#1E3656" />
    <rect y="150" width="400" height="150" fill="#163455" />
    {[180, 210, 240, 270].map((y, i) => (
      <path
        key={i}
        d={`M0 ${y} Q100 ${y - 2} 200 ${y} T400 ${y}`}
        stroke="#7DD3FC"
        strokeWidth="1"
        fill="none"
        opacity=".25"
      />
    ))}
    {[30, 90, 150, 210, 270, 330].map((x, i) => (
      <rect key={i} x={x} y="120" width="12" height="120" fill="#C9A57A" />
    ))}
    <rect x="20" y="115" width="350" height="12" fill="#D9B989" />
    <circle cx="80" cy="80" r="20" fill="#3A7050" />
    <circle cx="320" cy="75" r="25" fill="#3A7050" />
    <circle cx="350" cy="50" r="14" fill="#E5B97D" opacity=".9" />
  </svg>
);
const SeawallBefore = () => (
  <svg
    viewBox="0 0 400 300"
    preserveAspectRatio="xMidYMid slice"
    className="absolute inset-0 w-full h-full"
  >
    <rect width="400" height="180" fill="#1A2742" />
    <rect y="180" width="400" height="120" fill="#0E1A2E" />
    <rect x="0" y="160" width="400" height="40" fill="#3A4A66" />
    <rect x="0" y="160" width="400" height="40" fill="url(#crack)" />
    <defs>
      <pattern id="crack" width="60" height="40" patternUnits="userSpaceOnUse">
        <path
          d="M0 20 L20 18 L30 30 L60 22"
          stroke="#0E1A2E"
          strokeWidth=".8"
          fill="none"
        />
        <circle cx="40" cy="15" r="2" fill="#1F1A12" opacity=".7" />
      </pattern>
    </defs>
    <rect x="0" y="170" width="400" height="8" fill="#2C5F3A" opacity=".7" />
  </svg>
);
const SeawallAfter = () => (
  <svg
    viewBox="0 0 400 300"
    preserveAspectRatio="xMidYMid slice"
    className="absolute inset-0 w-full h-full"
  >
    <rect width="400" height="180" fill="#1E3656" />
    <rect y="180" width="400" height="120" fill="#163455" />
    <rect x="0" y="160" width="400" height="40" fill="#9CAEC4" />
    <rect x="0" y="160" width="400" height="2" fill="#C5D4E5" />
    {[210, 240, 270].map((y, i) => (
      <path
        key={i}
        d={`M0 ${y} Q80 ${y - 3} 200 ${y} T400 ${y}`}
        stroke="#7DD3FC"
        strokeWidth="1"
        fill="none"
        opacity=".3"
      />
    ))}
  </svg>
);
const RoofBefore = () => (
  <svg
    viewBox="0 0 400 300"
    preserveAspectRatio="xMidYMid slice"
    className="absolute inset-0 w-full h-full"
  >
    <rect width="400" height="120" fill="#1A2742" />
    <rect y="120" width="400" height="180" fill="#2A3550" />
    <path d="M50 180 L 200 80 L 350 180 L 350 260 L 50 260 Z" fill="#3E2E1F" />
    <path
      d="M50 180 L 200 80 L 350 180 L 350 260 L 50 260 Z"
      fill="url(#mold)"
      opacity=".7"
    />
    <defs>
      <pattern id="mold" width="30" height="30" patternUnits="userSpaceOnUse">
        <circle cx="10" cy="10" r="4" fill="#1F2F1A" opacity=".7" />
        <circle cx="22" cy="20" r="3" fill="#1A2410" opacity=".6" />
      </pattern>
    </defs>
  </svg>
);
const RoofAfter = () => (
  <svg
    viewBox="0 0 400 300"
    preserveAspectRatio="xMidYMid slice"
    className="absolute inset-0 w-full h-full"
  >
    <rect width="400" height="120" fill="#3E5074" />
    <rect y="120" width="400" height="180" fill="#4D6390" />
    <path d="M50 180 L 200 80 L 350 180 L 350 260 L 50 260 Z" fill="#7B5A3A" />
    <path
      d="M50 180 L 200 80 L 350 180"
      stroke="#A6824F"
      strokeWidth="3"
      fill="none"
    />
    <circle cx="350" cy="100" r="18" fill="#E5B97D" opacity=".9" />
  </svg>
);

function BASlider({ project }) {
  const [pos, setPos] = useState(50);
  const trackRef = useRef(null);
  const drag = useRef(false);

  const move = useCallback((clientX) => {
    const r = trackRef.current?.getBoundingClientRect();
    if (!r) return;
    const pct = Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100));
    setPos(pct);
  }, []);

  useEffect(() => {
    const up = () => (drag.current = false);
    const mv = (e) => {
      if (drag.current) move(e.clientX || e.touches?.[0]?.clientX || 0);
    };
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
    window.addEventListener("mousemove", mv);
    window.addEventListener("touchmove", mv);
    return () => {
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchend", up);
      window.removeEventListener("mousemove", mv);
      window.removeEventListener("touchmove", mv);
    };
  }, [move]);

  const Before = project.Before;
  const After = project.After;

  return (
    <div
      className="rounded-2xl overflow-hidden bg-[#1A1F3A] border border-[#1F2937]"
      style={{
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.04) inset, 0 30px 60px -30px rgba(0,0,0,0.6)",
      }}
    >
      <div
        ref={trackRef}
        className="relative aspect-[4/3] select-none cursor-ew-resize"
        onMouseDown={(e) => {
          drag.current = true;
          move(e.clientX);
        }}
        onTouchStart={(e) => {
          drag.current = true;
          move(e.touches[0].clientX);
        }}
      >
        <Before />
        <div className="absolute inset-0 ba-after" style={{ "--ba": `${pos}%` }}>
          <After />
        </div>
        <div className="absolute top-3 left-3 text-[10px] tracking-eyebrow uppercase font-semibold px-2 py-1 rounded-full bg-black/55 backdrop-blur border border-white/10">
          Before
        </div>
        <div className="absolute top-3 right-3 text-[10px] tracking-eyebrow uppercase font-semibold px-2 py-1 rounded-full bg-[#00BCD4]/15 border border-[#00BCD4]/40 text-[#7DD3FC]">
          After
        </div>
        <div
          className="absolute top-0 bottom-0 w-px bg-white/80 ba-handle"
          style={{ "--ba": `${pos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-[#0B132B] flex items-center justify-center shadow-lg">
            <ChevronLeft className="w-3.5 h-3.5" />
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="font-semibold text-[15px] text-white">
              {project.location}
            </div>
            <div className="text-[12.5px] text-[#9CA3AF] mt-0.5">
              {project.scope}
            </div>
          </div>
          <div className="text-[11px] uppercase tracking-eyebrow font-semibold text-[#7DD3FC]">
            {project.duration}
          </div>
        </div>
        <p className="text-[14px] text-[#9CA3AF] mt-3 italic">
          &ldquo;{project.quote}&rdquo;
        </p>
      </div>
    </div>
  );
}

function BeforeAfterSection() {
  const projects = [
    {
      location: "Lake Mary, FL",
      scope: "Dock & boat-lift restoration",
      duration: "3 days",
      quote:
        "Looks like a brand-new dock. Neighbors keep asking for our guy.",
      Before: DockBefore,
      After: DockAfter,
    },
    {
      location: "Windermere, FL",
      scope: "Concrete seawall + algae",
      duration: "2 days",
      quote: "Years of algae gone in two days, no harsh smell anywhere.",
      Before: SeawallBefore,
      After: SeawallAfter,
    },
    {
      location: "Winter Park, FL",
      scope: "Roof & exterior soft-wash",
      duration: "1 day",
      quote:
        "Curb appeal jumped overnight — buyers noticed at the open house.",
      Before: RoofBefore,
      After: RoofAfter,
    },
  ];

  return (
    <section id="work" className="py-24 lg:py-28 relative">
      <div className="max-w-6xl mx-auto px-6">
        <FadeRise>
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div>
              <Eyebrow>Recent transformations</Eyebrow>
              <h2 className="h2 mt-3 max-w-xl text-white">
                Drag any photo.{" "}
                <span className="text-[#9CA3AF]">See the difference.</span>
              </h2>
            </div>
            <div className="text-[#9CA3AF] text-[14px] max-w-xs">
              Each restoration is documented before, during and after — so you
              know exactly what you&apos;re paying for.
            </div>
          </div>
        </FadeRise>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <FadeRise key={i} delay={i * 80}>
              <BASlider project={p} />
            </FadeRise>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------- PROCESS ----------------
function Process() {
  const steps = [
    {
      n: "01",
      t: "Free quote",
      d: "Send photos or fill out a 60-second form. Estimate within 24 hours.",
      Icon: ClipboardList,
    },
    {
      n: "02",
      t: "On-site assessment",
      d: "We visit, measure, and walk you through the plan — no obligation.",
      Icon: HomeIcon,
    },
    {
      n: "03",
      t: "Eco-friendly restore",
      d: "Soft-wash, sealants, and biodegradable solutions. Most projects in under a week.",
      Icon: Leaf,
    },
    {
      n: "04",
      t: "Walkthrough & guarantee",
      d: "You sign off only when it's right. Backed by our 12-month guarantee.",
      Icon: Handshake,
    },
  ];

  return (
    <section
      id="process"
      className="py-24 lg:py-28 relative border-y border-[#1F2937]/60"
      style={{
        background:
          "linear-gradient(180deg, rgba(0,188,212,0.03), rgba(0,0,0,0))",
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <FadeRise>
          <div className="text-center max-w-2xl mx-auto">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="h2 mt-3 text-white">
              A simple process, start to finish.
            </h2>
            <p className="body-lg text-[#9CA3AF] mt-5">
              You stay in control at every step. No surprise invoices, no
              chemical smells, no contractor disappearing acts.
            </p>
          </div>
        </FadeRise>
        <div className="mt-14 relative">
          <div className="hidden lg:block absolute top-7 left-[6%] right-[6%] h-px bg-[#2A3350]"></div>
          <div
            className="hidden lg:block absolute top-7 left-[6%] right-[6%] h-px"
            style={{
              background:
                "linear-gradient(90deg, rgba(0,188,212,0.7), rgba(125,211,252,0.3), rgba(0,188,212,0.7))",
            }}
          ></div>
          <div className="grid lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((s, i) => {
              const Icon = s.Icon;
              return (
                <FadeRise key={i} delay={i * 80}>
                  <div className="relative flex flex-col items-start lg:items-center text-left lg:text-center">
                    <div
                      className="relative w-14 h-14 rounded-full flex items-center justify-center bg-[#0B132B] border-2 border-[#00BCD4] text-[#00BCD4] font-bold text-[15px]"
                      style={{
                        boxShadow:
                          "0 0 0 6px rgba(11,19,43,1), 0 0 24px -4px rgba(0,188,212,0.5)",
                      }}
                    >
                      {s.n}
                    </div>
                    <div className="mt-5 flex items-center gap-2">
                      <Icon className="w-4 h-4 text-[#7DD3FC]" />
                      <div className="font-semibold text-[18px] text-white">
                        {s.t}
                      </div>
                    </div>
                    <p className="text-[#9CA3AF] text-[14.5px] mt-2 max-w-[260px] leading-relaxed">
                      {s.d}
                    </p>
                  </div>
                </FadeRise>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------- SERVICES ----------------
function Services() {
  const services = [
    {
      title: "Lakefront Restoration",
      blurb:
        "Docks, seawalls, boat lifts and pavers, restored to original condition.",
      from: "$650",
      bullets: [
        "Soft-wash, no chemicals",
        "Sealants included",
        "Algae & oxidation removal",
      ],
      Icon: Anchor,
      popular: true,
    },
    {
      title: "House & Roof Soft-Wash",
      blurb:
        "Exterior siding, soffits, roof shingles, and gutters — safely cleaned.",
      from: "$450",
      bullets: [
        "No high-pressure damage",
        "Plant-safe rinse",
        "12-month no-streak guarantee",
      ],
      Icon: HomeIcon,
    },
    {
      title: "Driveway & Pressure Wash",
      blurb:
        "Concrete, pavers, pool decks and patios — including oil-stain treatment.",
      from: "$300",
      bullets: [
        "Same-day for small jobs",
        "Re-sanding for pavers",
        "Optional sealer",
      ],
      Icon: SprayCan,
    },
  ];

  return (
    <section id="services" className="py-24 lg:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <FadeRise>
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div>
              <Eyebrow>Services</Eyebrow>
              <h2 className="h2 mt-3 max-w-xl text-white">
                Built for Florida waterfront properties.
              </h2>
            </div>
            <Link
              href="/services"
              className="text-[#7DD3FC] text-[14px] hover:text-[#00BCD4] inline-flex items-center gap-1.5 group"
            >
              See full service list{" "}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </FadeRise>
        <div className="grid md:grid-cols-3 gap-5">
          {services.map((s, i) => {
            const Icon = s.Icon;
            return (
              <FadeRise key={i} delay={i * 80}>
                <div
                  className={`relative rounded-2xl border ${
                    s.popular ? "border-[#00BCD4]/40" : "border-[#1F2937]"
                  } bg-[#1A1F3A]/70 p-6 h-full transition hover:border-[#00BCD4]/60`}
                  style={
                    s.popular
                      ? {
                          boxShadow:
                            "0 30px 60px -30px rgba(0,188,212,0.4)",
                        }
                      : {}
                  }
                >
                  {s.popular && (
                    <div className="absolute -top-3 left-6 text-[10.5px] uppercase tracking-eyebrow font-bold px-2.5 py-1 rounded-full bg-[#E5B97D] text-[#0B132B]">
                      Most popular
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-[#00BCD4]/10 border border-[#00BCD4]/30 flex items-center justify-center text-[#7DD3FC]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] text-[#9CA3AF] uppercase tracking-eyebrow">
                        From
                      </div>
                      <div className="text-xl font-bold leading-none mt-1 text-white">
                        {s.from}
                      </div>
                    </div>
                  </div>
                  <h3 className="mt-5 text-[20px] font-semibold tracking-tight text-white">
                    {s.title}
                  </h3>
                  <p className="text-[#9CA3AF] text-[14.5px] mt-2 leading-relaxed">
                    {s.blurb}
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {s.bullets.map((b, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2.5 text-[14px]"
                      >
                        <Check className="w-4 h-4 text-[#00BCD4] mt-0.5 shrink-0" />
                        <span className="text-[#EDEDED]/90">{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-5 border-t border-[#1F2937]">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#00BCD4] hover:text-[#7DD3FC]"
                    >
                      Get a quote <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </FadeRise>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---------------- TESTIMONIALS ----------------
function Testimonials() {
  const reviews = [
    {
      name: "Margaret Sutton",
      loc: "Lake Mary, FL",
      stars: 5,
      quote:
        "After 14 years of green seawall, I had given up. Platypus had it looking new in 48 hours. Genuinely kind crew.",
      initials: "MS",
      tone: "#7DD3FC",
    },
    {
      name: "David Reyes",
      loc: "Winter Park, FL",
      stars: 5,
      quote:
        "They sent a real plan with photos before I paid a cent. No upsells, no surprises. House looks 10 years younger.",
      initials: "DR",
      tone: "#E5B97D",
    },
    {
      name: "Karen & Tom Albright",
      loc: "Windermere, FL",
      stars: 5,
      quote:
        "We were nervous about chemicals near our garden. Platypus walked us through every product — everything came back greener, not deader.",
      initials: "KA",
      tone: "#00BCD4",
    },
  ];

  return (
    <section id="reviews" className="py-24 lg:py-28 relative">
      <div className="max-w-6xl mx-auto px-6">
        <FadeRise>
          <div className="flex flex-col items-center text-center mb-12">
            <Eyebrow>What homeowners say</Eyebrow>
            <h2 className="h2 mt-3 max-w-2xl text-white">
              Rated 4.9 out of 5 across 87 Google reviews.
            </h2>
            <div className="mt-5 flex items-center gap-3">
              <StarRow value={5} size={22} />
              <span className="text-[26px] font-bold tabular-nums text-white">
                4.9
              </span>
              <span className="text-[#9CA3AF]">/ 5</span>
              <span className="w-px h-5 bg-white/15 mx-2"></span>
              <Link
                href="/reviews"
                className="inline-flex items-center gap-1.5 text-[#7DD3FC] text-[13.5px] hover:text-[#00BCD4]"
              >
                <GoogleIcon className="w-4 h-4" /> See all reviews
              </Link>
            </div>
          </div>
        </FadeRise>

        <div className="grid md:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <FadeRise key={i} delay={i * 80}>
              <article className="rounded-2xl bg-[#1A1F3A]/70 border border-[#1F2937] p-6 h-full flex flex-col">
                <StarRow value={r.stars} size={16} />
                <p className="text-[15.5px] leading-relaxed mt-4 text-[#EDEDED]/95 flex-1">
                  &ldquo;{r.quote}&rdquo;
                </p>
                <div className="mt-6 pt-5 border-t border-[#1F2937] flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-[#0B132B]"
                    style={{ background: r.tone }}
                  >
                    {r.initials}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-[14.5px] text-white">
                      {r.name}
                    </div>
                    <div className="text-[12.5px] text-[#9CA3AF]">{r.loc}</div>
                  </div>
                  <span className="text-[11px] uppercase tracking-eyebrow font-semibold text-[#7DD3FC] inline-flex items-center gap-1">
                    <GoogleIcon className="w-3.5 h-3.5" /> Verified
                  </span>
                </div>
              </article>
            </FadeRise>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------- SCARCITY / BOOKING ----------------
function Scarcity() {
  const today = 10;
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const fullDays = new Set([11, 12, 13, 14, 17, 18, 19, 20, 21]);
  const openDays = new Set([22, 25, 26, 27, 28]);
  const [picked, setPicked] = useState(25);

  return (
    <section id="quote" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 glow-cyan pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative">
        <div
          className="rounded-[2rem] border border-[#00BCD4]/25 bg-[#1A1F3A]/60 backdrop-blur p-8 lg:p-14 relative overflow-hidden"
          style={{
            boxShadow:
              "0 50px 100px -30px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,188,212,0.15)",
          }}
        >
          <div className="absolute -top-32 -right-32 w-[480px] h-[480px] glow-cyan-strong opacity-80 pointer-events-none"></div>
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center relative">
            <div>
              <FadeRise>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00BCD4]/10 border border-[#00BCD4]/30 text-[#7DD3FC] text-[12px] uppercase tracking-eyebrow font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00BCD4] pulse-dot inline-block"></span>
                  Booking 3 weeks out
                </div>
                <h2 className="h2 mt-5 max-w-md text-white">
                  Reserve your restoration slot.
                </h2>
                <p className="body-lg text-[#9CA3AF] mt-4 max-w-md">
                  We protect availability — only 4 active projects per crew at
                  a time. Pick a target start week and we&apos;ll send a free
                  quote within 24 hours.
                </p>
              </FadeRise>
              <FadeRise delay={120}>
                <form className="mt-7 grid sm:grid-cols-2 gap-3 max-w-md">
                  <input
                    className="rounded-xl bg-[#0B132B] border border-[#1F2937] px-4 py-3 text-[14.5px] text-white placeholder:text-[#6B7280] focus:border-[#00BCD4] outline-none"
                    placeholder="Full name"
                  />
                  <input
                    className="rounded-xl bg-[#0B132B] border border-[#1F2937] px-4 py-3 text-[14.5px] text-white placeholder:text-[#6B7280] focus:border-[#00BCD4] outline-none"
                    placeholder="Phone or email"
                  />
                  <select className="sm:col-span-2 rounded-xl bg-[#0B132B] border border-[#1F2937] px-4 py-3 text-[14.5px] text-[#9CA3AF] focus:border-[#00BCD4] outline-none">
                    <option>Property type — Lakefront home</option>
                    <option>Property type — Dock / seawall only</option>
                    <option>Property type — Driveway / exterior</option>
                  </select>
                  <button
                    type="button"
                    className="sm:col-span-2 btn-cyan rounded-xl px-5 py-3.5 font-semibold inline-flex items-center justify-center gap-2 mt-1"
                  >
                    Reserve May {picked}{" "}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
                <div className="mt-4 text-[12.5px] text-[#9CA3AF] flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#7DD3FC]" />
                  No spam. No deposit required. Free estimate in 24h.
                </div>
              </FadeRise>
            </div>

            <FadeRise delay={120}>
              <div className="rounded-2xl bg-[#0B132B]/70 border border-[#1F2937] p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-[11px] tracking-eyebrow uppercase text-[#9CA3AF] font-semibold">
                      Next available
                    </div>
                    <div className="text-[20px] font-semibold mt-1 text-white">
                      May 2026 — week of the {picked}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="w-8 h-8 rounded-full border border-[#1F2937] hover:border-[#00BCD4]/50 flex items-center justify-center text-[#9CA3AF] hover:text-[#EDEDED]">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 rounded-full border border-[#1F2937] hover:border-[#00BCD4]/50 flex items-center justify-center text-[#9CA3AF] hover:text-[#EDEDED]">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1.5 text-[11px] tracking-eyebrow uppercase text-[#6B7280] font-semibold text-center mb-2">
                  {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                    <div key={i}>{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={"b" + i} />
                  ))}
                  {days.map((d) => {
                    const isPast = d < today;
                    const isFull = fullDays.has(d);
                    const isOpen = openDays.has(d);
                    const isPicked = d === picked;
                    let cls = "cal-cell";
                    if (isPast) cls += " opacity-30";
                    else if (isFull) cls += " full";
                    else if (isOpen) cls += " open";
                    if (isPicked) cls += " selected";
                    return (
                      <div
                        key={d}
                        className={cls}
                        onClick={() => {
                          if (isOpen || isPicked) setPicked(d);
                        }}
                      >
                        {d}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 pt-4 border-t border-[#1F2937] flex items-center justify-between text-[12px] text-[#9CA3AF]">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-[#00BCD4]/15 border border-[#00BCD4]/35"></span>
                      Available
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-white/[0.03]"></span>
                      Booked
                    </span>
                  </div>
                  <span>{openDays.size} slots left this month</span>
                </div>
              </div>
            </FadeRise>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------- SERVICE AREA MAP ----------------
function ServiceArea() {
  return (
    <section className="py-20 lg:py-24 border-t border-[#1F2937]/60">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10">
          <FadeRise>
            <div>
              <Eyebrow>Service area</Eyebrow>
              <h3
                className="h2 mt-3 text-white"
                style={{ fontSize: "clamp(28px,3vw,36px)" }}
              >
                Central Florida waterfront, edge-to-edge.
              </h3>
              <p className="text-[#9CA3AF] mt-4 max-w-md">
                From Mount Dora down to Celebration — if it&apos;s a Central
                Florida lake, river or canal, we&apos;ve cleaned a property on
                it.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Orange", "Seminole", "Lake", "Osceola", "Volusia"].map(
                  (c) => (
                    <span
                      key={c}
                      className="text-[12.5px] px-3 py-1.5 rounded-full bg-[#1A1F3A] border border-[#1F2937] text-[#9CA3AF]"
                    >
                      {c} County
                    </span>
                  )
                )}
              </div>
            </div>
          </FadeRise>
          <FadeRise delay={80}>
            <div className="rounded-2xl border border-[#1F2937] overflow-hidden h-72 map-grid relative">
              <svg
                viewBox="0 0 400 280"
                className="absolute inset-0 w-full h-full"
              >
                <path
                  d="M60 60 Q90 40 140 60 T220 80 Q260 100 240 140 T180 160 Q120 170 80 140 Q40 110 60 60 Z"
                  fill="rgba(0,188,212,0.18)"
                  stroke="rgba(0,188,212,0.5)"
                  strokeWidth="1"
                />
                <path
                  d="M250 170 Q280 160 320 180 Q360 200 340 230 Q310 250 270 230 Q240 200 250 170 Z"
                  fill="rgba(0,188,212,0.18)"
                  stroke="rgba(0,188,212,0.5)"
                  strokeWidth="1"
                />
                <path
                  d="M70 200 Q100 195 140 210 Q170 230 150 250 Q120 260 90 245 Q60 225 70 200 Z"
                  fill="rgba(0,188,212,0.18)"
                  stroke="rgba(0,188,212,0.5)"
                  strokeWidth="1"
                />
                {[
                  [110, 90],
                  [200, 120],
                  [300, 210],
                  [120, 220],
                  [280, 80],
                ].map(([x, y], i) => (
                  <g key={i}>
                    <circle cx={x} cy={y} r="4" fill="#00BCD4" />
                    <circle
                      cx={x}
                      cy={y}
                      r="9"
                      fill="none"
                      stroke="#00BCD4"
                      strokeWidth="1"
                      opacity=".5"
                    />
                  </g>
                ))}
                <text
                  x="120"
                  y="100"
                  fontSize="9"
                  fill="#7DD3FC"
                  fontWeight="600"
                >
                  LAKE MARY
                </text>
                <text
                  x="210"
                  y="135"
                  fontSize="9"
                  fill="#7DD3FC"
                  fontWeight="600"
                >
                  WINTER PARK
                </text>
                <text
                  x="305"
                  y="225"
                  fontSize="9"
                  fill="#7DD3FC"
                  fontWeight="600"
                >
                  CELEBRATION
                </text>
                <text
                  x="125"
                  y="232"
                  fontSize="9"
                  fill="#7DD3FC"
                  fontWeight="600"
                >
                  WINDERMERE
                </text>
              </svg>
              <div className="absolute bottom-3 left-3 text-[11px] uppercase tracking-eyebrow font-semibold text-[#9CA3AF] bg-[#0B132B]/80 backdrop-blur px-2 py-1 rounded">
                Central FL service map
              </div>
            </div>
          </FadeRise>
        </div>
      </div>
    </section>
  );
}

// ---------------- ROOT ----------------
export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="bg-[#0B132B] relative">
      <Hero />
      <SocialProof />
      <BeforeAfterSection />
      <Process />
      <Services />
      <Testimonials />
      <Scarcity />
      <ServiceArea />
    </div>
  );
}
