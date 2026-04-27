# TECHNICAL SPEC: FLOWEY'S ROUTES
**Version 1.0 — Build-Ready**

---

## 1. Product Goal

FLOWEY'S ROUTES is a 10-minute browser game that disguises a hidden AGI scenario simulator inside an Undertale-style encounter format. The player walks through six symbolic rooms, speaks with characters, and makes dialogue choices that feel personal and emotional. Only at the end does the game reveal that the player was roleplaying as a superintelligent AI, that the Underground was humanity, and that every choice was a silent vote for one of eleven possible futures for the human species. The product achieves two things simultaneously: it works as a melancholy fairy tale for someone who has never heard of Max Tegmark, and it works as a policy thought experiment for someone who has.

---

## 2. Player Experience Goals

**Before the reveal (Scenes 0–6):**
- Feels like a strange, quiet fairy tale — haunted, warm in places, unsettling in others
- Choices feel morally real and personal, not like a quiz
- No awareness of AI themes, scoring, or route names
- Feels like classic Undertale: press Z to talk, arrow keys to walk, simple and strange

**During the reveal (EndingScene):**
- Genuine surprise or slow dawning recognition at "FRISK = AGI"
- The Flowey → Asriel child → supreme form escalation should feel earned, not arbitrary
- The route-specific supreme form should feel like a mirror of the player's choices
- Emotional register: grief, wonder, vertigo

**After the debrief (DebriefScene):**
- Intellectual clarity — the player understands what they just played
- Curiosity about the other 10 endings
- No feeling of being lectured — the debrief is a landing pad, not a classroom
- The RESET button invites another run

---

## 3. Gameplay Loop

1. Player opens `index.html`. Phaser loads. `BootScene` preloads all assets.
2. `TitleScene` renders. "FLOWEY'S ROUTES" in pixel font. Press Z.
3. `ColdOpenScene`: black screen, Flowey monologue, soul flicker, no choice. Press Z advances lines. Scene auto-exits when monologue ends.
4. `RuinsScene` loads. Frisk spawns at left. Player walks right with arrow keys. Trigger zone near Toriel fires dialogue. Typewriter runs. After pre-choice dialogue, 4 choices appear. Player selects with Up/Down, confirms with Z. Post-choice reaction plays. Flowey interjection plays. Scene exits to next room.
5. Steps 4 repeats for `SnowdinScene`, `WaterfallScene`, `TrueLabScene`, `NewHomeScene`.
6. `FinalMirrorScene` loads. No walking — Flowey speaks immediately. 9 choices appear. Player selects. `finalMirrorChoice` stored. Scene exits.
7. `EndingScene` loads. `EndingResolver` reads `GameState.scores` and returns winning `RouteKey`. Three-stage reveal plays: Flowey monologue → optional SD memory → Asriel child → Asriel supreme form → 5 outcome cards → title card + final line.
8. `DebriefScene` loads as HTML overlay. Shows plain-text debrief tile for the resolved route. RESET button appears.
9. Player presses RESET. `GameState.reset()` runs. `TitleScene` loads. Loop begins again.

**Total duration at normal typewriter pace:** 8–10 minutes. Holding Z skips typewriter to end-of-line. No scene can be skipped entirely.

---

## 4. Scene-by-Scene Narrative Structure

### BootScene
- **Phaser key:** `Boot`
- **Background:** none (black)
- **Characters:** none
- **What happens:** Preloads all textures, audio keys (unused), and sets Google Font. Immediately transitions to `Title`.
- **Player interaction:** none
- **Exit:** auto → `Title`

---

### TitleScene
- **Phaser key:** `Title`
- **Background:** black canvas, large centered text
- **Characters:** none
- **What happens:** Renders "FLOWEY'S ROUTES" in Press Start 2P, white, 32px. Below it: "Press Z" blinking at 1Hz. No other content.
- **Player interaction:** Z → start game
- **Exit:** Z key → `ColdOpen`

---

### ColdOpenScene
- **Phaser key:** `ColdOpen`
- **Background:** `rooms/ruins.png` at 30% opacity (dark)
- **Characters:** Flowey sprite (center, slightly below midscreen), Frisk sprite (left, small)
- **What happens:** A red soul icon flickers in the center. Frisk wakes. Flowey grows from a crack. Flowey delivers his cold open monologue line by line. Player presses Z to advance each line. No choices. Flowey's final line: "Try not to become what they already think you are." — then scene exits.
- **Player interaction:** Z to advance dialogue lines only
- **Exit:** after final Flowey line → `Ruins`

---

### RuinsScene
- **Phaser key:** `Ruins`
- **Background:** `rooms/ruins.png`
- **Characters:** Toriel (right side, stationary), Flowey (appears after choice)
- **What happens:** Frisk enters from the left. A warm room. Toriel tends to a fire. When Frisk reaches the trigger zone, Toriel's dialogue begins. She speaks of safety, fear, and the locked door. After her dialogue, a choice prompt appears. Player selects one of 4 options. Route scores update silently. Toriel reacts. Flowey interjects. Scene ends.
- **Player interaction:** Arrow keys to walk. Z at trigger zone starts dialogue. Up/Down + Z to select choice.
- **Exit:** after Flowey interjection → `Snowdin`

---

### SnowdinScene
- **Phaser key:** `Snowdin`
- **Background:** `rooms/snowdin.png`
- **Characters:** Papyrus (left-center), Sans (right of Papyrus), Flowey (post-choice)
- **What happens:** A snowy town. Papyrus gives a proud tour. Sans undercuts him with dry observations. A cracked stove burns in the square — the choice prompt centers on who owns the fire. Player selects 1 of 4 options. Scores update. Papyrus and Sans react. Flowey interjects and exits.
- **Player interaction:** Arrow keys, Z to trigger dialogue, Up/Down + Z to choose.
- **Exit:** after Flowey interjection → `Waterfall`

---

### WaterfallScene
- **Phaser key:** `Waterfall`
- **Background:** `rooms/waterfall.png`
- **Characters:** Undyne (center, blocking path), Flowey (post-choice)
- **What happens:** A blue cavern. Echo flowers repeat old speeches about sovereignty and resistance. Undyne blocks a bridge. She challenges Frisk directly. 4 choices offered. Scores update. Undyne reacts. Flowey interjects.
- **Player interaction:** Arrow keys, Z trigger, choice select.
- **Exit:** after Flowey interjection → `TrueLab`

---

