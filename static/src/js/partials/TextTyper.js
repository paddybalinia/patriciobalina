(function () {
  "use strict";
  const velocidadEscritura = 50; // Velocidad en milisegundos por caracter

  const textoElemento = document.getElementById("texto");
  const texto = "Texto que se está escribiendo por sí solo.";

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
})();
