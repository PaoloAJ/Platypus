"use client";

import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";

export function PageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="flex items-start justify-between gap-6 mb-8 flex-wrap">
      <div>
        {eyebrow && (
          <div className="text-[11px] tracking-eyebrow uppercase text-[#7DD3FC] font-semibold mb-2">
            {eyebrow}
          </div>
        )}
        <h1 className="text-[28px] lg:text-[32px] font-bold leading-tight tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-[#9CA3AF] mt-2 max-w-2xl text-[14.5px]">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}

export function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-[#1F2937] bg-[#1A1F3A]/40 backdrop-blur p-5 lg:p-6 ${className}`}
    >
      {children}
    </div>
  );
}

export function Field({ label, hint, children, span = 1 }) {
  const spanClass = span === 2 ? "sm:col-span-2" : "";
  return (
    <label className={`block ${spanClass}`}>
      <span className="block text-[12px] tracking-eyebrow uppercase font-semibold text-[#9CA3AF] mb-1.5">
        {label}
      </span>
      {children}
      {hint && <span className="block text-[11.5px] text-[#6B7280] mt-1">{hint}</span>}
    </label>
  );
}

export function TextInput({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl bg-[#0B132B] border border-[#1F2937] px-3.5 py-2.5 text-[14px] text-white placeholder:text-[#6B7280] focus:border-[#00BCD4] focus:outline-none transition ${className}`}
    />
  );
}

export function TextArea({ className = "", rows = 3, ...props }) {
  return (
    <textarea
      {...props}
      rows={rows}
      className={`w-full rounded-xl bg-[#0B132B] border border-[#1F2937] px-3.5 py-2.5 text-[14px] text-white placeholder:text-[#6B7280] focus:border-[#00BCD4] focus:outline-none transition resize-y ${className}`}
    />
  );
}

export function Select({ className = "", children, ...props }) {
  return (
    <select
      {...props}
      className={`w-full rounded-xl bg-[#0B132B] border border-[#1F2937] px-3.5 py-2.5 text-[14px] text-white focus:border-[#00BCD4] focus:outline-none transition ${className}`}
    >
      {children}
    </select>
  );
}

export function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="inline-flex items-center gap-3 text-[14px] text-white"
    >
      <span
        className={`relative w-10 h-6 rounded-full transition border ${
          checked ? "bg-[#00BCD4] border-[#00BCD4]" : "bg-[#0B132B] border-[#1F2937]"
        }`}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition ${
            checked ? "left-[18px]" : "left-0.5"
          }`}
        />
      </span>
      {label}
    </button>
  );
}

export function Button({ variant = "primary", className = "", children, ...props }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[14px] font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-[#00BCD4] text-[#0B132B] hover:scale-[1.02]",
    ghost: "border border-[#1F2937] text-white hover:border-[#00BCD4]/60 hover:text-[#00BCD4]",
    danger: "border border-red-500/40 text-red-400 hover:bg-red-500/10",
    subtle: "text-[#9CA3AF] hover:text-white",
  };
  return (
    <button {...props} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}

export function SaveBar({ dirty, saving, onSave, onReset, lastSavedAt }) {
  return (
    <div
      className={`sticky bottom-4 z-20 transition-all ${
        dirty ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <div className="rounded-2xl border border-[#00BCD4]/30 bg-[#0B132B]/95 backdrop-blur px-4 py-3 flex items-center justify-between gap-4 shadow-[0_20px_60px_-15px_rgba(0,188,212,0.4)]">
        <div className="text-[13px] text-[#9CA3AF]">
          {saving ? "Saving…" : "Unsaved changes"}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={onReset} disabled={saving}>
            Discard
          </Button>
          <Button onClick={onSave} disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            Save changes
          </Button>
        </div>
      </div>
    </div>
  );
}

export function Toast({ message, type = "success", onDismiss }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onDismiss, 3000);
    return () => clearTimeout(t);
  }, [message, onDismiss]);

  if (!message) return null;

  const color =
    type === "success"
      ? "border-[#00BCD4]/40 text-[#7DD3FC]"
      : "border-red-500/40 text-red-400";

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`rounded-xl border ${color} bg-[#0B132B]/95 backdrop-blur px-4 py-3 text-[13.5px] shadow-xl`}>
        {message}
      </div>
    </div>
  );
}

export function useDirtyState(initial) {
  const [data, setData] = useState(initial);
  const [saved, setSaved] = useState(initial);
  const dirty = JSON.stringify(data) !== JSON.stringify(saved);
  return { data, setData, saved, setSaved, dirty };
}
