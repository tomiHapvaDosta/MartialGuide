/**
 * data.js — MartialGuide shared data file
 *
 * This is the single source of truth for all martial arts data.
 * Every page on the site reads from this array.
 *
 * To add a new martial art, simply append a new object to the MARTIAL_ARTS
 * array below — no other file needs to be changed.
 *
 * Field reference:
 *   id               — URL-safe slug used in links (?id=muay-thai)
 *   name             — Display name
 *   origin           — Country of origin
 *   tagline          — One-line description shown on cards
 *   style            — "Striking" | "Grappling" | "Weapons" | "Mixed"
 *   bestFor          — Subset of ["Self-defense","Sport","Fitness","Discipline"]
 *   difficulty       — 1 (very easy) to 10 (extremely hard)
 *   injuryRisk       — 1 (very safe) to 10 (high contact / high risk)
 *   fitnessRequired  — 1 (minimal fitness needed) to 10 (elite athlete level)
 *   equipmentList    — Array of { item, estimatedCostUSD }
 *   history          — 3–5 sentence paragraph
 *   famousPractitioners — 2–4 names or pop-culture references
 *   image            — Path to image asset (replace with real images as needed)
 */

const MARTIAL_ARTS = [

    // ─────────────────────────────────────────────────────────────
    // 1. MUAY THAI
    // ─────────────────────────────────────────────────────────────
    {
        id: "muay-thai",
        name: "Muay Thai",
        origin: "Thailand",
        tagline: "The Art of Eight Limbs — fists, elbows, knees, and shins.",
        style: "Striking",
        bestFor: ["Self-defense", "Sport", "Fitness"],
        difficulty: 7,
        injuryRisk: 8,
        fitnessRequired: 8,
        equipmentList: [
            { item: "Boxing gloves", estimatedCostUSD: 60 },
            { item: "Hand wraps", estimatedCostUSD: 10 },
            { item: "Muay Thai shorts", estimatedCostUSD: 30 },
            { item: "Shin guards", estimatedCostUSD: 45 },
            { item: "Mouth guard", estimatedCostUSD: 15 },
            { item: "Heavy bag (optional)", estimatedCostUSD: 120 },
        ],
        history:
            "Muay Thai originated in Thailand several centuries ago as a battlefield combat system used by Siamese soldiers. It evolved into a national sport and cultural tradition, with formalized rules and ring competition emerging in the early 20th century. The art is distinguished by its use of eight striking surfaces — fists, elbows, knees, and shins — earning it the nickname 'The Art of Eight Limbs.' It gained worldwide popularity in the 1990s and 2000s as fighters like Buakaw Banchamek competed internationally. Today it forms the backbone of striking in mixed martial arts and is practiced by millions worldwide.",
        famousPractitioners: [
            "Saenchai PKSaenchaimuaythaigym",
            "Buakaw Banchamek",
            "Tony Jaa (actor, Ong-Bak)",
            "Anderson Silva (MMA)",
        ],
        image: "/images/muay-thai.jpg",
    },

    // ─────────────────────────────────────────────────────────────
    // 2. BRAZILIAN JIU-JITSU
    // ─────────────────────────────────────────────────────────────
    {
        id: "brazilian-jiu-jitsu",
        name: "Brazilian Jiu-Jitsu",
        origin: "Brazil",
        tagline: "Master the ground game — choke and submit any opponent.",
        style: "Grappling",
        bestFor: ["Self-defense", "Sport", "Discipline"],
        difficulty: 8,
        injuryRisk: 5,
        fitnessRequired: 6,
        equipmentList: [
            { item: "Gi (kimono)", estimatedCostUSD: 90 },
            { item: "Rash guard", estimatedCostUSD: 35 },
            { item: "Grappling shorts", estimatedCostUSD: 35 },
            { item: "Mouth guard", estimatedCostUSD: 15 },
            { item: "Ear guards (optional)", estimatedCostUSD: 25 },
        ],
        history:
            "Brazilian Jiu-Jitsu (BJJ) was developed in Brazil in the early 20th century by the Gracie family, who adapted techniques from Judo and traditional Japanese Jiu-Jitsu brought to the country by Mitsuyo Maeda. The Gracies refined the art to focus on ground fighting and submission holds, allowing a smaller person to defeat a larger opponent using leverage and technique. BJJ was catapulted to global fame when Royce Gracie dominated the first UFC tournaments in the early 1990s, submitting much larger opponents. It is now a core discipline in mixed martial arts and has a thriving sport competition scene through organizations like the IBJJF. Belt progression is notably slow and rigorous, with a black belt taking an average of ten years to earn.",
        famousPractitioners: [
            "Royce Gracie",
            "Gordon Ryan",
            "Roger Gracie",
            "Keanu Reeves (John Wick)",
        ],
        image: "/images/brazilian-jiu-jitsu.jpg",
    },

    // ─────────────────────────────────────────────────────────────
    // 3. BOXING
    // ─────────────────────────────────────────────────────────────
    {
        id: "boxing",
        name: "Boxing",
        origin: "United Kingdom",
        tagline: "The Sweet Science — footwork, timing, and devastating punches.",
        style: "Striking",
        bestFor: ["Sport", "Fitness", "Self-defense"],
        difficulty: 6,
        injuryRisk: 7,
        fitnessRequired: 8,
        equipmentList: [
            { item: "Boxing gloves", estimatedCostUSD: 60 },
            { item: "Hand wraps", estimatedCostUSD: 10 },
            { item: "Mouth guard", estimatedCostUSD: 15 },
            { item: "Headgear", estimatedCostUSD: 55 },
            { item: "Boxing shoes", estimatedCostUSD: 60 },
            { item: "Heavy bag (optional)", estimatedCostUSD: 120 },
            { item: "Jump rope", estimatedCostUSD: 15 },
        ],
        history:
            "Boxing is one of the oldest combat sports in human history, with depictions of fist-fighting found in ancient Greek and Egyptian art dating back thousands of years. It was included in the ancient Olympic Games around 688 BC. Modern boxing with standardized rules — including the Marquess of Queensberry Rules — was codified in Britain in the 1860s, introducing gloves and round structure. The sport produced legendary figures like Muhammad Ali, Joe Louis, and Sugar Ray Robinson, who transcended sport and became cultural icons. Today boxing is both a professional sport with massive global followings and one of the most popular fitness training methods in the world.",
        famousPractitioners: [
            "Muhammad Ali",
            "Mike Tyson",
            "Manny Pacquiao",
            "Rocky Balboa (fictional, Rocky films)",
        ],
        image: "/images/boxing.jpg",
    },

    // ─────────────────────────────────────────────────────────────
    // 4. JUDO
    // ─────────────────────────────────────────────────────────────
    {
        id: "judo",
        name: "Judo",
        origin: "Japan",
        tagline: "Use your opponent's force against them with powerful throws.",
        style: "Grappling",
        bestFor: ["Sport", "Self-defense", "Discipline"],
        difficulty: 7,
        injuryRisk: 6,
        fitnessRequired: 7,
        equipmentList: [
            { item: "Judogi (uniform)", estimatedCostUSD: 70 },
            { item: "Belt", estimatedCostUSD: 10 },
            { item: "Mouth guard", estimatedCostUSD: 15 },
        ],
        history:
            "Judo was created in 1882 by Japanese educator Jigoro Kano, who synthesized the most effective techniques from traditional Jujutsu schools to form a safer, more systematic martial art. Kano emphasized the principle of 'maximum efficiency with minimum effort,' making it possible for smaller practitioners to throw larger opponents using leverage and timing. Judo became the first Asian martial art to be included in the Olympic Games, debuting at Tokyo 1964. It has since spread worldwide and is one of the most widely practiced martial arts globally. The art also forms the foundation of Brazilian Jiu-Jitsu, as Judo master Mitsuyo Maeda transmitted the art to the Gracie family in Brazil.",
        famousPractitioners: [
            "Jigoro Kano (founder)",
            "Ronda Rousey",
            "Teddy Riner",
            "Vladimir Putin",
        ],
        image: "/images/judo.jpg",
    },

    // ─────────────────────────────────────────────────────────────
    // 5. KARATE
    // ─────────────────────────────────────────────────────────────
    {
        id: "karate",
        name: "Karate",
        origin: "Japan (Okinawa)",
        tagline: "Discipline and precision through punches, kicks, and kata.",
        style: "Striking",
        bestFor: ["Discipline", "Self-defense", "Sport", "Fitness"],
        difficulty: 5,
        injuryRisk: 4,
        fitnessRequired: 5,
        equipmentList: [
            { item: "Karate gi (uniform)", estimatedCostUSD: 40 },
            { item: "Belt", estimatedCostUSD: 8 },
            { item: "Sparring gloves", estimatedCostUSD: 30 },
            { item: "Foot pads", estimatedCostUSD: 25 },
            { item: "Mouth guard", estimatedCostUSD: 15 },
        ],
        history:
            "Karate developed on the Ryukyu Islands (modern-day Okinawa, Japan) as a fusion of indigenous fighting techniques and Chinese martial arts, particularly from Fujian province. It remained largely secret until the early 20th century, when Gichin Funakoshi introduced the art to mainland Japan, establishing it as a formal discipline with an emphasis on character development alongside fighting ability. The word 'karate' means 'empty hand,' reflecting its unarmed nature. Multiple styles emerged over the decades, including Shotokan, Kyokushin, and Goju-Ryu, each with distinct emphases on kata (forms) and sparring. Karate made its Olympic debut at the Tokyo 2020 Games, cementing its status as a major international sport.",
        famousPractitioners: [
            "Gichin Funakoshi (founder of Shotokan)",
            "Chuck Norris",
            "Lyoto Machida (MMA)",
            "Daniel LaRusso (fictional, The Karate Kid)",
        ],
        image: "/images/karate.jpg",
    },

    // ─────────────────────────────────────────────────────────────
    // 6. TAEKWONDO
    // ─────────────────────────────────────────────────────────────
    {
        id: "taekwondo",
        name: "Taekwondo",
        origin: "South Korea",
        tagline: "Lightning-fast kicks and acrobatic strikes from South Korea.",
        style: "Striking",
        bestFor: ["Sport", "Fitness", "Discipline"],
        difficulty: 6,
        injuryRisk: 5,
        fitnessRequired: 7,
        equipmentList: [
            { item: "Dobok (uniform)", estimatedCostUSD: 40 },
            { item: "Belt", estimatedCostUSD: 8 },
            { item: "Sparring helmet", estimatedCostUSD: 45 },
            { item: "Chest protector", estimatedCostUSD: 50 },
            { item: "Forearm guards", estimatedCostUSD: 20 },
            { item: "Shin/instep guards", estimatedCostUSD: 25 },
            { item: "Mouth guard", estimatedCostUSD: 15 },
        ],
        history:
            "Taekwondo emerged in South Korea in the 1940s and 1950s as Korean martial artists combined native Korean fighting traditions — particularly Taekkyon — with influences from Japanese Karate following the end of Japanese occupation. General Choi Hong Hi is widely credited with systematizing and naming Taekwondo in 1955. The Korea Taekwondo Association was founded in 1959, and the art rapidly spread globally through military and diplomatic channels. Taekwondo became a demonstration sport at the 1988 Seoul Olympics and a full medal sport at the Sydney 2000 Olympics. It is now one of the most widely practiced martial arts in the world, with governing bodies in nearly every country.",
        famousPractitioners: [
            "Choi Hong Hi (founder)",
            "Hadi Saei",
            "Steven Lopez",
            "Jean-Claude Van Damme",
        ],
        image: "/images/taekwondo.jpg",
    },

    // ─────────────────────────────────────────────────────────────
    // 7. WRESTLING
    // ─────────────────────────────────────────────────────────────
    {
        id: "wrestling",
        name: "Wrestling",
        origin: "Ancient Greece",
        tagline: "Control, takedowns, and domination — the oldest sport on Earth.",
        style: "Grappling",
        bestFor: ["Sport", "Fitness", "Self-defense"],
        difficulty: 7,
        injuryRisk: 6,
        fitnessRequired: 9,
        equipmentList: [
            { item: "Wrestling singlet", estimatedCostUSD: 35 },
            { item: "Wrestling shoes", estimatedCostUSD: 60 },
            { item: "Headgear / ear guards", estimatedCostUSD: 30 },
            { item: "Mouth guard", estimatedCostUSD: 15 },
            { item: "Knee pads", estimatedCostUSD: 20 },
        ],
        history:
            "Wrestling is arguably the world's oldest sport, with cave paintings depicting wrestling holds estimated to be 15,000 years old and formal competitions recorded in ancient Mesopotamia and Egypt. It was a central event in the ancient Greek Olympics beginning in 708 BC and features prominently in mythology, including the famed match between the hero Heracles and Antaeus. Modern competitive wrestling is divided into Freestyle and Greco-Roman disciplines, both of which have been Olympic sports since the modern Games began in 1896. In the United States, collegiate wrestling became a major feeder system for world-class competitors and eventual MMA fighters. Wrestlers are widely considered among the most well-rounded and physically conditioned athletes in combat sports.",
        famousPractitioners: [
            "Dan Gable",
            "Cael Sanderson",
            "Khabib Nurmagomedov (MMA)",
            "Brock Lesnar (MMA / WWE)",
        ],
        image: "/images/wrestling.jpg",
    },

    // ─────────────────────────────────────────────────────────────
    // 8. KRAV MAGA
    // ─────────────────────────────────────────────────────────────
    {
        id: "krav-maga",
        name: "Krav Maga",
        origin: "Israel",
        tagline: "No rules, no sport — pure street survival developed by the IDF.",
        style: "Mixed",
        bestFor: ["Self-defense"],
        difficulty: 6,
        injuryRisk: 7,
        fitnessRequired: 6,
        equipmentList: [
            { item: "Training gloves", estimatedCostUSD: 40 },
            { item: "Mouth guard", estimatedCostUSD: 15 },
            { item: "Groin protector", estimatedCostUSD: 20 },
            { item: "Shin guards", estimatedCostUSD: 35 },
            { item: "Comfortable clothing", estimatedCostUSD: 30 },
        ],
        history:
            "Krav Maga was developed in the 1940s by Imi Lichtenfeld, a Czech-Israeli martial artist who initially created fighting techniques to defend the Jewish community in Bratislava against fascist groups before World War II. After immigrating to what would become Israel, Lichtenfeld refined the system for use by the Israeli Defense Forces (IDF), where it became the official hand-to-hand combat method. The name means 'contact combat' in Hebrew. Unlike traditional martial arts, Krav Maga has no sport or competition component — every technique is designed to neutralize real-world threats as quickly and efficiently as possible, including defenses against weapons and multiple attackers. It has been adopted by law enforcement and military units around the world and gained civilian popularity in the 1990s and 2000s.",
        famousPractitioners: [
            "Imi Lichtenfeld (founder)",
            "Eyal Yanilov",
            "Jennifer Lopez (trained for films)",
            "James Bond (fictional)",
        ],
        image: "/images/krav-maga.jpg",
    },

    // ─────────────────────────────────────────────────────────────
    // 9. KUNG FU
    // ─────────────────────────────────────────────────────────────
    {
        id: "kung-fu",
        name: "Kung Fu",
        origin: "China",
        tagline: "Ancient Chinese tradition blending fluid strikes, forms, and philosophy.",
        style: "Striking",
        bestFor: ["Discipline", "Fitness", "Self-defense"],
        difficulty: 7,
        injuryRisk: 4,
        fitnessRequired: 6,
        equipmentList: [
            { item: "Training uniform", estimatedCostUSD: 40 },
            { item: "Sash/belt", estimatedCostUSD: 10 },
            { item: "Kung Fu shoes", estimatedCostUSD: 30 },
            { item: "Hand pads", estimatedCostUSD: 25 },
            { item: "Training weapons (optional)", estimatedCostUSD: 40 },
        ],
        history:
            "Kung Fu, also known as Wushu or Gongfu, is an umbrella term for hundreds of Chinese martial art styles developed over thousands of years. Its origins are often traced to the Shaolin Monastery in Henan province, where monks are said to have developed fighting techniques inspired by animal movements and Taoist philosophy, though Chinese martial arts existed long before the monastery. Major styles include Wing Chun, Tai Chi, Hung Gar, and Praying Mantis, each with distinct techniques and philosophies. Kung Fu became a global phenomenon in the 1970s largely through the films of Bruce Lee, who demonstrated that Chinese martial arts could be fast, practical, and visually spectacular. Today it encompasses both traditional schools focused on forms and philosophy, and modern Wushu as a competitive sport.",
        famousPractitioners: [
            "Bruce Lee",
            "Jackie Chan",
            "Jet Li",
            "Ip Man (Wing Chun grandmaster)",
        ],
        image: "/images/kung-fu.jpg",
    },

    // ─────────────────────────────────────────────────────────────
    // 10. AIKIDO
    // ─────────────────────────────────────────────────────────────
    {
        id: "aikido",
        name: "Aikido",
        origin: "Japan",
        tagline: "Redirect force, not fight it — harmony through joint locks and throws.",
        style: "Grappling",
        bestFor: ["Self-defense", "Discipline"],
        difficulty: 6,
        injuryRisk: 3,
        fitnessRequired: 3,
        equipmentList: [
            { item: "Aikido gi (uniform)", estimatedCostUSD: 60 },
            { item: "Hakama (after rank)", estimatedCostUSD: 50 },
            { item: "Belt", estimatedCostUSD: 10 },
            { item: "Wooden bokken (sword)", estimatedCostUSD: 25 },
            { item: "Jo staff", estimatedCostUSD: 20 },
        ],
        history:
            "Aikido was founded by Japanese martial artist Morihei Ueshiba in the early 20th century, drawing upon his mastery of Daito-ryu Aiki-jujutsu and integrating it with his spiritual beliefs rooted in the Omotokyo religion. Ueshiba's central philosophy was that true martial skill lies not in defeating opponents but in achieving harmony — the word 'Aikido' translates roughly as 'the way of harmonious spirit.' The art emphasizes using an attacker's momentum against them through joint locks, throws, and redirections rather than meeting force with force. Ueshiba formally established Aikido as a discipline in 1942, and his students spread it internationally following World War II. It is practiced today more as a philosophical and spiritual discipline than a competitive sport, as there are no Aikido tournaments.",
        famousPractitioners: [
            "Morihei Ueshiba (founder)",
            "Gozo Shioda",
            "Steven Seagal",
            "Christian Tissier",
        ],
        image: "/images/aikido.jpg",
    },

    // ─────────────────────────────────────────────────────────────
    // 11. KICKBOXING
    // ─────────────────────────────────────────────────────────────
    {
        id: "kickboxing",
        name: "Kickboxing",
        origin: "Japan / United States",
        tagline: "High-energy striking combining boxing punches with powerful kicks.",
        style: "Striking",
        bestFor: ["Fitness", "Sport", "Self-defense"],
        difficulty: 5,
        injuryRisk: 6,
        fitnessRequired: 7,
        equipmentList: [
            { item: "Boxing gloves", estimatedCostUSD: 60 },
            { item: "Hand wraps", estimatedCostUSD: 10 },
            { item: "Shin guards", estimatedCostUSD: 40 },
            { item: "Mouth guard", estimatedCostUSD: 15 },
            { item: "Headgear", estimatedCostUSD: 55 },
            { item: "Kickboxing shorts", estimatedCostUSD: 30 },
            { item: "Jump rope", estimatedCostUSD: 15 },
        ],
        history:
            "Kickboxing emerged simultaneously in Japan and the United States during the 1950s and 1960s as martial artists sought to combine the hand techniques of Western boxing with the kicking methods of Karate and Muay Thai. Japanese promoter Osamu Noguchi is widely credited with formalising the sport in Japan in the 1960s, while American full-contact karate developed independently on the West Coast around the same time. The sport gained widespread mainstream appeal in the 1970s and 1980s through televised bouts and the rise of prominent champions like Benny Urquidez. Today kickboxing encompasses several rulesets — K-1, American full-contact, and low-kick — each with slightly different permitted techniques. It is also one of the most popular fitness training formats globally, practiced by millions who never intend to compete.",
        famousPractitioners: [
            "Benny Urquidez",
            "Giorgio Petrosyan",
            "Rico Verhoeven",
            "Billy Blanks (Tae Bo fitness)",
        ],
        image: "/images/kickboxing.jpg",
    },

    // ─────────────────────────────────────────────────────────────
    // 12. MMA (MIXED MARTIAL ARTS)
    // ─────────────────────────────────────────────────────────────
    {
        id: "mma",
        name: "MMA",
        origin: "United States",
        tagline: "No rules, every range — the complete combat sport blending all disciplines.",
        style: "Mixed",
        bestFor: ["Sport", "Fitness", "Self-defense"],
        difficulty: 9,
        injuryRisk: 9,
        fitnessRequired: 10,
        equipmentList: [
            { item: "MMA gloves", estimatedCostUSD: 45 },
            { item: "Boxing gloves", estimatedCostUSD: 60 },
            { item: "Hand wraps", estimatedCostUSD: 10 },
            { item: "Shin guards", estimatedCostUSD: 40 },
            { item: "Mouth guard", estimatedCostUSD: 20 },
            { item: "Groin protector", estimatedCostUSD: 25 },
            { item: "Headgear", estimatedCostUSD: 55 },
            { item: "Rash guard", estimatedCostUSD: 35 },
            { item: "MMA shorts", estimatedCostUSD: 40 },
        ],
        history:
            "Mixed Martial Arts as a modern sport was catalysed by the launch of the Ultimate Fighting Championship (UFC) in 1993, created to determine which martial art was most effective in a real fight with minimal rules. Early events featured specialists from single disciplines — Brazilian Jiu-Jitsu, Wrestling, Boxing, Sumo — competing against each other, and it quickly became clear that fighters who could operate across multiple ranges had a decisive advantage. The sport drew on earlier traditions of vale tudo (anything goes) fighting in Brazil and shoot wrestling in Japan. Over the following decades athletes began cross-training comprehensively, and MMA evolved into its own distinct discipline requiring proficiency in striking, wrestling, and ground fighting. Today the UFC is the largest combat sports organisation in the world, and MMA is practised by millions as both a competitive sport and a comprehensive self-defence system.",
        famousPractitioners: [
            "Conor McGregor",
            "Khabib Nurmagomedov",
            "Jon Jones",
            "Amanda Nunes",
        ],
        image: "/images/mma.jpg",
    },

    // ─────────────────────────────────────────────────────────────
    // 13. BARE KNUCKLE FIGHTING
    // ─────────────────────────────────────────────────────────────
    {
        id: "bare-knuckle",
        name: "Bare Knuckle",
        origin: "United Kingdom",
        tagline: "Raw, unpadded striking — the original form of fist fighting.",
        style: "Striking",
        bestFor: ["Sport", "Self-defense"],
        difficulty: 7,
        injuryRisk: 10,
        fitnessRequired: 8,
        equipmentList: [
            { item: "Hand wrap / gauze", estimatedCostUSD: 8 },
            { item: "Mouth guard", estimatedCostUSD: 20 },
            { item: "Groin protector", estimatedCostUSD: 25 },
            { item: "Boxing shoes", estimatedCostUSD: 60 },
            { item: "Heavy bag", estimatedCostUSD: 120 },
            { item: "Comfortable shorts", estimatedCostUSD: 25 },
        ],
        history:
            "Bare knuckle fighting is the oldest codified form of boxing, predating the use of padded gloves by centuries. It was the dominant form of prize fighting in Britain and America throughout the 18th and 19th centuries, governed by the London Prize Ring Rules of 1743 which established the first formal framework for the sport. Bouts were often fought to exhaustion with no round limits, and champions like Jem Mace and John L. Sullivan became genuine national celebrities. The introduction of the Marquess of Queensberry Rules in 1867 — requiring gloves and timed rounds — gradually displaced bare knuckle as the mainstream standard, and the sport was effectively driven underground for over a century. It has experienced a significant organised revival since the 2010s through promotions such as Bare Knuckle Fighting Championship (BKFC), which operates legally in numerous US states and internationally, attracting both veteran boxers and MMA fighters.",
        famousPractitioners: [
            "John L. Sullivan (last bare knuckle heavyweight champion)",
            "Jem Mace",
            "Paulie Malignaggi (crossed over from boxing)",
            "Artem Lobov (crossed over from MMA)",
        ],
        image: "/images/bare-knuckle.jpg",
    },

];

