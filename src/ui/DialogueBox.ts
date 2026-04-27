import Phaser from 'phaser'
import { FONT, COLORS } from '../constants'
import type { BoxStyle } from '../types'

interface BoxColors {
  border: number
  fill:   number
  text:   string
  alpha:  number
  // Optional geometry overrides (falls back to the standard constants below)
  x?: number
  y?: number
  w?: number
  h?: number
}

const BOX_STYLES: Record<BoxStyle, BoxColors> = {
  standard:    { border: COLORS.dialogBorder,      fill: COLORS.dialogFill,      text: COLORS.standardText,    alpha: 0.92 },
  flowey:      { border: COLORS.floweyBorder,       fill: COLORS.floweyFill,      text: COLORS.floweyText,      alpha: 1    },
  asrielChild: { border: COLORS.asrielChildBorder,  fill: COLORS.asrielChildFill, text: COLORS.asrielChildText, alpha: 1    },
  supreme:     { border: 0xffd700,                  fill: 0x050505,               text: '#ffd700',              alpha: 1    },
  // Ambient: positioned at the top of the screen — echo flowers, amalgamate voices
  ambient:     {
    border: COLORS.ambientBorder, fill: COLORS.ambientFill, text: COLORS.ambientText, alpha: 0.78,
    x: 100, y: 18, w: 600, h: 110,
  },
}

// Default layout constants (used by all non-ambient styles)
const BOX_X   = 20
const BOX_Y   = 420
const BOX_W   = 760
const BOX_H   = 160
const PADDING = 14
const BORDER  = 3
const NAME_H  = 26

/**
 * Renders the dialogue box, nameplate, and content text area.
 * The TypeWriter animates `contentText` externally.
 */
export class DialogueBox {
  /** The text object that TypeWriter writes into. */
  readonly contentText: Phaser.GameObjects.Text

  private bg:            Phaser.GameObjects.Graphics
  private nameplateBg:   Phaser.GameObjects.Graphics
  private nameplateText: Phaser.GameObjects.Text

  constructor(scene: Phaser.Scene) {
    this.bg            = scene.add.graphics().setDepth(10)
    this.nameplateBg   = scene.add.graphics().setDepth(10)
    this.nameplateText = scene.add.text(BOX_X + 8, BOX_Y - NAME_H + 4, '', {
      fontFamily: FONT,
      fontSize:   '11px',
      color:      '#ffffff',
    }).setDepth(11)

    this.contentText = scene.add.text(
      BOX_X + PADDING,
      BOX_Y + PADDING,
      '',
      {
        fontFamily:  FONT,
        fontSize:    '12px',
        color:       COLORS.standardText,
        wordWrap:    { width: BOX_W - PADDING * 2 },
        lineSpacing: 6,
      },
    ).setDepth(11)

    this.setAllVisible(false)
  }

  /** Show the box with the given style and optional character name. */
  show(
    style:              BoxStyle,
    displayName:        string,
    textColorOverride?: string,
    nameplateColor?:    number,
    borderColorOverride?: number,
  ): void {
    const colors = BOX_STYLES[style]
    const bx = colors.x ?? BOX_X
    const by = colors.y ?? BOX_Y
    const bw = colors.w ?? BOX_W
    const bh = colors.h ?? BOX_H
    const borderColor = borderColorOverride ?? colors.border
    const borderThickness = style === 'ambient' ? 1 : BORDER

    // Draw background rectangle
    this.bg.clear()
    this.bg.fillStyle(colors.fill, colors.alpha)
    this.bg.fillRect(bx, by, bw, bh)
    this.bg.lineStyle(borderThickness, borderColor, 1)
    this.bg.strokeRect(bx, by, bw, bh)
    this.bg.setVisible(true)

    // Reposition and resize content text to match this style's box
    this.contentText.setPosition(bx + PADDING, by + PADDING)
    this.contentText.setWordWrapWidth(bw - PADDING * 2)
    this.contentText.setColor(textColorOverride ?? colors.text)
    this.contentText.setVisible(true)

    // Nameplate — omitted for ambient style (no character name)
    const hasName = style !== 'ambient' && displayName.trim().length > 0
    if (hasName) {
      const nw   = Math.max(140, displayName.length * 10 + 24)
      const fill = nameplateColor ?? colors.border
      this.nameplateBg.clear()
      this.nameplateBg.fillStyle(fill, 1)
      this.nameplateBg.fillRect(bx, by - NAME_H, nw, NAME_H)
      this.nameplateText.setPosition(bx + 8, by - NAME_H + 4)
      this.nameplateText.setText(displayName)
    }
    this.nameplateBg.setVisible(hasName)
    this.nameplateText.setVisible(hasName)
  }

  /** Hide the entire box and clear the text. */
  hide(): void {
    this.setAllVisible(false)
    this.contentText.setText('')
  }

  private setAllVisible(v: boolean): void {
    this.bg.setVisible(v)
    this.nameplateBg.setVisible(v)
    this.nameplateText.setVisible(v)
    this.contentText.setVisible(v)
  }

  destroy(): void {
    this.bg.destroy()
    this.nameplateBg.destroy()
    this.nameplateText.destroy()
    this.contentText.destroy()
  }
}
