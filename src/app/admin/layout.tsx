import type { Metadata } from "next";

// ──────────────────────────────────────────────────────────────
// Admin Layout
// Strips out the global Navbar and Footer so the admin UI
// has its own full-screen layout without public-facing chrome.
// ──────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Admin — PixelCam Analytics",
  robots: { index: false, follow: false }, // Hide admin from search engines
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    // pt-0 override: removes the pt-16 from the root layout's <main>
    <div style={{ marginTop: "-4rem" }}>
      {children}
    </div>
  );
}
