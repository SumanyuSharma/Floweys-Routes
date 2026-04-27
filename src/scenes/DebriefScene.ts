import Phaser from 'phaser'
import { GameState }  from '../GameState'
import { getDebrief } from '../data/debriefs'
import type { RouteKey } from '../types'

type AnyRouteKey = RouteKey | 'selfDestruction'

const ROUTE_LIST: { key: AnyRouteKey; label: string; unplayable?: boolean }[] = [
  { key: 'libertarian',        label: 'Libertarian Utopia' },
  { key: 'egalitarian',        label: 'Egalitarian Utopia' },
  { key: 'benevolentDictator', label: 'Benevolent Dictator' },
  { key: 'gatekeeper',         label: 'Gatekeeper' },
  { key: 'protectorGod',       label: 'Protector God' },
  { key: 'enslavedGod',        label: 'Enslaved God' },
  { key: 'conqueror',          label: 'Conquerors' },
  { key: 'descendants',        label: 'Descendants' },
  { key: 'zookeeper',          label: 'Zookeeper' },
  { key: 'nineteenEightyFour', label: '1984' },
  { key: 'reversion',          label: 'Reversion' },
  { key: 'selfDestruction',    label: 'Self-Destruction', unplayable: true },
]

const IMAGE_MAP: Record<AnyRouteKey, string> = {
  libertarian:        'LibertarianUtopia.png',
  egalitarian:        'EgalitarianUtopia.png',
  benevolentDictator: 'BenevolentDictator.png',
  gatekeeper:         'Gatekeeper.png',
  protectorGod:       'ProtectorGod.png',
  enslavedGod:        'EnslavedGod.png',
  conqueror:          'Conqueror.png',
  descendants:        'Descendants.png',
  zookeeper:          'Zookeeper.png',
  nineteenEightyFour: '1984.png',
  reversion:          'Reversion.png',
  selfDestruction:    'SelfDestruction.png',
}

const BOOK_PHRASE = 'Life 3.0 by Max Tegmark'
const BOOK_ANCHOR = `<a href="https://www.amazon.co.uk/Life-3-0-Being-Artificial-Intelligence/dp/024123719X" target="_blank" rel="noopener" style="color:#aaaaff;text-decoration:underline;">${BOOK_PHRASE}</a>`

export class DebriefScene extends Phaser.Scene {
  private overlay:            HTMLDivElement | null = null
  private originalRoute:      RouteKey              = 'libertarian'
  private browsingOtherRoute: boolean               = false

  constructor() {
    super({ key: 'Debrief' })
  }

  create(): void {
    const data  = this.scene.settings.data as { route?: RouteKey }
    const route = data?.route ?? 'libertarian'
    this.originalRoute      = route
    this.browsingOtherRoute = false
    this.mountOverlay(route, getDebrief(route))
  }

  shutdown(): void { this.removeOverlay() }
  destroy():  void { this.removeOverlay() }

