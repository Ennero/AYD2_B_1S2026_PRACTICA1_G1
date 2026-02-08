import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Bed, Bath, Maximize, Heart } from 'lucide-react'

/**
 * Tarjeta de propiedad favorita
 */
const FavoritePropertyCard = ({ property, onRemoveFavorite }) => {
  const navigate = useNavigate()
  const [isRemoving, setIsRemoving] = useState(false)

  const handleRemoveFavorite = async (e) => {
    e.stopPropagation()
    setIsRemoving(true)
    await onRemoveFavorite?.(property.id)
  }

  const handleViewDetails = () => {
    navigate(`/property/${property.id}`)
  }

  return (
    <div 
      className={`bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group border-2 border-gray-200 flex ${
        isRemoving ? 'opacity-50 scale-95' : ''
      }`}
      style={{ 
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
    
      <div className="relative w-2/5 flex-shrink-0 min-h-[280px]">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-full object-cover"
        />
        
       
        {property.hasAppointment && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-lg">
            Cita Solicitada
          </div>
        )}

        {/* Botón favorito */}
        <button
          onClick={handleRemoveFavorite}
          disabled={isRemoving}
          className="absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg bg-red-500 text-white shadow-red-500/50 hover:bg-red-600"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <Heart className="w-5 h-5 fill-current" />
        </button>
      </div>

      {/* Contenido a la derecha */}
      <div className="flex-1 p-8 flex flex-col justify-between">
        <div>
          {/* Ubicación */}
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-wide">{property.location}</span>
          </div>

          {/* Título */}
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            {property.title}
          </h3>

          {/* Precio */}
          <div className="text-3xl font-bold text-orange-600 mb-6">
            ${property.price.toLocaleString()}
          </div>

          {/* Características */}
          <div className="flex items-center gap-8 text-gray-700 mb-6">
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">Habitaciones</div>
              <div className="flex items-center gap-1.5">
                <Bed className="w-5 h-5 text-gray-600" />
                <span className="text-lg font-semibold">{property.bedrooms}</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">Baños</div>
              <div className="flex items-center gap-1.5">
                <Bath className="w-5 h-5 text-gray-600" />
                <span className="text-lg font-semibold">{property.bathrooms}</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">m²</div>
              <div className="flex items-center gap-1.5">
                <Maximize className="w-5 h-5 text-gray-600" />
                <span className="text-lg font-semibold">{property.area}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Botón Ver Detalles */}
        <div className="flex justify-end">
          <button
            onClick={handleViewDetails}
            className="bg-gradient-to-r from-orange-100 to-orange-50 text-orange-600 px-10 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-500 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg border border-orange-200"
            style={{ transformStyle: 'preserve-3d' }}
          >
            Ver Detalles
          </button>
        </div>
      </div>
    </div>
  )
}

export default FavoritePropertyCard
