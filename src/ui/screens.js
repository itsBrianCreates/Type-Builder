import { BASE_WIDTH, BASE_HEIGHT, COLORS, COUNTDOWN_DURATION } from '../game/constants.js';
import { SpriteRenderer } from '../sprites/sprite-renderer.js';
import { IDLE as PLAYER_IDLE, VICTORY_FLEX, SAD_POSE } from '../sprites/bodybuilder.js';
import { RIVALS as RIVAL_SPRITES } from '../sprites/rivals.js';

// ---------- Shared helpers ----------

const FONT_SM = '7px monospace';
const FONT_MD = '8px monospace';
const FONT_LG = '10px monospace';
const FONT_XL = '14px monospace';
const FONT_TITLE = '20px monospace';

/** Draw text centered horizontally. */
function drawCentered(ctx, text, y, font, color) {
    ctx.font = font || FONT_MD;
    ctx.fillStyle = color || COLORS.text;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(text, BASE_WIDTH / 2, y);
    ctx.textAlign = 'left';
}

/** Draw a pixel-style box. */
function drawBox(ctx, x, y, w, h, fill, stroke) {
    ctx.fillStyle = fill || 'rgba(0,0,0,0.5)';
    ctx.fillRect(x, y, w, h);
    if (stroke) {
        ctx.strokeStyle = stroke;
        ctx.lineWidth = 0.5;
        ctx.strokeRect(x, y, w, h);
    }
}

/** Get a rival's sprite by shortName. Returns the idle sprite data. */
const RIVAL_SPRITE_MAP = {
    IVAN: RIVAL_SPRITES.ivan,
    FLEX: RIVAL_SPRITES.flex,
    TONY: RIVAL_SPRITES.tony,
};

function getRivalSprite(shortName, pose) {
    const rival = RIVAL_SPRITE_MAP[shortName];
    if (!rival) return null;
    return rival.sprites[pose || 'idle'] || rival.sprites.idle;
}

/** Get the player sprite for a given context. */
function getPlayerSprite(placement) {
    if (placement === 1 || placement === 2) return VICTORY_FLEX;
    if (placement === 4) return SAD_POSE;
    return PLAYER_IDLE;
}

// =====================================================================
//  ScreenTransition — fade to black helper
// =====================================================================

export class ScreenTransition {
    constructor() {
        this.active = false;
        this.alpha = 0;
        this.fadingIn = false;  // false = fading to black, true = fading from black
        this.duration = 0.35;
        this.timer = 0;
        this.onMidpoint = null; // callback when fully black
        this.onComplete = null;
    }

    /**
     * Start a fade-to-black-and-back transition.
     * @param {Function} onMidpoint — called when screen is fully black (swap screen here)
     * @param {Function} [onComplete] — called when fade-in finishes
     * @param {number} [duration] — total one-way duration in seconds
     */
    start(onMidpoint, onComplete, duration) {
        this.active = true;
        this.alpha = 0;
        this.fadingIn = false;
        this.timer = 0;
        this.duration = duration || 0.35;
        this.onMidpoint = onMidpoint;
        this.onComplete = onComplete || null;
    }

    update(dt) {
        if (!this.active) return;
        this.timer += dt;

        if (!this.fadingIn) {
            // Fading to black
            this.alpha = Math.min(1, this.timer / this.duration);
            if (this.alpha >= 1) {
                if (this.onMidpoint) this.onMidpoint();
                this.onMidpoint = null;
                this.fadingIn = true;
                this.timer = 0;
            }
        } else {
            // Fading from black
            this.alpha = Math.max(0, 1 - this.timer / this.duration);
            if (this.alpha <= 0) {
                this.active = false;
                if (this.onComplete) this.onComplete();
            }
        }
    }

    render(ctx) {
        if (!this.active && this.alpha <= 0) return;
        ctx.fillStyle = '#000000';
        ctx.globalAlpha = this.alpha;
        ctx.fillRect(0, 0, BASE_WIDTH, BASE_HEIGHT);
        ctx.globalAlpha = 1.0;
    }
}

// =====================================================================
//  TitleScreen
// =====================================================================

export class TitleScreen {
    constructor() {
        this.menuItems = ['QUICK PUMP', 'TOURNAMENT', 'ENDLESS REPS'];
        this.selectedIndex = 0;
        this.timer = 0;
        this.bgAnimTimer = 0;
    }

