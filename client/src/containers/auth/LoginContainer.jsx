
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
      if (result.success) {
        setTimeout(() => {
          navigate('/');
        }, 1500);
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
