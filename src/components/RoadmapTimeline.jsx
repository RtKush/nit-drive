import React from 'react'

export default function RoadmapTimeline({ steps = [], onSelect }) {
  if (!steps || steps.length === 0) return null

  return (
    <div className="timeline-modern">
      <div className="timeline-line" aria-hidden />
      <div className="timeline-items">
        {steps.map((s, i) => (
          <button
            key={s.title || s}
            className="timeline-modern-item"
            onClick={() => onSelect && onSelect(s.title || s)}
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className="timeline-bullet">
              <div className="bullet-inn" style={{ animationDelay: `${i * 0.08 + 0.02}s` }}>
                {s.icon || '📌'}
              </div>
            </div>
            <div className="timeline-modern-body">
              <div className="timeline-modern-title">{s.title || s}</div>
              <div className="muted small">{s.desc || `Focus: ${s.title || s}. Practice with projects.`}</div>
            </div>
            <div className="timeline-modern-action">›</div>
          </button>
        ))}
      </div>
    </div>
  )
}
