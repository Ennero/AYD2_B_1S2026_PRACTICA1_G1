// Oppciones en el Tab
const TABS = [
  { key: 'todos',       label: 'Todos'              },
  { key: 'nuevas',      label: 'Nuevas Solicitudes' },
  { key: 'espera',      label: 'En Espera'          },
  { key: 'confirmadas', label: 'Confirmadas'        },
  { key: 'canceladas',  label: 'Canceladas'         },
]

const AgentAppointmentTabs = ({ activeTab, onTabChange, counts = {} }) => {
  return (
    <div className="flex items-center gap-8 border-b-2 border-gray-200 relative">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.key
        const count = counts[tab.key] ?? 0

        return (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`relative pb-3 text-lg font-bold transition-all duration-300 flex items-center gap-2 group/tab ${
              isActive
                ? 'text-sky-600 scale-105'
                : 'text-gray-400 hover:text-gray-700 hover:scale-105'
            }`}
          >
            <span className="relative">
              {tab.label}
              {/* Efecto de brillo en hover */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-200 to-transparent opacity-0 group-hover/tab:opacity-50 blur-sm transition-opacity duration-500"></span>
            </span>
            <span className={`text-xs font-black px-2.5 py-1 rounded-full transition-all duration-500 shadow-md group-hover/tab:scale-110 ${
              isActive
                ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-sky-500/50 animate-pulse'
                : 'bg-gray-200 text-gray-500 group-hover/tab:bg-gray-300'
            }`}>
              {count}
            </span>

            {/* Underline animada con gradiente */}
            <span
              className={`absolute bottom-0 left-0 h-[3px] rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-sky-600 transition-all duration-500 shadow-lg shadow-sky-500/50 ${
                isActive ? 'w-full' : 'w-0 group-hover/tab:w-1/2'
              }`}
            />
          </button>
        )
      })}
    </div>
  )
}

export default AgentAppointmentTabs