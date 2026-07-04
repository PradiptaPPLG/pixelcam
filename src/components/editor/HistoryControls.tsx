"use client";

import { Redo2, RotateCcw, Undo2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface HistoryControlsProps {
  onUndo: () => void;
  onRedo: () => void;
  onReset: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const buttonClass =
  "inline-flex h-9 items-center gap-1.5 rounded-[10px] border border-[#E5E7EB] bg-white px-3 text-[13px] font-medium text-[#111111] transition-colors hover:bg-[#F5F5F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40";

/** Undo / Redo / Reset controls. */
export default function HistoryControls({
  onUndo,
  onRedo,
  onReset,
  canUndo,
  canRedo,
}: HistoryControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onUndo}
        disabled={!canUndo}
        aria-label="Undo"
        className={buttonClass}
      >
        <Undo2 className="h-4 w-4" aria-hidden="true" />
        Undo
      </button>
      <button
        type="button"
        onClick={onRedo}
        disabled={!canRedo}
        aria-label="Redo"
        className={buttonClass}
      >
        <Redo2 className="h-4 w-4" aria-hidden="true" />
        Redo
      </button>
      <button
        type="button"
        onClick={onReset}
        aria-label="Reset"
        className={cn(buttonClass, "ml-auto")}
      >
        <RotateCcw className="h-4 w-4" aria-hidden="true" />
        Reset
      </button>
    </div>
  );
}
