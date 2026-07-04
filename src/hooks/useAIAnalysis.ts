"use client";

import { useEffect, useState } from "react";
import { analyzeStrip, type AIResult } from "@/utils/ai/analyze";

export type AIStatus = "idle" | "loading" | "ready" | "unavailable";

export interface UseAIAnalysisResult {
  status: AIStatus;
  result: AIResult | null;
}

/**
 * Runs the client-side photo analysis whenever the photos change. State is
 * only set from async callbacks (never synchronously in the effect), and any
 * failure resolves to "unavailable" so the UI can hide gracefully.
 */
export function useAIAnalysis(photos: string[]): UseAIAnalysisResult {
  const [result, setResult] = useState<AIResult | null>(null);
  const [failedKey, setFailedKey] = useState<string | null>(null);

  const key = photos.join("|").length + ":" + photos.length;

  useEffect(() => {
    if (photos.length === 0) return;
    let cancelled = false;
    analyzeStrip(photos)
      .then((analysis) => {
        if (!cancelled) setResult(analysis);
      })
      .catch(() => {
        if (!cancelled) setFailedKey(key);
      });
    return () => {
      cancelled = true;
    };
  }, [key, photos]);

  if (photos.length === 0) return { status: "idle", result: null };
  if (failedKey === key) return { status: "unavailable", result: null };
  if (!result) return { status: "loading", result: null };
  return { status: "ready", result };
}
