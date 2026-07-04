"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ── Gallery strip data ─────────────────────────────────────── */
const STRIPS = [
  {
    id: "gallery-pink",
    theme: "Pink Bloom",
    accentColor: "#f9a8d4",
    headerBg: "#ec4899",
    frames: ["#fce7f3", "#fbcfe8", "#f9a8d4", "#f472b6"],
  },
  {
    id: "gallery-cream",
    theme: "Cream Latte",
    accentColor: "#fde68a",
    headerBg: "#92400e",
    frames: ["#fffbeb", "#fef3c7", "#fde68a", "#fcd34d"],
  },
  {
    id: "gallery-black",
    theme: "Noir Film",
    accentColor: "#6b7280",
    headerBg: "#111111",
    frames: ["#f9fafb", "#e5e7eb", "#d1d5db", "#9ca3af"],
  },
  {
    id: "gallery-mint",
    theme: "Mint Garden",
    accentColor: "#6ee7b7",
    headerBg: "#065f46",
    frames: ["#ecfdf5", "#d1fae5", "#a7f3d0", "#6ee7b7"],
  },
  {
    id: "gallery-sky",
    theme: "Sky Dream",
    accentColor: "#93c5fd",
    headerBg: "#1e3a8a",
    frames: ["#eff6ff", "#dbeafe", "#bfdbfe", "#93c5fd"],
  },
  {
    id: "gallery-peach",
    theme: "Peach Sunset",
    accentColor: "#fdba74",
    headerBg: "#9a3412",
    frames: ["#fff7ed", "#ffedd5", "#fed7aa", "#fdba74"],
  },
] as const;

/* ── Single gallery strip card ──────────────────────────────── */
function GalleryStrip({
  strip,
  index,
}: {
  strip: (typeof STRIPS)[number];
  index: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.07, ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
      className="flex flex-col cursor-default"
      aria-label={`Photo strip theme: ${strip.theme}`}
    >
      {/* Strip card */}
      <div className="w-full rounded-[16px] overflow-hidden border border-[#e5e7eb] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
        {/* Header */}
        <div
          className="h-8 flex items-center justify-center gap-2 px-3"
          style={{ backgroundColor: strip.headerBg }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white opacity-50" />
          <span className="text-[8px] text-white/70 font-mono tracking-[0.2em] uppercase">
            PixelCam
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-white opacity-50" />
        </div>

        {/* Photo frames */}
        <div className="flex flex-col gap-[4px] p-[6px]">
          {strip.frames.map((color, i) => (
            <div
              key={i}
              className="relative h-[80px] rounded-[8px] overflow-hidden"
              style={{ backgroundColor: color }}
            >
              {/* Silhouette figure placeholder */}
              <div className="absolute bottom-0 inset-x-0 flex justify-center pb-2">
                <div
                  className="w-10 h-12 rounded-t-full"
                  style={{ backgroundColor: `${strip.accentColor}50` }}
                />
              </div>
              {/* Frame number */}
              <span
                className="absolute top-1.5 left-2 text-[8px] font-mono opacity-40"
                aria-hidden="true"
              >
                {i + 1}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          className="h-8 flex items-center justify-center"
          style={{ backgroundColor: strip.headerBg }}
        >
          <span className="text-[8px] text-white/60 font-mono tracking-[0.15em] uppercase">
            {strip.theme}
          </span>
        </div>
      </div>

      {/* Theme label */}
      <p className="mt-2.5 text-center text-[12px] text-[#6b7280] font-medium">
        {strip.theme}
      </p>
    </motion.div>
  );
}

/* ── GallerySection ─────────────────────────────────────────── */
export default function GallerySection() {
  const titleRef   = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-40px" });

  return (
    <section
      id="gallery"
      className="py-24 md:py-[96px] bg-[#fafafa] border-t border-[#e5e7eb]"
      aria-labelledby="gallery-heading"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={titleRef}
          className="flex flex-col items-center text-center gap-3 mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <span className="text-label">Gallery</span>
          <h2 id="gallery-heading" className="text-heading">
            Explore the themes
          </h2>
          <p className="text-[#6b7280] text-[16px] max-w-sm leading-relaxed">
            Six hand-crafted aesthetics, each designed to make your photos feel intentional.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {STRIPS.map((strip, i) => (
            <GalleryStrip key={strip.id} strip={strip} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
