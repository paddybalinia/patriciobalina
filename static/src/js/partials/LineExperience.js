(function (window, document) {
  // Función que se ejecuta cuando se realiza un scroll en la página
  function verificarPosicion() {
    // Obtener la mitad de la altura del viewport
    const mitadViewport = window.innerHeight / 2;

    const spanYear = document.querySelectorAll(".work-item__bg");

    for (let e = 0; e < spanYear.length; e++) {
      verificarElemento(spanYear[e], mitadViewport);
    }
  }

  // Función para verificar posición y agregar clase
  function verificarElemento(elemento, mitadViewport) {
    const rect = elemento.getBoundingClientRect();
    const elementoEnLaMitad = rect.top < mitadViewport;

    if (elementoEnLaMitad) {
      elemento.classList.add("mitad-viewport");
    } else {
      elemento.classList.remove("mitad-viewport");
    }
  }

  window.addEventListener("scroll", function () {
    verificarPosicion();

    // Obtener referencias a los elementos necesarios
    var elemento = document.getElementById("linea");
    var lineastop = document.getElementById("stop-linea");

    // Calcular la posición del elemento de parada con respecto al viewport
    var scrollStop = lineastop.getBoundingClientRect().top + window.scrollY;

    // Obtener la altura del viewport
    var viewportHeight = window.innerHeight;

    // Calcular la posición del elemento con respecto al viewport
    var elementoRect = elemento.getBoundingClientRect();
    var elementoTop = elementoRect.top;

    // Obtener la posición actual de scroll
    var scrollPosY = window.scrollY || window.pageYOffset;

    // Calcular la altura de incremento basada en la posición del elemento y del scroll
    var alturaIncremento = (viewportHeight / 2 - elementoTop + scrollPosY) * 2;

    // Asegurarse de que la alturaIncremento no sea menor que 0
    var nuevaAltura = Math.max(alturaIncremento, 0);

    // Ajustar la altura según necesidades específicas
    nuevaAltura = (nuevaAltura - 2868) * 0.25;

    var anchoViewport = window.innerWidth,
      gap = anchoViewport > 760 ? 90 : 250;

    // Verificar si el elemento está en la mitad superior del viewport y aún no ha alcanzado el punto de parada
    if (
      elementoTop < viewportHeight / 2 &&
      scrollPosY < scrollStop + 45 - viewportHeight / 2
    ) {
      // Aplicar la nueva altura al estilo del elemento

      if (anchoViewport < 768) {
        nuevaAltura = nuevaAltura - viewportHeight / 2;
      }
      elemento.style.height = nuevaAltura - gap + "px";
    }
    if (scrollPosY < elementoTop) {
      elemento.style.height = 0 + "px";
    }
  });
})(window, document);
