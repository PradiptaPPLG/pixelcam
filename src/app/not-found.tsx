import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "This page could not be found.",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="flex-1 flex items-center justify-center py-24">
      <Container size="sm" className="flex flex-col items-center text-center gap-8">
        {/* Animated aperture */}
        <div className="animate-float">
          <Logo size={56} showWordmark={false} />
        </div>

        {/* Error code */}
        <div className="flex flex-col items-center gap-3">
          <span className="text-overline">Error 404</span>
          <h1 className="text-headline">Page not found</h1>
          <p className="text-body-lg max-w-sm">
            This shot didn&apos;t develop. The page you&apos;re looking for doesn&apos;t
            exist or has been moved.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/">
            <Button id="not-found-home-btn" size="md" variant="primary" className="rounded-full">
              Back to home
            </Button>
          </Link>
          <Link href="/booth">
            <Button id="not-found-booth-btn" size="md" variant="secondary" className="rounded-full">
              Open Booth
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
