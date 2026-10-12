import { motion } from 'framer-motion'
import { Train, BookOpen, Clock } from 'lucide-react'

const schedule = [
  {
    time: '08:45 AM',
    tag: 'MORNING COMMUTE',
    title: 'The Blue Line Metro',
    desc: 'Waiting on the platform, scanning through the crowd, and pretending the commute was purely about reaching class on time.',
    icon: Train,
  },
  {
    time: '10:00 AM',
    tag: 'THE .NET LECTURE',
    title: 'Theory, Code & Sidelong Glances',
    desc: 'Occasional attempts at learning C#, frequently interrupted by whispered comments and shared inside jokes across the room.',
    icon: BookOpen,
  },
  {
    time: '05:15 PM',
    tag: 'THE RETURN COMMUTE',
    title: 'Walking Back to the Station',
    desc: 'The best part of the day. Walking without hurrying, letting conversations stretch out, and making sure she caught her train safely.',
    icon: Clock,
  },
]

export default function RoutineSection() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 580 }}>
      <div className="timeline-list">
        {schedule.map((item, i) => {
          const Icon = item.icon
          return (
            <motion.div
              key={item.tag}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.4 }}
              className="timeline-entry"
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span className="timeline-time-badge">{item.time}</span>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 'var(--radius-xs)',
                    background: 'var(--bg-surface-soft)',
                    border: '1px solid var(--border-medium)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-burgundy)',
                    marginTop: '0.6rem',
                  }}
                >
                  <Icon size={16} />
                </div>
              </div>

              <div style={{ flex: 1 }}>
                <span
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--accent-gold)',
                  }}
                >
                  {item.tag}
                </span>
                <h4
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '1.15rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginTop: '0.15rem',
                    marginBottom: '0.4rem',
                  }}
                >
                  {item.title}
                </h4>
                <p
                  className="font-reading"
                  style={{
                    fontSize: '1.05rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.55,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Narrative Reflection */}
      <div
        className="quote-parchment"
        style={{
          maxWidth: 520,
          width: '100%',
          marginTop: '2rem',
          textAlign: 'center',
          borderLeft: 'none',
          borderTop: '2px solid var(--accent-burgundy)',
        }}
      >
        <p
          className="font-reading"
          style={{
            fontSize: '1.15rem',
            fontStyle: 'italic',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
          }}
        >
          "Funny how a routine doesn’t feel like a routine when you look forward to every single part of it."
        </p>
      </div>
    </div>
  )
}
