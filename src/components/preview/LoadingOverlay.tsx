"use client";

import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";

interface LoadingOverlayProps {
  show: boolean;
}

/**
 * Blurred overlay shown over the preview while the export renders.
 */
export default function LoadingOverlay({ show }: LoadingOverlayProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-[24px] bg-white/50 backdrop-blur-md"
        >
          <LoaderCircle
            className="h-8 w-8 animate-spin text-[#4F46E5]"
            aria-hidden="true"
          />
          <p className="text-sm font-medium text-[#111111]">
            Preparing your photostrip...
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
