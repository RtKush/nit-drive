import React from 'react'
import Card from '../components/Card'
import Modal from '../components/Modal'
import { useState } from 'react'

const faculty = [
  { name: 'Dr. A. Sharma', designation: 'Professor', rating: 4.8, subjects: ['Data Structures', 'Algorithms'], photo: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=800&auto=format&fit=crop' },
  { name: 'Dr. S. Verma', designation: 'Associate Professor', rating: 4.6, subjects: ['DBMS', 'OS'], photo: 'https://images.unsplash.com/photo-1544005323-94ddf0286df2?q=80&w=800&auto=format&fit=crop' },
  { name: 'Prof. R. Gupta', designation: 'Assistant Professor', rating: 4.4, subjects: ['Networks', 'Security'], photo: 'https://images.unsplash.com/photo-1545996124-1a9e7d8f7b0b?q=80&w=800&auto=format&fit=crop' },
]

export default function Faculty() {
  const [modal, setModal] = useState({ open: false, title: '', content: null })
  return (
    <div className="page">
      <h2>Faculty</h2>
      <div className="grid">
        {faculty.map((f) => (
          <Card
            key={f.name}
            title={f.name}
            subtitle={f.designation}
            actionLabel="Profile"
            onAction={() => setModal({ open: true, title: f.name, content: `Rating: ${f.rating} \nSubjects: ${f.subjects.join(', ')}` })}
          >
            <div className="faculty-body">
              <img src={f.photo} alt={f.name} className="faculty-photo" />
            </div>
          </Card>
        ))}
      </div>

      <Modal open={modal.open} title={modal.title} onClose={() => setModal({ open: false })}>
        <pre style={{whiteSpace:'pre-wrap'}}>{modal.content}</pre>
      </Modal>
    </div>
  )
}
