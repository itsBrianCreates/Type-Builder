/**
 * AudioEngine — Procedural chiptune music and 8-bit SFX for Type Builder.
 *
 * Uses Web Audio API exclusively (no external audio files).
 * Emulates NES-era sound: 2 pulse/square channels, 1 triangle, 1 noise.
 */

// ---------------------------------------------------------------------------
// Note frequency table (C2–B7)
// ---------------------------------------------------------------------------
const NOTE_FREQ = {};
const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
for (let oct = 0; oct <= 8; oct++) {
  for (let i = 0; i < 12; i++) {
    const midi = oct * 12 + i + 12; // C0 = midi 12
    NOTE_FREQ[`${NOTE_NAMES[i]}${oct}`] = 440 * Math.pow(2, (midi - 69) / 12);
  }
}
// Rest
NOTE_FREQ['REST'] = 0;

function freq(note) {
  return NOTE_FREQ[note] || 0;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Create a gain node with a value */
function makeGain(ctx, value = 1) {
  const g = ctx.createGain();
  g.gain.value = value;
  return g;
}

/** Simple ADSR envelope on a gain node. Returns total duration. */
function adsr(param, t, a, d, s, r, peak = 1) {
  param.setValueAtTime(0, t);
  param.linearRampToValueAtTime(peak, t + a);
  param.linearRampToValueAtTime(s * peak, t + a + d);
  param.setValueAtTime(s * peak, t + a + d + 0.001);
  param.linearRampToValueAtTime(0, t + a + d + r);
}

// ---------------------------------------------------------------------------
// Music definitions — arrays of { note, dur } objects
// dur is in beats (1 = quarter note at the track BPM)
// ---------------------------------------------------------------------------

// ---- MENU THEME (126 BPM, key of C major) ----
const MENU_BPM = 126;

const MENU_MELODY = [
  // Phrase 1 — catchy motivational hook
  { note: 'C5', dur: 0.5 }, { note: 'E5', dur: 0.5 }, { note: 'G5', dur: 0.5 }, { note: 'A5', dur: 0.5 },
  { note: 'G5', dur: 1 },   { note: 'E5', dur: 0.5 }, { note: 'D5', dur: 0.5 },
  { note: 'C5', dur: 0.5 }, { note: 'D5', dur: 0.5 }, { note: 'E5', dur: 0.5 }, { note: 'G5', dur: 0.5 },
  { note: 'A5', dur: 1 },   { note: 'G5', dur: 1 },
  // Phrase 2
  { note: 'A5', dur: 0.5 }, { note: 'G5', dur: 0.5 }, { note: 'E5', dur: 0.5 }, { note: 'D5', dur: 0.5 },
  { note: 'C5', dur: 1 },   { note: 'D5', dur: 0.5 }, { note: 'E5', dur: 0.5 },
  { note: 'D5', dur: 0.5 }, { note: 'C5', dur: 0.5 }, { note: 'D5', dur: 0.5 }, { note: 'E5', dur: 0.5 },
  { note: 'G5', dur: 1.5 }, { note: 'REST', dur: 0.5 },
  // Phrase 3 — higher energy repeat with variation
  { note: 'C5', dur: 0.5 }, { note: 'E5', dur: 0.5 }, { note: 'G5', dur: 0.5 }, { note: 'C6', dur: 0.5 },
  { note: 'B5', dur: 0.5 }, { note: 'A5', dur: 0.5 }, { note: 'G5', dur: 1 },
  { note: 'A5', dur: 0.5 }, { note: 'B5', dur: 0.5 }, { note: 'C6', dur: 1 },
  { note: 'B5', dur: 0.5 }, { note: 'A5', dur: 0.5 },
  // Phrase 4 — resolution
  { note: 'G5', dur: 0.5 }, { note: 'E5', dur: 0.5 }, { note: 'D5', dur: 0.5 }, { note: 'C5', dur: 0.5 },
  { note: 'D5', dur: 1 },   { note: 'E5', dur: 0.5 }, { note: 'G5', dur: 0.5 },
  { note: 'C5', dur: 2 },   { note: 'REST', dur: 1 },
];

const MENU_BASS = [
  // 4-bar bass pattern, repeated
  { note: 'C3', dur: 1 }, { note: 'C3', dur: 1 }, { note: 'G3', dur: 1 }, { note: 'G3', dur: 1 },
  { note: 'A2', dur: 1 }, { note: 'A2', dur: 1 }, { note: 'E3', dur: 1 }, { note: 'G3', dur: 1 },
  { note: 'F3', dur: 1 }, { note: 'F3', dur: 1 }, { note: 'C3', dur: 1 }, { note: 'C3', dur: 1 },
  { note: 'G2', dur: 1 }, { note: 'G2', dur: 1 }, { note: 'C3', dur: 1 }, { note: 'C3', dur: 1 },
  // Second half
  { note: 'C3', dur: 1 }, { note: 'C3', dur: 1 }, { note: 'E3', dur: 1 }, { note: 'G3', dur: 1 },
  { note: 'A2', dur: 1 }, { note: 'A2', dur: 1 }, { note: 'G3', dur: 1 }, { note: 'E3', dur: 1 },
  { note: 'F3', dur: 1 }, { note: 'F3', dur: 1 }, { note: 'G3', dur: 1 }, { note: 'G3', dur: 1 },
  { note: 'C3', dur: 2 }, { note: 'REST', dur: 1 },
];

// Drum pattern: kick(K), snare(S), hat(H) — 16th note grid for 4 bars
// Each entry: type, position in 16th notes
const MENU_DRUMS = [
  // Bar 1-4 repeated — standard 4-on-the-floor with hats
  'K.H.S.H.K.H.S.H.K.H.S.H.K.H.S.H.',
];

// ---- TYPING BGM (144 BPM, key of A minor — driving and urgent) ----
const TYPING_BPM = 144;

const TYPING_MELODY = [
  // Staccato, driving melody
  { note: 'A4', dur: 0.25 }, { note: 'REST', dur: 0.25 }, { note: 'C5', dur: 0.25 }, { note: 'REST', dur: 0.25 },
  { note: 'E5', dur: 0.25 }, { note: 'REST', dur: 0.25 }, { note: 'A5', dur: 0.5 },
  { note: 'G5', dur: 0.25 }, { note: 'REST', dur: 0.25 }, { note: 'E5', dur: 0.5 },
  { note: 'D5', dur: 0.25 }, { note: 'REST', dur: 0.25 }, { note: 'C5', dur: 0.5 },
  // Repeat with variation
  { note: 'A4', dur: 0.25 }, { note: 'REST', dur: 0.25 }, { note: 'C5', dur: 0.25 }, { note: 'REST', dur: 0.25 },
  { note: 'E5', dur: 0.5 },  { note: 'D5', dur: 0.5 },
  { note: 'C5', dur: 0.25 }, { note: 'REST', dur: 0.25 }, { note: 'B4', dur: 0.25 }, { note: 'REST', dur: 0.25 },
  { note: 'A4', dur: 1 },
  // Bridge — builds tension
  { note: 'F5', dur: 0.5 },  { note: 'E5', dur: 0.5 },
  { note: 'D5', dur: 0.25 }, { note: 'REST', dur: 0.25 }, { note: 'C5', dur: 0.25 }, { note: 'REST', dur: 0.25 },
  { note: 'B4', dur: 0.5 },  { note: 'A4', dur: 0.5 },
  { note: 'G4', dur: 0.25 }, { note: 'REST', dur: 0.25 }, { note: 'A4', dur: 0.25 }, { note: 'REST', dur: 0.25 },
  { note: 'B4', dur: 0.5 },  { note: 'C5', dur: 0.5 },
  // Climax phrase
  { note: 'E5', dur: 0.25 }, { note: 'REST', dur: 0.25 }, { note: 'E5', dur: 0.25 }, { note: 'REST', dur: 0.25 },
  { note: 'F5', dur: 0.25 }, { note: 'REST', dur: 0.25 }, { note: 'G5', dur: 0.5 },
  { note: 'A5', dur: 0.5 },  { note: 'G5', dur: 0.25 }, { note: 'REST', dur: 0.25 },
  { note: 'E5', dur: 0.5 },  { note: 'C5', dur: 0.5 },
  { note: 'A4', dur: 1 },    { note: 'REST', dur: 0.5 },
];

const TYPING_BASS = [
  // Pulsing bass — octave pumps
  { note: 'A2', dur: 0.5 }, { note: 'A3', dur: 0.5 }, { note: 'A2', dur: 0.5 }, { note: 'A3', dur: 0.5 },
  { note: 'C3', dur: 0.5 }, { note: 'C3', dur: 0.5 }, { note: 'E3', dur: 0.5 }, { note: 'E3', dur: 0.5 },
  { note: 'D3', dur: 0.5 }, { note: 'D3', dur: 0.5 }, { note: 'G2', dur: 0.5 }, { note: 'G2', dur: 0.5 },
  { note: 'A2', dur: 0.5 }, { note: 'A3', dur: 0.5 }, { note: 'A2', dur: 0.5 }, { note: 'A3', dur: 0.5 },
  // Second half
  { note: 'F2', dur: 0.5 }, { note: 'F3', dur: 0.5 }, { note: 'E2', dur: 0.5 }, { note: 'E3', dur: 0.5 },
  { note: 'D2', dur: 0.5 }, { note: 'D3', dur: 0.5 }, { note: 'G2', dur: 0.5 }, { note: 'G3', dur: 0.5 },
  { note: 'A2', dur: 0.5 }, { note: 'A3', dur: 0.5 }, { note: 'E3', dur: 0.5 }, { note: 'E2', dur: 0.5 },
  { note: 'A2', dur: 1 },   { note: 'REST', dur: 0.5 },
];

const TYPING_DRUMS = [
  'K.H.S.H.K.H.S.H.K.K.S.H.K.H.S.H.',
];

// ---- VICTORY FANFARE (one-shot, ~3.5 seconds) ----
const VICTORY_BPM = 160;
const VICTORY_MELODY = [
  { note: 'C5', dur: 0.25 }, { note: 'E5', dur: 0.25 }, { note: 'G5', dur: 0.25 },
  { note: 'C6', dur: 0.75 },
  { note: 'B5', dur: 0.25 }, { note: 'C6', dur: 0.25 },
  { note: 'E6', dur: 0.5 },  { note: 'D6', dur: 0.5 },
  { note: 'C6', dur: 1.5 },
];
const VICTORY_BASS = [
  { note: 'C3', dur: 0.5 }, { note: 'E3', dur: 0.5 }, { note: 'G3', dur: 0.5 },
  { note: 'C4', dur: 1 },
  { note: 'G3', dur: 0.5 }, { note: 'C4', dur: 0.5 },
  { note: 'C3', dur: 1.5 },
];

// ---- DEFEAT THEME (one-shot, ~4 seconds: sad trombone then motivational pickup) ----
const DEFEAT_BPM = 100;
const DEFEAT_MELODY = [
  // Sad trombone descending
  { note: 'B4', dur: 0.75 }, { note: 'A#4', dur: 0.75 }, { note: 'A4', dur: 0.75 }, { note: 'G#4', dur: 1.25 },
  { note: 'REST', dur: 0.5 },
  // Motivational pickup — "try again" feel
  { note: 'C5', dur: 0.25 }, { note: 'D5', dur: 0.25 }, { note: 'E5', dur: 0.5 },
  { note: 'G5', dur: 0.5 },  { note: 'E5', dur: 0.25 }, { note: 'C5', dur: 0.5 },
  { note: 'D5', dur: 0.5 },  { note: 'E5', dur: 1 },
];
const DEFEAT_BASS = [
  { note: 'E3', dur: 0.75 }, { note: 'D#3', dur: 0.75 }, { note: 'D3', dur: 0.75 }, { note: 'C#3', dur: 1.25 },
  { note: 'REST', dur: 0.5 },
  { note: 'C3', dur: 1 }, { note: 'G3', dur: 1 }, { note: 'C3', dur: 1.75 },
];


// ---------------------------------------------------------------------------
// AudioEngine class
// ---------------------------------------------------------------------------
export class AudioEngine {
  constructor() {
    /** @type {AudioContext|null} */
    this._ctx = null;

    // Master gain nodes
    this._musicGain = null;
    this._sfxGain = null;

    // Volume levels
    this._musicVolume = 0.5;
    this._sfxVolume = 0.6;

    // Current music state
    this._currentTrack = null;
    this._musicNodes = [];   // active oscillator/source nodes for current music
    this._musicTimer = null; // setTimeout id for music loop scheduling
    this._musicPlaying = false;
  }

  // -----------------------------------------------------------------------
  // Initialization
  // -----------------------------------------------------------------------

  /**
   * Ensure AudioContext is created and resumed.
   * Must be called from a user gesture handler the first time.
   */
  _ensureContext() {
    if (!this._ctx) {
      this._ctx = new (window.AudioContext || window.webkitAudioContext)();
      this._musicGain = makeGain(this._ctx, this._musicVolume);
      this._musicGain.connect(this._ctx.destination);
      this._sfxGain = makeGain(this._ctx, this._sfxVolume);
      this._sfxGain.connect(this._ctx.destination);
    }
    if (this._ctx.state === 'suspended') {
      this._ctx.resume();
    }
    return this._ctx;
  }

  // -----------------------------------------------------------------------
  // Volume controls
  // -----------------------------------------------------------------------

  setMusicVolume(v) {
    this._musicVolume = Math.max(0, Math.min(1, v));
    if (this._musicGain) {
      this._musicGain.gain.setValueAtTime(this._musicVolume, this._ctx.currentTime);
    }
  }

  setSFXVolume(v) {
    this._sfxVolume = Math.max(0, Math.min(1, v));
    if (this._sfxGain) {
      this._sfxGain.gain.setValueAtTime(this._sfxVolume, this._ctx.currentTime);
    }
  }

  // -----------------------------------------------------------------------
  // Music playback
  // -----------------------------------------------------------------------

  /**
   * Start playing a named music track. Stops any currently playing track.
   * @param {'menuTheme'|'typingBGM'|'victoryFanfare'|'defeatTheme'} trackName
   */
  playMusic(trackName) {
    this._ensureContext();
    this.stopMusic();
    this._currentTrack = trackName;
    this._musicPlaying = true;

    switch (trackName) {
      case 'menuTheme':
        this._scheduleTrack(MENU_MELODY, MENU_BASS, MENU_DRUMS, MENU_BPM, true);
        break;
      case 'typingBGM':
        this._scheduleTrack(TYPING_MELODY, TYPING_BASS, TYPING_DRUMS, TYPING_BPM, true);
        break;
      case 'victoryFanfare':
        this._scheduleTrack(VICTORY_MELODY, VICTORY_BASS, null, VICTORY_BPM, false);
        break;
      case 'defeatTheme':
        this._scheduleTrack(DEFEAT_MELODY, DEFEAT_BASS, null, DEFEAT_BPM, false);
        break;
      default:
        console.warn(`AudioEngine: unknown track "${trackName}"`);
    }
  }

  /** Stop all currently playing music. */
  stopMusic() {
    this._musicPlaying = false;
    this._currentTrack = null;
    if (this._musicTimer) {
      clearTimeout(this._musicTimer);
      this._musicTimer = null;
    }
    for (const node of this._musicNodes) {
      try { node.stop(); } catch (_) { /* already stopped */ }
    }
    this._musicNodes = [];
  }

  /**
   * Core sequencer — schedules melody, bass, and drum pattern into the AudioContext timeline.
   * Optionally loops when the sequence finishes.
   */
  _scheduleTrack(melody, bass, drumPattern, bpm, loop) {
    if (!this._musicPlaying) return;

    const ctx = this._ctx;
    const beatDur = 60 / bpm; // seconds per beat
    const startTime = ctx.currentTime + 0.05; // tiny lead-in to avoid clicks

    // Schedule melody (square wave — NES pulse channel 1)
    const melodyEnd = this._scheduleLine(melody, 'square', startTime, beatDur, this._musicGain, 0.18);

    // Schedule bass (triangle wave — NES triangle channel)
    const bassEnd = this._scheduleLine(bass, 'triangle', startTime, beatDur, this._musicGain, 0.22);

    // Schedule drums (noise channel)
    let drumEnd = 0;
    if (drumPattern) {
      drumEnd = this._scheduleDrums(drumPattern, startTime, beatDur, this._musicGain);
    }

    const trackDuration = Math.max(melodyEnd, bassEnd, drumEnd) - startTime;

    if (loop) {
      // Schedule next iteration slightly before this one ends
      const loopDelay = (trackDuration - 0.1) * 1000;
      this._musicTimer = setTimeout(() => {
        if (this._musicPlaying) {
          this._scheduleTrack(melody, bass, drumPattern, bpm, true);
        }
      }, Math.max(loopDelay, 100));
    }
  }

  /**
   * Schedule a melodic line (array of {note, dur}) using an oscillator type.
   * Returns the absolute end time.
   */
  _scheduleLine(notes, oscType, startTime, beatDur, destination, volume) {
    const ctx = this._ctx;
    let t = startTime;

    for (const { note, dur } of notes) {
      const noteDur = dur * beatDur;
      if (note === 'REST' || freq(note) === 0) {
        t += noteDur;
        continue;
      }

      const osc = ctx.createOscillator();
      osc.type = oscType;
      osc.frequency.value = freq(note);

      const env = makeGain(ctx, 0);
      // Short ADSR: quick attack, short decay, moderate sustain, quick release
      const attack = 0.01;
      const decay = Math.min(0.05, noteDur * 0.15);
      const sustain = 0.7;
      const release = Math.min(0.05, noteDur * 0.1);
      adsr(env.gain, t, attack, decay, sustain, release, volume);

      osc.connect(env);
      env.connect(destination);

      osc.start(t);
      osc.stop(t + noteDur + 0.01);
      this._musicNodes.push(osc);

      t += noteDur;
    }
    return t;
  }

  /**
   * Schedule a drum pattern string. Each char is a 16th-note slot:
   * K = kick (low noise burst), S = snare (mid noise burst), H = hi-hat (high noise tick), . = rest
   * Pattern repeats to fill the same duration as the melody/bass.
   */
  _scheduleDrums(patterns, startTime, beatDur, destination) {
    const ctx = this._ctx;
    const sixteenthDur = beatDur / 4;
    const pattern = patterns[0]; // single pattern string
    let t = startTime;

    for (let i = 0; i < pattern.length; i++) {
      const ch = pattern[i];
      if (ch === '.') {
        // Rest — advance time
        continue;
      }
      if (ch === 'K' || ch === 'S' || ch === 'H') {
        this._schedulePercHit(ch, t, sixteenthDur, destination);
        // Advance only on the NEXT dot or character that represents actual time
      }
      // Each character pair is a slot: the letter + the following dot
      // Actually let's just advance time on every other character
      if (i % 2 === 1) {
        t += sixteenthDur;
      }
    }
    // We play the pattern 4 times to fill ~4 bars
    // Actually, let's repeat the pattern to fill the same number of beats as melody
    // The pattern string "K.H.S.H.K.H.S.H.K.H.S.H.K.H.S.H." = 36 chars = 18 slots for 4 bars (16 sixteenths)
    // Let's just repeat 4x for a nice 16-bar fill
    const patternBeats = 4; // 4 bars per pattern
    const totalRepeats = 4;
    const singleLen = t - startTime;
    for (let rep = 1; rep < totalRepeats; rep++) {
      const repStart = startTime + singleLen * rep;
      let rt = repStart;
      for (let i = 0; i < pattern.length; i++) {
        const ch = pattern[i];
        if (ch === 'K' || ch === 'S' || ch === 'H') {
          this._schedulePercHit(ch, rt, sixteenthDur, destination);
        }
        if (i % 2 === 1) {
          rt += sixteenthDur;
        }
      }
    }

    return startTime + singleLen * totalRepeats;
  }

  /** Schedule a single percussion hit (noise-based). */
  _schedulePercHit(type, time, slotDur, destination) {
    const ctx = this._ctx;

    // Create noise via a buffer
    const bufSize = ctx.sampleRate * 0.1; // 100ms buffer
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buf;

    // Shape the noise depending on type
    const env = makeGain(ctx, 0);
    const filter = ctx.createBiquadFilter();

    if (type === 'K') {
      // Kick — low-pass filtered noise, punchy
      filter.type = 'lowpass';
      filter.frequency.value = 200;
      filter.Q.value = 1;
      env.gain.setValueAtTime(0, time);
      env.gain.linearRampToValueAtTime(0.35, time + 0.005);
      env.gain.exponentialRampToValueAtTime(0.001, time + 0.08);
    } else if (type === 'S') {
      // Snare — band-pass
      filter.type = 'bandpass';
      filter.frequency.value = 3000;
      filter.Q.value = 0.5;
      env.gain.setValueAtTime(0, time);
      env.gain.linearRampToValueAtTime(0.25, time + 0.003);
      env.gain.exponentialRampToValueAtTime(0.001, time + 0.06);
    } else {
      // Hi-hat — high-pass, very short
      filter.type = 'highpass';
      filter.frequency.value = 8000;
      filter.Q.value = 0.5;
      env.gain.setValueAtTime(0, time);
      env.gain.linearRampToValueAtTime(0.12, time + 0.002);
      env.gain.exponentialRampToValueAtTime(0.001, time + 0.03);
    }

    noise.connect(filter);
    filter.connect(env);
    env.connect(destination);

    noise.start(time);
    noise.stop(time + 0.1);
    this._musicNodes.push(noise);
  }

  // -----------------------------------------------------------------------
  // Sound Effects
  // -----------------------------------------------------------------------

  /**
   * Play a named sound effect.
   * @param {'correctKey'|'errorKey'|'repComplete'|'streakMilestone'|'timerWarning'|'crowdCheer'} sfxName
   */
  playSFX(sfxName) {
    this._ensureContext();

    switch (sfxName) {
      case 'correctKey':
        this._sfxCorrectKey();
        break;
      case 'errorKey':
        this._sfxErrorKey();
        break;
      case 'repComplete':
        this._sfxRepComplete();
        break;
      case 'streakMilestone':
        this._sfxStreakMilestone();
        break;
      case 'timerWarning':
        this._sfxTimerWarning();
        break;
      case 'crowdCheer':
        this._sfxCrowdCheer();
        break;
      default:
        console.warn(`AudioEngine: unknown SFX "${sfxName}"`);
    }
  }

  /** Correct keypress — subtle click/pop, 50ms */
  _sfxCorrectKey() {
    const ctx = this._ctx;
    const t = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.setValueAtTime(1200, t);
    osc.frequency.exponentialRampToValueAtTime(600, t + 0.03);

    const env = makeGain(ctx, 0);
    env.gain.setValueAtTime(0, t);
    env.gain.linearRampToValueAtTime(0.15, t + 0.005);
    env.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    osc.connect(env);
    env.connect(this._sfxGain);
    osc.start(t);
    osc.stop(t + 0.06);
  }

  /** Error keypress — short buzz/wrong note, 100ms */
  _sfxErrorKey() {
    const ctx = this._ctx;
    const t = ctx.currentTime;

    // Dissonant two-oscillator buzz
    for (const f of [120, 155]) {
      const osc = ctx.createOscillator();
      osc.type = 'square';
      osc.frequency.value = f;

      const env = makeGain(ctx, 0);
      env.gain.setValueAtTime(0, t);
      env.gain.linearRampToValueAtTime(0.18, t + 0.005);
      env.gain.linearRampToValueAtTime(0.15, t + 0.06);
      env.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

      osc.connect(env);
      env.connect(this._sfxGain);
      osc.start(t);
      osc.stop(t + 0.11);
    }
  }

  /** Rep complete — metallic clank + grunt, ~300ms */
  _sfxRepComplete() {
    const ctx = this._ctx;
    const t = ctx.currentTime;

    // Metallic clank — high frequency noise burst + resonant tone
    const bufSize = ctx.sampleRate * 0.15;
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const clank = ctx.createBufferSource();
    clank.buffer = buf;

    const clankFilter = ctx.createBiquadFilter();
    clankFilter.type = 'bandpass';
    clankFilter.frequency.value = 4000;
    clankFilter.Q.value = 8; // resonant metallic ring

    const clankEnv = makeGain(ctx, 0);
    clankEnv.gain.setValueAtTime(0, t);
    clankEnv.gain.linearRampToValueAtTime(0.4, t + 0.003);
    clankEnv.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

    clank.connect(clankFilter);
    clankFilter.connect(clankEnv);
    clankEnv.connect(this._sfxGain);
    clank.start(t);
    clank.stop(t + 0.16);

    // Grunt — short low-frequency noise burst
    const gruntBufSize = ctx.sampleRate * 0.2;
    const gruntBuf = ctx.createBuffer(1, gruntBufSize, ctx.sampleRate);
    const gruntData = gruntBuf.getChannelData(0);
    for (let i = 0; i < gruntBufSize; i++) {
      gruntData[i] = Math.random() * 2 - 1;
    }
    const grunt = ctx.createBufferSource();
    grunt.buffer = gruntBuf;

    const gruntFilter = ctx.createBiquadFilter();
    gruntFilter.type = 'bandpass';
    gruntFilter.frequency.value = 250;
    gruntFilter.Q.value = 3;

    const gruntEnv = makeGain(ctx, 0);
    gruntEnv.gain.setValueAtTime(0, t + 0.08);
    gruntEnv.gain.linearRampToValueAtTime(0.2, t + 0.1);
    gruntEnv.gain.exponentialRampToValueAtTime(0.001, t + 0.3);

    grunt.connect(gruntFilter);
    gruntFilter.connect(gruntEnv);
    gruntEnv.connect(this._sfxGain);
    grunt.start(t + 0.08);
    grunt.stop(t + 0.31);
  }

  /** Streak milestone — rising celebratory chime, ~500ms */
  _sfxStreakMilestone() {
    const ctx = this._ctx;
    const t = ctx.currentTime;

    const notes = [freq('C5'), freq('E5'), freq('G5'), freq('C6')];
    const noteDur = 0.12;

    for (let i = 0; i < notes.length; i++) {
      const osc = ctx.createOscillator();
      osc.type = 'square';
      osc.frequency.value = notes[i];

      const env = makeGain(ctx, 0);
      const nt = t + i * noteDur;
      env.gain.setValueAtTime(0, nt);
      env.gain.linearRampToValueAtTime(0.2, nt + 0.01);
      env.gain.linearRampToValueAtTime(0.15, nt + noteDur * 0.6);
      env.gain.exponentialRampToValueAtTime(0.001, nt + noteDur + 0.08);

      osc.connect(env);
      env.connect(this._sfxGain);
      osc.start(nt);
      osc.stop(nt + noteDur + 0.1);
    }
  }

  /** Timer warning — low heartbeat pulse, ~600ms per beat */
  _sfxTimerWarning() {
    const ctx = this._ctx;
    const t = ctx.currentTime;

    // Double-pulse heartbeat: thump-thump
    for (const offset of [0, 0.15]) {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(60, t + offset);
      osc.frequency.exponentialRampToValueAtTime(30, t + offset + 0.15);

      const env = makeGain(ctx, 0);
      env.gain.setValueAtTime(0, t + offset);
      env.gain.linearRampToValueAtTime(0.35, t + offset + 0.02);
      env.gain.exponentialRampToValueAtTime(0.001, t + offset + 0.2);

      osc.connect(env);
      env.connect(this._sfxGain);
      osc.start(t + offset);
      osc.stop(t + offset + 0.25);
    }
  }

  /** Crowd cheer — shaped white noise to simulate crowd roar, ~1 second */
  _sfxCrowdCheer() {
    const ctx = this._ctx;
    const t = ctx.currentTime;
    const duration = 1.0;

    const bufSize = ctx.sampleRate * (duration + 0.2);
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buf.getChannelData(0);

    // Layered noise with amplitude modulation to simulate crowd texture
    for (let i = 0; i < bufSize; i++) {
      const base = Math.random() * 2 - 1;
      // Slow amplitude modulation for "roar" texture
      const mod = 0.7 + 0.3 * Math.sin(i / (ctx.sampleRate * 0.05));
      data[i] = base * mod;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buf;

    // Band-pass to vocal-ish range
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1500;
    filter.Q.value = 0.5;

    // Second filter for more character
    const filter2 = ctx.createBiquadFilter();
    filter2.type = 'peaking';
    filter2.frequency.value = 3000;
    filter2.gain.value = 6;
    filter2.Q.value = 1;

    const env = makeGain(ctx, 0);
    env.gain.setValueAtTime(0, t);
    env.gain.linearRampToValueAtTime(0.3, t + 0.1);
    env.gain.setValueAtTime(0.3, t + 0.1);
    env.gain.linearRampToValueAtTime(0.35, t + 0.3);
    env.gain.linearRampToValueAtTime(0.25, t + 0.7);
    env.gain.exponentialRampToValueAtTime(0.001, t + duration);

    noise.connect(filter);
    filter.connect(filter2);
    filter2.connect(env);
    env.connect(this._sfxGain);

    noise.start(t);
    noise.stop(t + duration + 0.1);
  }
}
