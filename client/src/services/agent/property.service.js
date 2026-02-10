const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// Mapeo de tipos de propiedades: Frontend -> Backend
const PROPERTY_TYPE_MAP = {
  'Casa': 'HOUSE',
  'Apartamento': 'APARTMENT',
  'Terreno': 'LAND',
  'Local Comercial': 'RETAIL SPACE'
}

// Mapeo inverso: Backend -> Frontend
const PROPERTY_TYPE_REVERSE_MAP = {
  'HOUSE': 'Casa',
  'APARTMENT': 'Apartamento',
  'LAND': 'Terreno',
  'RETAIL SPACE': 'Local Comercial'
}

// Mapeo de estados: Backend -> Frontend
const STATE_MAP = {
  'AVAILABLE': 'Disponible',
  'UNAVAILABLE': 'No Disponible',
  'SOLD': 'Vendido'
}

// Clase Base Comando
class PropertyCommand {
  execute() {
    throw new Error('El método execute() debe ser implementado')
  }
}

// Comando Get con filtros
class GetPropertiesCommand extends PropertyCommand {
  constructor(apiUrl, filters = {}) {
    super()
    this.apiUrl = apiUrl
    this.filters = filters
  }

  // Construye el body de filtros para el backend
  buildFilterBody() {
    const body = {}

    // Título
    if (this.filters.title) {
      body.title = this.filters.title
    }

    // Tipo de propiedad
    if (this.filters.propertyType) {
      body.type = PROPERTY_TYPE_MAP[this.filters.propertyType] || this.filters.propertyType
    }

    // Precio
    if (this.filters.price) {
      body.price = Number(this.filters.price)
    }

    // Habitaciones
    if (this.filters.bedrooms) {
      body.rooms = Number(this.filters.bedrooms)
    }

    // Baños
    if (this.filters.bathrooms) {
      body.bathrooms = Number(this.filters.bathrooms)
    }

    // Metros cuadrados
    if (this.filters.area) {
      body.meter = Number(this.filters.area)
    }

    // Ordenamiento por precio
    if (this.filters.sortPriceLow) {
      body.is_ascendent_price = true
    } else if (this.filters.sortPriceHigh) {
      body.is_ascendent_price = false
    }

    // Ordenamiento por título
    if (this.filters.sortTitleAsc) {
      body.is_ascendent_title = true
    } else if (this.filters.sortTitleDesc) {
      body.is_ascendent_title = false
    }

    return body
  }

  // Transforma la respuesta del backend al formato del frontend
  transformProperty(apiProperty) {
    return {
      id: apiProperty.id_property,
      title: apiProperty.title,
      propertyType: PROPERTY_TYPE_REVERSE_MAP[apiProperty.type] || apiProperty.type,
      zone: apiProperty.zone ? `Zona ${apiProperty.zone}` : apiProperty.zone,
      address: apiProperty.address,
      price: Number(apiProperty.price) || 0,
      status: STATE_MAP[apiProperty.state] || apiProperty.state,
      images: apiProperty.url_img ? [apiProperty.url_img] : ['/images/logo-HomeFinder.png'],
      // Campos adicionales para compatibilidad con los modales
      bedrooms: 0,
      bathrooms: 0,
      area: 0,
      description: '',
      createdAt: new Date().toISOString().split('T')[0],
    }
  }

  async execute() {
    try {
      const token = localStorage.getItem('authToken')
      
      if (!token) {
        throw new Error('No se encontró token de autenticación')
      }

      const filterBody = this.buildFilterBody()

      const response = await fetch(`${this.apiUrl}/agent/filter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(filterBody)
      })

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      
      // Transformar cada propiedad al formato del frontend
      return data.map(prop => this.transformProperty(prop))
    } catch (error) {
      console.error('Error al obtener propiedades:', error)
      throw error
    }
  }
}

// Comando Post
class CreatePropertyCommand extends PropertyCommand {
  constructor(apiUrl, propertyData, existingProperties = []) {
    super()
    this.apiUrl = apiUrl
    this.propertyData = propertyData
    this.existingProperties = existingProperties
  }

  async execute() {
    try {
      // Logica para crear una nueva propiedad (simulación)

      // Calcular el próximo ID secuencial
      const maxId = this.existingProperties.length > 0
        ? Math.max(...this.existingProperties.map(p => p.id))
        : 0
      const nextId = maxId + 1

      // Simulación de creación
      return {
        id: nextId,
        ...this.propertyData,
        images: this.propertyData.images || ['/images/logo-HomeFinder.png'],
        createdAt: new Date().toISOString().split('T')[0],
      }
    } catch (error) {
      console.error('Error al crear propiedad:', error)
      throw error
    }
  }
}

// Comando Put
class UpdatePropertyCommand extends PropertyCommand {
  constructor(apiUrl, propertyId, propertyData) {
    super()
    this.apiUrl = apiUrl
    this.propertyId = propertyId
    this.propertyData = propertyData
  }

  async execute() {
    try {
      // Logica para actualizar una propiedad (simulación)
      return {
        id: this.propertyId,
        ...this.propertyData,
      }
    } catch (error) {
      console.error('Error al actualizar propiedad:', error)
      throw error
    }
  }
}

// Comando Delete
class DeletePropertyCommand extends PropertyCommand {
  constructor(apiUrl, propertyId) {
    super()
    this.apiUrl = apiUrl
    this.propertyId = propertyId
  }

  async execute() {
    try {
      // Logica para eliminar una propiedad (simulación)
      return { success: true, deletedId: this.propertyId }
    } catch (error) {
      console.error('Error al eliminar propiedad:', error)
      throw error
    }
  }
}

// Invocador del patron
class PropertyCommandInvoker {
  constructor() {
    this.history = []
  }

  async executeCommand(command) {
    const result = await command.execute()
    this.history.push(command)
    return result
  }

  getHistory() {
    return this.history
  }
}

const AgentPropertyService = {
  invoker: new PropertyCommandInvoker(),

  async getProperties(filters = {}) {
    const command = new GetPropertiesCommand(API_URL, filters)
    return await this.invoker.executeCommand(command)
  },

  async createProperty(propertyData, existingProperties = []) {
    const command = new CreatePropertyCommand(API_URL, propertyData, existingProperties)
    return await this.invoker.executeCommand(command)
  },

  async updateProperty(propertyId, propertyData) {
    const command = new UpdatePropertyCommand(API_URL, propertyId, propertyData)
    return await this.invoker.executeCommand(command)
  },

  async deleteProperty(propertyId) {
    const command = new DeletePropertyCommand(API_URL, propertyId)
    return await this.invoker.executeCommand(command)
  },
}

export default AgentPropertyService

export {
  PropertyCommand,
  GetPropertiesCommand,
  CreatePropertyCommand,
  UpdatePropertyCommand,
  DeletePropertyCommand,
  PropertyCommandInvoker,
}
