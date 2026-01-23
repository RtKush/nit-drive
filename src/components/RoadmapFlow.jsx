import React from 'react'

function mid(a, b) {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }
}

function pathFor(a, b) {
  // create a smooth cubic curve from center of a to center of b
  const sx = a.x + (a.w || 180) / 2
  const sy = a.y + (a.h || 40) / 2
  const tx = b.x + (b.w || 180) / 2
  const ty = b.y + (b.h || 40) / 2
  const dx = Math.abs(tx - sx)
  const mx1 = sx + dx * 0.22
  const mx2 = tx - dx * 0.22
  return `M ${sx} ${sy} C ${mx1} ${sy}, ${mx2} ${ty}, ${tx} ${ty}`
}

export default function RoadmapFlow({ topic, flow = null, roadmap = [], onNodeClick }) {
  // if explicit flow provided (nodes + links) render SVG with dynamic links
  if (flow && flow.nodes && flow.links) {
    const nodes = flow.nodes
    const links = flow.links

    return (
      <div className="flowchart-wrap">
        <svg className="flowchart-svg" viewBox="0 0 1000 900" preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id="nodeShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="12" floodColor="#000" floodOpacity="0.18" />
            </filter>
          </defs>

          <g className="connectors" fill="none" strokeWidth="3" strokeLinecap="round">
            {links.map((l, i) => {
              const a = nodes.find((n) => n.id === l.from)
              const b = nodes.find((n) => n.id === l.to)
              if (!a || !b) return null
              const d = pathFor(a, b)
              return <path key={i} className="flow-path" d={d} />
            })}
          </g>

          <g className="nodes">
            {nodes.map((n) => (
              <g
                key={n.id}
                className={`flow-node${n.highlight ? ' highlight' : ''}`}
                transform={`translate(${n.x},${n.y})`}
                onClick={() => onNodeClick && onNodeClick(n.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onNodeClick && onNodeClick(n.id)}
              >
                <rect rx="8" ry="8" width={n.w || 180} height={n.h || 40} />
                <text x={(n.w || 180) / 2} y={(n.h || 40) / 2 + 8} textAnchor="middle">{n.id}</text>
              </g>
            ))}
          </g>
        </svg>
        <div className="flow-legend muted small">Interactive flow — click nodes for details.</div>
      </div>
    )
  }

  // fallback: clean vertical list for roadmap steps (good for Java / simple topics)
  return (
    <div className="timeline-wrap">
      <div className="timeline-grid">
        {roadmap.map((step, i) => (
          <div key={step} className="timeline-item" onClick={() => onNodeClick && onNodeClick(step)} role="button" tabIndex={0}>
            <div className="timeline-media">📌</div>
            <div className="timeline-title">{step}</div>
            <div className="muted small">Focus: practice + mini project</div>
          </div>
        ))}
      </div>
    </div>
  )
}
