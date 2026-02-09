import { NavbarAgent } from '../components/agent'
import AgentAppointmentsContainer from '../containers/agent/AgentAppointmentsContainer'
import { useNavigate } from 'react-router-dom'

const AgentAppointmentsPage = () => {
  const navigate = useNavigate()
  const handleLogout = () => navigate('/login')

  return (
    <div className="h-screen overflow-hidden bg-gray-50">
      <NavbarAgent onLogout={handleLogout} />
      <AgentAppointmentsContainer />
    </div>
  )
}

export default AgentAppointmentsPage
