import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cards from '../data/roadmapData'

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function Roadmap() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const visible = cards.filter((c) => c.title.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="page roadmap">
      <div className="light-panel roadmap-hero" style={{paddingTop:28,paddingBottom:18}}>
        <div className="container" style={{textAlign:'center'}}>
          <h1 style={{fontWeight:800, textTransform:'uppercase', margin:'6px 0'}}>RoadMap</h1>
        </div>
      </div>

      <div className="container roadmap-grid">
        {visible.map((c, i) => (
          <div
            key={c.title}
            className="card compact-card"
            style={{ animationDelay: `${0.04 * i}s`, cursor: 'pointer' }}
            onClick={() => navigate(`/roadmap/${slugify(c.title)}`)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && navigate(`/roadmap/${slugify(c.title)}`)}
          >
            <div className="card-top">
              <div className="icon-badge card-float">{c.icon}</div>
              <div className="card-text">
                <h3>{c.title}</h3>
                <div className="muted tiny">{c.desc}</div>
              </div>
            </div>
            <div className="card-foot-row">
              <div className="tags">
                <span className="tag">Beginner</span>
                <span className="tag">Intermediate</span>
              </div>
              <button className="btn" onClick={(e) => { e.stopPropagation(); navigate(`/roadmap/${slugify(c.title)}`) }}>Explore</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
