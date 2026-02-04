import { Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { Dashboard } from '@/pages/Dashboard'
import { Exam } from '@/pages/Exam'
import { Progress } from '@/pages/Progress'
import { Review } from '@/pages/Review'
import { StudyNotes } from '@/pages/StudyNotes'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/exam" element={<Exam />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/review" element={<Review />} />
        <Route path="/study-notes" element={<StudyNotes />} />
      </Routes>
    </Layout>
  )
}

export default App
