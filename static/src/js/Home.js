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
