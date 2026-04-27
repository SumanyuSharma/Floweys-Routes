import Phaser from 'phaser'
import { FONT, GAME_WIDTH, GAME_HEIGHT } from '../constants'

const PANEL_COUNT   = 10
const PANEL_MS      = 9_000
const LAST_EXTRA_MS = 3_000
const FADE_MS       = 600

const PANEL_TEXTS: string[] = [
  'Long ago, two races ruled\nover Earth',
  'One day, war broke out\nbetween the races',
  'After a long battle,\nthere was a stalemate',
  'They divided up their worlds\nwith a magic spell',
  'Many years later...',
  'Legends say that those who climb\nthe mountain never return',
  '', '', '', '',
]

const PANEL_5_SUBTEXT = 'MT. EBOTT   201X'

export class OpeningTitlesScene extends Phaser.Scene {
  private panelImg:  Phaser.GameObjects.Image | null = null
  private panelText: Phaser.GameObjects.Text | null  = null
  private subText:   Phaser.GameObjects.Text | null  = null
  private music:     Phaser.Sound.BaseSound | null   = null

  private zKey!:     Phaser.Input.Keyboard.Key
  private enterKey!: Phaser.Input.Keyboard.Key
  private spaceKey!: Phaser.Input.Keyboard.Key
  private rightKey!: Phaser.Input.Keyboard.Key

  private currentIdx   = 0
  private canAdvance   = false   // true once the panel has fully faded in
  private transitioning = false  // true while a fade is in progress
  private done         = false

  // Stored so they can be cancelled on early Z press
  private autoTimer: Phaser.Time.TimerEvent | null = null
  private panTween:  Phaser.Tweens.Tween   | null = null

  constructor() {
    super({ key: 'OpeningTitles' })
  }

  create(): void {
    this.done          = false
    this.currentIdx    = 0
    this.canAdvance    = false
    this.transitioning = false
    this.autoTimer     = null
    this.panTween      = null

    this.music = this.sound.add('music_opening', { volume: 0.75, loop: false })
    this.music.play()

    this.zKey     = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.Z)
    this.enterKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
    this.spaceKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    this.rightKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

    this.cameras.main.setBackgroundColor('#000000')
    this.showPanel(0)
  }

  update(): void {
    if (!this.canAdvance || this.transitioning || this.done) return
    const pressed =
      this.zKey.isDown     ||
      this.enterKey.isDown ||
      this.spaceKey.isDown ||
      this.rightKey.isDown
    if (pressed) this.startTransitionOut()
  }

  // ── Show a single panel ───────────────────────────────────────────────────
  private showPanel(idx: number): void {
    this.currentIdx    = idx
    this.canAdvance    = false
    this.transitioning = true

    // Clean up previous objects
    this.panelImg?.destroy()
    this.panelText?.destroy()
    this.subText?.destroy()
    this.panelImg  = null
    this.panelText = null
    this.subText   = null

    const key    = `opening_${idx + 1}`
    const isLast = idx === PANEL_COUNT - 1
    const total  = PANEL_MS + (isLast ? LAST_EXTRA_MS : 0)

    // ── Image ──────────────────────────────────────────────────────────────
    const img = this.add.image(0, 0, key).setDepth(0)

    if (isLast) {
      // Panel 10 is 320×350 — scale 2.5× → 800×875; pan bottom→top
      const scaleX   = GAME_WIDTH / img.width
      const scaledH  = img.height * scaleX         // 875 px
      const overflow = scaledH - GAME_HEIGHT        // 275 px
      img.setOrigin(0.5, 0)
        .setScale(scaleX)
        .setPosition(GAME_WIDTH / 2, -overflow)    // shows bottom 600 px

      this.panTween = this.tweens.add({
        targets:  img,
        y:        0,
        duration: total - FADE_MS * 2,
        delay:    FADE_MS,
        ease:     'Linear',
      })
    } else {
      img.setOrigin(0.5, 0.5)
        .setScale(GAME_WIDTH / img.width)
        .setPosition(GAME_WIDTH / 2, GAME_HEIGHT / 2)
    }
    this.panelImg = img

    // ── Text ───────────────────────────────────────────────────────────────
    const txt = PANEL_TEXTS[idx]
    if (txt) {
      this.panelText = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT - 68, txt, {
        fontFamily:      FONT,
        fontSize:        '11px',
        color:           '#ffffff',
        align:           'center',
        stroke:          '#000000',
        strokeThickness: 3,
        shadow: { offsetX: 0, offsetY: 2, color: '#000000', blur: 4, fill: true },
      }).setOrigin(0.5, 0.5).setDepth(2)
    }

    if (idx === 4) {
      this.subText = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT - 44, PANEL_5_SUBTEXT, {
        fontFamily:      FONT,
        fontSize:        '13px',
        color:           '#ffffcc',
        align:           'center',
        stroke:          '#000000',
        strokeThickness: 3,
        shadow: { offsetX: 0, offsetY: 2, color: '#000000', blur: 4, fill: true },
      }).setOrigin(0.5, 0.5).setDepth(2)
    }

    // ── Fade in → enable Z → schedule auto-advance ─────────────────────────
    this.cameras.main.fadeIn(FADE_MS, 0, 0, 0)

    // Z becomes available once the panel has fully faded in
    this.time.delayedCall(FADE_MS, () => {
      this.transitioning = false
      this.canAdvance    = true
    })

    // Auto-advance fires (total - FADE_MS) ms after the panel appears
    // so that the fade-out completes exactly at the end of 'total'
    this.autoTimer = this.time.delayedCall(total - FADE_MS, () => {
      this.startTransitionOut()
    })
  }

  // ── Begin the fade-out (called by Z press OR auto-timer) ─────────────────
  private startTransitionOut(): void {
    if (this.transitioning || this.done) return
    this.transitioning = true
    this.canAdvance    = false

    // Cancel auto-timer and pan so they don't fire again
    this.autoTimer?.remove(false)
    this.autoTimer = null
    this.panTween?.stop()
    this.panTween = null

    this.cameras.main.fadeOut(FADE_MS, 0, 0, 0)

    this.time.delayedCall(FADE_MS, () => {
      if (this.currentIdx === PANEL_COUNT - 1) {
        this.finish()
      } else {
        this.showPanel(this.currentIdx + 1)
      }
    })
  }

  // ── Hand off to ColdOpen ──────────────────────────────────────────────────
  private finish(): void {
    if (this.done) return
    this.done = true
    this.music?.stop()
    this.scene.start('ColdOpen')
  }

  shutdown(): void {
    this.music?.stop()
  }
}
