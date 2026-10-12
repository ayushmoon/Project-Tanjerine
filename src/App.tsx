import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Sparkles, ArrowDown, ArrowLeft, Image as ImageIcon, X, ZoomIn } from 'lucide-react'

// Layout & Core Components
import Navigation from './components/Navigation'
import Countdown from './components/Countdown'
import Confetti from './components/Confetti'

// Story Chapter Components
import ChapterCard from './components/ChapterCard'
import MetroSection from './components/MetroSection'
import RoutineSection from './components/RoutineSection'
import RabbitSection from './components/RabbitSection'
import WhatsappSection from './components/WhatsappSection'
import SomeWorkSection from './components/SomeWorkSection'
import FineSection from './components/FineSection'
import BecauseSection from './components/BecauseSection'
import LetterSection from './components/LetterSection'
import FoodSection from './components/FoodSection'
import MemoryCard from './components/MemoryCard'
import PhotoViewer from './components/PhotoViewer'

// Games
import SpinWheel from './games/SpinWheel'
import MemoryMatch from './games/MemoryMatch'
import PhotoPuzzle from './games/PhotoPuzzle'
import MadamjiQuiz from './games/MadamjiQuiz'

// Data
import { memories, bestPhoto, BIRTHDAY } from './data/memories'

// ─── Theme Hook ────────────────────────────────────────────────
function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('bdTheme') as 'light' | 'dark') || 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('bdTheme', theme)
  }, [theme])

  return {
    theme,
    toggle: () => setTheme(t => (t === 'light' ? 'dark' : 'light')),
  }
}

// ─── Section Container with Restrained In-View Transition ──────
function Section({
  id,
  children,
  style = {},
}: {
  id: string
  children: React.ReactNode
  style?: React.CSSProperties
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id={id} ref={ref} className="section-wrapper" style={style}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: '100%',
          maxWidth: 860,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {children}
      </motion.div>
    </section>
  )
}

// ─── Editorial Chapter Header ──────────────────────────────────
function ChapterHeader({
  badge,
  title,
  subtitle,
}: {
  badge: string
  title: string
  subtitle?: string
}) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
      <span className="chapter-badge">
        <span className="bullet" />
        {badge}
      </span>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  )
}

