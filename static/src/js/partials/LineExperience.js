(function (window, document) {
  window.addEventListener("scroll", function () {
    var anchoViewport = window.innerWidth;
    if (anchoViewport < 768) {
      return;
    }
    var elemento = document.getElementById("linea");
    var linea = document.getElementById("linea");
    var lineastop = document.getElementById("stop-linea");
    var scrollStop = lineastop.getBoundingClientRect().top + window.scrollY;

    console.log("es =" + scrollStop);
    var viewportHeight = window.innerHeight;

    var elementoRect = elemento.getBoundingClientRect();

    var elementoTop = elementoRect.top;

    var scrollPosY = window.scrollY || window.pageYOffset;

    var alturaIncremento = (viewportHeight / 2 - elementoTop + scrollPosY) * 2;

    // Asegurarse de que la alturaIncremento no sea menor que 0
    var nuevaAltura = Math.max(alturaIncremento, 0);
    nuevaAltura = (nuevaAltura - 2868) * 0.25;
    if (
      elementoTop < viewportHeight / 2 &&
      scrollPosY < scrollStop - viewportHeight / 2
    ) {
      linea.style.height = nuevaAltura + "px";
    }
  });
})(window, document);
