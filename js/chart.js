
/* ── Layout ─────────────────────────────────────────────── */
injectNavbar(document.getElementById('navbar-container'));
injectFooter(document.getElementById('footer-container'));

/* ════════════════════════════════════════════════════════
   COLOR MAP (fixed per art)
════════════════════════════════════════════════════════ */
const ART_COLORS = {
    'muay-thai': '#E63946',
    'brazilian-jiu-jitsu': '#2196F3',
    'boxing': '#FF9800',
    'judo': '#9C27B0',
    'karate': '#009688',
    'taekwondo': '#8BC34A',
    'wrestling': '#795548',
    'krav-maga': '#607D8B',
    'kung-fu': '#F06292',
    'aikido': '#FFD600',
    /* extras — generated hues for any new arts added to data.js */
    'kickboxing': '#FF5722',
    'mma': '#212121',
    'bare-knuckle': '#6D4C41',
};

function getColor(id) {
    return ART_COLORS[id] || '#999999';
}

/* ════════════════════════════════════════════════════════
   STAT AXES DEFINITION
════════════════════════════════════════════════════════ */

// Normalise equipment cost to 0–10 across all arts
const allCosts = MARTIAL_ARTS.map(a => getTotalEquipmentCost(a));
const minCost = Math.min(...allCosts);
const maxCost = Math.max(...allCosts);

function normaliseCost(art) {
    const cost = getTotalEquipmentCost(art);
    if (maxCost === minCost) return 5;
    return +(((cost - minCost) / (maxCost - minCost)) * 10).toFixed(2);
}

const AXES = [
    { id: 'difficulty', label: 'Difficulty', icon: '⚡', getValue: a => a.difficulty },
    { id: 'injuryRisk', label: 'Injury Risk', icon: '🩹', getValue: a => a.injuryRisk },
    { id: 'fitnessRequired', label: 'Fitness Required', icon: '💪', getValue: a => a.fitnessRequired },
    { id: 'equipmentCost', label: 'Equipment Cost', icon: '💰', getValue: a => normaliseCost(a) },
];

/* ════════════════════════════════════════════════════════
   STATE  (read from URL first, then default to all on)
════════════════════════════════════════════════════════ */
const urlParams = new URLSearchParams(window.location.search);
const urlArts = urlParams.get('arts') ? urlParams.get('arts').split(',') : null;
const urlAxes = urlParams.get('axes') ? urlParams.get('axes').split(',') : null;

const selectedArts = new Set(urlArts || MARTIAL_ARTS.map(a => a.id));
const selectedAxes = new Set(urlAxes || AXES.map(a => a.id));

/* Clamp: ensure at least first 3 axes are on if URL gave too few */
while (selectedAxes.size < 3) selectedAxes.add(AXES[selectedAxes.size].id);

/* ════════════════════════════════════════════════════════
   BUILD CONTROLS
════════════════════════════════════════════════════════ */

/* Art pills */
const artPillsEl = document.getElementById('art-pills');
MARTIAL_ARTS.forEach(art => {
    const color = getColor(art.id);
    const row = document.createElement('div');
    row.className = 'art-pill-row';

    const pill = document.createElement('button');
    pill.className = 'art-pill' + (selectedArts.has(art.id) ? ' active' : '');
    pill.style.setProperty('--art-color', color);
    pill.dataset.id = art.id;
    pill.setAttribute('aria-pressed', selectedArts.has(art.id));
    pill.innerHTML = `<span class="art-pill-dot"></span>${art.name}`;

    const link = document.createElement('a');
    link.className = 'art-view-link';
    link.href = `art-template.html?id=${art.id}`;
    link.textContent = 'View →';
    link.setAttribute('aria-label', `View ${art.name} detail page`);

    // Toggle
    pill.addEventListener('click', () => {
        if (selectedArts.has(art.id)) {
            selectedArts.delete(art.id);
            pill.classList.remove('active');
            pill.setAttribute('aria-pressed', 'false');
        } else {
            selectedArts.add(art.id);
            pill.classList.add('active');
            pill.setAttribute('aria-pressed', 'true');
        }
        updateChart();
        syncURL();
    });

    // Hover highlight
    pill.addEventListener('mouseenter', () => highlightArt(art.id));
    pill.addEventListener('mouseleave', () => resetHighlight());

    row.appendChild(pill);
    row.appendChild(link);
    artPillsEl.appendChild(row);
});

/* Select all / Clear all */
document.getElementById('btn-select-all').addEventListener('click', () => {
    MARTIAL_ARTS.forEach(a => selectedArts.add(a.id));
    artPillsEl.querySelectorAll('.art-pill').forEach(p => {
        p.classList.add('active');
        p.setAttribute('aria-pressed', 'true');
    });
    updateChart();
    syncURL();
});
document.getElementById('btn-clear-all').addEventListener('click', () => {
    selectedArts.clear();
    artPillsEl.querySelectorAll('.art-pill').forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-pressed', 'false');
    });
    updateChart();
    syncURL();
});

/* Axis pills */
const axisPillsEl = document.getElementById('axis-pills');
AXES.forEach(axis => {
    const pill = document.createElement('button');
    pill.className = 'axis-pill' + (selectedAxes.has(axis.id) ? ' active' : '');
    pill.dataset.id = axis.id;
    pill.setAttribute('aria-pressed', selectedAxes.has(axis.id));
    pill.innerHTML = `<span class="axis-pill-icon" aria-hidden="true">${axis.icon}</span>${axis.label}`;

    pill.addEventListener('click', () => {
        if (selectedAxes.has(axis.id)) {
            if (selectedAxes.size <= 3) {
                // Show warning — don't deselect
                const warn = document.getElementById('axis-warning');
                warn.classList.add('visible');
                setTimeout(() => warn.classList.remove('visible'), 2800);
                return;
            }
            selectedAxes.delete(axis.id);
            pill.classList.remove('active');
            pill.setAttribute('aria-pressed', 'false');
        } else {
            selectedAxes.add(axis.id);
            pill.classList.add('active');
            pill.setAttribute('aria-pressed', 'true');
        }
        updateChart();
        syncURL();
    });

    axisPillsEl.appendChild(pill);
});

