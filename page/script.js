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