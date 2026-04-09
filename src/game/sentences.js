/**
 * Sentence bank for Type Builder.
 *
 * Categories: gym_motivation, bodybuilding_facts, exercise_instructions,
 *             nutrition_tips, trash_talk, general
 * Difficulty:  easy, medium, hard, elite
 */

const SENTENCES = [
    // ── Gym Motivation ──────────────────────────────────────────
    { text: "No pain no gain.",                                         category: "gym_motivation", difficulty: "easy" },
    { text: "Lift big get big.",                                        category: "gym_motivation", difficulty: "easy" },
    { text: "Push your limits.",                                        category: "gym_motivation", difficulty: "easy" },
    { text: "Stay strong and lift on.",                                 category: "gym_motivation", difficulty: "easy" },
    { text: "The iron never lies to you.",                              category: "gym_motivation", difficulty: "medium" },
    { text: "Pain is temporary, gains are forever.",                    category: "gym_motivation", difficulty: "medium" },
    { text: "Champions train while others sleep.",                      category: "gym_motivation", difficulty: "medium" },
    { text: "Your body can stand almost anything, it is your mind you must convince.", category: "gym_motivation", difficulty: "hard" },
    { text: "The last three or four reps is what makes the muscle grow.", category: "gym_motivation", difficulty: "hard" },
    { text: "Success is not given, it is earned in the gym one rep at a time.", category: "gym_motivation", difficulty: "hard" },
    { text: "Strength does not come from winning, it comes from struggles and hardship.", category: "gym_motivation", difficulty: "hard" },
    { text: "The only bad workout is the one that did not happen.",     category: "gym_motivation", difficulty: "medium" },
    { text: "Sweat is just fat crying.",                                category: "gym_motivation", difficulty: "easy" },
    { text: "Dream big, lift bigger.",                                  category: "gym_motivation", difficulty: "easy" },
    { text: "The difference between a champion and everyone else is the willingness to push through pain at 110% effort.", category: "gym_motivation", difficulty: "elite" },
    { text: "When you feel like quitting, remember why you started; discipline beats motivation every single day.", category: "gym_motivation", difficulty: "elite" },

    // ── Bodybuilding Facts ──────────────────────────────────────
    { text: "Arnold won seven titles.",                                 category: "bodybuilding_facts", difficulty: "easy" },
    { text: "Muscles need rest to grow.",                               category: "bodybuilding_facts", difficulty: "easy" },
    { text: "Protein builds muscle mass.",                              category: "bodybuilding_facts", difficulty: "easy" },
    { text: "The bicep has two heads.",                                 category: "bodybuilding_facts", difficulty: "easy" },
    { text: "Arnold Schwarzenegger won seven Mr. Olympia titles.",      category: "bodybuilding_facts", difficulty: "medium" },
    { text: "The first bodybuilding contest was held in London in 1901.", category: "bodybuilding_facts", difficulty: "medium" },
    { text: "Bodybuilders often eat six small meals per day to fuel growth.", category: "bodybuilding_facts", difficulty: "medium" },
    { text: "The human body contains over 600 skeletal muscles.",       category: "bodybuilding_facts", difficulty: "medium" },
    { text: "Progressive overload is the principle of gradually increasing weight to build strength over time.", category: "bodybuilding_facts", difficulty: "hard" },
    { text: "Ronnie Coleman holds the record with 8 consecutive Mr. Olympia wins from 1998 to 2005.", category: "bodybuilding_facts", difficulty: "hard" },
    { text: "Eugen Sandow, often called the father of modern bodybuilding, popularized muscle display in the 1890s.", category: "bodybuilding_facts", difficulty: "hard" },
    { text: "Muscle hypertrophy occurs when the rate of protein synthesis exceeds the rate of protein breakdown.", category: "bodybuilding_facts", difficulty: "hard" },
    { text: "The Mr. Olympia competition, founded by Joe Weider in 1965, remains the most prestigious bodybuilding event worldwide.", category: "bodybuilding_facts", difficulty: "elite" },
    { text: "Skeletal muscle accounts for approximately 40% of total body weight; each fiber can contract up to 100 times per second.", category: "bodybuilding_facts", difficulty: "elite" },
    { text: "Flex Wheeler's 1993 Arnold Classic routine scored 290 points, widely considered one of the greatest posing performances.", category: "bodybuilding_facts", difficulty: "elite" },
    { text: "The bench press record is 701 lbs.",                       category: "bodybuilding_facts", difficulty: "medium" },

    // ── Exercise Instructions ───────────────────────────────────
    { text: "Keep your back straight.",                                 category: "exercise_instructions", difficulty: "easy" },
    { text: "Grip the bar tight.",                                      category: "exercise_instructions", difficulty: "easy" },
    { text: "Bend at the knees.",                                       category: "exercise_instructions", difficulty: "easy" },
    { text: "Breathe out as you lift.",                                 category: "exercise_instructions", difficulty: "easy" },
    { text: "Keep your elbows close to your body during curls.",        category: "exercise_instructions", difficulty: "medium" },
    { text: "Squeeze the muscle at the top of each rep.",               category: "exercise_instructions", difficulty: "medium" },
    { text: "Lower the weight slowly to maximize time under tension.",  category: "exercise_instructions", difficulty: "medium" },
    { text: "Stand with your feet shoulder width apart and brace your core.", category: "exercise_instructions", difficulty: "medium" },
    { text: "During a deadlift, hinge at the hips, keep the bar close to your shins, and drive through your heels.", category: "exercise_instructions", difficulty: "hard" },
    { text: "For proper squat form, descend until your thighs are parallel to the floor while keeping your chest upright.", category: "exercise_instructions", difficulty: "hard" },
    { text: "Maintain a neutral spine throughout the entire movement to avoid lower back injury.", category: "exercise_instructions", difficulty: "hard" },
    { text: "Retract your shoulder blades and arch your upper back slightly before unracking the barbell for a bench press.", category: "exercise_instructions", difficulty: "hard" },
    { text: "Performing 3 sets of 8-12 repetitions at 70% of your one-rep max is optimal for hypertrophy training.", category: "exercise_instructions", difficulty: "elite" },
    { text: "Supinate your wrists at the top of a dumbbell curl to fully engage the biceps brachii and brachialis muscles.", category: "exercise_instructions", difficulty: "elite" },
    { text: "The Romanian deadlift targets the hamstrings and glutes; keep a slight bend in your knees throughout the eccentric phase.", category: "exercise_instructions", difficulty: "elite" },
    { text: "Warm up with light sets first.",                           category: "exercise_instructions", difficulty: "easy" },

    // ── Nutrition Tips ──────────────────────────────────────────
    { text: "Drink lots of water.",                                     category: "nutrition_tips", difficulty: "easy" },
    { text: "Eat more greens.",                                         category: "nutrition_tips", difficulty: "easy" },
    { text: "Protein helps you grow.",                                  category: "nutrition_tips", difficulty: "easy" },
    { text: "Skip the junk food.",                                      category: "nutrition_tips", difficulty: "easy" },
    { text: "A balanced diet includes protein, carbs, and healthy fats.", category: "nutrition_tips", difficulty: "medium" },
    { text: "Eat within thirty minutes after your workout for best results.", category: "nutrition_tips", difficulty: "medium" },
    { text: "Chicken breast and brown rice is a classic bodybuilding meal.", category: "nutrition_tips", difficulty: "medium" },
    { text: "Aim for one gram of protein per pound of body weight each day.", category: "nutrition_tips", difficulty: "medium" },
    { text: "Complex carbohydrates like oats, sweet potatoes, and whole grain bread provide sustained energy for training.", category: "nutrition_tips", difficulty: "hard" },
    { text: "Tracking your daily macronutrient intake is essential for making consistent progress in muscle building.", category: "nutrition_tips", difficulty: "hard" },
    { text: "Creatine monohydrate is one of the most researched and effective supplements for strength and power.", category: "nutrition_tips", difficulty: "hard" },
    { text: "Micronutrients such as zinc, magnesium, and vitamin D play critical roles in testosterone production.", category: "nutrition_tips", difficulty: "hard" },
    { text: "A post-workout shake containing 30-40g of whey protein and 50-60g of fast-digesting carbs accelerates recovery.", category: "nutrition_tips", difficulty: "elite" },
    { text: "Intermittent fasting protocols like 16:8 can be effective for fat loss while preserving lean muscle tissue.", category: "nutrition_tips", difficulty: "elite" },
    { text: "Consuming 2,500-3,500 calories daily during a bulking phase, split across 5-6 meals, supports optimal hypertrophy.", category: "nutrition_tips", difficulty: "elite" },
    { text: "Hydration affects strength output.",                       category: "nutrition_tips", difficulty: "easy" },

    // ── Trash Talk ──────────────────────────────────────────────
    { text: "You call that a rep?",                                     category: "trash_talk", difficulty: "easy" },
    { text: "Is that all you got?",                                     category: "trash_talk", difficulty: "easy" },
    { text: "My warmup is your max.",                                   category: "trash_talk", difficulty: "easy" },
    { text: "Too slow, too weak.",                                      category: "trash_talk", difficulty: "easy" },
    { text: "Flex McQueen thinks he is better than you. Prove him wrong.", category: "trash_talk", difficulty: "medium" },
    { text: "Iron Ivan eats keyboards for breakfast. Can you keep up?", category: "trash_talk", difficulty: "medium" },
    { text: "Tony the Tank has been lifting for thirty years. Show some respect.", category: "trash_talk", difficulty: "medium" },
    { text: "The judges are watching and they are not impressed so far.", category: "trash_talk", difficulty: "medium" },
    { text: "You think typing makes muscle? Every correct keystroke pumps iron through your veins.", category: "trash_talk", difficulty: "hard" },
    { text: "The crowd is getting restless and your rivals are pulling ahead. Time to step it up.", category: "trash_talk", difficulty: "hard" },
    { text: "Iron Ivan just finished his set and the judges gave him a standing ovation. Your move.", category: "trash_talk", difficulty: "hard" },
    { text: "Flex McQueen is doing his signature pose and the audience loves it. Better type faster.", category: "trash_talk", difficulty: "hard" },
    { text: "Looking good is half the battle, bro. The other half? Also looking good. At least that is what Flex McQueen believes.", category: "trash_talk", difficulty: "elite" },
    { text: "Thirty years in the gym, kid. My fingers are not fast but my heart is in it. That is Tony's motto.", category: "trash_talk", difficulty: "elite" },
    { text: "The championship trophy sits under the spotlight, waiting for someone worthy; will your typing earn the gold?", category: "trash_talk", difficulty: "elite" },
    { text: "Winners never quit.",                                      category: "trash_talk", difficulty: "easy" },

    // ── Gym Life ─────────────────────────────────────────────────
    { text: "Rest day is leg day.",                                     category: "gym_life", difficulty: "easy" },
    { text: "Hit the gym hard.",                                        category: "gym_life", difficulty: "easy" },
    { text: "Train like a beast.",                                      category: "gym_life", difficulty: "easy" },
    { text: "Never skip leg day.",                                      category: "gym_life", difficulty: "easy" },
    { text: "The gym is my second home and the barbell is my best friend.", category: "gym_life", difficulty: "medium" },
    { text: "Every set counts when you are chasing a personal record.", category: "gym_life", difficulty: "medium" },
    { text: "A strong mind builds a strong body one workout at a time.", category: "gym_life", difficulty: "medium" },
    { text: "Your only competition is who you were yesterday in the gym.", category: "gym_life", difficulty: "medium" },
    { text: "Compound movements like squats, deadlifts, and bench press should form the foundation of any serious program.", category: "gym_life", difficulty: "hard" },
    { text: "Progressive overload means adding weight, reps, or sets over time to keep forcing adaptation.", category: "gym_life", difficulty: "hard" },
    { text: "Deload weeks are essential for recovery; reduce volume by 40-50% every fourth or fifth week.", category: "gym_life", difficulty: "hard" },
    { text: "Muscle memory is real; previously trained muscles regain size faster due to retained myonuclei.", category: "gym_life", difficulty: "hard" },
    { text: "The mind-muscle connection, or focusing on the target muscle during each rep, has been shown to increase activation by up to 20%.", category: "gym_life", difficulty: "elite" },
    { text: "Periodization divides training into mesocycles of 4-6 weeks, each emphasizing hypertrophy, strength, or power phases.", category: "gym_life", difficulty: "elite" },
    { text: "A proper warm-up routine including dynamic stretches and 2-3 ramping sets can reduce injury risk and boost performance.", category: "gym_life", difficulty: "elite" },
    { text: "Earn your rest days.",                                     category: "gym_life", difficulty: "easy" },
];

