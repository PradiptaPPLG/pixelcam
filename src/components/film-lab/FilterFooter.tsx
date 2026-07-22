"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

interface FilterFooterProps {
  onBack: () => void;
  onContinue: () => void;
}

/** Back / Continue actions for Film Lab. */
export default function FilterFooter({ onBack, onContinue }: FilterFooterProps) {
  return (
    <div className="flex items-center justify-between bg-white dark:bg-[#18181b] rounded-[24px] p-5 shadow-sm border border-[#E5E7EB] dark:border-[#2a2a2e] w-full gap-3">
      <button
        type="button"
        onClick={onBack}
        className="px-4 py-2.5 rounded-xl border border-[#E5E7EB] dark:border-[#2a2a2e] text-[13px] font-semibold text-[#111111] dark:text-[#f4f4f5] bg-white dark:bg-[#18181b] hover:bg-gray-50 dark:hover:bg-[#232327] transition-colors whitespace-nowrap"
      >
        Back
      </button>
      <button
        type="button"
        onClick={onContinue}
        className="px-5 py-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#4F46E5] text-[13px] font-semibold text-white transition-colors shadow-sm min-w-[80px] text-center whitespace-nowrap"
      >
        Continue
      </button>
    </div>
  );
}
