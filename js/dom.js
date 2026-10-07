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