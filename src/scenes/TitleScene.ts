import Phaser from 'phaser'
import { FONT, GAME_WIDTH, GAME_HEIGHT } from '../constants'
import { GameState } from '../GameState'
import { gifSprite } from '../utils/gifSprite'

export class TitleScene extends Phaser.Scene {
  private zKey!:      Phaser.Input.Keyboard.Key
  private _enterKey!: Phaser.Input.Keyboard.Key
  private _spaceKey!: Phaser.Input.Keyboard.Key

  constructor() {
    super({ key: 'Title' })
  }

  create(): void {
    GameState.reset()

    // ── Background Flowey (dim, atmospheric — animated GIF) ───
    const flowey = gifSprite(this, GAME_WIDTH - 110, GAME_HEIGHT - 80, 'assets/characters/flowey.gif', 190, 220)
    flowey.setAlpha(0.12).setDepth(0)

    this.tweens.add({
      targets:  flowey,
      alpha:    0.20,
      duration: 2200,
      yoyo:     true,
      repeat:   -1,
      ease:     'Sine.InOut',
    })

    // ── Soul flicker (small heart near press-Z prompt) ────────
    const soul = this.add
      .image(GAME_WIDTH / 2 - 38, GAME_HEIGHT / 2 + 60, 'ui_heart')
      .setDisplaySize(10, 10)
      .setAlpha(0)
      .setDepth(1)

    this.tweens.add({
      targets:  soul,
      alpha:    0.55,
      duration: 800,
      yoyo:     true,
      repeat:   -1,
      ease:     'Sine.InOut',
    })

    // ── Title ─────────────────────────────────────────────────
    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 70, "FLOWEY'S ROUTES", {
      fontFamily: FONT,
      fontSize:   '28px',
      color:      '#ffffff',
    }).setOrigin(0.5).setDepth(2)

    // ── Subtitle ──────────────────────────────────────────────
    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 10, 'a hidden scenario', {
      fontFamily: FONT,
      fontSize:   '11px',
      color:      '#555555',
    }).setOrigin(0.5).setDepth(2)

    // ── Press Z / Enter (soul sits to the left of this) ──────
    const pressZ = this.add.text(GAME_WIDTH / 2 + 10, GAME_HEIGHT / 2 + 60, 'Press  Z  /  Enter', {
      fontFamily: FONT,
      fontSize:   '13px',
      color:      '#ffffff',
    }).setOrigin(0.5).setDepth(2)

    this.tweens.add({
      targets:  pressZ,
      alpha:    0,
      duration: 500,
      yoyo:     true,
      repeat:   -1,
    })

    // ── Controls hint ─────────────────────────────────────────
    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 104,
      'Use arrow keys to move\nZ to select or continue',
      {
        fontFamily: FONT,
        fontSize:   '7px',
        color:      '#444444',
        align:      'center',
      },
    ).setOrigin(0.5).setDepth(2)

    // ── Input ──────────────────────────────────────────────────
    const kb = this.input.keyboard!
    this.zKey = kb.addKey(Phaser.Input.Keyboard.KeyCodes.Z)
    this._enterKey = kb.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
    this._spaceKey = kb.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
  }

  update(): void {
    if (
      Phaser.Input.Keyboard.JustDown(this.zKey)      ||
      Phaser.Input.Keyboard.JustDown(this._enterKey) ||
      Phaser.Input.Keyboard.JustDown(this._spaceKey)
    ) {
      this.scene.start('OpeningTitles')
    }
  }
}
