import { NextRequest } from "next/server";

const COOKIE_NAME = "pixelcam_admin_session";

// ──────────────────────────────────────────────────────────────
// Shared helper to verify the admin session cookie.
// Used by any server-side code that needs to gate admin access.
// ──────────────────────────────────────────────────────────────

async function signToken(password: string): Promise<string> {
  const secret = process.env.ADMIN_SECRET ?? "pixelcam-admin-secret-fallback";
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(password + "|" + secret)
  );
  return btoa(String.fromCharCode(...new Uint8Array(signature)));
}

export async function verifyAdminSession(req: NextRequest): Promise<boolean> {
  try {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    if (!token) return false;

    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) return false;

    const expectedToken = await signToken(adminPassword);
    return token === expectedToken;
  } catch {
    return false;
  }
}
