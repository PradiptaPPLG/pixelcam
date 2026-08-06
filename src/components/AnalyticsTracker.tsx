"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// ──────────────────────────────────────────────────────────────
// AnalyticsTracker
//
// A zero-UI client component placed in the root layout that
// fires a tracking event on every page navigation AND refresh.
//
// ✅ Async-only: tracking request fires AFTER the page renders,
//    so it never delays page load for the user.
// ✅ Session persistence: uses localStorage UUID so the same
//    visitor across tabs/refreshes maps to one Session row.
// ✅ Admin-safe: does NOT track /admin/* routes.
// ──────────────────────────────────────────────────────────────

const STORAGE_KEY = "pixelcam:visitor_id";

function getOrCreateVisitorId(): string {
  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing) return existing;

    // Generate a simple UUID v4
    const id = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
    localStorage.setItem(STORAGE_KEY, id);
    return id;
  } catch {
    // localStorage might be blocked (private/incognito — still fine)
    return "anonymous";
  }
}

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    // Skip tracking for admin pages
    if (pathname.startsWith("/admin")) return;

    // Prevent double-firing the same path (React StrictMode runs effects twice in dev)
    if (lastTrackedPath.current === pathname) return;
    lastTrackedPath.current = pathname;

    const visitorId = getOrCreateVisitorId();

    // Use sendBeacon when available (guaranteed delivery even on page close),
    // fall back to fetch for environments that don't support it.
    const payload = JSON.stringify({
      visitorId,
      path: pathname,
      referrer: document.referrer,
    });

    if (typeof navigator.sendBeacon === "function") {
      const blob = new Blob([payload], { type: "application/json" });
      navigator.sendBeacon("/api/track", blob);
    } else {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {
        // Silently ignore — tracking errors must never surface to user
      });
    }
  }, [pathname]);

  // This component renders nothing
  return null;
}
