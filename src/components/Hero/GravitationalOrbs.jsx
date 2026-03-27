import { useEffect, useRef } from 'react'
import { getPrimaryColor, getBgColor, hueRotateRGB } from './heroColors'

export default function GravitationalOrbs() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationId
    let mouse = { x: null, y: null }
    let time = 0
    let orbs = []

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    let PRIMARY = getPrimaryColor()
    let BG = getBgColor()

    const ORB_CONFIGS = [
      { radius: 280, opacity: 0.035, ease: 0.008, hue: 0 },
      { radius: 200, opacity: 0.045, ease: 0.014, hue: 20 },
      { radius: 150, opacity: 0.05, ease: 0.022, hue: -15 },
      { radius: 120, opacity: 0.055, ease: 0.03, hue: 40 },
      { radius: 90, opacity: 0.06, ease: 0.04, hue: -30 },
      { radius: 70, opacity: 0.065, ease: 0.05, hue: 55 },
    ]

    class Orb {
      constructor(w, h, config, index) {
        this.x = Math.random() * w
        this.y = Math.random() * h
        this.targetX = this.x
        this.targetY = this.y
        this.radius = config.radius
        this.opacity = config.opacity
        this.ease = config.ease
        this.phase = index * 1.1
        this.color = config.hue === 0 ? PRIMARY : hueRotateRGB(PRIMARY, config.hue)
      }

      update(w, h) {
        const driftX = Math.sin(time * 0.004 + this.phase) * 80
        const driftY = Math.cos(time * 0.003 + this.phase * 0.7) * 50

        if (mouse.x !== null) {
          this.targetX = mouse.x + driftX
          this.targetY = mouse.y + driftY
        } else {
          this.targetX = w * 0.5 + driftX
          this.targetY = h * 0.45 + driftY
        }

        this.x += (this.targetX - this.x) * this.ease
        this.y += (this.targetY - this.y) * this.ease
      }

      draw(ctx) {
        const { r, g, b } = this.color
        const grad = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius
        )
        grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${this.opacity * 2.5})`)
        grad.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, ${this.opacity * 1.2})`)
        grad.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, ${this.opacity * 0.4})`)
        grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      }
    }

    const init = () => {
      resize()
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      orbs = ORB_CONFIGS.map((config, i) => new Orb(w, h, config, i))
      // Clear fully on init to avoid stale trail artifacts
      ctx.clearRect(0, 0, w, h)
    }

    const animate = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight

      // Trail effect: semi-transparent overlay instead of full clear
      ctx.fillStyle = `rgba(${BG.r}, ${BG.g}, ${BG.b}, 0.12)`
      ctx.fillRect(0, 0, w, h)

      time++
      for (const orb of orbs) {
        orb.update(w, h)
        orb.draw(ctx)
      }

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

    init()
    animate()

    const handleColorChange = () => {
      PRIMARY = getPrimaryColor()
      for (const orb of orbs) {
        const config = ORB_CONFIGS[orbs.indexOf(orb)]
        orb.color = config.hue === 0 ? PRIMARY : hueRotateRGB(PRIMARY, config.hue)
      }
    }

    window.addEventListener('resize', init)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleLeave)
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true })
    canvas.addEventListener('touchend', handleLeave)
    const handleThemeChange = () => {
      BG = getBgColor()
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
    }

    document.documentElement.addEventListener('primary-color-change', handleColorChange)
    document.documentElement.addEventListener('theme-change', handleThemeChange)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', init)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleLeave)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('touchend', handleLeave)
      document.documentElement.removeEventListener('primary-color-change', handleColorChange)
      document.documentElement.removeEventListener('theme-change', handleThemeChange)
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
