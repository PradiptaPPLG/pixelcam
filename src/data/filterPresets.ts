/* ============================================================
   PIXELCAM — Film Lab filter presets
   Configuration only. Each preset is a set of tunable values that
   a future Canvas engine (lib/filterEngine.ts) will render. No
   image processing lives here.
   ============================================================ */

import type { FilterId, FilterPreset, FilterSettings } from "@/types/filter";

export const NEUTRAL_SETTINGS: FilterSettings = {
  exposure: 0,
  contrast: 1,
  brightness: 0,
  saturation: 1,
  vibrance: 0,
  temperature: 0,
  tint: 0,
  fade: 0,
  highlightCompression: 0,
  colorWash: "none",
  grain: 0,
  vignette: 0,
};

function preset(
  id: FilterId,
  name: string,
  description: string,
  settings: Partial<FilterSettings>,
): FilterPreset {
  return { id, name, description, settings: { ...NEUTRAL_SETTINGS, ...settings } };
}

export const FILTER_PRESETS: FilterPreset[] = [
  preset("original", "Original", "Natural colors.", {}),
  preset("film", "Film ⭐", "Nostalgic analog feeling.", {
    contrast: 1.15,
    saturation: 0.9,
    temperature: 15,
    tint: 5, // slightly green/warm
    fade: 15,
    highlightCompression: 10,
    grain: 25,
    vignette: 20,
    shadowColor: [120, 0.1], // greenish shadows
    highlightColor: [40, 0.15], // warm highlights
    colorWash: "#faf5eb",
  }),
  preset("strong", "Strong", "High contrast and vibrant.", {
    contrast: 1.3,
    saturation: 1.2,
    vibrance: 0.2,
    exposure: 5,
    highlightCompression: 5,
    gamma: [0.95, 1.0, 1.05], // cooler shadows/midtones for landscape
  }),
  preset("vintage", "Vintage", "Retro faded colors.", {
    contrast: 0.9,
    saturation: 0.75,
    temperature: 20,
    tint: 10,
    fade: 30,
    colorWash: "#f4e0c0", // brown/yellow tint
    shadowColor: [60, 0.2], // brownish lift
  }),
  preset("cream", "Cream", "Soft pastel and airy.", {
    contrast: 0.85,
    brightness: 10,
    saturation: 0.85,
    temperature: 10,
    fade: 5,
    colorWash: "#fdf8f5", // creamy white
  }),
  preset("senja", "Senja", "Warm sunset glow.", {
    contrast: 1.1,
    saturation: 1.15,
    temperature: 45,
    tint: -5, // orange/magenta
    shadowColor: [220, 0.2], // blue shadows
    vignette: 15,
  }),
  preset("early_morning", "Early Morning", "Cool calm atmosphere.", {
    contrast: 0.95,
    saturation: 0.9,
    temperature: -30,
    tint: -10, // blue/cyan
    fade: 10,
    colorWash: "#f0f5fa",
  }),
  preset("bw", "Black & White", "Professional monochrome.", {
    contrast: 1.25,
    saturation: 0,
    vibrance: -1,
    fade: 5,
    highlightCompression: 5,
  }),
  preset("light", "Light", "Subtle modern enhancement.", {
    contrast: 1.05,
    saturation: 1.05,
    brightness: 5,
    vibrance: 0.1,
  }),
  preset("doodle", "Doodle", "Artistic illustration.", {
    contrast: 1.4,
    saturation: 1.3,
    exposure: 10,
    highlightCompression: 15, // flatten highlights a bit for illustration look
    shadowColor: [0, 0],
  }),
];

export const DEFAULT_FILTER_ID: FilterId = "original";

const INDEX: Record<string, FilterPreset> = Object.fromEntries(
  FILTER_PRESETS.map((filter) => [filter.id, filter]),
);

export function getFilterPreset(id: string): FilterPreset {
  return INDEX[id] ?? INDEX[DEFAULT_FILTER_ID];
}
