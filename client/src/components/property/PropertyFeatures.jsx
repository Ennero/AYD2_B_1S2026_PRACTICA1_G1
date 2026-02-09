import { Bed, Bath, Maximize } from 'lucide-react'

/**
 * Características destacadas en sidebar
 */
const PropertyFeatures = ({ price, bedrooms, bathrooms, area }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 transform transition-all duration-500 hover:shadow-2xl" style={{ transformStyle: 'preserve-3d' }}>
      {/* Precio */}
      <div className="text-center mb-6 p-4 bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-xl">
        <p className="text-sm text-gray-600 mb-2">Precio</p>
        <p className="text-3xl font-bold text-orange-600">
          Q {price.toLocaleString()}
        </p>
      </div>

      {/* Características */}
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <Bed className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Habitaciones</span>
          </div>
          <span className="text-lg font-bold text-gray-900">{bedrooms}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Bath className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Baños</span>
          </div>
          <span className="text-lg font-bold text-gray-900">{bathrooms}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Maximize className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Construcción</span>
          </div>
          <span className="text-lg font-bold text-gray-900">{area} m²</span>
        </div>
      </div>
    </div>
  )
}

export default PropertyFeatures
