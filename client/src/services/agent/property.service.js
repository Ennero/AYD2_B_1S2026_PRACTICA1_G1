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
  'RETAIL SPACE': 'Local Comercial',
  // Agregar mapeo directo por si el backend envía en español
  'Casa': 'Casa',
  'Apartamento': 'Apartamento',
  'Terreno': 'Terreno',
  'Local Comercial': 'Local Comercial'
}

// Mapeo de estados: Backend -> Frontend
const STATE_MAP = {
  'AVAILABLE': 'Disponible',
  'UNAVAILABLE': 'No Disponible',
  'NOT_AVAILABLE': 'No Disponible',
  'NOT AVAILABLE': 'No Disponible',
  'SOLD': 'Vendido',
  // Agregar mapeo directo por si el backend envía en español
  'Disponible': 'Disponible',
  'No Disponible': 'No Disponible',
  'Vendido': 'Vendido'
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
  constructor(apiUrl, propertyData) {
    super()
    this.apiUrl = apiUrl
    this.propertyData = propertyData
  }

  // Transforma los datos del frontend al formato del backend
  buildPropertyBody() {
    // Extraer la zona sin el prefijo "Zona" si existe - solo números
    let zoneValue = this.propertyData.zone
    if (typeof zoneValue === 'string') {
      // Remover cualquier texto y dejar solo números
      zoneValue = zoneValue.replace(/[^\d]/g, '').trim()
    }

    // Convertir imágenes a base64 (ya vienen en base64 desde el modal)
    const imagesBase64 = this.propertyData.images.map(img => {
      // Si la imagen ya es base64, extraer solo la parte después de la coma
      if (typeof img === 'string' && img.includes('base64,')) {
        return img.split('base64,')[1]
      }
      return img
    })

    // Asegurar al menos una imagen
    if (imagesBase64.length === 0) {
      throw new Error('Se requiere al menos una imagen')
    }

    const body = {
      title: this.propertyData.title,
      type: this.propertyData.propertyType, // Casa, Apartamento, Terreno, Local Comercial
      address: this.propertyData.address,
      zone: zoneValue,
      price: Number(this.propertyData.price),
      num_rooms: Number(this.propertyData.bedrooms),
      num_bathrooms: Number(this.propertyData.bathrooms),
      square_meters: parseFloat(this.propertyData.area), // Puede ser decimal
      state: this.propertyData.status, // Disponible, No Disponible, Vendido
      description: this.propertyData.description,
      images: imagesBase64
    }

    console.log('Body que se enviará al backend:', body)
    console.log('Número de imágenes:', imagesBase64.length)
    console.log('Primera imagen (preview):', imagesBase64[0]?.substring(0, 50) + '...')
    return body
  }

  async execute() {
    try {
      const token = localStorage.getItem('authToken')
      
      if (!token) {
        throw new Error('No se encontró token de autenticación')
      }

      const propertyBody = this.buildPropertyBody()

      console.log('🚀 Enviando petición POST a /agent/properties')
      
      const response = await fetch(`${this.apiUrl}/agent/properties`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(propertyBody)
      })

      console.log('📥 Respuesta del servidor:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('Error del servidor:', errorData)
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()
      console.log('Propiedad creada exitosamente:', result)

      // Retornar la propiedad creada con el ID del servidor
      return {
        id: result.id_property,
        ...this.propertyData,
        createdAt: new Date().toISOString().split('T')[0],
      }
    } catch (error) {
      console.error('Error al crear propiedad:', error)
      throw error
    }
  }
}

// Comando para obtener detalle de una propiedad
class GetPropertyDetailCommand extends PropertyCommand {
  constructor(apiUrl, propertyId) {
    super()
    this.apiUrl = apiUrl
    this.propertyId = propertyId
  }

  // Transforma la respuesta del backend al formato del frontend
  transformPropertyDetail(apiProperty) {
    console.log('Transformando datos de propiedad:', apiProperty)
    
    // Extraer URLs de las imágenes
    const imageUrls = apiProperty.images?.map(img => img.url_img) || ['/images/logo-HomeFinder.png']

    const transformed = {
      id: apiProperty.id_property,
      title: apiProperty.title,
      propertyType: PROPERTY_TYPE_REVERSE_MAP[apiProperty.type] || apiProperty.type,
      zone: apiProperty.zone ? `Zona ${apiProperty.zone}` : apiProperty.zone,
      address: apiProperty.address,
      price: Number(apiProperty.price) || 0,
      status: STATE_MAP[apiProperty.state] || apiProperty.state,
      bedrooms: apiProperty.num_rooms || 0,
      bathrooms: apiProperty.num_bathrooms || 0,
      area: apiProperty.square_meters || 0,
      description: apiProperty.description || '',
      createdAt: apiProperty.created_at || new Date().toISOString().split('T')[0],
      images: imageUrls,
    }
    
    console.log('Datos transformados:', transformed)
    return transformed
  }

  async execute() {
    try {
      const token = localStorage.getItem('authToken')
      
      if (!token) {
        throw new Error('No se encontró token de autenticación')
      }

      console.log(`Obteniendo detalle de propiedad ID: ${this.propertyId}`)

      const response = await fetch(`${this.apiUrl}/agent/properties/${this.propertyId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      console.log('Respuesta del servidor:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      })

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()
      console.log('Detalle de propiedad obtenido (completo):', result)
      
      // La respuesta viene con estructura { ok: true, data: {...} }
      const propertyData = result.data || result
      console.log('Property Data extraído:', propertyData)
      console.log('Valores específicos:', {
        num_rooms: propertyData.num_rooms,
        num_bathrooms: propertyData.num_bathrooms,
        square_meters: propertyData.square_meters
      })
      
      // Transformar al formato del frontend
      const transformed = this.transformPropertyDetail(propertyData)
      console.log('Resultado final transformado:', transformed)
      return transformed
    } catch (error) {
      console.error('Error al obtener detalle de propiedad:', error)
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

  async getPropertyDetail(propertyId) {
    const command = new GetPropertyDetailCommand(API_URL, propertyId)
    return await this.invoker.executeCommand(command)
  },

  async createProperty(propertyData) {
    const command = new CreatePropertyCommand(API_URL, propertyData)
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
  GetPropertyDetailCommand,
  CreatePropertyCommand,
  UpdatePropertyCommand,
  DeletePropertyCommand,
  PropertyCommandInvoker,
}
