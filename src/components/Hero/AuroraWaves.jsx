import { useEffect, useRef } from 'react'
import { getPrimaryColor, hueRotateRGB } from './heroColors'

export default function AuroraWaves() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationId
    let mouse = { x: null, y: null }
    let time = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    let PRIMARY = getPrimaryColor()

    const waves = [
      { freq: 0.003, amp: 50, speed: 0.012, phase: 0, yOff: 0.55, opacity: 0.12, hue: 0 },
      { freq: 0.002, amp: 65, speed: 0.008, phase: 1.2, yOff: 0.50, opacity: 0.09, hue: 30 },
      { freq: 0.004, amp: 35, speed: 0.015, phase: 2.8, yOff: 0.60, opacity: 0.07, hue: -25 },
      { freq: 0.0025, amp: 55, speed: 0.010, phase: 4.0, yOff: 0.45, opacity: 0.06, hue: 55 },
    ]

    let colors = waves.map((w) =>
      w.hue === 0 ? PRIMARY : hueRotateRGB(PRIMARY, w.hue)
    )

    const animate = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)
      time += 1

      waves.forEach((wave, idx) => {
        const c = colors[idx]

        ctx.beginPath()
        ctx.moveTo(0, h)

        for (let x = 0; x <= w; x += 2) {
          let y =
            h * wave.yOff +
            Math.sin(x * wave.freq + time * wave.speed + wave.phase) * wave.amp +
            Math.sin(x * wave.freq * 2.3 + time * wave.speed * 0.7) * wave.amp * 0.35 +
            Math.cos(x * wave.freq * 0.7 + time * wave.speed * 1.3) * wave.amp * 0.2

          // Mouse distortion
          if (mouse.x !== null) {
            const dx = x - mouse.x
            const dist = Math.abs(dx)
            if (dist < 280) {
              const influence = (1 - dist / 280)
              const mouseY = mouse.y !== null ? (mouse.y / h - 0.5) * 40 : 0
              y += Math.sin(x * 0.012 + time * 0.025) * influence * 70 + influence * mouseY
            }
          }

          ctx.lineTo(x, y)
        }

        ctx.lineTo(w, h)
        ctx.closePath()

        const grad = ctx.createLinearGradient(0, h * wave.yOff - wave.amp * 1.5, 0, h)
        grad.addColorStop(0, `rgba(${c.r}, ${c.g}, ${c.b}, ${wave.opacity})`)
        grad.addColorStop(0.6, `rgba(${c.r}, ${c.g}, ${c.b}, ${wave.opacity * 0.4})`)
        grad.addColorStop(1, `rgba(${c.r}, ${c.g}, ${c.b}, 0)`)
        ctx.fillStyle = grad
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    const handleTouchMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.touches[0].clientX - rect.left
      mouse.y = e.touches[0].clientY - rect.top
    }

    const handleLeave = () => {
      mouse.x = null
      mouse.y = null
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
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleLeave)
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true })
    canvas.addEventListener('touchend', handleLeave)
    document.documentElement.addEventListener('primary-color-change', handleColorChange)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleLeave)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('touchend', handleLeave)
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
        pointerEvents: 'auto',
        zIndex: 0,
      }}
    />
  )
}
