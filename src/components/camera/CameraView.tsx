"use client";

import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CameraViewProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  mirrored?: boolean;
  isFlashing?: boolean;
  isLoading?: boolean;
}

/**
 * The live camera preview surface — a rounded, softly-shadowed panel
 * containing the <video> element, a shutter flash overlay and a loading state.
 */
export default function CameraView({
  videoRef,
  mirrored = false,
  isFlashing = false,
  isLoading = false,
}: CameraViewProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-[24px] bg-[#0a0a0a] shadow-[0_16px_48px_rgba(0,0,0,0.08)] ring-1 ring-black/5">
      <div className="aspect-[4/3] w-full sm:aspect-video">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={cn(
            "h-full w-full object-cover transition-transform duration-300",
            mirrored && "-scale-x-100",
          )}
        />
      </div>

      {/* Loading / starting state */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0a0a0a] text-white/70">
          <LoaderCircle className="h-6 w-6 animate-spin" aria-hidden="true" />
          <span className="text-sm font-medium">Starting camera…</span>
        </div>
      )}

      {/* Shutter flash */}
      <AnimatePresence>
        {isFlashing && (
          <motion.div
            key="flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="pointer-events-none absolute inset-0 bg-white"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
