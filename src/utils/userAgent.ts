// ──────────────────────────────────────────────────────────────
// Lightweight User-Agent parser without external dependencies.
// Keeps bundle size minimal on serverless edge environments.
// ──────────────────────────────────────────────────────────────

export interface ParsedUA {
  browser: string;
  os: string;
  device: "Mobile" | "Tablet" | "Desktop";
}

export function parseUserAgent(ua: string): ParsedUA {
  const s = ua.toLowerCase();

  // ── Browser ──────────────────────────────────────────────────
  let browser = "Unknown";
  if (s.includes("edg/") || s.includes("edge/")) browser = "Edge";
  else if (s.includes("opr/") || s.includes("opera")) browser = "Opera";
  else if (s.includes("chrome") && !s.includes("chromium")) browser = "Chrome";
  else if (s.includes("chromium")) browser = "Chromium";
  else if (s.includes("firefox")) browser = "Firefox";
  else if (s.includes("safari") && !s.includes("chrome")) browser = "Safari";
  else if (s.includes("msie") || s.includes("trident")) browser = "IE";

  // ── OS ───────────────────────────────────────────────────────
  let os = "Unknown";
  if (s.includes("windows")) os = "Windows";
  else if (s.includes("android")) os = "Android";
  else if (s.includes("iphone") || s.includes("ipad") || s.includes("ipod")) os = "iOS";
  else if (s.includes("mac os") || s.includes("macos") || s.includes("macintosh")) os = "macOS";
  else if (s.includes("linux")) os = "Linux";
  else if (s.includes("cros")) os = "ChromeOS";

  // ── Device ───────────────────────────────────────────────────
  let device: ParsedUA["device"] = "Desktop";
  if (s.includes("tablet") || s.includes("ipad") || (s.includes("android") && !s.includes("mobile"))) {
    device = "Tablet";
  } else if (s.includes("mobile") || s.includes("iphone") || s.includes("ipod") || s.includes("android")) {
    device = "Mobile";
  }

  return { browser, os, device };
}
