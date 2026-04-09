/**
 * SpriteRenderer - Draws 2D pixel art sprite arrays to a canvas context.
 * Each sprite is a 2D array of hex color strings (or null for transparent pixels).
 */
export class SpriteRenderer {
    /**
     * Draw a sprite data array to the canvas.
     * @param {CanvasRenderingContext2D} ctx - The canvas context
     * @param {(string|null)[][]} spriteData - 2D array [row][col] of hex colors or null
     * @param {number} x - X position (top-left) in base resolution pixels
     * @param {number} y - Y position (top-left) in base resolution pixels
     * @param {number} [scale=1] - Pixel scale (1 = 1 base pixel per sprite pixel)
     */
    static draw(ctx, spriteData, x, y, scale = 1) {
        for (let row = 0; row < spriteData.length; row++) {
            const rowData = spriteData[row];
            for (let col = 0; col < rowData.length; col++) {
                const color = rowData[col];
                if (color !== null) {
                    ctx.fillStyle = color;
                    ctx.fillRect(
                        x + col * scale,
                        y + row * scale,
                        scale,
                        scale
                    );
                }
            }
        }
    }

    /**
     * Draw a sprite flipped horizontally.
     * @param {CanvasRenderingContext2D} ctx
     * @param {(string|null)[][]} spriteData
     * @param {number} x
     * @param {number} y
     * @param {number} [scale=1]
     */
    static drawFlipped(ctx, spriteData, x, y, scale = 1) {
        for (let row = 0; row < spriteData.length; row++) {
            const rowData = spriteData[row];
            const w = rowData.length;
            for (let col = 0; col < w; col++) {
                const color = rowData[w - 1 - col];
                if (color !== null) {
                    ctx.fillStyle = color;
                    ctx.fillRect(
                        x + col * scale,
                        y + row * scale,
                        scale,
                        scale
                    );
                }
            }
        }
    }

    /**
     * Draw a sprite with a tint overlay (for flash effects, damage, etc.).
     * @param {CanvasRenderingContext2D} ctx
     * @param {(string|null)[][]} spriteData
     * @param {number} x
     * @param {number} y
     * @param {string} tintColor - Hex color to overlay
     * @param {number} tintAlpha - Alpha for the tint (0-1)
     * @param {number} [scale=1]
     */
    static drawTinted(ctx, spriteData, x, y, tintColor, tintAlpha, scale = 1) {
        SpriteRenderer.draw(ctx, spriteData, x, y, scale);
        ctx.globalAlpha = tintAlpha;
        for (let row = 0; row < spriteData.length; row++) {
            const rowData = spriteData[row];
            for (let col = 0; col < rowData.length; col++) {
                if (rowData[col] !== null) {
                    ctx.fillStyle = tintColor;
                    ctx.fillRect(
                        x + col * scale,
                        y + row * scale,
                        scale,
                        scale
                    );
                }
            }
        }
        ctx.globalAlpha = 1.0;
    }
}

/**
 * AnimationPlayer - Manages frame-based sprite animation playback.
 */
export class AnimationPlayer {
    /**
     * @param {Object} animations - Map of animation name to { frames: spriteData[], frameDuration: number }
     */
    constructor(animations) {
        this.animations = animations;
        this.currentAnim = null;
        this.currentFrame = 0;
        this.elapsed = 0;
        this.loop = true;
        this.finished = false;
    }

    /**
     * Switch to a named animation.
     * @param {string} name - Animation name
     * @param {boolean} [loop=true] - Whether to loop
     */
    play(name, loop = true) {
        if (this.currentAnim === name) return;
        this.currentAnim = name;
        this.currentFrame = 0;
        this.elapsed = 0;
        this.loop = loop;
        this.finished = false;
    }

    /**
     * Update the animation timer.
     * @param {number} dt - Delta time in seconds
     */
    update(dt) {
        if (!this.currentAnim || this.finished) return;
        const anim = this.animations[this.currentAnim];
        if (!anim) return;

        this.elapsed += dt;
        if (this.elapsed >= anim.frameDuration) {
            this.elapsed -= anim.frameDuration;
            this.currentFrame++;
            if (this.currentFrame >= anim.frames.length) {
                if (this.loop) {
                    this.currentFrame = 0;
                } else {
                    this.currentFrame = anim.frames.length - 1;
                    this.finished = true;
                }
            }
        }
    }

    /**
     * Set the animation speed (frame duration) dynamically.
     * @param {number} frameDuration - Seconds per frame
     */
    setSpeed(frameDuration) {
        if (this.currentAnim && this.animations[this.currentAnim]) {
            this.animations[this.currentAnim].frameDuration = frameDuration;
        }
    }

    /**
     * Get the current frame's sprite data.
     * @returns {(string|null)[][]|null}
     */
    getFrame() {
        if (!this.currentAnim) return null;
        const anim = this.animations[this.currentAnim];
        if (!anim) return null;
        return anim.frames[this.currentFrame] || null;
    }

    /**
     * Draw the current frame at the given position.
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} x
     * @param {number} y
     * @param {number} [scale=1]
     */
    render(ctx, x, y, scale = 1) {
        const frame = this.getFrame();
        if (frame) {
            SpriteRenderer.draw(ctx, frame, x, y, scale);
        }
    }
}
