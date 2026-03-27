import { useEffect, useRef } from 'react'
import { getPrimaryColor, hueRotateRGB } from '../Hero/heroColors'

/**
 * Flowing horizontal wave ribbons that drift across the section.
 * Multiple thin stroked waves at varying speeds create a
 * topographic / contour-map aesthetic. All colours from --color-primary.
 */
export default function WaveField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationId
    let time = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    let PRIMARY = getPrimaryColor()

    const WAVE_COUNT = 12
    const waves = Array.from({ length: WAVE_COUNT }, (_, i) => {
      const t = i / (WAVE_COUNT - 1)
      return {
        yBase: 0.1 + t * 0.8,
        freq: 0.004 + Math.random() * 0.003,
        amp: 15 + Math.random() * 25,
        speed: 0.006 + Math.random() * 0.008,
        phase: Math.random() * Math.PI * 2,
        hue: (i - WAVE_COUNT / 2) * 8,
        opacity: 0.06 + Math.sin(t * Math.PI) * 0.06,
        lineWidth: 0.8 + Math.random() * 0.8,
      }
    })

    let colors = waves.map((w) =>
      w.hue === 0 ? PRIMARY : hueRotateRGB(PRIMARY, w.hue)
    )

    const animate = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)
      time += 1

      for (let i = 0; i < waves.length; i++) {
        const wave = waves[i]
        const c = colors[i]

        ctx.beginPath()

        for (let x = 0; x <= w; x += 3) {
          const baseY = h * wave.yBase
          const y =
            baseY +
            Math.sin(x * wave.freq + time * wave.speed + wave.phase) * wave.amp +
            Math.sin(x * wave.freq * 0.5 + time * wave.speed * 1.7 + wave.phase * 0.6) * wave.amp * 0.5 +
            Math.cos(x * wave.freq * 1.8 + time * wave.speed * 0.4) * wave.amp * 0.2

          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }

        ctx.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${wave.opacity})`
        ctx.lineWidth = wave.lineWidth
        ctx.stroke()

        // Subtle glow line underneath
        ctx.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${wave.opacity * 0.3})`
        ctx.lineWidth = wave.lineWidth * 4
        ctx.stroke()
      }

      animationId = requestAnimationFrame(animate)
    }

    resize()
    animate()

    const handleColorChange = () => {
      PRIMARY = getPrimaryColor()
      colors = waves.map((w) =>
        w.hue === 0 ? PRIMARY : hueRotateRGB(PRIMARY, w.hue)
      )
    }

    window.addEventListener('resize', resize)
    document.documentElement.addEventListener('primary-color-change', handleColorChange)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      document.documentElement.removeEventListener('primary-color-change', handleColorChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
