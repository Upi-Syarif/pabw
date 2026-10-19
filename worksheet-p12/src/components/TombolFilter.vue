<script setup>
import { state, pilihKategori } from '../state.js'

const daftarTombol = [
  { kategori: 'semua', label: 'Semua' },
  { kategori: 'bisnis', label: 'Bisnis' },
  { kategori: 'aplikasi', label: 'Aplikasi' },
]
</script>

<template>
  <div id="filter">
    <button
      v-for="tombol in daftarTombol"
      :key="tombol.kategori"
      type="button"
      :class="{ aktif: state.kategoriAktif === tombol.kategori }"
      @click="pilihKategori(tombol.kategori)"
    >
      {{ tombol.label }}
    </button>
  </div>
</template>