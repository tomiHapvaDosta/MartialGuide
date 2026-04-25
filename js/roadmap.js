
/* ── Layout ──────────────────────────────────────────────── */
injectNavbar(document.getElementById('navbar-container'));
injectFooter(document.getElementById('footer-container'));

/* ════════════════════════════════════════════════════════════
   ROADMAP DATA
════════════════════════════════════════════════════════════ */
const STAGE_COLORS = ['#8BC34A', '#4CAF50', '#FF9800', '#F44336', '#9C27B0'];

const ROADMAP = {
    'muay-thai': {
        hasBelts: false,
        milestones: [
            {
                stage: 'Complete Beginner', baseMonths: 3, belt: null, beltColor: null,
                skills: ['Basic stance', 'Jab/cross', 'Teep kick', 'Clinch entry', 'Skipping rope'],
                physical: 'Building cardiovascular base, shin conditioning begins.',
                mental: 'Overwhelming at first — focus on showing up consistently.'
            },
            {
                stage: 'Early Skills', baseMonths: 9, belt: null, beltColor: null,
                skills: ['Roundhouse kick', 'Elbow strikes', 'Knee strikes', 'Basic combinations'],
                physical: 'Noticeable fitness improvement, shin conditioning underway.',
                mental: 'Starting to feel the rhythm — first sparring sessions.'
            },
            {
                stage: 'Intermediate', baseMonths: 24, belt: null, beltColor: null,
                skills: ['Full 8-limb combinations', 'Defensive movement', 'Counter-striking'],
                physical: 'Strong cardio, conditioned shins, lean muscle.',
                mental: 'Confidence in sparring, developing a personal style.'
            },
            {
                stage: 'Advanced', baseMonths: 48, belt: null, beltColor: null,
                skills: ['Advanced clinch work', 'Fight IQ', 'Ring generalship'],
                physical: 'Peak conditioning, competition-ready.',
                mental: 'Calm under pressure, strategic thinking in sparring.'
            },
            {
                stage: 'Master', baseMonths: 84, belt: null, beltColor: null,
                skills: ['Full technique mastery', 'Coaching ability', 'Deep art knowledge'],
                physical: 'Maintained elite fitness, body fully adapted.',
                mental: 'Deep understanding of the art, ability to teach.'
            },
        ],
    },
    'brazilian-jiu-jitsu': {
        hasBelts: true,
        milestones: [
            {
                stage: 'Complete Beginner', baseMonths: 6, belt: 'White', beltColor: '#e0e0e0',
                skills: ['Positional hierarchy', 'Guard & mount', 'Side control', 'Basic escapes'],
                physical: 'Upper body soreness — learning to use technique over strength.',
                mental: 'Constant confusion — embrace getting tapped.'
            },
            {
                stage: 'Early Skills', baseMonths: 18, belt: 'Blue', beltColor: '#1565C0',
                skills: ['Guard passing', 'Sweeps', 'Armbar', 'Triangle choke', 'RNC'],
                physical: 'Core strength improves dramatically.',
                mental: 'First real "aha" moments — the game starts making sense.'
            },
            {
                stage: 'Intermediate', baseMonths: 48, belt: 'Purple', beltColor: '#7B1FA2',
                skills: ['Developed guard', 'Leg lock entries', 'Transition chains'],
                physical: 'Efficient movement, using less energy per roll.',
                mental: 'Developing a game plan, comfortable in most positions.'
            },
            {
                stage: 'Advanced', baseMonths: 84, belt: 'Brown', beltColor: '#5D4037',
                skills: ['Advanced systems', 'Teaching ability', 'Competition experience'],
                physical: 'Highly efficient, minimal wasted movement.',
                mental: 'Deep strategic understanding, mentoring others.'
            },
            {
                stage: 'Master', baseMonths: 120, belt: 'Black', beltColor: '#212121',
                skills: ['Complete mastery', 'Unique personal style', 'Full teaching ability'],
                physical: 'Body fully adapted to the demands of grappling.',
                mental: 'The art becomes second nature — a lifelong journey begins.'
            },
        ],
    },
    'boxing': {
        hasBelts: false,
        milestones: [
            {
                stage: 'Complete Beginner', baseMonths: 3, belt: null, beltColor: null,
                skills: ['Stance (orthodox/southpaw)', 'Jab & cross', 'Slip', 'Basic footwork'],
                physical: 'Hand conditioning, cardiovascular base building.',
                mental: 'Humbling — everyone seems faster at first.'
            },
            {
                stage: 'Early Skills', baseMonths: 8, belt: null, beltColor: null,
                skills: ['Hook', 'Uppercut', 'Combinations', 'Head movement', 'Body shots'],
                physical: 'Hands toughen, reflexes sharpen.',
                mental: 'First sparring — learning to stay calm under pressure.'
            },
            {
                stage: 'Intermediate', baseMonths: 20, belt: null, beltColor: null,
                skills: ['Combination chains', 'Counter-punching', 'Ring cutting'],
                physical: 'Lean, strong upper body, excellent cardio.',
                mental: 'Developing boxing IQ — reading opponents.'
            },
            {
                stage: 'Advanced', baseMonths: 42, belt: null, beltColor: null,
                skills: ['Advanced feints', 'Timing', 'Distance management', 'Fight strategy'],
                physical: 'Competition-ready conditioning.',
                mental: 'Confident, strategic, composed under fire.'
            },
            {
                stage: 'Master', baseMonths: 72, belt: null, beltColor: null,
                skills: ['Complete technical mastery', 'Training others', 'Sweet science depth'],
                physical: 'Elite conditioning maintained.',
                mental: 'Deep understanding of the sweet science.'
            },
        ],
    },
    'judo': {
        hasBelts: true,
        milestones: [
            {
                stage: 'Complete Beginner', baseMonths: 4, belt: 'White', beltColor: '#e0e0e0',
                skills: ['Ukemi (breakfalls)', 'Basic gripping', 'O-goshi (hip throw)'],
                physical: 'Learning to fall safely — essential foundation.',
                mental: 'Patience required — throws take time to feel natural.'
            },
            {
                stage: 'Early Skills', baseMonths: 10, belt: 'Yellow/Orange', beltColor: '#FFA726',
                skills: ['Seoi-nage', 'Osoto-gari', 'Basic groundwork (ne-waza)'],
                physical: 'Balance and coordination improving significantly.',
                mental: 'First competition nerves — win or lose, you learn.'
            },
            {
                stage: 'Intermediate', baseMonths: 30, belt: 'Green/Blue', beltColor: '#42A5F5',
                skills: ['Combination throws', 'Sacrifice throws', 'Groundwork transitions'],
                physical: 'Explosive power, strong grip strength.',
                mental: 'Comfortable competing, developing preferred techniques.'
            },
            {
                stage: 'Advanced', baseMonths: 60, belt: 'Brown', beltColor: '#5D4037',
                skills: ['Advanced kuzushi', 'Competition strategy', 'Kata basics'],
                physical: 'Peak throwing power and timing.',
                mental: 'Deep tactical understanding, mentoring juniors.'
            },
            {
                stage: 'Master', baseMonths: 96, belt: 'Black (Shodan)', beltColor: '#212121',
                skills: ['Full technical mastery', 'Kata proficiency', 'Teaching'],
                physical: 'Mastery of body mechanics.',
                mental: 'Judo becomes a philosophy, not just a sport.'
            },
        ],
    },
    'karate': {
        hasBelts: true,
        milestones: [
            {
                stage: 'Complete Beginner', baseMonths: 4, belt: 'White', beltColor: '#e0e0e0',
                skills: ['Zenkutsu-dachi stance', 'Kihon strikes', 'First kata'],
                physical: 'Posture and balance awareness begins.',
                mental: 'Discipline and respect — adjust to dojo etiquette.'
            },
            {
                stage: 'Early Skills', baseMonths: 12, belt: 'Yellow/Orange', beltColor: '#FFA726',
                skills: ['Multiple kata', 'Basic kumite (sparring)', 'Kicking techniques'],
                physical: 'Flexibility improving, muscle memory developing.',
                mental: 'Building confidence through kata performance.'
            },
            {
                stage: 'Intermediate', baseMonths: 30, belt: 'Green/Blue', beltColor: '#42A5F5',
                skills: ['Advanced kata', 'Competition kumite', 'Combination techniques'],
                physical: 'Strong core, fast strikes, good flexibility.',
                mental: 'Understanding the philosophy behind each kata.'
            },
            {
                stage: 'Advanced', baseMonths: 60, belt: 'Brown', beltColor: '#5D4037',
                skills: ['Advanced kumite strategy', 'Teaching basics', 'Refining kata'],
                physical: 'Explosive speed and power.',
                mental: 'Leadership within the dojo, mentoring beginners.'
            },
            {
                stage: 'Master', baseMonths: 96, belt: 'Black (Shodan)', beltColor: '#212121',
                skills: ['Mastery of all kata', 'Full technical repertoire', 'Teaching'],
                physical: 'Peak technical precision.',
                mental: 'Black belt is the beginning, not the end.'
            },
        ],
    },
    'taekwondo': {
        hasBelts: true,
        milestones: [
            {
                stage: 'Complete Beginner', baseMonths: 3, belt: 'White', beltColor: '#e0e0e0',
                skills: ['Basic stances', 'Front kick', 'Roundhouse kick', 'First poomsae'],
                physical: 'Hip flexibility work begins immediately.',
                mental: 'Fun and energetic — very beginner friendly.'
            },
            {
                stage: 'Early Skills', baseMonths: 9, belt: 'Yellow/Green', beltColor: '#8BC34A',
                skills: ['Spinning kicks', 'Jump kicks', 'Multiple poomsae', 'Basic sparring'],
                physical: 'Leg strength and flexibility improving rapidly.',
                mental: 'First competition excitement — point sparring format.'
            },
            {
                stage: 'Intermediate', baseMonths: 24, belt: 'Blue', beltColor: '#1565C0',
                skills: ['Advanced spinning kicks', 'Jumping kicks', 'Combination sparring'],
                physical: 'Athletic, flexible, strong legs.',
                mental: 'Competitive mindset developing.'
            },
            {
                stage: 'Advanced', baseMonths: 48, belt: 'Red', beltColor: '#E53935',
                skills: ['Full sparring strategy', 'Advanced poomsae', 'Breaking techniques'],
                physical: 'Peak kicking speed and power.',
                mental: 'Leadership in class, preparing for black belt test.'
            },
            {
                stage: 'Master', baseMonths: 72, belt: 'Black (1st Dan)', beltColor: '#212121',
                skills: ['Complete mastery', 'Teaching poomsae and sparring'],
                physical: 'Elite kicking ability.',
                mental: 'Deep respect for the art and its Olympic heritage.'
            },
        ],
    },
    'wrestling': {
        hasBelts: false,
        milestones: [
            {
                stage: 'Complete Beginner', baseMonths: 3, belt: null, beltColor: null,
                skills: ['Basic stance', 'Sprawl', 'Single leg takedown', 'Double leg takedown'],
                physical: 'Brutal cardio demands — expect exhaustion early.',
                mental: 'Ego check — everyone gets taken down at first.'
            },
            {
                stage: 'Early Skills', baseMonths: 8, belt: null, beltColor: null,
                skills: ["Fireman's carry", 'Snap down', 'Basic top control', 'Granby roll'],
                physical: 'Explosive leg strength, neck strength developing.',
                mental: 'Embracing the grind — wrestling rewards pure effort.'
            },
            {
                stage: 'Intermediate', baseMonths: 20, belt: null, beltColor: null,
                skills: ['Combination shots', 'Mat returns', 'Ride systems', 'Scrambles'],
                physical: 'Exceptional overall athleticism and toughness.',
                mental: 'Relentless mentality — never stop moving.'
            },
            {
                stage: 'Advanced', baseMonths: 42, belt: null, beltColor: null,
                skills: ['Advanced setups', 'Defensive wrestling', 'Chain wrestling'],
                physical: 'Peak physical conditioning — one of the most demanding arts.',
                mental: 'Elite mental toughness forged through hard training.'
            },
            {
                stage: 'Master', baseMonths: 72, belt: null, beltColor: null,
                skills: ['Complete technical mastery', 'Coaching ability'],
                physical: 'Outstanding athleticism maintained.',
                mental: 'Wrestling mindset permeates all areas of life.'
            },
        ],
    },
    'krav-maga': {
        hasBelts: true,
        milestones: [
            {
                stage: 'Complete Beginner', baseMonths: 3, belt: 'Practitioner P1', beltColor: '#FF9800',
                skills: ['Wrist releases', 'Choke defense', 'Basic strikes', 'Situational awareness'],
                physical: 'Building reactive speed and basic fitness.',
                mental: 'Shifting to a self-defense mindset — awareness over ego.'
            },
            {
                stage: 'Early Skills', baseMonths: 9, belt: 'Practitioner P3', beltColor: '#FF9800',
                skills: ['Ground defense', 'Weapon threats', 'Multiple attacker awareness'],
                physical: 'Stress inoculation training — performing under pressure.',
                mental: 'Controlled aggression — learning to switch it on and off.'
            },
            {
                stage: 'Intermediate', baseMonths: 24, belt: 'Graduate G1', beltColor: '#F44336',
                skills: ['Armed threats', 'Team defense scenarios', 'Advanced striking'],
                physical: 'High intensity scenario training.',
                mental: 'Confident, decisive, threat-assessment mindset.'
            },
            {
                stage: 'Advanced', baseMonths: 48, belt: 'Expert E1', beltColor: '#9C27B0',
                skills: ['Advanced weapon defense', 'VIP protection principles', 'Teaching'],
                physical: 'Elite tactical fitness.',
                mental: 'Deep calm under extreme stress scenarios.'
            },
            {
                stage: 'Master', baseMonths: 84, belt: 'Master M1', beltColor: '#212121',
                skills: ['Full system mastery', 'Instructor certification'],
                physical: 'Maintained elite condition.',
                mental: 'Complete threat neutralization mindset.'
            },
        ],
    },
    'kung-fu': {
        hasBelts: false,
        milestones: [
            {
                stage: 'Complete Beginner', baseMonths: 6, belt: null, beltColor: null,
                skills: ['Horse stance', 'Basic forms (taolu)', 'Fundamental strikes and blocks'],
                physical: 'Grueling stance training — legs will burn.',
                mental: 'Deep patience required — progress feels slow early.'
            },
            {
                stage: 'Early Skills', baseMonths: 18, belt: null, beltColor: null,
                skills: ['Multiple forms', 'Basic weapons introduction', 'Sparring fundamentals'],
                physical: 'Strength, flexibility, and coordination all improving.',
                mental: 'Beginning to appreciate the depth of the art.'
            },
            {
                stage: 'Intermediate', baseMonths: 42, belt: null, beltColor: null,
                skills: ['Advanced forms', 'Weapons proficiency', 'Internal energy concepts'],
                physical: 'Highly capable and flexible body.',
                mental: 'Philosophical understanding of Kung Fu principles.'
            },
            {
                stage: 'Advanced', baseMonths: 84, belt: null, beltColor: null,
                skills: ["Mastery of chosen style's forms", 'Teaching fundamentals'],
                physical: 'Peak technical ability.',
                mental: 'The art and the practitioner become one.'
            },
            {
                stage: 'Master', baseMonths: 144, belt: null, beltColor: null,
                skills: ['Complete mastery', 'Lineage holder potential'],
                physical: 'Lifelong conditioning.',
                mental: 'Deep philosophical and spiritual connection to the art.'
            },
        ],
    },
    'aikido': {
        hasBelts: true,
        milestones: [
            {
                stage: 'Complete Beginner', baseMonths: 6, belt: 'White (6th kyu)', beltColor: '#e0e0e0',
                skills: ['Ukemi', 'Ikkyo & nikyo (wrist techniques)', 'Basic throws'],
                physical: 'Learning to receive technique — body awareness.',
                mental: 'Completely different from other arts — patience essential.'
            },
            {
                stage: 'Early Skills', baseMonths: 18, belt: 'Orange/Green (4–5th kyu)', beltColor: '#8BC34A',
                skills: ['Irimi-nage', 'Kaiten-nage', 'Weapons suburi (bokken/jo)'],
                physical: 'Coordination and flow developing.',
                mental: 'Starting to feel the harmony principle in practice.'
            },
            {
                stage: 'Intermediate', baseMonths: 42, belt: 'Blue/Brown (2–3rd kyu)', beltColor: '#1565C0',
                skills: ['Advanced projections', 'Multiple attacker practice', 'Weapons kata'],
                physical: 'Graceful, efficient movement.',
                mental: 'Understanding the philosophical core of Aikido.'
            },
            {
                stage: 'Advanced', baseMonths: 72, belt: 'Brown (1st kyu)', beltColor: '#5D4037',
                skills: ['Refining all techniques', 'Teaching beginners', 'Advanced weapons'],
                physical: 'Effortless-looking technique mastery.',
                mental: 'Deep commitment to non-resistance principles.'
            },
            {
                stage: 'Master', baseMonths: 108, belt: 'Black (Shodan)', beltColor: '#212121',
                skills: ['Complete technical repertoire', 'Instructor path begins'],
                physical: 'Lifelong practice body.',
                mental: "Aikido as a way of life — O'Sensei's vision understood."
            },
        ],
    },
    /* ── New arts — generic 5-stage roadmap ── */
    'kickboxing': {
        hasBelts: false,
        milestones: [
            {
                stage: 'Complete Beginner', baseMonths: 3, belt: null, beltColor: null,
                skills: ['Stance', 'Jab/cross/hook', 'Front kick', 'Roundhouse kick', 'Basic footwork'],
                physical: 'Cardiovascular base, hand conditioning.',
                mental: 'High energy — one of the more welcoming arts to start.'
            },
            {
                stage: 'Early Skills', baseMonths: 9, belt: null, beltColor: null,
                skills: ['Combination punching', 'Kick-punch combos', 'Slipping', 'Low kicks'],
                physical: 'Cardio improving rapidly, shins toughening.',
                mental: 'First sparring — exciting and chaotic.'
            },
            {
                stage: 'Intermediate', baseMonths: 22, belt: null, beltColor: null,
                skills: ['Advanced combinations', 'Defensive movement', 'Counter-fighting'],
                physical: 'Lean and conditioned, excellent reflexes.',
                mental: 'Developing a personal fighting style.'
            },
            {
                stage: 'Advanced', baseMonths: 42, belt: null, beltColor: null,
                skills: ['Distance management', 'Ring IQ', 'Feints and setups'],
                physical: 'Competition-ready, strong and fast.',
                mental: 'Calm strategic mindset under pressure.'
            },
            {
                stage: 'Master', baseMonths: 72, belt: null, beltColor: null,
                skills: ['Full technical mastery', 'Coaching', 'Deep fight IQ'],
                physical: 'Elite conditioning maintained.',
                mental: 'The complete kickboxer — striking specialist.'
            },
        ],
    },
    'mma': {
        hasBelts: false,
        milestones: [
            {
                stage: 'Complete Beginner', baseMonths: 6, belt: null, beltColor: null,
                skills: ['Basic striking', 'Takedown defense', 'Guard position', 'Sprawl'],
                physical: 'Physically the most demanding start of any art — expect soreness everywhere.',
                mental: 'Humbling but addictive — the variety keeps it engaging.'
            },
            {
                stage: 'Early Skills', baseMonths: 18, belt: null, beltColor: null,
                skills: ['Basic combinations', 'Single/double leg', 'Positional grappling', 'Basic submissions'],
                physical: 'Dramatic fitness improvement across all areas.',
                mental: 'Starting to see the chess game within the fight.'
            },
            {
                stage: 'Intermediate', baseMonths: 36, belt: null, beltColor: null,
                skills: ['Fight IQ', 'Clinch work', 'Ground-and-pound', 'Submission defense'],
                physical: 'Highly athletic, well-conditioned across all ranges.',
                mental: 'Finding your A-game — what you rely on under pressure.'
            },
            {
                stage: 'Advanced', baseMonths: 60, belt: null, beltColor: null,
                skills: ['Advanced grappling', 'High-level striking', 'Seamless transitions'],
                physical: 'Peak MMA conditioning — elite across all ranges.',
                mental: 'Deep strategic thinking — composure in chaos.'
            },
            {
                stage: 'Master', baseMonths: 96, belt: null, beltColor: null,
                skills: ['Complete mixed arts mastery', 'Coaching', 'Fight analysis'],
                physical: 'Outstanding maintained athlete.',
                mental: 'The complete fighter — mastery of the modern combat sport.'
            },
        ],
    },
    'bare-knuckle': {
        hasBelts: false,
        milestones: [
            {
                stage: 'Complete Beginner', baseMonths: 3, belt: null, beltColor: null,
                skills: ['Modified stance', 'Compact punching', 'Head movement', 'Hand conditioning'],
                physical: 'Hand toughening is priority — gradual process.',
                mental: 'Respect for the raw nature of the art from day one.'
            },
            {
                stage: 'Early Skills', baseMonths: 8, belt: null, beltColor: null,
                skills: ['Short punches', 'Defensive shell', 'Body work', 'Clinch and tie-ups'],
                physical: 'Hands hardening, reflexes developing.',
                mental: 'Accepting the reality of the contact level.'
            },
            {
                stage: 'Intermediate', baseMonths: 20, belt: null, beltColor: null,
                skills: ['Combination work', 'Counter-fighting', 'Cut prevention techniques'],
                physical: 'Peak hand conditioning, excellent cardio.',
                mental: 'Composure — staying calm with no glove padding between you.'
            },
            {
                stage: 'Advanced', baseMonths: 40, belt: null, beltColor: null,
                skills: ['Ring generalship', 'Advanced feints', 'Damage management'],
                physical: 'Competition-ready, hardened fighter.',
                mental: 'Elite mental toughness under extreme pressure.'
            },
            {
                stage: 'Master', baseMonths: 70, belt: null, beltColor: null,
                skills: ['Full technical mastery', 'Deep fight IQ', 'Coaching'],
                physical: 'Seasoned, conditioned fighter.',
                mental: 'The old-school craft of bare knuckle fully internalised.'
            },
        ],
    },
};

