import { Link } from 'react-router-dom'
import { LogOut, Shield } from 'lucide-react'

/**
 * Componente NavbarAdmin reutilizable
 * Navbar específico para panel de administración con tema corinto
 * @param {Function} onLogout - Función para cerrar sesión
 */
const NavbarAdmin = ({ onLogout }) => {
  return (
    <nav className="absolute top-0 left-0 w-full z-50 py-6 px-6 md:px-12 lg:px-24 flex items-center justify-between backdrop-blur-md bg-white/90 shadow-xl border-b border-rose-100 animate-slideInDown">
      
      <div className="flex items-center gap-3 transform transition-all duration-500 hover:scale-105 cursor-default" style={{ transformStyle: 'preserve-3d' }}>
        <img 
          src="/images/logo-HomeFinder.png" 
          alt="Logo" 
          className="h-8 w-auto object-contain animate-float drop-shadow-lg"
        />
        <span className="text-xl font-bold tracking-tight text-gray-900 drop-shadow-sm">
          HomeFinder <span className="text-rose-700">Pro</span>
        </span>
        <div className="flex items-center gap-1.5 ml-2 px-3 py-1 bg-rose-50 rounded-full border border-rose-200">
          <Shield className="w-4 h-4 text-rose-700" />
          <span className="text-xs font-semibold text-rose-700 uppercase tracking-wider">Admin</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <Link 
          to="/admin/agents" 
          className="text-sm font-semibold text-gray-900 hover:text-rose-700 transition-all duration-300 relative group px-4 py-2"
        >
          <span className="relative z-10">Agentes</span>
          <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-rose-700 transform scale-x-100 transition-transform duration-300 origin-left"></span>
        </Link>
        <button
          onClick={onLogout}
          className="text-sm font-semibold bg-gradient-to-r from-rose-700 to-rose-800 text-white px-8 py-3.5 rounded-full hover:from-rose-800 hover:to-rose-900 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-110 hover:-translate-y-1 active:scale-95 relative overflow-hidden group"
          style={{ transformStyle: 'preserve-3d', boxShadow: '0 10px 25px rgba(159, 18, 57, 0.4)' }}
        >
          <span className="relative z-10 font-bold flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Cerrar Sesión
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <div className="absolute inset-0 rounded-full border-2 border-white/20"></div>
        </button>
      </div>
    </nav>
  )
}

export default NavbarAdmin
