
/* ── Layout ─────────────────────────────────────────────── */
injectNavbar(document.getElementById('navbar-container'));
injectFooter(document.getElementById('footer-container'));

/* ── DOM refs ───────────────────────────────────────────── */
const sel1 = document.getElementById('select-art1');
const sel2 = document.getElementById('select-art2');
const output = document.getElementById('compare-output');
const btnReset = document.getElementById('btn-reset');

/* ── Populate dropdowns from data.js ─────────────────────── */
MARTIAL_ARTS.forEach(art => {
    [sel1, sel2].forEach(sel => {
        const opt = document.createElement('option');
        opt.value = art.id;
        opt.textContent = art.name;
        sel.appendChild(opt);
    });
});

/* ── Pre-select from URL params ──────────────────────────── */
const params = new URLSearchParams(window.location.search);
if (params.get('art1')) sel1.value = params.get('art1');
if (params.get('art2')) sel2.value = params.get('art2');

/* ── Helpers ─────────────────────────────────────────────── */
function badgeClass(style) {
    return { Striking: 'badge-striking', Grappling: 'badge-grappling', Weapons: 'badge-weapons', Mixed: 'badge-mixed' }[style] || 'badge-striking';
}

function initials(name) {
    return name.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase();
}

const ALL_TAGS = ['Self-defense', 'Sport', 'Fitness', 'Discipline'];

/* ── Render: prompt state ────────────────────────────────── */
function renderPrompt() {
    const missing = (!sel1.value && !sel2.value)
        ? 'Select two martial arts above to start comparing.'
        : 'Select a second martial art to see the full comparison.';
    output.innerHTML = `
    <div class="prompt-state" role="status" aria-live="polite">
        <div class="prompt-icon" aria-hidden="true">⚔️</div>
        <h2>Choose Two Arts</h2>
        <p>${missing}</p>
    </div>`;
}

/* ── Render: stat cell (with bar) ───────────────────────── */
function statCell(value, colorClass, winClass, badgeLabel) {
    const pct = (value / 10) * 100;
    return `
    <td class="row-data ${winClass}">
        <div class="cell-stat">
            <span class="cell-stat-value">${value}<span style="font-family:'DM Sans',sans-serif;font-size:0.7rem;color:#aaa;font-weight:500"> /10</span></span>
            <div class="cell-stat-bar-track" role="img" aria-label="${value} out of 10">
                <div class="cell-stat-bar-fill ${colorClass}" style="width:${pct}%"></div>
            </div>
            ${badgeLabel ? `<span class="highlight-badge ${winClass === 'highlight-better' ? 'badge-better' : 'badge-worse'}">${badgeLabel}</span>` : ''}
        </div>
    </td>`;
}

/* ── Render: equipment cell ─────────────────────────────── */
function equipCell(art) {
    const total = getTotalEquipmentCost(art);
    const rows = art.equipmentList.map(e => `
    <li>
        <span class="equip-item-name">${e.item}</span>
        <span class="equip-item-cost">~$${e.estimatedCostUSD}</span>
    </li>`).join('');
    return `
    <td class="row-data">
        <ul class="equip-list">${rows}</ul>
        <div class="equip-total">
            <span>Total</span>
            <span>~$${total}</span>
        </div>
    </td>`;
}

/* ── Render: pills cell ─────────────────────────────────── */
function pillsCell(art) {
    const pills = ALL_TAGS.map(tag => `
    <span class="bestfor-pill ${art.bestFor.includes(tag) ? 'active' : ''}">${tag}</span>
    `).join('');
    return `<td class="row-data"><div class="pills-wrap">${pills}</div></td>`;
}

/* ── Render: practitioners cell ─────────────────────────── */
function practitionersCell(art) {
    const items = art.famousPractitioners.map(p => `<li>${p}</li>`).join('');
    return `<td class="row-data"><ul class="practitioners-list">${items}</ul></td>`;
}

/* ── Render: mobile stat row ─────────────────────────────── */
function mobileStatRow(label, value, colorClass, highlightClass, badgeLabel) {
    const pct = (value / 10) * 100;
    return `
    <div class="mobile-row">
        <div class="mobile-row-label">${label}</div>
        <div class="mobile-stat ${highlightClass}">
            <span class="mobile-stat-value">${value}</span>
            <div class="mobile-stat-track">
                <div class="mobile-stat-fill ${colorClass}" style="width:${pct}%"></div>
            </div>
            ${badgeLabel ? `<span class="highlight-badge ${highlightClass === 'mobile-highlight-better' ? 'badge-better' : 'badge-worse'}">${badgeLabel}</span>` : ''}
        </div>
    </div>`;
}

