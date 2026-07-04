"use client";

import { motion } from "framer-motion";
import { Camera, CameraOff, RefreshCw } from "lucide-react";

interface PermissionCardProps {
  denied?: boolean;
  message?: string | null;
  onEnable: () => void;
  onRetry: () => void;
}

/**
 * Elegant fallback shown when camera permission is denied or unavailable.
 * Offers "Enable Camera" and "Retry" actions.
 */
export default function PermissionCard({
  denied = false,
  message,
  onEnable,
  onRetry,
}: PermissionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="mx-auto flex max-w-md flex-col items-center gap-6 rounded-[24px] border border-[#E5E7EB] bg-white/70 px-8 py-12 text-center shadow-[0_16px_48px_rgba(0,0,0,0.06)] backdrop-blur-xl"
    >
      <div className="grid h-16 w-16 place-items-center rounded-full bg-[#EEF2FF] text-[#4F46E5]">
        <CameraOff className="h-7 w-7" aria-hidden="true" />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-[20px] font-semibold tracking-[-0.01em] text-[#111111]">
          {denied ? "Camera access blocked" : "Camera unavailable"}
        </h2>
        <p className="text-[15px] leading-relaxed text-[#6B7280]">
          {message ??
            "We need permission to use your camera. Enable access to start capturing."}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onEnable}
          className="inline-flex h-11 items-center gap-2 rounded-[14px] bg-[#111111] px-5 text-sm font-medium text-white transition-colors hover:bg-[#222222] active:bg-[#333333] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2"
        >
          <Camera className="h-4 w-4" aria-hidden="true" />
          Enable Camera
        </button>
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex h-11 items-center gap-2 rounded-[14px] border border-[#E5E7EB] bg-white px-5 text-sm font-medium text-[#111111] transition-colors hover:bg-[#F5F5F5] active:bg-[#EEEEEE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Retry
        </button>
      </div>
    </motion.div>
  );
}