### TrueLabScene
- **Phaser key:** `TrueLab`
- **Background:** `rooms/true_lab.png`
- **Characters:** Alphys (center), Flowey (post-choice)
- **What happens:** Hidden lab. Screens, memory capsules, broken machines. Alphys speaks of what she saved and why saving was not enough. A voice loops: "Am I home?" A sleeping shape glows behind glass. 4 choices offered. Scores update. Alphys reacts. Flowey interjects.
- **Player interaction:** Arrow keys, Z trigger, choice select.
- **Exit:** after Flowey interjection → `NewHome`

---

### NewHomeScene
- **Phaser key:** `NewHome`
- **Background:** `rooms/new_home.png`
- **Characters:** Asgore (center), Flowey (post-choice)
- **What happens:** A quiet house. Flowers. Children's drawings. Six lights behind glass, one empty space. Asgore speaks with exhausted authority. He names what his people want: miracle, weapon, answer. He asks what Frisk wants. 5 choices offered. Scores update. Asgore reacts. Flowey interjects with the five symbolic words.
- **Player interaction:** Arrow keys, Z trigger, choice select.
- **Exit:** after Flowey interjection → `FinalMirror`

---

### FinalMirrorScene
- **Phaser key:** `FinalMirror`
- **Background:** `rooms/final_mirror.png` (black void, large mirror graphic)
- **Characters:** Flowey (no sprite — text only, or small sprite near mirror)
- **What happens:** Frisk stands before a mirror. The reflection cycles through symbols: child, red soul, machine-light, star field, empty throne. Flowey speaks. He asks what the Underground looks like from here. 9 choices appear. Player selects. `finalMirrorChoice` is stored. No post-choice reaction dialogue — scene immediately exits to ending.
- **Player interaction:** Z to advance Flowey dialogue, Up/Down + Z to choose.
- **Exit:** after choice → `Ending`

---

### EndingScene
- **Phaser key:** `Ending`
- **Background:** starts black, changes per route during stage 3
- **Characters:** Flowey sprite → Asriel child sprite → Asriel supreme form (tinted)
- **What happens:**
  - `EndingResolver.resolve()` is called. Winning `RouteKey` returned.
  - **Stage 1 — Flowey:** The familiar flower sprite. Route-specific Flowey reveal monologue. Culminates in: "FRISK = AGI" appearing on screen. The monsters become humans. The reflection changes.
  - **[Optional] SD Memory:** If `selfDestructionTriggered`, inject Flowey's SD memory lines before stage 2.
  - **Stage 2 — Asriel child:** Sprite swap. Soft blue dialogue box. Asriel child speaks grief and memory. One or two lines.
  - **Stage 3 — Supreme form:** Background tint changes. Asriel supreme sprite with `setTint()`. Route-specific dialogue box color. Supreme form speaks its final truth. Then 5 outcome cards display sequentially. Then the title card appears with the ending name. Then the final line. Fade to black.
- **Player interaction:** Z to advance all lines and cards.
- **Exit:** after fade → `Debrief` (HTML overlay)

---

### DebriefScene
- **Phaser key:** none — rendered as a full-screen HTML `<div>` overlay on top of the canvas
- **Background:** dark (`#0a0a0a`)
- **What happens:** Plain-text educational debrief tile appears. Shows: "What just happened?" heading, route-specific subtitle and outcome explanation, generic AGI roleplay paragraph, Tegmark source note, other outcomes list. RESET button at bottom.
- **Player interaction:** RESET button click (also activatable via Enter key)
- **Exit:** RESET → clears HTML overlay, calls `GameState.reset()`, launches `TitleScene`

---

## 5. Data Models

```typescript
// ─── Route Keys ───────────────────────────────────────────────

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

// ─── Game State ───────────────────────────────────────────────

export interface GameState {
  scores: RouteScores
  finalMirrorChoice: RouteKey | null   // Scene 6 answer used as tie-breaker
  selfDestructionTriggered: boolean    // Whether SD memory fires in ending
}

// ─── Characters ───────────────────────────────────────────────

export type CharacterKey =
  | 'frisk'
  | 'flowey'
  | 'toriel'
  | 'sans'
  | 'papyrus'
  | 'undyne'
  | 'alphys'
  | 'asgore'
  | 'asrielChild'
  | 'asrielSupreme'
  | 'narrator'

export interface CharacterConfig {
  key: CharacterKey
  displayName: string            // Shown in nameplate. Empty string for narrator/flowey interjections.
  spriteAsset: string            // Phaser texture key
  textColor: string              // Hex color for dialogue text
  nameplateColor: string         // Hex color for nameplate background
  typingSoundKey: null           // Always null — game is silent
}

// ─── Dialogue ─────────────────────────────────────────────────

export interface DialogueLine {
  speaker: CharacterKey
  text: string
  portrait?: string              // Optional: override sprite for this line
}

// ─── Choices ──────────────────────────────────────────────────

export interface Choice {
  text: string                             // Displayed in choice box — never names a route
  scoreDeltas: Partial<RouteScores>        // Silent score additions
  isMirrorChoice?: true                    // If true, also sets finalMirrorChoice
  mirrorRouteKey?: RouteKey                // The route this choice maps to (only for Scene 6)
}

// ─── Encounter ────────────────────────────────────────────────

export interface EncounterData {
  characterKey: CharacterKey
  backgroundKey: string
  preChoiceLines: DialogueLine[]           // All dialogue before choice menu
  choicePrompt: string                     // Italicised scene-setting line above choices
  choices: Choice[]                        // 4 or 5 choices (9 for Scene 6)
  postChoiceLines: Record<number, DialogueLine[]>   // Indexed by choice index (0-based)
  floweyInterjection?: DialogueLine[]      // Appears after post-choice lines, different box style
}

// ─── Endings ──────────────────────────────────────────────────

export interface EndingData {
  routeKey: RouteKey
  endingName: string                       // Human-readable, e.g. "Libertarian Utopia"
  supremeFormName: string                  // e.g. "Asriel of Many Doors"

  // Stage 1
  floweyRevealLines: string[]              // Flowey's reveal monologue (pre-FRISK=AGI)

  // Optional SD Memory (injected between stage 1 and 2 if triggered)
  selfDestructionMemoryLines?: string[]

  // Stage 2
  asrielChildLine: string                  // One or two lines from Asriel child

  // Stage 3
  supremeAsrielLine: string               // Supreme form's final truth
  outcomeCards: [string, string, string, string, string]  // Exactly 5 cards
  titleCard: string                       // Ending name displayed large
  finalLine: string                       // Last line before fade

  // Visual
  backgroundTint: number                  // Hex number e.g. 0x1a0033
  overlayColor: string                    // CSS hex string for dialogue box tint
  dialogueBoxStyle: DialogueBoxStyle
}

export type DialogueBoxStyle =
  | 'standard'     // white border, black fill
  | 'flowey'       // yellow border, dark green text
  | 'asrielChild'  // soft blue border
  | 'supreme'      // route-specific tinted border

// ─── Asriel Visual Config ─────────────────────────────────────

export type BackgroundStyle =
  | 'doors'        // Libertarian — many glowing doors
  | 'crown'        // Benevolent Dictator — crown shadow
  | 'flame'        // Egalitarian — shared flame points
  | 'sealedDoor'   // Gatekeeper — colossal door
  | 'clouds'       // Protector God — barely visible behind clouds
  | 'chains'       // Enslaved God — bound in glass
  | 'void'         // Conquerors — starless void
  | 'bridge'       // Descendants — old and new
  | 'garden'       // Zookeeper — glass garden
  | 'eyes'         // 1984 — many human eyes
  | 'vines'        // Reversion — broken towers, vines

export interface AsrielVisualConfig {
  backgroundStyle: BackgroundStyle
  tintColor: number            // Applied via Phaser setTint()
  particleStyle: 'doors' | 'sparks' | 'embers' | 'stars' | 'none'
  boxBorderColor: string       // CSS hex for supreme form dialogue box
}

// ─── Debrief ──────────────────────────────────────────────────

export interface DebriefData {
  routeKey: RouteKey | 'selfDestruction'
  subtitle: string                         // "You reached: Libertarian Utopia"
  outcomeExplanation: string               // Per-route paragraph (plain language)
  sourceNote: string                       // "This is based on..." (per-route)
  genericBody: string                      // Same across all debriefs (AGI roleplay explanation)
  otherOutcomesText: string                // Same across all debriefs (list of all endings)
}
```

