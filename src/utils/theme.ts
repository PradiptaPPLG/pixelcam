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
