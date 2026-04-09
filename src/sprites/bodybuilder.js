/**
 * Bodybuilder sprite data - Main player character
 * 32x48 pixel sprites, 3/4 front-facing view
 * NES-authentic color palette
 *
 * Coordinate system: [row][col], row 0 = top of sprite
 * null = transparent pixel
 */

// --- NES-style color palette ---
const S = '#F0B088'; // skin tone (light)
const SD = '#C07050'; // skin dark / shadow
const H = '#483018'; // hair (brown)
const T = '#F0D020'; // tank top (yellow)
const TD = '#C0A010'; // tank top dark/shadow
const P = '#2828A8'; // pants/shorts (blue)
const PD = '#181878'; // pants dark
const SH = '#D08060'; // shoe brown
const SHD = '#905838'; // shoe dark
const O = '#181818'; // outline / black
const W = '#C0C0C0'; // weight/dumbbell
const WD = '#808080'; // weight dark
const E = '#FFFFFF'; // eye white
const EP = '#181818'; // eye pupil
const M = '#E82020'; // mouth
const BK = '#F8D878'; // belt buckle / gold accent
const _ = null;       // transparent

/**
 * Pad or trim a row to exactly 32 pixels wide, centering content.
 * Takes an array of colors and returns a 32-element array padded with null.
 */
function r(...pixels) {
    const row = new Array(32).fill(_);
    // Center the pixel data in the 32-wide row
    const offset = Math.floor((32 - pixels.length) / 2);
    for (let i = 0; i < pixels.length; i++) {
        if (offset + i >= 0 && offset + i < 32) {
            row[offset + i] = pixels[i];
        }
    }
    return row;
}

/**
 * Build a row from the left edge (col 0). No centering.
 */
function rL(...pixels) {
    const row = new Array(32).fill(_);
    for (let i = 0; i < pixels.length && i < 32; i++) {
        row[i] = pixels[i];
    }
    return row;
}

/** Empty 32-wide row */
function empty() { return new Array(32).fill(_); }

