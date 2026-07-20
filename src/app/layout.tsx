import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { siteConfig } from "@/config/site";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

/* ----------------------------------------------------------------
   Geist Font — via next/font/google (PROJECT_RULES spec)
   ---------------------------------------------------------------- */
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

/* ----------------------------------------------------------------
   Site-wide metadata
   ---------------------------------------------------------------- */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "photobooth", "online photobooth", "photo strip",
    "camera filters", "photo booth app", "browser photobooth", "PixelCam",
  ],
  authors: [{ name: "PixelCam Team" }],
  creator: "PixelCam",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    creator: "@pixelcam",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: { icon: "/favicon.ico", shortcut: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#fafafa",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

import { MAINTENANCE_CONFIG } from "@/config/maintenance";
import MaintenanceScreen from "@/components/ui/MaintenanceScreen";

/* ----------------------------------------------------------------
   Root Layout
   ---------------------------------------------------------------- */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={geistSans.variable}>
      <head>
        {/* Apply saved color mode before paint to avoid a flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var m=localStorage.getItem('pixelcam:theme-mode')||'system';var d=m==='dark'||(m==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);var r=document.documentElement;r.classList.toggle('dark',d);r.style.colorScheme=d?'dark':'light';}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className="min-h-screen flex flex-col antialiased"
        style={{ backgroundColor: "var(--bg)", color: "var(--fg)" }}
      >
        {MAINTENANCE_CONFIG.enabled && <MaintenanceScreen />}

        {/* Skip to content — accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-[14px] focus:bg-[#4f46e5] focus:text-white focus:text-sm focus:font-medium focus:outline-none"
        >
          Skip to main content
        </a>

        <Navbar />

        <main id="main-content" className="flex-1 flex flex-col pt-16">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
