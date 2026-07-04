/* ============================================================
   PIXELCAM — Film Lab filter presets
   Configuration only. Each preset is a set of tunable values that
   a future Canvas engine (lib/filterEngine.ts) will render. No
   image processing lives here.
   ============================================================ */

import type { FilterId, FilterPreset, FilterSettings } from "@/types/filter";

/** Neutral baseline; every preset overrides from here. */
export const NEUTRAL_SETTINGS: FilterSettings = {
  brightness: 1,
  contrast: 1,
  saturation: 1,
  temperature: 0,
  grain: 0,
  vignette: 0,
  fade: 0,
  tint: "none",
};

function preset(
  id: FilterId,
  name: string,
  description: string,
  settings: Partial<FilterSettings>,
): FilterPreset {
  return { id, name, description, settings: { ...NEUTRAL_SETTINGS, ...settings } };
}

/** The twelve built-in Film Lab presets, in display order. */
export const FILTER_PRESETS: FilterPreset[] = [
  preset("original", "Original", "Natural colors.", {}),
  preset("film", "Film", "Classic analog look.", {
    contrast: 1.14,
    saturation: 1.1,
    temperature: 16,
    grain: 20,
  }),
  preset("retro", "Retro", "Warm nostalgic tones.", {
    brightness: 1.03,
    saturation: 1.12,
    temperature: 32,
    fade: 12,
  }),
  preset("vintage", "Vintage", "Slight yellow faded appearance.", {
    contrast: 0.95,
    saturation: 0.9,
    temperature: 24,
    fade: 28,
    tint: "#f0e0b0",
  }),
  preset("mono", "Mono", "Black & white.", {
    saturation: 0,
    contrast: 1.1,
  }),
  preset("dreamy", "Dreamy", "Soft glow.", {
    brightness: 1.08,
    contrast: 0.92,
    saturation: 1.05,
    fade: 20,
  }),
  preset("cool", "Cool", "Blue tone.", {
    saturation: 1.05,
    temperature: -35,
    brightness: 1.02,
  }),
  preset("warm", "Warm", "Orange tone.", {
    saturation: 1.1,
    temperature: 40,
  }),
  preset("fade", "Fade", "Low contrast.", {
    contrast: 0.85,
    brightness: 1.06,
    saturation: 0.9,
    fade: 30,
  }),
  preset("moody", "Moody", "Dark cinematic.", {
    brightness: 0.92,
    contrast: 1.15,
    saturation: 0.95,
    temperature: -8,
    vignette: 40,
  }),
  preset("vivid", "Vivid", "Rich saturation.", {
    saturation: 1.4,
    contrast: 1.06,
  }),
  preset("grain", "Grain", "Film grain inspired.", {
    brightness: 0.98,
    contrast: 1.16,
    saturation: 0.94,
    temperature: 6,
    grain: 55,
  }),
];

export const DEFAULT_FILTER_ID: FilterId = "original";

const INDEX: Record<string, FilterPreset> = Object.fromEntries(
  FILTER_PRESETS.map((filter) => [filter.id, filter]),
);

export function getFilterPreset(id: string): FilterPreset {
  return INDEX[id] ?? INDEX[DEFAULT_FILTER_ID];
}
