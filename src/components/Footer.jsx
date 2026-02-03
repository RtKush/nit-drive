import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Footer(){
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="brand-icon">🎓</div>
          <div>
            <div style={{fontWeight:800}}>NITRR <span style={{color:'var(--accent)'}}>Study Material</span></div>
            <p className="muted" style={{maxWidth:320,marginTop:8}}>Your trusted platform for accessing quality study materials, notes, and resources for NIT Raipur students.</p>
            <div style={{display:'flex',gap:8,marginTop:12}}>
              <a className="icon-btn" href="https://www.youtube.com/results?search_query=NIT+Raipur" target="_blank" rel="noopener noreferrer" aria-label="YouTube">YT</a>
              <a className="icon-btn" href="https://www.linkedin.com/groups/40497/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">In</a>
              <a className="icon-btn" href="https://nitrr.ac.in/" target="_blank" rel="noopener noreferrer" aria-label="Official website">WEB</a>
            </div>
          </div>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><NavLink to="/" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} end>Home</NavLink></li>
            <li><NavLink to="/lectures" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Important Lectures</NavLink></li>
            <li><NavLink to="/notes" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Notes + PYQ</NavLink></li>
            <li><NavLink to="/placement" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Placement</NavLink></li>
            <li><NavLink to="/blog" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Memories</NavLink></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p className="muted">NIT Raipur, GE Road, Raipur - 492010</p>
          <p className="muted">contact@nitrr.ac.in</p>
          <p className="muted">+91 0000000000</p>
        </div>
      </div>
      <div className="footer-bottom container">© 2024 NITRR Study Material. All rights reserved. <span style={{float:'right'}}>Made with ❤️ for NIT Raipur Students</span></div>
    </footer>
  )
}
