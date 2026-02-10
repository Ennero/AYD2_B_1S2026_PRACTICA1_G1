import { Upload, User, Mail, Phone, Users } from 'lucide-react'

/**
 * Formulario de información personal
 */
const PersonalInfoForm = ({ personalInfo, onPersonalInfoChange, onPhotoChange }) => {
  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      onPhotoChange(file)
    }
  }

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-6 group">
        <div className="h-1 w-12 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full transition-all duration-500 group-hover:w-16"></div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-orange-600 bg-clip-text text-transparent">Información Personal</h2>
      </div>
      <p className="text-sm text-gray-600 mb-6 animate-fadeIn">
        Actualiza tus datos para mantener tu perfil al día
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nombre */}
        <div className="transform transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1 group" style={{ transformStyle: 'preserve-3d' }}>
          <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <User className="w-4 h-4 text-orange-600" />
            Nombre <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={personalInfo.nombre}
              onChange={(e) => onPersonalInfoChange('nombre', e.target.value)}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all duration-500 outline-none shadow-sm hover:shadow-lg group-hover:border-orange-300 bg-white"
              placeholder="Tu nombre"
              style={{ transform: 'translateZ(20px)' }}
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </div>
        </div>

        {/* Apellido */}
        <div className="transform transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1 group" style={{ transformStyle: 'preserve-3d', animationDelay: '50ms' }}>
          <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <User className="w-4 h-4 text-orange-600" />
            Apellido <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={personalInfo.apellido}
              onChange={(e) => onPersonalInfoChange('apellido', e.target.value)}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all duration-500 outline-none shadow-sm hover:shadow-lg group-hover:border-orange-300 bg-white"
              placeholder="Tus apellidos"
              style={{ transform: 'translateZ(20px)' }}
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </div>
        </div>

        {/* Correo (disabled) */}
        <div className="transform transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1 group" style={{ transformStyle: 'preserve-3d', animationDelay: '100ms' }}>
          <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <Mail className="w-4 h-4 text-red-600" />
            Correo <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              value={personalInfo.correo}
              disabled
              className="w-full px-4 py-4 border-2 border-red-200 rounded-xl bg-gradient-to-r from-red-50 to-orange-50 text-gray-600 cursor-not-allowed shadow-sm"
              style={{ transform: 'translateZ(20px)' }}
            />
          </div>
          <p className="text-xs text-red-600 mt-2 animate-pulse flex items-center gap-1">
           No se puede editar
          </p>
        </div>

        {/* Género */}
        <div className="transform transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1 group" style={{ transformStyle: 'preserve-3d', animationDelay: '150ms' }}>
          <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <Users className="w-4 h-4 text-orange-600" />
            Género <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              value={personalInfo.genero}
              onChange={(e) => onPersonalInfoChange('genero', e.target.value)}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all duration-500 outline-none appearance-none bg-white cursor-pointer shadow-sm hover:shadow-lg group-hover:border-orange-300"
              style={{ transform: 'translateZ(20px)' }}
            >
              <option value="">Selecciona tu género</option>
              <option value="masculino">Hombre</option>
              <option value="femenino">Mujer</option>
            </select>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </div>
        </div>

        {/* Teléfono */}
        <div className="transform transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1 group" style={{ transformStyle: 'preserve-3d', animationDelay: '200ms' }}>
          <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <Phone className="w-4 h-4 text-orange-600" />
            Teléfono <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="tel"
              value={personalInfo.telefono}
              onChange={(e) => onPersonalInfoChange('telefono', e.target.value)}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all duration-500 outline-none shadow-sm hover:shadow-lg group-hover:border-orange-300 bg-white"
              placeholder="+502 1234-5678"
              style={{ transform: 'translateZ(20px)' }}
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </div>
        </div>

        {/* Nueva Foto */}
        <div className="transform transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1" style={{ transformStyle: 'preserve-3d', animationDelay: '250ms' }}>
          <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <Upload className="w-4 h-4 text-orange-600" />
            Nueva Foto
          </label>
          <div className="relative group">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="photo-upload"
            />
            <label
              htmlFor="photo-upload"
              className="flex items-center justify-center gap-3 w-full px-4 py-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-orange-500 transition-all duration-500 cursor-pointer bg-gradient-to-br from-gray-50 to-orange-50/30 hover:from-orange-50 hover:to-orange-100 group shadow-sm hover:shadow-lg relative overflow-hidden"
              style={{ transform: 'translateZ(20px)' }}
            >
              <Upload className="w-5 h-5 text-gray-500 group-hover:text-orange-600 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12" />
              <span className="text-sm text-gray-600 group-hover:text-orange-600 font-bold transition-colors duration-500">
                {personalInfo.foto ? personalInfo.foto.name : 'Haz click para subir'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonalInfoForm
