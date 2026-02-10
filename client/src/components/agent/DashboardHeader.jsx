import { User } from 'lucide-react'

const DashboardHeader = () => {
  
  return (
    <div className="animate-fadeInUp">
      {/* Decoración de fondo */}
      <div className="relative">
        <div className="absolute -top-8 left-0 w-40 h-40 bg-sky-300/20 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
        <div className="absolute -top-4 right-1/4 w-28 h-28 bg-cyan-300/15 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '200ms' }}></div>
      </div>

      <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-2">
        Bienvenido,{' '}
        <span className="bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">
          Agente Inmobiliario
        </span>
      </h1>
      <p className="text-gray-500 text-lg font-medium">
        Panel de control y estadísticas
      </p>
    </div>
  )
}

export default DashboardHeader
