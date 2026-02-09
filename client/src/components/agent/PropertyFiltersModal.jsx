import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Search, SlidersHorizontal, ChevronDown, MapPin } from 'lucide-react'
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
 * Componente presentacional - Panel Lateral de Filtros Avanzados para Propiedades
 * Utiliza el patrón Strategy para aplicar filtros y ordenamiento
 * @param {boolean} isOpen - Si el panel está abierto
 * @param {Function} onClose - Callback al cerrar
 * @param {Function} onApplyFilters - Callback con propiedades filtradas
 * @param {Array} allProperties - Lista completa de propiedades sin filtrar
 */
const PropertyFiltersModal = ({ isOpen, onClose, onApplyFilters, allProperties = [] }) => {
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

  const handleApply = () => {
    let filtered = [...allProperties]
    const filterContext = new PropertyFilterContext(TextSearchStrategy)

    // Filtro por título (usa TextSearchStrategy)
    if (filters.title) {
      filterContext.setStrategy(TextSearchStrategy)
      filtered = filterContext.applyFilter(filtered, filters.title)
    }

    // Filtro por tipo de propiedad
    if (filters.propertyType) {
      filterContext.setStrategy(TypeFilterStrategy)
      filtered = filterContext.applyFilter(filtered, filters.propertyType)
    }

    // Filtro por zona
    if (filters.zone) {
      filterContext.setStrategy(ZoneFilterStrategy)
      filtered = filterContext.applyFilter(filtered, filters.zone)
    }

    // Filtro por precio mínimo
    if (filters.minPrice) {
      filterContext.setStrategy(MinPriceFilterStrategy)
      filtered = filterContext.applyFilter(filtered, filters.minPrice)
    }

    // Filtro por precio máximo
    if (filters.maxPrice) {
      filterContext.setStrategy(MaxPriceFilterStrategy)
      filtered = filterContext.applyFilter(filtered, filters.maxPrice)
    }

    // Filtro por habitaciones
    if (filters.bedrooms) {
      filterContext.setStrategy(BedroomsFilterStrategy)
      filtered = filterContext.applyFilter(filtered, filters.bedrooms)
    }

    // Filtro por baños
    if (filters.bathrooms) {
      filterContext.setStrategy(BathroomsFilterStrategy)
      filtered = filterContext.applyFilter(filtered, filters.bathrooms)
    }

    // Filtro por área mínima
    if (filters.area) {
      filterContext.setStrategy(MinAreaFilterStrategy)
      filtered = filterContext.applyFilter(filtered, filters.area)
    }

    // Ordenamiento por título
    if (filters.sortTitleAsc) {
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title))
    } else if (filters.sortTitleDesc) {
      filtered = [...filtered].sort((a, b) => b.title.localeCompare(a.title))
    }

    // Ordenamiento por precio (usa Strategy pattern)
    if (filters.sortPriceLow) {
      const sorter = new PropertySorter(new PriceLowToHighStrategy())
      filtered = sorter.sort(filtered)
    } else if (filters.sortPriceHigh) {
      const sorter = new PropertySorter(new PriceHighToLowStrategy())
      filtered = sorter.sort(filtered)
    }

    onApplyFilters(filtered)
    onClose()
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
    onApplyFilters(allProperties)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Panel Lateral */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-md z-[9999] bg-white shadow-2xl overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Burbujas decorativas flotantes */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <motion.div
                className="absolute top-10 left-10 w-32 h-32 bg-sky-200/30 rounded-full blur-2xl"
                animate={{
                  y: [0, -20, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="absolute top-40 right-16 w-24 h-24 bg-sky-300/20 rounded-full blur-xl"
                animate={{
                  y: [0, 15, 0],
                  x: [0, -10, 0],
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
              />
              <motion.div
                className="absolute bottom-32 left-20 w-40 h-40 bg-sky-100/40 rounded-full blur-3xl"
                animate={{
                  y: [0, -25, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
              />
              <motion.div
                className="absolute top-1/2 right-8 w-20 h-20 bg-sky-400/25 rounded-full blur-xl"
                animate={{
                  y: [0, 20, 0],
                  x: [0, 10, 0],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1.5,
                }}
              />
            </div>

            {/* Contenido del panel */}
            <div className="relative z-10">
              {/* Header */}
              <div className="bg-gradient-to-r from-sky-500 to-sky-600 px-6 py-5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }}></div>
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition-all duration-300 transform hover:scale-110 hover:rotate-90 z-10"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-3 relative z-10">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <SlidersHorizontal className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    FILTROS AVANZADOS
                  </h2>
                </div>
              </div>

              {/* Formulario de filtros */}
              <div className="p-6 space-y-5">
                {/* Palabras clave */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Palabras clave
                  </label>
                  <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-sky-500" />
                    <input
                      type="text"
                      name="title"
                      value={filters.title}
                      onChange={handleChange}
                      placeholder="Ej. Casa con piscina"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-sky-100 focus:border-sky-400 transition-all duration-300 hover:border-sky-300"
                    />
                  </div>
                </div>

                {/* Tipo de Inmueble */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tipo de Inmueble
                  </label>
                  <div className="relative">
                    <select
                      name="propertyType"
                      value={filters.propertyType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-sky-100 focus:border-sky-400 transition-all duration-300 hover:border-sky-300 appearance-none cursor-pointer pr-10"
                    >
                      <option value="">Todos los tipos</option>
                      <option value="Casa">Casa</option>
                      <option value="Apartamento">Apartamento</option>
                      <option value="Terreno">Terreno</option>
                      <option value="Local Comercial">Local Comercial</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Rango de Precio (GTQ) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Rango de Precio (GTQ)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      name="minPrice"
                      value={filters.minPrice}
                      onChange={handleChange}
                      placeholder="Mínimo"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-sky-100 focus:border-sky-400 transition-all duration-300 hover:border-sky-300"
                    />
                    <input
                      type="number"
                      name="maxPrice"
                      value={filters.maxPrice}
                      onChange={handleChange}
                      placeholder="Máximo"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-sky-100 focus:border-sky-400 transition-all duration-300 hover:border-sky-300"
                    />
                  </div>
                </div>

                {/* Ubicación / Zona */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ubicación / Zona
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                      type="text"
                      name="zone"
                      value={filters.zone}
                      onChange={handleChange}
                      placeholder="Todas las zonas"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-sky-100 focus:border-sky-400 transition-all duration-300 hover:border-sky-300"
                    />
                  </div>
                </div>

                {/* Número de Habitaciones */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Número de Habitaciones
                  </label>
                  <input
                    type="text"
                    name="bedrooms"
                    value={filters.bedrooms}
                    onChange={handleChange}
                    placeholder="1,2,3..."
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-sky-100 focus:border-sky-400 transition-all duration-300 hover:border-sky-300"
                  />
                </div>

                {/* Baños y Metros */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Baños
                    </label>
                    <input
                      type="text"
                      name="bathrooms"
                      value={filters.bathrooms}
                      onChange={handleChange}
                      placeholder="1,2,3..."
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-sky-100 focus:border-sky-400 transition-all duration-300 hover:border-sky-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Metros(m²)
                    </label>
                    <input
                      type="number"
                      name="area"
                      value={filters.area}
                      onChange={handleChange}
                      placeholder="100"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-sky-100 focus:border-sky-400 transition-all duration-300 hover:border-sky-300"
                    />
                  </div>
                </div>

                {/* Separador */}
                <div className="h-px bg-gradient-to-r from-transparent via-sky-300 to-transparent my-4"></div>

                {/* Ordenamiento con checkboxes */}
                <div className="space-y-4">
                  <p className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4" />
                    Ordenamiento
                  </p>

                  {/* Filtrar por Título */}
                  <div className="bg-sky-50/50 rounded-xl p-4 border border-sky-100">
                    <p className="text-xs font-semibold text-gray-600 mb-3">Filtrar por Título</p>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.sortTitleAsc}
                          onChange={() => handleTitleSortChange('asc')}
                          className="w-5 h-5 text-sky-600 border-gray-300 rounded focus:ring-sky-500 focus:ring-2 cursor-pointer transition-all duration-300"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-sky-600 transition-colors duration-200">
                          Ascendente (A-Z)
                        </span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.sortTitleDesc}
                          onChange={() => handleTitleSortChange('desc')}
                          className="w-5 h-5 text-sky-600 border-gray-300 rounded focus:ring-sky-500 focus:ring-2 cursor-pointer transition-all duration-300"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-sky-600 transition-colors duration-200">
                          Descendente (Z-A)
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Filtrar por Precio */}
                  <div className="bg-sky-50/50 rounded-xl p-4 border border-sky-100">
                    <p className="text-xs font-semibold text-gray-600 mb-3">Filtrar por Precio</p>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.sortPriceLow}
                          onChange={() => handlePriceSortChange('low')}
                          className="w-5 h-5 text-sky-600 border-gray-300 rounded focus:ring-sky-500 focus:ring-2 cursor-pointer transition-all duration-300"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-sky-600 transition-colors duration-200">
                          Bajo (Menor a Mayor)
                        </span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.sortPriceHigh}
                          onChange={() => handlePriceSortChange('high')}
                          className="w-5 h-5 text-sky-600 border-gray-300 rounded focus:ring-sky-500 focus:ring-2 cursor-pointer transition-all duration-300"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-sky-600 transition-colors duration-200">
                          Alto (Mayor a Menor)
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Botón de búsqueda */}
                <button
                  onClick={handleApply}
                  className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1 active:scale-95 shadow-xl hover:shadow-2xl relative overflow-hidden group mt-6"
                  style={{ transformStyle: 'preserve-3d', boxShadow: '0 10px 25px rgba(249, 115, 22, 0.4)' }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Search className="w-5 h-5" />
                    Buscar Propiedades
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>

                {/* Link de limpiar filtros */}
                <button
                  onClick={handleClear}
                  className="w-full text-center text-sm text-sky-600 hover:text-sky-700 font-semibold hover:underline transition-colors duration-200"
                >
                  Limpiar filtros
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default PropertyFiltersModal
