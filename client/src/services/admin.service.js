// Clase Base
class AgentCommand {
  execute() {
    throw new Error('El método execute() debe ser implementado')
  }
}

// Comando Get
class GetAgentsCommand extends AgentCommand {
  constructor(apiUrl) {
    super()
    this.apiUrl = apiUrl
  }

  async execute() {
    try {
      //Quemados mientras
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

// Comando Post
class CreateAgentCommand extends AgentCommand {
  constructor(apiUrl, agentData) {
    super()
    this.apiUrl = apiUrl
    this.agentData = agentData
  }

  async execute() {
    try {
      // Simulación de creación de agente
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

// Comando Put
class UpdateAgentCommand extends AgentCommand {
  constructor(apiUrl, agentId, agentData) {
    super()
    this.apiUrl = apiUrl
    this.agentId = agentId
    this.agentData = agentData
  }

  async execute() {
    try {
      // Simulación de actualización de agente
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

// Comando Delete
class DeleteAgentCommand extends AgentCommand {
  constructor(apiUrl, agentId) {
    super()
    this.apiUrl = apiUrl
    this.agentId = agentId
  }

  async execute() {
    try {
      // Simulación de eliminación de agente
      return { success: true, deletedId: this.agentId }
    } catch (error) {
      console.error('Error al eliminar agente:', error)
      throw error
    }
  }
}

// Invocador
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

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

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
