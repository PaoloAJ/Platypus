"use client";

import { useCallback, useRef, useState } from "react";
import { Upload, Loader2, Trash2, RotateCcw } from "lucide-react";
import { Button } from "./ui";

const DEFAULT = { src: "", focalX: 50, focalY: 50, zoom: 1 };

export default function ImageField({
  label,
  hint,
  value,
  onChange,
  aspect = 4 / 3,
}) {
  const v = { ...DEFAULT, ...(value || {}) };
  const fileRef = useRef(null);
  const previewRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const draggingRef = useRef(false);

  const update = (patch) => onChange({ ...v, ...patch });

  const pickFile = () => fileRef.current?.click();

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/cms/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      update({ src: data.src, focalX: 50, focalY: 50, zoom: 1 });
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const setFocalFromEvent = useCallback(
    (clientX, clientY) => {
      const el = previewRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100));
      const y = Math.max(0, Math.min(100, ((clientY - r.top) / r.height) * 100));
      update({ focalX: Math.round(x), focalY: Math.round(y) });
    },
    [v.focalX, v.focalY] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const onPointerDown = (e) => {
    if (!v.src) return;
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    setFocalFromEvent(e.clientX, e.clientY);
  };
  const onPointerMove = (e) => {
    if (!draggingRef.current) return;
    setFocalFromEvent(e.clientX, e.clientY);
  };
  const onPointerUp = (e) => {
    draggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  const clear = () => {
    if (!confirm("Remove this image?")) return;
    update({ ...DEFAULT });
  };

  const reset = () => update({ ...v, focalX: 50, focalY: 50, zoom: 1 });

  return (
    <div className="block">
      {label && (
        <span className="block text-[12px] tracking-eyebrow uppercase font-semibold text-[#9CA3AF] mb-1.5">
          {label}
        </span>
      )}

      <div
        ref={previewRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        className="relative rounded-xl overflow-hidden border border-[#1F2937] bg-[#0B132B] select-none touch-none"
        style={{ aspectRatio: aspect }}
      >
        {v.src ? (
          <>
            <img
              src={v.src}
              alt=""
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              style={{
                objectPosition: `${v.focalX}% ${v.focalY}%`,
                transform: v.zoom !== 1 ? `scale(${v.zoom})` : undefined,
                transformOrigin: `${v.focalX}% ${v.focalY}%`,
              }}
              draggable={false}
            />
            <div
              className="absolute w-6 h-6 rounded-full border-2 border-white shadow-[0_0_0_2px_rgba(0,0,0,0.4)] pointer-events-none"
              style={{
                left: `${v.focalX}%`,
                top: `${v.focalY}%`,
                transform: "translate(-50%, -50%)",
                background: "rgba(0,188,212,0.55)",
              }}
            />
            <div className="absolute bottom-0 inset-x-0 px-3 py-2 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-between text-[11px] text-white/80 pointer-events-none">
              <span>Click or drag to set focal point</span>
              <span className="font-mono">
                {v.focalX}% · {v.focalY}%
              </span>
            </div>
          </>
        ) : (
          <button
            type="button"
            onClick={pickFile}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[#6B7280] hover:text-[#7DD3FC] hover:bg-[#1A1F3A]/30 transition"
          >
            {uploading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Upload className="w-6 h-6" />
            )}
            <span className="text-[12.5px]">
              {uploading ? "Uploading…" : "Click to upload an image"}
            </span>
            <span className="text-[11px] text-[#4B5563]">
              JPEG · PNG · WebP · AVIF (≤ 12 MB)
            </span>
          </button>
        )}
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        onChange={handleFile}
        className="hidden"
      />

      {v.src && (
        <div className="mt-3 space-y-3">
          <div>
            <div className="flex items-center justify-between text-[11.5px] text-[#9CA3AF] mb-1">
              <span>Zoom</span>
              <span className="font-mono">{v.zoom.toFixed(2)}×</span>
            </div>
            <input
              type="range"
              min={1}
              max={3}
              step={0.05}
              value={v.zoom}
              onChange={(e) => update({ zoom: Number(e.target.value) })}
              className="w-full accent-[#00BCD4]"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="ghost" onClick={pickFile} disabled={uploading}>
              {uploading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Upload className="w-3.5 h-3.5" />
              )}
              Replace
            </Button>
            <Button variant="subtle" onClick={reset}>
              <RotateCcw className="w-3.5 h-3.5" />
              Reset crop
            </Button>
            <Button variant="danger" onClick={clear} className="ml-auto">
              <Trash2 className="w-3.5 h-3.5" />
              Remove
            </Button>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-2 text-[12px] text-red-400">{error}</div>
      )}
      {hint && !error && (
        <div className="mt-2 text-[11.5px] text-[#6B7280]">{hint}</div>
      )}
    </div>
  );
}
