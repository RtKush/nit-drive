import React from 'react'
import Card from '../components/Card'

// simple SVG icon mapping for tools (keeps icons lightweight)
const ICONS = {
  'VS Code': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 7v10l8-5-8-5z" stroke="#214ec0" strokeWidth="4.4" fill="#0202fd" strokeLinejoin="round" strokeLinecap="round"/></svg>
  ),
  'Jupyter Notebook': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="6" stroke="#ffac53" strokeWidth="2.4"/><path d="M12 8v8" stroke="#ffb86b" strokeWidth="1.4" strokeLinecap="round"/></svg>
  ),
  Anaconda: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="4" stroke="#7ee08a" strokeWidth="2.2"/><text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="9" fill="#7ee08a">A</text></svg>
  ),
  CodeSandbox: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l9 5v10l-9 5-9-5V7l9-5z" stroke="#9ad0ff" strokeWidth="3.2" fill="#aacf15"/></svg>
  ),
  Codeanywhere: (
    <svg width="18" height="18" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4" fill="#cbd5e1" opacity="0.06"/><text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="9" fill="#cbd5e1">C</text></svg>
  ),
  'SWI-Prolog': (
    <svg width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke="#ffd08a" strokeWidth="1.2" fill="none"/><text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="8" fill="#ffd08a">P</text></svg>
  ),
  'Oracle Database': (
    <svg width="18" height="18" viewBox="0 0 24 24"><ellipse cx="12" cy="8" rx="6" ry="2" stroke="#ffb86b" strokeWidth="1.2" fill="none"/><rect x="6" y="8" width="12" height="8" rx="2" stroke="#ffb86b" strokeWidth="1.2" fill="none"/></svg>
  ),
  'Apache Tomcat': (
    <svg width="18" height="18" viewBox="0 0 24 24"><path d="M4 18c4-6 12-6 16 0" stroke="#9aa4b2" strokeWidth="1.2" fill="none"/></svg>
  ),
  'IntelliJ IDEA': (
    <svg width="18" height="18" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4" stroke="#b695ff" strokeWidth="1.2" fill="none"/><text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="8" fill="#b695ff">IJ</text></svg>
  ),
  Eclipse: (
    <svg width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke="#80b7ff" strokeWidth="1.2" fill="none"/></svg>
  ),
  'Node.js': (
    <svg width="18" height="18" viewBox="0 0 24 24"><path d="M12 2l8 4v12l-8 4-8-4V6l8-4z" stroke="#9ad0ff" strokeWidth="1.2" fill="none"/></svg>
  ),
  Express: (
    <svg width="18" height="18" viewBox="0 0 24 24"><text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="9" fill="#cbd5e1">Ex</text></svg>
  ),
  MongoDB: (
    <svg width="18" height="18" viewBox="0 0 24 24"><path d="M12 3c0 6-6 6-6 12 6 0 6-6 6-12z" stroke="#7ee08a" strokeWidth="1.2" fill="none"/></svg>
  ),
  PostgreSQL: (
    <svg width="18" height="18" viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="7" ry="5" stroke="#9ae3ff" strokeWidth="1.2" fill="none"/></svg>
  ),
  Redis: (
    <svg width="18" height="18" viewBox="0 0 24 24"><rect x="4" y="6" width="16" height="12" rx="2" stroke="#ffb86b" strokeWidth="1.2" fill="none"/></svg>
  ),
  Postman: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 12l7-6 11 6-11 6-7-6z" stroke="#ff9aa2" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  Docker: (
    <svg width="18" height="18" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="6" rx="1" stroke="#9ad0ff" strokeWidth="1.2" fill="none"/></svg>
  ),
  'MySQL Workbench': (
    <svg width="18" height="18" viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="7" ry="5" stroke="#9ad0ff" strokeWidth="1.2" fill="none"/></svg>
  ),
  Vercel: (
    <svg width="18" height="18" viewBox="0 0 24 24"><path d="M3 20h18L12 4 3 20z" fill="#fff" opacity="0.06"/></svg>
  ),
  Netlify: (
    <svg width="18" height="18" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3" stroke="#9ad0ff" strokeWidth="1.2" fill="none"/></svg>
  ),
  AWS: (
    <svg width="18" height="18" viewBox="0 0 24 24"><path d="M3 12c6-6 12-6 18 0" stroke="#ffd08a" strokeWidth="1.2" fill="none"/></svg>
  ),
  'GitHub Pages': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2C9.2 2 7 4.2 7 7c0 2.6 1.7 4.8 4 5.6V17c0 .6-.4 1-1 1H9v2h6v-2h-1c-.6 0-1-.4-1-1v-4.4c2.3-.8 4-3 4-5.6 0-2.8-2.2-5-5-5z" stroke="#cbd5e1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  Render: (
    <svg width="18" height="18" viewBox="0 0 24 24"><text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="9" fill="#cbd5e1">R</text></svg>
  ),
  Railway: (
    <svg width="18" height="18" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3" stroke="#9ad0ff" strokeWidth="1" fill="none"/></svg>
  ),
  OpenAI: (
    <svg width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" stroke="#9ae3ff" strokeWidth="1.2" fill="none"/></svg>
  ),
  'Hugging Face': (
    <svg width="18" height="18" viewBox="0 0 24 24"><path d="M4 12c4 6 12 6 16 0" stroke="#ffd08a" strokeWidth="1.2" fill="none"/></svg>
  ),
  LangChain: (
    <svg width="18" height="18" viewBox="0 0 24 24"><path d="M6 12h12" stroke="#cbd5e1" strokeWidth="1.2" strokeLinecap="round"/></svg>
  ),
  ChatGPT: (
    <svg width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" stroke="#7ee08a" strokeWidth="1.2" fill="none"/></svg>
  ),
  'GitHub Copilot': (
    <svg width="18" height="18" viewBox="0 0 24 24"><path d="M3 12h18" stroke="#cbd5e1" strokeWidth="1.2" strokeLinecap="round"/></svg>
  ),
  Gemini: (
    <svg width="18" height="18" viewBox="0 0 24 24"><text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="9" fill="#cbd5e1">G</text></svg>
  ),
  Perplexity: (
    <svg width="18" height="18" viewBox="0 0 24 24"><text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="8" fill="#cbd5e1">P</text></svg>
  ),
  Linkedin: (
    <svg width="18" height="18" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3" stroke="#9ad0ff" strokeWidth="1.2" fill="none"/></svg>
  ),
  Discord: (
    <svg width="18" height="18" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4" stroke="#9ae3ff" strokeWidth="1.2" fill="none"/></svg>
  ),
  Telegram: (
    <svg width="18" height="18" viewBox="0 0 24 24"><path d="M3 12l7-6 11 6-11 6-7-6z" stroke="#9ad0ff" strokeWidth="1.2" fill="none"/></svg>
  ),
}

