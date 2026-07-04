"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressDotsProps {
  total: number;
  /** Number of shots already captured. */
  completed: number;
  /** Index of the shot currently being taken. */
  activeIndex: number;
  isRunning: boolean;
}

/**
 * Row of dots tracking session progress: completed shots turn green, the
 * current shot pulses, upcoming shots stay hollow.
 */
export default function ProgressDots({
  total,
  completed,
  activeIndex,
  isRunning,
}: ProgressDotsProps) {
  return (
    <div className="flex items-center gap-2.5" role="list" aria-label="Session progress">
      {Array.from({ length: total }, (_, index) => {
        const isDone = index < completed;
        const isCurrent = isRunning && index === activeIndex && !isDone;

        return (
          <motion.span
            key={index}
            role="listitem"
            animate={
              isCurrent
                ? { scale: [1, 1.35, 1] }
                : { scale: 1 }
            }
            transition={
              isCurrent
                ? { duration: 1, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.2 }
            }
            className={cn(
              "h-2.5 w-2.5 rounded-full transition-colors duration-300",
              isDone && "bg-[#22C55E]",
              isCurrent && "bg-[#4F46E5]",
              !isDone && !isCurrent && "bg-transparent ring-1 ring-inset ring-[#D1D5DB]",
            )}
          />
        );
      })}
    </div>
  );
}
