"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ThemePreset } from "@/utils/theme";

interface ThemeCardProps {
  theme: ThemePreset;
  selected: boolean;
  onSelect: () => void;
}

/**
 * A selectable theme card with a mini live strip thumbnail, name and
 * description. Scales and lifts on hover; shows a check when selected.
 */
export default function ThemeCard({ theme, selected, onSelect }: ThemeCardProps) {
  const { style } = theme;

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ scale: 1.02 }}
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
      {/* Mini strip thumbnail */}
      <div
        className="flex w-12 shrink-0 flex-col gap-1 rounded-[10px] p-1.5"
        style={{
          background: style.paper,
          boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.05)",
        }}
      >
        <span
          className="mx-auto h-1 w-6 rounded-full"
          style={{ background: style.accent }}
        />
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block h-3 w-full overflow-hidden rounded-[3px]"
            style={{
              boxShadow: `inset 0 0 0 ${style.photoBorderWidth > 2 ? 1.5 : 1}px ${style.photoBorder}`,
              background: style.dark ? "#3A3A40" : "#D9D9DE",
            }}
          />
        ))}
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="text-sm" aria-hidden="true">
            {theme.emoji}
          </span>
          <p className="truncate text-[14px] font-semibold text-[#111111]">
            {theme.name}
          </p>
        </div>
        <p className="mt-0.5 line-clamp-2 text-[12px] leading-snug text-[#6B7280]">
          {theme.description}
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
