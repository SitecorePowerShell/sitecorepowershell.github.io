(() => {
  // <stdin>
  (function() {
    "use strict";
    var STORAGE_KEY = "theme-preference";
    function getPreferredTheme() {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "dark" || saved === "light") {
        return saved;
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    function applyTheme(theme) {
      document.documentElement.setAttribute("data-theme", theme);
      var toggle = document.getElementById("theme-toggle");
      if (toggle) {
        var sunIcon = toggle.querySelector(".icon-sun");
        var moonIcon = toggle.querySelector(".icon-moon");
        if (theme === "dark") {
          sunIcon.style.display = "none";
          moonIcon.style.display = "block";
        } else {
          sunIcon.style.display = "block";
          moonIcon.style.display = "none";
        }
      }
      if (typeof mermaid !== "undefined") {
        mermaid.initialize({
          startOnLoad: false,
          theme: theme === "dark" ? "dark" : "default"
        });
      }
    }
    applyTheme(getPreferredTheme());
    document.addEventListener("DOMContentLoaded", function() {
      applyTheme(getPreferredTheme());
      var toggle = document.getElementById("theme-toggle");
      if (toggle) {
        toggle.addEventListener("click", function() {
          var current = document.documentElement.getAttribute("data-theme") || "light";
          var next = current === "dark" ? "light" : "dark";
          applyTheme(next);
          localStorage.setItem(STORAGE_KEY, next);
        });
      }
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function(e) {
        if (!localStorage.getItem(STORAGE_KEY)) {
          applyTheme(e.matches ? "dark" : "light");
        }
      });
    });
  })();
})();
