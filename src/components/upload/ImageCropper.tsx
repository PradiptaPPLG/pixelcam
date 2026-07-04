"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { clamp } from "@/lib/utils";

interface ImageCropperProps {
  src: string;
  /** Called with a cropped JPEG data URL at the photobooth ratio. */
  onCropped: (dataUrl: string) => void;
  confirmLabel?: string;
}

const FRAME_W = 288;
const FRAME_H = 216; // 4:3 photobooth ratio
const OUTPUT_SCALE = 4; // 1152 × 864 export

/**
 * Crop a single image to the photobooth 4:3 ratio with drag + zoom, so
 * uploaded photos of any aspect fit the strip without distortion.
 */
export default function ImageCropper({
  src,
  onCropped,
  confirmLabel = "Use photo",
}: ImageCropperProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(
    null,
  );

  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Load the image to read natural dimensions and reuse it for drawing.
  // The parent remounts this component per image (keyed by src), so initial
  // state is already reset — the effect only needs to load.
  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      imgRef.current = image;
      setNatural({ w: image.naturalWidth, h: image.naturalHeight });
    };
    image.src = src;
    return () => {
      image.onload = null;
    };
  }, [src]);

  const layout = useMemo(() => {
    if (!natural) return null;
    const cover = Math.max(FRAME_W / natural.w, FRAME_H / natural.h);
    const dispW = natural.w * cover * zoom;
    const dispH = natural.h * cover * zoom;
    return {
      dispW,
      dispH,
      maxX: Math.max(0, (dispW - FRAME_W) / 2),
      maxY: Math.max(0, (dispH - FRAME_H) / 2),
    };
  }, [natural, zoom]);

  const clampOffset = (x: number, y: number) => {
    if (!layout) return { x: 0, y: 0 };
    return {
      x: clamp(x, -layout.maxX, layout.maxX),
      y: clamp(y, -layout.maxY, layout.maxY),
    };
  };

  const onPointerDown = (event: React.PointerEvent) => {
    drag.current = { x: event.clientX, y: event.clientY, ox: offset.x, oy: offset.y };
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    setOffset(
      clampOffset(d.ox + (event.clientX - d.x), d.oy + (event.clientY - d.y)),
    );
  };

  const onPointerUp = (event: React.PointerEvent) => {
    drag.current = null;
    try {
      (event.currentTarget as HTMLElement).releasePointerCapture(event.pointerId);
    } catch {
      // already released
    }
  };

  const handleZoom = (value: number) => {
    setZoom(value);
    setOffset((current) => clampOffset(current.x, current.y));
  };

  const confirm = () => {
    const image = imgRef.current;
    if (!image || !layout || !natural) return;
    const sourceScale = layout.dispW / natural.w;
    const imgLeft = FRAME_W / 2 - layout.dispW / 2 + offset.x;
    const imgTop = FRAME_H / 2 - layout.dispH / 2 + offset.y;

    const canvas = document.createElement("canvas");
    canvas.width = FRAME_W * OUTPUT_SCALE;
    canvas.height = FRAME_H * OUTPUT_SCALE;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(
      image,
      -imgLeft / sourceScale,
      -imgTop / sourceScale,
      FRAME_W / sourceScale,
      FRAME_H / sourceScale,
      0,
      0,
      canvas.width,
      canvas.height,
    );
    onCropped(canvas.toDataURL("image/jpeg", 0.92));
  };

  const dispLeft = layout ? FRAME_W / 2 - layout.dispW / 2 + offset.x : 0;
  const dispTop = layout ? FRAME_H / 2 - layout.dispH / 2 + offset.y : 0;

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        ref={frameRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{ width: FRAME_W, height: FRAME_H }}
        className="relative touch-none cursor-grab overflow-hidden rounded-[16px] bg-[#0a0a0a] ring-1 ring-black/10 active:cursor-grabbing"
      >
        {layout && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt="Crop preview"
            draggable={false}
            style={{
              position: "absolute",
              width: layout.dispW,
              height: layout.dispH,
              left: dispLeft,
              top: dispTop,
              maxWidth: "none",
            }}
          />
        )}
        {/* Framing guides */}
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/20" />
        <div className="pointer-events-none absolute inset-x-0 top-1/3 h-px bg-white/10" />
        <div className="pointer-events-none absolute inset-x-0 top-2/3 h-px bg-white/10" />
      </div>

      <div className="flex w-full max-w-[288px] items-center gap-3">
        <span className="text-[12px] font-medium text-[#6B7280]">Zoom</span>
        <input
          type="range"
          min={1}
          max={3}
          step={0.01}
          value={zoom}
          onChange={(event) => handleZoom(Number(event.target.value))}
          aria-label="Zoom"
          className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-[#E5E7EB] accent-[#4F46E5]"
        />
      </div>

      <button
        type="button"
        onClick={confirm}
        className="inline-flex h-11 w-full max-w-[288px] items-center justify-center rounded-[14px] bg-[#111111] text-sm font-medium text-white transition-colors hover:bg-[#222222] active:bg-[#333333] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2"
      >
        {confirmLabel}
      </button>
    </div>
  );
}
