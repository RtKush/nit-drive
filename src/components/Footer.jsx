import React from 'react'

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
              <button className="icon-btn">🐙</button>
              <button className="icon-btn">in</button>
              <button className="icon-btn">🐦</button>
            </div>
          </div>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li>Home</li>
            <li>Important Lectures</li>
            <li>Notes + PYQ</li>
            <li>Placement</li>
            <li>Memories</li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p className="muted">NIT Raipur, GE Road, Raipur - 492010</p>
          <p className="muted">contact@nitrr.ac.in</p>
          <p className="muted">+91 771 254 4444</p>
        </div>
      </div>
      <div className="footer-bottom container">© 2024 NITRR Study Material. All rights reserved. <span style={{float:'right'}}>Made with ❤️ for NIT Raipur Students</span></div>
    </footer>
  )
}
