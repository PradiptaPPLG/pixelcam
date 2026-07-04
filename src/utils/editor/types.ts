/* ============================================================
   PIXELCAM — Creative Studio Types
   ============================================================ */

export type Alignment = "left" | "center" | "right";

/** Shared transform for any decoration placed on the strip. */
export interface DecorationBase {
  id: string;
  /** Center X as a fraction of the canvas width (0–1). */
  x: number;
  /** Center Y as a fraction of the canvas height (0–1). */
  y: number;
  /** Size multiplier. */
  scale: number;
  /** Rotation in degrees. */
  rotation: number;
  /** Opacity (0–1). */
  opacity: number;
}

export interface StickerDecoration extends DecorationBase {
  type: "sticker";
  stickerId: string;
  color: string;
}

export interface TextDecoration extends DecorationBase {
  type: "text";
  text: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  color: string;
  letterSpacing: number;
  align: Alignment;
}

export type Decoration = StickerDecoration | TextDecoration;

/** Photo tone / strip-level adjustments. */
export interface Adjustments {
  brightness: number; // %  (default 100)
  contrast: number; // %   (default 100)
  saturation: number; // % (default 100)
  warmth: number; // -100..100 (default 0)
  exposure: number; // -100..100 (default 0)
  opacity: number; // %    (default 100)
  shadow: number; // 0..100 (default 0)
  radius: number; // px 0..40 (default 16)
}

/** The full editable document (what history tracks & export reads). */
export interface EditorDoc {
  decorations: Decoration[];
  adjustments: Adjustments;
  frameId: string;
}
