# Costa Brava — Website

A production-quality, fully responsive marketing site for Costa Brava
(industrial equipment, spare parts, and engineering/construction
solutions in Uzbekistan), rebuilt from the original Canva design as
semantic HTML5, hand-written CSS, and vanilla JavaScript.

## Structure

```
costa-brava/
│
├── index.html          Home
├── services.html       Services
├── clients.html         Clients
│
├── css/
│   ├── style.css        Design tokens, base styles, components
│   ├── responsive.css   Tablet / mobile breakpoints
│   └── animations.css   Page-load sequence & micro-interactions
│
├── js/
│   ├── main.js          Scroll-reveal (IntersectionObserver) + footer year
│   ├── navigation.js    Mobile menu toggle, sticky header state
│   └── carousel.js      Infinite client-logo marquee
│
├── assets/
│   ├── images/           hero / services / clients / backgrounds (see note below)
│   ├── logos/            client logos (optimized, trimmed, PNG)
│   ├── icons/             (service icons are inline SVG — see note below)
│   └── fonts/             (Google Fonts is used via CDN — see note below)
│
├── favicon.ico
└── README.md
```

## Notes for the client

- **Photography**: the three photographic images used across the site
  (hero worker shot, engineering-team meeting, industrial machinery)
  are free-license Unsplash photos, loaded from Unsplash's CDN so the
  hand-off stays lightweight. For a fully self-hosted, brand-specific
  site, swap in your own on-site photography — drop the files into
  `assets/images/hero|services|clients|backgrounds/` and update the
  `src` attributes in the three HTML files.
- **Service icons**: rather than more stock photography, the Civil
  Construction and Engineering Systems sections use hand-drawn inline
  SVG icons plus a blueprint-grid motif (see `.media-tile` /
  `.mep-banner` in `style.css`). This keeps the page fast, crisp at
  any resolution, and on-brand with the engineering subject matter —
  no `assets/icons` files are needed as a result.
- **Fonts**: headings use Poppins, body copy uses Inter, both loaded
  from Google Fonts in the `<head>` of each page. If you'd rather
  self-host, download the two families into `assets/fonts/` and
  replace the `<link>` tags with `@font-face` rules at the top of
  `style.css`.
- **Client logos**: all eight logos you supplied were trimmed of
  excess whitespace and optimized into `assets/logos/`. The clients
  page carousel duplicates them via JavaScript for a seamless
  infinite scroll — add or remove a logo by editing the single set of
  `.marquee__item` blocks in `clients.html`; the script handles the
  rest.

## Design system

- **Color**: deep navy (`#00274D`) for structure/trust, a bright
  construction-orange (`#FF914D`) as the single accent, and a
  steel-blue panel tone for the "Solutions" band — sampled directly
  from the original Canva export.
- **Type**: Poppins (display, 600–800 weight) paired with Inter
  (body, 400–700 weight).
- **Motion**: a staged hero load-in, scroll-triggered reveals via
  `[data-reveal]` + `IntersectionObserver`, hover-lift cards, and the
  self-pacing logo marquee. Everything respects
  `prefers-reduced-motion`.
- **Accessibility**: semantic landmarks (`header`, `nav`, `main`,
  `footer`), a skip-to-content link, visible focus rings, `aria-current`
  on active nav links, alt text on every meaningful image, and a
  logical heading outline (one `<h1>` per page). The default steel
  panel tone was deepened slightly from the original export so white
  text meets WCAG AA contrast.

## Running locally

No build step — open `index.html` directly in a browser, or serve the
folder with any static server, e.g.:

```bash
npx serve costa-brava
```
