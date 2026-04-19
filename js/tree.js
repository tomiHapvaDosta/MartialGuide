
/* ── Layout ──────────────────────────────────────────────── */
injectNavbar(document.getElementById('navbar-container'));
injectFooter(document.getElementById('footer-container'));

/* ════════════════════════════════════════════════════════════
   GROUPING DEFINITIONS
════════════════════════════════════════════════════════════ */

// Normalise equipment cost
const allCosts = MARTIAL_ARTS.map(a => a.equipmentList.reduce((s, e) => s + e.estimatedCostUSD, 0));
function artCost(art) { return art.equipmentList.reduce((s, e) => s + e.estimatedCostUSD, 0); }

// Origin region
const ORIGIN_MAP = {
    'Thailand': 'Asia', 'Japan': 'Asia', 'Japan (Okinawa)': 'Asia',
    'China': 'Asia', 'South Korea': 'Asia',
    'Brazil': 'Americas', 'United States': 'Americas',
    'Japan / United States': 'Americas',
    'Israel': 'Middle East',
    'United Kingdom': 'Europe',
    'Ancient Greece': 'Europe',
};
function artOrigin(art) {
    for (const [key, region] of Object.entries(ORIGIN_MAP)) {
        if (art.origin.includes(key.split('/')[0].trim())) return region;
    }
    return 'Other';
}

const GROUPINGS = {
    style: {
        label: 'Style',
        getGroup: art => art.style,
        colors: {
            'Striking': '#E63946',
            'Grappling': '#2196F3',
            'Weapons': '#FF9800',
            'Mixed': '#9C27B0',
        },
    },
    bestFor: {
        label: 'Best For',
        getGroup: art => art.bestFor[0],
        colors: {
            'Self-defense': '#E63946',
            'Sport': '#2196F3',
            'Fitness': '#8BC34A',
            'Discipline': '#9C27B0',
        },
    },
    origin: {
        label: 'Origin',
        getGroup: artOrigin,
        colors: {
            'Asia': '#FF9800',
            'Europe': '#2196F3',
            'Americas': '#8BC34A',
            'Middle East': '#E63946',
            'Other': '#9C27B0',
        },
    },
    difficulty: {
        label: 'Difficulty',
        getGroup: art => {
            if (art.difficulty <= 3) return 'Beginner';
            if (art.difficulty <= 6) return 'Intermediate';
            return 'Advanced';
        },
        colors: {
            'Beginner': '#8BC34A',
            'Intermediate': '#FF9800',
            'Advanced': '#E63946',
        },
    },
    cost: {
        label: 'Cost',
        getGroup: art => {
            const c = artCost(art);
            if (c <= 100) return 'Budget';
            if (c <= 250) return 'Mid';
            return 'Premium';
        },
        colors: {
            'Budget': '#8BC34A',
            'Mid': '#FF9800',
            'Premium': '#E63946',
        },
    },
};

/* ════════════════════════════════════════════════════════════
   STATE
════════════════════════════════════════════════════════════ */
const urlP = new URLSearchParams(window.location.search);
let activeGroup = urlP.get('group') || 'style';
let activeFilters = urlP.get('filter')
    ? new Set(urlP.get('filter').split(','))
    : null; // null = show all

let selectedArtId = null;

/* ════════════════════════════════════════════════════════════
   HELPERS
════════════════════════════════════════════════════════════ */
function initials(name) {
    return name.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase();
}
function badgeClass(style) {
    return ({ Striking: 'badge-striking', Grappling: 'badge-grappling', Weapons: 'badge-weapons', Mixed: 'badge-mixed' })[style] || 'badge-striking';
}
function syncURL() {
    const url = new URL(window.location.href);
    url.searchParams.set('group', activeGroup);
    if (activeFilters) url.searchParams.set('filter', [...activeFilters].join(','));
    else url.searchParams.delete('filter');
    window.history.replaceState({}, '', url.toString());
}

