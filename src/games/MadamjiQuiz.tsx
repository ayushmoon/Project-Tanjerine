import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, RotateCcw, Trophy, ArrowRight } from 'lucide-react'

const questions = [
  {
    q: 'How did Ayush strike up the very first conversation with Madamji?',
    opts: [
      'Said "hi" politely on the metro escalators',
      'Picked up a rejected promo card she refused and handed it back',
      'Introduced himself before the .NET instructor arrived',
      'Asked to borrow her C# class notes',
    ],
    ans: 1,
    fun: 'A card someone else tried to give her — which she rejected. Ayush saw an opening and took it with zero hesitation.',
  },
  {
    q: 'Which language did Madamji patiently teach Ayush during the commute?',
    opts: ['Hindi', 'Tamil', 'Telugu', 'Kannada'],
    ans: 2,
    fun: '"Em chestunav?" 🪷 The undisputed foundation of all daily lessons.',
  },
  {
    q: 'What emergency apology protocol was deployed after a mistake?',
    opts: ['Store-bought chocolates', 'A handmade origami rabbit', 'A bouquet of flowers', 'A 500-word essay on WhatsApp'],
    ans: 1,
    fun: 'Origami Emergency Protocol No. 1: Successfully brokered immediate peace. 🐰',
  },
  {
    q: 'What was the official "urgent work" Ayush claimed to have at her station?',
    opts: ['A team meeting', 'Grocery shopping', 'Absolutely nothing — just making sure Madamji got home safely', 'A doctor appointment'],
    ans: 2,
    fun: '"Umm... there is some work." Mission completed with flying colors.',
  },
  {
    q: 'Despite what medical emergency did Ayush stubbornly insist on attending class?',
    opts: ['Broken wrist', 'High fever and cold', 'Complete lack of sleep', 'Lost in Hyderabad'],
    ans: 1,
    fun: '"I am completely fine. I am strong." — Said while visibly radiating heat.',
  },
  {
    q: 'Which memorable date was the mall trip, food, and endless conversations?',
    opts: ['03 October', '16 October', '10 October', '01 October'],
    ans: 0,
    fun: 'October 3rd: The mall, the food, the talks, parents calling mid-way, and one truly great afternoon.',
  },
]

export default function MadamjiQuiz() {
  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  function choose(i: number) {
    if (selected !== null) return
    setSelected(i)
    if (i === questions[idx].ans) setScore(s => s + 1)
  }

  function next() {
    if (idx < questions.length - 1) {
      setIdx(i => i + 1)
      setSelected(null)
    } else {
      setDone(true)
    }
  }

  function reset() {
    setIdx(0)
    setSelected(null)
    setScore(0)
    setDone(false)
  }

  const q = questions[idx]

  if (done) {
    const pct = Math.round((score / questions.length) * 100)
    const msg = pct >= 80
      ? 'A flawless memory! You remember every single detail. 🌟'
      : pct >= 50
      ? 'Well played! A few moments slipped by, but the core story holds strong. ✨'
      : 'Madamji would have some very strict words about your revision schedule! 😂'

    return (
      <div
        className="paper-card"
        style={{
          maxWidth: 460,
          width: '100%',
          padding: '2.5rem 2rem',
          textAlign: 'center',
        }}
      >
        <Trophy size={36} style={{ color: 'var(--accent-gold)', margin: '0 auto 0.8rem auto' }} />
        <span
          style={{
            fontFamily: 'Inter',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--accent-gold)',
          }}
        >
          Examination Results
        </span>
        <h3
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.8rem',
            color: 'var(--accent-burgundy)',
            margin: '0.4rem 0 0.8rem',
          }}
        >
          {score} of {questions.length} Correct
        </h3>
        <p
          className="font-reading"
          style={{
            fontSize: '1.15rem',
            fontStyle: 'italic',
            color: 'var(--text-secondary)',
            marginBottom: '1.8rem',
            lineHeight: 1.5,
          }}
        >
          {msg}
        </p>
        <button onClick={reset} className="btn-primary" style={{ fontSize: '0.86rem' }}>
          <RotateCcw size={15} /> Retake Quiz
        </button>
      </div>
    )
  }

  return (
    <div
      className="paper-card"
      style={{
        maxWidth: 540,
        width: '100%',
        padding: '2rem 2.2rem',
        textAlign: 'left',
      }}
    >
      {/* Quiz Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.2rem',
          paddingBottom: '0.8rem',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
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
          Question {idx + 1} of {questions.length}
        </span>
        <span style={{ fontFamily: 'Inter', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Score: {score}
        </span>
      </div>

      {/* Question Text */}
      <h3
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '1.25rem',
          fontWeight: 600,
          color: 'var(--text-primary)',
          lineHeight: 1.4,
          marginBottom: '1.5rem',
        }}
      >
        {q.q}
      </h3>

      {/* Options List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {q.opts.map((opt, i) => {
          const isChosen = selected === i
          const isCorrect = i === q.ans
          let bg = 'var(--bg-surface-soft)'
          let border = 'var(--border-subtle)'
          let color = 'var(--text-primary)'

          if (selected !== null) {
            if (isCorrect) {
              bg = 'var(--accent-sage-soft)'
              border = 'var(--accent-sage)'
              color = 'var(--accent-sage)'
            } else if (isChosen && !isCorrect) {
              bg = 'var(--accent-burgundy-light)'
              border = 'var(--accent-burgundy)'
              color = 'var(--accent-burgundy)'
            }
          }

          return (
            <button
              key={i}
              onClick={() => choose(i)}
              disabled={selected !== null}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem 1.15rem',
                borderRadius: 'var(--radius-xs)',
                background: bg,
                border: `1px solid ${border}`,
                color: color,
                fontFamily: 'Inter',
                fontSize: '0.88rem',
                fontWeight: isChosen || (selected !== null && isCorrect) ? 600 : 400,
                textAlign: 'left',
                cursor: selected === null ? 'pointer' : 'default',
                transition: 'all 0.2s ease',
              }}
            >
              <span>{opt}</span>
              {selected !== null && isCorrect && <Check size={16} />}
              {selected !== null && isChosen && !isCorrect && <X size={16} />}
            </button>
          )
        })}
      </div>

      {/* Answer Explanation & Next Button */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              marginTop: '1.5rem',
              paddingTop: '1.2rem',
              borderTop: '1px solid var(--border-subtle)',
            }}
          >
            <p
              className="font-reading"
              style={{
                fontSize: '1.05rem',
                fontStyle: 'italic',
                color: 'var(--text-secondary)',
                lineHeight: 1.5,
                marginBottom: '1rem',
              }}
            >
              {q.fun}
            </p>
            <button
              onClick={next}
              className="btn-primary"
              style={{ padding: '0.55rem 1.4rem', fontSize: '0.86rem' }}
            >
              {idx < questions.length - 1 ? 'Next Question' : 'View Results'} <ArrowRight size={15} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
