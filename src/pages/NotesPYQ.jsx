import React from 'react'
import Modal from '../components/Modal'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// Per-semester links for Notes and PYQ — set to the links you provided
const NOTES_LINKS = [
  'https://drive.google.com/drive/folders/1gpBGHN5rQ7VO7nrJW-rwfLIwcy2GHQnT?usp=drive_link',
  'https://drive.google.com/drive/folders/1X9O8IVQrWu0-gitoJS26LRfWIsMjWwtR?usp=drive_link',
  'https://drive.google.com/drive/folders/1qiamCCR_jNjXY2foducRaYYfTHyHG5vs?usp=drive_link',
  'https://drive.google.com/drive/folders/1e9P-heH7e3tufOtwI2Gc2ja_ZddygzpA?usp=drive_link',
  'https://drive.google.com/drive/folders/15hZjMVxc8jKQ6QEj0Ejzosmk7EN_Ufxt?usp=drive_link',
  null,
]

const PYQ_LINKS = [
  'https://drive.google.com/drive/folders/1CsrKscTFv6BU_9jLe8TP0iGu9s3pFv_3?usp=drive_link',
  'https://drive.google.com/drive/folders/1Zry9EW373D6trFhWWIyCGdZAW5lQJvZ8?usp=drive_link',
  'https://drive.google.com/drive/folders/1T9b86w1dmlT9nfArqbbplvrJXxCl_nbV?usp=drive_link',
  'https://drive.google.com/drive/folders/11Mgm8CDDMcHP65pT1zC2G_V2--aqgoC3?usp=drive_link',
  'https://drive.google.com/drive/folders/1hgXUPZ85gfU-h8Pce-tuo6BVUHh1xuad?usp=drive_link',
  null,
]

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
          <div style={{marginTop:14,display:'flex',gap:8,alignItems:'center'}}>
            <button className="btn" onClick={() => { setModal({ open: false }) }}>Close</button>
            <a className="btn primary" href="#" onClick={(e) => { e.preventDefault(); alert('Download placeholder — add static PDF file here') }}>Download PDF</a>
            {PYQ_LINKS[s.id - 1] ? (
              <a className="btn" style={{marginLeft:8}} href={PYQ_LINKS[s.id - 1]} target="_blank" rel="noopener noreferrer">View</a>
            ) : (
              <button
                className="btn"
                style={{marginLeft:8}}
                onClick={() => setModal({ open: true, title: s.title, content: (
                  <div style={{textAlign:'center',padding:12}}>
                    <h3 style={{marginTop:0}}>Minor Project and Major Project</h3>
                    <p className="muted" style={{marginTop:8}}>6th Semester is all about Minor and Major project.</p>
                    <div style={{marginTop:14}}>
                      <button className="btn primary" onClick={() => setModal({ open: false })}>OK</button>
                    </div>
                  </div>
                ) })}
              >View</button>
            )}
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
            <div className="syll-grid-tiles">
              {semesters.map((s, i) => (
                <article key={s.id} className={`syll-tile unique`}>
                  <div className="tile-left"><div className={`tile-badge variant-${i}`}>{s.id}</div></div>
                  <div className="tile-main">
                    <h3>{`Semester -${s.id}`}</h3>
                    <p className="muted small">NIT Raipur</p>
                  </div>
                  <div className="tile-cta">
                 
                    {PYQ_LINKS[s.id - 1] ? (
                      <a className="btn" style={{marginLeft:8}} href={PYQ_LINKS[s.id - 1]} target="_blank" rel="noopener noreferrer">View</a>
                    ) : (
                      <button className="btn" style={{marginLeft:8}} onClick={() => setModal({ open: true, title: s.title, content: (
                        <div style={{textAlign:'center',padding:12}}>
                          <h3 style={{marginTop:0}}>Minor Project and Major Project</h3>
                          <p className="muted" style={{marginTop:8}}>6th Semester is all about Minor and Major project.</p>
                          <div style={{marginTop:14}}>
                            <button className="btn primary" onClick={() => setModal({ open: false })}>OK</button>
                          </div>
                        </div>
                      ) })}>View</button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="syll-grid-tiles" style={{marginTop:12}}>
              {semesters.map((s, i) => (
                <article key={s.id} className={`syll-tile unique`}>
                  <div className="tile-left"><div className={`tile-badge variant-${i}`}>{s.id}</div></div>
                  <div className="tile-main">
                    <h3>{`Semester -${s.id}`}</h3>
                    <p className="muted small"> NIT Raipur</p>
                  </div>
                  <div className="tile-cta">
                    {/* <button className="btn primary" onClick={(e) => { e.stopPropagation(); alert('Open Notes placeholder for ' + s.title) }}>View</button> */}
                    {NOTES_LINKS[s.id - 1] ? (
                      <a className="btn" style={{marginLeft:8}} href={NOTES_LINKS[s.id - 1]} target="_blank" rel="noopener noreferrer">View</a>
                    ) : (
                      <button className="btn" style={{marginLeft:8}} onClick={() => setModal({ open: true, title: s.title, content: (
                        <div style={{textAlign:'center',padding:12}}>
                          <h3 style={{marginTop:0}}>Minor Project and Major Project</h3>
                          <p className="muted" style={{marginTop:8}}>6th Semester is all about Minor and Major project.</p>
                          <div style={{marginTop:14}}>
                            <button className="btn primary" onClick={() => setModal({ open: false })}>OK</button>
                          </div>
                        </div>
                      ) })}>View</button>
                    )}
                  </div>
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
