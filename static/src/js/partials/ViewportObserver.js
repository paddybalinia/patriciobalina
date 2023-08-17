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
