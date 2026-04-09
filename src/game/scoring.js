import {
    SCORE_REP_MULTIPLIER,
    SCORE_ACCURACY_MULTIPLIER,
    SCORE_ACCURACY_THRESHOLD,
    SCORE_STREAK_MULTIPLIER,
    SCORE_WPM_MULTIPLIER,
    RIVAL_SCORES,
    SPEED_TIERS,
} from './constants.js';

/**
 * Calculate the round score using the GDD formula:
 *   (Reps x 100) + ((Accuracy% - 80) x 50 if >80%) + (Streak x 10) + (WPM x 20)
 */
export function calculateScore({ totalReps, accuracy, longestStreak, avgWPM }) {
    const repScore = totalReps * SCORE_REP_MULTIPLIER;

    let accuracyBonus = 0;
    if (accuracy > SCORE_ACCURACY_THRESHOLD) {
        accuracyBonus = (accuracy - SCORE_ACCURACY_THRESHOLD) * SCORE_ACCURACY_MULTIPLIER;
    }

    const streakBonus = longestStreak * SCORE_STREAK_MULTIPLIER;
    const speedBonus = avgWPM * SCORE_WPM_MULTIPLIER;

    return Math.round(repScore + accuracyBonus + streakBonus + speedBonus);
}

/**
 * Generate 3 rival scores (bronze, silver, gold) randomised within the
 * ranges defined in constants.js for the given difficulty.
 * Returns { bronze: number, silver: number, gold: number }.
 */
export function generateRivalScores(difficulty) {
    const ranges = RIVAL_SCORES[difficulty] || RIVAL_SCORES.medium;

    function randInRange([min, max]) {
        return Math.round(min + Math.random() * (max - min));
    }

    return {
        bronze: randInRange(ranges.bronze),
        silver: randInRange(ranges.silver),
        gold: randInRange(ranges.gold),
    };
}

/**
 * Determine placement (1-4) based on player score vs rival scores.
 * 1 = 1st place (beat all), 4 = no podium (beat none).
 */
export function calculatePlacement(playerScore, rivalScores) {
    const rivals = [rivalScores.bronze, rivalScores.silver, rivalScores.gold];
    const beaten = rivals.filter(r => playerScore > r).length;

    // beaten 3 → 1st, 2 → 2nd, 1 → 3rd, 0 → 4th
    return 4 - beaten;
}

/**
 * Estimate total reps based on WPM and round duration.
 * Each speed tier has a curlInterval (seconds per rep).
 * We use the tier matching the given WPM.
 */
export function calculateReps(wpm, roundDuration) {
    // Find the matching speed tier
    let curlInterval = SPEED_TIERS[0].curlInterval; // default slowest
    for (const tier of SPEED_TIERS) {
        if (wpm >= tier.minWPM && wpm <= tier.maxWPM) {
            curlInterval = tier.curlInterval;
            break;
        }
    }

    return Math.floor(roundDuration / curlInterval);
}
