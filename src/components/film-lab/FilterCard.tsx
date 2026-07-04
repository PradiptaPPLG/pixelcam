"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { toPreviewCss } from "@/lib/filterEngine";
import type { FilterPreset } from "@/types/filter";

interface FilterCardProps {
  preset: FilterPreset;
  selected: boolean;
  onSelect: () => void;
}

/** Sample gradient used as the thumbnail placeholder for each filter. */
const SAMPLE =
  "linear-gradient(135deg, #f6c9a4 0%, #e0876a 38%, #9a6fb0 72%, #5b7fb8 100%)";

/**
 * A selectable filter card: thumbnail placeholder (the sample gradient with
 * the preset's preview approximation applied), name, description, and a
 * selected state with accent border + check.
 */
export default function FilterCard({
  preset,
  selected,
  onSelect,
}: FilterCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 400, damping: 26 }}
      aria-pressed={selected}
      className={cn(
        "group relative flex w-full items-center gap-3 rounded-[16px] border bg-white p-3 text-left transition-shadow",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2",
        selected
          ? "border-[#4F46E5] shadow-[0_8px_24px_rgba(79,70,229,0.16)]"
          : "border-[#E5E7EB] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]",
      )}
    >
      {/* Thumbnail placeholder */}
      <span className="h-12 w-12 shrink-0 overflow-hidden rounded-[10px] ring-1 ring-black/10">
        <span
          className="block h-full w-full"
          style={{ background: SAMPLE, filter: toPreviewCss(preset.settings) }}
          aria-hidden="true"
        />
      </span>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14px] font-semibold text-[#111111]">
          {preset.name}
        </p>
        <p className="truncate text-[12px] text-[#6B7280]">
          {preset.description}
        </p>
      </div>

      {/* Selected check */}
      {selected && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 24 }}
          className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#4F46E5] text-white"
        >
          <Check className="h-3 w-3" aria-hidden="true" />
        </motion.span>
      )}
    </motion.button>
  );
}
