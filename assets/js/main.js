/* Subham Sansthan — small progressive-enhancement layer.
   No dependencies, no build step. Everything degrades gracefully without JS. */
(function () {
  'use strict';

  /* ---- 1. Theme (light / dark), remembered in localStorage ---- */
  var root = document.documentElement;
  try {
    var saved = localStorage.getItem('ss-theme');
    if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);
  } catch (e) { /* private mode — just follow the system */ }

  function currentTheme() {
    var attr = root.getAttribute('data-theme');
    if (attr) return attr;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  document.addEventListener('click', function (ev) {
    var btn = ev.target.closest('.theme-toggle');
    if (!btn) return;
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    btn.setAttribute('aria-label', next === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    try { localStorage.setItem('ss-theme', next); } catch (e) {}
  });

  /* ---- 2. Mobile navigation ---- */
  var navToggle = document.querySelector('.nav__toggle');
  var navLinks = document.getElementById('primary-nav');

  function closeNav() {
    if (!navLinks) return;
    navLinks.classList.remove('is-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var open = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    navLinks.addEventListener('click', function (ev) {
      if (ev.target.tagName === 'A') closeNav();
    });
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape') closeNav();
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 940) closeNav();
    });
  }

  /* ---- 3. Header shadow once the page is scrolled ---- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- 4. Reveal sections as they enter the viewport ----
     Written to fail open: if IntersectionObserver is missing, throttled
     (background tab), or the visitor prefers reduced motion, everything
     is simply shown. Content must never depend on an animation firing. */
  var revealables = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  function showAll() {
    revealables.forEach(function (el) { el.classList.add('is-visible'); });
  }

  if (!('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    showAll();
  } else {
    // anything already on screen at load is shown straight away
    var vh = window.innerHeight || document.documentElement.clientHeight;
    revealables.forEach(function (el) {
      if (el.getBoundingClientRect().top < vh * 0.92) el.classList.add('is-visible');
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    revealables.forEach(function (el, i) {
      if (el.classList.contains('is-visible')) return;
      el.style.transitionDelay = Math.min(i % 4, 3) * 70 + 'ms';
      observer.observe(el);
    });

    // last resort: never leave text hidden because a callback did not run
    setTimeout(showAll, 4000);
  }

  /* ---- 5. Stamp the current year into the footer ---- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
