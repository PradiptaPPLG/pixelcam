import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind PixelCam — a browser-based photobooth born from a shared portfolio project.",
};

/* ─── Team ─────────────────────────────────────────────────── */
const TEAM = [
  {
    handle: "@massdiipp",
    href: "https://www.instagram.com/massdiipp",
    role: "Co-founder · Developer",
  },
  {
    handle: "@1lyzznw",
    href: "https://www.instagram.com/1lyzznw",
    role: "Co-founder · Designer",
  },
] as const;

/* ─── Page ─────────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <article className="section">
      <Container size="sm">

        {/* ── Label ── */}
        <p className="text-label text-[var(--color-accent)] mb-4">About</p>

        {/* ── Headline ── */}
        <h1 className="text-heading mb-6">Why does PixelCam exist?</h1>

        {/* ── Background ── */}
        <section className="mb-10 flex flex-col gap-5">
          <p className="text-body">
            PixelCam started from a simple idea: build something lightweight,
            easy to use, and genuinely enjoyable. We believe a great experience
            doesn&apos;t have to be complicated — just open it, use it, and have fun
            without unnecessary friction.
          </p>
          <p className="text-body">
            The idea came when Pradipta suggested we build a shared portfolio
            project — something to learn from and show off together. At first,
            we designed an education-focused app for students. But after several
            discussions, we felt like making something simpler, more creative,
            and enjoyable for anyone.
          </p>
          <p className="text-body">
            That&apos;s when the concept of PixelCam took shape. We decided to build
            a web-based photobooth that works directly in the browser — no
            installation, no account required. We worked on it during school
            break as a way to experiment with web technology and build something
            we could both be proud of.
          </p>
          <p className="text-body">
            The result is PixelCam — a web photobooth with cinematic filters,
            theme options, and photo strips you can download instantly. What
            started as a portfolio project, we hope can become a simple app that
            brings fun and joy to anyone who wants to capture moments with
            friends, family, or loved ones.
          </p>
        </section>

        {/* ── Divider ── */}
        <div className="h-px bg-[var(--color-border)] mb-10" />

        {/* ── Team ── */}
        <section className="mb-14">
          <h2 className="text-section-title mb-6">Team</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {TEAM.map(({ handle, href, role }) => (
              <a
                key={handle}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-1 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface-0)] p-6 transition-all duration-200 hover:bg-[var(--color-surface-2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
              >
                <span className="text-[15px] font-semibold text-[var(--fg)] transition-colors group-hover:text-[var(--color-accent)]">
                  {handle}
                </span>
                <span className="text-caption text-[var(--color-accent)]">
                  {role}
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <div className="flex flex-col items-start justify-between gap-5 rounded-[var(--radius-large)] border border-[var(--color-accent-100)] bg-[var(--color-accent-50)] px-8 py-8 sm:flex-row sm:items-center">
          <div>
            <p className="text-[15px] font-semibold text-[var(--fg)]">
              Want to try it?
            </p>
            <p className="text-caption">
              No sign-up. No download. Just open and shoot.
            </p>
          </div>
          <Link href="/booth" className="shrink-0">
            <Button
              id="about-cta-btn"
              variant="primary"
              size="md"
              className="rounded-full !text-white"
            >
              Open Booth
            </Button>
          </Link>
        </div>

      </Container>
    </article>
  );
}
