
import { Input, Button } from '../ui';
import { Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginForm = ({ 
  email, 
  password, 
  onEmailChange, 
  onPasswordChange, 
  onSubmit, 
  onRegisterClick,
  loading = false,
  error = '' 
}) => {

  return (
    <div className="w-full">
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Iniciar Sesión
        </h1>
        <p className="text-gray-600">
          Ingresa tus credenciales para continuar
        </p>
      </motion.div>

      {error && (
        <motion.div 
          className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
        >
          {error}
        </motion.div>
      )}

      <form onSubmit={onSubmit} className="space-y-1">
        <Input
          label="Correo Electronico"
          type="email"
          name="email"
          value={email}
          onChange={onEmailChange}
          placeholder=""
          required
          Icon={Mail}
        />

        <Input
          label="Contraseña"
          type="password"
          name="password"
          value={password}
          onChange={onPasswordChange}
          placeholder=""
          required
          Icon={Lock}
          hints={[
            "Mínimo 8 caracteres",
            "Al menos una mayúscula",
            "Al menos un número"
          ]}
        />

        <div className="pt-8">
          <Button 
          type="submit" 
          variant="primary" 
          fullWidth
          loading={loading}
          className="mt-6"
        >
          Iniciar Sesión
        </Button>
        </div>
      </form>

      <motion.div 
        className="text-center mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <button
          type="button"
          onClick={onRegisterClick}
          className="text-gray-600 hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
        >
          ¿No tienes una cuenta?{' '}
          <span className="text-emerald-600 font-semibold hover:text-emerald-700 underline decoration-2 underline-offset-2 hover:decoration-emerald-600">
            Registrate Aqui
          </span>
        </button>
      </motion.div>
    </div>
  );
};

export default LoginForm;
