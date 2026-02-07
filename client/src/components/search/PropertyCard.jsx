import { useState } from 'react'
import { MapPin, Bed, Bath, Maximize, Heart } from 'lucide-react'

/**
 * Tarjeta de propiedad para resultados de búsqueda
 */
const PropertyCard = ({ property, onToggleFavorite, onViewDetails }) => {
  const [isFavorite, setIsFavorite] = useState(property.isFavorite || false)

  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
    onToggleFavorite?.(property.id)
  }

  return (
    <div 
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] group cursor-pointer border border-transparent hover:border-orange-200"
      style={{ 
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      onClick={() => onViewDetails?.(property.id)}
    >
   
      <div className="relative h-56 overflow-hidden">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-full object-cover transform group-hover:scale-110 group-hover:rotate-1 transition-all duration-700"
          style={{ transformStyle: 'preserve-3d' }}
        />
       
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg ${
            isFavorite 
              ? 'bg-red-500 text-white shadow-red-500/50' 
              : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current animate-pulse' : ''}`} />
        </button>
      </div>

      {/* Contenido */}
      <div className="p-5">
        {/* Precio */}
        <h3 className="text-3xl font-bold text-orange-600 mb-2">
          ${property.price.toLocaleString()}
        </h3>

        {/* Título */}
        <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
          {property.title}
        </h4>

        {/* Ubicación */}
        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{property.location}</span>
        </div>

        {/* Características */}
        <div className="flex items-center gap-4 text-gray-700 border-t pt-4">
          <div className="flex items-center gap-1.5">
            <Bed className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-medium">{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-medium">{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-medium">{property.area} m²</span>
          </div>
        </div>

        {/* Botón Ver Detalles */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onViewDetails?.(property.id)
          }}
          className="w-full mt-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-500 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 active:scale-95 shadow-lg hover:shadow-xl relative overflow-hidden group/btn"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <span className="relative z-10">Ver Detalles</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
        </button>
      </div>
    </div>
  )
}

export default PropertyCard
