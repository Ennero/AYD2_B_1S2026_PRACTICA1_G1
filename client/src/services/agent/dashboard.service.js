const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const AgentDashboardService = {
  
// Metodo Get
  async getDashboardData() {
    try {
      // Logica para obtener datos del dashboard del agente (simulación)
      return {
        agent: {
          id: 1,
          firstName: 'Carlos',
          lastName: 'Méndez',
          email: 'carlos.mendez@homefinder.com',
          photo: '/images/logo-HomeFinder.png',
        },
        stats: {
          totalProperties: 12,
          propertiesLabel: 'Publicadas',
          pendingAppointments: 3,
          appointmentsLabel: 'Solicitudes Sin Respuesta',
          propertiesSold: 6,
          soldLabel: 'Vendidas',
        },
        searchByType: [
          { type: 'Casas', percentage: 50, color: '#1e3a5f' },
          { type: 'Apartamentos', percentage: 30, color: '#38bdf8' },
          { type: 'Terrenos', percentage: 20, color: '#ef4444' },
        ],
        offersByZone: [
          { zone: 'Zona 1', total: 16 },
          { zone: 'Zona 12', total: 21 },
          { zone: 'Zona 8', total: 18 },
          { zone: 'Zona 9', total: 24 },
          { zone: 'Zona 4', total: 12 },
        ],
      }
    } catch (error) {
      console.error('Error al obtener datos del dashboard:', error)
      throw error
    }
  },
}

export default AgentDashboardService
