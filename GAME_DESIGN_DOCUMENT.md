# Type Builder: Game Design Document

**Version:** 1.0  
**Date:** April 8, 2026  
**Genre:** Typing / Arcade / Sports  
**Platform:** Desktop (Windows, macOS, Linux)  
**Art Style:** 8-bit pixel art (NES-era, Contra/Mario inspired)

---

## 1. Concept Overview

**Type Builder** is a desktop typing game where you play as an aspiring bodybuilder competing to win a bodybuilding championship. The core gameplay loop is simple: sentences appear on screen, and you type them as fast and accurately as possible. Your typing drives a pixel-art bodybuilder performing exercises in real time — the faster and more accurately you type, the faster and more powerfully your character lifts. At the end of each round, you step on stage at a bodybuilding contest and are ranked against three AI competitors based on your performance.

**The Hook:** No typing game has ever combined typing mechanics with a bodybuilding/fitness theme. The visual comedy of an 8-bit muscleman doing reps powered by your keyboard, combined with the competitive tension of a bodybuilding showdown, creates a unique and memorable experience.

### Inspirations

| Game | What We Take From It |
|------|---------------------|
| **The Typing of the Dead** | Character actions directly driven by typing input; absurd humor |
| **TypeRacer** | Competitive scoring against opponents; WPM-based progression |
| **ZType** | Escalating difficulty; satisfying feedback loops |
| **Punch-Out!!** | Colorful rival characters with personality; tournament bracket structure |
| **Track & Field (NES)** | Button-mashing sports arcade feel translated to typing |

---

## 2. Core Gameplay

### 2.1 The Typing Mechanic

- A **sentence or phrase** appears at the top of the screen
- The player types the sentence in a text input area at the bottom
- Characters turn **green** as typed correctly, **red** on errors
- A **cursor/highlight** tracks the current position in the sentence
- Backspace is allowed to fix mistakes, but costs time
- When a sentence is completed, the next one appears immediately

### 2.2 The Exercise Animation

The primary exercise is the **Bicep Curl** — chosen for pixel art simplicity:

- **Why bicep curls:** The animation is a single arm moving through an arc (down position to curled position). This requires the fewest distinct sprite frames while being instantly recognizable as weightlifting. Compared to squats (full body movement, complex leg positioning) or bench press (side-view perspective issues, bar occlusion), the bicep curl has a clear, readable silhouette at low resolution.
- The character stands in a **3/4 front-facing view**, holding a dumbbell in their right hand
- The animation cycle: arm down (rest) → arm curling up → arm fully curled (flex) → arm back down
- **4-6 key frames** for the full curl cycle, interpolated with pixel art sub-frames

**Typing-to-Animation Mapping:**

| Typing Speed (WPM) | Animation Speed | Visual Effect |
|---------------------|----------------|---------------|
| 0-20 WPM (slow) | ~1 curl per 4 seconds | Character struggles, shaky arm, sweat drops |
| 21-40 WPM (average) | ~1 curl per 2.5 seconds | Smooth, steady curling |
| 41-60 WPM (fast) | ~1 curl per 1.5 seconds | Fast curling, small speed lines |
| 61-80 WPM (very fast) | ~1 curl per second | Rapid curling, muscles visibly pump up, screen shake |
| 81+ WPM (elite) | ~1 curl per 0.7 seconds | Blazing speed, afterimage trails, particle effects, muscles glow |

**Accuracy Effects:**
- **95-100% accuracy:** Muscles appear slightly larger (pump effect); bonus sparkle on the dumbbell
- **80-94% accuracy:** Normal appearance
- **Below 80% accuracy:** Character's form gets sloppy; arm wobbles; dumbbell tilts

### 2.3 Rep Counter & Score

Each completed curl = 1 **rep**. The score is calculated from:

