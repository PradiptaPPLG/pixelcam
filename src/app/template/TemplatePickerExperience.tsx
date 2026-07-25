"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import { TEMPLATE_PRESETS } from "@/data/templatesData";
import { saveTemplateId } from "@/utils/template";
import { LayoutTemplate, ChevronLeft, SkipForward } from "lucide-react";
import UploadFlow from "@/components/upload/UploadFlow";

export default function TemplatePickerExperience() {
  const router = useRouter();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);

  const selectedTemplate =
    TEMPLATE_PRESETS.find((t) => t.id === selectedId) ?? null;

  /** Clicking a card selects it and immediately pushes to camera */
  const handlePick = (id: string) => {
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

  const handleUploadFinish = () => {
    saveTemplateId(selectedId);
    router.push("/theme");
  };

  return (
    <section className="flex-1 bg-[#FAFAFA] dark:bg-[#0D0D0F]">
      <Container className="py-8 sm:py-12">
        {/* ── Page Header ─────────────────────────────────────────── */}
        <div className="flex items-start justify-between mb-8 gap-4">
          {/* Left: title block */}
          <div className="flex flex-col gap-1">
            <span className="flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#6B7280] dark:text-[#a1a1aa]">
              <LayoutTemplate className="h-3 w-3" aria-hidden="true" />
              Templates
            </span>
            <h1 className="text-[26px] sm:text-[30px] font-semibold tracking-[-0.02em] text-[#111111] dark:text-[#f4f4f5]">
              Pick a frame
            </h1>
            <p className="text-[13px] text-[#6B7280] dark:text-[#a1a1aa] max-w-xs leading-relaxed">
              Click any template to use it. Your photos will be placed
              automatically inside.
            </p>
          </div>

          {/* Right: Back + Skip */}
          <div className="flex items-center gap-2 shrink-0 pt-1">
            <button
              onClick={handleBack}
              className="flex items-center gap-1 px-3 py-2 rounded-xl border border-[#E5E7EB] dark:border-[#27272a] text-[13px] font-medium text-[#6B7280] dark:text-[#a1a1aa] bg-white dark:bg-[#18181b] hover:bg-gray-50 dark:hover:bg-[#232327] transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Back
            </button>
            <button
              onClick={handleSkip}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#111111] dark:bg-[#f4f4f5] text-white dark:text-[#111111] text-[13px] font-semibold hover:bg-[#222] dark:hover:bg-[#e4e4e7] transition-colors"
            >
              <SkipForward className="w-3.5 h-3.5" />
              Skip
            </button>
          </div>
        </div>

        {/* ── Template Grid ────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
          {TEMPLATE_PRESETS.map((template) => (
            <motion.button
              key={template.id}
              onClick={() => handlePick(template.id)}
              whileHover={{ y: -3, scale: 1.015 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 360, damping: 28 }}
              className="group relative flex flex-col rounded-[16px] overflow-hidden bg-white dark:bg-[#18181b] border border-[#E5E7EB] dark:border-[#27272a] shadow-[0_1px_4px_rgba(0,0,0,0.05)] hover:border-[#4F46E5] dark:hover:border-[#6366F1] hover:shadow-[0_8px_24px_rgba(79,70,229,0.12)] transition-all duration-200 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2"
              aria-label={`Use template: ${template.name}`}
            >
              {/* Thumbnail */}
              <div
                className="relative w-full bg-[#F3F4F6] dark:bg-[#111115] overflow-hidden"
                style={{
                  aspectRatio:
                    template.aspectRatio > 0.7 ? "3/2" : "3/4",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={template.previewSrc}
                  alt={template.name}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  loading="lazy"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#4F46E5]/0 group-hover:bg-[#4F46E5]/10 transition-colors duration-200" />
              </div>

              {/* Info */}
              <div className="px-3 py-3">
                <p className="text-[13px] font-semibold text-[#111111] dark:text-[#f4f4f5] leading-snug">
                  {template.name}
                </p>
                <p className="text-[12px] text-[#6B7280] dark:text-[#a1a1aa] mt-0.5 leading-snug line-clamp-2">
                  {template.description}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </Container>

      {/* Upload modal (unused for now but wired up for completeness) */}
      <AnimatePresence>
        {uploadOpen && (
          <UploadFlow
            open={uploadOpen}
            onClose={() => setUploadOpen(false)}
            fixedCount={selectedTemplate?.slots.length}
            onFinish={handleUploadFinish}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
