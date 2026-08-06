import { NextRequest, NextResponse } from "next/server";

// ──────────────────────────────────────────────────────────────
// POST /api/admin/login
//
// Compares submitted password against ADMIN_PASSWORD env var.
// On success → sets an HttpOnly secure session cookie.
// On failure → returns 401.
//
// The cookie value is a simple HMAC-signed token to avoid
// anyone guessing it by inspecting the cookie value.
// ──────────────────────────────────────────────────────────────

const COOKIE_NAME = "pixelcam_admin_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds

// Build a constant-time string comparison to resist timing attacks
function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

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

export async function POST(req: NextRequest) {
  try {
    const { password } = (await req.json()) as { password: string };
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      console.error("[admin/login] ADMIN_PASSWORD env var is not set!");
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }

    if (!password || !safeCompare(password, adminPassword)) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Generate a signed token to store in the cookie
    const token = await signToken(adminPassword);

    const response = NextResponse.json({ ok: true }, { status: 200 });
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,      // Inaccessible to JavaScript — prevents XSS theft
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: "strict",  // Prevents CSRF attacks
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("[admin/login] Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
