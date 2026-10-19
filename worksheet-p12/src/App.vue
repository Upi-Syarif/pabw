<script setup>
import { ref, onMounted, watch } from 'vue'
import KepalaProfil from './components/KepalaProfil.vue'
import TombolFilter from './components/TombolFilter.vue'
import DaftarProyek from './components/DaftarProyek.vue'
import FormKontak from './components/FormKontak.vue'
import { state } from './state.js'
import { muat, simpan, aturUlang } from './simpanan.js'
import { ambilNotisia } from './api.js'

const identitas = {
  nama: 'Muhammad Lutfi Syarif',
  peran:
    'Mahasiswa Program Studi Informatika Universitas Islam Indonesia yang memiliki minat pada teknologi dan pemrograman. Memiliki kemampuan berpikir logis, problem solving, serta ketertarikan untuk mempelajari dan mengeksplorasi hal-hal baru. Terbiasa bekerja secara kolaboratif dan memiliki motivasi untuk terus mengembangkan kemampuan serta memberikan kontribusi dalam lingkungan yang dinamis.',
}

const daftarNotisia = ref([])
const statusNotisia = ref('')

async function tampilkanNotisia() {
  statusNotisia.value = 'Memuat notisia...'
  try {
    const data = await ambilNotisia()
    if (data.length === 0) {
      statusNotisia.value = 'Belum ada notisia.'
      return
    }
    daftarNotisia.value = data.slice(0, 10)
    statusNotisia.value = ''
  } catch (galat) {
    statusNotisia.value = 'Gagal memuat notisia: ' + galat.message
  }
}

onMounted(() => {
  const isi = muat() // VERSI diperiksa di dalam muat(); bentuk lama dibuang
  if (isi) state.kategoriAktif = isi.kategoriAktif
  tampilkanNotisia()
})

watch(state, (nilai) => simpan(nilai), { deep: true })

function aturUlangPilihan() {
  aturUlang()
  state.kategoriAktif = 'semua'
  simpan(state)
}
</script>

<template>
  <a class="lewati" href="#utama">Lewati ke konten utama</a>

  <KepalaProfil :profil="identitas" />

  <main id="utama">
    <section id="tentang">
      <h2>Tentang saya</h2>

      <figure class="foto">
        <img src="/media/foto-profil.jpg"
             alt="Foto diri Nama Anda memakai kemeja putih."
             width="480" height="480" loading="lazy">
        <figcaption>Foto profil — Muhammad Lutfi Syarif.</figcaption>
      </figure>

      <p>Saya mahasiswa Program Studi Informatika Universitas Islam Indonesia.
         Saya tertarik pada pengembangan web, khususnya bagian tampilan,
         karena di sana keputusan teknis langsung terlihat hasilnya.</p>

      <input type="checkbox" id="tema" class="pengalih-tema">
      <label for="tema" class="tombol-tema">Tema gelap</label>

      <div class="table-wrap">
        <table>
          <caption>Kegiatan yang saya ikuti semester ini</caption>
          <thead>
            <tr>
              <th scope="col">Kegiatan</th>
              <th scope="col">Peran</th>
              <th scope="col">Waktu</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Asisten Laboratiorium ITSC</th>
              <td>Asisten Laboratorium Mata kuliah Logika Pemrograman</td>
              <td><time datetime="2026-09">September 2026</time></td>
            </tr>
            <tr>
              <th scope="row">Lomba</th>
              <td>Peserta</td>
              <td><time datetime="2026-10">Juli 2026</time></td>
            </tr>
            <tr>
              <th scope="row">Kepanitiaan Mahasiswa</th>
              <td>Koordinator</td>
              <td><time datetime="2026">November 2026</time></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section id="karya">
      <h2>Karya saya</h2>
      <TombolFilter />
      <button type="button" @click="aturUlangPilihan">Atur ulang</button>
      <DaftarProyek />
    </section>

    <section id="notisia-bagian">
      <h2>Notisia</h2>
      <p id="status-notisia" role="status">{{ statusNotisia }}</p>
      <ul id="notisia">
        <li v-for="butir in daftarNotisia" :key="butir.id">{{ butir.title }}</li>
      </ul>
    </section>

    <FormKontak />

    <section id="galeri">
      <h2>Galeri Karya</h2>
      <ul class="galeri">
        <li>
          <figure>
            <img src="/media/karya-1.png" alt="Tangkapan layar karya-1."
                 width="640" height="400" loading="lazy">
            <img src="/media/karya-2.png" alt="Tangkapan layar karya 2."
                 width="640" height="400" loading="lazy">
            <figcaption>Astranauts 2026 by PT Astra Internasional Tbk.</figcaption>
          </figure>
        </li>
        <li>
          <figure>
            <img src="/media/karya-3.png" alt="Tangkapan layar karya-3."
                 width="640" height="400" loading="lazy">
            <img src="/media/karya-4.png" alt="Tangkapan layar karya 4."
                 width="640" height="400" loading="lazy">
            <figcaption>Startup Hackathon by IT Centrum 2025</figcaption>
          </figure>
        </li>
      </ul>
    </section>

    <section id="tanya-jawab">
      <h2>Tanya jawab</h2>
      <details>
        <summary>Apa yang sedang saya pelajari?</summary>
        <p>CSS dan cara menyusun tampilan yang konsisten lewat token.</p>
      </details>
      <details>
        <summary>Mengapa memilih Informatika?</summary>
        <p>Saya tertarik dengan teknologi dan ingin mempelajari cara
           membuat solusi menggunakan perangkat lunak.</p>
      </details>
    </section>

    <section id="lini-masa">
      <h2>Perjalanan saya</h2>
      <ol class="lini">
        <li><time datetime="2025-09">September 2025</time> — mulai kuliah di Informatika UII.</li>
        <li><time datetime="2025-10">Oktober 2025</time> — pertama kali mengikuti lomba UI/UX</li>
        <li><time datetime="2025-12">Desember 2025</time> — pertama kali memenangkan lomba business plan</li>
      </ol>
    </section>
  </main>

  <footer class="kaki">
    <p>Muhammad Lutfi Syarif · 25523021 · <time datetime="2026">2026</time></p>
  </footer>
</template>