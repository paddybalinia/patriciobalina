(function () {
  "use strict";
  const velocidadEscritura = 50; // Velocidad en milisegundos por caracter

  const textoElemento = document.getElementById("texto");
  const texto = "Texto que se está escribiendo por sí solo.";

  // Constructor
  function Constructor() {
    // const textoElemento = document.getElementById("texto");
    // const LinkAnchor = document.querySelectorAll("[data-anchor]");
    // for (let e = 0; e < LinkAnchor.length; e++) {
    //   LinkAnchor[e].addEventListener("click", ViewportObserver, false);
    // }
  }

  function escribirTexto() {
    let i = 0;
    function escribirCaracter() {
      if (i < texto.length) {
        textoElemento.textContent += texto.charAt(i);
        i++;
        setTimeout(escribirCaracter, velocidadEscritura);
      }
    }
    escribirCaracter();
  }

  // Observador de intersección
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        escribirTexto();
        observer.disconnect(); // Detener la observación después de la animación
      }
    });
  });

  // Observar el elemento
  observer.observe(textoElemento);
  // Export
  window.ScrollIntoView = Constructor();
})();
