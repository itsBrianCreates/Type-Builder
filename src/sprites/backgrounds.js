/**
 * Background and stage art for Type Builder
 * Drawn procedurally to canvas (256x240 base resolution)
 * NES-authentic color palette
 *
 * Each background is a function that takes (ctx) and draws to the full 256x240 canvas.
 */

// --- Background palette ---
const BRICK = '#A04820';
const BRICK_DARK = '#803818';
const BRICK_MORTAR = '#C8B098';
const FLOOR_LIGHT = '#C09060';
const FLOOR_DARK = '#906838';
const FLOOR_LINE = '#786030';
const WALL_TOP = '#584028';
const RACK_METAL = '#808080';
const RACK_DARK = '#505050';
const WEIGHT_PLATE = '#383838';
const WEIGHT_DARK = '#202020';
const MIRROR = '#B0C8E0';
const MIRROR_SHINE = '#D8E8F8';
const MIRROR_FRAME = '#C8A060';
const POSTER_BG = '#E8D078';
const GYM_CEILING = '#484038';
const RUBBER_MAT = '#303830';

const STAGE_FLOOR = '#8B4513';
const STAGE_DARK = '#5C2D06';
const CURTAIN = '#8B0000';
const CURTAIN_DARK = '#600000';
const CURTAIN_LIGHT = '#B02020';
const SPOTLIGHT = '#FFFDE0';
const SPOTLIGHT_DIM = '#FFF8B0';
const STAGE_TRIM = '#F8D878';

const PODIUM_GOLD = '#FFD700';
const PODIUM_GOLD_DARK = '#C8A800';
const PODIUM_SILVER = '#C0C0C0';
const PODIUM_SILVER_DARK = '#909090';
const PODIUM_BRONZE = '#CD7F32';
const PODIUM_BRONZE_DARK = '#9A5E1F';
const PODIUM_LABEL = '#FFFFFF';

// ============================================================
// GYM BACKGROUND (256x240)
// Brick wall, weight rack, gym floor, mirror
// ============================================================
export function drawGymBackground(ctx) {
    const W = 256;
    const H = 240;

    // --- Ceiling ---
    ctx.fillStyle = GYM_CEILING;
    ctx.fillRect(0, 0, W, 16);

    // --- Ceiling lights (fluorescent) ---
    ctx.fillStyle = '#F0F0E0';
    ctx.fillRect(30, 8, 40, 4);
    ctx.fillRect(110, 8, 40, 4);
    ctx.fillRect(190, 8, 40, 4);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(32, 9, 36, 2);
    ctx.fillRect(112, 9, 36, 2);
    ctx.fillRect(192, 9, 36, 2);

    // --- Brick wall (rows 16 to 155) ---
    const wallTop = 16;
    const wallBottom = 155;

    // Base mortar color
    ctx.fillStyle = BRICK_MORTAR;
    ctx.fillRect(0, wallTop, W, wallBottom - wallTop);

    // Draw bricks in staggered pattern
    const brickW = 16;
    const brickH = 8;
    const mortarSize = 1;

    for (let y = wallTop; y < wallBottom; y += brickH + mortarSize) {
        const rowIndex = Math.floor((y - wallTop) / (brickH + mortarSize));
        const offset = (rowIndex % 2 === 0) ? 0 : brickW / 2;

        for (let x = -brickW; x < W + brickW; x += brickW + mortarSize) {
            const bx = x + offset;
            // Alternate brick colors for variety
            const colorVariant = ((Math.floor(bx / brickW) + rowIndex) % 3);
            if (colorVariant === 0) {
                ctx.fillStyle = BRICK;
            } else if (colorVariant === 1) {
                ctx.fillStyle = BRICK_DARK;
            } else {
                ctx.fillStyle = '#904020';
            }
            ctx.fillRect(
                Math.max(0, bx),
                y,
                Math.min(brickW, W - bx),
                brickH
            );
        }
    }

    // --- Wall trim ---
    ctx.fillStyle = WALL_TOP;
    ctx.fillRect(0, wallBottom, W, 4);

    // --- Mirror on wall (centered) ---
    const mirrorX = 88;
    const mirrorY = 40;
    const mirrorW = 80;
    const mirrorH = 70;

    ctx.fillStyle = MIRROR_FRAME;
    ctx.fillRect(mirrorX - 3, mirrorY - 3, mirrorW + 6, mirrorH + 6);
    ctx.fillStyle = MIRROR;
    ctx.fillRect(mirrorX, mirrorY, mirrorW, mirrorH);
    // Shine streak
    ctx.fillStyle = MIRROR_SHINE;
    ctx.fillRect(mirrorX + 4, mirrorY + 4, 3, mirrorH - 8);
    ctx.fillRect(mirrorX + 9, mirrorY + 4, 1, mirrorH - 8);

    // --- Weight rack (left side) ---
    _drawWeightRack(ctx, 8, 50, 60);

    // --- Dumbbell rack (right side) ---
    _drawDumbbellRack(ctx, 200, 65, 80);

    // (poster removed)

    // --- Gym floor ---
    const floorY = wallBottom + 4;

    // Main floor
    ctx.fillStyle = FLOOR_LIGHT;
    ctx.fillRect(0, floorY, W, H - floorY);

    // Floor boards
    for (let x = 0; x < W; x += 32) {
        ctx.fillStyle = FLOOR_LINE;
        ctx.fillRect(x, floorY, 1, H - floorY);
    }

    // Baseboard
    ctx.fillStyle = WALL_TOP;
    ctx.fillRect(0, floorY - 1, W, 2);
}

