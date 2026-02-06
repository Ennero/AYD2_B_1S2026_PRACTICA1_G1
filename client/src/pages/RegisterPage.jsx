
import { Link } from 'react-router-dom'
import { RegisterContainer } from '../containers/auth'

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex relative overflow-hidden" style={{ perspective: '1500px' }}>
      {/* Formulario */}
      <div className="flex-1 lg:flex-none lg:w-2/5 flex items-center justify-center px-8 py-12 bg-white overflow-y-auto relative animate-slideInLeft">
        <div className="w-full max-w-md relative z-10 transform-gpu">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8 transform hover:scale-105 transition-all duration-500" style={{ transformStyle: 'preserve-3d' }}>
            <img 
              src="/images/logo-HomeFinder.png" 
              alt="HomeFinder Pro" 
              className="h-10 w-auto drop-shadow-lg animate-fadeIn"
            />
            <span className="text-2xl font-bold text-gray-800 animate-slideInRight">
              HomeFinder <span className="text-blue-600">Pro</span>
            </span>
          </div>

          {/* Título */}
          <div className="mb-8 animate-fadeInUp">
            <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">COMIENZA GRATIS</p>
            <h1 className="text-5xl font-bold text-gray-900 mb-3 transform hover:scale-105 transition-transform duration-300 leading-tight">
              Crear nueva cuenta<span className="text-blue-600">.</span>
            </h1>
            <p className="text-gray-600">
              ¿Ya tienes una cuenta?{' '}
              <Link 
                to="/login" 
                className="text-blue-600 hover:text-blue-700 font-medium transition-all duration-300 hover:underline"
              >
                Iniciar sesión
              </Link>
            </p>
          </div>

          {/* Formulario */}
          <div className="animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <RegisterContainer />
          </div>
        </div>
      </div>

      {/*  Imagen de fondo de las montañas */}
      <div className="hidden lg:block lg:w-3/5 relative animate-slideInRight">
        <img 
          src="/images/register-background.jpg" 
          alt="Lago de montaña" 
          className="absolute inset-0 w-full h-full object-cover object-right transform hover:scale-105 transition-transform duration-700"
        />
      </div>
    </div>
  )
}

export default RegisterPage
