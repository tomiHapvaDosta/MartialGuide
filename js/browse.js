/* ── BROWSE.HTML JAVASCRIPT ──────────────────────────────────– */

(function browseInit() {
    injectNavbar(document.getElementById('navbar-container'));
    injectFooter(document.getElementById('footer-container'));

    /* ── DOM refs ───────────────────────────────────────────── */
    const searchInput = document.getElementById('search-input');
    const filterStyle = document.getElementById('filter-style');
    const filterDiff = document.getElementById('filter-difficulty');
    const filterBestFor = document.getElementById('filter-bestfor');
    const btnClear = document.getElementById('btn-clear');
    const btnResetEmpty = document.getElementById('btn-reset-empty');
    const grid = document.getElementById('arts-grid');
    const emptyState = document.getElementById('empty-state');
    const resultsCount = document.getElementById('results-count');

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

    function difficultyBand(val) {
        if (val <= 3) return 'beginner';
        if (val <= 6) return 'intermediate';
        return 'advanced';
    }

    function statBarHTML(label, value, colorClass) {
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

    function buildCard(art) {
        const initials = art.name
            .split(' ')
            .map(w => w[0])
            .join('')
            .slice(0, 3)
            .toUpperCase();

        const bestForTags = art.bestFor
            .map(tag => `<span class="best-for-tag">${tag}</span>`)
            .join('');

        const card = document.createElement('a');
        card.className = 'art-card';
        card.href = `art-template.html?id=${art.id}`;
        card.setAttribute('role', 'listitem');
        card.setAttribute('aria-label', `${art.name}, ${art.style} style`);

        card.innerHTML = `
    <div class="art-card-img-placeholder" aria-hidden="true">
      <span>${initials}</span>
    </div>
    <div class="art-card-body">
      <div class="art-card-top">
        <span class="art-card-name">${art.name}</span>
        <span class="style-badge ${badgeClass(art.style)}">${art.style}</span>
      </div>
      <div class="stat-row">
        ${statBarHTML('Difficulty', art.difficulty, 'blue')}
        ${statBarHTML('Injury Risk', art.injuryRisk, 'red')}
      </div>
      <div class="best-for-row" aria-label="Best for: ${art.bestFor.join(', ')}">
        ${bestForTags}
      </div>
    </div>`;

        return card;
    }

    /* ── Filter logic ────────────────────────────────────────– */

    function hasActiveFilters() {
        return (
            searchInput.value.trim() !== '' ||
            filterStyle.value !== '' ||
            filterDiff.value !== '' ||
            filterBestFor.value !== ''
        );
    }

    function getFilteredArts() {
        const query = searchInput.value.trim().toLowerCase();
        const style = filterStyle.value;
        const difficulty = filterDiff.value;
        const bestFor = filterBestFor.value;

        return MARTIAL_ARTS.filter(art => {
            if (query && !art.name.toLowerCase().includes(query)) return false;
            if (style && art.style !== style) return false;
            if (difficulty && difficultyBand(art.difficulty) !== difficulty) return false;
            if (bestFor && !art.bestFor.includes(bestFor)) return false;
            return true;
        });
    }

    /* ── Render ──────────────────────────────────────────────– */

    function render() {
        const results = getFilteredArts();
        const active = hasActiveFilters();

        btnClear.disabled = !active;

        [filterStyle, filterDiff, filterBestFor].forEach(sel => {
            sel.classList.toggle('active', sel.value !== '');
        });

        resultsCount.textContent = results.length;

        grid.innerHTML = '';

        if (results.length === 0) {
            grid.style.display = 'none';
            emptyState.classList.add('visible');
            return;
        }

        grid.style.display = '';
        emptyState.classList.remove('visible');

        results.forEach((art, i) => {
            const card = buildCard(art);
            card.style.animationDelay = `${i * 40}ms`;
            grid.appendChild(card);
        });
    }

    /* ── Reset ───────────────────────────────────────────────– */

    function resetAll() {
        searchInput.value = '';
        filterStyle.value = '';
        filterDiff.value = '';
        filterBestFor.value = '';
        render();
        searchInput.focus();
    }

    /* ── Event listeners ─────────────────────────────────────– */
    searchInput.addEventListener('input', render);
    filterStyle.addEventListener('change', render);
    filterDiff.addEventListener('change', render);
    filterBestFor.addEventListener('change', render);
    btnClear.addEventListener('click', resetAll);
    btnResetEmpty.addEventListener('click', resetAll);

    /* ── Initial render ──────────────────────────────────────– */
    render();
})();