/* ════════════════════════════════════════════════════════════
   BUILD TREE DATA
════════════════════════════════════════════════════════════ */
function buildTreeData() {
    const grouping = GROUPINGS[activeGroup];
    const grouped = {};

    MARTIAL_ARTS.forEach(art => {
        const grp = grouping.getGroup(art);
        if (!grouped[grp]) grouped[grp] = [];
        grouped[grp].push(art);
    });

    const children = Object.entries(grouped).map(([name, arts]) => {
        // Apply filter
        const visible = !activeFilters || activeFilters.has(name.toLowerCase().replace(/\s+/g, '-'));
        return {
            name,
            color: grouping.colors[name] || '#999',
            visible,
            children: arts.map(art => ({
                name: art.name,
                artId: art.id,
                art,
                color: grouping.colors[name] || '#999',
                visible,
            })),
        };
    });

    return { name: 'MartialGuide', children };
}

/* ════════════════════════════════════════════════════════════
   FILTER CONTROLS
════════════════════════════════════════════════════════════ */
function renderFilterPills() {
    const grouping = GROUPINGS[activeGroup];
    const cats = Object.keys(grouping.colors);
    const container = document.getElementById('filter-pills');
    container.innerHTML = '';

    cats.forEach(cat => {
        const key = cat.toLowerCase().replace(/\s+/g, '-');
        const active = !activeFilters || activeFilters.has(key);
        const pill = document.createElement('button');
        pill.className = 'filter-pill' + (active ? ' active' : '');
        pill.textContent = cat;
        pill.dataset.key = key;
        pill.style.setProperty('--pill-color', grouping.colors[cat]);
        pill.addEventListener('click', () => toggleFilter(key, pill, grouping.colors[cat]));
        container.appendChild(pill);
    });
}

function toggleFilter(key, pill, color) {
    if (!activeFilters) {
        // was showing all — switch to showing only clicked
        const grouping = GROUPINGS[activeGroup];
        const allKeys = Object.keys(grouping.colors).map(c => c.toLowerCase().replace(/\s+/g, '-'));
        activeFilters = new Set(allKeys);
    }

    if (activeFilters.has(key)) {
        activeFilters.delete(key);
        pill.classList.remove('active');
    } else {
        activeFilters.add(key);
        pill.classList.add('active');
    }
    if (activeFilters.size === 0) activeFilters = null;
    syncURL();
    renderTree(true);
}

document.getElementById('btn-show-all').addEventListener('click', () => {
    activeFilters = null;
    renderFilterPills();
    syncURL();
    renderTree(true);
});

/* ════════════════════════════════════════════════════════════
   GROUP BY CONTROLS
════════════════════════════════════════════════════════════ */
document.querySelectorAll('.group-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.dataset.group === activeGroup) return;
        document.querySelectorAll('.group-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeGroup = btn.dataset.group;
        activeFilters = null;
        selectedArtId = null;
        closeDetail();
        renderFilterPills();
        syncURL();
        renderTree(true);
    });
});
// Set initial active button
document.querySelector(`[data-group="${activeGroup}"]`)?.classList.add('active');
document.querySelectorAll('.group-btn').forEach(b => {
    if (b.dataset.group !== activeGroup) b.classList.remove('active');
});

/* ════════════════════════════════════════════════════════════
   D3 RADIAL TREE
════════════════════════════════════════════════════════════ */
const svg = d3.select('#tree-svg');
const tooltip = document.getElementById('tree-tooltip');
let gMain, width, height, currentRoot;

function getDimensions() {
    const wrap = document.getElementById('canvas-wrap');
    width = wrap.clientWidth;
    height = Math.max(window.innerWidth <= 760 ? 600 : 900, Math.min(width, 1200));
    return { width, height };
}

let panX = 0, panY = 0;
let isDragging = false;
let dragStartX = 0, dragStartY = 0;

