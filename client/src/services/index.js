// Exporting for Client Services
export { default as authService } from './auth.service'
export { default as profileService } from './profile.service'
export { default as propertyService } from './property.service'
export { default as appointmentService } from './appointment.service'

// Exporting for Admin Services
export { default as AgentService } from './admin.service'
export {
  AgentCommand,
  GetAgentsCommand,
  CreateAgentCommand,
  UpdateAgentCommand,
  DeleteAgentCommand,
  AgentCommandInvoker,
} from './admin.service'
