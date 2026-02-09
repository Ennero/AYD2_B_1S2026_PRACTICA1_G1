
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
    
    toast.promise(
      authService.login(email, password),
      {
        loading: 'Verificando credenciales...',
        success: '¡Bienvenido! Redirigiendo...',
        error: 'Credenciales incorrectas',
      }
    ).then((result) => {
      if (result.success && result.user.token) {
        // Decodificar el token para obtener el tipo de usuario
        try {
          const payload = JSON.parse(atob(result.user.token.split('.')[1]))
          const userType = payload.type
          
          setTimeout(() => {
            // Redirigir según el rol del usuario
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
          navigate('/')
        }
      }
    }).finally(() => {
      setLoading(false);
    });
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
