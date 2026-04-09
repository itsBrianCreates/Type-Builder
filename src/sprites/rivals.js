/**
 * Rival character sprites - 3 AI opponents
 * Each is 32x48 pixels with idle, signature flex, and celebration poses
 * NES-authentic color palette
 */

// --- Shared palette ---
const _ = null;       // transparent
const O = '#181818'; // outline / black
const E = '#FFFFFF'; // eye white
const EP = '#181818'; // eye pupil

// --- Skin tones ---
const S1 = '#F0B088'; // Ivan: light caucasian
const S1D = '#C07050';
const S2 = '#E8A060'; // Flex: spray tan / golden
const S2D = '#C08040';
const S3 = '#D09868'; // Tony: olive/darker
const S3D = '#A07048';

// --- Ivan palette ---
const IR = '#E82020'; // red tank top
const IRD = '#B01818'; // red dark
const IH = '#B0A890'; // buzz cut (light grey-brown)
const IP = '#181858'; // dark trunks
const IPD = '#101040';

// --- Flex palette ---
const FH = '#F8E830'; // blonde hair
const FHD = '#C8B820'; // blonde dark
const FB = '#2878D8'; // blue shorts
const FBD = '#1850A0'; // blue dark
const FS = '#E8A060'; // flex skin

// --- Tony palette ---
const TG = '#28A828'; // green headband
const TGD = '#188818'; // green dark
const TC = '#F8D878'; // gold chain
const TP = '#483018'; // dark brown trunks
const TPD = '#301808';
const TH = '#383838'; // dark hair

// --- Shared ---
const SH = '#D08060'; // shoe
const SHD = '#905838';
const M = '#E82020'; // mouth
const BK = '#F8D878'; // belt buckle / gold

/** Pad/center row to 32 wide */
function r(...pixels) {
    const row = new Array(32).fill(_);
    const offset = Math.floor((32 - pixels.length) / 2);
    for (let i = 0; i < pixels.length; i++) {
        if (offset + i >= 0 && offset + i < 32) row[offset + i] = pixels[i];
    }
    return row;
}
/** Row from left edge */
function rL(...pixels) {
    const row = new Array(32).fill(_);
    for (let i = 0; i < pixels.length && i < 32; i++) row[i] = pixels[i];
    return row;
}
function empty() { return new Array(32).fill(_); }

// ============================================================
// "IRON" IVAN PETROV
// Massive, barrel-chested, buzz cut, RED tank top
// Score tier: Gold Bot (hardest)
// ============================================================

export const IVAN_IDLE = [
    // Row 0-3: Buzz cut head (wide)
    r(O,O,O,O,O,O,O,O,O,O,O,O,O,O),                                 // 0
    r(O,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,O),               // 1
    r(O,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,O),            // 2
    r(O,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,O),            // 3
    // Row 4-6: Face (scowl)
    r(O,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,O),               // 4
    r(O,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,O),               // 5
    r(O,S1,O,EP,S1,S1,S1,S1,S1,S1,S1,EP,O,S1,O),                     // 6
    // Row 7-9: Nose, scowling mouth
    r(O,S1,S1,S1,S1,S1D,S1D,S1D,S1,S1,S1,S1,S1,S1,O),               // 7
    r(O,S1,S1,S1,O,M,M,M,O,S1,S1,S1,S1,S1,O),                       // 8
    r(O,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,O),                      // 9
    // Row 10-11: Thick neck
    r(O,S1,S1,S1,S1,S1D,S1,S1,S1,S1,O),                              // 10
    r(O,S1,S1,S1D,S1D,S1D,S1D,S1,S1,O),                              // 11
    // Row 12-15: Wide shoulders (massive)
    r(O,O,S1,S1,S1,O,IR,IR,IR,IR,IR,IR,IR,IR,O,S1,S1,S1,O,O),       // 12
    r(O,S1,S1,S1,S1,O,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,O,S1,S1,S1,S1,O), // 13
    r(O,S1,S1,S1,S1,O,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,O,S1,S1,S1,S1,S1,O), // 14
    r(O,S1,S1D,S1,S1,O,IR,IR,IRD,IR,IR,IR,IR,IRD,IR,IR,O,S1,S1,S1D,S1,S1,O), // 15
    // Row 16-19: Barrel chest
    r(O,S1,S1,S1,O,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,O,S1,S1,S1,O), // 16
    r(O,S1,S1D,S1,O,IR,IR,IRD,IR,IR,IR,IR,IR,IRD,IR,IR,O,S1,S1D,S1,O), // 17
    r(O,S1,S1,O,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,O,S1,S1,O),      // 18
    r(O,S1,S1,O,IR,IR,IRD,IR,IR,IR,IR,IR,IRD,IR,IR,IR,O,S1,S1,O),    // 19
    // Row 20-22: Lower torso
    r(O,S1,O,O,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,O,O,S1,O),        // 20
    r(O,S1D,O,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,O,S1D,O),    // 21
    r(O,O,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,O,O),            // 22
    // Row 23-24: Belt
    r(O,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,O),                 // 23
    r(O,O,O,O,O,BK,BK,O,O,BK,BK,O,O,O,O,O),                         // 24
    // Row 25-29: Trunks and legs
    r(O,IP,IP,IP,IP,IP,IP,IP,IP,IP,IP,IP,IP,IP,IP,O),                 // 25
    r(O,IP,IP,IP,IP,IP,IP,IP,IP,IP,IP,IP,IP,IP,IP,O),                 // 26
    r(O,IP,IP,IPD,IP,IP,IP,O,O,IP,IP,IP,IPD,IP,IP,O),                // 27
    r(O,IP,IP,IP,IP,IP,O,_,_,O,IP,IP,IP,IP,IP,O),                    // 28
    r(O,IP,IP,IPD,IP,O,_,_,_,_,O,IP,IPD,IP,IP,O),                    // 29
    // Row 30-37: Legs
    r(O,S1,S1,S1,S1,O,_,_,_,_,_,O,S1,S1,S1,S1,O),                   // 30
    r(O,S1,S1D,S1,S1,O,_,_,_,_,_,O,S1,S1,S1D,S1,O),                 // 31
    r(O,S1,S1,S1,S1,O,_,_,_,_,_,O,S1,S1,S1,S1,O),                   // 32
    r(O,S1,S1,S1D,S1,O,_,_,_,_,_,O,S1,S1D,S1,S1,O),                 // 33
    r(O,S1,S1,S1,S1,O,_,_,_,_,_,O,S1,S1,S1,S1,O),                   // 34
    r(O,S1,S1,S1,S1,O,_,_,_,_,_,O,S1,S1,S1,S1,O),                   // 35
    r(O,S1,S1,S1,O,_,_,_,_,_,_,_,O,S1,S1,S1,O),                     // 36
    r(O,S1,S1,S1,O,_,_,_,_,_,_,_,O,S1,S1,S1,O),                     // 37
    // Row 38-44: Ankles and shoes
    r(O,O,S1,S1,S1,O,_,_,_,_,_,O,S1,S1,S1,O,O),                     // 38
    r(O,SH,O,O,O,O,_,_,_,_,_,O,O,O,O,SH,O),                         // 39
    r(O,SH,SH,SH,SH,O,_,_,_,_,_,O,SH,SH,SH,SH,O),                  // 40
    r(O,SH,SH,SH,SH,SH,O,_,_,_,O,SH,SH,SH,SH,SH,O),               // 41
    r(O,SHD,SH,SH,SH,SHD,O,_,_,_,O,SHD,SH,SH,SH,SHD,O),           // 42
    r(O,O,O,O,O,O,O,_,_,_,O,O,O,O,O,O,O),                           // 43
    empty(), // 44
    empty(), // 45
    empty(), // 46
    empty(), // 47
];

// ============================================================
// IVAN PRESS FRAMES (arms only change, body stays same as idle)
// ============================================================

