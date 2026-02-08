import { useState, useEffect, useCallback } from 'react'
import { FilterPanel, PropertyCard } from '../../components/search'
import { PropertySorter, getSortStrategy } from '../../strategies/PropertySorters'
import { 
  PropertyFilterContext,
  TextSearchStrategy,
  TypeFilterStrategy,
  MinPriceFilterStrategy,
  MaxPriceFilterStrategy,
  ZoneFilterStrategy,
  BedroomsFilterStrategy,
  BathroomsFilterStrategy,
  MinAreaFilterStrategy
} from '../../strategies/PropertyFilters'
import { ChevronDown } from 'lucide-react'

/**
 * Container que maneja la lógica de búsqueda y filtrado
 * Aplica patrón Strategy para filtrado y ordenamiento
 */
const SearchContainer = () => {
  const [properties, setProperties] = useState([])
  const [filteredProperties, setFilteredProperties] = useState([])
  const [sortType, setSortType] = useState('recent')
  const [showSortMenu, setShowSortMenu] = useState(false)
  const [filters, setFilters] = useState({})
  const [searchQuery, setSearchQuery] = useState('')

  // Datos mock 
  useEffect(() => {
    const mockProperties = [
      {
        id: 1,
        title: 'Apartamento de Lujo en Malasaña',
        price: 850000,
        location: 'Calle Gran Vía, Madrid',
        image: '/images/register-background.jpg',
        bedrooms: 4,
        bathrooms: 3,
        area: 320,
        isFavorite: false,
        views: 150,
        favorites: 25,
        createdAt: '2026-02-01',
        propertyType: 'apartamento',
        zone: 'malasaña'
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
        views: 200,
        favorites: 40,
        createdAt: '2026-02-03',
        propertyType: 'loft',
        zone: 'centro'
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
        views: 80,
        favorites: 10,
        createdAt: '2026-01-28',
        propertyType: 'casa',
        zone: 'retiro'
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
        views: 120,
        favorites: 18,
        createdAt: '2026-02-05',
        propertyType: 'apartamento',
        zone: 'salamanca'
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
        views: 90,
        favorites: 15,
        createdAt: '2026-02-04',
        propertyType: 'chalet',
        zone: 'las rozas'
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
        views: 300,
        favorites: 55,
        createdAt: '2026-02-02',
        propertyType: 'casa',
        zone: 'moraleja'
      }
    ]
    setProperties(mockProperties)
    setFilteredProperties(mockProperties)
  }, [])

  //  Aplicar filtros usando patrón Strategy
  const applyFilters = useCallback((propsToFilter = properties, currentFilters = filters, searchTerm = searchQuery) => {
    let result = [...propsToFilter]

    // Instanciamos el contexto de filtros (permite intercambiar estrategias)
    const filterContext = new PropertyFilterContext(TextSearchStrategy)

    // 1. Aplicar Estrategia de Búsqueda por Texto
    filterContext.setStrategy(TextSearchStrategy)
    result = filterContext.applyFilter(result, searchTerm)

    // 2. Aplicar Estrategia de Tipo de Inmueble (Cambiamos la estrategia dinámicamente)
    filterContext.setStrategy(TypeFilterStrategy)
    result = filterContext.applyFilter(result, currentFilters.propertyType)

    // 3. Aplicar Estrategia de Precio Mínimo
    filterContext.setStrategy(MinPriceFilterStrategy)
    result = filterContext.applyFilter(result, currentFilters.minPrice)

    // 4. Aplicar Estrategia de Precio Máximo
    filterContext.setStrategy(MaxPriceFilterStrategy)
    result = filterContext.applyFilter(result, currentFilters.maxPrice)

    // 5. Aplicar Estrategia de Zona
    filterContext.setStrategy(ZoneFilterStrategy)
    result = filterContext.applyFilter(result, currentFilters.zone)

    // 6. Aplicar Estrategia de Habitaciones
    filterContext.setStrategy(BedroomsFilterStrategy)
    result = filterContext.applyFilter(result, currentFilters.bedrooms)

    // 7. Aplicar Estrategia de Baños
    filterContext.setStrategy(BathroomsFilterStrategy)
    result = filterContext.applyFilter(result, currentFilters.bathrooms)

    // 8. Aplicar Estrategia de Área Mínima
    filterContext.setStrategy(MinAreaFilterStrategy)
    result = filterContext.applyFilter(result, currentFilters.minArea)

    // 9. Aplicar ordenamiento usando patrón Strategy
    const sortStrategy = getSortStrategy(sortType)
    const sorter = new PropertySorter(sortStrategy)
    result = sorter.sort(result)

    setFilteredProperties(result)
  }, [properties, filters, sortType, searchQuery])

  // Re-aplicar filtros cuando cambia el ordenamiento
  useEffect(() => {
    applyFilters()
  }, [sortType, applyFilters])

  const handleSearch = (query) => {
    setSearchQuery(query)
    applyFilters(properties, filters, query)
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    applyFilters(properties, newFilters, searchQuery)
  }

  const handleToggleFavorite = (propertyId) => {
    
    console.log('Toggle favorite:', propertyId)
  }

  const sortOptions = [
    { value: 'recent', label: 'Más recientes' },
    { value: 'price-low', label: 'Precio: Menor a Mayor' },
    { value: 'price-high', label: 'Precio: Mayor a Menor' },
    { value: 'area', label: 'Área: Mayor a menor' },
    { value: 'popular', label: 'Más Populares' }
  ]

  const currentSortLabel = sortOptions.find(opt => opt.value === sortType)?.label

  return (
    <div 
      className="min-h-screen pt-28 pb-12 relative bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('/images/client-background.png')",
      }}
    >
   <div className="relative z-10 flex max-w-full px-0 gap-6">
      
        <div className="w-80 flex-shrink-0 pl-4 animate-slideInLeft">
          <div className="sticky top-28" style={{ transformStyle: 'preserve-3d' }}>
            <FilterPanel 
              onFilterChange={handleFilterChange}
              onSearch={handleSearch}
            />
          </div>
        </div>

       
        <div className="flex-1 min-w-0 pr-6 animate-slideInRight">
        
          <div className="flex items-center justify-between mb-6 animate-fadeIn transform transition-all duration-500 hover:scale-[1.01]" style={{ transformStyle: 'preserve-3d' }}>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Resultados de Búsqueda</h2>
              <p className="text-gray-600 mt-1">
                Mostrando {filteredProperties.length} {filteredProperties.length === 1 ? 'propiedad encontrada' : 'propiedades encontradas'}
              </p>
            </div>

            {/* Selector de ordenamiento */}
            <div className="relative">
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-orange-600 transition-all duration-300 font-semibold text-gray-900 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 active:scale-95"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <span className="text-sm">Ordenar por:</span>
                <span className="text-sm text-orange-600">{currentSortLabel}</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${showSortMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* Menú desplegable */}
              {showSortMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 animate-slideInDown backdrop-blur-sm" style={{ transformStyle: 'preserve-3d' }}>
                  {sortOptions.map((option, index) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortType(option.value)
                        setShowSortMenu(false)
                      }}
                      className={`w-full text-left px-4 py-3 transition-all duration-300 transform hover:scale-105 hover:translate-x-2 ${
                        sortType === option.value
                          ? 'bg-orange-50 text-orange-600 font-semibold shadow-sm'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      style={{ 
                        transformStyle: 'preserve-3d',
                        animationDelay: `${index * 50}ms`
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Grid de propiedades */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProperties.map((property, index) => (
              <div
                key={property.id}
                className="animate-fadeInUp"
                style={{
                  animationDelay: `${index * 100}ms`,
                  transformStyle: 'preserve-3d'
                }}
              >
                <PropertyCard
                  property={property}
                  onToggleFavorite={handleToggleFavorite}
                />
              </div>
            ))}
          </div>

          {/* Mensaje sin resultados */}
          {filteredProperties.length === 0 && (
            <div className="text-center py-20 animate-fadeInUp">
              <div className="inline-block p-8 bg-white rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-105" style={{ transformStyle: 'preserve-3d' }}>
                <p className="text-gray-500 text-lg mb-4">No se encontraron propiedades con los criterios seleccionados.</p>
                <button
                  onClick={() => {
                    setFilters({})
                    setSearchQuery('')
                    applyFilters(properties, {}, '')
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 active:scale-95 font-semibold"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  Limpiar filtros
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchContainer
