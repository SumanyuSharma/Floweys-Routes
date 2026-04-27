import Phaser from 'phaser'
import { EndingResolver } from '../systems/EndingResolver'
import { OutcomeCard }    from '../ui/OutcomeCard'
import { TitleCard }      from '../ui/TitleCard'
import { getEnding }      from '../data/endings'
import { GAME_WIDTH, GAME_HEIGHT } from '../constants'
import type { RouteKey, EndingData } from '../types'

type Stage = 'cards' | 'title' | 'done'

export class EndingScene extends Phaser.Scene {
  private route!:  RouteKey
  private ending!: EndingData
  private zKey!:      Phaser.Input.Keyboard.Key
  private enterKey!:  Phaser.Input.Keyboard.Key
  private spaceKey!:  Phaser.Input.Keyboard.Key
  private rightKey!:  Phaser.Input.Keyboard.Key
  private backKey!:   Phaser.Input.Keyboard.Key
  private stage:   Stage = 'cards'
  private zReady          = false
  private resumeAtTitle   = false

  private bgGraphics!:     Phaser.GameObjects.Graphics
  private symbolGraphics!: Phaser.GameObjects.Graphics

  private activeCard: OutcomeCard | null = null
  private titleCard:  TitleCard   | null = null

  constructor() {
    super({ key: 'Ending' })
  }

  init(data: { resumeAtTitle?: boolean }): void {
    this.resumeAtTitle = data?.resumeAtTitle ?? false
  }

  create(): void {
    this.route  = EndingResolver.resolve()
    this.ending = getEnding(this.route)

    this.bgGraphics = this.add.graphics().setDepth(0)
    this.bgGraphics.fillStyle(this.ending.backgroundTint, 1)
    this.bgGraphics.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

    this.symbolGraphics = this.add.graphics().setDepth(1).setAlpha(0)
    this.drawSymbolicBackground()

    const kb      = this.input.keyboard!
    this.zKey     = kb.addKey(Phaser.Input.Keyboard.KeyCodes.Z)
    this.enterKey = kb.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
    this.spaceKey = kb.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    this.rightKey = kb.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    this.backKey  = kb.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)

    if (this.resumeAtTitle) {
      this.symbolGraphics.setAlpha(0.18)
      this.startTitleCard(true)
    } else {
      this.tweens.add({ targets: this.symbolGraphics, alpha: 0.18, duration: 900 })
      this.cameras.main.fadeIn(600, 0, 0, 0)
      this.time.delayedCall(700, () => this.startCards())
    }
  }

  update(): void {
    if (Phaser.Input.Keyboard.JustDown(this.backKey)) {
      if (this.stage === 'title') {
        // Back from title card → outcome card (instant, already seen)
        this.titleCard?.destroy()
        this.titleCard  = null
        this.activeCard = new OutcomeCard(
          this,
          this.ending.outcomeCards.join('\n'),
          this.ending.overlayColor,
          true,
        )
        this.stage  = 'cards'
        this.zReady = true
      }
      // 'cards' stage: disabled — would require going back to FinalMirrorScene
      return
    }

    const anyJust =
      Phaser.Input.Keyboard.JustDown(this.zKey)      ||
      Phaser.Input.Keyboard.JustDown(this.enterKey)  ||
      Phaser.Input.Keyboard.JustDown(this.spaceKey)  ||
      Phaser.Input.Keyboard.JustDown(this.rightKey)

    if (this.zReady && anyJust && this.stage === 'cards') {
      this.advanceCard()
    }
  }

  // ── Outcome card — all lines combined into one ───────────────────────────
  private startCards(): void {
    this.stage  = 'cards'
    this.zReady = false
    this.activeCard?.destroy()
    this.activeCard = new OutcomeCard(
      this,
      this.ending.outcomeCards.join('\n'),
      this.ending.overlayColor,
    )
    this.time.delayedCall(500, () => { this.zReady = true })
  }

  private advanceCard(): void {
    this.zReady = false
    this.activeCard?.fadeOut(() => {
      this.activeCard?.destroy()
      this.activeCard = null
      this.startTitleCard()
    })
  }

  // ── Title card ───────────────────────────────────────────────────────────
  private startTitleCard(instant = false): void {
    this.stage     = 'title'
    this.zReady    = false
    this.titleCard = new TitleCard(
      this,
      this.ending.titleCard,
      this.ending.finalLine,
      this.ending.overlayColor,
      () => { this.startDone() },
      instant,
    )
  }

  // ── Done → Debrief ───────────────────────────────────────────────────────
  private startDone(): void {
    this.stage = 'done'
    this.cameras.main.fadeOut(1000, 0, 0, 0)
    this.time.delayedCall(1100, () => {
      this.scene.start('Debrief', { route: this.route })
    })
  }

  // ── Symbolic background shapes ───────────────────────────────────────────
  private drawSymbolicBackground(): void {
    const g   = this.symbolGraphics
    const col = parseInt(this.ending.overlayColor.replace('#', ''), 16)
    const w   = GAME_WIDTH
    const h   = GAME_HEIGHT
    const cx  = w / 2
    const cy  = h / 2

    g.clear()
    g.lineStyle(1, col, 1)

    switch (this.route) {
      case 'libertarian':
        for (let y = 30; y < h; y += 28) {
          g.beginPath(); g.moveTo(0, y); g.lineTo(w, y); g.strokePath()
        }
        break

      case 'egalitarian':
        for (let r = 20; r < 360; r += 36) {
          g.strokeCircle(cx, cy, r)
        }
        break

      case 'benevolentDictator':
        for (let a = -70; a <= 70; a += 8) {
          const rad = (a * Math.PI) / 180
          g.beginPath()
          g.moveTo(cx, 20)
          g.lineTo(cx + Math.sin(rad) * 520, 20 + Math.cos(rad) * 520)
          g.strokePath()
        }
        break

      case 'gatekeeper':
        for (let x = 30; x < w; x += 48) {
          g.beginPath(); g.moveTo(x, 0); g.lineTo(x, h); g.strokePath()
        }
        g.beginPath(); g.moveTo(0, cy); g.lineTo(w, cy); g.strokePath()
        break

      case 'protectorGod':
        g.strokeEllipse(cx, cy, 420, 190)
        g.strokeCircle(cx, cy, 55)
        g.strokeCircle(cx, cy, 14)
        for (let a = 0; a < 360; a += 30) {
          const rad = (a * Math.PI) / 180
          const rx = Math.cos(rad), ry = Math.sin(rad)
          g.beginPath()
          g.moveTo(cx + rx * 215, cy + ry * 100)
          g.lineTo(cx + rx * 245, cy + ry * 115)
          g.strokePath()
        }
        break

      case 'enslavedGod':
        g.strokeCircle(cx, cy, 100)
        for (let x = cx - 130; x <= cx + 130; x += 26) {
          g.beginPath(); g.moveTo(x, cy - 150); g.lineTo(x, cy + 150); g.strokePath()
        }
        g.beginPath(); g.moveTo(cx - 150, cy - 150); g.lineTo(cx + 150, cy - 150); g.strokePath()
        g.beginPath(); g.moveTo(cx - 150, cy + 150); g.lineTo(cx + 150, cy + 150); g.strokePath()
        break

      case 'conqueror':
        for (let a = 0; a < 360; a += 12) {
          const rad = (a * Math.PI) / 180
          g.beginPath()
          g.moveTo(cx, cy)
          g.lineTo(cx + Math.cos(rad) * 500, cy + Math.sin(rad) * 500)
          g.strokePath()
        }
        break

      case 'descendants':
        this.drawBranch(g, cx, h - 10, -Math.PI / 2, 190, 5)
        break

      case 'zookeeper':
        for (let x = 40; x < w; x += 55) {
          g.beginPath(); g.moveTo(x, 0); g.lineTo(x, h); g.strokePath()
        }
        for (let y = 40; y < h; y += 55) {
          g.beginPath(); g.moveTo(0, y); g.lineTo(w, y); g.strokePath()
        }
        break

      case 'nineteenEightyFour':
        for (let x = 80; x < w; x += 80) {
          g.beginPath(); g.moveTo(x, 0); g.lineTo(x, h); g.strokePath()
        }
        for (let y = 80; y < h; y += 80) {
          g.beginPath(); g.moveTo(0, y); g.lineTo(w, y); g.strokePath()
        }
        g.strokeCircle(cx, cy, 42)
        g.strokeCircle(cx, cy, 14)
        break

      case 'reversion':
        for (let i = 0; i < 9; i++) {
          const m = i * 32 + 16
          g.strokeRect(m, m, w - m * 2, h - m * 2)
        }
        break
    }
  }

  private drawBranch(
    g:      Phaser.GameObjects.Graphics,
    x:      number,
    y:      number,
    angle:  number,
    length: number,
    depth:  number,
  ): void {
    if (depth === 0 || length < 12) return
    const ex = x + Math.cos(angle) * length
    const ey = y + Math.sin(angle) * length
    g.beginPath(); g.moveTo(x, y); g.lineTo(ex, ey); g.strokePath()
    this.drawBranch(g, ex, ey, angle - 0.42, length * 0.68, depth - 1)
    this.drawBranch(g, ex, ey, angle + 0.42, length * 0.68, depth - 1)
  }

  destroy(): void {
    this.activeCard?.destroy()
  }
}
