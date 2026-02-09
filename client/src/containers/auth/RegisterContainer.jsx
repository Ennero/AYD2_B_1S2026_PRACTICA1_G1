
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RegisterForm from '../../components/auth/RegisterForm'
import { authService } from '../../services'
import toast from 'react-hot-toast'

const RegisterContainer = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async (formData) => {
    if (formData.password !== formData.confirmPassword) {
      toast.error('Las contraseñas no coinciden')
      return
    }

    if (formData.password.length < 8) {
      toast.error('La contraseña debe tener al menos 8 caracteres')
      return
    }

    setIsLoading(true)

    try {
      const result = await authService.register(formData)
      
      if (result.success) {
        toast.success('¡Cuenta creada exitosamente!')
        
        // Si recibimos token, redirigir según el rol
        if (result.token) {
          try {
            const payload = JSON.parse(atob(result.token.split('.')[1]))
            const userType = payload.type
            
            setTimeout(() => {
              if (userType === 'AGENT') {
                navigate('/agent/dashboard')
              } else if (userType === 'ADMIN') {
                navigate('/admin/agents')
              } else {
                navigate('/search')
              }
            }, 1500)
          } catch (error) {
            console.error('Error decodificando token:', error)
            navigate('/login')
          }
        } else {
          // Si no hay token, ir al login
          setTimeout(() => {
            navigate('/login')
          }, 1500)
        }
      }
    } catch (error) {
      console.error('Error en registro:', error)
      toast.error(error.message || 'Error al crear la cuenta')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
    </div>
  )
}

export default RegisterContainer
