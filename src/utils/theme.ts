/* ============================================================
   PIXELCAM — Theme Studio Presets & State
   Each preset is a self-contained visual identity for the
   photostrip. Kept framework-agnostic (no React) so both the
   preview and the (future) export stage can consume it.
   ============================================================ */

export interface ThemeStyle {
  /** Strip paper / frame fill. */
  paper: string;
  /** Studio canvas tint shown behind the strip. */
  canvas: string;
  /** Border color drawn around each photo. */
  photoBorder: string;
  /** Border thickness around each photo, in px. */
  photoBorderWidth: number;
  /** Top (title) label color. */
  topLabel: string;
  /** Bottom (footer / date) label color. */
  bottomLabel: string;
  /** Accent color for small marks (date pill, divider). */
  accent: string;
  /** Strip inner padding, in px. */
  padding: number;
  /** Gap between photos, in px. */
  gap: number;
  /** Base corner radius, in px (rounded mode). */
  radius: number;
  /** Strip drop shadow (CSS box-shadow). */
  shadow: string;
  /** Monospace labels (analog / film themes). */
  mono?: boolean;
  /** Dark themes tint placeholders and dividers differently. */
  dark?: boolean;
  /**
   * CSS value for the canvas background behind the strip.
   * Supports any valid CSS background shorthand (color, gradient, url, etc).
   * If omitted, `canvas` (solid color) is used as a fallback.
   */
  canvasPattern?: string;
  /**
   * CSS value for the photostrip paper itself.
   * Supports any valid CSS background shorthand (color, gradient, url, etc).
   * If omitted, `paper` (solid color) is used as a fallback.
   */
  paperPattern?: string;
}

export interface ThemePreset {
  id: string;
  name: string;
  emoji: string;
  description: string;
  style: ThemeStyle;
}

