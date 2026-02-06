
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RegisterForm from '../../components/auth/RegisterForm'
import toast from 'react-hot-toast'

const RegisterContainer = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async (formData) => {
    // Validar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      toast.error('Las contraseñas no coinciden')
      return
    }

    // Validar longitud de contraseña
    if (formData.password.length < 8) {
      toast.error('La contraseña debe tener al menos 8 caracteres')
      return
    }

    setIsLoading(true)

    try {
      console.log('Datos de registro:', formData)
      
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('¡Cuenta creada exitosamente!')
      
      setTimeout(() => {
        navigate('/login')
      }, 1500)
      
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
