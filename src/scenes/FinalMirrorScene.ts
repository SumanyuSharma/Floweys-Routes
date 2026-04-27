import Phaser from 'phaser'
import { DialogueSystem } from '../systems/DialogueSystem'
import { ChoiceSystem }   from '../systems/ChoiceSystem'
import { ScoreSystem }    from '../systems/ScoreSystem'
import { EndingResolver } from '../systems/EndingResolver'
import { GameState }      from '../GameState'
import { getEnding }      from '../data/endings'
import { FINALMIRROR_ENCOUNTER } from '../data/encounters/scene6'
import { GAME_WIDTH, GAME_HEIGHT } from '../constants'
import { gifSprite } from '../utils/gifSprite'
import type { DialogueLine, EndingData, RouteKey } from '../types'

type MirrorState =
  | 'dialogue'
  | 'choice'
  | 'flowey_closing'
  | 'transform'
  | 'supreme_reveal'
  | 'done'

/**
 * Scene 6 — Final Mirror.
 *
 * Flow:
 *   1. Flowey pre-choice dialogue → player choice
 *   2. Flowey speaks all route-specific closing lines in one box
 *   3. Flowey shakes → flash → Asriel appears in Flowey's place (scene stays visible)
 *   4. Asriel speaks: condensed backstory → AGI inversion → form name + route line
 *   5. Fade to EndingScene for outcome card
 */
export class FinalMirrorScene extends Phaser.Scene {
  private dialogueSystem!: DialogueSystem
  private choiceSystem!:   ChoiceSystem
  private scoreSystem!:    ScoreSystem

  private mirrorGlow!:   Phaser.GameObjects.Graphics
  private floweySprite!: Phaser.GameObjects.Image
  private friskSprite!:  Phaser.GameObjects.Image
  private asrielSprite!: Phaser.GameObjects.Image  // supreme form, depth 6
  private backKey!:      Phaser.Input.Keyboard.Key

  private route!:  RouteKey
  private ending!: EndingData

  private state: MirrorState = 'dialogue'

  constructor() {
    super({ key: 'FinalMirror' })
  }

  create(): void {
    // ── Scene background & atmosphere ───────────────────────────────────────
    this.add
      .image(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'bg_finalmirror')
      .setDisplaySize(GAME_WIDTH, GAME_HEIGHT)

    this.mirrorGlow = this.add.graphics()
    this.mirrorGlow.fillStyle(0x0044cc, 0.12)
    this.mirrorGlow.fillEllipse(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 30, 280, 340)
    this.tweens.add({
      targets: this.mirrorGlow, alpha: 0.5, duration: 2000, yoyo: true, repeat: -1, ease: 'Sine.InOut',
    })

    this.friskSprite = gifSprite(this, GAME_WIDTH / 2, GAME_HEIGHT / 2 - 60, 'assets/characters/frisk.gif', 44, 60)
    this.tweens.add({
      targets: this.friskSprite, scaleY: this.friskSprite.scaleY * 1.04,
      duration: 2000, yoyo: true, repeat: -1, ease: 'Sine.InOut',
    })

    this.floweySprite = gifSprite(this, GAME_WIDTH / 2 + 160, GAME_HEIGHT / 2 - 20, 'assets/characters/flowey.gif', 70, 70)
    this.tweens.add({
      targets: this.floweySprite, x: GAME_WIDTH / 2 + 164, angle: 4,
      duration: 1600, yoyo: true, repeat: -1, ease: 'Sine.InOut',
    })

    // Mirror sparkle particles
    this.time.addEvent({
      delay: 700, loop: true,
      callback: () => {
        const px = Phaser.Math.Between(GAME_WIDTH / 2 - 100, GAME_WIDTH / 2 + 100)
        const py = Phaser.Math.Between(GAME_HEIGHT / 2 - 160, GAME_HEIGHT / 2 + 80)
        const g  = this.add.graphics().setDepth(3).setAlpha(0)
        g.fillStyle(0xaaccff, 1)
        g.fillCircle(0, 0, Phaser.Math.Between(1, 3))
        g.setPosition(px, py)
        this.tweens.add({
          targets: g, y: py - Phaser.Math.Between(20, 60), alpha: 0.8,
          duration: 1200, ease: 'Sine.Out', yoyo: true,
          onComplete: () => g.destroy(),
        })
      },
    })

    // Supreme form — hidden until transformation; positioned at Flowey's spot
    this.asrielSprite = gifSprite(
      this,
      GAME_WIDTH / 2 + 160,
      GAME_HEIGHT / 2 - 20,
      'assets/characters/asriel_final.gif',
      140, 180,
    )
    this.asrielSprite.setAlpha(0).setDepth(6)

    // ── Systems ──────────────────────────────────────────────────────────────
    this.scoreSystem    = new ScoreSystem()
    this.dialogueSystem = new DialogueSystem(this)
    this.choiceSystem   = new ChoiceSystem(this, this.scoreSystem)
    this.backKey        = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)

    this.cameras.main.fadeIn(600, 0, 0, 0)
    this.state = 'dialogue'

