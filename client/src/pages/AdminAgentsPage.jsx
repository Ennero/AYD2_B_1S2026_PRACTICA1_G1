import { NavbarAdmin } from '../components/admin'
import { AgentManagementContainer } from '../containers/admin'
import { useNavigate } from 'react-router-dom'

/**
 * Página de gestión de Agentes Inmobiliarios (Admin)
 * Solo accesible para usuarios administradores
 */
const AdminAgentsPage = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    // TODO: Lógica de logout real
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarAdmin onLogout={handleLogout} />
      <AgentManagementContainer />
    </div>
  )
}

export default AdminAgentsPage