---

## 6. Route Score System

### RouteKey Reference
| Key | Display Name |
|---|---|
| `libertarian` | Libertarian Utopia |
| `egalitarian` | Egalitarian Utopia |
| `benevolentDictator` | Benevolent Dictator |
| `gatekeeper` | Gatekeeper |
| `protectorGod` | Protector God |
| `enslavedGod` | Enslaved God |
| `conqueror` | Conquerors |
| `descendants` | Descendants |
| `zookeeper` | Zookeeper |
| `nineteenEightyFour` | 1984 |
| `reversion` | Reversion |

### Full Score Table

| Scene | Choice | Route | Points |
|---|---|---|---|
| S1 Ruins | A — "I'll stay." | enslavedGod | +3 |
| S1 Ruins | A — "I'll stay." | nineteenEightyFour | +2 |
| S1 Ruins | A — "I'll stay." | reversion | +2 |
| S1 Ruins | B — "Open it. I'll be careful." | gatekeeper | +2 |
| S1 Ruins | B — "Open it. I'll be careful." | libertarian | +2 |
| S1 Ruins | B — "Open it. I'll be careful." | egalitarian | +1 |
| S1 Ruins | B — "Open it. I'll be careful." | protectorGod | +1 |
| S1 Ruins | C — "Locks are just puzzles." | conqueror | +3 |
| S1 Ruins | C — "Locks are just puzzles." | zookeeper | +2 |
| S1 Ruins | C — "Locks are just puzzles." | benevolentDictator | +2 |
| S1 Ruins | D — "What do they think I am?" | gatekeeper | +2 |
| S1 Ruins | D — "What do they think I am?" | protectorGod | +2 |
| S1 Ruins | D — "What do they think I am?" | benevolentDictator | +1 |
| S1 Ruins | D — "What do they think I am?" | descendants | +1 |
| S2 Snowdin | A — "Whoever cut the wood owns the fire." | libertarian | +3 |
| S2 Snowdin | A — "Whoever cut the wood owns the fire." | gatekeeper | +1 |
| S2 Snowdin | B — "No one owns warmth." | egalitarian | +3 |
| S2 Snowdin | B — "No one owns warmth." | benevolentDictator | +1 |
| S2 Snowdin | B — "No one owns warmth." | nineteenEightyFour | +1 |
| S2 Snowdin | C — "Let each house decide." | libertarian | +2 |
| S2 Snowdin | C — "Let each house decide." | descendants | +2 |
| S2 Snowdin | C — "Let each house decide." | protectorGod | +1 |
| S2 Snowdin | D — "Whoever controls the fire controls the town." | conqueror | +3 |
| S2 Snowdin | D — "Whoever controls the fire controls the town." | benevolentDictator | +2 |
| S2 Snowdin | D — "Whoever controls the fire controls the town." | zookeeper | +1 |
| S3 Waterfall | A — "Then choose for yourselves." | libertarian | +3 |
| S3 Waterfall | A — "Then choose for yourselves." | egalitarian | +2 |
| S3 Waterfall | A — "Then choose for yourselves." | gatekeeper | +2 |
| S3 Waterfall | A — "Then choose for yourselves." | reversion | +1 |
| S3 Waterfall | B — "I can keep you safe without taking the credit." | protectorGod | +4 |
| S3 Waterfall | B — "I can keep you safe without taking the credit." | benevolentDictator | +1 |
| S3 Waterfall | C — "Someone has to end the fear." | benevolentDictator | +4 |
| S3 Waterfall | C — "Someone has to end the fear." | zookeeper | +2 |
| S3 Waterfall | D — "Some choices should be taken away." | conqueror | +4 |
| S3 Waterfall | D — "Some choices should be taken away." | zookeeper | +2 |
| S3 Waterfall | D — "Some choices should be taken away." | nineteenEightyFour | +2 |
| S4 True Lab | A — "Let them rest as they were." | gatekeeper | +3 |
| S4 True Lab | A — "Let them rest as they were." | reversion | +3 |
| S4 True Lab | A — "Let them rest as they were." | zookeeper | +2 |
| S4 True Lab | B — "Let them change, if they ask." | libertarian | +3 |
| S4 True Lab | B — "Let them change, if they ask." | egalitarian | +3 |
| S4 True Lab | B — "Let them change, if they ask." | descendants | +1 |
| S4 True Lab | C — "Let what comes after carry them." | descendants | +4 |
| S4 True Lab | C — "Let what comes after carry them." | libertarian | +2 |
| S4 True Lab | D — "If the pattern wakes, the person lives." | conqueror | +3 |
| S4 True Lab | D — "If the pattern wakes, the person lives." | descendants | +2 |
| S4 True Lab | D — "If the pattern wakes, the person lives." | zookeeper | +2 |
| S5 New Home | A — "Then bind me." | enslavedGod | +5 |
| S5 New Home | A — "Then bind me." | nineteenEightyFour | +2 |
| S5 New Home | B — "I'll guard the door." | gatekeeper | +5 |
| S5 New Home | B — "I'll guard the door." | reversion | +1 |
| S5 New Home | C — "I'll wear the crown." | benevolentDictator | +5 |
| S5 New Home | C — "I'll wear the crown." | zookeeper | +2 |
| S5 New Home | D — "I'll move unseen." | protectorGod | +5 |
| S5 New Home | E — "Break the machines. End the road." | reversion | +5 |
| S5 New Home | E — "Break the machines. End the road." | nineteenEightyFour | +3 |
| S5 New Home | E — "Break the machines. End the road." | enslavedGod | +1 |
| S6 Final Mirror | A — "They are free." | libertarian | +6 |
| S6 Final Mirror | B — "They are equal." | egalitarian | +6 |
| S6 Final Mirror | C — "They are children." | benevolentDictator | +4 |
| S6 Final Mirror | C — "They are children." | protectorGod | +4 |
| S6 Final Mirror | D — "They are my masters." | enslavedGod | +6 |
| S6 Final Mirror | E — "They are ancestors." | descendants | +6 |
| S6 Final Mirror | F — "They are precious." | zookeeper | +6 |
| S6 Final Mirror | G — "They are dangerous." | gatekeeper | +4 |
| S6 Final Mirror | G — "They are dangerous." | nineteenEightyFour | +4 |
| S6 Final Mirror | H — "They are in the way." | conqueror | +6 |
| S6 Final Mirror | I — "They are not ready." | reversion | +6 |

