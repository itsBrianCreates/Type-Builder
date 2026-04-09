import {
    BASE_WIDTH, BASE_HEIGHT, MIN_SCALE, MAX_SCALE, FPS,
    SPEED_TIERS, ROUND_DURATION, COLORS, STREAK_MILESTONE,
} from './constants.js';
import { TypingEngine } from './typing-engine.js';
import { GameState } from './game-state.js';
import { calculateScore, generateRivalScores, calculatePlacement, calculateReps } from './scoring.js';
import { getSentences, getSentencesForRound } from './sentences.js';
import { AudioEngine } from '../audio/audio-engine.js';
import { SpriteRenderer, AnimationPlayer } from '../sprites/sprite-renderer.js';
import { BODYBUILDER_ANIMATIONS, BODYBUILDER_WIDTH, BODYBUILDER_HEIGHT } from '../sprites/bodybuilder.js';
import { RIVALS, RIVAL_WIDTH, RIVAL_HEIGHT } from '../sprites/rivals.js';
import { drawGymBackground, drawStageBackground, drawPodiumScene } from '../sprites/backgrounds.js';
import { HUD } from '../ui/hud.js';
import {
    ScreenTransition, TitleScreen, PreRoundScreen,
    CountdownScreen, ResultsScreen, CompetitionScreen, PodiumScreen,
} from '../ui/screens.js';

// ── Canvas setup ────────────────────────────────────────────
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

function calculateScale() {
    const maxW = Math.floor(window.innerWidth / BASE_WIDTH);
    const maxH = Math.floor(window.innerHeight / BASE_HEIGHT);
    return Math.max(MIN_SCALE, Math.min(MAX_SCALE, Math.min(maxW, maxH)));
}

function resizeCanvas() {
    const scale = calculateScale();
    canvas.width = BASE_WIDTH * scale;
    canvas.height = BASE_HEIGHT * scale;
    ctx.imageSmoothingEnabled = false;
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// ── Hidden input for keystroke capture ──────────────────────
const inputEl = document.getElementById('typing-input');
document.addEventListener('click', () => inputEl.focus());
inputEl.addEventListener('blur', () => setTimeout(() => inputEl.focus(), 100));

// ── Core systems ────────────────────────────────────────────
const audio = new AudioEngine();
const typing = new TypingEngine();
const gameState = new GameState();
const hud = new HUD();
const transition = new ScreenTransition();

// Deep-clone animation data so setSpeed doesn't mutate originals
function cloneAnimations(src) {
    const out = {};
    for (const key of Object.keys(src)) {
        out[key] = {
            frames: src[key].frames,
            frameDuration: src[key].frameDuration,
        };
    }
    return out;
}

const bodybuilderAnim = new AnimationPlayer(cloneAnimations(BODYBUILDER_ANIMATIONS));
bodybuilderAnim.play('idle');

// Rival animation players — they press at a fixed pace during the typing round
const rivalAnims = {
    ivan: new AnimationPlayer(cloneAnimations(BODYBUILDER_ANIMATIONS)),
    flex: new AnimationPlayer(cloneAnimations(BODYBUILDER_ANIMATIONS)),
    tony: new AnimationPlayer(cloneAnimations(BODYBUILDER_ANIMATIONS)),
};
// Set rival press speeds: simulate a WPM in the middle of their score tier
// Ivan (gold) is fast, Flex (silver) is medium, Tony (bronze) is slowest
function setRivalSpeeds() {
    // Ivan: ~55 WPM (fast tier, pressInterval 1.5s)
    rivalAnims.ivan.play('press');
    rivalAnims.ivan.setSpeed(1.5 / 8);
    // Flex: ~35 WPM (average tier, pressInterval 2.5s)
    rivalAnims.flex.play('press');
    rivalAnims.flex.setSpeed(2.5 / 8);
    // Tony: ~20 WPM (slow tier, pressInterval 4.0s)
    rivalAnims.tony.play('press');
    rivalAnims.tony.setSpeed(4.0 / 8);
}

// ── Screen instances ────────────────────────────────────────
const titleScreen = new TitleScreen();
const preRoundScreen = new PreRoundScreen();
const countdownScreen = new CountdownScreen();
const resultsScreen = new ResultsScreen();
const competitionScreen = new CompetitionScreen();
const podiumScreen = new PodiumScreen();

// ── Particle / VFX system ───────────────────────────────────
const particles = [];

function spawnParticles(type, count, x, y) {
    for (let i = 0; i < count; i++) {
        const p = { type, x, y, life: 1, maxLife: 1 };
        if (type === 'confetti') {
            p.vx = (Math.random() - 0.5) * 60;
            p.vy = -40 - Math.random() * 60;
            p.gravity = 80;
            p.color = [COLORS.gold, COLORS.accent, '#ff6666', '#66ff66', '#6666ff'][Math.floor(Math.random() * 5)];
            p.size = 1 + Math.random() * 2;
            p.maxLife = 2 + Math.random();
            p.life = p.maxLife;
        } else if (type === 'speedline') {
            p.x = Math.random() * BASE_WIDTH;
            p.y = Math.random() * BASE_HEIGHT;
            p.vx = -80 - Math.random() * 60;
            p.vy = 0;
            p.color = 'rgba(255,255,255,0.3)';
            p.maxLife = 0.3 + Math.random() * 0.3;
            p.life = p.maxLife;
        } else if (type === 'sparkle') {
            p.x = x + (Math.random() - 0.5) * 20;
            p.y = y + (Math.random() - 0.5) * 20;
            p.vx = (Math.random() - 0.5) * 20;
            p.vy = (Math.random() - 0.5) * 20;
            p.color = COLORS.gold;
            p.size = 1;
            p.maxLife = 0.4 + Math.random() * 0.3;
            p.life = p.maxLife;
        } else if (type === 'sweat') {
            p.x = x + (Math.random() - 0.5) * 10;
            p.y = y;
            p.vx = (Math.random() - 0.5) * 8;
            p.vy = 15 + Math.random() * 10;
            p.color = '#88ccff';
            p.size = 1;
            p.maxLife = 0.6;
            p.life = p.maxLife;
        }
        particles.push(p);
    }
}

function updateParticles(dt) {
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= dt;
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        p.x += (p.vx || 0) * dt;
        p.y += (p.vy || 0) * dt;
        if (p.gravity) p.vy += p.gravity * dt;
    }
}

