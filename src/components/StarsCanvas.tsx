import { useEffect, useRef } from 'react'

export default function StarsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let animId: number
    let w = 0, h = 0

    const stars: { x: number; y: number; r: number; speed: number; opacity: number; phase: number }[] = []
    const particles: { x: number; y: number; vx: number; vy: number; size: number; color: string; life: number }[] = []

    function resize() {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }

    function createStars(n = 180) {
      stars.length = 0
      for (let i = 0; i < n; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.5 + 0.3,
          speed: Math.random() * 0.4 + 0.1,
          opacity: Math.random() * 0.7 + 0.3,
          phase: Math.random() * Math.PI * 2,
        })
      }
    }

    function spawnParticle() {
      const colors = ['rgba(232,121,160,', 'rgba(168,85,247,', 'rgba(255,255,255,']
      const c = colors[Math.floor(Math.random() * colors.length)]
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        color: c,
        life: Math.random() * 0.6 + 0.4,
      })
    }

    let t = 0
    function draw() {
      ctx.clearRect(0, 0, w, h)
      t += 0.012

      // Draw stars
      stars.forEach(s => {
        const twinkle = Math.sin(t * s.speed + s.phase)
        const alpha = s.opacity * (0.7 + 0.3 * twinkle)
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${alpha})`
        ctx.fill()
      })

      // Draw floating particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.life -= 0.003
        if (p.life <= 0) { particles.splice(i, 1); continue }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color}${p.life})`
        ctx.fill()
      }

      if (Math.random() < 0.04 && particles.length < 60) spawnParticle()

      animId = requestAnimationFrame(draw)
    }

    resize()
    createStars()
    draw()
    window.addEventListener('resize', () => { resize(); createStars() })

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', () => { resize(); createStars() })
    }
  }, [])

  return <canvas ref={canvasRef} id="stars-canvas" />
}