// Ivan PRESS_LOW: Arms bent, hands at shoulder height (rack position)
export const IVAN_PRESS_LOW = [
    // Row 0-9: Head (same as idle)
    r(O,O,O,O,O,O,O,O,O,O,O,O,O,O),                                 // 0
    r(O,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,O),               // 1
    r(O,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,O),            // 2
    r(O,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,O),            // 3
    r(O,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,O),               // 4
    r(O,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,O),               // 5
    r(O,S1,O,EP,S1,S1,S1,S1,S1,S1,S1,EP,O,S1,O),                     // 6
    r(O,S1,S1,S1,S1,S1D,S1D,S1D,S1,S1,S1,S1,S1,S1,O),               // 7
    r(O,S1,S1,S1,O,M,M,M,O,S1,S1,S1,S1,S1,O),                       // 8
    r(O,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,O),                      // 9
    // Row 10: Neck with hands at shoulder height
    rL(_,_,_,_,_,_,_,_,_,_,S1,S1,S1,S1,S1,S1,S1,S1,_,_,_,_,_,_,_,_,_,_,_,_,_,_), // 10
    // Row 11: Arms bent, hands gripping at shoulder level
    rL(_,_,_,_,_,_,_,S1,S1,O,S1,S1D,S1,O,IR,IR,IR,IR,O,S1,S1D,S1,O,S1,S1,_,_,_,_,_,_,_), // 11
    // Row 12-15: Shoulders with arms bent up
    rL(_,_,_,_,_,_,_,S1,S1,O,S1,S1,S1,O,IR,IR,IR,IR,O,S1,S1,S1,O,S1,S1,_,_,_,_,_,_,_),   // 12
    rL(_,_,_,_,_,_,O,S1,S1D,O,S1,S1,O,IR,IR,IR,IR,IR,IR,O,S1,S1,O,S1D,S1,O,_,_,_,_,_,_), // 13
    rL(_,_,_,_,_,_,_,O,O,O,S1,S1,O,IR,IR,IR,IR,IR,IR,O,S1,S1,O,O,O,_,_,_,_,_,_,_),       // 14
    r(O,IR,IR,IRD,IR,IR,IR,IR,IR,IR,IR,IR,IRD,IR,IR,O),               // 15
    // Row 16-19: Barrel chest
    r(O,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,O),                 // 16
    r(O,IR,IR,IRD,IR,IR,IR,IR,IR,IR,IR,IRD,IR,IR,IR,O),               // 17
    r(O,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,O),                 // 18
    r(O,IR,IR,IRD,IR,IR,IR,IR,IR,IR,IR,IRD,IR,IR,IR,O),               // 19
    ...IVAN_IDLE.slice(20),
];

// Ivan PRESS_MID: Arms pushing up, hands at forehead/head level
export const IVAN_PRESS_MID = [
    // Row 0-6: Head (same as idle)
    r(O,O,O,O,O,O,O,O,O,O,O,O,O,O),                                 // 0
    r(O,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,O),               // 1
    r(O,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,O),            // 2
    r(O,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,O),            // 3
    r(O,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,O),               // 4
    r(O,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,O),               // 5
    r(O,S1,O,EP,S1,S1,S1,S1,S1,S1,S1,EP,O,S1,O),                     // 6
    // Row 7: Hands at forehead level
    rL(_,_,_,_,_,_,S1,S1,_,_,_,_,_,_,_,_,_,_,_,_,_,_,S1,S1,_,_,_,_,_,_,_,_), // 7
    // Row 8: Hands gripping position
    rL(_,_,_,_,_,_,S1,S1,O,S1,S1,S1,O,M,M,M,O,S1,S1,S1,O,S1,S1,_,_,_,_,_,_,_,_,_), // 8
    // Row 9: Arms extending upward
    rL(_,_,_,_,_,_,S1,S1D,O,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,O,S1D,S1,_,_,_,_,_,_,_,_,_,_), // 9
    // Row 10-11: Upper arms, neck visible
    rL(_,_,_,_,_,_,O,S1,O,S1,S1,S1,S1,S1D,S1,S1,S1,S1,O,S1,O,_,_,_,_,_,_,_,_,_,_,_), // 10
    rL(_,_,_,_,_,_,_,O,O,S1,S1,S1D,S1D,S1D,S1D,S1,S1,O,O,_,_,_,_,_,_,_,_,_,_,_,_,_), // 11
    // Row 12-14: Shoulders merge into torso
    rL(_,_,_,_,_,_,_,_,O,S1,S1,O,IR,IR,IR,IR,IR,IR,O,S1,S1,O,_,_,_,_,_,_,_,_,_,_),   // 12
    rL(_,_,_,_,_,_,_,_,_,O,O,O,IR,IR,IR,IR,IR,IR,O,O,O,_,_,_,_,_,_,_,_,_,_,_),       // 13
    r(O,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,O),                 // 14
    // Row 15-19: Torso
    r(O,IR,IR,IRD,IR,IR,IR,IR,IR,IR,IR,IR,IRD,IR,IR,O),               // 15
    r(O,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,O),                 // 16
    r(O,IR,IR,IRD,IR,IR,IR,IR,IR,IR,IR,IRD,IR,IR,IR,O),               // 17
    r(O,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,O),                 // 18
    r(O,IR,IR,IRD,IR,IR,IR,IR,IR,IR,IR,IRD,IR,IR,IR,O),               // 19
    ...IVAN_IDLE.slice(20),
];

// Ivan PRESS_HIGH: Arms nearly straight overhead
export const IVAN_PRESS_HIGH = [
    // Row 0-2: Arms above head
    rL(_,_,_,_,_,_,S1,S1,_,_,_,_,_,_,_,_,_,_,_,_,_,_,S1,S1,_,_,_,_,_,_,_,_), // 0
    // Row 1: Hands gripping position
    rL(_,_,_,_,_,_,S1,S1,O,_,_,_,_,_,_,_,_,_,_,_,_,O,S1,S1,_,_,_,_,_,_,_,_), // 1
    // Row 2: Arms nearly straight
    rL(_,_,_,_,_,_,S1,S1D,O,_,_,_,_,_,_,_,_,_,_,_,_,O,S1D,S1,_,_,_,_,_,_,_,_), // 2
    // Row 3: Top of head with arms on sides
    rL(_,_,_,_,_,O,S1,O,O,O,O,O,O,O,O,O,O,O,O,O,S1,O,_,_,_,_,_,_,_,_,_,_), // 3
    // Row 4: Hair
    rL(_,_,_,_,_,_,O,O,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,O,_,_,_,_,_,_,_,_,_,_,_), // 4
    r(O,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,O),               // 5
    // Row 6-8: Face
    r(O,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,O),               // 6
    r(O,S1,O,EP,S1,S1,S1,S1,S1,S1,S1,EP,O,S1,O),                     // 7
    r(O,S1,S1,S1,S1,S1D,S1D,S1D,S1,S1,S1,S1,S1,S1,O),               // 8
    // Row 9: Mouth, chin
    r(O,S1,S1,S1,O,M,M,M,O,S1,S1,S1,S1,S1,O),                       // 9
    r(O,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,O),                      // 10
    // Row 11: Neck
    r(O,S1,S1,S1D,S1D,S1D,S1D,S1,S1,O),                              // 11
    // Row 12-14: Shoulders/torso
    r(O,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,O),                 // 12
    r(O,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,O),                 // 13
    r(O,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,O),                 // 14
    r(O,IR,IR,IRD,IR,IR,IR,IR,IR,IR,IR,IR,IRD,IR,IR,O),               // 15
    r(O,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,O),                 // 16
    r(O,IR,IR,IRD,IR,IR,IR,IR,IR,IR,IR,IRD,IR,IR,IR,O),               // 17
    r(O,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,O),                 // 18
    r(O,IR,IR,IRD,IR,IR,IR,IR,IR,IR,IR,IRD,IR,IR,IR,O),               // 19
    ...IVAN_IDLE.slice(20),
];