function renderTree(animate) {
    const { width, height } = getDimensions();
    const radius = Math.min(width, height) / 2 - 80;

    svg.attr('width', width).attr('height', height);

    // Add filter definitions for shadows
    let defs = svg.select('defs');
    if (defs.empty()) {
        defs = svg.append('defs');
    }
    if (defs.select('filter#shadow').empty()) {
        const filter = defs.append('filter').attr('id', 'shadow')
            .attr('x', '-50%').attr('y', '-50%')
            .attr('width', '200%').attr('height', '200%');
        filter.append('feDropShadow')
            .attr('dx', 0).attr('dy', 1)
            .attr('stdDeviation', 1.5)
            .attr('flood-opacity', 0.25);
    }

    // Remove old group, create fresh
    svg.selectAll('g.main-g').remove();
    gMain = svg.append('g')
        .attr('class', 'main-g')
        .attr('transform', `translate(${width / 2 + panX},${height / 2 + panY})`);

    // Add drag functionality
    svg.on('mousedown', function (event) {
        isDragging = true;
        dragStartX = event.clientX - panX;
        dragStartY = event.clientY - panY;
        svg.style('cursor', 'grabbing');
    })
        .on('mousemove', function (event) {
            if (!isDragging) return;
            panX = event.clientX - dragStartX;
            panY = event.clientY - dragStartY;
            gMain.attr('transform', `translate(${width / 2 + panX},${height / 2 + panY})`);
        })
        .on('mouseup', function () {
            isDragging = false;
            svg.style('cursor', 'grab');
        })
        .on('mouseleave', function () {
            isDragging = false;
            svg.style('cursor', 'grab');
        });

    // Build hierarchy
    const data = buildTreeData();
    const root = d3.hierarchy(data);
    currentRoot = root;

    // Layout
    const tree = d3.tree()
        .size([2 * Math.PI, radius])
        .separation((a, b) => (a.parent === b.parent ? 1 : 2) / a.depth);

    tree(root);

    // ── LINKS ──
    const linkGen = d3.linkRadial()
        .angle(d => d.x)
        .radius(d => d.y);

    const links = root.links().filter(l => {
        // Only show links where target is visible
        const tgt = l.target;
        if (tgt.data.visible === false) return false;
        if (tgt.parent?.data.visible === false) return false;
        return true;
    });

    gMain.selectAll('.link')
        .data(links)
        .join(
            enter => enter.append('path')
                .attr('class', 'link')
                .attr('d', linkGen)
                .attr('fill', 'none')
                .attr('stroke', d => {
                    // Color from parent (category) node
                    const src = d.source.depth === 0 ? '#ccc' : d.source.data.color || '#ccc';
                    return src;
                })
                .attr('stroke-opacity', animate ? 0 : 0.35)
                .attr('stroke-width', 1.5)
                .call(enter => animate
                    ? enter.transition().duration(600).attr('stroke-opacity', 0.35)
                    : enter
                ),
            update => update
                .transition().duration(600)
                .attr('d', linkGen)
                .attr('stroke-opacity', 0.35),
            exit => exit.transition().duration(300).attr('stroke-opacity', 0).remove()
        )
        .on('mouseenter', function () {
            d3.select(this).raise().attr('stroke-opacity', 0.85).attr('stroke-width', 2.5);
        })
        .on('mouseleave', function () {
            d3.select(this).attr('stroke-opacity', 0.35).attr('stroke-width', 1.5);
        });

    // ── NODES ──
    const visibleNodes = root.descendants().filter(d => {
        if (d.depth === 0) return true;
        if (d.depth === 1) return d.data.visible !== false;
        return d.parent?.data.visible !== false;
    });

    const nodeGroup = gMain.selectAll('.node-g')
        .data(visibleNodes, d => d.data.artId || d.data.name)
        .join(
            enter => {
                const g = enter.append('g')
                    .attr('class', 'node-g')
                    .attr('transform', d => `rotate(${(d.x * 180 / Math.PI - 90)}) translate(${d.y},0)`)
                    .style('opacity', animate ? 0 : 1)
                    .style('cursor', d => d.depth === 0 ? 'default' : 'pointer');

                if (animate) {
                    g.transition().duration(600)
                        .delay((_, i) => i * 30)
                        .style('opacity', 1);
                }
                return g;
            },
            update => update
                .transition().duration(600)
                .attr('transform', d => `rotate(${(d.x * 180 / Math.PI - 90)}) translate(${d.y},0)`)
                .style('opacity', 1),
            exit => exit
                .transition().duration(300)
                .style('opacity', 0)
                .remove()
        );

    // Draw circles per node
    nodeGroup.each(function (d) {
        const g = d3.select(this);
        g.selectAll('*').remove(); // clear on redraw

        if (d.depth === 0) {
            // ROOT
            g.append('circle')
                .attr('r', 32)
                .attr('fill', '#1a1a1a')
                .attr('stroke', '#fff')
                .attr('stroke-width', 3.5)
                .attr('filter', 'url(#shadow)');
            g.append('text')
                .attr('text-anchor', 'middle')
                .attr('dominant-baseline', 'middle')
                .attr('fill', '#fff')
                .attr('font-family', "'Bebas Neue', sans-serif")
                .attr('font-size', '13px')
                .attr('letter-spacing', '0.08em')
                .text('MARTIALGUIDE');

        } else if (d.depth === 1) {
            // CATEGORY
            const childCount = d.children?.length || 0;
            const r = 20 + childCount * 1.5;
            const col = d.data.color || '#999';

            g.append('circle')
                .attr('r', r)
                .attr('fill', col)
                .attr('fill-opacity', 0.45)
                .attr('stroke', col)
                .attr('stroke-width', 2.5)
                .attr('filter', 'url(#shadow)');

            // Label — always horizontal at top (counter-rotate)
            const angle = d.x * 180 / Math.PI - 90;
            g.append('text')
                .attr('transform', `rotate(${-angle}) translate(0, -${22})`)
                .attr('text-anchor', 'middle')
                .attr('dominant-baseline', 'middle')
                .attr('fill', col)
                .attr('font-family', "'DM Sans', sans-serif")
                .attr('font-size', '16px')
                .attr('font-weight', '700')
                .attr('letter-spacing', '0.05em')
                .text(d.data.name.toUpperCase());

        } else {
            // ART (leaf)
            const r = 24;
            const col = d.data.color || '#999';
            const uid = 'clip-' + (d.data.artId || d.data.name).replace(/[^a-z0-9]/gi, '');

            // Clip path for circular image
            const defs = svg.select('defs').empty() ? svg.append('defs') : svg.select('defs');
            defs.append('clipPath').attr('id', uid)
                .append('circle').attr('r', r);

            // Background circle
            g.append('circle')
                .attr('r', r)
                .attr('fill', col)
                .attr('fill-opacity', 0.5)
                .attr('stroke', col)
                .attr('stroke-width', 2.5)
                .attr('class', 'art-ring')
                .attr('filter', 'url(#shadow)');

            // Initials fallback (always shown; image drawn on top)
            const angle = d.x * 180 / Math.PI - 90;
            g.append('text')
                .attr('class', 'art-initials')
                .attr('transform', `rotate(${-(angle)})`)
                .attr('text-anchor', 'middle')
                .attr('dominant-baseline', 'middle')
                .attr('fill', col)
                .attr('font-family', "'Bebas Neue', sans-serif")
                .attr('font-size', '15px')
                .attr('letter-spacing', '0.06em')
                .attr('font-weight', '700')
                .text(initials(d.data.name));

            // Art name label (horizontal, above circle)
            const labelR = r + 8;
            g.append('text')
                .attr('class', 'art-label')
                .attr('transform', `rotate(${-angle}) translate(0, -${labelR})`)
                .attr('text-anchor', 'middle')
                .attr('dominant-baseline', 'middle')
                .attr('fill', '#333')
                .attr('font-family', "'DM Sans', sans-serif")
                .attr('font-size', '15px')
                .attr('font-weight', '700')
                .text(d.data.name);
        }
    });

    // ── INTERACTIONS ──
    nodeGroup.on('mouseenter', function (event, d) {
        if (d.depth === 0) return;
        const art = d.data.art;
        let tipText = d.data.name;
        if (art) tipText += ` · Difficulty ${art.difficulty}/10`;
        tooltip.textContent = tipText;
        tooltip.classList.add('visible');
    })
        .on('mousemove', event => {
            tooltip.style.left = (event.clientX + 14) + 'px';
            tooltip.style.top = (event.clientY - 28) + 'px';
        })
        .on('mouseleave', () => tooltip.classList.remove('visible'))
        .on('click', function (event, d) {
            event.stopPropagation();
            if (d.depth === 0) { resetHighlight(nodeGroup); closeDetail(); return; }
            if (d.depth === 1) { highlightBranch(d, nodeGroup); return; }
            if (d.depth === 2) { highlightArt(d, nodeGroup); openDetail(d.data.art); }
        });

    // Click on empty SVG resets
    svg.on('click', () => { resetHighlight(nodeGroup); closeDetail(); });

    // Apply selection state if one was active
    if (selectedArtId) {
        const target = visibleNodes.find(d => d.data.artId === selectedArtId);
        if (target) highlightArt(target, nodeGroup);
    }
}

