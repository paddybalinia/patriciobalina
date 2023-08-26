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