/* ════════════════════════════════════════════════════════════
   STATE
════════════════════════════════════════════════════════════ */
const urlParams = new URLSearchParams(window.location.search);
const preselectedId = urlParams.get('id');

let selectedArtId = preselectedId || '';
let hoursPerWeek = 8;
let effortLevel = 7;
let isVertical = localStorage.getItem('timelineDirection') === 'vertical'
    || window.innerWidth < 640;

/* ════════════════════════════════════════════════════════════
   POPULATE ART SELECTOR
════════════════════════════════════════════════════════════ */
const artSelectEl = document.getElementById('art-select');
MARTIAL_ARTS.forEach(art => {
    const opt = document.createElement('option');
    opt.value = art.id;
    opt.textContent = art.name;
    artSelectEl.appendChild(opt);
});

if (preselectedId) {
    artSelectEl.value = preselectedId;
    document.getElementById('art-selector-section').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'block';
}

artSelectEl.addEventListener('change', () => {
    selectedArtId = artSelectEl.value;
    if (selectedArtId) {
        document.getElementById('quiz-section').style.display = 'block';
        // Reset output
        document.getElementById('timeline-wrap').classList.remove('visible');
        document.getElementById('summary-wrap').style.display = 'none';
        document.getElementById('pace-badge').style.display = 'none';
        document.getElementById('direction-toggle').classList.remove('visible');
    }
});

