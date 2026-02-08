import { NavbarClient } from '../components/layout'
import { FavoritesContainer } from '../containers/favorites'
import { useNavigate } from 'react-router-dom'

/**
 * Página de propiedades favoritas
 
 */
const FavoritesPage = () => {
  const navigate = useNavigate()

  const isAuthenticated = true 

  const handleLogout = () => {
    navigate('/login')
  }

  return (
    <div className="min-h-screen">
      <NavbarClient isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <FavoritesContainer />
    </div>
  )
}

export default FavoritesPage
