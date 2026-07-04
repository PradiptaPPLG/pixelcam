"use client";

import { Clapperboard } from "lucide-react";

/** Right-panel header for Film Lab. */
export default function FilmHeader() {
  return (
    <div className="flex flex-col gap-1">
      <span className="flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#6B7280]">
        <Clapperboard className="h-3.5 w-3.5" aria-hidden="true" />
        Film Lab
      </span>
      <h1 className="text-[28px] font-semibold tracking-[-0.02em] text-[#111111] sm:text-[30px]">
        Film Lab
      </h1>
      <p className="text-[14px] leading-relaxed text-[#6B7280]">
        Choose the look of your memories.
      </p>
    </div>
  );
}
