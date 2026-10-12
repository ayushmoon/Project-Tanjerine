import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

interface Props {
  theme: 'dark' | 'light'
  onToggle: () => void
  isLocked?: boolean
  onLockedAttempt?: () => void
}

const sections = [
  { id: 'home', label: 'Cover' },
  { id: 'story', label: 'The Story' },
  { id: 'photos', label: 'Keepsakes' },
  { id: 'games', label: 'Parlor Games' },
  { id: 'letter', label: 'The Letter' },
]

export default function Navigation({ theme, onToggle, isLocked = false, onLockedAttempt }: Props) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  function scrollTo(id: string) {
    if (isLocked && id !== 'home') {
      onLockedAttempt?.()
      setOpen(false)
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <>
      <nav
        className="nav-bar"
        style={{
          boxShadow: scrolled ? 'var(--shadow-subtle)' : 'none',
        }}
        aria-label="Main Navigation"
      >
        {/* Brand / Monogram */}
        <button
          onClick={() => scrollTo('home')}
          className="nav-brand"
          aria-label="Return to cover"
        >
          <div className="nav-monogram">M</div>
          <div>
            <span className="nav-brand-text">For Madamji</span>
            <span className="nav-brand-sub">Oct 16</span>
          </div>
        </button>

        {/* Desktop Links */}
        <ul className="nav-links">
          {sections.map(s => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={e => {
                  e.preventDefault()
                  scrollTo(s.id)
                }}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions: Theme Toggle & Mobile Hamburger */}
        <div className="nav-actions">
          <button
            className="theme-switch"
            onClick={onToggle}
            title={theme === 'dark' ? 'Switch to daylight paper' : 'Switch to evening mode'}
            aria-label="Toggle visual theme"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <button
            className="hamburger-btn"
            onClick={() => setOpen(v => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            <span style={{ transform: open ? 'rotate(45deg) translateY(6.5px)' : 'none' }} />
            <span style={{ opacity: open ? 0 : 1 }} />
            <span style={{ transform: open ? 'rotate(-45deg) translateY(-6.5px)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu open"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {sections.map(s => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={e => {
                  e.preventDefault()
                  scrollTo(s.id)
                }}
              >
                {s.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
