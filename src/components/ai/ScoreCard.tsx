"use client";

import { motion } from "framer-motion";
import type { CompositionScores } from "@/utils/ai/analyze";
import AnimatedNumber from "./AnimatedNumber";

interface ScoreCardProps {
  scores: CompositionScores;
}

const ROWS: { key: keyof CompositionScores; label: string }[] = [
  { key: "lighting", label: "Lighting" },
  { key: "smile", label: "Smile" },
  { key: "composition", label: "Composition" },
  { key: "sharpness", label: "Sharpness" },
];

function barColor(value: number): string {
  if (value >= 75) return "#22C55E";
  if (value >= 50) return "#4F46E5";
  return "#F59E0B";
}

/** Composition scores — overall plus a breakdown, each 0–100. */
export default function ScoreCard({ scores }: ScoreCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-[14px] border border-[#E5E7EB] bg-white p-3.5">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-semibold text-[#111111]">
          Composition score
        </span>
        <span className="text-[22px] font-bold leading-none text-[#4F46E5]">
          <AnimatedNumber value={scores.overall} />
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {ROWS.map((row) => {
          const value = scores[row.key];
          return (
            <div key={row.key} className="flex items-center gap-2.5">
              <span className="w-20 shrink-0 text-[12px] text-[#6B7280]">
                {row.label}
              </span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#F0F0F0]">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: barColor(value) }}
                  initial={{ width: 0 }}
                  animate={{ width: `${value}%` }}
                  transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
              <span className="w-7 shrink-0 text-right text-[12px] font-semibold tabular-nums text-[#111111]">
                <AnimatedNumber value={value} />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