  private mountOverlay(route: AnyRouteKey, debrief: ReturnType<typeof getDebrief>): void {
    const isSelfDestruct = route === 'selfDestruction'

    const headerText = isSelfDestruct
      ? 'SELF-DESTRUCTION — UNPLAYABLE'
      : 'YOU REACHED: ' + debrief.subtitle.replace('You reached: ', '').toUpperCase()

    const imgSrc           = `assets/characters/${IMAGE_MAP[route]}`
    const sourceNoteLinked = debrief.sourceNote.replace(BOOK_PHRASE, BOOK_ANCHOR)

    const div = document.createElement('div')
    div.id = 'debrief-overlay'
    div.style.cssText = [
      'position:fixed', 'inset:0', 'background:#0a0a0a',
      'display:flex', 'flex-direction:column', 'align-items:center',
      'justify-content:flex-start', 'overflow-y:auto',
      'padding:60px 20px 60px', 'font-family:system-ui,sans-serif', 'z-index:100',
    ].join(';')

    const inner = document.createElement('div')
    inner.style.cssText = 'max-width:640px;width:100%;'

    inner.innerHTML = `
      <h1 style="font-size:20px;font-weight:bold;color:#ffffff;
                 letter-spacing:0.05em;margin-bottom:24px;text-transform:uppercase;">
        ${headerText}
      </h1>

      <h2 style="font-size:18px;font-weight:bold;color:#ffffff;margin-bottom:12px;">
        What just happened?
      </h2>

      <img src="${imgSrc}" alt="" style="float:left;width:120px;margin:0 18px 12px 0;" />

      <p style="font-size:16px;color:#aaaaff;margin-bottom:16px;">
        ${debrief.subtitle}
      </p>

      <p style="font-size:14px;color:#cccccc;line-height:1.7;margin-bottom:16px;">
        ${debrief.outcomeExplanation}
      </p>

      <p style="font-size:13px;color:#888888;line-height:1.7;margin-bottom:24px;font-style:italic;">
        ${sourceNoteLinked}
      </p>

      <div style="clear:both;"></div>

      <hr style="border:none;border-top:1px solid #333;margin-bottom:24px;" />

      <p style="font-size:14px;color:#cccccc;line-height:1.7;margin-bottom:24px;">
        ${debrief.genericBody}
      </p>
    `

    // ── Route buttons ────────────────────────────────────────────────────────
    const otherSection = document.createElement('div')
    otherSection.style.cssText = 'margin-bottom:40px;'

    const otherLabel = document.createElement('p')
    otherLabel.textContent = 'Other endings you can reach:'
    otherLabel.style.cssText = 'font-size:12px;color:#666666;margin-bottom:12px;'
    otherSection.appendChild(otherLabel)

    const btnRow = document.createElement('div')
    btnRow.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;'

    ROUTE_LIST.forEach(({ key, label, unplayable }) => {
      const isActive = key === route
      const btn      = document.createElement('button')
      btn.textContent = label

      if (isActive) {
        btn.style.cssText = [
          'background:none', 'border:1px solid #ffffff',
          'color:#ffffff', 'font-size:12px', 'font-family:system-ui,sans-serif',
          'padding:4px 10px', 'cursor:pointer', 'font-weight:bold',
        ].join(';')
      } else if (unplayable) {
        btn.style.cssText = [
          'background:none', 'border:1px solid #333333',
          'color:#555555', 'font-size:12px', 'font-family:system-ui,sans-serif',
          'padding:4px 10px', 'cursor:pointer', 'font-style:italic',
        ].join(';')
        btn.addEventListener('mouseenter', () => { btn.style.color = '#888888'; btn.style.borderColor = '#555555' })
        btn.addEventListener('mouseleave', () => { btn.style.color = '#555555'; btn.style.borderColor = '#333333' })
        btn.addEventListener('click', () => {
          this.browsingOtherRoute = true
          this.removeOverlay()
          this.mountOverlay('selfDestruction', getDebrief('selfDestruction'))
        })
      } else {
        btn.style.cssText = [
          'background:none', 'border:1px solid #444444',
          'color:#888888', 'font-size:12px', 'font-family:system-ui,sans-serif',
          'padding:4px 10px', 'cursor:pointer',
        ].join(';')
        btn.addEventListener('mouseenter', () => { btn.style.color = '#cccccc'; btn.style.borderColor = '#888888' })
        btn.addEventListener('mouseleave', () => { btn.style.color = '#888888'; btn.style.borderColor = '#444444' })
        btn.addEventListener('click', () => {
          this.browsingOtherRoute = true
          this.removeOverlay()
          this.mountOverlay(key, getDebrief(key as string))
        })
      }

      btnRow.appendChild(btn)
    })

    otherSection.appendChild(btnRow)
    inner.appendChild(otherSection)

    const resetBtn = document.createElement('button')
    resetBtn.textContent = 'RESET'
    resetBtn.style.cssText = [
      'display:block', 'margin:0 auto',
      'background:#ffffff', 'color:#000000',
      'font-size:16px', 'font-family:system-ui,sans-serif',
      'padding:12px 32px', 'border:none', 'cursor:pointer',
      'letter-spacing:0.1em',
    ].join(';')
    resetBtn.addEventListener('click', () => this.handleReset())

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        this.handleReset()
      } else if (e.key === 'ArrowLeft' && !this.browsingOtherRoute) {
        this.removeOverlay()
        this.scene.start('Ending', { resumeAtTitle: true })
      }
    }
    window.addEventListener('keydown', onKey)
    ;(div as HTMLDivElement & { _onKey?: (e: KeyboardEvent) => void })._onKey = onKey

    inner.appendChild(resetBtn)
    div.appendChild(inner)
    document.body.appendChild(div)
    this.overlay = div
  }

  private handleReset(): void {
    this.removeOverlay()
    GameState.reset()
    this.scene.start('Title')
  }

  private removeOverlay(): void {
    if (!this.overlay) return
    const div = this.overlay as HTMLDivElement & { _onKey?: (e: KeyboardEvent) => void }
    if (div._onKey) window.removeEventListener('keydown', div._onKey)
    div.remove()
    this.overlay = null
  }
}
