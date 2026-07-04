"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { clamp } from "@/lib/utils";
import { STICKER_BASE_PX, clampAndSnap } from "@/utils/editor/canvas";
import { StickerGlyph, getStickerDef } from "@/utils/editor/stickers";
import type { Decoration } from "@/utils/editor/types";

interface DecorationItemProps {
  decoration: Decoration;
  selected: boolean;
  getRect: () => DOMRect | null;
  onSelect: (id: string) => void;
  onLive: (id: string, patch: Partial<Decoration>) => void;
  beginTransaction: () => void;
  endTransaction: () => void;
}

type GestureMode = "drag" | "resize" | "rotate";

interface GestureState {
  mode: GestureMode;
  pointerId: number;
  rect: DOMRect;
  startClientX: number;
  startClientY: number;
  startX: number;
  startY: number;
  startScale: number;
  startRotation: number;
  startDistance: number;
  startAngle: number;
}

/**
 * A single draggable / resizable / rotatable decoration on the canvas.
 * All gestures run through a pointer-capturing wrapper and report live
 * updates; the parent wraps them in a single history transaction.
 */
export default function DecorationItem({
  decoration,
  selected,
  getRect,
  onSelect,
  onLive,
  beginTransaction,
  endTransaction,
}: DecorationItemProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const gesture = useRef<GestureState | null>(null);

  const halfExtents = () => {
    const rect = getRect();
    const el = contentRef.current;
    if (!rect || !el) return { halfW: 0.05, halfH: 0.05 };
    return {
      halfW: el.offsetWidth / 2 / rect.width,
      halfH: el.offsetHeight / 2 / rect.height,
    };
  };

  const startGesture = (mode: GestureMode, event: React.PointerEvent) => {
    event.stopPropagation();
    const rect = getRect();
    const wrapper = wrapperRef.current;
    if (!rect || !wrapper) return;
    onSelect(decoration.id);
    beginTransaction();
    const centerX = decoration.x * rect.width + rect.left;
    const centerY = decoration.y * rect.height + rect.top;
    gesture.current = {
      mode,
      pointerId: event.pointerId,
      rect,
      startClientX: event.clientX,
      startClientY: event.clientY,
      startX: decoration.x,
      startY: decoration.y,
      startScale: decoration.scale,
      startRotation: decoration.rotation,
      startDistance: Math.hypot(event.clientX - centerX, event.clientY - centerY),
      startAngle: Math.atan2(event.clientY - centerY, event.clientX - centerX),
    };
    wrapper.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent) => {
    const g = gesture.current;
    if (!g) return;
    const { rect } = g;

    if (g.mode === "drag") {
      const nextX = g.startX + (event.clientX - g.startClientX) / rect.width;
      const nextY = g.startY + (event.clientY - g.startClientY) / rect.height;
      const { halfW, halfH } = halfExtents();
      onLive(decoration.id, clampAndSnap(nextX, nextY, halfW, halfH));
      return;
    }

    const centerX = g.startX * rect.width + rect.left;
    const centerY = g.startY * rect.height + rect.top;

    if (g.mode === "resize") {
      const distance = Math.hypot(event.clientX - centerX, event.clientY - centerY);
      const ratio = g.startDistance > 0 ? distance / g.startDistance : 1;
      onLive(decoration.id, { scale: clamp(g.startScale * ratio, 0.3, 5) });
      return;
    }

    // rotate
    const angle = Math.atan2(event.clientY - centerY, event.clientX - centerX);
    const degrees = g.startRotation + ((angle - g.startAngle) * 180) / Math.PI;
    onLive(decoration.id, { rotation: Math.round(degrees) });
  };

  const endGesture = (event: React.PointerEvent) => {
    if (!gesture.current) return;
    gesture.current = null;
    endTransaction();
    try {
      wrapperRef.current?.releasePointerCapture(event.pointerId);
    } catch {
      // pointer already released
    }
  };

  const size = STICKER_BASE_PX * decoration.scale;

  return (
    <motion.div
      ref={wrapperRef}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      onPointerDown={(event) => startGesture("drag", event)}
      onPointerMove={handlePointerMove}
      onPointerUp={endGesture}
      onPointerCancel={endGesture}
      role="button"
      tabIndex={-1}
      aria-label={decoration.type === "text" ? decoration.text : "Sticker"}
      className="absolute cursor-grab touch-none select-none active:cursor-grabbing"
      style={{
        left: `${decoration.x * 100}%`,
        top: `${decoration.y * 100}%`,
        transform: `translate(-50%, -50%) rotate(${decoration.rotation}deg)`,
        opacity: decoration.opacity,
      }}
    >
      <div ref={contentRef} className="relative">
        {decoration.type === "sticker" ? (
          <div style={{ width: size, height: size }}>
            {getStickerDef(decoration.stickerId) ? (
              <StickerGlyph
                def={getStickerDef(decoration.stickerId)!}
                color={decoration.color}
              />
            ) : null}
          </div>
        ) : (
          <div
            style={{
              fontFamily: decoration.fontFamily,
              fontSize: decoration.fontSize * decoration.scale,
              fontWeight: decoration.fontWeight,
              color: decoration.color,
              letterSpacing: decoration.letterSpacing,
              textAlign: decoration.align,
              lineHeight: 1.15,
              whiteSpace: "pre",
            }}
          >
            {decoration.text}
          </div>
        )}

        {selected && (
          <>
            <span className="pointer-events-none absolute -inset-2 rounded-[8px] border-[1.5px] border-dashed border-[#4F46E5]" />
            {/* Rotate handle */}
            <span
              onPointerDown={(event) => startGesture("rotate", event)}
              className="absolute left-1/2 h-3.5 w-3.5 -translate-x-1/2 cursor-grab rounded-full border-2 border-white bg-[#4F46E5] shadow-sm"
              style={{ top: -26 }}
              aria-hidden="true"
            />
            {/* Resize handle */}
            <span
              onPointerDown={(event) => startGesture("resize", event)}
              className="absolute h-3.5 w-3.5 cursor-nwse-resize rounded-[3px] border-2 border-white bg-[#4F46E5] shadow-sm"
              style={{ bottom: -12, right: -12 }}
              aria-hidden="true"
            />
          </>
        )}
      </div>
    </motion.div>
  );
}
