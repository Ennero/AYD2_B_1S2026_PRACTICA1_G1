import { Lock, Check, X, Shield } from 'lucide-react'

/**
 * Formulario de seguridad (cambio de contraseña)
 */
const SecurityForm = ({ passwords, passwordValidation, onPasswordChange }) => {
  const requirements = [
    { key: 'length', label: 'Al menos 8+ caracteres', valid: passwordValidation.length },
    { key: 'uppercase', label: 'Al menos una mayúscula', valid: passwordValidation.uppercase },
    { key: 'lowercase', label: 'Al menos una minúscula', valid: passwordValidation.lowercase },
    { key: 'number', label: 'Al menos un número', valid: passwordValidation.number },
    { key: 'symbol', label: 'Al menos un símbolo', valid: passwordValidation.symbol }
  ]

  return (
    <div className="pt-8 border-t-2 border-gradient-to-r from-gray-100 via-orange-100 to-gray-100">
      <div className="flex items-center gap-3 mb-6 group">
        <div className="h-1 w-12 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full transition-all duration-500 group-hover:w-16"></div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-orange-600 bg-clip-text text-transparent flex items-center gap-2">
          <Shield className="w-7 h-7 text-orange-600" />
          Seguridad
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nueva Contraseña */}
        <div className="transform transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1 group" style={{ transformStyle: 'preserve-3d' }}>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Nueva Contraseña
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-orange-600 transition-all duration-500 group-hover:scale-110" />
            <input
              type="password"
              value={passwords.nuevaContrasena}
              onChange={(e) => onPasswordChange('nuevaContrasena', e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all duration-500 outline-none shadow-sm hover:shadow-lg group-hover:border-orange-300 bg-white"
              placeholder="••••••••"
              style={{ transform: 'translateZ(20px)' }}
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </div>
          
          {/* Validaciones */}
          {passwords.nuevaContrasena && (
            <div className="mt-4 space-y-2 bg-gradient-to-br from-gray-50 to-orange-50/30 p-4 rounded-xl border border-gray-200">
              {requirements.map((req, index) => (
                <div
                  key={req.key}
                  className={`flex items-center gap-2 text-sm font-medium transition-all duration-500 transform ${
                    req.valid ? 'text-green-600 scale-105' : 'text-gray-500'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {req.valid ? (
                    <div className="relative">
                      <Check className="w-5 h-5 text-green-600" />
                      <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-25"></div>
                    </div>
                  ) : (
                    <X className="w-5 h-5 text-gray-400" />
                  )}
                  <span>{req.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Confirmar Contraseña */}
        <div className="transform transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1 group" style={{ transformStyle: 'preserve-3d', animationDelay: '50ms' }}>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Confirmar Nueva Contraseña
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-orange-600 transition-all duration-500 group-hover:scale-110" />
            <input
              type="password"
              value={passwords.confirmarContrasena}
              onChange={(e) => onPasswordChange('confirmarContrasena', e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all duration-500 outline-none shadow-sm hover:shadow-lg group-hover:border-orange-300 bg-white"
              placeholder="••••••••"
              style={{ transform: 'translateZ(20px)' }}
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </div>
          
          {/* Mensaje de coincidencia */}
          {passwords.confirmarContrasena && (
            <div className="mt-4">
              {passwords.nuevaContrasena === passwords.confirmarContrasena ? (
                <div className="flex items-center gap-2 text-sm font-bold text-green-600 bg-green-50 px-4 py-3 rounded-xl border-2 border-green-200 animate-fadeIn">
                  <div className="relative">
                    <Check className="w-5 h-5" />
                    <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-25"></div>
                  </div>
                  <span>Las contraseñas coinciden</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm font-bold text-red-600 bg-red-50 px-4 py-3 rounded-xl border-2 border-red-200 animate-shake">
                  <X className="w-5 h-5" />
                  <span>Las contraseñas no coinciden</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SecurityForm
