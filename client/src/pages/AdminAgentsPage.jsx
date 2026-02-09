import { NavbarAdmin } from '../components/admin'
import { AgentManagementContainer } from '../containers/admin'
import { useNavigate } from 'react-router-dom'

const AdminAgentsPage = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Falta logica para limpiar el token
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
