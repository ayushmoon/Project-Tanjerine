import { motion } from 'framer-motion'
import { foodItems } from '../data/memories'

export default function FoodSection() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 680 }}>
      {/* Bistro Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          width: '100%',
          marginBottom: '2rem',
        }}
      >
        {foodItems.map((item, i) => (
          <motion.div
            key={item.name}
            className={`bistro-card ${item.highlight ? 'mandatory' : ''}`}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '0.6rem' }}>
              {item.emoji}
            </div>

            <h4
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.15rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '0.35rem',
              }}
            >
              {item.name}
            </h4>

            <p
              style={{
                fontFamily: 'Crimson Text, serif',
                fontSize: '1.05rem',
                fontStyle: 'italic',
                color: 'var(--text-secondary)',
                lineHeight: 1.45,
              }}
            >
              {item.caption}
            </p>

            {item.highlight ? (
              <span className="bistro-tag">
                Mandatory Order
              </span>
            ) : (
              <span
                style={{
                  display: 'inline-block',
                  marginTop: '0.6rem',
                  fontSize: '0.68rem',
                  fontFamily: 'Inter',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                Madamji Approved
              </span>
            )}
          </motion.div>
        ))}
      </div>

      <div
        className="quote-parchment"
        style={{
          maxWidth: 540,
          width: '100%',
          textAlign: 'center',
          borderLeft: 'none',
          borderTop: '2px solid var(--accent-gold)',
        }}
      >
        <p
          className="font-reading"
          style={{
            fontSize: '1.2rem',
            fontStyle: 'italic',
            color: 'var(--text-primary)',
            lineHeight: 1.6,
          }}
        >
          "French fries are not an appetizer. They are the main event, the peace offering, and the official language of happiness."
        </p>
        <span
          style={{
            display: 'block',
            marginTop: '0.5rem',
            fontFamily: 'Inter',
            fontSize: '0.78rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--accent-gold)',
          }}
        >
          — Madamji’s Unwritten Dining Constitution
        </span>
      </div>
    </div>
  )
}
