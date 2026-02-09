const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const MOCK_PROPERTIES = [
  {
    id: 1,
    title: 'Apartamento de Lujo en Malasaña',
    price: 850000,
    location: 'Calle Gran Vía, Madrid',
    image: '/images/register-background.jpg',
    bedrooms: 4,
    bathrooms: 3,
    area: 320,
    isFavorite: true,
    hasAppointment: true,
    views: 150,
    favorites: 25,
    createdAt: '2026-02-01',
    propertyType: 'apartamento',
    zone: 'malasaña',
    description: 'Espectacular apartamento de lujo completamente renovado',
    features: ['Terraza', 'Garaje', 'Ascensor', 'Aire acondicionado'],
    agent: {
      id: 1,
      name: 'María González',
      email: 'maria@agency.com',
      phone: '+34 600 123 456'
    }
  },
  {
    id: 2,
    title: 'Loft Moderno Centro',
    price: 450000,
    location: 'Malasaña, Madrid',
    image: '/images/login-background.jpg',
    bedrooms: 2,
    bathrooms: 2,
    area: 115,
    isFavorite: true,
    hasAppointment: false,
    views: 200,
    favorites: 40,
    createdAt: '2026-02-03',
    propertyType: 'loft',
    zone: 'centro',
    description: 'Loft de diseño en el corazón de Madrid',
    features: ['Doble altura', 'Cocina integrada', 'Luz natural'],
    agent: {
      id: 2,
      name: 'Carlos Ramírez',
      email: 'carlos@agency.com',
      phone: '+34 600 234 567'
    }
  },
  {
    id: 3,
    title: 'Casa Familiar con Jardín',
    price: 320000,
    location: 'Retiro de Alarcón',
    image: '/images/home-background.png',
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    isFavorite: false,
    hasAppointment: false,
    views: 80,
    favorites: 10,
    createdAt: '2026-01-28',
    propertyType: 'casa',
    zone: 'retiro',
    description: 'Casa familiar con amplio jardín y zona de juegos',
    features: ['Jardín', 'Garaje doble', 'Chimenea', 'Sótano'],
    agent: {
      id: 3,
      name: 'Ana Martínez',
      email: 'ana@agency.com',
      phone: '+34 600 345 678'
    }
  },
  {
    id: 4,
    title: 'Ático de Diseño en Retiro',
    price: 675000,
    location: 'Barrio de Salamanca',
    image: '/images/register-background.jpg',
    bedrooms: 4,
    bathrooms: 3,
    area: 250,
    isFavorite: false,
    hasAppointment: false,
    views: 120,
    favorites: 18,
    createdAt: '2026-02-05',
    propertyType: 'apartamento',
    zone: 'salamanca',
    description: 'Ático de diseño exclusivo con espectaculares vistas',
    features: ['Terraza panorámica', 'Jacuzzi', 'Smart home', 'Gimnasio'],
    agent: {
      id: 2,
      name: 'Carlos Ramírez',
      email: 'carlos@agency.com',
      phone: '+34 600 234 567'
    }
  },
  {
    id: 5,
    title: 'Chalet con Vistas a la Sierra',
    price: 395000,
    location: 'Las Rozas, Madrid',
    image: '/images/home-background.png',
    bedrooms: 3,
    bathrooms: 2,
    area: 220,
    isFavorite: false,
    hasAppointment: false,
    views: 90,
    favorites: 15,
    createdAt: '2026-02-04',
    propertyType: 'chalet',
    zone: 'las rozas',
    description: 'Chalet independiente con impresionantes vistas',
    features: ['Piscina', 'Barbacoa', 'Porche', 'Zona verde'],
    agent: {
      id: 1,
      name: 'María González',
      email: 'maria@agency.com',
      phone: '+34 600 123 456'
    }
  },
  {
    id: 6,
    title: 'Mansión Exclusiva La Moraleja',
    price: 1250000,
    location: 'La Moraleja, Alcobendas',
    image: '/images/login-background.jpg',
    bedrooms: 5,
    bathrooms: 4,
    area: 450,
    isFavorite: true,
    hasAppointment: false,
    views: 300,
    favorites: 55,
    createdAt: '2026-02-02',
    propertyType: 'casa',
    zone: 'moraleja',
    description: 'Mansión de lujo en la zona más exclusiva',
    features: ['Piscina climatizada', 'Bodega', 'Cine privado', 'Seguridad 24h'],
    agent: {
      id: 3,
      name: 'Ana Martínez',
      email: 'ana@agency.com',
      phone: '+34 600 345 678'
    }
  }
]

const propertyService = {
  getProperties: async (filters = {}) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      let properties = [...MOCK_PROPERTIES]
      
      if (filters.propertyType) {
        properties = properties.filter(p => p.propertyType === filters.propertyType)
      }
      
      if (filters.minPrice) {
        properties = properties.filter(p => p.price >= filters.minPrice)
      }
      
      if (filters.maxPrice) {
        properties = properties.filter(p => p.price <= filters.maxPrice)
      }
      
      if (filters.zone) {
        properties = properties.filter(p => p.zone === filters.zone)
      }
      
      return {
        success: true,
        properties: properties,
        total: properties.length
      }
    } catch (error) {
      throw new Error('Error al cargar propiedades')
    }
  },

  getPropertyById: async (propertyId) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const property = MOCK_PROPERTIES.find(p => p.id === parseInt(propertyId))
      
      if (!property) {
        throw new Error('Propiedad no encontrada')
      }
      
      return {
        success: true,
        property: property
      }
    } catch (error) {
      throw error
    }
  },

  searchProperties: async (searchQuery) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const query = searchQuery.toLowerCase()
      const results = MOCK_PROPERTIES.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query) ||
        p.zone.toLowerCase().includes(query)
      )
      
      return {
        success: true,
        properties: results,
        total: results.length
      }
    } catch (error) {
      throw new Error('Error en la búsqueda')
    }
  },

  toggleFavorite: async (propertyId) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const property = MOCK_PROPERTIES.find(p => p.id === propertyId)
      
      if (!property) {
        throw new Error('Propiedad no encontrada')
      }
      
      property.isFavorite = !property.isFavorite
      
      return {
        success: true,
        isFavorite: property.isFavorite
      }
    } catch (error) {
      throw error
    }
  },

  getFavorites: async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const favorites = MOCK_PROPERTIES.filter(p => p.isFavorite)
      
      return {
        success: true,
        properties: favorites,
        total: favorites.length
      }
    } catch (error) {
      throw new Error('Error al cargar favoritos')
    }
  },

  requestAppointment: async (propertyId, appointmentData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const property = MOCK_PROPERTIES.find(p => p.id === propertyId)
      
      if (!property) {
        throw new Error('Propiedad no encontrada')
      }
      
      return {
        success: true,
        appointment: {
          id: Date.now(),
          propertyId: propertyId,
          propertyTitle: property.title,
          agentName: property.agent.name,
          status: 'pending_agent',
          ...appointmentData,
          createdAt: new Date().toISOString()
        }
      }
    } catch (error) {
      throw error
    }
  }
}

export default propertyService
