// Base NES resolution
export const BASE_WIDTH = 256;
export const BASE_HEIGHT = 240;

// Scale factor (will be calculated dynamically)
export const MIN_SCALE = 2;
export const MAX_SCALE = 4;

// Game timing
export const ROUND_DURATION = 60; // seconds
export const FINAL_ROUND_DURATION = 75; // seconds (Round 5)
export const COUNTDOWN_DURATION = 3; // seconds
export const FPS = 60;

// Typing speed tiers (WPM thresholds)
export const SPEED_TIERS = [
    { name: 'slow',      minWPM: 0,  maxWPM: 20,  curlInterval: 4.0,  effect: 'struggle' },
    { name: 'average',   minWPM: 21, maxWPM: 40,  curlInterval: 2.5,  effect: 'normal' },
    { name: 'fast',      minWPM: 41, maxWPM: 60,  curlInterval: 1.5,  effect: 'speedlines' },
    { name: 'very_fast', minWPM: 61, maxWPM: 80,  curlInterval: 1.0,  effect: 'screenshake' },
    { name: 'elite',     minWPM: 81, maxWPM: 999, curlInterval: 0.7,  effect: 'blazing' },
];

// Scoring formula constants
export const SCORE_REP_MULTIPLIER = 100;
export const SCORE_ACCURACY_MULTIPLIER = 50;
export const SCORE_ACCURACY_THRESHOLD = 80;
export const SCORE_STREAK_MULTIPLIER = 10;
export const SCORE_WPM_MULTIPLIER = 20;

// AI Rival score ranges per difficulty
export const RIVAL_SCORES = {
    easy:   { bronze: [2000, 3500], silver: [3500, 5000], gold: [5000, 7000] },
    medium: { bronze: [3500, 5000], silver: [5000, 6500], gold: [6500, 8500] },
    hard:   { bronze: [5500, 7000], silver: [7000, 8500], gold: [8500, 11000] },
};

// Tournament rounds
export const TOURNAMENT_ROUNDS = [
    { name: 'Local Gym Contest',      difficulty: 'easy',   duration: ROUND_DURATION },
    { name: 'Regional Championship',  difficulty: 'easy',   duration: ROUND_DURATION },
    { name: 'State Finals',           difficulty: 'medium', duration: ROUND_DURATION },
    { name: 'National Qualifier',     difficulty: 'medium', duration: ROUND_DURATION },
    { name: 'Mr. Type Universe',      difficulty: 'hard',   duration: FINAL_ROUND_DURATION },
];

// Colors
export const COLORS = {
    bg:          '#1a1a2e',
    text:        '#ffffff',
    textCorrect: '#4ade80',
    textError:   '#ef4444',
    textDim:     '#666666',
    accent:      '#f59e0b',
    gold:        '#ffd700',
    silver:      '#c0c0c0',
    bronze:      '#cd7f32',
    stage:       '#2d1b69',
    gym:         '#3d2b1f',
};

// Game states
export const GAME_STATES = {
    MENU:        'menu',
    PRE_ROUND:   'pre_round',
    COUNTDOWN:   'countdown',
    TYPING:      'typing',
    RESULTS:     'results',
    COMPETITION: 'competition',
    PODIUM:      'podium',
};

// Streak milestone interval
export const STREAK_MILESTONE = 25;
