import { Edit3, Trash2 } from 'lucide-react'

/**
 * Componente presentacional - Tabla de Agentes Inmobiliarios
 * Muestra la lista de agentes en formato tabla con acciones
 * @param {Array} agents - Lista de agentes a mostrar
 * @param {Function} onEdit - Callback al presionar editar
 * @param {Function} onDelete - Callback al presionar eliminar
 */
const AgentTable = ({ agents = [], onEdit, onDelete }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-rose-200 shadow-xl bg-white/80 backdrop-blur-sm animate-fadeInUp" style={{ transformStyle: 'preserve-3d' }}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-rose-700 to-rose-800 text-white">
              <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Id</th>
              <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">E-Mail</th>
              <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Apellido</th>
              <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Teléfono</th>
              <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider">Imagen</th>
              <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-rose-100">
            {agents.map((agent, index) => (
              <tr 
                key={agent.id}
                className="hover:bg-rose-50/60 transition-all duration-300 group"
                style={{ 
                  animationDelay: `${index * 80}ms`,
                  animation: 'fadeInUp 0.5s ease-out forwards',
                  opacity: 0,
                }}
              >
                <td className="px-6 py-4">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-rose-100 text-rose-700 font-bold text-sm">
                    {agent.id}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 font-medium">{agent.email}</td>
                <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{agent.firstName}</td>
                <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{agent.lastName}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{agent.phone}</td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center">
                    <img 
                      src={agent.photo || '/images/logo-HomeFinder.png'} 
                      alt={`${agent.firstName} ${agent.lastName}`}
                      className="w-10 h-10 rounded-full object-cover border-2 border-rose-200 shadow-md transform transition-all duration-300 group-hover:scale-110 group-hover:border-rose-400"
                    />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => onEdit(agent)}
                      className="p-2.5 rounded-xl bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 active:scale-95 shadow-md hover:shadow-lg"
                      title="Editar agente"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(agent)}
                      className="p-2.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 active:scale-95 shadow-md hover:shadow-lg"
                      title="Eliminar agente"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Footer informativo */}
      <div className="px-6 py-3 bg-rose-50/50 border-t border-rose-100">
        <p className="text-xs text-rose-600 font-medium text-center">
          Todos los usuarios son de Rol Agente Inmobiliario*
        </p>
      </div>
    </div>
  )
}

export default AgentTable
