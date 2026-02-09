import { NavbarClient } from '../components/layout'
import { SearchContainer } from '../containers/search'
import { useNavigate } from 'react-router-dom'

/**
 * Página de búsqueda de propiedades
 * Solo accesible para usuarios autenticados
 */
const SearchPage = () => {
  const navigate = useNavigate()

  const isAuthenticated = true 

  const handleLogout = () => {

    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarClient isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <SearchContainer />
    </div>
  )
}

export default SearchPage
