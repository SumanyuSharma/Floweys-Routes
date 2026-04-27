import Phaser from 'phaser'
import { FONT, GAME_WIDTH, GAME_HEIGHT } from '../constants'

interface CardData {
  text:      string
  nextScene: string
  prevScene?: string
}

/**
 * A brief narrator card shown between encounter scenes.
 * Black background, centered gray italic text, Z/Enter/Space to continue.
 */
export class NarratorCardScene extends Phaser.Scene {
  private cardText!:  Phaser.GameObjects.Text
  private hintText!:  Phaser.GameObjects.Text
  private zKey!:      Phaser.Input.Keyboard.Key
  private enterKey!:  Phaser.Input.Keyboard.Key
  private spaceKey!:  Phaser.Input.Keyboard.Key

  private nextScene:   string       = ''
  private prevScene:   string | null = null
  private backKey!:    Phaser.Input.Keyboard.Key
  private canAdvance:  boolean = false
  private leaving:     boolean = false

  constructor() {
    super({ key: 'NarratorCard' })
  }

  init(data: CardData): void {
    this.nextScene  = data.nextScene ?? 'Ruins'
    this.prevScene  = data.prevScene ?? null
    this.canAdvance = false
    this.leaving    = false

    // Store text via registry so it survives the scene restart
    this.registry.set('_ncText', data.text ?? '')
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#000000')

    this.cardText = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 20,
      this.registry.get('_ncText') as string,
      {
        fontFamily:  FONT,
        fontSize:    '11px',
        color:       '#888888',
        align:       'center',
        fontStyle:   'italic',
        wordWrap:    { width: 560 },
        lineSpacing: 10,
      },
    ).setOrigin(0.5).setAlpha(0).setDepth(1)

    this.hintText = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT - 44, 'Press Z to continue',
      {
        fontFamily: FONT,
        fontSize:   '8px',
        color:      '#333333',
      },
    ).setOrigin(0.5).setAlpha(0).setDepth(1)

    const kb = this.input.keyboard!
    this.zKey     = kb.addKey(Phaser.Input.Keyboard.KeyCodes.Z)
    this.enterKey = kb.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
    this.spaceKey = kb.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    this.backKey  = kb.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)

    // Fade in text, then reveal hint, then allow Z
    this.tweens.add({
      targets:  this.cardText,
      alpha:    0.85,
      duration: 700,
      ease:     'Sine.Out',
    })
    this.time.delayedCall(1400, () => {
      this.tweens.add({ targets: this.hintText, alpha: 1, duration: 400 })
      this.canAdvance = true
    })
  }

  update(): void {
    if (!this.canAdvance || this.leaving) return

    if (this.prevScene && Phaser.Input.Keyboard.JustDown(this.backKey)) {
      this.leaving = true
      this.tweens.add({
        targets:    [this.cardText, this.hintText],
        alpha:      0,
        duration:   300,
        onComplete: () => {
          this.cameras.main.fadeOut(500, 0, 0, 0)
          this.cameras.main.once(
            Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
            () => this.scene.start(this.prevScene!),
          )
        },
      })
      return
    }

    const pressed =
      Phaser.Input.Keyboard.JustDown(this.zKey)     ||
      Phaser.Input.Keyboard.JustDown(this.enterKey) ||
      Phaser.Input.Keyboard.JustDown(this.spaceKey)

    if (!pressed) return

    this.leaving    = true
    this.canAdvance = false

    this.tweens.add({
      targets:  [this.cardText, this.hintText],
      alpha:    0,
      duration: 300,
      onComplete: () => {
        this.cameras.main.fadeOut(500, 0, 0, 0)
        this.cameras.main.once(
          Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
          () => this.scene.start(this.nextScene),
        )
      },
    })
  }
}