    enter() {
        this.selectedIndex = 0;
        this.timer = 0;
        this.bgAnimTimer = 0;
    }

    exit() {}

    update(dt) {
        this.timer += dt;
        this.bgAnimTimer += dt;
    }

    /**
     * @param {string} key
     * @returns {{ action: string, mode: string }|null}
     */
    handleInput(key) {
        if (key === 'ArrowUp') {
            this.selectedIndex = (this.selectedIndex - 1 + this.menuItems.length) % this.menuItems.length;
            return null;
        }
        if (key === 'ArrowDown') {
            this.selectedIndex = (this.selectedIndex + 1) % this.menuItems.length;
            return null;
        }
        if (key === 'Enter') {
            const modes = ['quick_pump', 'tournament', 'endless'];
            return { action: 'select', mode: modes[this.selectedIndex] };
        }
        return null;
    }

    render(ctx) {
        // Background
        ctx.fillStyle = COLORS.bg;
        ctx.fillRect(0, 0, BASE_WIDTH, BASE_HEIGHT);

        // Animated background bars (gym-feel)
        ctx.globalAlpha = 0.05;
        for (let i = 0; i < 8; i++) {
            const yOff = ((this.bgAnimTimer * 12) + i * 32) % (BASE_HEIGHT + 32) - 16;
            ctx.fillStyle = COLORS.accent;
            ctx.fillRect(0, yOff, BASE_WIDTH, 8);
        }
        ctx.globalAlpha = 1.0;

        // Title
        const titleY = 40;
        const bounce = Math.sin(this.timer * 2) * 2;

        drawCentered(ctx, 'TYPE', titleY + bounce, FONT_TITLE, COLORS.accent);
        drawCentered(ctx, 'BUILDER', titleY + 18 + bounce, FONT_TITLE, COLORS.gold);

        // Decorative line
        const lineW = 100;
        ctx.fillStyle = COLORS.accent;
        ctx.fillRect((BASE_WIDTH - lineW) / 2, titleY + 40, lineW, 1);

        // Player character sprite
        SpriteRenderer.draw(ctx, PLAYER_IDLE, (BASE_WIDTH - 32) / 2, 90);

        // Menu items
        const menuStartY = 150;
        const menuItemH = 16;

        for (let i = 0; i < this.menuItems.length; i++) {
            const y = menuStartY + i * menuItemH;
            const isSelected = i === this.selectedIndex;

            if (isSelected) {
                // Selection highlight
                drawBox(ctx, 60, y - 1, BASE_WIDTH - 120, 13, 'rgba(245, 158, 11, 0.15)');

                // Arrow indicator
                const arrowBounce = Math.sin(this.timer * 6) * 1.5;
                ctx.font = FONT_MD;
                ctx.fillStyle = COLORS.accent;
                ctx.textAlign = 'right';
                ctx.fillText('>', 76 + arrowBounce, y);
                ctx.textAlign = 'left';
            }

            drawCentered(ctx, this.menuItems[i], y, FONT_MD, isSelected ? COLORS.accent : COLORS.textDim);
        }

        // Bottom instruction
        const blink = Math.sin(this.timer * 3) > 0;
        if (blink) {
            drawCentered(ctx, 'PRESS ENTER TO SELECT', BASE_HEIGHT - 20, FONT_SM, COLORS.textDim);
        }
    }
}

// =====================================================================
//  PreRoundScreen
// =====================================================================

const RIVALS = [
    {
        name: '"Iron" Ivan Petrov',
        shortName: 'IVAN',
        taunt: 'You think typing makes muscle? I EAT keyboards for breakfast.',
        color: '#cc2222',
    },
    {
        name: 'Flex McQueen',
        shortName: 'FLEX',
        taunt: 'Looking good is half the battle, bro. The other half? Also looking good.',
        color: '#2266cc',
    },
    {
        name: 'Tony "The Tank" Deluca',
        shortName: 'TONY',
        taunt: "Thirty years in the gym, kid. My fingers ain't fast but my heart's in it.",
        color: '#22882a',
    },
];

export class PreRoundScreen {
    constructor() {
        this.roundName = '';
        this.roundNumber = 1;
        this.timer = 0;
        this.revealedRivals = 0;
        this.rivalRevealTimer = 0;
    }

