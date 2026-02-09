
import { useState } from 'react'
import { Eye, EyeOff, Upload, User, Phone, Mail, Lock, AlertCircle } from 'lucide-react'

const RegisterForm = ({ onSubmit, isLoading }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    photo: null
  })

  const validateField = (name, value) => {
    let error = ''
    
    switch(name) {
      case 'email':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Correo electrónico inválido'
        }
        break
      case 'password':
        if (value && value.length < 8) {
          error = 'Debe tener al menos 8 caracteres'
        }
        break
      case 'confirmPassword':
        if (value && value !== formData.password) {
          error = 'Las contraseñas no coinciden'
        }
        break
      case 'phone':
        const phoneDigits = value.replace(/\D/g, '')
        if (value && (phoneDigits.length < 8 || phoneDigits.length > 9)) {
          error = 'Debe tener 8 o 9 dígitos'
        }
        break
      case 'firstName':
      case 'lastName':
        if (value && value.length < 2) {
          error = 'Debe tener al menos 2 caracteres'
        }
        break
    }
    
    return error
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Validar en tiempo real solo si el campo ya fue tocado
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors(prev => ({
        ...prev,
        [name]: error
      }))
    }
    
    // Si es confirmPassword, también validar cuando password cambia
    if (name === 'password' && touched.confirmPassword) {
      const confirmError = formData.confirmPassword !== value ? 'Las contraseñas no coinciden' : ''
      setErrors(prev => ({
        ...prev,
        confirmPassword: confirmError
      }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched(prev => ({
      ...prev,
      [name]: true
    }))
    
    const error = validateField(name, value)
    setErrors(prev => ({
      ...prev,
      [name]: error
    }))
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" style={{ perspective: '1000px' }}>
      {/* Nombre y Apellido*/}
      <div className="grid grid-cols-2 gap-4">
        <div className="transform transition-all duration-500 hover:scale-105 hover:rotate-y-2" style={{ transformStyle: 'preserve-3d' }}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre <span className="text-red-500">*</span>
          </label>
          <div className="relative group">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-blue-500 group-hover:scale-110" />
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              onBlur={(e) => handleBlur('firstName', e.target.value)}
              required
              className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100 hover:shadow-lg hover:-translate-y-0.5 focus:shadow-xl focus:-translate-y-1 ${
                errors.firstName && touched.firstName ? 'border-red-300 bg-red-50' : 'border-gray-200'
              }`}
              placeholder="Michel"
              style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)' }}
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </div>
          {errors.firstName && touched.firstName && (
            <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
              <AlertCircle className="w-4 h-4" />
              {errors.firstName}
            </p>
          )}
        </div>

        <div className="transform transition-all duration-500 hover:scale-105 hover:rotate-y-2" style={{ transformStyle: 'preserve-3d' }}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Apellidos <span className="text-red-500">*</span>
          </label>
          <div className="relative group">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-blue-500 group-hover:scale-110" />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={(e) => handleBlur('lastName', e.target.value)}
              required
              className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100 hover:shadow-lg hover:-translate-y-0.5 focus:shadow-xl focus:-translate-y-1 ${
                errors.lastName && touched.lastName ? 'border-red-300 bg-red-50' : 'border-gray-200'
              }`}
              placeholder="Mosiak"
              style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)' }}
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </div>
          {errors.lastName && touched.lastName && (
            <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
              <AlertCircle className="w-4 h-4" />
              {errors.lastName}
            </p>
          )}
        </div>
      </div>

      {/* Género */}
      <div className="transform transition-all duration-300">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Género <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-4">
          <label className="flex items-center cursor-pointer group">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={handleChange}
              required
              className="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2 transition-all"
            />
            <span className="ml-2 text-sm text-gray-700 group-hover:text-blue-600 transition-colors duration-200">Hombre</span>
          </label>
          <label className="flex items-center cursor-pointer group">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={handleChange}
              required
              className="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2 transition-all"
            />
            <span className="ml-2 text-sm text-gray-700 group-hover:text-blue-600 transition-colors duration-200">Mujer</span>
          </label>
        </div>
      </div>

      {/* Teléfono */}
      <div className="transform transition-all duration-500 hover:scale-105" style={{ transformStyle: 'preserve-3d' }}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Teléfono <span className="text-red-500">*</span>
        </label>
        <div className="relative group">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-blue-500 group-hover:scale-110 group-hover:rotate-12" />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={(e) => handleBlur('phone', e.target.value)}
            required
            className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100 hover:shadow-lg hover:-translate-y-0.5 focus:shadow-xl focus:-translate-y-1 ${
              errors.phone && touched.phone ? 'border-red-300 bg-red-50' : 'border-gray-200'
            }`}
            placeholder="+502 1234-5678"
            style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)' }}
          />
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        </div>
        {errors.phone && touched.phone && (
          <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
            <AlertCircle className="w-4 h-4" />
            {errors.phone}
          </p>
        )}
      </div>

      {/* Correo Electrónico */}
      <div className="transform transition-all duration-500 hover:scale-105" style={{ transformStyle: 'preserve-3d' }}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Correo Electrónico <span className="text-red-500">*</span>
        </label>
        <div className="relative group">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-blue-500 group-hover:scale-110" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={(e) => handleBlur('email', e.target.value)}
            required
            className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100 hover:shadow-lg hover:-translate-y-0.5 focus:shadow-xl focus:-translate-y-1 ${
              errors.email && touched.email ? 'border-red-300 bg-red-50' : 'border-gray-200'
            }`}
            placeholder="michel.mosiak@gmail.com"
            style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)' }}
          />
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        </div>
        {errors.email && touched.email && (
          <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
            <AlertCircle className="w-4 h-4" />
            {errors.email}
          </p>
        )}
      </div>

      {/* Contraseña */}
      <div className="transform transition-all duration-500 hover:scale-105" style={{ transformStyle: 'preserve-3d' }}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Contraseña <span className="text-red-500">*</span>
        </label>
        <div className="relative group">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-blue-500 group-hover:scale-110 group-hover:rotate-12" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={(e) => handleBlur('password', e.target.value)}
            required
            className={`w-full pl-10 pr-12 py-2.5 bg-gray-50 border rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100 hover:shadow-lg hover:-translate-y-0.5 focus:shadow-xl focus:-translate-y-1 ${
              errors.password && touched.password ? 'border-red-300 bg-red-50' : 'border-gray-200'
            }`}
            placeholder="••••••••"
            style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)' }}
          />
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-all duration-300 hover:scale-125 hover:rotate-180 z-10"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.password && touched.password && (
          <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
            <AlertCircle className="w-4 h-4" />
            {errors.password}
          </p>
        )}
      </div>

      {/* Confirmar Contraseña */}
      <div className="transform transition-all duration-500 hover:scale-105" style={{ transformStyle: 'preserve-3d' }}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Confirmar Contraseña <span className="text-red-500">*</span>
        </label>
        <div className="relative group">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-blue-500 group-hover:scale-110 group-hover:rotate-12" />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={(e) => handleBlur('confirmPassword', e.target.value)}
            required
            className={`w-full pl-10 pr-12 py-2.5 bg-gray-50 border rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100 hover:shadow-lg hover:-translate-y-0.5 focus:shadow-xl focus:-translate-y-1 ${
              errors.confirmPassword && touched.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-200'
            }`}
            placeholder="••••••••"
            style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)' }}
          />
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-all duration-300 hover:scale-125 hover:rotate-180 z-10"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.confirmPassword && touched.confirmPassword && (
          <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
            <AlertCircle className="w-4 h-4" />
            {errors.confirmPassword}
          </p>
        )}
      </div>

      {/* Subir Fotografía */}
      <div className="transform transition-all duration-500 hover:scale-105" style={{ transformStyle: 'preserve-3d' }}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Subir Fotografía
        </label>
        <div className="flex items-center gap-4">
          <label className="flex-1 cursor-pointer group relative">
            <div className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg hover:bg-white hover:border-blue-500 transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl group-hover:-translate-y-1" style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)' }}>
              <Upload className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 group-hover:rotate-12" />
              <span className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors duration-200 font-medium">
                {formData.photo ? formData.photo.name : 'Seleccionar imagen'}
              </span>
            </div>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </label>
          {previewImage && (
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500 shadow-xl transform transition-all duration-500 hover:scale-125 hover:rotate-12 hover:shadow-2xl animate-fadeIn" style={{ boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)' }}>
              <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>

      {/* Botón de envío */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold shadow-xl hover:shadow-2xl hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 hover:-translate-y-1 active:scale-95 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0 mt-6 relative overflow-hidden group"
        style={{ transformStyle: 'preserve-3d' }}
      >
        
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        
        {isLoading ? (
          <span className="flex items-center justify-center gap-2 relative z-10">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Creando cuenta...
          </span>
        ) : (
          <span className="relative z-10">Crear Cuenta</span>
        )}
      </button>
    </form>
  )
}

export default RegisterForm
