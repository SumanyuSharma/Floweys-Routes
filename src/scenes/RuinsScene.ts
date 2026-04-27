import Phaser from 'phaser'
import { BaseEncounterScene } from './BaseEncounterScene'
import { RUINS_ENCOUNTER }    from '../data/encounters/scene1'
import { GAME_WIDTH, GAME_HEIGHT } from '../constants'
import { gifSprite } from '../utils/gifSprite'
import type { EncounterData } from '../types'

export class RuinsScene extends BaseEncounterScene {
  constructor() { super({ key: 'Ruins' }) }

  protected get encounterData(): EncounterData { return RUINS_ENCOUNTER }
  protected get nextSceneKey():  string        { return 'Snowdin' }
  protected get triggerX():      number        { return 500 }

  protected addCharacters(): void {
    // Warm amber glow — breathes slowly behind Toriel
    const glow = this.add.graphics()
    glow.fillStyle(0xff8c00, 0.1)
    glow.fillCircle(640, 270, 90)
    this.tweens.add({
      targets: glow, alpha: 0.45, duration: 2200, yoyo: true, repeat: -1, ease: 'Sine.InOut',
    })

    const toriel = gifSprite(this, 640, 270, 'assets/characters/toriel.gif', 100, 140)

    // Toriel — gentle maternal bob
    this.tweens.add({
      targets: toriel, y: 264, duration: 2200, yoyo: true, repeat: -1, ease: 'Sine.InOut',
    })

    // Floating warm dust motes rising from the floor
    this.time.addEvent({
      delay: 650,
      loop:  true,
      callback: () => {
        const px = Phaser.Math.Between(60, GAME_WIDTH - 60)
        const py = Phaser.Math.Between(GAME_HEIGHT - 70, GAME_HEIGHT - 10)
        const g  = this.add.graphics().setDepth(3).setAlpha(0)
        g.fillStyle(0xffaa44, 1)
        g.fillCircle(0, 0, Phaser.Math.Between(2, 4))
        g.setPosition(px, py)
        this.tweens.add({
          targets:  g,
          y:        py - Phaser.Math.Between(80, 160),
          alpha:    0.55,
          duration: 2400,
          ease:     'Sine.In',
          onComplete: () => g.destroy(),
        })
      },
    })
  }
}
