import { useState, useEffect } from 'react'
import { FavoritePropertyCard } from '../../components/favorites'
import { propertyService } from '../../services'
import { Heart, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'

/**
 * Contenedor de propiedades favoritas
 */
const FavoritesContainer = () => {
  const [favorites, setFavorites] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all') // 'all' o 'recent'

  useEffect(() => {
    loadFavorites()
  }, [])

  const loadFavorites = async () => {
    try {
      setIsLoading(true)
      const result = await propertyService.getFavorites()
      
      if (result.success) {
        setFavorites(result.properties)
      }
    } catch (error) {
      toast.error('Error al cargar favoritos')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveFavorite = async (propertyId) => {
    try {
      const result = await propertyService.removeFavorite(propertyId)
      
      if (result.success) {
        setFavorites(prevFavorites => 
          prevFavorites.filter(f => f.id !== propertyId)
        )
        toast.success('Propiedad eliminada de favoritos')
      }
    } catch (error) {
      toast.error('Error al eliminar favorito')
      console.error(error)
    }
  }

  // Filtrar propiedades según tab activo
  const displayedFavorites = activeTab === 'recent' 
    ? favorites.slice(0, 3) // Últimos 3 guardados
    : favorites

  if (isLoading) {
    return (
      <div className="min-h-screen pt-28 pb-12 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-600 mb-4"></div>
          <p className="text-gray-600 font-semibold">Cargando favoritos...</p>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="min-h-screen pt-28 pb-12 relative bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('/images/client-background.png')",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 flex items-center gap-3">
            <Heart className="w-10 h-10 text-red-500 fill-current animate-pulse" />
            Mis Propiedades Guardadas
          </h1>
          <p className="text-gray-600 text-lg">
            Aquí encontrarás todas las propiedades que has marcado como favoritas
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6 mb-8 border-b border-gray-200 pb-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`relative pb-3 px-2 font-semibold transition-all duration-300 ${
              activeTab === 'all'
                ? 'text-orange-600'
                : 'text-gray-600 hover:text-orange-600'
            }`}
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              {favorites.length} Propiedades
            </span>
            {activeTab === 'all' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-600 to-red-600 animate-slideInLeft"></span>
            )}
          </button>
          
          <button
            onClick={() => setActiveTab('recent')}
            className={`relative pb-3 px-2 font-semibold transition-all duration-300 ${
              activeTab === 'recent'
                ? 'text-orange-600'
                : 'text-gray-600 hover:text-orange-600'
            }`}
          >
            Guardados recientemente
            {activeTab === 'recent' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-600 to-red-600 animate-slideInLeft"></span>
            )}
          </button>
        </div>

        {/* Lista de propiedades */}
        {displayedFavorites.length > 0 ? (
          <div className="flex flex-col gap-6 animate-fadeIn">
            {displayedFavorites.map((property, index) => (
              <div
                key={property.id}
                className="animate-slideUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <FavoritePropertyCard
                  property={property}
                  onRemoveFavorite={handleRemoveFavorite}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 animate-fadeIn">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-orange-100 to-red-100 mb-6">
              <Heart className="w-12 h-12 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              No tienes propiedades guardadas
            </h3>
            <p className="text-gray-600 mb-6">
              Explora nuestro catálogo y guarda tus propiedades favoritas
            </p>
            <a
              href="/search"
              className="inline-block bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-xl font-bold hover:from-orange-700 hover:to-red-700 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              Explorar Propiedades
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default FavoritesContainer
