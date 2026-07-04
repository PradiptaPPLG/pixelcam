"use client";

import { AlignCenter, AlignLeft, AlignRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { FONT_OPTIONS, TEXT_PRESETS } from "@/utils/editor/text";
import type { Alignment, Decoration, TextDecoration } from "@/utils/editor/types";
import Slider from "./Slider";

interface TextPanelProps {
  selected: Decoration | null;
  onAdd: (text: string) => void;
  patchItem: (id: string, patch: Partial<Decoration>) => void;
  patchItemLive: (id: string, patch: Partial<Decoration>) => void;
  beginTransaction: () => void;
  endTransaction: () => void;
}

const ALIGNMENTS: { value: Alignment; Icon: typeof AlignLeft }[] = [
  { value: "left", Icon: AlignLeft },
  { value: "center", Icon: AlignCenter },
  { value: "right", Icon: AlignRight },
];

export default function TextPanel({
  selected,
  onAdd,
  patchItem,
  patchItemLive,
  beginTransaction,
  endTransaction,
}: TextPanelProps) {
  const active: TextDecoration | null =
    selected && selected.type === "text" ? selected : null;

  return (
    <div className="flex flex-col gap-5">
      {/* Presets */}
      <div className="flex flex-col gap-2.5">
        <h3 className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[#6B7280]">
          Add caption
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onAdd("Your text")}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#4F46E5] bg-[#EEF2FF] px-3 py-1.5 text-[13px] font-medium text-[#4F46E5] transition-colors hover:bg-[#E0E7FF]"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            New
          </button>
          {TEXT_PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => onAdd(preset)}
              className="rounded-full border border-[#E5E7EB] bg-white px-3 py-1.5 text-[13px] font-medium text-[#111111] transition-colors hover:bg-[#F5F5F5]"
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      {/* Selected text controls */}
      {active ? (
        <div className="flex flex-col gap-4 border-t border-[#F0F0F0] pt-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-[13px] font-medium text-[#111111]">Text</span>
            <input
              type="text"
              value={active.text}
              onFocus={beginTransaction}
              onBlur={endTransaction}
              onChange={(event) =>
                patchItemLive(active.id, { text: event.target.value })
              }
              className="h-10 rounded-[12px] border border-[#E5E7EB] bg-white px-3 text-[14px] text-[#111111] focus-visible:border-[#4F46E5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]/30"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-[13px] font-medium text-[#111111]">Font</span>
            <select
              value={active.fontFamily}
              onChange={(event) =>
                patchItem(active.id, { fontFamily: event.target.value })
              }
              className="h-10 cursor-pointer rounded-[12px] border border-[#E5E7EB] bg-white px-3 text-[14px] text-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]"
            >
              {FONT_OPTIONS.map((font) => (
                <option key={font.label} value={font.value}>
                  {font.label}
                </option>
              ))}
            </select>
          </label>

          <div className="flex items-center justify-between gap-3">
            <span className="text-[13px] font-medium text-[#111111]">Color</span>
            <input
              type="color"
              value={active.color}
              onChange={(event) =>
                patchItem(active.id, { color: event.target.value })
              }
              aria-label="Text color"
              className="h-8 w-12 cursor-pointer rounded-[8px] border border-[#E5E7EB] bg-white"
            />
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-[13px] font-medium text-[#111111]">Align</span>
            <div className="inline-flex gap-1 rounded-[10px] border border-[#E5E7EB] bg-white p-1">
              {ALIGNMENTS.map(({ value, Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => patchItem(active.id, { align: value })}
                  aria-pressed={active.align === value}
                  aria-label={`Align ${value}`}
                  className={cn(
                    "grid h-7 w-7 place-items-center rounded-[7px] transition-colors",
                    active.align === value
                      ? "bg-[#111111] text-white"
                      : "text-[#6B7280] hover:text-[#111111]",
                  )}
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>

          <Slider
            label="Font size"
            value={active.fontSize}
            min={10}
            max={60}
            onChange={(value) => patchItemLive(active.id, { fontSize: value })}
            onBegin={beginTransaction}
            onEnd={endTransaction}
          />
          <Slider
            label="Weight"
            value={active.fontWeight}
            min={300}
            max={800}
            step={100}
            onChange={(value) => patchItemLive(active.id, { fontWeight: value })}
            onBegin={beginTransaction}
            onEnd={endTransaction}
          />
          <Slider
            label="Letter spacing"
            value={active.letterSpacing}
            min={-2}
            max={12}
            onChange={(value) =>
              patchItemLive(active.id, { letterSpacing: value })
            }
            onBegin={beginTransaction}
            onEnd={endTransaction}
          />
          <Slider
            label="Opacity"
            value={Math.round(active.opacity * 100)}
            min={10}
            max={100}
            suffix="%"
            onChange={(value) => patchItemLive(active.id, { opacity: value / 100 })}
            onBegin={beginTransaction}
            onEnd={endTransaction}
          />
          <Slider
            label="Rotation"
            value={active.rotation}
            min={-180}
            max={180}
            suffix="°"
            onChange={(value) => patchItemLive(active.id, { rotation: value })}
            onBegin={beginTransaction}
            onEnd={endTransaction}
          />
        </div>
      ) : (
        <p className="border-t border-[#F0F0F0] pt-4 text-[13px] leading-relaxed text-[#6B7280]">
          Add a caption, then select it on the strip to edit its font, color,
          size and more.
        </p>
      )}
    </div>
  );
}
