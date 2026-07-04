"use client";

import { Palette, RotateCcw, SlidersHorizontal } from "lucide-react";

interface PreviewToolbarProps {
  onRetake: () => void;
  onBackToThemes: () => void;
  onBackToFilters: () => void;
}

const buttonClass =
  "inline-flex h-9 items-center gap-1.5 rounded-[12px] border border-[#E5E7EB] bg-white px-3 text-[13px] font-medium text-[#111111] transition-colors hover:bg-[#F5F5F5] active:bg-[#EEEEEE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2";

/**
 * Secondary navigation above the preview — step back to earlier stages or
 * retake the shots.
 */
export default function PreviewToolbar({
  onRetake,
  onBackToThemes,
  onBackToFilters,
}: PreviewToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <button type="button" onClick={onRetake} className={buttonClass}>
        <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
        Retake Photos
      </button>
      <button type="button" onClick={onBackToThemes} className={buttonClass}>
        <Palette className="h-3.5 w-3.5" aria-hidden="true" />
        Back to Themes
      </button>
      <button type="button" onClick={onBackToFilters} className={buttonClass}>
        <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
        Back to Filters
      </button>
    </div>
  );
}
