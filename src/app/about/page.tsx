import type { Metadata } from "next";
import Link from "next/link";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "About",
  description:
    "Cerita di balik PixelCam, sebuah web photobooth yang lahir dari proyek portofolio bersama.",
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
    role: "Co-founder",
  },
] as const;

/* ─── Page ─────────────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <article className="section">
      <Container size="sm">
        {/* ── Label ── */}
        <p className="mb-4 text-label text-[var(--color-accent)]">About</p>

        {/* ── Headline ── */}
        <h1 className="mb-6 text-heading">Kenapa PixelCam ada?</h1>

        {/* ── Latar Belakang ── */}
        <section className="prose-section mb-10 flex flex-col gap-5">
          <p className="text-body">
            PixelCam berawal dari sebuah ide sederhana: membuat aplikasi yang
            ringan, mudah digunakan, dan memiliki tampilan yang menyenangkan.
            Kami percaya bahwa pengalaman yang baik tidak harus rumit. Cukup
            buka, gunakan, dan nikmati tanpa proses yang berbelit-belit.
          </p>

          <p className="text-body">
            Ide proyek ini muncul ketika Pradipta mengusulkan agar kami membuat
            sebuah portofolio bersama sebagai wadah untuk belajar sekaligus
            menunjukkan hasil karya yang kami bangun. Pada awalnya, kami
            merancang sebuah aplikasi bertema pendidikan yang ditujukan untuk
            membantu para pelajar. Namun, setelah melalui berbagai diskusi,
            kami merasa ingin membuat sesuatu yang lebih sederhana, kreatif,
            dan dapat dinikmati oleh siapa saja.
          </p>

          <p className="text-body">
            Dari situlah konsep PixelCam mulai terbentuk. Kami memutuskan untuk
            mengembangkan sebuah web photobooth yang bisa langsung digunakan
            melalui browser tanpa perlu menginstal aplikasi maupun membuat akun.
            Proyek ini kemudian kami kerjakan di sela-sela liburan kenaikan
            kelas sebagai media belajar, bereksperimen dengan teknologi web,
            sekaligus membangun portofolio bersama.
          </p>

          <p className="text-body">
            Hasilnya adalah PixelCam—sebuah web photobooth dengan berbagai
            filter sinematik, pilihan tema, dan strip foto yang dapat langsung
            diunduh. Walaupun berawal dari proyek portofolio, kami berharap
            PixelCam dapat menjadi aplikasi sederhana yang mampu menghadirkan
            pengalaman seru dan menyenangkan bagi siapa pun yang ingin
            mengabadikan momen bersama teman, keluarga, maupun orang terdekat.
          </p>
        </section>

        {/* ── Divider ── */}
        <div className="mb-10 h-px bg-[var(--color-border)]" />

        {/* ── Tim ── */}
        <section className="mb-14">
          <h2 className="mb-6 text-section-title">Tim</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {TEAM.map(({ handle, href, role }) => (
              <a
                key={handle}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-1 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface-0)] p-6 transition-all duration-200 hover:border-[#d1d5db] hover:shadow-[var(--shadow-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
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
              Mau coba langsung?
            </p>

            <p className="text-caption">
              Tidak perlu daftar. Tidak perlu unduh. Buka dan mulai foto.
            </p>
          </div>

          <Link href="/booth" className="shrink-0">
            <Button
              id="about-cta-btn"
              variant="primary"
              size="md"
              className="rounded-full !text-white"
            >
              Buka Booth
            </Button>
          </Link>
        </div>
      </Container>
    </article>
  );
}