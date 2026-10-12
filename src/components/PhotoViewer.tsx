import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Image as ImageIcon } from 'lucide-react'
import type { Memory } from '../data/memories'

interface Props {
  memories: Memory[]
}

export default function PhotoViewer({ memories }: Props) {
  const [active, setActive] = useState<Memory | null>(null)

  // Close lightbox on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setActive(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      {/* Editorial Keepsake Gallery Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '1.25rem',
          width: '100%',
          maxWidth: 820,
        }}
      >
        {memories.map((m, i) => (
          <motion.div
            key={m.id}
            onClick={() => setActive(m)}
            className="photo-mount"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
            whileHover={{ scale: 1.03, y: -3 }}
            role="button"
            tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter') setActive(m) }}
            aria-label={`View photo keepsake: ${m.title}`}
          >
            <div className="photo-matting">
              {m.image ? (
                <img
                  src={m.image}
                  alt={m.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div style={{ textAlign: 'center', padding: '1rem' }}>
                  <ImageIcon size={28} style={{ opacity: 0.4, color: 'var(--accent-burgundy)', margin: '0 auto 0.4rem auto' }} />
                  <div
                    style={{
                      fontFamily: 'Inter',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {m.title}
                  </div>
                </div>
              )}
            </div>

            <div className="photo-mount-caption">
              {m.date && (
                <span
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--accent-gold)',
                    display: 'block',
                    marginBottom: '3px',
                  }}
                >
                  {m.date}
                </span>
              )}
              <span style={{ fontWeight: 600, color: 'var(--text-primary)', display: 'block', fontStyle: 'normal', fontFamily: 'Inter', fontSize: '0.78rem', marginBottom: '2px' }}>
                {m.title}
              </span>
              "{m.caption}"
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Dialog */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(20, 17, 18, 0.88)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
              zIndex: 1000,
            }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem',
                maxWidth: 520,
                width: '100%',
                maxHeight: '92vh',
                overflowY: 'auto',
                boxShadow: 'var(--shadow-deep)',
                position: 'relative',
                textAlign: 'center',
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setActive(null)}
                className="btn-ghost"
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  padding: '0.35rem',
                  borderRadius: 'var(--radius-xs)',
                  zIndex: 2,
                }}
                aria-label="Close photo preview"
              >
                <X size={18} />
              </button>

              <div
                style={{
                  maxHeight: '62vh',
                  minHeight: '240px',
                  background: 'var(--bg-surface-soft)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-xs)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  margin: '1.5rem auto 1.2rem auto',
                }}
              >
                {active.image ? (
                  <img
                    src={active.image}
                    alt={active.title}
                    style={{ maxWidth: '100%', maxHeight: '60vh', objectFit: 'contain', borderRadius: 'var(--radius-xs)' }}
                  />
                ) : (
                  <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <ImageIcon size={48} style={{ opacity: 0.35, color: 'var(--accent-burgundy)', margin: '0 auto 0.8rem auto' }} />
                    <span
                      style={{
                        fontFamily: 'Inter',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--text-muted)',
                      }}
                    >
                      {active.id}
                    </span>
                  </div>
                )}
              </div>

              {active.date && (
                <span
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--accent-gold)',
                    display: 'block',
                    marginBottom: '0.35rem',
                  }}
                >
                  {active.date}
                </span>
              )}
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.35rem', marginBottom: '0.35rem' }}>
                {active.title}
              </h3>
              <p
                className="font-reading"
                style={{
                  fontSize: '1.15rem',
                  fontStyle: 'italic',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5,
                }}
              >
                "{active.caption}"
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
