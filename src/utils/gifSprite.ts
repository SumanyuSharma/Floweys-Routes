import Phaser from 'phaser'

let _uid = 0

/**
 * Creates an animated GIF sprite backed by a Phaser CanvasTexture.
 *
 * A hidden <img> element is added to the DOM; the browser drives its GIF
 * frame timing.  Each game frame we drawImage() the current frame into a
 * canvas and call refresh() to push it to the GPU texture.
 *
 * The returned Image supports all standard Phaser tweens, setDepth, setAlpha,
 * setScale, etc. — exactly like any other Image game object.
 *
 * @param scene   - The current Phaser scene
 * @param x / y  - World position (origin = centre)
 * @param url     - Asset URL (e.g. 'assets/characters/toriel.gif')
 * @param w / h   - Desired display size in game pixels
 */
export function gifSprite(
  scene: Phaser.Scene,
  x: number,
  y: number,
  url: string,
  w: number,
  h: number,
): Phaser.GameObjects.Image {
  const key = `_gif_${_uid++}`

  // CanvasTexture — Phaser renders from this each frame
  const canvasTex = scene.textures.createCanvas(key, w, h)!
  const ctx       = canvasTex.getContext()

  // Off-screen <img> — browser decodes and advances GIF frames independently
  const img = document.createElement('img')
  img.src        = url
  img.style.cssText = 'position:fixed;left:-9999px;top:-9999px;pointer-events:none'
  document.body.appendChild(img)

  const image = scene.add.image(x, y, key)

  function tick(): void {
    ctx.clearRect(0, 0, w, h)
    if (img.complete) ctx.drawImage(img, 0, 0, w, h)
    canvasTex.refresh()
  }

  scene.events.on(Phaser.Scenes.Events.UPDATE, tick)

  // Cleanup when scene stops (handles scene transitions and restarts)
  scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
    scene.events.off(Phaser.Scenes.Events.UPDATE, tick)
    img.parentNode?.removeChild(img)
    if (scene.textures.exists(key)) scene.textures.remove(key)
  })

  return image
}
