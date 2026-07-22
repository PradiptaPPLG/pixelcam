"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Palette } from "lucide-react";

interface PreviewHeaderProps {
  themeName: string;
  emoji: string;
  onContinue?: () => void;
}

/**
 * Header for the Theme Studio — stage title, the live theme name, and the
 * Continue action that hands the chosen look to the next stage.
 */
export default function PreviewHeader({
  themeName,
  emoji,
  onContinue,
}: PreviewHeaderProps) {
  return (
    <header className="flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-col items-center gap-1 text-center sm:items-start sm:text-left">
        <span className="flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#6B7280]">
          <Palette className="h-3.5 w-3.5" aria-hidden="true" />
          Theme Studio
        </span>
        <h1 className="text-[28px] font-semibold tracking-[-0.02em] text-[#111111] dark:text-[#f4f4f5] sm:text-[32px]">
          Style your strip
        </h1>
        <div className="flex items-center gap-1.5 text-[14px] text-[#6B7280]">
          <span>Theme:</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={themeName}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="font-semibold text-[#111111] dark:text-[#f4f4f5]"
            >
              {emoji} {themeName}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {onContinue && (
        <button
          type="button"
          onClick={onContinue}
          className="inline-flex h-11 shrink-0 items-center gap-2 rounded-[14px] bg-[#111111] px-5 text-sm font-medium text-white transition-colors hover:bg-[#222222] active:bg-[#333333] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2"
        >
          Continue
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </header>
  );
}
