import { NavbarClient } from '../components/layout'
import { PropertyDetailContainer } from '../containers/property'
import { useNavigate } from 'react-router-dom'

/**
 * Página de detalle de propiedad
 * Muestra información completa de una propiedad específica
 */
const PropertyDetailPage = () => {
  const navigate = useNavigate()

  // Simulación de autenticación
  const isAuthenticated = true

  const handleLogout = () => {
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/20 to-gray-50">
      <NavbarClient isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <PropertyDetailContainer />
    </div>
  )
}

export default PropertyDetailPage
