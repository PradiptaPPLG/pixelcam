/* ============================================================
   PIXELCAM — Creative Studio Sticker Registry
   Built-in packs. Most glyphs reuse lucide-react (SVG, so they
   export cleanly via html2canvas); a few are custom inline SVGs.
   ============================================================ */

import type { LucideIcon } from "lucide-react";
import {
  Cloud,
  Flower,
  Heart,
  Leaf,
  Moon,
  Palmtree,
  Rainbow,
  Ribbon,
  Shapes,
  Smile,
  Sparkles,
  Star,
  Sun,
} from "lucide-react";
import { uid } from "@/lib/utils";
import type { StickerDecoration } from "./types";

interface CustomGlyphProps {
  color: string;
}

/* --- Custom inline SVG glyphs ------------------------------------------ */

function TapeGlyph({ color }: CustomGlyphProps) {
  return (
    <svg viewBox="0 0 48 24" width="100%" height="100%" aria-hidden="true">
      <rect
        x="1"
        y="6"
        width="46"
        height="12"
        rx="1.5"
        fill={color}
        opacity="0.55"
      />
      <line x1="12" y1="6" x2="12" y2="18" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="24" y1="6" x2="24" y2="18" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="36" y1="6" x2="36" y2="18" stroke={color} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

function ButterflyGlyph({ color }: CustomGlyphProps) {
  return (
    <svg viewBox="0 0 48 48" width="100%" height="100%" aria-hidden="true">
      <g fill={color}>
        <ellipse cx="15" cy="17" rx="12" ry="10" opacity="0.85" />
        <ellipse cx="33" cy="17" rx="12" ry="10" opacity="0.85" />
        <ellipse cx="16" cy="33" rx="9" ry="8" opacity="0.65" />
        <ellipse cx="32" cy="33" rx="9" ry="8" opacity="0.65" />
        <rect x="22.5" y="12" width="3" height="26" rx="1.5" />
      </g>
    </svg>
  );
}

function DotsGlyph({ color }: CustomGlyphProps) {
  return (
    <svg viewBox="0 0 48 16" width="100%" height="100%" aria-hidden="true">
      <circle cx="8" cy="8" r="5" fill={color} />
      <circle cx="24" cy="8" r="5" fill={color} />
      <circle cx="40" cy="8" r="5" fill={color} />
    </svg>
  );
}

function LinesGlyph({ color }: CustomGlyphProps) {
  return (
    <svg viewBox="0 0 48 24" width="100%" height="100%" aria-hidden="true">
      <g stroke={color} strokeWidth="2.5" strokeLinecap="round">
        <line x1="4" y1="6" x2="44" y2="6" />
        <line x1="4" y1="12" x2="36" y2="12" />
        <line x1="4" y1="18" x2="44" y2="18" />
      </g>
    </svg>
  );
}

/* --- Registry ---------------------------------------------------------- */

export interface StickerDef {
  id: string;
  label: string;
  defaultColor: string;
  filled?: boolean;
  strokeWidth?: number;
  Icon?: LucideIcon;
  Custom?: (props: CustomGlyphProps) => React.ReactElement;
}

export interface StickerPack {
  id: string;
  name: string;
  stickers: StickerDef[];
}

export const STICKER_PACKS: StickerPack[] = [
  {
    id: "cute",
    name: "Cute",
    stickers: [
      { id: "sparkles", label: "Sparkles", defaultColor: "#F59E0B", Icon: Sparkles, filled: true },
      { id: "star", label: "Star", defaultColor: "#FBBF24", Icon: Star, filled: true },
      { id: "heart", label: "Heart", defaultColor: "#EC4899", Icon: Heart, filled: true },
      { id: "cloud", label: "Cloud", defaultColor: "#93C5FD", Icon: Cloud, filled: true },
      { id: "flower", label: "Flower", defaultColor: "#F472B6", Icon: Flower, filled: true },
      { id: "smile", label: "Smile", defaultColor: "#F59E0B", Icon: Smile, strokeWidth: 2 },
      { id: "ribbon", label: "Ribbon", defaultColor: "#FB7185", Icon: Ribbon, filled: true },
      { id: "tape", label: "Tape", defaultColor: "#A5B4FC", Custom: TapeGlyph },
    ],
  },
  {
    id: "summer",
    name: "Summer",
    stickers: [
      { id: "summer", label: "Summer", defaultColor: "#34D399", Icon: Palmtree, strokeWidth: 2 },
      { id: "leaves", label: "Leaves", defaultColor: "#22C55E", Icon: Leaf, filled: true },
      { id: "butterfly", label: "Butterfly", defaultColor: "#A78BFA", Custom: ButterflyGlyph },
      { id: "moon", label: "Moon", defaultColor: "#FCD34D", Icon: Moon, filled: true },
      { id: "sun", label: "Sun", defaultColor: "#F59E0B", Icon: Sun, strokeWidth: 2.25 },
      { id: "rainbow", label: "Rainbow", defaultColor: "#38BDF8", Icon: Rainbow, strokeWidth: 2.25 },
    ],
  },
  {
    id: "minimal",
    name: "Minimal",
    stickers: [
      { id: "dots", label: "Dots", defaultColor: "#111111", Custom: DotsGlyph },
      { id: "lines", label: "Lines", defaultColor: "#111111", Custom: LinesGlyph },
      { id: "shapes", label: "Shapes", defaultColor: "#6B7280", Icon: Shapes, strokeWidth: 2 },
    ],
  },
];

const STICKER_INDEX: Record<string, StickerDef> = Object.fromEntries(
  STICKER_PACKS.flatMap((pack) => pack.stickers).map((sticker) => [
    sticker.id,
    sticker,
  ]),
);

export function getStickerDef(id: string): StickerDef | undefined {
  return STICKER_INDEX[id];
}

/** Render a sticker glyph filling its container. */
export function StickerGlyph({
  def,
  color,
}: {
  def: StickerDef;
  color: string;
}) {
  if (def.Custom) return <def.Custom color={color} />;
  if (!def.Icon) return null;
  const Icon = def.Icon;
  return (
    <Icon
      width="100%"
      height="100%"
      color={color}
      fill={def.filled ? color : "none"}
      strokeWidth={def.strokeWidth ?? 2}
      absoluteStrokeWidth
      aria-hidden="true"
    />
  );
}

/** Create a new sticker decoration centered on the canvas. */
export function createSticker(stickerId: string): StickerDecoration {
  const def = getStickerDef(stickerId);
  return {
    id: uid("dec"),
    type: "sticker",
    stickerId,
    color: def?.defaultColor ?? "#111111",
    x: 0.5,
    y: 0.5,
    scale: 1,
    rotation: 0,
    opacity: 1,
  };
}
