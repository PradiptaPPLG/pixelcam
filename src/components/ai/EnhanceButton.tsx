"use client";

import { motion } from "framer-motion";
import { Check, WandSparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface EnhanceButtonProps {
  onEnhance: () => void;
  applied: boolean;
}

/** One-click subtle AI enhancement (brightness/contrast/exposure/warmth). */
export default function EnhanceButton({ onEnhance, applied }: EnhanceButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onEnhance}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 24 }}
      className={cn(
        "inline-flex h-11 w-full items-center justify-center gap-2 rounded-[14px] text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2",
        applied
          ? "bg-[#ECFDF3] text-[#22C55E]"
          : "bg-[#4F46E5] text-white hover:bg-[#4338CA] active:bg-[#3730A3]",
      )}
    >
      {applied ? (
        <>
          <Check className="h-4 w-4" aria-hidden="true" />
          Enhanced
        </>
      ) : (
        <>
          <WandSparkles className="h-4 w-4" aria-hidden="true" />
          AI Enhance
        </>
      )}
    </motion.button>
  );
}