// ─── The Portrait Reveal (Best Photo) ─────────────────────────
function PortraitReveal() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [isZoomed, setIsZoomed] = useState(false)

  // Close zoomed modal on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsZoomed(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div ref={ref} style={{ textAlign: 'center', width: '100%', marginTop: '3.5rem' }}>
      <span
        style={{
          fontFamily: 'Inter',
          fontSize: '0.72rem',
          fontWeight: 700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--accent-gold)',
          display: 'block',
          marginBottom: '0.5rem',
        }}
      >
        The Crowning Keepsake
      </span>
      <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', marginBottom: '1.5rem' }}>
        The Portrait
      </h3>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="portrait-frame"
      >
        <div
          onClick={() => { if (bestPhoto.image) setIsZoomed(true) }}
          role={bestPhoto.image ? 'button' : undefined}
          tabIndex={bestPhoto.image ? 0 : undefined}
          onKeyDown={e => { if (e.key === 'Enter' && bestPhoto.image) setIsZoomed(true) }}
          style={{
            aspectRatio: '3/4',
            background: 'var(--bg-surface-soft)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xs)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: bestPhoto.image ? 'pointer' : 'default',
            position: 'relative',
          }}
          title="Click to view full portrait"
        >
          {bestPhoto.image ? (
            <>
              <img
                src={bestPhoto.image}
                alt="Madamji Portrait"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 45%',
                  transition: 'transform 0.4s ease',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '10px',
                  background: 'rgba(26, 22, 20, 0.65)',
                  backdropFilter: 'blur(6px)',
                  color: '#fff',
                  borderRadius: '999px',
                  padding: '5px 10px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '0.68rem',
                  fontFamily: 'Inter',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  pointerEvents: 'none',
                }}
              >
                <ZoomIn size={12} />
                <span>Expand</span>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <ImageIcon
                size={48}
                style={{ opacity: 0.35, color: 'var(--accent-burgundy)', margin: '0 auto 0.8rem auto' }}
              />
              <span
                style={{
                  fontFamily: 'Inter',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-burgundy)',
                  display: 'block',
                  marginBottom: '0.3rem',
                }}
              >
                Reserved for Madamji
              </span>
              <p
                className="font-reading"
                style={{
                  fontSize: '0.95rem',
                  fontStyle: 'italic',
                  color: 'var(--text-muted)',
                }}
              >
                Add your favorite photo in memories.ts
              </p>
            </div>
          )}
        </div>

        {/* Brass Nameplate */}
        <div className="portrait-nameplate">
          TEJASREE · MADAMJI
        </div>

        <p
          className="font-reading"
          style={{
            fontSize: '1.15rem',
            fontStyle: 'italic',
            color: 'var(--text-secondary)',
            marginTop: '0.9rem',
            lineHeight: 1.5,
            maxWidth: 420,
            margin: '0.9rem auto 0 auto',
          }}
        >
          "{bestPhoto.caption}"
        </p>
        <span
          style={{
            fontFamily: 'Inter',
            fontSize: '0.68rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--accent-gold)',
            display: 'block',
            marginTop: '0.5rem',
            fontWeight: 700,
          }}
        >
          Happy Birthday, Madamji · 16 October
        </span>
      </motion.div>

      {/* Lightbox / Zoom Dialog */}
      <AnimatePresence>
        {isZoomed && bestPhoto.image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'rgba(15, 12, 10, 0.88)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
            }}
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              onClick={e => e.stopPropagation()}
              style={{
                position: 'relative',
                maxWidth: 580,
                width: '100%',
                maxHeight: '92vh',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-xl)',
                borderRadius: 'var(--radius-sm)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <button
                onClick={() => setIsZoomed(false)}
                aria-label="Close portrait view"
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'var(--bg-surface-soft)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 2,
                }}
              >
                <X size={18} />
              </button>

              <div
                style={{
                  width: '100%',
                  maxHeight: '66vh',
                  borderRadius: 'var(--radius-xs)',
                  overflow: 'hidden',
                  background: 'var(--bg-surface-soft)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={bestPhoto.image}
                  alt="Madamji Portrait"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '66vh',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              </div>

              <div className="portrait-nameplate" style={{ marginTop: '1rem' }}>
                TEJASREE · MADAMJI
              </div>

              <p
                className="font-reading"
                style={{
                  fontSize: '1.05rem',
                  fontStyle: 'italic',
                  color: 'var(--text-secondary)',
                  textAlign: 'center',
                  margin: '0.6rem 0 0.3rem 0',
                  lineHeight: 1.45,
                }}
              >
                "{bestPhoto.caption}"
              </p>

              <span
                style={{
                  fontFamily: 'Inter',
                  fontSize: '0.68rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-gold)',
                  fontWeight: 700,
                }}
              >
                {bestPhoto.date || 'The Crowning Keepsake · 16 October'}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Main Application ──────────────────────────────────────────
export default function App() {
  const { theme, toggle } = useTheme()
  const [showConfetti, setShowConfetti] = useState(false)
  const [activeGame, setActiveGame] = useState<string | null>(null)

  const parlorGames = [
    {
      id: 'puzzle',
      label: 'Photo Tile Puzzle',
      sub: 'Slide the tiles back into order.',
      icon: '🧩',
    },
    {
      id: 'wheel',
      label: 'Fortune Wheel',
      sub: 'Spin for an official birthday decree.',
      icon: '🎡',
    },
    {
      id: 'match',
      label: 'Memory Pairs',
      sub: 'Match the keepsake card symbols.',
      icon: '🃏',
    },
    {
      id: 'quiz',
      label: 'The Madamji Quiz',
      sub: 'Test your recollection of our story.',
      icon: '❓',
    },
  ]

  // ── Lock & Developer Bypass State ─────────────────────────────
  const [isDevUnlocked, setIsDevUnlocked] = useState<boolean>(() => {
    return sessionStorage.getItem('bd_dev_unlocked') === 'true'
  })
  const [isTimerExpired, setIsTimerExpired] = useState<boolean>(() => {
    return new Date().getTime() >= new Date(BIRTHDAY.date).getTime()
  })

  // 4-click developer counter on the hero card
  const devClicksRef = useRef(0)
  const devClickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Subtle toast notification for locked actions & dev mode
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showToast = (msg: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
    setToastMessage(msg)
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null)
    }, 3200)
  }

  // Check whether countdown timer reached zero
  useEffect(() => {
    const checkTimer = () => {
      if (new Date().getTime() >= new Date(BIRTHDAY.date).getTime()) {
        setIsTimerExpired(prev => {
          if (!prev) triggerCelebration()
          return true
        })
      }
    }
    checkTimer()
    const interval = setInterval(checkTimer, 1000)
    return () => clearInterval(interval)
  }, [])

  function triggerCelebration() {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 5500)
  }

  // Clicking the card 4 times unlocks developer mode
  const handleCardClick = () => {
    if (isTimerExpired) return

    if (devClickTimeoutRef.current) {
      clearTimeout(devClickTimeoutRef.current)
    }

    devClicksRef.current += 1
    const count = devClicksRef.current

    if (count >= 4) {
      devClicksRef.current = 0
      setIsDevUnlocked(true)
      sessionStorage.setItem('bd_dev_unlocked', 'true')
      triggerCelebration()
      showToast('🔓 Developer mode unlocked!')
    } else {
      if (count === 3) {
        showToast('1 more click to unlock developer mode...')
      }
      devClickTimeoutRef.current = setTimeout(() => {
        devClicksRef.current = 0
      }, 8000)
    }
  }

  const handleRelock = () => {
    devClicksRef.current = 0
    setIsDevUnlocked(false)
    sessionStorage.removeItem('bd_dev_unlocked')
    showToast('🔒 Re-locked for Madamji until October 16')
  }

  const isUnlocked = isTimerExpired || isDevUnlocked

  const handleBeginStory = () => {
    if (!isUnlocked) {
      showToast('🔒 Locked until October 16! Unlocks when countdown hits zero.')
      return
    }
    document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSkipToLetter = () => {
    if (!isUnlocked) {
      showToast('🔒 Locked until October 16! Unlocks when countdown hits zero.')
      return
    }
    document.getElementById('letter')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <Navigation
        theme={theme}
        onToggle={toggle}
        isLocked={!isUnlocked}
        onLockedAttempt={() => showToast('🔒 Locked until October 16! Unlocks when countdown hits zero.')}
      />
      {showConfetti && <Confetti />}

      {/* ── Toast Notification for lock & dev mode ──────── */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            className="lock-toast"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 1. COVER / HERO SECTION ──────────────────────── */}
      <section
        id="home"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '7rem 1.5rem 4rem',
        }}
      >
        <div
          className="hero-frame"
          onClick={handleCardClick}
          title={!isUnlocked ? 'Click 4 times to unlock developer mode' : undefined}
        >
          {/* Subtle Corner Filigrees */}
          <div className="hero-corner-ornament hero-corner-tl" />
          <div className="hero-corner-ornament hero-corner-tr" />
          <div className="hero-corner-ornament hero-corner-bl" />
          <div className="hero-corner-ornament hero-corner-br" />

          {/* Countdown Clock */}
          <Countdown />

          {/* Editorial Display Typography */}
          <span
            style={{
              fontFamily: 'Inter',
              fontSize: '0.74rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--accent-burgundy)',
              display: 'block',
              marginBottom: '0.8rem',
            }}
          >
            A Personal Keepsake · Hyderabad Memories
          </span>

          <h1
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2.6rem, 7vw, 4.6rem)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              lineHeight: 1.15,
              marginBottom: '1.2rem',
            }}
          >
            Ours started with a card.
          </h1>

          <p
            className="font-reading"
            style={{
              fontSize: 'clamp(1.15rem, 2.5vw, 1.45rem)',
              fontStyle: 'italic',
              color: 'var(--text-secondary)',
              maxWidth: 620,
              margin: '0 auto 2.2rem auto',
              lineHeight: 1.6,
            }}
          >
            A true story of .NET classes, daily metro commutes, emergency origami apologies, and one very special person named Tejasree.
          </p>

          <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              className="btn-primary"
              onClick={handleBeginStory}
            >
              Begin the Story <ArrowDown size={15} />
            </button>
            <button
              className="btn-secondary"
              onClick={handleSkipToLetter}
            >
              Skip to the Letter
            </button>
          </div>

          <div
            style={{
              marginTop: '2.5rem',
              fontFamily: 'Inter',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.04em',
            }}
          >
            Dedicated to Madamji on 16 October · Crafted by Ayush
          </div>
        </div>
      </section>

      {/* ── 2. NARRATIVE STORY CHAPTERS & CONTENT (Unlocked When Timer Hits Zero or via Dev Clicks) ── */}
      {isUnlocked && (
        <>
          <div id="story">
        {/* Chapter 1 */}
        <Section id="ch1">
          <ChapterHeader
            badge="Chapter I · The Encounter"
            title="The Refused Card"
            subtitle="It could have been any other ordinary afternoon on a Hyderabad street."
          />
          <ChapterCard />
        </Section>

        {/* Chapter 2 */}
        <Section id="ch2">
          <ChapterHeader
            badge="Chapter II · The Transit Exchange"
            title="Metro Talks"
            subtitle="Hyderabad ↔ Maharashtra · Where language lessons superseded computer science."
          />
          <MetroSection />
        </Section>

        {/* Chapter 3 */}
        <Section id="ch3">
          <ChapterHeader
            badge="Chapter III · The Daily Commute"
            title="The Routine"
            subtitle="Morning Blue Line → .NET Class → Evening Walk. Day after day."
          />
          <RoutineSection />
        </Section>

        {/* Chapter 4 */}
        <Section id="ch4">
          <ChapterHeader
            badge="Chapter IV · Emergency Diplomacy"
            title="The Rabbit Incident"
            subtitle="When words fell short, paper was folded with extreme urgency."
          />
          <RabbitSection />
        </Section>

        {/* Chapter 5 */}
        <Section id="ch5">
          <ChapterHeader
            badge="Chapter V · The Conversation Expands"
            title="WhatsApp → Midnight Calls"
            subtitle="Some topics simply refuse to remain contained within text bubbles."
          />
          <WhatsappSection />
        </Section>

        {/* Chapter 6 */}
        <Section id="ch6">
          <ChapterHeader
            badge="Chapter VI · Operation Safeguard"
            title="The Very Important Work"
            subtitle='Declassified case file: The official pretext at her metro station.'
          />
          <SomeWorkSection />
        </Section>

        {/* Chapter 7 */}
        <Section id="ch7">
          <ChapterHeader
            badge="Chapter VII · The Medical Defense"
            title='"I Am Completely Fine"'
            subtitle="Spoiler: The fever was real, but the stubbornness was greater."
          />
          <FineSection />
        </Section>

        {/* Chapter 8 · 03 October */}
        <Section id="ch8">
          <ChapterHeader
            badge="Chapter VIII · The Keepsake Afternoon"
            title="03 October"
            subtitle="The afternoon that quietly cemented itself into memory."
          />

          <div className="scrapbook-spread">
            {/* Scrapbook Photos */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {memories.slice(6, 8).map((m, i) => (
                <MemoryCard key={m.id} memory={m} rotation={i === 0 ? -1.5 : 1.5} />
              ))}
            </div>

            {/* Scrapbook Story Entry */}
            <div
              className="paper-card"
              style={{
                padding: '2rem',
                borderLeft: '3px solid var(--accent-burgundy)',
              }}
            >
              <span
                style={{
                  fontFamily: 'Inter',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-gold)',
                  display: 'block',
                  marginBottom: '0.6rem',
                }}
              >
                Field Note · October 3rd
              </span>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.35rem', marginBottom: '1rem' }}>
                The Mall Expedition
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {[
                  'We went to the mall together.',
                  'We ordered food without rushing.',
                  'We talked about everything, and then nothing in particular.',
                  'Her parents called mid-way (mild panic ensued).',
                  'And somehow, it settled into one of the very best days of the year.',
                ].map((line, i) => (
                  <p
                    key={i}
                    className="font-reading"
                    style={{
                      fontSize: '1.1rem',
                      fontStyle: i === 4 ? 'italic' : 'normal',
                      color: i === 4 ? 'var(--accent-burgundy)' : 'var(--text-primary)',
                      fontWeight: i === 4 ? 600 : 400,
                      lineHeight: 1.55,
                    }}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Chapter 9 */}
        <Section id="ch9">
          <ChapterHeader
            badge="Chapter IX · Jurisprudence"
            title="The Official Rule of Madamji"
            subtitle="Where all unexpected city events are legally blamed on Ayush."
          />
          <BecauseSection />
        </Section>

        {/* ── 3. BIRTHDAY CELEBRATION MILESTONE ────────────── */}
        <Section id="bday-altar">
          <div className="celebration-altar">
            <span
              style={{
                fontFamily: 'Inter',
                fontSize: '0.74rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--accent-gold)',
                display: 'block',
                marginBottom: '0.6rem',
              }}
            >
              The Special Milestone
            </span>

            <h2
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(2.5rem, 6.5vw, 4.2rem)',
                fontWeight: 700,
                color: 'var(--text-primary)',
                lineHeight: 1.15,
                marginBottom: '0.5rem',
              }}
            >
              16 OCTOBER 🎂
            </h2>

            <p
              className="font-script"
              style={{
                fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
                color: 'var(--accent-burgundy)',
                marginBottom: '1.8rem',
              }}
            >
              Happy Birthday, Madamji.
            </p>

            <p
              className="font-reading"
              style={{
                fontSize: '1.2rem',
                fontStyle: 'italic',
                color: 'var(--text-secondary)',
                maxWidth: 540,
                margin: '0 auto 2.2rem auto',
                lineHeight: 1.6,
              }}
            >
              Here’s to another year of great laughs, warm food, and having you in my life.
            </p>

            <button
              onClick={triggerCelebration}
              className="btn-primary"
              style={{ padding: '0.9rem 2.4rem', fontSize: '1rem' }}
            >
              <Sparkles size={17} /> Celebrate with Confetti!
            </button>
          </div>
        </Section>
      </div>

      {/* ── 4. MADAMJI'S FOOD COURT ───────────────────────── */}
      <Section id="food">
        <ChapterHeader
          badge="Culinary Protocol"
          title="Madamji's Food Court"
          subtitle="The official dining constitution — where French Fries reign supreme."
        />
        <FoodSection />
      </Section>

      {/* ── 5. KEEPSAKES & PHOTOS ─────────────────────────── */}
      <Section id="photos">
        <ChapterHeader
          badge="Keepsake Gallery"
          title="Moments in Time"
          subtitle="All the little moments collected along the Hyderabad routes."
        />
        <PhotoViewer memories={memories} />
        <PortraitReveal />
      </Section>

      {/* ── 6. PARLOR GAMES ───────────────────────────────── */}
      <Section id="games">
        <ChapterHeader
          badge="Parlor Games"
          title="Birthday Divertissements"
          subtitle="A selection of quiet games prepared specially for Madamji."
        />

        {!activeGame ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.25rem',
              width: '100%',
              maxWidth: 720,
            }}
          >
            {parlorGames.map(g => (
              <button
                key={g.id}
                className="game-capsule"
                onClick={() => setActiveGame(g.id)}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>{g.icon}</div>
                <h3
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '1.15rem',
                    color: 'var(--text-primary)',
                    marginBottom: '0.35rem',
                  }}
                >
                  {g.label}
                </h3>
                <p style={{ fontFamily: 'Inter', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                  {g.sub}
                </p>
                <span
                  style={{
                    display: 'inline-block',
                    marginTop: '1rem',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    color: 'var(--accent-burgundy)',
                    letterSpacing: '0.04em',
                  }}
                >
                  Play Game →
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.5rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                maxWidth: 540,
                borderBottom: '1px solid var(--border-medium)',
                paddingBottom: '0.8rem',
              }}
            >
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem' }}>
                {parlorGames.find(g => g.id === activeGame)?.label}
              </h3>
              <button onClick={() => setActiveGame(null)} className="btn-ghost" style={{ fontSize: '0.8rem' }}>
                <ArrowLeft size={14} /> Back to Game Hub
              </button>
            </div>

            {activeGame === 'puzzle' && <PhotoPuzzle />}
            {activeGame === 'wheel' && <SpinWheel />}
            {activeGame === 'match' && <MemoryMatch />}
            {activeGame === 'quiz' && <MadamjiQuiz />}
          </div>
        )}
      </Section>

      {/* ── 7. THE PERSONAL LETTER ─────────────────────────── */}
      <Section id="letter">
        <ChapterHeader
          badge="Personal Correspondence"
          title="The Letter"
          subtitle="Some thoughts put to paper, just for you."
        />
        <LetterSection />
      </Section>

      {/* ── 8. EDITORIAL FOOTER ────────────────────────────── */}
      <footer
        style={{
          borderTop: '1px solid var(--border-medium)',
          background: 'var(--bg-surface)',
          padding: '4rem 1.5rem',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <p
          className="font-script"
          style={{
            fontSize: '1.6rem',
            color: 'var(--accent-burgundy)',
            marginBottom: '0.4rem',
          }}
        >
          Happy Birthday, Madamji.
        </p>
        <p
          className="font-reading"
          style={{
            fontSize: '1.05rem',
            fontStyle: 'italic',
            color: 'var(--text-secondary)',
            marginBottom: '1rem',
          }}
        >
          Built with real memories, genuine gratitude, and zero paper rabbits this time.
        </p>
        <div
          style={{
            fontFamily: 'Inter',
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          An Unexpected Archive · October 16 · Ayush & Tejasree
        </div>
      </footer>
        </>
      )}

      {/* ── Developer Controls (Active only in Dev Bypass mode before Oct 16) ── */}
      {isDevUnlocked && !isTimerExpired && (
        <div className="dev-floating-pill">
          <span>🔓 Dev Bypass Active</span>
          <button
            onClick={handleRelock}
            className="dev-relock-btn"
            title="Click to re-lock page and test lock view"
          >
            Re-lock
          </button>
        </div>
      )}
    </div>
  )
}