// Ivan PRESS_TOP: Full lockout, arms straight up
export const IVAN_PRESS_TOP = [
    // Row 0: Arms fully extended overhead
    rL(_,_,_,_,_,S1,S1,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,S1,S1,_,_,_,_,_,_,_), // 0
    // Row 1: Hands gripping position
    rL(_,_,_,_,_,S1,S1,O,_,_,_,_,_,_,_,_,_,_,_,_,_,_,O,S1,S1,_,_,_,_,_,_,_), // 1
    // Row 2-3: Arms fully extended
    rL(_,_,_,_,_,S1,S1D,O,_,_,_,_,_,_,_,_,_,_,_,_,_,_,O,S1D,S1,_,_,_,_,_,_,_), // 2
    rL(_,_,_,_,O,S1,S1,O,_,_,_,_,_,_,_,_,_,_,_,_,_,_,O,S1,S1,O,_,_,_,_,_,_), // 3
    // Row 4: Top of head / hair between arms
    rL(_,_,_,_,O,S1,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,S1,O,_,_,_,_,_,_,_), // 4
    rL(_,_,_,_,_,O,O,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,O,O,_,_,_,_,_,_,_,_,_), // 5
    r(O,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,O),               // 6
    // Row 7-9: Face
    r(O,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,O),               // 7
    r(O,S1,O,EP,S1,S1,S1,S1,S1,S1,S1,EP,O,S1,O),                     // 8
    r(O,S1,S1,S1,S1,S1D,S1D,S1D,S1,S1,S1,S1,S1,S1,O),               // 9
    r(O,S1,S1,S1,O,M,M,M,O,S1,S1,S1,S1,S1,O),                       // 10
    r(O,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,O),                      // 11
    // Row 12: Neck
    r(O,S1,S1,S1D,S1D,S1D,S1D,S1,S1,O),                              // 12
    // Row 13-19: Torso
    r(O,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,O),                 // 13
    r(O,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,O),                 // 14
    r(O,IR,IR,IRD,IR,IR,IR,IR,IR,IR,IR,IR,IRD,IR,IR,O),               // 15
    r(O,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,O),                 // 16
    r(O,IR,IR,IRD,IR,IR,IR,IR,IR,IR,IR,IRD,IR,IR,IR,O),               // 17
    r(O,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,O),                 // 18
    r(O,IR,IR,IRD,IR,IR,IR,IR,IR,IR,IR,IRD,IR,IR,IR,O),               // 19
    ...IVAN_IDLE.slice(20),
];

// Ivan: Double bicep flex (signature pose)
export const IVAN_FLEX = [
    r(O,O,O,O,O,O,O,O,O,O,O,O,O,O),                                  // 0
    r(O,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,O),                // 1
    r(O,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,O),             // 2
    r(O,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,O),             // 3
    r(O,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,O),                // 4
    r(O,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,O),                // 5
    r(O,S1,O,EP,S1,S1,S1,S1,S1,S1,S1,EP,O,S1,O),                      // 6
    r(O,S1,S1,S1,S1,S1D,S1D,S1D,S1,S1,S1,S1,S1,S1,O),                // 7
    r(O,S1,S1,S1,O,M,M,M,O,S1,S1,S1,S1,S1,O),                        // 8
    r(O,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,O),                       // 9
    r(O,S1,S1,S1,S1,S1D,S1,S1,S1,S1,O),                               // 10
    r(O,S1,S1,S1D,S1D,S1D,S1D,S1,S1,O),                               // 11
    // Arms raised in double bicep
    rL(_,O,S1,S1,O,_,O,S1,S1,S1,S1,O,IR,IR,IR,IR,IR,IR,IR,IR,O,S1,S1,S1,S1,O,_,O,S1,S1,O,_), // 12
    rL(_,O,S1D,O,_,O,S1,S1D,S1,S1,O,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,O,S1,S1,S1D,S1,O,_,O,S1D,O,_), // 13
    rL(_,O,S1,O,O,S1,S1,S1,S1,S1,O,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,O,S1,S1,S1,S1,S1,O,O,S1,O,_), // 14
    rL(_,_,O,O,S1,S1,S1D,O,_,O,IR,IR,IRD,IR,IR,IR,IR,IRD,IR,IR,O,_,O,S1D,S1,S1,O,O,_,_,_,_), // 15
    // Torso
    r(O,O,_,O,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,O,_,O,O),           // 16
    r(O,IR,IR,IR,IRD,IR,IR,IR,IR,IR,IR,IRD,IR,IR,IR,O),                // 17
    r(O,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,O),                  // 18
    r(O,IR,IR,IR,IRD,IR,IR,IR,IR,IR,IR,IRD,IR,IR,IR,O),                // 19
    r(O,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,O),                  // 20
    r(O,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,O),                  // 21
    r(O,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,O),                  // 22
    r(O,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,IR,O),                  // 23
    r(O,O,O,O,O,BK,BK,O,O,BK,BK,O,O,O,O,O),                          // 24
    ...IVAN_IDLE.slice(25),
];

// Ivan: Celebration (same as flex with open mouth)
export const IVAN_CELEBRATION = [
    r(O,O,O,O,O,O,O,O,O,O,O,O,O,O),                                   // 0
    r(O,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,O),                 // 1
    r(O,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,O),              // 2
    r(O,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,IH,O),              // 3
    r(O,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,O),                 // 4
    r(O,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,S1,O),                 // 5
    r(O,S1,E,EP,S1,S1,S1,S1,S1,S1,S1,EP,E,S1,O),                       // 6
    r(O,S1,S1,S1,S1,S1D,S1D,S1D,S1,S1,S1,S1,S1,S1,O),                 // 7
    r(O,S1,S1,S1,M,M,E,E,M,M,S1,S1,S1,S1,O),                          // 8
    r(O,S1,S1,S1,S1,M,M,S1,S1,S1,S1,S1,S1,O),                          // 9
    r(O,S1,S1,S1,S1,S1D,S1,S1,S1,S1,O),                                // 10
    r(O,S1,S1,S1D,S1D,S1D,S1D,S1,S1,O),                                // 11
    ...IVAN_FLEX.slice(12),
];

// ============================================================
// FLEX McQUEEN
// Lean/shredded, blonde hair, BLUE shorts, spray tan
// Score tier: Silver Bot (medium)
// ============================================================

