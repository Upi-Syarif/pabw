export const KUNCI = 'pabw-p11'
export const VERSI = 1

export function simpan(state) {
  try {
    const isi = { versi: VERSI, kategoriAktif: state.kategoriAktif }
    localStorage.setItem(KUNCI, JSON.stringify(isi))
  } catch (galat) {
    console.warn('simpanan gagal ditulis', galat.message)
  }
}

export function muat() {
  try {
    const mentah = localStorage.getItem(KUNCI)
    if (mentah === null) return null
    const isi = JSON.parse(mentah)
    if (!isi || isi.versi !== VERSI || typeof isi.kategoriAktif !== 'string') {
      localStorage.removeItem(KUNCI)
      return null
    }
    return isi
  } catch (galat) {
    localStorage.removeItem(KUNCI)
    return null
  }
}

export function aturUlang() {
  try {
    localStorage.removeItem(KUNCI)
  } catch (galat) {
    console.warn('simpanan gagal dihapus', galat.message)
  }
}