/* ════════════════════════════════════════════════════════════
   SLIDERS
════════════════════════════════════════════════════════════ */
const HOURS_LABELS = [
    { range: [1, 3], text: 'Casual — once or twice a week' },
    { range: [4, 7], text: 'Committed — regular training' },
    { range: [8, 14], text: 'Serious — near daily training' },
    { range: [15, 20], text: 'Full dedication — multiple sessions daily' },
];
const EFFORT_LABELS = [
    { range: [1, 3], text: 'Light effort — taking it easy' },
    { range: [4, 6], text: 'Moderate effort — steady progress' },
    { range: [7, 10], text: 'Maximum effort — pushing limits every time' },
];

function getLiveLabel(labels, val) {
    for (const ll of labels) {
        if (val >= ll.range[0] && val <= ll.range[1]) return ll.text;
    }
    return '';
}
function updateTrack(input) {
    const min = Number(input.min), max = Number(input.max);
    const pct = ((input.value - min) / (max - min)) * 100;
    input.style.setProperty('--pct', pct + '%');
}

const hoursSlider = document.getElementById('hours-slider');
const effortSlider = document.getElementById('effort-slider');

hoursSlider.addEventListener('input', () => {
    hoursPerWeek = Number(hoursSlider.value);
    document.getElementById('hours-val').textContent = hoursPerWeek;
    document.getElementById('hours-label').textContent = getLiveLabel(HOURS_LABELS, hoursPerWeek);
    updateTrack(hoursSlider);
});
effortSlider.addEventListener('input', () => {
    effortLevel = Number(effortSlider.value);
    document.getElementById('effort-val').textContent = effortLevel;
    document.getElementById('effort-label').textContent = getLiveLabel(EFFORT_LABELS, effortLevel);
    updateTrack(effortSlider);
});

