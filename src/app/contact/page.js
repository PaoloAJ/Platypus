"use client";

import React, { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { ArrowRight, ShieldCheck, Check } from "lucide-react";

const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK || "your-username/30min";

function Contact() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark",
        styles: { branding: { brandColor: "#00BCD4" } },
        hideEventTypeDetails: false,
      });
    })();
  }, []);

  return (
    <section
      id="quote"
      className="relative overflow-hidden pt-32 sm:pt-36 lg:pt-40 pb-16 lg:pb-24 bg-[#0B132B] px-5 sm:px-6"
    >
      <div className="absolute inset-0 glow-cyan pointer-events-none" />
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#00BCD4]/[0.05] blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <div
          className="rounded-[1.5rem] sm:rounded-[2rem] border border-[#00BCD4]/20 bg-[#1A1F3A]/40 backdrop-blur p-6 sm:p-8 lg:p-12 xl:p-14 relative overflow-hidden"
          style={{
            boxShadow:
              "0 50px 100px -30px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,188,212,0.1)",
          }}
        >
          <div className="absolute -top-32 -right-32 w-[480px] h-[480px] glow-cyan-strong opacity-60 pointer-events-none" />

          <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-12 items-start relative">
            <div className="lg:pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00BCD4]/10 border border-[#00BCD4]/25 text-[#7DD3FC] text-[11.5px] uppercase tracking-[0.18em] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00BCD4] pulse-dot" />
                Booking 3 weeks out
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] mt-5 text-white">
                Reserve your{" "}
                <span className="text-[#00BCD4]">restoration slot.</span>
              </h1>

              <p className="text-[16px] sm:text-[17px] text-gray-400 mt-5 max-w-md leading-relaxed">
                We protect availability — only 4 active projects per crew at a
                time. Pick a time below and we&apos;ll send a free quote within
                24 hours.
              </p>

              <ul className="mt-7 space-y-3.5 max-w-md">
                {[
                  "Free estimate in 24 hours — no deposit required.",
                  "Chemical-free soft-wash and seawall restoration.",
                  "Family-owned, licensed and insured in Central Florida.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[14.5px] text-gray-200">
                    <div className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-[#00BCD4]/15 border border-[#00BCD4]/30 flex items-center justify-center">
                      <Check className="w-3 h-3 text-[#00BCD4]" strokeWidth={3} />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex items-center gap-2 text-[12.5px] text-gray-500">
                <ShieldCheck className="w-3.5 h-3.5 text-[#7DD3FC]" />
                No spam. No deposit required. Free estimate in 24h.
              </div>
            </div>

            <div className="rounded-2xl bg-[#0B132B]/70 border border-white/[0.06] p-3 sm:p-4 relative">
              <div className="flex items-center justify-between mb-3 px-2 pt-1">
                <div>
                  <div className="text-[11px] tracking-[0.14em] uppercase text-gray-500 font-semibold">
                    Pick a time
                  </div>
                  <div className="text-[17px] sm:text-[18px] font-semibold mt-1 text-white">
                    Get a free quote
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#7DD3FC]" />
              </div>
              <div className="overflow-hidden rounded-xl bg-[#0B132B]">
                <Cal
                  calLink={CAL_LINK}
                  style={{
                    width: "100%",
                    height: "560px",
                    overflow: "scroll",
                  }}
                  config={{ layout: "month_view", theme: "dark" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
