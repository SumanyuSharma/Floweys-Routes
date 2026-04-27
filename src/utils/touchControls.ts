type KeyInfo = { key: string; keyCode: number; code: string }

const KEYS: Record<string, KeyInfo> = {
  UP:    { key: 'ArrowUp',    keyCode: 38, code: 'ArrowUp'    },
  DOWN:  { key: 'ArrowDown',  keyCode: 40, code: 'ArrowDown'  },
  LEFT:  { key: 'ArrowLeft',  keyCode: 37, code: 'ArrowLeft'  },
  RIGHT: { key: 'ArrowRight', keyCode: 39, code: 'ArrowRight' },
  Z:     { key: 'z',          keyCode: 90, code: 'KeyZ'       },
}

function fireKey(info: KeyInfo, type: 'keydown' | 'keyup'): void {
  window.dispatchEvent(new KeyboardEvent(type, {
    key: info.key, keyCode: info.keyCode, code: info.code,
    bubbles: true, cancelable: true,
  }))
}

function makeButton(label: string, info: KeyInfo, css: string): HTMLButtonElement {
  const btn = document.createElement('button')
  btn.textContent = label
  btn.style.cssText = css

  btn.addEventListener('touchstart', (e) => {
    e.preventDefault()
    fireKey(info, 'keydown')
  }, { passive: false })

  btn.addEventListener('touchend', (e) => {
    e.preventDefault()
    fireKey(info, 'keyup')
  }, { passive: false })

  btn.addEventListener('touchcancel', () => {
    fireKey(info, 'keyup')
  })

  return btn
}

export function initTouchControls(): void {
  if (!window.matchMedia('(pointer: coarse)').matches) return

  const CELL  = 54
  const GAP   = 6
  const GRID  = CELL * 3 + GAP * 2

  const btnBase = [
    `width:${CELL}px`, `height:${CELL}px`,
    'background:rgba(255,255,255,0.12)',
    'border:2px solid rgba(255,255,255,0.25)',
    'border-radius:10px',
    'color:#ffffff', 'font-size:22px',
    'font-family:sans-serif',
    'display:flex', 'align-items:center', 'justify-content:center',
    'touch-action:manipulation',
    'pointer-events:auto',
    '-webkit-user-select:none', 'user-select:none',
  ].join(';')

  // ── D-pad ──────────────────────────────────────────────────────────────────
  const dpad = document.createElement('div')
  dpad.style.cssText = [
    'display:grid',
    `grid-template-columns:repeat(3,${CELL}px)`,
    `grid-template-rows:repeat(3,${CELL}px)`,
    `gap:${GAP}px`,
    `width:${GRID}px`,
    'pointer-events:none',
  ].join(';')

  const spacer = (): HTMLDivElement => {
    const d = document.createElement('div')
    return d
  }

  // Row 1:  [ ] [↑] [ ]
  dpad.appendChild(spacer())
  dpad.appendChild(makeButton('↑', KEYS.UP,    btnBase))
  dpad.appendChild(spacer())
  // Row 2:  [←] [ ] [→]
  dpad.appendChild(makeButton('←', KEYS.LEFT,  btnBase))
  dpad.appendChild(spacer())
  dpad.appendChild(makeButton('→', KEYS.RIGHT, btnBase))
  // Row 3:  [ ] [↓] [ ]
  dpad.appendChild(spacer())
  dpad.appendChild(makeButton('↓', KEYS.DOWN,  btnBase))
  dpad.appendChild(spacer())

  // ── Z (confirm / advance) button ──────────────────────────────────────────
  const zBtn = makeButton('Z', KEYS.Z, [
    'width:72px', 'height:72px',
    'background:rgba(255,255,255,0.18)',
    'border:2px solid rgba(255,255,255,0.35)',
    'border-radius:50%',
    'color:#ffffff', 'font-size:22px',
    'font-family:sans-serif', 'font-weight:bold',
    'display:flex', 'align-items:center', 'justify-content:center',
    'touch-action:manipulation',
    'pointer-events:auto',
    '-webkit-user-select:none', 'user-select:none',
    'align-self:flex-end',
  ].join(';'))

  // ── Overlay ────────────────────────────────────────────────────────────────
  const overlay = document.createElement('div')
  overlay.id = 'touch-controls'
  overlay.style.cssText = [
    'position:fixed', 'bottom:0', 'left:0', 'right:0',
    'height:220px',
    'display:flex', 'justify-content:space-between', 'align-items:flex-end',
    'padding:20px 24px',
    'z-index:50',           // below the debrief overlay (z-index: 100)
    'pointer-events:none',  // overlay itself is pass-through; only buttons capture
  ].join(';')

  overlay.appendChild(dpad)
  overlay.appendChild(zBtn)
  document.body.appendChild(overlay)
}
