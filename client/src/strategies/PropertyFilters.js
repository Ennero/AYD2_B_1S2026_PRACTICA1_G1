/**
 * PATRÓN STRATEGY - FILTROS DE PROPIEDADES
 * Definimos una familia de algoritmos (filtros) intercambiables.
 * Todos deben tener el método "execute".
 */

// Estrategia 1: Filtrar por búsqueda de texto
export const TextSearchStrategy = {
  execute: (properties, searchQuery) => {
    if (!searchQuery || searchQuery.trim() === '') return properties
    const query = searchQuery.toLowerCase()
    return properties.filter(p => 
      p.title.toLowerCase().includes(query) ||
      p.location.toLowerCase().includes(query) ||
      p.zone.toLowerCase().includes(query)
    )
  }
}

// Estrategia 2: Filtrar por Tipo de Inmueble (Casa, Apartamento, etc.)
export const TypeFilterStrategy = {
  execute: (properties, filterValue) => {
    if (!filterValue || filterValue === '') return properties
    return properties.filter(p => p.propertyType === filterValue)
  }
}

// Estrategia 3: Filtrar por Precio Mínimo
export const MinPriceFilterStrategy = {
  execute: (properties, minPrice) => {
    if (!minPrice || minPrice === '') return properties
    return properties.filter(p => p.price >= Number(minPrice))
  }
}

// Estrategia 4: Filtrar por Precio Máximo
export const MaxPriceFilterStrategy = {
  execute: (properties, maxPrice) => {
    if (!maxPrice || maxPrice === '') return properties
    return properties.filter(p => p.price <= Number(maxPrice))
  }
}

// Estrategia 5: Filtrar por Zona
export const ZoneFilterStrategy = {
  execute: (properties, filterValue) => {
    if (!filterValue || filterValue === '') return properties
    console.log('[FILTER] Zona - Input:', filterValue)
    const filtered = properties.filter(p => {
      const match = p.zone && p.zone.toLowerCase() === filterValue.toLowerCase()
      if (match) {
        console.log('[FILTER] Zona match:', p.title, 'zone:', p.zone, 'bedrooms:', p.bedrooms, 'bathrooms:', p.bathrooms)
      }
      return match
    })
    console.log('[FILTER] Zona - Resultado:', filtered.length, 'propiedades')
    return filtered
  }
}

// Estrategia 6: Filtrar por Número de Habitaciones
export const BedroomsFilterStrategy = {
  execute: (properties, filterValue) => {
    if (!filterValue || filterValue === '') return properties
    const bedroomValues = filterValue.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v))
    if (bedroomValues.length === 0) return properties
    console.log('[FILTER] Habitaciones - Valores buscados:', bedroomValues)
    console.log('[FILTER] Habitaciones - Propiedades entrantes:', properties.length)
    const filtered = properties.filter(p => {
      const match = bedroomValues.includes(p.bedrooms)
      if (p.zone && p.zone.includes('16')) {
        console.log('[FILTER] Habitaciones - Zona 16:', p.title, 'tiene', p.bedrooms, 'habitaciones, match:', match)
      }
      return match
    })
    console.log('[FILTER] Habitaciones - Resultado:', filtered.length, 'propiedades')
    return filtered
  }
}

// Estrategia 7: Filtrar por Número de Baños
export const BathroomsFilterStrategy = {
  execute: (properties, filterValue) => {
    if (!filterValue || filterValue === '') return properties
    const bathroomValues = filterValue.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v))
    if (bathroomValues.length === 0) return properties
    console.log('[FILTER] Baños - Valores buscados:', bathroomValues)
    console.log('[FILTER] Baños - Propiedades entrantes:', properties.length)
    const filtered = properties.filter(p => {
      const match = bathroomValues.includes(p.bathrooms)
      if (p.zone && p.zone.includes('16')) {
        console.log('[FILTER] Baños - Zona 16:', p.title, 'tiene', p.bathrooms, 'baños, match:', match)
      }
      return match
    })
    console.log('[FILTER] Baños - Resultado:', filtered.length, 'propiedades')
    return filtered
  }
}

// Estrategia 8: Filtrar por Área Mínima (m²)
export const MinAreaFilterStrategy = {
  execute: (properties, filterValue) => {
    if (!filterValue || filterValue === '') return properties
    const areaValues = filterValue.split(',').map(v => parseFloat(v.trim())).filter(v => !isNaN(v))
    if (areaValues.length === 0) return properties
    const minArea = Math.min(...areaValues)
    return properties.filter(p => p.area >= minArea)
  }
}

/**
 * Esta clase es la encargada de recibir la estrategia y ejecutarla.
 * Permite intercambiar estrategias en tiempo de ejecución.
 */
export class PropertyFilterContext {
  constructor(strategy) {
    this.strategy = strategy
  }

  setStrategy(strategy) {
    this.strategy = strategy
  }

  applyFilter(properties, value) {
    return this.strategy.execute(properties, value)
  }
}
