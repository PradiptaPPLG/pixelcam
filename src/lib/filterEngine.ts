/* ============================================================
   PIXELCAM — Filter Engine
   Canvas-based pixel manipulation pipeline.
   ============================================================ */

import { NEUTRAL_SETTINGS } from "@/data/filterPresets";
import type { FilterSettings } from "@/types/filter";
import { clamp } from "./utils";

/**
 * Applies the filter settings to an image using Canvas pixel manipulation.
 * Returns a Promise resolving to the processed Data URL.
 */
export async function applyFilter(imageSrc: string, settings: FilterSettings): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return resolve(imageSrc);
      
      ctx.drawImage(img, 0, 0);
      
      // Fast path for original
      if (
        settings.exposure === 0 &&
        settings.contrast === 1 &&
        settings.brightness === 0 &&
        settings.saturation === 1 &&
        settings.vibrance === 0 &&
        settings.temperature === 0 &&
        settings.tint === 0 &&
        settings.fade === 0 &&
        settings.highlightCompression === 0 &&
        !settings.shadowColor &&
        !settings.highlightColor &&
        !settings.gamma &&
        settings.colorWash === "none" &&
        settings.grain === 0 &&
        settings.vignette === 0
      ) {
        return resolve(canvas.toDataURL("image/png", 0.95));
      }

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      
      // Pre-calculate lookup tables or constants if needed
      const exposureFactor = Math.pow(2, settings.exposure / 100);
      const contrastFactor = settings.contrast;
      const brightnessOffset = settings.brightness;
      
      // Temperature / Tint to RGB
      const rTempOffset = settings.temperature > 0 ? settings.temperature : 0;
      const bTempOffset = settings.temperature < 0 ? -settings.temperature : 0;
      
      const gTintOffset = settings.tint < 0 ? -settings.tint : 0;
      const rTintOffset = settings.tint > 0 ? settings.tint : 0;
      const bTintOffset = settings.tint > 0 ? settings.tint : 0;
      
      const fadeOffset = (settings.fade / 100) * 255;
      const hcFactor = 1 - (settings.highlightCompression / 100);

      // Color wash
      let washR = 0, washG = 0, washB = 0;
      const hasWash = settings.colorWash !== "none" && settings.colorWash.startsWith("#");
      if (hasWash) {
        washR = parseInt(settings.colorWash.slice(1, 3), 16);
        washG = parseInt(settings.colorWash.slice(3, 5), 16);
        washB = parseInt(settings.colorWash.slice(5, 7), 16);
      }

      // HSL to RGB helper for split toning
      function hslToRgb(h: number, s: number, l: number): [number, number, number] {
        let c = (1 - Math.abs(2 * l - 1)) * s,
            x = c * (1 - Math.abs((h / 60) % 2 - 1)),
            m = l - c/2, r=0, g=0, b=0;
        if (0 <= h && h < 60) { r = c; g = x; b = 0; }
        else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
        else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
        else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
        else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
        else if (300 <= h && h < 360) { r = c; g = 0; b = x; }
        return [Math.round((r+m)*255), Math.round((g+m)*255), Math.round((b+m)*255)];
      }

      const sColor = settings.shadowColor ? hslToRgb(settings.shadowColor[0], settings.shadowColor[1], 0.5) : null;
      const hColor = settings.highlightColor ? hslToRgb(settings.highlightColor[0], settings.highlightColor[1], 0.5) : null;
      
      const gammaR = settings.gamma ? settings.gamma[0] : 1;
      const gammaG = settings.gamma ? settings.gamma[1] : 1;
      const gammaB = settings.gamma ? settings.gamma[2] : 1;

      for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];
        
        // 1. Exposure & Brightness
        r = r * exposureFactor + brightnessOffset;
        g = g * exposureFactor + brightnessOffset;
        b = b * exposureFactor + brightnessOffset;

        // 2. Contrast
        r = ((r / 255 - 0.5) * contrastFactor + 0.5) * 255;
        g = ((g / 255 - 0.5) * contrastFactor + 0.5) * 255;
        b = ((b / 255 - 0.5) * contrastFactor + 0.5) * 255;

        // 3. Temp & Tint
        r += rTempOffset * 0.8 + rTintOffset * 0.5;
        g += gTintOffset * 0.5;
        b += bTempOffset * 0.8 + bTintOffset * 0.5;

        // 4. Gamma (Midtones)
        if (gammaR !== 1) r = 255 * Math.pow(clamp(r/255, 0, 1), 1/gammaR);
        if (gammaG !== 1) g = 255 * Math.pow(clamp(g/255, 0, 1), 1/gammaG);
        if (gammaB !== 1) b = 255 * Math.pow(clamp(b/255, 0, 1), 1/gammaB);

        // 5. Saturation & Vibrance
        const max = Math.max(r, g, b);
        const avg = (r * 299 + g * 587 + b * 114) / 1000;
        const amt = ((Math.abs(max - avg) / 255) * -1) + 1;
        const vibAdjustment = settings.vibrance * amt;
        const satMultiplier = settings.saturation * (1 + vibAdjustment);
        r = avg + (r - avg) * satMultiplier;
        g = avg + (g - avg) * satMultiplier;
        b = avg + (b - avg) * satMultiplier;

        // 6. Split Toning
        const lum = avg / 255; 
        if (sColor) {
          const sAmt = (1 - lum) * settings.shadowColor![1];
          r = r + (sColor[0] - r) * sAmt;
          g = g + (sColor[1] - g) * sAmt;
          b = b + (sColor[2] - b) * sAmt;
        }
        if (hColor) {
          const hAmt = lum * settings.highlightColor![1];
          r = r + (hColor[0] - r) * hAmt;
          g = g + (hColor[1] - g) * hAmt;
          b = b + (hColor[2] - b) * hAmt;
        }

        // 7. Color Wash (soft blending)
        if (hasWash) {
          r = r * 0.95 + washR * 0.05;
          g = g * 0.95 + washG * 0.05;
          b = b * 0.95 + washB * 0.05;
        }

        // 8. Fade & Highlight Compression
        r = fadeOffset + r * (255 - fadeOffset) / 255;
        g = fadeOffset + g * (255 - fadeOffset) / 255;
        b = fadeOffset + b * (255 - fadeOffset) / 255;
        
        r = r > 255 * hcFactor ? 255 * hcFactor + (r - 255 * hcFactor) * 0.2 : r;
        g = g > 255 * hcFactor ? 255 * hcFactor + (g - 255 * hcFactor) * 0.2 : g;
        b = b > 255 * hcFactor ? 255 * hcFactor + (b - 255 * hcFactor) * 0.2 : b;

        data[i] = clamp(r, 0, 255);
        data[i + 1] = clamp(g, 0, 255);
        data[i + 2] = clamp(b, 0, 255);
      }
      
      ctx.putImageData(imgData, 0, 0);

      // Vignette & Grain can be applied as post-process composites
      if (settings.vignette > 0) {
        const radius = Math.max(canvas.width, canvas.height);
        const grad = ctx.createRadialGradient(
          canvas.width/2, canvas.height/2, radius * 0.4,
          canvas.width/2, canvas.height/2, radius * 0.8
        );
        const intensity = settings.vignette / 100 * 0.7;
        grad.addColorStop(0, 'rgba(0,0,0,0)');
        grad.addColorStop(1, `rgba(0,0,0,${intensity})`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      if (settings.grain > 0) {
        // very simplified grain
        const grainIntensity = settings.grain / 100 * 40;
        const gData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for(let i=0; i<gData.data.length; i+=4) {
          const noise = (Math.random() - 0.5) * grainIntensity;
          gData.data[i] = clamp(gData.data[i] + noise, 0, 255);
          gData.data[i+1] = clamp(gData.data[i+1] + noise, 0, 255);
          gData.data[i+2] = clamp(gData.data[i+2] + noise, 0, 255);
        }
        ctx.putImageData(gData, 0, 0);
      }

      resolve(canvas.toDataURL("image/jpeg", 0.92));
    };
    img.onerror = () => resolve(imageSrc);
    img.src = imageSrc;
  });
}

/** Reset to neutral settings. */
export function resetFilter(): FilterSettings {
  return { ...NEUTRAL_SETTINGS };
}

/**
 * Basic CSS approximation for the UI sidebar thumbnails (which are CSS gradients).
 */
export function toPreviewCss(s: FilterSettings): string {
  if (s.saturation === 0) {
    return `grayscale(1) contrast(${s.contrast}) brightness(${1 + s.brightness/100})`;
  }
  
  const parts = [
    `brightness(${1 + s.exposure/100 + s.brightness/100})`,
    `contrast(${s.contrast})`,
    `saturate(${s.saturation})`
  ];

  if (s.temperature > 0) {
    parts.push(`sepia(${s.temperature / 100})`);
  } else if (s.temperature < 0) {
    parts.push(`sepia(${Math.abs(s.temperature) / 100}) hue-rotate(180deg)`);
  }

  return parts.join(" ");
}
