import { User } from 'lucide-react'

/**
 * Header del perfil con saludo personalizado
 */
const ProfileHeader = ({ nombre, foto }) => {
  return (
    <div className="text-center relative">
      {/* Decoración de fondo */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-orange-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-32 h-32 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '150ms' }}></div>
      </div>

      {/* Avatar */}
      <div className="relative inline-block mb-4">
        <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-full shadow-2xl transform transition-all duration-500 hover:scale-110 hover:rotate-[360deg] group overflow-hidden" style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}>
          {foto ? (
            <img 
              src={foto} 
              alt={nombre}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-16 h-16 text-white transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12" />
          )}
          
          {/* Ring animado */}
          <div className="absolute inset-0 rounded-full border-4 border-orange-400/50 animate-ping"></div>
          <div className="absolute inset-0 rounded-full border-4 border-orange-400/30 animate-pulse"></div>
        </div>
      </div>

      {/* Saludo con efecto de gradiente */}
      <h1 className="text-5xl font-extrabold mb-3 bg-gradient-to-r from-gray-900 via-orange-600 to-gray-900 bg-clip-text text-transparent animate-fadeIn">
        ¡Hola, {nombre}!
      </h1>
      <p className="text-gray-600 text-lg animate-fadeIn" style={{ animationDelay: '200ms' }}>
        Gestiona tu información personal y configuración de cuenta
      </p>
    </div>
  )
}

export default ProfileHeader
