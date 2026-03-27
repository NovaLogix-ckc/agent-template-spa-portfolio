import { useEffect, useRef } from 'react'
import { getPrimaryColor } from './heroColors'

export default function FireEmbers() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationId
    let embers = []
    let mouse = { x: null, y: null }

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    const EMBER_COUNT = 60
    const MOUSE_RADIUS = 180

    let PRIMARY = getPrimaryColor()

    // Warm color palette mixed with primary
    const WARM_COLORS = [
      { r: 255, g: 140, b: 0 },   // dark orange
      { r: 255, g: 200, b: 50 },  // golden
      { r: 255, g: 80, b: 20 },   // red-orange
      { r: 255, g: 160, b: 40 },  // amber
    ]

    class Ember {
      constructor(w, h) {
        this.w = w
        this.h = h
        this.reset(w, h, true)
      }

      reset(w, h, initial = false) {
        this.x = Math.random() * w
        this.y = initial ? Math.random() * h : h + Math.random() * 40
        this.radius = Math.random() * 2.5 + 0.8
        this.speedY = -(Math.random() * 0.8 + 0.3)
        this.wobbleSpeed = Math.random() * 0.02 + 0.01
        this.wobbleAmp = Math.random() * 30 + 10
        this.wobbleOffset = Math.random() * Math.PI * 2
        this.time = 0
        this.life = 0
        this.maxLife = Math.random() * 300 + 200
        this.isPrimary = Math.random() < 0.25
        this.glows = Math.random() < 0.15
        this.warmIdx = Math.floor(Math.random() * WARM_COLORS.length)
        this.flickerSpeed = Math.random() * 0.05 + 0.02
        this.flickerOffset = Math.random() * Math.PI * 2
        this.vx = 0
        this.vy = 0
      }

      getColor() {
        if (this.isPrimary) return PRIMARY
        return WARM_COLORS[this.warmIdx]
      }

      update(w, h) {
        this.time++
        this.life++

        // Rise upward
        this.y += this.speedY + this.vy

        // Horizontal wobble (sine drift)
        this.x += Math.sin(this.time * this.wobbleSpeed + this.wobbleOffset) * 0.5 + this.vx

        // Mouse repulsion
        if (mouse.x !== null) {
          const dx = this.x - mouse.x
          const dy = this.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MOUSE_RADIUS) {
            const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * 0.04
            this.vx += dx * force
            this.vy += dy * force
          }
        }

        // Dampen mouse-induced velocity
        this.vx *= 0.96
        this.vy *= 0.96

        // Respawn when off-screen or life expired
        if (this.y < -20 || this.life > this.maxLife) {
          this.reset(w, h)
        }

        // Wrap horizontal
        if (this.x < -20) this.x = w + 10
        if (this.x > w + 20) this.x = -10
      }

      draw(ctx, h) {
        const lifeRatio = this.life / this.maxLife
        // Fade in quickly, sustain, then fade out
        let alpha
        if (lifeRatio < 0.05) {
          alpha = lifeRatio / 0.05
        } else if (lifeRatio > 0.6) {
          alpha = 1 - (lifeRatio - 0.6) / 0.4
        } else {
          alpha = 1
        }

        // Flicker effect
        const flicker = 0.7 + 0.3 * Math.sin(this.time * this.flickerSpeed + this.flickerOffset)
        alpha *= flicker

        alpha = Math.max(0, Math.min(1, alpha))
        if (alpha <= 0) return

        const c = this.getColor()

        if (this.glows) {
          // Draw a soft glow
          const glowRadius = this.radius * 6
          const grad = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, glowRadius
          )
          grad.addColorStop(0, `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha * 0.3})`)
          grad.addColorStop(1, `rgba(${c.r}, ${c.g}, ${c.b}, 0)`)
          ctx.beginPath()
          ctx.arc(this.x, this.y, glowRadius, 0, Math.PI * 2)
          ctx.fillStyle = grad
          ctx.fill()
        }

        // Draw the ember core
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha * 0.9})`
        ctx.fill()
      }
    }

    const init = () => {
      resize()
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      embers = Array.from({ length: EMBER_COUNT }, () => new Ember(w, h))
    }

    const animate = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      for (const e of embers) {
        e.update(w, h)
        e.draw(ctx, h)
      }

      animationId = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouse.x = null
      mouse.y = null
    }

    init()
    animate()

    const handleColorChange = () => { PRIMARY = getPrimaryColor() }

    window.addEventListener('resize', init)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)
    document.documentElement.addEventListener('primary-color-change', handleColorChange)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', init)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
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
