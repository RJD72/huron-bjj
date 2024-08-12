document.addEventListener("DOMContentLoaded", function () {
  let modalId = document.getElementById("image-gallery");
  let currentImage;
  let counter = 0;

  loadGallery(true, "a.thumbnail");

  function disableButtons(counterMax, counterCurrent) {
    const prevButton = document.getElementById("show-previous-image");
    const nextButton = document.getElementById("show-next-image");

    prevButton.style.display = "block";
    nextButton.style.display = "block";

    if (counterMax === counterCurrent) {
      nextButton.style.display = "none";
    } else if (counterCurrent === 1) {
      prevButton.style.display = "none";
    }
  }

  function loadGallery(setIDs, setClickAttr) {
    const thumbnails = document.querySelectorAll(setClickAttr);

    thumbnails.forEach((el, index) => {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        currentImage = index + 1; // Set currentImage to the 1-based index
        updateGallery(el);
      });
    });

    if (setIDs) {
      thumbnails.forEach((el, index) => {
        el.setAttribute("data-image-id", index + 1);
      });
    }

    document
      .getElementById("show-next-image")
      .addEventListener("click", function () {
        if (currentImage < thumbnails.length) {
          currentImage++;
          updateGallery(thumbnails[currentImage - 1]);
        }
      });

    document
      .getElementById("show-previous-image")
      .addEventListener("click", function () {
        if (currentImage > 1) {
          currentImage--;
          updateGallery(thumbnails[currentImage - 1]);
        }
      });
  }

  function updateGallery(selector) {
    const title = selector.getAttribute("data-title");
    const image = selector.getAttribute("data-image");

    document.getElementById("image-gallery-title").textContent = title || "";
    document.getElementById("image-gallery-image").setAttribute("src", image);

    const counterMax = document.querySelectorAll("[data-image-id]").length;
    disableButtons(counterMax, currentImage);
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft" && currentImage > 1) {
      document.getElementById("show-previous-image").click();
    } else if (
      e.key === "ArrowRight" &&
      currentImage < document.querySelectorAll("[data-image-id]").length
    ) {
      document.getElementById("show-next-image").click();
    }
  });
});
