/* ============================================================
   PIXELCAM — Template Data
   Each template defines its overlay image and the photo slots
   as percentage-based coordinates of the full template image.
   ============================================================ */

export interface PhotoSlot {
  /** X offset from left, as percentage of template width (0–100) */
  xPct: number;
  /** Y offset from top, as percentage of template height (0–100) */
  yPct: number;
  /** Slot width as percentage of template width */
  widthPct: number;
  /** Slot height as percentage of template height */
  heightPct: number;
}

export interface TemplatePreset {
  id: string;
  name: string;
  description: string;
  /** Thumbnail shown in the gallery */
  previewSrc: string;
  /** The overlay PNG (with transparent holes) placed over the photos */
  overlaySrc: string;
  /** Photo slots — defined as percentage of the overlay image dimensions */
  slots: PhotoSlot[];
  /** Aspect ratio of the full template (width / height) */
  aspectRatio: number;
  /** Optional inline styles to apply to the overlay img */
  overlayStyle?: Record<string, string | number>;
}

export const TEMPLATE_PRESETS: TemplatePreset[] = [
  {
    id: "template1",
    name: "Airmail Love",
    description: "Vintage postcard-style strip with red & blue airmail borders.",
    previewSrc: "/templates/template1.png",
    overlaySrc: "/templates/template1.png",
    aspectRatio: 289 / 862,
    slots: [
      { xPct: 8.65, yPct: 3.48, widthPct: 85.12, heightPct: 21.81 },
      { xPct: 8.65, yPct: 27.38, widthPct: 85.12, heightPct: 21.69 },
      { xPct: 8.65, yPct: 51.16, widthPct: 85.12, heightPct: 21.81 },
    ],
  },
  {
    id: "template2",
    name: "Monkey Sidekick",
    description: "Fun side-by-side template with monkeys cheering you on.",
    previewSrc: "/templates/template2.png",
    overlaySrc: "/templates/template2.png",
    aspectRatio: (2 * 2094) / 6480,
    slots: [
      { xPct: 0, yPct: 0, widthPct: 50, heightPct: 25 },
      { xPct: 0, yPct: 25, widthPct: 50, heightPct: 25 },
      { xPct: 0, yPct: 50, widthPct: 50, heightPct: 25 },
      { xPct: 0, yPct: 75, widthPct: 50, heightPct: 25 },
    ],
    overlayStyle: {
      left: "50%",
      width: "50%",
    },
  },
  {
    id: "template3",
    name: "SpongeBob & Patrick",
    description: "Playful frames featuring SpongeBob and Patrick.",
    previewSrc: "/templates/template3.png",
    overlaySrc: "/templates/template3.png",
    aspectRatio: 1363 / 2046,
    slots: [
      { xPct: 53.63, yPct: 3.91, widthPct: 40.94, heightPct: 19.50 },
      { xPct: 5.50, yPct: 28.79, widthPct: 40.94, heightPct: 19.50 },
      { xPct: 53.78, yPct: 53.76, widthPct: 40.87, heightPct: 19.50 },
      { xPct: 5.50, yPct: 77.57, widthPct: 40.94, heightPct: 19.50 },
    ],
  },
  {
    id: "template4",
    name: "Artist Not Famous",
    description: "A newspaper layout for the undiscovered artist in you.",
    previewSrc: "/templates/template4.png",
    overlaySrc: "/templates/template4.png",
    aspectRatio: 1043 / 1508,
    slots: [
      { xPct: 35.09, yPct: 35.01, widthPct: 62.22, heightPct: 36.07 },
    ],
  },
  {
    id: "template5",
    name: "Film Strip Classic",
    description: "Classic vertical film strip frames with clean borders.",
    previewSrc: "/templates/template5.png",
    overlaySrc: "/templates/template5.png",
    aspectRatio: 640 / 1608,
    slots: [
      { xPct: 13.75, yPct: 5.53, widthPct: 72.50, heightPct: 18.28 },
      { xPct: 13.75, yPct: 31.78, widthPct: 72.50, heightPct: 18.28 },
      { xPct: 13.75, yPct: 58.02, widthPct: 72.50, heightPct: 18.28 },
    ],
  },
  {
    id: "template6",
    name: "The Archive",
    description: "Retro newspaper archive featuring articles all about you.",
    previewSrc: "/templates/template6.png",
    overlaySrc: "/templates/template6.png",
    aspectRatio: 1054 / 1492,
    slots: [
      { xPct: 9.01, yPct: 33.04, widthPct: 81.88, heightPct: 28.42 },
      { xPct: 54.55, yPct: 65.68, widthPct: 37.76, heightPct: 20.98 },
    ],
  },
  {
    id: "template7",
    name: "Starry Night Blue",
    description: "Deep blue night frame decorated with golden stars and flowers.",
    previewSrc: "/templates/template7.png",
    overlaySrc: "/templates/template7.png",
    aspectRatio: 199 / 595,
    slots: [
      { xPct: 5.52, yPct: 2.69, widthPct: 88.43, heightPct: 25.04 },
      { xPct: 5.52, yPct: 30.25, widthPct: 88.43, heightPct: 25.38 },
      { xPct: 5.52, yPct: 58.16, widthPct: 88.43, heightPct: 25.21 },
    ],
  },
  {
    id: "template8",
    name: "Pink Hearts",
    description: "Lovely pink checkered frame with romantic heart patterns.",
    previewSrc: "/templates/template8.png",
    overlaySrc: "/templates/template8.png",
    aspectRatio: 541 / 1308,
    slots: [
      { xPct: 10.72, yPct: 4.36, widthPct: 76.52, heightPct: 24.46 },
      { xPct: 10.54, yPct: 30.66, widthPct: 77.08, heightPct: 24.54 },
      { xPct: 12.38, yPct: 56.88, widthPct: 75.79, heightPct: 24.24 },
    ],
  },
  {
    id: "template9",
    name: "Vintage Scrapbook",
    description: "Grungy vintage scrapbook layout with photo borders.",
    previewSrc: "/templates/template9.png",
    overlaySrc: "/templates/template9.png",
    aspectRatio: 471 / 1308,
    slots: [
      { xPct: 9.77, yPct: 0.69, widthPct: 81.53, heightPct: 22.94 },
      { xPct: 9.13, yPct: 24.77, widthPct: 81.74, heightPct: 22.55 },
      { xPct: 8.70, yPct: 48.47, widthPct: 81.74, heightPct: 22.63 },
      { xPct: 8.28, yPct: 73.01, widthPct: 81.53, heightPct: 22.63 },
    ],
  },
  {
    id: "template10",
    name: "Hatchu Hearts",
    description: "Cute heart-shaped photo slots over a starry denim background.",
    previewSrc: "/templates/template10.png",
    overlaySrc: "/templates/template10.png",
    aspectRatio: 476 / 1308,
    slots: [
      { xPct: 12.18, yPct: 8.18, widthPct: 75.63, heightPct: 24.39 },
      { xPct: 12.18, yPct: 40.67, widthPct: 75.63, heightPct: 24.39 },
      { xPct: 12.18, yPct: 73.17, widthPct: 75.63, heightPct: 24.39 },
    ],
  },
  {
    id: "template11",
    name: "Bunnies",
    description: "Cute bunny decorations with circular photo slots on a blue checkered background.",
    previewSrc: "/templates/template11.png",
    overlaySrc: "/templates/template11.png",
    aspectRatio: 675 / 1200,
    slots: [
      { xPct: 17.48, yPct: 3.33, widthPct: 64.44, heightPct: 28.42 },
      { xPct: 19.11, yPct: 32.33, widthPct: 61.33, heightPct: 26.42 },
      { xPct: 19.26, yPct: 61.08, widthPct: 63.11, heightPct: 26.50 },
    ],
  },
  {
    id: "template12",
    name: "Kawaii Pink Grid",
    description: "Adorable pink grid strip with starry frame borders.",
    previewSrc: "/templates/template12.png",
    overlaySrc: "/templates/template12.png",
    aspectRatio: 185 / 550,
    slots: [
      { xPct: 7.02, yPct: 2.55, widthPct: 86.49, heightPct: 24.90 },
      { xPct: 6.50, yPct: 30.73, widthPct: 86.49, heightPct: 24.90 },
      { xPct: 6.50, yPct: 58.18, widthPct: 87.05, heightPct: 24.73 },
    ],
  },
];

/** Convenience: find a template by id, or null if not found. */
export function getTemplateById(id: string): TemplatePreset | null {
  return TEMPLATE_PRESETS.find((t) => t.id === id) ?? null;
}

