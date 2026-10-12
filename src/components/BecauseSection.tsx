import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { becauseOfYouItems } from '../data/memories'
import { Scale } from 'lucide-react'

export default function BecauseSection() {
  const [active, setActive] = useState<number | null>(null)
  const [counter, setCounter] = useState(73)

  function handleClick(i: number) {
    setActive(i)
    setCounter(c => c + 1)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 560 }}>
      <div className="responsibility-ledger">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
          <Scale size={16} style={{ color: 'var(--accent-burgundy)' }} />
          <span
            style={{
              fontFamily: 'Inter',
              fontSize: '0.72rem',
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--accent-burgundy)',
            }}
          >
            The Official Accountability Index
          </span>
        </div>

        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', marginBottom: '0.4rem' }}>
          Incidents Attributed to Ayush
        </h3>

        {/* Counter Display */}
        <div style={{ margin: '1.2rem 0 1.6rem' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={counter}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.2 }}
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(3.5rem, 8vw, 5rem)',
                fontWeight: 700,
                color: 'var(--accent-burgundy)',
                lineHeight: 1,
              }}
            >
              {counter}%
            </motion.div>
          </AnimatePresence>
          <span
            style={{
              fontFamily: 'Crimson Text, serif',
              fontSize: '1.1rem',
              fontStyle: 'italic',
              color: 'var(--text-secondary)',
            }}
          >
            of all daily occurrences across Hyderabad
          </span>
        </div>

        {/* Audit Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left' }}>
          {becauseOfYouItems.map((item, i) => (
            <button
              key={i}
              onClick={() => handleClick(i)}
              className="ledger-btn"
              style={{
                borderColor: active === i ? 'var(--accent-burgundy)' : 'var(--border-subtle)',
                background: active === i ? 'var(--accent-burgundy-light)' : 'var(--bg-surface-soft)',
              }}
              aria-label={`Audit incident: ${item.event}`}
            >
              <span style={{ fontFamily: 'Inter', fontSize: '0.88rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                {item.event}
              </span>
              <span
                style={{
                  fontFamily: 'Crimson Text, serif',
                  fontSize: '0.98rem',
                  fontStyle: 'italic',
                  fontWeight: 600,
                  color: 'var(--accent-burgundy)',
                  whiteSpace: 'nowrap',
                }}
              >
                → {item.blame}
              </span>
            </button>
          ))}
        </div>

        <p
          style={{
            fontFamily: 'Inter',
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
            marginTop: '1.2rem',
          }}
        >
          (Click any item above to register an additional blame point)
        </p>
      </div>

      <p
        style={{
          marginTop: '1.5rem',
          fontFamily: 'Crimson Text, serif',
          fontSize: '1.15rem',
          fontStyle: 'italic',
          color: 'var(--text-secondary)',
          textAlign: 'center',
          maxWidth: 460,
          lineHeight: 1.6,
        }}
      >
        "I didn’t choose to be responsible for the city’s weather and traffic, but Madamji has finalized the decree."
      </p>
    </div>
  )
}
