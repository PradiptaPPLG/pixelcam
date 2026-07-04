"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircle, Sparkles } from "lucide-react";
import { getFilterById } from "@/utils/filter";
import { getThemeById } from "@/utils/theme";
import type { Adjustments } from "@/utils/editor/types";
import type { AIResult } from "@/utils/ai/analyze";
import { useAIAnalysis } from "@/hooks/useAIAnalysis";
import EnhanceButton from "./EnhanceButton";
import RecommendationCard from "./RecommendationCard";
import ScoreCard from "./ScoreCard";
import SuggestionCard from "./SuggestionCard";

interface AIAssistantProps {
  photos: string[];
  currentThemeId: string;
  currentFilterId: string;
  onApplyTheme: (id: string) => void;
  onApplyFilter: (id: string) => void;
  onEnhance: (patch: Partial<Adjustments>) => void;
}

/**
 * AI Assistant sidebar section. Runs a client-side analysis of the captured
 * photos and surfaces a best-shot pick, theme/filter suggestions, one-click
 * enhancement and composition scores. Hides itself if analysis is unavailable.
 */
export default function AIAssistant({
  photos,
  currentThemeId,
  currentFilterId,
  onApplyTheme,
  onApplyFilter,
  onEnhance,
}: AIAssistantProps) {
  const { status, result } = useAIAnalysis(photos);
  const [enhancedFor, setEnhancedFor] = useState<AIResult | null>(null);

  // Fallback: hide gracefully when there's nothing to analyze or it failed.
  if (status === "idle" || status === "unavailable") return null;

  const header = (
    <div className="flex items-center gap-2">
      <span className="grid h-6 w-6 place-items-center rounded-full bg-[#EEF2FF] text-[#4F46E5]">
        <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
      </span>
      <h2 className="text-[14px] font-semibold text-[#111111]">AI Assistant</h2>
    </div>
  );

  if (status === "loading" || !result) {
    return (
      <div className="flex flex-col gap-3 rounded-[20px] border border-[#E5E7EB] bg-white p-4">
        {header}
        <div className="flex items-center gap-2 py-2 text-[13px] text-[#6B7280]">
          <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
          Analyzing your shots…
        </div>
      </div>
    );
  }

  const theme = getThemeById(result.theme.id);
  const filter = getFilterById(result.filter.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col gap-3 rounded-[20px] border border-[#E5E7EB] bg-white p-4"
    >
      {header}

      <AnimatePresence mode="popLayout">
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col gap-3"
        >
          <RecommendationCard
            photo={photos[result.bestShotIndex]}
            index={result.bestShotIndex}
            score={result.photoScores[result.bestShotIndex]}
            criteria={result.criteria}
          />

          <SuggestionCard
            label="Theme suggestion"
            name={`${theme.emoji} ${theme.name}`}
            reason={result.theme.reason}
            swatch={theme.style.paper}
            applied={currentThemeId === result.theme.id}
            onApply={() => onApplyTheme(result.theme.id)}
          />

          <SuggestionCard
            label="Filter suggestion"
            name={`${result.filter.label} · ${filter.name}`}
            reason={result.filter.reason}
            applied={currentFilterId === result.filter.id}
            onApply={() => onApplyFilter(result.filter.id)}
          />

          <EnhanceButton
            applied={enhancedFor === result}
            onEnhance={() => {
              onEnhance(result.enhancement);
              setEnhancedFor(result);
            }}
          />

          <ScoreCard scores={result.scores} />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
