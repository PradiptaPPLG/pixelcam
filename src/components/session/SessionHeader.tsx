"use client";

import ProgressDots from "./ProgressDots";

interface SessionHeaderProps {
  total: number;
  completed: number;
  activeIndex: number;
  isRunning: boolean;
}

/**
 * Top-of-session indicator: progress dots plus a "Current shot: n / total"
 * readout.
 */
export default function SessionHeader({
  total,
  completed,
  activeIndex,
  isRunning,
}: SessionHeaderProps) {
  const shotNumber = isRunning
    ? Math.min(activeIndex + 1, total)
    : Math.min(completed + 1, total);

  return (
    <header className="flex flex-col items-center gap-4 text-center">
      <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#6B7280]">
        Photo Session
      </span>

      <ProgressDots
        total={total}
        completed={completed}
        activeIndex={activeIndex}
        isRunning={isRunning}
      />

      <p className="text-[15px] text-[#6B7280]">
        Current shot:{" "}
        <span className="font-semibold text-[#111111]">
          {shotNumber} / {total}
        </span>
      </p>
    </header>
  );
}
