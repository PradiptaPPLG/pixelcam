"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { THEMES, type ThemePreset } from "@/utils/theme";

/* ── Single gallery strip card ──────────────────────────────── */
function GalleryStrip({
  theme,
  index,
}: {
  theme: ThemePreset;
  index: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
      className="flex flex-col cursor-default shrink-0 snap-start w-[calc(50%-12px)] sm:w-[calc(33.333%-16px)] lg:w-[calc(20%-19.2px)]"
      aria-label={`Photo strip theme: ${theme.name}`}
    >
      {/* Strip card */}
      <div 
        className="w-full rounded-[16px] overflow-hidden border border-[#e5e7eb] shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
        style={{
          background: theme.style.paperPattern ?? theme.style.paper,
        }}
      >
        {/* Header */}
        <div
          className="h-8 flex items-center justify-center gap-2 px-3 mt-1"
        >
          <div className="w-1.5 h-1.5 rounded-full opacity-50" style={{ background: theme.style.accent }} />
          <span 
            className="text-[8px] font-mono tracking-[0.2em] uppercase"
            style={{ color: theme.style.topLabel }}
          >
            PixelCam
          </span>
          <div className="w-1.5 h-1.5 rounded-full opacity-50" style={{ background: theme.style.accent }} />
        </div>

        {/* Photo frames */}
        <div className="flex flex-col gap-[4px] p-[6px]">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="relative h-[80px] rounded-[8px] overflow-hidden"
              style={{
                boxShadow: `inset 0 0 0 ${theme.style.photoBorderWidth > 2 ? 2 : 1}px ${theme.style.photoBorder}`,
                backgroundColor: theme.style.dark ? "#111" : "#e5e7eb"
              }}
            >
              {/* Silhouette figure placeholder */}
              <div className="absolute bottom-0 inset-x-0 flex justify-center pb-2">
                <div
                  className="w-10 h-12 rounded-t-full"
                  style={{ backgroundColor: `${theme.style.accent}50` }}
                />
              </div>
              {/* Frame number */}
              <span
                className="absolute top-1.5 left-2 text-[8px] font-mono opacity-40"
                style={{ color: theme.style.dark ? "#fff" : "#000" }}
                aria-hidden="true"
              >
                {i + 1}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="h-8 flex items-center justify-center mb-1">
          <span 
            className="text-[8px] font-mono tracking-[0.15em] uppercase"
            style={{ color: theme.style.bottomLabel }}
          >
            {theme.name}
          </span>
        </div>
      </div>

      {/* Theme label */}
      <p className="mt-2.5 text-center text-[12px] text-[#6b7280] font-medium">
        {theme.name}
      </p>
    </motion.div>
  );
}

/* ── GallerySection ─────────────────────────────────────────── */
export default function GallerySection() {
  const titleRef   = useRef<HTMLDivElement>(null);
  const scrollRef  = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-40px" });

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <section
      id="gallery"
      className="py-24 md:py-[96px] bg-[#fafafa] border-t border-[#e5e7eb] overflow-hidden"
      aria-labelledby="gallery-heading"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header with Controls */}
        <motion.div
          ref={titleRef}
          className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 mb-12 text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div>
            <span className="text-label">Gallery</span>
            <h2 id="gallery-heading" className="text-heading mt-3">
              Explore the themes
            </h2>
            <p className="text-[#6b7280] text-[16px] max-w-sm leading-relaxed mt-3">
              25 hand-crafted aesthetics, each designed to make your photos feel intentional.
            </p>
          </div>
          <div className="hidden md:flex gap-3">
            <button
              onClick={scrollLeft}
              className="grid h-12 w-12 place-items-center rounded-full border border-[#e5e7eb] dark:border-[#52525b] bg-white dark:bg-[#3f3f46] text-[#111] dark:text-white hover:bg-[#f3f4f6] dark:hover:bg-[#52525b] transition-colors shadow-sm"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={scrollRight}
              className="grid h-12 w-12 place-items-center rounded-full border border-[#e5e7eb] dark:border-[#52525b] bg-white dark:bg-[#3f3f46] text-[#111] dark:text-white hover:bg-[#f3f4f6] dark:hover:bg-[#52525b] transition-colors shadow-sm"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </motion.div>

        {/* Slider */}
        <div className="relative -mx-6 px-6 lg:mx-0 lg:px-0">
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {THEMES.map((theme, i) => (
              <GalleryStrip key={theme.id} theme={theme} index={i} />
            ))}
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden justify-center gap-4 mt-2">
          <button
            onClick={scrollLeft}
            className="grid h-12 w-12 place-items-center rounded-full border border-[#e5e7eb] bg-white text-[#111] hover:bg-[#f3f4f6] transition-colors shadow-sm"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={scrollRight}
            className="grid h-12 w-12 place-items-center rounded-full border border-[#e5e7eb] bg-white text-[#111] hover:bg-[#f3f4f6] transition-colors shadow-sm"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
