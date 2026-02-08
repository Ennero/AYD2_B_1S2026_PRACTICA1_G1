import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * Galería de imágenes con miniaturas verticales a la derecha
 */
const ImageGallery = ({ images, title, agentCard }) => {
  const [selectedImage, setSelectedImage] = useState(0)

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Imagen principal */}
      <div className="lg:col-span-2">
        <div className="bg-white overflow-hidden shadow-xl transform transition-all duration-500 hover:shadow-2xl h-full" style={{ transformStyle: 'preserve-3d', borderRadius: '60px 60px 30px 30px' }}>
          <div className="relative h-full min-h-[600px] overflow-hidden group" style={{ borderRadius: '60px 60px 30px 30px' }}>
            <img
              src={images[selectedImage]}
              alt={`${title} - Imagen ${selectedImage + 1}`}
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Overlay gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Indicador de imagen */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-semibold">
              {selectedImage + 1} / {images.length}
            </div>

            {/* Botones de navegación */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md text-gray-900 p-3 rounded-full hover:bg-white transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg opacity-0 group-hover:opacity-100"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md text-gray-900 p-3 rounded-full hover:bg-white transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg opacity-0 group-hover:opacity-100"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar derecho - 1 columna */}
      <div className="lg:col-span-1 space-y-4">
        {/* Tarjeta del agente */}
        {agentCard}

        {/* Miniaturas verticales  */}
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative w-full h-20 rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                selectedImage === index
                  ? 'ring-4 ring-orange-500 shadow-lg'
                  : 'ring-2 ring-gray-200 hover:ring-orange-300'
              }`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img
                src={image}
                alt={`Miniatura ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {selectedImage === index && (
                <div className="absolute inset-0 bg-orange-500/20 backdrop-blur-[1px] flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full shadow-lg"></div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ImageGallery