export const FLEX_IDLE = [
    // Row 0-3: Blonde surfer hair (taller/spiky)
    r(O,O,O,O,O,O,O,O,O,O,O,O),                                       // 0
    r(O,FH,FH,FH,FH,FH,FH,FH,FH,FH,FH,FH,O),                        // 1
    r(O,FH,FH,FH,FHD,FH,FH,FH,FHD,FH,FH,FH,FH,O),                   // 2
    r(O,FH,FH,FH,FH,FH,FH,FH,FH,FH,FH,FH,FH,O),                     // 3
    // Row 4-6: Face (permanent grin)
    r(O,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,O),                       // 4
    r(O,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,O),                       // 5
    r(O,S2,E,EP,S2,S2,S2,S2,S2,EP,E,S2,O),                             // 6
    // Row 7-9: Nose, grin
    r(O,S2,S2,S2,S2,S2D,S2D,S2,S2,S2,S2,S2,O),                        // 7
    r(O,S2,S2,M,M,E,E,M,M,S2,S2,S2,O),                                 // 8
    r(O,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,O),                              // 9
    // Row 10-11: Lean neck
    r(O,S2,S2,S2,S2,S2,S2,O),                                           // 10
    r(O,S2,S2,S2D,S2D,S2,O),                                            // 11
    // Row 12-15: Lean shoulders (no shirt - shirtless flex bro)
    r(O,O,S2,S2,O,S2,S2,S2,S2,S2,S2,S2,S2,O,S2,S2,O,O),               // 12
    r(O,S2,S2,S2,O,S2,S2,S2,S2,S2,S2,S2,S2,S2,O,S2,S2,S2,O),          // 13
    r(O,S2,S2,S2,O,S2,S2D,S2,S2,S2,S2,S2D,S2,S2,O,S2,S2,S2,O),        // 14
    r(O,S2,S2D,S2,O,S2,S2,S2,S2,S2,S2,S2,S2,S2,O,S2,S2D,S2,O),        // 15
    // Row 16-19: Lean torso (shredded, visible abs with shading)
    r(O,S2,S2,O,S2,S2,S2,S2D,S2,S2,S2D,S2,S2,S2,O,S2,S2,O),           // 16
    r(O,S2,S2D,O,S2,S2,S2D,S2,S2,S2,S2,S2D,S2,S2,O,S2D,S2,O),         // 17
    r(O,S2,O,S2,S2D,S2,S2,S2D,S2,S2D,S2,S2,S2D,S2,O,S2,O),            // 18
    r(O,S2,O,S2,S2,S2D,S2,S2,S2,S2,S2D,S2,S2,S2,O,S2,O),              // 19
    // Row 20-22: Lower torso
    r(O,S2,O,S2,S2,S2,S2D,S2,S2,S2D,S2,S2,S2,O,S2,O),                 // 20
    r(O,S2D,O,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,O,S2D,O),                 // 21
    r(O,O,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,O,O),                   // 22
    // Row 23-24: Belt
    r(O,O,O,O,O,BK,BK,O,O,BK,BK,O,O,O,O,O),                           // 23
    r(O,FB,FB,FB,FB,FB,FB,FB,FB,FB,FB,FB,FB,FB,FB,O),                   // 24
    // Row 25-29: Blue shorts
    r(O,FB,FB,FB,FB,FB,FB,FB,FB,FB,FB,FB,FB,FB,O),                      // 25
    r(O,FB,FB,FBD,FB,FB,FB,O,O,FB,FB,FBD,FB,FB,O),                     // 26
    r(O,FB,FB,FB,FB,FB,O,_,_,O,FB,FB,FB,FB,O),                          // 27
    r(O,FB,FB,FBD,FB,O,_,_,_,_,O,FB,FBD,FB,O),                         // 28
    r(O,FB,FB,FB,O,_,_,_,_,_,_,O,FB,FB,O),                              // 29
    // Row 30-37: Lean legs
    r(O,S2,S2,S2,O,_,_,_,_,_,_,O,S2,S2,S2,O),                          // 30
    r(O,S2,S2D,S2,O,_,_,_,_,_,_,O,S2,S2D,S2,O),                        // 31
    r(O,S2,S2,S2,O,_,_,_,_,_,_,O,S2,S2,S2,O),                          // 32
    r(O,S2,S2,S2,O,_,_,_,_,_,_,O,S2,S2,S2,O),                          // 33
    r(O,S2,S2D,S2,O,_,_,_,_,_,_,O,S2,S2D,S2,O),                        // 34
    r(O,S2,S2,S2,O,_,_,_,_,_,_,O,S2,S2,S2,O),                          // 35
    r(O,S2,S2,O,_,_,_,_,_,_,_,_,O,S2,S2,O),                             // 36
    r(O,S2,S2,O,_,_,_,_,_,_,_,_,O,S2,S2,O),                             // 37
    // Row 38-44: Shoes
    r(O,O,S2,S2,O,_,_,_,_,_,_,O,S2,S2,O,O),                            // 38
    r(O,SH,O,O,O,_,_,_,_,_,_,O,O,O,SH,O),                              // 39
    r(O,SH,SH,SH,O,_,_,_,_,_,_,O,SH,SH,SH,O),                         // 40
    r(O,SH,SH,SH,SH,O,_,_,_,_,O,SH,SH,SH,SH,O),                      // 41
    r(O,SHD,SH,SH,SHD,O,_,_,_,_,O,SHD,SH,SH,SHD,O),                  // 42
    r(O,O,O,O,O,O,_,_,_,_,O,O,O,O,O,O),                                // 43
    empty(), // 44
    empty(), // 45
    empty(), // 46
    empty(), // 47
];

// ============================================================
// FLEX PRESS FRAMES
// ============================================================

// Flex PRESS_LOW: Arms bent, hands at shoulder height
export const FLEX_PRESS_LOW = [
    // Row 0-9: Head (same as idle)
    r(O,O,O,O,O,O,O,O,O,O,O,O),                                       // 0
    r(O,FH,FH,FH,FH,FH,FH,FH,FH,FH,FH,FH,O),                        // 1
    r(O,FH,FH,FH,FHD,FH,FH,FH,FHD,FH,FH,FH,FH,O),                   // 2
    r(O,FH,FH,FH,FH,FH,FH,FH,FH,FH,FH,FH,FH,O),                     // 3
    r(O,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,O),                       // 4
    r(O,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,O),                       // 5
    r(O,S2,E,EP,S2,S2,S2,S2,S2,EP,E,S2,O),                             // 6
    r(O,S2,S2,S2,S2,S2D,S2D,S2,S2,S2,S2,S2,O),                        // 7
    r(O,S2,S2,M,M,E,E,M,M,S2,S2,S2,O),                                 // 8
    r(O,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,O),                              // 9
    // Row 10: Neck with hands at shoulder height
    rL(_,_,_,_,_,_,_,_,_,_,_,S2,S2,S2,S2,S2,S2,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_), // 10
    // Row 11: Arms bent, hands gripping at shoulder level
    rL(_,_,_,_,_,_,_,_,S2,O,S2,S2D,S2,S2,S2,S2D,S2,O,S2,_,_,_,_,_,_,_,_,_,_,_,_,_), // 11
    // Row 12-15: Shoulders with arms bent up
    rL(_,_,_,_,_,_,_,_,S2,O,S2,S2,S2,S2,S2,S2,S2,O,S2,_,_,_,_,_,_,_,_,_,_,_,_,_),   // 12
    rL(_,_,_,_,_,_,_,O,S2D,O,S2,S2,S2,S2,S2,S2,S2,O,S2D,O,_,_,_,_,_,_,_,_,_,_,_,_), // 13
    rL(_,_,_,_,_,_,_,_,O,O,S2,S2D,S2,S2,S2,S2D,S2,O,O,_,_,_,_,_,_,_,_,_,_,_,_,_),   // 14
    r(O,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,O),                    // 15
    // Row 16-19: Lean torso (shredded abs)
    r(O,S2,S2,S2,S2,S2,S2D,S2,S2,S2D,S2,S2,S2,S2,O),                  // 16
    r(O,S2,S2,S2,S2D,S2,S2,S2D,S2,S2,S2D,S2,S2,S2,O),                 // 17
    r(O,S2,S2D,S2,S2,S2D,S2,S2D,S2,S2D,S2,S2D,S2,S2,O),               // 18
    r(O,S2,S2,S2D,S2,S2,S2D,S2,S2,S2,S2D,S2,S2,S2,O),                 // 19
    ...FLEX_IDLE.slice(20),
];

// Flex PRESS_MID: Arms pushing up, hands at forehead/head level
export const FLEX_PRESS_MID = [
    // Row 0-6: Head (same as idle)
    r(O,O,O,O,O,O,O,O,O,O,O,O),                                       // 0
    r(O,FH,FH,FH,FH,FH,FH,FH,FH,FH,FH,FH,O),                        // 1
    r(O,FH,FH,FH,FHD,FH,FH,FH,FHD,FH,FH,FH,FH,O),                   // 2
    r(O,FH,FH,FH,FH,FH,FH,FH,FH,FH,FH,FH,FH,O),                     // 3
    r(O,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,O),                       // 4
    r(O,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,O),                       // 5
    r(O,S2,E,EP,S2,S2,S2,S2,S2,EP,E,S2,O),                             // 6
    // Row 7: Hands at forehead level
    rL(_,_,_,_,_,_,_,S2,S2,_,_,_,_,_,_,_,_,_,_,_,S2,S2,_,_,_,_,_,_,_,_,_,_), // 7
    // Row 8: Hands gripping
    rL(_,_,_,_,_,_,_,S2,S2,O,S2,S2,M,M,E,E,M,M,S2,O,S2,S2,_,_,_,_,_,_,_,_,_,_), // 8
    // Row 9: Arms extending
    rL(_,_,_,_,_,_,_,S2,S2D,O,S2,S2,S2,S2,S2,S2,S2,O,S2D,S2,_,_,_,_,_,_,_,_,_,_,_,_), // 9
    // Row 10-11: Upper arms, neck visible
    rL(_,_,_,_,_,_,_,O,S2,O,S2,S2,S2,S2,S2,S2,O,S2,O,_,_,_,_,_,_,_,_,_,_,_,_,_), // 10
    rL(_,_,_,_,_,_,_,_,O,O,S2,S2,S2D,S2D,S2,S2,O,O,_,_,_,_,_,_,_,_,_,_,_,_,_,_), // 11
    // Row 12-14: Shoulders merge into torso
    rL(_,_,_,_,_,_,_,_,_,O,S2,S2,S2,S2,S2,S2,S2,O,_,_,_,_,_,_,_,_,_,_,_,_,_,_), // 12
    rL(_,_,_,_,_,_,_,_,_,_,O,O,S2,S2,S2,S2,O,O,_,_,_,_,_,_,_,_,_,_,_,_,_,_),    // 13
    r(O,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,O),                    // 14
    // Row 15-19: Torso
    r(O,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,O),                    // 15
    r(O,S2,S2,S2,S2,S2,S2D,S2,S2,S2D,S2,S2,S2,S2,O),                  // 16
    r(O,S2,S2,S2,S2D,S2,S2,S2D,S2,S2,S2D,S2,S2,S2,O),                 // 17
    r(O,S2,S2D,S2,S2,S2D,S2,S2D,S2,S2D,S2,S2D,S2,S2,O),               // 18
    r(O,S2,S2,S2D,S2,S2,S2D,S2,S2,S2,S2D,S2,S2,S2,O),                 // 19
    ...FLEX_IDLE.slice(20),
];