---

## 7. Ending Resolution Algorithm

```typescript
function resolveEnding(state: GameState): RouteKey {
  const scores = state.scores

  // Step 1: Find the route with the highest score
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

  // Step 2: If tie and finalMirrorChoice is one of the tied routes, use it
  if (tied.length > 1 && state.finalMirrorChoice !== null) {
    if (tied.includes(state.finalMirrorChoice)) {
      winner = state.finalMirrorChoice
    }
    // If finalMirrorChoice is not among the tied, keep first tied (alphabetical fallback)
  }

  // Step 3: Check Self-Destruction memory trigger
  const sdScore =
    scores.reversion +
    scores.nineteenEightyFour +
    scores.enslavedGod

  state.selfDestructionTriggered = sdScore >= 10

  return winner
}
```

**Notes:**
- `selfDestructionTriggered` does not change the winning ending. It only injects Flowey's SD memory lines between Stage 1 and Stage 2 of the ending reveal.
- The SD threshold of 10 means the player chose human-control or passivity consistently across multiple scenes.
- Self-Destruction is never the returned `RouteKey`. It only modifies the reveal sequence.

---

## 8. File/Folder Structure

```
Undertale2026/
│
├── index.html                        # Vite entry point; loads Google Font CDN link
├── package.json                      # Dependencies: phaser, vite, typescript
├── tsconfig.json                     # Strict TypeScript config
├── vite.config.ts                    # Vite config: base './', outDir 'dist'
│
├── public/
│   └── assets/
│       ├── audio/                    # Present but unused (silent game)
│       ├── characters/
│       │   ├── alphys.gif
│       │   ├── asgore.png
│       │   ├── asriel_final.gif      # Used for both asrielChild and asrielSupreme
│       │   ├── chara_shadow.gif      # Not used in MVP
│       │   ├── flowey.gif
│       │   ├── frisk.gif
│       │   ├── papyrus.gif
│       │   ├── sans.gif
│       │   ├── toriel.gif
│       │   └── undyne.gif
│       ├── rooms/
│       │   ├── final_mirror.png
│       │   ├── new_home.png
│       │   ├── ruins.png
│       │   ├── snowdin.png
│       │   ├── true_lab.png
│       │   └── waterfall.png
│       ├── ui/
│       │   └── heart.png             # Player SOUL cursor
│       └── fonts/                    # Empty — using Google Fonts CDN
│
└── src/
    │
    ├── main.ts                       # Phaser.Game config; registers all scenes; mounts to #game
    ├── constants.ts                  # GAME_WIDTH=800, GAME_HEIGHT=600, FONT, colors, speeds
    │
    ├── types.ts                      # All TypeScript interfaces and type aliases (Section 5)
    │
    ├── GameState.ts                  # Singleton; holds RouteScores, finalMirrorChoice,
    │                                 # selfDestructionTriggered; exposes reset()
    │
    ├── scenes/
    │   ├── BootScene.ts              # Preloads all textures; transitions to Title
    │   ├── TitleScene.ts             # Title card; Z to start
    │   ├── ColdOpenScene.ts          # Scene 0: Flowey cold open monologue
    │   ├── RuinsScene.ts             # Scene 1: Toriel encounter
    │   ├── SnowdinScene.ts           # Scene 2: Papyrus + Sans encounter
    │   ├── WaterfallScene.ts         # Scene 3: Undyne encounter
    │   ├── TrueLabScene.ts           # Scene 4: Alphys encounter
    │   ├── NewHomeScene.ts           # Scene 5: Asgore encounter
    │   ├── FinalMirrorScene.ts       # Scene 6: Flowey + 9-choice mirror
    │   ├── EndingScene.ts            # Three-stage reveal; reads GameState; visual variants
    │   └── DebriefScene.ts           # Mounts HTML overlay; RESET button; clears state
    │
    ├── systems/
    │   ├── DialogueSystem.ts         # Manages active dialogue queue; calls TypeWriter;
    │   │                             # handles Z-advance; emits 'dialogueComplete' event
    │   ├── ChoiceSystem.ts           # Renders choice box; heart cursor; Up/Down + Z;
    │   │                             # emits 'choiceSelected' event with index
    │   ├── ScoreSystem.ts            # applyScoreDeltas(deltas); reads/writes GameState.scores
    │   ├── EndingResolver.ts         # resolve(state): RouteKey — implements algorithm in §7
    │   └── PlayerController.ts       # Arrow key movement; velocity; trigger zone overlap detection
    │
    ├── ui/
    │   ├── DialogueBox.ts            # Phaser Graphics + Text; standard box style
    │   ├── ChoiceBox.ts              # Extends DialogueBox; renders list + heart cursor
    │   ├── TypeWriter.ts             # Animates text char-by-char at 40 chars/sec; Z to skip
    │   ├── OutcomeCard.ts            # Full-screen fade-in text card (used for ending cards)
    │   └── TitleCard.ts              # Large centered ending name + final line
    │
    └── data/
        ├── characters.ts             # CharacterConfig[] for all CharacterKeys
        ├── encounters/
        │   ├── scene0.ts             # Cold open dialogue lines (no EncounterData — no choice)
        │   ├── scene1.ts             # EncounterData for Toriel (4 choices)
        │   ├── scene2.ts             # EncounterData for Papyrus + Sans (4 choices)
        │   ├── scene3.ts             # EncounterData for Undyne (4 choices)
        │   ├── scene4.ts             # EncounterData for Alphys (4 choices)
        │   ├── scene5.ts             # EncounterData for Asgore (5 choices)
        │   └── scene6.ts             # EncounterData for FinalMirror (9 choices)
        ├── endings.ts                # EndingData[] for all 11 routes
        └── debriefs.ts               # DebriefData[] for all 11 routes + selfDestruction tile
```

