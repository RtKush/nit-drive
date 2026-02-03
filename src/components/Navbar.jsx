import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/lectures', label: 'Lectures' },
  { to: '/notes', label: 'Notes' },
  { to: '/pyq', label: 'PYQ' },
  { to: '/placement', label: 'Placement' },
  { to: '/blog', label: 'Memories' },
  { to: '/roadmap', label: 'Roadmap' },
  { to: '/tools', label: 'Imp Tools' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    } catch (e) {
      return 'light'
    }
  })

  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem('theme', theme)
    } catch (e) {}
  }, [theme])

  const navigate = useNavigate()

  function goToAnnouncements() {
    try {
      if (window.location.pathname === '/announcements') {
        const el = document.getElementById('important-announcement')
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return
        }
        setTimeout(() => {
          const e = document.getElementById('important-announcement')
          if (e) e.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 120)
        return
      }
      const previous = window.location.pathname
      navigate('/announcements')
      // fallback: if SPA navigation didn't change the path, force a full load
      setTimeout(() => {
        if (window.location.pathname === previous) {
          window.location.href = '/announcements'
        }
      }, 160)
    } catch (err) {
      window.location.href = '/announcements'
    }
  }

  return (
    <header className="navbar">
      <div className="nav-inner container">
        <div className="brand">
          <span className="brand-icon" aria-hidden>🎓</span>
          <span className="brand-text">
            <span className="brand-name">NIT</span>
            {/* <span className="brand-sep">~</span> */}
            <span className="brand-accent">~DRIVE</span>
          </span>
        </div>

        <button className="nav-toggle" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>

        <nav className={"nav-links" + (open ? ' open' : '')} onClick={() => setOpen(false)}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button
          className="nav-notif icon-btn"
          aria-label="Announcements"
          title="Important announcements"
          onClick={(e) => {
            console.log('Announcements icon clicked')
            goToAnnouncements()
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M3 11v2a2 2 0 002 2h2l5 3V6L7 9H5a2 2 0 00-2 2z" fill="currentColor" />
            <path d="M19 8v8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 6v12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
          </svg>
          <span className="notif-badge" />
        </button>

        <button
          className="theme-toggle"
          onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 7a5 5 0 100 10 5 5 0 000-10z" stroke="#111" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          )}
        </button>
      </div>
    </header>
  )
}
