(function () {
  "use strict";

  // Back-to-top button: show it once the page has scrolled a screenful.
  var toTop = document.getElementById("to-top");

  if (toTop) {
    toTop.hidden = false;

    var toggle = function () {
      var show = window.pageYOffset > window.innerHeight * 0.6;
      toTop.classList.toggle("is-visible", show);
    };

    toggle();
    window.addEventListener("scroll", toggle, { passive: true });

    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Highlight the nav link of the section currently in view (home page only).
  var sections = document.querySelectorAll("main > section[id]");
  var navLinks = document.querySelectorAll(".topbar__nav a");

  if (!sections.length || !navLinks.length || !("IntersectionObserver" in window)) {
    return;
  }

  var linkFor = {};
  Array.prototype.forEach.call(navLinks, function (link) {
    var hash = link.getAttribute("href").split("#")[1];
    if (hash) {
      linkFor[hash] = link;
    }
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var link = linkFor[entry.target.id];
      if (link) {
        link.classList.toggle("is-active", entry.isIntersecting);
      }
    });
  }, { rootMargin: "-45% 0px -45% 0px" });

  Array.prototype.forEach.call(sections, function (section) {
    observer.observe(section);
  });
})();