// ============================================================
// IDLE POSE - Standing front-facing, barbell at shoulder height
// (rack position for overhead press)
// 32x48, character roughly centered
// ============================================================
export const IDLE = [
    // Row 0-3: Top of head / hair
    r(O,O,O,O,O,O,O,O,O,O,O,O),                                    // 0
    r(O,H,H,H,H,H,H,H,H,H,H,H,H,O),                               // 1
    r(O,H,H,H,H,H,H,H,H,H,H,H,H,H,O),                             // 2
    r(O,H,H,H,H,H,H,H,H,H,H,H,H,H,O),                             // 3
    // Row 4-6: Forehead and eyes
    r(O,S,S,S,S,S,S,S,S,S,S,S,S,S,O),                               // 4
    r(O,S,S,S,S,S,S,S,S,S,S,S,S,S,O),                               // 5
    r(O,S,E,EP,S,S,S,S,S,S,S,EP,E,S,O),                             // 6
    // Row 7-9: Nose, mouth, chin
    r(O,S,S,S,S,S,SD,SD,S,S,S,S,S,S,O),                             // 7
    r(O,S,S,S,S,S,M,M,S,S,S,S,S,S,O),                               // 8
    r(O,S,S,S,S,S,S,S,S,S,S,S,S,O),                                  // 9
    // Row 10: Neck + hands at shoulder height (barbell drawn programmatically)
    rL(_,_,_,_,_,_,_,_,_,_,S,S,S,S,S,S,S,S,_,_,_,_,_,_,_,_,_,_,_,_,_,_), // 10
    // Row 11: Arms bent up, hands gripping (barbell overlay added in code)
    rL(_,_,_,_,_,_,_,S,S,O,S,SD,S,O,T,T,T,T,O,S,SD,S,O,S,S,_,_,_,_,_,_,_), // 11
    // Row 12-15: Shoulders — arms bent up holding position
    rL(_,_,_,_,_,_,_,S,S,O,S,S,S,O,T,T,T,T,O,S,S,S,O,S,S,_,_,_,_,_,_,_),   // 12
    rL(_,_,_,_,_,_,O,S,SD,O,S,S,O,T,T,T,T,T,T,O,S,S,O,SD,S,O,_,_,_,_,_,_),     // 13
    rL(_,_,_,_,_,_,_,O,O,O,S,S,O,T,T,T,T,T,T,O,S,S,O,O,O,_,_,_,_,_,_,_),       // 14
    r(O,T,T,TD,T,T,T,T,T,T,T,T,TD,T,T,O),                           // 15
    // Row 16-19: Mid torso
    r(O,T,T,T,T,T,T,T,T,T,T,T,T,T,T,O),                             // 16
    r(O,T,T,T,TD,T,T,T,T,T,T,TD,T,T,T,O),                           // 17
    r(O,T,T,T,T,T,T,T,T,T,T,T,T,T,T,O),                             // 18
    r(O,T,T,T,TD,T,T,T,T,T,T,TD,T,T,T,O),                           // 19
    // Row 20-22: Lower torso
    r(O,T,T,T,T,T,T,T,T,T,T,T,T,T,T,O),                             // 20
    r(O,T,T,T,T,T,T,T,T,T,T,T,T,T,T,O),                             // 21
    r(O,T,T,T,T,T,T,T,T,T,T,T,T,T,T,O),                             // 22
    // Row 23-25: Waist / belt
    r(O,T,T,T,T,T,T,T,T,T,T,T,T,T,T,O),                             // 23
    r(O,O,O,O,O,BK,BK,O,O,BK,BK,O,O,O,O,O),                        // 24
    r(O,P,P,P,P,P,P,P,P,P,P,P,P,P,P,O),                             // 25
    // Row 26-29: Upper legs / shorts
    r(O,P,P,P,P,P,P,P,P,P,P,P,P,P,P,O),                             // 26
    r(O,P,P,PD,P,P,P,O,O,P,P,P,PD,P,P,O),                           // 27
    r(O,P,P,P,P,P,P,O,O,P,P,P,P,P,P,O),                             // 28
    r(O,P,P,PD,P,P,O,_,_,O,P,P,PD,P,P,O),                           // 29
    // Row 30-33: Lower legs (skin)
    r(O,P,P,P,P,O,_,_,_,_,_,O,P,P,P,P,O),                           // 30
    r(O,S,S,S,S,O,_,_,_,_,_,O,S,S,S,S,O),                           // 31
    r(O,S,SD,S,S,O,_,_,_,_,_,O,S,S,SD,S,O),                         // 32
    r(O,S,S,S,S,O,_,_,_,_,_,O,S,S,S,S,O),                           // 33
    // Row 34-37: Calves
    r(O,S,S,SD,S,O,_,_,_,_,_,O,S,SD,S,S,O),                         // 34
    r(O,S,S,S,S,O,_,_,_,_,_,O,S,S,S,S,O),                           // 35
    r(O,S,S,S,S,O,_,_,_,_,_,O,S,S,S,S,O),                           // 36
    r(O,S,S,S,O,_,_,_,_,_,_,_,O,S,S,S,O),                           // 37
    // Row 38-41: Ankles and shoes
    r(O,S,S,S,O,_,_,_,_,_,_,_,O,S,S,S,O),                           // 38
    r(O,O,S,S,S,O,_,_,_,_,_,O,S,S,S,O,O),                           // 39
    r(O,SH,O,O,O,O,_,_,_,_,_,O,O,O,O,SH,O),                        // 40
    r(O,SH,SH,SH,SH,O,_,_,_,_,_,O,SH,SH,SH,SH,O),                 // 41
    // Row 42-44: Shoes bottom
    r(O,SH,SH,SH,SH,SH,O,_,_,_,O,SH,SH,SH,SH,SH,O),               // 42
    r(O,SHD,SH,SH,SH,SHD,O,_,_,_,O,SHD,SH,SH,SH,SHD,O),           // 43
    r(O,O,O,O,O,O,O,_,_,_,O,O,O,O,O,O,O),                           // 44
    // Row 45-47: Bottom padding
    empty(), // 45
    empty(), // 46
    empty(), // 47
];