// ── Helpers ─────────────────────────────────────────────────

function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// ── Exports ─────────────────────────────────────────────────

/**
 * Return `count` randomised sentence strings filtered by difficulty.
 * If difficulty is null/undefined, all difficulties are included.
 */
export function getSentences(difficulty, count) {
    let pool = SENTENCES;
    if (difficulty) {
        pool = pool.filter(s => s.difficulty === difficulty);
    }
    const shuffled = shuffle(pool);
    return shuffled.slice(0, count).map(s => s.text);
}

/**
 * Return sentences appropriate for a tournament round (1-indexed).
 * Difficulty escalates per the GDD tournament table.
 */
const ROUND_DIFFICULTY_MAP = [
    { difficulties: ['easy'],            count: 20 },  // Round 1: Local Gym Contest
    { difficulties: ['easy', 'medium'],  count: 20 },  // Round 2: Regional Championship
    { difficulties: ['medium'],          count: 20 },  // Round 3: State Finals
    { difficulties: ['medium', 'hard'],  count: 20 },  // Round 4: National Qualifier
    { difficulties: ['hard', 'elite'],   count: 25 },  // Round 5: Mr. Type Universe
];

export function getSentencesForRound(roundNumber) {
    const index = Math.max(0, Math.min(roundNumber - 1, ROUND_DIFFICULTY_MAP.length - 1));
    const config = ROUND_DIFFICULTY_MAP[index];

    const pool = SENTENCES.filter(s => config.difficulties.includes(s.difficulty));
    const shuffled = shuffle(pool);
    return shuffled.slice(0, config.count).map(s => s.text);
}
