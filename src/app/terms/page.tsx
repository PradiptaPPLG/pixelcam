import type { Metadata } from "next";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Syarat dan ketentuan penggunaan PixelCam.",
};

export default function TermsPage() {
  return (
    <section className="section">
      <Container size="sm">

        {/* ── Label ── */}
        <p className="text-label text-[var(--color-accent)] mb-4">Legal</p>

        {/* ── Headline ── */}
        <h1 className="text-heading mb-2">Terms of Service</h1>
        <p className="text-caption mb-10">Terakhir diperbarui: Juli 2025</p>

        <div className="flex flex-col gap-10">

          {/* 1 */}
          <section>
            <h2 className="text-section-title mb-3">1. Penerimaan Syarat</h2>
            <p className="text-body">
              Dengan mengakses dan menggunakan PixelCam, kamu menyetujui syarat
              dan ketentuan yang tercantum di halaman ini. Jika kamu tidak
              menyetujuinya, harap tidak menggunakan layanan ini.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-section-title mb-3">2. Deskripsi Layanan</h2>
            <p className="text-body">
              PixelCam adalah aplikasi photobooth berbasis web yang memungkinkan
              pengguna mengambil foto, menerapkan filter, memilih tema, dan
              mengunduh strip foto langsung dari browser. Layanan ini bersifat
              gratis dan tidak memerlukan akun.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-section-title mb-3">3. Penggunaan yang Diperbolehkan</h2>
            <p className="text-body mb-3">
              Kamu diperbolehkan menggunakan PixelCam untuk keperluan pribadi
              dan non-komersial. Kamu setuju untuk tidak:
            </p>
            <ul className="flex flex-col gap-2 text-caption list-none">
              <li className="flex gap-3">
                <span className="shrink-0 text-[var(--color-accent)]">✦</span>
                <span>Menggunakan layanan untuk tujuan ilegal atau merugikan pihak lain.</span>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0 text-[var(--color-accent)]">✦</span>
                <span>Mencoba meretas, merusak, atau mengganggu sistem PixelCam.</span>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0 text-[var(--color-accent)]">✦</span>
                <span>Menggunakan PixelCam untuk membuat konten yang melanggar hak cipta atau hak privasi orang lain.</span>
              </li>
            </ul>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-section-title mb-3">4. Hak Kekayaan Intelektual</h2>
            <p className="text-body">
              Seluruh elemen desain, kode, dan konten PixelCam adalah milik tim
              PixelCam. Foto yang kamu ambil menggunakan PixelCam sepenuhnya
              menjadi milikmu — kami tidak mengklaim kepemilikan atas foto
              tersebut.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-section-title mb-3">5. Penafian</h2>
            <p className="text-body">
              PixelCam disediakan "sebagaimana adanya" tanpa jaminan dalam
              bentuk apapun. Kami tidak bertanggung jawab atas kehilangan data,
              kerusakan perangkat, atau kerugian lainnya yang timbul dari
              penggunaan layanan ini.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-section-title mb-3">6. Perubahan Layanan</h2>
            <p className="text-body">
              Kami berhak mengubah, menambah, atau menghentikan fitur layanan
              kapan saja tanpa pemberitahuan sebelumnya. Kami juga dapat
              memperbarui syarat ini sewaktu-waktu — perubahan berlaku sejak
              ditampilkan di halaman ini.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-section-title mb-3">7. Kontak</h2>
            <p className="text-body">
              Pertanyaan seputar syarat penggunaan dapat disampaikan melalui
              Instagram{" "}
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
