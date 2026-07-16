/**
 * navigation.js
 * Handles the mobile nav toggle, closing the menu on outside click /
 * Escape / link selection, and toggling the sticky header's scrolled
 * state. Kept isolated from carousel.js and main.js so each script
 * has a single, obvious job.
 */
(function () {
  'use strict';

  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.primary-nav');

  /* ---------- Mobile menu ------------------------------------------- */
  if (toggle && nav) {
    const closeMenu = () => {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    };

    const openMenu = () => {
      toggle.setAttribute('aria-expanded', 'true');
      nav.classList.add('is-open');
    };

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      isOpen ? closeMenu() : openMenu();
    });

    // Close the menu whenever a nav link is chosen (mobile).
    nav.querySelectorAll('.primary-nav__link').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    // Close on outside click.
    document.addEventListener('click', (event) => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      if (!isOpen) return;
      if (!nav.contains(event.target) && !toggle.contains(event.target)) {
        closeMenu();
      }
    });

    // Close on Escape and return focus to the toggle for keyboard users.
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        toggle.focus();
      }
    });

    // If the viewport grows past the mobile breakpoint, ensure the
    // menu resets to a known (closed / static) state.
    window.addEventListener('resize', () => {
      if (window.innerWidth > 860) {
        closeMenu();
      }
    });
  }

  /* ---------- Sticky header scroll state ------------------------------ */
  if (header) {
    const updateHeaderState = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    };
    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });
  }
})();
