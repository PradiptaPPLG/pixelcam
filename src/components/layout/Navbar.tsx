"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
import ThemeToggle from "@/components/ui/ThemeToggle";

/* ── Nav links ─────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Home",     href: "/" },
  { label: "Features", href: "/#features" },
  { label: "Gallery",  href: "/#gallery" },
  { label: "FAQ",      href: "/#faq" },
] as const;

/* ── Logo ──────────────────────────────────────────────────── */
function NavLogo() {
  return (
    <Link
      href="/"
      aria-label="PixelCam home"
      className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4f46e5] rounded-[10px]"
    >
      {/* Aperture icon */}
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <rect width="26" height="26" rx="7" fill="#111111" />
        <circle cx="13" cy="13" r="7.5" stroke="#ffffff" strokeWidth="1" fill="none" opacity="0.3" />
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <rect
            key={deg}
            x="11.5" y="5.5" width="3" height="7" rx="1.5"
            fill="white"
            opacity="0.9"
            transform={`rotate(${deg} 13 13)`}
          />
        ))}
        <circle cx="13" cy="13" r="2" fill="white" />
      </svg>
      <span className="font-semibold text-[15px] tracking-tight text-[#111111]">
        PixelCam
      </span>
    </Link>
  );
}

/* ── Navbar ────────────────────────────────────────────────── */
export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setMobileOpen(false), 0);
    return () => clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        role="banner"
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "backdrop-blur-md bg-[rgba(250,250,250,0.88)] border-b border-[#e5e7eb]"
            : "bg-transparent",
        )}
      >
        <Container>
          <nav
            className="flex items-center justify-between h-16"
            aria-label="Main navigation"
          >
            <NavLogo />

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-1" role="list">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="px-3.5 py-2 rounded-xl text-[14px] font-medium text-[#6b7280] hover:text-[#111111] hover:bg-[#f5f5f5] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4f46e5]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <Link
                href="/booth"
                id="navbar-start-session"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[14px] bg-[#111111] text-white text-[13px] font-medium hover:bg-[#222222] active:bg-[#333333] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4f46e5] focus-visible:ring-offset-2"
              >
                Start Session
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              id="navbar-mobile-toggle"
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-xl hover:bg-[#f5f5f5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4f46e5]"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={cn(
                    "block w-[17px] h-[1.5px] bg-[#111111] rounded-full transition-all duration-300",
                    i === 0 && mobileOpen && "translate-y-[6.5px] rotate-45",
                    i === 1 && mobileOpen && "opacity-0 scale-x-0",
                    i === 2 && mobileOpen && "-translate-y-[6.5px] -rotate-45",
                  )}
                />
              ))}
            </button>
          </nav>
        </Container>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-300",
          mobileOpen ? "visible" : "invisible",
        )}
      >
        <div
          aria-hidden="true"
          onClick={() => setMobileOpen(false)}
          className={cn(
            "absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300",
            mobileOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "absolute top-0 right-0 bottom-0 w-64 bg-[#fafafa] border-l border-[#e5e7eb]",
            "flex flex-col pt-20 pb-8 px-5",
            "transition-transform duration-300 ease-out",
            mobileOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <nav aria-label="Mobile navigation">
            <ul className="flex flex-col gap-1" role="list">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-[#6b7280] hover:text-[#111111] hover:bg-[#f5f5f5] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#6b7280]">Theme</span>
              <ThemeToggle />
            </div>
            <Link
              href="/booth"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-[14px] bg-[#111111] text-white text-sm font-medium hover:bg-[#222222] transition-colors"
            >
              Start Session
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
