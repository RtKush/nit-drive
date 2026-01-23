import React, { useState } from 'react'
import Modal from '../components/Modal'

export default function ImportantLectures() {
  const [modal, setModal] = useState({ open: false, title: '', content: null })
  const sems = [1, 2, 3, 4, 5, 6]

  return (
    <div className="page syllabus-page light-page">
      <div className="light-panel">
        <div className="syll-top">
          <h2 className="syll-title">Important Lectures</h2>
          <p className="muted">Semester-wise recorded lectures and session lists</p>
        </div>

        <div className="syll-grid-tiles">
          {sems.map((n) => (
            <div key={n} className="syll-tile">
              <div className="tile-left">
                <div className="tile-badge">{n}</div>
              </div>
              <div className="tile-main">
                <h3>Semester {n}</h3>
                <div className="muted">NIT Raipur</div>
              </div>
              <div className="tile-cta">
                <button className="btn small" onClick={() => setModal({ open: true, title: `Semester ${n} Lectures`, content: `List of lectures for semester ${n} (static placeholder).` })}>
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal open={modal.open} title={modal.title} onClose={() => setModal({ open: false })}>
        <p>{modal.content}</p>
      </Modal>
    </div>
  )
}
