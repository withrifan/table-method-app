// Menampilkan Pop-up saat Halaman Dimuat
window.onload = function () { 
  // Fungsi akan dijalankan setelah semua elemen halaman selesai dimuat
  const popup = document.getElementById("popupInformasi"); // Ambil elemen pop-up berdasarkan ID 'popupInformasi'
  const closePopupButton = document.getElementById("closePopup"); // Ambil tombol "Tutup" berdasarkan ID 'closePopup'

  // Tampilkan pop-up
  popup.classList.add("show"); // Tambahkan class 'show' untuk membuat pop-up terlihat

  // Tutup pop-up saat tombol "Tutup" diklik
  closePopupButton.addEventListener("click", function () { 
      // Tambahkan event listener untuk mendeteksi klik pada tombol "Tutup"
      popup.classList.remove("show"); // Hapus class 'show' agar pop-up tersembunyi
  });
};

// Burger Menu
document.addEventListener("DOMContentLoaded", function () {
  const burgerMenu = document.querySelector(".burger-menu"); // Pilih elemen dengan class 'burger-menu'
  const nav = document.querySelector("nav"); // Pilih elemen <nav> untuk navigasi

  // Fungsi untuk toggle burger menu
  burgerMenu.addEventListener("click", function (event) {
      event.stopPropagation(); // Mencegah event bubbling agar klik tidak memengaruhi elemen luar
      nav.classList.toggle("show"); // Toggle class 'show' untuk menampilkan atau menyembunyikan menu
  });

  // Menutup menu ketika mengklik di luar area menu
  document.addEventListener("click", function (event) {
      if (nav.classList.contains("show")) { // Periksa apakah menu saat ini ditampilkan
          nav.classList.remove("show"); // Hapus class 'show' untuk menyembunyikan menu
      }
  });

  // Mencegah menu tertutup saat klik di dalam navigasi
  nav.addEventListener("click", function (event) {
      event.stopPropagation(); // Mencegah event bubbling agar klik dalam menu tidak menutup menu
  });
});

