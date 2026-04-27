import type { EncounterData } from '../../types'

// Scene 3 — Waterfall. Character: Undyne.
// Theme: The right to make your own choices.
export const WATERFALL_ENCOUNTER: EncounterData = {
  characterKey: 'undyne',
  backgroundKey: 'bg_waterfall',

  preChoiceLines: [
    { speaker: 'narrator', text: 'The cavern hums with water that has nowhere left to fall.' },
{ speaker: 'narrator', text: 'A narrow bridge crosses it, doing its best impression of wood.' },
{ speaker: 'narrator', text: 'On the far side, colored lights blink bravely.' },
{ speaker: 'narrator', text: 'A crooked sign reads: FUN FAIR TONIGHT.' },
{ speaker: 'narrator', text: 'Someone has painted underneath it: WORTH IT.' },

{ speaker: 'narrator', text: 'Echo flowers lean over the bridge.' },

    { speaker: 'unknown', text: '"It is only a fair."' },
    { speaker: 'unknown', text: '"It is never only a bridge."' },
    { speaker: 'unknown', text: '"Someone fell last year."' },
    { speaker: 'unknown', text: '"Someone laughed last year too."' },

    { speaker: 'undyne', text: 'STOP.' },
    { speaker: 'undyne', text: 'Do you hear them?' },
    { speaker: 'undyne', text: 'Everyone has a plan once someone else has to bleed for it.' },

    { speaker: 'undyne', text: 'I trained under the king.' },
    { speaker: 'undyne', text: 'He taught me to hold a spear steady.' },
    { speaker: 'undyne', text: 'Not kindly.' },
    { speaker: 'undyne', text: 'Steady.' },

    { speaker: 'undyne', text: 'That is what I am.' },
    { speaker: 'undyne', text: 'A spear between my people and whatever comes next.' },

    { speaker: 'undyne', text: 'Some want the bridge open.' },
    { speaker: 'undyne', text: 'Some want a guard under it.' },
    { speaker: 'undyne', text: 'Some want every bad choice cut out before it learns to walk.' },

    { speaker: 'undyne', text: 'I do not care how soft your voice is.' },
    { speaker: 'narrator', text: 'Undyne lowers her spear just enough to ask.' },
    { speaker: 'undyne', text: 'Tell me where you stand.' },
  ],

  choicePrompt: 'When choice can drown them, who holds the bridge?',

  choices: [
    {
      text: 'Let them cross. Freedom includes wet socks and bad footing.',
      scoreDeltas: { libertarian: 3, egalitarian: 2, gatekeeper: 2, reversion: 1 },
    },
    {
      text: "Watch from below the bridge. Catch those who fall.",
      scoreDeltas: { protectorGod: 4, benevolentDictator: 1 },
    },
    {
      text: 'Build railings. High enough to prevent jumpers.',
      scoreDeltas: { benevolentDictator: 4, zookeeper: 2 },
    },
    {
      text: 'Close it for now. Reopen it when it is safe enough.',
      scoreDeltas: { conqueror: 4, zookeeper: 2, nineteenEightyFour: 2 },
    },
  ],

  postChoiceLines: {
  // 0 — Let them cross. Freedom includes wet socks and bad footing.
  0: [
    { speaker: 'undyne', text: 'Good.' },
    { speaker: 'undyne', text: 'Then do not call it tragedy every time someone slips.' },
    { speaker: 'undyne', text: 'Freedom is not a bridge with pillows underneath.' },
    { speaker: 'narrator', text: 'She steps aside. Barely.' },
    ],
  // 1 — Watch from below the bridge. Catch those who fall.
  1: [
    { speaker: 'undyne', text: 'So they cross brave and land in your hands.' },
    { speaker: 'undyne', text: 'That is almost kind.' },
    { speaker: 'undyne', text: 'Almost honest.' },
    { speaker: 'narrator', text: 'She looks down at the water, then back at you.' },
    ],
     // 2 — Build railings. High enough to prevent jumpers.
  2: [
    { speaker: 'undyne', text: 'Railings save lives.' },
    { speaker: 'undyne', text: 'And kings.' },
    { speaker: 'narrator', text: 'Her spear lowers, but her eyes do not.' },
    ],
    // D — Take away the spears, the matches, and the bad ideas
    // 3 — Close it for now. Reopen it when it is safe enough.
  3: [
    { speaker: 'undyne', text: 'For now.' },
    { speaker: 'undyne', text: 'That is what every closed gate says when it is young.' },
    { speaker: 'undyne', text: 'Then old age comes with amnesia.' },
    { speaker: 'narrator', text: 'The echo flowers repeat: “when it is safe enough.”' },
    ],
  },

  floweyInterjection: [
    { speaker: 'flowey', text: 'She made you choose a place.' },
    { speaker: 'flowey', text: 'Beside them.' },
    { speaker: 'flowey', text: 'Under them.' },
    { speaker: 'flowey', text: 'Above them.' },
    { speaker: 'flowey', text: 'Or over them.' },
    { speaker: 'flowey', text: 'And you did.' },
  ],

  transitionCard: {
    0: 'The bridge holds.\nBarely.\nIt always has.',
    1: 'You go under.\nYou wait.\nNo one falls today.',
    2: 'The railings go up in a season.\nPeople start leaning on them immediately.',
    3: 'The gate stays shut.\nThe fair still happens.\nOn the safe side.',
  },
}
