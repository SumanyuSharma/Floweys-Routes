import Phaser from 'phaser'
import { PlayerController } from '../systems/PlayerController'
import { DialogueSystem }   from '../systems/DialogueSystem'
import { ChoiceSystem }     from '../systems/ChoiceSystem'
import { ScoreSystem }      from '../systems/ScoreSystem'
import { GAME_WIDTH, GAME_HEIGHT } from '../constants'
import { gifSprite } from '../utils/gifSprite'
import type { EncounterData } from '../types'

type EncounterState = 'walking' | 'dialogue' | 'choice' | 'done'

/**
 * Shared base for all encounter scenes (Ruins through NewHome).
 * Flow: walk → trigger → preChoiceLines → choice → postChoiceLines →
 *        floweyInterjection (Flowey sprite slides in) → fade → nextScene
 *
 * Subclasses implement:
 *   get encounterData()  — scene-specific EncounterData
 *   get nextSceneKey()   — Phaser scene key to transition to
 *   get triggerX()       — x position that starts the encounter
 *   addCharacters()      — place NPC sprites (called after background)
 */
export abstract class BaseEncounterScene extends Phaser.Scene {
  protected abstract get encounterData(): EncounterData
  protected abstract get nextSceneKey(): string
  protected abstract get triggerX(): number
  protected abstract addCharacters(): void

  protected frisk!:  Phaser.GameObjects.Image
  private floweySprite!: Phaser.GameObjects.Image

  private playerCtrl!:     PlayerController
  private dialogueSystem!: DialogueSystem
  private choiceSystem!:   ChoiceSystem
  private scoreSystem!:    ScoreSystem
  private backKey!:        Phaser.Input.Keyboard.Key

  private state:            EncounterState = 'walking'
  private triggered:        boolean        = false
  private selectedChoiceIdx: number        = 0
  private choiceConfirmed:  boolean        = false

  create(): void {
    this.add
      .image(GAME_WIDTH / 2, GAME_HEIGHT / 2, this.encounterData.backgroundKey)
      .setDisplaySize(GAME_WIDTH, GAME_HEIGHT)

    this.addCharacters()

    this.frisk = gifSprite(this, 80, 290, 'assets/characters/frisk.gif', 44, 60)

    // Flowey sprite — hidden until the interjection fires
    this.floweySprite = gifSprite(this, 130, 385, 'assets/characters/flowey.gif', 80, 80)
    this.floweySprite.setAlpha(0)

    this.scoreSystem    = new ScoreSystem()
    this.dialogueSystem = new DialogueSystem(this)
    this.choiceSystem   = new ChoiceSystem(this, this.scoreSystem)
    this.playerCtrl     = new PlayerController(this, this.frisk)
    this.playerCtrl.enable()

    this.backKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)

    this.cameras.main.fadeIn(500, 0, 0, 0)
    this.state    = 'walking'
    this.triggered = false
  }

  update(_time: number, delta: number): void {
    // Left arrow: step back within dialogue, or dismiss choice → last dialogue line
    if (Phaser.Input.Keyboard.JustDown(this.backKey)) {
      if (this.state === 'dialogue') {
        const wentBack = this.dialogueSystem.stepBack()
        if (!wentBack) {
          if (!this.choiceConfirmed) {
            // Pre-choice first line — cancel dialogue, let player approach again
            this.dialogueSystem.cancel()
            this.triggered = false
            this.playerCtrl.enable()
            this.state = 'walking'
          }
          // Post-choice first line — do nothing (can't undo the choice)
        }
        return
      }
      if (this.state === 'choice') {
        this.choiceSystem.dismiss()
        this.state = 'dialogue'
        this.dialogueSystem.resumeAtLastLine(() => this.showChoices())
        return
      }
    }

    switch (this.state) {
      case 'walking':
        this.playerCtrl.update(delta)
        if (!this.triggered && this.frisk.x >= this.triggerX) {
          this.triggered = true
          this.startEncounter()
        }
        break
      case 'dialogue':
        this.dialogueSystem.update()
        break
      case 'choice':
        this.choiceSystem.update()
        break
      case 'done':
        break
    }
  }

  private startEncounter(): void {
    this.playerCtrl.disable()
    this.choiceConfirmed = false
    this.state = 'dialogue'
    this.dialogueSystem.start(this.encounterData.preChoiceLines, () => this.showChoices())
  }

  private showChoices(): void {
    this.state = 'choice'
    this.choiceSystem.show(
      this.encounterData.choices,
      this.encounterData.choicePrompt,
      (idx) => this.onChoiceMade(idx),
    )
  }

  private onChoiceMade(idx: number): void {
    this.selectedChoiceIdx = idx
    this.choiceConfirmed   = true
    const reaction = this.encounterData.postChoiceLines[idx] ?? []
    this.state = 'dialogue'
    this.dialogueSystem.start(reaction, () => {
      const interjection = this.encounterData.floweyInterjection
      if (interjection && interjection.length > 0) {
        this.showFlowey(() => {
          this.dialogueSystem.start(interjection, () => this.exitScene())
        })
      } else {
        this.exitScene()
      }
    })
  }

  private showFlowey(onShown: () => void): void {
    this.tweens.add({
      targets:  this.floweySprite,
      alpha:    1,
      duration: 300,
      ease:     'Power2',
      onComplete: onShown,
    })
  }

  private exitScene(): void {
    this.state = 'done'
    const cardText = this.encounterData.transitionCard?.[this.selectedChoiceIdx]
    this.cameras.main.fadeOut(800, 0, 0, 0)
    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      () => {
        if (cardText) {
          this.scene.start('NarratorCard', { text: cardText, nextScene: this.nextSceneKey, prevScene: this.scene.key })
        } else {
          this.scene.start(this.nextSceneKey)
        }
      },
    )
  }
}
