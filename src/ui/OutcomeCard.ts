import Phaser from 'phaser'
import { FONT, GAME_WIDTH, GAME_HEIGHT } from '../constants'

/** Full-screen card shown between the supreme Asriel dialogue and the title card. */
export class OutcomeCard {
  private bg:    Phaser.GameObjects.Rectangle
  private text:  Phaser.GameObjects.Text
  private scene: Phaser.Scene

  constructor(scene: Phaser.Scene, cardText: string, accentColor: string, instant = false) {
    this.scene = scene

    this.bg = scene.add
      .rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x000000)
      .setDepth(20)
      .setAlpha(0)

    this.text = scene.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT / 2, cardText, {
        fontFamily: FONT,
        fontSize:   '13px',
        color:      accentColor,
        align:      'center',
        wordWrap:   { width: 560 },
        lineSpacing: 10,
      })
      .setOrigin(0.5)
      .setDepth(21)
      .setAlpha(0)

    if (instant) {
      this.bg.setAlpha(1)
      this.text.setAlpha(1)
    } else {
      scene.tweens.add({ targets: [this.bg, this.text], alpha: 1, duration: 350 })
    }
  }

  fadeOut(onComplete: () => void): void {
    this.scene.tweens.add({
      targets:    [this.bg, this.text],
      alpha:      0,
      duration:   250,
      onComplete,
    })
  }

  destroy(): void {
    this.bg.destroy()
    this.text.destroy()
  }
}
