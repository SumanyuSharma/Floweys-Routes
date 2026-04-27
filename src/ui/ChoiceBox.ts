import Phaser from 'phaser'
import { FONT, GAME_HEIGHT } from '../constants'
import type { Choice } from '../types'

const BOX_X           = 20
const BOX_W           = 760
const BORDER          = 3
const PADDING         = 14
const PROMPT_H        = 28
const CHOICE_GAP      = 12   // vertical gap between choice items
const CURSOR_OFFSET_X = 22
const CURSOR_SIZE     = 18
// Max text width inside the box (accounts for left padding, cursor gap, right padding)
const CHOICE_TEXT_W   = BOX_W - PADDING - CURSOR_OFFSET_X - PADDING  // 710 px

/**
 * Renders a choice menu with a heart cursor.
 * Call show() to display, hide() to dismiss.
 * Caller drives navigation via moveUp() / moveDown().
 */
export class ChoiceBox {
  private bg:           Phaser.GameObjects.Graphics
  private promptText:   Phaser.GameObjects.Text
  private choiceTexts:  Phaser.GameObjects.Text[] = []
  private cursor:       Phaser.GameObjects.Image
  private scene:        Phaser.Scene

  private choices:       Choice[] = []
  private selectedIndex: number   = 0
  private boxY:          number   = 0

  constructor(scene: Phaser.Scene) {
    this.scene  = scene
    this.bg     = scene.add.graphics().setDepth(10)
    this.cursor = scene.add.image(0, 0, 'ui_heart')
                       .setDisplaySize(CURSOR_SIZE, CURSOR_SIZE)
                       .setDepth(12)

    this.promptText = scene.add.text(BOX_X + PADDING, 0, '', {
      fontFamily: FONT,
      fontSize: '11px',
      color:  '#888888',
      fontStyle: 'italic',
    }).setDepth(11)

    this.setAllVisible(false)
  }

  show(choices: Choice[], prompt: string): void {
    this.choices       = choices
    this.selectedIndex = 0

    this.choiceTexts.forEach(t => t.destroy())
    this.choiceTexts = []

    const textX = BOX_X + PADDING + CURSOR_OFFSET_X

    // Create all choice text objects off-screen first so we can measure their
    // actual rendered heights before sizing the background rectangle.
    const texts = choices.map(choice =>
      this.scene.add.text(textX, -2000, choice.text, {
        fontFamily:  FONT,
        fontSize:    '13px',
        color:       '#ffffff',
        wordWrap:    { width: CHOICE_TEXT_W },
        lineSpacing: 4,
      }).setDepth(11)
    )

    // Total height occupied by all choice items
    const totalChoiceH = texts.reduce((sum, t) => sum + t.height, 0)
                       + Math.max(0, choices.length - 1) * CHOICE_GAP

    // Box height and position (anchored from the bottom of the screen)
    const boxH = PROMPT_H + PADDING + totalChoiceH + PADDING
    this.boxY  = Math.max(20, GAME_HEIGHT - boxH - 10)

    // Draw background
    this.bg.clear()
    this.bg.fillStyle(0x000000, 0.92)
    this.bg.fillRect(BOX_X, this.boxY, BOX_W, boxH)
    this.bg.lineStyle(BORDER, 0xffffff, 1)
    this.bg.strokeRect(BOX_X, this.boxY, BOX_W, boxH)

    // Prompt
    this.promptText.setY(this.boxY + 10)
    this.promptText.setText(prompt)

    // Position choice labels at their final y coordinates
    let currentY = this.boxY + PROMPT_H + PADDING
    texts.forEach((t, i) => {
      t.setY(currentY)
      this.choiceTexts.push(t)
      currentY += t.height + (i < texts.length - 1 ? CHOICE_GAP : 0)
    })

    this.updateCursor()
    this.setAllVisible(true)
  }

  hide(): void {
    this.setAllVisible(false)
    this.choiceTexts.forEach(t => t.destroy())
    this.choiceTexts = []
  }

  moveUp(): void {
    this.selectedIndex = (this.selectedIndex - 1 + this.choices.length) % this.choices.length
    this.updateCursor()
  }

  moveDown(): void {
    this.selectedIndex = (this.selectedIndex + 1) % this.choices.length
    this.updateCursor()
  }

  getSelectedIndex(): number {
    return this.selectedIndex
  }

  private updateCursor(): void {
    if (this.choiceTexts.length === 0) return
    const t = this.choiceTexts[this.selectedIndex]
    this.cursor.setPosition(t.x - CURSOR_OFFSET_X + 2, t.y + 6)
  }

  private setAllVisible(v: boolean): void {
    this.bg.setVisible(v)
    this.promptText.setVisible(v)
    this.cursor.setVisible(v)
    this.choiceTexts.forEach(t => t.setVisible(v))
  }

  destroy(): void {
    this.bg.destroy()
    this.promptText.destroy()
    this.choiceTexts.forEach(t => t.destroy())
    this.cursor.destroy()
  }
}
