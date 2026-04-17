
/* ── Layout ──────────────────────────────────────────────── */
injectNavbar(document.getElementById('navbar-container'));
injectFooter(document.getElementById('footer-container'));

/* ════════════════════════════════════════════════════════════
   QUESTIONS
════════════════════════════════════════════════════════════ */
const QUESTIONS = [
    {
        id: 'goal', type: 'choice',
        prompt: 'Why are you here?',
        cols: 4,
        options: [
            { value: 'fitness', icon: '🔥', label: 'I want to get fit and lose weight' },
            { value: 'defense', icon: '🛡️', label: 'I want to actually defend myself' },
            { value: 'compete', icon: '🏆', label: 'I want to compete and win' },
            { value: 'discipline', icon: '🧘', label: 'I want mental discipline and focus' },
        ],
    },
    {
        id: 'fitness', type: 'slider',
        prompt: 'How fit are you, honestly?',
        min: 1, max: 10, step: 1, default: 5,
        minLabel: 'Couch level', maxLabel: 'Athlete',
        liveLabels: [
            { range: [1, 3], text: "Let's be real — starting from zero" },
            { range: [4, 6], text: "Decent base to work with" },
            { range: [7, 10], text: "Already in good shape" },
        ],
    },
    {
        id: 'style', type: 'choice',
        prompt: 'Pick the situation that excites you most:',
        cols: 4,
        options: [
            { value: 'Striking', icon: '👊', label: 'Trading punches standing up' },
            { value: 'Grappling', icon: '🤼', label: 'Taking someone down and controlling them' },
            { value: 'Weapons', icon: '⚔️', label: 'Weapons and tradition' },
            { value: 'Mixed', icon: '💥', label: 'Anything goes — whatever works' },
        ],
    },
    {
        id: 'pain', type: 'slider',
        prompt: 'Can you take a hit?',
        min: 1, max: 10, step: 1, default: 5,
        minLabel: 'I bruise easily, thanks', maxLabel: 'Pain is just information',
        liveLabels: [
            { range: [1, 3], text: "Low contact only" },
            { range: [4, 6], text: "Some contact is fine" },
            { range: [7, 10], text: "Bring it on" },
        ],
    },
    {
        id: 'commitment', type: 'choice',
        prompt: 'How seriously do you want to train?',
        cols: 3,
        options: [
            { value: 'casual', icon: '😎', label: 'Casual — a few times a week for fun' },
            { value: 'committed', icon: '💪', label: 'Committed — I want to actually progress' },
            { value: 'obsessed', icon: '🔱', label: 'Obsessed — this is becoming my lifestyle' },
        ],
    },
    {
        id: 'hours', type: 'slider',
        prompt: 'How many hours a week can you realistically train?',
        min: 1, max: 15, step: 1, default: 5,
        minLabel: '1 hr / week', maxLabel: '15 hrs / week',
        liveLabels: [
            { range: [1, 3], text: "Light commitment" },
            { range: [4, 7], text: "Solid training schedule" },
            { range: [8, 15], text: "Full dedication" },
        ],
    },
    {
        id: 'fear', type: 'choice',
        prompt: "What's your biggest fear about starting?",
        cols: 4,
        options: [
            { value: 'injury', icon: '🩹', label: 'Getting injured' },
            { value: 'cost', icon: '💸', label: 'It being too expensive' },
            { value: 'skill', icon: '😬', label: 'Being the worst in the room' },
            { value: 'none', icon: '😤', label: "Honestly? None. I'm ready." },
        ],
    },
    {
        id: 'budget', type: 'slider',
        prompt: "What's your monthly budget for equipment and classes?",
        min: 0, max: 300, step: 10, default: 80,
        minLabel: '$0', maxLabel: '$300',
        prefix: '$',
        liveLabels: [
            { range: [0, 50], text: "Tight budget — needs to be affordable" },
            { range: [51, 150], text: "Reasonable investment" },
            { range: [151, 300], text: "Money isn't the issue" },
        ],
    },
    {
        id: 'personality', type: 'choice',
        prompt: 'Which of these sounds most like you?',
        cols: 4,
        options: [
            { value: 'structure', icon: '📐', label: 'I like structure, rules, and tradition' },
            { value: 'chaos', icon: '🌪️', label: 'I like chaos, improvisation, and street smarts' },
            { value: 'technical', icon: '♟️', label: 'I like technical mastery and problem solving' },
            { value: 'power', icon: '⚡', label: 'I like power, aggression, and dominance' },
        ],
    },
    {
        id: 'patience', type: 'slider',
        prompt: 'Last one. How patient are you?',
        min: 1, max: 10, step: 1, default: 5,
        minLabel: 'I want results fast', maxLabel: "I'll train for years",
        liveLabels: [
            { range: [1, 3], text: "Fast results matter to me" },
            { range: [4, 6], text: "Willing to put in the time" },
            { range: [7, 10], text: "I'm in this for the long haul" },
        ],
    },
];

