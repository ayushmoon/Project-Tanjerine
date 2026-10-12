import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Sparkles } from 'lucide-react'

type Step = {
  key: string
  text: string
  sub?: string
  annotation?: string
}

const steps: Step[] = [
  {
    key: 'start',
    text: 'There was a completely ordinary afternoon in Hyderabad...',
    sub: 'Crowds on the street, classes underway, and not a single hint that anything out of the usual was about to happen.',
    annotation: 'Location: Hyderabad Street',
  },
  {
    key: 'distributor',
    text: 'A person was standing on the pavement, handing out promotional cards to everyone walking past.',
    sub: 'Just one of those small cards people normally glance at and ignore.',
  },
  {
    key: 'refused',
    text: 'He offered one to you.',
    sub: 'You waved it off with an immediate, confident refusal. Naturally.',
    annotation: 'Refusal status: 100% decisive',
  },
  {
    key: 'noticed',
    text: 'And from a few paces away... I noticed.',
    sub: 'It was a tiny split-second moment that easily could have vanished into the day.',
  },
  {
    key: 'opportunity',
    text: 'I saw a very rare opening.',
    sub: 'The kind of ridiculous opportunity you only get once if you don’t act in three seconds.',
  },
  {
    key: 'took',
    text: 'I went and collected that exact card.',
    sub: 'Walked right up to you, handed it back, and kept a completely straight face.',
  },
  {
    key: 'line',
    text: '"Maybe that person was giving this card to you. It\'s yours."',
    sub: 'Delivered with absolute, unwarranted confidence.',
    annotation: 'The opening line that started it all',
  },
  {
    key: 'end',
    text: 'Easily one of the most absurd conversation starters on record.',
    sub: 'Yet against all statistical odds... it worked.',
    annotation: 'Result: A story began.',
  },
]