// ============================================================
// PRESS FRAME 1 - Barbell just above shoulders, arms slightly bent
// Arms pushing barbell upward from rack position
// ============================================================
export const PRESS_1 = [
    // Row 0-3: Top of head / hair
    r(O,O,O,O,O,O,O,O,O,O,O,O),                                    // 0
    r(O,H,H,H,H,H,H,H,H,H,H,H,H,O),                               // 1
    r(O,H,H,H,H,H,H,H,H,H,H,H,H,H,O),                             // 2
    r(O,H,H,H,H,H,H,H,H,H,H,H,H,H,O),                             // 3
    // Row 4-6: Forehead and eyes
    r(O,S,S,S,S,S,S,S,S,S,S,S,S,S,O),                               // 4
    r(O,S,S,S,S,S,S,S,S,S,S,S,S,S,O),                               // 5
    r(O,S,E,EP,S,S,S,S,S,S,S,EP,E,S,O),                             // 6
    // Row 7-9: Nose, mouth, chin
    r(O,S,S,S,S,S,SD,SD,S,S,S,S,S,S,O),                             // 7
    r(O,S,S,S,S,S,M,M,S,S,S,S,S,S,O),                               // 8
    r(O,S,S,S,S,S,S,S,S,S,S,S,S,O),                                  // 9
    // Row 10: Arms pushing up, hands just above head (barbell drawn programmatically)
    rL(_,_,_,_,_,_,_,S,S,_,_,_,_,_,_,_,_,_,_,_,_,S,S,_,_,_,_,_,_,_,_,_), // 10
    // Row 11: Hands gripping position
    rL(_,_,_,_,_,_,_,S,S,O,_,_,_,_,_,_,_,_,_,_,O,S,S,_,_,_,_,_,_,_,_,_), // 11
    // Row 12-14: Upper arms angled up
    rL(_,_,_,_,_,_,_,S,SD,O,_,_,_,_,_,_,_,_,_,_,O,SD,S,_,_,_,_,_,_,_,_,_), // 12
    rL(_,_,_,_,_,_,_,O,S,O,S,S,O,T,T,T,T,O,S,S,O,S,O,_,_,_,_,_,_,_,_,_),      // 13
    rL(_,_,_,_,_,_,_,_,O,O,S,S,O,T,T,T,T,O,S,S,O,O,_,_,_,_,_,_,_,_,_,_),      // 14
    // Row 15-19: Torso (same as idle)
    r(O,T,T,TD,T,T,T,T,T,T,T,T,TD,T,T,O),                           // 15
    r(O,T,T,T,T,T,T,T,T,T,T,T,T,T,T,O),                             // 16
    r(O,T,T,T,TD,T,T,T,T,T,T,TD,T,T,T,O),                           // 17
    r(O,T,T,T,T,T,T,T,T,T,T,T,T,T,T,O),                             // 18
    r(O,T,T,T,TD,T,T,T,T,T,T,TD,T,T,T,O),                           // 19
    ...IDLE.slice(20),
];

