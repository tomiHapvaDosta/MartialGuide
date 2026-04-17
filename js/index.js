/* ── Layout ─────────────────────────────────────────────── */
injectNavbar(document.getElementById('navbar-container'));
injectFooter(document.getElementById('footer-container'));

/* ── Helpers ─────────────────────────────────────────────── */

/** Return CSS class name for a style badge */
function badgeClass(style) {
    const map = {
        'Striking': 'badge-striking',
        'Grappling': 'badge-grappling',
        'Weapons': 'badge-weapons',
        'Mixed': 'badge-mixed',
    };
    return map[style] || 'badge-striking';
}

/** Build a stat bar row element */
function buildStatBar(label, value, colorClass) {
    const pct = (value / 10) * 100;
    return `
        <div class="stat-item">
          <span class="stat-label">${label}</span>
          <div class="stat-bar-track" role="img" aria-label="${label}: ${value} out of 10">
            <div class="stat-bar-fill ${colorClass}" style="width:${pct}%"></div>
          </div>
          <span class="stat-value">${value}</span>
        </div>`;
}

/** Build a single art card element */
function buildCard(art) {
    const initials = art.name.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase();

    const card = document.createElement('a');
    card.className = 'art-card';
    card.href = `art-template.html?id=${art.id}`;
    card.setAttribute('role', 'listitem');
    card.setAttribute('aria-label', `${art.name} — ${art.style}`);

    card.innerHTML = `
        <div class="art-card-img-placeholder" aria-hidden="true">${initials}</div>
        <div class="art-card-body">
          <div class="art-card-top">
            <span class="art-card-name">${art.name}</span>
            <span class="style-badge ${badgeClass(art.style)}">${art.style}</span>
          </div>
          <div class="stat-row">
            ${buildStatBar('Difficulty', art.difficulty, 'blue')}
            ${buildStatBar('Injury Risk', art.injuryRisk, 'red')}
          </div>
        </div>`;

    return card;
}

/* ── Render featured cards ───────────────────────────────── */
(function renderFeatured() {
    const track = document.getElementById('featured-cards');
    if (!track || typeof MARTIAL_ARTS === 'undefined') return;

    // Pick 4 random arts (getShuffledArts is defined in data.js)
    const picks = getShuffledArts().slice(0, 4);

    picks.forEach(art => {
        track.appendChild(buildCard(art));
    });
})();