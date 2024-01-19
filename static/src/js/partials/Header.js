(function () {
  "use strict";

  var Header = document.querySelector(".header"),
    ButtonScrollUp = document.querySelector(".scroll-up"),
    viewportHeight = window.innerHeight,
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

    var scrollPosition = lastScrollY;
    var updateScroll = Math.max(scrollPosition - 350 - Header.offsetHeight);

    Header.classList[scrollPosition >= 70 ? "add" : "remove"](
      "header--beforesticky"
    );

    if (scrollPosition > 350 && updateScroll < 0) {
      Header.style.position = "fixed";
      Header.style.top = updateScroll + "px";
    }

    if (updateScroll >= 0) {
      Header.style.top = 0 + "px";
    }

    if (scrollPosition < 350) {
      Header.style.position = "absolute";
      Header.style.top = "0";
    }

    ButtonScrollUp.classList[lastScrollY >= viewportHeight ? "add" : "remove"](
      "visible"
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
