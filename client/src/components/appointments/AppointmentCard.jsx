import { MapPin, User, Calendar } from 'lucide-react'
import { AppointmentStatusFactory } from '../../strategies/AppointmentStatus.strategy'

/**
 * Componente presentacional para tarjeta de cita
 */
const AppointmentCard = ({ appointment, onAccept, onReject }) => {
  const statusConfig = AppointmentStatusFactory.getStatusConfig(appointment.status)
  const StatusIcon = statusConfig.icon

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString)
      const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      const day = date.getDate()
      const month = months[date.getMonth()]
      const year = date.getFullYear()
      const hours = date.getHours()
      const minutes = date.getMinutes().toString().padStart(2, '0')
      const ampm = hours >= 12 ? 'PM' : 'AM'
      const displayHours = hours % 12 || 12
      
      return `${day} ${month} ${year}, ${displayHours}:${minutes} ${ampm}`
    } catch (error) {
      return dateString
    }
  }

  return (
    <div 
      className={`rounded-2xl border-2 p-6 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl group ${statusConfig.colorClass}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Información principal */}
        <div className="flex-1 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {appointment.propertyTitle}
              </h3>
              <div className="flex flex-col gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{appointment.agentName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{appointment.location}</span>
                </div>
              </div>
            </div>

            {/* Badge de estado */}
            <div className={`px-4 py-2 rounded-xl border-2 flex items-center gap-2 whitespace-nowrap ${statusConfig.badgeClass}`}>
              <StatusIcon className={`w-4 h-4 ${statusConfig.iconColor}`} />
              <span className="font-bold text-sm">{statusConfig.label}</span>
            </div>
          </div>

          {/* Contenido según estado */}
          <div className={`p-4 rounded-xl ${statusConfig.colorClass} border-2 ${statusConfig.colorClass.replace('bg-', 'border-')}`}>
            {/* Cita confirmada - mostrar fecha */}
            {statusConfig.showDateTime && appointment.scheduledDate && (
              <div className="space-y-3">
                <div className={`flex items-center gap-2 font-bold ${statusConfig.textColorClass}`}>
                  <Calendar className="w-5 h-5" />
                  <span>Cita programada para: {formatDate(appointment.scheduledDate)}</span>
                </div>
                {/* Descripción del agente */}
                {appointment.description && (
                  <div className="bg-white/90 rounded-lg p-3 border-2 border-green-200">
                    <p className="text-xs font-bold text-green-700 mb-1">Descripción del agente:</p>
                    <p className="text-gray-800 font-medium text-sm">
                      {appointment.description}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Pendiente del agente - mensaje */}
            {statusConfig.message && (
              <p className={`font-medium ${statusConfig.textColorClass}`}>
                {statusConfig.message}
              </p>
            )}

            {/* Pendiente del usuario - propuesta + botones */}
            {statusConfig.showProposal && appointment.proposedDate && (
              <div className="space-y-3">
                <div className={`flex items-center gap-2 font-bold ${statusConfig.textColorClass}`}>
                  <Calendar className="w-5 h-5" />
                  <span>Propuesta de horario: {formatDate(appointment.proposedDate)}</span>
                </div>
                {/* Descripción de la propuesta */}
                {appointment.description && (
                  <div className="bg-white/90 rounded-lg p-3 border-2 border-orange-200">
                    <p className="text-xs font-bold text-orange-700 mb-1">Descripción del agente:</p>
                    <p className="text-gray-800 font-medium text-sm">
                      {appointment.description}
                    </p>
                  </div>
                )}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => onAccept(appointment.id)}
                    className="flex-1 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl"
                  >
                    Aceptar Cita
                  </button>
                  <button
                    onClick={() => onReject(appointment.id)}
                    className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl"
                  >
                    Rechazar
                  </button>
                </div>
              </div>
            )}

            {/* Rechazada - motivo */}
            {statusConfig.showRejectionReason && appointment.rejectionReason && (
              <div className="space-y-3">
                {/* Descripción del agente */}
                {appointment.description && (
                  <div className="bg-white/90 rounded-lg p-3 border-2 border-red-200">
                    <p className="text-xs font-bold text-red-700 mb-1">Descripción del agente:</p>
                    <p className="text-gray-800 font-medium text-sm">
                      {appointment.description}
                    </p>
                  </div>
                )}
                {/* Motivo de rechazo */}
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3">
                  <p className="text-red-800 font-medium">
                    <span className="font-bold">Motivo de rechazo:</span> {appointment.rejectionReason}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Imagen de la propiedad (lado derecho en escritorio) */}
        <div className="w-full lg:w-80 h-48 lg:h-auto rounded-xl overflow-hidden group-hover:shadow-xl transition-all duration-500">
          {appointment.img ? (
            <img 
              src={appointment.img} 
              alt={appointment.propertyTitle}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <span className="text-gray-500 font-medium">Sin imagen</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AppointmentCard
