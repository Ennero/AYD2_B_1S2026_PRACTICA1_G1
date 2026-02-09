import { Calendar } from 'lucide-react'

/**
 * Tarjeta del agente inmobiliario
 */
const AgentCard = ({ agent, price, onRequestAppointment }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-1" style={{ transformStyle: 'preserve-3d' }}>
      <p className="text-sm text-gray-600 mb-3">¿Te interesa esta propiedad?</p>
      
      {/* Precio */}
      <div className="mb-6 text-center p-4 bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-xl border-l-4 border-orange-500">
        <p className="text-sm text-gray-600 mb-1">Precio</p>
        <p className="text-3xl font-bold text-orange-600">
          Q {price.toLocaleString()}
        </p>
      </div>

      {/* Agente */}
      <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-xl shadow-lg transform transition-all duration-300 hover:scale-110" style={{ transformStyle: 'preserve-3d' }}>
          {agent.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-lg">{agent.name}</h3>
          <p className="text-sm text-gray-600">{agent.title}</p>
        </div>
      </div>

      {/* Botón Solicitar Cita */}
      <button
        onClick={onRequestAppointment}
        className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 active:scale-95 relative overflow-hidden group"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          <Calendar className="w-5 h-5" />
          Solicitar Cita
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      </button>
    </div>
  )
}

export default AgentCard
