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
const tombolKirim = formKontak.querySelector('button[type="submit"]');

function buatKartu(proyek) {
  const li = document.createElement("li");
  li.className = "kartu";
  li.textContent = proyek.judul;
  return li;
}

function render(daftar) {
  wadah.textContent = "";
  if (daftar.length === 0) {
    kosong.hidden = false;
    return;
  }
  kosong.hidden = true;
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

const aturanForm = [
  {
    kolom: kolomNama,
    galat: document.querySelector("#nama-galat"),
    periksa: (nilai) =>
      nilai.trim() === "" ? "Isi nama lengkap Anda." : "",
  },
  {
    kolom: kolomEmail,
    galat: document.querySelector("#email-galat"),
    periksa: (nilai) => {
      if (nilai.trim() === "") return "Isi alamat email Anda.";
      if (!/^\S+@\S+\.\S+$/.test(nilai.trim())) {
        return "Tulis email lengkap, contoh: nama@contoh.com.";
      }
      return "";
    },
  },
  {
    kolom: kolomNim,
    galat: document.querySelector("#nim-galat"),
    periksa: (nilai) => {
      if (nilai.trim() === "") return "Isi NIM Anda.";
      if (!/^\d{8}$/.test(nilai.trim())) {
        return "NIM berisi 8 digit angka tanpa spasi, contoh: 25523021.";
      }
      return "";
    },
  },
  {
    kolom: kolomPesan,
    galat: document.querySelector("#pesan-galat"),
    periksa: (nilai) =>
      nilai.trim() === "" ? "Tulis pesan yang ingin Anda sampaikan." : "",
  },
];

function periksaKolom(aturan) {
  const pesan = aturan.periksa(aturan.kolom.value);
  aturan.galat.textContent = pesan;
  if (pesan) {
    aturan.kolom.setAttribute("aria-invalid", "true");
  } else {
    aturan.kolom.removeAttribute("aria-invalid");
  }
  return pesan === "";
}
formKontak.addEventListener("input", (event) => {
  const aturan = aturanForm.find((a) => a.kolom === event.target);
  if (!aturan) return;
  periksaKolom(aturan);
  const sah = aturanForm.every((a) => a.periksa(a.kolom.value) === "");
  tombolKirim.disabled = !sah;
});

formKontak.addEventListener("submit", (event) => {
  event.preventDefault();
  const hasil = aturanForm.map(periksaKolom);
  const sah = hasil.every(Boolean);
  tombolKirim.disabled = !sah;
  if (!sah) {
    aturanForm[hasil.indexOf(false)].kolom.focus();
  }
});