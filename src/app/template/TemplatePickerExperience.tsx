"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import { TEMPLATE_PRESETS } from "@/data/templatesData";
import { saveTemplateId } from "@/utils/template";
import { LayoutTemplate, ChevronLeft, SkipForward, Check } from "lucide-react";

export default function TemplatePickerExperience() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  /** Select a template and navigate to camera */
  const handlePick = (id: string) => {
    setSelectedId(id);
    saveTemplateId(id);
    router.push("/camera");
  };

  const handleBack = () => {
    router.back();
  };

  const handleSkip = () => {
    saveTemplateId(null);
    router.push("/booth");
  };

  return (
    <section className="flex-1 bg-[#FAFAFA] dark:bg-[#0D0D0F] min-h-screen">
      <Container className="py-8 sm:py-12">

        {/* ── Page Header ───────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-6 mb-8">
          {/* Left: labels */}
          <div>
            <span className="flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#6B7280] dark:text-[#71717a] mb-2">
              <LayoutTemplate className="h-3 w-3" aria-hidden="true" />
              Templates
            </span>
            <h1 className="text-[26px] sm:text-[30px] font-bold tracking-[-0.02em] text-[#111111] dark:text-[#f4f4f5] leading-tight">
              Pick a frame
            </h1>
            <p className="text-[13px] text-[#6B7280] dark:text-[#a1a1aa] mt-1.5 leading-relaxed max-w-xs">
              Click any template to use it. Your photos will be placed
              automatically inside.
            </p>
          </div>

          {/* Right: Back + Skip */}
          <div className="flex items-center gap-2 shrink-0 pt-1">
            <button
              onClick={handleBack}
              className="flex items-center gap-1 px-3.5 py-2 rounded-xl border border-[#E5E7EB] dark:border-[#27272a] text-[13px] font-medium text-[#374151] dark:text-[#d4d4d8] bg-white dark:bg-[#18181b] hover:bg-gray-50 dark:hover:bg-[#27272a] transition-colors shadow-sm"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Back
            </button>
            <button
              onClick={handleSkip}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#111111] dark:bg-white text-white dark:text-[#111111] text-[13px] font-semibold hover:bg-[#333] dark:hover:bg-[#e5e5e5] transition-colors shadow-sm"
            >
              <SkipForward className="w-3.5 h-3.5" />
              Skip
            </button>
          </div>
        </div>

        {/* ── Template Grid ──────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
          {TEMPLATE_PRESETS.map((template) => {
            const isSelected = selectedId === template.id;
            // Use the template's natural aspect ratio to size the card correctly
            // aspectRatio is width/height from data, so for portrait strips it will be < 1
            const isPortrait = template.aspectRatio < 1;
            const isWide = template.aspectRatio > 1.2;

            return (
              <motion.button
                key={template.id}
                onClick={() => handlePick(template.id)}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
                className={`relative flex flex-col rounded-[16px] overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2 shadow-[0_2px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.4)] transition-shadow hover:shadow-[0_8px_28px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_8px_28px_rgba(0,0,0,0.6)] ${
                  isSelected
                    ? "ring-[3px] ring-[#4F46E5] ring-offset-2"
                    : "ring-0"
                }`}
                aria-label={`Use template: ${template.name}`}
                aria-pressed={isSelected}
              >
                {/* Full-bleed thumbnail */}
                <div
                  className="relative w-full overflow-hidden bg-[#1a1a1a]"
                  style={{
                    // For portrait strips show as portrait, for wide ones adapt
                    aspectRatio: isWide ? "4/3" : isPortrait ? "9/14" : "3/4",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={template.previewSrc}
                    alt={template.name}
                    className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-300"
                    loading="lazy"
                  />

                  {/* Bottom gradient overlay for text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                  {/* Name + description overlaid at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-[13px] font-bold text-white leading-tight drop-shadow-sm">
                      {template.name}
                    </p>
                    <p className="text-[11px] text-white/70 mt-0.5 leading-snug line-clamp-2">
                      {template.description}
                    </p>
                  </div>

                  {/* Selected checkmark badge */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ type: "spring", stiffness: 480, damping: 28 }}
                        className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-[#4F46E5] flex items-center justify-center shadow-lg"
                      >
                        <Check className="w-4 h-4 text-white" strokeWidth={2.5} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
