import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import cards from '../data/roadmapData'

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}

function computeNodeWidth(text) {
  // approximate width based on characters, clamp to a range
  const base = 24
  const perChar = 8
  return Math.min(360, Math.max(80, base + text.length * perChar))
}

export default function RoadmapDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const card = cards.find((c) => slugify(c.title) === id)

  if (!card) return (
    <div className="page">
      <div className="light-panel">
        <h2>Not found</h2>
        <p className="muted">We couldn't find that roadmap. Go back to the list.</p>
        <button className="btn" onClick={() => navigate('/roadmap')}>Back</button>
      </div>
    </div>
  )

  // Build nodes: prefer explicit flow nodes; otherwise create nodes from roadmap steps
  let nodes = []
  if (card.flow && card.flow.nodes && card.flow.nodes.length) {
    nodes = card.flow.nodes.map((n) => ({ ...n }))
  } else {
    nodes = card.roadmap.map((t, i) => ({ id: t, x: 160 + i * 220, y: 220 }))
  }

  // If there are explicit links use them; otherwise create sequential links
  const links = (card.flow && card.flow.links && card.flow.links.length) ? card.flow.links : nodes.map((n, i) => i < nodes.length - 1 ? { from: nodes[i].id, to: nodes[i + 1].id } : null).filter(Boolean)

  // Compute bounding box for viewBox
  const xs = nodes.map((n) => n.x || 0)
  const ys = nodes.map((n) => n.y || 0)
  const minX = Math.min(...xs) - 200
  const maxX = Math.max(...xs) + 200
  const minY = Math.min(...ys) - 120
  const maxY = Math.max(...ys) + 140
  const vbw = Math.max(800, Math.ceil(maxX - minX))
  const vbh = Math.max(420, Math.ceil(maxY - minY))

  // enrich nodes with computed width/height and adjusted positions
  const marginX = -minX + 60
  const marginY = -minY + 40
  const placed = nodes.map((n, idx) => {
    const id = n.id
    const w = n.w || computeNodeWidth(id)
    const h = n.h || 44
    const x = (n.x || idx * 160) + marginX
    const y = (n.y || idx * 100) + marginY
    return { ...n, id, w, h, x, y }
  })

  return (
    <div className="page">
      <div className="light-panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ fontSize: 28 }}>{card.icon}</div>
            <div>
              <h2 style={{ margin: 0 }}>{card.title}</h2>
              <div className="muted small">{card.desc}</div>
            </div>
          </div>
          <div>
            <button className="btn" onClick={() => navigate('/roadmap')}>Back</button>
          </div>
        </div>

        <div className="graph-wrap" style={{ marginTop: 14 }}>
          <svg className="graph-svg" viewBox={`0 0 ${vbw} ${vbh}`} preserveAspectRatio="xMidYMid meet">
            <defs>
              <filter id="nodeShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="8" stdDeviation="18" floodOpacity="0.08" />
              </filter>
            </defs>

            <g className="connectors" strokeWidth={2} fill="none">
              {links.map((l, i) => {
                const from = placed.find((p) => p.id === l.from)
                const to = placed.find((p) => p.id === l.to)
                if (!from || !to) return null
                const x1 = from.x
                const y1 = from.y
                const x2 = to.x
                const y2 = to.y
                // simple curved path for nicer visuals
                const mx = (x1 + x2) / 2
                const my = (y1 + y2) / 2
                return <path key={i} className="flow-path" d={`M ${x1} ${y1} Q ${mx} ${my - 40} ${x2} ${y2}`} stroke="rgba(153,170,178,0.9)" />
              })}
            </g>

            <g className="nodes">
              {placed.map((n) => (
                <g key={n.id} className="graph-node" transform={`translate(${n.x}, ${n.y})`}>
                  <rect x={-n.w / 2} y={-n.h / 2} width={n.w} height={n.h} rx={n.h / 2} ry={n.h / 2} />
                  <text x={0} y={5} textAnchor="middle">{n.id}</text>
                </g>
              ))}
            </g>
          </svg>
        </div>
      </div>
    </div>
  )
}