/** The ten Theme Studio presets, each with its own identity. */
export const THEMES: ThemePreset[] = [
  {
    id: "classic-white",
    name: "Classic White",
    emoji: "🤍",
    description: "Apple-minimal. Clean white paper, hairline frames.",
    style: {
      paper: "#FFFFFF",
      canvas: "#FAFAFA",
      photoBorder: "#ECECEC",
      photoBorderWidth: 1,
      topLabel: "#111111",
      bottomLabel: "#6B7280",
      accent: "#111111",
      padding: 22,
      gap: 12,
      radius: 14,
      shadow: "0 20px 50px -16px rgba(0,0,0,0.18)",
    },
  },
  {
    id: "pink-bloom",
    name: "Pink Bloom",
    emoji: "🌸",
    description: "Korean photobooth. Soft pink with thick white frames.",
    style: {
      paper: "#FBD8E7",
      canvas: "#FDF2F8",
      photoBorder: "#FFFFFF",
      photoBorderWidth: 5,
      topLabel: "#BE185D",
      bottomLabel: "#DB2777",
      accent: "#EC4899",
      padding: 24,
      gap: 14,
      radius: 18,
      shadow: "0 22px 55px -16px rgba(236,72,153,0.34)",
    },
  },
  {
    id: "cream-latte",
    name: "Cream Latte",
    emoji: "☕",
    description: "Beige minimal. Warm, cozy and understated.",
    style: {
      paper: "#EDE4D3",
      canvas: "#F7F3EC",
      photoBorder: "#FBF7F0",
      photoBorderWidth: 4,
      topLabel: "#6B4E2E",
      bottomLabel: "#8A6D4B",
      accent: "#A87C4F",
      padding: 22,
      gap: 12,
      radius: 12,
      shadow: "0 20px 50px -16px rgba(168,124,79,0.32)",
    },
  },
  {
    id: "mint-garden",
    name: "Mint Garden",
    emoji: "🌿",
    description: "Fresh pastel. Crisp mint with white frames.",
    style: {
      paper: "#DCF3E7",
      canvas: "#ECFDF5",
      photoBorder: "#FFFFFF",
      photoBorderWidth: 4,
      topLabel: "#047857",
      bottomLabel: "#059669",
      accent: "#10B981",
      padding: 20,
      gap: 12,
      radius: 16,
      shadow: "0 20px 50px -16px rgba(16,185,129,0.28)",
    },
  },
  {
    id: "sky-dream",
    name: "Sky Dream",
    emoji: "☁️",
    description: "Soft blue. Airy and calm.",
    style: {
      paper: "#E1ECFB",
      canvas: "#EFF6FF",
      photoBorder: "#FFFFFF",
      photoBorderWidth: 4,
      topLabel: "#1D4ED8",
      bottomLabel: "#2563EB",
      accent: "#3B82F6",
      padding: 20,
      gap: 12,
      radius: 16,
      shadow: "0 20px 50px -16px rgba(59,130,246,0.28)",
    },
  },
  {
    id: "noir-film",
    name: "Noir Film",
    emoji: "📼",
    description: "Analog monochrome. Dark film strip, mono type.",
    style: {
      paper: "#17171A",
      canvas: "#0F0F10",
      photoBorder: "#2E2E33",
      photoBorderWidth: 2,
      topLabel: "#F5F5F5",
      bottomLabel: "#A1A1AA",
      accent: "#E5E5E5",
      padding: 18,
      gap: 8,
      radius: 6,
      shadow: "0 24px 60px -16px rgba(0,0,0,0.55)",
      mono: true,
      dark: true,
    },
  },
  {
    id: "peach-sunset",
    name: "Peach Sunset",
    emoji: "🍑",
    description: "Warm orange. Golden-hour glow.",
    style: {
      paper: "#FDE0CC",
      canvas: "#FFF7ED",
      photoBorder: "#FFF3E9",
      photoBorderWidth: 4,
      topLabel: "#C2410C",
      bottomLabel: "#EA580C",
      accent: "#FB7185",
      padding: 20,
      gap: 12,
      radius: 16,
      shadow: "0 20px 50px -16px rgba(251,113,133,0.30)",
    },
  },
  {
    id: "lavender-mist",
    name: "Lavender Mist",
    emoji: "💜",
    description: "Soft purple. Dreamy and gentle.",
    style: {
      paper: "#E7E0FA",
      canvas: "#F5F3FF",
      photoBorder: "#FFFFFF",
      photoBorderWidth: 4,
      topLabel: "#6D28D9",
      bottomLabel: "#7C3AED",
      accent: "#8B5CF6",
      padding: 20,
      gap: 12,
      radius: 16,
      shadow: "0 20px 50px -16px rgba(139,92,246,0.30)",
    },
  },
  {
    id: "ocean-breeze",
    name: "Ocean Breeze",
    emoji: "🌊",
    description: "Cool cyan. Bright and refreshing.",
    style: {
      paper: "#D6F1F5",
      canvas: "#ECFEFF",
      photoBorder: "#FFFFFF",
      photoBorderWidth: 4,
      topLabel: "#0E7490",
      bottomLabel: "#0891B2",
      accent: "#06B6D4",
      padding: 20,
      gap: 12,
      radius: 16,
      shadow: "0 20px 50px -16px rgba(6,182,212,0.28)",
    },
  },
  {
    id: "midnight-black",
    name: "Midnight Black",
    emoji: "🌌",
    description: "Luxury black. Deep matte with a gold accent.",
    style: {
      paper: "#0B0B0C",
      canvas: "#111114",
      photoBorder: "#26262B",
      photoBorderWidth: 2,
      topLabel: "#FAFAFA",
      bottomLabel: "#C8A96A",
      accent: "#D4AF37",
      padding: 20,
      gap: 10,
      radius: 12,
      shadow: "0 24px 60px -16px rgba(0,0,0,0.60)",
      dark: true,
    },
  },

  // ── NEW: patterned / gradient themes ─────────────────────────────
  {
    id: "cherry-blossom",
    name: "Cherry Blossom",
    emoji: "🌸",
    description: "Soft pink dot pattern on the frame. Sweet and feminine.",
    style: {
      paper: "#FFF0F5",
      paperPattern: `radial-gradient(circle, #F9A8C9 1.5px, transparent 1.5px) 0 0 / 20px 20px, #FFF0F5`,
      canvas: "#FFE4EE",
      photoBorder: "#FFFFFF",
      photoBorderWidth: 5,
      topLabel: "#BE185D",
      bottomLabel: "#DB2777",
      accent: "#F472B6",
      padding: 22,
      gap: 12,
      radius: 20,
      shadow: "0 22px 55px -16px rgba(236,72,153,0.38)",
    },
  },
  {
    id: "aurora",
    name: "Aurora",
    emoji: "🌌",
    description: "Northern lights gradient frame. Dreamy purple-teal.",
    style: {
      paper: "#1A0533",
      paperPattern: "linear-gradient(135deg, #1A0533 0%, #1A1050 30%, #0A3040 60%, #051A20 100%)",
      canvas: "#0D001F",
      photoBorder: "#7C3AED",
      photoBorderWidth: 2,
      topLabel: "#E9D5FF",
      bottomLabel: "#A78BFA",
      accent: "#34D399",
      padding: 20,
      gap: 10,
      radius: 14,
      shadow: "0 24px 60px -16px rgba(124,58,237,0.55)",
      dark: true,
    },
  },
  {
    id: "golden-hour",
    name: "Golden Hour",
    emoji: "🌅",
    description: "Warm sunset gradient on the frame. Cinematic orange glow.",
    style: {
      paper: "#FEF3C7",
      paperPattern: "linear-gradient(160deg, #FEF3C7 0%, #FDBA74 50%, #FCA5A5 100%)",
      canvas: "#FDE68A",
      photoBorder: "#FFF7ED",
      photoBorderWidth: 4,
      topLabel: "#92400E",
      bottomLabel: "#B45309",
      accent: "#F59E0B",
      padding: 22,
      gap: 12,
      radius: 16,
      shadow: "0 22px 55px -16px rgba(245,158,11,0.40)",
    },
  },
  {
    id: "forest-night",
    name: "Forest Night",
    emoji: "🌲",
    description: "Deep green frame with subtle stripes. Nature and mystery.",
    style: {
      paper: "#0F2018",
      paperPattern: `repeating-linear-gradient(90deg, transparent 0px, transparent 18px, rgba(34,197,94,0.06) 18px, rgba(34,197,94,0.06) 20px), #0F2018`,
      canvas: "#0A1A10",
      photoBorder: "#166534",
      photoBorderWidth: 2,
      topLabel: "#BBF7D0",
      bottomLabel: "#4ADE80",
      accent: "#22C55E",
      padding: 18,
      gap: 8,
      radius: 8,
      shadow: "0 24px 60px -16px rgba(22,101,52,0.55)",
      dark: true,
      mono: true,
    },
  },
  {
    id: "cotton-candy",
    name: "Cotton Candy",
    emoji: "🍬",
    description: "Pastel rainbow gradient frame. Fun and playful.",
    style: {
      paper: "#FDF4FF",
      paperPattern: "linear-gradient(120deg, #FDE4F7 0%, #E0F2FE 35%, #DCFCE7 70%, #FEF9C3 100%)",
      canvas: "#FAF0FE",
      photoBorder: "#FFFFFF",
      photoBorderWidth: 5,
      topLabel: "#A21CAF",
      bottomLabel: "#7E22CE",
      accent: "#EC4899",
      padding: 24,
      gap: 14,
      radius: 22,
      shadow: "0 22px 55px -16px rgba(236,72,153,0.30)",
    },
  },
  {
    id: "blueprint",
    name: "Blueprint",
    emoji: "📐",
    description: "Grid paper frame. Technical and architectural.",
    style: {
      paper: "#EFF6FF",
      paperPattern: `repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(59,130,246,0.18) 19px, rgba(59,130,246,0.18) 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(59,130,246,0.18) 19px, rgba(59,130,246,0.18) 20px), #EFF6FF`,
      canvas: "#DBEAFE",
      photoBorder: "#93C5FD",
      photoBorderWidth: 2,
      topLabel: "#1E40AF",
      bottomLabel: "#1D4ED8",
      accent: "#3B82F6",
      padding: 20,
      gap: 10,
      radius: 4,
      shadow: "0 20px 50px -16px rgba(59,130,246,0.28)",
      mono: true,
    },
  },
  {
    id: "lemon-zest",
    name: "Lemon Zest",
    emoji: "🍋",
    description: "Bold yellow frame with dots. Energetic and fresh.",
    style: {
      paper: "#FEFCE8",
      paperPattern: `radial-gradient(circle, rgba(234,179,8,0.35) 1.5px, transparent 1.5px) 0 0 / 18px 18px, #FEFCE8`,
      canvas: "#FEF08A",
      photoBorder: "#FFFFFF",
      photoBorderWidth: 4,
      topLabel: "#713F12",
      bottomLabel: "#92400E",
      accent: "#CA8A04",
      padding: 20,
      gap: 12,
      radius: 14,
      shadow: "0 20px 50px -16px rgba(202,138,4,0.38)",
    },
  },
  {
    id: "dark-neon",
    name: "Dark Neon",
    emoji: "⚡",
    description: "Cyberpunk frame. Dark with electric neon grid.",
    style: {
      paper: "#050510",
      paperPattern: `repeating-linear-gradient(90deg, transparent 0px, transparent 28px, rgba(0,255,200,0.06) 28px, rgba(0,255,200,0.06) 30px), repeating-linear-gradient(0deg, transparent 0px, transparent 28px, rgba(147,51,234,0.06) 28px, rgba(147,51,234,0.06) 30px), #050510`,
      canvas: "#02020A",
      photoBorder: "#00FFC8",
      photoBorderWidth: 1,
      topLabel: "#00FFC8",
      bottomLabel: "#A855F7",
      accent: "#00FFC8",
      padding: 18,
      gap: 8,
      radius: 4,
      shadow: "0 0 40px rgba(0,255,200,0.25), 0 24px 60px rgba(0,0,0,0.6)",
      dark: true,
      mono: true,
    },
  },
  {
    id: "terracotta",
    name: "Terracotta",
    emoji: "🏺",
    description: "Earthy warm tones with subtle gradients. Mediterranean feel.",
    style: {
      paper: "#FDF0E8",
      paperPattern: `radial-gradient(ellipse at 20% 80%, rgba(194,120,80,0.18) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(217,147,100,0.14) 0%, transparent 50%), #FDF0E8`,
      canvas: "#F5DDD0",
      photoBorder: "#E8C4A8",
      photoBorderWidth: 4,
      topLabel: "#7C3110",
      bottomLabel: "#9A4520",
      accent: "#C27850",
      padding: 22,
      gap: 12,
      radius: 10,
      shadow: "0 20px 50px -16px rgba(194,120,80,0.38)",
    },
  },
  {
    id: "rose-gold",
    name: "Rose Gold",
    emoji: "✨",
    description: "Luxe metallic gradient frame. Shimmer and elegance.",
    style: {
      paper: "#FEF2F5",
      paperPattern: "linear-gradient(135deg, #FEF2F5 0%, #F9C5D5 50%, #FEF2F5 100%)",
      canvas: "#FDE4EC",
      photoBorder: "#FBCFE8",
      photoBorderWidth: 3,
      topLabel: "#9D174D",
      bottomLabel: "#BE185D",
      accent: "#E879A0",
      padding: 22,
      gap: 12,
      radius: 18,
      shadow: "0 22px 55px -16px rgba(232,121,160,0.40)",
    },
  },
  // ── NEW: Elegant & Premium (From User Reference) ─────────────────
  {
    id: "crimson-velvet",
    name: "Crimson Velvet",
    emoji: "🌹",
    description: "Elegant deep red and dark shadows. Romantic and premium.",
    style: {
      paper: "#450A0A",
      paperPattern: "linear-gradient(135deg, #450A0A 0%, #7F1D1D 40%, #2A0000 80%, #000000 100%)",
      canvas: "#1F0303",
      photoBorder: "#FECDD3",
      photoBorderWidth: 2,
      topLabel: "#FFE4E6",
      bottomLabel: "#FDA4AF",
      accent: "#F43F5E",
      padding: 24,
      gap: 12,
      radius: 4,
      shadow: "0 24px 60px -16px rgba(0,0,0,0.70)",
      dark: true,
    },
  },
  {
    id: "thai-tea-marble",
    name: "Peach Marble",
    emoji: "🧋",
    description: "Soft orange and peach swirling fluid marble.",
    style: {
      paper: "#FFEDD5",
      paperPattern: "linear-gradient(120deg, #FFEDD5 0%, #FDBA74 35%, #F97316 75%, #EA580C 100%)",
      canvas: "#FFF7ED",
      photoBorder: "#FFFFFF",
      photoBorderWidth: 4,
      topLabel: "#7C2D12",
      bottomLabel: "#9A3412",
      accent: "#EA580C",
      padding: 22,
      gap: 14,
      radius: 12,
      shadow: "0 22px 55px -16px rgba(234,88,12,0.30)",
    },
  },
  {
    id: "silver-marble",
    name: "Silver Marble",
    emoji: "🏛️",
    description: "Classic monochrome marble. Silver with dark accents.",
    style: {
      paper: "#F4F4F5",
      paperPattern: "linear-gradient(160deg, #FFFFFF 0%, #E4E4E7 40%, #A1A1AA 85%, #3F3F46 100%)",
      canvas: "#FAFAFA",
      photoBorder: "#FFFFFF",
      photoBorderWidth: 5,
      topLabel: "#18181B",
      bottomLabel: "#3F3F46",
      accent: "#52525B",
      padding: 24,
      gap: 12,
      radius: 8,
      shadow: "0 20px 50px -16px rgba(0,0,0,0.15)",
    },
  },
  {
    id: "navy-floral",
    name: "Deep Blue",
    emoji: "🌺",
    description: "Deep navy gradient. Perfect for elegant dark florals.",
    style: {
      paper: "#0F172A",
      paperPattern: "linear-gradient(to bottom right, #1E1B4B 0%, #172554 45%, #0F172A 100%)",
      canvas: "#020617",
      photoBorder: "#93C5FD",
      photoBorderWidth: 2,
      topLabel: "#E0E7FF",
      bottomLabel: "#93C5FD",
      accent: "#3B82F6",
      padding: 24,
      gap: 10,
      radius: 16,
      shadow: "0 24px 60px -16px rgba(0,0,0,0.60)",
      dark: true,
    },
  },
  {
    id: "lavender-ceramic",
    name: "Lavender Ceramic",
    emoji: "🏺",
    description: "Smooth ceramic white to lavender soft gradient.",
    style: {
      paper: "#F5F3FF",
      paperPattern: "linear-gradient(180deg, #FFFFFF 0%, #EDE9FE 40%, #C4B5FD 85%, #8B5CF6 100%)",
      canvas: "#FAF5FF",
      photoBorder: "#FFFFFF",
      photoBorderWidth: 6,
      topLabel: "#4C1D95",
      bottomLabel: "#6D28D9",
      accent: "#8B5CF6",
      padding: 22,
      gap: 14,
      radius: 20,
      shadow: "0 22px 55px -16px rgba(139,92,246,0.35)",
    },
  },
];