/* ════════════════════════════════════════════════════════════
   STATE
════════════════════════════════════════════════════════════ */
let currentStep = 0;
const answers = {};
QUESTIONS.forEach(q => { if (q.type === 'slider') answers[q.id] = q.default; });

/* ════════════════════════════════════════════════════════════
   HELPERS
════════════════════════════════════════════════════════════ */
function badgeClass(style) {
    return ({ Striking: 'badge-striking', Grappling: 'badge-grappling', Weapons: 'badge-weapons', Mixed: 'badge-mixed' })[style] || 'badge-striking';
}
function initials(name) {
    return name.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase();
}
function getLiveLabel(q, val) {
    for (const ll of q.liveLabels) {
        if (val >= ll.range[0] && val <= ll.range[1]) return ll.text;
    }
    return '';
}
function updateTrack(input, q) {
    const pct = ((input.value - q.min) / (q.max - q.min)) * 100;
    input.style.setProperty('--pct', pct + '%');
}
function isAnswered(step) {
    const q = QUESTIONS[step];
    return q.type === 'slider' ? true : answers[q.id] !== undefined;
}

/* ════════════════════════════════════════════════════════════
   RENDER STEP
════════════════════════════════════════════════════════════ */
function renderStep(direction) {
    const q = QUESTIONS[currentStep];
    const total = QUESTIONS.length;
    const viewport = document.getElementById('question-viewport');

    // Progress & labels
    document.getElementById('progress-fill').style.width =
        ((currentStep + 1) / total * 100) + '%';
    document.getElementById('step-label').textContent =
        `Question ${currentStep + 1} of ${total}`;
    document.getElementById('step-dots').innerHTML =
        QUESTIONS.map((_, i) =>
            `<div class="step-dot ${i < currentStep ? 'done' : i === currentStep ? 'active' : ''}"></div>`
        ).join('');

    // Build panel
    const panel = document.createElement('div');
    panel.className = 'question-panel';

    if (q.type === 'choice') {
        const current = answers[q.id];
        panel.innerHTML = `
          <h2 class="question-prompt">${q.prompt}</h2>
          <div class="choice-grid cols-${q.cols}" role="group" aria-label="${q.prompt}">
            ${q.options.map(opt => `
              <div class="choice-card ${current === opt.value ? 'selected' : ''}"
                   data-value="${opt.value}"
                   role="button" tabindex="0"
                   aria-pressed="${current === opt.value}"
                   aria-label="${opt.label}">
                <span class="choice-icon" aria-hidden="true">${opt.icon}</span>
                <span class="choice-label">${opt.label}</span>
              </div>`).join('')}
          </div>`;

        // Wire after DOM insert
        setTimeout(() => {
            panel.querySelectorAll('.choice-card').forEach(card => {
                const activate = () => {
                    answers[q.id] = card.dataset.value;
                    panel.querySelectorAll('.choice-card').forEach(c => {
                        c.classList.remove('selected');
                        c.setAttribute('aria-pressed', 'false');
                    });
                    card.classList.add('selected');
                    card.setAttribute('aria-pressed', 'true');
                    updateNextBtn();
                };
                card.addEventListener('click', activate);
                card.addEventListener('keydown', e => {
                    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
                });
            });
        }, 0);

    } else {
        // Slider
        const val = answers[q.id] !== undefined ? answers[q.id] : q.default;
        panel.innerHTML = `
          <h2 class="question-prompt">${q.prompt}</h2>
          <div class="slider-section">
            <div class="slider-value-display">
              <div class="slider-big-value" id="slider-val">${(q.prefix || '') + val}</div>
              <div class="slider-live-label" id="slider-live">${getLiveLabel(q, val)}</div>
            </div>
            <input type="range" id="q-slider"
              min="${q.min}" max="${q.max}" step="${q.step}" value="${val}"
              aria-label="${q.prompt}" aria-valuemin="${q.min}" aria-valuemax="${q.max}" aria-valuenow="${val}" />
            <div class="slider-endpoints">
              <span>${q.minLabel}</span>
              <span>${q.maxLabel}</span>
            </div>
          </div>`;

        setTimeout(() => {
            const slider = panel.querySelector('#q-slider');
            updateTrack(slider, q);
            slider.addEventListener('input', () => {
                const v = Number(slider.value);
                answers[q.id] = v;
                panel.querySelector('#slider-val').textContent = (q.prefix || '') + v;
                panel.querySelector('#slider-live').textContent = getLiveLabel(q, v);
                slider.setAttribute('aria-valuenow', v);
                updateTrack(slider, q);
            });
        }, 0);
    }

    // Transition out old panel
    const old = viewport.querySelector('.question-panel');
    if (old && direction) {
        old.classList.add(direction === 'forward' ? 'out-left' : 'out-right');
        setTimeout(() => old.remove(), 290);
    } else if (old) {
        old.remove();
    }

    // Transition in new panel
    if (direction) {
        panel.classList.add(direction === 'forward' ? 'in-from-right' : 'in-from-left');
        viewport.appendChild(panel);
        requestAnimationFrame(() => requestAnimationFrame(() =>
            panel.classList.remove('in-from-right', 'in-from-left')
        ));
    } else {
        viewport.appendChild(panel);
    }

    updateNextBtn();
    updateBackBtn();
}

