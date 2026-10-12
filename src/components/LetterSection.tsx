import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MailOpen } from 'lucide-react'

export default function LetterSection() {
  const [opened, setOpened] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 720 }}>
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}
          >
            {/* Sealed Keepsake Envelope */}
            <div
              className="keepsake-envelope"
              onClick={() => setOpened(true)}
              role="button"
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setOpened(true) }}
              aria-label="Click to break seal and read birthday letter"
              style={{ width: 280, height: 180 }}
            >
              <div className="envelope-fold-top" />
              <div className="wax-seal" style={{ width: 44, height: 44, fontSize: '1.1rem' }}>
                <span>M</span>
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: 14,
                  left: 20,
                  right: 20,
                  height: 48,
                  background: 'var(--bg-surface)',
                  borderRadius: '2px',
                  border: '1px solid var(--border-paper)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--accent-burgundy)',
                  }}
                >
                  Personal & Confidential · For Madamji
                </span>
              </div>
            </div>

            <button
              onClick={() => setOpened(true)}
              className="btn-primary"
              style={{ padding: '0.8rem 2.2rem', fontSize: '0.94rem' }}
            >
              <MailOpen size={16} /> Break Seal & Read Letter
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="letter-parchment"
          >
            {/* Top Crest / Emblem */}
            <div className="letter-top-crest">
              <span>✦ &nbsp; 16 OCTOBER &nbsp; ✦</span>
            </div>

            <h2 className="letter-salutation">
              Dear Madamji,
            </h2>

            <div className="letter-prose">
              <p>
                A completely random card on a busy Hyderabad street. That’s how this entire story began. 
                Not the kind of beginning anyone would plan in advance, but somehow it unfolded into daily 
                metro rides, bilingual language lessons going both ways, quiet jokes in .NET classes, WhatsApp 
                texts that refused to stay in text and turned into hours-long calls, an origami rabbit folded 
                as an emergency peace treaty, suspicious "some work" excuses at your metro station, and that 
                one really memorable October afternoon at the mall.
              </p>

              <p>
                Honestly? I didn't anticipate an accidental encounter turning into so many small, cherished memories. 
                The subtle kind you don’t notice accumulating day after day, until suddenly you look back and realize 
                how meaningful they’ve become.
              </p>

              <p>
                Thank you for the conversations, the Hyderabad perspectives, the patient Telugu lessons 
                (which I am still trying to master), the shared laughs, and especially for your Olympic-level talent 
                for finding a way to blame me for literally anything that happens across the city.
                <span style={{ fontStyle: 'italic', color: 'var(--accent-burgundy)' }}> A truly exceptional gift.</span>
              </p>

              <p>
                You made my Hyderabad months far more memorable than they would ever have been without you. 
                And I think that counts for quite a lot.
              </p>

              <p>
                I hope this birthday brings you hot, crispy french fries (mandatory, non-negotiable), quiet peaceful 
                mornings, loud genuine laughs, and plenty of reasons to smile. You deserve a truly wonderful year, Madamji.
              </p>

              <p style={{ fontWeight: 600, color: 'var(--accent-burgundy)' }}>
                Happy Birthday, Tejasree. 🎂
              </p>
            </div>

            {/* Handwritten Valediction */}
            <div className="letter-valediction">
              — Ayush
            </div>

            <div style={{ textAlign: 'center', marginTop: '2.5rem', paddingTop: '1.2rem', borderTop: '1px dashed var(--border-paper)' }}>
              <button
                onClick={() => setOpened(false)}
                className="btn-ghost"
                style={{ fontSize: '0.78rem' }}
              >
                Refold into envelope
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
