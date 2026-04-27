import Phaser from 'phaser'
import { BaseEncounterScene }  from './BaseEncounterScene'
import { WATERFALL_ENCOUNTER } from '../data/encounters/scene3'
import { GAME_WIDTH, GAME_HEIGHT } from '../constants'
import { gifSprite } from '../utils/gifSprite'
import type { EncounterData }  from '../types'

export class WaterfallScene extends BaseEncounterScene {
  constructor() { super({ key: 'Waterfall' }) }

  protected get encounterData(): EncounterData { return WATERFALL_ENCOUNTER }
  protected get nextSceneKey():  string        { return 'TrueLab' }
  protected get triggerX():      number        { return 490 }

  protected addCharacters(): void {
    // Bioluminescent cyan glow — waterfall light behind Undyne
    const glow = this.add.graphics()
    glow.fillStyle(0x00cccc, 0.09)
    glow.fillCircle(620, 250, 85)
    this.tweens.add({
      targets: glow, alpha: 0.5, duration: 1800, yoyo: true, repeat: -1, ease: 'Sine.InOut',
    })

    const undyne = gifSprite(this, 620, 250, 'assets/characters/undyne.gif', 90, 130)

    // Undyne — battle-ready forward pulse (she is always ready to fight)
    this.tweens.add({
      targets: undyne, y: 245, duration: 900, yoyo: true, repeat: -1, ease: 'Sine.InOut',
    })

    // Rising glowing bubbles from the water below
    this.time.addEvent({
      delay: 480,
      loop:  true,
      callback: () => {
        const px = Phaser.Math.Between(100, GAME_WIDTH - 100)
        const py = Phaser.Math.Between(GAME_HEIGHT - 50, GAME_HEIGHT)
        const r  = Phaser.Math.Between(3, 7)
        const g  = this.add.graphics().setDepth(3).setAlpha(0)
        g.lineStyle(1, 0x00ffff, 0.8)
        g.strokeCircle(0, 0, r)
        g.setPosition(px, py)
        this.tweens.add({
          targets:  g,
          y:        py - Phaser.Math.Between(120, 220),
          alpha:    0.7,
          duration: Phaser.Math.Between(2400, 3200),
          ease:     'Sine.Out',
          onComplete: () => g.destroy(),
        })
      },
    })
  }
}