```
Round Score = (Total Reps x 100) + (Accuracy Bonus) + (Streak Bonus) + (Speed Bonus)

Where:
  Accuracy Bonus  = (Accuracy% - 80) x 50   (only if above 80%)
  Streak Bonus    = Longest error-free streak (in characters) x 10
  Speed Bonus     = Average WPM x 20
```

**Example:** A player averaging 55 WPM with 92% accuracy, a 47-character streak, and 38 reps in a round:
```
(38 x 100) + (12 x 50) + (47 x 10) + (55 x 20) = 3800 + 600 + 470 + 1100 = 5,970 points
```

---

## 3. Game Structure

### 3.1 Round Flow

```
┌─────────────────────────────────────────────┐
│  1. PRE-ROUND: Intro screen, rival preview  │
│  2. COUNTDOWN: "3... 2... 1... LIFT!"       │
│  3. TYPING ROUND: 60 seconds of typing      │
│  4. RESULTS: Rep count, WPM, accuracy shown │
│  5. COMPETITION: Bodybuilding stage reveal   │
│  6. RANKING: Podium placement announced     │
└─────────────────────────────────────────────┘
```

Each round lasts **60 seconds**. The player types continuously while their character curls in sync. When the timer runs out, a whistle/buzzer sounds and the gym scene transitions to the competition stage.

### 3.2 The Bodybuilding Competition

After the typing round, the scene cuts to a **bodybuilding stage** — a classic competition setup with:

- A raised platform/stage with spotlights
- A panel of three pixel-art judges at a table
- Four competitors standing in a lineup: **you + 3 AI rivals**

**How Placement Works:**

Each AI rival has a **predetermined score range** that scales with difficulty level:

| Rival | Easy Mode Score Range | Medium Mode | Hard Mode |
|-------|----------------------|-------------|-----------|
| **Bronze Bot** | 2,000 - 3,500 | 3,500 - 5,000 | 5,500 - 7,000 |
| **Silver Bot** | 3,500 - 5,000 | 5,000 - 6,500 | 7,000 - 8,500 |
| **Gold Bot** | 5,000 - 7,000 | 6,500 - 8,500 | 8,500 - 11,000 |

The AI scores are randomized within their ranges each round, so placement isn't always the same even with identical player performance. This adds replayability and tension.

**Placement Results:**

| Placement | Condition | Celebration |
|-----------|-----------|-------------|
| **1st Place (Gold)** | Beat all 3 rivals | Character does a victory flex pose, confetti, trophy held overhead |
| **2nd Place (Silver)** | Beat 2 rivals | Character flexes with a smile, silver medal |
| **3rd Place (Bronze)** | Beat 1 rival | Character gives a thumbs up, modest celebration |
| **No Podium** | Beat 0 rivals | Character hangs head, comical "sad trombone" |

### 3.3 The Three Rivals

Each rival is a distinct pixel-art character with personality:

#### "Iron" Ivan Petrov
- **Appearance:** Massive, barrel-chested, buzz cut, red tank top, intimidating scowl
- **Personality:** The reigning champ. Stone-faced, all business. His pre-round taunt: *"You think typing makes muscle? I EAT keyboards for breakfast."*
- **Score tier:** Gold Bot (hardest to beat)
- **Signature pose:** Double bicep flex

#### Flex McQueen
- **Appearance:** Lean and shredded, blonde surfer hair, blue shorts, permanent grin, spray tan
- **Personality:** The flashy showman. Always posing. His pre-round taunt: *"Looking good is half the battle, bro. The other half? Also looking good."*
- **Score tier:** Silver Bot (medium difficulty)
- **Signature pose:** Side chest with a wink

#### Tony "The Tank" Deluca
- **Appearance:** Stocky, hairy, old-school aesthetic, green headband, gold chain
- **Personality:** The lovable underdog veteran. His pre-round taunt: *"Thirty years in the gym, kid. My fingers ain't fast but my heart's in it."*
- **Score tier:** Bronze Bot (easiest to beat)
- **Signature pose:** Most muscular (crab pose)