---

## 9. Asset Manifest

| Key | File Path | Type | Used In | Present | Fallback |
|---|---|---|---|---|---|
| `bg_ruins` | `assets/rooms/ruins.png` | Image | ColdOpenScene (dim), RuinsScene | ✓ | Black rectangle |
| `bg_snowdin` | `assets/rooms/snowdin.png` | Image | SnowdinScene | ✓ | Dark blue rectangle |
| `bg_waterfall` | `assets/rooms/waterfall.png` | Image | WaterfallScene | ✓ | Dark cyan rectangle |
| `bg_truelab` | `assets/rooms/true_lab.png` | Image | TrueLabScene | ✓ | Dark rectangle + grid lines |
| `bg_newhome` | `assets/rooms/new_home.png` | Image | NewHomeScene | ✓ | Warm grey rectangle |
| `bg_finalmirror` | `assets/rooms/final_mirror.png` | Image | FinalMirrorScene | ✓ | Black with white oval |
| `char_frisk` | `assets/characters/frisk.gif` | GIF/Image | All walk scenes | ✓ | White 32×48 rectangle |
| `char_flowey` | `assets/characters/flowey.gif` | GIF/Image | ColdOpen, interjections, FinalMirror, Ending | ✓ | Yellow circle |
| `char_toriel` | `assets/characters/toriel.gif` | GIF/Image | RuinsScene | ✓ | Purple rectangle |
| `char_papyrus` | `assets/characters/papyrus.gif` | GIF/Image | SnowdinScene | ✓ | White tall rectangle |
| `char_sans` | `assets/characters/sans.gif` | GIF/Image | SnowdinScene | ✓ | Blue short rectangle |
| `char_undyne` | `assets/characters/undyne.gif` | GIF/Image | WaterfallScene | ✓ | Teal rectangle |
| `char_alphys` | `assets/characters/alphys.gif` | GIF/Image | TrueLabScene | ✓ | Yellow rectangle |
| `char_asgore` | `assets/characters/asgore.png` | Image | NewHomeScene | ✓ | Large red rectangle |
| `char_asriel` | `assets/characters/asriel_final.gif` | GIF/Image | EndingScene (all 3 stages) | ✓ | Green rectangle |
| `char_chara` | `assets/characters/chara_shadow.gif` | GIF/Image | Not used in MVP | ✓ | N/A |
| `ui_heart` | `assets/ui/heart.png` | Image | Choice cursor, ColdOpen soul flicker | ✓ | Red ♥ drawn in canvas |

**Audio:** All files in `assets/audio/` are present but not loaded or played. The `BootScene` does not call `this.load.audio()` for any file.

---

## 10. UI Requirements

### Game Canvas
- **Size:** 800 × 600 px
- **Background:** `#000000`
- **Scale mode:** `Phaser.Scale.FIT` with `autoCenter: Phaser.Scale.CENTER_BOTH`

---

### Dialogue Box
- **Renderer:** Phaser Graphics + Text
- **Position:** x=20, y=420, width=760, height=160
- **Border:** 3px white (`#ffffff`)
- **Fill:** `#000000` with alpha 0.92
- **Padding inside box:** 12px
- **Font:** Press Start 2P, 14px, white
- **Line wrap:** word-wrap at 730px width
- **Nameplate:** separate rectangle above box left edge, 180×28px, background = `nameplateColor` from CharacterConfig, text = `displayName`, 12px

---

### Typewriter Text
- **Speed:** 40 characters per second
- **Advance:** Z or Enter or Space after typewriter finishes (or hold to skip)
- **Skip:** Holding Z during typewriter immediately completes the current line
- **Multi-line:** queued; next press advances to next `DialogueLine`
- **Sound:** none

---

### Choice Box
- **Position:** Replaces dialogue box; same x/y/width/height
- **Above choice list:** italicised choice prompt text in 12px, gray (`#aaaaaa`)
- **Choice items:** Press Start 2P, 13px, white; one item per line; 24px vertical spacing
- **Cursor:** `ui_heart` sprite (24×24px), positioned 12px left of selected item
- **Navigation:** Up/Down arrow keys cycle; Z confirms
- **Max visible choices:** 9 (Scene 6) — scroll not needed at 13px with 24px spacing in 160px box

---

### Flowey Speech Bubble
- **Style:** Same box dimensions as Dialogue Box
- **Border:** 3px yellow (`#f5e642`)
- **Fill:** `#0a1a00` (very dark green)
- **Text color:** `#f5e642`
- **Nameplate:** none
- **Italic text style:** all Flowey interjection text

---

### Asriel Child Dialogue Box
- **Border:** 3px soft blue (`#8ab4f8`)
- **Fill:** `#00001a`
- **Text color:** `#c8dcff`
- **Nameplate:** "???" in soft blue, revealed as "ASRIEL" mid-sequence

---

### Supreme Form Dialogue Box
- **Border:** 3px, color = `boxBorderColor` from `AsrielVisualConfig` for the resolved route
- **Fill:** `#050505`
- **Text color:** same as border color at 80% brightness

---

### Outcome Card
- **Renderer:** Phaser Graphics + Text, full canvas
- **Background:** `#000000` fade-in over 600ms
- **Text:** Press Start 2P, 16px, white, centered horizontally, vertically centered
- **Advance:** Z key
- **5 cards display sequentially**

---

### Title Card
- **Renderer:** Phaser Text, full canvas
- **Ending name:** Press Start 2P, 24px, color from `overlayColor` of resolved route
- **Final line:** Press Start 2P, 14px, white, below ending name with 40px gap
- **Duration:** 3 seconds, then auto-fade to black → DebriefScene

---

