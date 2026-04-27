import Phaser from 'phaser'
import { BaseEncounterScene } from './BaseEncounterScene'
import { TRUELAB_ENCOUNTER }  from '../data/encounters/scene4'
import { GAME_WIDTH, GAME_HEIGHT } from '../constants'
import { gifSprite } from '../utils/gifSprite'
import type { EncounterData } from '../types'

export class TrueLabScene extends BaseEncounterScene {
  constructor() { super({ key: 'TrueLab' }) }

  protected get encounterData(): EncounterData { return TRUELAB_ENCOUNTER }
  protected get nextSceneKey():  string        { return 'NewHome' }
  protected get triggerX():      number        { return 460 }

  protected addCharacters(): void {
    // Alphys at depth 1; overlay/flicker at depth 2+ so the tint applies
    // to her uniformly and avoids a visible contrast rectangle while she moves.
    const alphys = gifSprite(this, 580, 275, 'assets/characters/alphys.gif', 80, 110)
    alphys.setDepth(1)

    // Sickly green ambient tint rendered above alphys
    const overlay = this.add.graphics().setDepth(2).setAlpha(0.04)
    overlay.fillStyle(0x00ff44, 1)
    overlay.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

    // Ceiling-light flicker layer
    const flicker = this.add.graphics().setDepth(2).setAlpha(0)
    flicker.fillStyle(0xffffff, 1)
    flicker.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

    // Alphys — nervous left-right fidget
    this.tweens.add({
      targets: alphys, x: 586, duration: 320, yoyo: true, repeat: -1, ease: 'Sine.InOut',
    })

    // Intermittent fluorescent light flicker
    this.time.addEvent({
      delay:    2600,
      loop:     true,
      callback: () => {
        this.tweens.add({
          targets: flicker, alpha: 0.09, duration: 55, yoyo: true,
          onComplete: () => {
            if (Math.random() > 0.45) {
              this.time.delayedCall(110, () => {
                this.tweens.add({ targets: flicker, alpha: 0.06, duration: 40, yoyo: true })
              })
            }
          },
        })
      },
    })

    // Green scan-line sweeping down — console readout feel
    this.time.addEvent({
      delay:    3800,
      loop:     true,
      callback: () => {
        const scan = this.add.graphics().setDepth(2).setAlpha(0)
        scan.fillStyle(0x00ff88, 1)
        scan.fillRect(0, 0, GAME_WIDTH, 2)
        this.tweens.add({
          targets:  scan,
          y:        GAME_HEIGHT,
          alpha:    0.22,
          duration: 1600,
          ease:     'Linear',
          onComplete: () => scan.destroy(),
        })
      },
    })
  }
}
