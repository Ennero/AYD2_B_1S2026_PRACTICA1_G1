import { NavbarClient } from '../components/layout'
import { ProfileContainer } from '../containers/profile'
import { useNavigate } from 'react-router-dom'

const ProfilePage = () => {
  const navigate = useNavigate()
  const isAuthenticated = true

  const handleLogout = () => {
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/20 to-gray-50">
      <NavbarClient isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <ProfileContainer />
    </div>
  )
}

export default ProfilePage