// ─────────────────────────────────────────────────────────────
// Helper utilities — available globally on all pages
// ─────────────────────────────────────────────────────────────

/**
 * Look up a single martial art by its id slug.
 * Returns undefined if not found.
 * @param {string} id
 * @returns {object|undefined}
 */
function getArtById(id) {
    return MARTIAL_ARTS.find(art => art.id === id);
}

/**
 * Calculate the total estimated equipment cost for a martial art.
 * @param {object} art — a MARTIAL_ARTS entry
 * @returns {number} total USD cost
 */
function getTotalEquipmentCost(art) {
    return art.equipmentList.reduce((sum, e) => sum + e.estimatedCostUSD, 0);
}

/**
 * Return arts that share the same style as the given art,
 * excluding the art itself. Useful for "Related Arts" sections.
 * @param {object} art — a MARTIAL_ARTS entry
 * @param {number} limit — max number to return (default 3)
 * @returns {object[]}
 */
function getRelatedArts(art, limit = 3) {
    return MARTIAL_ARTS
        .filter(a => a.style === art.style && a.id !== art.id)
        .slice(0, limit);
}

/**
 * Return a shuffled copy of the MARTIAL_ARTS array.
 * Useful for randomly featuring arts on the home page.
 * @returns {object[]}
 */
function getShuffledArts() {
    return [...MARTIAL_ARTS].sort(() => Math.random() - 0.5);
}