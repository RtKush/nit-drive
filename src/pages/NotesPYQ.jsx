import React from 'react'
import Modal from '../components/Modal'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const semesters = [
  { id: 1, title: 'First Semester' },
  { id: 2, title: 'Second Semester' },
  { id: 3, title: 'Third Semester' },
  { id: 4, title: 'Fourth Semester' },
  { id: 5, title: 'Fifth Semester' },
  { id: 6, title: 'Sixth Semester' },
]

const sampleQuestions = {
  1: [
    'Intro to Programming — Data types, loops, arrays',
    'Discrete Maths — Sets and logic',
    'Digital Logic — Gates and minimization',
  ],
  2: [
    'OOP Concepts — Classes & inheritance',
    'Data Structures — Stacks & Queues',
  ],
  3: [
    'DBMS — ER models & normalization',
    'Operating Systems — Processes & threads',
  ],
  4: [
    'Computer Networks — TCP/IP basics',
    'Compiler Design — Lexical analysis',
  ],
  5: [
    'Software Engineering — SDLC',
    'AI Basics — Search & heuristics',
  ],
  6: [
    'Machine Learning — Regression & classification',
    'Project — System design overview',
  ],
}

export default function NotesPYQ({ initialTab }) {
  const [modal, setModal] = useState({ open: false, title: '', content: null })
  const [tab, setTab] = useState(initialTab || 'pyq') // 'pyq' or 'notes'
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (initialTab) return setTab(initialTab)
    if (location.pathname && location.pathname.includes('/notes')) setTab('notes')
    else if (location.pathname && location.pathname.includes('/pyq')) setTab('pyq')
  }, [initialTab, location.pathname])

  const openSem = (s) => {
    const list = sampleQuestions[s.id] || ['No sample questions available']
    setModal({
      open: true,
      title: s.title,
      content: (
        <div>
          <p className="muted">Static sample of previous year questions for quick preview.</p>
          <ul style={{marginTop:12}}>
            {list.map((q, i) => (
              <li key={i} style={{marginBottom:6}}>{q}</li>
            ))}
          </ul>
          <div style={{marginTop:14,display:'flex',gap:8}}>
            <button className="btn" onClick={() => { setModal({ open: false }) }}>Close</button>
            <a className="btn primary" href="#" onClick={(e) => { e.preventDefault(); alert('Download placeholder — add static PDF file here') }}>Download PDF</a>
          </div>
        </div>
      ),
    })
  }

  return (
    <div className="page syllabus-page light-page">
      <div className="light-panel">
        <div style={{textAlign:'center',marginBottom:18}}>
          <h1 style={{margin:0,fontSize:28}}>{tab === 'pyq' ? 'Previous Year Questions' : 'Notes'}</h1>
          <p className="muted small" style={{marginTop:6}}>{tab === 'pyq' ? 'Previous year questions with solutions' : 'Compiled lecture notes and resources'}</p>
        </div>

        {tab === 'pyq' ? (
          <div>
            <div className="syllabus-grid">
              {semesters.map((s) => (
                <article key={s.id} className="syll-card">
                  <div className="syll-left"><div className="syll-badge">{s.id}</div></div>
                  <div className="syll-content"><h3>{s.title}</h3><p className="muted small">Click to view previous year questions</p></div>
                  <div style={{display:'flex',alignItems:'center'}}><button className="btn primary" onClick={(e) => { e.stopPropagation(); openSem(s) }}>Open</button></div>
                </article>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="syll-grid-tiles" style={{marginTop:12}}>
              {semesters.map((s, i) => (
                <article key={s.id} className="syll-tile">
                  <div className="tile-left"><div className="tile-badge">{s.id}</div></div>
                  <div className="tile-main"><h3>{s.title} — Notes</h3><p className="muted small">Compiled lecture notes, slides and example problems for {s.title}.</p></div>
                  <div className="tile-cta"><button className="btn primary" onClick={(e) => { e.stopPropagation(); alert('Open Notes placeholder for ' + s.title) }}>View</button></div>
                </article>
              ))}
            </div>
          </div>
        )}

        <Modal open={modal.open} title={modal.title} onClose={() => setModal({ open: false })}>{modal.content}</Modal>
      </div>
    </div>
  )
}
