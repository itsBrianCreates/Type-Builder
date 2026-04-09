import { STREAK_MILESTONE } from './constants.js';

/**
 * TypingEngine — handles sentence presentation, keystroke tracking,
 * real-time WPM (rolling 5-second window), accuracy, streaks, and
 * event callbacks for the Type Builder game.
 */
export class TypingEngine {
    constructor() {
        this._sentences = [];
        this._sentenceIndex = 0;
        this._cursorPos = 0;

        // Per-character state for the current sentence: null | 'correct' | 'incorrect'
        this._charStates = [];

        // Keystroke counters
        this._totalCorrect = 0;
        this._totalErrors = 0;
        this._sentencesCompleted = 0;

        // Streak tracking
        this._streak = 0;
        this._longestStreak = 0;

        // Rolling WPM: timestamps of each correct character typed (kept for last 5 s)
        this._correctTimestamps = [];
        this._wpmWindow = 5; // seconds

        // Callbacks
        this.onCorrectKey = null;
        this.onErrorKey = null;
        this.onSentenceComplete = null;
        this.onStreakMilestone = null;
        this.onAllSentencesComplete = null;

        this._started = false;
    }

    // ── Public API ──────────────────────────────────────────────

    /**
     * Load an array of sentence strings and prepare the first one.
     */
    loadSentences(sentences) {
        this._sentences = sentences;
        this._sentenceIndex = 0;
        this._prepareSentence();
    }

    /**
     * Feed a single keypress into the engine.
     * @param {string} key - The key value (e.g. 'a', 'Backspace')
     */
    handleKey(key) {
        if (!this._sentences.length) return;

        const sentence = this.currentSentence;
        if (!sentence) return;

        if (key === 'Backspace') {
            this._handleBackspace();
            return;
        }

        // Ignore non-printable keys (Shift, Ctrl, etc.)
        if (key.length !== 1) return;

        this._started = true;
        const expected = sentence[this._cursorPos];

        if (key === expected) {
            this._charStates[this._cursorPos] = 'correct';
            this._totalCorrect++;
            this._streak++;

            if (this._streak > this._longestStreak) {
                this._longestStreak = this._streak;
            }

            // Record timestamp for rolling WPM
            this._correctTimestamps.push(performance.now());

            if (this.onCorrectKey) this.onCorrectKey(key, this._cursorPos);

            // Streak milestone
            if (this._streak > 0 && this._streak % STREAK_MILESTONE === 0) {
                if (this.onStreakMilestone) this.onStreakMilestone(this._streak);
            }

            this._cursorPos++;

            // Sentence complete?
            if (this._cursorPos >= sentence.length) {
                this._completeSentence();
            }
        } else {
            this._charStates[this._cursorPos] = 'incorrect';
            this._totalErrors++;
            this._streak = 0;

            if (this.onErrorKey) this.onErrorKey(key, this._cursorPos, expected);

            this._cursorPos++;

            // Even on error at last char, advance sentence
            if (this._cursorPos >= sentence.length) {
                this._completeSentence();
            }
        }
    }

    /**
     * Get the current WPM using a rolling window.
     * WPM = (chars in window / 5) / (window seconds / 60)
     */
    get wpm() {
        const now = performance.now();
        const windowMs = this._wpmWindow * 1000;

        // Prune old timestamps
        this._pruneTimestamps(now);

        const count = this._correctTimestamps.length;
        if (count < 2) return 0;

        const oldest = this._correctTimestamps[0];
        const elapsed = (now - oldest) / 1000; // seconds
        if (elapsed < 0.5) return 0; // avoid wild spikes at start

        // Standard WPM: (characters / 5) / (minutes)
        return Math.round((count / 5) / (elapsed / 60));
    }

    get accuracy() {
        const total = this._totalCorrect + this._totalErrors;
        if (total === 0) return 100;
        return Math.round((this._totalCorrect / total) * 100);
    }

    get currentSentence() {
        return this._sentences[this._sentenceIndex] || null;
    }

    get cursorPos() {
        return this._cursorPos;
    }

    get charStates() {
        return this._charStates;
    }

    get streak() {
        return this._streak;
    }

    get longestStreak() {
        return this._longestStreak;
    }

    get sentencesCompleted() {
        return this._sentencesCompleted;
    }

    get isComplete() {
        return this._sentenceIndex >= this._sentences.length;
    }

    get hasStarted() {
        return this._started;
    }

    /**
     * Return a stats snapshot.
     */
    getStats() {
        return {
            wpm: this.wpm,
            accuracy: this.accuracy,
            streak: this._streak,
            longestStreak: this._longestStreak,
            totalCorrect: this._totalCorrect,
            totalErrors: this._totalErrors,
            sentencesCompleted: this._sentencesCompleted,
        };
    }

    /**
     * Reset the engine for a new round.
     */
    reset() {
        this._sentences = [];
        this._sentenceIndex = 0;
        this._cursorPos = 0;
        this._charStates = [];
        this._totalCorrect = 0;
        this._totalErrors = 0;
        this._sentencesCompleted = 0;
        this._streak = 0;
        this._longestStreak = 0;
        this._correctTimestamps = [];
        this._started = false;
    }

    // ── Internal ────────────────────────────────────────────────

    _prepareSentence() {
        const sentence = this.currentSentence;
        if (!sentence) return;
        this._cursorPos = 0;
        this._charStates = new Array(sentence.length).fill(null);
    }

    _handleBackspace() {
        if (this._cursorPos <= 0) return;
        this._cursorPos--;
        this._charStates[this._cursorPos] = null;
        // Backspace breaks streak
        this._streak = 0;
    }

    _completeSentence() {
        this._sentencesCompleted++;
        if (this.onSentenceComplete) {
            this.onSentenceComplete(this._sentenceIndex, this._sentences[this._sentenceIndex]);
        }

        this._sentenceIndex++;

        if (this._sentenceIndex < this._sentences.length) {
            this._prepareSentence();
        } else {
            // All sentences done
            if (this.onAllSentencesComplete) this.onAllSentencesComplete();
        }
    }

    _pruneTimestamps(now) {
        const cutoff = now - this._wpmWindow * 1000;
        while (this._correctTimestamps.length > 0 && this._correctTimestamps[0] < cutoff) {
            this._correctTimestamps.shift();
        }
    }
}
