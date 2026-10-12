import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

const stats = [
  { label: 'Cold Severity', value: 88, note: 'Audible sniffles every 30 seconds' },
  { label: 'Fever Elevation', value: 82, note: 'Forehead visibly radiating heat' },
  { label: 'Vocal Strength Remaining', value: 28, note: 'Reduced to a rasping whisper' },
  { label: 'Actual Energy Reserve', value: 18, note: 'Running purely on sheer willpower' },
  { label: 'Confidence While Lying About Health', value: 98, note: 'Olympic medal worthy' },
]

const excuses = [
  '"No, honestly, I am totally fine."',
  '"Nothing even happened. Just mild weather."',
  '"I am strong. A 102° fever is basically room temperature."',
  '"My voice naturally sounds like a 90s radio broadcast."',
  '"I came to class because C# generics require my presence."',
]

export default function FineSection() {
  const [excuseIdx, setExcuseIdx] = useState(0)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 540 }}>
      <div className="clinical-card">
        {/* Medical Assessment Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-medium)', paddingBottom: '1rem', marginBottom: '1.4rem' }}>
          <div>
            <span
              style={{
                fontFamily: 'Inter',
                fontSize: '0.68rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--accent-burgundy)',
              }}
            >
              CLINICAL TRIALS · PATIENT REPORT
            </span>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.25rem', marginTop: '0.2rem' }}>
              Condition: "Completely Fine"
            </h3>
          </div>
          <span
            style={{
              padding: '0.3rem 0.7rem',
              borderRadius: 'var(--radius-full)',
              background: 'var(--accent-sage-soft)',
              border: '1px solid var(--accent-sage)',
              fontSize: '0.7rem',
              fontWeight: 700,
              color: 'var(--accent-sage)',
              letterSpacing: '0.05em',
            }}
          >
            ● CLAIMED: OK
          </span>
        </div>

        {/* Vital Indicators */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.8rem' }}>
          {stats.map((s, i) => (
            <div key={s.label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <span style={{ fontFamily: 'Inter', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                  {s.label}
                </span>
                <span
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: s.value > 80 ? 'var(--accent-burgundy)' : 'var(--text-secondary)',
                  }}
                >
                  {s.value}%
                </span>
              </div>
              <div className="health-track">
                <motion.div
                  className="health-fill"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  style={{
                    background: s.label.includes('Confidence') ? 'var(--accent-gold)' : 'var(--accent-burgundy)',
                  }}
                />
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontStyle: 'italic', display: 'block', marginTop: '0.2rem' }}>
                {s.note}
              </span>
            </div>
          ))}
        </div>

        {/* Excuses Quotation Box */}
        <div
          style={{
            background: 'var(--bg-surface-soft)',
            border: '1px solid var(--border-paper)',
            borderRadius: 'var(--radius-xs)',
            padding: '1.1rem 1.4rem',
            textAlign: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'Inter',
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--accent-gold)',
            }}
          >
            Official Testimony #{excuseIdx + 1}
          </span>
          <p
            className="font-reading"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '1.15rem',
              fontStyle: 'italic',
              color: 'var(--accent-burgundy)',
              margin: '0.4rem 0 0.8rem',
            }}
          >
            {excuses[excuseIdx]}
          </p>
          <button
            onClick={() => setExcuseIdx(e => (e + 1) % excuses.length)}
            className="btn-ghost"
            style={{ fontSize: '0.76rem', padding: '0.3rem 0.8rem' }}
          >
            Next Excuse <ChevronRight size={13} />
          </button>
        </div>
      </div>
    </div>
  )
}
