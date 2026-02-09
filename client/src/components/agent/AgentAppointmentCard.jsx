import { useState } from 'react'
import { Send } from 'lucide-react'
import { AgentAppointmentContext } from '../../context'

// Tarjetas para cada cita
const AgentAppointmentCard = ({ appointment, index, onPropose }) => {
  const context = new AgentAppointmentContext(appointment)
  const badge = context.getBadgeConfig()
  const panelType = context.getPanelType()

  const [formData, setFormData] = useState({ date: '', time: '', description: '' })
  const [sending, setSending] = useState(false)

  const handlePropose = async () => {
    if (!formData.date || !formData.time) return
    setSending(true)
    await onPropose(appointment.id, formData)
    setSending(false)
    setFormData({ date: '', time: '', description: '' })
  }

  const formatPrice = (price) =>
    `Q${price?.toLocaleString('es-GT') || '0'}`

  // Obtener colores dinámicos según estado
  const getStateColors = () => {
    const tabKey = context.getTabKey()
    const colorMap = {
      nuevas: { from: 'from-sky-500', to: 'to-blue-600', text: 'text-sky-600', glow: 'shadow-sky-500/50' },
      espera: { from: 'from-amber-500', to: 'to-orange-600', text: 'text-amber-600', glow: 'shadow-amber-500/50' },
      confirmadas: { from: 'from-emerald-500', to: 'to-green-600', text: 'text-emerald-600', glow: 'shadow-emerald-500/50' },
      canceladas: { from: 'from-red-500', to: 'to-rose-600', text: 'text-red-600', glow: 'shadow-red-500/50' },
    }
    return colorMap[tabKey] || colorMap.nuevas
  }
  
  const stateColors = getStateColors()

  return (
    <div
      className="animate-fadeInUp transform-gpu"
      style={{ animationDelay: `${index * 80}ms`, transformStyle: 'preserve-3d' }}
    >
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl border-2 border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01] overflow-hidden group relative">
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch">

          {/* ──── Imagen ──── */}
          <div className="lg:w-64 flex-shrink-0 p-5 flex items-center">
            <div className="relative w-full h-40 lg:h-full min-h-[200px] bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 rounded-2xl border-2 border-gray-200 flex items-center justify-center overflow-hidden transition-all duration-700 group-hover:shadow-xl">
              {/* Efecto de brillo */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <img
                src={appointment.propertyImage}
                alt={appointment.propertyTitle}
                className="relative z-10 w-20 h-20 object-contain opacity-30 group-hover:opacity-70 group-hover:scale-125 group-hover:rotate-6 transition-all duration-700"
              />
            </div>
          </div>

          {/* ──── Centro: Badge + Título + Dir/Zona + Cliente + Precio (todo junto) ──── */}
          <div className="flex-1 py-5 px-3 lg:px-4 flex flex-col lg:flex-row items-start lg:items-center gap-4">

            {/* Info izquierda */}
            <div className="flex-1 min-w-0 space-y-2">
              {/* Badge */}
              <span className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold border-2 shadow-md hover:shadow-lg transition-all duration-300 ${badge.bgColor} ${badge.textColor} ${badge.borderColor} group-hover:scale-105`}>
                <span className={`w-2.5 h-2.5 rounded-full ${badge.dotColor} animate-pulse`}></span>
                {badge.label}
              </span>

              {/* Título con gradiente */}
              <h3 className="text-2xl font-extrabold text-gray-900 leading-tight transition-all duration-500">
                {appointment.propertyTitle}
              </h3>

              {/* Dirección    Zona */}
              <div className="flex items-center gap-6 text-base text-gray-500 transition-colors duration-300">
                <span className="font-medium">{appointment.propertyAddress}</span>
                <span className={`font-bold px-3 py-1 rounded-lg bg-gradient-to-r ${stateColors.from} ${stateColors.to} text-white text-sm shadow-md`}>{appointment.propertyZone}</span>
              </div>

              {/* Cliente */}
              <p className="text-base text-gray-500 transition-colors duration-300">
                Cliente: <strong className={`font-extrabold bg-gradient-to-r ${stateColors.from} ${stateColors.to} bg-clip-text text-transparent`}>{appointment.clientName}</strong>
              </p>
            </div>

            {/* Precio a la derecha del bloque de info */}
            <div className="flex-shrink-0 text-center lg:text-right lg:pr-2 transform group-hover:scale-110 transition-transform duration-500">
              <p className={`text-lg font-extrabold bg-gradient-to-r ${stateColors.from} ${stateColors.to} bg-clip-text text-transparent leading-tight`}>Precio:</p>
              <p className={`text-4xl font-black bg-gradient-to-r ${stateColors.from} ${stateColors.to} bg-clip-text text-transparent tracking-tight drop-shadow-lg`}>{formatPrice(appointment.propertyPrice)}</p>
            </div>
          </div>

          {/* ──── Panel derecho según estado ──── */}
          <div className="lg:w-[310px] flex-shrink-0 p-4 flex items-center">

            {/* ── Proponer Fecha y Hora (Nueva Solicitud) ── */}
            {panelType === 'propose_form' && (
              <div className="w-full bg-gray-50 rounded-2xl border-2 border-gray-300 p-4 shadow-inner">
                <h4 className="text-sm font-extrabold text-gray-800 mb-3 text-center">
                  Proponer Fecha y Hora
                </h4>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div>
                    <label className="text-[11px] font-bold text-gray-500 mb-1 block">Fecha</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={e => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-2.5 py-2 rounded-lg border-2 border-gray-300 bg-white text-sm focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all duration-300 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-500 mb-1 block">Hora</label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={e => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-2.5 py-2 rounded-lg border-2 border-gray-300 bg-white text-sm focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all duration-300 outline-none"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="text-[11px] font-bold text-gray-500 mb-1 block">Descripción</label>
                  <textarea
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    rows={2}
                    placeholder="Detalles de la visita..."
                    className="w-full px-2.5 py-2 rounded-lg border-2 border-gray-300 bg-white text-sm focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all duration-300 outline-none resize-none"
                  />
                </div>
                <button
                  onClick={handlePropose}
                  disabled={!formData.date || !formData.time || sending}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-sky-600 via-blue-600 to-sky-700 hover:from-sky-500 hover:via-blue-500 hover:to-sky-600 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-xl font-bold text-sm transition-all duration-500 transform hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl hover:shadow-sky-500/50 disabled:shadow-none disabled:cursor-not-allowed relative overflow-hidden group/btn"
                >
                  {/* Efecto de brillo */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                  <Send className="w-4 h-4 relative z-10 group-hover/btn:rotate-12 transition-transform duration-300" />
                  <span className="relative z-10">{sending ? 'Enviando...' : 'Enviar Propuesta'}</span>
                </button>
              </div>
            )}

            {/* ── Fecha Propuesta (En Espera) ── */}
            {panelType === 'proposed_date' && (
              <div className="w-full bg-amber-50 rounded-2xl border-2 border-amber-300 p-4 shadow-inner">
                <h4 className="text-sm font-extrabold text-amber-800 mb-3 text-center">
                  Fecha Propuesta
                </h4>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 block mb-1">Fecha</label>
                    <div className="px-2.5 py-2 bg-white rounded-lg border-2 border-amber-200 text-sm font-semibold text-gray-800">
                      {appointment.proposedDate || '—'}
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 block mb-1">Hora</label>
                    <div className="px-2.5 py-2 bg-white rounded-lg border-2 border-amber-200 text-sm font-semibold text-gray-800">
                      {appointment.proposedTime || '—'}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-400 block mb-1">Descripción</label>
                  <div className="px-2.5 py-2 bg-white rounded-lg border-2 border-amber-200 text-sm text-gray-700">
                    {appointment.proposedDescription || 'Sin descripción'}
                  </div>
                </div>
              </div>
            )}

            {/* ── Cita Confirmada (Confirmada) ── */}
            {panelType === 'confirmed_date' && (
              <div className="w-full bg-emerald-50 rounded-2xl border-2 border-emerald-300 p-4 shadow-inner">
                <h4 className="text-sm font-extrabold text-emerald-800 mb-3 text-center">
                  Fecha Propuesta
                </h4>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 block mb-1">Fecha</label>
                    <div className="px-2.5 py-2 bg-white rounded-lg border-2 border-emerald-200 text-sm font-semibold text-gray-800">
                      {appointment.proposedDate || '—'}
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 block mb-1">Hora</label>
                    <div className="px-2.5 py-2 bg-white rounded-lg border-2 border-emerald-200 text-sm font-semibold text-gray-800">
                      {appointment.proposedTime || '—'}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-400 block mb-1">Descripción</label>
                  <div className="px-2.5 py-2 bg-white rounded-lg border-2 border-emerald-200 text-sm text-gray-700">
                    {appointment.proposedDescription || 'Sin descripción'}
                  </div>
                </div>
              </div>
            )}

            {/* ── Motivo del Rechazo (Cancelada) ── */}
            {panelType === 'rejection_reason' && (
              <div className="w-full bg-red-50 rounded-2xl border-2 border-red-300 p-4 shadow-inner">
                <h4 className="text-sm font-extrabold text-red-800 mb-3 text-center">
                  Motivo del Rechazo
                </h4>
                <div className="px-3 py-2.5 bg-white rounded-lg border-2 border-red-200 text-sm text-red-700 leading-relaxed">
                  {appointment.rejectionReason || 'Sin motivo especificado'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgentAppointmentCard
