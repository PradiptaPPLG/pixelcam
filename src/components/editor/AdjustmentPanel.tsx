"use client";

import { RotateCcw } from "lucide-react";
import { DEFAULT_ADJUSTMENTS } from "@/utils/editor/canvas";
import type { Adjustments } from "@/utils/editor/types";
import Slider from "./Slider";

interface AdjustmentPanelProps {
  adjustments: Adjustments;
  onLive: (patch: Partial<Adjustments>) => void;
  onReset: () => void;
  beginTransaction: () => void;
  endTransaction: () => void;
}

export default function AdjustmentPanel({
  adjustments,
  onLive,
  onReset,
  beginTransaction,
  endTransaction,
}: AdjustmentPanelProps) {
  const bind = (key: keyof Adjustments) => ({
    value: adjustments[key],
    onChange: (value: number) =>
      onLive({ [key]: value } as Partial<Adjustments>),
    onBegin: beginTransaction,
    onEnd: endTransaction,
  });

  return (
    <div className="flex flex-col gap-4">
      <Slider label="Brightness" min={0} max={200} suffix="%" {...bind("brightness")} />
      <Slider label="Contrast" min={0} max={200} suffix="%" {...bind("contrast")} />
      <Slider label="Saturation" min={0} max={200} suffix="%" {...bind("saturation")} />
      <Slider label="Warmth" min={-100} max={100} {...bind("warmth")} />
      <Slider label="Exposure" min={-100} max={100} {...bind("exposure")} />
      <Slider label="Opacity" min={20} max={100} suffix="%" {...bind("opacity")} />
      <Slider label="Shadow" min={0} max={100} {...bind("shadow")} />
      <Slider label="Border radius" min={0} max={40} suffix="px" {...bind("radius")} />

      <button
        type="button"
        onClick={onReset}
        className="mt-1 inline-flex items-center justify-center gap-2 rounded-[12px] border border-[#E5E7EB] bg-white py-2.5 text-[13px] font-medium text-[#111111] transition-colors hover:bg-[#F5F5F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
        disabled={
          JSON.stringify(adjustments) === JSON.stringify(DEFAULT_ADJUSTMENTS)
        }
      >
        <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
        Reset adjustments
      </button>
    </div>
  );
}