function updateNextBtn() {
    const btn = document.getElementById('btn-next');
    const isLast = currentStep === QUESTIONS.length - 1;
    btn.disabled = !isAnswered(currentStep);
    btn.innerHTML = isLast
        ? `See My Results <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>`
        : `Next <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>`;
}
function updateBackBtn() {
    document.getElementById('btn-back').disabled = currentStep === 0;
}

/* ════════════════════════════════════════════════════════════
   NAV EVENTS
════════════════════════════════════════════════════════════ */
document.getElementById('btn-next').addEventListener('click', () => {
    if (!isAnswered(currentStep)) return;
    if (currentStep < QUESTIONS.length - 1) {
        currentStep++;
        renderStep('forward');
    } else {
        startCalculating();
    }
});
document.getElementById('btn-back').addEventListener('click', () => {
    if (currentStep > 0) { currentStep--; renderStep('back'); }
});

/* ════════════════════════════════════════════════════════════
   SCORING
════════════════════════════════════════════════════════════ */
function scoreArt(art) {
    let score = 0;
    const cost = getTotalEquipmentCost(art);

    // Q1 — Goal → bestFor
    const goalMap = { fitness: 'Fitness', defense: 'Self-defense', compete: 'Sport', discipline: 'Discipline' };
    if (answers.goal && art.bestFor.includes(goalMap[answers.goal])) score += 25;

    // Q2 — Fitness vs fitnessRequired
    if (answers.fitness !== undefined) {
        const diff = answers.fitness - art.fitnessRequired;
        if (diff >= 0) score += 20 - Math.min(diff, 4);
        else score += Math.max(0, 20 + diff * 5);
    }

    // Q3 — Style preference
    if (answers.style && art.style === answers.style) score += 20;

    // Q4 — Pain tolerance vs injuryRisk
    if (answers.pain !== undefined) {
        const gap = art.injuryRisk - answers.pain;
        if (gap <= 0) score += 15;
        else if (gap <= 2) score += 10;
        else score += Math.max(0, 15 - gap * 3);
    }

    // Q5 — Commitment
    if (answers.commitment === 'casual' && art.fitnessRequired >= 8) score -= 10;
    if (answers.commitment === 'obsessed' && art.difficulty >= 7) score += 8;

    // Q6 — Hours
    if (answers.hours !== undefined) {
        if (answers.hours < 3 && art.difficulty >= 7) score -= 8;
        if (answers.hours >= 8 && art.fitnessRequired >= 7) score += 5;
    }

    // Q7 — Fear
    if (answers.fear === 'injury' && art.injuryRisk >= 7) score -= 12;
    if (answers.fear === 'cost' && cost > 150) score -= 10;
    if (answers.fear === 'skill' && art.difficulty >= 8) score -= 10;

    // Q8 — Budget vs cost
    if (answers.budget !== undefined) {
        const budget3mo = answers.budget * 3;
        if (cost <= budget3mo) {
            score += 12;
        } else {
            const over = (cost - budget3mo) / (budget3mo || 1);
            score += Math.max(0, 12 - over * 10);
        }
    }

    // Q9 — Personality
    const PERSONALITY = {
        structure: ['karate', 'judo', 'aikido', 'taekwondo'],
        chaos: ['krav-maga', 'boxing', 'wrestling', 'bare-knuckle'],
        technical: ['brazilian-jiu-jitsu', 'kung-fu', 'mma'],
        power: ['muay-thai', 'boxing', 'wrestling', 'kickboxing'],
    };
    if (answers.personality && PERSONALITY[answers.personality]?.includes(art.id)) score += 12;

    // Q10 — Patience vs difficulty
    if (answers.patience !== undefined) {
        if (answers.patience <= 3 && art.difficulty >= 7) score -= 10;
        if (answers.patience >= 7 && art.difficulty >= 7) score += 10;
    }

    return Math.max(0, score);
}

