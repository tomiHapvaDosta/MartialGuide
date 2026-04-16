/**
 * compare.js — MartialGuide Compare page functionality
 * 
 * NOTE: This file contains extracted JavaScript from compare.html
 * Full implementation should include:
 * - Dropdown population from MARTIAL_ARTS
 * - URL parameter parsing (?art1=, ?art2=)
 * - Comparison table rendering
 * - Mobile stacked layout rendering
 * - Stat highlighting (better/worse)
 * - Equipment cost calculation and comparison
 * - Badge styling
 * - Reset functionality
 */

injectNavbar(document.getElementById('navbar-container'));
injectFooter(document.getElementById('footer-container'));

/* ── DOM refs ─────────────────────────────────────────────── */
const sel1 = document.getElementById('select-art1');
const sel2 = document.getElementById('select-art2');
const output = document.getElementById('compare-output');
const btnReset = document.getElementById('btn-reset');

/* ── Populate dropdowns from data.js ──────────────────────── */
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

/* ── Render: prompt state ────────────────────────────────– */
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

/* ── Main comparison render (simplified) ──────────────────– */
function renderComparison(a, b) {
    // Determine better/worse for stats
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

    // Render comparison table (simplified)
    output.innerHTML = `
    <section class="compare-section" aria-label="Comparison of ${a.name} and ${b.name}">
      <p>Comparing <strong>${a.name}</strong> vs <strong>${b.name}</strong></p>
      <!-- Full table rendering would go here -->
    </section>`;
}

/* ── Render main output ────────────────────────────────────– */
function render() {
    if (!sel1.value || !sel2.value) {
        renderPrompt();
    } else {
        const a = getArtById(sel1.value);
        const b = getArtById(sel2.value);
        if (a && b) {
            renderComparison(a, b);
        }
    }
}

/* ── Event listeners ─────────────────────────────────────── */
sel1.addEventListener('change', render);
sel2.addEventListener('change', render);
btnReset.addEventListener('click', () => {
    sel1.value = '';
    sel2.value = '';
    render();
});

/* ── Initial render ──────────────────────────────────────── */
render();
