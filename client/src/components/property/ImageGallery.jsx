import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const ImageGallery = ({ images, title, agentCard }) => {
  const [selectedImage, setSelectedImage] = useState(0)

  const nextImage = (e) => {
    e?.stopPropagation()
    setSelectedImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = (e) => {
    e?.stopPropagation()
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="folder-soft" clipPathUnits="objectBoundingBox">
            <path d="M0,1 L0,0.08 C0,0.02 0.02,0 0.08,0 L0.32,0 C0.40,0 0.42,0.08 0.50,0.08 L1,0.08 L1,1 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="lg:col-span-2 pt-4">
        
        <div 
          className="relative w-full h-full min-h-[500px] transition-transform duration-500 hover:scale-[1.005]"
          style={{ 
            filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.1))' 
          }}
        >
          <div 
            className="relative w-full h-full bg-gray-100 group overflow-hidden"
            style={{ 
              clipPath: 'url(#folder-soft)', 
              WebkitClipPath: 'url(#folder-soft)'
            }}
          >
            <img
              src={images[selectedImage]}
              alt={`${title} - Imagen ${selectedImage + 1}`}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="absolute bottom-6 right-6 flex items-center gap-3 z-20">
              <button
                onClick={prevImage}
                className="bg-white/90 backdrop-blur-sm p-3 rounded-full text-gray-800 hover:bg-white transition-all hover:scale-110 shadow-lg"
              >
                <ChevronLeft size={20} />
              </button>
              
              <button
                onClick={nextImage}
                className="bg-white/90 backdrop-blur-sm p-3 rounded-full text-gray-800 hover:bg-white transition-all hover:scale-110 shadow-lg"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            
            <div className="absolute bottom-8 left-8 text-white font-medium text-lg tracking-widest drop-shadow-md z-20">
              {String(selectedImage + 1).padStart(2, '0')} <span className="text-white/60 text-sm">/ {String(images.length).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-1 flex flex-col gap-6">
        {agentCard}

        <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4 ml-2">Galería</h3>
            <div className="grid grid-cols-3 gap-3">
            {images.map((image, index) => (
                <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-[4/3] rounded-2xl overflow-hidden transition-all duration-300 group ${
                    selectedImage === index
                    ? 'ring-2 ring-orange-500 ring-offset-2 scale-95'
                    : 'hover:opacity-90 hover:scale-105'
                }`}
                >
                <img 
                    src={image} 
                    alt="" 
                    className="w-full h-full object-cover" 
                />
                
                {selectedImage !== index && (
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                )}
                </button>
            ))}
            </div>
        </div>
      </div>
    </div>
  )
}

export default ImageGallery