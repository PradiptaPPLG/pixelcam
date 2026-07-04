"use client";

import { forwardRef, useRef } from "react";
import PreviewCanvas from "@/components/preview/PreviewCanvas";
import { shadowForStrip } from "@/utils/editor/canvas";
import type { Decoration, EditorDoc } from "@/utils/editor/types";
import type { FilterPreset } from "@/utils/filter";
import type { StripCustomization, ThemePreset } from "@/utils/theme";
import DecorationItem from "./DecorationItem";
import FrameOverlay from "./FrameOverlay";

const STRIP_WIDTH = 320;

interface EditorCanvasProps {
  theme: ThemePreset;
  filter: FilterPreset;
  customization: StripCustomization;
  photos: string[];
  doc: EditorDoc;
  selectedId: string | null;
  exporting?: boolean;
  onSelect: (id: string | null) => void;
  onLive: (id: string, patch: Partial<Decoration>) => void;
  beginTransaction: () => void;
  endTransaction: () => void;
}

/**
 * The editable photostrip: the reused Preview strip as the base, tonal
 * adjustments applied to the photos upstream, plus frame + decoration layers.
 * The forwarded ref is the export node (decorations included).
 */
const EditorCanvas = forwardRef<HTMLDivElement, EditorCanvasProps>(
  function EditorCanvas(
    {
      theme,
      filter,
      customization,
      photos,
      doc,
      selectedId,
      exporting = false,
      onSelect,
      onLive,
      beginTransaction,
      endTransaction,
    },
    ref,
  ) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const { adjustments } = doc;

    const getRect = () => overlayRef.current?.getBoundingClientRect() ?? null;

    return (
      <div
        ref={ref}
        className="relative"
        style={{ width: STRIP_WIDTH }}
        onPointerDown={() => onSelect(null)}
      >
        {/* Base strip with strip-level adjustments */}
        <div
          style={{
            opacity: adjustments.opacity / 100,
            borderRadius: adjustments.radius,
            overflow: "hidden",
            boxShadow: shadowForStrip(adjustments.shadow),
          }}
        >
          <PreviewCanvas
            theme={theme}
            customization={customization}
            filter={filter}
            photos={photos}
            width={STRIP_WIDTH}
          />
        </div>

        {/* Frame overlay (below stickers) */}
        <FrameOverlay frameId={doc.frameId} radius={adjustments.radius} />

        {/* Decorations */}
        <div ref={overlayRef} className="absolute inset-0">
          {doc.decorations.map((decoration) => (
            <DecorationItem
              key={decoration.id}
              decoration={decoration}
              selected={!exporting && decoration.id === selectedId}
              getRect={getRect}
              onSelect={onSelect}
              onLive={onLive}
              beginTransaction={beginTransaction}
              endTransaction={endTransaction}
            />
          ))}
        </div>
      </div>
    );
  },
);

export default EditorCanvas;
