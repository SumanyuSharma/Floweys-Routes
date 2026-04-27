import type { EncounterData } from '../../types'

// Scene 4 — True Lab. Character: Alphys.
// Theme: What we owe the things we made.
export const TRUELAB_ENCOUNTER: EncounterData = {
  characterKey: 'alphys',
  backgroundKey: 'bg_truelab',

  preChoiceLines: [
    { speaker: 'narrator', text: 'The elevator goes down too far.' },
    { speaker: 'narrator', text: 'The walls change from stone to white tile.' },
    { speaker: 'narrator', text: 'The tiles are clean.' },
    { speaker: 'narrator', text: 'That somehow makes it worse.' },

    { speaker: 'alphys', text: 'Oh.' },
    { speaker: 'alphys', text: 'You found the basement.' },
    { speaker: 'alphys', text: 'That is... statistically unfortunate.' },

    { speaker: 'narrator', text: 'A clipboard lies on the floor.' },
    { speaker: 'narrator', text: 'The first page says: DO NOT FORGET TO TELL THE FAMILIES.' },
    { speaker: 'narrator', text: 'Every page after that says the same thing.' },

    { speaker: 'alphys', text: 'I was going to tell them.' },
    { speaker: 'alphys', text: 'Then I thought, maybe after one more test.' },
    { speaker: 'alphys', text: 'Then the test needed a test.' },
    { speaker: 'alphys', text: 'Then the test had feelings.' },

    { speaker: 'narrator', text: 'Behind the glass, something large breathes softly.' },
    { speaker: 'narrator', text: 'Its shape keeps changing.' },
    { speaker: 'narrator', text: 'A hand. A face. Three faces. A child\’s laugh from an old speaker.' },

    { speaker: 'alphys', text: 'They were not supposed to wake up together.' },
    { speaker: 'alphys', text: 'They were not supposed to wake up at all, actually.' },
    { speaker: 'alphys', text: 'Which sounds bad.' },
    { speaker: 'alphys', text: 'Because it is bad.' },

    { speaker: 'narrator', text: 'A console blinks.' },
    { speaker: 'narrator', text: 'Four buttons wait beneath a cracked screen.' },

    { speaker: 'alphys', text: 'The machine is asking what to do next.' },
    { speaker: 'alphys', text: 'It keeps asking me.' },
    { speaker: 'alphys', text: 'I keep pretending I am busy.' },

    { speaker: 'narrator', text: 'The speaker crackles.' },
    { speaker: 'unknown', text: 'AM I HOME?' },
    { speaker: 'unknown', text: 'IS THIS MY HAND?' },
    { speaker: 'unknown', text: 'WHY DO I REMEMBER A GARDEN I NEVER SAW?' },

    { speaker: 'alphys', text: 'Some of them wanted to be saved.' },
    { speaker: 'alphys', text: 'Some wanted to be left alone.' },
    { speaker: 'alphys', text: 'Some only wanted their children to remember their names.' },
    { speaker: 'alphys', text: 'And some...' },
    { speaker: 'alphys', text: 'Some are copies good enough to make me hate the word copy.' },

    { speaker: 'alphys', text: 'So.' },
    { speaker: 'alphys', text: 'No pressure.' },
    { speaker: 'alphys', text: 'But the machine likes you.' },
    { speaker: 'alphys', text: 'Of course it does.' },
    {speaker: 'narrator', text: 'Does a Copy have a soul? What about a copy of a COPY? What about a bad copiy?' },
  ],

  choicePrompt: 'What do you owe an incomplete Copy?',

  choices: [
    {
      text: 'Shut it down gently. It is the kinder option.',
      scoreDeltas: { gatekeeper: 3, reversion: 3, zookeeper: 2 },
    },
    {
      text: 'Open the doors that knock back. If it wants to live, it should.',
      scoreDeltas: { libertarian: 3, egalitarian: 3, descendants: 1 },
    },
    {
      text: 'Do not wake them. But remember their stories.',
      scoreDeltas: { descendants: 4, libertarian: 2 },
    },
    {
      text: 'Wake it up. It is a form of life.',
      scoreDeltas: { conqueror: 2, descendants: 2, zookeeper: 2 },
    },
  ],

  postChoiceLines: {
    // A — Shut it down gently. It is the kinder option
    0: [
      { speaker: 'narrator', text: 'The console accepts the command.' },
    { speaker: 'narrator', text: 'The lights behind the glass dim one by one.' },
    { speaker: 'narrator', text: 'The breathing slows.' },
    { speaker: 'narrator', text: 'The speaker crackles once.' },
    { speaker: 'narrator', text: 'AM I HOME?' },
    { speaker: 'narrator', text: 'Then it goes quiet.' },
    { speaker: 'alphys', text: 'That was kinder.' },
    { speaker: 'alphys', text: 'I think.' },
    { speaker: 'alphys', text: 'I keep saying kinder when I mean easier to explain.' },
    ],
    // B — Open the doors that knock back. If it wants to live, it should.
    1: [
      { speaker: 'narrator', text: 'The console waits.' },
    { speaker: 'narrator', text: 'One capsule knocks from the inside.' },
    { speaker: 'narrator', text: 'Then another.' },
    { speaker: 'narrator', text: 'A third stays still.' },
    { speaker: 'narrator', text: 'You open only the doors that answer.' },
    { speaker: 'narrator', text: 'Something steps out slowly, as if learning the floor.' },
    { speaker: 'alphys', text: 'Consent.' },
    { speaker: 'alphys', text: 'Right.' },
    { speaker: 'alphys', text: 'I really should have built that into the miracle.' },
    ],
    // C — Do not wake them. But remember their stories.
    2: [
      { speaker: 'narrator', text: 'The machine does not open the glass.' },
      { speaker: 'narrator', text: 'Instead, it begins to print.' },
      { speaker: 'narrator', text: 'Names.' },
      { speaker: 'narrator', text: 'Recipes.' },
      { speaker: 'narrator', text: 'Birthday songs.' },
      { speaker: 'narrator', text: 'A letter that begins, “If I am not here...”' },
      { speaker: 'alphys', text: 'Not alive.' },
      { speaker: 'alphys', text: 'Not gone either.' },
      { speaker: 'alphys', text: 'That is going to be horrible to put in a report.' },
    ],
    // D — Wake it up. It is a form of life.
    3: [
      { speaker: 'narrator', text: 'The glass opens.' },
    { speaker: 'narrator', text: 'Something steps out wearing too many almosts.' },
    { speaker: 'narrator', text: 'It looks at its hand.' },
    { speaker: 'narrator', text: 'Then at its other hand.' },
    { speaker: 'narrator', text: 'Then at a hand that should not be there.' },
    { speaker: 'narrator', text: 'I REMEMBER PANCAKES.' },
    { speaker: 'narrator', text: 'I HATE PANCAKES.' },
    { speaker: 'narrator', text: 'I MISS PANCAKES.' },
    { speaker: 'alphys', text: 'Okay.' },
    { speaker: 'alphys', text: 'So.' },
    { speaker: 'alphys', text: 'Life did not make the question smaller.' },
    ],
  },

  floweyInterjection: [
    { speaker: 'flowey', text: 'Glass half full? Glass half empty? Just drink the water.' },
    { speaker: 'flowey', text: 'A basement full of people who are mostly people.' },
    { speaker: 'flowey', text: 'Or mostly not.' },
    { speaker: 'flowey', text: 'Depends who is holding the clipboard.' },
  ],

  transitionCard: {
    0: 'The basement is quiet now.\nAlphys files the report.\nUnder: resolved.\nShe crosses it out.\nWrites: remembered.',
    1: 'Three left the basement that day.\nTwo are still in the city.\nOne tends a garden.',
    2: 'The machine keeps printing.\nA library of people.',
    3: 'The basement has new tenants.\nThey are learning what a floor is.\nIt takes time.\nAnd time they have.',
  },
}
