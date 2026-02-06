
import { useState } from 'react';
import { LoginForm } from '../../components/auth';

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
    setLoading(true);
    setError('');

    console.log('Login attempt:', { email, password });
    
    setTimeout(() => {
      setLoading(false);
      alert('Login functionality will be connected later');
    }, 1000);
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
