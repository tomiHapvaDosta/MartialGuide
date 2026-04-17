
/* ── Layout ─────────────────────────────────────────────── */
injectNavbar(document.getElementById('navbar-container'));
injectFooter(document.getElementById('footer-container'));

/* ── Read ?id= from URL ──────────────────────────────────── */
const params = new URLSearchParams(window.location.search);
const artId = params.get('id');
const art = artId ? getArtById(artId) : null;

/* ── Update page <title> ─────────────────────────────────── */
if (art) {
    document.title = `${art.name} — MartialGuide`;
}

/* ── Helpers ─────────────────────────────────────────────── */

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

/* ── Scroll-reveal observer ──────────────────────────────── */
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

/* ── Animate stat bars after they enter the DOM ──────────── */
function animateStatBars() {
    // Small delay so the CSS transition actually fires
    setTimeout(() => {
        document.querySelectorAll('[data-fill]').forEach(el => {
            el.style.width = el.dataset.fill + '%';
        });
    }, 120);
}

/* ── Style description copy ──────────────────────────────── */
function styleDescription(art) {
    const map = {
        'Striking':
            `${art.name} is a striking-based discipline, meaning practitioners primarily attack using strikes — punches, kicks, knees, elbows, or combinations thereof. Matches and sparring are typically won by landing effective blows, and footwork and timing are central skills. Ground fighting is generally not a focus.`,
        'Grappling':
            `${art.name} is a grappling-based art focused on controlling the opponent through holds, throws, takedowns, and submissions. Practitioners learn to neutralise opponents without necessarily relying on strikes, using leverage and body positioning instead of raw power.`,
        'Weapons':
            `${art.name} incorporates weapons training as a core part of the curriculum. Practitioners learn to use, defend against, and handle traditional weapons alongside empty-hand techniques, developing coordination, distance management, and weapons awareness.`,
        'Mixed':
            `${art.name} is a mixed system drawing techniques from multiple disciplines — typically combining striking, grappling, and situational self-defence scenarios. The emphasis is on practical, adaptable skills that work across a range of real-world situations rather than sport competition.`,
    };
    return map[art.style] || `${art.name} is a martial art originating from ${art.origin}.`;
}

/* ── Icon SVGs ───────────────────────────────────────────── */
const ICONS = {
    style: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>`,
    equipment: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>`,
    bestfor: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>`,
    history: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>`,
    people: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>`,
    compare: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="3" x2="12" y2="21" /><polyline points="3 8 7 12 3 16" /><polyline points="21 8 17 12 21 16" /></svg>`,
};

/* ── Build info card ─────────────────────────────────────── */
function infoCard(iconKey, title, bodyHTML, delay = 0) {
    return `
        <article class="info-card reveal" style="transition-delay:${delay}ms">
            <div class="info-card-header">
                <div class="info-card-icon" aria-hidden="true">${ICONS[iconKey]}</div>
                <h2>${title}</h2>
            </div>
            ${bodyHTML}
        </article>`;
}

/* ── Render NOT FOUND state ──────────────────────────────── */
function renderNotFound() {
    document.getElementById('main-content').innerHTML = `
        <div class="not-found" role="alert">
          <div class="not-found-icon" aria-hidden="true">🥋</div>
          <h2>Art Not Found</h2>
          <p>We couldn't find a martial art with that ID. Try browsing all disciplines instead.</p>
          <a href="browse.html">← Back to Browse</a>
        </div>`;
}

/* ── Render related art mini-card ────────────────────────── */
function relatedCard(a) {
    const pct_d = (a.difficulty / 10) * 100;
    const pct_r = (a.injuryRisk / 10) * 100;
    return `
        <a class="related-card reveal" href="art-template.html?id=${a.id}" aria-label="${a.name}">
            <div class="related-card-img" aria-hidden="true">
                <span>${initials(a.name)}</span>
            </div>
            <div class="related-card-body">
                <div class="related-card-top">
                    <span class="related-card-name">${a.name}</span>
                    <span class="style-badge ${badgeClass(a.style)}">${a.style}</span>
                </div>
                <div class="related-stat-row">
                    <div class="related-stat-item">
                        <span class="related-stat-label">Difficulty</span>
                        <div class="related-stat-track">
                            <div class="related-stat-fill blue" style="width:${pct_d}%"></div>
                        </div>
                        <span class="related-stat-value">${a.difficulty}</span>
                    </div>
                    <div class="related-stat-item">
                        <span class="related-stat-label">Injury Risk</span>
                        <div class="related-stat-track">
                            <div class="related-stat-fill red" style="width:${pct_r}%"></div>
                        </div>
                        <span class="related-stat-value">${a.injuryRisk}</span>
                    </div>
                </div>
            </div>
        </a>`;
}