/** Draw a weight plate rack */
function _drawWeightRack(ctx, x, y, height) {
    // Rack uprights
    ctx.fillStyle = RACK_METAL;
    ctx.fillRect(x, y, 3, height);
    ctx.fillRect(x + 30, y, 3, height);

    // Crossbars
    ctx.fillStyle = RACK_DARK;
    ctx.fillRect(x, y, 33, 2);
    ctx.fillRect(x, y + height - 2, 33, 2);
    ctx.fillRect(x, y + 20, 33, 2);
    ctx.fillRect(x, y + 40, 33, 2);

    // Weight plates on rack
    const plateColors = [WEIGHT_PLATE, WEIGHT_DARK, WEIGHT_PLATE];
    for (let i = 0; i < 3; i++) {
        const py = y + 5 + i * 20;
        ctx.fillStyle = plateColors[i];
        ctx.fillRect(x + 6, py, 8, 12);
        ctx.fillRect(x + 18, py, 8, 12);
        ctx.fillStyle = WEIGHT_DARK;
        ctx.fillRect(x + 6, py, 8, 1);
        ctx.fillRect(x + 18, py, 8, 1);
    }
}

/** Draw a dumbbell rack */
function _drawDumbbellRack(ctx, x, y, height) {
    // Rack frame
    ctx.fillStyle = RACK_METAL;
    ctx.fillRect(x, y, 3, height);
    ctx.fillRect(x + 40, y, 3, height);
    ctx.fillStyle = RACK_DARK;
    ctx.fillRect(x, y, 43, 2);

    // Shelves with dumbbells
    for (let shelf = 0; shelf < 3; shelf++) {
        const sy = y + 10 + shelf * 24;
        // Shelf
        ctx.fillStyle = RACK_DARK;
        ctx.fillRect(x + 2, sy, 39, 2);
        // Dumbbells (pairs)
        for (let d = 0; d < 3; d++) {
            const dx = x + 6 + d * 12;
            // Handle
            ctx.fillStyle = RACK_METAL;
            ctx.fillRect(dx + 2, sy - 4, 6, 3);
            // Plates
            ctx.fillStyle = WEIGHT_PLATE;
            ctx.fillRect(dx, sy - 6, 3, 6);
            ctx.fillRect(dx + 7, sy - 6, 3, 6);
        }
    }
}

