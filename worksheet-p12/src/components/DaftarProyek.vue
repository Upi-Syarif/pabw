<script setup>
import { computed } from 'vue'
import { state } from '../state.js'

const terpilih = computed(() =>
  state.daftarProyek.filter(
    (proyek) =>
      state.kategoriAktif === 'semua' || proyek.jenis === state.kategoriAktif
  )
)
</script>

<template>
  <ul id="daftar">
    <li v-for="proyek in terpilih" :key="proyek.id" class="kartu">
      {{ proyek.judul }}
    </li>
  </ul>
  <p id="pesan-kosong" v-if="terpilih.length === 0">
    Tidak ada proyek pada kategori itu.
  </p>
</template>