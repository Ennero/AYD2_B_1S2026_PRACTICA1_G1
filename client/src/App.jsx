/**
 * Componente Principal de la Aplicación
 * TODO: Implementar React Router cuando tengamos más páginas
 */

import LoginPage from './pages/LoginPage'
import './App.css'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
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
      <LoginPage />
    </>
  )
}

export default App

