const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

/**
 * PATRÓN COMMAND - GESTIÓN DE PROPIEDADES
 * Encapsula cada operación como un objeto Command independiente
 */

// Clase base Command
class PropertyCommand {
  execute() {
    throw new Error('El método execute() debe ser implementado')
  }
}

// Comando: Obtener propiedades con filtros
class GetPropertiesCommand extends PropertyCommand {
  constructor(apiUrl, filters = {}) {
    super()
    this.apiUrl = apiUrl
    this.filters = filters
  }

  async execute() {
    try {
      console.log('[PROPERTY] Obteniendo propiedades con filtros:', this.filters)
      
      const token = localStorage.getItem('authToken')
      if (!token) {
        throw new Error('No hay sesión activa')
      }

      // Preparar el body con los filtros opcionales del backend
      const requestBody = {}
      
      if (this.filters.searchQuery) {
        requestBody.title = this.filters.searchQuery
      }
      
      if (this.filters.propertyType) {
        // Mapear tipos del frontend al backend
        const typeMap = {
          'apartamento': 'APARTMENT',
          'casa': 'HOUSE',
          'loft': 'APARTMENT',
          'chalet': 'HOUSE',
          'terreno': 'LAND',
          'local': 'RETAIL SPACE'
        }
        requestBody.type = typeMap[this.filters.propertyType] || this.filters.propertyType.toUpperCase()
      }
      
      if (this.filters.maxPrice) {
        requestBody.price = this.filters.maxPrice
      }
      
      if (this.filters.bedrooms) {
        requestBody.rooms = this.filters.bedrooms
      }
      
      if (this.filters.bathrooms) {
        requestBody.bathrooms = this.filters.bathrooms
      }
      
      if (this.filters.minArea) {
        requestBody.meter = this.filters.minArea
      }
      
      // Ordenamiento
      if (this.filters.sortBy) {
        if (this.filters.sortBy === 'price-low') {
          requestBody.is_ascendent_price = true
        } else if (this.filters.sortBy === 'price-high') {
          requestBody.is_ascendent_price = false
        } else if (this.filters.sortBy === 'title-asc') {
          requestBody.is_ascendent_title = true
        } else if (this.filters.sortBy === 'title-desc') {
          requestBody.is_ascendent_title = false
        } else if (this.filters.sortBy === 'recent') {
          requestBody.is_ascendente_date = true
        } else if (this.filters.sortBy === 'area-low') {
          requestBody.is_ascendente_area = true
        } else if (this.filters.sortBy === 'area-high') {
          requestBody.is_ascendente_area = false
        }
      }

      console.log('[PROPERTY] Request body:', requestBody)

      const response = await fetch(`${this.apiUrl}/client/dashboard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
      })

      console.log('[PROPERTY] Response status:', response.status)
      const data = await response.json()
      console.log('[PROPERTY] Response data:', data)

      if (!response.ok) {
        throw new Error(data.message || 'Error al cargar propiedades')
      }

      // El backend puede devolver array directo o objeto {properties: [...]}
      const propertiesArray = Array.isArray(data) ? data : (data.properties || [])
      console.log('[PROPERTY] Array de propiedades:', propertiesArray.length)

      // Transformar datos del backend al formato del frontend
      const backendToFrontendTypeMap = {
        'APARTMENT': 'apartamento',
        'HOUSE': 'casa',
        'LAND': 'terreno',
        'RETAIL SPACE': 'local'
      }
      
      const properties = propertiesArray.map(prop => {
        return {
          id: prop.id_property,
          title: prop.title,
          price: prop.price,
          location: prop.address,
          zone: prop.zone,
          image: prop.url_img || '/images/home-background.png',
          bedrooms: prop.num_rooms ? Number(prop.num_rooms) : 0,
          bathrooms: prop.num_bathrooms ? Number(prop.num_bathrooms) : 0,
          area: prop.square_meters ? Number(prop.square_meters) : 0,
          isFavorite: prop.already_in_favorite === true, // Ser explícito con el valor booleano
          propertyType: backendToFrontendTypeMap[prop.type] || 'apartamento'
        }
      })

      console.log('[PROPERTY] Propiedades transformadas:', properties.length)
      console.log('[PROPERTY] Muestra de datos transformados:', properties.slice(0, 2))

      return {
        success: true,
        properties: properties,
        total: properties.length
      }
    } catch (error) {
      console.error('[PROPERTY] Error:', error)
      throw new Error(error.message || 'Error al cargar propiedades')
    }
  }
}

// Comando: Obtener propiedad por ID
class GetPropertyByIdCommand extends PropertyCommand {
  constructor(apiUrl, propertyId) {
    super()
    this.apiUrl = apiUrl
    this.propertyId = propertyId
  }

  async execute() {
    try {
      console.log('[PROPERTY] Obteniendo detalle de propiedad:', this.propertyId)
      
      const token = localStorage.getItem('authToken')
      if (!token) {
        throw new Error('No hay sesión activa')
      }

      const response = await fetch(`${this.apiUrl}/client/property/?id=${this.propertyId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      console.log('[PROPERTY] Response status:', response.status)
      const data = await response.json()
      console.log('[PROPERTY] Response data:', data)

      if (!response.ok) {
        throw new Error(data.message || 'Propiedad no encontrada')
      }

      // Transformar datos del backend al formato del frontend
      const backendToFrontendTypeMap = {
        'APARTMENT': 'Apartamento',
        'HOUSE': 'Casa',
        'LAND': 'Terreno',
        'RETAIL SPACE': 'Local Comercial'
      }

      // El backend retorna las imágenes como array de strings base64
      const images = data.image || []

      const property = {
        id: data.id_property,
        title: data.title,
        price: Number(data.price),
        location: data.address,
        zone: data.zone,
        propertyType: backendToFrontendTypeMap[data.type] || 'Casa',
        bedrooms: Number(data.num_rooms) || 0,
        bathrooms: Number(data.num_bathrooms) || 0,
        area: Number(data.square_meters) || 0,
        description: data.description || '',
        features: [], // El backend no retorna features, dejamos array vacío
        images: images.length > 0 ? images : ['/images/home-background.png'],
        isFavorite: data.already_in_favorite || false,
        agent: {
          name: data.estate_agent || 'Agente Inmobiliario',
          title: 'Agente Inmobiliario',
          phone: '+502 0000-0000', // El backend no retorna teléfono del agente
          email: 'contacto@homefinder.com', // El backend no retorna email del agente
          avatar: '/images/logo-HomeFinder.png'
        },
        amenities: {
          parking: 0,
          floors: 0,
          yearBuilt: new Date().getFullYear(),
          lotSize: Number(data.square_meters) || 0
        }
      }

      console.log('[PROPERTY] Propiedad transformada:', property)

      return {
        success: true,
        property: property
      }
    } catch (error) {
      console.error('[PROPERTY] Error:', error)
      throw error
    }
  }
}

// Comando: Buscar propiedades por texto
class SearchPropertiesCommand extends PropertyCommand {
  constructor(apiUrl, searchQuery) {
    super()
    this.apiUrl = apiUrl
    this.searchQuery = searchQuery
  }

  async execute() {
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // TODO: Implementar búsqueda real
      return {
        success: true,
        properties: [],
        total: 0
      }
    } catch (error) {
      throw new Error('Error en la búsqueda')
    }
  }
}

// Comando: Toggle favorito
class ToggleFavoriteCommand extends PropertyCommand {
  constructor(apiUrl, propertyId) {
    super()
    this.apiUrl = apiUrl
    this.propertyId = propertyId
  }

