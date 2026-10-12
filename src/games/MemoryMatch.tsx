import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, Trophy } from 'lucide-react'

const EMOJIS = ['🌸', '🎂', '🐰', '🚇', '🍟', '✨', '🪷', '🌙']

function makeCards() {
  const pairs = [...EMOJIS, ...EMOJIS]
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]]
  }
  return pairs.map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false }))
}

export default function MemoryMatch() {
  const [cards, setCards] = useState(makeCards)
  const [selected, setSelected] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [won, setWon] = useState(false)
  const [lock, setLock] = useState(false)

  const flip = useCallback((id: number) => {
    if (lock) return
    const card = cards.find(c => c.id === id)
    if (!card || card.flipped || card.matched) return
    if (selected.length === 1 && selected[0] === id) return

    const newCards = cards.map(c => c.id === id ? { ...c, flipped: true } : c)
    setCards(newCards)
    const newSel = [...selected, id]
    setSelected(newSel)

    if (newSel.length === 2) {
      setMoves(m => m + 1)
      setLock(true)
      const [a, b] = newSel.map(sid => newCards.find(c => c.id === sid)!)
      if (a.emoji === b.emoji) {
        const matched = newCards.map(c => newSel.includes(c.id) ? { ...c, matched: true } : c)
        setCards(matched)
        setSelected([])
        setLock(false)
        if (matched.every(c => c.matched)) setWon(true)
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c => newSel.includes(c.id) ? { ...c, flipped: false } : c))
          setSelected([])
          setLock(false)
        }, 850)
      }
    }
  }, [cards, selected, lock])

  function reset() {
    setCards(makeCards())
    setSelected([])
    setMoves(0)
    setWon(false)
    setLock(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 360 }}>
      {/* Controls Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          marginBottom: '1.2rem',
          paddingBottom: '0.8rem',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <span style={{ fontFamily: 'Inter', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
          Attempts: <strong style={{ color: 'var(--text-primary)' }}>{moves}</strong>
        </span>

        <button onClick={reset} className="btn-ghost" style={{ fontSize: '0.75rem', padding: '0.35rem 0.8rem' }}>
          <RotateCcw size={13} /> New Deal
        </button>
      </div>

      {/* 4x4 Grid of Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '8px',
          width: '100%',
          aspectRatio: '1',
          padding: '12px',
          background: 'var(--bg-surface)',
          border: '1.5px solid var(--border-paper)',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        {cards.map(card => (
          <div
            key={card.id}
            className={`parlor-match-card ${card.flipped || card.matched ? 'flipped' : ''}`}
            onClick={() => flip(card.id)}
            style={{
              opacity: card.matched ? 0.6 : 1,
            }}
            role="button"
            tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter') flip(card.id) }}
            aria-label={card.flipped ? card.emoji : 'Flipped card'}
          >
            {/* Face down (burgundy / gold back) */}
            <div className="card-face face-down">
              <span>✦</span>
            </div>

            {/* Face up */}
            <div className="card-face face-up">
              {card.emoji}
            </div>
          </div>
        ))}
      </div>

      {/* Won Message */}
      <AnimatePresence>
        {won && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              marginTop: '1.5rem',
              padding: '1.2rem 1.6rem',
              background: 'var(--accent-gold-soft)',
              border: '1px solid var(--accent-gold)',
              borderRadius: 'var(--radius-sm)',
              textAlign: 'center',
              width: '100%',
            }}
          >
            <Trophy size={24} style={{ color: 'var(--accent-gold)', margin: '0 auto 0.4rem auto' }} />
            <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.15rem', color: 'var(--text-primary)' }}>
              All Pairs Matched!
            </h4>
            <p className="font-reading" style={{ fontSize: '1rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
              Madamji's memory is officially unmatched.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
