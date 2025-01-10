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
