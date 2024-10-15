document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    if (!img.hasAttribute("loading")) {
      img.setAttribute("loading", "lazy");
    }
  });
});