    /**
     * @param {{ roundName: string, roundNumber: number }} data
     */
    enter(data) {
        this.roundName = (data && data.roundName) || 'ROUND 1';
        this.roundNumber = (data && data.roundNumber) || 1;
        this.timer = 0;
        this.revealedRivals = 0;
        this.rivalRevealTimer = 0;
    }

    exit() {}

    update(dt) {
        this.timer += dt;
        // Reveal rivals one at a time
        if (this.revealedRivals < RIVALS.length) {
            this.rivalRevealTimer += dt;
            if (this.rivalRevealTimer >= 0.6) {
                this.rivalRevealTimer = 0;
                this.revealedRivals++;
            }
        }
    }

    handleInput(key) {
        if (key === 'Enter') {
            return { action: 'start_countdown' };
        }
        return null;
    }

    render(ctx) {
        ctx.fillStyle = COLORS.bg;
        ctx.fillRect(0, 0, BASE_WIDTH, BASE_HEIGHT);

        // Round header
        drawCentered(ctx, `ROUND ${this.roundNumber}`, 4, FONT_LG, COLORS.accent);
        drawCentered(ctx, this.roundName.toUpperCase(), 16, FONT_MD, COLORS.gold);

        // Decorative line
        ctx.fillStyle = COLORS.accent;
        ctx.fillRect(30, 27, BASE_WIDTH - 60, 1);

        // --- Player "YOU ARE" section (top center) ---
        const playerY = 32;
        ctx.font = FONT_SM;
        ctx.fillStyle = COLORS.textDim;
        ctx.textAlign = 'center';
        ctx.fillText('YOU ARE', BASE_WIDTH / 2, playerY);

        // Player sprite centered
        SpriteRenderer.draw(ctx, PLAYER_IDLE, (BASE_WIDTH - 32) / 2, playerY + 8);

        // Player name below sprite
        ctx.font = FONT_MD;
        ctx.fillStyle = COLORS.gold;
        ctx.fillText('TYLER', BASE_WIDTH / 2, playerY + 60);
        ctx.textAlign = 'left';

        // "VS" divider
        const vsY = playerY + 72;
        ctx.fillStyle = COLORS.textDim;
        ctx.fillRect(20, vsY, BASE_WIDTH / 2 - 30, 1);
        ctx.fillRect(BASE_WIDTH / 2 + 12, vsY, BASE_WIDTH / 2 - 30, 1);
        ctx.font = FONT_MD;
        ctx.fillStyle = COLORS.textError;
        ctx.textAlign = 'center';
        ctx.fillText('VS', BASE_WIDTH / 2, vsY - 3);
        ctx.textAlign = 'left';

        // --- Rival cards (row below) ---
        const cardW = 76;
        const cardH = 110;
        const cardSpacing = 6;
        const totalW = RIVALS.length * cardW + (RIVALS.length - 1) * cardSpacing;
        const startX = (BASE_WIDTH - totalW) / 2;
        const cardY = vsY + 6;

        for (let i = 0; i < RIVALS.length; i++) {
            if (i >= this.revealedRivals) break;

            const rival = RIVALS[i];
            const x = startX + i * (cardW + cardSpacing);

            // Card background with colored left border
            drawBox(ctx, x, cardY, cardW, cardH, 'rgba(0,0,0,0.4)');
            ctx.fillStyle = rival.color;
            ctx.fillRect(x, cardY, 2, cardH); // colored left accent

            // Rival sprite (idle pose)
            const rivalSprite = getRivalSprite(rival.shortName, 'idle');
            if (rivalSprite) {
                SpriteRenderer.draw(ctx, rivalSprite, x + (cardW - 32) / 2, cardY + 3);
            }

            // Name below sprite
            ctx.font = FONT_MD;
            ctx.fillStyle = rival.color;
            ctx.textAlign = 'center';
            ctx.fillText(rival.shortName, x + cardW / 2, cardY + 54);

            // Taunt (word wrap in card)
            ctx.fillStyle = COLORS.textDim;
            ctx.font = FONT_SM;
            const tauntLines = this._wrapText(`"${rival.taunt}"`, 14);
            for (let li = 0; li < Math.min(tauntLines.length, 5); li++) {
                ctx.fillText(tauntLines[li], x + cardW / 2, cardY + 66 + li * 8);
            }
            ctx.textAlign = 'left';
        }

        // "Press ENTER to begin"
        if (this.revealedRivals >= RIVALS.length) {
            const blink = Math.sin(this.timer * 3) > 0;
            if (blink) {
                drawCentered(ctx, 'PRESS ENTER TO BEGIN', BASE_HEIGHT - 10, FONT_MD, COLORS.text);
            }
        }
    }

