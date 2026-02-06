
import { Input, Button, InfoBox } from '../ui';

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
  
  const passwordRequirements = [
    "Mínimo 8 caracteres",
    "Al menos una mayúscula",
    "Al menos un número"
  ];

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Iniciar Sesión
        </h1>
        <p className="text-gray-600">
          Ingresa tus credenciales para continuar
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
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
        />

        <Input
          label="Contraseña"
          type="password"
          name="password"
          value={password}
          onChange={onPasswordChange}
          placeholder=""
          required
        />

        <InfoBox 
          title="Tu contraseña debe contener:" 
          items={passwordRequirements}
          variant="info"
        />

        <Button 
          type="submit" 
          variant="primary" 
          fullWidth
          disabled={loading}
          className="mt-6"
        >
          {loading ? 'Iniciando...' : 'Iniciar Sesión'}
        </Button>
      </form>

      <div className="text-center mt-6">
        <button
          type="button"
          onClick={onRegisterClick}
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          ¿No tienes una cuenta?{' '}
          <span className="text-emerald-600 font-semibold hover:text-emerald-700 underline">
            Registrate Aqui
          </span>
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
