/**
 * main.js
 * Site-wide behaviors that don't belong to navigation.js or
 * carousel.js: scroll-triggered reveal animations and the current
 * year in the footer. Loaded last so it can safely assume the DOM
 * from the other two scripts is already wired up.
 */
(function () {
  'use strict';

  /* ---------- Scroll reveal -------------------------------------------
     Elements marked [data-reveal] fade + rise into view once they
     cross into the viewport. IntersectionObserver keeps this cheap
     (no scroll-event polling) and we unobserve after the first
     reveal since the effect is meant to happen once, not on every
     scroll pass. */
  const revealTargets = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window && revealTargets.length) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealTargets.forEach((target) => observer.observe(target));
  } else {
    // No IntersectionObserver support: just show everything immediately.
    revealTargets.forEach((target) => target.classList.add('is-visible'));
  }

  /* ---------- Footer year ---------------------------------------------- */
  const yearEl = document.querySelector('[data-current-year]');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