// Init
document.getElementById('hours-val').textContent = hoursPerWeek;
document.getElementById('effort-val').textContent = effortLevel;
document.getElementById('hours-label').textContent = getLiveLabel(HOURS_LABELS, hoursPerWeek);
document.getElementById('effort-label').textContent = getLiveLabel(EFFORT_LABELS, effortLevel);
updateTrack(hoursSlider);
updateTrack(effortSlider);

/* ════════════════════════════════════════════════════════════
   PACE ALGORITHM
════════════════════════════════════════════════════════════ */
function computePace() {
    const raw = hoursPerWeek * effortLevel; // 1–200
    if (raw <= 40) return { tier: 'Slow', multiplier: 1.8, desc: 'At this pace, expect a longer but sustainable journey.' };
    else if (raw <= 80) return { tier: 'Normal', multiplier: 1.0, desc: 'A solid, realistic training schedule.' };
    else if (raw <= 130) return { tier: 'Fast', multiplier: 0.75, desc: "You'll progress quicker than most — stay consistent." };
    else return { tier: 'Accelerated', multiplier: 0.55, desc: 'Exceptional dedication. You will move fast — avoid burnout.' };
}

/* ════════════════════════════════════════════════════════════
   RENDER TIMELINE
════════════════════════════════════════════════════════════ */
function buildMilestoneCard(m, adjustedMonths, stageIndex) {
    const hasCard = !!m.belt;
    const topColor = STAGE_COLORS[stageIndex];

    let beltBadge = '';
    if (hasCard && m.beltColor) {
        const textCol = ['#e0e0e0', '#fff5c0'].includes(m.beltColor) ? '#333' : '#fff';
        beltBadge = `<div class="belt-badge" style="background:${m.beltColor};color:${textCol};" title="${m.belt}">${m.belt.split(' ')[0]}</div>`;
    }

    const skillsHTML = m.skills.map(s => `<li>${s}</li>`).join('');

    return `
        <div class="milestone-card" data-stage="${stageIndex}">
          <div class="milestone-top-strip" style="background:${topColor}"></div>
          ${beltBadge}
          <div class="milestone-body">
            <div>
              <div class="milestone-stage">${m.stage}</div>
              <div class="milestone-time">~<span>${adjustedMonths}</span> months in</div>
            </div>
            <ul class="milestone-skills">${skillsHTML}</ul>
            <div class="milestone-physical">${m.physical}</div>
            <div class="milestone-mental">${m.mental}</div>
          </div>
        </div>`;
}

