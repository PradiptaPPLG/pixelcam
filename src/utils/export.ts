/* ============================================================
   PIXELCAM — Export Utilities
   Reusable client-side image export helpers built on html2canvas.
   Kept free of React so the Preview Studio owns all UI state.
   ============================================================ */

export type ExportFormat = "png" | "jpeg";

export interface ExportImageOptions {
  /** Pixel density multiplier (2 = retina quality). */
  scale?: number;
  /** Solid backdrop color — transparency is intentionally disabled. */
  background?: string;
  /** JPG quality (0–1). */
  quality?: number;
}

/** File extension used in the download name for a given format. */
export function extensionFor(format: ExportFormat): string {
  return format === "jpeg" ? "jpg" : "png";
}

/** MIME type for a given format. */
export function mimeFor(format: ExportFormat): string {
  return format === "jpeg" ? "image/jpeg" : "image/png";
}

/** Two-digit zero padding. */
function pad(value: number): string {
  return String(value).padStart(2, "0");
}

/**
 * Build a timestamped filename, e.g. `pixelcam-2026-07-04-143210.png`.
 */
export function buildExportFilename(
  format: ExportFormat,
  date: Date = new Date(),
): string {
  const stamp =
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    `-${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
  return `pixelcam-${stamp}.${extensionFor(format)}`;
}

/**
 * Render a DOM node to a high-resolution canvas via html2canvas.
 * html2canvas is imported dynamically so it never runs during SSR.
 */
export async function renderNodeToCanvas(
  node: HTMLElement,
  { scale = 2, background = "#ffffff" }: ExportImageOptions = {},
): Promise<HTMLCanvasElement> {
  const { default: html2canvas } = await import("html2canvas");
  return html2canvas(node, {
    scale,
    backgroundColor: background,
    useCORS: true,
    logging: false,
  });
}

/**
 * Render a node and return a downloadable data URL.
 */
export async function exportNodeToImage(
  node: HTMLElement,
  format: ExportFormat,
  options: ExportImageOptions = {},
): Promise<string> {
  const canvas = await renderNodeToCanvas(node, options);
  return canvas.toDataURL(mimeFor(format), options.quality ?? 0.95);
}

/** Trigger a browser download for a data URL. */
export function downloadDataUrl(dataUrl: string, filename: string): void {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
