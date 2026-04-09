import { BASE_WIDTH, BASE_HEIGHT, COLORS, STREAK_MILESTONE } from '../game/constants.js';

/**
 * HUD - In-game heads-up display rendered on Canvas.
 * Draws the top bar, sentence display, stats bar, and streak meter.
 */
export class HUD {
    constructor() {
        // Layout constants (base 256x240 resolution)
        // Grouped layout: top bar at top, then sentence + stats + streak clustered
        // in the bottom portion so the player's eyes stay in one area.
        this.PADDING = 4;
        this.TOP_BAR_Y = 2;
        this.SENTENCE_BOX_Y = BASE_HEIGHT - 68;  // moved below character
        this.SENTENCE_BOX_H = 30;
        this.STATS_BAR_Y = BASE_HEIGHT - 34;
        this.STREAK_BAR_Y = BASE_HEIGHT - 20;
        this.STREAK_BAR_H = 5;
        this.STREAK_BAR_W = 140;

        // Timer warning state
        this.timerFlashTimer = 0;
        this.timerFlashOn = true;
        this.borderPulseTimer = 0;

        // Font sizes
        this.FONT_SM = '7px monospace';
        this.FONT_MD = '8px monospace';
        this.FONT_LG = '10px monospace';

        // Cached stats for rendering
        this.stats = {
            roundName: '',
            timeRemaining: 60,
            currentSentence: '',
            typedChars: [],
            reps: 0,
            wpm: 0,
            accuracy: 100,
            streak: 0,
            longestStreak: 0,
        };
    }

    /**
     * Update HUD with latest game stats.
     * @param {Object} stats
     */
    update(stats) {
        if (stats) {
            Object.assign(this.stats, stats);
        }

        // Timer flash logic: toggle every 0.3s when under 10 seconds
        if (this.stats.timeRemaining <= 10 && this.stats.timeRemaining > 0) {
            this.timerFlashTimer += 1 / 60; // assume 60fps tick
            if (this.timerFlashTimer >= 0.3) {
                this.timerFlashTimer = 0;
                this.timerFlashOn = !this.timerFlashOn;
            }
            this.borderPulseTimer += 1 / 60;
        } else {
            this.timerFlashTimer = 0;
            this.timerFlashOn = true;
            this.borderPulseTimer = 0;
        }
    }

    /**
     * Render the full HUD.
     * @param {CanvasRenderingContext2D} ctx
     */
    render(ctx) {
        this._renderTopBar(ctx);
        this._renderSentenceDisplay(ctx);
        this._renderStatsBar(ctx);
        this._renderStreakMeter(ctx);
        this._renderBorderPulse(ctx);
    }

    // --- Top Bar: round name (left) + timer (right) ---
    _renderTopBar(ctx) {
        const { roundName, timeRemaining } = this.stats;

        // Background strip
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.fillRect(0, 0, BASE_WIDTH, 12);

        // Round name (left)
        ctx.font = this.FONT_SM;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillStyle = COLORS.accent;
        ctx.fillText(roundName.toUpperCase(), this.PADDING, this.TOP_BAR_Y);

        // Timer (right)
        const minutes = Math.floor(Math.max(0, timeRemaining) / 60);
        const seconds = Math.floor(Math.max(0, timeRemaining) % 60);
        const timeStr = `TIME: ${minutes}:${seconds.toString().padStart(2, '0')}`;

        if (timeRemaining <= 10 && timeRemaining > 0) {
            ctx.fillStyle = this.timerFlashOn ? COLORS.textError : '#880000';
        } else {
            ctx.fillStyle = COLORS.text;
        }
        ctx.textAlign = 'right';
        ctx.fillText(timeStr, BASE_WIDTH - this.PADDING, this.TOP_BAR_Y);
        ctx.textAlign = 'left';
    }

