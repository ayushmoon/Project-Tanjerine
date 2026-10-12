import { useCallback, useEffect } from 'react'

export default function Confetti() {
  const launch = useCallback(() => {
    // Warm celebratory editorial palette: Gold, Rose, Burgundy, Ivory
    const colors = [
      '#DCB061', // Antique Gold
      '#872439', // Deep Burgundy
      '#E89DAE', // Vintage Rose
      '#FAF7F2', // Warm Ivory
      '#B3842C', // Burnished Brass
      '#556852', // Laurel Sage
    ]

    for (let i = 0; i < 90; i++) {
      setTimeout(() => {
        const el = document.createElement('div')
        el.className = 'warm-confetti-piece'
        el.style.left = `${Math.random() * 100}vw`
        el.style.background = colors[Math.floor(Math.random() * colors.length)]
        
        const sizeW = Math.random() * 8 + 6
        const sizeH = Math.random() * 10 + 6
        el.style.width = `${sizeW}px`
        el.style.height = `${sizeH}px`
        el.style.borderRadius = Math.random() > 0.4 ? '1px' : '50%'
        el.style.opacity = `${Math.random() * 0.4 + 0.6}`
        el.style.animationDuration = `${Math.random() * 2 + 2.2}s`
        el.style.animationDelay = `${Math.random() * 0.4}s`
        el.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'
        
        document.body.appendChild(el)
        setTimeout(() => el.remove(), 4800)
      }, i * 35)
    }
  }, [])

  useEffect(() => {
    launch()
  }, [launch])

  return null
}
