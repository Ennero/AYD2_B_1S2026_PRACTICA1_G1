
import { useState } from 'react';
import { LoginForm } from '../../components/auth';
import toast from 'react-hot-toast';

const LoginContainer = () => {
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
      new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulación de login
          if (email === 'test@test.com' && password === 'Test1234') {
            resolve();
          } else {
            reject();
          }
        }, 2000);
      }),
      {
        loading: 'Verificando credenciales...',
        success: '¡Bienvenido! Redirigiendo...',
        error: 'Credenciales incorrectas',
      }
    ).finally(() => {
      setLoading(false);
    });
  };

  const handleRegisterClick = () => {
    console.log('Navigate to register');
    alert('Register page will be implemented later');
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
