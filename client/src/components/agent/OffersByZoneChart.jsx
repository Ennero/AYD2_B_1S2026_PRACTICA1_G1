/**
 * Componente presentacional - Gráfico de barras de Ofertas por Zonas
 * Muestra el top 5 de zonas con mayor oferta inmobiliaria
 * @param {Array} data - Array con { zone, total }
 */
const OffersByZoneChart = ({ data = [] }) => {
  // Ordenar de mayor a menor
  const sortedData = [...data].sort((a, b) => b.total - a.total)
  
  // Calcular el máximo para escalar las barras
  const maxValue = Math.max(...sortedData.map((d) => d.total), 1)

  // Colores para las barras (gradiente de celeste)
  const barColors = [
    'bg-gradient-to-t from-sky-400 to-sky-500',
    'bg-gradient-to-t from-cyan-400 to-cyan-500',
    'bg-gradient-to-t from-sky-500 to-sky-600',
    'bg-gradient-to-t from-cyan-500 to-cyan-600',
    'bg-gradient-to-t from-rose-400 to-rose-500',
  ]

  return (
    <div
      className="bg-white/80 backdrop-blur-sm rounded-2xl border border-sky-200 p-6 transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 group animate-fadeInUp"
      style={{
        transformStyle: 'preserve-3d',
        boxShadow: '0 8px 30px rgba(14, 165, 233, 0.1)',
        animationDelay: '450ms',
      }}
    >
      {/* Header */}
      <h3 className="text-xl font-bold text-gray-900 mb-1">Ofertas por Zonas</h3>
      <p className="text-sm text-gray-500 mb-6">Top 5 zonas con mayor oferta inmobiliaria</p>

      {/* Gráfico de barras */}
      <div className="flex items-end justify-between gap-6 h-56 mt-8">
        {sortedData.map((item, zoneIndex) => {
          const height = Math.max((item.total / maxValue) * 100, 10)
          return (
            <div
              key={item.zone}
              className="flex-1 flex flex-col items-center gap-2"
            >
              {/* Barra individual */}
              <div className="w-full h-48 flex items-end justify-center">
                <div
                  className={`${barColors[zoneIndex % barColors.length]} rounded-t-xl w-full transition-all duration-700 ease-out hover:opacity-90 hover:scale-105 relative group/bar cursor-default shadow-lg`}
                  style={{
                    height: `${height}%`,
                    animationDelay: `${500 + zoneIndex * 100}ms`,
                  }}
                >
                  {/* Valor en la barra */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2">
                    <span className="text-white font-bold text-sm drop-shadow-md">
                      {item.total}
                    </span>
                  </div>
                  {/* Tooltip en hover */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover/bar:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-10 shadow-xl">
                    Total: {item.total} propiedades
                  </div>
                </div>
              </div>
              {/* Label zona */}
              <p className="text-xs font-bold text-gray-700 text-center truncate w-full">
                {item.zone}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default OffersByZoneChart