function renderIcon(name){
  return ICONS[name] || (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="4" stroke="#444" strokeWidth="1" opacity="0.04"/></svg>
  )
}

// Define each category with its own tool list so links can be different per card
const CATEGORIES = [
  {
    key: 'top',
    title: 'TOP TOOLS (Used during Academic lab)',
    tools: [
      { name: 'VS Code', link: 'https://code.visualstudio.com/download' },
      { name: 'Jupyter Notebook', link: 'https://jupyter.org/' },
      { name: 'Anaconda', link: 'https://www.anaconda.com/products/distribution' },
      { name: 'CodeSand box', link: 'https://codesandbox.io/' },
      { name: 'Codeany where', link: 'https://codeanywhere.com/' },
      { name: 'SWI-Prolog', link: 'https://www.swi-prolog.org/' },
      { name: 'Oracle Database', link: 'https://www.oracle.com/database/' },
      { name: 'Apache Tomcat', link: 'https://tomcat.apache.org/' },
      { name: 'IntelliJ IDEA', link: 'https://www.jetbrains.com/idea/' },
      { name: 'Eclipse', link: 'https://www.eclipse.org/' },
    ],
  },
  {
    key: 'backend',
    title: 'Backend, Database & Dev',
    tools: [
      { name: 'Node.js', link: 'https://nodejs.org/' },
      { name: 'Express', link: 'https://expressjs.com/' },
      { name: 'MongoDB', link: 'https://www.mongodb.com/' },
      { name: 'PostgreSQL', link: 'https://www.postgresql.org/' },
      { name: 'Redis', link: 'https://redis.io/' },
      { name: 'Postman', link: 'https://www.postman.com/downloads/' },
      { name: 'Docker', link: 'https://www.docker.com/get-started' },
      { name: 'MySQL Workbench', link: 'https://www.mysql.com/products/workbench/' },
    ],
  },
  {
    key: 'deploy',
    title: 'Deployment, Cloud & Productivity',
    tools: [
      { name: 'Vercel', link: 'https://vercel.com/' },
      { name: 'Netlify', link: 'https://www.netlify.com/' },
      { name: 'AWS', link: 'https://aws.amazon.com/' },
      { name: 'GitHub Pages', link: 'https://pages.github.com/' },
      { name: 'Render', link: 'https://render.com/' },
      { name: 'Railway', link: 'https://railway.app/' },
    ],
  },
  {
    key: 'ai',
    title: 'AI / LLMs (Most Used)',
    tools: [
      { name: 'ChatGPT', link: 'https://chatgpt.com/' },
      { name: 'GitHub Copilot', link: 'https://education.github.com/pack' },
      { name: 'Gemini', link: 'https://gemini.google.com' },
      {name: 'Perplexity', link: 'https://www.perplexity.ai/' },
    ],
  },
   {
    key: 'community',
    title: 'Stay Connected(Social Links)',
    tools: [
      { name: 'Linkedin', link: 'https://www.linkedin.com/' },
      { name: 'Discord', link: 'https://discord.com/' },
      { name: 'Telegram', link: 'https://web.telegram.org' },
     
    ],
  },
]

export default function ImpTools() {
  return (
    <div className="page imp-tools container" style={{ paddingTop: 18 }}>
      <h1>Important Tools</h1>
      <p className="muted">Click the icon to open the official download / docs page.</p>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 12, marginTop: 12 }}>
        {CATEGORIES.map((cat) => (
          <div key={cat.key} className="card glass no-flip">
            <div className="card-inner">
              <div className="card-front">
                <div className="card-top">
                  <div className="card-text">
                    <h3>{cat.title}</h3>
                  </div>
                </div>

                <div className="card-foot-row">
                  <div className="tools-grid">
                    {cat.tools.map((t) => (
                      <div key={t.name} className="tool-item">
                        <div className="tool-left">
                          <div className="tool-icon">
                            {renderIcon(t.name)}
                          </div>
                          <div className="tool-name">{t.name}</div>
                        </div>
                        <a className="btn tool-cta" href={t.link} target="_blank" rel="noopener noreferrer" title={`Open ${t.name}`}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v10" stroke="#d62828" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 11l4 4 4-4" stroke="#d62828" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
