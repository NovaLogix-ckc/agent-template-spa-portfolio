import { useEffect, useRef } from 'react'
import { getPrimaryColor, hueRotateRGB } from '../Hero/heroColors'

/**
 * Animated mesh gradient – soft blobs morph and drift,
 * blending together like a lava-lamp / macOS mesh gradient.
 * All colours derived from --color-primary.
 */
export default function MeshGradient() {
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

    const blobs = [
      { xBase: 0.2, yBase: 0.3, radius: 0.35, speed: 0.003, phase: 0, hue: 0, opacity: 0.07 },
      { xBase: 0.7, yBase: 0.6, radius: 0.3, speed: 0.004, phase: 1.5, hue: 30, opacity: 0.06 },
      { xBase: 0.5, yBase: 0.2, radius: 0.28, speed: 0.0035, phase: 3.0, hue: -20, opacity: 0.055 },
      { xBase: 0.8, yBase: 0.3, radius: 0.25, speed: 0.005, phase: 4.5, hue: 50, opacity: 0.05 },
      { xBase: 0.3, yBase: 0.7, radius: 0.32, speed: 0.003, phase: 2.2, hue: -35, opacity: 0.06 },
    ]

    let colors = blobs.map((b) =>
      b.hue === 0 ? PRIMARY : hueRotateRGB(PRIMARY, b.hue)
    )

    const animate = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)
      time += 1

      for (let i = 0; i < blobs.length; i++) {
        const b = blobs[i]
        const c = colors[i]

        const x = w * b.xBase + Math.sin(time * b.speed + b.phase) * w * 0.12
        const y = h * b.yBase + Math.cos(time * b.speed * 0.8 + b.phase) * h * 0.1
        const r = Math.min(w, h) * b.radius

        // Morph the shape with a scaled ellipse that rotates
        const angle = time * b.speed * 0.5
        const scaleX = 1 + Math.sin(time * b.speed * 1.3 + b.phase) * 0.25
        const scaleY = 1 + Math.cos(time * b.speed * 1.1 + b.phase) * 0.25

        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(angle)
        ctx.scale(scaleX, scaleY)

        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, r)
        grad.addColorStop(0, `rgba(${c.r}, ${c.g}, ${c.b}, ${b.opacity * 1.8})`)
        grad.addColorStop(0.4, `rgba(${c.r}, ${c.g}, ${c.b}, ${b.opacity})`)
        grad.addColorStop(0.7, `rgba(${c.r}, ${c.g}, ${c.b}, ${b.opacity * 0.3})`)
        grad.addColorStop(1, `rgba(${c.r}, ${c.g}, ${c.b}, 0)`)

        ctx.beginPath()
        ctx.arc(0, 0, r, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()

        ctx.restore()
      }

      animationId = requestAnimationFrame(animate)
    }

    resize()
    animate()

    const handleColorChange = () => {
      PRIMARY = getPrimaryColor()
      colors = blobs.map((b) =>
        b.hue === 0 ? PRIMARY : hueRotateRGB(PRIMARY, b.hue)
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
