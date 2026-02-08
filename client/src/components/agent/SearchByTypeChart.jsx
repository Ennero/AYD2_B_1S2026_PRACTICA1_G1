/**
 * Componente presentacional - Gráfico de dona de Búsquedas por Tipo
 * Muestra el top 3 de tipos de inmuebles más buscados con dona SVG de grosor variable
 * @param {Array} data - Array con { type, percentage, color }
 */
const SearchByTypeChart = ({ data = [] }) => {
  const size = 180 // Tamaño del SVG aumentado
  const center = size / 2
  const radius = 65 // Radio base aumentado

  // Ordenar de mayor a menor para asignar grosores
  const sortedData = [...data].sort((a, b) => b.percentage - a.percentage)

  // Asignar grosor según posición: más alto = más grueso
  const getStrokeWidth = (index) => {
    if (index === 0) return 32
    if (index === 1) return 24
    return 16
  }

  // Calcular círculos SVG
  let accumulatedPercentage = 0
  const circles = sortedData.map((item, index) => {
    const strokeWidth = getStrokeWidth(index)
    const circumference = 2 * Math.PI * radius
    const dashArray = (item.percentage / 100) * circumference
    const dashOffset = -accumulatedPercentage * circumference / 100
    
    accumulatedPercentage += item.percentage
    
    return {
      ...item,
      strokeWidth,
      dashArray,
      dashOffset,
      circumference,
    }
  })

  return (
    <div
      className="bg-white/80 backdrop-blur-sm rounded-2xl border border-sky-200 p-6 transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 group animate-fadeInUp"
      style={{
        transformStyle: 'preserve-3d',
        boxShadow: '0 8px 30px rgba(14, 165, 233, 0.1)',
        animationDelay: '300ms',
      }}
    >
      {/* Header */}
      <h3 className="text-xl font-bold text-gray-900 mb-1">Búsquedas por tipo</h3>
      <p className="text-sm text-gray-500 mb-6">Top 3 tipos de inmuebles más buscados</p>

      <div className="flex items-center gap-8">
        {/* Dona SVG con grosor variable */}
        <div className="relative flex-shrink-0">
          <svg 
            width={size} 
            height={size} 
            viewBox={`0 0 ${size} ${size}`}
            className="transform -rotate-90 transition-transform duration-500 group-hover:rotate-[-75deg]"
          >
            {circles.map((circle, index) => (
              <circle
                key={circle.type}
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={circle.color}
                strokeWidth={circle.strokeWidth}
                strokeDasharray={`${circle.dashArray} ${circle.circumference}`}
                strokeDashoffset={circle.dashOffset}
                strokeLinecap="butt"
                className="transition-all duration-700"
                style={{
                  animationDelay: `${300 + index * 100}ms`,
                }}
              />
            ))}
          </svg>
        </div>

        {/* Leyenda */}
        <div className="flex flex-col gap-4 flex-1">
          {data.map((item, index) => (
            <div
              key={item.type}
              className="flex items-center gap-3 animate-slideInRight"
              style={{ animationDelay: `${400 + index * 100}ms` }}
            >
              <div className="flex items-center gap-2 min-w-[130px]">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm font-semibold text-gray-700">{item.type}</span>
              </div>
              {/* Barra de progreso */}
              <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor: item.color,
                  }}
                ></div>
              </div>
              <span className="text-sm font-bold text-gray-900 min-w-[40px] text-right">
                {item.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchByTypeChart
