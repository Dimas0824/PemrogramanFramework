# Middleware Auth Demo

Dokumentasi ini dipakai untuk tugas proteksi route dengan middleware pada Next.js Pages Router.

## Route localhost yang bisa diakses

- `http://localhost:3000/login`
- `http://localhost:3000/auth/login`
- `http://localhost:3000/about`
- `http://localhost:3000/products`

## Route yang diproteksi

Middleware hanya memproteksi route berikut:

- `/about`
- `/products`

Logika yang dipakai:

- Jika cookie `isLogin=true`, request diizinkan lanjut.
- Jika cookie belum ada atau bukan `true`, request di-redirect ke `/login`.

## Skenario screenshot

### Sebelum login

1. Buka browser incognito atau hapus cookie `isLogin`.
2. Akses `http://localhost:3000/products`.
3. Browser akan diarahkan ke `http://localhost:3000/login?from=/products`.
4. Ambil screenshot kondisi redirect ini.

### Sesudah login

1. Pada halaman `http://localhost:3000/login`, klik tombol `Login`.
2. Aplikasi akan membuat cookie `isLogin=true`.
3. Kamu akan diarahkan kembali ke route asal, atau ke `/products` jika tidak ada query `from`.
4. Ambil screenshot halaman berhasil dibuka setelah login.

## Perbandingan middleware vs useEffect

### Middleware

- Berjalan sebelum halaman dirender.
- Redirect terjadi lebih cepat karena dilakukan di server/edge.
- Cocok untuk proteksi route.
- Tidak bisa membaca `localStorage`, sehingga status login perlu disimpan di cookie.

### useEffect

- Berjalan setelah halaman dirender di browser.
- User bisa sempat melihat halaman protected sebelum diarahkan.
- Hanya cocok untuk pengecekan client-side tambahan.
- Bisa membaca `localStorage`, tetapi kurang ideal untuk proteksi route utama.