function prosesMetodeTabel() {
  try {
    // Ambil nilai input dari pengguna
    const fungsiInput = document.getElementById("fungsi").value.trim(); // Ambil string fungsi yang diinput pengguna
    let batasAtas = parseFloat(document.getElementById("batasAtas").value); // Konversi input batas atas menjadi float
    let batasBawah = parseFloat(document.getElementById("batasBawah").value); // Konversi input batas bawah menjadi float
    const jumlahPembagian = parseInt(document.getElementById("jumlahPembagian").value); // Konversi input jumlah pembagian menjadi integer
    const maksimalIterasi = parseInt(document.getElementById("maksimalIterasi").value); // Konversi input maksimal iterasi menjadi integer
    const toleransiError = parseFloat(document.getElementById("toleransiError").value); // Konversi input toleransi error menjadi float

    // Validasi input
    if (
      !fungsiInput || // Cek apakah fungsi kosong
      isNaN(batasAtas) || // Cek apakah batas atas adalah angka
      isNaN(batasBawah) || // Cek apakah batas bawah adalah angka
      isNaN(jumlahPembagian) || // Cek apakah jumlah pembagian adalah angka
      isNaN(maksimalIterasi) || // Cek apakah maksimal iterasi adalah angka
      isNaN(toleransiError) || // Cek apakah toleransi error adalah angka
      jumlahPembagian <= 0 || // Pastikan jumlah pembagian lebih dari 0
      maksimalIterasi <= 0 || // Pastikan maksimal iterasi lebih dari 0
      toleransiError <= 0 // Pastikan toleransi error lebih dari 0
    ) {
      alert("Mohon isi semua input dengan benar."); // Berikan peringatan jika ada kesalahan input
      return; // Hentikan fungsi jika validasi gagal
    }

    if (batasAtas <= batasBawah) {
      alert("Batas atas harus lebih besar dari batas bawah."); // Peringatan jika batas atas ≤ batas bawah
      return; // Hentikan fungsi jika validasi gagal
    }

    // Parsing fungsi menggunakan math.js
    const fungsi = math.parse(fungsiInput).compile(); // Parse string fungsi dan compile menjadi fungsi evaluasi

    // Variabel untuk mencatat hasil iterasi
    let iterasiLog = ""; // Menyimpan log proses iterasi
    let solusi = "Belum ada solusi ditemukan."; // Pesan default jika solusi tidak ditemukan

    let nilaiTerdekat = { x: null, fx: Infinity }; // Menyimpan nilai terdekat dengan nol (x dan f(x))

    for (let iterasi = 1; iterasi <= maksimalIterasi; iterasi++) {
      let step = (batasAtas - batasBawah) / jumlahPembagian; // Hitung langkah untuk membagi interval
      let batasBawahBaru = null, batasAtasBaru = null; // Untuk menyimpan batas baru jika tanda ditemukan

      iterasiLog += `Iterasi ke-${iterasi}:\n`; // Tambahkan log untuk iterasi ini

      let tandaDitemukan = false; // Menandai apakah tanda positif dan negatif ditemukan

      for (let j = 0; j <= jumlahPembagian; j++) {
        const x = batasBawah + j * step; // Hitung nilai x pada bagian ke-j
        const fx = fungsi.evaluate({ x }); // Evaluasi nilai f(x) menggunakan fungsi math.js

        // Tambahkan log untuk bagian ini
        iterasiLog += `  Bagian ${j + 1}: Nilai x = ${x.toFixed(5)}, f(x) = ${fx.toFixed(5)}\n`;

        // Simpan nilai x dan f(x) terdekat dengan nol
        if (Math.abs(fx) < Math.abs(nilaiTerdekat.fx)) {
          nilaiTerdekat = { x, fx }; // Perbarui nilai terdekat dengan nol
        }

        // Periksa tanda positif dan negatif yang berdekatan
        if (j > 0) {
          const fxPrev = fungsi.evaluate({ x: batasBawah + (j - 1) * step }); // Evaluasi f(x) pada bagian sebelumnya
          if (!tandaDitemukan && ((fxPrev > 0 && fx < 0) || (fxPrev < 0 && fx > 0))) {
            batasBawahBaru = batasBawah + (j - 1) * step; // Set batas bawah baru
            batasAtasBaru = x; // Set batas atas baru
            tandaDitemukan = true; // Tandai bahwa tanda ditemukan
          }
        }

        // Jika nilai f(x) mendekati nol sesuai toleransi error, hentikan iterasi
        if (Math.abs(fx) <= toleransiError) {
          solusi = `Solusi ditemukan! x = ${x.toFixed(5)}, f(x) = ${fx.toFixed(5)} (dalam toleransi error ${toleransiError}).`;
          iterasiLog += `Hentikan iterasi: Toleransi error tercapai pada iterasi ke-${iterasi}.\n\n`;
          document.getElementById("prosesIterasi").value = iterasiLog; // Tampilkan log iterasi
          document.getElementById("hasil").value = solusi; // Tampilkan solusi
          return; // Hentikan proses karena solusi ditemukan
        }
      }

      // Pastikan semua bagian iterasi pertama ditampilkan
      if (iterasi === 1) {
        iterasiLog += `Semua bagian iterasi pertama telah ditampilkan.\n`;
      }

      // Jika range baru ditemukan, perbarui batas atas dan bawah
      if (batasBawahBaru !== null && batasAtasBaru !== null) {
        batasBawah = batasBawahBaru; // Set batas bawah baru
        batasAtas = batasAtasBaru; // Set batas atas baru
        iterasiLog += `Range baru: [${batasBawah.toFixed(5)}, ${batasAtas.toFixed(5)}]\n\n`;
      } else {
        iterasiLog += "Tidak ada range baru ditemukan. Iterasi dihentikan.\n"; // Log jika tidak ada range baru
        break; // Hentikan iterasi
      }
    }

    // Jika iterasi maksimal tercapai tanpa menemukan solusi
    if (nilaiTerdekat.fx !== Infinity) {
      solusi = `Maksimal iterasi tercapai (${maksimalIterasi}). Nilai f(x) terdekat dengan nol berada di x = ${nilaiTerdekat.x.toFixed(5)}, dengan f(x) = ${nilaiTerdekat.fx.toFixed(5)}.`;
    }

    // Tampilkan hasil dan log iterasi
    document.getElementById("prosesIterasi").value = iterasiLog; // Tampilkan log proses iterasi
    document.getElementById("hasil").value = solusi; // Tampilkan hasil akhir
  } catch (error) {
    // Tampilkan pesan error jika terjadi kesalahan
    alert("Terjadi kesalahan dalam memproses fungsi. Mohon pastikan input benar.");
    console.error(error); // Log error untuk debugging
  }
}

// Fungsi untuk menghapus isi semua form
function resetForm() {
  document.getElementById("numericalForm").reset();
  document.getElementById("prosesIterasi").value = "";
  document.getElementById("hasil").value = "";
}
