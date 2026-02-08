/**
 * Command Pattern - Servicio para gestión de citas
 * Encapsula todas las operaciones relacionadas con citas
 */

// Datos simulados
const MOCK_APPOINTMENTS = [
  {
    id: 1,
    propertyTitle: 'Casa Modern Style Zona 10',
    agentName: 'María González',
    location: 'Zona 10',
    status: 'confirmed',
    scheduledDate: '2026-02-12T10:00:00',
    createdAt: '2026-02-01T14:30:00'
  },
  {
    id: 2,
    propertyTitle: 'Apartamento Lux Zone 14',
    agentName: 'Carlos Ramírez',
    location: 'Zona 14',
    status: 'pending_agent',
    createdAt: '2026-02-05T09:15:00'
  },
  {
    id: 3,
    propertyTitle: 'Villa Colonial Antigua',
    agentName: 'Ana Martínez',
    location: 'Antigua Guatemala',
    status: 'pending_user',
    proposedDate: '2026-02-18T14:30:00',
    createdAt: '2026-02-03T16:45:00'
  },
  {
    id: 4,
    propertyTitle: 'Penthouse Vista Hermosa',
    agentName: 'Roberto López',
    location: 'Zona 15',
    status: 'rejected',
    rejectionReason: 'Ya no me interesa la propiedad',
    createdAt: '2026-01-28T11:20:00'
  },
  {
    id: 5,
    propertyTitle: 'Casa de Campo Panajachel',
    agentName: 'Sofía Hernández',
    location: 'Panajachel',
    status: 'confirmed',
    scheduledDate: '2026-02-20T15:00:00',
    createdAt: '2026-02-02T10:00:00'
  }
]

/**
 * Comando base
 */
class AppointmentCommand {
  execute() {
    throw new Error('Método execute debe ser implementado')
  }
}

/**
 * Comando para obtener todas las citas
 */
class GetAppointmentsCommand extends AppointmentCommand {
  async execute() {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // En producción: return await fetch('/api/appointments')
    return [...MOCK_APPOINTMENTS]
  }
}

/**
 * Comando para aceptar una cita
 */
class AcceptAppointmentCommand extends AppointmentCommand {
  constructor(appointmentId) {
    super()
    this.appointmentId = appointmentId
  }

  async execute() {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // En producción: return await fetch(`/api/appointments/${id}/accept`, { method: 'POST' })
    const appointment = MOCK_APPOINTMENTS.find(a => a.id === this.appointmentId)
    if (appointment) {
      appointment.status = 'confirmed'
      appointment.scheduledDate = appointment.proposedDate
      delete appointment.proposedDate
    }
    
    return { success: true, appointment }
  }
}

/**
 * Comando para rechazar una cita
 */
class RejectAppointmentCommand extends AppointmentCommand {
  constructor(appointmentId, reason) {
    super()
    this.appointmentId = appointmentId
    this.reason = reason
  }

  async execute() {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // En producción: return await fetch(`/api/appointments/${id}/reject`, { method: 'POST', body: { reason } })
    const appointment = MOCK_APPOINTMENTS.find(a => a.id === this.appointmentId)
    if (appointment) {
      appointment.status = 'rejected'
      appointment.rejectionReason = this.reason
      delete appointment.proposedDate
    }
    
    return { success: true, appointment }
  }
}

/**
 * Invoker - Ejecutor de comandos
 */
class AppointmentService {
  async getAppointments() {
    const command = new GetAppointmentsCommand()
    return await command.execute()
  }

  async acceptAppointment(appointmentId) {
    const command = new AcceptAppointmentCommand(appointmentId)
    return await command.execute()
  }

  async rejectAppointment(appointmentId, reason) {
    const command = new RejectAppointmentCommand(appointmentId, reason)
    return await command.execute()
  }
}

// Singleton
export default new AppointmentService()
