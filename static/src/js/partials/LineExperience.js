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

  // Función para obtener la posición en Y del elemento con respecto al cuerpo
  function getElementY(elemento) {
    var posicionY = 0;

    while (elemento) {
      posicionY += elemento.offsetTop;
      elemento = elemento.offsetParent;
    }

    return posicionY;
  }

  window.addEventListener("scroll", function () {
    verificarPosicion();

    // Obtener referencias a los elementos necesarios
    var lineastop = document.getElementById("stop-linea");
    var elemento = document.getElementById("linea");

    // Obtener la posición en Y del elemento con respecto al cuerpo de la página
    var posicionY = getElementY(elemento);

    // Calcular la posición del elemento de parada con respecto al viewport
    var scrollStop = lineastop.getBoundingClientRect().top + window.scrollY;

    // Obtener la altura del viewport
    var viewportHeight = window.innerHeight;

    // Calcular la posición del elemento con respecto al viewport
    var elementoRect = elemento.getBoundingClientRect();
    var elementoTop = elementoRect.top;

    // Obtener la posición actual de scroll
    var scrollPosY = window.scrollY || window.pageYOffset;

    var lineHeight = Math.max(scrollPosY - (posicionY - viewportHeight / 2), 0);

    // Verificar si el elemento está en la mitad superior del viewport y aún no ha alcanzado el punto de parada
    if (
      elementoTop < viewportHeight / 2 &&
      scrollPosY < scrollStop - viewportHeight / 2
    ) {
      // Aplicar la nueva altura al estilo del elemento
      elemento.style.height = lineHeight + "px";
    }
    if (lineHeight <= 0) {
      elemento.style.height = 0 + "px";
    }
  });
})(window, document);
