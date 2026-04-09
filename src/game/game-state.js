import { TOURNAMENT_ROUNDS, ROUND_DURATION } from './constants.js';

/**
 * GameState — manages the current game mode, round progression,
 * difficulty, and score history.
 */
export class GameState {
    constructor() {
        this._mode = null;        // 'quick_pump' | 'tournament' | 'endless'
        this._difficulty = 'medium';
        this._currentRound = 0;   // 0-indexed internally
        this._scores = [];        // array of { round, playerScore, rivalScores, placement }
        this._eliminated = false;
    }

    // ── Mode starters ───────────────────────────────────────────

    startQuickPump(difficulty = 'medium') {
        this._mode = 'quick_pump';
        this._difficulty = difficulty;
        this._currentRound = 0;
        this._scores = [];
        this._eliminated = false;
    }

    startTournament(difficulty = 'medium') {
        this._mode = 'tournament';
        this._difficulty = difficulty;
        this._currentRound = 0;
        this._scores = [];
        this._eliminated = false;
    }

    startEndless(difficulty = 'medium') {
        this._mode = 'endless';
        this._difficulty = difficulty;
        this._currentRound = 0;
        this._scores = [];
        this._eliminated = false;
    }

    // ── Getters ─────────────────────────────────────────────────

    get mode() {
        return this._mode;
    }

    get difficulty() {
        return this._difficulty;
    }

    /** 1-indexed round number for display. */
    get currentRound() {
        return this._currentRound + 1;
    }

    get totalRounds() {
        if (this._mode === 'tournament') return TOURNAMENT_ROUNDS.length;
        return 1;
    }

    get scores() {
        return this._scores;
    }

    /**
     * Get the tournament round config for the current round.
     * Returns { name, difficulty, duration } or a default for non-tournament modes.
     */
    getRoundConfig() {
        if (this._mode === 'tournament') {
            const idx = Math.min(this._currentRound, TOURNAMENT_ROUNDS.length - 1);
            return TOURNAMENT_ROUNDS[idx];
        }
        return {
            name: this._mode === 'endless' ? 'Endless Reps' : 'Quick Pump',
            difficulty: this._difficulty,
            duration: ROUND_DURATION,
        };
    }

    // ── Round progression ───────────────────────────────────────

    /**
     * Record the result of the current round.
     */
    recordResult({ playerScore, rivalScores, placement }) {
        this._scores.push({
            round: this.currentRound,
            playerScore,
            rivalScores,
            placement,
        });

        // Tournament elimination: must place 3rd or better (placement <= 3)
        if (this._mode === 'tournament' && placement > 3) {
            this._eliminated = true;
        }
    }

    /**
     * Advance to the next round (tournament mode).
     * Returns true if there is a next round, false if tournament is over.
     */
    advanceRound() {
        if (this._eliminated) return false;
        if (this._mode !== 'tournament') return false;

        this._currentRound++;
        return this._currentRound < TOURNAMENT_ROUNDS.length;
    }

    /**
     * Whether the player has been eliminated (placed 4th in tournament).
     */
    isEliminated() {
        return this._eliminated;
    }

    /**
     * Whether the player has won the tournament (completed all rounds without elimination).
     */
    isTournamentComplete() {
        if (this._mode !== 'tournament') return false;
        return this._currentRound >= TOURNAMENT_ROUNDS.length - 1
            && this._scores.length === TOURNAMENT_ROUNDS.length
            && !this._eliminated;
    }
}
