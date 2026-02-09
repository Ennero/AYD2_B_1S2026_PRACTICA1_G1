import NavbarClient from '../components/layout/NavbarClient'
import { AppointmentsContainer } from '../containers/appointments'
import { Calendar } from 'lucide-react'

/**
 * Página de Mis Citas
 */
const AppointmentsPage = () => {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('/images/client-background.png')",
      }}
    >
      <NavbarClient isAuthenticated={true} />
      
      <div className="pt-28 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fadeInUp">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mb-4 shadow-lg">
              <Calendar className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-extrabold mb-3 bg-gradient-to-r from-gray-900 via-orange-600 to-gray-900 bg-clip-text text-transparent">
              Mis Solicitudes de Citas
            </h1>
            <p className="text-gray-600 text-lg">
              Gestiona tus visitas a propiedades
            </p>
          </div>

          {/* Container con citas */}
          <div className="animate-fadeInUp" style={{ animationDelay: '100ms' }}>
            <AppointmentsContainer />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentsPage
