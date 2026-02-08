// Datos quemados de ejemplo
const MOCK_AGENT_APPOINTMENTS = [
  // Nuevas Solicitudes
  {
    id: 1,
    propertyTitle: 'Casa Modern Style Zona 10',
    propertyAddress: 'Avenida Las Américas 15-30',
    propertyZone: 'Zona 10',
    propertyPrice: 1250000,
    propertyImage: '/images/logo-HomeFinder.png',
    clientName: 'Juan Pérez',
    status: 'nueva_solicitud',
    createdAt: '2026-02-01T14:30:00',
  },
  {
    id: 2,
    propertyTitle: 'Apartamento Moderno Zona 14',
    propertyAddress: 'Boulevard Vista Hermosa 8-50',
    propertyZone: 'Zona 14',
    propertyPrice: 850000,
    propertyImage: '/images/logo-HomeFinder.png',
    clientName: 'María González',
    status: 'nueva_solicitud',
    createdAt: '2026-02-03T09:15:00',
  },
  {
    id: 3,
    propertyTitle: 'Residencial Los Arcos Zona 16',
    propertyAddress: 'Condominio Los Arcos Lote 5',
    propertyZone: 'Zona 16',
    propertyPrice: 1950000,
    propertyImage: '/images/logo-HomeFinder.png',
    clientName: 'Diego Herrera',
    status: 'nueva_solicitud',
    createdAt: '2026-02-06T11:00:00',
  },
  {
    id: 4,
    propertyTitle: 'Loft Industrial Zona 4',
    propertyAddress: '4ta Avenida 12-33 Edificio Lux',
    propertyZone: 'Zona 4',
    propertyPrice: 620000,
    propertyImage: '/images/logo-HomeFinder.png',
    clientName: 'Valentina Ruiz',
    status: 'nueva_solicitud',
    createdAt: '2026-02-07T08:45:00',
  },

  // En Espera
  {
    id: 5,
    propertyTitle: 'Villa Colonial Antigua',
    propertyAddress: 'Calle Real del Arco 5-12',
    propertyZone: 'Antigua Guatemala',
    propertyPrice: 2500000,
    propertyImage: '/images/logo-HomeFinder.png',
    clientName: 'Carlos Ramírez',
    status: 'en_espera',
    proposedDate: '2026-02-18',
    proposedTime: '10:00 AM',
    proposedDescription: 'Visita guiada con muestra de áreas comunes',
    createdAt: '2026-02-03T16:45:00',
  },
  {
    id: 6,
    propertyTitle: 'Penthouse Vista Hermosa',
    propertyAddress: 'Boulevard Los Próceres 12-45',
    propertyZone: 'Zona 15',
    propertyPrice: 1800000,
    propertyImage: '/images/logo-HomeFinder.png',
    clientName: 'Ana Martínez',
    status: 'en_espera',
    proposedDate: '2026-02-22',
    proposedTime: '02:30 PM',
    proposedDescription: 'Recorrido por el penthouse y amenidades del edificio',
    createdAt: '2026-02-05T10:00:00',
  },
  {
    id: 7,
    propertyTitle: 'Casa Minimalista Cayalá',
    propertyAddress: 'Boulevard Rafael Landívar 10-20',
    propertyZone: 'Zona 16',
    propertyPrice: 2200000,
    propertyImage: '/images/logo-HomeFinder.png',
    clientName: 'Gabriela Soto',
    status: 'en_espera',
    proposedDate: '2026-02-26',
    proposedTime: '11:00 AM',
    proposedDescription: 'Tour completo por la casa y áreas verdes del condominio',
    createdAt: '2026-02-06T14:20:00',
  },

  // Confirmadas
  {
    id: 8,
    propertyTitle: 'Casa de Campo Panajachel',
    propertyAddress: 'Calle Santander Lote 8',
    propertyZone: 'Panajachel',
    propertyPrice: 950000,
    propertyImage: '/images/logo-HomeFinder.png',
    clientName: 'Roberto López',
    status: 'confirmada',
    proposedDate: '2026-02-20',
    proposedTime: '03:00 PM',
    proposedDescription: 'Recorrido completo de la propiedad y acceso al lago',
    createdAt: '2026-02-02T10:00:00',
  },
  {
    id: 9,
    propertyTitle: 'Apartamento Estudiantil Zona 12',
    propertyAddress: 'Colonia Monte María 3-25',
    propertyZone: 'Zona 12',
    propertyPrice: 450000,
    propertyImage: '/images/logo-HomeFinder.png',
    clientName: 'Sofía Hernández',
    status: 'confirmada',
    proposedDate: '2026-02-25',
    proposedTime: '09:00 AM',
    proposedDescription: 'Visita rápida al apartamento amoblado',
    createdAt: '2026-02-06T08:30:00',
  },
  {
    id: 10,
    propertyTitle: 'Oficina Ejecutiva Zona 10',
    propertyAddress: 'Torre Empresarial Nivel 8',
    propertyZone: 'Zona 10',
    propertyPrice: 780000,
    propertyImage: '/images/logo-HomeFinder.png',
    clientName: 'Andrés Mendoza',
    status: 'confirmada',
    proposedDate: '2026-02-28',
    proposedTime: '04:00 PM',
    proposedDescription: 'Visita a la oficina con vista panorámica del nivel 8',
    createdAt: '2026-02-04T15:00:00',
  },

  // Canceladas
  {
    id: 11,
    propertyTitle: 'Terreno en Carretera a El Salvador',
    propertyAddress: 'Km 18.5 Carretera a El Salvador',
    propertyZone: 'Zona 16',
    propertyPrice: 500000,
    propertyImage: '/images/logo-HomeFinder.png',
    clientName: 'Fernando Castillo',
    status: 'cancelada',
    rejectionReason: 'Ya no me interesa la propiedad, encontré otra opción más cercana a mi trabajo.',
    createdAt: '2026-01-28T11:20:00',
  },
  {
    id: 12,
    propertyTitle: 'Local Comercial Centro Histórico',
    propertyAddress: '6ta Avenida 9-15',
    propertyZone: 'Zona 1',
    propertyPrice: 320000,
    propertyImage: '/images/logo-HomeFinder.png',
    clientName: 'Lucia Morales',
    status: 'cancelada',
    rejectionReason: 'El horario propuesto no me conviene y prefiero buscar otro local.',
    createdAt: '2026-01-30T14:00:00',
  },
  {
    id: 13,
    propertyTitle: 'Duplex Moderno Zona 7',
    propertyAddress: 'Colonia Tikal II 8-40',
    propertyZone: 'Zona 7',
    propertyPrice: 580000,
    propertyImage: '/images/logo-HomeFinder.png',
    clientName: 'Patricia Flores',
    status: 'cancelada',
    rejectionReason: 'Decidí invertir en otro tipo de propiedad. Gracias por la atención.',
    createdAt: '2026-02-01T09:30:00',
  },
]

