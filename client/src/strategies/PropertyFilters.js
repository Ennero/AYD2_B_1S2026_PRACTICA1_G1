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
    return properties.filter(p => p.zone.toLowerCase() === filterValue.toLowerCase())
  }
}

// Estrategia 6: Filtrar por Número de Habitaciones
export const BedroomsFilterStrategy = {
  execute: (properties, filterValue) => {
    if (!filterValue || filterValue === '') return properties
    const bedroomValues = filterValue.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v))
    if (bedroomValues.length === 0) return properties
    return properties.filter(p => bedroomValues.includes(p.bedrooms) || p.bedrooms >= Math.min(...bedroomValues))
  }
}

// Estrategia 7: Filtrar por Número de Baños
export const BathroomsFilterStrategy = {
  execute: (properties, filterValue) => {
    if (!filterValue || filterValue === '') return properties
    const bathroomValues = filterValue.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v))
    if (bathroomValues.length === 0) return properties
    return properties.filter(p => bathroomValues.includes(p.bathrooms) || p.bathrooms >= Math.min(...bathroomValues))
  }
}

// Estrategia 8: Filtrar por Área Mínima (m²)
export const MinAreaFilterStrategy = {
  execute: (properties, filterValue) => {
    if (!filterValue || filterValue === '') return properties
    const areaValues = filterValue.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v))
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
