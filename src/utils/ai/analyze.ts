/* ============================================================
   PIXELCAM — AI Magic (client-side, heuristic)
   No cloud, no ML, no face recognition. Everything here is
   deterministic image analysis over the captured photos:
   luminance, contrast, sharpness, saturation, colour balance.
   Higher-level "smile"/"eyes" signals are honest heuristics
   derived from those metrics, not real face detection.
   ============================================================ */

import { clamp } from "@/lib/utils";
import type { Adjustments } from "@/utils/editor/types";

const SAMPLE_WIDTH = 84;
const IDEAL_BRIGHTNESS = 0.55;

export interface PhotoMetrics {
  brightness: number; // 0..1 mean luminance
  contrast: number; // 0..1 luminance spread
  sharpness: number; // 0..1 edge energy
  saturation: number; // 0..1
  warmth: number; // -1..1 (red vs blue balance)
  hue: number; // 0..360 dominant hue
  centerBrightness: number; // 0..1 (subject region)
  exposureBalance: number; // 0..1 (1 = little clipping)
}

export interface CompositionScores {
  overall: number;
  lighting: number;
  smile: number;
  composition: number;
  sharpness: number;
}

export interface CriteriaLevel {
  label: string;
  level: number; // 0..1
}

export interface AIResult {
  bestShotIndex: number;
  photoScores: number[]; // 0..100 per photo
  criteria: CriteriaLevel[]; // best-shot breakdown
  scores: CompositionScores;
  theme: { id: string; reason: string };
  filter: { id: string; label: string; reason: string };
  enhancement: Partial<Adjustments>;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("image load failed"));
    image.src = src;
  });
}

function hueOf(r: number, g: number, b: number): number {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  if (delta === 0) return 0;
  let h: number;
  if (max === r) h = ((g - b) / delta) % 6;
  else if (max === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;
  h *= 60;
  return h < 0 ? h + 360 : h;
}

/** Analyze a single photo's pixels via a downscaled canvas. */
async function analyzePhoto(src: string): Promise<PhotoMetrics> {
  const image = await loadImage(src);
  const ratio = image.naturalHeight / image.naturalWidth || 0.75;
  const width = SAMPLE_WIDTH;
  const height = Math.max(1, Math.round(width * ratio));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("no 2d context");
  ctx.drawImage(image, 0, 0, width, height);
  const { data } = ctx.getImageData(0, 0, width, height);

  const luminance: number[] = new Array(width * height);
  let sumLum = 0;
  let sumSat = 0;
  let sumWarm = 0;
  let sumSin = 0;
  let sumCos = 0;
  let clipped = 0;

  for (let i = 0, p = 0; i < data.length; i += 4, p++) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    luminance[p] = lum;
    sumLum += lum;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const sat = max === 0 ? 0 : (max - min) / max;
    sumSat += sat;
    sumWarm += (r - b) / 255;

    const h = (hueOf(r, g, b) * Math.PI) / 180;
    sumSin += Math.sin(h) * sat;
    sumCos += Math.cos(h) * sat;

    if (lum < 0.03 || lum > 0.97) clipped++;
  }

  const count = width * height;
  const brightness = sumLum / count;

  // Contrast = luminance standard deviation.
  let variance = 0;
  for (let p = 0; p < count; p++) {
    const d = luminance[p] - brightness;
    variance += d * d;
  }
  const contrast = Math.sqrt(variance / count);

  // Sharpness = mean absolute gradient across neighbours.
  let edge = 0;
  let edgeCount = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      if (x + 1 < width) {
        edge += Math.abs(luminance[idx] - luminance[idx + 1]);
        edgeCount++;
      }
      if (y + 1 < height) {
        edge += Math.abs(luminance[idx] - luminance[idx + width]);
        edgeCount++;
      }
    }
  }
  const sharpnessRaw = edgeCount ? edge / edgeCount : 0;

  // Center (subject) region average brightness.
  let centerSum = 0;
  let centerCount = 0;
  const x0 = Math.floor(width * 0.25);
  const x1 = Math.ceil(width * 0.75);
  const y0 = Math.floor(height * 0.2);
  const y1 = Math.ceil(height * 0.8);
  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      centerSum += luminance[y * width + x];
      centerCount++;
    }
  }

  const hue = ((Math.atan2(sumSin, sumCos) * 180) / Math.PI + 360) % 360;

  return {
    brightness,
    contrast: clamp(contrast / 0.32, 0, 1),
    sharpness: clamp(sharpnessRaw / 0.14, 0, 1),
    saturation: clamp(sumSat / count, 0, 1),
    warmth: clamp(sumWarm / count, -1, 1),
    hue,
    centerBrightness: centerCount ? centerSum / centerCount : brightness,
    exposureBalance: clamp(1 - clipped / count / 0.35, 0, 1),
  };
}

function brightnessCloseness(brightness: number): number {
  return clamp(1 - Math.abs(brightness - IDEAL_BRIGHTNESS) / 0.55, 0, 1);
}

/** Composite quality of a single photo (0..1). */
function photoQuality(m: PhotoMetrics): number {
  return clamp(
    m.sharpness * 0.32 +
      brightnessCloseness(m.brightness) * 0.24 +
      m.contrast * 0.18 +
      m.saturation * 0.12 +
      m.exposureBalance * 0.14,
    0,
    1,
  );
}

/** Heuristic "smile/liveliness" proxy — NOT face detection. */
function livelinessProxy(m: PhotoMetrics): number {
  return clamp(
    m.centerBrightness * 0.4 + m.saturation * 0.35 + m.contrast * 0.25,
    0,
    1,
  );
}

