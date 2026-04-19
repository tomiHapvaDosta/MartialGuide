/**
 * layout.js — MartialGuide shared layout
 *
 * Injects a navbar and footer into every page.
 *
 * Usage (place at bottom of every page's <body>):
 *
 *   <div id="navbar-container"></div>
 *   ... page content ...
 *   <div id="footer-container"></div>
 *
 *   <script src="layout.js"></script>
 *   <script>
 *     injectNavbar(document.getElementById('navbar-container'));
 *     injectFooter(document.getElementById('footer-container'));
 *   </script>
 *
 * Active link detection is automatic — it compares each link's
 * href to window.location.pathname.
 */

/* ─────────────────────────────────────────────────────────────
   SHARED STYLES
   Injected once into <head> when either function is first called.
───────────────────────────────────────────────────────────── */

const LAYOUT_STYLES = `
  /* ── Reset & base ─────────────────────────────────────── */
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --color-bg:         #ffffff;
    --color-surface:    #f4f4f4;
    --color-border:     #e8e8e8;
    --color-text:       #1a1a1a;
    --color-text-muted: #666666;
    --color-accent:     #1a1a1a;   /* dark charcoal */
    --color-accent-inv: #ffffff;
    --font-main: 'DM Sans', system-ui, sans-serif;
    --font-display: 'Bebas Neue', 'DM Sans', sans-serif;
    --nav-height: 64px;
    --transition: 0.2s ease;
    --radius: 6px;
  }

  body {
    font-family: var(--font-main);
    color: var(--color-text);
    background: var(--color-bg);
    padding-top: var(--nav-height); /* offset for fixed navbar */
  }

  /* ── Navbar ────────────────────────────────────────────── */
  #mg-navbar {
    position: fixed;
    top: 0; left: 0; right: 0;
    height: var(--nav-height);
    background: var(--color-bg);
    border-bottom: 1px solid var(--color-border);
    z-index: 1000;
    display: flex;
    align-items: center;
  }

  .mg-nav-inner {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }

  /* Logo */
  .mg-logo {
    font-family: var(--font-display);
    font-size: 1.55rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    color: var(--color-text);
    text-decoration: none;
    white-space: nowrap;
    /* subtle hover lift on the logo character */
    transition: opacity var(--transition);
  }
  .mg-logo:hover { opacity: 0.7; }

  /* Desktop links */
  .mg-nav-links {
    display: flex;
    align-items: center;
    gap: 6px;
    list-style: none;
  }

  .mg-nav-links a {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--color-text-muted);
    text-decoration: none;
    padding: 6px 12px;
    border-radius: var(--radius);
    transition: color var(--transition), background var(--transition);
    position: relative;
  }

  .mg-nav-links a:hover {
    color: var(--color-text);
    background: var(--color-surface);
  }

  /* Active state: small underline bar */
  .mg-nav-links a.mg-active {
    color: var(--color-text);
    font-weight: 600;
  }
  .mg-nav-links a.mg-active::after {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 12px;
    right: 12px;
    height: 2px;
    background: var(--color-accent);
    border-radius: 2px;
  }

  /* CTA button */
  .mg-nav-cta {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: var(--color-accent);
    color: var(--color-accent-inv) !important;
    font-size: 0.875rem !important;
    font-weight: 600 !important;
    padding: 8px 18px !important;
    border-radius: var(--radius) !important;
    transition: opacity var(--transition), transform var(--transition) !important;
  }
  .mg-nav-cta:hover {
    opacity: 0.85 !important;
    background: unset !important;
    transform: translateY(-1px);
  }
  /* CTA never shows the active underline */
  .mg-nav-cta.mg-active::after { display: none !important; }

  /* Hamburger button — hidden on desktop */
  .mg-hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 36px;
    height: 36px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    border-radius: var(--radius);
    transition: background var(--transition);
  }
  .mg-hamburger:hover { background: var(--color-surface); }
  .mg-hamburger span {
    display: block;
    width: 22px;
    height: 2px;
    background: var(--color-text);
    border-radius: 2px;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  /* Hamburger → X animation */
  .mg-hamburger.mg-open span:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }
  .mg-hamburger.mg-open span:nth-child(2) {
    opacity: 0;
    transform: scaleX(0);
  }
  .mg-hamburger.mg-open span:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }

  /* Mobile drawer */
  .mg-mobile-menu {
    display: none; /* shown via JS on mobile */
    position: fixed;
    top: var(--nav-height);
    left: 0; right: 0;
    background: var(--color-bg);
    border-bottom: 1px solid var(--color-border);
    padding: 12px 24px 20px;
    z-index: 999;
    flex-direction: column;
    gap: 4px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.06);
  }
  .mg-mobile-menu.mg-open { display: flex; }

  .mg-mobile-menu a {
    font-size: 1rem;
    font-weight: 500;
    color: var(--color-text-muted);
    text-decoration: none;
    padding: 10px 12px;
    border-radius: var(--radius);
    transition: color var(--transition), background var(--transition);
  }
  .mg-mobile-menu a:hover {
    color: var(--color-text);
    background: var(--color-surface);
  }
  .mg-mobile-menu a.mg-active {
    color: var(--color-text);
    font-weight: 600;
    background: var(--color-surface);
  }
  .mg-mobile-menu .mg-nav-cta {
    margin-top: 8px;
    justify-content: center;
    padding: 11px 18px !important;
    font-size: 0.95rem !important;
  }

  /* ── Footer ────────────────────────────────────────────── */
  #mg-footer {
    background: var(--color-surface);
    border-top: 1px solid var(--color-border);
    padding: 48px 0 0;
    margin-top: 80px;
  }

  .mg-footer-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 40px;
    align-items: start;
  }

  .mg-footer-brand .mg-footer-logo {
    font-family: var(--font-display);
    font-size: 1.4rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    color: var(--color-text);
    text-decoration: none;
    display: inline-block;
    margin-bottom: 8px;
  }
  .mg-footer-brand p {
    font-size: 0.875rem;
    color: var(--color-text-muted);
    line-height: 1.6;
    max-width: 320px;
  }

  .mg-footer-nav {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-end;
  }
  .mg-footer-nav a {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text-muted);
    text-decoration: none;
    transition: color var(--transition);
  }
  .mg-footer-nav a:hover { color: var(--color-text); }

  .mg-footer-bottom {
    margin-top: 40px;
    padding: 16px 24px;
    border-top: 1px solid var(--color-border);
    text-align: center;
  }
  .mg-footer-bottom p {
    font-size: 0.8rem;
    color: var(--color-text-muted);
  }

  /* ── Responsive ─────────────────────────────────────────── */
  @media (max-width: 720px) {
    .mg-nav-links { display: none; }
    .mg-hamburger { display: flex; }

    .mg-footer-inner {
      grid-template-columns: 1fr;
      gap: 24px;
    }
    .mg-footer-nav {
      align-items: flex-start;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 12px 20px;
    }
  }
`;

