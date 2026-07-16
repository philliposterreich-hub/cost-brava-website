/**
 * carousel.js
 * Builds an infinitely scrolling client-logo marquee.
 *
 * Approach: the HTML ships ONE set of logo items inside
 * .marquee__track. On load, this script duplicates that set and
 * appends the clone inside the same track. The CSS animation then
 * translates the track by exactly -50% and loops seamlessly, because
 * the second half is an identical copy of the first — the eye can
 * never detect the reset. Duplicating via JS (rather than hard-coding
 * the repeat in HTML) keeps the markup DRY and avoids the duplicated
 * content being read twice by assistive tech, since the clone is
 * marked aria-hidden.
 */
(function () {
  'use strict';

  const marquees = document.querySelectorAll('[data-carousel="marquee"]');

  marquees.forEach((marquee) => {
    const track = marquee.querySelector('.marquee__track');
    if (!track) return;

    // Duplicate the existing logo items so the track holds two
    // identical halves back-to-back — this is what makes the
    // translateX(-50%) loop in animations.css read as infinite.
    const originalItems = Array.from(track.children);
    originalItems.forEach((item) => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      // Cloned images are decorative duplicates; strip redundant alt
      // text so screen readers don't announce every logo twice.
      clone.querySelectorAll('img').forEach((img) => img.setAttribute('alt', ''));
      track.appendChild(clone);
    });

    // Scale animation speed to content width so wider logo sets
    // (or narrower viewports) still scroll at a comfortable,
    // legible pace rather than a fixed duration that may feel
    // too fast or too slow.
    const setDuration = () => {
      const trackWidth = track.scrollWidth / 2; // width of one set
      const pxPerSecond = 55;
      const duration = Math.max(trackWidth / pxPerSecond, 18);
      track.style.setProperty('--marquee-duration', duration + 's');
    };

    setDuration();
    window.addEventListener('resize', setDuration);

    // Pause on keyboard focus within the marquee (in addition to the
    // CSS :hover / :focus-within pause) so motion-sensitive keyboard
    // users reviewing a logo don't have it sliding under their cursor.
    marquee.addEventListener('focusin', () => track.style.animationPlayState = 'paused');
    marquee.addEventListener('focusout', () => track.style.animationPlayState = 'running');
  });
})();