// Comando Base
class AppointmentCommand {
  execute() { throw new Error('El método execute() debe ser implementado') }
}

// Comando Get
class GetAgentAppointmentsCommand extends AppointmentCommand {
  async execute() {
    await new Promise(resolve => setTimeout(resolve, 800))
    return MOCK_AGENT_APPOINTMENTS.map(a => ({ ...a }))
  }
}

// Comando Proponer Nueva Fecha
class ProposeAppointmentCommand extends AppointmentCommand {
  constructor(appointmentId, proposalData) {
    super()
    this.appointmentId = appointmentId
    this.proposalData = proposalData
  }

  async execute() {
    await new Promise(resolve => setTimeout(resolve, 600))
    const appointment = MOCK_AGENT_APPOINTMENTS.find(a => a.id === this.appointmentId)
    if (appointment) {
      appointment.status = 'en_espera'
      appointment.proposedDate = this.proposalData.date
      appointment.proposedTime = this.proposalData.time
      appointment.proposedDescription = this.proposalData.description
    }
    return { success: true, appointment: { ...appointment } }
  }
}

// Invoker
class AppointmentCommandInvoker {
  constructor() { this.history = [] }

  async executeCommand(command) {
    const result = await command.execute()
    this.history.push(command)
    return result
  }
}

// Servicio de Citas para el Agente
const AgentAppointmentService = {
  invoker: new AppointmentCommandInvoker(),

  async getAppointments() {
    const command = new GetAgentAppointmentsCommand()
    return await this.invoker.executeCommand(command)
  },

  async proposeDateTime(appointmentId, proposalData) {
    const command = new ProposeAppointmentCommand(appointmentId, proposalData)
    return await this.invoker.executeCommand(command)
  },
}

export default AgentAppointmentService
