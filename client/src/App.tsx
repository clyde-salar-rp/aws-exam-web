import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import { Layout } from '@/components/Layout'
import ProtectedRoute from '@/components/ProtectedRoute'
import LoginPage from '@/pages/LoginPage'
import ChangePasswordPage from '@/pages/ChangePasswordPage'
import { Dashboard } from '@/pages/Dashboard'
import { Exam } from '@/pages/Exam'
import { Progress } from '@/pages/Progress'
import { Review } from '@/pages/Review'
import { StudyNotes } from '@/pages/StudyNotes'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/change-password"
          element={
            <ProtectedRoute skipPasswordCheck>
              <ChangePasswordPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/exam" element={<Exam />} />
                  <Route path="/progress" element={<Progress />} />
                  <Route path="/review" element={<Review />} />
                  <Route path="/study-notes" element={<StudyNotes />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  )
}

export default App
