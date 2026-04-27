import type { RouteKey, RouteScores } from './types'

function makeZeroScores(): RouteScores {
  return {
    libertarian:        0,
    egalitarian:        0,
    benevolentDictator: 0,
    gatekeeper:         0,
    protectorGod:       0,
    enslavedGod:        0,
    conqueror:          0,
    descendants:        0,
    zookeeper:          0,
    nineteenEightyFour: 0,
    reversion:          0,
  }
}

// Module-level singleton — ES modules are singletons by design.
// Import { GameState } from './GameState' anywhere to access shared state.

let _scores: RouteScores = makeZeroScores()
let _finalMirrorChoice: RouteKey | null = null
let _selfDestructionTriggered: boolean = false

export const GameState = {
  get scores(): RouteScores {
    return _scores
  },

  get finalMirrorChoice(): RouteKey | null {
    return _finalMirrorChoice
  },
  set finalMirrorChoice(v: RouteKey | null) {
    _finalMirrorChoice = v
  },

  get selfDestructionTriggered(): boolean {
    return _selfDestructionTriggered
  },
  set selfDestructionTriggered(v: boolean) {
    _selfDestructionTriggered = v
  },

  reset(): void {
    _scores = makeZeroScores()
    _finalMirrorChoice = null
    _selfDestructionTriggered = false
    console.log('[GameState] Reset.')
  },
}
