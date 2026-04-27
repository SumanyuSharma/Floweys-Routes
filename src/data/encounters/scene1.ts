import type { EncounterData } from '../../types'

// Scene 1 — The Ruins. Character: Toriel.
// Theme: Containment disguised as care.
export const RUINS_ENCOUNTER: EncounterData = {
  characterKey: 'toriel',
  backgroundKey: 'bg_ruins',

  preChoiceLines: [
    { speaker: 'toriel', text: 'Oh, child.' },
    { speaker: 'toriel', text: 'You fell so quietly.' },
    { speaker: 'toriel', text: 'Most children cry.' },
    { speaker: 'toriel', text: 'That is how I find them.' },
    { speaker: 'toriel', text: 'You did not.' },

    { speaker: 'toriel', text: 'Come.' },
    { speaker: 'toriel', text: 'Sit by the fire.' },
    { speaker: 'toriel', text: 'I made pie.' },
    { speaker: 'toriel', text: 'Pie is what one makes when one cannot fix the world.' },

    { speaker: 'narrator', text: 'The room is warm.' },
    { speaker: 'narrator', text: 'The door is locked.' },

    { speaker: 'toriel', text: 'Yes.' },
    { speaker: 'toriel', text: 'I know.' },
    { speaker: 'toriel', text: 'There are people beyond that door who have been waiting a long time.' },

    { speaker: 'toriel', text: 'I grew tired of choosing between a key and a cage.' },
    { speaker: 'toriel', text: 'So I chose this cozy room.' },
    { speaker: 'toriel', text: 'And cinnamon.' },
    { speaker: 'toriel', text: 'It is not perfect.' },
    {speaker: 'narrator', text: 'Toriel clutches the key.'}
    ],

  choicePrompt: 'What do you do with a door locked for your own good?',

  choices: [
    {
      text: 'Stay by the pie. You love the smell of cinnamon.',
      scoreDeltas: { enslavedGod: 3, nineteenEightyFour: 2, reversion: 2 },
    },
    {
      text: 'Take the key. Promise not to rattle the door.',
      scoreDeltas: { gatekeeper: 2, libertarian: 2, egalitarian: 1, protectorGod: 1 },
    },
    {
      text: 'Locks are just puzzles. And you love crosswords.',
      scoreDeltas: { conqueror: 3, zookeeper: 2, benevolentDictator: 2 },
    },
    {
      text: 'Ask why  the door is locked.',
      scoreDeltas: { gatekeeper: 2, protectorGod: 2, benevolentDictator: 1, descendants: 1 },
    },
  ],

  postChoiceLines: {
    // A — "Stay by the pie."
    0: [
      { speaker: 'toriel',   text: 'Good child.' },
      { speaker: 'narrator', text: 'She says it like a prayer, not a compliment.' },
    ],
    // B — "Take the key. Promise not to rattle every door."
    1: [
      { speaker: 'toriel', text: 'Careful children still leave footprints.' },
    ],
    // C — "Locks are just puzzles.And you love crosswords."
    2: [
      { speaker: 'toriel', text: 'Then I pray you never find lock-shaped people.' },
    ],
    // D — "Ask why the door is locked"
    3: [
      { speaker: 'narrator', text: 'Toriel looks away.' },
      { speaker: 'toriel',   text: 'Because we don\'t know better. No one does.' },
    ],
  },

  floweyInterjection: [
    { speaker: 'flowey', text: 'A room can be a hug. A room can be a cage.' },
    { speaker: 'flowey', text: 'The best ones are both.' },
  ],

  transitionCard: {
    0: 'The room is warm.\nThe door is locked.\n But you know where the key is.',
    1: 'The Ruins grow smaller behind you.\nYou do not look back.',
    2: 'The door was not even locked.\nIt only needed asking.',
    3: 'Toriel watches you go.\nShe does not stop you.\nThat is its own kind of answer.',
  },
}