// ============================================================
// COMPETITION STAGE BACKGROUND (256x240)
// Raised platform, spotlights, curtain backdrop
// ============================================================
export function drawStageBackground(ctx) {
    const W = 256;
    const H = 240;

    // --- Dark background ---
    ctx.fillStyle = '#0A0A1A';
    ctx.fillRect(0, 0, W, H);

    // --- Curtain backdrop ---
    // Main curtain
    for (let x = 0; x < W; x += 8) {
        const fold = (x % 16 === 0) ? CURTAIN : CURTAIN_DARK;
        ctx.fillStyle = fold;
        ctx.fillRect(x, 0, 8, 160);
    }
    // Curtain highlights (vertical folds)
    for (let x = 4; x < W; x += 16) {
        ctx.fillStyle = CURTAIN_LIGHT;
        ctx.fillRect(x, 0, 2, 160);
    }
    // Curtain header/valance
    ctx.fillStyle = STAGE_TRIM;
    ctx.fillRect(0, 0, W, 8);
    ctx.fillStyle = '#C8A040';
    ctx.fillRect(0, 8, W, 3);
    // Scalloped valance
    for (let x = 0; x < W; x += 16) {
        ctx.fillStyle = STAGE_TRIM;
        ctx.fillRect(x + 2, 11, 12, 6);
        ctx.fillRect(x + 4, 17, 8, 3);
    }

    // --- Spotlight beams (triangular light cones) ---
    ctx.globalAlpha = 0.08;
    ctx.fillStyle = SPOTLIGHT;
    // Left spotlight
    _drawSpotlightCone(ctx, 40, 0, 20, 160, 60);
    // Center spotlight
    _drawSpotlightCone(ctx, 128, 0, 20, 160, 70);
    // Right spotlight
    _drawSpotlightCone(ctx, 216, 0, 20, 160, 60);
    ctx.globalAlpha = 1.0;

    // --- Spotlight fixtures ---
    ctx.fillStyle = '#404040';
    ctx.fillRect(35, 2, 10, 6);
    ctx.fillRect(123, 2, 10, 6);
    ctx.fillRect(211, 2, 10, 6);
    ctx.fillStyle = SPOTLIGHT_DIM;
    ctx.fillRect(37, 7, 6, 3);
    ctx.fillRect(125, 7, 6, 3);
    ctx.fillRect(213, 7, 6, 3);

    // --- Stage platform ---
    const stageY = 160;
    const stageH = 20;

    // Stage top surface
    ctx.fillStyle = STAGE_FLOOR;
    ctx.fillRect(0, stageY, W, stageH);
    // Stage front edge
    ctx.fillStyle = STAGE_DARK;
    ctx.fillRect(0, stageY + stageH - 3, W, 3);
    // Gold trim along edge
    ctx.fillStyle = STAGE_TRIM;
    ctx.fillRect(0, stageY, W, 2);
    ctx.fillRect(0, stageY + stageH - 4, W, 1);

    // Wood plank lines on stage
    ctx.fillStyle = STAGE_DARK;
    for (let x = 0; x < W; x += 20) {
        ctx.fillRect(x, stageY + 2, 1, stageH - 5);
    }

    // --- Below stage (dark) ---
    ctx.fillStyle = '#0A0A1A';
    ctx.fillRect(0, stageY + stageH, W, H - stageY - stageH);

    // Stage front decorative panel
    ctx.fillStyle = '#1A0A0A';
    ctx.fillRect(0, stageY + stageH, W, 12);
    // Gold stars on front panel
    ctx.fillStyle = STAGE_TRIM;
    for (let x = 20; x < W; x += 40) {
        // Simple 5-pixel star
        ctx.fillRect(x, stageY + stageH + 4, 5, 1);
        ctx.fillRect(x + 2, stageY + stageH + 2, 1, 5);
        ctx.fillRect(x + 1, stageY + stageH + 3, 3, 3);
    }

    // --- Floor below stage ---
    ctx.fillStyle = '#181820';
    ctx.fillRect(0, stageY + stageH + 12, W, H - stageY - stageH - 12);
}

/** Draw a spotlight cone (simplified trapezoid) */
function _drawSpotlightCone(ctx, centerX, topY, topWidth, bottomY, bottomWidth) {
    const steps = bottomY - topY;
    for (let i = 0; i < steps; i++) {
        const t = i / steps;
        const w = topWidth + (bottomWidth - topWidth) * t;
        const x = centerX - w / 2;
        ctx.fillRect(Math.round(x), topY + i, Math.round(w), 1);
    }
}

