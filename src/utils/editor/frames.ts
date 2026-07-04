/* ============================================================
   PIXELCAM — Creative Studio Frame Overlays (metadata)
   The visual overlay for each frame is rendered by <FrameOverlay>.
   ============================================================ */

export interface FramePreset {
  id: string;
  name: string;
  description: string;
}

export const FRAMES: FramePreset[] = [
  { id: "none", name: "None", description: "No frame overlay." },
  { id: "polaroid", name: "Polaroid", description: "White border, thick base." },
  { id: "filmstrip", name: "Film Strip", description: "Sprocket-hole edges." },
  { id: "rounded", name: "Rounded", description: "Soft white inner border." },
  { id: "classic", name: "Classic", description: "Clean dark keyline." },
  { id: "vintage", name: "Vintage", description: "Warm double border." },
  { id: "minimal", name: "Minimal", description: "Hairline outline." },
];

export const DEFAULT_FRAME_ID = "none";

export function getFrameById(id: string): FramePreset {
  return FRAMES.find((frame) => frame.id === id) ?? FRAMES[0];
}
