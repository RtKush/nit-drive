import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Modal from '../components/Modal'

export default function ImportantLectures() {
  const [modal, setModal] = useState({ open: false, title: '', content: null })
  const sems = [1, 2, 3, 4, 5, 6]
  const location = useLocation()

  // Per-semester lectures links — set to the links you provided
  const LECTURES_LINKS = [
    'https://mega.nz/file/7mIRzQ7Y#KfuHicBq7c3ti4R62S_GR8HtXSLk3IfAdj6Ti9n0BRw',
    'https://mega.nz/file/jy5CmYoL#8vBKf70yR5NBwrfbUdP5BKMmm53OaLS6yqJSN0uCgmY',
    'https://mega.nz/file/uipQQACB#NrclRoMZ5lwR2Oj5iEwzWa_wQGHHRq0yJjjETueYUts',
    'https://mega.nz/file/XmZ3BJYD#9gT4w8icDg9bPEagLWWuwY7C6tmbhDu8x3jzyISBIac',
    'https://mega.nz/folder/9xAhGA5Q#zlZMw_6ZsZtBZjhImHvzqA/file/Uh5nzCJR',
    null,
  ]

  // Subjects extracted from images (image3 -> sem1, image2 -> sem2, image1 -> sem3)
  const SUBJECTS = {
    1: [
      'Operating System',
      'Computer Oriented Numerical Analysis',
      'Problem Solving and Programming',
      'Computer System Architecture',
      'Professional Communication in English',
      'Computer Lab-101',
      'Computer Lab-102',
    ],
    2: [
      'Software Engineering',
      'Statistical Computing',
      'Data Structure',
      'Database Management System',
      'Theory of Computation',
      'Computer Lab-201',
      'Computer Lab-202',
    ],
    3: [
      'Object Oriented Concepts & Java',
      'Data Science',
      'Analysis and Design of Algorithms',
      'Computer Network',
      'Compiler Design',
      'Computer Lab-301',
      'Computer Lab-302',
    ],
    4: [
      'AI & Machine Learning',
      'Computer Oriented Optimization',
      'Cryptography & Network Security',
      'Web Technology - Advance Java',
      'Advance Data Mining',
      'Language Lab-403-GD/PI',
      'Computer Lab-401',
      'Computer Lab-402',
    ],
    5: [
      'Distributed Computing',
      'Cloud Computing',
      'Swarm Intelligence & Evolutionary Algorithms (Ele-IV)',
      'Mobile Computing (Ele-IV)',
      'Pattern Recognition (Open Ele-II)',
      'Digital Image Processing (Open Ele-II)',
      '7+ More Subjects will be there as Open Ele-II',
      'Computer Lab-501',
      'Minor Project-502',
    ],
  }

  // Playlist URLs for each subject (replace null with actual playlist URL strings)
  // Structure: SUBJECT_PLAYLISTS[sem] = [urlForSubject1, urlForSubject2, ...]
  const SUBJECT_PLAYLISTS = {
    1: [null, null, null, null, null, null, null],
    2: [null, null, null, null, null, null, null],
    3: [null, null, null, null, null, null, null],
    4: [null, null, null, null, null, null, null, null],
    5: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  }

  useEffect(() => {
    if (location.hash === '#important-announcement') {
      const el = document.getElementById('important-announcement')
      if (el) {
        // small timeout to ensure layout/mount
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60)
      }
    }
  }, [location])

  return (
    <div className="page syllabus-page light-page">
      <div id="important-announcement" />
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
                {([1, 2, 3, 4, 5].includes(n)) ? (
                  <button className="btn small" onClick={() => {
                    const subjects = SUBJECTS[n] || []
                    const playlists = SUBJECT_PLAYLISTS[n] || []
                    setModal({ open: true, title: `Semester ${n} - Subjects`, content: (
                      <div style={{ padding: 10 }}>
                        <p className="muted">Select a subject to watch its playlist.</p>
                        <div className="subject-list">
                          {subjects.map((sName, idx) => (
                            <div key={sName} className="subject-row">
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                <strong style={{ fontSize: 14 }}>{sName}</strong>
                                <span className="muted" style={{ fontSize: 12 }}>{`Semester ${n}`}</span>
                              </div>
                              <div>
                                {playlists[idx] ? (
                                  <a className="btn small primary" href={playlists[idx]} target="_blank" rel="noopener noreferrer">Watch Now</a>
                                ) : (
                                  <button className="btn small" disabled style={{ opacity: 0.6 }}>Watch Now</button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div style={{ marginTop: 12, textAlign: 'center' }}>
                          <button className="btn" onClick={() => setModal({ open: false })}>Close</button>
                        </div>
                      </div>
                    ) })
                  }}>View</button>
                ) : ( 
                  LECTURES_LINKS[n - 1] ? (
                    <a className="btn small" href={LECTURES_LINKS[n - 1]} target="_blank" rel="noopener noreferrer"> View </a>
                  ) : (
                    <button className="btn small" onClick={() => setModal({ open: true, title: `Semester ${n}`, content: (
                      <div style={{textAlign:'center',padding:12}}>
                        <h3 style={{marginTop:0}}>Minor Project and Major Project</h3>
                        <p className="muted" style={{marginTop:8}}>6th Semester is all about Minor and Major project.</p>
                        <div style={{marginTop:14}}>
                          <button className="btn primary" onClick={() => setModal({ open: false })}>OK</button>
                        </div>
                      </div>
                    ) })}>View</button>
                  )
                )}

              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal open={modal.open} title={modal.title} onClose={() => setModal({ open: false })}>
        {modal.content}
      </Modal>
    </div>
  )
}
