/**
 * Patrón Command - Servicio de Agentes Inmobiliarios
 * Encapsula las operaciones CRUD como comandos independientes
 * Cada comando implementa execute() para ser intercambiable
 */

// ==================== COMMAND BASE ====================

/**
 * Comando base abstracto
 * Todos los comandos deben implementar execute()
 */
class AgentCommand {
  execute() {
    throw new Error('El método execute() debe ser implementado')
  }
}

// ==================== COMANDOS CONCRETOS ====================

/**
 * Comando para obtener todos los agentes
 */
class GetAgentsCommand extends AgentCommand {
  constructor(apiUrl) {
    super()
    this.apiUrl = apiUrl
  }

  async execute() {
    try {
      // TODO: Reemplazar con llamada real a la API
      // const response = await fetch(`${this.apiUrl}/admin/agents`)
      // const data = await response.json()
      // return data

      // Datos quemados por ahora
      return [
        {
          id: 1,
          email: 'carlos.mendez@homefinder.com',
          firstName: 'Carlos',
          lastName: 'Méndez',
          phone: '5551-1234',
          photo: '/images/logo-HomeFinder.png',
        },
        {
          id: 2,
          email: 'maria.lopez@homefinder.com',
          firstName: 'María',
          lastName: 'López',
          phone: '5552-5678',
          photo: '/images/logo-HomeFinder.png',
        },
        {
          id: 3,
          email: 'andres.garcia@homefinder.com',
          firstName: 'Andrés',
          lastName: 'García',
          phone: '5553-9012',
          photo: '/images/logo-HomeFinder.png',
        },
        {
          id: 4,
          email: 'lucia.fernandez@homefinder.com',
          firstName: 'Lucía',
          lastName: 'Fernández',
          phone: '5554-3456',
          photo: '/images/logo-HomeFinder.png',
        },
        {
          id: 5,
          email: 'roberto.diaz@homefinder.com',
          firstName: 'Roberto',
          lastName: 'Díaz',
          phone: '5555-7890',
          photo: '/images/logo-HomeFinder.png',
        },
      ]
    } catch (error) {
      console.error('Error al obtener agentes:', error)
      throw error
    }
  }
}

/**
 * Comando para crear un nuevo agente
 */
class CreateAgentCommand extends AgentCommand {
  constructor(apiUrl, agentData) {
    super()
    this.apiUrl = apiUrl
    this.agentData = agentData
  }

  async execute() {
    try {
      // TODO: Reemplazar con llamada real a la API
      // const response = await fetch(`${this.apiUrl}/admin/agents`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(this.agentData),
      // })
      // const data = await response.json()
      // return data

      // Simulación
      return {
        id: Date.now(),
        ...this.agentData,
        photo: '/images/logo-HomeFinder.png',
      }
    } catch (error) {
      console.error('Error al crear agente:', error)
      throw error
    }
  }
}

/**
 * Comando para actualizar un agente existente
 */
class UpdateAgentCommand extends AgentCommand {
  constructor(apiUrl, agentId, agentData) {
    super()
    this.apiUrl = apiUrl
    this.agentId = agentId
    this.agentData = agentData
  }

  async execute() {
    try {
      // TODO: Reemplazar con llamada real a la API
      // const response = await fetch(`${this.apiUrl}/admin/agents/${this.agentId}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(this.agentData),
      // })
      // const data = await response.json()
      // return data

      // Simulación
      return {
        id: this.agentId,
        ...this.agentData,
      }
    } catch (error) {
      console.error('Error al actualizar agente:', error)
      throw error
    }
  }
}

/**
 * Comando para eliminar un agente
 */
class DeleteAgentCommand extends AgentCommand {
  constructor(apiUrl, agentId) {
    super()
    this.apiUrl = apiUrl
    this.agentId = agentId
  }

  async execute() {
    try {
      // TODO: Reemplazar con llamada real a la API
      // const response = await fetch(`${this.apiUrl}/admin/agents/${this.agentId}`, {
      //   method: 'DELETE',
      // })
      // const data = await response.json()
      // return data

      // Simulación
      return { success: true, deletedId: this.agentId }
    } catch (error) {
      console.error('Error al eliminar agente:', error)
      throw error
    }
  }
}

// ==================== INVOKER ====================

/**
 * Invoker del patrón Command
 * Se encarga de ejecutar los comandos y mantener un historial
 */
class AgentCommandInvoker {
  constructor() {
    this.history = []
  }

  async executeCommand(command) {
    const result = await command.execute()
    this.history.push(command)
    return result
  }

  getHistory() {
    return this.history
  }
}

// ==================== SERVICE FACADE ====================

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

/**
 * Servicio de Agentes - Fachada que usa el patrón Command internamente
 * Abstrae la complejidad de los comandos para los componentes
 */
const AgentService = {
  invoker: new AgentCommandInvoker(),

  async getAgents() {
    const command = new GetAgentsCommand(API_URL)
    return await this.invoker.executeCommand(command)
  },

  async createAgent(agentData) {
    const command = new CreateAgentCommand(API_URL, agentData)
    return await this.invoker.executeCommand(command)
  },

  async updateAgent(agentId, agentData) {
    const command = new UpdateAgentCommand(API_URL, agentId, agentData)
    return await this.invoker.executeCommand(command)
  },

  async deleteAgent(agentId) {
    const command = new DeleteAgentCommand(API_URL, agentId)
    return await this.invoker.executeCommand(command)
  },
}

export default AgentService

export {
  AgentCommand,
  GetAgentsCommand,
  CreateAgentCommand,
  UpdateAgentCommand,
  DeleteAgentCommand,
  AgentCommandInvoker,
}