  async execute() {
    try {
      console.log('[PROPERTY] Toggle favorito para propiedad:', this.propertyId)
      
      const token = localStorage.getItem('authToken')
      if (!token) {
        throw new Error('No hay sesión activa')
      }

      const response = await fetch(`${this.apiUrl}/client/property/favorite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          id_property: this.propertyId
        })
      })

      const data = await response.json()

      if (response.status === 400 && data.details?.includes('already in favorites')) {
        return {
          success: true,
          message: 'Favorito actualizado',
          shouldRemove: true 
        }
      }

      if (!response.ok) {
        throw new Error(data.message || 'Error al actualizar favorito')
      }

      // Si la respuesta es exitosa, significa que se AGREGÓ a favoritos
      return {
        success: true,
        message: data.message || 'Favorito actualizado',
        shouldRemove: false // Se agregó, no se removió
      }
    } catch (error) {
      console.error('[PROPERTY] Error:', error)
      throw error
    }
  }
}

// Comando: Obtener favoritos
class GetFavoritesCommand extends PropertyCommand {
  constructor(apiUrl) {
    super()
    this.apiUrl = apiUrl
  }

  async execute() {
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      
      
      return {
        success: true,
        properties: [],
        total: 0
      }
    } catch (error) {
      throw new Error('Error al cargar favoritos')
    }
  }
}

// Comando: Solicitar cita
class RequestAppointmentCommand extends PropertyCommand {
  constructor(apiUrl, propertyId, appointmentData) {
    super()
    this.apiUrl = apiUrl
    this.propertyId = propertyId
    this.appointmentData = appointmentData
  }

  async execute() {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // TODO: Implementar llamada real al backend
      return {
        success: true,
        appointment: {
          id: Date.now(),
          propertyId: this.propertyId,
          status: 'pending_agent',
          ...this.appointmentData,
          createdAt: new Date().toISOString()
        }
      }
    } catch (error) {
      throw error
    }
  }
}

// Invoker con historial de comandos
class PropertyCommandInvoker {
  constructor() {
    this.history = []
  }

  async executeCommand(command) {
    const result = await command.execute()
    this.history.push({
      command: command.constructor.name,
      timestamp: new Date().toISOString(),
      params: command
    })
    return result
  }

  getHistory() {
    return this.history
  }

  clearHistory() {
    this.history = []
  }
}

// Servicio que usa el patrón Command
const propertyService = {
  invoker: new PropertyCommandInvoker(),

  async getProperties(filters = {}) {
    const command = new GetPropertiesCommand(API_URL, filters)
    return await this.invoker.executeCommand(command)
  },

  async getPropertyById(propertyId) {
    const command = new GetPropertyByIdCommand(API_URL, propertyId)
    return await this.invoker.executeCommand(command)
  },

  async searchProperties(searchQuery) {
    const command = new SearchPropertiesCommand(API_URL, searchQuery)
    return await this.invoker.executeCommand(command)
  },

  async toggleFavorite(propertyId) {
    const command = new ToggleFavoriteCommand(API_URL, propertyId)
    return await this.invoker.executeCommand(command)
  },

  async getFavorites() {
    const command = new GetFavoritesCommand(API_URL)
    return await this.invoker.executeCommand(command)
  },

  async requestAppointment(propertyId, appointmentData) {
    const command = new RequestAppointmentCommand(API_URL, propertyId, appointmentData)
    return await this.invoker.executeCommand(command)
  }
}

export default propertyService

export {
  PropertyCommand,
  GetPropertiesCommand,
  GetPropertyByIdCommand,
  SearchPropertiesCommand,
  ToggleFavoriteCommand,
  GetFavoritesCommand,
  RequestAppointmentCommand,
  PropertyCommandInvoker
}
