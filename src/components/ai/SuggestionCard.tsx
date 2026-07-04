"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SuggestionCardProps {
  label: string;
  name: string;
  reason: string;
  swatch?: string;
  applied: boolean;
  onApply: () => void;
}

/** A single AI suggestion (theme or filter) with an Apply action. */
export default function SuggestionCard({
  label,
  name,
  reason,
  swatch,
  applied,
  onApply,
}: SuggestionCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-[14px] border border-[#E5E7EB] bg-white p-3.5">
      {swatch && (
        <span
          className="h-9 w-9 shrink-0 rounded-[10px] ring-1 ring-black/10"
          style={{ background: swatch }}
          aria-hidden="true"
        />
      )}
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#6B7280]">
          {label}
        </p>
        <p className="truncate text-[14px] font-semibold text-[#111111]">
          {name}
        </p>
        <p className="truncate text-[11px] text-[#6B7280]">{reason}</p>
      </div>
      <button
        type="button"
        onClick={onApply}
        disabled={applied}
        className={cn(
          "inline-flex h-8 shrink-0 items-center gap-1 rounded-[10px] px-3 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2",
          applied
            ? "cursor-default bg-[#ECFDF3] text-[#22C55E]"
            : "bg-[#111111] text-white hover:bg-[#222222] active:bg-[#333333]",
        )}
      >
        {applied ? (
          <>
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
            Applied
          </>
        ) : (
          "Apply"
        )}
      </button>
    </div>
  );
}
