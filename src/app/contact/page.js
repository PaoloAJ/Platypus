"use client";

import React, { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { ArrowRight, ShieldCheck } from "lucide-react";

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
      className="relative overflow-hidden pt-36 pb-24 lg:pt-44 lg:pb-32 bg-[#0B132B]"
    >
      <div className="absolute inset-0 glow-cyan pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div
          className="rounded-[2rem] border border-cyan-brand/25 bg-ink-800/60 backdrop-blur p-8 lg:p-14 relative overflow-hidden"
          style={{
            boxShadow:
              "0 50px 100px -30px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,188,212,0.15)",
          }}
        >
          <div className="absolute -top-32 -right-32 w-[480px] h-[480px] glow-cyan-strong opacity-80 pointer-events-none" />

          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center relative">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-brand/10 border border-cyan-brand/30 text-cyan-soft text-[12px] uppercase tracking-eyebrow font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-brand pulse-dot inline-block" />
                Booking 3 weeks out
              </div>

              <h1 className="h2 mt-5 max-w-md">Reserve your restoration slot.</h1>

              <p className="body-lg text-fg-mute mt-4 max-w-md">
                We protect availability — only 4 active projects per crew at a
                time. Pick a time below and we&apos;ll send a free quote within
                24 hours.
              </p>

              <ul className="mt-7 space-y-3 max-w-md">
                <li className="flex items-start gap-3 text-[14.5px] text-fg">
                  <ArrowRight className="w-4 h-4 mt-1 text-cyan-brand shrink-0" />
                  Free estimate in 24 hours — no deposit required.
                </li>
                <li className="flex items-start gap-3 text-[14.5px] text-fg">
                  <ArrowRight className="w-4 h-4 mt-1 text-cyan-brand shrink-0" />
                  Chemical-free soft-wash and seawall restoration.
                </li>
                <li className="flex items-start gap-3 text-[14.5px] text-fg">
                  <ArrowRight className="w-4 h-4 mt-1 text-cyan-brand shrink-0" />
                  Family-owned, licensed and insured in Central Florida.
                </li>
              </ul>

              <div className="mt-7 text-[12.5px] text-fg-mute flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-soft" />
                No spam. No deposit required. Free estimate in 24h.
              </div>
            </div>

            <div className="rounded-2xl bg-ink-950/70 border border-line p-3 lg:p-4 relative">
              <div className="flex items-center justify-between mb-3 px-2 pt-1">
                <div>
                  <div className="text-[11px] tracking-eyebrow uppercase text-fg-mute font-semibold">
                    Pick a time
                  </div>
                  <div className="text-[18px] font-semibold mt-1">
                    Get a free quote
                  </div>
                </div>
              </div>
              <div className="overflow-hidden rounded-xl">
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
