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
  /** If true, shown in the Official section at the very top */
  official?: boolean;
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
  /* ── OFFICIAL ─────────────────────────────────────────────── */
  {
    id: "official1",
    official: true,
    usedCount: "Official",
    name: "RPL EXPO — GitHub",
    description: "Official RPL EXPO template with GitHub pixel art theme.",
    previewSrc: "/templates/official1.png",
    overlaySrc: "/templates/official1.png",
    aspectRatio: 862 / 1825,
    slots: [
      { xPct: 19.84, yPct: 21.48, widthPct: 58.24, heightPct: 20.71 },
      { xPct: 19.84, yPct: 44.82, widthPct: 58.24, heightPct: 20.55 },
      { xPct: 19.84, yPct: 67.95, widthPct: 58.24, heightPct: 18.03 },
    ],
  },
  {
    id: "official2",
    official: true,
    usedCount: "Official",
    name: "RPL EXPO — Arcade",
    description: "Official RPL EXPO template with retro arcade game theme.",
    previewSrc: "/templates/official2.png",
    overlaySrc: "/templates/official2.png",
    aspectRatio: 863 / 1823,
    slots: [
      { xPct: 14.72, yPct: 20.68, widthPct: 69.87, heightPct: 20.30 },
      { xPct: 14.72, yPct: 44.21, widthPct: 69.76, heightPct: 19.20 },
      { xPct: 14.72, yPct: 66.59, widthPct: 69.87, heightPct: 19.47 },
    ],
  },
  {
    id: "official3",
    official: true,
    usedCount: "Official",
    name: "RPL EXPO — VS Code",
    description: "Official RPL EXPO template with VS Code developer theme.",
    previewSrc: "/templates/official3.png",
    overlaySrc: "/templates/official3.png",
    aspectRatio: 858 / 1834,
    slots: [
      { xPct: 20.75, yPct: 20.50, widthPct: 58.51, heightPct: 20.01 },
      { xPct: 20.40, yPct: 43.35, widthPct: 58.86, heightPct: 20.28 },
      { xPct: 20.40, yPct: 66.58, widthPct: 58.86, heightPct: 19.25 },
    ],
  },
  {
    id: "official4",
    official: true,
    usedCount: "Official",
    name: "RPL EXPO — PC Build",
    description: "Official RPL EXPO template with PC hardware & tech theme.",
    previewSrc: "/templates/official4.png",
    overlaySrc: "/templates/official4.png",
    aspectRatio: 863 / 1822,
    slots: [
      { xPct: 20.51, yPct: 20.97, widthPct: 59.21, heightPct: 19.48 },
      { xPct: 20.51, yPct: 43.41, widthPct: 59.21, heightPct: 19.26 },
      { xPct: 20.51, yPct: 65.70, widthPct: 59.21, heightPct: 19.37 },
    ],
  },
  {
    id: "official5",
    official: true,
    usedCount: "Official",
    name: "RPL EXPO — Mario",
    description: "Official RPL EXPO template with classic Mario retro game theme.",
    previewSrc: "/templates/official5.png",
    overlaySrc: "/templates/official5.png",
    aspectRatio: 836 / 1881,
    slots: [
      { xPct: 14.11, yPct:  9.36, widthPct: 72.97, heightPct: 21.85 },
      { xPct: 14.11, yPct: 34.24, widthPct: 72.97, heightPct: 20.63 },
      { xPct: 14.11, yPct: 57.89, widthPct: 72.97, heightPct: 20.20 },
    ],
  },
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
             { xPct: 15.44, yPct: 8.21,  widthPct: 69.60,heightPct: 22.10 }, // Slot 1 (Biru) - Tetap
             { xPct: 5.50,  yPct: 33.50, widthPct: 87.00, heightPct: 30.00 }, // Slot 2 (Hijau) - Diperlebar maksimal ke kiri & kanan
             { xPct: 6.00,  yPct: 56.50, widthPct: 79.00, heightPct: 32.50 }  // Slot 3 (Merah) - Naik jauh & geser kiri drastis
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
      { xPct: 24.33, yPct: 17.19, widthPct: 56.84, heightPct: 20.14 },
      { xPct: 24.22, yPct: 38.87, widthPct: 56.94, heightPct: 20.14 },
      { xPct: 24.22, yPct: 60.66, widthPct: 56.94, heightPct: 20.14 }
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
      { xPct: 26.95, yPct: 18.1, widthPct: 46.09, heightPct: 21.03 },
      { xPct: 26.95, yPct: 40.69, widthPct: 46.19, heightPct: 21.03 },
      { xPct: 27.05, yPct: 63.41, widthPct: 45.9, heightPct: 21.03 }
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
      { xPct: 29.83, yPct: 26.45, widthPct: 41.53, heightPct: 18.02 },
      { xPct: 29.93, yPct: 46.69, widthPct: 41.34, heightPct: 17.47 },
      { xPct: 29.65, yPct: 66.02, widthPct: 41.71, heightPct: 17.40 }
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
      { xPct: 15.93, yPct: 12.87, widthPct: 66.42, heightPct: 24.09 },
      { xPct: 15.93, yPct: 42.09, widthPct: 68.25, heightPct: 23.49 },
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
      { xPct: 17.87, yPct: 12.82, widthPct: 65.12, heightPct: 24.99 },
      { xPct: 17.87, yPct: 41.29, widthPct: 65.12, heightPct: 26.40 },
      { xPct: 18.19, yPct: 71.35, widthPct: 64.91, heightPct: 23.74 }
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
      { xPct: 21.34, yPct: 18.55, widthPct: 59.79, heightPct: 20.48 },
      { xPct: 20.00, yPct: 44.00, widthPct: 62.10, heightPct: 21.30 },
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
      { xPct: 16.80, yPct: 24.53, widthPct: 67.33, heightPct: 18.35 },
      { xPct: 15.04, yPct: 47.54, widthPct: 70.86, heightPct: 17.60 },
      { xPct: 14.92, yPct: 69.90, widthPct: 70.74, heightPct: 17.43 }
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
      { xPct: 19.05, yPct: 14.40, widthPct: 62.00, heightPct: 23.26 },
      { xPct: 20.45, yPct: 40.50, widthPct: 59.53, heightPct: 21.25 },
      { xPct: 20.78, yPct: 64.58, widthPct: 57.80, heightPct: 21.43 }
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
      { xPct: 16.15, yPct: 12.93, widthPct: 66.52, heightPct: 24.03 },
      { xPct: 16.15, yPct: 42.15, widthPct: 66.09, heightPct: 23.55 },
      { xPct: 16.47, yPct: 71.19, widthPct: 64.80, heightPct: 23.02 }
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
      { xPct: 18.41, yPct: 14.70, widthPct: 59.96, heightPct: 22.49 },
      { xPct: 18.84, yPct: 40.32, widthPct: 59.42, heightPct: 22.55 },
      { xPct: 19.05, yPct: 66.06, widthPct: 58.88, heightPct: 26.80 }
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
      { xPct: 25.4,  yPct: 15.30, widthPct: 50.91, heightPct: 19.26 },
      { xPct: 25.4,  yPct: 36.56, widthPct: 50.81, heightPct: 19.02 },
      { xPct: 25.4,  yPct: 57.47, widthPct: 50.81, heightPct: 19.14 }
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
      { xPct: 28.20, yPct: 15.66, widthPct: 45.96, heightPct: 20.15 },
      { xPct: 27.99, yPct: 37.23, widthPct: 46.18, heightPct: 20.27 },
      { xPct: 27.99, yPct: 58.87, widthPct: 46.18, heightPct: 20.33 }
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
      { xPct: 24.97, yPct: 16.13, widthPct: 49.41, heightPct: 20.61 },
      { xPct: 24.87, yPct: 38.22, widthPct: 49.52, heightPct: 20.61 },
      { xPct: 24.97, yPct: 60.37, widthPct: 49.52, heightPct: 20.26 }
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
      { xPct: 27.34, yPct: 16.24, widthPct: 46.07, heightPct: 21.03 },
      { xPct: 27.56, yPct: 38.92, widthPct: 45.75, heightPct: 20.97 },
      { xPct: 27.45, yPct: 61.31, widthPct: 45.96, heightPct: 21.26 }
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
      { xPct: 25.19, yPct: 7.74,  widthPct: 60.17, heightPct: 25.41 },
      { xPct: 18.73, yPct: 34.93, widthPct: 55.22, heightPct: 24.47 },
      { xPct: 21.10, yPct: 61.11, widthPct: 59.20, heightPct: 26.48 }
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
      { xPct: 17.98, yPct: 13.89, widthPct: 66.09, heightPct: 25.53 },
      { xPct: 19.38, yPct: 42.79, widthPct: 64.69, heightPct: 23.88 },
      { xPct: 17.87, yPct: 70.04, widthPct: 66.20, heightPct: 23.23 }
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
      { xPct: 23.04, yPct: 9.16,  widthPct: 58.34, heightPct: 23.94 },
      { xPct: 20.88, yPct: 35.87, widthPct: 58.99, heightPct: 25.06 },
      { xPct: 21.21, yPct: 63.71, widthPct: 59.31, heightPct: 25.47 }
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
      { xPct: 13.89, yPct: 12.12, widthPct: 64.48, heightPct: 25.30 },
      { xPct: 19.70, yPct: 39.48, widthPct: 57.37, heightPct: 25.30 },
      { xPct: 19.27, yPct: 67.55, widthPct: 56.30, heightPct: 26.48 }
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
      { xPct: 14.60, yPct: 19.24, widthPct: 70.80, heightPct: 19.65 },
      { xPct: 14.60, yPct: 44.07, widthPct: 70.80, heightPct: 19.60 },
      { xPct: 14.60, yPct: 68.90, widthPct: 70.80, heightPct: 19.34 }
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
      { xPct: 14.88, yPct: 18.94, widthPct: 70.24, heightPct: 20.86 },
      { xPct: 14.88, yPct: 42.16, widthPct: 70.35, heightPct: 20.91 },
      { xPct: 14.88, yPct: 65.67, widthPct: 70.46, heightPct: 24.46 }
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
      { xPct: 11.72, yPct: 18.49, widthPct: 76.66, heightPct: 22.49 },
      { xPct: 11.72, yPct: 42.56, widthPct: 76.66, heightPct: 22.83 },
      { xPct: 11.84, yPct: 66.97, widthPct: 76.44, heightPct: 24.07 }
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
      { xPct: 20.67, yPct: 9.04,  widthPct: 58.56, heightPct: 25.22 },
      { xPct: 24.87, yPct: 37.80, widthPct: 54.25, heightPct: 27.76 },
      { xPct: 24.97, yPct: 69.23, widthPct: 53.71, heightPct: 26.93 }
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
      { xPct: 17.03, yPct: 12.45, widthPct: 58.30, heightPct: 23.78 },
      { xPct: 26.83, yPct: 39.53, widthPct: 51.72, heightPct: 24.66 },
      { xPct: 25.43, yPct: 67.96, widthPct: 52.48, heightPct: 23.19 }
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
      { xPct: 23.15, yPct: 9.91,  widthPct: 49.52, heightPct: 26.28 },
      { xPct: 23.26, yPct: 38.37, widthPct: 50.05, heightPct: 27.94 },
      { xPct: 21.44, yPct: 68.33, widthPct: 51.77, heightPct: 23.96 }
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
      { xPct: 11.56, yPct: 9.35,  widthPct: 65.31, heightPct: 20.70 },
      { xPct: 11.56, yPct: 38.27, widthPct: 65.58, heightPct: 21.87 },
      { xPct: 13.88, yPct: 66.26, widthPct: 72.79, heightPct: 20.56 }
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
      { xPct: 13.30, yPct: 18.32, widthPct: 76.10, heightPct: 22.49 },
      { xPct: 13.30, yPct: 42.16, widthPct: 76.10, heightPct: 22.94 },
      { xPct: 13.42, yPct: 66.46, widthPct: 75.87, heightPct: 26.66 }
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

