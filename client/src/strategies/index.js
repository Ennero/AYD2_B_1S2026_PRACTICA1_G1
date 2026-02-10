/**
 * Barrel export para las estrategias
 * Facilita la importación de estrategias desde otros módulos
 */

// Exportar todas las estrategias de filtrado
export {
  PropertyFilterContext,
  TextSearchStrategy,
  TypeFilterStrategy,
  MinPriceFilterStrategy,
  MaxPriceFilterStrategy,
  ZoneFilterStrategy,
  BedroomsFilterStrategy,
  BathroomsFilterStrategy,
  MinAreaFilterStrategy
} from './PropertyFilters'

// Exportar todas las estrategias de ordenamiento
export {
  SortStrategy,
  MostRecentStrategy,
  PriceLowToHighStrategy,
  PriceHighToLowStrategy,
  AreaLowToHighStrategy,
  AreaHighToLowStrategy,
  PropertySorter,
  getSortStrategy
} from './PropertySorters'