/* ─────────────────────────────────────────────────────────────
   INTERNAL HELPERS
───────────────────────────────────────────────────────────── */

/**
 * Inject shared CSS into <head> once.
 * Uses a flag so multiple calls don't duplicate the tag.
 */
function _injectLayoutStyles() {
  if (document.getElementById('mg-layout-styles')) return;
  const style = document.createElement('style');
  style.id = 'mg-layout-styles';
  style.textContent = LAYOUT_STYLES;
  document.head.insertBefore(style, document.head.firstChild);
}

/**
 * Inject Google Fonts (DM Sans + Bebas Neue) once.
 */
function _injectFonts() {
  if (document.getElementById('mg-fonts')) return;
  const link = document.createElement('link');
  link.id = 'mg-fonts';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&display=swap';
  document.head.appendChild(link);
}

/**
 * Determine if a link href matches the current page.
 * Matches on the filename portion of the pathname.
 * Treats both "/" and "/index.html" as the home page.
 *
 * @param {string} href  — the link's href value
 * @returns {boolean}
 */
function _isActivePage(href) {
  const path = window.location.pathname;

  // Normalise: strip leading path segments, keep filename
  const currentFile = path.split('/').pop() || 'index.html';
  const linkFile = href.split('/').pop() || 'index.html';

  return currentFile === linkFile;
}

/**
 * Build a nav <a> element with automatic active detection.
 *
 * @param {string} href
 * @param {string} label
 * @param {string} [extraClass]
 * @returns {HTMLAnchorElement}
 */
function _navLink(href, label, extraClass = '') {
  const a = document.createElement('a');
  a.href = href;
  a.textContent = label;
  if (extraClass) a.className = extraClass;
  if (_isActivePage(href)) a.classList.add('mg-active');
  return a;
}

/* ─────────────────────────────────────────────────────────────
   PUBLIC: injectNavbar(containerEl)
───────────────────────────────────────────────────────────── */

/**
 * Builds and injects the site navbar into the given element.
 * Also wires up the hamburger toggle.
 *
 * @param {HTMLElement} containerEl
 */