// ============================================================
// PODIUM SCENE (256x240)
// 1st/2nd/3rd place podium blocks on the stage
// ============================================================
export function drawPodiumScene(ctx) {
    const W = 256;
    const H = 240;

    // Draw the stage background first
    drawStageBackground(ctx);

    // --- Podium blocks on the stage ---
    // Positioned on the stage surface (stageY = 160)
    const stageY = 160;
    const podiumBaseY = stageY; // podiums sit on the stage

    // 1st place (center, tallest)
    const firstX = 103;
    const firstW = 50;
    const firstH = 48;
    const firstY = podiumBaseY - firstH;

    ctx.fillStyle = PODIUM_GOLD;
    ctx.fillRect(firstX, firstY, firstW, firstH);
    ctx.fillStyle = PODIUM_GOLD_DARK;
    ctx.fillRect(firstX, firstY + firstH - 4, firstW, 4); // base shadow
    ctx.fillRect(firstX + firstW - 4, firstY, 4, firstH); // right shadow
    // "1" label
    ctx.fillStyle = PODIUM_LABEL;
    ctx.fillRect(firstX + 22, firstY + firstH - 16, 6, 1);  // top of 1
    ctx.fillRect(firstX + 24, firstY + firstH - 16, 2, 10); // stem
    ctx.fillRect(firstX + 20, firstY + firstH - 6, 10, 2);  // base
    // Gold trim
    ctx.fillStyle = STAGE_TRIM;
    ctx.fillRect(firstX, firstY, firstW, 2);

    // 2nd place (left, medium height)
    const secondX = 40;
    const secondW = 50;
    const secondH = 36;
    const secondY = podiumBaseY - secondH;

    ctx.fillStyle = PODIUM_SILVER;
    ctx.fillRect(secondX, secondY, secondW, secondH);
    ctx.fillStyle = PODIUM_SILVER_DARK;
    ctx.fillRect(secondX, secondY + secondH - 4, secondW, 4);
    ctx.fillRect(secondX + secondW - 4, secondY, 4, secondH);
    // "2" label
    ctx.fillStyle = PODIUM_LABEL;
    ctx.fillRect(secondX + 20, secondY + secondH - 16, 8, 2);  // top bar
    ctx.fillRect(secondX + 26, secondY + secondH - 14, 2, 4);  // right side
    ctx.fillRect(secondX + 20, secondY + secondH - 10, 8, 2);  // middle
    ctx.fillRect(secondX + 20, secondY + secondH - 8, 2, 4);   // left side
    ctx.fillRect(secondX + 20, secondY + secondH - 6, 10, 2);  // bottom

    // 3rd place (right, shortest)
    const thirdX = 166;
    const thirdW = 50;
    const thirdH = 26;
    const thirdY = podiumBaseY - thirdH;

    ctx.fillStyle = PODIUM_BRONZE;
    ctx.fillRect(thirdX, thirdY, thirdW, thirdH);
    ctx.fillStyle = PODIUM_BRONZE_DARK;
    ctx.fillRect(thirdX, thirdY + thirdH - 4, thirdW, 4);
    ctx.fillRect(thirdX + thirdW - 4, thirdY, 4, thirdH);
    // "3" label
    ctx.fillStyle = PODIUM_LABEL;
    ctx.fillRect(thirdX + 20, thirdY + thirdH - 16, 8, 2);  // top
    ctx.fillRect(thirdX + 26, thirdY + thirdH - 14, 2, 4);  // right upper
    ctx.fillRect(thirdX + 20, thirdY + thirdH - 10, 8, 2);  // middle
    ctx.fillRect(thirdX + 26, thirdY + thirdH - 8, 2, 4);   // right lower
    ctx.fillRect(thirdX + 20, thirdY + thirdH - 6, 8, 2);   // bottom
}

/**
 * Podium position data for placing character sprites on top of podiums.
 * x,y coordinates are where the bottom-center of each character should be placed.
 */
export const PODIUM_POSITIONS = {
    first:  { x: 128, y: 112, podiumHeight: 48 },
    second: { x: 65,  y: 124, podiumHeight: 36 },
    third:  { x: 191, y: 134, podiumHeight: 26 },
};

/**
 * Stage positions for the 4-character lineup during competition reveal.
 * Evenly spaced across the stage.
 */
export const STAGE_LINEUP_POSITIONS = [
    { x: 40,  y: 160 },  // position 0 (leftmost)
    { x: 100, y: 160 },  // position 1
    { x: 156, y: 160 },  // position 2
    { x: 216, y: 160 },  // position 3 (rightmost)
];
