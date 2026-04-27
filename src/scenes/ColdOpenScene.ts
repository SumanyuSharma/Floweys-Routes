import Phaser from 'phaser'
import { DialogueSystem } from '../systems/DialogueSystem'
import { COLDOPEN_LINES } from '../data/encounters/scene0'
import { GAME_WIDTH, GAME_HEIGHT } from '../constants'

/**
 * Scene 0 — Cold Open.
 * Sequence: black → Frisk falls → background fades in → Flowey grows → monologue.
 */
export class ColdOpenScene extends Phaser.Scene {
  private dialogueSystem!: DialogueSystem
  private leftKey!: Phaser.Input.Keyboard.Key

  constructor() {
    super({ key: 'ColdOpen' })
  }

  create(): void {
    // ── Background (ruins, dimmed) — starts invisible ───────────
    const bg = this.add
      .image(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'bg_ruins')
      .setDisplaySize(GAME_WIDTH, GAME_HEIGHT)
      .setAlpha(0)

    // ── Frisk — starts above screen ─────────────────────────────
    const frisk = this.add
      .image(GAME_WIDTH / 2, -60, 'char_frisk')
      .setDisplaySize(44, 60)

    // ── Soul (hidden until after fall) ──────────────────────────
    const soul = this.add
      .image(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 40, 'ui_heart')
      .setDisplaySize(28, 28)
      .setTint(0xff0000)
      .setAlpha(0)

    // ── Flowey — starts at scale 0 ──────────────────────────────
    const flowey = this.add
      .image(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 80, 'char_flowey')
      .setDisplaySize(110, 110)
      .setScale(0)
      .setAlpha(0)

    this.leftKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)

    // ── Opening sequence ────────────────────────────────────────
    // 1. Play fall sound, Frisk drops into frame
    this.sound.play('snd_fall', { volume: 0.7 })

    this.tweens.add({
      targets:  frisk,
      y:        GAME_HEIGHT / 2 + 30,
      duration: 700,
      ease:     'Bounce.Out',
      onComplete: () => {
        // 2. Background fades in
        this.tweens.add({ targets: bg, alpha: 0.25, duration: 600 })

        // 3. Soul flickers in
        this.tweens.add({
          targets:  soul,
          alpha:    1,
          duration: 400,
          onComplete: () => {
            this.tweens.add({
              targets:  soul,
              alpha:    0.15,
              duration: 700,
              yoyo:     true,
              repeat:   -1,
            })
          },
        })

        // 4. Flowey grows from the crack
        this.time.delayedCall(400, () => {
          flowey.setAlpha(1)
          this.tweens.add({
            targets:  flowey,
            scaleX:   1,
            scaleY:   1,
            duration: 500,
            ease:     'Back.Out',
            onComplete: () => {
              // 5. Start monologue after brief pause
              this.time.delayedCall(300, () => this.startDialogue())
            },
          })
        })
      },
    })
  }

  private startDialogue(): void {
    this.dialogueSystem = new DialogueSystem(this)
    this.dialogueSystem.start(COLDOPEN_LINES, () => {
      this.cameras.main.fadeOut(800, 0, 0, 0)
      this.cameras.main.once(
        Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
        () => this.scene.start('Ruins'),
      )
    })
  }

  update(): void {
    if (this.dialogueSystem) {
      if (Phaser.Input.Keyboard.JustDown(this.leftKey)) {
        this.dialogueSystem.stepBack()  // does nothing at line 0
      }
      this.dialogueSystem.update()
    }
  }
}
