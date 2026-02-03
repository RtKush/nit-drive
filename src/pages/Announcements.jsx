import React, { useState } from 'react'
import Modal from '../components/Modal'

const sample = [
  { id: 1, title: 'Software Engineer Intern', type: 'Internship', org: 'Acme Tech', date: 'Mar 15, 2026', desc: '6-month internship for backend/frontend interns. Stipend: ₹25,000.', url: 'https://example.com/apply/software-intern' },
  { id: 2, title: 'Campus Placement: Product Engineer', type: 'Job', org: 'Vertex Labs', date: 'Mar 12, 2026', desc: 'Full-time role — CS grads preferred. Apply with resume.', url: 'https://vertexlabs.example.com/careers/pe' },
  { id: 3, title: 'Hackathon 2026', type: 'Event', org: 'NITRR Students Club', date: 'Apr 02, 2026', desc: '24-hour hackathon with prizes and mentorship.', url: 'https://nitrr.example.com/hackathon-2026' },
  { id: 4, title: 'Research Assistant Opening', type: 'Job', org: 'Dept. of CSE', date: 'Mar 20, 2026', desc: 'Part-time research assistant for ML projects.', url: 'mailto:research@nitrr.ac.in' },
  { id: 5, title: 'Summer Internship - Embedded', type: 'Internship', org: 'Robotics Co.', date: 'Apr 10, 2026', desc: 'Summer internship on embedded systems and firmware.', url: 'https://robotics.example.com/internships/embedded' },
  { id: 6, title: 'Workshop: Data Science', type: 'Event', org: 'Analytics Cell', date: 'Mar 28, 2026', desc: 'Two-day workshop covering Python and ML basics.', url: 'https://nitrr.example.com/events/data-science-workshop' },
]

export default function Announcements() {
  const [modal, setModal] = useState({ open: false, title: '', body: '' })

  const typeIcon = (t) => {
    if (!t) return '📌'
    if (t.toLowerCase().includes('job')) return '💼'
    if (t.toLowerCase().includes('intern')) return '🧑‍💻'
    if (t.toLowerCase().includes('event')) return '📢'
    if (t.toLowerCase().includes('research')) return '🔬'
    return '📌'
  }

  return (
    <div className="page light-page">
      <div id="important-announcement" />
      <div className="light-panel">
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12,flexWrap:'wrap'}}>
          <div>
            <h2 style={{margin:0}}>Important Announcement — details</h2>
            <p className="muted">Latest notices and circulars</p>
          </div>
        </div>

        <div style={{marginTop:18,display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:16}}>
          {sample.map((s) => (
            <article key={s.id} className={`announcement-card small type-${(s.type||'').replace(/\s+/g,'')}`} style={{opacity:1}}>
              <div className="announce-left">
                <div className="announce-badge" aria-hidden>{typeIcon(s.type)}</div>
              </div>
              <div className="announce-body">
                <h3 style={{margin:0}}>{s.title}</h3>
                <div className="muted" style={{marginTop:6,fontSize:13}}>{s.org}</div>
                <div className="apply-btn">
                  {s.url ? (
                    <a className="btn small" href={s.url} target="_blank" rel="noopener noreferrer">View</a>
                  ) : (
                    <button className="btn small" onClick={() => setModal({ open: true, title: s.title, body: `${s.org} — ${s.type}\n\n${s.desc}\n\nApply/Contact: contact@nitrr.ac.in` })}>View</button>
                  )}
                </div>
              </div>
              <div className="announce-meta">
                <div className="small muted">{s.date}</div>
                <div className="announce-type">{s.type}</div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <Modal open={modal.open} title={modal.title} onClose={() => setModal({ open: false })}>
        <pre style={{whiteSpace:'pre-wrap'}}>{modal.body}</pre>
      </Modal>
    </div>
  )
}
