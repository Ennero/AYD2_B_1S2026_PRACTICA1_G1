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
      const token = localStorage.getItem('authToken')
      
      if (!token) {
        throw new Error('No se encontró token de autenticación')
      }

      const response = await fetch(`${this.apiUrl}/admin/agents`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()

      // Mapear la respuesta del backend al formato del frontend
      if (result.ok && result.data && result.data.list) {
        const agents = result.data.list.map(agent => ({
          id: agent.id_user,
          email: agent.email,
          firstName: agent.name,
          lastName: agent.last_name,
          phone: agent.phone,
          photo: agent.url_img || '/images/logo-HomeFinder.png',
        }))
        
        // Ordenar por ID ascendente
        return agents.sort((a, b) => a.id - b.id)
      }

      return []
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
      const token = localStorage.getItem('authToken')
      
      if (!token) {
        throw new Error('No se encontró token de autenticación')
      }

      // Mapear datos del frontend al formato del backend
      const payload = {
        email: this.agentData.email,
        name: this.agentData.firstName,
        last_name: this.agentData.lastName,
        phone: this.agentData.phone,
        img_base64: null, // Por defecto null
        type: 'agent'
      }

      // Si hay una foto, convertir a base64
      if (this.agentData.photo) {
        const imgBase64 = await this.fileToBase64(this.agentData.photo)
        payload.img_base64 = imgBase64
      }

      const response = await fetch(`${this.apiUrl}/admin/agents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        const errorData = await response.json()
        const errorMessage = errorData.details || errorData.message || `Error ${response.status}: ${response.statusText}`
        throw new Error(errorMessage)
      }

      const result = await response.json()

      if (!result.ok) {
        const errorMessage = result.details || result.message || 'Error al crear el agente'
        throw new Error(errorMessage)
      }

      // Mapear la respuesta del backend al formato del frontend
      const agent = result.data.agent
      return {
        id: agent.id_user,
        email: agent.email,
        firstName: agent.name,
        lastName: agent.last_name,
        phone: agent.phone,
        photo: agent.url_img || '/images/logo-HomeFinder.png',
        temporaryPassword: result.data.temporaryPassword // Incluir contraseña temporal
      }
    } catch (error) {
      console.error('Error al crear agente:', error)
      throw error
    }
  }

  // Método auxiliar para convertir File a base64
  fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        // Extraer solo la parte base64 (sin el prefijo data:image/...)
        const base64 = reader.result.split(',')[1]
        resolve(base64)
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
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
      const token = localStorage.getItem('authToken')
      
      if (!token) {
        throw new Error('No se encontró token de autenticación')
      }

      // Mapear datos del frontend al formato del backend
      const payload = {
        id_user: this.agentId,
        email: this.agentData.email,
        name: this.agentData.firstName,
        last_name: this.agentData.lastName,
        phone: this.agentData.phone,
        type: 'agent'
      }

      // Solo incluir img_base64 si hay una nueva foto
      if (this.agentData.photo) {
        const imgBase64 = await this.fileToBase64(this.agentData.photo)
        payload.img_base64 = imgBase64
      }

      const response = await fetch(`${this.apiUrl}/admin/agents/${this.agentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        const errorData = await response.json()
        const errorMessage = errorData.details || errorData.message || `Error ${response.status}: ${response.statusText}`
        throw new Error(errorMessage)
      }

      const result = await response.json()

      if (!result.ok) {
        const errorMessage = result.details || result.message || 'Error al editar el agente'
        throw new Error(errorMessage)
      }

      // Retornar el agente actualizado
      return {
        id: this.agentId,
        ...this.agentData,
      }
    } catch (error) {
      console.error('Error al actualizar agente:', error)
      throw error
    }
  }

  // Método auxiliar para convertir File a base64
  fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        // Extraer solo la parte base64 (sin el prefijo data:image/...)
        const base64 = reader.result.split(',')[1]
        resolve(base64)
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
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
      const token = localStorage.getItem('authToken')
      
      if (!token) {
        throw new Error('No se encontró token de autenticación')
      }

      const response = await fetch(`${this.apiUrl}/admin/agents/${this.agentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        const errorData = await response.json()
        const errorMessage = errorData.details || errorData.message || `Error ${response.status}: ${response.statusText}`
        throw new Error(errorMessage)
      }

      const result = await response.json()

      if (!result.ok) {
        const errorMessage = result.details || result.message || 'Error al eliminar el agente'
        throw new Error(errorMessage)
      }

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
