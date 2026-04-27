import Phaser from 'phaser'

/**
 * BootScene — preloads M1 assets then waits for Google Fonts before starting Title.
 * In M2 this will load all 6 backgrounds and all 10 character sprites.
 */
export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Boot' })
  }

  preload(): void {
    // ── Opening title panels ───────────────────────────────────
    for (let i = 1; i <= 10; i++) {
      this.load.image(`opening_${i}`, `assets/ui/Opening_${i}.png`)
    }
    this.load.audio('music_opening', 'assets/audio/Once Upon a Time - Opening.mp3')

    // ── Backgrounds ────────────────────────────────────────────
    this.load.image('bg_ruins',       'assets/rooms/ruins.png')
    this.load.image('bg_snowdin',     'assets/rooms/snowdin.png')
    this.load.image('bg_waterfall',   'assets/rooms/waterfall.png')
    this.load.image('bg_truelab',     'assets/rooms/true_lab.png')
    this.load.image('bg_newhome',     'assets/rooms/new_home.png')
    this.load.image('bg_finalmirror', 'assets/rooms/final_mirror.png')

    // ── Characters (GIFs load as first frame — known M2 simplification) ──
    this.load.image('char_frisk',   'assets/characters/frisk.gif')
    this.load.image('char_flowey',  'assets/characters/flowey.gif')
    this.load.image('char_toriel',  'assets/characters/toriel.gif')
    this.load.image('char_papyrus', 'assets/characters/papyrus.gif')
    this.load.image('char_sans',    'assets/characters/sans.gif')
    this.load.image('char_undyne',  'assets/characters/undyne.gif')
    this.load.image('char_alphys',  'assets/characters/alphys.gif')
    this.load.image('char_asgore',  'assets/characters/asgore.png')
    this.load.image('char_asriel',       'assets/characters/asriel_final.gif')

    // ── UI ─────────────────────────────────────────────────────
    this.load.image('ui_heart', 'assets/ui/heart.png')

    // ── Character voice sounds ──────────────────────────────────
    this.load.audio('snd_floweytalk1', 'assets/audio/snd_floweytalk1.wav')
    this.load.audio('snd_txttor',      'assets/audio/snd_txttor.wav')
    this.load.audio('snd_txtpap',      'assets/audio/snd_txtpap.wav')
    this.load.audio('snd_txtsans',     'assets/audio/snd_txtsans.wav')
    this.load.audio('snd_txtund',      'assets/audio/snd_txtund.wav')
    this.load.audio('snd_txtal',       'assets/audio/snd_txtal.wav')
    this.load.audio('snd_txtasg',      'assets/audio/snd_txtasg.wav')
    this.load.audio('snd_txtasr',      'assets/audio/snd_txtasr.wav')
    this.load.audio('snd_txtasr2',     'assets/audio/snd_txtasr2.wav')
    this.load.audio('snd_textnoise',   'assets/audio/snd_textnoise.wav')

    // ── Menu sounds ─────────────────────────────────────────────
    this.load.audio('snd_movemenu', 'assets/audio/snd_movemenu.wav')
    this.load.audio('snd_select',   'assets/audio/snd_select.wav')

    // ── Misc ────────────────────────────────────────────────────
    this.load.audio('snd_fall', 'assets/audio/snd_fall.wav')
  }

  create(): void {
    // Wait for Google Fonts (Press Start 2P) to be available before the
    // first text objects are created in TitleScene.
    document.fonts.ready.then(() => {
      this.scene.start('Title')
    })
  }
}
