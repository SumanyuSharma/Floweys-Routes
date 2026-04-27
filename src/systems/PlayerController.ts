import Phaser from 'phaser'
import { PLAYER_SPEED, GAME_WIDTH, GAME_HEIGHT } from '../constants'

// Keep Frisk above the dialogue box area (420px) with a small buffer
const MAX_Y = GAME_HEIGHT - 200

/**
 * Moves a sprite with arrow-key / WASD input.
 * Clamps position inside the safe play area.
 */
export class PlayerController {
  private sprite:  Phaser.GameObjects.Image
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys
  private wasd: {
    up:    Phaser.Input.Keyboard.Key
    down:  Phaser.Input.Keyboard.Key
    left:  Phaser.Input.Keyboard.Key
    right: Phaser.Input.Keyboard.Key
  }
  private _enabled: boolean = false

  constructor(scene: Phaser.Scene, sprite: Phaser.GameObjects.Image) {
    this.sprite  = sprite
    this.cursors = scene.input.keyboard!.createCursorKeys()

    const kb = scene.input.keyboard!
    this.wasd = {
      up:    kb.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      down:  kb.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      left:  kb.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: kb.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    }
  }

  enable():  void { this._enabled = true  }
  disable(): void { this._enabled = false }

  get enabled(): boolean { return this._enabled }

  /** Call inside scene update(). delta is Phaser's delta in milliseconds. */
  update(delta: number): void {
    if (!this._enabled) return

    const dt    = delta / 1000
    const speed = PLAYER_SPEED

    if (this.cursors.left.isDown  || this.wasd.left.isDown)  this.sprite.x -= speed * dt
    if (this.cursors.right.isDown || this.wasd.right.isDown) this.sprite.x += speed * dt
    if (this.cursors.up.isDown    || this.wasd.up.isDown)    this.sprite.y -= speed * dt
    if (this.cursors.down.isDown  || this.wasd.down.isDown)  this.sprite.y += speed * dt

    this.sprite.x = Phaser.Math.Clamp(this.sprite.x, 20, GAME_WIDTH  - 20)
    this.sprite.y = Phaser.Math.Clamp(this.sprite.y, 20, MAX_Y)
  }
}
