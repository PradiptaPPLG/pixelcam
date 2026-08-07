"use client";

import { Palette, RotateCcw, SlidersHorizontal } from "lucide-react";

interface PreviewToolbarProps {
  onRetake: () => void;
  onBackToThemes: () => void;
  onBackToFilters: () => void;
  isTemplate?: boolean;
}

const buttonClass =
  "inline-flex h-9 flex-shrink-0 items-center gap-1.5 rounded-[12px] border border-[#E5E7EB] dark:border-[#2a2a2e] bg-white dark:bg-[#18181b] px-2.5 sm:px-3 text-[12px] sm:text-[13px] font-medium text-[#111111] dark:text-[#f4f4f5] transition-colors hover:bg-[#F5F5F5] dark:hover:bg-[#232327] active:bg-[#EEEEEE] dark:active:bg-[#2a2a2e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2 whitespace-nowrap";

/**
 * Secondary navigation above the preview — step back to earlier stages or
 * retake the shots. Compact on mobile, full labels on desktop.
 */
export default function PreviewToolbar({
  onRetake,
  onBackToThemes,
  onBackToFilters,
  isTemplate,
}: PreviewToolbarProps) {
  return (
    <div className="flex items-center justify-center gap-2 overflow-x-auto hide-scrollbar pb-0.5">
      <button type="button" onClick={onRetake} className={buttonClass}>
        <RotateCcw className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
        <span className="hidden xs:inline sm:inline">Retake</span>
        <span className="xs:hidden hidden">Retake</span>
      </button>
      <button type="button" onClick={onBackToThemes} className={buttonClass}>
        <Palette className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
        {isTemplate ? "Templates" : "Themes"}
      </button>
      <button type="button" onClick={onBackToFilters} className={buttonClass}>
        <SlidersHorizontal className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
        Filters
      </button>
    </div>
  );
}
