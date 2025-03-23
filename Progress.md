## Perjalanan Project / Journey of Project

Project ini dibangun dengan tech stack : 
- React
- Typescript
- Tailwind
- Vite

Aplikasi sudah berjalan seperti seharusnya sudah bisa bolak balik kartu, mode gelap juga sudah berjalan semestinya
tombol sudah dipelajari juga sudah berjalan dengan baik tapi ada satu bug yang saya rasa sedikit mengganggu feedback style kartunya tidak langsung berubah ketika tombol sudah dipelajari diklik.

seperti contoh dibawah ini : 
insert gif here
bisa dilihat dari gambar bahwa feedback tidak langsung didapatkan ketika klik tombol learned sudah alasannya disini adalah karena React tidak mendapatkan update terbaru dari react sehingga react tidak melakukan re-render agar UI update dengan data terbaru.

saya akhirnya menggunakan global state management zustand untuk state management.
