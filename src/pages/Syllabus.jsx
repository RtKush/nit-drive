import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'

// Per-semester syllabus URLs — set to the links you provided
const SYLLABUS_LINKS = [
  'https://mega.nz/file/7mIRzQ7Y#KfuHicBq7c3ti4R62S_GR8HtXSLk3IfAdj6Ti9n0BRw',
  'https://mega.nz/file/jy5CmYoL#8vBKf70yR5NBwrfbUdP5BKMmm53OaLS6yqJSN0uCgmY',
  'https://mega.nz/file/uipQQACB#NrclRoMZ5lwR2Oj5iEwzWa_wQGHHRq0yJjjETueYUts',
  'https://mega.nz/file/XmZ3BJYD#9gT4w8icDg9bPEagLWWuwY7C6tmbhDu8x3jzyISBIac',
  'https://drive.google.com/file/d/1q-8dfp9tRcylabS3Wug-EoevXYLqram6/view?usp=sharing',
  null,
]

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
  const [modal, setModal] = useState({ open: false, title: '', content: null })
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
                  {SYLLABUS_LINKS[i] ? (
                    <a className="btn small" href={SYLLABUS_LINKS[i]} target="_blank" rel="noopener noreferrer">View</a>
                  ) : (
                    <button className="btn small" onClick={() => setModal({ open: true, title: s, content: 'Minor Project and Major Project' })}>View</button>
                  )}

                </div>
              </article>
            ))}
          </div>
          <Modal open={modal.open} title={modal.title} onClose={() => setModal({ open: false })}>
            <div style={{textAlign:'center',padding:12}}>
              <h3 style={{marginTop:0}}>{modal.content}</h3>
              <p className="muted" style={{marginTop:8}}>6th Semester is all about Minor and Major project.</p>
              <div style={{marginTop:14}}>
                <button className="btn primary" onClick={() => setModal({ open: false })}>OK</button>
              </div>
            </div>
          </Modal>
      </div>
    </div>
  )
}
