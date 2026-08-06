import type { Metadata } from "next";

// ──────────────────────────────────────────────────────────────
// Admin Layout
//
// 1. Suppresses the global public Navbar and Footer on admin routes.
// 2. Overrides the top padding of the main wrapper.
// 3. Disables search engine indexing for privacy.
// ──────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Admin — PixelCam Analytics",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-layout-root w-full min-h-screen bg-[#fafafa] dark:bg-[#0d0d0f] transition-colors duration-300">
      <style dangerouslySetInnerHTML={{ __html: `
        /* Hide public header and footer inside admin panel */
        header[role="banner"],
        footer[role="contentinfo"] {
          display: none !important;
        }
        /* Reset top padding of the root main wrapper */
        #main-content {
          padding-top: 0 !important;
        }
      `}} />
      {children}
    </div>
  );
}
