import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, ArrowLeft } from 'lucide-react'

/**
 * Componente presentacional - Modal de Confirmación para Eliminar Agente
 * @param {boolean} isOpen - Si el modal está abierto
 * @param {Function} onClose - Callback al cerrar / cancelar
 * @param {Function} onConfirm - Callback al confirmar eliminación
 * @param {Object|null} agent - Agente a eliminar
 * @param {boolean} isLoading - Estado de carga
 */
const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, agent = null, isLoading = false }) => {
  return (
    <AnimatePresence>
      {isOpen && agent && (
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
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {/* Header */}
            <div className="px-8 pt-6 pb-4">
              <button
                onClick={onClose}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm mb-4 transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver atrás
              </button>

              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  Eliminar Agente Inmobiliario
                </h2>
                <div className="h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent mt-3 mb-5 rounded-full"></div>
              </div>
            </div>

            {/* Contenido */}
            <div className="px-8 pb-4 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-4 animate-pulse">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              <p className="text-gray-700 text-base mb-2">
                ¿Estás seguro de eliminar a este agente inmobiliario del sistema?
              </p>
              <p className="text-sm text-gray-500 mb-1">
                <span className="font-semibold text-rose-700">ID: {agent.id}</span>
                {' — '}
                <span className="font-medium">{agent.firstName} {agent.lastName}</span>
              </p>
              <p className="text-xs text-gray-400">
                Esta acción no se puede deshacer.
              </p>
            </div>

            {/* Botones */}
            <div className="px-8 pb-8 pt-4 flex gap-4">
              <button
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white transition-all duration-500 transform hover:scale-[1.03] hover:-translate-y-1 active:scale-95 shadow-xl hover:shadow-2xl relative overflow-hidden group"
                style={{ transformStyle: 'preserve-3d', boxShadow: '0 10px 25px rgba(245, 158, 11, 0.3)' }}
              >
                <span className="relative z-10">Cancelar</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
              <button
                onClick={() => onConfirm(agent.id)}
                disabled={isLoading}
                className={`flex-1 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white transition-all duration-500 transform hover:scale-[1.03] hover:-translate-y-1 active:scale-95 shadow-xl hover:shadow-2xl relative overflow-hidden group ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                style={{ transformStyle: 'preserve-3d', boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)' }}
              >
                <span className="relative z-10">
                  {isLoading ? 'Eliminando...' : 'Eliminar'}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default DeleteConfirmModal
