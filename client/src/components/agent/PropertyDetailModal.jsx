import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowLeft, ChevronLeft, ChevronRight, MapPin, BedDouble, Bath, Maximize, Calendar } from 'lucide-react'

/**
 * Componente presentacional - Modal de Detalle de Propiedad
 * Muestra la información completa de una propiedad con galería de imágenes
 * @param {boolean} isOpen - Si el modal está abierto
 * @param {Function} onClose - Callback al cerrar
 * @param {Object|null} property - Propiedad a mostrar
 */
const PropertyDetailModal = ({ isOpen, onClose, property = null }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const images = property?.images || ['/images/logo-HomeFinder.png']

  const nextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length)
  }

  const selectImage = (index) => {
    setCurrentImageIndex(index)
  }

  const getStatusBadge = (status) => {
    const styles = {
      'Disponible': 'bg-emerald-100 text-emerald-700 border-emerald-300',
      'No Disponible': 'bg-amber-100 text-amber-700 border-amber-300',
      'Vendido': 'bg-red-100 text-red-700 border-red-300',
    }
    return styles[status] || 'bg-gray-100 text-gray-700 border-gray-300'
  }

  const formatPrice = (price) => {
    return `Q ${price?.toLocaleString('es-GT') || '0'}`
  }

  return (
    <AnimatePresence>
      {isOpen && property && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-sky-500 to-sky-600 px-8 py-5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }}></div>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition-all duration-300 transform hover:scale-110 hover:rotate-90"
              >
                <X className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="flex items-center gap-2 text-white/80 hover:text-white text-sm mb-2 transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver atrás
              </button>
              <h2 className="text-2xl font-bold text-white relative z-10">
                Detalle de la Propiedad
              </h2>
            </div>

            {/* Separador decorativo */}
            <div className="h-1 bg-gradient-to-r from-sky-300 via-sky-500 to-sky-300"></div>

            {/* Galería de imágenes */}
            <div className="px-8 pt-6">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-sky-100">
                {/* Imagen principal */}
                <div className="relative h-64 bg-gray-100">
                  <img
                    src={images[currentImageIndex]}
                    alt={`${property.title} - Imagen ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover transition-all duration-500"
                  />

                  {/* Flechas de navegación */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-all duration-300 transform hover:scale-110 backdrop-blur-sm"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-all duration-300 transform hover:scale-110 backdrop-blur-sm"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* Contador de imágenes */}
                  <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/50 text-white text-xs rounded-full backdrop-blur-sm font-medium">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="flex gap-2 p-3 bg-gray-50 overflow-x-auto">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => selectImage(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 transform hover:scale-105 ${
                          index === currentImageIndex
                            ? 'border-sky-500 shadow-lg scale-105'
                            : 'border-gray-200 hover:border-sky-300 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Información de la propiedad */}
            <div className="px-8 py-6 space-y-5">
              {/* Título y Estado */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900">{property.title}</h3>
                  <p className="text-sky-600 font-semibold mt-1">{property.propertyType}</p>
                </div>
                <span className={`inline-flex px-4 py-2 rounded-full text-sm font-bold border ${getStatusBadge(property.status)}`}>
                  {property.status}
                </span>
              </div>

              {/* Dirección y Zona */}
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5 text-sky-500 flex-shrink-0" />
                <span className="font-medium">{property.address}</span>
                <span className="text-gray-400">•</span>
                <span className="font-medium">{property.zone}</span>
              </div>

              {/* Precio */}
              <div className="bg-gradient-to-r from-sky-50 to-sky-100 rounded-2xl p-4 border border-sky-200">
                <p className="text-sm text-sky-600 font-semibold mb-1">Precio</p>
                <p className="text-3xl font-black text-sky-700">{formatPrice(property.price)}</p>
              </div>

              {/* Características */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100 hover:border-sky-200 transition-all duration-300 hover:shadow-md">
                  <BedDouble className="w-6 h-6 text-sky-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{property.bedrooms}</p>
                  <p className="text-xs text-gray-500 font-medium">Cuartos</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100 hover:border-sky-200 transition-all duration-300 hover:shadow-md">
                  <Bath className="w-6 h-6 text-sky-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{property.bathrooms}</p>
                  <p className="text-xs text-gray-500 font-medium">Baños</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100 hover:border-sky-200 transition-all duration-300 hover:shadow-md">
                  <Maximize className="w-6 h-6 text-sky-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{property.area}</p>
                  <p className="text-xs text-gray-500 font-medium">Metros²</p>
                </div>
              </div>

              {/* Descripción */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 mb-2">Descripción</h4>
                <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 rounded-xl p-4 border border-gray-100">
                  {property.description}
                </p>
              </div>

              {/* Fecha de creación */}
              <div className="flex items-center gap-2 text-gray-400 text-sm pt-2 border-t border-gray-100">
                <Calendar className="w-4 h-4" />
                <span>Creado en: <span className="font-semibold text-gray-600">{property.createdAt}</span></span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PropertyDetailModal
