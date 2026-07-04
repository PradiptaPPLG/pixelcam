/* ============================================================
   PIXELCAM — Filter Engine (abstraction only)
   Placeholder for the future Canvas-based image processor.
   `applyFilter` / `renderPreview` return the source unchanged for
   now; the real pixel pipeline (grain, vignette, tint, LUTs) lands
   in a later stage. `toPreviewCss` is a lightweight, config-driven
   approximation used ONLY for the on-screen preview, never as the
   final render.
   ============================================================ */

import { NEUTRAL_SETTINGS } from "@/data/filterPresets";
import type { FilterSettings } from "@/types/filter";

/**
 * Future home of the Canvas render. For now it echoes the source image
 * (data URL) untouched so callers can be wired ahead of the real engine.
 */
export function applyFilter(imageSrc: string, settings: FilterSettings): string {
  void settings; // consumed by the Canvas pipeline in a later stage
  return imageSrc;
}

/** Preview-time render. Placeholder: returns the source unchanged for now. */
export function renderPreview(imageSrc: string, settings: FilterSettings): string {
  void settings;
  return imageSrc;
}

/** Reset to neutral settings. */
export function resetFilter(): FilterSettings {
  return { ...NEUTRAL_SETTINGS };
}

const isIdentity = (s: FilterSettings): boolean =>
  s.brightness === 1 &&
  s.contrast === 1 &&
  s.saturation === 1 &&
  s.temperature === 0 &&
  s.fade === 0;

/**
 * Config-driven CSS approximation for the live preview layer. Tonal values
 * map to CSS filter primitives; temperature is approximated with the
 * sepia + hue-rotate technique (warm → amber, cool → blue). Grain / vignette
 * are intentionally NOT represented here — they belong to the future Canvas
 * engine — but every preset is still made visibly distinct.
 */
export function toPreviewCss(s: FilterSettings): string {
  // Monochrome
  if (s.saturation === 0) {
    return `grayscale(1) contrast(${s.contrast.toFixed(3)}) brightness(${s.brightness.toFixed(3)})`;
  }
  if (isIdentity(s)) return "none";

  const fade = s.fade / 100;
  const parts = [
    `brightness(${(s.brightness * (1 + fade * 0.12)).toFixed(3)})`,
    `contrast(${(s.contrast * (1 - fade * 0.35)).toFixed(3)})`,
  ];

  const t = s.temperature / 100;
  if (t > 0) {
    // Warm: amber cast + a little extra vibrance.
    parts.push(`sepia(${(t * 0.6).toFixed(3)})`);
    parts.push(`saturate(${(s.saturation * (1 + t * 0.6)).toFixed(3)})`);
  } else if (t < 0) {
    // Cool: sepia then rotate ~180° for a believable blue tone.
    const a = Math.abs(t);
    parts.push(`sepia(${(a * 0.7).toFixed(3)})`);
    parts.push(`saturate(${(s.saturation * (1 + a * 0.8)).toFixed(3)})`);
    parts.push(`hue-rotate(${Math.round(170 + a * 30)}deg)`);
  } else {
    parts.push(`saturate(${s.saturation.toFixed(3)})`);
  }
  return parts.join(" ");
}
