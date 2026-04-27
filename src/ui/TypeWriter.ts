import Phaser from 'phaser'
import { TYPEWRITER_SPEED } from '../constants'

export class TypeWriter {
  private scene:       Phaser.Scene
  private textObject:  Phaser.GameObjects.Text
  private fullText:    string = ''
  private charIndex:   number = 0
  private timer:       Phaser.Time.TimerEvent | null = null
  private _isComplete: boolean = true
  private onCompleteCallback: (() => void) | null = null

  private soundKey:    string | null = null
  private instantMode: boolean       = false

  constructor(scene: Phaser.Scene, textObject: Phaser.GameObjects.Text) {
    this.scene      = scene
    this.textObject = textObject
  }

  get isComplete(): boolean {
    return this._isComplete
  }

  /** Call before start() to set the voice sound for this line. */
  setSoundKey(key: string | null): void {
    this.soundKey = key
  }

  /** When true, start() shows the full text immediately with no animation. */
  setInstantMode(instant: boolean): void {
    this.instantMode = instant
  }

  start(text: string, onComplete?: () => void): void {
    this.stop()
    this.fullText = text
    this.charIndex = 0
    this._isComplete = false
    this.onCompleteCallback = onComplete ?? null
    this.textObject.setText('')

    if (text.length === 0 || this.instantMode) {
      this.textObject.setText(text)
      this._isComplete = true
      onComplete?.()
      return
    }

    this.timer = this.scene.time.addEvent({
      delay:         1000 / TYPEWRITER_SPEED,
      callback:      this.tick,
      callbackScope: this,
      loop:          true,
    })
  }

  skip(): void {
    if (this._isComplete) return
    this.stop()
    this.textObject.setText(this.fullText)
    this._isComplete = true
    const cb = this.onCompleteCallback
    this.onCompleteCallback = null
    cb?.()
  }

  /** Stop animation without firing onComplete — used for back navigation. */
  cancel(): void {
    this.stop()
    this._isComplete = true
    this.onCompleteCallback = null
  }

  private tick(): void {
    if (this.charIndex < this.fullText.length) {
      const ch = this.fullText[this.charIndex]
      this.textObject.setText(this.fullText.substring(0, this.charIndex + 1))
      this.charIndex++

      // Play voice sound on non-space characters
      if (this.soundKey && ch !== ' ' && ch !== '\n') {
        this.scene.sound.play(this.soundKey, { volume: 0.55 })
      }
    }
    if (this.charIndex >= this.fullText.length) {
      this.stop()
      this._isComplete = true
      const cb = this.onCompleteCallback
      this.onCompleteCallback = null
      cb?.()
    }
  }

  private stop(): void {
    if (this.timer) {
      this.timer.remove(false)
      this.timer = null
    }
  }

  destroy(): void {
    this.stop()
  }
}