// ============================================================
// PRESS FRAME 2 - Barbell at forehead level, arms pushing up
// ============================================================
export const PRESS_2 = [
    // Row 0-3: Top of head / hair
    r(O,O,O,O,O,O,O,O,O,O,O,O),                                    // 0
    r(O,H,H,H,H,H,H,H,H,H,H,H,H,O),                               // 1
    r(O,H,H,H,H,H,H,H,H,H,H,H,H,H,O),                             // 2
    r(O,H,H,H,H,H,H,H,H,H,H,H,H,H,O),                             // 3
    // Row 4-6: Forehead and eyes
    r(O,S,S,S,S,S,S,S,S,S,S,S,S,S,O),                               // 4
    r(O,S,S,S,S,S,S,S,S,S,S,S,S,S,O),                               // 5
    r(O,S,E,EP,S,S,S,S,S,S,S,EP,E,S,O),                             // 6
    // Row 7: Arms at forehead level (barbell drawn programmatically)
    rL(_,_,_,_,_,_,S,S,_,_,_,_,_,_,_,_,_,_,_,_,_,_,S,S,_,_,_,_,_,_,_,_), // 7
    // Row 8: Hands gripping position
    rL(_,_,_,_,_,_,S,S,O,_,_,_,_,_,_,_,_,_,_,_,_,O,S,S,_,_,_,_,_,_,_,_), // 8
    // Row 9: Arms extending upward
    rL(_,_,_,_,_,_,S,SD,O,_,_,_,_,_,_,_,_,_,_,_,_,O,SD,S,_,_,_,_,_,_,_,_), // 9
    // Row 10-11: Upper arms, neck visible between
    rL(_,_,_,_,_,_,O,S,O,S,S,S,S,S,S,S,S,S,S,O,S,O,_,_,_,_,_,_,_,_,_,_),      // 10
    rL(_,_,_,_,_,_,_,O,O,S,S,S,SD,SD,S,S,S,O,O,_,_,_,_,_,_,_,_,_,_,_,_,_),    // 11
    // Row 12-14: Shoulders merge into torso
    rL(_,_,_,_,_,_,_,_,O,S,S,O,T,T,T,T,T,T,O,S,S,O,_,_,_,_,_,_,_,_,_,_),      // 12
    rL(_,_,_,_,_,_,_,_,_,O,O,O,T,T,T,T,T,T,O,O,O,_,_,_,_,_,_,_,_,_,_,_),      // 13
    r(O,T,T,T,T,T,T,T,T,T,T,T,T,T,T,O),                             // 14
    // Row 15-19: Torso
    r(O,T,T,TD,T,T,T,T,T,T,T,T,TD,T,T,O),                           // 15
    r(O,T,T,T,T,T,T,T,T,T,T,T,T,T,T,O),                             // 16
    r(O,T,T,T,TD,T,T,T,T,T,T,TD,T,T,T,O),                           // 17
    r(O,T,T,T,T,T,T,T,T,T,T,T,T,T,T,O),                             // 18
    r(O,T,T,T,TD,T,T,T,T,T,T,TD,T,T,T,O),                           // 19
    ...IDLE.slice(20),
];

// ============================================================
// PRESS FRAME 3 - Barbell above head, arms nearly extended
// ============================================================
export const PRESS_3 = [
    // Row 0-2: Arms above head, nearly straight (barbell drawn programmatically)
    rL(_,_,_,_,_,_,S,S,_,_,_,_,_,_,_,_,_,_,_,_,_,_,S,S,_,_,_,_,_,_,_,_), // 0
    // Row 1: Hands gripping position
    rL(_,_,_,_,_,_,S,S,O,_,_,_,_,_,_,_,_,_,_,_,_,O,S,S,_,_,_,_,_,_,_,_), // 1
    // Row 2: Arms nearly straight
    rL(_,_,_,_,_,_,S,SD,O,_,_,_,_,_,_,_,_,_,_,_,_,O,SD,S,_,_,_,_,_,_,_,_), // 2
    // Row 3: Top of head with arms on sides
    rL(_,_,_,_,_,O,S,O,O,O,O,O,O,O,O,O,O,O,O,O,S,O,_,_,_,_,_,_,_,_,_,_),      // 3
    // Row 4: Hair
    rL(_,_,_,_,_,_,O,O,H,H,H,H,H,H,H,H,H,H,H,H,O,_,_,_,_,_,_,_,_,_,_,_),    // 4
    r(O,H,H,H,H,H,H,H,H,H,H,H,H,H,O),                             // 5
    // Row 6-8: Face
    r(O,S,S,S,S,S,S,S,S,S,S,S,S,S,O),                               // 6
    r(O,S,E,EP,S,S,S,S,S,S,S,EP,E,S,O),                             // 7
    r(O,S,S,S,S,S,SD,SD,S,S,S,S,S,S,O),                             // 8
    // Row 9: Mouth, chin
    r(O,S,S,S,S,S,M,M,S,S,S,S,S,S,O),                               // 9
    r(O,S,S,S,S,S,S,S,S,S,S,S,S,O),                                  // 10
    // Row 11: Neck
    r(O,S,S,S,SD,SD,S,S,O),                                          // 11
    // Row 12-14: Shoulders/torso
    r(O,T,T,T,T,T,T,T,T,T,T,T,T,T,T,O),                             // 12
    r(O,T,T,T,T,T,T,T,T,T,T,T,T,T,T,O),                             // 13
    r(O,T,T,T,T,T,T,T,T,T,T,T,T,T,T,O),                             // 14
    r(O,T,T,TD,T,T,T,T,T,T,T,T,TD,T,T,O),                           // 15
    r(O,T,T,T,T,T,T,T,T,T,T,T,T,T,T,O),                             // 16
    r(O,T,T,T,TD,T,T,T,T,T,T,TD,T,T,T,O),                           // 17
    r(O,T,T,T,T,T,T,T,T,T,T,T,T,T,T,O),                             // 18
    r(O,T,T,T,TD,T,T,T,T,T,T,TD,T,T,T,O),                           // 19
    ...IDLE.slice(20),
];

