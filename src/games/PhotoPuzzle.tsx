import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, Trophy, Sparkles } from 'lucide-react'

const SIZE = 3
const TOTAL = SIZE * SIZE

function isSolvable(tiles: number[]) {
  let inv = 0
  const arr = tiles.filter(t => t !== 0)
  for (let i = 0; i < arr.length; i++)
    for (let j = i + 1; j < arr.length; j++)
      if (arr[i] > arr[j]) inv++
  return inv % 2 === 0
}

function isWon(tiles: number[]) {
  return tiles.every((t, i) => t === (i + 1) % TOTAL)
}

function shuffle(): number[] {
  let tiles: number[]
  do {
    tiles = [...Array(TOTAL).keys()].sort(() => Math.random() - 0.5)
  } while (!isSolvable(tiles) || isWon(tiles))
  return tiles
}

export default function PhotoPuzzle() {
  const [tiles, setTiles] = useState<number[]>(shuffle)
  const [moves, setMoves] = useState(0)
  const [won, setWon] = useState(false)

  const move = useCallback((idx: number) => {
    if (won) return
    const empty = tiles.indexOf(0)
    const row = Math.floor(idx / SIZE), col = idx % SIZE
    const er = Math.floor(empty / SIZE), ec = empty % SIZE
    if (Math.abs(row - er) + Math.abs(col - ec) !== 1) return

    const next = [...tiles]
    ;[next[idx], next[empty]] = [next[empty], next[idx]]
    setTiles(next)
    setMoves(m => m + 1)
    if (isWon(next)) setWon(true)
  }, [tiles, won])

  function reset() {
    setTiles(shuffle())
    setMoves(0)
    setWon(false)
  }

  function autoSolve() {
    const solved = [1, 2, 3, 4, 5, 6, 7, 8, 0]
    setTiles(solved)
    setWon(true)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 360 }}>
      {/* Header Info */}
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
        <span
          style={{
            fontFamily: 'Inter',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
          }}
        >
          Moves Taken: <strong style={{ color: 'var(--text-primary)' }}>{moves}</strong>
        </span>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={reset} className="btn-ghost" style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}>
            <RotateCcw size={13} /> Shuffle
          </button>
          {!won && (
            <button onClick={autoSolve} className="btn-ghost" style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}>
              <Sparkles size={13} /> Complete
            </button>
          )}
        </div>
      </div>

      {/* 3x3 Puzzle Board */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${SIZE}, 1fr)`,
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
        {tiles.map((tile, idx) => (
          <motion.button
            key={`${tile}-${idx}`}
            onClick={() => move(idx)}
            layout
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            style={{
              aspectRatio: '1',
              borderRadius: 'var(--radius-xs)',
              border: tile === 0 ? 'none' : '1px solid var(--border-medium)',
              cursor: tile === 0 ? 'default' : 'pointer',
              background: tile === 0
                ? 'transparent'
                : 'var(--bg-surface-soft)',
              color: 'var(--text-primary)',
              fontFamily: 'Playfair Display, serif',
              fontWeight: 700,
              fontSize: '1.4rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: tile === 0 ? 'none' : 'var(--shadow-subtle)',
              position: 'relative',
            }}
            disabled={tile === 0 || won}
            aria-label={tile === 0 ? 'Empty space' : `Tile ${tile}`}
          >
            {tile !== 0 && (
              <>
                <span
                  style={{
                    position: 'absolute',
                    top: '4px',
                    left: '6px',
                    fontSize: '0.55rem',
                    fontFamily: 'Inter',
                    color: 'var(--accent-gold)',
                  }}
                >
                  ✦
                </span>
                {tile}
              </>
            )}
          </motion.button>
        ))}
      </div>

      {/* Completion Banner */}
      <AnimatePresence>
        {won && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              marginTop: '1.5rem',
              padding: '1rem 1.4rem',
              background: 'var(--accent-gold-soft)',
              border: '1px solid var(--accent-gold)',
              borderRadius: 'var(--radius-sm)',
              textAlign: 'center',
              width: '100%',
            }}
          >
            <Trophy size={24} style={{ color: 'var(--accent-gold)', margin: '0 auto 0.4rem auto' }} />
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontWeight: 600 }}>
              Puzzle Solved!
            </div>
            <p className="font-reading" style={{ fontSize: '0.95rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
              Madamji's intellectual brilliance on full display.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
