import { useEffect, useRef } from 'react'
import { getPrimaryColor } from './heroColors'

export default function ParticleNetwork() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationId
    let particles = []
    let mouse = { x: null, y: null }

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    const PARTICLE_COUNT = 80
    const CONNECTION_DISTANCE = 150
    const MOUSE_RADIUS = 200

    // Derive particle colour from the CSS --color-primary variable
    let PRIMARY = getPrimaryColor()

    class Particle {
      constructor(w, h) {
        this.x = Math.random() * w
        this.y = Math.random() * h
        this.vx = (Math.random() - 0.5) * 0.4
        this.vy = (Math.random() - 0.5) * 0.4
        this.radius = Math.random() * 1.5 + 0.5
        this.isPrimary = Math.random() < 0.15
      }

      update(w, h) {
        this.x += this.vx
        this.y += this.vy

        if (this.x < 0 || this.x > w) this.vx *= -1
        if (this.y < 0 || this.y > h) this.vy *= -1

        // Gentle mouse repulsion
        if (mouse.x !== null) {
          const dx = this.x - mouse.x
          const dy = this.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MOUSE_RADIUS) {
            const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * 0.02
            this.vx += dx * force
            this.vy += dy * force
          }
        }

        // Dampen velocity
        this.vx *= 0.999
        this.vy *= 0.999
      }

      draw(ctx) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        if (this.isPrimary) {
          ctx.fillStyle = `rgba(${PRIMARY.r}, ${PRIMARY.g}, ${PRIMARY.b}, 0.8)`
        } else {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.25)'
        }
        ctx.fill()
      }
    }

    const init = () => {
      resize()
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle(w, h))
    }

    const drawConnections = (w, h) => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < CONNECTION_DISTANCE) {
            const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.15
            const useAccent = particles[i].isPrimary || particles[j].isPrimary
            if (useAccent) {
              ctx.strokeStyle = `rgba(${PRIMARY.r}, ${PRIMARY.g}, ${PRIMARY.b}, ${opacity * 2})`
            } else {
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
            }
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Mouse connections
      if (mouse.x !== null) {
        for (const p of particles) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MOUSE_RADIUS) {
            const opacity = (1 - dist / MOUSE_RADIUS) * 0.3
            ctx.strokeStyle = `rgba(${PRIMARY.r}, ${PRIMARY.g}, ${PRIMARY.b}, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        p.update(w, h)
        p.draw(ctx)
      }

      drawConnections(w, h)
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