// ============================================================
// PRESS FRAME 4 - Full lockout, arms straight overhead
// Barbell at very top, arms fully extended — powerful pose
// ============================================================
export const PRESS_4 = [
    // Row 0: Arms fully extended overhead (barbell drawn programmatically)
    rL(_,_,_,_,_,S,S,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,S,S,_,_,_,_,_,_,_), // 0
    // Row 1: Hands gripping position
    rL(_,_,_,_,_,S,S,O,_,_,_,_,_,_,_,_,_,_,_,_,_,_,O,S,S,_,_,_,_,_,_,_),  // 1
    // Row 2-3: Arms fully extended
    rL(_,_,_,_,_,S,SD,O,_,_,_,_,_,_,_,_,_,_,_,_,_,_,O,SD,S,_,_,_,_,_,_,_), // 2
    rL(_,_,_,_,O,S,S,O,_,_,_,_,_,_,_,_,_,_,_,_,_,_,O,S,S,O,_,_,_,_,_,_),      // 3
    // Row 4: Top of head / hair between arms
    rL(_,_,_,_,O,S,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,S,O,_,_,_,_,_,_,_),     // 4
    rL(_,_,_,_,_,O,O,H,H,H,H,H,H,H,H,H,H,H,H,H,H,O,O,_,_,_,_,_,_,_,_,_),    // 5
    r(O,H,H,H,H,H,H,H,H,H,H,H,H,H,O),                             // 6
    // Row 7-9: Face
    r(O,S,S,S,S,S,S,S,S,S,S,S,S,S,O),                               // 7
    r(O,S,E,EP,S,S,S,S,S,S,S,EP,E,S,O),                             // 8
    r(O,S,S,S,S,S,SD,SD,S,S,S,S,S,S,O),                             // 9
    r(O,S,S,S,S,S,M,M,S,S,S,S,S,S,O),                               // 10
    r(O,S,S,S,S,S,S,S,S,S,S,S,S,O),                                  // 11
    // Row 12: Neck
    r(O,S,S,S,SD,SD,S,S,O),                                          // 12
    // Row 13-19: Torso
    r(O,T,T,T,T,T,T,T,T,T,T,T,T,T,T,O),                             // 13
    r(O,T,T,T,T,T,T,T,T,T,T,T,T,T,T,O),                             // 14
    r(O,T,T,TD,T,T,T,T,T,T,T,T,TD,T,T,O),                           // 15
    r(O,T,T,T,T,T,T,T,T,T,T,T,T,T,T,O),                             // 16
    r(O,T,T,T,TD,T,T,T,T,T,T,TD,T,T,T,O),                           // 17
    r(O,T,T,T,T,T,T,T,T,T,T,T,T,T,T,O),                             // 18
    r(O,T,T,T,TD,T,T,T,T,T,T,TD,T,T,T,O),                           // 19
    ...IDLE.slice(20),
];

// PRESS FRAME 5 - Coming back down (same as PRESS_3)
export const PRESS_5 = PRESS_3;

// PRESS FRAME 6 - Coming back down (same as PRESS_1)
export const PRESS_6 = PRESS_1;

