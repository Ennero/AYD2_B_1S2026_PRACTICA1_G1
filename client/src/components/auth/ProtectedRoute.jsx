import { Navigate } from 'react-router-dom'
import { authService } from '../../services'

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = authService.getToken()
  
  // Si no hay token, redirigir a login
  if (!token) {
    return <Navigate to="/login" replace />
  }

  // Decodificar el token para obtener el tipo de usuario
  // El token JWT tiene 3 partes separadas por puntos: header.payload.signature
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const userType = payload.type
    
    // Si hay roles permitidos y el usuario no tiene el rol correcto, redirigir
    if (allowedRoles && !allowedRoles.includes(userType)) {
      // Redirigir a la home correspondiente según el rol
      if (userType === 'AGENT') {
        return <Navigate to="/agent/dashboard" replace />
      } else if (userType === 'ADMIN') {
        return <Navigate to="/admin/agents" replace />
      } else {
        return <Navigate to="/search" replace />
      }
    }

    return children
  } catch (error) {
    // Si hay error decodificando el token, redirigir a login
    console.error('[ProtectedRoute] Error decodificando token:', error)
    localStorage.removeItem('authToken')
    localStorage.removeItem('userId')
    return <Navigate to="/login" replace />
  }
}

export default ProtectedRoute
