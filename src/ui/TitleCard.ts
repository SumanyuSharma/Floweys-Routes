import Phaser from 'phaser'
import { FONT, GAME_WIDTH, GAME_HEIGHT } from '../constants'

/** Full-screen title card shown at the very end of the ending sequence. Auto-advances. */
export class TitleCard {
  private objects: Phaser.GameObjects.GameObject[]
  private tweens:  Phaser.Tweens.Tween[]
  private timer:   Phaser.Time.TimerEvent | null
  private _dead:   boolean

  constructor(
    scene:       Phaser.Scene,
    title:       string,
    finalLine:   string,
    accentColor: string,
    onComplete:  () => void,
    instant      = false,
  ) {
    this.objects = []
    this.tweens  = []
    this.timer   = null
    this._dead   = false

    const bg = scene.add
      .rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x000000)
      .setDepth(25)
      .setAlpha(0)
    this.objects.push(bg)

    const titleText = scene.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 48, title, {
        fontFamily: FONT,
        fontSize:   '20px',
        color:      accentColor,
        align:      'center',
        wordWrap:   { width: 680 },
        lineSpacing: 8,
      })
      .setOrigin(0.5)
      .setDepth(26)
      .setAlpha(0)
    this.objects.push(titleText)

    const finalText = scene.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 48, finalLine, {
        fontFamily:  FONT,
        fontSize:    '11px',
        color:       '#666666',
        align:       'center',
        wordWrap:    { width: 680 },
        lineSpacing: 6,
      })
      .setOrigin(0.5)
      .setDepth(26)
      .setAlpha(0)
    this.objects.push(finalText)

    const scheduleHold = () => {
      if (this._dead) return
      this.timer = scene.time.delayedCall(2400, () => {
        if (this._dead) return
        const t = scene.tweens.add({
          targets:    [bg, titleText, finalText],
          alpha:      0,
          duration:   900,
          onComplete: () => { if (!this._dead) onComplete() },
        })
        this.tweens.push(t)
      })
    }

    if (instant) {
      bg.setAlpha(1)
      titleText.setAlpha(1)
      finalText.setAlpha(1)
      scheduleHold()
    } else {
      const t = scene.tweens.add({
        targets:    [bg, titleText, finalText],
        alpha:      1,
        duration:   700,
        onComplete: scheduleHold,
      })
      this.tweens.push(t)
    }
  }

  destroy(): void {
    this._dead = true
    this.timer?.remove(false)
    this.tweens.forEach(t => t.stop())
    this.objects.forEach(o => o.destroy())
    this.objects = []
    this.tweens  = []
  }
}