// ============================================================
// VICTORY FLEX POSE - Double bicep flex, triumphant
// Both arms raised and flexed, big grin
// ============================================================
export const VICTORY_FLEX = [
    // Row 0-3: Head
    r(O,O,O,O,O,O,O,O,O,O,O,O),                                    // 0
    r(O,H,H,H,H,H,H,H,H,H,H,H,H,O),                               // 1
    r(O,H,H,H,H,H,H,H,H,H,H,H,H,H,O),                             // 2
    r(O,H,H,H,H,H,H,H,H,H,H,H,H,H,O),                             // 3
    // Row 4-6: Face
    r(O,S,S,S,S,S,S,S,S,S,S,S,S,S,O),                               // 4
    r(O,S,S,S,S,S,S,S,S,S,S,S,S,S,O),                               // 5
    r(O,S,E,EP,S,S,S,S,S,S,S,EP,E,S,O),                             // 6
    // Row 7-9: Big grin
    r(O,S,S,S,S,S,SD,SD,S,S,S,S,S,S,O),                             // 7
    r(O,S,S,S,M,M,E,E,M,M,S,S,S,S,O),                               // 8
    r(O,S,S,S,S,M,M,S,S,S,S,S,S,O),                                  // 9
    // Row 10-11: Neck
    r(O,S,S,S,S,S,S,S,S,O),                                          // 10
    r(O,S,S,S,SD,SD,S,S,O),                                          // 11
    // Row 12-15: Shoulders with arms raised (dumbbells at top)
    rL(_,_,O,W,O,_,O,S,O,S,S,S,O,T,T,T,T,T,T,T,T,O,S,S,S,O,S,O,_,O,W,O),    // 12
    rL(_,_,O,W,O,O,S,SD,O,S,S,O,T,T,T,T,T,T,T,T,T,T,O,S,S,O,SD,S,O,O,W,O),  // 13
    rL(_,O,WD,O,S,S,S,O,S,S,O,T,T,T,T,T,T,T,T,T,T,O,S,S,O,S,S,S,O,WD,O,_),  // 14
    rL(_,_,_,O,S,S,SD,O,_,O,T,T,TD,T,T,T,T,TD,T,T,O,_,O,SD,S,S,O,_,_,_,_,_), // 15
    // Row 16-19: Torso
    r(O,O,_,O,T,T,T,T,T,T,T,T,T,T,T,T,O,_,O,O),                    // 16
    r(O,T,T,T,TD,T,T,T,T,T,T,TD,T,T,T,O),                           // 17
    r(O,T,T,T,T,T,T,T,T,T,T,T,T,T,T,O),                             // 18
    r(O,T,T,T,TD,T,T,T,T,T,T,TD,T,T,T,O),                           // 19
    // Row 20-24: Lower torso, belt
    r(O,T,T,T,T,T,T,T,T,T,T,T,T,T,T,O),                             // 20
    r(O,T,T,T,T,T,T,T,T,T,T,T,T,T,T,O),                             // 21
    r(O,T,T,T,T,T,T,T,T,T,T,T,T,T,T,O),                             // 22
    r(O,T,T,T,T,T,T,T,T,T,T,T,T,T,T,O),                             // 23
    r(O,O,O,O,O,BK,BK,O,O,BK,BK,O,O,O,O,O),                        // 24
    // Row 25-29: Shorts
    r(O,P,P,P,P,P,P,P,P,P,P,P,P,P,P,O),                             // 25
    r(O,P,P,P,P,P,P,P,P,P,P,P,P,P,P,O),                             // 26
    r(O,P,P,PD,P,P,P,O,O,P,P,P,PD,P,P,O),                           // 27
    r(O,P,P,P,P,P,P,O,O,P,P,P,P,P,P,O),                             // 28
    r(O,P,P,PD,P,P,O,_,_,O,P,P,PD,P,P,O),                           // 29
    // Row 30-44: Legs and feet (same as idle)
    ...IDLE.slice(30, 45),
    // Row 45-47: Padding
    empty(), // 45
    empty(), // 46
    empty(), // 47
];