export default function ChapterCard() {
  const [step, setStep] = useState(0)
  const [cardRevealed, setCardRevealed] = useState(false)

  function next() {
    if (step < steps.length - 1) {
      setStep(s => s + 1)
      if (step + 1 >= 5) setCardRevealed(true)
    }
  }

  function prev() {
    if (step > 0) {
      setStep(s => s - 1)
    }
  }

  const current = steps[step]
  const isQuoteStep = current.key === 'line'

  return (
    <div className="envelope-stage">
      {/* ── THE PHYSICAL KEEPSAKE ENVELOPE & SLIDING CARD ── */}
      <div style={{ marginBottom: '2.5rem', textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Envelope Stage Container with Smooth Expansion */}
        <div
          style={{
            position: 'relative',
            width: '310px',
            height: '195px',
            marginTop: cardRevealed ? '115px' : '20px',
            marginBottom: '1rem',
            transition: 'margin-top 0.45s cubic-bezier(0.34, 1.35, 0.64, 1)',
            display: 'flex',
            justifyContent: 'center',
            cursor: 'pointer',
            perspective: '1000px',
          }}
          onClick={() => setCardRevealed(v => !v)}
          role="button"
          tabIndex={0}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setCardRevealed(v => !v) }}
          aria-label={cardRevealed ? "Click to tuck card back into envelope" : "Click to pull out the refused card"}
        >
          {/* 1. Envelope Back Plate (Base Layer, z-index 1) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'var(--envelope-back)',
              borderRadius: 'var(--radius-sm)',
              border: '1.5px solid var(--envelope-border)',
              boxShadow: 'inset 0 12px 24px rgba(36,27,24,0.12), var(--envelope-shadow)',
              zIndex: 1,
            }}
          />

          {/* 2. THE ACTUAL STREET CARD (Middle Layer, z-index 3) */}
          <motion.div
            initial={false}
            animate={{
              y: cardRevealed ? -120 : 0,
              rotate: cardRevealed ? -1.8 : 0,
              scale: cardRevealed ? 1.02 : 0.98,
            }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            style={{
              position: 'absolute',
              bottom: '8px',
              left: '21px',
              width: '268px',
              height: '185px',
              background: 'var(--bg-surface)',
              border: '1.5px solid var(--accent-gold)',
              borderRadius: 'var(--radius-xs)',
              boxShadow: cardRevealed
                ? '0 20px 40px rgba(36,27,24,0.18), 0 4px 12px rgba(36,27,24,0.06)'
                : 'none',
              padding: '11px 14px 12px 14px',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 3,
              textAlign: 'left',
              userSelect: 'none',
              transformOrigin: 'bottom center',
              boxSizing: 'border-box',
            }}
          >
            {/* Inner Border Frame */}
            <div
              style={{
                position: 'absolute',
                inset: '3px',
                border: '1px solid var(--border-subtle)',
                borderRadius: '2px',
                pointerEvents: 'none',
              }}
            />

            {/* Card Header: Place & Timestamp + Crimson Stamp */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1, marginBottom: '4px' }}>
              <div>
                <span
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '0.62rem',
                    fontWeight: 800,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--accent-gold)',
                    display: 'block',
                    lineHeight: 1.2,
                  }}
                >
                  HYDERABAD · 2024
                </span>
                <span
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '0.52rem',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    lineHeight: 1.2,
                  }}
                >
                  THE STREET PROMO CARD
                </span>
              </div>

              {/* Red Ink Stamp */}
              <div
                style={{
                  border: '1px solid var(--accent-burgundy)',
                  color: 'var(--accent-burgundy)',
                  padding: '1px 5px',
                  borderRadius: '2px',
                  fontSize: '0.54rem',
                  fontFamily: 'Inter',
                  fontWeight: 900,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  transform: 'rotate(-4deg)',
                }}
              >
                RETRIEVED
              </div>
            </div>

            {/* The Famous Dialogue */}
            <div style={{ position: 'relative', zIndex: 1, margin: '2px 0 6px 0' }}>
              <p
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '0.88rem',
                  fontStyle: 'italic',
                  color: 'var(--accent-burgundy)',
                  lineHeight: 1.3,
                  margin: 0,
                }}
              >
                "Maybe that person was giving this card to you."
              </p>
              <p
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.02rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  lineHeight: 1.2,
                  marginTop: '3px',
                  marginBottom: 0,
                }}
              >
                "It's yours."
              </p>
            </div>

            {/* Card Content Divider & Attribution */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px dashed var(--border-paper)',
                paddingTop: '5px',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <span
                style={{
                  fontFamily: 'Inter',
                  fontSize: '0.54rem',
                  color: 'var(--text-muted)',
                  fontStyle: 'italic',
                }}
              >
                Refused by Madamji · Handed back by Ayush
              </span>
              <span
                style={{
                  fontFamily: 'Dancing Script',
                  fontSize: '0.98rem',
                  color: 'var(--accent-burgundy)',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                }}
              >
                — Ayush
              </span>
            </div>

            {/* Subtle Archival Keepsake Tag resting inside envelope lip */}
            <div
              style={{
                marginTop: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: '6px',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <span
                style={{
                  fontFamily: 'Inter',
                  fontSize: '0.48rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-gold)',
                  opacity: 0.8,
                }}
              >
                ✦ ORIGINAL KEEPSAKE · HYD ✦
              </span>
            </div>
          </motion.div>

          {/* 3. Envelope Front Pocket (Luxury Scooped Neckline, Layer 4, z-index 4) */}
          <svg
            viewBox="0 0 310 195"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              zIndex: 4,
              pointerEvents: 'none',
              filter: 'drop-shadow(0 -2px 4px rgba(36,27,24,0.04))',
            }}
          >
            {/* Pocket Body: Curved luxury scoop down to 60px */}
            <path
              d="M 0 0 L 0 187 A 8 8 0 0 0 8 195 L 302 195 A 8 8 0 0 0 310 187 L 310 0 C 255 30, 205 60, 155 60 C 105 60, 55 30, 0 0 Z"
              fill="var(--envelope-front)"
              stroke="var(--envelope-border)"
              strokeWidth="1.5"
            />
            {/* Scooped Neckline Fold Crease */}
            <path
              d="M 310 0 C 255 30, 205 60, 155 60 C 105 60, 55 30, 0 0"
              fill="none"
              stroke="var(--envelope-border)"
              strokeWidth="1.5"
            />
          </svg>

          {/* 4. Envelope Top Flap (Folds open cleanly, Layer 5, z-index 5/2) */}
          <motion.div
            initial={false}
            animate={{
              rotateX: cardRevealed ? 180 : 0,
              zIndex: cardRevealed ? 2 : 5,
            }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '88px',
              transformOrigin: 'top center',
              transformStyle: 'preserve-3d',
              pointerEvents: 'none',
            }}
          >
            {/* Flap Vector Shape */}
            <svg
              viewBox="0 0 310 88"
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
                filter: cardRevealed ? 'none' : 'drop-shadow(0 4px 6px rgba(36,27,24,0.14))',
              }}
            >
              <path
                d="M 0 0 L 310 0 L 155 88 Z"
                fill="var(--envelope-flap)"
                stroke="var(--envelope-border)"
                strokeWidth="1.5"
              />
            </svg>

            {/* Wax Seal - visible only on exterior when flap is closed */}
            <motion.div
              animate={{
                opacity: cardRevealed ? 0 : 1,
                scale: cardRevealed ? 0.8 : 1,
              }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute',
                bottom: '4px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'var(--accent-burgundy)',
                border: '1.5px solid var(--accent-gold)',
                color: '#FAF7F2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Playfair Display, serif',
                fontWeight: 700,
                fontSize: '0.92rem',
                boxShadow: '0 4px 10px rgba(135,36,57,0.4), inset 0 1px 2px rgba(255,255,255,0.25)',
              }}
            >
              M
            </motion.div>
          </motion.div>
        </div>

        {/* Envelope Caption & Toggle Button */}
        <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
          <button
            onClick={() => setCardRevealed(v => !v)}
            className="btn-ghost"
            style={{
              fontSize: '0.78rem',
              padding: '0.35rem 0.95rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <Sparkles size={13} style={{ color: 'var(--accent-gold)' }} />
            {cardRevealed ? 'Tuck card back in envelope' : 'Tap to pull out the refused card'}
          </button>
          <span
            style={{
              fontFamily: 'Crimson Text, serif',
              fontSize: '0.92rem',
              fontStyle: 'italic',
              color: 'var(--text-muted)',
            }}
          >
            {cardRevealed ? 'The exact words spoken on the Hyderabad sidewalk' : 'Click the envelope to slide out the card'}
          </span>
        </div>
      </div>

      {/* ── NARRATIVE STEPPER ENTRY ── */}
      <div
        className="paper-card"
        style={{
          width: '100%',
          padding: '2.2rem 2.4rem',
          minHeight: '220px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.2rem',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: '0.8rem',
          }}
        >
          <span
            style={{
              fontFamily: 'Inter',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--accent-gold)',
            }}
          >
            Entry {step + 1} of {steps.length}
          </span>
          {current.annotation && (
            <span
              style={{
                fontFamily: 'Inter',
                fontSize: '0.7rem',
                fontWeight: 600,
                color: 'var(--text-muted)',
                fontStyle: 'italic',
              }}
            >
              {current.annotation}
            </span>
          )}
        </div>

        {/* Dynamic Story Step */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          >
            {isQuoteStep ? (
              <blockquote className="quote-parchment">
                <p
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: 'clamp(1.2rem, 3vw, 1.45rem)',
                    fontStyle: 'italic',
                    color: 'var(--accent-burgundy)',
                    lineHeight: 1.5,
                    marginBottom: '0.4rem',
                  }}
                >
                  {current.text}
                </p>
                {current.sub && (
                  <p
                    style={{
                      fontFamily: 'Inter',
                      fontSize: '0.82rem',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.02em',
                    }}
                  >
                    — {current.sub}
                  </p>
                )}
              </blockquote>
            ) : (
              <div>
                <h3
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: 'clamp(1.15rem, 2.5vw, 1.45rem)',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    lineHeight: 1.4,
                    marginBottom: '0.75rem',
                  }}
                >
                  {current.text}
                </h3>
                {current.sub && (
                  <p
                    className="font-reading"
                    style={{
                      fontSize: '1.1rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                    }}
                  >
                    {current.sub}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Stepper Controls */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '1.8rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          <button
            onClick={prev}
            disabled={step === 0}
            className="btn-ghost"
            style={{ opacity: step === 0 ? 0.35 : 1, cursor: step === 0 ? 'not-allowed' : 'pointer' }}
            aria-label="Previous story step"
          >
            <ChevronLeft size={16} /> Back
          </button>

          {/* Dot Tracker */}
          <div style={{ display: 'flex', gap: '6px' }}>
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                style={{
                  width: i === step ? 18 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: i === step ? 'var(--accent-burgundy)' : 'var(--border-medium)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.25s ease',
                }}
                aria-label={`Jump to step ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            disabled={step === steps.length - 1}
            className="btn-secondary"
            style={{
              padding: '0.45rem 1rem',
              fontSize: '0.85rem',
              opacity: step === steps.length - 1 ? 0.35 : 1,
              cursor: step === steps.length - 1 ? 'not-allowed' : 'pointer',
            }}
            aria-label="Next story step"
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
