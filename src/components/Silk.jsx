import { useEffect, useRef } from 'react'

/**
 * Seta generativa: un campo di pieghe calcolato a bassa risoluzione e
 * scalato dal browser (interpolazione bilineare = sfumature morbide).
 * Costo minimo, si ferma fuori viewport e con prefers-reduced-motion.
 */

const PALETTES = {
  blue: [
    [20, 42, 59],
    [32, 63, 87],
    [10, 114, 184],
    [121, 189, 214],
    [236, 246, 250],
  ],
  ivory: [
    [196, 186, 172],
    [222, 213, 200],
    [234, 227, 217],
    [246, 242, 236],
    [255, 255, 255],
  ],
  mist: [
    [32, 63, 87],
    [10, 114, 184],
    [121, 189, 214],
    [214, 235, 243],
    [255, 255, 255],
  ],
}

function lerpPalette(p, t) {
  const n = p.length - 1
  const x = Math.min(0.9999, Math.max(0, t)) * n
  const i = Math.floor(x)
  const f = x - i
  const a = p[i]
  const b = p[i + 1]
  return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f]
}

// Tabella precalcolata per evitare interpolazioni per pixel
function buildLut(p) {
  const lut = new Uint8ClampedArray(256 * 3)
  for (let i = 0; i < 256; i++) {
    const c = lerpPalette(p, i / 255)
    lut[i * 3] = c[0]
    lut[i * 3 + 1] = c[1]
    lut[i * 3 + 2] = c[2]
  }
  return lut
}

export default function Silk({ palette = 'blue', speed = 1, density = 1, className = '', label }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    const lut = buildLut(PALETTES[palette] || PALETTES.blue)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let W = 0
    let H = 0
    let img = null
    let raf = 0
    let visible = true
    let t0 = performance.now()
    let tOffset = 7.3

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      const aspect = r.height / Math.max(1, r.width)
      W = 180
      H = Math.max(40, Math.round(W * aspect))
      canvas.width = W
      canvas.height = H
      img = ctx.createImageData(W, H)
    }

    const field = (x, y, t) => {
      // domain warp → pieghe che "scorrono" come un drappo
      const wx = x + 0.35 * Math.sin(y * 1.7 + t * 0.21) + 0.12 * Math.sin(y * 4.1 - t * 0.33)
      const wy = y + 0.18 * Math.sin(x * 1.3 - t * 0.17)
      return (
        0.62 * Math.sin(wx * 2.3 * density + wy * 0.9 + t * 0.32) +
        0.38 * Math.sin(wx * 1.1 * density - wy * 1.6 + t * 0.19 + 1.7) +
        0.14 * Math.sin((wx * 1.2 + wy) * 3.6 * density + t * 0.47)
      )
    }

    const draw = (t) => {
      if (!img) return
      const d = img.data
      const sx = 3.2 / W
      const sy = (3.2 * (H / W)) / H
      const e = 0.012
      let k = 0
      for (let j = 0; j < H; j++) {
        const y = j * sy
        for (let i = 0; i < W; i++) {
          const x = i * sx
          const f = field(x, y, t)
          const dx = (field(x + e, y, t) - f) / e
          const dy = (field(x, y + e, t) - f) / e
          // luce radente da in alto a sinistra + riflesso speculare stretto
          const diffuse = 0.5 + 0.17 * (-dx * 0.8 - dy * 0.6)
          const spec = Math.pow(Math.max(0, 1 - Math.abs(dx * 0.55 + dy * 0.35 - 0.9)), 6) * 0.35
          const depth = 0.12 * f
          let v = diffuse + spec + depth
          v = v < 0 ? 0 : v > 1 ? 1 : v
          const li = ((v * 255) | 0) * 3
          d[k] = lut[li]
          d[k + 1] = lut[li + 1]
          d[k + 2] = lut[li + 2]
          d[k + 3] = 255
          k += 4
        }
      }
      ctx.putImageData(img, 0, 0)
    }

    const loop = (now) => {
      raf = requestAnimationFrame(loop)
      if (!visible) return
      draw(tOffset + ((now - t0) / 1000) * speed)
    }

    resize()
    draw(tOffset)

    const ro = new ResizeObserver(() => {
      resize()
      draw(tOffset + ((performance.now() - t0) / 1000) * speed)
    })
    ro.observe(canvas)

    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting
    })
    io.observe(canvas)

    const onVis = () => {
      visible = document.visibilityState === 'visible'
    }
    document.addEventListener('visibilitychange', onVis)

    if (!reduce) raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [palette, speed, density])

  return (
    <canvas
      ref={ref}
      className={`block h-full w-full ${className}`}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  )
}