function renderHorizontal(milestones, adjustedMonths) {
    const container = document.getElementById('timeline-container');
    container.innerHTML = '';

    const scroll = document.createElement('div');
    scroll.className = 'timeline-h';

    const inner = document.createElement('div');
    inner.className = 'timeline-h-inner';

    milestones.forEach((m, i) => {
        const below = i % 2 === 1;
        const item = document.createElement('div');
        item.className = 'h-item' + (below ? ' below' : '');

        item.innerHTML = buildMilestoneCard(m, adjustedMonths[i], i);

        const dot = document.createElement('div');
        dot.className = 'h-dot' + (i === 0 ? ' filled' : '');

        item.appendChild(dot);
        inner.appendChild(item);

        if (i < milestones.length - 1) {
            const line = document.createElement('div');
            line.className = 'h-line';
            inner.appendChild(line);
        }
    });

    scroll.appendChild(inner);
    container.appendChild(scroll);

    animateCards();
}

function renderVertical(milestones, adjustedMonths) {
    const container = document.getElementById('timeline-container');
    container.innerHTML = '';

    const vWrap = document.createElement('div');
    vWrap.className = 'timeline-v';

    milestones.forEach((m, i) => {
        const row = document.createElement('div');
        row.className = 'v-row';

        const isLeft = i % 2 === 0;
        const cardHTML = buildMilestoneCard(m, adjustedMonths[i], i);

        const leftEl = document.createElement('div');
        leftEl.className = 'v-card-left';
        if (isLeft) leftEl.innerHTML = cardHTML;

        const centerEl = document.createElement('div');
        centerEl.className = 'v-center';
        const dot = document.createElement('div');
        dot.className = 'v-dot' + (i === 0 ? ' filled' : '');
        centerEl.appendChild(dot);
        if (i < milestones.length - 1) {
            const line = document.createElement('div');
            line.className = 'v-line';
            centerEl.appendChild(line);
        }

        const rightEl = document.createElement('div');
        rightEl.className = 'v-card-right';
        if (!isLeft) rightEl.innerHTML = cardHTML;

        row.appendChild(leftEl);
        row.appendChild(centerEl);
        row.appendChild(rightEl);
        vWrap.appendChild(row);
    });

    container.appendChild(vWrap);
    animateCards();
}

