const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

/**
 * PATRÓN COMMAND - GESTIÓN DE CITAS
 * Encapsula cada operación como un objeto Command independiente
 */

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
class GetAllAppointmentsCommand extends AppointmentCommand {
  constructor(apiUrl) {
    super()
    this.apiUrl = apiUrl
  }

  async execute() {
    try {
      const token = localStorage.getItem('authToken')
      if (!token) {
        throw new Error('No hay sesión activa')
      }

      const response = await fetch(`${this.apiUrl}/client/appointment/all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Error al cargar citas')
      }

      // Backend devuelve { appoinments: [...] }
      const appointments = data.appoinments || data.appointments || []
      // Transformar datos del backend al formato del frontend
      return appointments.map(appointment => this.transformAppointment(appointment))
    } catch (error) {
      console.error('[APPOINTMENT] Error al cargar citas:', error)
      throw error
    }
  }

  transformAppointment(app) {
    return {
      id: app.id_invitation,
      propertyId: app.id_property,
      propertyTitle: app.title,
      agentName: app.agent_name,
      location: app.address,
      img: app.img,
      status: this.mapStatus(app.status),
      description: app.description,
      scheduledDate: app.expected_date,
      proposedDate: app.status === 'ACKNOWLEDGE' ? app.expected_date : null,
      isAccepted: app.is_accepted,
      rejectionReason: app.justification,
      createdAt: null // No viene del backend
    }
  }

  mapStatus(backendStatus) {
    const statusMap = {
      'PENDING': 'pending_agent',
      'ACKNOWLEDGE': 'pending_user',
      'ACCEPTED': 'confirmed',
      'REJECTED': 'rejected'
    }
    return statusMap[backendStatus] || backendStatus.toLowerCase()
  }
}

/**
 * Comando para obtener citas finalizadas (aceptadas o rechazadas)
 */
class GetFinalizedAppointmentsCommand extends GetAllAppointmentsCommand {
  async execute() {
    try {
      const token = localStorage.getItem('authToken')
      if (!token) {
        throw new Error('No hay sesión activa')
      }

      const response = await fetch(`${this.apiUrl}/client/appointment/finalized`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Error al cargar citas finalizadas')
      }

      // Backend devuelve { appoinments: [...] }
      const appointments = data.appoinments || data.appointments || []
      return appointments.map(appointment => this.transformAppointment(appointment))
    } catch (error) {
      console.error('[APPOINTMENT] Error al cargar citas finalizadas:', error)
      throw error
    }
  }
}

/**
 * Comando para obtener citas pendientes (esperando respuesta del agente)
 */
class GetPendingAppointmentsCommand extends GetAllAppointmentsCommand {
  async execute() {
    try {
      const token = localStorage.getItem('authToken')
      if (!token) {
        throw new Error('No hay sesión activa')
      }

      const response = await fetch(`${this.apiUrl}/client/appointment/pending`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Error al cargar citas pendientes')
      }

      // Backend devuelve { appoinments: [...] }
      const appointments = data.appoinments || data.appointments || []
      return appointments.map(appointment => this.transformAppointment(appointment))
    } catch (error) {
      console.error('[APPOINTMENT] Error al cargar citas pendientes:', error)
      throw error
    }
  }
}

/**
 * Comando para obtener citas por confirmar (esperando respuesta del cliente)
 */
class GetAcknowledgeAppointmentsCommand extends GetAllAppointmentsCommand {
  async execute() {
    try {
      const token = localStorage.getItem('authToken')
      if (!token) {
        throw new Error('No hay sesión activa')
      }

      const response = await fetch(`${this.apiUrl}/client/appointment/acknowledge`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Error al cargar citas por confirmar')
      }

      // Backend devuelve { appoinments: [...] }
      const appointments = data.appoinments || data.appointments || []
      return appointments.map(appointment => this.transformAppointment(appointment))
    } catch (error) {
      console.error('[APPOINTMENT] Error al cargar citas por confirmar:', error)
      throw error
    }
  }
}

/**
 * Comando para aceptar una cita
 */
class AcceptAppointmentCommand extends AppointmentCommand {
  constructor(appointmentId, apiUrl) {
    super()
    this.appointmentId = appointmentId
    this.apiUrl = apiUrl
  }

  async execute() {
    try {
      const token = localStorage.getItem('authToken')
      if (!token) {
        throw new Error('No hay sesión activa')
      }

      const response = await fetch(`${this.apiUrl}/client/appointment/acknowledge`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          id_appointment: this.appointmentId,
          status: 'accepted',
          justification: null
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Error al aceptar la cita')
      }

      return { success: true, message: data.message || 'Cita aceptada correctamente' }
    } catch (error) {
      console.error('[APPOINTMENT] Error al aceptar cita:', error)
      throw error
    }
  }
}

/**
 * Comando para rechazar una cita
 */
class RejectAppointmentCommand extends AppointmentCommand {
  constructor(appointmentId, reason, apiUrl) {
    super()
    this.appointmentId = appointmentId
    this.reason = reason
    this.apiUrl = apiUrl
  }

  async execute() {
    try {
      const token = localStorage.getItem('authToken')
      if (!token) {
        throw new Error('No hay sesión activa')
      }

      const response = await fetch(`${this.apiUrl}/client/appointment/acknowledge`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          id_appointment: this.appointmentId,
          status: 'rejected',
          justification: this.reason
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Error al rechazar la cita')
      }

      return { success: true, message: data.message || 'Cita rechazada correctamente' }
    } catch (error) {
      console.error('[APPOINTMENT] Error al rechazar cita:', error)
      throw error
    }
  }
}

/**
 * Invoker - Ejecutor de comandos
 */
class AppointmentService {
  constructor() {
    this.apiUrl = API_URL
  }

  /**
   * Obtener todas las citas
   */
  async getAppointments() {
    const command = new GetAllAppointmentsCommand(this.apiUrl)
    return await command.execute()
  }

  /**
   * Obtener citas finalizadas (aceptadas o rechazadas)
   */
  async getFinalizedAppointments() {
    const command = new GetFinalizedAppointmentsCommand(this.apiUrl)
    return await command.execute()
  }

  /**
   * Obtener citas pendientes (esperando respuesta del agente)
   */
  async getPendingAppointments() {
    const command = new GetPendingAppointmentsCommand(this.apiUrl)
    return await command.execute()
  }

  /**
   * Obtener citas por confirmar (esperando respuesta del cliente)
   */
  async getAcknowledgeAppointments() {
    const command = new GetAcknowledgeAppointmentsCommand(this.apiUrl)
    return await command.execute()
  }

  /**
   * Aceptar una cita
   */
  async acceptAppointment(appointmentId) {
    const command = new AcceptAppointmentCommand(appointmentId, this.apiUrl)
    return await command.execute()
  }

  /**
   * Rechazar una cita
   */
  async rejectAppointment(appointmentId, reason) {
    const command = new RejectAppointmentCommand(appointmentId, reason, this.apiUrl)
    return await command.execute()
  }
}

// Singleton
export default new AppointmentService()
