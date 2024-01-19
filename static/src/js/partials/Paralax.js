(function () {
  "use strict";

  // Get the viewport height
  var viewportHeight = window.innerHeight;

  // Assign the viewport height to the section with the class .section--home.
  var homeSection = document.querySelector(".section--home");
  if (homeSection) {
    homeSection.style.height = viewportHeight + "px";
  }

  function moveIt() {
    var windowElement = window;
    var instances = [];

    document
      .querySelectorAll("[data-scroll-speed]")
      .forEach(function (element) {
        instances.push(new MoveItItem(element));
      });

    windowElement.onscroll = function () {
      var scrollTop =
        windowElement.scrollY || document.documentElement.scrollTop;
      instances.forEach(function (inst) {
        inst.update(scrollTop);
      });
    };
  }

  var MoveItItem = function (element) {
    this.element = element;
    this.speed = parseInt(this.element.getAttribute("data-scroll-speed"));
  };

  MoveItItem.prototype.update = function (scrollTop) {
    var pos = scrollTop / this.speed;
    this.element.style.transform = "translateY(" + -pos + "px)";
    // Add fade-out effect
    var opacity = 1 - Math.max(0, pos / 100);
    this.element.style.opacity = opacity;
  };

  moveIt();
})();
