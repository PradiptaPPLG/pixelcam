"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";

interface SuccessToastProps {
  show: boolean;
  onDone: () => void;
  duration?: number;
}

/**
 * Brief check-mark confirmation shown after a successful download, then fades
 * out on its own.
 */
export default function SuccessToast({
  show,
  onDone,
  duration = 1600,
}: SuccessToastProps) {
  useEffect(() => {
    if (!show) return;
    const timer = window.setTimeout(onDone, duration);
    return () => window.clearTimeout(timer);
  }, [show, duration, onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 420, damping: 26 }}
          className="fixed inset-x-0 bottom-6 z-50 mx-auto flex w-fit items-center gap-2 rounded-[14px] bg-[#111111] px-4 py-2.5 text-sm font-medium text-white shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 20, delay: 0.08 }}
            className="grid h-5 w-5 place-items-center rounded-full bg-[#22C55E]"
          >
            <Check className="h-3 w-3" aria-hidden="true" />
          </motion.span>
          Downloaded
        </motion.div>
      )}
    </AnimatePresence>
  );
}
