import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BIRTHDAY } from '../data/memories'

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function getTimeLeft() {
  const now = new Date()
  const target = new Date(BIRTHDAY.date)

  if (now > target) {
    target.setFullYear(target.getFullYear() + 1)
  }

  const diff = target.getTime() - now.getTime()
  if (diff <= 0) return null

  const days    = Math.floor(diff / 86400000)
  const hours   = Math.floor((diff % 86400000) / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)
  return { days, hours, minutes, seconds }
}

function isBirthdayToday() {
  const now = new Date()
  const b   = BIRTHDAY.date
  return now.getMonth() === b.getMonth() && now.getDate() === b.getDate()
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft())
  const isToday = isBirthdayToday()

  useEffect(() => {
    if (isToday) return
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [isToday])

  if (isToday || !time) {
    return (
      <div style={{ textAlign: 'center' }}>
        <span className="chapter-badge">
          <span className="bullet" />
          The Special Day
        </span>
        <h2 className="section-title" style={{ color: 'var(--accent-burgundy)', marginTop: '0.4rem' }}>
          It's 16 October — Madamji Day!
        </h2>
        <p className="font-reading" style={{ fontSize: '1.25rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
          Wishing Tejasree the warmest and happiest birthday.
        </p>
      </div>
    )
  }

  const units = [
    { value: time.days,    label: 'Days' },
    { value: time.hours,   label: 'Hours' },
    { value: time.minutes, label: 'Minutes' },
    { value: time.seconds, label: 'Seconds' },
  ]

  return (
    <div style={{ textAlign: 'center', width: '100%' }}>
      <div className="countdown-container">
        {units.map(u => (
          <div key={u.label} className="countdown-tile">
            <AnimatePresence mode="wait">
              <motion.div
                key={u.value}
                className="countdown-value"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.2 }}
              >
                {pad(u.value)}
              </motion.div>
            </AnimatePresence>
            <div className="countdown-label">{u.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
