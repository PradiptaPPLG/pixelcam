"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import { TEMPLATE_PRESETS } from "@/data/templatesData";
import { saveTemplateId } from "@/utils/template";
import { LayoutTemplate, ChevronLeft, SkipForward, Check, TrendingUp, Camera, Star, Sparkles } from "lucide-react";

export default function TemplatePickerExperience() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const officialTemplates = TEMPLATE_PRESETS.filter((t) => t.official);
  const trendingTemplates = TEMPLATE_PRESETS.filter((t) => t.trending);
  const exclusiveTemplates = TEMPLATE_PRESETS.filter((t) => t.exclusive);
  const classicTemplates = TEMPLATE_PRESETS.filter((t) => !t.official && !t.trending && !t.exclusive);

  const handlePick = (id: string) => {
    setSelectedId(id);
    saveTemplateId(id);
    router.push("/camera");
  };

  const handleBack = () => router.back();
  const handleSkip = () => {
    saveTemplateId(null);
    router.push("/booth");
  };

  return (
    <section className="flex-1 bg-[#FAFAFA] dark:bg-[#0D0D0F] min-h-screen">
      <Container className="py-8 sm:py-12">

        {/* ── Page Header ─────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-6 mb-8">
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

        {/* ── Official Section ─────────────────────────────────── */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-4 h-4 text-[#6366F1] fill-[#6366F1]" />
            <h2 className="text-[15px] font-bold text-[#111111] dark:text-[#f4f4f5] tracking-[-0.01em]">
              Official
            </h2>
            <span className="text-[11px] font-semibold text-[#6366F1] bg-[#EEF2FF] dark:bg-[#4338ca]/30 px-2 py-0.5 rounded-full">
              RPL EXPO
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-5">
            {officialTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                isSelected={selectedId === template.id}
                onPick={handlePick}
              />
            ))}
          </div>
        </div>

        {/* ── Exclusive Section ────────────────────────────────── */}
        {exclusiveTemplates.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-[#EC4899]" />
              <h2 className="text-[15px] font-bold text-[#111111] dark:text-[#f4f4f5] tracking-[-0.01em]">
                Exclusive
              </h2>
              <span className="text-[11px] font-semibold text-[#EC4899] bg-[#FCE7F3] dark:bg-[#831843]/30 px-2 py-0.5 rounded-full">
                LIMITED
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-5">
              {exclusiveTemplates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  isSelected={selectedId === template.id}
                  onPick={handlePick}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── Trending Section ─────────────────────────────────── */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-[#F59E0B]" />
            <h2 className="text-[15px] font-bold text-[#111111] dark:text-[#f4f4f5] tracking-[-0.01em]">
              Trending
            </h2>
            <span className="text-[11px] font-semibold text-[#F59E0B] bg-[#FEF3C7] dark:bg-[#78350f]/30 px-2 py-0.5 rounded-full">
              HOT
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
            {trendingTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                isSelected={selectedId === template.id}
                onPick={handlePick}
              />
            ))}
          </div>
        </div>

        {/* ── Classic Section ──────────────────────────────────── */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-[15px] font-bold text-[#111111] dark:text-[#f4f4f5] tracking-[-0.01em]">
              Classic
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
            {classicTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                isSelected={selectedId === template.id}
                onPick={handlePick}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ── Template Card Component ──────────────────────────────────── */
function TemplateCard({
  template,
  isSelected,
  onPick,
}: {
  template: (typeof TEMPLATE_PRESETS)[number];
  isSelected: boolean;
  onPick: (id: string) => void;
}) {
  const isWide = template.aspectRatio > 1.2;

  return (
    <motion.button
      onClick={() => onPick(template.id)}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
      className={`group relative flex flex-col rounded-[16px] overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2 shadow-[0_2px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.4)] transition-shadow hover:shadow-[0_8px_28px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_8px_28px_rgba(0,0,0,0.6)] ${
        isSelected ? "ring-[3px] ring-[#4F46E5] ring-offset-2" : "ring-0"
      }`}
      aria-label={`Use template: ${template.name}`}
      aria-pressed={isSelected}
    >
      {/* Thumbnail */}
      <div
        className="relative w-full overflow-hidden bg-[#121214] dark:bg-[#0D0D0F]"
        style={{ aspectRatio: isWide ? "4/3" : "3/4" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={template.previewSrc}
          alt={template.name}
          className="absolute inset-0 w-full h-full object-contain select-none"
          loading="lazy"
          onContextMenu={(e) => e.preventDefault()}
          draggable="false"
        />

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

        {/* Hover overlay with 'Start Creating' badge */}
        <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
          <div
            style={{ backgroundColor: "#ffffff", color: "#111111" }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold text-[11px] sm:text-[12px] shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Start Creating</span>
          </div>
        </div>

        {/* Bottom text overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-2.5 pointer-events-none">
          <div className="flex items-end justify-between gap-1">
            <div className="min-w-0">
              <p className="text-[12px] font-bold text-white leading-tight truncate">
                {template.name}
              </p>
              <p className="text-[10px] text-white/65 mt-0.5 leading-snug line-clamp-1">
                {template.description}
              </p>
            </div>
            {/* badge for official / trending */}
            {template.usedCount && (
              <span
                className={`shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded-md whitespace-nowrap backdrop-blur-sm ${
                  template.official
                    ? "text-[#c7d2fe] bg-[#4338ca]/70"
                    : "text-[#FDE68A] bg-[#92400E]/70"
                }`}
              >
                {template.usedCount}
              </span>
            )}
          </div>
        </div>

        {/* Selected checkmark */}
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
}
