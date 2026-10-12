import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { languagePairs } from '../data/memories'
import { ArrowLeftRight } from 'lucide-react'

export default function MetroSection() {
  const [pairIdx, setPairIdx] = useState(0)
  const pair = languagePairs[pairIdx]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 640 }}>
      {/* Transit Keepsake Card */}
      <div className="transit-pass">
        {/* Transit Header */}
        <div className="transit-header">
          <div>
            <span className="transit-code">INTER-CITY COMMUTE · LINE 02</span>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.25rem', marginTop: '0.2rem' }}>
              Hyderabad ↔ Maharashtra
            </h3>
          </div>
          <span
            style={{
              padding: '0.3rem 0.75rem',
              borderRadius: 'var(--radius-xs)',
              background: 'var(--accent-gold-soft)',
              border: '1px solid var(--accent-gold)',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--accent-gold)',
            }}
          >
            Daily Pass
          </span>
        </div>

        <p
          className="font-reading"
          style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            marginBottom: '1.8rem',
            lineHeight: 1.6,
          }}
        >
          Two different home states, one shared metro route, and classes where the language exchange was far more consistent than the programming lectures.
        </p>

        {/* Bilingual Flashcard */}
        <AnimatePresence mode="wait">
          <motion.div
            key={pairIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem',
              marginBottom: '1.8rem',
            }}
          >
            {/* Madamji's Telugu */}
            <div
              className="language-flashcard"
              style={{ borderLeft: '3px solid var(--accent-burgundy)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                <span
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--accent-burgundy)',
                  }}
                >
                  Madamji's Lesson (Telugu)
                </span>
                <span style={{ fontSize: '0.75rem' }}>🪷</span>
              </div>
              <div
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.35rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '0.35rem',
                }}
              >
                "{pair.telugu.phrase}"
              </div>
              <div
                style={{
                  fontFamily: 'Crimson Text, serif',
                  fontSize: '1rem',
                  fontStyle: 'italic',
                  color: 'var(--text-secondary)',
                }}
              >
                Meaning: {pair.telugu.meaning}
              </div>
            </div>

            {/* Ayush's Marathi */}
            <div
              className="language-flashcard"
              style={{ borderLeft: '3px solid var(--accent-gold)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
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
                  Ayush's Reply (Marathi)
                </span>
                <span style={{ fontSize: '0.75rem' }}>☀️</span>
              </div>
              <div
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.35rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '0.35rem',
                }}
              >
                "{pair.marathi.phrase}"
              </div>
              <div
                style={{
                  fontFamily: 'Crimson Text, serif',
                  fontSize: '1rem',
                  fontStyle: 'italic',
                  color: 'var(--text-secondary)',
                }}
              >
                Meaning: {pair.marathi.meaning}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Phrase Selector Controls */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '1.2rem',
            flexWrap: 'wrap',
            gap: '0.8rem',
          }}
        >
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {languagePairs.map((_, i) => (
              <button
                key={i}
                onClick={() => setPairIdx(i)}
                className={pairIdx === i ? 'btn-primary' : 'btn-ghost'}
                style={{ padding: '0.35rem 0.8rem', fontSize: '0.78rem' }}
              >
                Lesson {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setPairIdx(p => (p + 1) % languagePairs.length)}
            className="btn-secondary"
            style={{ padding: '0.4rem 0.9rem', fontSize: '0.8rem' }}
          >
            <ArrowLeftRight size={14} /> Next phrase
          </button>
        </div>
      </div>

      <p
        style={{
          marginTop: '1.5rem',
          fontFamily: 'Crimson Text, serif',
          fontSize: '1.05rem',
          fontStyle: 'italic',
          color: 'var(--text-muted)',
          textAlign: 'center',
        }}
      >
        "Some metro rides are just transit. Ours turned into a bilingual classroom."
      </p>
    </div>
  )
}
