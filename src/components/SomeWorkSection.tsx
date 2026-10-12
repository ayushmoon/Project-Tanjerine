import { useState } from 'react'
import { Lock, Unlock } from 'lucide-react'

export default function SomeWorkSection() {
  const [declassified, setDeclassified] = useState(false)

  const dossierFields = [
    { label: 'OPERATION CODE', value: 'OPERATION: SOME WORK', isPublic: true },
    { label: 'OFFICIAL PRETEXT', value: '"Umm... there is some urgent work at your station."', isPublic: true },
    { label: 'ACTUAL NATURE OF WORK', value: 'Drop Madamji safely and ensure zero metro delays.', isPublic: declassified },
    { label: 'URGENCY RATING', value: '10 / 10 (Highest Priority on the Docket)', isPublic: declassified },
    { label: 'MISSION OUTCOME', value: '100% Success. Safely escorted to exit gate.', isPublic: declassified },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 540 }}>
      <div
        className="confidential-memo"
        style={{
          padding: '1.8rem 1.6rem',
        }}
      >
        {/* Header with non-overlapping stamp */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '0.75rem',
            borderBottom: '1px solid var(--border-medium)',
            paddingBottom: '1rem',
            marginBottom: '1.3rem',
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <span
              style={{
                fontFamily: 'Inter',
                fontSize: '0.68rem',
                fontWeight: 800,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--accent-gold)',
                display: 'block',
                marginBottom: '0.25rem',
              }}
            >
              CONFIDENTIAL ARCHIVE · FILE #1016
            </span>
            <h3
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(1.15rem, 3.5vw, 1.35rem)',
                lineHeight: 1.25,
                margin: 0,
              }}
            >
              The "Very Important Work" Dossier
            </h3>
          </div>

          {/* Classified Stamp - neatly placed beside heading */}
          <div
            className="stamp-classified"
            style={{
              position: 'static',
              flexShrink: 0,
              transform: 'rotate(4deg)',
              padding: '0.28rem 0.65rem',
              fontSize: '0.68rem',
              whiteSpace: 'nowrap',
              margin: '2px 0 0 0',
            }}
          >
            {declassified ? 'DECLASSIFIED' : 'RESTRICTED'}
          </div>
        </div>

        {/* Dossier Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {dossierFields.map(f => (
            <div
              key={f.label}
              style={{
                background: 'var(--bg-surface-soft)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-xs)',
                padding: '0.75rem 0.95rem',
              }}
            >
              <div
                style={{
                  fontFamily: 'Inter',
                  fontSize: '0.66rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: '0.25rem',
                }}
              >
                {f.label}
              </div>
              <div
                style={{
                  fontFamily: 'Crimson Text, serif',
                  fontSize: '1.05rem',
                  color: 'var(--text-primary)',
                  fontWeight: 600,
                  minHeight: '1.4rem',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {f.isPublic ? (
                  <span>{f.value}</span>
                ) : (
                  <span
                    style={{
                      display: 'inline-block',
                      height: '1.15rem',
                      width: '180px',
                      maxWidth: '85%',
                      background: 'var(--text-primary)',
                      borderRadius: '3px',
                      opacity: 0.82,
                    }}
                    aria-label="Classified"
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Action Button to Unveil */}
        <div style={{ marginTop: '1.6rem', textAlign: 'center' }}>
          <button
            onClick={() => setDeclassified(v => !v)}
            className={declassified ? 'btn-secondary' : 'btn-primary'}
            style={{ fontSize: '0.86rem', padding: '0.65rem 1.6rem' }}
          >
            {declassified ? (
              <>
                <Lock size={15} /> Redact File Information
              </>
            ) : (
              <>
                <Unlock size={15} /> Declassify Official Dossier
              </>
            )}
          </button>
        </div>
      </div>

      <p
        style={{
          marginTop: '1.3rem',
          fontFamily: 'Crimson Text, serif',
          fontSize: '1.05rem',
          fontStyle: 'italic',
          color: 'var(--text-muted)',
          textAlign: 'center',
          maxWidth: 420,
        }}
      >
        "To this day, the exact nature of 'that work' remains entirely self-evident."
      </p>
    </div>
  )
}