// Flex PRESS_HIGH: Arms nearly straight overhead
export const FLEX_PRESS_HIGH = [
    // Row 0-2: Arms above head
    rL(_,_,_,_,_,_,_,S2,S2,_,_,_,_,_,_,_,_,_,_,_,S2,S2,_,_,_,_,_,_,_,_,_,_), // 0
    rL(_,_,_,_,_,_,_,S2,S2,O,_,_,_,_,_,_,_,_,_,O,S2,S2,_,_,_,_,_,_,_,_,_,_), // 1
    rL(_,_,_,_,_,_,_,S2,S2D,O,_,_,_,_,_,_,_,_,_,O,S2D,S2,_,_,_,_,_,_,_,_,_,_), // 2
    // Row 3: Top of head with arms on sides
    rL(_,_,_,_,_,_,O,S2,O,O,O,O,O,O,O,O,O,O,O,S2,O,_,_,_,_,_,_,_,_,_,_,_), // 3
    // Row 4: Hair
    rL(_,_,_,_,_,_,_,O,O,FH,FH,FH,FH,FH,FH,FH,FH,FH,FH,O,_,_,_,_,_,_,_,_,_,_,_,_), // 4
    r(O,FH,FH,FH,FHD,FH,FH,FH,FHD,FH,FH,FH,FH,O),                   // 5
    // Row 6-8: Face
    r(O,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,O),                       // 6
    r(O,S2,E,EP,S2,S2,S2,S2,S2,EP,E,S2,O),                             // 7
    r(O,S2,S2,S2,S2,S2D,S2D,S2,S2,S2,S2,S2,O),                        // 8
    // Row 9: Mouth
    r(O,S2,S2,M,M,E,E,M,M,S2,S2,S2,O),                                 // 9
    r(O,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,O),                              // 10
    // Row 11: Neck
    r(O,S2,S2,S2D,S2D,S2,O),                                            // 11
    // Row 12-14: Shoulders/torso
    r(O,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,O),                    // 12
    r(O,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,O),                    // 13
    r(O,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,O),                    // 14
    r(O,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,O),                    // 15
    r(O,S2,S2,S2,S2,S2,S2D,S2,S2,S2D,S2,S2,S2,S2,O),                  // 16
    r(O,S2,S2,S2,S2D,S2,S2,S2D,S2,S2,S2D,S2,S2,S2,O),                 // 17
    r(O,S2,S2D,S2,S2,S2D,S2,S2D,S2,S2D,S2,S2D,S2,S2,O),               // 18
    r(O,S2,S2,S2D,S2,S2,S2D,S2,S2,S2,S2D,S2,S2,S2,O),                 // 19
    ...FLEX_IDLE.slice(20),
];

// Flex PRESS_TOP: Full lockout, arms straight up
export const FLEX_PRESS_TOP = [
    // Row 0: Arms fully extended overhead
    rL(_,_,_,_,_,_,S2,S2,_,_,_,_,_,_,_,_,_,_,_,_,_,S2,S2,_,_,_,_,_,_,_,_,_), // 0
    rL(_,_,_,_,_,_,S2,S2,O,_,_,_,_,_,_,_,_,_,_,_,O,S2,S2,_,_,_,_,_,_,_,_,_), // 1
    rL(_,_,_,_,_,_,S2,S2D,O,_,_,_,_,_,_,_,_,_,_,_,O,S2D,S2,_,_,_,_,_,_,_,_,_), // 2
    rL(_,_,_,_,_,O,S2,S2,O,_,_,_,_,_,_,_,_,_,_,_,O,S2,S2,O,_,_,_,_,_,_,_,_), // 3
    // Row 4: Top of head / hair between arms
    rL(_,_,_,_,_,O,S2,O,O,O,O,O,O,O,O,O,O,O,O,O,O,S2,O,_,_,_,_,_,_,_,_,_), // 4
    rL(_,_,_,_,_,_,O,O,FH,FH,FH,FH,FH,FH,FH,FH,FH,FH,FH,FH,O,_,_,_,_,_,_,_,_,_,_,_), // 5
    r(O,FH,FH,FH,FHD,FH,FH,FH,FHD,FH,FH,FH,FH,O),                   // 6
    // Row 7-9: Face
    r(O,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,O),                       // 7
    r(O,S2,E,EP,S2,S2,S2,S2,S2,EP,E,S2,O),                             // 8
    r(O,S2,S2,S2,S2,S2D,S2D,S2,S2,S2,S2,S2,O),                        // 9
    r(O,S2,S2,M,M,E,E,M,M,S2,S2,S2,O),                                 // 10
    r(O,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,O),                              // 11
    // Row 12: Neck
    r(O,S2,S2,S2D,S2D,S2,O),                                            // 12
    // Row 13-19: Torso
    r(O,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,O),                    // 13
    r(O,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,O),                    // 14
    r(O,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,O),                    // 15
    r(O,S2,S2,S2,S2,S2,S2D,S2,S2,S2D,S2,S2,S2,S2,O),                  // 16
    r(O,S2,S2,S2,S2D,S2,S2,S2D,S2,S2,S2D,S2,S2,S2,O),                 // 17
    r(O,S2,S2D,S2,S2,S2D,S2,S2D,S2,S2D,S2,S2D,S2,S2,O),               // 18
    r(O,S2,S2,S2D,S2,S2,S2D,S2,S2,S2,S2D,S2,S2,S2,O),                 // 19
    ...FLEX_IDLE.slice(20),
];

// Flex: Side chest pose (signature)
export const FLEX_POSE = [
    r(O,O,O,O,O,O,O,O,O,O,O,O),                                        // 0
    r(O,FH,FH,FH,FH,FH,FH,FH,FH,FH,FH,FH,O),                         // 1
    r(O,FH,FH,FH,FHD,FH,FH,FH,FHD,FH,FH,FH,FH,O),                    // 2
    r(O,FH,FH,FH,FH,FH,FH,FH,FH,FH,FH,FH,FH,O),                      // 3
    r(O,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,O),                        // 4
    r(O,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,O),                        // 5
    // Winking eye
    r(O,S2,O,O,S2,S2,S2,S2,S2,EP,E,S2,O),                              // 6
    r(O,S2,S2,S2,S2,S2D,S2D,S2,S2,S2,S2,S2,O),                         // 7
    r(O,S2,S2,M,M,E,E,M,M,S2,S2,S2,O),                                  // 8
    r(O,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,O),                               // 9
    r(O,S2,S2,S2,S2,S2,S2,O),                                            // 10
    r(O,S2,S2,S2D,S2D,S2,O),                                             // 11
    // Side chest: one arm across, one arm flexing
    r(O,O,S2,S2,O,S2,S2,S2,S2,S2,S2,S2,S2,O,S2,O),                     // 12
    r(O,S2,S2,S2,O,S2,S2,S2,S2,S2,S2,S2,S2,S2,O,S2D,O),                // 13
    r(O,S2,S2,S2,O,S2,S2D,S2,S2,S2,S2,S2D,S2,S2,O,S2,O),               // 14
    r(O,S2,S2D,S2,O,S2,S2,S2,S2,S2,S2,S2,S2,S2,O,S2,O),                // 15
    r(O,S2,S2,O,S2,S2,S2,S2D,S2,S2,S2D,S2,S2,O,S2D,O),                 // 16
    r(O,S2,O,S2,S2,S2,S2D,S2,S2,S2,S2,S2D,O,S2,O),                     // 17
    r(O,S2,S2,O,O,S2,S2,S2D,S2,S2D,S2,S2,O,O,S2,O),                    // 18
    r(O,S2,S2,S2,O,S2,S2,S2,S2,S2,S2,O,S2,S2,S2,O),                    // 19
    r(O,S2,S2,O,S2,S2,S2D,S2,S2,S2D,S2,S2,S2,O,S2,O),                  // 20
    r(O,S2D,O,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,O,S2D,O),                  // 21
    r(O,O,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,S2,O,O),                    // 22
    r(O,O,O,O,O,BK,BK,O,O,BK,BK,O,O,O,O,O),                            // 23
    r(O,FB,FB,FB,FB,FB,FB,FB,FB,FB,FB,FB,FB,FB,FB,O),                    // 24
    ...FLEX_IDLE.slice(25),
];

