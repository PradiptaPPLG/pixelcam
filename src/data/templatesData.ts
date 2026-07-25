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
  /** If true, shown in the Trending section at the top */
  trending?: boolean;
  /** Display label for usage count e.g. "1.5k used" */
  usedCount?: string;
}

/** Standard 3-slot strip slots (portrait ~0.55 ratio) used for all trending templates */
const STRIP_3_SLOTS: PhotoSlot[] = [
  { xPct: 8.0, yPct: 4.5,  widthPct: 84.0, heightPct: 27.5 },
  { xPct: 8.0, yPct: 36.0, widthPct: 84.0, heightPct: 27.5 },
  { xPct: 8.0, yPct: 67.5, widthPct: 84.0, heightPct: 27.5 },
];

export const TEMPLATE_PRESETS: TemplatePreset[] = [
  /* ── TRENDING ─────────────────────────────────────────────── */
  {
    id: "trending1",
    trending: true,
    usedCount: "1.5k used",
    name: "Trending #1",
    description: "Popular 3-frame photo strip.",
    previewSrc: "/templates/trending1.png",
    overlaySrc: "/templates/trending1.png",
    aspectRatio: 855 / 1839,
    slots: [
      { xPct: 15.44, yPct: 8.21, widthPct: 69.71, heightPct: 23.71 },
      { xPct: 6.78, yPct: 33.88, widthPct: 82.11, heightPct: 32.14 },
      { xPct: 6.43, yPct: 66.01, widthPct: 68.77, heightPct: 15.28 }
    ]
  },
  {
    id: "trending2",
    trending: true,
    usedCount: "1.4k used",
    name: "Trending #2",
    description: "Popular 3-frame photo strip.",
    previewSrc: "/templates/trending2.png",
    overlaySrc: "/templates/trending2.png",
    aspectRatio: 929 / 1693,
    slots: [
      { xPct: 24.33, yPct: 17.19, widthPct: 56.84, heightPct: 15.83 },
      { xPct: 24.22, yPct: 33.02, widthPct: 56.94, heightPct: 32.96 },
      { xPct: 24.22, yPct: 65.98, widthPct: 56.94, heightPct: 14.83 }
    ]
  },
  {
    id: "trending3",
    trending: true,
    usedCount: "1.3k used",
    name: "Trending #3",
    description: "Popular 3-frame photo strip.",
    previewSrc: "/templates/trending3.png",
    overlaySrc: "/templates/trending3.png",
    aspectRatio: 1024 / 1536,
    slots: [
      { xPct: 26.95, yPct: 18.1, widthPct: 46.0, heightPct: 14.91 },
      { xPct: 26.95, yPct: 33.01, widthPct: 46.19, heightPct: 33.01 },
      { xPct: 27.05, yPct: 66.02, widthPct: 45.9, heightPct: 18.42 }
    ]
  },
  {
    id: "trending4",
    trending: true,
    usedCount: "1.2k used",
    name: "Trending #4",
    description: "Popular 3-frame photo strip.",
    previewSrc: "/templates/trending4.png",
    overlaySrc: "/templates/trending4.png",
    aspectRatio: 1086 / 1448,
    slots: [
      { xPct: 29.83, yPct: 26.45, widthPct: 41.53, heightPct: 6.56 },
      { xPct: 29.83, yPct: 33.01, widthPct: 41.44, heightPct: 31.15 },
      { xPct: 29.65, yPct: 66.02, widthPct: 41.71, heightPct: 17.4 }
    ]
  },
  {
    id: "trending5",
    trending: true,
    usedCount: "1.2k used",
    name: "Trending #5",
    description: "Popular 3-frame photo strip.",
    previewSrc: "/templates/trending5.png",
    overlaySrc: "/templates/trending5.png",
    aspectRatio: 929 / 1694,
    slots: [
      { xPct: 15.93, yPct: 12.87, widthPct: 66.42, heightPct: 20.13 },
      { xPct: 15.93, yPct: 33.0, widthPct: 68.25, heightPct: 32.59 },
      { xPct: 16.79, yPct: 71.49, widthPct: 67.28, heightPct: 20.31 }
    ]
  },
  {
    id: "trending6",
    trending: true,
    usedCount: "1.1k used",
    name: "Trending #6",
    description: "Popular 3-frame photo strip.",
    previewSrc: "/templates/trending6.png",
    overlaySrc: "/templates/trending6.png",
    aspectRatio: 929 / 1693,
    slots: [
      { xPct: 17.87, yPct: 12.82, widthPct: 65.12, heightPct: 20.2 },
      { xPct: 17.87, yPct: 33.02, widthPct: 65.12, heightPct: 32.96 },
      { xPct: 18.19, yPct: 65.98, widthPct: 64.91, heightPct: 29.12 }
    ]
  },
  {
    id: "trending7",
    trending: true,
    usedCount: "1.1k used",
    name: "Trending #7",
    description: "Popular 3-frame photo strip.",
    previewSrc: "/templates/trending7.png",
    overlaySrc: "/templates/trending7.png",
    aspectRatio: 853 / 1844,
    slots: [
      { xPct: 21.34, yPct: 18.55, widthPct: 59.79, heightPct: 14.48 },
      { xPct: 20.05, yPct: 33.03, widthPct: 62.02, heightPct: 32.27 },
      { xPct: 20.05, yPct: 70.88, widthPct: 61.55, heightPct: 20.61 }
    ]
  },
  {
    id: "trending8",
    trending: true,
    usedCount: "1.0k used",
    name: "Trending #8",
    description: "Popular 3-frame photo strip.",
    previewSrc: "/templates/trending8.png",
    overlaySrc: "/templates/trending8.png",
    aspectRatio: 851 / 1847,
    slots: [
      { xPct: 16.8, yPct: 24.53, widthPct: 67.33, heightPct: 8.5 },
      { xPct: 15.04, yPct: 33.03, widthPct: 70.86, heightPct: 32.11 },
      { xPct: 14.92, yPct: 69.9, widthPct: 70.74, heightPct: 17.43 }
    ]
  },
  {
    id: "trending9",
    trending: true,
    usedCount: "980 used",
    name: "Trending #9",
    description: "Popular 3-frame photo strip.",
    previewSrc: "/templates/trending9.png",
    overlaySrc: "/templates/trending9.png",
    aspectRatio: 929 / 1694,
    slots: [
      { xPct: 19.05, yPct: 14.4, widthPct: 62.0, heightPct: 18.6 },
      { xPct: 19.05, yPct: 33.0, widthPct: 62.0, heightPct: 33.0 },
      { xPct: 20.78, yPct: 66.0, widthPct: 57.8, heightPct: 20.01 }
    ]
  },
  {
    id: "trending10",
    trending: true,
    usedCount: "950 used",
    name: "Trending #10",
    description: "Popular 3-frame photo strip.",
    previewSrc: "/templates/trending10.png",
    overlaySrc: "/templates/trending10.png",
    aspectRatio: 929 / 1694,
    slots: [
      { xPct: 16.15, yPct: 12.93, widthPct: 66.52, heightPct: 20.07 },
      { xPct: 16.15, yPct: 33.0, widthPct: 66.09, heightPct: 32.7 },
      { xPct: 16.47, yPct: 71.19, widthPct: 64.8, heightPct: 23.02 }
    ]
  },
  {
    id: "trending11",
    trending: true,
    usedCount: "920 used",
    name: "Trending #11",
    description: "Popular 3-frame photo strip.",
    previewSrc: "/templates/trending11.png",
    overlaySrc: "/templates/trending11.png",
    aspectRatio: 929 / 1694,
    slots: [
      { xPct: 18.41, yPct: 14.7, widthPct: 59.96, heightPct: 18.3 },
      { xPct: 18.84, yPct: 33.0, widthPct: 59.42, heightPct: 29.87 },
      { xPct: 19.05, yPct: 66.06, widthPct: 58.88, heightPct: 26.8 }
    ]
  },
  {
    id: "trending12",
    trending: true,
    usedCount: "900 used",
    name: "Trending #12",
    description: "Popular 3-frame photo strip.",
    previewSrc: "/templates/trending12.png",
    overlaySrc: "/templates/trending12.png",
    aspectRatio: 929 / 1693,
    slots: [
      { xPct: 25.4, yPct: 15.3, widthPct: 50.91, heightPct: 17.72 },
      { xPct: 25.4, yPct: 33.02, widthPct: 50.91, heightPct: 32.96 },
      { xPct: 25.4, yPct: 65.98, widthPct: 50.81, heightPct: 10.57 }
    ]
  },
  {
    id: "trending13",
    trending: true,
    usedCount: "880 used",
    name: "Trending #13",
    description: "Popular 3-frame photo strip.",
    previewSrc: "/templates/trending13.png",
    overlaySrc: "/templates/trending13.png",
    aspectRatio: 929 / 1692,
    slots: [
      { xPct: 28.09, yPct: 15.72, widthPct: 46.07, heightPct: 17.26 },
      { xPct: 27.99, yPct: 32.98, widthPct: 46.18, heightPct: 33.04 },
      { xPct: 27.99, yPct: 66.02, widthPct: 46.18, heightPct: 13.12 }
    ]
  },
  {
    id: "trending14",
    trending: true,
    usedCount: "860 used",
    name: "Trending #14",
    description: "Popular 3-frame photo strip.",
    previewSrc: "/templates/trending14.png",
    overlaySrc: "/templates/trending14.png",
    aspectRatio: 929 / 1693,
    slots: [
      { xPct: 24.87, yPct: 16.13, widthPct: 49.62, heightPct: 16.89 },
      { xPct: 24.87, yPct: 33.02, widthPct: 49.52, heightPct: 32.96 },
      { xPct: 24.87, yPct: 65.98, widthPct: 49.41, heightPct: 14.59 }
    ]
  },
  {
    id: "trending15",
    trending: true,
    usedCount: "840 used",
    name: "Trending #15",
    description: "Popular 3-frame photo strip.",
    previewSrc: "/templates/trending15.png",
    overlaySrc: "/templates/trending15.png",
    aspectRatio: 929 / 1693,
    slots: [
      { xPct: 27.45, yPct: 16.3, widthPct: 45.86, heightPct: 16.72 },
      { xPct: 27.45, yPct: 33.02, widthPct: 45.86, heightPct: 32.96 },
      { xPct: 27.56, yPct: 65.98, widthPct: 45.75, heightPct: 16.54 }
    ]
  },
  {
    id: "trending16",
    trending: true,
    usedCount: "820 used",
    name: "Trending #16",
    description: "Popular 3-frame photo strip.",
    previewSrc: "/templates/trending16.png",
    overlaySrc: "/templates/trending16.png",
    aspectRatio: 929 / 1692,
    slots: [
      { xPct: 25.3, yPct: 7.8, widthPct: 60.17, heightPct: 25.18 },
      { xPct: 18.84, yPct: 32.98, widthPct: 61.36, heightPct: 33.04 },
      { xPct: 21.21, yPct: 66.02, widthPct: 58.99, heightPct: 21.51 }
    ]
  },
  {
    id: "trending17",
    trending: true,
    usedCount: "800 used",
    name: "Trending #17",
    description: "Popular 3-frame photo strip.",
    previewSrc: "/templates/trending17.png",
    overlaySrc: "/templates/trending17.png",
    aspectRatio: 929 / 1692,
    slots: [
      { xPct: 18.08, yPct: 13.95, widthPct: 65.88, heightPct: 19.03 },
      { xPct: 17.98, yPct: 32.98, widthPct: 66.09, heightPct: 33.04 },
      { xPct: 17.98, yPct: 66.02, widthPct: 66.09, heightPct: 27.25 }
    ]
  },
  {
    id: "trending18",
    trending: true,
    usedCount: "780 used",
    name: "Trending #18",
    description: "Popular 3-frame photo strip.",
    previewSrc: "/templates/trending18.png",
    overlaySrc: "/templates/trending18.png",
    aspectRatio: 929 / 1692,
    slots: [
      { xPct: 23.04, yPct: 9.16, widthPct: 58.23, heightPct: 23.82 },
      { xPct: 20.99, yPct: 32.98, widthPct: 59.42, heightPct: 33.04 },
      { xPct: 21.21, yPct: 66.02, widthPct: 59.2, heightPct: 23.11 }
    ]
  },
  {
    id: "trending19",
    trending: true,
    usedCount: "760 used",
    name: "Trending #19",
    description: "Popular 3-frame photo strip.",
    previewSrc: "/templates/trending19.png",
    overlaySrc: "/templates/trending19.png",
    aspectRatio: 929 / 1692,
    slots: [
      { xPct: 13.89, yPct: 12.0, widthPct: 64.48, heightPct: 20.98 },
      { xPct: 19.81, yPct: 32.98, widthPct: 57.7, heightPct: 31.8 },
      { xPct: 19.27, yPct: 67.61, widthPct: 57.27, heightPct: 26.36 }
    ]
  },
  {
    id: "trending20",
    trending: true,
    usedCount: "740 used",
    name: "Trending #20",
    description: "Popular 3-frame photo strip.",
    previewSrc: "/templates/trending20.png",
    overlaySrc: "/templates/trending20.png",
    aspectRatio: 822 / 1913,
    slots: [
      { xPct: 14.72, yPct: 19.29, widthPct: 70.56, heightPct: 13.7 },
      { xPct: 14.72, yPct: 32.98, widthPct: 70.56, heightPct: 30.68 },
      { xPct: 14.72, yPct: 68.84, widthPct: 70.68, heightPct: 19.34 }
    ]
  },
  {
    id: "trending21",
    trending: true,
    usedCount: "720 used",
    name: "Trending #21",
    description: "Popular 3-frame photo strip.",
    previewSrc: "/templates/trending21.png",
    overlaySrc: "/templates/trending21.png",
    aspectRatio: 887 / 1774,
    slots: [
      { xPct: 14.99, yPct: 19.0, widthPct: 70.01, heightPct: 13.98 },
      { xPct: 14.99, yPct: 32.98, widthPct: 70.12, heightPct: 33.03 },
      { xPct: 14.99, yPct: 66.01, widthPct: 70.24, heightPct: 24.07 }
    ]
  },
  {
    id: "trending23",
    trending: true,
    usedCount: "700 used",
    name: "Trending #23",
    description: "Popular 3-frame photo strip.",
    previewSrc: "/templates/trending23.png",
    overlaySrc: "/templates/trending23.png",
    aspectRatio: 887 / 1774,
    slots: [
      { xPct: 11.84, yPct: 18.49, widthPct: 76.44, heightPct: 14.49 },
      { xPct: 11.84, yPct: 32.98, widthPct: 76.44, heightPct: 32.36 },
      { xPct: 11.84, yPct: 67.02, widthPct: 76.44, heightPct: 23.9 }
    ]
  },
  {
    id: "trending24",
    trending: true,
    usedCount: "680 used",
    name: "Trending #24",
    description: "Popular 3-frame photo strip.",
    previewSrc: "/templates/trending24.png",
    overlaySrc: "/templates/trending24.png",
    aspectRatio: 929 / 1693,
    slots: [
      { xPct: 20.78, yPct: 9.1, widthPct: 58.34, heightPct: 23.92 },
      { xPct: 24.33, yPct: 33.02, widthPct: 54.68, heightPct: 32.49 },
      { xPct: 24.97, yPct: 69.29, widthPct: 53.71, heightPct: 26.76 }
    ]
  },
  {
    id: "trending25",
    trending: true,
    usedCount: "660 used",
    name: "Trending #25",
    description: "Popular 3-frame photo strip.",
    previewSrc: "/templates/trending25.png",
    overlaySrc: "/templates/trending25.png",
    aspectRatio: 928 / 1695,
    slots: [
      { xPct: 16.06, yPct: 12.51, widthPct: 59.27, heightPct: 20.47 },
      { xPct: 18.64, yPct: 32.98, widthPct: 59.91, heightPct: 31.15 },
      { xPct: 25.43, yPct: 68.02, widthPct: 52.48, heightPct: 23.01 }
    ]
  },
  {
    id: "trending26",
    trending: true,
    usedCount: "640 used",
    name: "Trending #26",
    description: "Popular 3-frame photo strip.",
    previewSrc: "/templates/trending26.png",
    overlaySrc: "/templates/trending26.png",
    aspectRatio: 933 / 1686,
    slots: [
      { xPct: 23.15, yPct: 9.96, widthPct: 49.41, heightPct: 23.01 },
      { xPct: 23.26, yPct: 32.98, widthPct: 50.05, heightPct: 33.04 },
      { xPct: 21.54, yPct: 66.01, widthPct: 51.55, heightPct: 26.22 }
    ]
  },
  {
    id: "trending27",
    trending: true,
    usedCount: "620 used",
    name: "Trending #27",
    description: "Popular 3-frame photo strip.",
    previewSrc: "/templates/trending27.png",
    overlaySrc: "/templates/trending27.png",
    aspectRatio: 725 / 2167,
    slots: [
      { xPct: 8.97, yPct: 8.58, widthPct: 83.86, heightPct: 21.92 },
      { xPct: 12.83, yPct: 39.27, widthPct: 74.34, heightPct: 20.4 },
      { xPct: 9.24, yPct: 67.14, widthPct: 83.86, heightPct: 18.74 }
    ]
  },
  {
    id: "trending28",
    trending: true,
    usedCount: "600 used",
    name: "Trending #28",
    description: "Popular 3-frame photo strip.",
    previewSrc: "/templates/trending28.png",
    overlaySrc: "/templates/trending28.png",
    aspectRatio: 735 / 2140,
    slots: [
      { xPct: 8.0, yPct: 4.5, widthPct: 84.0, heightPct: 27.5 },
      { xPct: 8.0, yPct: 36.0, widthPct: 84.0, heightPct: 27.5 },
      { xPct: 8.0, yPct: 67.5, widthPct: 84.0, heightPct: 27.5 }
    ]
  },
  {
    id: "trending29",
    trending: true,
    usedCount: "580 used",
    name: "Trending #29",
    description: "Popular 3-frame photo strip.",
    previewSrc: "/templates/trending29.png",
    overlaySrc: "/templates/trending29.png",
    aspectRatio: 887 / 1774,
    slots: [
      { xPct: 13.42, yPct: 18.32, widthPct: 75.87, heightPct: 14.66 },
      { xPct: 13.42, yPct: 32.98, widthPct: 75.87, heightPct: 32.07 },
      { xPct: 13.19, yPct: 66.52, widthPct: 76.1, heightPct: 26.49 }
    ]
  },
  /* ── CLASSIC ──────────────────────────────────────────────── */
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

