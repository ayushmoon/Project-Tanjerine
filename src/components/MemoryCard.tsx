import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Memory } from '../data/memories'
import { Image as ImageIcon } from 'lucide-react'

interface Props {
  memory: Memory
  rotation?: number
  className?: string
  onClick?: () => void
}

export function PhotoPlaceholder({ id, title }: { id: string; title?: string }) {
  return (
    <div className="photo-matting">
      <ImageIcon size={26} style={{ opacity: 0.45, color: 'var(--accent-burgundy)', marginBottom: '0.4rem' }} />
      <span
        style={{
          fontFamily: 'Inter',
          fontSize: '0.72rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
        }}
      >
        {title || id}
      </span>
      <span
        style={{
          fontFamily: 'Crimson Text, serif',
          fontSize: '0.8rem',
          fontStyle: 'italic',
          color: 'var(--text-muted)',
          marginTop: '2px',
        }}
      >
        Keepsake Photo
      </span>
    </div>
  )
}

export default function MemoryCard({ memory, rotation = 0, className = '', onClick }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      className={`photo-mount ${className}`}
      style={{ rotate: rotation }}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      onClick={onClick}
      whileHover={{ scale: 1.03, rotate: 0, zIndex: 10 }}
    >
      {memory.image ? (
        <img
          src={memory.image}
          alt={memory.title}
          style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: '2px' }}
        />
      ) : (
        <PhotoPlaceholder id={memory.id} title={memory.title} />
      )}
      <div className="photo-mount-caption">
        {memory.caption}
      </div>
    </motion.div>
  )
}
