
/* ── Layout ─────────────────────────────────────────────── */
injectNavbar(document.getElementById('navbar-container'));
injectFooter(document.getElementById('footer-container'));

/* ─────────────────────────────────────────────────────────
   QUESTIONS DEFINITION
───────────────────────────────────────────────────────── */
const QUESTIONS = [
    {
        id: 'fitness',
        text: 'How fit are you currently?',
        hint: 'Think about your cardio, strength, and overall activity level.',
        min: 1, max: 10, step: 1, default: 5,
        minLabel: 'Not at all', maxLabel: 'Very fit',
        unit: '/ 10',
    },
    {
        id: 'pain',
        text: 'How comfortable are you with pain or contact?',
        hint: 'Some arts are full-contact; others are cooperative and low-impact.',
        min: 1, max: 10, step: 1, default: 5,
        minLabel: 'No contact', maxLabel: 'Full contact',
        unit: '/ 10',
    },
    {
        id: 'goal',
        text: 'What is your main goal?',
        hint: 'Slide left for fitness and fun, right for real-world self-defence.',
        min: 1, max: 10, step: 1, default: 5,
        minLabel: 'Fitness / fun', maxLabel: 'Self-defence',
        unit: '/ 10',
    },
    {
        id: 'budget',
        text: 'How much can you spend on equipment per month?',
        hint: 'Include clothing, protective gear, and any equipment needed.',
        min: 0, max: 200, step: 10, default: 60,
        minLabel: '$0', maxLabel: '$200',
        unit: 'USD / mo',
        prefix: '$',
    },
    {
        id: 'time',
        text: 'How many hours per week can you train?',
        hint: 'Be realistic — consistency matters more than intensity.',
        min: 1, max: 15, step: 1, default: 4,
        minLabel: '1 hr', maxLabel: '15 hrs',
        unit: 'hrs / week',
    },
];

/* ─────────────────────────────────────────────────────────
   STATE
───────────────────────────────────────────────────────── */
let currentStep = 0;
const answers = {};
QUESTIONS.forEach(q => { answers[q.id] = q.default; });

/* ─────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────── */
function badgeClass(style) {
    return { Striking: 'badge-striking', Grappling: 'badge-grappling', Weapons: 'badge-weapons', Mixed: 'badge-mixed' }[style] || 'badge-striking';
}

function initials(name) {
    return name.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase();
}

/** Update the filled-track gradient on a range input */
function updateTrack(input, q) {
    const pct = ((input.value - q.min) / (q.max - q.min)) * 100;
    input.style.setProperty('--pct', pct + '%');
    input.className = 'styled';
}

/* ─────────────────────────────────────────────────────────
   RENDER QUIZ STEP
───────────────────────────────────────────────────────── */
function renderStep(direction) {
    const q = QUESTIONS[currentStep];
    const total = QUESTIONS.length;
    const pct = ((currentStep + 1) / total) * 100;

    const quizPhase = document.getElementById('quiz-phase');

    quizPhase.innerHTML = `
        <div class="quiz-card">

          <!-- Progress bar -->
          <div class="progress-track" aria-hidden="true">
            <div class="progress-fill" style="width:${pct}%"></div>
          </div>

          <!-- Step label + dots -->
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;">
            <span class="step-label">Step ${currentStep + 1} of ${total}</span>
            <div class="dots" aria-hidden="true">
              ${QUESTIONS.map((_, i) => `
                <div class="dot ${i < currentStep ? 'done' : i === currentStep ? 'active' : ''}"></div>
              `).join('')}
            </div>
          </div>

          <!-- Question -->
          <div class="question-area">
            <div class="question-slide" id="q-slide">
              <h2 class="question-text">${q.text}</h2>
              <p class="question-hint">${q.hint}</p>

              <div class="slider-wrap">
                <!-- Live value display -->
                <div class="slider-value-row">
                  <span class="slider-value-bubble" id="val-display">
                    ${q.prefix || ''}${answers[q.id]}
                  </span>
                  <span class="slider-value-unit">${q.unit}</span>
                </div>

                <!-- Range slider -->
                <input
                  type="range"
                  id="q-slider"
                  class="styled"
                  min="${q.min}"
                  max="${q.max}"
                  step="${q.step}"
                  value="${answers[q.id]}"
                  aria-label="${q.text}"
                  aria-valuemin="${q.min}"
                  aria-valuemax="${q.max}"
                  aria-valuenow="${answers[q.id]}"
                />

                <!-- Min / max labels -->
                <div class="slider-labels">
                  <span>${q.minLabel}</span>
                  <span>${q.maxLabel}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Nav buttons -->
          <div class="quiz-nav">
            <button class="btn btn-ghost" id="btn-back" ${currentStep === 0 ? 'disabled' : ''} aria-label="Go back">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
              Back
            </button>
            <button class="btn btn-dark" id="btn-next" aria-label="${currentStep === total - 1 ? 'See results' : 'Next question'}">
              ${currentStep === total - 1 ? 'See My Results' : 'Next'}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>

        </div>`;

    /* Wire slider */
    const slider = document.getElementById('q-slider');
    const display = document.getElementById('val-display');

    updateTrack(slider, q);

    slider.addEventListener('input', () => {
        answers[q.id] = Number(slider.value);
        display.textContent = (q.prefix || '') + slider.value;
        slider.setAttribute('aria-valuenow', slider.value);
        updateTrack(slider, q);
    });

    /* Nav */
    document.getElementById('btn-back').addEventListener('click', () => {
        if (currentStep > 0) { currentStep--; renderStep('back'); }
    });
    document.getElementById('btn-next').addEventListener('click', () => {
        if (currentStep < QUESTIONS.length - 1) {
            currentStep++;
            renderStep('forward');
        } else {
            showResults();
        }
    });

    /* Slide-in animation */
    const slide = document.getElementById('q-slide');
    if (direction === 'forward') {
        slide.classList.add('enter-right');
        requestAnimationFrame(() => {
            requestAnimationFrame(() => slide.classList.remove('enter-right'));
        });
    } else if (direction === 'back') {
        slide.classList.add('enter-left');
        requestAnimationFrame(() => {
            requestAnimationFrame(() => slide.classList.remove('enter-left'));
        });
    }
}

/* ─────────────────────────────────────────────────────────
   SCORING ALGORITHM
───────────────────────────────────────────────────────── */
function scoreArt(art) {
    let score = 0;

    const { fitness, pain, goal, budget, time } = answers;
    const totalCost = getTotalEquipmentCost(art);

    /*
     * 1. FITNESS vs FITNESS REQUIRED
     *    Closer = better. Max 25 points.
     *    We reward arts whose fitnessRequired is <= user's fitness
     *    (they can handle it), and gently penalise arts that demand
     *    more than the user currently has.
     */
    const fitDiff = fitness - art.fitnessRequired;
    if (fitDiff >= 0) {
        // User is fit enough — full points minus small over-qualification penalty
        score += 25 - Math.min(fitDiff, 5);
    } else {
        // Art demands more than user has — penalise proportionally
        score += Math.max(0, 25 + fitDiff * 4);
    }

    /*
     * 2. PAIN TOLERANCE vs INJURY RISK
     *    Closer = better. Max 20 points.
     */
    const painDiff = Math.abs(pain - art.injuryRisk);
    score += Math.max(0, 20 - painDiff * 2.5);

    /*
     * 3. GOAL ALIGNMENT vs BEST FOR
     *    goal 1–3 → Fitness/Sport, goal 8–10 → Self-defense, middle → mixed.
     *    Max 20 points.
     */
    let goalScore = 0;
    if (goal <= 3) {
        if (art.bestFor.includes('Fitness')) goalScore += 10;
        if (art.bestFor.includes('Sport')) goalScore += 10;
    } else if (goal >= 8) {
        if (art.bestFor.includes('Self-defense')) goalScore += 20;
    } else {
        // Mid-range — reward breadth
        const tags = ['Fitness', 'Sport', 'Discipline', 'Self-defense'];
        tags.forEach(t => { if (art.bestFor.includes(t)) goalScore += 5; });
    }
    score += goalScore;

    /*
     * 4. BUDGET vs TOTAL EQUIPMENT COST
     *    Monthly budget × 12 = rough annual budget.
     *    Penalise if art costs more than user can afford.
     *    Max 20 points.
     */
    const annualBudget = budget * 12;
    if (totalCost <= annualBudget) {
        // Within budget — full points
        score += 20;
    } else {
        // Over budget — scale penalty
        const overRatio = (totalCost - annualBudget) / annualBudget;
        score += Math.max(0, 20 - overRatio * 15);
    }

    /*
     * 5. DIFFICULTY PENALTY if user has low fitness
     *    If fitness ≤ 3, strongly penalise advanced arts (difficulty ≥ 7).
     *    Max 15 points (this is the penalty pool).
     */
    if (fitness <= 3 && art.difficulty >= 7) {
        score -= (art.difficulty - 6) * 5;
    } else if (fitness >= 7 && art.difficulty >= 7) {
        // Bonus: fit users who can handle hard arts
        score += 5;
    }

    /*
     * 6. TIME: more hours available → high-fitness arts become viable
     *    Small bonus/penalty. Max ±5.
     */
    if (time >= 8 && art.fitnessRequired >= 7) score += 4;
    if (time <= 3 && art.fitnessRequired >= 8) score -= 4;

    return Math.max(0, score);
}

