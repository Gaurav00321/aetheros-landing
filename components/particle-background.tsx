"use client"

import { useEffect, useRef } from "react"

// Change to default export
export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      context.scale(dpr, dpr)
    }

    resizeCanvas()
    const debouncedResize = debounce(resizeCanvas, 250)
    window.addEventListener("resize", debouncedResize)

    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      color: string
      life: number
      maxLife: number
      energy: number
      connected: Set<Particle>

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 0.5 + 0.2
        this.vx = Math.cos(angle) * speed
        this.vy = Math.sin(angle) * speed
        this.radius = Math.random() * 2 + 1
        this.color = `hsl(${Math.random() * 60 + 200}, 80%, 50%)`
        this.life = 0
        this.maxLife = Math.random() * 100 + 100
        this.energy = 1
        this.connected = new Set()
      }

      update(width: number, height: number) {
        this.x += this.vx
        this.y += this.vy
        this.life++
        this.energy = Math.max(0, 1 - this.life / this.maxLife)

        // Add slight gravitational effect
        this.vy += 0.01

        // Wrap around screen with damping
        if (this.x < 0) { this.x = width; this.vx *= 0.9 }
        if (this.x > width) { this.x = 0; this.vx *= 0.9 }
        if (this.y < 0) { this.y = height; this.vy *= 0.9 }
        if (this.y > height) { this.y = 0; this.vy *= 0.9 }

        // Pulsate size
        const pulse = Math.sin(this.life * 0.05) * 0.5 + 1
        return this.life < this.maxLife && pulse > 0
      }

      draw(ctx: CanvasRenderingContext2D) {
        const pulse = Math.sin(this.life * 0.05) * 0.5 + 1
        
        // Particle glow
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius * 4 * pulse
        )
        gradient.addColorStop(0, `${this.color.replace(')', `, ${this.energy})`)}`)
        gradient.addColorStop(0.5, `${this.color.replace(')', `, ${this.energy * 0.25})`)}`)
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
        
        ctx.beginPath()
        ctx.fillStyle = gradient
        ctx.arc(this.x, this.y, this.radius * 4 * pulse, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const particles: Particle[] = []
    const maxParticles = 50
    const connectionDistance = 150
    let mouseX = canvas.width / 2
    let mouseY = canvas.height / 2
    let isMouseMoving = false
    let mouseTimeout: NodeJS.Timeout

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = (e.clientX - rect.left) * (canvas.width / rect.width)
      mouseY = (e.clientY - rect.top) * (canvas.height / rect.height)
      isMouseMoving = true
      clearTimeout(mouseTimeout)
      mouseTimeout = setTimeout(() => isMouseMoving = false, 100)
    })

    const createParticle = (x?: number, y?: number) => {
      if (particles.length < maxParticles) {
        const posX = x ?? Math.random() * canvas.width
        const posY = y ?? Math.random() * canvas.height
        particles.push(new Particle(posX, posY))
      }
    }

    const drawConnections = (context: CanvasRenderingContext2D, time: number) => {
      context.save()
      context.globalCompositeOperation = 'lighter'

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]
        p1.connected.clear()
        
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p2.x - p1.x
          const dy = p2.y - p1.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            p1.connected.add(p2)
            p2.connected.add(p1)
            
            // Draw connection with dynamic gradient
            const gradient = context.createLinearGradient(p1.x, p1.y, p2.x, p2.y)
            const alpha = (1 - distance / connectionDistance) * 0.5
            const hueShift = Math.sin(time * 0.001) * 30
            const color1 = p1.color.replace('hsl(', '').split(',')[0]
            const color2 = p2.color.replace('hsl(', '').split(',')[0]
            
            gradient.addColorStop(0, `hsla(${Number(color1) + hueShift}, 80%, 50%, ${alpha * p1.energy})`)
            gradient.addColorStop(1, `hsla(${Number(color2) + hueShift}, 80%, 50%, ${alpha * p2.energy})`)

            context.beginPath()
            context.strokeStyle = gradient
            context.lineWidth = 2 * (1 - distance / connectionDistance)
            context.moveTo(p1.x, p1.y)
            context.lineTo(p2.x, p2.y)
            context.stroke()
          }
        }
      }
      
      context.restore()
    }

    let animationFrameId: number
    let lastTime = 0
    const fps = 60

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate)

      // FPS control
      if (currentTime - lastTime < 1000 / fps) return
      lastTime = currentTime

      context.globalCompositeOperation = 'source-over'
      context.fillStyle = 'rgba(0, 11, 31, 0.1)'
      context.fillRect(0, 0, canvas.width, canvas.height)

      // Create new particles
      if (Math.random() < 0.1) createParticle()

      // Mouse interaction effect
      if (isMouseMoving) {
        const p = new Particle(mouseX, mouseY)
        p.vx *= 2
        p.vy *= 2
        p.color = `hsl(${currentTime * 0.1 % 360}, 100%, 70%)`
        particles.push(p)
      }

      // Update and draw particles
      context.globalCompositeOperation = 'lighter'
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i]
        if (!particle.update(canvas.width, canvas.height)) {
          particles.splice(i, 1)
          continue
        }
        particle.draw(context)
      }

      // Draw connections with time-based effects
      drawConnections(context, currentTime)
    }

    // Initial particles
    for (let i = 0; i < maxParticles / 2; i++) {
      createParticle()
    }

    // Start animation
    requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", debouncedResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full bg-[#000B1F]" />
}

// Debounce function
function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
