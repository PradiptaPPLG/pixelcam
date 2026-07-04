"use client";

import { AnimatePresence, motion } from "framer-motion";

interface CountdownProps {
  /** Current countdown number, or null when idle. */
  value: number | null;
}

/**
 * Full-bleed countdown overlay. Each number scales in over a soft scrim,
 * then scales out as the next arrives. Meant to sit inside <LiveCamera>.
 */
export default function Countdown({ value }: CountdownProps) {
  return (
    <AnimatePresence>
      {value !== null && (
        <motion.div
          key="scrim"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="pointer-events-none absolute inset-0 grid place-items-center bg-black/25"
        >
          <AnimatePresence mode="popLayout">
            <motion.span
              key={value}
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.7, opacity: 0 }}
              transition={{ duration: 0.42, ease: [0.34, 1.56, 0.64, 1] }}
              className="select-none text-[96px] font-bold leading-none text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.35)] sm:text-[140px]"
            >
              {value}
            </motion.span>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
