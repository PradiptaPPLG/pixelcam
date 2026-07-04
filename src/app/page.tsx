import type { Metadata } from "next";
import HeroSection       from "@/components/landing/HeroSection";
import TrustSection      from "@/components/landing/TrustSection";
import FeaturesSection   from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import GallerySection    from "@/components/landing/GallerySection";
import FaqSection        from "@/components/landing/FaqSection";
import CtaSection        from "@/components/landing/CtaSection";

export const metadata: Metadata = {
  title: "PixelCam: Capture Moments Like a Real Photobooth",
  description:
    "Create beautiful aesthetic photo strips directly from your browser. Choose elegant themes, cinematic filters, and download instantly. No install required.",
};

/* ================================================================
   Landing Page — all sections are modular client/server components
   ================================================================ */
export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Trust / social proof */}
      <TrustSection />

      {/* 3. Features */}
      <FeaturesSection />

      {/* 4. How it works */}
      <HowItWorksSection />

      {/* 5. Gallery preview */}
      <GallerySection />

      {/* 6. FAQ */}
      <FaqSection />

      {/* 7. CTA */}
      <CtaSection />
    </>
  );
}