/* ── MAIN RENDER ─────────────────────────────────────────── */
function renderArt(art) {
    const totalCost = getTotalEquipmentCost(art);
    const related = getRelatedArts(art, 3);
    const ALL_TAGS = ['Self-defense', 'Sport', 'Fitness', 'Discipline'];

    /* Equipment rows */
    const equipRows = art.equipmentList.map(e => `
        <li class="equipment-item">
            <span class="equipment-item-name">${e.item}</span>
            <span class="equipment-item-cost">~$${e.estimatedCostUSD}</span>
        </li>`).join('');

    /* Best For pills */
    const pills = ALL_TAGS.map(tag => `
        <span class="bestfor-pill ${art.bestFor.includes(tag) ? 'active' : ''}" aria-label="${tag}${art.bestFor.includes(tag) ? ' (applies)' : ''}">
            ${tag}
        </span>`).join('');

    /* Practitioners */
    const practitionerRows = art.famousPractitioners.map(p => `
        <li class="practitioners-item">${p}</li>`).join('');

    /* Related cards */
    const relatedHTML = related.length
        ? related.map(relatedCard).join('')
        : `<p style="color:#aaa;font-size:0.9rem;">No similar arts found.</p>`;

    /* ── Inject full page ── */
    document.getElementById('main-content').innerHTML = `

        <!-- BREADCRUMB -->
        <nav class="breadcrumb" aria-label="Breadcrumb">
            <div class="breadcrumb-inner">
                <a href="index.html">Home</a>
                <span class="breadcrumb-sep" aria-hidden="true">›</span>
                <a href="browse.html">Browse</a>
                <span class="breadcrumb-sep" aria-hidden="true">›</span>
                <span class="breadcrumb-current" aria-current="page">${art.name}</span>
            </div>
        </nav>

        <!-- HERO -->
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

        <!-- QUICK STATS -->
        <div class="quick-stats reveal" aria-label="Quick stats for ${art.name}">
            <div class="quick-stats-inner">

                <div class="stat-block">
                    <span class="stat-block-label">Difficulty</span>
                    <div class="stat-block-bar-row">
                        <div class="stat-bar-track" role="img" aria-label="Difficulty: ${art.difficulty} out of 10">
                            <div class="stat-bar-fill blue" data-fill="${(art.difficulty / 10) * 100}" style="width:0%"></div>
                        </div>
                        <span class="stat-block-value">${art.difficulty} / 10</span>
                    </div>
                </div>

                <div class="stat-block">
                    <span class="stat-block-label">Injury Risk</span>
                    <div class="stat-block-bar-row">
                        <div class="stat-bar-track" role="img" aria-label="Injury Risk: ${art.injuryRisk} out of 10">
                            <div class="stat-bar-fill red" data-fill="${(art.injuryRisk / 10) * 100}" style="width:0%"></div>
                        </div>
                        <span class="stat-block-value">${art.injuryRisk} / 10</span>
                    </div>
                </div>

                <div class="stat-block">
                    <span class="stat-block-label">Fitness Required</span>
                    <div class="stat-block-bar-row">
                        <div class="stat-bar-track" role="img" aria-label="Fitness Required: ${art.fitnessRequired} out of 10">
                            <div class="stat-bar-fill green" data-fill="${(art.fitnessRequired / 10) * 100}" style="width:0%"></div>
                        </div>
                        <span class="stat-block-value">${art.fitnessRequired} / 10</span>
                    </div>
                </div>

            </div>
        </div>

        <!-- BODY: MAIN + SIDEBAR -->
        <div class="art-body">

            <!-- MAIN COLUMN -->
            <div class="art-main">

                ${infoCard('style', 'Fighting Style', `
              <p class="style-description">${styleDescription(art)}</p>
            `, 0)}

                ${infoCard('equipment', 'Equipment &amp; Cost', `
              <ul class="equipment-list" aria-label="Equipment list">
                ${equipRows}
              </ul>
              <div class="equipment-total">
                <span class="equipment-total-label">Estimated Total</span>
                <span class="equipment-total-value">~$${totalCost}</span>
              </div>
            `, 60)}

                ${infoCard('bestfor', 'Best For', `
              <div class="bestfor-pills" role="list" aria-label="Best for categories">
                ${pills}
              </div>
            `, 120)}

                ${infoCard('history', 'Origin &amp; History', `
              <p class="history-text">${art.history}</p>
            `, 180)}

                ${infoCard('people', 'Famous Practitioners &amp; Pop Culture', `
              <ul class="practitioners-list" aria-label="Famous practitioners">
                ${practitionerRows}
              </ul>
            `, 240)}

            </div>

            <!-- SIDEBAR -->
            <aside class="art-sidebar" aria-label="Actions">
                <div class="compare-card reveal">
                    <h3>Compare ${art.name} with another art</h3>
                    <p>See how ${art.name} stacks up against any other discipline — difficulty, cost, injury risk and more.</p>
                    <a class="btn-compare" href="compare.html?art1=${art.id}">
                        ${ICONS.compare}
                        Compare Now
                    </a>
                </div>
            </aside>

        </div>

        <!-- RELATED ARTS -->
        ${related.length ? `
        <section class="related-section" aria-labelledby="related-title">
          <div class="related-inner">
            <div class="related-header">
              <p class="section-label">Same Style</p>
              <h2 id="related-title">Related Martial Arts</h2>
            </div>
            <div class="related-grid">
              ${relatedHTML}
            </div>
          </div>
        </section>` : ''}
        `;

    /* ── Post-render: animate bars + reveal observer ── */
    animateStatBars();
    setupReveal();
}

/* ── Boot ─────────────────────────────────────────────────── */
if (!art) {
    renderNotFound();
} else {
    renderArt(art);
}