    _wrapText(text, maxChars) {
        const words = text.split(' ');
        const lines = [];
        let line = '';
        for (const word of words) {
            if (line.length + word.length + 1 > maxChars) {
                lines.push(line);
                line = word;
            } else {
                line = line ? line + ' ' + word : word;
            }
        }
        if (line) lines.push(line);
        return lines;
    }
}

// =====================================================================
//  CountdownScreen
// =====================================================================

export class CountdownScreen {
    constructor() {
        this.remaining = COUNTDOWN_DURATION;
        this.currentNumber = COUNTDOWN_DURATION;
        this.phase = 'counting'; // 'counting' | 'lift'
        this.liftTimer = 0;
        this.numberScale = 1;
        this.numberTimer = 0;
    }

    enter() {
        this.remaining = COUNTDOWN_DURATION;
        this.currentNumber = COUNTDOWN_DURATION;
        this.phase = 'counting';
        this.liftTimer = 0;
        this.numberScale = 1;
        this.numberTimer = 0;
    }

    exit() {}

    update(dt) {
        if (this.phase === 'counting') {
            this.remaining -= dt;
            this.numberTimer += dt;

            // Scale animation: number starts big and shrinks
            this.numberScale = 1 + Math.max(0, 0.5 - this.numberTimer) * 2;

            const newNumber = Math.ceil(this.remaining);
            if (newNumber !== this.currentNumber && newNumber > 0) {
                this.currentNumber = newNumber;
                this.numberTimer = 0;
            }

            if (this.remaining <= 0) {
                this.phase = 'lift';
                this.liftTimer = 0;
            }
        } else {
            this.liftTimer += dt;
            if (this.liftTimer >= 1.0) {
                return { action: 'start_typing' };
            }
        }
        return null;
    }

    handleInput() {
        return null; // No input during countdown
    }

    render(ctx) {
        ctx.fillStyle = COLORS.bg;
        ctx.fillRect(0, 0, BASE_WIDTH, BASE_HEIGHT);

        const centerX = BASE_WIDTH / 2;
        const centerY = BASE_HEIGHT / 2;

        if (this.phase === 'counting') {
            // Big countdown number with scaling
            const size = Math.round(24 * this.numberScale);
            ctx.font = `${Math.min(size, 40)}px monospace`;
            ctx.fillStyle = COLORS.accent;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(String(this.currentNumber), centerX, centerY);

            // "GET READY" text
            ctx.font = FONT_MD;
            ctx.fillStyle = COLORS.textDim;
            ctx.fillText('GET READY', centerX, centerY - 40);
        } else {
            // "LIFT!" text with dramatic scale
            const liftScale = 1 + this.liftTimer * 0.5;
            const size = Math.round(20 * liftScale);
            ctx.font = `${Math.min(size, 36)}px monospace`;
            ctx.fillStyle = COLORS.gold;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('LIFT!', centerX, centerY);
        }

        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
    }
}

// =====================================================================
//  ResultsScreen
// =====================================================================

export class ResultsScreen {
    constructor() {
        this.results = { reps: 0, wpm: 0, accuracy: 0, streak: 0, totalScore: 0 };
        this.timer = 0;
        this.animatedValues = { reps: 0, wpm: 0, accuracy: 0, streak: 0, totalScore: 0 };
        this.rollDuration = 1.5; // seconds to roll up numbers
    }

    /**
     * @param {{ reps: number, wpm: number, accuracy: number, streak: number, totalScore: number }} results
     */
    enter(results) {
        this.results = results || { reps: 0, wpm: 0, accuracy: 0, streak: 0, totalScore: 0 };
        this.timer = 0;
        this.animatedValues = { reps: 0, wpm: 0, accuracy: 0, streak: 0, totalScore: 0 };
    }

    exit() {}