function animateCards() {
    const cards = document.querySelectorAll('.milestone-card');
    cards.forEach((card, i) => {
        setTimeout(() => card.classList.add('in'), i * 150 + 80);
    });
}

function renderTimeline() {
    if (!selectedArtId) return;
    const data = ROADMAP[selectedArtId];
    if (!data) return;

    const pace = computePace();
    const adjustedMonths = data.milestones.map(m =>
        Math.max(1, Math.round(m.baseMonths * pace.multiplier))
    );

    if (isVertical) {
        renderVertical(data.milestones, adjustedMonths);
    } else {
        renderHorizontal(data.milestones, adjustedMonths);
    }

    // Show pace badge
    const badge = document.getElementById('pace-badge');
    badge.style.display = 'inline-flex';
    document.getElementById('pace-label').textContent = pace.tier + ' pace';
    document.getElementById('pace-desc').textContent = pace.desc;

    // Show timeline section
    document.getElementById('timeline-wrap').classList.add('visible');

    // Summary stats
    const finalMonths = adjustedMonths[adjustedMonths.length - 1];
    const totalHours = Math.round(hoursPerWeek * finalMonths * 4.3);
    const yearsStr = finalMonths >= 24
        ? (finalMonths / 12).toFixed(1) + ' yrs'
        : finalMonths + ' mo';

    document.getElementById('stat-time').textContent = yearsStr;
    document.getElementById('stat-pace').textContent = pace.tier;
    document.getElementById('stat-pace-sub').textContent = pace.desc;
    document.getElementById('stat-hours').textContent = totalHours.toLocaleString();
    document.getElementById('summary-wrap').style.display = 'block';

    // Show direction toggle
    document.getElementById('direction-toggle').classList.add('visible');
}

