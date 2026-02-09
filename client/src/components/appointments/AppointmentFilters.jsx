/**
 * Componente presentacional para filtros de citas
 */
const AppointmentFilters = ({ activeFilter, onFilterChange, counts }) => {
  const filters = [
    { id: 'all', label: 'Todas', count: counts.all },
    { id: 'pending', label: 'Pendientes', count: counts.pending },
    { id: 'pending_user', label: 'Por Confirmar', count: counts.pending_user },
    { id: 'finalized', label: 'Finalizadas', count: counts.finalized }
  ]

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-105 ${
            activeFilter === filter.id
              ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg hover:from-orange-600 hover:to-orange-700'
              : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-orange-400 hover:text-orange-600'
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {filter.label} ({filter.count})
        </button>
      ))}
    </div>
  )
}

export default AppointmentFilters