// Flex: Celebration (side chest + open mouth grin)
export const FLEX_CELEBRATION = FLEX_POSE; // Same pose, reused for celebration

// ============================================================
// TONY "THE TANK" DELUCA
// Stocky, hairy, green headband, gold chain, old-school
// Score tier: Bronze Bot (easiest)
// ============================================================

export const TONY_IDLE = [
    // Row 0-3: Head with green headband, dark hair
    r(O,O,O,O,O,O,O,O,O,O,O,O,O,O),                                     // 0
    r(O,TH,TH,TH,TH,TH,TH,TH,TH,TH,TH,TH,TH,TH,O),                  // 1
    r(O,TG,TG,TG,TG,TG,TG,TG,TG,TG,TG,TG,TG,TG,O),                   // 2 headband
    r(O,TG,TGD,TG,TG,TG,TG,TG,TG,TG,TG,TGD,TG,TG,O),                 // 3 headband continued
    // Row 4-6: Face
    r(O,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,O),                      // 4
    r(O,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,O),                      // 5
    r(O,S3,E,EP,S3,S3,S3,S3,S3,S3,EP,E,S3,S3,O),                         // 6
    // Row 7-9: Nose, friendly expression
    r(O,S3,S3,S3,S3,S3D,S3D,S3,S3,S3,S3,S3,S3,O),                       // 7
    r(O,S3,S3,S3,M,M,S3,M,M,S3,S3,S3,S3,O),                              // 8
    r(O,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,O),                              // 9
    // Row 10-11: Thick neck with gold chain
    r(O,S3,S3,S3,S3D,S3,S3,S3,S3,O),                                      // 10
    r(O,S3,TC,S3D,TC,S3D,TC,S3,O),                                         // 11
    // Row 12-15: Stocky shoulders (no shirt, hairy chest implied with dark pixels)
    r(O,O,S3,S3,O,S3,S3,S3,S3,S3,S3,S3,S3,O,S3,S3,O,O),                  // 12
    r(O,S3,S3,S3,O,S3,S3D,S3,S3,S3,S3D,S3,S3,O,S3,S3,S3,O),              // 13
    r(O,S3,S3,S3,S3,O,S3,S3D,S3,S3,S3D,S3,S3,O,S3,S3,S3,S3,O),           // 14
    r(O,S3,S3D,S3,S3,O,S3,S3,TC,S3,S3,TC,S3,O,S3,S3,S3D,S3,O),           // 15
    // Row 16-19: Stocky barrel torso (gold chain visible)
    r(O,S3,S3,S3,O,S3,S3D,S3,TC,S3D,S3,S3D,S3,O,S3,S3,S3,O),             // 16
    r(O,S3,S3D,S3,O,S3,S3,S3D,S3,S3,S3D,S3,S3,O,S3,S3D,S3,O),            // 17
    r(O,S3,S3,O,S3,S3D,S3,S3,S3D,S3,S3,S3D,S3,S3,O,S3,O),                // 18
    r(O,S3,S3,O,S3,S3,S3D,S3,S3,S3D,S3,S3,S3,S3,O,S3,O),                 // 19
    // Row 20-22: Lower torso
    r(O,S3,O,S3,S3,S3,S3D,S3,S3,S3D,S3,S3,S3,S3,O,O),                    // 20
    r(O,S3D,O,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,O,S3D,O),                 // 21
    r(O,O,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,O,O),                      // 22
    // Row 23-24: Belt
    r(O,O,O,O,O,BK,BK,O,O,BK,BK,O,O,O,O,O),                              // 23
    r(O,TP,TP,TP,TP,TP,TP,TP,TP,TP,TP,TP,TP,TP,TP,O),                    // 24
    // Row 25-29: Brown trunks
    r(O,TP,TP,TP,TP,TP,TP,TP,TP,TP,TP,TP,TP,TP,O),                       // 25
    r(O,TP,TP,TPD,TP,TP,TP,O,O,TP,TP,TPD,TP,TP,O),                       // 26
    r(O,TP,TP,TP,TP,TP,O,_,_,O,TP,TP,TP,TP,O),                            // 27
    r(O,TP,TP,TPD,TP,O,_,_,_,_,O,TP,TPD,TP,O),                            // 28
    r(O,TP,TP,TP,O,_,_,_,_,_,_,O,TP,TP,O),                                // 29
    // Row 30-37: Stocky legs
    r(O,S3,S3,S3,S3,O,_,_,_,_,O,S3,S3,S3,S3,O),                          // 30
    r(O,S3,S3D,S3,S3,O,_,_,_,_,O,S3,S3,S3D,S3,O),                        // 31
    r(O,S3,S3,S3,S3,O,_,_,_,_,O,S3,S3,S3,S3,O),                          // 32
    r(O,S3,S3,S3D,S3,O,_,_,_,_,O,S3,S3D,S3,S3,O),                        // 33
    r(O,S3,S3,S3,S3,O,_,_,_,_,O,S3,S3,S3,S3,O),                          // 34
    r(O,S3,S3,S3,O,_,_,_,_,_,_,O,S3,S3,S3,O),                             // 35
    r(O,S3,S3,S3,O,_,_,_,_,_,_,O,S3,S3,S3,O),                             // 36
    r(O,S3,S3,O,_,_,_,_,_,_,_,_,O,S3,S3,O),                                // 37
    // Row 38-44: Shoes
    r(O,O,S3,S3,O,_,_,_,_,_,_,O,S3,S3,O,O),                               // 38
    r(O,SH,O,O,O,_,_,_,_,_,_,O,O,O,SH,O),                                 // 39
    r(O,SH,SH,SH,O,_,_,_,_,_,_,O,SH,SH,SH,O),                            // 40
    r(O,SH,SH,SH,SH,O,_,_,_,_,O,SH,SH,SH,SH,O),                         // 41
    r(O,SHD,SH,SH,SHD,O,_,_,_,_,O,SHD,SH,SH,SHD,O),                     // 42
    r(O,O,O,O,O,O,_,_,_,_,O,O,O,O,O,O),                                   // 43
    empty(), // 44
    empty(), // 45
    empty(), // 46
    empty(), // 47
];

// ============================================================
// TONY PRESS FRAMES
// ============================================================

