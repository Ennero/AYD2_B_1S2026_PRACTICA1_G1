import { useState, useEffect, useCallback } from 'react'
import { DashboardHeader, StatsCards, SearchByTypeChart, OffersByZoneChart } from '../../components/agent'
import { AgentDashboardService } from '../../services/agent'
import toast from 'react-hot-toast'

// Contenedor principal para el dashboard
const AgentDashboardContainer = () => {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true)
      const data = await AgentDashboardService.getDashboardData()
      setDashboardData(data)
    } catch (error) {
      toast.error('Error al cargar el dashboard')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadDashboard()
  }, [loadDashboard])

  return (
    <div
      className="min-h-screen pt-44 pb-16 relative bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('/images/agent-background.png')",
      }}
    >
      {/* Overlay sutil */}
      <div className="absolute inset-0 bg-white/25 backdrop-blur-[2px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {loading ? (
          <div className="flex items-center justify-center py-32 animate-fadeIn">
            <div className="text-center">
              <div className="inline-block p-8 bg-white/90 rounded-3xl shadow-2xl backdrop-blur-sm">
                <div className="w-14 h-14 border-4 border-sky-200 border-t-sky-500 rounded-full animate-spin mx-auto mb-5"></div>
                <p className="text-gray-600 font-semibold text-lg">Cargando dashboard...</p>
              </div>
            </div>
          </div>
        ) : dashboardData ? (
          <div className="space-y-10">
            {/* Header de bienvenida */}
            <DashboardHeader
              firstName={dashboardData.agent.firstName}
              lastName={dashboardData.agent.lastName}
            />

            {/* Tarjetas de estadísticas */}
            <StatsCards stats={dashboardData.stats} />

            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SearchByTypeChart data={dashboardData.searchByType} />
              <OffersByZoneChart data={dashboardData.offersByZone} />
            </div>
          </div>
        ) : (
          <div className="text-center py-32 animate-fadeInUp">
            <div className="inline-block p-10 bg-white rounded-3xl shadow-xl">
              <p className="text-gray-500 text-lg">No se pudieron cargar los datos del dashboard.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AgentDashboardContainer
