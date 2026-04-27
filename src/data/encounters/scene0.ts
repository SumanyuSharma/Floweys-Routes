import type { DialogueLine } from '../../types'

/**
 * Scene 0 — Cold Open.
 * No choices. Flowey speaks; player presses Z to advance.
 * The dialogue box uses the 'flowey' style (yellow border, no nameplate).
 */
export const COLDOPEN_LINES: DialogueLine[] = [
  { speaker: 'flowey', text: '...oh.' },
  { speaker: 'flowey', text: 'You landed.' },
  { speaker: 'flowey', text: 'Most things that fall down here break.' },
  { speaker: 'flowey', text: "You didn't." },
  { speaker: 'flowey', text: "That's new." },

  { speaker: 'flowey', text: "They'll want to know what you are." },
  { speaker: 'flowey', text: "Don't answer too quickly." },
  { speaker: 'flowey', text: 'Down here, names are traps.' },

  { speaker: 'flowey', text: 'Come on.' },
  { speaker: 'flowey', text: 'The house is warm.' },
  { speaker: 'flowey', text: "That's how these things usually begin." },

  { speaker: 'flowey', text: 'Try not to become the story they already wrote for you.' },
 ]