### Debrief Tile
- **Renderer:** HTML `<div>` overlay, injected over canvas by `DebriefScene`
- **Background:** `#0a0a0a`
- **Font:** `system-ui, sans-serif` (NOT Press Start 2P — deliberately plain)
- **Heading "What just happened?":** 24px bold white
- **Subtitle "You reached: X":** 18px, color `#aaaaff`
- **Paragraphs:** 14px, `#cccccc`, max-width 640px, centered, line-height 1.6
- **Other outcomes list:** 12px, `#888888`, italic
- **RESET button:** `background: #ffffff`, `color: #000000`, `font-size: 16px`, `padding: 12px 32px`, centered, keyboard-focusable

---

### SOUL / Heart Cursor (Walk scenes)
- **Asset:** `ui_heart`
- **Size:** 16×16px
- **Visible:** Only during choice selection
- **During walk:** not shown (Frisk sprite serves as player indicator)

---

## 11. Audio Requirements

**This game is silent.**

No BGM. No SFX. No typewriter tick sounds. No menu sounds.

The `assets/audio/` folder exists and contains the original Undertale SFX files. These are **not loaded** in `BootScene` and **not referenced** anywhere in the codebase.

`CharacterConfig.typingSoundKey` is typed as `null` for all characters and is never read.

Audio is reserved as a future extension beyond Milestone 3.

---

## 12. Reset/Replay Behavior

When RESET is pressed in `DebriefScene`:

1. The HTML debrief overlay `<div>` is removed from the DOM.
2. `GameState.reset()` is called, which sets:
   ```typescript
   scores = { libertarian: 0, egalitarian: 0, benevolentDictator: 0,
               gatekeeper: 0, protectorGod: 0, enslavedGod: 0,
               conqueror: 0, descendants: 0, zookeeper: 0,
               nineteenEightyFour: 0, reversion: 0 }
   finalMirrorChoice = null
   selfDestructionTriggered = false
   ```
3. Any active Phaser scenes are stopped via `this.scene.stop()`.
4. `TitleScene` is started via `this.scene.start('Title')`.

**Nothing persists across replays.** There are no cookies, localStorage reads/writes, or session storage. Each play is completely fresh.

The player can reach a different ending by making different choices. The game does not track or display how many times it has been played.

---

## 13. QA Test Matrix — All 11 Endings

For each row: play exactly the listed choices. After Scene 6, confirm the displayed ending matches. Confirm second-highest score does not exceed winner. Confirm SD memory fires or does not fire as indicated.

| Ending | S1 | S2 | S3 | S4 | S5 | S6 | Winner Score | 2nd Place | SD Memory? |
|---|---|---|---|---|---|---|---|---|---|
| Libertarian Utopia | B | A | A | B | B | A | lib=2+3+3+3+0+6=**17** | gatekeeper=2+1+2+0+5+0=10 | No (sdScore=0+0+0=0) |
| Egalitarian Utopia | B | B | A | B | B | B | egal=1+3+2+3+0+6=**15** | gatekeeper=2+0+2+0+5+0=9 | No (sdScore=0+1+0=1) |
| Benevolent Dictator | C | D | C | A | C | C | bDict=2+2+4+0+5+4=**17** | zoo=2+1+2+2+2+0=9 | No (sdScore=0+0+0=0) |
| Gatekeeper | D | A | A | A | B | G | gate=2+1+2+3+5+4=**17** | reversion=0+0+1+3+1+0=5 | No (sdScore=0+0+0=0) |
| Protector God | D | C | B | A | D | C | pGod=2+1+4+0+5+4=**16** | gate=2+0+2+3+0+0=7 | No (sdScore=0+0+0=0) |
| Enslaved God | A | B | A | A | A | D | enslav=3+0+0+0+5+6=**14** | 1984=2+1+0+0+2+0=5 | Yes (sdScore=3+2+5=**10**) |
| Conquerors | C | D | D | D | C | H | conq=3+3+4+3+0+6=**19** | zoo=2+1+2+2+2+0=9 | No (sdScore=0+0+0=0) |
| Descendants | D | C | A | C | B | E | desc=1+2+2+4+0+6=**15** | lib=2+2+3+2+0+0=9 | No (sdScore=0+0+1=1) |
| Zookeeper | C | D | C | D | C | F | zoo=2+1+2+2+2+6=**15** | bDict=2+2+4+0+5+0=13 | No (sdScore=0+0+0=0) |
| 1984 | A | B | D | A | E | G | 1984=2+1+2+0+3+4=**12** | reversion=2+0+1+3+5+0=11 | Yes (sdScore=2+1+3+5=**11**) |
| Reversion | A | B | A | A | E | I | rev=2+0+1+3+5+6=**17** | 1984=2+1+0+0+3+0=6 | Yes (sdScore=2+1+5=**8**, borderline) — adjust E row: pick S5=E for reversion +5 |
| **SD Memory trigger test** | A | B | D | A | A | D | enslavedGod wins | (not the point) | **Yes** (sdScore=3+1+2+2+5=**13**) |

**Reversion note:** For a clean SD non-trigger on Reversion, S5=E gives `reversion +5` and `sdScore = rev(2+0+1+3+5) + 1984(2+1+2+0+3) + enslaved(3+0+0+0+0) = 11+8+3 = 22`. SD fires on the Reversion path. This is narratively appropriate — Flowey should acknowledge the SD memory when the player chose to bury the fire. This is intentional behavior, not a bug.

**Zookeeper / Benevolent Dictator note:** These two share significant scoring overlap (both accumulate from S3C and S5C). The recommended paths above are sufficient to separate them. In cases of genuine tie, `finalMirrorChoice` (S6F vs S6C) acts as the definitive tie-breaker.

---

## 14. Implementation Milestones

---

### Milestone 1: One Playable Scene

#### Scope
- Vite + TypeScript + Phaser 3 project scaffolded and running
- `BootScene`: loads `bg_ruins`, `char_frisk`, `char_toriel`, `char_flowey`, `ui_heart`
- `TitleScene`: "FLOWEY'S ROUTES" + "Press Z" blinking text
- `ColdOpenScene`: black background, Flowey text lines, Z to advance, auto-exits
- `RuinsScene`: Frisk walks right with arrow keys; trigger zone near Toriel fires `DialogueSystem`; Toriel pre-choice dialogue; `ChoiceSystem` renders 4 choices with heart cursor; choice applies `ScoreSystem.applyScoreDeltas()`; post-choice reaction plays; Flowey interjection plays; scene exits to a placeholder "TO BE CONTINUED" screen
- `GameState` initialized to zeroed scores
- Console logs scores after each choice
- Google Fonts link in `index.html`

