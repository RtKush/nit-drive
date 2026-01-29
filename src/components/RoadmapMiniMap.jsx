import React, { useRef, useState, useEffect } from 'react'

function clamp(v, a, b) { return Math.max(a, Math.min(b, v)) }

export default function RoadmapMiniMap({ steps = [], onNodeClick }) {
  const wrapRef = useRef()
  const svgRef = useRef()
  const [scale, setScale] = useState(1)
  const [tx, setTx] = useState(0)
  const [ty, setTy] = useState(0)
  const [dragging, setDragging] = useState(false)
  const dragRef = useRef(null)

  // compute node positions in a circular layout for clarity
  const nodes = steps.map((s, i) => {
    const angle = (i / Math.max(1, steps.length)) * Math.PI * 2 - Math.PI / 2
    const r = Math.min(220, 60 + steps.length * 8)
    const cx = 460 + Math.cos(angle) * r
    const cy = 240 + Math.sin(angle) * r
    return { id: typeof s === 'string' ? s : s.title, x: cx, y: cy }
  })

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const onWheel = (e) => {
      e.preventDefault()
      const delta = e.deltaY < 0 ? 1.08 : 0.92
      setScale((s) => clamp(s * delta, 0.6, 3))
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  function onMouseDown(e) {
    setDragging(true)
    dragRef.current = { x: e.clientX, y: e.clientY, tx, ty }
  }
  function onMouseMove(e) {
    if (!dragging || !dragRef.current) return
    const d = dragRef.current
    setTx(d.tx + (e.clientX - d.x))
    setTy(d.ty + (e.clientY - d.y))
  }
  function stopDrag() {
    setDragging(false)
    dragRef.current = null
  }

  function focusNode(n) {
    // zoom into node (center it)
    const wrap = wrapRef.current
    if (!wrap) return
    const rect = wrap.getBoundingClientRect()
    const cx = rect.width / 2
    const cy = rect.height / 2
    const desiredScale = 1.6
    setScale(desiredScale)
    setTx(cx - n.x * desiredScale)
    setTy(cy - n.y * desiredScale)
    onNodeClick && onNodeClick(n.id)
  }

  return (
    <div className="minimap-wrap" ref={wrapRef} onMouseMove={onMouseMove} onMouseUp={stopDrag} onMouseLeave={stopDrag} onMouseDown={onMouseDown}>
      <svg ref={svgRef} className="minimap-svg" viewBox="0 0 920 520" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="mmShadow"><feDropShadow dx="0" dy="6" stdDeviation="12" floodOpacity="0.12"/></filter>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="none" />
        <g transform={`translate(${tx},${ty}) scale(${scale})`} style={{ transformOrigin: '0 0' }}>
          {/* soft background grid */}
          <g className="minimap-grid">
            {[...Array(10)].map((_, i) => (
              <line key={i} x1={i*100+20} y1={0} x2={i*100+20} y2={520} stroke="rgba(255,255,255,0.01)" strokeWidth={1}/>
            ))}
          </g>

          {/* links: simple curved splines between consecutive nodes */}
          <g className="minimap-links" fill="none" strokeWidth={3} stroke="rgba(255,255,255,0.04)" strokeLinecap="round">
            {nodes.map((n, i) => {
              const next = nodes[(i+1) % nodes.length]
              const sx = n.x
              const sy = n.y
              const txn = next.x
              const tyn = next.y
              const mx = (sx + txn)/2
              const my = (sy + tyn)/2
              return <path key={i} d={`M ${sx} ${sy} Q ${mx} ${my-40} ${txn} ${tyn}`} />
            })}
          </g>

          {/* nodes */}
          <g className="minimap-nodes">
            {nodes.map((n, i) => (
              <g key={n.id} className="minimap-node" transform={`translate(${n.x},${n.y})`} onClick={() => focusNode(n)}>
                <circle r="28" fill="var(--card-bg)" stroke="rgba(255,255,255,0.03)" strokeWidth="1.5" filter="url(#mmShadow)"/>
                <text x="0" y="6" textAnchor="middle" fontSize="12" fill="var(--text)" style={{pointerEvents:'none'}}>{n.id.length>12? n.id.slice(0,12)+'...':n.id}</text>
              </g>
            ))}
          </g>
        </g>
      </svg>
      <div className="minimap-hint muted small">Drag to pan, wheel to zoom, click a node to focus</div>
    </div>
  )
}