/* ════════════════════════════════════════════════════════════
   GENERATE BUTTON
════════════════════════════════════════════════════════════ */
document.getElementById('btn-generate').addEventListener('click', () => {
    if (!selectedArtId) {
        artSelectEl.focus();
        return;
    }
    renderTimeline();
});

/* ════════════════════════════════════════════════════════════
   DIRECTION TOGGLE
════════════════════════════════════════════════════════════ */
const dirToggle = document.getElementById('direction-toggle');
const dirIcon = document.getElementById('dir-icon');

const H_ICON = `<polyline points="17 8 21 12 17 16"/><polyline points="7 8 3 12 7 16"/><line x1="21" y1="12" x2="3" y2="12"/>`;
const V_ICON = `<polyline points="8 7 12 3 16 7"/><polyline points="8 17 12 21 16 17"/><line x1="12" y1="21" x2="12" y2="3"/>`;

function updateDirIcon() {
    dirIcon.innerHTML = isVertical ? H_ICON : V_ICON;
    dirToggle.setAttribute('aria-label', isVertical ? 'Switch to horizontal timeline' : 'Switch to vertical timeline');
}
updateDirIcon();

dirToggle.addEventListener('click', () => {
    isVertical = !isVertical;
    localStorage.setItem('timelineDirection', isVertical ? 'vertical' : 'horizontal');
    updateDirIcon();
    if (document.getElementById('timeline-wrap').classList.contains('visible')) {
        renderTimeline();
    }
});

/* ════════════════════════════════════════════════════════════
   BOOT — if preselected, show quiz immediately
════════════════════════════════════════════════════════════ */
if (preselectedId && ROADMAP[preselectedId]) {
    selectedArtId = preselectedId;
    document.getElementById('quiz-section').style.display = 'block';
}