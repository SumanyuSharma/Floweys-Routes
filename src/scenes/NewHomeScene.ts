import Phaser from 'phaser'
import { BaseEncounterScene } from './BaseEncounterScene'
import { NEWHOME_ENCOUNTER }  from '../data/encounters/scene5'
import { GAME_WIDTH, GAME_HEIGHT } from '../constants'
import type { EncounterData } from '../types'

export class NewHomeScene extends BaseEncounterScene {
  constructor() { super({ key: 'NewHome' }) }

  protected get encounterData(): EncounterData { return NEWHOME_ENCOUNTER }
  protected get nextSceneKey():  string        { return 'FinalMirror' }
  protected get triggerX():      number        { return 460 }

  protected addCharacters(): void {
    // Hearth glow — warmth from below, the last home
    const hearth = this.add.graphics()
    hearth.fillStyle(0xff6600, 0.13)
    hearth.fillEllipse(GAME_WIDTH / 2, GAME_HEIGHT + 15, GAME_WIDTH * 0.85, 130)
    this.tweens.add({
      targets: hearth, alpha: 0.5, duration: 1900, yoyo: true, repeat: -1, ease: 'Sine.InOut',
    })

    // Soft golden halo on Asgore
    const halo = this.add.graphics()
    halo.fillStyle(0xffaa00, 0.07)
    halo.fillCircle(600, 230, 100)
    this.tweens.add({
      targets: halo, alpha: 0.38, duration: 2600, yoyo: true, repeat: -1, ease: 'Sine.InOut',
    })

    // Asgore is a PNG — plain static image (no GIF animation)
    const asgore = this.add.image(600, 230, 'char_asgore').setDisplaySize(110, 160)

    // Asgore — dignified slow bob
    this.tweens.add({
      targets: asgore, y: 224, duration: 2800, yoyo: true, repeat: -1, ease: 'Sine.InOut',
    })

    // Slow golden dust motes — like embers from a fire
    this.time.addEvent({
      delay: 950,
      loop:  true,
      callback: () => {
        const px = Phaser.Math.Between(80, GAME_WIDTH - 80)
        const py = Phaser.Math.Between(GAME_HEIGHT - 90, GAME_HEIGHT - 10)
        const g  = this.add.graphics().setDepth(3).setAlpha(0)
        g.fillStyle(0xffcc66, 1)
        g.fillCircle(0, 0, Phaser.Math.Between(1, 3))
        g.setPosition(px, py)
        this.tweens.add({
          targets:  g,
          y:        py - Phaser.Math.Between(55, 130),
          alpha:    0.48,
          duration: 3200,
          ease:     'Sine.Out',
          onComplete: () => g.destroy(),
        })
      },
    })
  }
}
