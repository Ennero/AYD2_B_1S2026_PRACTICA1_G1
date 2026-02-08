import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, User, Mail, Phone, Upload, ArrowLeft } from 'lucide-react'

/**
 * Componente presentacional - Modal de Formulario para Crear/Editar Agente
 * @param {boolean} isOpen - Si el modal está abierto
 * @param {Function} onClose - Callback al cerrar
 * @param {Function} onSubmit - Callback al enviar el formulario
 * @param {Object|null} agent - Agente a editar (null para crear)
 * @param {boolean} isLoading - Estado de carga
 */
const AgentFormModal = ({ isOpen, onClose, onSubmit, agent = null, isLoading = false }) => {
  const isEditing = !!agent
  const [previewImage, setPreviewImage] = useState(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    photo: null,
  })

  useEffect(() => {
    if (agent) {
      setFormData({
        firstName: agent.firstName || '',
        lastName: agent.lastName || '',
        email: agent.email || '',
        phone: agent.phone || '',
        photo: null,
      })
      setPreviewImage(agent.photo || null)
    } else {
      setFormData({ firstName: '', lastName: '', email: '', phone: '', photo: null })
      setPreviewImage(null)
    }
  }, [agent, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }))
      const reader = new FileReader()
      reader.onloadend = () => setPreviewImage(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
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
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-rose-700 to-rose-800 px-8 py-6 relative overflow-hidden">
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
                {isEditing ? 'Editar Agente Inmobiliario' : 'Registra un Agente Inmobiliario'}
              </h2>
              <p className="text-rose-200 text-sm mt-1 relative z-10">
                {isEditing ? 'Modifica los datos del agente inmobiliario' : 'Dale acceso a la plataforma a un agente inmobiliario nuevo'}
              </p>
            </div>

            {/* Separador decorativo */}
            <div className="h-1 bg-gradient-to-r from-rose-400 via-rose-600 to-rose-400"></div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              {/* Nombre y Apellido */}
              <div className="grid grid-cols-2 gap-4">
                <div className="transform transition-all duration-300 hover:scale-[1.02]">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-rose-600 group-hover:scale-110" />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder="Carlos"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-rose-100 focus:border-rose-400 transition-all duration-300 hover:border-rose-300 hover:shadow-md"
                    />
                  </div>
                </div>
                <div className="transform transition-all duration-300 hover:scale-[1.02]">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Apellido <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-rose-600 group-hover:scale-110" />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Méndez"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-rose-100 focus:border-rose-400 transition-all duration-300 hover:border-rose-300 hover:shadow-md"
                    />
                  </div>
                </div>
              </div>

              {/* Correo Electrónico */}
              <div className="transform transition-all duration-300 hover:scale-[1.01]">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Correo Electrónico <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-rose-600 group-hover:scale-110" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="correo@homefinder.com"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-rose-100 focus:border-rose-400 transition-all duration-300 hover:border-rose-300 hover:shadow-md"
                  />
                </div>
              </div>

              {/* Número de Teléfono */}
              <div className="transform transition-all duration-300 hover:scale-[1.01]">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Número de Teléfono <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-rose-600 group-hover:scale-110" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="5551-1234"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-rose-100 focus:border-rose-400 transition-all duration-300 hover:border-rose-300 hover:shadow-md"
                  />
                </div>
              </div>

              {/* Rol (solo lectura) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Rol<span className="text-red-500">*</span>
                </label>
                <p className="text-lg font-bold text-rose-700">Agente Inmobiliario</p>
              </div>

              {/* Fotografía */}
              <div className="transform transition-all duration-300">
                <label className="block text-sm font-semibold text-gray-700 mb-3 text-center">
                  Fotografía
                </label>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-rose-200 shadow-lg bg-gray-100 flex items-center justify-center transition-all duration-300 hover:border-rose-400 hover:shadow-xl">
                    {previewImage ? (
                      <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-10 h-10 text-gray-300" />
                    )}
                  </div>
                  <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-700 rounded-xl border border-rose-200 hover:bg-rose-100 transition-all duration-300 text-sm font-semibold hover:scale-105 active:scale-95">
                    <Upload className="w-4 h-4" />
                    Subir imagen
                    <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                  </label>
                </div>
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
                    : '0 10px 25px rgba(16, 185, 129, 0.4)' 
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

export default AgentFormModal
