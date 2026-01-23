import React from 'react'
import Card from '../components/Card'
import Modal from '../components/Modal'
import { useState } from 'react'

const posts = [
  { title: 'Study Tips for Semesters', excerpt: 'Short tips to prepare efficiently.' },
  { title: 'How to approach PYQs', excerpt: 'Strategies for solving previous year questions.' },
]

export default function Blog() {
  const [modal, setModal] = useState({ open: false, title: '', content: null })
  return (
    <div className="page">
      <h2>Blog</h2>
      <div className="grid">
        {posts.map((p) => (
          <Card
            key={p.title}
            title={p.title}
            actionLabel="Read"
            onAction={() => setModal({ open: true, title: p.title, content: p.excerpt + '\n\nFull static post content placeholder.' })}
          >
            <p className="muted">{p.excerpt}</p>
          </Card>
        ))}
      </div>

      <Modal open={modal.open} title={modal.title} onClose={() => setModal({ open: false })}>
        <pre style={{whiteSpace:'pre-wrap'}}>{modal.content}</pre>
      </Modal>
    </div>
  )
}