---

## 4. Game Modes

### 4.1 Quick Pump (Single Round)

- One 60-second typing round
- Immediate competition and placement
- Great for quick sessions and practice

### 4.2 Tournament Mode (Career)

A **5-round tournament** with escalating difficulty:

| Round | Theme | Sentence Difficulty | Timer |
|-------|-------|-------------------|-------|
| **Round 1: Local Gym Contest** | Simple words and short phrases | 60 sec |
| **Round 2: Regional Championship** | Full sentences, common words | 60 sec |
| **Round 3: State Finals** | Longer sentences, varied vocabulary | 60 sec |
| **Round 4: National Qualifier** | Complex sentences, uncommon words | 60 sec |
| **Round 5: Mr. Type Universe** | Long passages, technical/challenging words | 75 sec |

- AI rival scores increase each round
- Between rounds: short narrative scenes (pixel art cutscenes of training montages, traveling to venues)
- Must place **3rd or better** to advance to the next round
- Winning the final round triggers a **champion ending sequence**

### 4.3 Endless Reps

- No timer — type until you make 3 cumulative errors without correcting them (3 strikes)
- Focus on maintaining a streak
- Leaderboard tracks: total reps, longest streak, highest WPM sustained

---

## 5. Sentence / Text Content

### 5.1 Sentence Categories

Sentences are drawn from themed pools to keep the experience fun and on-brand:

- **Gym Motivation:** *"Pain is temporary, gains are forever."*
- **Bodybuilding Facts:** *"Arnold Schwarzenegger won seven Mr. Olympia titles."*
- **Exercise Instructions:** *"Keep your elbows close to your body during curls."*
- **Nutrition Tips:** *"A balanced diet includes protein, carbs, and healthy fats."*
- **Trash Talk:** *"Flex McQueen thinks he is better than you. Prove him wrong."*
- **General Sentences:** Standard typing test content for variety

### 5.2 Difficulty Scaling

| Difficulty | Avg. Word Length | Words Per Sentence | Special Characters |
|------------|-----------------|-------------------|-------------------|
| Easy | 3-5 letters | 4-7 words | None |
| Medium | 4-7 letters | 6-12 words | Commas, periods |
| Hard | 5-9 letters | 10-18 words | Commas, periods, quotes, numbers |
| Elite | 6-10+ letters | 15-25 words | Full punctuation, numbers, capitals |

---

## 6. Visual Design

### 6.1 Art Style

- **Resolution target:** 256x240 base resolution (NES native), scaled up to fill modern displays with pixel-perfect rendering
- **Color palette:** Limited palette per sprite (NES had 4 colors per sprite palette). Use a warm gym palette: browns, oranges, golds, with bright accents
- **Character sprites:** 32x48 pixels for characters (slightly taller than standard NES sprites to show muscle definition)
- **Animation:** Hand-pixeled frame-by-frame animation, 4-8 frames per action

### 6.2 Screen Layout

```
┌──────────────────────────────────────────────────┐
│  ROUND 2 - REGIONAL CHAMPIONSHIP    TIME: 0:42   │
│                                                    │
│  ┌──────────────────────────────────────────────┐ │
│  │  "Champions are made in the gym, not on      │ │
│  │   the stage where they are recognized."      │ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
│              ╔══════════════╗                       │
│              ║              ║                       │
│              ║  [BODYBUILDER ║                      │
│              ║   SPRITE     ]║                      │
│              ║   DOING CURLS ║                      │
│              ║              ║                       │
│              ╚══════════════╝                       │
│                                                    │
│  REPS: 24    WPM: 58    ACCURACY: 94%   ⭐ x3    │
│                                                    │
│  ┌──────────────────────────────────────────────┐ │
│  │ > Champions are made in the g|               │ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
│  ║████████████████████░░░░░░░░║  STREAK: 47 chars │
└──────────────────────────────────────────────────┘
```