// ============================================================
// SAD/DEFEATED POSE - Head down, slumped shoulders
// ============================================================
export const SAD_POSE = [
    // Row 0-1: Empty (head lower due to slump)
    empty(), // 0
    empty(), // 1
    // Row 2-5: Top of head / hair (shifted down 2px)
    r(O,O,O,O,O,O,O,O,O,O,O,O),                                     // 2
    r(O,H,H,H,H,H,H,H,H,H,H,H,H,O),                                // 3
    r(O,H,H,H,H,H,H,H,H,H,H,H,H,H,O),                              // 4
    r(O,H,H,H,H,H,H,H,H,H,H,H,H,H,O),                              // 5
    // Row 6-8: Face (sad, looking down)
    r(O,S,S,S,S,S,S,S,S,S,S,S,S,S,O),                                // 6
    r(O,S,S,S,S,S,S,S,S,S,S,S,S,S,O),                                // 7
    r(O,S,O,O,S,S,S,S,S,S,S,O,O,S,O),                                // 8
    // Row 9-11: Sad mouth, chin
    r(O,S,S,S,S,S,SD,SD,S,S,S,S,S,S,O),                              // 9
    r(O,S,S,S,S,M,S,S,M,S,S,S,S,S,O),                                // 10
    r(O,S,S,S,M,M,M,M,S,S,S,S,S,O),                                  // 11
    // Row 12-13: Neck
    r(O,S,S,S,S,S,S,S,S,O),                                           // 12
    r(O,S,S,S,SD,SD,S,S,O),                                           // 13
    // Row 14-17: Shoulders drooped
    r(O,O,S,S,O,T,T,T,T,T,T,T,T,O,S,S,O,O),                         // 14
    r(O,S,S,S,O,T,T,T,T,T,T,T,T,T,T,O,S,S,S,O),                     // 15
    r(O,S,S,S,O,T,T,T,TD,T,T,T,T,TD,T,T,O,S,S,S,O),                 // 16
    r(O,S,SD,S,O,T,T,T,T,T,T,T,T,T,T,T,O,S,SD,S,O),                 // 17
    // Row 18-21: Torso, arms drooping
    r(O,S,S,O,O,T,T,T,T,T,T,T,T,T,T,O,O,S,S,O),                     // 18
    r(O,S,S,O,T,T,T,TD,T,T,T,T,TD,T,T,T,O,S,S,O),                   // 19
    r(O,S,O,O,T,T,T,T,T,T,T,T,T,T,T,T,O,O,S,O),                     // 20
    r(O,SD,O,T,T,T,T,T,T,T,T,T,T,T,T,T,T,O,SD,O),                   // 21
    // Row 22-24: Lower torso, belt
    r(O,O,T,T,T,T,T,T,T,T,T,T,T,T,T,T,O,O),                         // 22
    r(O,T,T,T,T,T,T,T,T,T,T,T,T,T,T,O),                              // 23
    r(O,O,O,O,O,BK,BK,O,O,BK,BK,O,O,O,O,O),                         // 24
    // Row 25-29: Shorts
    r(O,P,P,P,P,P,P,P,P,P,P,P,P,P,P,O),                              // 25
    r(O,P,P,P,P,P,P,P,P,P,P,P,P,P,P,O),                              // 26
    r(O,P,P,PD,P,P,P,O,O,P,P,P,PD,P,P,O),                            // 27
    r(O,P,P,P,P,P,P,O,O,P,P,P,P,P,P,O),                              // 28
    r(O,P,P,PD,P,P,O,_,_,O,P,P,PD,P,P,O),                            // 29
    // Row 30-44: Legs and feet (same as idle)
    ...IDLE.slice(30, 45),
    // Padding
    empty(), // 45
    empty(), // 46
    empty(), // 47
];

// ============================================================
// Animation definitions for the AnimationPlayer
// ============================================================

/**
 * Full overhead press animation cycle (8 frames):
 * idle -> press_1 -> press_2 -> press_3 -> press_4 -> press_3 -> press_2 -> press_1
 * The frameDuration is dynamically set based on typing speed.
 */
export const BODYBUILDER_ANIMATIONS = {
    idle: {
        frames: [IDLE],
        frameDuration: 1.0,
    },
    press: {
        frames: [IDLE, PRESS_1, PRESS_2, PRESS_3, PRESS_4, PRESS_3, PRESS_2, PRESS_1],
        frameDuration: 0.15,
    },
    victory: {
        frames: [VICTORY_FLEX],
        frameDuration: 1.0,
    },
    sad: {
        frames: [SAD_POSE],
        frameDuration: 1.0,
    },
};

/** Sprite dimensions for positioning calculations. */
export const BODYBUILDER_WIDTH = 32;
export const BODYBUILDER_HEIGHT = 48;
