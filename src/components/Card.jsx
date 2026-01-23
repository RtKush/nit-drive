import React, { useRef, useState } from 'react'

export default function Card({
  title,
  subtitle,
  children,
  highlight,
  actionLabel,
  onAction,
  icon,
  downloads,
}) {
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, scale: 1 })

  function onMove(e) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rx = ((y - rect.height / 2) / rect.height) * -6
    const ry = ((x - rect.width / 2) / rect.width) * 8
    setTilt({ rx, ry, scale: 1.02 })
  }

  function reset() {
    setTilt({ rx: 0, ry: 0, scale: 1 })
  }

  return (
    <div
      ref={ref}
      className={"card glass" + (highlight ? ' highlight' : '')}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${tilt.scale})` }}
      onClick={onAction}
      onKeyDown={(e) => { if (onAction && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onAction() } }}
      role={onAction ? 'button' : undefined}
      tabIndex={onAction ? 0 : undefined}
    >
      <div className="card-inner">
        <div className="card-front">
          <div className="card-top">
            <div className="icon-badge">{icon}</div>
            <div className="card-text">
              <h3>{title}</h3>
              {subtitle && <p className="muted small">{subtitle}</p>}
            </div>
          </div>
          <div className="card-foot-row">
            {downloads && (
              <div className="downloads">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v10" stroke="#d62828" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 11l4 4 4-4" stroke="#d62828" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 21H3" stroke="#d62828" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span className="download-text">{downloads}</span>
              </div>
            )}
            {onAction && (
              <div>
                <button className={"btn" + (actionLabel === 'Watch Now' ? ' primary' : '')} onClick={(e) => { e.stopPropagation(); onAction && onAction() }}>
                  {actionLabel || 'Open'}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="card-back">
          <div className="card-back-inner">
            <h4>{title} — details</h4>
            <p className="muted small">{subtitle}</p>
            <div style={{marginTop:12}}>
              <button className="btn primary" onClick={(e) => { e.stopPropagation(); onAction && onAction() }}>Open Resource</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
