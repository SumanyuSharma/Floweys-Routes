import { GameState } from '../GameState'
import type { RouteKey, RouteScores } from '../types'

/**
 * Applies score deltas to GameState.scores.
 * Logs the full score table to console after every application.
 */
export class ScoreSystem {
  applyDeltas(deltas: Partial<RouteScores>): void {
    const scores = GameState.scores
    for (const key of Object.keys(deltas) as RouteKey[]) {
      const delta = deltas[key]
      if (delta !== undefined) {
        scores[key] += delta
      }
    }
    console.log('[ScoreSystem] Scores:', this.formatScores(GameState.scores))
  }

  private formatScores(scores: RouteScores): Record<string, number> {
    // Filter out zero scores for readability in console
    return Object.fromEntries(
      Object.entries(scores).filter(([, v]) => v > 0)
    )
  }
}
