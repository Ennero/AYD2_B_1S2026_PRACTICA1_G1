// Patron State

// Estado Base
class AgentAppointmentState {
  getName() { throw new Error('AgentAppointmentState.getName() debe ser implementado') }
  getBadgeConfig() { throw new Error('AgentAppointmentState.getBadgeConfig() debe ser implementado') }
  getTabKey() { throw new Error('AgentAppointmentState.getTabKey() debe ser implementado') }
  getPanelType() { throw new Error('AgentAppointmentState.getPanelType() debe ser implementado') }
  canPropose() { return false }
  hasProposedDate() { return false }
  hasRejectionReason() { return false }
}

// Nueva Solicitud
class NuevaSolicitudState extends AgentAppointmentState {
  getName() { return 'Solicitud del Cliente' }
  getBadgeConfig() {
    return {
      label: 'Solicitud del Cliente',
      bgColor: 'bg-sky-100',
      textColor: 'text-sky-800',
      borderColor: 'border-sky-300',
      dotColor: 'bg-sky-500',
    }
  }
  getTabKey() { return 'nuevas' }
  getPanelType() { return 'propose_form' }
  canPropose() { return true }
}

// En Espera
class EnEsperaState extends AgentAppointmentState {
  getName() { return 'Propuesta Enviada' }
  getBadgeConfig() {
    return {
      label: 'Propuesta Enviada',
      bgColor: 'bg-amber-100',
      textColor: 'text-amber-800',
      borderColor: 'border-amber-300',
      dotColor: 'bg-amber-500',
    }
  }
  getTabKey() { return 'espera' }
  getPanelType() { return 'proposed_date' }
  hasProposedDate() { return true }
}

// Confirmada
class ConfirmadaState extends AgentAppointmentState {
  getName() { return 'Cita Agendada' }
  getBadgeConfig() {
    return {
      label: 'Cita Agendada',
      bgColor: 'bg-emerald-100',
      textColor: 'text-emerald-800',
      borderColor: 'border-emerald-300',
      dotColor: 'bg-emerald-500',
    }
  }
  getTabKey() { return 'confirmadas' }
  getPanelType() { return 'confirmed_date' }
  hasProposedDate() { return true }
}

// Cancelada
class CanceladaState extends AgentAppointmentState {
  getName() { return 'Cancelado por el cliente' }
  getBadgeConfig() {
    return {
      label: 'Cancelado por el cliente',
      bgColor: 'bg-red-100',
      textColor: 'text-red-800',
      borderColor: 'border-red-300',
      dotColor: 'bg-red-500',
    }
  }
  getTabKey() { return 'canceladas' }
  getPanelType() { return 'rejection_reason' }
  hasRejectionReason() { return true }
}

// Contexto
class AgentAppointmentContext {
  constructor(appointment) {
    this.appointment = { ...appointment }
    this.state = AgentAppointmentContext.resolveState(appointment.status)
  }

  static resolveState(status) {
    const stateMap = {
      nueva_solicitud: new NuevaSolicitudState(),
      confirmada: new ConfirmadaState(),
      cancelada: new CanceladaState(),
    }
    return stateMap[status] || new NuevaSolicitudState()
  }

  transitionTo(newStatus) {
    this.state = AgentAppointmentContext.resolveState(newStatus)
    this.appointment.status = newStatus
  }

  getState()            { return this.state }
  getName()             { return this.state.getName() }
  getBadgeConfig()      { return this.state.getBadgeConfig() }
  getTabKey()           { return this.state.getTabKey() }
  getPanelType()        { return this.state.getPanelType() }
  canPropose()          { return this.state.canPropose() }
  hasProposedDate()     { return this.state.hasProposedDate() }
  hasRejectionReason()  { return this.state.hasRejectionReason() }
}

export {
  AgentAppointmentState,
  NuevaSolicitudState,
  ConfirmadaState,
  CanceladaState,
  AgentAppointmentContext,
}