    update(dt) {
        this.timer += dt;

        // Animate numbers rolling up
        const t = Math.min(1, this.timer / this.rollDuration);
        const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; // easeInOutQuad

        this.animatedValues.reps = Math.round(this.results.reps * ease);
        this.animatedValues.wpm = Math.round(this.results.wpm * ease);
        this.animatedValues.accuracy = Math.round(this.results.accuracy * ease);
        this.animatedValues.streak = Math.round(this.results.streak * ease);
        this.animatedValues.totalScore = Math.round(this.results.totalScore * ease);
    }

    handleInput(key) {
        if (key === 'Enter' && this.timer > 0.5) {
            return { action: 'show_competition' };
        }
        // Allow skipping animation
        if (key === 'Enter' && this.timer <= 0.5) {
            this.timer = this.rollDuration + 1;
            return null;
        }
        return null;
    }

    render(ctx) {
        ctx.fillStyle = COLORS.bg;
        ctx.fillRect(0, 0, BASE_WIDTH, BASE_HEIGHT);

        // Header
        drawCentered(ctx, 'ROUND COMPLETE!', 16, FONT_LG, COLORS.gold);

        // Decorative line
        ctx.fillStyle = COLORS.accent;
        ctx.fillRect(50, 30, BASE_WIDTH - 100, 1);

        // Score breakdown
        const vals = this.animatedValues;
        const rows = [
            { label: 'REPS', value: vals.reps, color: COLORS.accent },
            { label: 'WPM', value: vals.wpm, color: COLORS.text },
            { label: 'ACCURACY', value: `${vals.accuracy}%`, color: COLORS.text },
            { label: 'BEST STREAK', value: vals.streak, color: COLORS.gold },
        ];

        const startY = 44;
        const rowH = 18;

        for (let i = 0; i < rows.length; i++) {
            const y = startY + i * rowH;
            const delayedReveal = this.timer > i * 0.2;
            if (!delayedReveal) continue;

            // Label
            ctx.font = FONT_MD;
            ctx.textAlign = 'left';
            ctx.fillStyle = COLORS.textDim;
            ctx.fillText(rows[i].label, 50, y);

            // Value
            ctx.textAlign = 'right';
            ctx.fillStyle = rows[i].color;
            ctx.fillText(String(rows[i].value), BASE_WIDTH - 50, y);
        }

        // Total score (bigger, with box)
        if (this.timer > 1.0) {
            const scoreY = startY + rows.length * rowH + 12;
            drawBox(ctx, 40, scoreY - 2, BASE_WIDTH - 80, 20, 'rgba(245,158,11,0.15)', COLORS.accent);

            ctx.font = FONT_LG;
            ctx.textAlign = 'left';
            ctx.fillStyle = COLORS.accent;
            ctx.fillText('TOTAL SCORE', 50, scoreY + 2);

            ctx.textAlign = 'right';
            ctx.fillStyle = COLORS.gold;
            ctx.fillText(String(vals.totalScore), BASE_WIDTH - 50, scoreY + 2);
        }

        // Continue prompt
        if (this.timer > this.rollDuration) {
            const blink = Math.sin(this.timer * 3) > 0;
            if (blink) {
                drawCentered(ctx, 'PRESS ENTER TO CONTINUE', BASE_HEIGHT - 18, FONT_SM, COLORS.textDim);
            }
        }

        ctx.textAlign = 'left';
    }
}

// =====================================================================
//  CompetitionScreen
// =====================================================================

export class CompetitionScreen {
    constructor() {
        this.playerScore = 0;
        this.rivalScores = []; // [{ name, shortName, score, color }]
        this.revealedCount = 0;
        this.revealTimer = 0;
        this.revealInterval = 1.2; // seconds between each reveal
        this.timer = 0;
        this.placement = 0;
        this.allRevealed = false;
    }

    /**
     * @param {{ playerScore: number, rivals: { name: string, shortName: string, score: number, color: string }[] }} data
     */
    enter(data) {
        this.playerScore = (data && data.playerScore) || 0;
        this.rivalScores = (data && data.rivals) || [];
        this.revealedCount = 0;
        this.revealTimer = 0;
        this.timer = 0;
        this.allRevealed = false;
        this.placement = 0;
    }

    exit() {}

