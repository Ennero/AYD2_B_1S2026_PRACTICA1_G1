import { useState, useEffect } from 'react'
import { SlidersHorizontal, X, Search, ChevronDown } from 'lucide-react'
import {
  TextSearchStrategy,
  TypeFilterStrategy,
  MinPriceFilterStrategy,
  MaxPriceFilterStrategy,
  ZoneFilterStrategy,
  BedroomsFilterStrategy,
  BathroomsFilterStrategy,
  MinAreaFilterStrategy,
  PropertyFilterContext,
} from '../../strategies/PropertyFilters'
import {
  PriceLowToHighStrategy,
  PriceHighToLowStrategy,
  PropertySorter,
} from '../../strategies/PropertySorters'

/**
 * Panel de filtros lateral fijo para propiedades del agente
 */
const PropertyFilterPanel = ({ onApplyFilters, allProperties = [], onFilterChange }) => {
  const [filters, setFilters] = useState({
    title: '',
    propertyType: '',
    zone: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    sortTitleAsc: false,
    sortTitleDesc: false,
    sortPriceLow: false,
    sortPriceHigh: false,
  })

  useEffect(() => {
    // Aplicar filtros automáticamente cuando cambian
    applyFilters()
  }, [filters])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  // Manejo de checkboxes mutuamente excluyentes para título
  const handleTitleSortChange = (sortType) => {
    if (sortType === 'asc') {
      setFilters(prev => ({
        ...prev,
        sortTitleAsc: !prev.sortTitleAsc,
        sortTitleDesc: false,
      }))
    } else {
      setFilters(prev => ({
        ...prev,
        sortTitleDesc: !prev.sortTitleDesc,
        sortTitleAsc: false,
      }))
    }
  }

  // Manejo de checkboxes mutuamente excluyentes para precio
  const handlePriceSortChange = (sortType) => {
    if (sortType === 'low') {
      setFilters(prev => ({
        ...prev,
        sortPriceLow: !prev.sortPriceLow,
        sortPriceHigh: false,
      }))
    } else {
      setFilters(prev => ({
        ...prev,
        sortPriceHigh: !prev.sortPriceHigh,
        sortPriceLow: false,
      }))
    }
  }

  const applyFilters = () => {
    let filtered = [...allProperties]
    const filterContext = new PropertyFilterContext(TextSearchStrategy)

    // Aplicar filtros usando Strategy pattern
    if (filters.title) {
      filterContext.setStrategy(TextSearchStrategy)
      filtered = filterContext.applyFilter(filtered, filters.title)
    }

    if (filters.propertyType) {
      filterContext.setStrategy(TypeFilterStrategy)
      filtered = filterContext.applyFilter(filtered, filters.propertyType)
    }

    if (filters.zone) {
      filterContext.setStrategy(ZoneFilterStrategy)
      filtered = filterContext.applyFilter(filtered, filters.zone)
    }

    if (filters.minPrice) {
      filterContext.setStrategy(MinPriceFilterStrategy)
      filtered = filterContext.applyFilter(filtered, filters.minPrice)
    }

    if (filters.maxPrice) {
      filterContext.setStrategy(MaxPriceFilterStrategy)
      filtered = filterContext.applyFilter(filtered, filters.maxPrice)
    }

    if (filters.bedrooms) {
      filterContext.setStrategy(BedroomsFilterStrategy)
      filtered = filterContext.applyFilter(filtered, filters.bedrooms)
    }

    if (filters.bathrooms) {
      filterContext.setStrategy(BathroomsFilterStrategy)
      filtered = filterContext.applyFilter(filtered, filters.bathrooms)
    }

    if (filters.area) {
      filterContext.setStrategy(MinAreaFilterStrategy)
      filtered = filterContext.applyFilter(filtered, filters.area)
    }

    // Ordenamiento
    if (filters.sortTitleAsc) {
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title))
    } else if (filters.sortTitleDesc) {
      filtered = [...filtered].sort((a, b) => b.title.localeCompare(a.title))
    }

    if (filters.sortPriceLow) {
      const sorter = new PropertySorter(new PriceLowToHighStrategy())
      filtered = sorter.sort(filtered)
    } else if (filters.sortPriceHigh) {
      const sorter = new PropertySorter(new PriceHighToLowStrategy())
      filtered = sorter.sort(filtered)
    }

    // Calcular filtros activos basándose en el estado actual de filters
    const currentActiveFilters = []
    if (filters.title) currentActiveFilters.push({ key: 'title', label: 'Búsqueda', value: filters.title, onRemove: () => removeFilter('title') })
    if (filters.propertyType) currentActiveFilters.push({ key: 'propertyType', label: 'Tipo', value: filters.propertyType, onRemove: () => removeFilter('propertyType') })
    if (filters.zone) currentActiveFilters.push({ key: 'zone', label: 'Zona', value: filters.zone, onRemove: () => removeFilter('zone') })
    if (filters.minPrice) currentActiveFilters.push({ key: 'minPrice', label: 'Precio mín', value: `Q${filters.minPrice}`, onRemove: () => removeFilter('minPrice') })
    if (filters.maxPrice) currentActiveFilters.push({ key: 'maxPrice', label: 'Precio máx', value: `Q${filters.maxPrice}`, onRemove: () => removeFilter('maxPrice') })
    if (filters.bedrooms) currentActiveFilters.push({ key: 'bedrooms', label: 'Habitaciones', value: filters.bedrooms, onRemove: () => removeFilter('bedrooms') })
    if (filters.bathrooms) currentActiveFilters.push({ key: 'bathrooms', label: 'Baños', value: filters.bathrooms, onRemove: () => removeFilter('bathrooms') })
    if (filters.area) currentActiveFilters.push({ key: 'area', label: 'Área mín', value: `${filters.area}m²`, onRemove: () => removeFilter('area') })
    if (filters.sortTitleAsc) currentActiveFilters.push({ key: 'sortTitleAsc', label: 'Orden', value: 'Título A-Z', onRemove: () => removeFilter('sortTitleAsc') })
    if (filters.sortTitleDesc) currentActiveFilters.push({ key: 'sortTitleDesc', label: 'Orden', value: 'Título Z-A', onRemove: () => removeFilter('sortTitleDesc') })
    if (filters.sortPriceLow) currentActiveFilters.push({ key: 'sortPriceLow', label: 'Orden', value: 'Precio Bajo', onRemove: () => removeFilter('sortPriceLow') })
    if (filters.sortPriceHigh) currentActiveFilters.push({ key: 'sortPriceHigh', label: 'Orden', value: 'Precio Alto', onRemove: () => removeFilter('sortPriceHigh') })

    onApplyFilters(filtered, currentActiveFilters)
  }

  const handleClear = () => {
    setFilters({
      title: '',
      propertyType: '',
      zone: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      area: '',
      sortTitleAsc: false,
      sortTitleDesc: false,
      sortPriceLow: false,
      sortPriceHigh: false,
    })
    onApplyFilters(allProperties, [])
  }

  const removeFilter = (key) => {
    setFilters(prev => ({ ...prev, [key]: key.includes('sort') ? false : '' }))
  }

  // Verificar si hay algún filtro activo
  const hasActiveFilters = () => {
    return filters.title || filters.propertyType || filters.zone || 
           filters.minPrice || filters.maxPrice || filters.bedrooms || 
           filters.bathrooms || filters.area || filters.sortTitleAsc || 
           filters.sortTitleDesc || filters.sortPriceLow || filters.sortPriceHigh
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-5 h-fit max-h-[calc(100vh-7.5rem)] overflow-y-auto transform transition-all duration-500 hover:shadow-2xl sticky top-[7rem]" style={{ transformStyle: 'preserve-3d' }}>
      
      <div className="flex items-center gap-2 mb-3 animate-fadeIn">
        <SlidersHorizontal className="w-4 h-4 text-sky-600 animate-pulse" />
        <h3 className="text-base font-bold text-gray-900">FILTROS AVANZADOS</h3>
      </div>

      <div className="space-y-4">
        {/* Palabras clave */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">
            Palabras clave
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="title"
              placeholder="Ej. Casa con piscina"
              value={filters.title}
              onChange={handleChange}
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300 hover:border-sky-300"
            />
          </div>
        </div>

        {/* Tipo de Inmueble */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">
            Tipo de Inmueble
          </label>
          <div className="relative">
            <select
              name="propertyType"
              value={filters.propertyType}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all appearance-none cursor-pointer pr-10"
            >
              <option value="">Todos los tipos</option>
              <option value="Casa">Casa</option>
              <option value="Apartamento">Apartamento</option>
              <option value="Terreno">Terreno</option>
              <option value="Local Comercial">Local Comercial</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Rango de Precio */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">
            Rango de Precio (GTQ)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              name="minPrice"
              placeholder="Mínimo"
              value={filters.minPrice}
              onChange={handleChange}
              className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
            />
            <input
              type="number"
              name="maxPrice"
              placeholder="Máximo"
              value={filters.maxPrice}
              onChange={handleChange}
              className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Ubicación / Zona */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">
            Ubicación / Zona
          </label>
          <input
            type="text"
            name="zone"
            placeholder="Todas las zonas"
            value={filters.zone}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Número de Habitaciones */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">
            Número de Habitaciones
          </label>
          <input
            type="text"
            name="bedrooms"
            placeholder="1,2,3..."
            value={filters.bedrooms}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Baños y Metros */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Baños
            </label>
            <input
              type="text"
              name="bathrooms"
              placeholder="1,2,3..."
              value={filters.bathrooms}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Metros(m²)
            </label>
            <input
              type="number"
              name="area"
              placeholder="100"
              value={filters.area}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Separador */}
        <div className="h-px bg-gradient-to-r from-transparent via-sky-300 to-transparent my-3"></div>

        {/* Ordenamiento con checkboxes */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-gray-700 flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            Ordenamiento
          </p>

          {/* Filtrar por Título */}
          <div className="bg-sky-50/50 rounded-lg p-3 border border-sky-100">
            <p className="text-xs font-semibold text-gray-600 mb-2">Por Título</p>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.sortTitleAsc}
                  onChange={() => handleTitleSortChange('asc')}
                  className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500 focus:ring-2 cursor-pointer transition-all duration-300"
                />
                <span className="text-xs text-gray-700 group-hover:text-sky-600 transition-colors duration-200">
                  Ascendente (A-Z)
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.sortTitleDesc}
                  onChange={() => handleTitleSortChange('desc')}
                  className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500 focus:ring-2 cursor-pointer transition-all duration-300"
                />
                <span className="text-xs text-gray-700 group-hover:text-sky-600 transition-colors duration-200">
                  Descendente (Z-A)
                </span>
              </label>
            </div>
          </div>

          {/* Filtrar por Precio */}
          <div className="bg-sky-50/50 rounded-lg p-3 border border-sky-100">
            <p className="text-xs font-semibold text-gray-600 mb-2">Por Precio</p>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.sortPriceLow}
                  onChange={() => handlePriceSortChange('low')}
                  className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500 focus:ring-2 cursor-pointer transition-all duration-300"
                />
                <span className="text-xs text-gray-700 group-hover:text-sky-600 transition-colors duration-200">
                  Bajo (Menor a Mayor)
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.sortPriceHigh}
                  onChange={() => handlePriceSortChange('high')}
                  className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500 focus:ring-2 cursor-pointer transition-all duration-300"
                />
                <span className="text-xs text-gray-700 group-hover:text-sky-600 transition-colors duration-200">
                  Alto (Mayor a Menor)
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Botón Resetear */}
        {hasActiveFilters() && (
          <button
            onClick={handleClear}
            className="w-full py-2 bg-gray-100 text-gray-600 text-xs rounded-lg font-medium hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-md"
            style={{ transformStyle: 'preserve-3d' }}
          >
            Limpiar todos los filtros
          </button>
        )}
      </div>
    </div>
  )
}

export default PropertyFilterPanel
