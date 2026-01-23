import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ImportantLectures from './pages/ImportantLectures'
import NotesPYQ from './pages/NotesPYQ'
import Faculty from './pages/Faculty'
import Blog from './pages/Blog'
import Syllabus from './pages/Syllabus'
import Placement from './pages/Placement'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="app-root">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/syllabus" element={<Syllabus />} />
          <Route path="/lectures" element={<ImportantLectures />} />
          <Route path="/notes" element={<NotesPYQ initialTab="notes" />} />
          <Route path="/pyq" element={<NotesPYQ initialTab="pyq" />} />
          <Route path="/placement" element={<Placement />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
