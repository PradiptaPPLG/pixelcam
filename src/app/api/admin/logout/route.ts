import { NextResponse } from "next/server";

const COOKIE_NAME = "pixelcam_admin_session";

// ──────────────────────────────────────────────────────────────
// POST /api/admin/logout
// Clears the admin session cookie.
// ──────────────────────────────────────────────────────────────
export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0, // Immediately expire the cookie
    path: "/",
  });
  return response;
}
