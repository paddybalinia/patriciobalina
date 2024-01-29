(function () {
  "use strict";

  const parallaxElements = document.querySelectorAll(".work__li");

  function updateParallax() {
    parallaxElements.forEach(function (element) {
      const rect = element.getBoundingClientRect();
      const speed = parseFloat(element.getAttribute("data-speed"));

      // Verificar si el elemento está en el viewport
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        const yPos = -(rect.top * speed);
        element.style.transform = "translate3d(0, " + yPos + "px, 0)";
      } else {
        element.style.transform = "translate3d(0, 0, 0)";
      }
    });
  }

  // Actualizar el efecto parallax al desplazarse y al cargar la página
  window.addEventListener("scroll", updateParallax);
  window.addEventListener("resize", updateParallax);

  updateParallax();
})();
