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
  | "grain";

/**
 * Configurable, engine-agnostic values for a filter. All numbers are plain
 * configuration — no rendering happens here.
 */
export interface FilterSettings {
  /** Exposure multiplier (1 = unchanged). */
  brightness: number;
  /** Contrast multiplier (1 = unchanged). */
  contrast: number;
  /** Saturation multiplier (1 = unchanged, 0 = monochrome). */
  saturation: number;
  /** White balance, -100 (cool) … 100 (warm). */
  temperature: number;
  /** Film grain intensity, 0 … 100. */
  grain: number;
  /** Vignette strength, 0 … 100. */
  vignette: number;
  /** Faded-film lift, 0 … 100 (raises blacks / softens contrast). */
  fade: number;
  /** Optional color wash as a hex string, or "none". */
  tint: string;
}

/** A named filter preset the user can pick in Film Lab. */
export interface FilterPreset {
  id: FilterId;
  name: string;
  description: string;
  settings: FilterSettings;
}