/* ── Render: mobile block for one art ───────────────────── */
function mobileArtBlock(art, diffClass, riskClass, diffBadge, riskBadge) {
    const total = getTotalEquipmentCost(art);
    const equipRows = art.equipmentList.map(e =>
        `<li><span class="equip-item-name">${e.item}</span><span class="equip-item-cost">~$${e.estimatedCostUSD}</span></li>`
    ).join('');
    const pills = ALL_TAGS.map(tag =>
        `<span class="bestfor-pill ${art.bestFor.includes(tag) ? 'active' : ''}">${tag}</span>`
    ).join('');
    const practitioners = art.famousPractitioners.map(p => `<li>${p}</li>`).join('');

    return `
    <div class="mobile-art-block">
        <div class="mobile-art-header">
            <div class="mobile-art-initials" aria-hidden="true">${initials(art.name)}</div>
            <div>
                <div class="mobile-art-name">${art.name}</div>
                <div class="mobile-art-origin">${art.origin}</div>
            </div>
        </div>
        <div class="mobile-rows">
            <div class="mobile-row">
                <div class="mobile-row-label">Style</div>
                <span class="style-badge ${badgeClass(art.style)}">${art.style}</span>
            </div>
            ${mobileStatRow('Difficulty', art.difficulty, 'fill-blue',
        diffClass === 'highlight-better' ? 'mobile-highlight-better' : (diffClass === 'highlight-worse' ? 'mobile-highlight-worse' : ''),
        diffBadge)}
            ${mobileStatRow('Injury Risk', art.injuryRisk, 'fill-red',
            riskClass === 'highlight-better' ? 'mobile-highlight-better' : (riskClass === 'highlight-worse' ? 'mobile-highlight-worse' : ''),
            riskBadge)}
            ${mobileStatRow('Fitness Required', art.fitnessRequired, 'fill-green', '', '')}
            <div class="mobile-row">
                <div class="mobile-row-label">Equipment &amp; Cost</div>
                <ul class="equip-list">${equipRows}</ul>
                <div class="equip-total"><span>Total</span><span>~$${total}</span></div>
            </div>
            <div class="mobile-row">
                <div class="mobile-row-label">Best For</div>
                <div class="pills-wrap">${pills}</div>
            </div>
            <div class="mobile-row">
                <div class="mobile-row-label">Origin</div>
                <span class="origin-text">${art.origin}</span>
            </div>
            <div class="mobile-row">
                <div class="mobile-row-label">Famous Practitioners</div>
                <ul class="practitioners-list">${practitioners}</ul>
            </div>
        </div>
    </div>`;
}

