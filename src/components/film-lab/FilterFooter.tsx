"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

interface FilterFooterProps {
  onBack: () => void;
  onContinue: () => void;
}

/** Back / Continue actions for Film Lab. */
export default function FilterFooter({ onBack, onContinue }: FilterFooterProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex h-11 items-center gap-2 rounded-[14px] border border-[#E5E7EB] bg-white px-5 text-sm font-medium text-[#111111] transition-colors hover:bg-[#F5F5F5] active:bg-[#EEEEEE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back
      </button>
      <button
        type="button"
        onClick={onContinue}
        className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-[14px] bg-[#111111] px-5 text-sm font-medium text-white transition-colors hover:bg-[#222222] active:bg-[#333333] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2"
      >
        Continue
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
