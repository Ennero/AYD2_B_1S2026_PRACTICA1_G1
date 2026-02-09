import { Calendar, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

/**
 * Strategy Pattern para estados de citas
 * Determina color, icono y comportamiento según el estado
 */

class AppointmentStatusStrategy {
  getStatusConfig(status) {
    throw new Error('Método getStatusConfig debe ser implementado')
  }
}

// Estrategia para citas confirmadas
class ConfirmedAppointmentStrategy extends AppointmentStatusStrategy {
  getStatusConfig() {
    return {
      label: 'Confirmada: Cita Agendada',
      colorClass: 'bg-green-50 border-green-300',
      textColorClass: 'text-green-800',
      badgeClass: 'bg-green-100 text-green-800 border-green-300',
      icon: CheckCircle,
      iconColor: 'text-green-600',
      showDateTime: true,
      showActions: false,
      ringColor: 'ring-green-500'
    }
  }
}

// Estrategia para citas pendientes del agente
class PendingAgentAppointmentStrategy extends AppointmentStatusStrategy {
  getStatusConfig() {
    return {
      label: 'Pendiente: Esperando propuesta del...',
      colorClass: 'bg-yellow-50 border-yellow-300',
      textColorClass: 'text-yellow-800',
      badgeClass: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      icon: AlertCircle,
      iconColor: 'text-yellow-600',
      showDateTime: false,
      showActions: false,
      message: 'El agente recibirá tu solicitud y te propondrá un horario pronto',
      ringColor: 'ring-yellow-500'
    }
  }
}

// Estrategia para citas pendientes del usuario (debe aceptar/rechazar)
class PendingUserAppointmentStrategy extends AppointmentStatusStrategy {
  getStatusConfig() {
    return {
      label: 'Pendiente: Fecha-Hora no elegida',
      colorClass: 'bg-blue-50 border-blue-300',
      textColorClass: 'text-blue-800',
      badgeClass: 'bg-blue-100 text-blue-800 border-blue-300',
      icon: Clock,
      iconColor: 'text-blue-600',
      showDateTime: false,
      showActions: true,
      showProposal: true,
      ringColor: 'ring-blue-500'
    }
  }
}

// Estrategia para citas rechazadas/canceladas
class RejectedAppointmentStrategy extends AppointmentStatusStrategy {
  getStatusConfig() {
    return {
      label: 'Rechazada: Cita Cancelada',
      colorClass: 'bg-gray-50 border-gray-300',
      textColorClass: 'text-gray-600',
      badgeClass: 'bg-red-100 text-red-800 border-red-300',
      icon: XCircle,
      iconColor: 'text-red-600',
      showDateTime: false,
      showActions: false,
      showRejectionReason: true,
      ringColor: 'ring-gray-400'
    }
  }
}

// Factory para obtener la estrategia correcta
export class AppointmentStatusFactory {
  static getStrategy(status) {
    const strategies = {
      confirmed: new ConfirmedAppointmentStrategy(),
      pending_agent: new PendingAgentAppointmentStrategy(),
      pending_user: new PendingUserAppointmentStrategy(),
      rejected: new RejectedAppointmentStrategy()
    }

    return strategies[status] || new PendingAgentAppointmentStrategy()
  }

  static getStatusConfig(status) {
    const strategy = this.getStrategy(status)
    return strategy.getStatusConfig()
  }
}
