import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowLeft, Upload, Home, MapPin, DollarSign, BedDouble, Bath, Maximize, FileText, Image, ChevronDown } from 'lucide-react'

/**
 * Componente presentacional - Modal de Formulario para Crear/Editar Propiedad
 * @param {boolean} isOpen - Si el modal está abierto
 * @param {Function} onClose - Callback al cerrar
 * @param {Function} onSubmit - Callback al enviar el formulario
 * @param {Object|null} property - Propiedad a editar (null para crear)
 * @param {boolean} isLoading - Estado de carga
 */
const PropertyFormModal = ({ isOpen, onClose, onSubmit, property = null, isLoading = false }) => {
  const isEditing = !!property
  const [previewImages, setPreviewImages] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    propertyType: 'Casa',
    address: '',
    zone: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    status: 'Disponible',
    description: '',
    images: [],
  })

  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title || '',
        propertyType: property.propertyType || 'Casa',
        address: property.address || '',
        zone: property.zone || '',
        price: property.price || '',
        bedrooms: property.bedrooms || '',
        bathrooms: property.bathrooms || '',
        area: property.area || '',
        status: property.status || 'Disponible',
        description: property.description || '',
        images: [],
      })
      setPreviewImages(property.images || [])
    } else {
      setFormData({
        title: '',
        propertyType: 'Casa',
        address: '',
        zone: '',
        price: '',
        bedrooms: '',
        bathrooms: '',
        area: '',
        status: 'Disponible',
        description: '',
        images: [],
      })
      setPreviewImages([])
    }
  }, [property, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }))
      files.forEach(file => {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreviewImages(prev => [...prev, reader.result])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeImage = (index) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index))
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validar que haya al menos una imagen
    if (previewImages.length === 0) {
      alert('Debes subir al menos una imagen de la propiedad')
      return
    }
    
    const dataToSubmit = {
      ...formData,
      price: Number(formData.price),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      area: Number(formData.area),
      images: previewImages,
    }
    
    console.log('📝 Datos del formulario a enviar:', dataToSubmit)
    onSubmit(dataToSubmit)
  }

  return (
    <AnimatePresence>
      {isOpen && (
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
            <div className="bg-gradient-to-r from-sky-500 to-sky-600 px-8 py-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }}></div>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition-all duration-300 transform hover:scale-110 hover:rotate-90"
              >
                <X className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="flex items-center gap-2 text-white/80 hover:text-white text-sm mb-3 transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver atrás
              </button>
              <h2 className="text-2xl font-bold text-white relative z-10">
                {isEditing ? 'Editar Propiedad' : 'Ingresa una Propiedad'}
              </h2>
              <p className="text-sky-100 text-sm mt-1 relative z-10">
                {isEditing ? 'Modifica los datos de la propiedad inmobiliaria' : 'Publica una nueva propiedad en la plataforma'}
              </p>
            </div>

            {/* Separador decorativo */}
            <div className="h-1 bg-gradient-to-r from-sky-300 via-sky-500 to-sky-300"></div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              {/* Título */}
              <div className="transform transition-all duration-300 hover:scale-[1.01]">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Título <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-sky-500 group-hover:scale-110" />
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="Casa Residencial en Zona 10"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-sky-100 focus:border-sky-400 transition-all duration-300 hover:border-sky-300 hover:shadow-md"
                  />
                </div>
              </div>

              {/* Tipo y Dirección */}
              <div className="grid grid-cols-2 gap-4">
                <div className="transform transition-all duration-300 hover:scale-[1.02]">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tipo <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-sky-100 focus:border-sky-400 transition-all duration-300 hover:border-sky-300 hover:shadow-md appearance-none cursor-pointer pr-10"
                    >
                      <option value="Casa">Casa</option>
                      <option value="Apartamento">Apartamento</option>
                      <option value="Terreno">Terreno</option>
                      <option value="Local Comercial">Local Comercial</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div className="transform transition-all duration-300 hover:scale-[1.02]">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Dirección <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-sky-500 group-hover:scale-110" />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      placeholder="Avenida Las Américas 15-30"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-sky-100 focus:border-sky-400 transition-all duration-300 hover:border-sky-300 hover:shadow-md"
                    />
                  </div>
                </div>
              </div>

              {/* Zona y Precio */}
              <div className="grid grid-cols-2 gap-4">
                <div className="transform transition-all duration-300 hover:scale-[1.02]">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Zona <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-sky-500 group-hover:scale-110" />
                    <input
                      type="number"
                      name="zone"
                      value={formData.zone}
                      onChange={handleChange}
                      required
                      placeholder="10"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-sky-100 focus:border-sky-400 transition-all duration-300 hover:border-sky-300 hover:shadow-md"
                    />
                  </div>
                </div>
                <div className="transform transition-all duration-300 hover:scale-[1.02]">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Precio (Q) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-sky-500 group-hover:scale-110" />
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      min="0"
                      placeholder="1,250,000"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-sky-100 focus:border-sky-400 transition-all duration-300 hover:border-sky-300 hover:shadow-md"
                    />
                  </div>
                </div>
              </div>

              {/* Cuartos, Baños, Metros */}
              <div className="grid grid-cols-3 gap-4">
                <div className="transform transition-all duration-300 hover:scale-[1.02]">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    No. de Cuartos <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <BedDouble className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-sky-500 group-hover:scale-110" />
                    <input
                      type="number"
                      name="bedrooms"
                      value={formData.bedrooms}
                      onChange={handleChange}
                      required
                      min="0"
                      placeholder="4"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-sky-100 focus:border-sky-400 transition-all duration-300 hover:border-sky-300 hover:shadow-md"
                    />
                  </div>
                </div>
                <div className="transform transition-all duration-300 hover:scale-[1.02]">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    No. de Baños <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <Bath className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-sky-500 group-hover:scale-110" />
                    <input
                      type="number"
                      name="bathrooms"
                      value={formData.bathrooms}
                      onChange={handleChange}
                      required
                      min="0"
                      placeholder="3"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-sky-100 focus:border-sky-400 transition-all duration-300 hover:border-sky-300 hover:shadow-md"
                    />
                  </div>
                </div>
                <div className="transform transition-all duration-300 hover:scale-[1.02]">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Metros² <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <Maximize className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-sky-500 group-hover:scale-110" />
                    <input
                      type="number"
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      required
                      min="0"
                      step="0.1"
                      placeholder="280.5"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-sky-100 focus:border-sky-400 transition-all duration-300 hover:border-sky-300 hover:shadow-md"
                    />
                  </div>
                </div>
              </div>

              {/* Estado */}
              <div className="transform transition-all duration-300 hover:scale-[1.01]">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Estado <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-sky-100 focus:border-sky-400 transition-all duration-300 hover:border-sky-300 hover:shadow-md appearance-none cursor-pointer pr-10"
                  >
                    <option value="Disponible">Disponible</option>
                    <option value="No Disponible">No Disponible</option>
                    <option value="Vendido">Vendido</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Descripción */}
              <div className="transform transition-all duration-300 hover:scale-[1.01]">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Descripción <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-sky-500 group-hover:scale-110" />
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={3}
                    placeholder="Describe las características de la propiedad..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-sky-100 focus:border-sky-400 transition-all duration-300 hover:border-sky-300 hover:shadow-md resize-none"
                  />
                </div>
              </div>

              {/* Imagen de la Propiedad */}
              <div className="transform transition-all duration-300">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <div className="flex items-center gap-2">
                    <Image className="w-4 h-4 text-sky-500" />
                    Imagen de la Propiedad <span className="text-red-500">*</span>
                  </div>
                </label>

                {/* Preview de imágenes */}
                {previewImages.length > 0 && (
                  <div className="flex flex-wrap gap-3 mb-4">
                    {previewImages.map((img, index) => (
                      <div key={index} className="relative group/img">
                        <img
                          src={img}
                          alt={`Preview ${index + 1}`}
                          className="w-20 h-20 rounded-xl object-cover border-2 border-sky-200 shadow-md transition-all duration-300 group-hover/img:border-sky-400"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600 transition-all duration-200 transform hover:scale-110 shadow-md opacity-0 group-hover/img:opacity-100"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <label className="cursor-pointer flex items-center justify-center gap-2 px-6 py-4 bg-sky-50 text-sky-700 rounded-xl border-2 border-dashed border-sky-300 hover:bg-sky-100 hover:border-sky-400 transition-all duration-300 text-sm font-semibold hover:scale-[1.02] active:scale-95">
                  <Upload className="w-5 h-5" />
                  Subir imágenes de la propiedad
                  <input type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" />
                </label>
                <p className="text-xs text-gray-400 mt-2 text-center">Mínimo 1 imagen requerida</p>
              </div>

              {/* Botón de acción */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1 active:scale-95 shadow-xl hover:shadow-2xl relative overflow-hidden group ${
                  isEditing
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white'
                    : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white'
                } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                style={{
                  transformStyle: 'preserve-3d',
                  boxShadow: isEditing
                    ? '0 10px 25px rgba(245, 158, 11, 0.4)'
                    : '0 10px 25px rgba(16, 185, 129, 0.4)',
                }}
              >
                <span className="relative z-10">
                  {isLoading ? 'Procesando...' : isEditing ? 'Editar' : 'Crear'}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PropertyFormModal
