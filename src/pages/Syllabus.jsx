import React from 'react'
import { useNavigate } from 'react-router-dom'

const semesters = [
  'First Semester',
  'Second Semester',
  'Third Semester',
  'Fourth Semester',
  'Fifth Semester',
  'Sixth Semester',
]

export default function Syllabus() {
  const navigate = useNavigate()
  return (
    <div className="page syllabus-page light-page">
      <div className="light-panel">
        <div style={{textAlign:'center',marginTop:12}} className="syll-top">
          <h1 className="syll-title" style={{margin:0,fontSize:36}}>Syllabus</h1>
          <p className="syll-sub" style={{color:'var(--muted)',marginTop:8}}>Complete semester-wise syllabus for all subjects</p>
        </div>

          <div className="syll-grid-tiles" style={{marginTop:36}}>
            {semesters.map((s, i) => (
              <article key={s} className="syll-tile unique">
                <div className="tile-left">
                  <div className={`tile-badge variant-${i}`}>{i + 1}</div>
                </div>

                <div className="tile-main">
                  <h3>{s}</h3>
                  <p className="muted small">NIT Raipur</p>
                </div>

                <div className="tile-cta">
                  <button className="btn primary" onClick={(e) => { e.stopPropagation(); alert('Open Syllabus placeholder for ' + s) }}>View</button>
                </div>
              </article>
            ))}
          </div>
      </div>
    </div>
  )
}