    // --- Sentence display with per-character coloring ---
    _renderSentenceDisplay(ctx) {
        const { currentSentence, typedChars } = this.stats;
        if (!currentSentence) return;

        const boxX = this.PADDING;
        const boxY = this.SENTENCE_BOX_Y;
        const boxW = BASE_WIDTH - this.PADDING * 2;
        const boxH = this.SENTENCE_BOX_H;

        // Box background (dark for readability)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
        ctx.fillRect(boxX, boxY, boxW, boxH);

        // Box border
        ctx.strokeStyle = COLORS.textDim;
        ctx.lineWidth = 0.5;
        ctx.strokeRect(boxX, boxY, boxW, boxH);

        // Render characters with word wrap
        ctx.font = this.FONT_SM;
        ctx.textBaseline = 'top';

        const charW = 4.2; // approximate char width at 7px monospace
        const lineH = 9;
        const maxCharsPerLine = Math.floor((boxW - 6) / charW);
        const textX = boxX + 3;
        const textY = boxY + 3;

        // Word-wrap the sentence
        const lines = this._wordWrap(currentSentence, maxCharsPerLine);

        let charIndex = 0;
        for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
            const line = lines[lineIdx];
            const y = textY + lineIdx * lineH;
            if (y + lineH > boxY + boxH) break; // clip to box

            for (let i = 0; i < line.length; i++) {
                const globalIdx = charIndex + i;

                // Determine color
                if (globalIdx < typedChars.length) {
                    const typed = typedChars[globalIdx];
                    if (typed === 'correct') {
                        ctx.fillStyle = COLORS.textCorrect;
                    } else if (typed === 'error') {
                        ctx.fillStyle = COLORS.textError;
                    } else {
                        ctx.fillStyle = COLORS.text;
                    }
                } else if (globalIdx === typedChars.length) {
                    // Current cursor position: draw underscore highlight
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
                    ctx.fillRect(textX + i * charW - 0.5, y, charW, lineH - 1);
                    ctx.fillStyle = COLORS.text;
                } else {
                    ctx.fillStyle = COLORS.textDim;
                }

                ctx.fillText(line[i], textX + i * charW, y);
            }
            charIndex += line.length;
        }
    }

    /**
     * Simple word-wrap that preserves character indices.
     * Returns array of strings whose combined length equals the input.
     */
    _wordWrap(text, maxWidth) {
        const lines = [];
        let remaining = text;

        while (remaining.length > 0) {
            if (remaining.length <= maxWidth) {
                lines.push(remaining);
                break;
            }

            // Find last space within maxWidth
            let breakIdx = remaining.lastIndexOf(' ', maxWidth);
            if (breakIdx <= 0) {
                // No space found; hard break
                breakIdx = maxWidth;
            } else {
                breakIdx += 1; // include the space in the current line
            }

            lines.push(remaining.substring(0, breakIdx));
            remaining = remaining.substring(breakIdx);
        }

        return lines;
    }

    // --- Stats bar: REPS, WPM, ACCURACY, STREAK ---
    _renderStatsBar(ctx) {
        const { reps, wpm, accuracy, streak } = this.stats;

        // Single dark background covering stats + streak meter area
        ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
        ctx.fillRect(0, this.STATS_BAR_Y, BASE_WIDTH, BASE_HEIGHT - this.STATS_BAR_Y);

        ctx.font = this.FONT_SM;
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';

        const y = this.STATS_BAR_Y + 2;
        const items = [
            { label: 'REPS:', value: reps, color: COLORS.accent },
            { label: 'WPM:', value: wpm, color: COLORS.text },
            { label: 'ACC:', value: `${Math.round(accuracy)}%`, color: COLORS.text },
            { label: 'STREAK:', value: streak, color: COLORS.gold },
        ];

        const sectionW = (BASE_WIDTH - this.PADDING * 2) / items.length;
        for (let i = 0; i < items.length; i++) {
            const x = this.PADDING + i * sectionW;
            ctx.fillStyle = COLORS.textDim;
            ctx.fillText(items[i].label, x, y);
            const labelW = ctx.measureText(items[i].label).width;
            ctx.fillStyle = items[i].color;
            ctx.fillText(` ${items[i].value}`, x + labelW, y);
        }
    }

    // --- Streak meter: visual progress bar ---
    _renderStreakMeter(ctx) {
        const { streak } = this.stats;

        const barX = (BASE_WIDTH - this.STREAK_BAR_W) / 2 - 30;
        const barY = this.STREAK_BAR_Y;
        const barW = this.STREAK_BAR_W;
        const barH = this.STREAK_BAR_H;

        // Label
        ctx.font = this.FONT_SM;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillStyle = COLORS.textDim;

        // Bar track (subtle)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.fillRect(barX, barY, barW, barH);

        // Fill based on progress toward next milestone
        const progress = (streak % STREAK_MILESTONE) / STREAK_MILESTONE;
        const fillW = Math.floor(barW * progress);

        // Gradient-like fill using discrete color steps
        if (fillW > 0) {
            const milestoneCount = Math.floor(streak / STREAK_MILESTONE);
            let fillColor;
            if (milestoneCount >= 3) {
                fillColor = COLORS.gold;
            } else if (milestoneCount >= 2) {
                fillColor = COLORS.accent;
            } else if (milestoneCount >= 1) {
                fillColor = COLORS.textCorrect;
            } else {
                fillColor = '#3b82f6'; // blue
            }
            ctx.fillStyle = fillColor;
            ctx.fillRect(barX + 1, barY + 1, fillW - 2, barH - 2);
        }

        // Milestone markers
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        for (let i = 1; i < 4; i++) {
            const mx = barX + Math.floor(barW * (i / 4));
            ctx.fillRect(mx, barY, 1, barH);
        }

        // (streak count already shown in stats bar above)
    }

    // --- Border pulse effect when timer is low ---
    _renderBorderPulse(ctx) {
        if (this.stats.timeRemaining > 10 || this.stats.timeRemaining <= 0) return;

        const pulseAlpha = 0.15 + 0.15 * Math.sin(this.borderPulseTimer * 6);
        ctx.strokeStyle = COLORS.textError;
        ctx.globalAlpha = pulseAlpha;
        ctx.lineWidth = 2;
        ctx.strokeRect(1, 1, BASE_WIDTH - 2, BASE_HEIGHT - 2);
        ctx.globalAlpha = 1.0;
        ctx.lineWidth = 1;
    }
}
