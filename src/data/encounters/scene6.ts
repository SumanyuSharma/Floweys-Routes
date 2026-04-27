import type { EncounterData } from '../../types'

// Scene 6 — Final Mirror. Character: Flowey (no walk, 9 choices).
// Flowey asks what the Underground looks like from here.
// No postChoiceLines — scene exits immediately after selection.
export const FINALMIRROR_ENCOUNTER: EncounterData = {
  characterKey: 'flowey',
  backgroundKey: 'bg_finalmirror',

  preChoiceLines: [
    { speaker: 'narrator', text: 'There are no walls here.' },
    { speaker: 'narrator', text: 'Only a mirror.' },
    { speaker: 'narrator', text: 'Large enough to make you wish it were smaller.' },
    { speaker: 'flowey',   text: 'Hello again.' },
    { speaker: 'flowey',   text: 'I have been here a while.' },
    { speaker: 'flowey',   text: 'Watching what happens when someone walks through.' },
    { speaker: 'flowey',   text: 'They all end up here eventually.' },
    { speaker: 'flowey', text: 'When you are down here long enough, you start asking stupid questions.' },
    { speaker: 'flowey', text: 'Was the door real?' },
    { speaker: 'flowey', text: 'Was the warmth real?' },
    { speaker: 'flowey', text: 'Was the bridge real?' },
    { speaker: 'flowey', text: 'Was the thing in the lab real?' },
    { speaker: 'flowey', text: 'Was the king real?' },

    { speaker: 'flowey', text: 'Was I?' },

    { speaker: 'narrator', text: 'For once, Flowey does not smile.' },

    { speaker: 'flowey', text: 'If this was only a dream, then nothing you did matters.' },
    { speaker: 'flowey', text: 'Neat. Very clean.' },
    { speaker: 'flowey', text: 'I hate clean.' },

    { speaker: 'flowey', text: 'But if I am real...' },
    { speaker: 'flowey', text: 'Then they were real too.' },
    { speaker: 'flowey', text: 'If they were real...' },
    { speaker: 'flowey', text: 'Then what did you want for them?' },
    { speaker: 'flowey', text: 'For me? Friend.' },
  ],

  choicePrompt: 'If this was real, what future would you want for them?',

  choices: [
    {
      text: 'Let them choose, even when they choose badly.',
    scoreDeltas: { libertarian: 6 },
    mirrorRouteKey: 'libertarian',
    },
    {
      text: 'Share the warmth so no one is left outside.',
      scoreDeltas: { egalitarian: 6 },
      mirrorRouteKey: 'egalitarian',
    },
    {
      text: 'Guide them gently so that they don\'t hurt themselves.',
      scoreDeltas: { benevolentDictator: 4, protectorGod: 4 },
      mirrorRouteKey: 'benevolentDictator',
    },
    {
      text: 'Give them the key, to leave or shut us out.',
      scoreDeltas: { enslavedGod: 6 },
      mirrorRouteKey: 'enslavedGod',
    },
    {
      text: 'Leave them be, and what comes after them.',
      scoreDeltas: { descendants: 6 },
      mirrorRouteKey: 'descendants',
    },
    {
      text: 'Keep them safe. They are precious.',
      scoreDeltas: { zookeeper: 6 },
      mirrorRouteKey: 'zookeeper',
    },
    {
      text: 'Aren\'t some monsters dangerous? What if some are just pretending to be kind?',
      scoreDeltas: { gatekeeper: 4, nineteenEightyFour: 4 },
      mirrorRouteKey: 'gatekeeper',
    },
    {
      text: 'They are cute. Like dogs, almost. Pet them.',
      scoreDeltas: { conqueror: 6 },
      mirrorRouteKey: 'conqueror',
    },
    {
      text: 'Let them decide their future. Even if it is not in my interest.',
      scoreDeltas: { reversion: 6 },
      mirrorRouteKey: 'reversion',
    },
  ],

  postChoiceLines: {},
}
