import React, { useRef, useState } from 'react'
import Card from '../components/Card'
import Modal from '../components/Modal'
import { useNavigate } from 'react-router-dom'

const stats = [
  { key: 'syllabus', label: 'Syllabus', desc: 'Complete semester-wise syllabus' },
  { key: 'pyq', label: 'PYQ', desc: 'Previous year questions' },
  { key: 'notes', label: 'Notes', desc: 'Handwritten & typed notes' },
  { key: 'books', label: 'Books', desc: 'Reference books & PDFs' },
  { key: 'placement', label: 'Placement Ready', desc: 'Placement prep materials & guides' },
  { key: 'fee', label: 'Fee Structure', desc: 'Updated fee details' },
]

const icons = {
  syllabus: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="#4a6cf7" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H20v16H6.5A2.5 2.5 0 0 1 4 17.5v-11z" stroke="#4a6cf7" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  pyq: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v18" stroke="#34c759" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 10h14" stroke="#34c759" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  notes: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v18" stroke="#7c4dff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M20 7H8" stroke="#7c4dff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  books: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="#ff8a65" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H20v16H6.5A2.5 2.5 0 0 1 4 17.5v-11z" stroke="#ff8a65" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  fee: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="5" width="18" height="14" rx="2" stroke="#ff4d7e" strokeWidth="1.4"/><path d="M8 9h8" stroke="#ff4d7e" strokeWidth="1.4" strokeLinecap="round"/></svg>
  ),
  placement: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l3 6 6 .5-4.5 3.75L19 20l-7-4-7 4 2.5-7.75L3 8.5 9 8l3-6z" stroke="#ffd166" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
}

export default function Home() {
  const [modal, setModal] = useState({ open: false, title: '', content: null })
  const stripRef = useRef()
  const cardsRowRef = useRef()
  const [hiddenLeft, setHiddenLeft] = useState(0)
  const [hiddenRight, setHiddenRight] = useState(0)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const scrollToStrip = () => stripRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const updateHiddenCounts = () => {
    const el = cardsRowRef.current
    if (!el) return
    const children = Array.from(el.children)
    const scrollLeftPos = el.scrollLeft
    const viewRight = scrollLeftPos + el.clientWidth

    let left = 0
    let right = 0
    children.forEach((c) => {
      const leftPos = c.offsetLeft
      const rightPos = leftPos + c.offsetWidth
      if (rightPos <= scrollLeftPos + 1) left += 1
      else if (leftPos >= viewRight - 1) right += 1
    })
    setHiddenLeft(left)
    setHiddenRight(right)
  }

  React.useEffect(() => {
    updateHiddenCounts()
    const el = cardsRowRef.current
    if (!el) return
    const onScroll = () => updateHiddenCounts()
    const onResize = () => updateHiddenCounts()
    el.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onResize)
    return () => {
      el.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [query])
  return (
    <div className="home">
      <section className="hero large-hero">
        <div className="container">
          <h1 className="hero-title">All-In-One <span className="accent">NIT~DRIVE</span></h1>
          <p className="hero-sub">Access notes, previous year questions, syllabus, and more for all semesters at NIT Raipur</p>
        </div>
      </section>

      <section className="container card-strip" ref={stripRef}>
        <div className="strip-head">
          <div className="strip-title">Quick Resources</div>
          <div className="strip-actions">
            <input
              className="strip-search"
              placeholder="Filter resources..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn" onClick={() => setQuery('')}>Clear</button>
          </div>
        </div>

        <div className="cards-row" ref={cardsRowRef}>
          {stats
            .filter((s) => s.label.toLowerCase().includes(query.toLowerCase()))
            .map((s) => (
              <Card
                key={s.key}
                title={s.label}
                subtitle={s.desc}
                icon={icons[s.key]}
                
                actionLabel="View"
                  onAction={() => {
                    if (s.key === 'syllabus') return navigate('/syllabus')
                    if (s.key === 'pyq') return navigate('/pyq')
                    if (s.key === 'notes') return navigate('/notes')
                    if (s.key === 'placement') return navigate('/placement')
                    if (s.key === 'books') {
                      const sems = Array.from({ length: 8 }, (_, i) => i + 1)
                      setModal({
                        open: true,
                        title: 'Books',
                        content: (
                          <div className="books-modal">
                            <p>Select semester to view books:</p>
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
                                    <button
                                      type="button"
                                      className="btn small"
                                      onClick={() => {
                                        setModal({ open: false })
                                        navigate(`/notes?sem=${n}`)
                                      }}
                                    >
                                      View
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ),
                      })
                      return
                    }
                    setModal({ open: true, title: s.label, content: `${s.label} — ${s.desc}` })
                  }}
              >
                {/* empty; back side used for details */}
              </Card>
            ))}
        </div>
        {/* strip indicator removed per request */}
      </section>

      <section className="container bottom-cards" style={{marginTop:18}}>
        <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:12}}>
          <Card
            title="Lectures"
            subtitle="Recorded lectures and important sessions"
            icon={(
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 3v18l15-9L5 3z" stroke="#4a6cf7" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            )}
            actionLabel="View"
            onAction={() => navigate('/lectures')}
          />

          <Card
            title="Memories"
            subtitle="Event photos and student memories"
            icon={(
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="16" rx="2" stroke="#ffd166" strokeWidth="1.4"/></svg>
            )}
            actionLabel="View"
            onAction={() => navigate('/blog')}
          />

          <Card
            title="Important Announcement"
            subtitle="Latest notices and circulars"
            icon={(
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 8a6 6 0 10-12 0v5l-2 2h16l-2-2V8z" stroke="#ff6b6b" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            )}
            actionLabel="View"
            onAction={() => setModal({ open: true, title: 'Important Announcement', content: 'See the latest announcements and circulars.' })}
          />
        </div>
      </section>

      {/* counters removed as requested */}

      <Modal open={modal.open} title={modal.title} onClose={() => setModal({ open: false })}>
        <p>{modal.content}</p>
      </Modal>
    </div>
  )
}
