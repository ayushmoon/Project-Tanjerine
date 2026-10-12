import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw } from 'lucide-react'

export default function RabbitSection() {
  const [unfolded, setUnfolded] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 540 }}>
      <div className="origami-canvas">
        <div style={{ marginBottom: '1.5rem' }}>
          <span
            style={{
              fontFamily: 'Inter',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--accent-gold)',
            }}
          >
            Emergency Protocol No. 01
          </span>
          <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', marginTop: '0.25rem' }}>
            The Origami Rabbit Apology
          </h3>
        </div>

        <AnimatePresence mode="wait">
          {!unfolded ? (
            <motion.div
              key="folded"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
            >
              {/* Folded Sheet Button */}
              <button
                className="origami-fold-btn"
                onClick={() => setUnfolded(true)}
                aria-label="Unfold the handmade apology letter"
              >
                <div className="origami-crease" />
                <span style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>📄</span>
                <span
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--accent-burgundy)',
                  }}
                >
                  Tap to Unfold
                </span>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  (Handmade Apology)
                </span>
              </button>

              <p
                style={{
                  fontFamily: 'Crimson Text, serif',
                  fontSize: '1rem',
                  fontStyle: 'italic',
                  color: 'var(--text-secondary)',
                  maxWidth: 340,
                }}
              >
                When a simple "sorry" over text felt insufficient, paper was procured and emergency origami ensued.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="unfolded"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}
            >
              {/* The Unfolded Apology Sheet */}
              <div
                style={{
                  background: 'var(--bg-surface-soft)',
                  border: '1.5px solid var(--border-medium)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '1.8rem 2rem',
                  width: '100%',
                  maxWidth: 380,
                  position: 'relative',
                  boxShadow: 'var(--shadow-card)',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    background: 'var(--accent-burgundy-light)',
                    border: '1px solid var(--accent-burgundy)',
                    borderRadius: 'var(--radius-xs)',
                    fontFamily: 'Inter',
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--accent-burgundy)',
                    marginBottom: '1rem',
                  }}
                >
                  Certified Peace Treaty
                </div>

                {/* Origami Icon */}
                <div style={{ fontSize: '3.2rem', marginBottom: '0.5rem' }}>
                  🐰
                </div>

                <p
                  className="font-script"
                  style={{
                    fontSize: '1.8rem',
                    color: 'var(--accent-burgundy)',
                    lineHeight: 1.3,
                    marginBottom: '0.5rem',
                  }}
                >
                  It was my mistake — SORRY.
                </p>

                <p
                  className="font-reading"
                  style={{
                    fontSize: '1.05rem',
                    color: 'var(--text-secondary)',
                    fontStyle: 'italic',
                    lineHeight: 1.5,
                  }}
                >
                  Folded with questionable origami technique, but 100% genuine sincerity.
                </p>

                <div
                  style={{
                    marginTop: '1.2rem',
                    paddingTop: '0.8rem',
                    borderTop: '1px dashed var(--border-medium)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.72rem',
                    fontFamily: 'Inter',
                    color: 'var(--accent-sage)',
                    fontWeight: 600,
                  }}
                >
                  <span>STATUS: ACCEPTED</span>
                  <span>VERDICT: FORGIVEN</span>
                </div>
              </div>

              <button
                onClick={() => setUnfolded(false)}
                className="btn-ghost"
                style={{ fontSize: '0.8rem' }}
              >
                <RotateCcw size={13} /> Refold note
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
