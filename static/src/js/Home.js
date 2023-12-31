(function () {
  "use strict";

  var Header = document.querySelector(".header"),
    lastScrollY =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop,
    startSticky =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight,
    ticking = false;
  // Constructor
  function Constructor() {
    const LinkToggle = document.querySelectorAll("[data-togglenav]");

    for (let e = 0; e < LinkToggle.length; e++) {
      LinkToggle[e].addEventListener("click", NavToggle, false);
    }
    window.addEventListener("scroll", onScroll);
  }

  function NavToggle() {
    const Nav = document.querySelector(".nav");
    const NavOverlay = document.querySelector(".nav__overlay");
    Nav.classList.toggle("active");
    NavOverlay.classList.toggle("active");
  }

  /**
   * Evento onScroll
   * @return void
   */
  function onScroll() {
    lastScrollY =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop;

    requestTick();
  }
  /**
   * Validamos que se haya ejecutado correctamente el onScroll() antes de pintar
   * un nuevo frame.
   * @return void
   */
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }
  /**
   *
   *
   * @return void
   */
  function update() {
    const menuLinks = document.querySelectorAll(".header__ul a");

    Header.classList[lastScrollY >= startSticky - 350 ? "add" : "remove"](
      "header--beforesticky"
    );
    Header.classList[lastScrollY >= startSticky - 150 ? "add" : "remove"](
      "header--animation"
    );
    Header.classList[lastScrollY >= startSticky ? "add" : "remove"](
      "header--sticky"
    );

    menuLinks.forEach((link) => {
      const section = document.querySelector(link.getAttribute("href"));
      const bounding = section.getBoundingClientRect();

      if (
        bounding.top <= window.innerHeight / 2 &&
        bounding.bottom >= window.innerHeight / 2
      ) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
    ticking = false;
  }
  // Export
  window.Header = Constructor();
})();

(function () {
  "use strict";

  let Images = [],
    Options = {
      rootMargin: "50px 0px",
      threshold: 0.01,
    },
    Observer = null,
    ImagePath = null;

  function Constrcutor() {
    Images = document.querySelectorAll("[data-lazyload]:not(.generated)");

    if (Images.length == 0) {
      return;
    }

    if ("IntersectionObserver" in window) {
      Observer = new IntersectionObserver(onIntersection, Options);
      for (let i = 0, k = Images.length; i < k; i++) {
        Observer.observe(Images[i]);
      }
    } else {
      loadImages();
    }
  }

  function onIntersection(entryList) {
    for (let i = 0, k = entryList.length, image; i < k; i++) {
      image = entryList[i];

      if (image.intersectionRatio > 0) {
        Observer.unobserve(image.target);
        setImage.apply(image.target);
      }
    }
  }
  function setImage() {
    ImagePath = this.getAttribute("data-lazyload");
    if (this.classList.contains("generated") || !ImagePath) {
      return;
    }
    this[this.tagName !== "LINK" ? "src" : "href"] = ImagePath;
    this.removeAttribute("data-lazyload");
    this.classList.add("generated");
  }
  function loadImages() {
    for (let i = 0, k = Images.length; i < k; i++) {
      setImage.apply(Images[i]);
    }
  }

  Constrcutor.prototype = {
    reinit: Constrcutor,
  };

  window.LazyLoad = new Constrcutor();
})(window);

(function () {
  "use strict";

  // Constructor
  function Constructor() {
    const LinkAnchor = document.querySelectorAll("[data-anchor]");

    for (let e = 0; e < LinkAnchor.length; e++) {
      LinkAnchor[e].addEventListener("click", ViewportObserver, false);
    }
  }

  function ViewportObserver(event) {
    event.preventDefault();

    const anchor = this.dataset.anchor;
    const element = document.querySelector("[data-section=" + anchor + "]");
    if (!element) {
      return;
    }
    element.scrollIntoView();
  }

  // Export
  window.ScrollIntoView = Constructor();
})();

(function () {
  "use strict";

  // Constructor
  function Constructor() {
    new ViewportObserver(".viewport-observer", "visible");
  }
  function ViewportObserver(targetSelector, visibleClass) {
    const elements = document.querySelectorAll(targetSelector);

    if (!elements.length) {
      return; // No se encontraron elementos con el selector dado
    }

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(visibleClass);
          observer.unobserve(entry.target);
        }
      });
    });

    elements.forEach((element) => {
      observer.observe(element);
    });
  }

  // Export
  window.ViewportObserver = Constructor();
})();

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

;(function () {
  "use strict"
  const textos = document.querySelectorAll(".texto-animado")

  for (const element of textos) {
    element.style.opacity = 0
  }

  const velocidadEscritura = 50 // Velocidad en milisegundos por caracter
  const caracteresPorIteracion = 1 // Cantidad de caracteres a agregar en cada iteración
  const retrasoEntreTextos = 500 // Retraso en milisegundos entre textos

  // Constructor
  function Constructor() {}

  function escribirTexto(textoElemento, texto, callback) {
    let i = 0
    textoElemento.textContent = ""
    textoElemento.style.opacity = 1

    // Elimina espacios adicionales antes de comenzar la animación
    texto = texto.replace(/\s+/g, " ")

    function escribirCaracter() {
      if (i < texto.length) {
        const caracteres = texto.substring(i, i + caracteresPorIteracion)
        textoElemento.textContent += caracteres
        i += caracteresPorIteracion
        setTimeout(escribirCaracter, velocidadEscritura)
      } else {
        // Llama al callback cuando termina la animación
        if (callback) {
          callback()
        }
      }
    }
    escribirCaracter()
  }

  // Función para animar secuencialmente los textos
  function animarTextos(textos, index) {
    if (index < textos.length) {
      const textoElemento = textos[index]

      escribirTexto(textoElemento, textoElemento.textContent, () => {
        setTimeout(() => {
          animarTextos(textos, index + 1)
        }, retrasoEntreTextos)
      })
    }
  }

  // Observador de intersección para el primer elemento
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // textos.style.opacity = 0;
      if (entry.isIntersecting) {
        animarTextos(textos, 0)

        observer.disconnect() // Detener la observación después de la primera animación
      }
    })
  })

  observer.observe(textos[0])

  // Export
  window.ScrollIntoView = Constructor()
})()
