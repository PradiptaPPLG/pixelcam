# Panduan Mengaktifkan & Menonaktifkan Expo Mode (PixelCam)

Expo Mode digunakan untuk menampilkan template **Official RPL EXPO** dan memunculkan pesan Instagram **@official__sentinel** di halaman preview. 

Mode ini disimpan di browser masing-masing menggunakan `localStorage`, sehingga tidak memengaruhi pengunjung website umum di HP mereka.

---

## 1. Uji Coba di Komputer Lokal (Localhost)

### Cara Mengaktifkan (Turn ON):
Buka browser dan kunjungi alamat berikut:
```text
http://localhost:3000/expo
```
*Browser akan memproses pengaktifan lalu otomatis memindahkan Anda kembali ke halaman utama `/`.*

### Cara Menonaktifkan (Turn OFF):
Kunjungi alamat berikut:
```text
http://localhost:3000/exit-expo
```
*Browser akan menghapus status expo lalu otomatis memindahkan Anda kembali ke halaman utama `/`.*

---

## 2. Di Website Online (Production / Vercel Host)

Ketika aplikasi sudah di-deploy ke Vercel (misalnya: `pixelcam.vercel.app`), cara pakainya sama persis, cukup sesuaikan domainnya:

### Cara Mengaktifkan di Booth Sekolah (Turn ON):
Buka browser di laptop/tablet booth pameran, lalu kunjungi:
```text
https://domain-kamu.vercel.app/expo
```
*(Ganti `domain-kamu.vercel.app` dengan domain asli website kamu).*

### Cara Menonaktifkan kembali (Turn OFF):
Jika pameran sudah selesai atau ingin dikembalikan ke mode portfolio biasa di perangkat tersebut, kunjungi:
```text
https://domain-kamu.vercel.app/exit-expo
```

---

## 💡 Tips & Cara Kerja
* **Tidak Mengganggu Pengguna Lain**: Jika ada pengunjung membuka `https://domain-kamu.vercel.app` secara langsung di HP mereka, mereka **tidak akan melihat** template Expo maupun pesan Sentinel. Hanya browser yang pernah membuka link `/expo` saja yang akan berubah ke Expo Mode.
* **Mengecek Status Manual (DevTools)**:
  1. Klik kanan -> **Inspect** (atau tekan `F12`).
  2. Pilih tab **Application** (Chrome) atau **Storage** (Firefox).
  3. Buka **Local Storage** -> pilih alamat website kamu.
  4. Cari kunci bernama `expoMode`. Jika nilainya `true`, berarti Expo Mode aktif. Jika tidak ada/dihapus, berarti tidak aktif.
