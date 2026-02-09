
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import SearchPage from './pages/SearchPage'
import PropertyDetailPage from './pages/PropertyDetailPage'
import ProfilePage from './pages/ProfilePage'
import AppointmentsPage from './pages/AppointmentsPage'
import AdminAgentsPage from './pages/AdminAgentsPage'
import FavoritesPage from './pages/FavoritesPage'
import AgentDashboardPage from './pages/AgentDashboardPage'
import AgentPropertiesPage from './pages/AgentPropertiesPage'
import AgentAppointmentsPage from './pages/AgentAppointmentsPage'
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
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/admin/agents" element={<AdminAgentsPage />} />
        <Route path="/agent/dashboard" element={<AgentDashboardPage />} />
        <Route path="/agent/properties" element={<AgentPropertiesPage />} />
        <Route path="/agent/requests" element={<AgentAppointmentsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