function computeTop3() {
    const scored = MARTIAL_ARTS
        .map(art => ({ art, score: scoreArt(art) }))
        .sort((a, b) => b.score - a.score);
    const topScore = scored[0].score || 1;
    return scored.slice(0, 3).map((e, i) => ({
        art: e.art,
        pct: Math.round((e.score / topScore) * 100),
        rank: i,
    }));
}

/* ════════════════════════════════════════════════════════════
   EXPLANATION
════════════════════════════════════════════════════════════ */
function explain(art) {
    const cost = getTotalEquipmentCost(art);
    const parts = [];

    // Style
    if (answers.style && art.style === answers.style) {
        const map = {
            Striking: 'It matches the stand-up striking you said excites you most.',
            Grappling: 'The takedowns and ground control you want are exactly what this art is built on.',
            Weapons: 'The weapons tradition and depth you are drawn to are central to this discipline.',
            Mixed: 'It covers every range — perfect for the "whatever works" mindset you described.',
        };
        if (map[answers.style]) parts.push(map[answers.style]);
    }

    // Goal
    const goalMap = { fitness: 'Fitness', defense: 'Self-defense', compete: 'Sport', discipline: 'Discipline' };
    if (answers.goal && art.bestFor.includes(goalMap[answers.goal])) {
        const map = {
            fitness: "It's one of the best arts for building a lean, conditioned body fast.",
            defense: "It's consistently rated among the most practical arts for real-world situations.",
            compete: "There's a serious competition scene — and it breeds winners.",
            discipline: "The structured progression and precise technique will rewire how you think, not just how you move.",
        };
        if (map[answers.goal]) parts.push(map[answers.goal]);
    }

    // Fitness proximity
    if (answers.fitness !== undefined && Math.abs(answers.fitness - art.fitnessRequired) <= 2) {
        parts.push(`Its fitness requirement (${art.fitnessRequired}/10) is a natural fit for where you are right now.`);
    }

    // Budget
    if (answers.budget !== undefined && cost <= answers.budget * 3) {
        parts.push(`Total gear cost is around $${cost} — comfortably within your 3-month budget.`);
    }

    if (parts.length === 0) {
        parts.push("Across all your answers, it scored the highest overall compatibility with your profile.");
    }

    return parts.slice(0, 3).join(' ');
}

function getSubheading() {
    return {
        fitness: "You want to get in shape. These arts will destroy you — in the best way.",
        defense: "You want to be dangerous. Here's where to start.",
        compete: "You want to win. These arts breed champions.",
        discipline: "You want mastery. These arts will test your patience and reward every second of it.",
    }[answers.goal] || "Here are the arts that fit your profile best.";
}

