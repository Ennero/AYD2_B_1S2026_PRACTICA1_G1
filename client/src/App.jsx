
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import SearchPage from './pages/SearchPage'
import PropertyDetailPage from './pages/PropertyDetailPage'
import ProfilePage from './pages/ProfilePage'
import AppointmentsPage from './pages/AppointmentsPage'
import AdminAgentsPage from './pages/AdminAgentsPage'
import AgentDashboardPage from './pages/AgentDashboardPage'
import './App.css'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <BrowserRouter>
      <Toaster 
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '14px',
          },
          success: {
            style: {
              background: '#10b981',
            },
          },
          error: {
            style: {
              background: '#ef4444',
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/property/:id" element={<PropertyDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/admin/agents" element={<AdminAgentsPage />} />
        <Route path="/agent/dashboard" element={<AgentDashboardPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