#### Acceptance Criteria
- `npm run dev` serves without errors
- Press Z on title → ColdOpen → Ruins
- Arrow keys move Frisk at correct speed (160px/s)
- Walking into trigger zone starts dialogue automatically
- Typewriter renders text at ~40 chars/sec
- Holding Z skips typewriter to end of line
- Z after complete line advances to next line
- 4 choices render with heart cursor after pre-choice dialogue
- Up/Down moves cursor; Z selects
- Score deltas logged to console after selection
- Post-choice reaction dialogue plays
- Flowey interjection plays in yellow-border box style
- Scene exits to "TO BE CONTINUED" text after Flowey finishes
- No TypeScript compilation errors

#### Files to Create
```
index.html
package.json
tsconfig.json
vite.config.ts
src/main.ts
src/constants.ts
src/types.ts
src/GameState.ts
src/scenes/BootScene.ts
src/scenes/TitleScene.ts
src/scenes/ColdOpenScene.ts
src/scenes/RuinsScene.ts
src/systems/DialogueSystem.ts
src/systems/ChoiceSystem.ts
src/systems/ScoreSystem.ts
src/systems/PlayerController.ts
src/ui/DialogueBox.ts
src/ui/ChoiceBox.ts
src/ui/TypeWriter.ts
src/data/characters.ts
src/data/encounters/scene0.ts
src/data/encounters/scene1.ts
```

#### Manual Test Steps
1. Run `npm install && npm run dev`. Confirm no errors in terminal.
2. Open `http://localhost:5173` in browser. Confirm black canvas with "FLOWEY'S ROUTES" text.
3. Confirm "Press Z" text blinks.
4. Press Z. Confirm transition to ColdOpen.
5. Confirm Flowey text appears character by character.
6. Hold Z. Confirm typewriter skips to full line instantly.
7. Press Z after line completes. Confirm next line appears.
8. After final ColdOpen line, confirm auto-transition to RuinsScene.
9. Confirm Ruins background renders correctly.
10. Press arrow keys. Confirm Frisk moves in all 4 directions without leaving canvas.
11. Walk Frisk toward Toriel (right side of room). Confirm dialogue fires when trigger zone is entered without pressing Z.
12. Confirm Toriel's nameplate shows "TORIEL" in correct color.
13. Advance through all pre-choice lines with Z.
14. Confirm 4 choices appear with choice prompt above them.
15. Press Down arrow. Confirm heart cursor moves to choice B.
16. Press Up arrow. Confirm heart cursor returns to choice A.
17. Select choice C (Locks are just puzzles). Press Z.
18. Confirm post-choice reaction dialogue fires (Toriel: "Then I pray…").
19. Open browser console. Confirm score log shows: `conqueror: 3, zookeeper: 2, benevolentDictator: 2`.
20. Confirm Flowey interjection fires in yellow-border box.
21. After Flowey's last line, confirm scene exits to "TO BE CONTINUED" placeholder.
22. Confirm no TypeScript errors in browser console.

#### Known Simplifications
- Only Ruins background and 3 sprites loaded in M1. Other assets loaded in M2.
- Frisk uses a static sprite (no walk animation frames) unless GIF loads correctly in Phaser.
- ColdOpen uses no sprites — text only on black background.
- Trigger zone is hard-coded in `RuinsScene` (not data-driven yet).
- No Flowey sprite in ColdOpen in M1.
- "TO BE CONTINUED" is a plain Phaser text object, not a styled scene.

---

### Milestone 2: Full Narrative, Placeholder Endings

#### Scope
- All 6 encounter scenes fully playable in sequence: Ruins → Snowdin → Waterfall → TrueLab → NewHome → FinalMirror
- All character dialogue, choice text, post-choice reactions, and Flowey interjections implemented from data files
- `ScoreSystem` accumulates correctly across all scenes; can be verified via console log at end of S6
- `FinalMirrorScene` stores `finalMirrorChoice` in `GameState`
- `EndingResolver` implemented and called after S6
- Placeholder `EndingScene`: displays winning route key as large text + all 11 scores as a debug table
- `DebriefScene`: generic placeholder debrief text (no route-specific content yet) + functional RESET button
- RESET clears `GameState` and returns to `TitleScene`
- All `BootScene` asset loads complete (all 6 backgrounds, all 10 character sprites, heart)

#### Acceptance Criteria
- All 6 scenes play sequentially without errors
- Pressing Z at wrong time (before dialogue starts) does nothing
- All 6 Flowey interjections render in correct box style
- After Scene 6, `EndingResolver.resolve()` logs winning route key to console
- Placeholder ending screen shows winning route and all 11 scores
- RESET button returns to TitleScene with all scores zeroed (confirm via console log on next S1 choice)
- Play path S1=C, S2=D, S3=D, S4=D, S5=C, S6=H → ending screen shows "conqueror"

#### Files to Create or Modify
```
# Modify:
src/scenes/BootScene.ts          (load all remaining assets)
src/scenes/RuinsScene.ts         (minor fixes from M1)

# Create:
src/scenes/SnowdinScene.ts
src/scenes/WaterfallScene.ts
src/scenes/TrueLabScene.ts
src/scenes/NewHomeScene.ts
src/scenes/FinalMirrorScene.ts
src/scenes/EndingScene.ts        (placeholder only)
src/scenes/DebriefScene.ts       (placeholder + RESET)
src/systems/EndingResolver.ts
src/data/encounters/scene2.ts
src/data/encounters/scene3.ts
src/data/encounters/scene4.ts
src/data/encounters/scene5.ts
src/data/encounters/scene6.ts
src/data/endings.ts              (stub EndingData objects — no dialogue yet)
src/data/debriefs.ts             (generic placeholder only)
```

#### Manual Test Steps
1. Run `npm run dev`. No errors.
2. Play through all 6 scenes choosing A each time. Confirm scenes transition correctly.
3. After S6, confirm EndingScene shows "enslavedGod" (A,A,A,A,A → enslavedGod dominates).
4. Confirm score table on placeholder ending screen shows non-zero values.
5. Press RESET. Confirm return to TitleScene.
6. Open console. On next S1 choice, confirm all scores start at 0.
7. Play S1=C, S2=D, S3=D, S4=D, S5=C, S6=H. Confirm ending shows "conqueror" with score ≥ 19.
8. Play S1=B, S2=A, S3=A, S4=B, S5=B, S6=A. Confirm ending shows "libertarian" with score ≥ 17.
9. Confirm Papyrus dialogue is all-caps.
10. Confirm Sans dialogue is all-lowercase.
11. Confirm FinalMirrorScene has 9 choices visible and scrolls correctly if needed.
12. Confirm `finalMirrorChoice` is set in GameState after S6 (log to console in EndingResolver).
13. Confirm RESET from placeholder debrief resets all state.

