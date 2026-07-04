"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, RotateCcw } from "lucide-react";

interface PreviewCardProps {
  imageSrc: string;
  onRetake: () => void;
  onContinue: () => void;
}

/**
 * Large preview of the captured (or uploaded) image with Retake / Continue.
 * No export happens yet — Continue is a forward hand-off point.
 */
export default function PreviewCard({
  imageSrc,
  onRetake,
  onContinue,
}: PreviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col gap-6"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] bg-[#0a0a0a] shadow-[0_16px_48px_rgba(0,0,0,0.08)] ring-1 ring-black/5 sm:aspect-video">
        <Image
          src={imageSrc}
          alt="Captured photo"
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onRetake}
          className="inline-flex h-11 items-center gap-2 rounded-[14px] border border-[#E5E7EB] bg-white px-5 text-sm font-medium text-[#111111] transition-colors hover:bg-[#F5F5F5] active:bg-[#EEEEEE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Retake
        </button>
        <button
          type="button"
          onClick={onContinue}
          className="inline-flex h-11 items-center gap-2 rounded-[14px] bg-[#111111] px-5 text-sm font-medium text-white transition-colors hover:bg-[#222222] active:bg-[#333333] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2"
        >
          Continue
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </motion.div>
  );
}
