"use client";

import { motion } from "framer-motion";
import { SlidersHorizontal, Square, Sticker, Type } from "lucide-react";
import { cn } from "@/lib/utils";

export type EditorTab = "stickers" | "text" | "frames" | "adjustments";

const TABS = [
  { id: "stickers", label: "Stickers", Icon: Sticker },
  { id: "text", label: "Text", Icon: Type },
  { id: "frames", label: "Frames", Icon: Square },
  { id: "adjustments", label: "Adjust", Icon: SlidersHorizontal },
] as const;

interface ToolbarProps {
  active: EditorTab;
  onChange: (tab: EditorTab) => void;
}

/** Tab switcher for the tool panels. */
export default function Toolbar({ active, onChange }: ToolbarProps) {
  return (
    <div className="flex gap-1 rounded-[14px] border border-[#E5E7EB] bg-white p-1">
      {TABS.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            aria-pressed={isActive}
            className={cn(
              "relative flex flex-1 flex-col items-center gap-1 rounded-[10px] py-2 text-[11px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]",
              isActive ? "text-[#4F46E5]" : "text-[#6B7280] hover:text-[#111111]",
            )}
          >
            {isActive && (
              <motion.span
                layoutId="editor-tab-bg"
                className="absolute inset-0 rounded-[10px] bg-[#EEF2FF]"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <tab.Icon className="relative h-4 w-4" aria-hidden="true" />
            <span className="relative">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
