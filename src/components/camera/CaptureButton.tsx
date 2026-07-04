"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CaptureButtonProps {
  onCapture: () => void;
  disabled?: boolean;
}

/**
 * Apple-style shutter button — an outer ring wrapping a solid inner disc,
 * with a subtle press animation.
 */
export default function CaptureButton({
  onCapture,
  disabled = false,
}: CaptureButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onCapture}
      disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      aria-label="Capture photo"
      className={cn(
        "group relative grid h-[72px] w-[72px] place-items-center rounded-full",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2",
        disabled && "cursor-not-allowed opacity-40",
      )}
    >
      <span className="absolute inset-0 rounded-full border-2 border-[#111111]/15" />
      <span
        className={cn(
          "h-[56px] w-[56px] rounded-full bg-[#111111] transition-colors duration-150",
          !disabled && "group-hover:bg-[#222222] group-active:bg-[#333333]",
        )}
      />
    </motion.button>
  );
}
