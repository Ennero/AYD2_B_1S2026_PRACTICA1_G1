import { Save, X } from 'lucide-react'

/**
 * Botones de acción del perfil
 */
const ProfileActions = ({ onCancel, onSave, isSubmitting }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
      {/* Cancelar */}
      <button
        onClick={onCancel}
        disabled={isSubmitting}
        className="w-full sm:w-auto px-10 py-5 bg-gradient-to-br from-white to-gray-50 border-2 border-gray-300 text-gray-700 rounded-2xl font-bold text-lg hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-100 hover:border-gray-400 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-110 hover:-translate-y-2 hover:rotate-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group relative overflow-hidden"
        style={{ transformStyle: 'preserve-3d', transform: 'translateZ(30px)' }}
      >
        <X className="w-6 h-6 transition-all duration-500 group-hover:rotate-90 group-hover:scale-110" />
        <span>Cancelar</span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      </button>

      {/* Guardar */}
      <button
        onClick={onSave}
        disabled={isSubmitting}
        className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 text-white rounded-2xl font-bold text-lg hover:from-orange-600 hover:via-orange-700 hover:to-orange-600 transition-all duration-500 shadow-2xl hover:shadow-orange-500/50 transform hover:scale-110 hover:-translate-y-2 hover:-rotate-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group flex items-center justify-center gap-3"
        style={{ transformStyle: 'preserve-3d', transform: 'translateZ(30px)' }}
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
            <span>Guardando...</span>
          </>
        ) : (
          <>
            <Save className="w-6 h-6 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110" />
            <span>Guardar Cambios</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute top-0 left-1/4 w-2 h-2 bg-white rounded-full animate-ping"></div>
              <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-white rounded-full animate-ping" style={{ animationDelay: '150ms' }}></div>
              <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-white rounded-full animate-ping" style={{ animationDelay: '300ms' }}></div>
            </div>
          </>
        )}
      </button>
    </div>
  )
}

export default ProfileActions
