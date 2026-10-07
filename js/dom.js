import { daftarProyek } from "./app.js";

const wadah = document.querySelector("#daftar");
const barisFilter = document.querySelector("#filter");
const tombolFilter = document.querySelectorAll("#filter button");
const kosong = document.querySelector("#pesan-kosong");

const formKontak = document.querySelector("#kontak form");
const kolomNama = document.querySelector("#nama");
const kolomEmail = document.querySelector("#email");
const kolomNim = document.querySelector("#nim");
const kolomPesan = document.querySelector("#pesan");

function buatKartu(proyek) {
  const li = document.createElement("li");
  li.className = "kartu";
  li.textContent = proyek.judul;
  return li;
}

function render(daftar) {
  wadah.textContent = "";
  daftar.forEach((proyek) => wadah.append(buatKartu(proyek)));
}

render(daftarProyek);

function tandaiTombolAktif(tombolAktif) {
  tombolFilter.forEach((tombol) => {
    tombol.classList.toggle("aktif", tombol === tombolAktif);
  });
}

barisFilter.addEventListener("click", (event) => {
  const tombol = event.target.closest("button");
  if (!tombol) return;
  const kategori = tombol.dataset.kategori;
  const terpilih = daftarProyek.filter(
    (proyek) => kategori === "semua" || proyek.jenis === kategori
  );
  tandaiTombolAktif(tombol);
  render(terpilih);
});