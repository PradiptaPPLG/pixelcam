"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { CriteriaLevel } from "@/utils/ai/analyze";

interface RecommendationCardProps {
  photo: string;
  index: number;
  score: number;
  criteria: CriteriaLevel[];
}

/** Best-shot recommendation with the criteria breakdown. */
export default function RecommendationCard({
  photo,
  index,
  score,
  criteria,
}: RecommendationCardProps) {
  return (
    <div className="flex gap-3 rounded-[14px] border border-[#E5E7EB] bg-white p-3.5">
      <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-[10px] bg-[#0a0a0a] ring-1 ring-black/5">
        <Image
          src={photo}
          alt={`Recommended photo ${index + 1}`}
          fill
          unoptimized
          sizes="64px"
          className="object-cover"
        />
        <span className="absolute left-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-[#F59E0B] text-white shadow-sm">
          <Star className="h-3 w-3" fill="currentColor" aria-hidden="true" />
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[13px] font-semibold text-[#F59E0B]">
            ★ AI Recommended
          </span>
          <span className="text-[12px] font-medium text-[#6B7280]">
            Photo {index + 1} · {score}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
          {criteria.map((criterion) => (
            <div key={criterion.label} className="flex items-center gap-1.5">
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-[#F0F0F0]">
                <motion.div
                  className="h-full rounded-full bg-[#22C55E]"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.round(criterion.level * 100)}%` }}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
              <span className="w-16 shrink-0 text-[10px] text-[#6B7280]">
                {criterion.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
