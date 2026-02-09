import { Link } from 'react-router-dom'
import { LogOut } from 'lucide-react'

/**
 * Componente NavbarClient reutilizable
 * @param {boolean} isAuthenticated - Si el usuario está autenticado
 * @param {Function} onLogout - Función para cerrar sesión
 */
const NavbarClient = ({ isAuthenticated = false, onLogout }) => {
  return (
    <nav className="absolute top-0 left-0 w-full z-50 py-6 px-6 md:px-12 lg:px-24 flex items-center justify-between backdrop-blur-md bg-white/90 shadow-xl border-b border-gray-100 animate-slideInDown">
      
      <div className="flex items-center gap-2 transform transition-all duration-500 hover:scale-105 cursor-default" style={{ transformStyle: 'preserve-3d' }}>
        <img 
          src="/images/logo-HomeFinder.png" 
          alt="Logo" 
          className="h-8 w-auto object-contain animate-float drop-shadow-lg"
        />
        <span className="text-xl font-bold tracking-tight text-gray-900 drop-shadow-sm">
          HomeFinder <span className="text-orange-600">Pro</span>
        </span>
      </div>

     
      <div className="flex items-center gap-6">
        {isAuthenticated ? (
          <>
            <Link 
              to="/search" 
              className="text-sm font-semibold text-gray-900 hover:text-orange-600 transition-all duration-300 relative group px-4 py-2"
            >
              <span className="relative z-10">Buscador</span>
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link 
              to="/appointments" 
              className="text-sm font-semibold text-gray-900 hover:text-orange-600 transition-all duration-300 relative group px-4 py-2"
            >
              <span className="relative z-10">Mis Citas</span>
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link 
              to="/favorites" 
              className="text-sm font-semibold text-gray-900 hover:text-orange-600 transition-all duration-300 relative group px-4 py-2"
            >
              <span className="relative z-10">Favoritos</span>
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link 
              to="/profile" 
              className="text-sm font-semibold text-gray-900 hover:text-orange-600 transition-all duration-300 relative group px-4 py-2"
            >
              <span className="relative z-10">Mi Perfil</span>
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <button
              onClick={onLogout}
              className="text-sm font-semibold bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3.5 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-110 hover:-translate-y-1 active:scale-95 relative overflow-hidden group"
              style={{ transformStyle: 'preserve-3d', boxShadow: '0 10px 25px rgba(249, 115, 22, 0.4)' }}
            >
              <span className="relative z-10 font-bold flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="absolute inset-0 rounded-full border-2 border-white/20"></div>
            </button>
          </>
        ) : (
          <>
            <Link 
              to="/login" 
              className="text-sm font-semibold text-gray-900 hover:text-orange-600 transition-all duration-300 relative group px-4 py-2"
            >
              <span className="relative z-10">Iniciar Sesión</span>
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link 
              to="/register" 
              className="text-sm font-semibold bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3.5 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-110 hover:-translate-y-1 active:scale-95 relative overflow-hidden group"
              style={{ transformStyle: 'preserve-3d', boxShadow: '0 10px 25px rgba(249, 115, 22, 0.4)' }}
            >
              <span className="relative z-10 font-bold">Registrarse</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="absolute inset-0 rounded-full border-2 border-white/20"></div>
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default NavbarClient
