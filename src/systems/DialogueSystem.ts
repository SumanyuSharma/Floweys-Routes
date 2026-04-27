import Phaser from 'phaser'
import { DialogueBox } from '../ui/DialogueBox'
import { TypeWriter } from '../ui/TypeWriter'
import { CHARACTERS } from '../data/characters'
import type { DialogueLine } from '../types'

/**
 * Drives a queue of DialogueLines through the DialogueBox / TypeWriter.
 *
 * Usage:
 *   ds.start(lines, () => { ... })   — begin playback
 *   ds.update()                      — call every frame (handles Z / Enter / Space)
 */
export class DialogueSystem {
  private scene:   Phaser.Scene
  private box:     DialogueBox
  private writer:  TypeWriter
  private queue:   DialogueLine[] = []
  private index:   number = 0

  private zKey:     Phaser.Input.Keyboard.Key
  private enterKey: Phaser.Input.Keyboard.Key
  private spaceKey: Phaser.Input.Keyboard.Key
  private rightKey: Phaser.Input.Keyboard.Key

  private _isActive:           boolean  = false
  private _inputLocked:        boolean  = false
  private onCompleteCallback:  (() => void) | null = null
  private borderColorOverride: number | null = null
  private textColorOverride:   string | null = null
  private onLineStartCallback: ((line: DialogueLine) => void) | null = null

  constructor(scene: Phaser.Scene) {
    this.scene  = scene
    this.box    = new DialogueBox(scene)
    this.writer = new TypeWriter(scene, this.box.contentText)

    const kb = scene.input.keyboard!
    this.zKey     = kb.addKey(Phaser.Input.Keyboard.KeyCodes.Z)
    this.enterKey = kb.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
    this.spaceKey = kb.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    this.rightKey = kb.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
  }

  get isActive(): boolean {
    return this._isActive
  }

  setBorderColorOverride(color: number | null): void {
    this.borderColorOverride = color
  }

  setTextColorOverride(color: string | null): void {
    this.textColorOverride = color
  }

  /** Called at the start of every line — use to sync visual effects to speaker changes. */
  setLineStartCallback(fn: ((line: DialogueLine) => void) | null): void {
    this.onLineStartCallback = fn
  }

  /** Begin playing a dialogue queue. Calls onComplete when the last line is dismissed. */
  start(lines: DialogueLine[], onComplete: () => void): void {
    if (lines.length === 0) {
      onComplete()
      return
    }
    this.queue              = lines
    this.index              = 0
    this.onCompleteCallback = onComplete
    this._isActive          = true

    // Brief lockout prevents a held key (e.g. walk key) from skipping the first line
    this._inputLocked = true
    this.scene.time.delayedCall(250, () => { this._inputLocked = false })

    this.showLine(0)
  }

  /** Call every frame inside the scene's update(). */
  update(): void {
    if (!this._isActive || this._inputLocked) return

    // checkDown fires on first press and then every 150 ms while held,
    // giving a natural hold-to-advance feel without requiring repeated taps.
    const kb = this.scene.input.keyboard!
    const advance =
      kb.checkDown(this.zKey,     150) ||
      kb.checkDown(this.enterKey, 150) ||
      kb.checkDown(this.spaceKey, 150) ||
      kb.checkDown(this.rightKey, 150)

    if (!advance) return

    if (!this.writer.isComplete) {
      this.writer.skip()
    } else {
      this.advance()
    }
  }

  private showLine(idx: number): void {
    const line = this.queue[idx]
    this.onLineStartCallback?.(line)
    const char = CHARACTERS[line.speaker]

    const style          = char?.boxStyle ?? 'standard'
    const displayName    = char?.displayName ?? ''
    const textColor      = this.textColorOverride ?? char?.textColor
    const nameplateColor = char?.nameplateColor
    const borderOverride = this.borderColorOverride ?? undefined

    this.box.show(style, displayName, textColor, nameplateColor, borderOverride)

    const isSinglePlay = line.speaker === 'narrator' || line.speaker === 'unknown'
    if (isSinglePlay) {
      // Play the sound once when the line appears instead of per character
      const soundKey = char?.typingSoundKey
      if (soundKey) this.scene.sound.play(soundKey, { volume: 0.45 })
      this.writer.setSoundKey(null)
    } else {
      this.writer.setSoundKey(char?.typingSoundKey ?? null)
    }

    // Unknown speaker: show text instantly (no typewriter animation)
    this.writer.setInstantMode(line.speaker === 'unknown')

    this.writer.start(line.text)
  }

  private advance(): void {
    this.index++
    if (this.index >= this.queue.length) {
      this._isActive = false
      this.box.hide()
      const cb = this.onCompleteCallback
      this.onCompleteCallback = null
      cb?.()
    } else {
      this.showLine(this.index)
    }
  }

  /**
   * Step back one line. Returns false when already at line 0 — caller
   * should decide what to do (e.g. close dialogue and reset the scene).
   */
  stepBack(): boolean {
    if (!this._isActive || this.index === 0) return false
    this.index--
    this._inputLocked = true
    this.scene.time.delayedCall(200, () => { this._inputLocked = false })
    this.showLineInstantly(this.index)
    return true
  }

  /**
   * Re-show the last line of the current queue with a new onComplete.
   * Used when returning from a choice screen to the preceding dialogue.
   */
  resumeAtLastLine(onComplete: () => void): void {
    if (this.queue.length === 0) return
    this._isActive = true
    this._inputLocked = true
    this.scene.time.delayedCall(250, () => { this._inputLocked = false })
    this.index = this.queue.length - 1
    this.onCompleteCallback = onComplete
    this.showLineInstantly(this.index)
  }

  /** Hide the box and stop everything without calling onComplete. */
  cancel(): void {
    this.writer.cancel()
    this.box.hide()
    this._isActive = false
    this.onCompleteCallback = null
  }

  private showLineInstantly(idx: number): void {
    const line = this.queue[idx]
    this.onLineStartCallback?.(line)
    const char = CHARACTERS[line.speaker]

    const style          = char?.boxStyle ?? 'standard'
    const displayName    = char?.displayName ?? ''
    const textColor      = this.textColorOverride ?? char?.textColor
    const nameplateColor = char?.nameplateColor
    const borderOverride = this.borderColorOverride ?? undefined

    this.box.show(style, displayName, textColor, nameplateColor, borderOverride)
    this.writer.setSoundKey(null)
    this.writer.setInstantMode(true)
    this.writer.start(line.text)
    this.writer.setInstantMode(false)
  }

  destroy(): void {
    this.box.destroy()
    this.writer.destroy()
  }
}
