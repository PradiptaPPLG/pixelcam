"use client";

import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface LiveCameraProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  mirrored?: boolean;
  isFlashing?: boolean;
  isLoading?: boolean;
  /** Overlay content (e.g. the countdown) rendered above the feed. */
  children?: React.ReactNode;
}

/**
 * Large live camera surface for the session. Mirrors the visual language of
 * the camera module's preview but adds a slot for overlays like the countdown.
 */
export default function LiveCamera({
  videoRef,
  mirrored = false,
  isFlashing = false,
  isLoading = false,
  children,
}: LiveCameraProps) {
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

      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0a0a0a] text-white/70">
          <LoaderCircle className="h-6 w-6 animate-spin" aria-hidden="true" />
          <span className="text-sm font-medium">Starting camera…</span>
        </div>
      )}

      {/* Overlay slot (countdown) */}
      {children}

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
