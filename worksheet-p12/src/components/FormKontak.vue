<script setup>
import { ref, reactive } from 'vue'

const nama = ref('')
const email = ref('')
const nim = ref('')
const pesan = ref('')
const nilai = { nama, email, nim, pesan }

const galat = reactive({ nama: '', email: '', nim: '', pesan: '' })
const tombolMati = ref(false)

const aturan = {
  nama: (n) => (n.trim() === '' ? 'Isi nama lengkap Anda.' : ''),
  email: (n) => {
    if (n.trim() === '') return 'Isi alamat email Anda.'
    if (!/^\S+@\S+\.\S+$/.test(n.trim())) {
      return 'Tulis email lengkap, contoh: nama@contoh.com.'
    }
    return ''
  },
  nim: (n) => {
    if (n.trim() === '') return 'Isi NIM Anda.'
    if (!/^\d{8}$/.test(n.trim())) {
      return 'NIM berisi 8 digit angka tanpa spasi, contoh: 25523021.'
    }
    return ''
  },
  pesan: (n) =>
    n.trim() === '' ? 'Tulis pesan yang ingin Anda sampaikan.' : '',
}
const urutan = ['nama', 'email', 'nim', 'pesan']

function periksa(kunci) {
  galat[kunci] = aturan[kunci](nilai[kunci].value)
  return galat[kunci] === ''
}

function semuaSah() {
  return urutan.every((k) => aturan[k](nilai[k].value) === '')
}

function saatInput(kunci) {
  periksa(kunci)
  tombolMati.value = !semuaSah()
}

function kirim() {
  const hasil = urutan.map(periksa)
  const sah = hasil.every(Boolean)
  tombolMati.value = !sah
  if (!sah) {
    document.getElementById(urutan[hasil.indexOf(false)]).focus()
    return
  }
  // formulir sah: kosongkan isi tanpa memuat ulang halaman
  urutan.forEach((k) => {
    nilai[k].value = ''
    galat[k] = ''
  })
  tombolMati.value = false
}
</script>

<template>
  <section id="kontak">
    <h2>Hubungi saya</h2>
    <p>Isi formulir berikut. Semua kolom bertanda wajib harus diisi.</p>

    <form action="#" method="post" novalidate @submit.prevent="kirim">
      <fieldset>
        <legend>Data pengirim</legend>

        <p>
          <label for="nama">Nama lengkap</label>
          <input id="nama" name="nama" type="text" autocomplete="name"
                 aria-describedby="nama-galat" required
                 v-model="nama" :aria-invalid="galat.nama ? 'true' : null"
                 @input="saatInput('nama')">
          <span class="pesan-galat" id="nama-galat">{{ galat.nama }}</span>
        </p>

        <p>
          <label for="email">Email</label>
          <input id="email" name="email" type="email" autocomplete="email"
                 aria-describedby="email-galat" required
                 v-model="email" :aria-invalid="galat.email ? 'true' : null"
                 @input="saatInput('email')">
          <span class="pesan-galat" id="email-galat">{{ galat.email }}</span>
        </p>

        <p>
          <label for="nim">NIM</label>
          <input id="nim" name="nim" type="text" inputmode="numeric"
                 pattern="[0-9]{8}" aria-describedby="nim-bantuan nim-galat" required
                 v-model="nim" :aria-invalid="galat.nim ? 'true' : null"
                 @input="saatInput('nim')">
          <span id="nim-bantuan">Delapan digit angka, contoh 25523021.</span>
          <span class="pesan-galat" id="nim-galat">{{ galat.nim }}</span>
        </p>

        <p>
          <label for="pesan">Pesan</label>
          <textarea id="pesan" name="pesan" rows="4"
                    aria-describedby="pesan-galat" required
                    v-model="pesan" :aria-invalid="galat.pesan ? 'true' : null"
                    @input="saatInput('pesan')"></textarea>
          <span class="pesan-galat" id="pesan-galat">{{ galat.pesan }}</span>
        </p>

        <button type="submit" :disabled="tombolMati">Kirim</button>
      </fieldset>
    </form>
  </section>
</template>