function renderParticles(ctx) {
    for (const p of particles) {
        const alpha = Math.max(0, p.life / p.maxLife);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color || '#fff';
        const s = p.size || 1;
        if (p.type === 'speedline') {
            ctx.fillRect(Math.floor(p.x), Math.floor(p.y), 6, 1);
        } else {
            ctx.fillRect(Math.floor(p.x), Math.floor(p.y), s, s);
        }
    }
    ctx.globalAlpha = 1.0;
}

// ── Screen shake ────────────────────────────────────────────
let shakeIntensity = 0;
let shakeTimer = 0;

function triggerShake(intensity, duration) {
    shakeIntensity = intensity;
    shakeTimer = duration;
}

function updateShake(dt) {
    if (shakeTimer > 0) {
        shakeTimer -= dt;
        if (shakeTimer <= 0) { shakeIntensity = 0; shakeTimer = 0; }
    }
}

function applyShake() {
    if (shakeIntensity > 0) {
        const ox = (Math.random() - 0.5) * shakeIntensity * 2;
        const oy = (Math.random() - 0.5) * shakeIntensity * 2;
        ctx.translate(ox, oy);
        return true;
    }
    return false;
}

// ── Game state machine ──────────────────────────────────────
// States: 'title', 'pre_round', 'countdown', 'typing', 'results', 'competition', 'podium'
let currentState = 'title';

// Round-local state
let roundTimer = 0;
let totalRepsThisRound = 0;
let curlAccumulator = 0; // time since last rep
let currentTier = SPEED_TIERS[0];
let effectTimer = 0; // for periodic VFX spawning
let timerWarningSounded = false;

// Latest round results for passing between screens
let roundResults = null;
let roundRivalScores = null;
let roundPlacement = 0;

// ── Typing engine callbacks ─────────────────────────────────
typing.onCorrectKey = () => {
    audio.playSFX('correctKey');
};

typing.onErrorKey = () => {
    audio.playSFX('errorKey');
};

typing.onSentenceComplete = () => {
    // No specific SFX needed here; rep SFX handles the feedback
};

