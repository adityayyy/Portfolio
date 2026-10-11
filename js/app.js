/* =========================================================================
   App behavior. Modules: configLinks, theme, menu, reveal, year.
   Conventions:
     - JS reaches the DOM via data-* hooks only (ids are for anchors/ARIA).
     - Every module fails soft: guarded lookups, try/catch around storage,
       visible-content fallback if the observer is unavailable.
   ========================================================================= */
(function () {
  "use strict";

  var THEME_KEY = "theme";

  function qs(sel) { return document.querySelector(sel); }
  function qsa(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }

  /* Fill hrefs from SITE_CONFIG; hide elements whose key is missing. */
  function initConfigLinks() {
    var links = (window.SITE_CONFIG && window.SITE_CONFIG.links) || {};
    qsa("[data-config]").forEach(function (el) {
      var key = el.getAttribute("data-config");
      var url = links[key];
      if (url) {
        el.setAttribute("href", url);
      } else {
        console.warn("[config] missing link key: " + key);
        el.hidden = true;
      }
    });
  }

  /* Theme state: one store = localStorage["theme"] ("light" | "dark"). */
  function initTheme() {
    var btn = qs("[data-theme-toggle]");
    var root = document.documentElement;

    function apply(theme) {
      root.setAttribute("data-theme", theme);
      if (btn) {
        btn.textContent = theme === "dark" ? "Light" : "Dark";
        btn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
      }
      try {
        localStorage.setItem(THEME_KEY, theme);
      } catch (e) {
        console.warn("[theme] storage unavailable, preference not persisted", e);
      }
    }

    if (!btn) return;
    var saved = null;
    try {
      saved = localStorage.getItem(THEME_KEY);
    } catch (e) {
      console.warn("[theme] storage unreadable", e);
    }
    apply(saved || root.getAttribute("data-theme") || "light");

    btn.addEventListener("click", function () {
      apply(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
  }

  /* Mobile menu sheet: open/close state mirrored to aria-expanded + label. */
  function initMenu() {
    var btn = qs("[data-menu-toggle]");
    var sheet = qs("[data-menu-sheet]");
    if (!btn || !sheet) return;

    function setOpen(open) {
      sheet.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.textContent = open ? "Close" : "Menu";
    }

    btn.addEventListener("click", function () {
      setOpen(!sheet.classList.contains("is-open"));
    });
    sheet.addEventListener("click", function (e) {
      if (e.target.tagName === "A") setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && sheet.classList.contains("is-open")) {
        setOpen(false);
        btn.focus();
      }
    });
  }

  /* Reveal-on-scroll; content is always shown if IO/motion is unavailable. */
  function initReveal() {
    var els = qsa("[data-reveal]");
    if (!els.length) return;

    function showAll() {
      els.forEach(function (el) { el.classList.add("is-in"); });
    }

    var reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!("IntersectionObserver" in window) || reduced) {
      showAll();
      return;
    }
    try {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("is-in");
            io.unobserve(en.target);
          }
        });
      }, { threshold: 0.12 });
      els.forEach(function (el) { io.observe(el); });
    } catch (e) {
      console.warn("[reveal] observer failed, showing content immediately", e);
      showAll();
    }
  }

  function initYear() {
    var el = qs("[data-year]");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  function init() {
    initConfigLinks();
    initTheme();
    initMenu();
    initReveal();
    initYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