export const DEFAULT_THEME_ID = "classic-white";

/** Look up a preset by id, falling back to the default. */
export function getThemeById(id: string): ThemePreset {
  return THEMES.find((theme) => theme.id === id) ?? THEMES[0];
}

/* ------------------------------------------------------------
   Customization
   ------------------------------------------------------------ */

export interface StripCustomization {
  title: string;
  showDate: boolean;
  footerText: string;
  showLogo: boolean;
  showShadow: boolean;
  rounded: boolean;
}

export const DEFAULT_CUSTOMIZATION: StripCustomization = {
  title: "PixelCam",
  showDate: true,
  footerText: "Captured with PixelCam",
  showLogo: true,
  showShadow: true,
  rounded: true,
};

/* ------------------------------------------------------------
   Persistence — hand the chosen look to the next stage.
   ------------------------------------------------------------ */

export const THEME_STATE_KEY = "pixelcam:theme-state";

export interface ThemeState {
  themeId: string;
  customization: StripCustomization;
}

export function saveThemeState(state: ThemeState): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(THEME_STATE_KEY, JSON.stringify(state));
  } catch {
    // Storage may be unavailable — fail silently.
  }
}

export function loadThemeState(): ThemeState {
  const fallback: ThemeState = {
    themeId: DEFAULT_THEME_ID,
    customization: DEFAULT_CUSTOMIZATION,
  };
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.sessionStorage.getItem(THEME_STATE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<ThemeState>;
    return {
      themeId:
        typeof parsed.themeId === "string" ? parsed.themeId : fallback.themeId,
      customization: {
        ...DEFAULT_CUSTOMIZATION,
        ...(parsed.customization ?? {}),
      },
    };
  } catch {
    return fallback;
  }
}

/* ------------------------------------------------------------
   useSyncExternalStore adapters (read-only, stable, hydration-safe).
   Added for downstream stages (e.g. Preview) to consume the chosen
   look without duplicating storage logic.
   ------------------------------------------------------------ */

const DEFAULT_THEME_STATE: ThemeState = {
  themeId: DEFAULT_THEME_ID,
  customization: DEFAULT_CUSTOMIZATION,
};

let themeSnapRaw: string | null = null;
let themeSnapValue: ThemeState = DEFAULT_THEME_STATE;

export function subscribeThemeState(onChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

export function getThemeStateSnapshot(): ThemeState {
  const raw =
    typeof window === "undefined"
      ? null
      : window.sessionStorage.getItem(THEME_STATE_KEY);
  if (raw !== themeSnapRaw) {
    themeSnapRaw = raw;
    themeSnapValue = loadThemeState();
  }
  return themeSnapValue;
}

export function getThemeStateServerSnapshot(): ThemeState {
  return DEFAULT_THEME_STATE;
}
