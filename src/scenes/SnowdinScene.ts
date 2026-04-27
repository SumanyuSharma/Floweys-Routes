import Phaser from 'phaser'
import { BaseEncounterScene } from './BaseEncounterScene'
import { SNOWDIN_ENCOUNTER }  from '../data/encounters/scene2'
import { GAME_WIDTH, GAME_HEIGHT } from '../constants'
import { gifSprite } from '../utils/gifSprite'
import type { EncounterData } from '../types'

export class SnowdinScene extends BaseEncounterScene {
  constructor() { super({ key: 'Snowdin' }) }

  protected get encounterData(): EncounterData { return SNOWDIN_ENCOUNTER }
  protected get nextSceneKey():  string        { return 'Waterfall' }
  protected get triggerX():      number        { return 480 }

  protected addCharacters(): void {
    // Faint cool-blue overlay — sub-zero atmosphere
    const overlay = this.add.graphics().setAlpha(0.055)
    overlay.fillStyle(0x88ccff, 1)
    overlay.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

    const papyrus = gifSprite(this, 560, 250, 'assets/characters/papyrus.gif', 80, 130)
    const sans    = gifSprite(this, 650, 285, 'assets/characters/sans.gif',    68, 100)

    // Papyrus — excited quick bounce (he is VERY ENTHUSIASTIC)
    this.tweens.add({
      targets: papyrus, y: 244, duration: 380, yoyo: true, repeat: -1, ease: 'Sine.InOut',
    })

    // Sans — barely moving, lazy sway
    this.tweens.add({
      targets: sans, y: 289, duration: 3200, yoyo: true, repeat: -1, ease: 'Sine.InOut',
    })

    // Falling snowflakes
    this.time.addEvent({
      delay: 260,
      loop:  true,
      callback: () => {
        const px = Phaser.Math.Between(0, GAME_WIDTH)
        const g  = this.add.graphics().setDepth(3).setAlpha(0.65)
        g.fillStyle(0xffffff, 1)
        g.fillCircle(0, 0, Phaser.Math.Between(1, 3))
        g.setPosition(px, -6)
        this.tweens.add({
          targets:  g,
          y:        GAME_HEIGHT + 12,
          x:        px + Phaser.Math.Between(-40, 40),
          duration: Phaser.Math.Between(2600, 4200),
          ease:     'Linear',
          onComplete: () => g.destroy(),
        })
      },
    })
  }
}