/* ════════════════════════════════════════════════════════
   CHART.JS SETUP
════════════════════════════════════════════════════════ */
const ctx = document.getElementById('radar-chart').getContext('2d');
let chart = null;

function buildDatasets() {
    return MARTIAL_ARTS
        .filter(a => selectedArts.has(a.id))
        .map(art => {
            const color = getColor(art.id);
            const data = AXES.filter(ax => selectedAxes.has(ax.id)).map(ax => ax.getValue(art));
            return {
                label: art.name,
                data,
                backgroundColor: hexToRgba(color, 0.12),
                borderColor: color,
                pointBackgroundColor: color,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: color,
                pointRadius: 4,
                pointHoverRadius: 6,
                borderWidth: 2,
                fill: true,
            };
        });
}

function buildLabels() {
    return AXES.filter(ax => selectedAxes.has(ax.id)).map(ax => ax.label);
}

function createChart() {
    if (chart) { chart.destroy(); chart = null; }
    chart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: buildLabels(),
            datasets: buildDatasets(),
        },
        options: {
            animation: { duration: 350, easing: 'easeInOutQuart' },
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'point' },
            plugins: {
                legend: { display: false }, // we handle legend via pills
                tooltip: {
                    backgroundColor: 'rgba(26,26,26,0.9)',
                    titleFont: { family: "'DM Sans', sans-serif", size: 12, weight: '700' },
                    bodyFont: { family: "'DM Sans', sans-serif", size: 12 },
                    padding: 10,
                    cornerRadius: 8,
                    callbacks: {
                        title: items => items[0].dataset.label,
                        label: item => ` ${item.label}: ${item.raw}`,
                    },
                },
            },
            scales: {
                r: {
                    min: 0,
                    max: 10,
                    ticks: {
                        stepSize: 2,
                        font: { family: "'DM Sans', sans-serif", size: 10 },
                        color: '#bbb',
                        backdropColor: 'transparent',
                    },
                    grid: { color: 'rgba(0,0,0,0.06)' },
                    angleLines: { color: 'rgba(0,0,0,0.08)' },
                    pointLabels: {
                        font: { family: "'DM Sans', sans-serif", size: 12, weight: '600' },
                        color: '#555',
                    },
                },
            },
        },
    });
}

function updateChart() {
    const arts = MARTIAL_ARTS.filter(a => selectedArts.has(a.id));
    const wrap = document.getElementById('chart-wrap');
    const empty = document.getElementById('chart-empty');

    // Show empty state if nothing to display
    if (arts.length === 0 || selectedAxes.size < 3) {
        wrap.style.display = 'none';
        empty.classList.add('visible');
        if (chart) { chart.destroy(); chart = null; }
        updateSubtitle();
        return;
    }

    wrap.style.display = '';
    empty.classList.remove('visible');

    if (!chart) {
        createChart();
    } else {
        chart.data.labels = buildLabels();
        chart.data.datasets = buildDatasets();
        chart.update();
    }

    updateSubtitle();
}

function updateSubtitle() {
    const artCount = selectedArts.size;
    const axisCount = selectedAxes.size;
    const el = document.getElementById('chart-subtitle');
    const artWord = artCount === 1 ? 'art' : 'arts';
    const axisWord = axisCount === 1 ? 'axis' : 'axes';
    el.textContent = `${artCount} ${artWord} · ${axisCount} ${axisWord}`;
}

/* ════════════════════════════════════════════════════════
   HOVER HIGHLIGHT
════════════════════════════════════════════════════════ */
function highlightArt(id) {
    if (!chart) return;
    chart.data.datasets.forEach(ds => {
        const isTarget = ds.label === MARTIAL_ARTS.find(a => a.id === id)?.name;
        ds.borderWidth = isTarget ? 3.5 : 1;
        const color = isTarget
            ? hexToRgba(ds.borderColor, 0.22)
            : hexToRgba(ds.borderColor, 0.05);
        ds.backgroundColor = color;
    });
    chart.update('none'); // no animation on hover for snappiness
}

function resetHighlight() {
    if (!chart) return;
    chart.data.datasets.forEach(ds => {
        ds.borderWidth = 2;
        ds.backgroundColor = hexToRgba(ds.borderColor, 0.12);
    });
    chart.update('none');
}

/* ════════════════════════════════════════════════════════
   URL SYNC
════════════════════════════════════════════════════════ */
function syncURL() {
    const url = new URL(window.location.href);
    url.searchParams.set('arts', [...selectedArts].join(','));
    url.searchParams.set('axes', [...selectedAxes].join(','));
    window.history.replaceState({}, '', url.toString());
}

/* ════════════════════════════════════════════════════════
   DOWNLOAD
════════════════════════════════════════════════════════ */
document.getElementById('btn-download').addEventListener('click', () => {
    if (!chart) return;
    const link = document.createElement('a');
    link.download = 'martialguide-chart.png';
    link.href = chart.toBase64Image('image/png', 1);
    link.click();
});

/* ════════════════════════════════════════════════════════
   UTILITY
════════════════════════════════════════════════════════ */
function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
}

/* ════════════════════════════════════════════════════════
   BOOT
════════════════════════════════════════════════════════ */
updateChart();
syncURL();