**Key UI Elements:**
- **Top bar:** Round name, timer countdown
- **Sentence display:** The target text, with color-coded typed progress
- **Center stage:** The bodybuilder character performing curls
- **Stats bar:** Live rep count, WPM, accuracy, star rating
- **Input area:** Where the player's typing appears with a blinking cursor
- **Streak meter:** Visual bar showing current error-free streak

### 6.3 Competition Stage Screen

```
┌──────────────────────────────────────────────────┐
│          ★ REGIONAL CHAMPIONSHIP ★                │
│                                                    │
│     🏆  BODYBUILDING  SHOWDOWN  🏆                │
│                                                    │
│         ┌───┐ ┌───┐ ┌───┐ ┌───┐                  │
│         │ I │ │YOU│ │ F │ │ T │                   │
│         │ V │ │   │ │ L │ │ O │                   │
│         │ A │ │   │ │ E │ │ N │                   │
│         │ N │ │   │ │ X │ │ Y │                   │
│         └─┬─┘ └─┬─┘ └─┬─┘ └─┬─┘                  │
│           │     │     │     │                      │
│     ════════════════════════════════               │
│              ★ STAGE ★                             │
│                                                    │
│   ┌─────────────────────────────────────┐         │
│   │  JUDGE 1    JUDGE 2    JUDGE 3      │         │
│   └─────────────────────────────────────┘         │
│                                                    │
│     IVAN: 6,240   YOU: 5,970                      │
│     FLEX: 4,800   TONY: 3,120                     │
│                                                    │
│            ★★ 2ND PLACE! ★★                       │
└──────────────────────────────────────────────────┘
```

### 6.4 Podium Screen

After scores are revealed, the scene transitions to a **podium view**:

```
        ┌─────┐
        │ 1ST │   ← "Iron" Ivan (or YOU if you won)
   ┌────┤     ├────┐
   │2ND │     │ 3RD│
   │    │     │    │
   └────┴─────┴────┘
```

- Characters stand on their respective podium blocks
- Winner does their signature victory pose
- If the player wins 1st: confetti particles rain down, crowd cheers (SFX)
- If the player doesn't podium: the three winners celebrate while you watch from the side

---

## 7. Audio Design

### 7.1 Music

All music in **chiptune / 8-bit style** to match the visual aesthetic:

| Context | Mood | Tempo |
|---------|------|-------|
| **Main Menu** | Upbeat, motivational, gym energy | Medium |
| **Typing Round** | Driving, rhythmic, builds tension as timer runs low | Fast, accelerates near end |
| **Competition Reveal** | Dramatic, suspenseful, drum rolls | Slow build |
| **Victory (1st)** | Triumphant fanfare, celebration | Fast, triumphant |
| **Victory (2nd/3rd)** | Positive but subdued | Medium |
| **No Podium** | Comical sad trombone, then motivational "try again" | Slow then picks up |
| **Tournament Cutscenes** | 80s training montage vibes | Medium-fast |

### 7.2 Sound Effects

- **Keypress (correct):** Subtle click/pop — satisfying but not annoying at high speed
- **Keypress (error):** Short buzz/wrong note
- **Rep completed:** Metallic "clank" of the weight + grunt
- **Streak milestone (every 25 chars):** Rising chime
- **Timer warning (10 sec):** Heartbeat pulse, screen border flashes
- **Crowd cheering:** During competition reveals, reacts to scores
- **Character grunts:** Short 8-bit voice samples during intense lifting

---

## 8. Progression & Rewards

### 8.1 Player Profile

- Tracks **career stats:** total reps, best WPM, best accuracy, tournaments won
- **Title system** based on lifetime achievements:

| Title | Requirement |
|-------|-------------|
| Newbie Lifter | Complete first round |
| Gym Regular | Complete 10 rounds |
| Rep Machine | Reach 500 lifetime reps |
| Speed Demon | Hit 80+ WPM in a round |
| Perfectionist | Complete a round with 100% accuracy |
| Local Champ | Win a Quick Pump on Easy |
| National Hero | Beat Tournament Mode on Medium |
| Mr. Type Universe | Beat Tournament Mode on Hard |
| GOAT | Beat Tournament Mode on Hard with all 1st place finishes |

### 8.2 Character Customization

Unlock cosmetic items by earning titles:

- **Headbands:** Different colors (red, blue, gold, stars-and-stripes)
- **Tank top colors/patterns:** Plain, striped, "Type Builder" logo
- **Shorts/pants styles:** Classic posing trunks, workout shorts, sweatpants
- **Accessories:** Gold chain, wristbands, sunglasses
- **Dumbbell skins:** Standard, gold, flaming, crystal

---

## 9. Technical Specifications

### 9.1 Target Platform

- **Desktop:** Windows 10+, macOS 12+, Linux (major distros)
- **Engine options:** Godot (ideal for pixel art, lightweight, cross-platform), or a web-based approach with Electron/Tauri + HTML5 Canvas/PixiJS
- **Screen resolution:** 256x240 base rendered to window, with integer scaling options (2x, 3x, 4x, fullscreen)
- **Performance target:** 60 FPS constant (this is a typing game, not GPU-intensive)

### 9.2 Input

- **Keyboard only** — no mouse needed during gameplay
- Support for all standard keyboard layouts (QWERTY default, with AZERTY/Dvorak options)
- Input latency must be imperceptible (< 16ms from keypress to visual feedback)
- Menu navigation via arrow keys + Enter, or mouse

### 9.3 Data

- Sentence database stored as local JSON/text files, categorized by difficulty and theme
- Player stats and unlocks saved locally (JSON or SQLite)
- No online requirement — fully offline single-player experience
- Optional: future online leaderboard via simple REST API

---

## 10. Scope & Milestones

### Phase 1: Prototype (Core Loop)
- Basic typing input with WPM/accuracy tracking
- Single bodybuilder sprite with curl animation (4 frames)
- One round of gameplay (60 seconds)
- Score calculation
- Static results screen showing placement vs. 3 hardcoded rival scores

### Phase 2: Game Feel
- Full animation system with speed-reactive curling
- Sound effects and background music (1 track)
- Visual feedback (streak effects, error flash, timer warning)
- Polished UI layout

### Phase 3: Full Content
- All 3 rival characters with sprites and personality
- Tournament mode (5 rounds with cutscenes)
- Competition stage and podium scenes
- Multiple sentence categories and difficulty scaling
- All 3 difficulty modes

### Phase 4: Polish & Release
- Character customization and unlocks
- Endless Reps mode
- Full soundtrack (all tracks)
- Settings menu (difficulty, keyboard layout, display scaling)
- Packaging and distribution (installers for each platform)

### Stretch Goals
- Online leaderboards
- Daily challenge mode (same sentences for all players, compare globally)
- Additional exercises as unlockable alternate animations (squat, bench press)
- Multiplayer (local split-screen or online)

---

## 11. Unique Selling Points

1. **Novel theme:** No typing game has combined typing with bodybuilding — this is a first
2. **Physical comedy:** The absurdity of an 8-bit muscleman doing reps powered by typing is inherently funny and shareable
3. **Accessible competition:** The AI rivals create a tournament feel without requiring online multiplayer infrastructure
4. **Retro charm:** NES-era pixel art and chiptune audio hit the nostalgia factor while keeping art scope manageable
5. **Genuine skill game:** Typing speed is a real, improvable skill — players get better at the game AND better at typing
6. **Short sessions:** 60-second rounds make it perfect for quick breaks

---

## 12. Name Rationale

**"Type Builder"** works on two levels:
- **Type** = typing (the core mechanic)
- **Builder** = bodybuilder (the theme)

It's short, memorable, immediately communicates the concept, and is easy to search for.
