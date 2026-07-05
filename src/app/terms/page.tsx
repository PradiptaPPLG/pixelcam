import type { Metadata } from "next";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using PixelCam.",
};

export default function TermsPage() {
  return (
    <section className="section">
      <Container size="sm">

        {/* ── Label ── */}
        <p className="text-label text-[var(--color-accent)] mb-4">Legal</p>

        {/* ── Headline ── */}
        <h1 className="text-heading mb-2">Terms of Service</h1>
        <p className="text-caption mb-10">Last updated: July 2025</p>

        <div className="flex flex-col gap-10">

          <section>
            <h2 className="text-section-title mb-3">1. Acceptance of Terms</h2>
            <p className="text-body">
              By accessing and using PixelCam, you agree to the terms and
              conditions outlined on this page. If you do not agree, please
              refrain from using the service.
            </p>
          </section>

          <section>
            <h2 className="text-section-title mb-3">2. Service Description</h2>
            <p className="text-body">
              PixelCam is a browser-based photobooth that lets users take
              photos, apply filters, choose themes, and download photo strips
              directly from their browser. The service is free and requires no
              account.
            </p>
          </section>

          <section>
            <h2 className="text-section-title mb-3">3. Acceptable Use</h2>
            <p className="text-body mb-3">
              You may use PixelCam for personal, non-commercial purposes. You
              agree not to:
            </p>
            <ul className="flex flex-col gap-2 list-none">
              <li className="flex gap-3 text-caption">
                <span className="shrink-0 text-[var(--color-accent)]">✦</span>
                <span>Use the service for illegal purposes or to harm others.</span>
              </li>
              <li className="flex gap-3 text-caption">
                <span className="shrink-0 text-[var(--color-accent)]">✦</span>
                <span>Attempt to hack, damage, or disrupt PixelCam&apos;s systems.</span>
              </li>
              <li className="flex gap-3 text-caption">
                <span className="shrink-0 text-[var(--color-accent)]">✦</span>
                <span>Use PixelCam to create content that infringes on copyright or the privacy of others.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-section-title mb-3">4. Intellectual Property</h2>
            <p className="text-body">
              All design elements, code, and content of PixelCam belong to the
              PixelCam team. Photos you take using PixelCam are entirely yours
              — we make no claim of ownership over them.
            </p>
          </section>

          <section>
            <h2 className="text-section-title mb-3">5. Disclaimer</h2>
            <p className="text-body">
              PixelCam is provided &quot;as is&quot; without warranties of any kind. We
              are not responsible for data loss, device damage, or any other
              harm arising from the use of this service.
            </p>
          </section>

          <section>
            <h2 className="text-section-title mb-3">6. Changes to the Service</h2>
            <p className="text-body">
              We reserve the right to modify, add, or discontinue features at
              any time without prior notice. We may also update these terms at
              any time — changes take effect as soon as they are posted on this
              page.
            </p>
          </section>

          <section>
            <h2 className="text-section-title mb-3">7. Contact</h2>
            <p className="text-body">
              Questions about these terms can be directed to us via Instagram{" "}
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
