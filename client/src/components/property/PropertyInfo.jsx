import { MapPin, Bed, Bath, Maximize, Heart, Calendar, Home } from 'lucide-react'
import { useState } from 'react'

/**
 * Información detallada de la propiedad
 */
const PropertyInfo = ({
  title,
  location,
  zone,
  price,
  bedrooms,
  bathrooms,
  area,
  propertyType,
  description,
  features,
  amenities,
  onAddToFavorites
}) => {
  const [isFavorite, setIsFavorite] = useState(false)

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite)
    onAddToFavorites?.()
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-500 hover:shadow-2xl" style={{ transformStyle: 'preserve-3d' }}>
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
            {title}
          </h1>
          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <MapPin className="w-5 h-5 text-orange-600" />
            <span className="text-lg">{location}</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold">
            <Home className="w-4 h-4" />
            Zona: {zone}
          </div>
        </div>

        {/* Botón favorito */}
        <button
          onClick={handleFavoriteClick}
          className={`p-4 rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 ${
            isFavorite
              ? 'bg-red-500 text-white shadow-lg shadow-red-500/50'
              : 'bg-gray-100 text-gray-600 hover:bg-red-500 hover:text-white'
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current animate-pulse' : ''}`} />
        </button>
      </div>

      {/* Precio destacado */}
      <div className="mb-8 p-6 bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-xl border-l-4 border-orange-500 transform transition-all duration-300 hover:scale-[1.02]" style={{ transformStyle: 'preserve-3d' }}>
        <p className="text-sm text-gray-600 mb-1">Precio</p>
        <p className="text-4xl font-bold text-orange-600">
          Q {price.toLocaleString()}
        </p>
      </div>

      {/* Características principales */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl transform transition-all duration-300 hover:bg-orange-50 hover:scale-105 hover:-translate-y-1" style={{ transformStyle: 'preserve-3d' }}>
          <Bed className="w-8 h-8 text-orange-600 mb-2" />
          <span className="text-2xl font-bold text-gray-900">{bedrooms}</span>
          <span className="text-sm text-gray-600">Habitaciones</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl transform transition-all duration-300 hover:bg-orange-50 hover:scale-105 hover:-translate-y-1" style={{ transformStyle: 'preserve-3d' }}>
          <Bath className="w-8 h-8 text-orange-600 mb-2" />
          <span className="text-2xl font-bold text-gray-900">{bathrooms}</span>
          <span className="text-sm text-gray-600">Baños</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl transform transition-all duration-300 hover:bg-orange-50 hover:scale-105 hover:-translate-y-1" style={{ transformStyle: 'preserve-3d' }}>
          <Maximize className="w-8 h-8 text-orange-600 mb-2" />
          <span className="text-2xl font-bold text-gray-900">{area}</span>
          <span className="text-sm text-gray-600">m² Construcción</span>
        </div>
      </div>

      {/* Descripción */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-1 w-12 bg-orange-600 rounded-full"></div>
          <h2 className="text-2xl font-bold text-gray-900">Descripción</h2>
        </div>
        <div className="flex items-center gap-2 mb-3 bg-blue-50 px-4 py-2 rounded-lg inline-block">
          <span className="text-sm font-medium text-gray-700">Tipo:</span>
          <span className="text-sm font-bold text-blue-600">{propertyType}</span>
        </div>
        <p className="text-gray-700 leading-relaxed text-lg">
          {description}
        </p>
      </div>
    </div>
  )
}

export default PropertyInfo
