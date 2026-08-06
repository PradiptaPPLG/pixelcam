import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { parseUserAgent } from "@/utils/userAgent";

// ──────────────────────────────────────────────────────────────
// POST /api/track
//
// Called asynchronously from the client AFTER a page loads so
// it never blocks render. Records one PageView per call.
//
// Payload (JSON body):
//   visitorId : string  — UUID from localStorage
//   path      : string  — e.g. "/camera"
//   referrer  : string  — document.referrer
// ──────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { visitorId, path, referrer } = body as {
      visitorId: string;
      path: string;
      referrer: string;
    };

    if (!visitorId || !path) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // ── Gather metadata from request headers ──────────────────
    const ua = req.headers.get("user-agent") ?? "";
    const { browser, os, device } = parseUserAgent(ua);

    // Vercel automatically injects this header in production
    const country = req.headers.get("x-vercel-ip-country") ?? "Unknown";

    // ── Upsert Session, then create PageView ──────────────────
    // "upsert" = insert if not exists, update lastSeenAt if exists.
    // This ensures one Session row per unique visitor across all visits.
    const session = await db.session.upsert({
      where: { visitorId },
      update: {
        // Refresh device/browser info in case they switched device
        country,
        device,
        browser,
        os,
        // lastSeenAt is auto-updated by Prisma @updatedAt
      },
      create: {
        visitorId,
        country,
        device,
        browser,
        os,
      },
    });

    // Create a fresh PageView record for every single page hit
    await db.pageView.create({
      data: {
        sessionId: session.id,
        path: path.trim(),
        referrer: referrer || null,
      },
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[/api/track] Error:", err);
    // Return 200 anyway — we never want a tracking error to bubble
    // up to the user or break their experience.
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
