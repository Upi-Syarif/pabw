const profil = {
  nama: "Muhammad Lutfi Syarif",
  nim: "25523021",
  peran: "Mahasiswa Informatika yang belajar front-end",
  kampus: "Universitas Islam Indonesia",
};

const daftarKeahlian = [
  { nama: "HTML dan CSS", tingkat: "menengah" },
  { nama: "Logika pemrograman", tingkat: "menengah" },
  { nama: "Desain UI/UX", tingkat: "dasar" },
];

const daftarProyek = [
  {
    judul: "Astranauts 2026 - FINATRA NEXUS",
    jenis: "bisnis",
    tahun: 2026,
    deskripsi: "Ide bisnis untuk perusahaan Astra.",
  },
  {
    judul: "Startup Hackathon IT Centrum - PaceIT",
    jenis: "bisnis",
    tahun: 2025,
    deskripsi: "Prototype bisnis alat kesehatan untuk para pelari.",
  },
  {
    judul: "Expo Semester 2",
    jenis: "aplikasi",
    tahun: 2026,
    deskripsi: "Aplikasi desktop untuk memudahkan kasir mengelola menu.",
  },
];


function buatPerkenalan({ nama, peran = "mahasiswa" }) {
  return `Halo, saya ${nama}, ${peran}.`;
}

function formatKeahlian(daftar) {
  if (daftar.length === 0) {
    return "-";
  }
  return daftar.map((k) => k.nama).join(", ");
}

console.log(buatPerkenalan(profil));
console.log(`Keahlian: ${formatKeahlian(daftarKeahlian)}`);

console.log("--- 1. console.table ---");
console.table(daftarProyek);
console.log(`Baris array: ${daftarProyek.length}`);

console.log("--- 2. filter jenis === 'bisnis' ---");
const proyekBisnis = daftarProyek.filter((p) => p.jenis === "bisnis");
console.table(proyekBisnis);
console.log(`Jumlah hasil: ${proyekBisnis.length}`);

console.log("--- 3. find ---");
const ketemu = daftarProyek.find((p) => p.judul === "Expo Semester 2");
const tidakAda = daftarProyek.find((p) => p.judul === "Tidak Ada");
console.log("Yang cocok:", ketemu);
console.log("Yang tidak ada:", tidakAda);

console.log("--- 4. map ---");
const daftarJudul = daftarProyek.map((p) => p.judul);
console.log(daftarJudul);
console.log(`Panjang asal: ${daftarProyek.length}, panjang hasil: ${daftarJudul.length}`);


console.log("--- 5. sort pada salinan ---");
const urutanSebelum = daftarProyek.map((p) => p.judul);
const urutTahun = [...daftarProyek].sort((a, b) => a.tahun - b.tahun);
const urutanSesudah = daftarProyek.map((p) => p.judul);
console.log("Hasil sort:", urutTahun.map((p) => `${p.tahun} ${p.judul}`));
console.log(
  "Urutan asli tidak berubah:",
  urutanSebelum.join("|") === urutanSesudah.join("|")
);