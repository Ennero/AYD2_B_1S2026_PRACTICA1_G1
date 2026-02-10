const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const AgentDashboardService = {
  
  // Método Get - Obtiene datos del dashboard del agente desde el endpoint real
  async getDashboardData() {
    try {
      const token = localStorage.getItem('authToken')
      
      if (!token) {
        throw new Error('No se encontró token de autenticación')
      }

      const response = await fetch(`${API_URL}/agent/dashboard`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()

      // Transformar datos del API al formato esperado por los componentes
      return this.transformDashboardData(data)
    } catch (error) {
      console.error('Error al obtener datos del dashboard:', error)
      throw error
    }
  },

  // Transforma los datos del API al formato del frontend
  transformDashboardData(apiData) {
    // Colores para los tipos de propiedades
    const typeColors = ['#1e3a5f', '#38bdf8', '#ef4444', '#10b981', '#f59e0b']
    
    // Calcular total de búsquedas para obtener porcentajes
    const totalSearches = apiData.most_searched.reduce((sum, item) => sum + item.value, 0)
    
    // Transformar most_searched a formato { type, percentage, color }
    const searchByType = apiData.most_searched.map((item, index) => ({
      type: item.type,
      percentage: totalSearches > 0 ? Math.round((item.value / totalSearches) * 100) : 0,
      color: typeColors[index % typeColors.length]
    }))

    // Transformar most_offered_zones a formato { zone: "Zona X", total }
    const offersByZone = apiData.most_offered_zones.map(item => ({
      zone: `Zona ${item.zone}`,
      total: item.value
    }))

    return {
      agent: {
        id: null,
        firstName: '',
        lastName: '',
        email: '',
        photo: '/images/logo-HomeFinder.png',
      },
      stats: {
        totalProperties: apiData.total_properties,
        propertiesLabel: 'Publicadas',
        pendingAppointments: apiData.pending_appointments,
        appointmentsLabel: 'Solicitudes Sin Respuesta',
        propertiesSold: apiData.sold_properties,
        soldLabel: 'Vendidas',
      },
      searchByType,
      offersByZone,
    }
  },
}

export default AgentDashboardService
