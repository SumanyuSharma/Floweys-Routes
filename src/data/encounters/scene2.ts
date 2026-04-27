import type { EncounterData } from '../../types'

// Scene 2 — Snowdin. Characters: Papyrus + Sans.
// Theme: Ownership of shared resources.
export const SNOWDIN_ENCOUNTER: EncounterData = {
  characterKey: 'papyrus',
  backgroundKey: 'bg_snowdin',

  preChoiceLines: [
    { speaker: 'papyrus', text: 'WELCOME TO SNOWDIN!' },
    { speaker: 'papyrus', text: 'A TOWN OF ORDER, COMMUNITY, AND HEROICALLY SHOVELED PATHS!' },
    { speaker: 'sans', text: 'mostly shoveled.' },

    { speaker: 'papyrus', text: 'BEHOLD!' },
    { speaker: 'papyrus', text: 'THE INN!' },
    { speaker: 'papyrus', text: 'THE SHOP!' },
    { speaker: 'papyrus', text: 'THE NOTICEBOARD OF CIVIC COMPLAINTS!' },
    { speaker: 'papyrus', text: 'AND THERE, IN THE SQUARE, OUR GREAT HEAT-CORE!' },
    { speaker: 'sans', text: 'old furnace.' },
    { speaker: 'papyrus', text: 'OUR GREAT OLD FURNACE!' },

    { speaker: 'narrator', text: 'The metal shell gives a tired cough.' },
    { speaker: 'narrator', text: 'The pipes under the snow tick softly.' },
    { speaker: 'narrator', text: 'Then go quiet.' },

    { speaker: 'papyrus', text: '...AH.' },
    { speaker: 'sans', text: 'that is not ideal.' },

    { speaker: 'papyrus', text: 'THE KEEPER SAYS SHE KEPT IT RUNNING ALL WINTER.' },
    { speaker: 'papyrus', text: 'THE FAMILIES WANT HEAT SENT TO THEIR OWN HOMES.' },
    { speaker: 'sans', text: 'and the mayor wants everyone in the square where he can count them.' },

    { speaker: 'narrator', text: 'You step closer.' },
    { speaker: 'narrator', text: 'The heat-core hums under your hand.' },
    { speaker: 'narrator', text: 'Beneath the snow, old pipes begin to glow.' },

    { speaker: 'papyrus', text: 'OH!' },
    { speaker: 'papyrus', text: 'IT LISTENS TO YOU!' },
    { speaker: 'sans', text: 'careful, kid.' },
    { speaker: 'sans', text: 'around here, whoever fixes a thing gets blamed for what it becomes.' },
    {speaker: 'narrator', text: 'The heat-core wakes. The town leans toward it.' },
  ],

  choicePrompt: 'When warmth is finite, how should it flow?',

  choices: [
    {
      text: 'Shouln\'t the keeper decide? She repairs the furnace.',
      scoreDeltas: { libertarian: 3, gatekeeper: 1 },
    },
    {
      text: 'Warm every home equally. Everyone can be lukewarm together.',
      scoreDeltas: { egalitarian: 3, benevolentDictator: 1, nineteenEightyFour: 1 },
    },
    {
      text: 'Let each house decide. Give every house a valve.',
      scoreDeltas: { libertarian: 2, descendants: 2, protectorGod: 1 },
    },
    {
      text: 'Keep the square warm. More efficient that way.',
      scoreDeltas: { conqueror: 3, benevolentDictator: 2, zookeeper: 1 },
    },
  ],

  postChoiceLines: {
    // A — Thaw the keeper first. She kept the Night King at bay.

    0: [
      { speaker: 'papyrus', text: 'A REWARD FOR SERVICE!' },
      { speaker: 'papyrus', text: 'VERY FAIR! VERY BOOTSTRAPPY!' },
      { speaker: 'sans', text: 'hope gratitude makes good insulation.' },
    ],
    // B — Warm every home equally. Everyone can be lukewarm together.
    1: [
      { speaker: 'papyrus', text: 'EVERY WINDOW IS GLOWING!' },
      { speaker: 'papyrus', text: 'DIMLY!' },
      { speaker: 'sans', text: 'nothing says justice like shared shivering.' },
    ],
    // C — Let each house decide. Give every home a valve
    2: [
      { speaker: 'papyrus', text: 'MANY VALVES! MANY CHOICES!' },
      { speaker: 'papyrus', text: 'THE TOWN IS NOW A DEMOCRACY OF KNOBS!' },
      { speaker: 'sans', text: 'could work. probably won\'t.' },
    ],
    // D — Keep the square warm. More efficient that way.
    3: [
      { speaker: 'papyrus', text: 'THE SQUARE IS WONDERFULLY WARM!' },
      { speaker: 'papyrus', text: 'AND SUDDENLY VERY CROWDED!' },
      { speaker: 'sans', text: 'reminds me of the pandemic somehow. were people huddling? distancing? i don\'t know..' },
    ],
  },

  floweyInterjection: [
    { speaker: 'flowey', text: 'There.' },
    { speaker: 'flowey', text: 'A little less conversation, a little more action.' },
    { speaker: 'flowey', text: 'A little more warmth.' },
    { speaker: 'flowey', text: 'And a little less fight.' },
    { speaker: 'flowey', text: 'A little control to make it right.' },
    { speaker: 'flowey', text: 'That is usually enough to become King. Of Rock and Roll, I mean.' },
  ],

  transitionCard: {
    0: 'The keeper\'s pipes run warm.\nIs she the keeper, or the mechanic, or the heat commissioner.\nNext thing to argue about.',
    1: 'Every window is lit.\nDimly.\nBut equally.',
    2: 'The valves are installed by Tuesday.\nBy Wednesday, there are arguments about the valves.',
    3: 'The square fills.\nConversations happen that would not have happened in separate rooms.\nSome of them are good ones.',
  },
}