function average(values: number[]): number {
  return values.reduce((sum, v) => sum + v, 0) / (values.length || 1);
}

function aggregate(list: PhotoMetrics[]): PhotoMetrics {
  return {
    brightness: average(list.map((m) => m.brightness)),
    contrast: average(list.map((m) => m.contrast)),
    sharpness: average(list.map((m) => m.sharpness)),
    saturation: average(list.map((m) => m.saturation)),
    warmth: average(list.map((m) => m.warmth)),
    hue: average(list.map((m) => m.hue)),
    centerBrightness: average(list.map((m) => m.centerBrightness)),
    exposureBalance: average(list.map((m) => m.exposureBalance)),
  };
}

function suggestTheme(m: PhotoMetrics): { id: string; reason: string } {
  const hue = m.hue;
  if (m.brightness < 0.34) {
    return { id: "midnight-black", reason: "Low-key, moody lighting." };
  }
  if (m.saturation < 0.22 && m.brightness > 0.68) {
    return { id: "classic-white", reason: "Bright, clean and neutral tones." };
  }
  if (m.warmth > 0.1 && m.saturation < 0.4) {
    return { id: "cream-latte", reason: "Warm, cozy neutral palette." };
  }
  if (hue >= 300 || hue < 20) {
    return { id: "pink-bloom", reason: "Warm pink-red dominant colours." };
  }
  if (hue >= 20 && hue < 50) {
    return { id: "peach-sunset", reason: "Golden, sunset-warm tones." };
  }
  if (hue >= 50 && hue < 160) {
    return { id: "mint-garden", reason: "Fresh green dominant colours." };
  }
  if (hue >= 160 && hue < 200) {
    return { id: "ocean-breeze", reason: "Cool cyan colour cast." };
  }
  if (hue >= 200 && hue < 255) {
    return { id: "sky-dream", reason: "Soft blue dominant colours." };
  }
  return { id: "lavender-mist", reason: "Cool purple mood." };
}

function suggestFilter(m: PhotoMetrics): {
  id: string;
  label: string;
  reason: string;
} {
  if (m.saturation < 0.16) {
    return { id: "mono", label: "Mono", reason: "Muted tones suit a black & white look." };
  }
  if (m.warmth > 0.14) {
    return { id: "vintage", label: "Vintage", reason: "Warm cast pairs with a vintage tint." };
  }
  if (m.contrast < 0.28 && m.brightness > 0.55) {
    return { id: "dreamy", label: "Dreamy", reason: "Soft, airy light feels dreamy." };
  }
  if (m.saturation > 0.5) {
    return { id: "vivid", label: "Vivid", reason: "Punchy colours pop with more vibrance." };
  }
  return { id: "original", label: "Original", reason: "Well-balanced, keep it natural." };
}

function computeEnhancement(m: PhotoMetrics): Partial<Adjustments> {
  const enhancement: Partial<Adjustments> = {};

  if (m.brightness < 0.4) enhancement.brightness = m.brightness < 0.28 ? 114 : 108;
  else if (m.brightness > 0.72) enhancement.brightness = 95;
  else enhancement.brightness = 102;

  enhancement.contrast = m.contrast < 0.35 ? 110 : 104;
  enhancement.exposure = m.brightness < 0.4 ? 10 : m.brightness > 0.72 ? -6 : 3;

  // White balance: nudge away from a colour cast, gently.
  if (m.warmth > 0.14) enhancement.warmth = -8;
  else if (m.warmth < -0.08) enhancement.warmth = 8;
  else enhancement.warmth = 0;

  return enhancement;
}

function score(value: number): number {
  return Math.round(clamp(value, 0, 1) * 100);
}

/** Analyze the whole strip and derive every recommendation. */
export async function analyzeStrip(photos: string[]): Promise<AIResult> {
  const metrics = await Promise.all(photos.map(analyzePhoto));
  const qualities = metrics.map(photoQuality);

  let bestShotIndex = 0;
  for (let i = 1; i < qualities.length; i++) {
    if (qualities[i] > qualities[bestShotIndex]) bestShotIndex = i;
  }

  const agg = aggregate(metrics);
  const best = metrics[bestShotIndex];

  const lighting =
    brightnessCloseness(agg.brightness) * 0.6 + agg.exposureBalance * 0.4;
  const smile = livelinessProxy(agg);
  const composition =
    0.4 + agg.exposureBalance * 0.3 + agg.contrast * 0.2 + agg.sharpness * 0.1;

  const scores: CompositionScores = {
    lighting: score(lighting),
    smile: score(smile),
    composition: score(clamp(composition, 0, 1)),
    sharpness: score(agg.sharpness),
    overall: score(
      agg.sharpness * 0.28 +
        lighting * 0.28 +
        smile * 0.2 +
        clamp(composition, 0, 1) * 0.24,
    ),
  };

  const criteria: CriteriaLevel[] = [
    { label: "Eyes open", level: clamp(best.sharpness * 0.6 + best.centerBrightness * 0.4, 0, 1) },
    { label: "Smile", level: livelinessProxy(best) },
    { label: "Brightness", level: brightnessCloseness(best.brightness) },
    { label: "Sharpness", level: best.sharpness },
  ];

  return {
    bestShotIndex,
    photoScores: qualities.map(score),
    criteria,
    scores,
    theme: suggestTheme(agg),
    filter: suggestFilter(agg),
    enhancement: computeEnhancement(agg),
  };
}