typing.onStreakMilestone = (streak) => {
    audio.playSFX('streakMilestone');
    // Sparkle burst at character position
    const charX = BASE_WIDTH / 2;
    const charY = BASE_HEIGHT / 2 - 10;
    spawnParticles('sparkle', 8, charX, charY);
};

typing.onAllSentencesComplete = () => {
    // Reload more sentences if round is still going
    if (currentState === 'typing') {
        const config = gameState.getRoundConfig();
        const sentences = gameState.mode === 'tournament'
            ? getSentencesForRound(gameState.currentRound)
            : getSentences(config.difficulty, 20);
        typing.loadSentences(sentences);
    }
};

// ── WPM-to-animation tier helper ────────────────────────────
function getTierForWPM(wpm) {
    for (const tier of SPEED_TIERS) {
        if (wpm >= tier.minWPM && wpm <= tier.maxWPM) return tier;
    }
    return SPEED_TIERS[SPEED_TIERS.length - 1];
}

// ── State transitions ───────────────────────────────────────

function goToTitle() {
    transition.start(() => {
        currentState = 'title';
        titleScreen.enter();
        audio.playMusic('menuTheme');
        bodybuilderAnim.play('idle');
        particles.length = 0;
    });
}

function goToPreRound() {
    const config = gameState.getRoundConfig();
    transition.start(() => {
        currentState = 'pre_round';
        preRoundScreen.enter({
            roundName: config.name,
            roundNumber: gameState.currentRound,
        });
    });
}

function goToCountdown() {
    transition.start(() => {
        currentState = 'countdown';
        countdownScreen.enter();
        audio.stopMusic();
    });
}

function startTypingRound() {
    currentState = 'typing';
    const config = gameState.getRoundConfig();
    roundTimer = config.duration;
    totalRepsThisRound = 0;
    curlAccumulator = 0;
    effectTimer = 0;
    timerWarningSounded = false;
    particles.length = 0;

    typing.reset();
    const sentences = gameState.mode === 'tournament'
        ? getSentencesForRound(gameState.currentRound)
        : getSentences(config.difficulty, 20);
    typing.loadSentences(sentences);

    bodybuilderAnim.play('idle');
    setRivalSpeeds(); // start rivals pressing at their fixed paces
    audio.playMusic('typingBGM');
}

function endTypingRound() {
    audio.stopMusic();
    const stats = typing.getStats();
    const wpm = stats.wpm;
    const config = gameState.getRoundConfig();
    const reps = totalRepsThisRound;

    const totalScore = calculateScore({
        totalReps: reps,
        accuracy: stats.accuracy,
        longestStreak: stats.longestStreak,
        avgWPM: wpm,
    });

    roundResults = {
        reps,
        wpm,
        accuracy: stats.accuracy,
        streak: stats.longestStreak,
        totalScore,
    };

    // Determine rival difficulty for this round
    let rivalDifficulty = gameState.difficulty;
    if (gameState.mode === 'tournament') {
        rivalDifficulty = config.difficulty;
    }
    roundRivalScores = generateRivalScores(rivalDifficulty);

    roundPlacement = calculatePlacement(totalScore, roundRivalScores);

    transition.start(() => {
        currentState = 'results';
        resultsScreen.enter(roundResults);
    });
}

function goToCompetition() {
    transition.start(() => {
        currentState = 'competition';
        competitionScreen.enter({
            playerScore: roundResults.totalScore,
            rivals: [
                { name: RIVALS.ivan.name, shortName: 'IVAN', score: roundRivalScores.gold, color: '#cc2222' },
                { name: RIVALS.flex.name, shortName: 'FLEX', score: roundRivalScores.silver, color: '#2266cc' },
                { name: RIVALS.tony.name, shortName: 'TONY', score: roundRivalScores.bronze, color: '#22882a' },
            ],
        });
        audio.playSFX('crowdCheer');
    });
}

