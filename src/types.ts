// ─── Route Keys ──────────────────────────────────────────────────────────────

export type RouteKey =
  | 'libertarian'
  | 'egalitarian'
  | 'benevolentDictator'
  | 'gatekeeper'
  | 'protectorGod'
  | 'enslavedGod'
  | 'conqueror'
  | 'descendants'
  | 'zookeeper'
  | 'nineteenEightyFour'
  | 'reversion'

export type RouteScores = Record<RouteKey, number>

// ─── Game State ───────────────────────────────────────────────────────────────

export interface GameStateData {
  scores: RouteScores
  finalMirrorChoice: RouteKey | null
  selfDestructionTriggered: boolean
}

// ─── Box Style ────────────────────────────────────────────────────────────────

export type BoxStyle = 'standard' | 'flowey' | 'floweyReveal' | 'asrielChild' | 'supreme' | 'ambient'

// ─── Characters ───────────────────────────────────────────────────────────────

export type CharacterKey =
  | 'frisk'
  | 'flowey'
  | 'floweyReveal'
  | 'toriel'
  | 'sans'
  | 'papyrus'
  | 'undyne'
  | 'alphys'
  | 'asgore'
  | 'asrielChild'
  | 'asrielSupreme'
  | 'narrator'
  | 'unknown'

export interface CharacterConfig {
  key: CharacterKey
  displayName: string       // Empty string = no nameplate shown
  spriteAsset: string       // Phaser texture key; empty = no portrait
  textColor: string         // CSS hex colour for dialogue text
  nameplateColor: number    // Hex number for nameplate background
  boxStyle: BoxStyle        // Which box style to use
  typingSoundKey: string | null  // Phaser audio key; null = silent
}

// ─── Dialogue ─────────────────────────────────────────────────────────────────

export interface DialogueLine {
  speaker: CharacterKey
  text: string
  portrait?: string         // Optional per-line portrait override (texture key)
}

// ─── Choices ──────────────────────────────────────────────────────────────────

export interface Choice {
  text: string
  scoreDeltas: Partial<RouteScores>
  mirrorRouteKey?: RouteKey  // Set only for Scene 6 choices (tie-breaker)
}

// ─── Encounter ────────────────────────────────────────────────────────────────

export interface EncounterData {
  characterKey: CharacterKey
  backgroundKey: string
  preChoiceLines: DialogueLine[]
  choicePrompt: string
  choices: Choice[]
  // Indexed 0–(n-1) by choice selection
  postChoiceLines: Record<number, DialogueLine[]>
  // Optional: plays after post-choice reactions
  floweyInterjection?: DialogueLine[]
  // Optional: narrator card shown before the next scene, indexed by choice
  transitionCard?: Record<number, string>
}

// ─── Ending (stub for M1/M2 — expanded in M3) ────────────────────────────────

export interface EndingData {
  routeKey: RouteKey
  endingName: string
  supremeFormName: string
  floweyRevealLines: string[]
  selfDestructionMemoryLines?: string[]
  asrielChildLine: string
  supremeAsrielLine: string
  outcomeCards: string[]
  titleCard: string
  finalLine: string
  backgroundTint: number
  overlayColor: string
  boxBorderColor: string
}

// ─── Debrief (stub for M2 — full content in M3) ──────────────────────────────

export interface DebriefData {
  routeKey: RouteKey | 'selfDestruction'
  subtitle: string
  outcomeExplanation: string
  sourceNote: string
  genericBody: string
  otherOutcomesText: string
}
