import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { spinWheelPrizes } from '../data/memories'
import { Sparkles } from 'lucide-react'

// Warm, sophisticated editorial palette for the wheel
const COLORS = [
  '#872439', // Burgundy
  '#B3842C', // Antique Gold
  '#A85842', // Terracotta
  '#556852', // Laurel Sage
  '#993B4E', // Rose Crimson
  '#C99A45', // Warm Brass
  '#6D1B2D', // Deep Wine
  '#788A75', // Muted Olive
]

export default function SpinWheel() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [spinning, setSpinning] = useState(false)
  const [prize, setPrize] = useState<string | null>(null)
  const angleRef = useRef(0)
  const velRef = useRef(0)
  const animRef = useRef<number>(0)
  const n = spinWheelPrizes.length
  const segAngle = (2 * Math.PI) / n

  function drawWheel(angle: number) {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const cx = canvas.width / 2
    const cy = canvas.height / 2
    const r  = cx - 12

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Outer rim border
    ctx.save()
    ctx.beginPath()
    ctx.arc(cx, cy, r + 4, 0, Math.PI * 2)
    ctx.strokeStyle = '#B3842C'
    ctx.lineWidth = 3
    ctx.stroke()
    ctx.restore()

    spinWheelPrizes.forEach((p, i) => {
      const startA = angle + i * segAngle - Math.PI / 2
      const endA   = startA + segAngle

      // Segment wedge
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.arc(cx, cy, r, startA, endA)
      ctx.closePath()
      ctx.fillStyle = COLORS[i % COLORS.length]
      ctx.fill()
      ctx.strokeStyle = '#FAF7F2'
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Text label
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(startA + segAngle / 2)
      ctx.textAlign = 'right'
      ctx.fillStyle = '#FAF7F2'
      ctx.font = '600 10px Inter, sans-serif'
      const txt = p.length > 20 ? p.slice(0, 20) + '...' : p
      ctx.fillText(txt, r - 12, 3.5)
      ctx.restore()
    })

    // Center brass medallion
    ctx.beginPath()
    ctx.arc(cx, cy, 22, 0, Math.PI * 2)
    ctx.fillStyle = '#FAF7F2'
    ctx.fill()
    ctx.strokeStyle = '#B3842C'
    ctx.lineWidth = 2.5
    ctx.stroke()

    ctx.fillStyle = '#872439'
    ctx.font = 'bold 12px "Playfair Display", Georgia, serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('M', cx, cy)
  }

  useEffect(() => {
    drawWheel(0)
  }, [])

  function spin() {
    if (spinning) return
    setSpinning(true)
    setPrize(null)
    velRef.current = 14 + Math.random() * 12

    function animate() {
      velRef.current *= 0.985
      angleRef.current += velRef.current * 0.02
      drawWheel(angleRef.current)

      if (velRef.current > 0.04) {
        animRef.current = requestAnimationFrame(animate)
      } else {
        setSpinning(false)
        const twoPI = 2 * Math.PI
        const norm = (angleRef.current % twoPI + twoPI) % twoPI
        const idx = Math.floor(((twoPI - norm) / segAngle) % n)
        setPrize(spinWheelPrizes[idx])
      }
    }

    animRef.current = requestAnimationFrame(animate)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 440 }}>
      {/* Wheel Stage */}
      <div style={{ position: 'relative', margin: '1rem 0 1.8rem 0' }}>
        {/* Brass Pointer Arrow */}
        <div
          style={{
            position: 'absolute',
            top: -12,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '11px solid transparent',
            borderRight: '11px solid transparent',
            borderTop: '18px solid var(--accent-burgundy)',
            zIndex: 10,
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
          }}
        />

        <canvas
          ref={canvasRef}
          width={320}
          height={320}
          style={{ display: 'block', borderRadius: '50%', boxShadow: 'var(--shadow-card)' }}
        />
      </div>

      <button
        onClick={spin}
        disabled={spinning}
        className="btn-primary"
        style={{ fontSize: '0.92rem', padding: '0.75rem 2rem' }}
      >
        <Sparkles size={16} /> {spinning ? 'Spinning the Fates...' : 'Spin Birthday Wheel'}
      </button>

      {/* Prize Reveal Card */}
      <AnimatePresence>
        {prize && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              marginTop: '1.8rem',
              padding: '1.4rem 1.8rem',
              background: 'var(--bg-surface)',
              border: '1.5px solid var(--accent-gold)',
              borderRadius: 'var(--radius-sm)',
              textAlign: 'center',
              width: '100%',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <span
              style={{
                fontFamily: 'Inter',
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--accent-gold)',
              }}
            >
              Official Decree
            </span>
            <p
              className="font-reading"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'var(--accent-burgundy)',
                marginTop: '0.4rem',
                lineHeight: 1.4,
              }}
            >
              "{prize}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
