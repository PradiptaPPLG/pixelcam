import type { Metadata } from "next";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "PixelCam's privacy policy — how we handle your data and protect your privacy.",
};

export default function PrivacyPage() {
  return (
    <section className="section">
      <Container size="sm">

        {/* ── Label ── */}
        <p className="text-label text-[var(--color-accent)] mb-4">Legal</p>

        {/* ── Headline ── */}
        <h1 className="text-heading mb-2">Privacy Policy</h1>
        <p className="text-caption mb-10">Last updated: July 2025</p>

        <div className="flex flex-col gap-10">

          <section>
            <h2 className="text-section-title mb-3">1. Introduction</h2>
            <p className="text-body">
              PixelCam is a browser-based photobooth that runs entirely on your
              device. We are committed to protecting your privacy. This policy
              explains what information we collect and how we use it.
            </p>
          </section>

          <section>
            <h2 className="text-section-title mb-3">2. Data We Collect</h2>
            <p className="text-body mb-3">
              PixelCam is built with a <em>privacy by default</em> approach.
              We generally do not store any personal data. Here&apos;s the breakdown:
            </p>
            <ul className="flex flex-col gap-2 list-none">
              <li className="flex gap-3 text-caption">
                <span className="shrink-0 text-[var(--color-accent)]">✦</span>
                <span><strong className="text-[var(--fg)]">Camera</strong> — camera access is used locally in your browser to take photos. Images are never sent to any server.</span>
              </li>
              <li className="flex gap-3 text-caption">
                <span className="shrink-0 text-[var(--color-accent)]">✦</span>
                <span><strong className="text-[var(--fg)]">Photos</strong> — all photos are processed directly on your device and are never uploaded to our servers.</span>
              </li>
              <li className="flex gap-3 text-caption">
                <span className="shrink-0 text-[var(--color-accent)]">✦</span>
                <span><strong className="text-[var(--fg)]">Accounts</strong> — PixelCam requires no registration or login. We do not store any account data.</span>
              </li>
              <li className="flex gap-3 text-caption">
                <span className="shrink-0 text-[var(--color-accent)]">✦</span>
                <span><strong className="text-[var(--fg)]">Analytics</strong> — we may use third-party analytics (such as Vercel Analytics) to understand general usage patterns anonymously.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-section-title mb-3">3. How We Use Data</h2>
            <p className="text-body">
              Any anonymous data we collect is used solely to improve app
              performance and user experience. We do not sell, rent, or share
              any data with third parties for commercial purposes.
            </p>
          </section>

          <section>
            <h2 className="text-section-title mb-3">4. Cookies</h2>
            <p className="text-body">
              PixelCam uses browser local storage (localStorage) to save
              preferences such as your selected theme. No tracking cookies are
              used.
            </p>
          </section>

          <section>
            <h2 className="text-section-title mb-3">5. Security</h2>
            <p className="text-body">
              Because your photos and data never leave your device, security
              risks on our end are minimal. We still recommend being cautious
              when using PixelCam on a shared device.
            </p>
          </section>

          <section>
            <h2 className="text-section-title mb-3">6. Policy Updates</h2>
            <p className="text-body">
              We may update this privacy policy at any time. Changes will be
              reflected by the updated date at the top of this page.
            </p>
          </section>

          <section>
            <h2 className="text-section-title mb-3">7. Contact</h2>
            <p className="text-body">
              If you have any questions about this privacy policy, feel free to
              reach out via Instagram{" "}
              <a
                href="https://www.instagram.com/massdiipp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-accent)] hover:underline focus-visible:outline-none focus-visible:underline"
              >
                @massdiipp
              </a>{" "}
              or{" "}
              <a
                href="https://www.instagram.com/1lyzznw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-accent)] hover:underline focus-visible:outline-none focus-visible:underline"
              >
                @1lyzznw
              </a>.
            </p>
          </section>

        </div>
      </Container>
    </section>
  );
}
