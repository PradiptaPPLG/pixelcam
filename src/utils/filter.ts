/* ============================================================
   PIXELCAM — Filter adapter
   Backward-compatible bridge over the Film Lab architecture
   (types/filter.ts, data/filterPresets.ts, lib/filterEngine.ts).
   Existing consumers (Preview, Editor, AI) keep using this API;
   the `css` value is derived from each preset's settings via the
   engine's preview approximation. Preset data lives only in
   data/filterPresets.ts — no duplication here.
   ============================================================ */

import { DEFAULT_FILTER_ID as PRESET_DEFAULT_ID, FILTER_PRESETS, getFilterPreset } from "@/data/filterPresets";
import { interpolateFilterSettings, toPreviewCss } from "@/lib/filterEngine";

/** Resolved, render-ready view of a filter used by the preview components. */
export interface FilterPreset {
  id: string;
  name: string;
  /** CSS `filter` value for the preview layer ("none" = untouched). */
  css: string;
}

export const FILTERS: FilterPreset[] = FILTER_PRESETS.map((preset) => ({
  id: preset.id,
  name: preset.name,
  css: toPreviewCss(preset.settings),
}));

export const DEFAULT_FILTER_ID = PRESET_DEFAULT_ID;

export function getFilterById(id: string, intensity: number = 100): FilterPreset {
  const preset = getFilterPreset(id);
  const settings = interpolateFilterSettings(preset.settings, intensity);
  return { id: preset.id, name: preset.name, css: toPreviewCss(settings) };
}

/* ------------------------------------------------------------
   Persistence — the selected filter is preserved across stages.
   ------------------------------------------------------------ */

export const FILTER_STATE_KEY = "pixelcam:filter-state";

export interface FilterState {
  filterId: string;
  intensity?: number; // 0..100
}

const DEFAULT_FILTER_STATE: FilterState = { filterId: DEFAULT_FILTER_ID, intensity: 100 };

export function saveFilterState(state: FilterState): void {
  if (typeof window === "undefined") return;
  try {
    const payload: FilterState = {
      filterId: state.filterId,
      intensity: state.intensity ?? 100,
    };
    window.sessionStorage.setItem(FILTER_STATE_KEY, JSON.stringify(payload));
  } catch {
    // Storage may be unavailable — fail silently.
  }
}

export function loadFilterState(): FilterState {
  if (typeof window === "undefined") return DEFAULT_FILTER_STATE;
  try {
    const raw = window.sessionStorage.getItem(FILTER_STATE_KEY);
    if (!raw) return DEFAULT_FILTER_STATE;
    const parsed = JSON.parse(raw) as Partial<FilterState>;
    return {
      filterId:
        typeof parsed.filterId === "string"
          ? parsed.filterId
          : DEFAULT_FILTER_ID,
      intensity:
        typeof parsed.intensity === "number"
          ? Math.max(0, Math.min(100, parsed.intensity))
          : 100,
    };
  } catch {
    return DEFAULT_FILTER_STATE;
  }
}

/* ------------------------------------------------------------
   useSyncExternalStore adapters (stable, hydration-safe).
   ------------------------------------------------------------ */

let filterSnapRaw: string | null = null;
let filterSnapValue: FilterState = DEFAULT_FILTER_STATE;

export function subscribeFilterState(onChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

export function getFilterStateSnapshot(): FilterState {
  const raw =
    typeof window === "undefined"
      ? null
      : window.sessionStorage.getItem(FILTER_STATE_KEY);
  if (raw !== filterSnapRaw) {
    filterSnapRaw = raw;
    filterSnapValue = loadFilterState();
  }
  return filterSnapValue;
}

export function getFilterStateServerSnapshot(): FilterState {
  return DEFAULT_FILTER_STATE;
}