    update(dt) {
        this.timer += dt;

        // Reveal scores one at a time with dramatic pause
        const totalToReveal = this.rivalScores.length + 1; // rivals + player
        if (this.revealedCount < totalToReveal) {
            this.revealTimer += dt;
            if (this.revealTimer >= this.revealInterval) {
                this.revealTimer = 0;
                this.revealedCount++;

                if (this.revealedCount >= totalToReveal) {
                    this.allRevealed = true;
                    this._calculatePlacement();
                }
            }
        }
    }

    handleInput(key) {
        if (key === 'Enter' && this.allRevealed) {
            return { action: 'show_podium', placement: this.placement };
        }
        // Skip to full reveal
        if (key === 'Enter' && !this.allRevealed) {
            this.revealedCount = this.rivalScores.length + 1;
            this.allRevealed = true;
            this._calculatePlacement();
            return null;
        }
        return null;
    }

    _calculatePlacement() {
        const allScores = [
            { name: 'TYLER', score: this.playerScore },
            ...this.rivalScores.map(r => ({ name: r.shortName, score: r.score })),
        ];
        allScores.sort((a, b) => b.score - a.score);
        this.placement = allScores.findIndex(s => s.name === 'TYLER') + 1;
    }

    render(ctx) {
        ctx.fillStyle = COLORS.stage;
        ctx.fillRect(0, 0, BASE_WIDTH, BASE_HEIGHT);

        // Header
        drawCentered(ctx, 'BODYBUILDING SHOWDOWN', 6, FONT_LG, COLORS.gold);

        // Character lineup: rivals + player
        const allEntrants = [
            ...this.rivalScores.map(r => ({ name: r.shortName, color: r.color, score: r.score, isPlayer: false })),
            { name: 'TYLER', color: COLORS.accent, score: this.playerScore, isPlayer: true },
        ];

        const displayOrder = [];
        if (allEntrants.length >= 4) {
            displayOrder.push(allEntrants[0]); // Ivan
            displayOrder.push(allEntrants[3]); // You
            displayOrder.push(allEntrants[1]); // Flex
            displayOrder.push(allEntrants[2]); // Tony
        } else {
            displayOrder.push(...allEntrants);
        }

        const charW = 32;
        const spacing = 16;
        const totalCharsW = displayOrder.length * charW + (displayOrder.length - 1) * spacing;
        const charStartX = (BASE_WIDTH - totalCharsW) / 2;
        const charY = 22;

        for (let i = 0; i < displayOrder.length; i++) {
            const ent = displayOrder[i];
            const x = charStartX + i * (charW + spacing);

            if (ent.isPlayer) {
                SpriteRenderer.draw(ctx, PLAYER_IDLE, x, charY);
            } else {
                const sprite = getRivalSprite(ent.name, 'flex');
                if (sprite) SpriteRenderer.draw(ctx, sprite, x, charY);
            }
        }

        // Stage platform
        ctx.fillStyle = '#4a2d82';
        ctx.fillRect(20, 74, BASE_WIDTH - 40, 6);
        drawCentered(ctx, 'STAGE', 75, FONT_SM, COLORS.textDim);

        // Judges table
        ctx.fillStyle = '#2a1654';
        ctx.fillRect(40, 86, BASE_WIDTH - 80, 14);
        ctx.font = FONT_SM;
        ctx.fillStyle = COLORS.textDim;
        ctx.textAlign = 'center';
        const judgeLabels = ['JUDGE 1', 'JUDGE 2', 'JUDGE 3'];
        for (let i = 0; i < 3; i++) {
            ctx.fillText(judgeLabels[i], 80 + i * 40, 90);
        }
        ctx.textAlign = 'left';

        // Decorative line
        ctx.fillStyle = COLORS.gold;
        ctx.fillRect(30, 108, BASE_WIDTH - 60, 1);

        // Score reveals
        const scoreY = 116;
        const scoreH = 14;
        const revealOrder = [
            ...this.rivalScores.map(r => ({ name: r.shortName, score: r.score, color: r.color, isPlayer: false })),
            { name: 'TYLER', score: this.playerScore, color: COLORS.gold, isPlayer: true },
        ];

        for (let i = 0; i < revealOrder.length; i++) {
            if (i >= this.revealedCount) break;

            const entry = revealOrder[i];
            const y = scoreY + i * scoreH;

            ctx.font = FONT_MD;
            ctx.textAlign = 'left';
            ctx.fillStyle = entry.isPlayer ? COLORS.gold : COLORS.text;
            ctx.fillText(`${entry.name}:`, 50, y);

            ctx.textAlign = 'right';
            ctx.fillText(entry.score.toLocaleString(), BASE_WIDTH - 50, y);
        }

        // Placement announcement
        if (this.allRevealed) {
            const placementY = scoreY + revealOrder.length * scoreH + 12;
            const placementLabels = ['', '1ST PLACE!', '2ND PLACE!', '3RD PLACE!', 'NO PODIUM'];
            const placementColors = ['', COLORS.gold, COLORS.silver, COLORS.bronze, COLORS.textError];
            const label = placementLabels[this.placement] || 'NO PODIUM';
            const color = placementColors[this.placement] || COLORS.textError;

            drawCentered(ctx, label, placementY, FONT_XL, color);

            // Continue prompt
            const blink = Math.sin(this.timer * 3) > 0;
            if (blink) {
                drawCentered(ctx, 'PRESS ENTER FOR PODIUM', BASE_HEIGHT - 14, FONT_SM, COLORS.textDim);
            }
        }

        ctx.textAlign = 'left';
    }
}