function injectNavbar(containerEl) {
  _injectFonts();
  _injectLayoutStyles();

  /* ── Nav links data ── */
  const links = [
    { href: 'browse.html', label: 'Browse' },
    { href: 'compare.html', label: 'Compare' },
    { href: 'chart.html', label: 'Chart' },
    { href: 'tree.html', label: 'Tree' },
    { href: 'quiz.html', label: 'Quiz' },
  ];

  /* ── Build navbar element ── */
  const nav = document.createElement('nav');
  nav.id = 'mg-navbar';
  nav.setAttribute('role', 'navigation');
  nav.setAttribute('aria-label', 'Main navigation');

  const inner = document.createElement('div');
  inner.className = 'mg-nav-inner';

  /* Logo */
  const logo = document.createElement('a');
  logo.href = 'index.html';
  logo.className = 'mg-logo';
  logo.textContent = 'MartialGuide';
  logo.setAttribute('aria-label', 'MartialGuide — home');

  /* Desktop link list */
  const ul = document.createElement('ul');
  ul.className = 'mg-nav-links';
  ul.setAttribute('role', 'list');

  links.forEach(({ href, label }) => {
    const li = document.createElement('li');
    li.appendChild(_navLink(href, label));
    ul.appendChild(li);
  });

  /* CTA button (desktop) */
  const ctaLi = document.createElement('li');
  ctaLi.appendChild(_navLink('quiz.html', 'Take the Quiz', 'mg-nav-cta'));
  ul.appendChild(ctaLi);

  /* Hamburger button */
  const burger = document.createElement('button');
  burger.className = 'mg-hamburger';
  burger.setAttribute('aria-label', 'Toggle navigation menu');
  burger.setAttribute('aria-expanded', 'false');
  burger.innerHTML = '<span></span><span></span><span></span>';

  inner.appendChild(logo);
  inner.appendChild(ul);
  inner.appendChild(burger);
  nav.appendChild(inner);

  /* ── Mobile drawer (sibling to nav, not inside) ── */
  const drawer = document.createElement('div');
  drawer.className = 'mg-mobile-menu';
  drawer.setAttribute('aria-hidden', 'true');
  drawer.id = 'mg-mobile-menu';

  links.forEach(({ href, label }) => {
    drawer.appendChild(_navLink(href, label));
  });
  drawer.appendChild(_navLink('quiz.html', 'Take the Quiz', 'mg-nav-cta'));

  /* ── Wire hamburger toggle ── */
  burger.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('mg-open');
    burger.classList.toggle('mg-open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    drawer.setAttribute('aria-hidden', String(!isOpen));
  });

  /* Close drawer when a link inside it is clicked */
  drawer.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      drawer.classList.remove('mg-open');
      burger.classList.remove('mg-open');
      burger.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
    }
  });

  /* Close drawer on outside click */
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !drawer.contains(e.target)) {
      drawer.classList.remove('mg-open');
      burger.classList.remove('mg-open');
      burger.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
    }
  });

  /* ── Mount ── */
  containerEl.appendChild(nav);

  // Insert drawer immediately after the container so it sits below the navbar
  containerEl.insertAdjacentElement('afterend', drawer);
}

/* ─────────────────────────────────────────────────────────────
   PUBLIC: injectFooter(containerEl)
───────────────────────────────────────────────────────────── */

/**
 * Builds and injects the site footer into the given element.
 *
 * @param {HTMLElement} containerEl
 */
function injectFooter(containerEl) {
  _injectFonts();
  _injectLayoutStyles();

  const currentYear = new Date().getFullYear();

  const footer = document.createElement('footer');
  footer.id = 'mg-footer';
  footer.setAttribute('role', 'contentinfo');

  /* ── Inner grid ── */
  const inner = document.createElement('div');
  inner.className = 'mg-footer-inner';

  /* Left: brand block */
  const brand = document.createElement('div');
  brand.className = 'mg-footer-brand';

  const brandLogo = document.createElement('a');
  brandLogo.href = 'index.html';
  brandLogo.className = 'mg-footer-logo';
  brandLogo.textContent = 'MartialGuide';

  const brandTagline = document.createElement('p');
  brandTagline.textContent =
    'An independent guide helping beginners find their perfect martial art.';

  brand.appendChild(brandLogo);
  brand.appendChild(brandTagline);

  /* Right: nav links */
  const navLinks = [
    { href: 'browse.html', label: 'Browse' },
    { href: 'compare.html', label: 'Compare' },
    { href: 'chart.html', label: 'Chart' },
    { href: 'tree.html', label: 'Tree' },
    { href: 'quiz.html', label: 'Quiz' },
  ];

  const navUl = document.createElement('ul');
  navUl.className = 'mg-footer-nav';
  navUl.setAttribute('role', 'list');

  navLinks.forEach(({ href, label }) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = href;
    a.textContent = label;
    li.appendChild(a);
    navUl.appendChild(li);
  });

  inner.appendChild(brand);
  inner.appendChild(navUl);

  /* ── Bottom bar ── */
  const bottom = document.createElement('div');
  bottom.className = 'mg-footer-bottom';

  const copy = document.createElement('p');
  copy.innerHTML = `&copy; ${currentYear} MartialGuide. Built for beginners, by enthusiasts.`;

  bottom.appendChild(copy);

  footer.appendChild(inner);
  footer.appendChild(bottom);

  containerEl.appendChild(footer);
}