/* ============================================================
   PIXELCAM — Creative Studio Canvas Helpers
   Pure geometry + adjustment math, plus photo baking so tonal
   adjustments appear in both the live preview and the export.
   ============================================================ */

import { clamp } from "@/lib/utils";
import type { Adjustments } from "./types";

export const DEFAULT_ADJUSTMENTS: Adjustments = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  warmth: 0,
  exposure: 0,
  opacity: 100,
  shadow: 0,
  radius: 16,
};

/** Base on-screen size of a sticker at scale 1, in px. */
export const STICKER_BASE_PX = 56;

const SNAP_THRESHOLD = 0.015;

/**
 * Keep a decoration's center inside the canvas given its normalized
 * half-extents, then gently snap toward the horizontal/vertical center.
 */
export function clampAndSnap(
  x: number,
  y: number,
  halfW: number,
  halfH: number,
): { x: number; y: number } {
  const marginX = Math.min(halfW, 0.5);
  const marginY = Math.min(halfH, 0.5);
  let nx = clamp(x, marginX, 1 - marginX);
  let ny = clamp(y, marginY, 1 - marginY);
  if (Math.abs(nx - 0.5) < SNAP_THRESHOLD) nx = 0.5;
  if (Math.abs(ny - 0.5) < SNAP_THRESHOLD) ny = 0.5;
  return { x: nx, y: ny };
}

/** Whether the tonal adjustments are all at their neutral defaults. */
export function isTonalIdentity(a: Adjustments): boolean {
  return (
    a.brightness === 100 &&
    a.contrast === 100 &&
    a.saturation === 100 &&
    a.warmth === 0 &&
    a.exposure === 0
  );
}

/**
 * Build a CSS/canvas `filter` string for the tonal adjustments.
 * Warmth and exposure are approximated with sepia/hue-rotate/brightness.
 */
export function adjustmentsToFilter(a: Adjustments): string {
  const brightness = (a.brightness / 100) * (1 + a.exposure / 200);
  const parts = [
    `brightness(${brightness.toFixed(3)})`,
    `contrast(${(a.contrast / 100).toFixed(3)})`,
    `saturate(${(a.saturation / 100).toFixed(3)})`,
  ];
  if (a.warmth !== 0) {
    const w = a.warmth / 100;
    if (w > 0) parts.push(`sepia(${(w * 0.4).toFixed(3)})`);
    parts.push(`hue-rotate(${(-w * 12).toFixed(1)}deg)`);
  }
  return parts.join(" ");
}

/** Box-shadow for the strip based on the shadow adjustment (0–100). */
export function shadowForStrip(shadow: number): string {
  if (shadow <= 0) return "none";
  const alpha = (shadow / 100) * 0.4;
  const blur = 12 + (shadow / 100) * 48;
  const offset = 4 + (shadow / 100) * 20;
  return `0 ${offset}px ${blur}px -8px rgba(0,0,0,${alpha.toFixed(3)})`;
}

/**
 * Bake a tonal filter into each photo via an offscreen canvas so the
 * adjustment is captured by html2canvas on export. Falls back to the
 * original data URL if an image fails to load.
 */
export function bakeAdjustedPhotos(
  photos: string[],
  filter: string,
): Promise<string[]> {
  return Promise.all(
    photos.map(
      (src) =>
        new Promise<string>((resolve) => {
          const image = new Image();
          image.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = image.naturalWidth;
            canvas.height = image.naturalHeight;
            const ctx = canvas.getContext("2d");
            if (!ctx) {
              resolve(src);
              return;
            }
            ctx.filter = filter;
            ctx.drawImage(image, 0, 0);
            try {
              resolve(canvas.toDataURL("image/png"));
            } catch {
              resolve(src);
            }
          };
          image.onerror = () => resolve(src);
          image.src = src;
        }),
    ),
  );
}

/**
 * Crop a photo data URL to a target aspect ratio using "cover" logic —
 * i.e. the same behaviour as CSS `object-fit: cover`. The image is scaled
 * so its shortest side fills the target box, then centred and cropped.
 *
 * html2canvas 1.x ignores `objectFit`, so we bake the crop into the data URL
 * before rendering to guarantee the photo fills the slot without stretching.
 *
 * @param src        – The source image data URL.
 * @param slotWidth  – Target slot width in pixels (used only for aspect ratio).
 * @param slotHeight – Target slot height in pixels (used only for aspect ratio).
 * @returns A Promise that resolves to a cropped data URL (or the original on failure).
 */
export function cropPhotoToCoverRatio(
  src: string,
  slotWidth: number,
  slotHeight: number,
): Promise<string> {
  return new Promise<string>((resolve) => {
    const image = new Image();
    image.onload = () => {
      const { naturalWidth: iw, naturalHeight: ih } = image;
      const targetRatio = slotWidth / slotHeight;
      const imageRatio = iw / ih;

      let sx: number, sy: number, sw: number, sh: number;
      if (imageRatio > targetRatio) {
        // Image is wider than the slot → crop left/right
        sh = ih;
        sw = ih * targetRatio;
        sx = (iw - sw) / 2;
        sy = 0;
      } else {
        // Image is taller than the slot → crop top/bottom
        sw = iw;
        sh = iw / targetRatio;
        sx = 0;
        sy = (ih - sh) / 2;
      }

      const canvas = document.createElement("canvas");
      canvas.width = Math.round(sw);
      canvas.height = Math.round(sh);
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(src);
        return;
      }
      ctx.drawImage(image, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
      try {
        resolve(canvas.toDataURL("image/png"));
      } catch {
        resolve(src);
      }
    };
    image.onerror = () => resolve(src);
    image.src = src;
  });
}
