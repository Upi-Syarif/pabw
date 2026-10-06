// Data profil (dari lembar sebelumnya)
const namaLengkap = "Muhammad Lutfi Syarif";
const kalimatPeran = "Mahasiswa Informatika yang belajar front-end";
const daftarKeahlian = ["HTML dan CSS", "Logika pemrograman", "Desain UI/UX"];
const jumlahProyek = 3;

function buatPerkenalan({ nama, peran = "mahasiswa" }) {
  return `Halo, saya ${nama}, ${peran}.`;
}

function formatKeahlian(daftar) {
  if (daftar.length === 0) {
    return "-";
  }
  return daftar.join(", ");
}

console.log(buatPerkenalan({ nama: namaLengkap, peran: kalimatPeran }));
console.log(buatPerkenalan({ nama: namaLengkap }));
console.log(`Keahlian: ${formatKeahlian(daftarKeahlian)}`);
console.log(`Keahlian (kosong): ${formatKeahlian([])}`);
console.log(`Proyek: ${jumlahProyek}`);