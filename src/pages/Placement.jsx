import React, { useState } from 'react'
import Modal from '../components/Modal'

const sampleEvents = [
  { title: 'On-campus Drive: TechCorp', date: '2026-02-15', desc: 'Pool campus drive for SDE roles' },
  { title: 'Internship Fair', date: '2026-03-01', desc: 'Companies visiting for summer internships' },
]

const recruiters = [
  { name: 'Visa', pkg: '33 LPA' },
  { name: 'Optum', pkg: '22 LPA' },
  { name: 'Quantiphi', pkg: '10 LPA' },
  { name: 'Husigtic System', pkg: '10 LPA' },
  { name: 'Infosys', pkg: 'Role L1-10 LPA, L2-16 LPA, L3-21 LPA' },
]

const placementstats = [
  { batch: 'Batch 2k20-23', place: '45+ Placed', comp: 20 },
  { batch: 'Batch 2k21-24', place: '42 LPA', comp: 25 },
  { batch: 'Batch 2k22-25', place: '38 LPA', comp: 25 },
  { batch: 'Batch 2k23-26', place: '28 LPA', comp: 25 },
  { batch: 'Upcomming', place: 'N/A', comp: 0 },
]

const recentExperiences = [
  { company: 'Google', role: 'SDE-2', summary: 'Complete interview experience with 5 rounds including system design.' },
  { company: 'Amazon', role: 'SDE-1', summary: 'Detailed walkthrough of OA and interviews.' },
  { company: 'Microsoft', role: 'Software Engineer', summary: 'Tips for DSA and projects.' },
]

export default function Placement(){
  const [modal, setModal] = useState({ open: false, title: '', content: null })

  return (
    <div className="page placement-page">
      <div className="container">
        <div className="placement-hero">
          <div className="placement-hero-inner">
            <div className="kicker">Career Resources</div>
            <h1>Placement Preparation</h1>
            <p className="muted">Everything you need to crack your dream job — OA practice, interview walkthroughs, and placement events.</p>
          </div>
        </div>

        {/* stats band removed as requested */}

        <section style={{marginTop:22}}>
          <h3>Core Placement Resources</h3>
          <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:16,marginTop:12}}>
            <div className="card">
              <h4>Placement Events</h4>
              <p className="muted small">Upcoming and past placement drives, pool campus events, and schedules.</p>
              <div style={{marginTop:12}}>
                <button className="btn" onClick={() => setModal({ open: true, title: 'Placement Events', content: (
                  <div>
                    <ul>
                      {sampleEvents.map((e) => (<li key={e.title}><strong>{e.title}</strong> — <span className="muted">{e.date}</span><div className="muted small">{e.desc}</div></li>))}
                    </ul>
                  </div>
                ) })}>Explore</button>
              </div>
            </div>

            <div className="card">
              <h4>OA Questions</h4>
              <p className="muted small">Practice Online Assessment questions commonly seen in campus drives.</p>
              <div style={{marginTop:12}}>
                <button className="btn" onClick={() => setModal({ open: true, title: 'OA Questions', content: 'Sample OA question sets and tips (placeholder).' })}>Practice</button>
              </div>
            </div>

            <div className="card">
              <h4>Interview Experiences</h4>
              <p className="muted small">Real interview walkthroughs shared by seniors.</p>
              <div style={{marginTop:12}}>
                <button className="btn" onClick={() => setModal({ open: true, title: 'Interview Experiences', content: (
                  <div>
                    {recentExperiences.map((r) => (<div key={r.company} style={{marginBottom:10}}><strong>{r.company}</strong> — <div className="muted small">{r.role}</div><div className="muted small">{r.summary}</div></div>))}
                  </div>
                ) })}>Read Experiences</button>
              </div>
            </div>
          </div>
        </section>

        <section style={{marginTop:26}}>
          <h3>Preparation & Tools</h3>
          <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:16,marginTop:12}}>
            <div className="card"><h4>Personal Workspace</h4><p className="muted small">Use your personal space to practice, store notes, and track progress.</p><div style={{marginTop:12}}><button className="btn" onClick={() => setModal({ open: true, title: 'Personal Workspace', content: 'Personal workspace placeholder: notes, practice logs, and files.' })}>Open</button></div></div>
            <div className="card"><h4>Resume Building</h4><p className="muted small">Templates and examples tailored for campus hiring.</p><div style={{marginTop:12}}><button className="btn" onClick={() => setModal({ open: true, title: 'Resume Templates', content: 'Collection of resume templates (placeholder).' })}>View Formates</button> <button className="btn" onClick={() => setModal({ open: true, title: 'Resume Templates', content: 'Collection of resume templates (placeholder).' })}>Check ATS</button></div></div>
            <div className="card"><h4>Important PDFs</h4><p className="muted small">Give here that PDF from Linkedin downloads usko ek drive me dal dena</p><div style={{marginTop:12}}><button className="btn" onClick={() => setModal({ open: true, title: 'GD & HR Tips', content: 'Tips and sample questions (placeholder).' })}>Read</button></div></div>
          </div>
        </section>

        <section style={{marginTop:26}}>
          <h3>Top Recruiters</h3>
          <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:12,marginTop:12}}>
            {recruiters.map((r) => (
              <div key={r.name} className="card" style={{textAlign:'center'}}>
                <div style={{fontWeight:800}}>{r.name}</div>
                <div className="stat-num" style={{marginTop:6}}>{r.pkg}</div>
              </div>
            ))}
          </div>
        </section>

         <section style={{marginTop:26}}>
          <h3>Placement Statestics Batch Wise</h3>
          <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:12,marginTop:12}}>
            {placementstats.map((r) => (
              <div key={r.batch} className="card" style={{textAlign:'center'}}>
                <div style={{fontWeight:800}}>{r.batch}</div>
                <div className="stat-num" style={{marginTop:6}}>{r.place}</div>
                <div className="muted small">{r.comp}+ companies visits</div>
              </div>
            ))}
          </div>
        </section>

      </div>

      <Modal open={modal.open} title={modal.title} onClose={() => setModal({ open: false })}>
        {typeof modal.content === 'string' ? <p>{modal.content}</p> : modal.content}
      </Modal>
    </div>
  )
}
