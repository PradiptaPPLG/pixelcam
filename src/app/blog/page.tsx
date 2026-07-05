import type { Metadata } from "next";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Panduan lengkap cara menggunakan PixelCam — dari membuka booth hingga mengunduh hasil foto.",
};

/* ─── Tutorial steps ────────────────────────────────────────── */
const STEPS = [
  {
    number: "01",
    title: "Buka Booth",
    description:
      'Klik tombol "Start Session" atau "Open Booth" di halaman utama. Tidak perlu akun, tidak perlu install apa pun — langsung jalan di browser.',
  },
  {
    number: "02",
    title: "Izinkan Akses Kamera",
    description:
      'Browser akan meminta izin mengakses kamera. Klik "Allow" / "Izinkan". Kalau kamu punya lebih dari satu kamera, kamu bisa pilih mana yang ingin dipakai.',
  },
  {
    number: "03",
    title: "Pilih Tema",
    description:
      "Sebelum memotret, pilih tema tampilan strip foto kamu. Ada berbagai pilihan estetik — dari minimalis, vintage, hingga modern. Tema mengatur warna frame dan layout strip.",
  },
  {
    number: "04",
    title: "Pilih Filter",
    description:
      "Aktifkan filter sinematik sesuai mood kamu. Filter akan langsung terlihat di preview kamera secara real-time sebelum kamu memotret.",
  },
  {
    number: "05",
    title: "Ambil Foto",
    description:
      "Tekan tombol capture. PixelCam akan melakukan countdown otomatis, lalu mengambil beberapa foto sekaligus untuk membentuk strip. Pastikan pencahayaan cukup untuk hasil terbaik.",
  },
  {
    number: "06",
    title: "Edit di Studio",
    description:
      "Setelah foto diambil, kamu bisa masuk ke editor untuk menyesuaikan kecerahan, kontras, dan saturasi. Tambahkan stiker atau teks kalau mau.",
  },
  {
    number: "07",
    title: "Unduh Hasil",
    description:
      "Kalau sudah puas, klik tombol unduh. Strip foto akan tersimpan langsung ke perangkat kamu dalam format gambar berkualitas tinggi.",
  },
] as const;

/* ─── Tips ──────────────────────────────────────────────────── */
const TIPS = [
  "Gunakan pencahayaan dari depan (hadap jendela) agar wajah lebih terang dan filter bekerja optimal.",
  "Coba beberapa filter di preview sebelum memotret — efeknya bisa sangat berbeda tergantung kondisi cahaya.",
  "Untuk foto grup, mundur sedikit agar semua orang masuk frame.",
  "PixelCam bekerja paling baik di browser Chrome atau Edge versi terbaru.",
] as const;

/* ─── Page ──────────────────────────────────────────────────── */
export default function BlogPage() {
  return (
    <section className="section">
      <Container size="sm">

        {/* ── Label ── */}
        <p className="text-label text-[var(--color-accent)] mb-4">Panduan</p>

        {/* ── Headline ── */}
        <h1 className="text-heading mb-4">Cara Menggunakan PixelCam</h1>

        <p className="text-body mb-14">
          Ikuti langkah-langkah berikut untuk mendapatkan hasil foto terbaik
          dari PixelCam — semuanya berjalan langsung di browser kamu.
        </p>

        {/* ── Steps ── */}
        <ol className="flex flex-col gap-6" role="list">
          {STEPS.map(({ number, title, description }) => (
            <li
              key={number}
              className="flex gap-5 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface-0)] p-6 hover:shadow-[var(--shadow-md)] transition-shadow duration-200"
            >
              {/* Step number */}
              <span className="shrink-0 w-10 h-10 rounded-full bg-[var(--color-accent-50)] text-[var(--color-accent)] text-[13px] font-bold flex items-center justify-center">
                {number}
              </span>

              {/* Content */}
              <div className="flex flex-col gap-1.5">
                <h2 className="text-[16px] font-semibold text-[var(--fg)]">
                  {title}
                </h2>
                <p className="text-caption">{description}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* ── Divider ── */}
        <div className="h-px bg-[var(--color-border)] my-12" />

        {/* ── Tips ── */}
        <div className="rounded-[var(--radius-card)] bg-[var(--color-accent-50)] border border-[var(--color-accent-100)] p-6">
          <h2 className="text-section-title mb-4">Tips & Trik</h2>
          <ul className="flex flex-col gap-3" role="list">
            {TIPS.map((tip) => (
              <li key={tip} className="flex gap-3 text-caption">
                <span className="shrink-0 mt-0.5 text-[var(--color-accent)]">✦</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

      </Container>
    </section>
  );
}