/* ════════════════════════════════════════════════════════════
   CALCULATING SCREEN
════════════════════════════════════════════════════════════ */
function startCalculating() {
    document.getElementById('quiz-card').style.display = 'none';
    const screen = document.getElementById('calculating-screen');
    screen.style.display = 'flex';

    const msgs = [
        "Analysing your pain tolerance...",
        "Matching your goals...",
        "Consulting the ancient scrolls...",
        "Your path is becoming clear...",
    ];
    const wrap = document.getElementById('calc-messages');
    wrap.style.cssText = 'position:relative;height:38px;';
    msgs.forEach(m => {
        const el = document.createElement('div');
        el.className = 'calc-message';
        el.textContent = m;
        wrap.appendChild(el);
    });

    let idx = 0;
    const allMsgs = wrap.querySelectorAll('.calc-message');
    const show = i => { allMsgs.forEach(m => m.classList.remove('visible')); allMsgs[i]?.classList.add('visible'); };
    show(0);
    const interval = setInterval(() => { idx = (idx + 1) % msgs.length; show(idx); }, 1200);

    // Kick off bar animation
    requestAnimationFrame(() => requestAnimationFrame(() => {
        document.getElementById('calc-bar').style.width = '100%';
    }));

    setTimeout(() => {
        clearInterval(interval);
        screen.style.display = 'none';
        showResults();
    }, 5000);
}

/* ════════════════════════════════════════════════════════════
   SHOW RESULTS
════════════════════════════════════════════════════════════ */
function showResults() {
    const top3 = computeTop3();

    document.getElementById('results-subheading').textContent = getSubheading();

    const list = document.getElementById('results-list');
    list.innerHTML = '';

    const rankLabels = ['1st Match', '2nd Match', '3rd Match'];
    const rankClasses = ['rank-1', 'rank-2', 'rank-3'];

    top3.forEach((entry, i) => {
        const { art, pct } = entry;
        const compareHref = i === 0 && top3[1]
            ? `compare.html?art1=${top3[0].art.id}&art2=${top3[1].art.id}`
            : `compare.html?art1=${art.id}`;

        const card = document.createElement('article');
        card.className = 'result-card';
        card.innerHTML = `
          <div class="result-card-img" aria-hidden="true">
            <div class="result-card-img-initials">${initials(art.name)}</div>
            <span class="rank-badge ${rankClasses[i]}">${rankLabels[i]}</span>
            <span class="match-pct" aria-label="${pct}% match">${pct}%</span>
          </div>
          <div class="result-card-body">
            <div>
              <div class="result-card-name">${art.name}</div>
              <span class="style-badge ${badgeClass(art.style)}">${art.style}</span>
            </div>
            <p class="result-explanation">${explain(art)}</p>
            <div class="result-card-actions">
              <a href="art-template.html?id=${art.id}" class="btn btn-dark btn-sm">Learn more</a>
              <a href="${compareHref}" class="btn btn-outline btn-sm">
                ${i === 0 ? 'Compare top 2' : 'Compare arts'}
              </a>
            </div>
          </div>`;

        list.appendChild(card);
        setTimeout(() => card.classList.add('revealed'), i * 400 + 100);
    });

    document.getElementById('results-screen').style.display = 'flex';
}

/* ════════════════════════════════════════════════════════════
   RETAKE
════════════════════════════════════════════════════════════ */
document.getElementById('btn-retake').addEventListener('click', () => {
    currentStep = 0;
    Object.keys(answers).forEach(k => delete answers[k]);
    QUESTIONS.forEach(q => { if (q.type === 'slider') answers[q.id] = q.default; });

    // Reset calc bar (no transition)
    const bar = document.getElementById('calc-bar');
    bar.style.transition = 'none';
    bar.style.width = '0%';
    document.getElementById('calc-messages').innerHTML = '';

    document.getElementById('quiz-card').style.display = '';
    document.getElementById('calculating-screen').style.display = 'none';
    document.getElementById('results-screen').style.display = 'none';
    document.getElementById('question-viewport').innerHTML = '';

    renderStep(null);

    // Re-enable calc bar transition after reset
    setTimeout(() => { bar.style.transition = 'width 5s linear'; }, 50);
});

/* ════════════════════════════════════════════════════════════
   BOOT
════════════════════════════════════════════════════════════ */
renderStep(null);