/* ─────────────────────────────────────────────────────────
   EXPLANATION GENERATOR
───────────────────────────────────────────────────────── */
function explain(art, rank) {
    const { fitness, pain, goal, budget } = answers;
    const totalCost = getTotalEquipmentCost(art);
    const reasons = [];

    // Fitness match
    if (Math.abs(fitness - art.fitnessRequired) <= 2) {
        reasons.push(`its fitness requirement (${art.fitnessRequired}/10) is a great match for your current level`);
    } else if (fitness > art.fitnessRequired) {
        reasons.push(`your fitness level exceeds what it demands — you'll adapt quickly`);
    }

    // Pain/contact
    if (Math.abs(pain - art.injuryRisk) <= 2) {
        reasons.push(`the contact level (${art.injuryRisk}/10) aligns with your comfort zone`);
    }

    // Goal
    if (goal >= 7 && art.bestFor.includes('Self-defense')) {
        reasons.push(`it's one of the strongest arts for real-world self-defence`);
    } else if (goal <= 4 && (art.bestFor.includes('Fitness') || art.bestFor.includes('Sport'))) {
        reasons.push(`it's well-suited for fitness and sport competition`);
    }

    // Budget
    if (totalCost <= budget * 12) {
        reasons.push(`the total equipment cost (~$${totalCost}) fits comfortably within your budget`);
    }

    // Fallback
    if (reasons.length === 0) {
        reasons.push(`it balances difficulty, contact, and cost in a way that suits your profile`);
    }

    const connector = reasons.length === 1
        ? reasons[0]
        : reasons.slice(0, -1).join(', ') + ' and ' + reasons[reasons.length - 1];

    return `${rank === 0 ? 'Your top match because' : 'A strong option because'} ${connector}.`;
}

/* ─────────────────────────────────────────────────────────
   SHOW RESULTS
───────────────────────────────────────────────────────── */
function showResults() {
    /* Score all arts */
    const scored = MARTIAL_ARTS.map(art => ({
        art,
        score: scoreArt(art),
    })).sort((a, b) => b.score - a.score);

    /* Normalise to percentages against top score */
    const topScore = scored[0].score;
    const top3 = scored.slice(0, 3).map((entry, i) => ({
        ...entry,
        pct: Math.round((entry.score / topScore) * 100),
        rank: i,
    }));

    /* Switch phases */
    document.getElementById('quiz-phase').style.display = 'none';
    const resultsPhase = document.getElementById('results-phase');
    resultsPhase.style.display = 'block';

    /* Render */
    resultsPhase.innerHTML = `
        <div class="results-header">
          <p class="results-eyebrow">Your results</p>
          <h2 class="results-title">Your Top Matches</h2>
          <p class="results-subtitle">Based on your fitness, goals, budget, and contact preference.</p>
        </div>

        <div class="results-list" role="list">
          ${top3.map((entry, i) => `
            <article class="result-card" role="listitem" style="animation-delay:${i * 120}ms">

              <!-- Rank -->
              <div class="result-rank" aria-label="Rank ${i + 1}">
                <span class="rank-number">${i + 1}</span>
                <span class="rank-initials">${initials(entry.art.name)}</span>
              </div>

              <!-- Body -->
              <div class="result-body">
                <div class="result-top">
                  <span class="result-name">${entry.art.name}</span>
                  <span class="match-pill" aria-label="${entry.pct}% match">${entry.pct}% match</span>
                </div>
                <p class="result-explanation">${explain(entry.art, i)}</p>
                <div class="result-footer">
                  <span class="style-badge ${badgeClass(entry.art.style)}">${entry.art.style}</span>
                  <a href="art-template.html?id=${entry.art.id}" class="btn btn-sm btn-outline-dark">
                    Learn more
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
                  </a>
                </div>
              </div>

            </article>
          `).join('')}
        </div>

        <div class="retake-wrap">
          <button class="btn-retake" id="btn-retake" aria-label="Retake the quiz from the beginning">
            ← Retake the quiz
          </button>
        </div>`;

    document.getElementById('btn-retake').addEventListener('click', retakeQuiz);
}

/* ─────────────────────────────────────────────────────────
   RETAKE
───────────────────────────────────────────────────────── */
function retakeQuiz() {
    currentStep = 0;
    QUESTIONS.forEach(q => { answers[q.id] = q.default; });

    document.getElementById('results-phase').style.display = 'none';
    const quizPhase = document.getElementById('quiz-phase');
    quizPhase.style.display = 'block';
    renderStep(null);
}

/* ─────────────────────────────────────────────────────────
   BOOT
───────────────────────────────────────────────────────── */
renderStep(null);