// Tony PRESS_LOW: Arms bent, hands at shoulder height
export const TONY_PRESS_LOW = [
    // Row 0-9: Head (same as idle)
    r(O,O,O,O,O,O,O,O,O,O,O,O,O,O),                                     // 0
    r(O,TH,TH,TH,TH,TH,TH,TH,TH,TH,TH,TH,TH,TH,O),                  // 1
    r(O,TG,TG,TG,TG,TG,TG,TG,TG,TG,TG,TG,TG,TG,O),                   // 2
    r(O,TG,TGD,TG,TG,TG,TG,TG,TG,TG,TG,TGD,TG,TG,O),                 // 3
    r(O,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,O),                      // 4
    r(O,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,O),                      // 5
    r(O,S3,E,EP,S3,S3,S3,S3,S3,S3,EP,E,S3,S3,O),                         // 6
    r(O,S3,S3,S3,S3,S3D,S3D,S3,S3,S3,S3,S3,S3,O),                       // 7
    r(O,S3,S3,S3,M,M,S3,M,M,S3,S3,S3,S3,O),                              // 8
    r(O,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,O),                              // 9
    // Row 10: Neck with hands at shoulder height
    rL(_,_,_,_,_,_,_,_,_,_,_,S3,S3,S3D,S3,S3,S3,S3,_,_,_,_,_,_,_,_,_,_,_,_,_,_), // 10
    // Row 11: Arms bent, hands gripping at shoulder level
    rL(_,_,_,_,_,_,_,_,S3,O,S3,TC,S3D,TC,S3D,TC,S3,O,S3,_,_,_,_,_,_,_,_,_,_,_,_,_), // 11
    // Row 12-15: Shoulders with arms bent up
    rL(_,_,_,_,_,_,_,_,S3,O,S3,S3,S3,S3,S3,S3,S3,O,S3,_,_,_,_,_,_,_,_,_,_,_,_,_),   // 12
    rL(_,_,_,_,_,_,_,O,S3D,O,S3,S3D,S3,S3,S3D,S3,S3,O,S3D,O,_,_,_,_,_,_,_,_,_,_,_,_), // 13
    rL(_,_,_,_,_,_,_,_,O,O,S3,S3D,S3,TC,S3,S3D,S3,O,O,_,_,_,_,_,_,_,_,_,_,_,_,_),   // 14
    r(O,S3,S3,S3,TC,S3,S3,S3,S3,S3,TC,S3,S3,S3,O),                      // 15
    // Row 16-19: Stocky barrel torso (gold chain visible)
    r(O,S3,S3D,S3,TC,S3D,S3,S3D,S3,S3D,S3,S3D,S3,S3,O),                 // 16
    r(O,S3,S3,S3D,S3,S3,S3D,S3,S3,S3D,S3,S3,S3D,S3,O),                  // 17
    r(O,S3,S3D,S3,S3,S3D,S3,S3D,S3,S3,S3D,S3,S3D,S3,O),                 // 18
    r(O,S3,S3,S3D,S3,S3,S3D,S3,S3,S3D,S3,S3,S3,S3,O),                   // 19
    ...TONY_IDLE.slice(20),
];

// Tony PRESS_MID: Arms pushing up, hands at forehead/head level
export const TONY_PRESS_MID = [
    // Row 0-6: Head (same as idle)
    r(O,O,O,O,O,O,O,O,O,O,O,O,O,O),                                     // 0
    r(O,TH,TH,TH,TH,TH,TH,TH,TH,TH,TH,TH,TH,TH,O),                  // 1
    r(O,TG,TG,TG,TG,TG,TG,TG,TG,TG,TG,TG,TG,TG,O),                   // 2
    r(O,TG,TGD,TG,TG,TG,TG,TG,TG,TG,TG,TGD,TG,TG,O),                 // 3
    r(O,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,O),                      // 4
    r(O,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,O),                      // 5
    r(O,S3,E,EP,S3,S3,S3,S3,S3,S3,EP,E,S3,S3,O),                         // 6
    // Row 7: Hands at forehead level
    rL(_,_,_,_,_,_,_,S3,S3,_,_,_,_,_,_,_,_,_,_,_,S3,S3,_,_,_,_,_,_,_,_,_,_), // 7
    // Row 8: Hands gripping
    rL(_,_,_,_,_,_,_,S3,S3,O,S3,S3,M,M,S3,M,M,S3,S3,O,S3,S3,_,_,_,_,_,_,_,_,_,_), // 8
    // Row 9: Arms extending
    rL(_,_,_,_,_,_,_,S3,S3D,O,S3,S3,S3,S3,S3,S3,S3,O,S3D,S3,_,_,_,_,_,_,_,_,_,_,_,_), // 9
    // Row 10-11: Upper arms, neck visible
    rL(_,_,_,_,_,_,_,O,S3,O,S3,S3,S3D,S3,S3,S3,O,S3,O,_,_,_,_,_,_,_,_,_,_,_,_,_), // 10
    rL(_,_,_,_,_,_,_,_,O,O,S3,TC,S3D,TC,S3D,TC,O,O,_,_,_,_,_,_,_,_,_,_,_,_,_,_), // 11
    // Row 12-14: Shoulders merge into torso
    rL(_,_,_,_,_,_,_,_,_,O,S3,S3,S3,S3,S3,S3,S3,O,_,_,_,_,_,_,_,_,_,_,_,_,_,_), // 12
    rL(_,_,_,_,_,_,_,_,_,_,O,O,S3,S3D,S3,S3,O,O,_,_,_,_,_,_,_,_,_,_,_,_,_,_),   // 13
    r(O,S3,S3,S3,S3,S3,S3D,S3,S3,S3D,S3,S3,S3,S3,O),                    // 14
    // Row 15-19: Torso
    r(O,S3,S3,S3,TC,S3,S3,S3,S3,S3,TC,S3,S3,S3,O),                      // 15
    r(O,S3,S3D,S3,TC,S3D,S3,S3D,S3,S3D,S3,S3D,S3,S3,O),                 // 16
    r(O,S3,S3,S3D,S3,S3,S3D,S3,S3,S3D,S3,S3,S3D,S3,O),                  // 17
    r(O,S3,S3D,S3,S3,S3D,S3,S3D,S3,S3,S3D,S3,S3D,S3,O),                 // 18
    r(O,S3,S3,S3D,S3,S3,S3D,S3,S3,S3D,S3,S3,S3,S3,O),                   // 19
    ...TONY_IDLE.slice(20),
];

// Tony PRESS_HIGH: Arms nearly straight overhead
export const TONY_PRESS_HIGH = [
    // Row 0-2: Arms above head
    rL(_,_,_,_,_,_,_,S3,S3,_,_,_,_,_,_,_,_,_,_,_,S3,S3,_,_,_,_,_,_,_,_,_,_), // 0
    rL(_,_,_,_,_,_,_,S3,S3,O,_,_,_,_,_,_,_,_,_,O,S3,S3,_,_,_,_,_,_,_,_,_,_), // 1
    rL(_,_,_,_,_,_,_,S3,S3D,O,_,_,_,_,_,_,_,_,_,O,S3D,S3,_,_,_,_,_,_,_,_,_,_), // 2
    // Row 3: Top of head with arms on sides
    rL(_,_,_,_,_,_,O,S3,O,O,O,O,O,O,O,O,O,O,O,S3,O,_,_,_,_,_,_,_,_,_,_,_), // 3
    // Row 4: Hair + headband
    rL(_,_,_,_,_,_,_,O,O,TH,TH,TH,TH,TH,TH,TH,TH,TH,TH,O,_,_,_,_,_,_,_,_,_,_,_,_), // 4
    r(O,TG,TG,TG,TG,TG,TG,TG,TG,TG,TG,TG,TG,TG,O),                   // 5
    // Row 6-8: Face
    r(O,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,O),                      // 6
    r(O,S3,E,EP,S3,S3,S3,S3,S3,S3,EP,E,S3,S3,O),                         // 7
    r(O,S3,S3,S3,S3,S3D,S3D,S3,S3,S3,S3,S3,S3,O),                       // 8
    // Row 9: Mouth
    r(O,S3,S3,S3,M,M,S3,M,M,S3,S3,S3,S3,O),                              // 9
    r(O,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,O),                              // 10
    // Row 11: Neck
    r(O,S3,TC,S3D,TC,S3D,TC,S3,O),                                         // 11
    // Row 12-14: Shoulders/torso
    r(O,S3,S3,S3,S3,S3,S3D,S3,S3,S3D,S3,S3,S3,S3,O),                    // 12
    r(O,S3,S3,S3,S3,S3,S3D,S3,S3,S3D,S3,S3,S3,S3,O),                    // 13
    r(O,S3,S3,S3,S3,S3,S3D,S3,S3,S3D,S3,S3,S3,S3,O),                    // 14
    r(O,S3,S3,S3,TC,S3,S3,S3,S3,S3,TC,S3,S3,S3,O),                      // 15
    r(O,S3,S3D,S3,TC,S3D,S3,S3D,S3,S3D,S3,S3D,S3,S3,O),                 // 16
    r(O,S3,S3,S3D,S3,S3,S3D,S3,S3,S3D,S3,S3,S3D,S3,O),                  // 17
    r(O,S3,S3D,S3,S3,S3D,S3,S3D,S3,S3,S3D,S3,S3D,S3,O),                 // 18
    r(O,S3,S3,S3D,S3,S3,S3D,S3,S3,S3D,S3,S3,S3,S3,O),                   // 19
    ...TONY_IDLE.slice(20),
];

