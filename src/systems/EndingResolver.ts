import { GameState } from '../GameState'
import type { RouteKey } from '../types'

export class EndingResolver {
  static resolve(): RouteKey {
    const scores = GameState.scores

    let winner: RouteKey = 'libertarian'
    let winnerScore = -1
    const tied: RouteKey[] = []

    for (const key of Object.keys(scores) as RouteKey[]) {
      if (scores[key] > winnerScore) {
        winner = key
        winnerScore = scores[key]
        tied.length = 0
        tied.push(key)
      } else if (scores[key] === winnerScore) {
        tied.push(key)
      }
    }

    if (tied.length > 1 && GameState.finalMirrorChoice !== null) {
      if (tied.includes(GameState.finalMirrorChoice)) {
        winner = GameState.finalMirrorChoice
      }
    }

    const sdScore =
      scores.reversion +
      scores.nineteenEightyFour +
      scores.enslavedGod

    GameState.selfDestructionTriggered = sdScore >= 10

    console.log(
      '[EndingResolver] Winner:', winner,
      '| Score:', winnerScore,
      '| SD:', GameState.selfDestructionTriggered,
      '| sdScore:', sdScore,
    )
    console.log('[EndingResolver] All scores:', { ...GameState.scores })

    return winner
  }
}
