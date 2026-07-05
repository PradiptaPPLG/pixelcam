/* ============================================================
   PIXELCAM — Filter types (Film Lab)
   Configuration-only. These describe a filter's intent; the
   actual pixel processing is a later (Canvas) stage. See
   lib/filterEngine.ts for the abstraction that will consume them.
   ============================================================ */

/** Stable identifier for each built-in filter preset. */
export type FilterId =
  | "original"
  | "film"
  | "retro"
  | "vintage"
  | "mono"
  | "dreamy"
  | "cool"
  | "warm"
  | "fade"
  | "moody"
  | "vivid"
  | "grain"
  | "strong"
  | "cream"
  | "senja"
  | "early_morning"
  | "bw"
  | "light"
  | "doodle";

/**
 * Configurable, engine-agnostic values for a filter. All numbers are plain
 * configuration — no rendering happens here.
 */
export interface FilterSettings {
  /** Exposure offset (-100 to 100, 0 = neutral) */
  exposure: number;
  /** Contrast multiplier (0 to 2, 1 = neutral) */
  contrast: number;
  /** Brightness offset (-100 to 100, 0 = neutral) */
  brightness: number;
  /** Saturation multiplier (0 to 2, 1 = neutral) */
  saturation: number;
  /** Vibrance multiplier (-1 to 1, 0 = neutral) */
  vibrance: number;
  /** Color temperature (-100 to 100, cool to warm) */
  temperature: number;
  /** Tint (-100 to 100, green to magenta) */
  tint: number;
  
  /** Shadow lift/fade (0 to 100, raises black point) */
  fade: number;
  /** White point clamping (0 to 100, lowers white point) */
  highlightCompression: number;

  /** Split toning shadow color [H, S] (H: 0-360, S: 0-1) */
  shadowColor?: [number, number];
  /** Split toning highlight color [H, S] (H: 0-360, S: 0-1) */
  highlightColor?: [number, number];

  /** Lift (Shadows) per RGB channel [-1 to 1] */
  lift?: [number, number, number];
  /** Gamma (Midtones) per RGB channel [0 to 2, 1 = neutral] */
  gamma?: [number, number, number];
  /** Gain (Highlights) per RGB channel [0 to 2, 1 = neutral] */
  gain?: [number, number, number];

  /** Optional Color wash hex or "none" */
  colorWash: string;

  /** Film grain intensity (0 to 100) */
  grain: number;
  /** Vignette strength (0 to 100) */
  vignette: number;
}

/** A named filter preset the user can pick in Film Lab. */
export interface FilterPreset {
  id: FilterId;
  name: string;
  description: string;
  settings: FilterSettings;
}
