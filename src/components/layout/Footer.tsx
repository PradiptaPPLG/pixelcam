import Link from "next/link";

/* ── Nav groups ─────────────────────────────────────────────── */
const LINKS = [
  {
    title: "Product",
    items: [
      { label: "Booth",    href: "/booth" },
      { label: "Themes",   href: "/#gallery" },
      { label: "Filters",  href: "/#features" },
      { label: "Pricing",  href: "/pricing" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About",    href: "/about" },
      { label: "Blog",     href: "/blog" },
      { label: "Careers",  href: "/careers" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Privacy",  href: "/privacy" },
      { label: "Terms",    href: "/terms" },
    ],
  },
] as const;

/* ── Social icons ───────────────────────────────────────────── */
const INSTAGRAM_ICON = (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const SOCIALS = [
  {
    label: "Instagram @massdiipp",
    href: "https://www.instagram.com/massdiipp",
    icon: INSTAGRAM_ICON,
  },
  {
    label: "Instagram @1lyzznw",
    href: "https://www.instagram.com/1lyzznw",
    icon: INSTAGRAM_ICON,
  },
  {
    label: "GitHub",
    href: "https://github.com/PradiptaPPLG",
    icon: (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
] as const;

/* ── Footer ─────────────────────────────────────────────────── */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="border-t border-[#e5e7eb] bg-[#fafafa]"
    >
      <div className="max-w-[1280px] mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2 flex flex-col gap-4">
            {/* Logo */}
            <Link
              href="/"
              aria-label="PixelCam home"
              className="flex items-center gap-2 w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4f46e5] rounded-lg"
            >
              <svg width="24" height="24" viewBox="0 0 26 26" fill="none" aria-hidden="true">
                <rect width="26" height="26" rx="7" fill="#111111" />
                <circle cx="13" cy="13" r="7.5" stroke="#ffffff" strokeWidth="1" fill="none" opacity="0.3" />
                {[0, 60, 120, 180, 240, 300].map((deg) => (
                  <rect key={deg} x="11.5" y="5.5" width="3" height="7" rx="1.5" fill="white" opacity="0.9" transform={`rotate(${deg} 13 13)`} />
                ))}
                <circle cx="13" cy="13" r="2" fill="white" />
              </svg>
              <span className="font-semibold text-[15px] tracking-tight text-[#111111]">PixelCam</span>
            </Link>

            <p className="text-[13px] text-[#6b7280] leading-relaxed max-w-[220px]">
              A premium online photobooth experience.
              Capture the moment, right from your browser.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-2 mt-1">
              {SOCIALS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-[10px] flex items-center justify-center border border-[#e5e7eb] bg-white text-[#6b7280] hover:text-[#111111] hover:border-[#d1d5db] transition-all duration-150 shadow-[0_1px_2px_rgba(0,0,0,0.04)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4f46e5]"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link groups */}
          {LINKS.map(({ title, items }) => (
            <div key={title} className="flex flex-col gap-4">
              <h3 className="text-[11px] font-semibold text-[#111111] tracking-wider uppercase">
                {title}
              </h3>
              <ul className="flex flex-col gap-2.5" role="list">
                {items.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-[13px] text-[#6b7280] hover:text-[#111111] transition-colors duration-150 focus-visible:outline-none focus-visible:underline"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#e5e7eb] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[12px] text-[#9ca3af]">
            © {year} PixelCam. All rights reserved.
          </p>
          <p className="text-[12px] text-[#9ca3af]">
            Built by{" "}
            <a
              href="https://www.instagram.com/massdiipp"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#6b7280] hover:text-[#111111] transition-colors focus-visible:outline-none focus-visible:underline"
            >
              @massdiipp
            </a>{" "}
            &amp;{" "}
            <a
              href="https://www.instagram.com/1lyzznw"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#6b7280] hover:text-[#111111] transition-colors focus-visible:outline-none focus-visible:underline"
            >
              @1lyzznw
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
