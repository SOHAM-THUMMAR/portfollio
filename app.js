const hamburger = document.querySelector(".hamburger-icon");
const menuLinks = document.querySelector(".menu-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  menuLinks.classList.toggle("open");
});