// Tony PRESS_TOP: Full lockout, arms straight up
export const TONY_PRESS_TOP = [
    // Row 0: Arms fully extended overhead
    rL(_,_,_,_,_,_,S3,S3,_,_,_,_,_,_,_,_,_,_,_,_,_,S3,S3,_,_,_,_,_,_,_,_,_), // 0
    rL(_,_,_,_,_,_,S3,S3,O,_,_,_,_,_,_,_,_,_,_,_,O,S3,S3,_,_,_,_,_,_,_,_,_), // 1
    rL(_,_,_,_,_,_,S3,S3D,O,_,_,_,_,_,_,_,_,_,_,_,O,S3D,S3,_,_,_,_,_,_,_,_,_), // 2
    rL(_,_,_,_,_,O,S3,S3,O,_,_,_,_,_,_,_,_,_,_,_,O,S3,S3,O,_,_,_,_,_,_,_,_), // 3
    // Row 4: Top of head / hair between arms
    rL(_,_,_,_,_,O,S3,O,O,O,O,O,O,O,O,O,O,O,O,O,O,S3,O,_,_,_,_,_,_,_,_,_), // 4
    rL(_,_,_,_,_,_,O,O,TH,TH,TH,TH,TH,TH,TH,TH,TH,TH,TH,TH,O,_,_,_,_,_,_,_,_,_,_,_), // 5
    r(O,TG,TG,TG,TG,TG,TG,TG,TG,TG,TG,TG,TG,TG,O),                   // 6
    // Row 7-9: Face
    r(O,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,O),                      // 7
    r(O,S3,E,EP,S3,S3,S3,S3,S3,S3,EP,E,S3,S3,O),                         // 8
    r(O,S3,S3,S3,S3,S3D,S3D,S3,S3,S3,S3,S3,S3,O),                       // 9
    r(O,S3,S3,S3,M,M,S3,M,M,S3,S3,S3,S3,O),                              // 10
    r(O,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,O),                              // 11
    // Row 12: Neck
    r(O,S3,TC,S3D,TC,S3D,TC,S3,O),                                         // 12
    // Row 13-19: Torso
    r(O,S3,S3,S3,S3,S3,S3D,S3,S3,S3D,S3,S3,S3,S3,O),                    // 13
    r(O,S3,S3,S3,S3,S3,S3D,S3,S3,S3D,S3,S3,S3,S3,O),                    // 14
    r(O,S3,S3,S3,TC,S3,S3,S3,S3,S3,TC,S3,S3,S3,O),                      // 15
    r(O,S3,S3D,S3,TC,S3D,S3,S3D,S3,S3D,S3,S3D,S3,S3,O),                 // 16
    r(O,S3,S3,S3D,S3,S3,S3D,S3,S3,S3D,S3,S3,S3D,S3,O),                  // 17
    r(O,S3,S3D,S3,S3,S3D,S3,S3D,S3,S3,S3D,S3,S3D,S3,O),                 // 18
    r(O,S3,S3,S3D,S3,S3,S3D,S3,S3,S3D,S3,S3,S3,S3,O),                   // 19
    ...TONY_IDLE.slice(20),
];

// Tony: Most muscular / crab pose (signature)
export const TONY_FLEX = [
    r(O,O,O,O,O,O,O,O,O,O,O,O,O,O),                                      // 0
    r(O,TH,TH,TH,TH,TH,TH,TH,TH,TH,TH,TH,TH,TH,O),                   // 1
    r(O,TG,TG,TG,TG,TG,TG,TG,TG,TG,TG,TG,TG,TG,O),                    // 2
    r(O,TG,TGD,TG,TG,TG,TG,TG,TG,TG,TG,TGD,TG,TG,O),                  // 3
    r(O,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,O),                       // 4
    r(O,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,O),                       // 5
    r(O,S3,E,EP,S3,S3,S3,S3,S3,S3,EP,E,S3,S3,O),                          // 6
    r(O,S3,S3,S3,S3,S3D,S3D,S3,S3,S3,S3,S3,S3,O),                        // 7
    r(O,S3,S3,S3,M,M,E,E,M,M,S3,S3,S3,O),                                 // 8
    r(O,S3,S3,S3,S3,M,M,S3,S3,S3,S3,S3,O),                                 // 9
    r(O,S3,S3,S3,S3D,S3,S3,S3,S3,O),                                       // 10
    r(O,S3,TC,S3D,TC,S3D,TC,S3,O),                                          // 11
    // Crab pose: arms forward, fists together, leaning forward
    r(O,S3,S3,S3,O,S3,S3,S3,S3,S3,S3,S3,S3,O,S3,S3,S3,O),                // 12
    r(O,S3,S3D,S3,O,S3,S3D,S3,TC,S3,S3D,S3,S3,O,S3,S3D,S3,O),            // 13
    rL(_,_,O,S3,S3,O,S3,S3D,S3,TC,S3D,S3,S3D,S3,O,S3,S3,O,_,_,_,_,_,_,_,_,_,_,_,_,_,_), // 14
    rL(O,S3,S3,S3D,O,S3,S3,S3,S3D,S3,S3,S3D,S3,S3,O,S3D,S3,S3,O,_,_,_,_,_,_,_,_,_,_,_,_,_), // 15
    rL(O,S3,S3,O,S3,S3D,S3,S3,S3D,S3,S3,S3D,S3,S3D,S3,O,S3,S3,O,_,_,_,_,_,_,_,_,_,_,_,_,_), // 16
    r(O,S3,O,S3,S3,S3D,S3,S3,TC,S3,S3,S3D,S3,S3,O,S3,O),                 // 17
    r(O,S3,O,S3,S3D,S3,S3,S3D,S3,S3D,S3,S3,S3D,S3,O,S3,O),              // 18
    r(O,S3D,O,S3,S3,S3D,S3,S3,S3,S3D,S3,S3,S3,O,S3D,O),                 // 19
    r(O,O,S3,S3,S3,S3,S3D,S3,S3,S3D,S3,S3,S3,S3,O,O),                   // 20
    r(O,O,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,O,O),                     // 21
    r(O,O,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,S3,O,O),                     // 22
    r(O,O,O,O,O,BK,BK,O,O,BK,BK,O,O,O,O,O),                              // 23
    r(O,TP,TP,TP,TP,TP,TP,TP,TP,TP,TP,TP,TP,TP,TP,O),                    // 24
    ...TONY_IDLE.slice(25),
];

// Tony: Celebration (same pose with grin)
export const TONY_CELEBRATION = TONY_FLEX;

// ============================================================
// Rival definitions for game system integration
// ============================================================
export const RIVALS = {
    ivan: {
        name: '"Iron" Ivan Petrov',
        tier: 'gold',
        sprites: {
            idle: IVAN_IDLE,
            flex: IVAN_FLEX,
            celebration: IVAN_CELEBRATION,
            press_low: IVAN_PRESS_LOW,
            press_mid: IVAN_PRESS_MID,
            press_high: IVAN_PRESS_HIGH,
            press_top: IVAN_PRESS_TOP,
        },
        taunt: 'You think typing makes muscle? I EAT keyboards for breakfast.',
    },
    flex: {
        name: 'Flex McQueen',
        tier: 'silver',
        sprites: {
            idle: FLEX_IDLE,
            flex: FLEX_POSE,
            celebration: FLEX_CELEBRATION,
            press_low: FLEX_PRESS_LOW,
            press_mid: FLEX_PRESS_MID,
            press_high: FLEX_PRESS_HIGH,
            press_top: FLEX_PRESS_TOP,
        },
        taunt: 'Looking good is half the battle, bro. The other half? Also looking good.',
    },
    tony: {
        name: 'Tony "The Tank" Deluca',
        tier: 'bronze',
        sprites: {
            idle: TONY_IDLE,
            flex: TONY_FLEX,
            celebration: TONY_CELEBRATION,
            press_low: TONY_PRESS_LOW,
            press_mid: TONY_PRESS_MID,
            press_high: TONY_PRESS_HIGH,
            press_top: TONY_PRESS_TOP,
        },
        taunt: "Thirty years in the gym, kid. My fingers ain't fast but my heart's in it.",
    },
};

/** Sprite dimensions (all rivals share the same size) */
export const RIVAL_WIDTH = 32;
export const RIVAL_HEIGHT = 48;