/* ── Main render: full comparison ───────────────────────── */
function renderComparison(a, b) {

    /* ── Determine better/worse for each stat (lower = better) ── */
    function statClasses(valA, valB) {
        if (valA === valB) return ['', '', '', ''];
        const betterA = valA < valB;
        return [
            betterA ? 'highlight-better' : 'highlight-worse',
            betterA ? 'highlight-worse' : 'highlight-better',
            betterA ? 'Easier' : 'Harder',
            betterA ? 'Harder' : 'Easier',
        ];
    }
    function riskClasses(valA, valB) {
        if (valA === valB) return ['', '', '', ''];
        const betterA = valA < valB;
        return [
            betterA ? 'highlight-better' : 'highlight-worse',
            betterA ? 'highlight-worse' : 'highlight-better',
            betterA ? 'Safer' : 'Riskier',
            betterA ? 'Riskier' : 'Safer',
        ];
    }

    const [dClassA, dClassB, dBadgeA, dBadgeB] = statClasses(a.difficulty, b.difficulty);
    const [rClassA, rClassB, rBadgeA, rBadgeB] = riskClasses(a.injuryRisk, b.injuryRisk);

    const totalA = getTotalEquipmentCost(a);
    const totalB = getTotalEquipmentCost(b);

    output.innerHTML = `
    <section class="compare-section" aria-label="Comparison of ${a.name} and ${b.name}">

        <div class="compare-top-bar">
            <p>Comparing <strong>${a.name}</strong> vs <strong>${b.name}</strong></p>
        </div>

        <!-- ── DESKTOP TABLE ── -->
        <div class="compare-table" role="table" aria-label="Side-by-side comparison">
            <table>
                <thead>
                    <tr>
                        <th class="col-label-th" scope="col" style="background:#1a1a1a;"></th>
                        <th class="col-art-th" scope="col">
                            <div class="art-th-initials" aria-hidden="true">${initials(a.name)}</div>
                            <div class="art-th-name">${a.name}</div>
                            <div class="art-th-tagline">${a.origin}</div>
                        </th>
                        <th class="col-art-th" scope="col">
                            <div class="art-th-initials" aria-hidden="true">${initials(b.name)}</div>
                            <div class="art-th-name">${b.name}</div>
                            <div class="art-th-tagline">${b.origin}</div>
                        </th>
                    </tr>
                </thead>
                <tbody>

                    <!-- Style -->
                    <tr>
                        <td class="row-label" scope="row">Style</td>
                        <td class="row-data"><span class="style-badge ${badgeClass(a.style)}">${a.style}</span></td>
                        <td class="row-data"><span class="style-badge ${badgeClass(b.style)}">${b.style}</span></td>
                    </tr>

                    <!-- Difficulty -->
                    <tr>
                        <td class="row-label" scope="row">Difficulty</td>
                        ${statCell(a.difficulty, 'fill-blue', dClassA, dBadgeA)}
                        ${statCell(b.difficulty, 'fill-blue', dClassB, dBadgeB)}
                    </tr>

                    <!-- Injury Risk -->
                    <tr>
                        <td class="row-label" scope="row">Injury Risk</td>
                        ${statCell(a.injuryRisk, 'fill-red', rClassA, rBadgeA)}
                        ${statCell(b.injuryRisk, 'fill-red', rClassB, rBadgeB)}
                    </tr>

                    <!-- Fitness Required -->
                    <tr>
                        <td class="row-label" scope="row">Fitness<br>Required</td>
                        ${statCell(a.fitnessRequired, 'fill-green', '', '')}
                        ${statCell(b.fitnessRequired, 'fill-green', '', '')}
                    </tr>

                    <!-- Equipment -->
                    <tr>
                        <td class="row-label" scope="row">Equipment<br>&amp; Cost</td>
                        ${equipCell(a)}
                        ${equipCell(b)}
                    </tr>

                    <!-- Cost highlight -->
                    <tr>
                        <td class="row-label" scope="row">Total Cost</td>
                        <td class="row-data ${totalA === totalB ? '' : totalA < totalB ? 'highlight-better' : 'highlight-worse'}">
                            <strong style="font-size:1.1rem;">~$${totalA}</strong>
                            ${totalA !== totalB ? `<br><span class="highlight-badge ${totalA < totalB ? 'badge-better' : 'badge-worse'}">${totalA < totalB ? 'Cheaper' : 'Pricier'}</span>` : ''}
                        </td>
                        <td class="row-data ${totalA === totalB ? '' : totalB < totalA ? 'highlight-better' : 'highlight-worse'}">
                            <strong style="font-size:1.1rem;">~$${totalB}</strong>
                            ${totalA !== totalB ? `<br><span class="highlight-badge ${totalB < totalA ? 'badge-better' : 'badge-worse'}">${totalB < totalA ? 'Cheaper' : 'Pricier'}</span>` : ''}
                        </td>
                    </tr>

                    <!-- Best For -->
                    <tr>
                        <td class="row-label" scope="row">Best For</td>
                        ${pillsCell(a)}
                        ${pillsCell(b)}
                    </tr>

                    <!-- Origin -->
                    <tr>
                        <td class="row-label" scope="row">Origin</td>
                        <td class="row-data"><span class="origin-text">${a.origin}</span></td>
                        <td class="row-data"><span class="origin-text">${b.origin}</span></td>
                    </tr>

                    <!-- Famous Practitioners -->
                    <tr>
                        <td class="row-label" scope="row">Famous<br>Practitioners</td>
                        ${practitionersCell(a)}
                        ${practitionersCell(b)}
                    </tr>

                </tbody>
            </table>
        </div>

        <!-- ── MOBILE STACKED ── -->
        <div class="mobile-compare" aria-label="Mobile comparison">
            ${mobileArtBlock(a, dClassA, rClassA, dBadgeA, rBadgeA)}
            ${mobileArtBlock(b, dClassB, rClassB, dBadgeB, rBadgeB)}
        </div>

    </section>`;
}

/* ── Update URL params without reload ───────────────────── */
function updateURL() {
    const url = new URL(window.location.href);
    if (sel1.value) url.searchParams.set('art1', sel1.value);
    else url.searchParams.delete('art1');
    if (sel2.value) url.searchParams.set('art2', sel2.value);
    else url.searchParams.delete('art2');
    window.history.replaceState({}, '', url.toString());
}

/* ── Main update function ────────────────────────────────── */
function update() {
    const a = sel1.value ? getArtById(sel1.value) : null;
    const b = sel2.value ? getArtById(sel2.value) : null;

    sel1.classList.toggle('selected', !!sel1.value);
    sel2.classList.toggle('selected', !!sel2.value);

    updateURL();

    if (a && b) {
        renderComparison(a, b);
    } else {
        renderPrompt();
    }
}

/* ── Reset ───────────────────────────────────────────────── */
btnReset.addEventListener('click', () => {
    sel1.value = '';
    sel2.value = '';
    update();
});

/* ── Event listeners ─────────────────────────────────────── */
sel1.addEventListener('change', update);
sel2.addEventListener('change', update);

/* ── Initial render ──────────────────────────────────────── */
update();
