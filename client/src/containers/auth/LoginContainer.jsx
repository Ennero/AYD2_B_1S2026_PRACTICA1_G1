
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../../components/auth';
import { authService } from '../../services';
import toast from 'react-hot-toast';

const LoginContainer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(''); 
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError(''); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      const errorMsg = 'Por favor completa todos los campos';
      setError(errorMsg);
      toast.error(errorMsg, {
        duration: 3000,
        position: 'top-right',
      });
      return;
    }
    
    setLoading(true);
    
    try {
      toast.loading('Verificando credenciales...');
      const result = await authService.login(email, password);
      
      toast.dismiss();
      
      if (result.success && result.user.token) {
        toast.success('¡Bienvenido! Redirigiendo...');
        
        // Decodificar el token para obtener el tipo de usuario
        try {
          const payload = JSON.parse(atob(result.user.token.split('.')[1]));
          const userType = payload.type;
          
          setTimeout(() => {
            // Redirigir según el rol del usuario
            if (userType === 'AGENT') {
              navigate('/agent/dashboard');
            } else if (userType === 'ADMIN') {
              navigate('/admin/agents');
            } else {
              navigate('/search');
            }
          }, 1500);
        } catch (error) {
          console.error('Error decodificando token:', error);
          toast.error('Error al procesar el inicio de sesión');
          navigate('/');
        }
      }
    } catch (error) {
      toast.dismiss();
      console.error('Error en login:', error);
      
      // Mensajes de error específicos
      const errorMsg = error.message?.toLowerCase();
      
      if (errorMsg?.includes('user not found') || errorMsg?.includes('invalid credentials')) {
        setError('Correo o contraseña incorrectos');
        toast.error('Correo o contraseña incorrectos', {
          duration: 4000,
         
        });
      } else if (errorMsg?.includes('invalid password')) {
        setError('Contraseña incorrecta');
        toast.error('Contraseña incorrecta', {
          duration: 4000,
          
        });
      } else if (errorMsg?.includes('email')) {
        setError('Formato de correo inválido');
        toast.error('Por favor verifica tu correo electrónico', {
          duration: 4000,
          
        });
      } else {
        setError('Error al iniciar sesión');
        toast.error(error.message || 'Error al iniciar sesión', {
          duration: 4000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };


  return (
    <LoginForm
      email={email}
      password={password}
      onEmailChange={handleEmailChange}
      onPasswordChange={handlePasswordChange}
      onSubmit={handleSubmit}
      onRegisterClick={handleRegisterClick}
      loading={loading}
      error={error}
    />
  );
};

export default LoginContainer;
