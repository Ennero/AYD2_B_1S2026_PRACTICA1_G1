
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
import { ProtectedRoute } from './components/auth'
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
        {/* Rutas públicas */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Rutas de Cliente */}
        <Route 
          path="/search" 
          element={
            <ProtectedRoute allowedRoles={['CLIENT']}>
              <SearchPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/property/:id" 
          element={
            <ProtectedRoute allowedRoles={['CLIENT']}>
              <PropertyDetailPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute allowedRoles={['CLIENT']}>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/appointments" 
          element={
            <ProtectedRoute allowedRoles={['CLIENT']}>
              <AppointmentsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/favorites" 
          element={
            <ProtectedRoute allowedRoles={['CLIENT']}>
              <FavoritesPage />
            </ProtectedRoute>
          } 
        />

        {/* Rutas de Agente */}
        <Route 
          path="/agent/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['AGENT']}>
              <AgentDashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/agent/properties" 
          element={
            <ProtectedRoute allowedRoles={['AGENT']}>
              <AgentPropertiesPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/agent/requests" 
          element={
            <ProtectedRoute allowedRoles={['AGENT']}>
              <AgentAppointmentsPage />
            </ProtectedRoute>
          } 
        />

        {/* Rutas de Admin */}
        <Route 
          path="/admin/agents" 
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminAgentsPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App

