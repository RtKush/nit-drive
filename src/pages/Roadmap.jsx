import React, { useState } from 'react'
import RoadmapFlow from '../components/RoadmapFlow'
import RoadmapCarousel from '../components/RoadmapCarousel'
import RoadmapTimeline from '../components/RoadmapTimeline'
import RoadmapMiniMap from '../components/RoadmapMiniMap'

const cards = [
  {
    title: 'DSA',
    icon: '🧠',
    desc: 'Algorithms, data structures, problem solving.',
    roadmap: ['Basics of arrays & strings', 'Linked lists & stacks', 'Trees & graphs', 'Greedy & DP', 'Advanced problems & contests'],
    flow: {
      nodes: [
        { id: 'Arrays & Hashing', x: 400, y: 40, w: 200 },
        { id: 'Two Pointers', x: 160, y: 130 },
        { id: 'Stack', x: 610, y: 130 },
        { id: 'Binary Search', x: 60, y: 230 },
        { id: 'Sliding Window', x: 360, y: 230 },
        { id: 'Linked List', x: 660, y: 230 },
        { id: 'Trees', x: 360, y: 340, highlight: true, w: 200, h: 44 },
        { id: 'Tries', x: 60, y: 440 },
        { id: 'Heap / Priority Queue', x: 360, y: 440, w: 220 },
        { id: 'Backtracking', x: 660, y: 440 },
        { id: 'Greedy / Intervals', x: 260, y: 540 },
        { id: 'Advanced Graphs', x: 460, y: 540 },
        { id: '2-D DP / Math & Geometry', x: 560, y: 640, w: 220 },
      ],
      links: [
        { from: 'Arrays & Hashing', to: 'Two Pointers' },
        { from: 'Arrays & Hashing', to: 'Stack' },
        { from: 'Two Pointers', to: 'Binary Search' },
        { from: 'Two Pointers', to: 'Sliding Window' },
        { from: 'Stack', to: 'Linked List' },
        { from: 'Binary Search', to: 'Trees' },
        { from: 'Sliding Window', to: 'Trees' },
        { from: 'Linked List', to: 'Trees' },
        { from: 'Trees', to: 'Tries' },
        { from: 'Trees', to: 'Heap / Priority Queue' },
        { from: 'Trees', to: 'Backtracking' },
        { from: 'Heap / Priority Queue', to: 'Greedy / Intervals' },
        { from: 'Heap / Priority Queue', to: 'Advanced Graphs' },
        { from: 'Advanced Graphs', to: '2-D DP / Math & Geometry' },
      ],
    },
  },
  {
    title: 'Java',
    icon: '☕',
    desc: 'Core Java, OOPs, collections, concurrency.',
    roadmap: ['Syntax & OOP', 'Collections & Generics', 'I/O & Concurrency', 'JVM internals', 'Project: console/web app'],
    // provide a simple ordered flow for Java to render as vertical steps
    flow: {
      nodes: [
        { id: 'Syntax & OOP', x: 60, y: 120, w: 760 },
        { id: 'Collections & Generics', x: 60, y: 200, w: 760 },
        { id: 'I/O & Concurrency', x: 60, y: 280, w: 760 },
        { id: 'JVM internals', x: 60, y: 360, w: 760 },
        { id: 'Project: console/web app', x: 60, y: 440, w: 760 },
      ],
      links: [
        { from: 'Syntax & OOP', to: 'Collections & Generics' },
        { from: 'Collections & Generics', to: 'I/O & Concurrency' },
        { from: 'I/O & Concurrency', to: 'JVM internals' },
        { from: 'JVM internals', to: 'Project: console/web app' },
      ],
    },
  },
  {
    title: 'C++',
    icon: '🔧',
    desc: 'STL, pointers, memory, competitive coding.',
    roadmap: ['Syntax & STL basics', 'Pointers & memory', 'Templates & advanced STL', 'Optimization techniques', 'Competitive practice'],
  },
  {
    title: 'MERN Frontend',
    icon: '🎨',
    desc: 'React, state, hooks, component design.',
    roadmap: ['HTML/CSS/JS fundamentals', 'React basics', 'State management & hooks', 'Routing & forms', 'Project: SPA'],
  },
  {
    title: 'Backend',
    icon: '🗄️',
    desc: 'APIs, databases, authentication, design.',
    roadmap: ['Node basics', 'REST APIs', 'Databases (SQL/NoSQL)', 'Auth & security', 'Deploy & monitoring'],
  },
  {
    title: 'SpringBoot',
    icon: '🌱',
    desc: 'REST services, dependency injection, JPA.',
    roadmap: ['Spring core & DI', 'Spring MVC', 'Data with JPA', 'Security & testing', 'Microservices basics'],
  },
  { title: 'Git', icon: '🌿', desc: 'Version control, branching, merging.', roadmap: ['Git basics', 'Branching strategies', 'Merging & rebasing', 'Resolving conflicts', 'Workflows (GitFlow)'] },
  { title: 'GitHub', icon: '🐙', desc: 'Repos, PRs, actions, collaboration.', roadmap: ['Repos & forks', 'Pull requests', 'Code reviews', 'GitHub Actions', 'Open source contributions'] },
  { title: 'System Design', icon: '🏗️', desc: 'Scalability, databases, caching, load.', roadmap: ['Design fundamentals', 'Databases & sharding', 'Caching & CDNs', 'Load balancing', 'Case studies'] },
  { title: 'Dev Tools', icon: '🧰', desc: 'Docker, Postman, Chrome DevTools.', roadmap: ['Docker basics', 'API testing (Postman)', 'Browser devtools', 'CI/CD basics', 'Local infra'] },
]

