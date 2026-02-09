import { NavbarAgent } from '../components/agent'
import { AgentPropertiesContainer } from '../containers/agent'

const AgentPropertiesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarAgent />
      <AgentPropertiesContainer />
    </div>
  )
}

export default AgentPropertiesPage