// =====================================================================
//  PodiumScreen
// =====================================================================

export class PodiumScreen {
    constructor() {
        this.placement = 1;
        this.timer = 0;
        this.confettiParticles = [];
    }

    /**
     * @param {{ placement: number }} data
     */
    enter(data) {
        this.placement = (data && data.placement) || 4;
        this.timer = 0;
        this.confettiParticles = [];

        // Generate confetti if 1st place
        if (this.placement === 1) {
            for (let i = 0; i < 40; i++) {
                this.confettiParticles.push({
                    x: Math.random() * BASE_WIDTH,
                    y: -Math.random() * 40,
                    vy: 20 + Math.random() * 30,
                    vx: (Math.random() - 0.5) * 20,
                    color: [COLORS.gold, COLORS.accent, '#ff6666', '#66ff66', '#6666ff'][Math.floor(Math.random() * 5)],
                    size: 1 + Math.random() * 2,
                });
            }
        }
    }

    exit() {}

    update(dt) {
        this.timer += dt;

        // Animate confetti
        for (const p of this.confettiParticles) {
            p.y += p.vy * dt;
            p.x += p.vx * dt;
            // Wrap horizontally
            if (p.x < 0) p.x += BASE_WIDTH;
            if (p.x > BASE_WIDTH) p.x -= BASE_WIDTH;
            // Reset if fallen off screen
            if (p.y > BASE_HEIGHT + 10) {
                p.y = -5;
                p.x = Math.random() * BASE_WIDTH;
            }
        }
    }

    handleInput(key) {
        if (key === 'Enter' && this.timer > 0.5) {
            return { action: 'continue' };
        }
        return null;
    }