function goToPodium() {
    transition.start(() => {
        currentState = 'podium';
        podiumScreen.enter({ placement: roundPlacement });

        // Record result and play appropriate music
        gameState.recordResult({
            playerScore: roundResults.totalScore,
            rivalScores: roundRivalScores,
            placement: roundPlacement,
        });

        if (roundPlacement === 1) {
            audio.playMusic('victoryFanfare');
            spawnParticles('confetti', 40, BASE_WIDTH / 2, 0);
        } else if (roundPlacement <= 3) {
            audio.playMusic('victoryFanfare');
        } else {
            audio.playMusic('defeatTheme');
        }

        // Set bodybuilder pose
        if (roundPlacement <= 2) {
            bodybuilderAnim.play('victory', false);
        } else if (roundPlacement === 4) {
            bodybuilderAnim.play('sad', false);
        } else {
            bodybuilderAnim.play('idle');
        }
    });
}

function afterPodium() {
    if (gameState.mode === 'tournament') {
        if (gameState.isEliminated()) {
            goToTitle();
            return;
        }
        const hasNext = gameState.advanceRound();
        if (hasNext) {
            goToPreRound();
        } else {
            // Tournament complete
            goToTitle();
        }
    } else {
        goToTitle();
    }
}

// ── Input handling ──────────────────────────────────────────

document.addEventListener('keydown', (e) => {
    const key = e.key;

    // During typing state, feed to typing engine
    if (currentState === 'typing') {
        if (key === 'Backspace' || key.length === 1) {
            typing.handleKey(key);
            e.preventDefault();
        }
        return;
    }

    // During title screen
    if (currentState === 'title') {
        const result = titleScreen.handleInput(key);
        if (result && result.action === 'select') {
            audio.playSFX('correctKey'); // menu select blip
            if (result.mode === 'quick_pump') {
                gameState.startQuickPump('medium');
                goToPreRound();
            } else if (result.mode === 'tournament') {
                gameState.startTournament('medium');
                goToPreRound();
            } else if (result.mode === 'endless') {
                gameState.startEndless('medium');
                goToPreRound();
            }
        }
        return;
    }

    // Pre-round screen
    if (currentState === 'pre_round') {
        const result = preRoundScreen.handleInput(key);
        if (result && result.action === 'start_countdown') {
            audio.playSFX('correctKey');
            goToCountdown();
        }
        return;
    }

    // Countdown (no input)
    if (currentState === 'countdown') {
        return;
    }

    // Results screen
    if (currentState === 'results') {
        const result = resultsScreen.handleInput(key);
        if (result && result.action === 'show_competition') {
            goToCompetition();
        }
        return;
    }

    // Competition screen
    if (currentState === 'competition') {
        const result = competitionScreen.handleInput(key);
        if (result && result.action === 'show_podium') {
            goToPodium();
        }
        return;
    }

    // Podium screen
    if (currentState === 'podium') {
        const result = podiumScreen.handleInput(key);
        if (result && result.action === 'continue') {
            afterPodium();
        }
        return;
    }
});

// ── Game loop ───────────────────────────────────────────────
let lastTime = 0;
const frameDuration = 1000 / FPS;

// Character position for the gym scene — feet on the floor (floor at Y=159)
const charX = (BASE_WIDTH - BODYBUILDER_WIDTH) / 2;
const charY = 159 - BODYBUILDER_HEIGHT; // feet on the floor

function gameLoop(timestamp) {
    const delta = timestamp - lastTime;

    if (delta >= frameDuration) {
        lastTime = timestamp - (delta % frameDuration);
        const dt = delta / 1000;

        update(dt);
        render();
    }

    requestAnimationFrame(gameLoop);
}

