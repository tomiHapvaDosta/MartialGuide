/**
 * art-template.js — MartialGuide individual martial art page
 * 
 * NOTE: This file contains extracted JavaScript from art-template.html
 * Full implementation should include:
 * - URL parameter parsing (?id=)
 * - Dynamic page rendering based on martial art data
 * - Scroll-reveal animations
 * - Stat bar animations
 * - Related arts filtering (same style)
 * - Breadcrumb navigation
 * - Compare button linking
 */

injectNavbar(document.getElementById('navbar-container'));
injectFooter(document.getElementById('footer-container'));

/* ── Read ?id= from URL ──────────────────────────────────– */
const params = new URLSearchParams(window.location.search);
const artId = params.get('id');
const art = artId ? getArtById(artId) : null;

/* ── Update page <title> ──────────────────────────────────– */
if (art) {
    document.title = `${art.name} — MartialGuide`;
}

/* ── Helpers ──────────────────────────────────────────────– */

function badgeClass(style) {
    const map = {
        'Striking': 'badge-striking',
        'Grappling': 'badge-grappling',
        'Weapons': 'badge-weapons',
        'Mixed': 'badge-mixed',
    };
    return map[style] || 'badge-striking';
}

function initials(name) {
    return name.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase();
}

/* ── Scroll-reveal observer ──────────────────────────────– */
function setupReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
        els.forEach(el => el.classList.add('visible'));
        return;
    }
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
}

/* ── Animate stat bars after render ──────────────────────– */
function animateStatBars() {
    setTimeout(() => {
        document.querySelectorAll('[data-fill]').forEach(el => {
            el.style.width = el.dataset.fill + '%';
        });
    }, 120);
}

/* ── Style description ────────────────────────────────────– */
function styleDescription(art) {
    const map = {
        'Striking':
            `${art.name} is a striking-based discipline using punches, kicks, knees, elbows. Matches are won by landing effective blows. Footwork and timing are central skills.`,
        'Grappling':
            `${art.name} is a grappling art focused on holds, throws, takedowns, and submissions. Practitioners use leverage and body positioning rather than raw power.`,
        'Weapons':
            `${art.name} incorporates weapons training as a core part. Practitioners learn to use, defend against, and handle traditional weapons.`,
        'Mixed':
            `${art.name} is a mixed system drawing techniques from multiple disciplines, combining striking, grappling, and real-world self-defence scenarios.`,
    };
    return map[art.style] || `${art.name} is a martial art originating from ${art.origin}.`;
}

/* ── Render NOT FOUND state ──────────────────────────────– */
function renderNotFound() {
    document.getElementById('main-content').innerHTML = `
    <div class="not-found" role="alert">
      <div class="not-found-icon" aria-hidden="true">🥋</div>
      <h2>Art Not Found</h2>
      <p>We couldn't find a martial art with that ID. Try browsing all disciplines instead.</p>
      <a href="browse.html">← Back to Browse</a>
    </div>`;
}

/* ── Render art page ──────────────────────────────────────– */
function renderArt(art) {
    const totalCost = getTotalEquipmentCost(art);
    const related = getRelatedArts(art, 3);
    const ALL_TAGS = ['Self-defense', 'Sport', 'Fitness', 'Discipline'];

    // Build equipment rows HTML
    const equipRows = art.equipmentList.map(e => `
    <li class="equipment-item">
      <span class="equipment-item-name">${e.item}</span>
      <span class="equipment-item-cost">~$${e.estimatedCostUSD}</span>
    </li>`).join('');

    // Build best-for pills
    const pills = ALL_TAGS.map(tag => `
    <span class="bestfor-pill ${art.bestFor.includes(tag) ? 'active' : ''}" aria-label="${tag}${art.bestFor.includes(tag) ? ' (applies)' : ''}">
      ${tag}
    </span>`).join('');

    // Build practitioners list
    const practitionerRows = art.famousPractitioners.map(p => `
    <li class="practitioners-item">${p}</li>`).join('');

    /* Full page render */
    document.getElementById('main-content').innerHTML = `
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <div class="breadcrumb-inner">
        <a href="index.html">Home</a>
        <span class="breadcrumb-sep" aria-hidden="true">›</span>
        <a href="browse.html">Browse</a>
        <span class="breadcrumb-sep" aria-hidden="true">›</span>
        <span class="breadcrumb-current" aria-current="page">${art.name}</span>
      </div>
    </nav>

    <section class="art-hero" aria-label="${art.name} hero image">
      <div class="art-hero-bg">
        <span class="art-hero-bg-initials" aria-hidden="true">${initials(art.name)}</span>
      </div>
      <div class="art-hero-overlay" aria-hidden="true"></div>
      <div class="art-hero-content">
        <div class="art-hero-meta">
          <span class="art-hero-origin">${art.origin}</span>
          <span class="style-badge ${badgeClass(art.style)}">${art.style}</span>
        </div>
        <h1>${art.name}</h1>
        <p class="art-hero-tagline">${art.tagline}</p>
      </div>
    </section>

    <div class="quick-stats reveal" aria-label="Quick stats">
      <div class="quick-stats-inner">
        <div class="stat-block">
          <span class="stat-block-label">Difficulty</span>
          <div class="stat-block-bar-row">
            <div class="stat-bar-track">
              <div class="stat-bar-fill blue" data-fill="${(art.difficulty / 10) * 100}" style="width:0%"></div>
            </div>
            <span class="stat-block-value">${art.difficulty} / 10</span>
          </div>
        </div>
        <div class="stat-block">
          <span class="stat-block-label">Injury Risk</span>
          <div class="stat-block-bar-row">
            <div class="stat-bar-track">
              <div class="stat-bar-fill red" data-fill="${(art.injuryRisk / 10) * 100}" style="width:0%"></div>
            </div>
            <span class="stat-block-value">${art.injuryRisk} / 10</span>
          </div>
        </div>
        <div class="stat-block">
          <span class="stat-block-label">Fitness Required</span>
          <div class="stat-block-bar-row">
            <div class="stat-bar-track">
              <div class="stat-bar-fill green" data-fill="${(art.fitnessRequired / 10) * 100}" style="width:0%"></div>
            </div>
            <span class="stat-block-value">${art.fitnessRequired} / 10</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Art body content with info cards would go here -->
  `;

    setupReveal();
    animateStatBars();
}

/* ── MAIN ENTRY POINT ────────────────────────────────────– */
if (!art) {
    renderNotFound();
} else {
    renderArt(art);
}
