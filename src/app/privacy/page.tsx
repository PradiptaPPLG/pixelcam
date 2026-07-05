import type { Metadata } from "next";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Kebijakan privasi PixelCam — bagaimana kami menangani data dan privasi pengguna.",
};

export default function PrivacyPage() {
  return (
    <section className="section">
      <Container size="sm">

        {/* ── Label ── */}
        <p className="text-label text-[var(--color-accent)] mb-4">Legal</p>

        {/* ── Headline ── */}
        <h1 className="text-heading mb-2">Privacy Policy</h1>
        <p className="text-caption mb-10">Terakhir diperbarui: Juli 2025</p>

        <div className="flex flex-col gap-10">

          {/* 1 */}
          <section>
            <h2 className="text-section-title mb-3">1. Pendahuluan</h2>
            <p className="text-body">
              PixelCam adalah aplikasi photobooth berbasis web yang berjalan
              sepenuhnya di browser kamu. Kami berkomitmen untuk menjaga privasi
              pengguna. Kebijakan ini menjelaskan informasi apa yang kami
              kumpulkan dan bagaimana kami menggunakannya.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-section-title mb-3">2. Data yang Kami Kumpulkan</h2>
            <p className="text-body mb-3">
              PixelCam dirancang dengan prinsip <em>privacy by default</em>.
              Secara umum, kami tidak menyimpan data pribadi kamu. Berikut
              rinciannya:
            </p>
            <ul className="flex flex-col gap-2 text-caption list-none">
              <li className="flex gap-3">
                <span className="shrink-0 text-[var(--color-accent)]">✦</span>
                <span><strong>Kamera</strong> — akses kamera hanya digunakan secara lokal di browser untuk mengambil foto. Gambar tidak dikirim ke server mana pun.</span>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0 text-[var(--color-accent)]">✦</span>
                <span><strong>Foto</strong> — semua foto diproses langsung di perangkat kamu dan tidak pernah diunggah ke server kami.</span>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0 text-[var(--color-accent)]">✦</span>
                <span><strong>Akun</strong> — PixelCam tidak memerlukan pendaftaran atau login. Kami tidak menyimpan data akun.</span>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0 text-[var(--color-accent)]">✦</span>
                <span><strong>Analitik</strong> — kami mungkin menggunakan layanan analitik pihak ketiga (seperti Vercel Analytics) untuk memahami penggunaan umum aplikasi secara anonim.</span>
              </li>
            </ul>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-section-title mb-3">3. Penggunaan Data</h2>
            <p className="text-body">
              Data anonim yang kami kumpulkan hanya digunakan untuk keperluan
              peningkatan performa dan pengalaman pengguna. Kami tidak menjual,
              menyewakan, atau membagikan data apapun kepada pihak ketiga untuk
              tujuan komersial.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-section-title mb-3">4. Cookie</h2>
            <p className="text-body">
              PixelCam menggunakan penyimpanan lokal browser (localStorage)
              untuk menyimpan preferensi seperti tema tampilan. Tidak ada cookie
              pelacak yang digunakan.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-section-title mb-3">5. Keamanan</h2>
            <p className="text-body">
              Karena foto dan data kamu tidak pernah meninggalkan perangkatmu,
              risiko keamanan dari sisi kami sangat minimal. Namun kami tetap
              menyarankan kamu untuk berhati-hati saat menggunakan perangkat
              bersama.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-section-title mb-3">6. Perubahan Kebijakan</h2>
            <p className="text-body">
              Kami dapat memperbarui kebijakan privasi ini sewaktu-waktu.
              Perubahan akan ditandai dengan tanggal pembaruan di bagian atas
              halaman ini.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-section-title mb-3">7. Kontak</h2>
            <p className="text-body">
              Jika kamu memiliki pertanyaan terkait privasi, kamu dapat
              menghubungi kami melalui Instagram{" "}
              <a
                href="https://www.instagram.com/massdiipp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-accent)] hover:underline"
              >
                @massdiipp
              </a>{" "}
              atau{" "}
              <a
                href="https://www.instagram.com/1lyzznw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-accent)] hover:underline"
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
