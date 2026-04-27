export const GAME_WIDTH = 800
export const GAME_HEIGHT = 600
export const FONT = '"Press Start 2P", monospace'
export const TYPEWRITER_SPEED = 40 // characters per second
export const PLAYER_SPEED = 160   // pixels per second

export const COLORS = {
  // Dialogue box — standard
  dialogBorder: 0xffffff,
  dialogFill:   0x000000,
  standardText: '#ffffff',

  // Flowey box
  floweyBorder: 0xf5e642,
  floweyFill:   0x0a1a00,
  floweyText:   '#f5e642',

  // Asriel child box
  asrielChildBorder: 0x8ab4f8,
  asrielChildFill:   0x00001a,
  asrielChildText:   '#c8dcff',

  // Narrator / misc
  narratorText: '#aaaaaa',

  // Ambient / background voices (echo flowers, amalgamates)
  ambientBorder: 0x2a6644,
  ambientFill:   0x001408,
  ambientText:   '#88ddaa',
} as const
