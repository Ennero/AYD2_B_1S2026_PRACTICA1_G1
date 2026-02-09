import { X } from 'lucide-react'

/**
 * Componente presentacional para modal de rechazo
 */
const RejectModal = ({ isOpen, onClose, onConfirm, reason, setReason }) => {
  if (!isOpen) return null

  const handleConfirm = () => {
    if (reason.trim()) {
      onConfirm()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div 
        className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-scaleIn3D"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Rechazar Propuesta</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-300"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Mensaje */}
        <p className="text-gray-600 mb-4">
          Por favor, indica el motivo por el cual no puedes asistir a esta cita:
        </p>

        {/* Campo de texto */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            ¿Por qué no te funciona este horario?
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Ejemplo: Tengo otro cita, ya no me interesa, cambio otro dia..."
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all duration-300 outline-none resize-none"
            rows="4"
          />
          {!reason.trim() && (
            <p className="text-xs text-red-500 mt-2">* Este campo es obligatorio</p>
          )}
        </div>

        {/* Botones */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 transform hover:scale-105"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={!reason.trim()}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-bold hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
          >
            Confirmar Rechazo
          </button>
        </div>
      </div>
    </div>
  )
}

export default RejectModal
