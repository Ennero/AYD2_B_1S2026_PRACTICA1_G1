
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
      toast.loading('Creando tu cuenta...');
      const result = await authService.register(formData);
      
      toast.dismiss();
      
      if (result.success) {
        toast.success('¡Cuenta creada exitosamente! Ahora inicia sesión', {
          duration: 4000,
          style: {
            background: '#10b981',
          },
        });
        
        // Redirigir al login después del registro exitoso
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      }
    } catch (error) {
      toast.dismiss();
      console.error('Error en registro:', error);
      
      // Mensajes de error específicos
      const errorMsg = error.message?.toLowerCase();
      
      if (errorMsg?.includes('email already registered') || errorMsg?.includes('email already exists')) {
        toast.error('Este correo ya está registrado', {
          duration: 5000,
         
          style: {
            background: '#ef4444',
          },
        });
      } else if (errorMsg?.includes('validation error') || errorMsg?.includes('validation')) {
        toast.error('Por favor verifica que todos los campos sean correctos', {
          duration: 5000,
         
        });
      } else if (errorMsg?.includes('email') && errorMsg?.includes('valid')) {
        toast.error('El formato del correo electrónico no es válido', {
          duration: 5000,
         
        });
      } else if (errorMsg?.includes('password')) {
        toast.error('La contraseña debe tener al menos 6 caracteres', {
          duration: 5000,
        
        });
      } else if (errorMsg?.includes('phone')) {
        toast.error('El número de teléfono debe tener 8 o 9 dígitos', {
          duration: 5000,
          
        });
      } else {
        toast.error(error.message || 'Error al crear la cuenta', {
          duration: 5000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full">
      <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
    </div>
  )
}

export default RegisterContainer
