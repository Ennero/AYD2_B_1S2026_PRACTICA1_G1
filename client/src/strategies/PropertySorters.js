/**
 * PATRÓN STRATEGY - ORDENAMIENTO DE PROPIEDADES
 * Define diferentes estrategias de ordenamiento que pueden ser intercambiadas dinámicamente
 */

// Clase base para las estrategias 
export class SortStrategy {
  sort() {
    throw new Error('El método sort() debe ser implementado por la estrategia concreta')
  }
}

// Estrategia 1: Ordenar por más recientes
export class MostRecentStrategy extends SortStrategy {
  sort(properties) {
    return [...properties].sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt)
    })
  }
}

// Estrategia 2: Ordenar por precio (menor a mayor)
export class PriceLowToHighStrategy extends SortStrategy {
  sort(properties) {
    return [...properties].sort((a, b) => a.price - b.price)
  }
}

// Estrategia 3: Ordenar por precio (mayor a menor)
export class PriceHighToLowStrategy extends SortStrategy {
  sort(properties) {
    return [...properties].sort((a, b) => b.price - a.price)
  }
}

// Estrategia 4: Ordenar por área (menor a mayor)
export class AreaLowToHighStrategy extends SortStrategy {
  sort(properties) {
    return [...properties].sort((a, b) => a.area - b.area)
  }
}

// Estrategia 5: Ordenar por área (mayor a menor)
export class AreaHighToLowStrategy extends SortStrategy {
  sort(properties) {
    return [...properties].sort((a, b) => b.area - a.area)
  }
}

/**
 * Esta clase permite cambiar la estrategia de ordenamiento en tiempo de ejecución
 */
export class PropertySorter {
  constructor(strategy) {
    this.strategy = strategy
  }

  setStrategy(strategy) {
    this.strategy = strategy
  }

  sort(properties) {
    return this.strategy.sort(properties)
  }
}

export const getSortStrategy = (sortType) => {
  const strategies = {
    'recent': new MostRecentStrategy(),
    'price-low': new PriceLowToHighStrategy(),
    'price-high': new PriceHighToLowStrategy(),
    'area-low': new AreaLowToHighStrategy(),
    'area-high': new AreaHighToLowStrategy()
  }
  
  return strategies[sortType] || new MostRecentStrategy()
}