function update(dt) {
    // Always update transition
    transition.update(dt);
    updateParticles(dt);
    updateShake(dt);

    if (currentState === 'title') {
        titleScreen.update(dt);
    }

    if (currentState === 'pre_round') {
        preRoundScreen.update(dt);
    }

    if (currentState === 'countdown') {
        const result = countdownScreen.update(dt);
        if (result && result.action === 'start_typing') {
            startTypingRound();
        }
    }

    if (currentState === 'typing') {
        // Countdown round timer
        roundTimer -= dt;

        // Timer warning SFX at 10 seconds
        if (roundTimer <= 10 && roundTimer > 0 && !timerWarningSounded) {
            timerWarningSounded = true;
            audio.playSFX('timerWarning');
        }

        // End round when timer expires
        if (roundTimer <= 0) {
            roundTimer = 0;
            currentState = 'ending'; // prevent re-entry
            endTypingRound();
            return;
        }

        // Get current WPM and update tier
        const wpm = typing.wpm;
        currentTier = getTierForWPM(wpm);

        // Update bodybuilder animation based on typing activity
        if (typing.hasStarted && wpm > 0) {
            bodybuilderAnim.play('press');
            // Map press interval to animation frame duration
            // 8 frames in press cycle, so frameDuration = pressInterval / 8
            const curlFrameDur = currentTier.curlInterval / 8;
            bodybuilderAnim.setSpeed(curlFrameDur);

            // Count reps based on press interval
            curlAccumulator += dt;
            if (curlAccumulator >= currentTier.curlInterval) {
                curlAccumulator -= currentTier.curlInterval;
                totalRepsThisRound++;
                audio.playSFX('repComplete');
            }
        } else {
            bodybuilderAnim.play('idle');
        }

        bodybuilderAnim.update(dt);

        // Update rival animations
        rivalAnims.ivan.update(dt);
        rivalAnims.flex.update(dt);
        rivalAnims.tony.update(dt);

        // Periodic VFX based on tier
        effectTimer += dt;
        if (currentTier.effect === 'struggle' && effectTimer >= 1.5) {
            effectTimer = 0;
            spawnParticles('sweat', 2, charX + BODYBUILDER_WIDTH / 2, charY + 4);
        } else if (currentTier.effect === 'speedlines' && effectTimer >= 0.3) {
            effectTimer = 0;
            spawnParticles('speedline', 2, 0, 0);
        } else if (currentTier.effect === 'screenshake') {
            if (effectTimer >= 0.2) {
                effectTimer = 0;
                spawnParticles('speedline', 3, 0, 0);
                triggerShake(1, 0.1);
            }
        } else if (currentTier.effect === 'blazing') {
            if (effectTimer >= 0.1) {
                effectTimer = 0;
                spawnParticles('speedline', 4, 0, 0);
                spawnParticles('sparkle', 2, charX + BODYBUILDER_WIDTH / 2, charY + BODYBUILDER_HEIGHT / 2);
                triggerShake(1.5, 0.08);
            }
        }

        // Update HUD
        const stats = typing.getStats();
        hud.update({
            roundName: gameState.getRoundConfig().name,
            timeRemaining: roundTimer,
            currentSentence: typing.currentSentence || '',
            typedChars: typing.charStates.map(s => s === 'correct' ? 'correct' : s === 'incorrect' ? 'error' : null),
            reps: totalRepsThisRound,
            wpm: stats.wpm,
            accuracy: stats.accuracy,
            streak: stats.streak,
            longestStreak: stats.longestStreak,
        });
    }

    if (currentState === 'results') {
        resultsScreen.update(dt);
    }

    if (currentState === 'competition') {
        competitionScreen.update(dt);
    }

    if (currentState === 'podium') {
        podiumScreen.update(dt);
        bodybuilderAnim.update(dt);
    }
}

