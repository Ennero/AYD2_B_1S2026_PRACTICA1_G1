import { NavbarAgent } from '../components/agent'
import { AgentDashboardContainer } from '../containers/agent'
import { useNavigate } from 'react-router-dom'

const AgentDashboardPage = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    //Falta logica para cerrar sesión
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarAgent onLogout={handleLogout} />
      <AgentDashboardContainer />
    </div>
  )
}

export default AgentDashboardPage
