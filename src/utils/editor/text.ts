/* ============================================================
   PIXELCAM — Creative Studio Text Helpers
   Web-safe fonts only (plus the app's already-loaded Geist).
   ============================================================ */

import { uid } from "@/lib/utils";
import type { TextDecoration } from "./types";

export interface FontOption {
  label: string;
  value: string;
}

export const FONT_OPTIONS: FontOption[] = [
  { label: "Sans", value: '"Geist", system-ui, -apple-system, sans-serif' },
  { label: "Serif", value: 'Georgia, "Times New Roman", serif' },
  { label: "Mono", value: '"Geist Mono", ui-monospace, SFMono-Regular, monospace' },
  { label: "Rounded", value: '"Trebuchet MS", "Segoe UI", sans-serif' },
  { label: "Grotesk", value: '"Helvetica Neue", Arial, sans-serif' },
];

export const TEXT_PRESETS = [
  "Best Friends",
  "Summer 2026",
  "Happy Day",
  "Vacation",
  "Birthday",
  "Graduation",
];

/** Create a new text decoration centered on the canvas. */
export function createText(text: string): TextDecoration {
  return {
    id: uid("dec"),
    type: "text",
    text,
    fontFamily: FONT_OPTIONS[0].value,
    fontSize: 22,
    fontWeight: 700,
    color: "#111111",
    letterSpacing: 0,
    align: "center",
    x: 0.5,
    y: 0.5,
    scale: 1,
    rotation: 0,
    opacity: 1,
  };
}