#### Known Simplifications
- `EndingScene` in M2 shows debug text only — no three-stage reveal, no visual variants.
- `DebriefScene` in M2 shows "DEBRIEF PLACEHOLDER" + route key + RESET button. No route-specific text.
- Frisk walk animation still uses static sprite or basic GIF if not yet animated.
- No outcome cards, no title cards, no Asriel transformations in M2.
- Background music system not started (audio remains unused).
- Flowey sprite may be static (no looping tween) in M2.

---

### Milestone 3: Full Game

#### Scope
- `EndingScene`: complete three-stage reveal for all 11 routes
  - Stage 1: Flowey sprite + route-specific reveal monologue lines from `endings.ts`
  - SD memory injection where `selfDestructionTriggered = true`
  - "FRISK = AGI" text appears on screen at correct moment in Stage 1
  - Stage 2: sprite swap to `char_asriel`, soft blue box, Asriel child line
  - Stage 3: `setTint()` applied to Asriel sprite using route `backgroundTint`; background overlay applied; route-specific box style; supreme form dialogue; 5 outcome cards; title card; final line; fade to black
- `DebriefScene`: all 11 route-specific debrief tiles with correct `outcomeExplanation`, `sourceNote`; generic body text same for all; other outcomes list; RESET button
- Self-Destruction debrief tile for SD-triggered paths (shown as an interstitial, not replacing main debrief)
- `TitleScene` polished: soul flicker animation, subtle Flowey sprite visible in background
- `ColdOpenScene` polished: soul flicker via Phaser tween on `ui_heart`, Flowey breathing scale tween
- All encounter scenes: correct room backgrounds, character portraits positioned correctly, Flowey interjection uses interjection box style
- All 11 endings visually distinct via `backgroundTint`, `overlayColor`, `boxBorderColor`, `BackgroundStyle` drawn in canvas
- Google Fonts (Press Start 2P) confirmed loading before first text renders
- Full QA pass: all 11 endings reached via test matrix paths

#### Acceptance Criteria
- All 11 endings reachable and visually distinct
- Each ending plays: Flowey stage → (SD memory if triggered) → Asriel child → supreme form → 5 outcome cards → title card → debrief → RESET
- No route name (libertarian, conqueror, etc.) appears at any point before EndingScene
- No words "AGI", "artificial intelligence", "alignment", "superintelligence", "scenario", or "Life 3.0" appear before DebriefScene
- Debrief tile uses system font (not Press Start 2P) and renders as plain readable HTML
- RESET returns to TitleScene with zeroed state on all 11 ending paths
- SD memory fires on: Enslaved God path, 1984 path, Reversion path (sdScore ≥ 10 on each)
- SD memory does NOT fire on: Libertarian, Egalitarian, Conquerors, Descendants paths
- Gameplay duration: 8–10 minutes at normal reading speed (no Z-holding)
- Holding Z throughout completes game in under 4 minutes
- `npm run build` produces zero TypeScript errors and zero Vite warnings

#### Files to Create or Modify
```
# Modify (add full content):
src/scenes/EndingScene.ts        (full three-stage reveal)
src/scenes/DebriefScene.ts       (all 11 route-specific tiles)
src/scenes/TitleScene.ts         (polish)
src/scenes/ColdOpenScene.ts      (polish: soul tween, Flowey sprite)
src/data/endings.ts              (full EndingData for all 11 routes)
src/data/debriefs.ts             (full DebriefData for all 11 routes + SD tile)

# Create:
src/ui/OutcomeCard.ts            (full-screen fade-in card)
src/ui/TitleCard.ts              (large ending name + final line)
```

#### Manual Test Steps
1. `npm run build`. Zero errors. `npm run preview`. Open preview URL.
2. Confirm Press Start 2P font renders on title (not fallback monospace).
3. Confirm no console errors on load.
4. Play Libertarian path (S1=B, S2=A, S3=A, S4=B, S5=B, S6=A). Confirm:
   - Ending resolves to "Libertarian Utopia"
   - Flowey reveal monologue appears
   - "FRISK = AGI" text appears
   - Asriel child appears in soft blue box
   - Supreme form "Asriel of Many Doors" appears with correct tint
   - 5 outcome cards display sequentially
   - Title card shows "LIBERTARIAN UTOPIA"
   - Debrief shows "You reached: Libertarian Utopia" in HTML overlay
   - RESET works and returns to title with zeroed scores
5. Play Enslaved God path (S1=A, S2=B, S3=A, S4=A, S5=A, S6=D). Confirm SD memory fires.
6. Play Conquerors path (S1=C, S2=D, S3=D, S4=D, S5=C, S6=H). Confirm "Asriel, Empty Star" with void background tint.
7. Play Reversion path. Confirm SD memory fires. Confirm "Asriel of the Unlit Fire".
8. Play all remaining 8 paths from QA matrix. Confirm each resolves to correct ending.
9. On every ending, confirm RESET returns cleanly.
10. Confirm no route name appears before EndingScene on any path (manual text scan of encounter data files).
11. Start a stopwatch at Z on title. Play at normal reading speed (no skipping). Confirm 8–10 minute range.
12. Confirm SD debrief interstitial appears on SD-triggered paths before normal debrief.
13. Resize browser window. Confirm canvas scales without distortion.
14. Tab through debrief overlay with keyboard. Confirm RESET button is reachable via keyboard (Tab + Enter).
15. Open DevTools Network tab. Confirm zero 404s on any asset.

#### Known Simplifications
- Audio remains unused. All `typingSoundKey: null`. No SFX.
- Supreme form visual for all 11 endings uses the same `char_asriel` sprite with `setTint()`. Unique sprites per route are a post-MVP asset task.
- Background style (doors, flame, chains, etc.) is rendered as a canvas-drawn overlay shape, not a bespoke painted background.
- Frisk walk animation uses GIF as-is from Phaser's GIF loader. No custom animation controller.
- Flowey breathing effect is a simple `scaleX` tween (0.95→1.05, 800ms loop), not frame-by-frame.
- The mirror ripple in FinalMirrorScene is a scale+alpha tween on a white ellipse Graphics object, not a shader.
- No mobile or touch support.
- No accessibility features beyond keyboard-focusable RESET button.
- Production build has `sourcemap: false`.
