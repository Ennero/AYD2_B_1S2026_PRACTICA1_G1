import { Home, CalendarClock, BadgeCheck } from 'lucide-react'

/**
 * Componente presentacional - Tarjetas de estadísticas del Dashboard
 * Muestra las 3 métricas principales del agente
 * @param {Object} stats - Objeto con las estadísticas
 */
const StatsCards = ({ stats = {} }) => {
  const cards = [
    {
      title: 'Total Propiedades',
      value: stats.totalProperties ?? 0,
      subtitle: stats.propertiesLabel ?? 'Publicadas',
      icon: Home,
      gradient: 'from-sky-400 to-sky-500',
      bgLight: 'bg-sky-50',
      borderColor: 'border-sky-200',
      textColor: 'text-sky-700',
      iconBg: 'bg-sky-100',
      shadowColor: 'rgba(14, 165, 233, 0.15)',
    },
    {
      title: 'Citas Pendientes',
      value: stats.pendingAppointments ?? 0,
      subtitle: stats.appointmentsLabel ?? 'Solicitudes Sin Respuesta',
      icon: CalendarClock,
      gradient: 'from-emerald-400 to-emerald-500',
      bgLight: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      textColor: 'text-emerald-700',
      iconBg: 'bg-emerald-100',
      shadowColor: 'rgba(16, 185, 129, 0.15)',
    },
    {
      title: 'Propiedades Vendidas',
      value: stats.propertiesSold ?? 0,
      subtitle: stats.soldLabel ?? 'Vendidas',
      icon: BadgeCheck,
      gradient: 'from-violet-400 to-violet-500',
      bgLight: 'bg-violet-50',
      borderColor: 'border-violet-200',
      textColor: 'text-violet-700',
      iconBg: 'bg-violet-100',
      shadowColor: 'rgba(139, 92, 246, 0.15)',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <div
            key={card.title}
            className={`relative bg-white/80 backdrop-blur-sm rounded-2xl border ${card.borderColor} p-6 transform transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 group cursor-default animate-fadeInUp`}
            style={{
              animationDelay: `${index * 150}ms`,
              transformStyle: 'preserve-3d',
              boxShadow: `0 8px 30px ${card.shadowColor}`,
            }}
          >
            {/* Shimmer en hover */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>

            <div className="relative z-10">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">{card.title}</p>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-5xl font-black text-gray-900 mb-1 transition-all duration-300 group-hover:scale-105 origin-left">
                    {card.value}
                  </p>
                  <p className={`text-sm font-medium ${card.textColor}`}>
                    {card.subtitle}
                  </p>
                </div>
                <div className={`p-4 ${card.iconBg} rounded-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                  <Icon className={`w-8 h-8 ${card.textColor}`} />
                </div>
              </div>

              {/* Barra decorativa inferior */}
              <div className="mt-4 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${card.gradient} rounded-full transition-all duration-1000 group-hover:w-full`}
                  style={{ width: '70%' }}
                ></div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default StatsCards
