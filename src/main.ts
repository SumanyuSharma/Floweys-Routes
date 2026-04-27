import Phaser from 'phaser'
import { GAME_WIDTH, GAME_HEIGHT } from './constants'
import { initTouchControls } from './utils/touchControls'
import { BootScene }             from './scenes/BootScene'
import { TitleScene }            from './scenes/TitleScene'
import { OpeningTitlesScene }    from './scenes/OpeningTitlesScene'
import { ColdOpenScene }         from './scenes/ColdOpenScene'
import { RuinsScene }        from './scenes/RuinsScene'
import { SnowdinScene }      from './scenes/SnowdinScene'
import { WaterfallScene }    from './scenes/WaterfallScene'
import { TrueLabScene }      from './scenes/TrueLabScene'
import { NewHomeScene }      from './scenes/NewHomeScene'
import { NarratorCardScene } from './scenes/NarratorCardScene'
import { FinalMirrorScene }  from './scenes/FinalMirrorScene'
import { EndingScene }       from './scenes/EndingScene'
import { DebriefScene }      from './scenes/DebriefScene'

const config: Phaser.Types.Core.GameConfig = {
  type:            Phaser.AUTO,
  width:           GAME_WIDTH,
  height:          GAME_HEIGHT,
  backgroundColor: '#000000',
  parent:          'game',

  scale: {
    mode:       Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },

  scene: [
    BootScene,
    TitleScene,
    OpeningTitlesScene,
    ColdOpenScene,
    RuinsScene,
    SnowdinScene,
    WaterfallScene,
    TrueLabScene,
    NewHomeScene,
    NarratorCardScene,
    FinalMirrorScene,
    EndingScene,
    DebriefScene,
  ],
}

new Phaser.Game(config)
initTouchControls()
