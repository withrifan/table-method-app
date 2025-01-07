// Menampilkan Pop-up saat Halaman Dimuat
window.onload = function () {
  const popup = document.getElementById("popupInformasi");
  const closePopupButton = document.getElementById("closePopup");

  // Tampilkan pop-up
  popup.classList.add("show");

  // Tutup pop-up saat tombol "Tutup" diklik
  closePopupButton.addEventListener("click", function () {
    popup.classList.remove("show");
  });
};

// Burger Menu
document.addEventListener("DOMContentLoaded", function () {
  const burgerMenu = document.querySelector(".burger-menu");
  const nav = document.querySelector("nav");

  // Fungsi untuk toggle burger menu
  burgerMenu.addEventListener("click", function (event) {
    event.stopPropagation(); // Mencegah event bubbling
    nav.classList.toggle("show");
  });

  // Menutup menu ketika mengklik di luar area menu
  document.addEventListener("click", function (event) {
    if (nav.classList.contains("show")) {
      nav.classList.remove("show");
    }
  });

  // Mencegah menu tertutup saat klik di dalam navigasi
  nav.addEventListener("click", function (event) {
    event.stopPropagation(); // Mencegah event bubbling
  });
});

function prosesMetodeTabel() {
  try {
    // Ambil nilai input dari pengguna
    const fungsiInput = document.getElementById("fungsi").value.trim();
    let batasAtas = parseFloat(document.getElementById("batasAtas").value);
    let batasBawah = parseFloat(document.getElementById("batasBawah").value);
    const jumlahPembagian = parseInt(document.getElementById("jumlahPembagian").value);
    const maksimalIterasi = parseInt(document.getElementById("maksimalIterasi").value);
    const toleransiError = parseFloat(document.getElementById("toleransiError").value);

    // Validasi input
    if (
      !fungsiInput ||
      isNaN(batasAtas) ||
      isNaN(batasBawah) ||
      isNaN(jumlahPembagian) ||
      isNaN(maksimalIterasi) ||
      isNaN(toleransiError) ||
      jumlahPembagian <= 0 ||
      maksimalIterasi <= 0 ||
      toleransiError <= 0
    ) {
      alert("Mohon isi semua input dengan benar.");
      return;
    }

    if (batasAtas <= batasBawah) {
      alert("Batas atas harus lebih besar dari batas bawah.");
      return;
    }

    // Parsing fungsi menggunakan math.js
    const fungsi = math.parse(fungsiInput).compile();

    // Variabel untuk mencatat hasil iterasi
    let iterasiLog = "";
    let solusi = "Belum ada solusi ditemukan.";

    let nilaiTerdekat = { x: null, fx: Infinity }; // Menyimpan nilai terdekat dengan nol

    for (let iterasi = 1; iterasi <= maksimalIterasi; iterasi++) {
      let step = (batasAtas - batasBawah) / jumlahPembagian; // Hitung langkah iterasi
      let batasBawahBaru = null, batasAtasBaru = null; // Untuk range baru

      iterasiLog += `Iterasi ke-${iterasi}:\n`;

      let tandaDitemukan = false; // Untuk mengecek tanda positif dan negatif

      for (let j = 0; j <= jumlahPembagian; j++) {
        const x = batasBawah + j * step;
        const fx = fungsi.evaluate({ x });

        // Log nilai bagian
        iterasiLog += `  Bagian ${j + 1}: Nilai x = ${x.toFixed(5)}, f(x) = ${fx.toFixed(5)}\n`;

        // Simpan nilai terdekat dengan nol
        if (Math.abs(fx) < Math.abs(nilaiTerdekat.fx)) {
          nilaiTerdekat = { x, fx };
        }

        // Periksa tanda positif dan negatif berdekatan
        if (j > 0) {
          const fxPrev = fungsi.evaluate({ x: batasBawah + (j - 1) * step });
          if (!tandaDitemukan && ((fxPrev > 0 && fx < 0) || (fxPrev < 0 && fx > 0))) {
            batasBawahBaru = batasBawah + (j - 1) * step;
            batasAtasBaru = x;
            tandaDitemukan = true; // Tandai bahwa tanda ditemukan
          }
        }

        // Jika nilai f(x) mendekati nol sesuai toleransi error, hentikan iterasi
        if (Math.abs(fx) <= toleransiError) {
          solusi = `Solusi ditemukan! x = ${x.toFixed(5)}, f(x) = ${fx.toFixed(5)} (dalam toleransi error ${toleransiError}).`;
          iterasiLog += `Hentikan iterasi: Toleransi error tercapai pada iterasi ke-${iterasi}.\n\n`;
          document.getElementById("prosesIterasi").value = iterasiLog;
          document.getElementById("hasil").value = solusi;
          return;
        }
      }

      // Pastikan semua bagian iterasi pertama ditampilkan
      if (iterasi === 1) {
        iterasiLog += `Semua bagian iterasi pertama telah ditampilkan.\n`;
      }

      // Jika range baru ditemukan, perbarui batas atas dan bawah
      if (batasBawahBaru !== null && batasAtasBaru !== null) {
        batasBawah = batasBawahBaru;
        batasAtas = batasAtasBaru;
        iterasiLog += `Range baru: [${batasBawah.toFixed(5)}, ${batasAtas.toFixed(5)}]\n\n`;
      } else {
        iterasiLog += "Tidak ada range baru ditemukan. Iterasi dihentikan.\n";
        break;
      }
    }

    // Jika iterasi maksimal tercapai tanpa menemukan solusi
    if (nilaiTerdekat.fx !== Infinity) {
      solusi = `Maksimal iterasi tercapai (${maksimalIterasi}). Nilai f(x) terdekat dengan nol berada di x = ${nilaiTerdekat.x.toFixed(5)}, dengan f(x) = ${nilaiTerdekat.fx.toFixed(5)}.`;
    }

    // Tampilkan hasil dan log iterasi
    document.getElementById("prosesIterasi").value = iterasiLog;
    document.getElementById("hasil").value = solusi;
  } catch (error) {
    alert("Terjadi kesalahan dalam memproses fungsi. Mohon pastikan input benar.");
    console.error(error);
  }
}


// Fungsi untuk menghapus isi semua form
function resetForm() {
  document.getElementById("numericalForm").reset();
  document.getElementById("prosesIterasi").value = "";
  document.getElementById("hasil").value = "";
}