/* ── HIGHLIGHT HELPERS ───────────────────────────────────── */
function resetHighlight(nodeGroup) {
    selectedArtId = null;
    (nodeGroup || gMain?.selectAll('.node-g'))
        .transition().duration(300)
        .style('opacity', 1);
    gMain?.selectAll('.link')
        .transition().duration(300)
        .attr('stroke-opacity', 0.35);
}

function highlightBranch(catNode, nodeGroup) {
    const branchNames = new Set(
        catNode.children?.map(c => c.data.name) || []
    );
    branchNames.add(catNode.data.name);
    nodeGroup.transition().duration(300)
        .style('opacity', d => {
            if (d.depth === 0) return 1;
            if (d.depth === 1) return d.data.name === catNode.data.name ? 1 : 0.15;
            return branchNames.has(d.data.name) ? 1 : 0.15;
        });
}

function highlightArt(artNode, nodeGroup) {
    selectedArtId = artNode.data.artId;
    nodeGroup.transition().duration(300)
        .style('opacity', d => {
            if (d.depth === 0) return 1;
            if (d.data.artId === artNode.data.artId) return 1;
            return 0.18;
        });
}

/* ════════════════════════════════════════════════════════════
   DETAIL PANEL
════════════════════════════════════════════════════════════ */
function openDetail(art) {
    if (!art) return;
    const cost = art.equipmentList.reduce((s, e) => s + e.estimatedCostUSD, 0);

    document.getElementById('detail-initials').textContent = initials(art.name);
    document.getElementById('detail-name').textContent = art.name;
    document.getElementById('detail-origin').textContent = art.origin;

    const badge = document.getElementById('detail-badge');
    badge.textContent = art.style;
    badge.className = `style-badge ${badgeClass(art.style)}`;

    // Stat bars
    const statsEl = document.getElementById('detail-stats');
    statsEl.innerHTML = [
        { label: 'Difficulty', val: art.difficulty, cls: 'fill-blue' },
        { label: 'Injury Risk', val: art.injuryRisk, cls: 'fill-red' },
        { label: 'Fitness Required', val: art.fitnessRequired, cls: 'fill-green' },
    ].map(s => `
        <div class="detail-stat-item">
          <span class="detail-stat-label">${s.label}</span>
          <div class="detail-stat-track">
            <div class="detail-stat-fill ${s.cls}" style="width:${s.val * 10}%"></div>
          </div>
          <span class="detail-stat-val">${s.val}</span>
        </div>`).join('');

    document.getElementById('detail-cost').innerHTML =
        `<span>Equipment cost</span> ~$${cost}`;

    document.getElementById('detail-pills').innerHTML =
        art.bestFor.map(t => `<span class="detail-pill">${t}</span>`).join('');

    document.getElementById('detail-actions').innerHTML = `
        <a href="art-template.html?id=${art.id}" class="btn-detail btn-detail-dark">Full details →</a>
        <a href="compare.html?art1=${art.id}" class="btn-detail btn-detail-outline">Add to compare →</a>`;

    const panel = document.getElementById('detail-panel');
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
}

function closeDetail() {
    const panel = document.getElementById('detail-panel');
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    selectedArtId = null;
}

document.getElementById('detail-close').addEventListener('click', () => {
    closeDetail();
    if (gMain) resetHighlight(gMain.selectAll('.node-g'));
});

/* ════════════════════════════════════════════════════════════
   RESIZE
════════════════════════════════════════════════════════════ */
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => renderTree(false), 180);
});

/* ════════════════════════════════════════════════════════════
   BOOT
════════════════════════════════════════════════════════════ */
renderFilterPills();
renderTree(true);
syncURL();