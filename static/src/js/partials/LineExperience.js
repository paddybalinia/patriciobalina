(function (window, document) {
  // Función que se ejecuta cuando se realiza un scroll en la página
  window.addEventListener("scroll", function () {
    // Obtener el ancho del viewport
    var anchoViewport = window.innerWidth;

    // Si el ancho del viewport es menor a 768 pixels, no realizar ninguna acción
    if (anchoViewport < 768) {
      return;
    }

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

    // Verificar si el elemento está en la mitad superior del viewport y aún no ha alcanzado el punto de parada
    if (
      elementoTop < viewportHeight / 2 &&
      scrollPosY < scrollStop - viewportHeight / 2
    ) {
      // Aplicar la nueva altura al estilo del elemento
      linea.style.height = nuevaAltura + "px";
    }
  });
})(window, document);