export default function Roadmap() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const [selectedNode, setSelectedNode] = useState(null)
  const [viewMode, setViewMode] = useState('flow')

  function openCard(card) {
    setSelected(card)
    setOpen(true)
    document.body.style.overflow = 'hidden'
  }

  function closeModal() {
    setOpen(false)
    setSelected(null)
    setSelectedNode(null)
    document.body.style.overflow = ''
  }

  return (
    <div className="page roadmap">
      <div className="light-panel roadmap-hero">
        <h1>Roadmap</h1>
        <p className="muted">Follow the recommended learning path. Click a card to explore resources.</p>
      </div>

      <div className="container roadmap-grid">
        {cards.map((c, i) => (
          <div
            key={c.title}
            className="card"
            style={{ animationDelay: `${0.04 * i}s`, cursor: 'pointer' }}
            onClick={() => openCard(c)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && openCard(c)}
          >
            <div className="card-top">
              <div className="icon-badge card-float">{c.icon}</div>
              <div className="card-text">
                <h3>{c.title}</h3>
                <div className="muted small">{c.desc}</div>
              </div>
            </div>
            <div className="card-foot-row">
              <div className="tags">
                <span className="tag">Beginner</span>
                <span className="tag">Intermediate</span>
              </div>
              <button className="btn" onClick={(e) => { e.stopPropagation(); openCard(c) }}>Explore</button>
            </div>
          </div>
        ))}
      </div>

      {open && selected && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                <div style={{fontSize:28}}>{selected.icon}</div>
                <div>
                  <h3 style={{margin:0}}>{selected.title} Roadmap</h3>
                  <div className="muted small">{selected.desc}</div>
                </div>
              </div>
              <button className="modal-close" onClick={closeModal} aria-label="Close">✕</button>
            </div>
                  <div className="modal-body">
                      <div className="roadmap-modal-controls">
                        {selected.flow ? (
                          <>
                            <button className={`btn${viewMode==='flow'?' primary':''}`} onClick={() => setViewMode('flow')}>Flow</button>
                            <button className={`btn${viewMode==='carousel'?' primary':''}`} onClick={() => setViewMode('carousel')}>Carousel</button>
                          </>
                        ) : (
                          <button className="btn primary">Carousel</button>
                        )}
                      </div>
                      <div style={{height:8}} />
                      {selected.title === 'DSA' ? (
                        <RoadmapFlow topic={selected.title} flow={selected.flow} roadmap={selected.roadmap} onNodeClick={(n) => setSelectedNode(n)} />
                      ) : (
                        <>
                          <RoadmapMiniMap steps={selected.roadmap.map((t) => ({ title: t }))} onNodeClick={(t) => setSelectedNode(t)} />
                          <div style={{height:12}} />
                          <RoadmapCarousel steps={selected.roadmap.map((t) => ({ title: t, desc: `Focus: ${t}. Practice with small projects and exercises.` }))} onSelect={(t) => setSelectedNode(t)} />
                        </>
                      )}
                      <div style={{height:8}} />
                      <ol className="roadmap-steps">
                        {selected.roadmap.map((step, idx) => {
                          const emojiMap = (s) => {
                            const t = s.toLowerCase()
                            if (t.includes('array') || t.includes('string')) return '📚'
                            if (t.includes('linked') || t.includes('stack') || t.includes('queue')) return '🔗'
                            if (t.includes('tree') || t.includes('graph')) return '🌳'
                            if (t.includes('dp') || t.includes('greedy')) return '🧩'
                            if (t.includes('react') || t.includes('frontend')) return '⚛️'
                            if (t.includes('node') || t.includes('backend') || t.includes('api')) return '🛠️'
                            if (t.includes('git')) return '🌿'
                            if (t.includes('docker')) return '🐳'
                            if (t.includes('spring') || t.includes('jpa')) return '🌱'
                            return '📍'
                          }

                          const icon = emojiMap(step)
                          const short = `Focus: ${step}. Practice with small projects and exercises.`

                          return (
                            <li key={step} className="step" style={{ animationDelay: `${idx * 0.06}s` }}>
                              <div className="step-icon">{icon}</div>
                              <div className="step-body">
                                <div className="step-title">{step}</div>
                                <div className="muted small">{short}</div>
                              </div>
                            </li>
                          )
                        })}
                      </ol>
                  {selectedNode && (
                    <div className="node-detail">
                      <h4 style={{marginTop:12}}>{selectedNode}</h4>
                      <p className="muted small">Suggested actions: study theory, do practice problems, and build a small project related to this topic.</p>
                    </div>
                  )}
                </div>
          </div>
        </div>
      )}
    </div>
  )
}
