import { Link, useLocation } from 'react-router-dom'
import { LogOut, Briefcase } from 'lucide-react'

/**
 * Componente NavbarAgent reutilizable
 * Navbar específico para el panel del agente inmobiliario con tema celeste
 * Se reutilizará en todas las vistas del agente (Dashboard, Propiedades, Solicitudes)
 * @param {Function} onLogout - Función para cerrar sesión
 */
const NavbarAgent = ({ onLogout }) => {
  const location = useLocation()

  const navLinks = [
    { to: '/agent/dashboard', label: 'Home' },
    { to: '/agent/properties', label: 'Propiedades' },
    { to: '/agent/requests', label: 'Solicitudes' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="absolute top-0 left-0 w-full z-50 py-6 px-6 md:px-12 lg:px-24 flex items-center justify-between backdrop-blur-md bg-white/90 shadow-xl border-b border-sky-100 animate-slideInDown">
      
      <div className="flex items-center gap-3 transform transition-all duration-500 hover:scale-105 cursor-default" style={{ transformStyle: 'preserve-3d' }}>
        <img 
          src="/images/logo-HomeFinder.png" 
          alt="Logo" 
          className="h-8 w-auto object-contain animate-float drop-shadow-lg"
        />
        <span className="text-xl font-bold tracking-tight text-gray-900 drop-shadow-sm">
          HomeFinder <span className="text-sky-600">Pro</span>
        </span>
        <div className="flex items-center gap-1.5 ml-2 px-3 py-1 bg-sky-50 rounded-full border border-sky-200">
          <Briefcase className="w-4 h-4 text-sky-600" />
          <span className="text-xs font-semibold text-sky-600 uppercase tracking-wider">Agente</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 active:scale-95 ${
              isActive(link.to)
                ? 'bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-lg'
                : 'text-gray-700 hover:bg-sky-50 hover:text-sky-700'
            }`}
            style={isActive(link.to) ? { boxShadow: '0 6px 20px rgba(14, 165, 233, 0.35)' } : {}}
          >
            <span className="relative z-10">{link.label}</span>
          </Link>
        ))}
        
        <Link
          to="/"
          onClick={() => onLogout?.()}
          className="text-sm font-semibold bg-gradient-to-r from-red-500 to-red-600 text-white px-7 py-2.5 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-500 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-0.5 active:scale-95 relative overflow-hidden group ml-2"
          style={{ transformStyle: 'preserve-3d', boxShadow: '0 6px 20px rgba(239, 68, 68, 0.35)' }}
        >
          <span className="relative z-10 font-bold flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </Link>
      </div>
    </nav>
  )
}

export default NavbarAgent
