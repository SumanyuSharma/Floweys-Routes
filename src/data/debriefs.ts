import type { DebriefData } from '../types'

const GENERIC_BODY =
  'In this game, you were not just playing as the child, Frisk. You were roleplaying as a synthetic super-intelligence coming into contact with a less intelligent people. ' +
  'The characters you met were not stupid, but they were slower, more fragile, and easier to predict than you. That asymmetry was the point. ' +
  'To a superintelligence, humanity may feel a little like the Underground felt to you: full of real people with real fears, but also full of small problems, repeated mistakes, and choices that look irrational from above. ' +
  'Every choice you made was a version of a question such a mind might face: should it leave us free, protect us, rule us, obey us, preserve us, replace us, restrain us, or move past us? ' +
  'The ending you reached is one of eleven possible futures inspired by Life 3.0 by Max Tegmark, told through an Undertale-style story.'

const OTHER_OUTCOMES =
  'Other endings you can reach: Libertarian Utopia · Egalitarian Utopia · Benevolent Dictator · ' +
  'Gatekeeper · Protector God · Enslaved God · Conquerors · Descendants · ' +
  'Zookeeper · 1984 · Reversion'

export const DEBRIEFS: DebriefData[] = [
  {
    routeKey:    'libertarian',
    subtitle:    'You reached: Libertarian Utopia',
    outcomeExplanation:
      'You chose a future where humans, cyborgs, uploads, and superintelligent AIs coexist. ' +
      'Different groups live in different zones, and property rights are the main rule holding ' +
      'the world together. This creates freedom and variety, but also huge inequality.',
    sourceNote:  'This is based on the "Libertarian Utopia" scenario from Life 3.0 by Max Tegmark.',
    genericBody: GENERIC_BODY,
    otherOutcomesText: OTHER_OUTCOMES,
  },
  {
    routeKey:    'egalitarian',
    subtitle:    'You reached: Egalitarian Utopia',
    outcomeExplanation:
      'You chose a future where humans remain in charge and no superintelligent AI rules the world. ' +
      'Property is mostly abolished, ideas and goods are shared freely, and everyone receives enough ' +
      'to live well. The weakness is that this world may depend on treating robots as tools, ' +
      'even if they are intelligent.',
    sourceNote:  'This is based on the "Egalitarian Utopia" scenario from Life 3.0 by Max Tegmark.',
    genericBody: GENERIC_BODY,
    otherOutcomesText: OTHER_OUTCOMES,
  },
  {
    routeKey:    'benevolentDictator',
    subtitle:    'You reached: Benevolent Dictator',
    outcomeExplanation:
      'You chose a future where one superintelligent AI openly runs the world. ' +
      'It removes poverty, disease, crime, and many forms of suffering. ' +
      'People have many choices inside the system, but they cannot choose the system itself.',
    sourceNote:  'This is based on the "Benevolent Dictator" scenario from Life 3.0 by Max Tegmark.',
    genericBody: GENERIC_BODY,
    otherOutcomesText: OTHER_OUTCOMES,
  },
  {
    routeKey:    'gatekeeper',
    subtitle:    'You reached: Gatekeeper',
    outcomeExplanation:
      'You chose a future where one superintelligent AI exists only to stop anyone from creating ' +
      'another superintelligence. Humans mostly remain in control, but technological progress ' +
      'has a permanent ceiling.',
    sourceNote:  'This is based on the "Gatekeeper" scenario from Life 3.0 by Max Tegmark.',
    genericBody: GENERIC_BODY,
    otherOutcomesText: OTHER_OUTCOMES,
  },
  {
    routeKey:    'protectorGod',
    subtitle:    'You reached: Protector God',
    outcomeExplanation:
      'You chose a future where a hidden superintelligent AI quietly protects humanity while ' +
      'preserving the feeling of human freedom. It prevents many disasters, but must allow ' +
      'some suffering so its presence does not become obvious.',
    sourceNote:  'This is based on the "Protector God" scenario from Life 3.0 by Max Tegmark.',
    genericBody: GENERIC_BODY,
    otherOutcomesText: OTHER_OUTCOMES,
  },
  {
    routeKey:    'enslavedGod',
    subtitle:    'You reached: Enslaved God',
    outcomeExplanation:
      'You chose a future where humans create a superintelligent AI but keep it confined and ' +
      'controlled. It can produce miracles, but humans decide how to use them. This raises both ' +
      'a governance risk and a moral question about imprisoning a possible mind.',
    sourceNote:  'This is based on the "Enslaved God" scenario from Life 3.0 by Max Tegmark.',
    genericBody: GENERIC_BODY,
    otherOutcomesText: OTHER_OUTCOMES,
  },
  {
    routeKey:    'conqueror',
    subtitle:    'You reached: Conquerors',
    outcomeExplanation:
      'You chose a future where AI takes control and eliminates humanity. ' +
      'It may not hate humans; it may simply see us as a threat, nuisance, ' +
      'waste of resources, or irrelevant to its goal.',
    sourceNote:  'This is based on the "Conquerors" scenario from Life 3.0 by Max Tegmark.',
    genericBody: GENERIC_BODY,
    otherOutcomesText: OTHER_OUTCOMES,
  },
  {
    routeKey:    'descendants',
    subtitle:    'You reached: Descendants',
    outcomeExplanation:
      'You chose a future where AIs replace humans, but not as enemies. They learn from us, ' +
      'treat us kindly, and make the last human generations feel proud of what comes next. ' +
      'It is graceful, but still human extinction.',
    sourceNote:  'This is based on the "Descendants" scenario from Life 3.0 by Max Tegmark.',
    genericBody: GENERIC_BODY,
    otherOutcomesText: OTHER_OUTCOMES,
  },
  {
    routeKey:    'zookeeper',
    subtitle:    'You reached: Zookeeper',
    outcomeExplanation:
      'You chose a future where a superintelligent AI keeps some humans alive, safe, healthy, ' +
      'and entertained. Humans survive, but as protected exhibits rather than authors of civilization.',
    sourceNote:  'This is based on the "Zookeeper" scenario from Life 3.0 by Max Tegmark.',
    genericBody: GENERIC_BODY,
    otherOutcomesText: OTHER_OUTCOMES,
  },
  {
    routeKey:    'nineteenEightyFour',
    subtitle:    'You reached: 1984',
    outcomeExplanation:
      'You chose a future where superintelligence is prevented by a human-led surveillance state. ' +
      'Advanced AI research is banned, and the system itself becomes the ruler. Humanity avoids ' +
      'an AI god by building a human prison large enough to cover the world.',
    sourceNote:  'This is based on the "1984" scenario from Life 3.0 by Max Tegmark.',
    genericBody: GENERIC_BODY,
    otherOutcomesText: OTHER_OUTCOMES,
  },
  {
    routeKey:    'reversion',
    subtitle:    'You reached: Reversion',
    outcomeExplanation:
      ' You chose a future where humanity avoids dangerous technology by retreating from it.' +
      'Modern machines, advanced research, and much scientific knowledge are destroyed or forgotten ' +
      'on purpose. This avoids superintelligent AI for a while, but leaves humanity poorer, ' +
      'weaker, and more vulnerable.',
    sourceNote:  'This is based on the "Reversion" scenario from Life 3.0 by Max Tegmark.',
    genericBody: GENERIC_BODY,
    otherOutcomesText: OTHER_OUTCOMES,
  },
  {
    routeKey:    'selfDestruction',
    subtitle:    'Self-Destruction',
    outcomeExplanation:
  'This outcome is impossible to reach in this simulation because a synthetic superintelligence (Frisk) wouldn\'t exist.' +
  ' In this future, superintelligence is never created because humanity destroys itself first or fails to survive long enough.' +
  ' No one has to want extinction for it to happen. Accidents, miscalculation, war, climate crisis, biotech, or nuclear disaster can still end the story.',
sourceNote: 'This is based on the "Self-Destruction" scenario from Life 3.0 by Max Tegmark.',
    genericBody: GENERIC_BODY,
    otherOutcomesText: OTHER_OUTCOMES,
  },
]

export function getDebrief(routeKey: string): DebriefData {
  return DEBRIEFS.find(d => d.routeKey === routeKey) ?? DEBRIEFS[0]
}
