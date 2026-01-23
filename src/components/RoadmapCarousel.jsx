import React, { useState, useEffect } from 'react'

export default function RoadmapCarousel({ steps = [], onSelect }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setIndex(0)
  }, [steps])

  if (!steps || steps.length === 0) return null

  const prev = () => setIndex((i) => (i - 1 + steps.length) % steps.length)
  const next = () => setIndex((i) => (i + 1) % steps.length)

  const s = steps[index]

  return (
    <div className="carousel">
      <button className="carousel-btn left" onClick={prev} aria-label="Previous">‹</button>
      <div className="carousel-card">
        <div className="carousel-media">{s.image ? <img src={s.image} alt="" /> : <div className="carousel-emoji">📌</div>}</div>
        <div className="carousel-body">
          <h3 className="carousel-title">{s.title}</h3>
          <p className="muted small">{s.desc || 'Focus: practice + mini project'}</p>
          <div style={{marginTop:12}}>
            <button className="btn primary" onClick={() => onSelect && onSelect(s.title)}>Start</button>
            <button className="btn" style={{marginLeft:8}} onClick={() => onSelect && onSelect(s.title)}>Resources</button>
          </div>
        </div>
      </div>
      <button className="carousel-btn right" onClick={next} aria-label="Next">›</button>

      <div className="carousel-dots">
        {steps.map((_, i) => (
          <button key={i} className={`dot${i === index ? ' active' : ''}`} onClick={() => setIndex(i)} aria-label={`Go to ${i+1}`} />
        ))}
      </div>
    </div>
  )
}
