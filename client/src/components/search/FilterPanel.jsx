import { useState, useEffect } from 'react'
import { SlidersHorizontal } from 'lucide-react'

/**
 * Panel de filtros avanzados para la búsqueda de propiedades
 */
const FilterPanel = ({ onFilterChange, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [availableZones, setAvailableZones] = useState([])
  const [filters, setFilters] = useState({
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    zone: '',
    bedrooms: '',
    bathrooms: '',
    minArea: '',
    maxArea: ''
  })

  // Cargar zonas disponibles del backend
  useEffect(() => {
    const loadZones = async () => {
      try {
        const token = localStorage.getItem('authToken')
        const response = await fetch('http://localhost:3000/api/client/zones', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (response.ok) {
          const data = await response.json()
          setAvailableZones(data.zones || [])
        }
      } catch (error) {
        console.error('Error cargando zonas:', error)
      }
    }
    loadZones()
  }, [])

  const handleChange = (field, value) => {
    const newFilters = { ...filters, [field]: value }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const handleReset = () => {
    const resetFilters = {
      propertyType: '',
      minPrice: '',
      maxPrice: '',
      zone: '',
      bedrooms: '',
      bathrooms: '',
      minArea: '',
      maxArea: ''
    }
    setFilters(resetFilters)
    setSearchQuery('')
    onFilterChange?.(resetFilters)
  }

  const handleSearchSubmit = () => {
    onSearch?.(searchQuery)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit()
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-5 h-fit max-h-[calc(100vh-8rem)] overflow-y-auto transform transition-all duration-500 hover:shadow-2xl" style={{ transformStyle: 'preserve-3d' }}>
  
      <div className="flex items-center gap-2 mb-5 animate-fadeIn">
        <SlidersHorizontal className="w-5 h-5 text-orange-600 animate-pulse" />
        <h3 className="text-lg font-bold text-gray-900">FILTROS AVANZADOS</h3>
      </div>

      <div className="space-y-4">
        {/* Palabras clave */}
        <div className="animate-fadeInUp" style={{ animationDelay: '100ms' }}>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">
            Palabras clave
          </label>
          <input
            type="text"
            placeholder="Ej. Casa con piscina"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-300"
          />
        </div>

        {/* Tipo de Inmueble */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">
            Tipo de Inmueble
          </label>
          <select
            value={filters.propertyType}
            onChange={(e) => handleChange('propertyType', e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
              backgroundPosition: 'right 0.5rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem'
            }}
          >
            <option value="">Todos los tipos</option>
            <option value="casa">Casa</option>
            <option value="apartamento">Apartamento</option>
            <option value="terreno">Terreno</option>
            <option value="local">Local Comercial</option>
          </select>
        </div>

        {/* Rango de Precio */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">
            Rango de Precio (GTQ)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Mínimo"
              value={filters.minPrice}
              onChange={(e) => handleChange('minPrice', e.target.value)}
              className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
            <input
              type="number"
              placeholder="Máximo"
              value={filters.maxPrice}
              onChange={(e) => handleChange('maxPrice', e.target.value)}
              className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Ubicación / Zona */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">
            Ubicación / Zona
          </label>
          <select
            value={filters.zone}
            onChange={(e) => handleChange('zone', e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
              backgroundPosition: 'right 0.5rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem'
            }}
          >
            <option value="">Todas las zonas</option>
            {availableZones.map((zone) => (
              <option key={zone} value={zone}>
                {zone}
              </option>
            ))}
          </select>
        </div>

        {/* Número de Habitaciones */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">
            Número de Habitaciones
          </label>
          <input
            type="text"
            placeholder="1,2,3..."
            value={filters.bedrooms}
            onChange={(e) => handleChange('bedrooms', e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
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
              placeholder="1,2,3..."
              value={filters.bathrooms}
              onChange={(e) => handleChange('bathrooms', e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Metros(m²)
            </label>
            <input
              type="text"
              placeholder="1,2,3..."
              value={filters.minArea}
              onChange={(e) => handleChange('minArea', e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Botón Buscar Propiedades */}
        <button
          onClick={handleSearchSubmit}
          className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 active:scale-95 relative overflow-hidden group"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <span className="relative z-10">Buscar Propiedades</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </button>

        {/* Botón Resetear */}
        <button
          onClick={handleReset}
          className="w-full py-2 bg-gray-100 text-gray-600 text-xs rounded-lg font-medium hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-md"
          style={{ transformStyle: 'preserve-3d' }}
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  )
}

export default FilterPanel
