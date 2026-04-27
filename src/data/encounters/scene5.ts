import type { EncounterData } from '../../types'

// Scene 5 — New Home. Character: Asgore.
// Theme: What role the newcomer will take.
export const NEWHOME_ENCOUNTER: EncounterData = {
  characterKey: 'asgore',
  backgroundKey: 'bg_newhome',

  preChoiceLines: [
    { speaker: 'narrator', text: 'There are flowers by the stairs.' },
    { speaker: 'narrator', text: 'A small hearth.' },
    { speaker: 'narrator', text: 'Children\’s drawings on the walls.' },
    { speaker: 'narrator', text: 'One drawing shows a king with very large horns.' },
    { speaker: 'narrator', text: 'Someone gave him a tiny teacup.' },

    { speaker: 'asgore', text: 'Howdy.' },
    { speaker: 'asgore', text: 'I made tea.' },
    { speaker: 'asgore', text: 'That is a silly thing to say at a time like this.' },
    { speaker: 'asgore', text: 'But terrible moments do not improve by being thirsty.' },

    { speaker: 'narrator', text: 'He pours two cups.' },
    { speaker: 'narrator', text: 'Only one is touched.' },

    { speaker: 'asgore', text: 'May I tell you an old story?' },
    { speaker: 'asgore', text: 'A very old one.' },
    { speaker: 'asgore', text: 'Old enough that no one agrees who was wrong.' },

    { speaker: 'asgore', text: 'A long, long time ago, a king made friends with a mage.' },
    { speaker: 'asgore', text: 'Not a court magician.' },
    { speaker: 'asgore', text: 'Not the kind who pulls flowers from sleeves.' },
    { speaker: 'asgore', text: 'This mage could heal the sick.' },
    { speaker: 'asgore', text: 'Warm the houses before winter.' },
    { speaker: 'asgore', text: 'A wonderful mage.' },

    { speaker: 'asgore', text: 'The king\’s council argued.' },
    { speaker: 'asgore', text: 'The frightened argued loudly.' },
    { speaker: 'asgore', text: 'The hungry said very little.' },
    { speaker: 'asgore', text: 'They only looked at the mage and hoped.' },

    { speaker: 'asgore', text: 'Some said, “Don\'t keep the mage in the castle.”' },
    { speaker: 'asgore', text: 'Some said, “The mage can help us defeat all our enemies.”' },
    { speaker: 'asgore', text: 'Some said, “The mage is wiser than the king.”' },

    { speaker: 'asgore', text: ' So, what should the king have done?' },
  ],

  choicePrompt: 'What should a kingdom do with the powerful mage.',

  choices: [
    {
      text: 'Keep the mage in the castles. Miracles are safer within walls.',
      scoreDeltas: { enslavedGod: 5, nineteenEightyFour: 2 },
    },
    {
      text: 'Place the mage at the gate. Let it stop darker magic.',
      scoreDeltas: { gatekeeper: 5, reversion: 1 },
    },
    {
      text: 'Give the mage the crown. The mage would be a great ruler.',
      scoreDeltas: { benevolentDictator: 5, zookeeper: 2 },
    },
    {
      text: 'Let the mage work unseen. People love miracles, but not messiahs.',
      scoreDeltas: { protectorGod: 5 },
    },
    {
      text: 'Break his staff. What if the mage is a villain?',
      scoreDeltas: { reversion: 5, nineteenEightyFour: 3, enslavedGod: 1 },
    }
  ],

  postChoiceLines: {
    // A — Keep the mage in the castles. Miracles are safer within walls.
    0: [
      { speaker: 'asgore', text: 'The castle.' },
      { speaker: 'asgore', text: 'Yes.' },
      { speaker: 'asgore', text: 'A castle is a cage with better architecture.' },
      { speaker: 'narrator', text: 'The room behind him opens.' },
      { speaker: 'narrator', text: 'Glass. Soft light. No handle on the inside.' },
      { speaker: 'asgore', text: 'I am very sorry.' },
      { speaker: 'asgore', text: 'The story was not about a mage.' },
    ],
    // B — Place the mage at the gate. Let it stop darker magic.
    1: [
      { speaker: 'asgore', text: 'At the gate.' },
      { speaker: 'asgore', text: 'Close enough to save us.' },
      { speaker: 'asgore', text: 'Far enough not to rule us.' },
      { speaker: 'narrator', text: 'The great door behind him hums.' },
      { speaker: 'narrator', text: 'It does not open.' },
      { speaker: 'narrator', text: 'It listens.' },
      { speaker: 'asgore', text: 'A spell that only says no.' },
      { speaker: 'asgore', text: 'That sounds safe.' },
      { speaker: 'asgore', text: 'Safe things deserve suspicion too.' },
    ],
    // C — The crown
    2: [
      { speaker: 'asgore', text: 'The crown.' },
      { speaker: 'asgore', text: 'Yes.' },
      { speaker: 'asgore', text: 'A clean answer.' },
      { speaker: 'narrator', text: 'Asgore removes his crown.' },
      { speaker: 'narrator', text: 'He holds it as if it has become hot.' },
      { speaker: 'asgore', text: 'Crowns are strange things.' },
      { speaker: 'asgore', text: 'They feel lighter when people are afraid.' },
      { speaker: 'asgore', text: 'That is how they trick you.' },
    ],
    // D — Mage unseen
    3: [
      { speaker: 'narrator', text: 'The lights in the walls brighten for a moment.' },
      { speaker: 'narrator', text: 'Then they look ordinary again.' },
      { speaker: 'asgore', text: 'Gardens love hidden work.' },
      { speaker: 'asgore', text: 'Roots. Rain. Worms.' },
      { speaker: 'asgore', text: 'People call it spring and forget the hands beneath it.' },
    ],
    // E — Break the staff
    4: [
      { speaker: 'asgore', text: 'A peaceful answer.' },
      { speaker: 'asgore', text: 'Or a frightened one.' },
      { speaker: 'asgore',   text: 'My son said something like that once.' },
      { speaker: 'asgore',   text: 'A long time ago.' },
      { speaker: 'asgore', text: 'A spell uncast harms no one.' },
      { speaker: 'asgore', text: 'Except perhaps everyone it might have saved.' },
    ],
  },

  floweyInterjection: [
    { speaker: 'flowey', text: 'Mage. Sage. Cage. Rage.' },
    { speaker: 'flowey', text: 'Hee hee.' },
    { speaker: 'flowey', text: 'Kings love old stories. Ones with morals. Ones without.' },
  ],

  transitionCard: {
    0: 'The room at the end of the hall.\nNo handle on the inside.\nYou knew what this was.',
    1: 'You stand at the threshold.\nBehind you: everyone you passed.\nAhead: a mirror the size of a wall.',
    2: 'The crown is placed.\nThe weight is strange.\nAsgore says nothing.\nThat is also an answer.',
    3: 'You disappear into the walls.\nThe lights in New Home flicker.\nNo one thinks to look up.',
    4: 'Asgore nods slowly.\nHe does not say you are right.\nHe says: I understand.\nThat is almost the same thing.',
  },
}