    render(ctx) {
        // Curtain backdrop
        ctx.fillStyle = '#1a0a3a';
        ctx.fillRect(0, 0, BASE_WIDTH, BASE_HEIGHT);

        // Spotlight gradient effect
        ctx.globalAlpha = 0.08;
        for (let i = 0; i < 3; i++) {
            const cx = 64 + i * 64;
            for (let r = 60; r > 0; r -= 4) {
                ctx.fillStyle = COLORS.gold;
                ctx.fillRect(cx - r, 0, r * 2, 30 + r);
            }
        }
        ctx.globalAlpha = 1.0;

        // Title
        const titles = {
            1: 'CHAMPION!',
            2: 'GREAT EFFORT!',
            3: 'NOT BAD!',
            4: 'BETTER LUCK NEXT TIME',
        };
        const titleColors = {
            1: COLORS.gold,
            2: COLORS.silver,
            3: COLORS.bronze,
            4: COLORS.textError,
        };

        drawCentered(ctx, titles[this.placement] || titles[4], 10, FONT_XL, titleColors[this.placement] || COLORS.textError);

        // Podium structure
        const podiumBaseY = 180;
        const podiumW = 48;
        const gap = 4;

        // Podium blocks (centered group)
        const totalW = podiumW * 3 + gap * 2;
        const groupX = (BASE_WIDTH - totalW) / 2;

        // 2nd place podium (left)
        const p2x = groupX;
        const p2h = 36;
        ctx.fillStyle = '#a8a8a8';
        ctx.fillRect(p2x, podiumBaseY - p2h, podiumW, p2h);
        ctx.fillStyle = COLORS.silver;
        ctx.fillRect(p2x + 1, podiumBaseY - p2h + 1, podiumW - 2, 3);
        ctx.font = FONT_LG;
        ctx.fillStyle = '#333';
        ctx.textAlign = 'center';
        ctx.fillText('2', p2x + podiumW / 2, podiumBaseY - p2h + 14);

        // 1st place podium (center, tallest)
        const p1x = groupX + podiumW + gap;
        const p1h = 56;
        ctx.fillStyle = '#d4a800';
        ctx.fillRect(p1x, podiumBaseY - p1h, podiumW, p1h);
        ctx.fillStyle = COLORS.gold;
        ctx.fillRect(p1x + 1, podiumBaseY - p1h + 1, podiumW - 2, 3);
        ctx.font = FONT_LG;
        ctx.fillStyle = '#333';
        ctx.fillText('1', p1x + podiumW / 2, podiumBaseY - p1h + 14);

        // Trophy on 1st place
        ctx.fillStyle = COLORS.gold;
        ctx.fillRect(p1x + podiumW / 2 - 3, podiumBaseY - p1h - 8, 6, 4);
        ctx.fillRect(p1x + podiumW / 2 - 5, podiumBaseY - p1h - 12, 10, 5);
        ctx.fillRect(p1x + podiumW / 2 - 2, podiumBaseY - p1h - 4, 4, 2);

        // 3rd place podium (right)
        const p3x = groupX + (podiumW + gap) * 2;
        const p3h = 24;
        ctx.fillStyle = '#a06828';
        ctx.fillRect(p3x, podiumBaseY - p3h, podiumW, p3h);
        ctx.fillStyle = COLORS.bronze;
        ctx.fillRect(p3x + 1, podiumBaseY - p3h + 1, podiumW - 2, 3);
        ctx.font = FONT_LG;
        ctx.fillStyle = '#333';
        ctx.fillText('3', p3x + podiumW / 2, podiumBaseY - p3h + 14);

        ctx.textAlign = 'left';

        // Stage floor
        ctx.fillStyle = '#4a2d82';
        ctx.fillRect(10, podiumBaseY, BASE_WIDTH - 20, 6);
        ctx.fillStyle = '#3a1d72';
        ctx.fillRect(10, podiumBaseY + 6, BASE_WIDTH - 20, 2);

        // Characters on podiums (32x48 sprites)
        const spriteW = 32;
        const spriteH = 48;

        // 1st place character
        const sprite1 = this.placement === 1 ? getPlayerSprite(1) : getRivalSprite('IVAN', 'celebration');
        if (sprite1) SpriteRenderer.draw(ctx, sprite1, p1x + (podiumW - spriteW) / 2, podiumBaseY - p1h - spriteH);

        // 2nd place character
        const sprite2 = this.placement === 2 ? getPlayerSprite(2) : getRivalSprite('FLEX', 'celebration');
        if (sprite2) SpriteRenderer.draw(ctx, sprite2, p2x + (podiumW - spriteW) / 2, podiumBaseY - p2h - spriteH);

        // 3rd place character
        const sprite3 = this.placement === 3 ? getPlayerSprite(3) : getRivalSprite('TONY', 'celebration');
        if (sprite3) SpriteRenderer.draw(ctx, sprite3, p3x + (podiumW - spriteW) / 2, podiumBaseY - p3h - spriteH);

        // If player didn't podium, show them off to the side (sad pose)
        if (this.placement === 4) {
            SpriteRenderer.draw(ctx, SAD_POSE, 8, podiumBaseY - spriteH);
        }

        // Messages
        const messages = {
            1: 'You dominated the competition!',
            2: 'A solid performance!',
            3: 'You made it to the podium!',
            4: 'Keep training and try again!',
        };
        drawCentered(ctx, messages[this.placement] || messages[4], podiumBaseY + 14, FONT_MD, COLORS.text);

        // Confetti
        for (const p of this.confettiParticles) {
            ctx.fillStyle = p.color;
            ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);
        }

        // Continue prompt
        const blink = Math.sin(this.timer * 3) > 0;
        if (blink) {
            drawCentered(ctx, 'PRESS ENTER TO CONTINUE', BASE_HEIGHT - 10, FONT_SM, COLORS.textDim);
        }
    }
}
