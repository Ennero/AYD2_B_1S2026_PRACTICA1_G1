const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// Clase Base Comando
class PropertyCommand {
  execute() {
    throw new Error('El método execute() debe ser implementado')
  }
}

// Comando Get
class GetPropertiesCommand extends PropertyCommand {
  constructor(apiUrl) {
    super()
    this.apiUrl = apiUrl
  }

  async execute() {
    try {
      //Logica para obtener propiedades del agente (simulación)
      return [
        {
          id: 1,
          title: 'Casa Residencial en Zona 10',
          propertyType: 'Casa',
          zone: 'Zona 10',
          address: 'Avenida Las Américas 15-30',
          price: 1250000,
          status: 'Disponible',
          bedrooms: 4,
          bathrooms: 3,
          area: 280,
          description: 'Hermosa casa residencial con acabados de lujo, amplio jardín, cocina moderna y sala de estar con doble altura. Ubicada en una de las zonas más exclusivas de la ciudad.',
          images: [
            '/images/logo-HomeFinder.png',
            '/images/logo-HomeFinder.png',
            '/images/logo-HomeFinder.png',
          ],
          createdAt: '2026-01-15',
        },
        {
          id: 2,
          title: 'Apartamento Moderno Zona 14',
          propertyType: 'Apartamento',
          zone: 'Zona 14',
          address: 'Boulevard Vista Hermosa 8-50',
          price: 850000,
          status: 'Disponible',
          bedrooms: 3,
          bathrooms: 2,
          area: 150,
          description: 'Apartamento moderno con vista panorámica, acabados contemporáneos, área social y parqueo para 2 vehículos. Incluye acceso a gimnasio y piscina.',
          images: [
            '/images/logo-HomeFinder.png',
            '/images/logo-HomeFinder.png',
          ],
          createdAt: '2026-01-20',
        },
        {
          id: 3,
          title: 'Terreno en Carretera a El Salvador',
          propertyType: 'Terreno',
          zone: 'Zona 16',
          address: 'Km 18.5 Carretera a El Salvador',
          price: 500000,
          status: 'Disponible',
          bedrooms: 0,
          bathrooms: 0,
          area: 1200,
          description: 'Terreno plano con excelente ubicación, ideal para proyecto residencial o comercial. Cuenta con acceso a servicios básicos y vías principales.',
          images: [
            '/images/logo-HomeFinder.png',
          ],
          createdAt: '2026-02-01',
        },
        {
          id: 4,
          title: 'Local Comercial Centro Histórico',
          propertyType: 'Local Comercial',
          zone: 'Zona 1',
          address: '6ta Avenida 9-15',
          price: 320000,
          status: 'No Disponible',
          bedrooms: 0,
          bathrooms: 1,
          area: 95,
          description: 'Local comercial en pleno centro histórico, ideal para restaurante o tienda. Alto flujo peatonal, cuenta con instalaciones eléctricas y sanitarias completas.',
          images: [
            '/images/logo-HomeFinder.png',
            '/images/logo-HomeFinder.png',
          ],
          createdAt: '2026-02-05',
        },
        {
          id: 5,
          title: 'Casa en Condominio Zona 16',
          propertyType: 'Casa',
          zone: 'Zona 16',
          address: 'Condominio Los Eucaliptos Lote 12',
          price: 1800000,
          status: 'Vendido',
          bedrooms: 5,
          bathrooms: 4,
          area: 350,
          description: 'Casa en exclusivo condominio con seguridad 24/7, amplios jardines, piscina privada, 3 niveles y acabados premium. Área de servicio completa.',
          images: [
            '/images/logo-HomeFinder.png',
            '/images/logo-HomeFinder.png',
            '/images/logo-HomeFinder.png',
          ],
          createdAt: '2026-01-10',
        },
        {
          id: 6,
          title: 'Apartamento Estudiantil Zona 12',
          propertyType: 'Apartamento',
          zone: 'Zona 12',
          address: 'Colonia Monte María 3-25',
          price: 450000,
          status: 'Disponible',
          bedrooms: 2,
          bathrooms: 1,
          area: 75,
          description: 'Apartamento ideal para estudiantes o profesionales jóvenes, cerca de universidades y centros comerciales. Incluye un parqueo.',
          images: [
            '/images/logo-HomeFinder.png',
          ],
          createdAt: '2026-02-10',
        },
      ]
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

  async getProperties() {
    const command = new GetPropertiesCommand(API_URL)
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
