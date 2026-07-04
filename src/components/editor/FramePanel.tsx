"use client";

import { cn } from "@/lib/utils";
import { FRAMES } from "@/utils/editor/frames";
import FrameOverlay from "./FrameOverlay";

interface FramePanelProps {
  frameId: string;
  onSelect: (frameId: string) => void;
}

/** Frame overlay picker with mini previews. */
export default function FramePanel({ frameId, onSelect }: FramePanelProps) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {FRAMES.map((frame) => (
        <button
          key={frame.id}
          type="button"
          onClick={() => onSelect(frame.id)}
          aria-pressed={frameId === frame.id}
          className={cn(
            "flex flex-col gap-2 rounded-[14px] border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]",
            frameId === frame.id
              ? "border-[#4F46E5] bg-[#EEF2FF]"
              : "border-[#E5E7EB] bg-white hover:bg-[#FAFAFA]",
          )}
        >
          <div className="relative h-16 w-full overflow-hidden rounded-[8px] bg-[#E9E9EC]">
            <FrameOverlay frameId={frame.id} radius={8} />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-[#111111]">
              {frame.name}
            </p>
            <p className="text-[11px] leading-tight text-[#6B7280]">
              {frame.description}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
