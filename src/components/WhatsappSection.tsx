import { useState } from 'react'
import { motion } from 'framer-motion'
import { PhoneCall, MessageSquare, Moon, ChevronDown } from 'lucide-react'

const milestones = [
  { icon: MessageSquare, title: 'Brief Texts', note: 'Polite, safe questions about class and the metro schedule.' },
  { icon: Moon, title: 'Midnight Threads', note: 'Discussions that started at 11 PM and accidentally stretched past 1 AM.' },
  { icon: PhoneCall, title: 'Long Voice Calls', note: 'When typing was simply too slow for everything there was to debate.' },
]

const messageLog = [
  { sender: 'her', text: 'Em chestunav? Did you reach home?', time: '09:15 PM' },
  { sender: 'me',  text: 'Just opened the laptop for .NET revision. You?', time: '09:17 PM' },
  { sender: 'her', text: 'Watching something random. Metro was packed today 😭', time: '09:19 PM' },
  { sender: 'me',  text: 'Always is at Ameerpet. Also, you still owe me an explanation for that one comment.', time: '09:21 PM' },
  { sender: 'her', text: 'Which one?? I didn\'t say anything wrong 😂', time: '09:22 PM' },
  { sender: 'me',  text: 'Too long to type out. Picking up.', time: '09:24 PM' },
  { sender: 'system', text: '📞 Voice Call Connected · Duration: 1h 42m', time: '09:25 PM' },
]

export default function WhatsappSection() {
  const [messagesShown, setMessagesShown] = useState(4)

  function showMore() {
    if (messagesShown < messageLog.length) {
      setMessagesShown(m => Math.min(m + 2, messageLog.length))
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 580 }}>
      {/* Three Progression Milestones */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '0.85rem',
          width: '100%',
          marginBottom: '2rem',
        }}
      >
        {milestones.map(m => {
          const Icon = m.icon
          return (
            <div
              key={m.title}
              className="paper-card"
              style={{
                padding: '1.2rem 1.1rem',
                textAlign: 'left',
              }}
            >
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
                  marginBottom: '0.75rem',
                }}
              >
                <Icon size={16} />
              </div>
              <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', marginBottom: '0.25rem' }}>
                {m.title}
              </h4>
              <p style={{ fontFamily: 'Inter', fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                {m.note}
              </p>
            </div>
          )
        })}
      </div>

      {/* Elegant Conversation Transcript Dossier */}
      <div className="chat-dossier">
        <div className="chat-dossier-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 'var(--radius-sm)',
                background: 'var(--accent-burgundy)',
                color: '#FAF7F2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Playfair Display',
                fontWeight: 700,
                fontSize: '0.95rem',
                border: '1px solid var(--accent-gold)',
              }}
            >
              M
            </div>
            <div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '0.98rem', fontWeight: 600 }}>
                Madamji
              </div>
              <div style={{ fontFamily: 'Inter', fontSize: '0.7rem', color: 'var(--accent-sage)', fontWeight: 600 }}>
                ● Active on WhatsApp
              </div>
            </div>
          </div>
          <span
            style={{
              fontFamily: 'Inter',
              fontSize: '0.68rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Chat Archive
          </span>
        </div>

        {/* Message Feed */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {messageLog.slice(0, messagesShown).map((msg, i) => {
            if (msg.sender === 'system') {
              return (
                <div
                  key={i}
                  style={{
                    alignSelf: 'center',
                    padding: '0.45rem 1rem',
                    background: 'var(--accent-gold-soft)',
                    border: '1px solid var(--accent-gold)',
                    borderRadius: 'var(--radius-full)',
                    fontFamily: 'Inter',
                    fontSize: '0.76rem',
                    fontWeight: 600,
                    color: 'var(--accent-gold)',
                    textAlign: 'center',
                    margin: '0.5rem 0',
                  }}
                >
                  {msg.text}
                </div>
              )
            }

            const isMe = msg.sender === 'me'
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={isMe ? 'chat-bubble chat-bubble-me' : 'chat-bubble chat-bubble-her'}
              >
                <div>{msg.text}</div>
                <div
                  style={{
                    fontSize: '0.65rem',
                    color: 'var(--text-muted)',
                    textAlign: isMe ? 'right' : 'left',
                    marginTop: '0.25rem',
                    fontFamily: 'Inter',
                  }}
                >
                  {msg.time}
                </div>
              </motion.div>
            )
          })}

          {messagesShown < messageLog.length && (
            <button
              onClick={showMore}
              className="btn-ghost"
              style={{ alignSelf: 'center', marginTop: '0.6rem', fontSize: '0.78rem' }}
            >
              Continue transcript <ChevronDown size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