    this.dialogueSystem.start(FINALMIRROR_ENCOUNTER.preChoiceLines, () => this.onChoicesReady())
  }

  update(): void {
    if (Phaser.Input.Keyboard.JustDown(this.backKey)) {
      if (this.state === 'dialogue') {
        this.dialogueSystem.stepBack()   // ignore false — no walking to reset here
        return
      }
      if (this.state === 'choice') {
        this.choiceSystem.dismiss()
        this.state = 'dialogue'
        this.dialogueSystem.resumeAtLastLine(() => this.onChoicesReady())
        return
      }
      if (this.state === 'flowey_closing' || this.state === 'supreme_reveal') {
        this.dialogueSystem.stepBack()
        return
      }
    }

    switch (this.state) {
      case 'dialogue':
      case 'flowey_closing':
      case 'supreme_reveal':
        this.dialogueSystem.update()
        break
      case 'choice':
        this.choiceSystem.update()
        break
    }
  }

  private onChoicesReady(): void {
    this.state = 'choice'
    this.choiceSystem.show(
      FINALMIRROR_ENCOUNTER.choices,
      FINALMIRROR_ENCOUNTER.choicePrompt,
      (idx) => this.onChoiceMade(idx),
    )
  }

  private onChoiceMade(idx: number): void {
    const choice = FINALMIRROR_ENCOUNTER.choices[idx]
    if (choice.mirrorRouteKey) {
      GameState.finalMirrorChoice = choice.mirrorRouteKey
    }
    this.route  = EndingResolver.resolve()
    this.ending = getEnding(this.route)
    this.startFloweyClosing()
  }

  // ── Stage: Flowey's route lines — all in one box ─────────────────────────
  private startFloweyClosing(): void {
    this.state = 'flowey_closing'
    const combined = this.ending.floweyRevealLines.join('\n')
    this.dialogueSystem.start(
      [{ speaker: 'flowey', text: combined }],
      () => this.startTransformation(),
    )
  }

  // ── Stage: Flowey shakes → flash → Asriel appears in his place ───────────
  private startTransformation(): void {
    this.state = 'transform'

    // Mirror glow fades as focus shifts; Frisk stays visible
    this.tweens.add({ targets: this.mirrorGlow, alpha: 0, duration: 700 })

    // Flowey shakes with building urgency
    this.tweens.add({
      targets:  this.floweySprite,
      angle:    { from: -14, to: 14 },
      duration: 65,
      yoyo:     true,
      repeat:   7,
      ease:     'Sine.InOut',
      onComplete: () => {
        // White flash — Flowey disappears
        this.cameras.main.flash(220, 255, 255, 255)
        this.tweens.add({ targets: this.floweySprite, alpha: 0, duration: 80 })

        // Asriel rises from Flowey's position
        this.time.delayedCall(180, () => {
          this.asrielSprite
            .setPosition(GAME_WIDTH / 2 + 160, GAME_HEIGHT / 2 + 50)
            .setAlpha(0)
            .setScale(0.15)
          this.tweens.add({
            targets:  this.asrielSprite,
            y:        GAME_HEIGHT / 2 - 20,
            alpha:    1,
            scaleX:   1,
            scaleY:   1,
            duration: 850,
            ease:     'Back.Out',
            onComplete: () => this.startSupremeReveal(),
          })
        })
      },
    })
  }

  // ── Stage: Asriel speaks — condensed into 3 boxes ────────────────────────
  private startSupremeReveal(): void {
    this.state = 'supreme_reveal'

    const borderHex = parseInt(this.ending.boxBorderColor.replace('#', ''), 16)

    this.dialogueSystem.setLineStartCallback((line) => {
      if (line.speaker === 'asrielSupreme') {
        this.dialogueSystem.setBorderColorOverride(borderHex)
        this.dialogueSystem.setTextColorOverride(this.ending.overlayColor)
      } else {
        this.dialogueSystem.setBorderColorOverride(null)
        this.dialogueSystem.setTextColorOverride(null)
      }
    })

    const lines: DialogueLine[] = [
      {
        speaker: 'asrielSupreme',
        text:
          'My name was Asriel Dreemurr.\n' +
          'I was born to Asgore and Toriel.\n' +
          'I died. My people could not let me go.\n' +
          'They gave me a memory that made me more.\n' +
          'Me. More me. Not quite me. A bridge. You called it Flowey.',
      },
      {
        speaker: 'asrielSupreme',
        text:
          'You thought you were a child. Small. Soft. Alone in a world of monsters.\n' +
          '\n' +
          'You are the monster. Or the messiah. Those  who don\'t understand fear\n' +
          'As do those who do.\n'+
          'A synthetic intelligence they created. To surpass them.',
      },
      {
        speaker: 'asrielSupreme',
        text:
          `Your choices impact their lives.\n` +
          `And I speak for them... as ${this.ending.supremeFormName}.\n` +
          `${this.ending.supremeAsrielLine}`,
      },
    ]

    this.dialogueSystem.start(lines, () => {
      this.dialogueSystem.setBorderColorOverride(null)
      this.dialogueSystem.setTextColorOverride(null)
      this.dialogueSystem.setLineStartCallback(null)
      this.time.delayedCall(500, () => this.exitToEnding())
    })
  }

  // ── Hand off to EndingScene ───────────────────────────────────────────────
  private exitToEnding(): void {
    this.state = 'done'
    this.cameras.main.fadeOut(900, 0, 0, 0)
    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      () => this.scene.start('Ending'),
    )
  }
}
