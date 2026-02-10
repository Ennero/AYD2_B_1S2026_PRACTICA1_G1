import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Copy, CheckCircle2, Key, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'

/**
 * Componente presentacional - Modal para mostrar contraseña temporal
 * @param {boolean} isOpen - Si el modal está abierto
 * @param {Function} onClose - Callback al cerrar
 * @param {string} password - Contraseña temporal generada
 * @param {string} agentName - Nombre del agente creado
 */
const TemporaryPasswordModal = ({ isOpen, onClose, password, agentName = '' }) => {
  const [copied, setCopied] = useState(false)

  const handleCopyPassword = async () => {
    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      toast.success('Contraseña copiada al portapapeles', {
        icon: '📋',
        duration: 2000,
      })
      
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error('Error al copiar la contraseña')
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
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
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-8 py-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }}></div>
              
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                  <Key className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-white text-center relative z-10">
                Contraseña Temporal
              </h2>
              <p className="text-emerald-100 text-sm text-center mt-2 relative z-10">
                {agentName && `Para: ${agentName}`}
              </p>
            </div>

            {/* Separador decorativo */}
            <div className="h-1 bg-gradient-to-r from-emerald-400 via-emerald-600 to-emerald-400"></div>

            {/* Contenido */}
            <div className="p-8 space-y-6">
              {/* Alerta informativa */}
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-amber-800">
                      Dale al agente registrado esta contraseña temporal para que pueda acceder
                    </p>
                    <p className="text-xs text-amber-700 mt-1">
                      El agente deberá cambiarla en su primer inicio de sesión
                    </p>
                  </div>
                </div>
              </div>

              {/* Contraseña */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-gray-700 text-center uppercase tracking-wide">
                  Contraseña
                </label>
                
                {/* Caja de contraseña */}
                <div className="relative group">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300 rounded-2xl p-6 transition-all duration-300 group-hover:border-emerald-400 group-hover:shadow-lg">
                    <div className="flex items-center justify-center gap-3">
                      <code className="text-3xl font-bold text-gray-800 tracking-wider select-all">
                        {password}
                      </code>
                    </div>
                  </div>
                  
                  {/* Efecto de brillo */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
                </div>

                {/* Botón copiar */}
                <button
                  onClick={handleCopyPassword}
                  className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-xl ${
                    copied
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                      : 'bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white'
                  }`}
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      ¡Copiada!
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      Copiar Contraseña
                    </>
                  )}
                </button>
              </div>

              {/* Botón cerrar */}
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all duration-300 border-2 border-gray-200 hover:border-gray-300"
              >
                Cerrar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default TemporaryPasswordModal
