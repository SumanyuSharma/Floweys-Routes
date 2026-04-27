import Phaser from 'phaser'
import { ChoiceBox } from '../ui/ChoiceBox'
import { ScoreSystem } from './ScoreSystem'
import type { Choice } from '../types'

/**
 * Renders a choice menu and handles player navigation.
 *
 * Usage:
 *   cs.show(choices, prompt, (idx) => { ... })  — display choices
 *   cs.update()                                  — call every frame
 *
 * The callback receives the zero-based index of the confirmed choice.
 * Score deltas are applied automatically before the callback fires.
 */
export class ChoiceSystem {
  private scene:       Phaser.Scene
  private choiceBox:   ChoiceBox
  private scoreSystem: ScoreSystem
  private choices:     Choice[] = []

  private upKey:    Phaser.Input.Keyboard.Key
  private downKey:  Phaser.Input.Keyboard.Key
  private zKey:     Phaser.Input.Keyboard.Key
  private enterKey: Phaser.Input.Keyboard.Key

  private _isActive:        boolean = false
  private _confirmLocked:   boolean = false
  private onSelectCallback: ((index: number) => void) | null = null

  constructor(scene: Phaser.Scene, scoreSystem: ScoreSystem) {
    this.scene       = scene
    this.choiceBox   = new ChoiceBox(scene)
    this.scoreSystem = scoreSystem

    const kb = scene.input.keyboard!
    this.upKey    = kb.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
    this.downKey  = kb.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
    this.zKey     = kb.addKey(Phaser.Input.Keyboard.KeyCodes.Z)
    this.enterKey = kb.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
  }

  get isActive(): boolean {
    return this._isActive
  }

  show(choices: Choice[], prompt: string, onSelect: (index: number) => void): void {
    this.choices          = choices
    this.onSelectCallback = onSelect
    this._isActive        = true

    // Lock confirm for 400 ms so a held dialogue-advance key cannot
    // accidentally select the first option the moment the box appears.
    this._confirmLocked = true
    this.scene.time.delayedCall(400, () => { this._confirmLocked = false })

    this.choiceBox.show(choices, prompt)
  }

  update(): void {
    if (!this._isActive) return

    if (Phaser.Input.Keyboard.JustDown(this.upKey)) {
      this.choiceBox.moveUp()
      this.scene.sound.play('snd_movemenu', { volume: 0.5 })
    }
    if (Phaser.Input.Keyboard.JustDown(this.downKey)) {
      this.choiceBox.moveDown()
      this.scene.sound.play('snd_movemenu', { volume: 0.5 })
    }
    if (
      Phaser.Input.Keyboard.JustDown(this.zKey) ||
      Phaser.Input.Keyboard.JustDown(this.enterKey)
    ) {
      this.confirm()
    }
  }

  private confirm(): void {
    if (this._confirmLocked) return
    const idx = this.choiceBox.getSelectedIndex()
    this._isActive = false
    this.choiceBox.hide()
    this.scene.sound.play('snd_select', { volume: 0.6 })

    const deltas = this.choices[idx]?.scoreDeltas
    if (deltas) this.scoreSystem.applyDeltas(deltas)

    const cb = this.onSelectCallback
    this.onSelectCallback = null
    cb?.(idx)
  }

  /** Hide the choice box without selecting — used for back navigation. */
  dismiss(): void {
    this._isActive = false
    this.choiceBox.hide()
    this.onSelectCallback = null
  }

  destroy(): void {
    this.choiceBox.destroy()
  }
}
