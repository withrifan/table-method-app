function prosesMetodeTabel() {
    try {
        // Ambil nilai input dari pengguna
        const fungsiInput = document.getElementById("fungsi").value.trim();
        const batasAtas = parseFloat(document.getElementById("batasAtas").value);
        const batasBawah = parseFloat(document.getElementById("batasBawah").value);
        const jumlahPembagian = parseInt(document.getElementById("jumlahPembagian").value);

        // Validasi input
        if (!fungsiInput || isNaN(batasAtas) || isNaN(batasBawah) || isNaN(jumlahPembagian) || jumlahPembagian <= 0) {
            alert("Mohon isi semua input dengan benar.");
            return;
        }

        // Parsing fungsi menggunakan math.js
        const fungsi = math.parse(fungsiInput.replace("=", "-")).compile(); // Ubah '=' menjadi '-'

        let iterasiLog = "";
        let solusi = "Belum ada solusi ditemukan.";

        // Interval awal
        const step = (batasAtas - batasBawah) / jumlahPembagian;
        let nilaiF = [];
        let nilaiTerdekat = { x: null, fx: Infinity };

        for (let i = 0; i <= jumlahPembagian; i++) {
            const x = batasBawah + i * step;
            const fx = fungsi.evaluate({ x: x });

            // Simpan nilai x dan f(x)
            nilaiF.push({ x, fx });
            iterasiLog += `Iterasi ke-${i + 1}: x = ${x.toFixed(5)}, f(x) = ${fx.toFixed(5)}\n`;

            // Cek nilai f(x) yang terdekat dengan nol
            if (Math.abs(fx) < Math.abs(nilaiTerdekat.fx)) {
                nilaiTerdekat = { x, fx };
            }
        }

        // Tentukan hasil
        solusi = `Nilai f(x) terdekat dengan nol berada di x = ${nilaiTerdekat.x.toFixed(5)}, dengan f(x) = ${nilaiTerdekat.fx.toFixed(5)}.`;

        // Tampilkan hasil dan log iterasi
        document.getElementById("prosesIterasi").value = iterasiLog;
        document.getElementById("hasil").value = solusi;
    } catch (error) {
        alert("Terjadi kesalahan dalam memproses fungsi. Mohon pastikan input benar.");
        console.error(error);
    }
}

function resetForm() {
    document.getElementById("numericalForm").reset();
    document.getElementById("prosesIterasi").value = "";
    document.getElementById("hasil").value = "";
}