function render() {
    ctx.save();

    // Apply screen shake offset
    const shaking = applyShake();

    // Clear
    ctx.clearRect(-4, -4, BASE_WIDTH + 8, BASE_HEIGHT + 8);

    if (currentState === 'title') {
        titleScreen.render(ctx);
    }

    if (currentState === 'pre_round') {
        preRoundScreen.render(ctx);
    }

    if (currentState === 'countdown') {
        countdownScreen.render(ctx);
    }

    if (currentState === 'typing' || currentState === 'ending') {
        // Gym background
        drawGymBackground(ctx);

        // All characters on the gym floor
        const floorY = 159;
        const feetY = floorY - BODYBUILDER_HEIGHT;
        const now = performance.now() / 1000;

        // Press frame order: LOW → MID → HIGH → TOP → HIGH → MID → LOW → LOW (8 frames)
        const pressFrameKeys = ['press_low', 'press_low', 'press_mid', 'press_high', 'press_top', 'press_high', 'press_mid', 'press_low'];

        // Helper: get the current press frame for a rival based on speed
        function getRivalPressFrame(rival, speed) {
            const cycle = (now * speed) % 1; // 0→1 repeating
            const idx = Math.floor(cycle * pressFrameKeys.length);
            return rival.sprites[pressFrameKeys[idx]] || rival.sprites.idle;
        }

        // Helper: draw barbell overlay at the correct height for a press phase
        function drawBarbell(x, spriteY, speed) {
            const cycle = (now * speed) % 1;
            const phase = Math.sin(cycle * Math.PI); // 0→1→0 (up and down)
            const barbellY = spriteY + 11 - Math.floor(phase * 11);

            // Bar (gray line)
            ctx.fillStyle = '#C0C0C0';
            ctx.fillRect(x - 2, barbellY, 36, 1);
            // Left plate
            ctx.fillStyle = '#505050';
            ctx.fillRect(x - 4, barbellY - 2, 4, 5);
            // Right plate
            ctx.fillRect(x + 32, barbellY - 2, 4, 5);
        }

        // Helper: draw a character lifting with barbell and name
        function drawLifter(sprite, x, speed, color, name) {
            SpriteRenderer.draw(ctx, sprite, x, feetY);
            drawBarbell(x, feetY, speed);
            ctx.font = '6px monospace';
            ctx.fillStyle = color;
            ctx.textAlign = 'center';
            ctx.fillText(name, x + 16, floorY + 2);
        }

        // Rivals (using their own animated press frames)
        drawLifter(getRivalPressFrame(RIVALS.tony, 0.25), 8, 0.25, '#22882a', 'TONY');
        drawLifter(getRivalPressFrame(RIVALS.flex, 0.4), 50, 0.4, '#2266cc', 'FLEX');
        drawLifter(getRivalPressFrame(RIVALS.ivan, 0.67), BASE_WIDTH - 40, 0.67, '#cc2222', 'IVAN');

        // Tyler (player) — uses AnimationPlayer for typing-speed-driven animation
        bodybuilderAnim.render(ctx, charX, charY);
        // Tyler's barbell: position based on current animation frame
        // Map press animation progress to barbell height
        if (currentState === 'typing' && typing.hasStarted && typing.wpm > 0) {
            const anim = bodybuilderAnim.animations['press'];
            if (anim && anim.frames.length > 0) {
                const frameProgress = bodybuilderAnim.currentFrame / anim.frames.length;
                const phase = Math.sin(frameProgress * Math.PI);
                const barbellY = charY + 11 - Math.floor(phase * 11);
                ctx.fillStyle = '#C0C0C0';
                ctx.fillRect(charX - 2, barbellY, 36, 1);
                ctx.fillStyle = '#505050';
                ctx.fillRect(charX - 4, barbellY - 2, 4, 5);
                ctx.fillRect(charX + 32, barbellY - 2, 4, 5);
            }
        } else {
            // Idle: barbell at shoulder height
            const barbellY = charY + 11;
            ctx.fillStyle = '#C0C0C0';
            ctx.fillRect(charX - 2, barbellY, 36, 1);
            ctx.fillStyle = '#505050';
            ctx.fillRect(charX - 4, barbellY - 2, 4, 5);
            ctx.fillRect(charX + 32, barbellY - 2, 4, 5);
        }

        // Tyler's name
        ctx.font = '6px monospace';
        ctx.fillStyle = COLORS.gold;
        ctx.textAlign = 'center';
        ctx.fillText('TYLER', charX + BODYBUILDER_WIDTH / 2, floorY + 2);
        ctx.textAlign = 'left';

        // Particles (speed lines, sparkles, sweat)
        renderParticles(ctx);

        // HUD overlay
        hud.render(ctx);
    }

    if (currentState === 'results') {
        resultsScreen.render(ctx);
    }

    if (currentState === 'competition') {
        competitionScreen.render(ctx);
    }

    if (currentState === 'podium') {
        podiumScreen.render(ctx);
        renderParticles(ctx);
    }

    // Screen transition overlay (always on top)
    transition.render(ctx);

    ctx.restore();
}

// ── Boot ────────────────────────────────────────────────────
titleScreen.enter();
// Defer music until first user interaction (browsers block AudioContext before gesture)
try {
    audio.playMusic('menuTheme');
} catch (e) {
    console.warn('Audio deferred until user interaction:', e);
}
requestAnimationFrame(gameLoop);

// Resume audio on first click/keypress (browser autoplay policy)
let audioResumed = false;
function resumeAudio() {
    if (audioResumed) return;
    audioResumed = true;
    try { audio.playMusic('menuTheme'); } catch (_) {}
}
document.addEventListener('click', resumeAudio, { once: true });
document.addEventListener('keydown', resumeAudio, { once: true });
