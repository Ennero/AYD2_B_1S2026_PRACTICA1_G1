const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

/**
 * PATRÓN COMMAND - AUTENTICACIÓN
 * Encapsula cada operación de autenticación como un objeto Command independiente
 */

// Clase base Command
class AuthCommand {
  execute() {
    throw new Error('El método execute() debe ser implementado')
  }
}

// Comando: Login
class LoginCommand extends AuthCommand {
  constructor(apiUrl, email, password) {
    super()
    this.apiUrl = apiUrl
    this.email = email
    this.password = password
  }

  async execute() {
    try {
      console.log('[AUTH] Intentando login con:', { email: this.email, password: this.password })
      console.log('[AUTH] URL:', `${this.apiUrl}/auth/login`)
      
      const response = await fetch(`${this.apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: this.email, password: this.password })
      })

      console.log('[AUTH] Response status:', response.status)
      const data = await response.json()
      console.log('[AUTH] Response data:', data)

      if (!response.ok) {
        console.log('[AUTH] Error en login:', data.message)
        throw new Error(data.message || 'Credenciales incorrectas')
      }

      // El backend retorna: { ok: true, data: { user: {...}, token: "..." } }
      const responseData = data.data || data
      const token = responseData.token
      const user = responseData.user

      console.log('[AUTH] Token extraído:', token)
      console.log('[AUTH] User extraído:', user)

      // Guardar token en localStorage
      if (token) {
        console.log('[AUTH] Token recibido, guardando en localStorage')
        localStorage.setItem('authToken', token)
        if (user?.id_user) {
          localStorage.setItem('userId', user.id_user)
        }
      }

      console.log('[AUTH] Login exitoso')
      return {
        success: true,
        user: {
          id: user?.id_user,
          email: user?.email || this.email,
          token: token,
          type: user?.type
        },
        message: data.message
      }
    } catch (error) {
      console.log('[AUTH] Error catch login:', error)
      throw error
    }
  }
}

// Comando: Register
class RegisterCommand extends AuthCommand {
  constructor(apiUrl, userData) {
    super()
    this.apiUrl = apiUrl
    this.userData = userData
  }

  async execute() {
    try {
      console.log('[AUTH] Datos originales del formulario:', this.userData)
      
      // Transformar datos del formulario al formato del backend
      const backendData = {
        name: this.userData.firstName,
        last_name: this.userData.lastName,
        gender: this.userData.gender === 'male' ? 1 : 0, // 1 = hombre, 0 = mujer (numérico como espera el backend)
        phone: this.userData.phone.replace(/\D/g, '').slice(-9), // String de solo dígitos, máximo 9 caracteres
        email: this.userData.email,
        password: this.userData.password
      }
      
      console.log('[AUTH] Datos transformados para backend:', backendData)

      // Si hay foto, convertirla a base64 y separar el MIME type
      if (this.userData.photo instanceof File) {
        console.log('[AUTH] Convirtiendo foto a base64')
        const reader = new FileReader()
        const base64Promise = new Promise((resolve) => {
          reader.onloadend = () => resolve(reader.result)
          reader.readAsDataURL(this.userData.photo)
        })
        const dataUrl = await base64Promise
        console.log('[AUTH] Foto convertida, longitud:', dataUrl?.length)
        
        // Extraer MIME type y base64 del formato "data:image/png;base64,iVBORw..."
        const matches = dataUrl.match(/^data:(.+);base64,(.+)$/)
        if (matches) {
          backendData.img_mime = matches[1] // ej: "image/png"
          backendData.img_base64 = matches[2] // El base64 puro sin prefijo
          console.log('[AUTH] MIME type:', backendData.img_mime)
          console.log('[AUTH] Base64 length:', backendData.img_base64.length)
        }
      }

      console.log('[AUTH] Enviando registro a:', `${this.apiUrl}/auth/register`)
      const response = await fetch(`${this.apiUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(backendData)
      })

      console.log('[AUTH] Register response status:', response.status)
      const data = await response.json()
      console.log('[AUTH] Register response data:', data)

      if (!response.ok) {
        console.log('[AUTH] Error en register:', data.message)
        console.log('[AUTH] Detalles de validación:', data.details)
        throw new Error(data.message || 'Error al crear la cuenta')
      }

      // El backend retorna: { ok: true, data: { user: {...}, token: "..." } }
      const responseData = data.data || data
      const token = responseData.token
      const user = responseData.user

      // Guardar token y userId si vienen en la respuesta
      if (token) {
        console.log('[AUTH] Token recibido, guardando en localStorage')
        localStorage.setItem('authToken', token)
      }
      
      if (user?.id_user) {
        console.log('[AUTH] Usuario registrado, ID:', user.id_user)
        localStorage.setItem('userId', user.id_user)
      }

      console.log('[AUTH] Registro exitoso')
      return {
        success: true,
        user: user,
        token: token,
        message: data.message
      }
    } catch (error) {
      console.log('[AUTH] Error catch register:', error)
      throw error
    }
  }
}

// Comando: Logout
class LogoutCommand extends AuthCommand {
  constructor() {
    super()
  }

  async execute() {
    try {
      // Limpiar localStorage
      localStorage.removeItem('authToken')
      localStorage.removeItem('userId')
      
      return { success: true }
    } catch (error) {
      throw new Error('Error al cerrar sesión')
    }
  }
}

// Comando: Validate Token
class ValidateTokenCommand extends AuthCommand {
  constructor(token) {
    super()
    this.token = token
  }

  async execute() {
    try {
      // Solo verificar si existe el token localmente
      if (!this.token) {
        return { success: false, valid: false }
      }

      return {
        success: true,
        valid: true
      }
    } catch (error) {
      return { success: false, valid: false }
    }
  }
}

// Invoker con historial de comandos
class AuthCommandInvoker {
  constructor() {
    this.history = []
  }

  async executeCommand(command) {
    const result = await command.execute()
    this.history.push({
      command: command.constructor.name,
      timestamp: new Date().toISOString()
    })
    return result
  }

  getHistory() {
    return this.history
  }

  clearHistory() {
    this.history = []
  }
}

// Servicio que usa el patrón Command
const authService = {
  invoker: new AuthCommandInvoker(),

  async login(email, password) {
    const command = new LoginCommand(API_URL, email, password)
    return await this.invoker.executeCommand(command)
  },

  async register(userData) {
    const command = new RegisterCommand(API_URL, userData)
    return await this.invoker.executeCommand(command)
  },

  async logout() {
    const command = new LogoutCommand()
    return await this.invoker.executeCommand(command)
  },

  async validateToken(token) {
    const command = new ValidateTokenCommand(token)
    return await this.invoker.executeCommand(command)
  },

  getToken() {
    return localStorage.getItem('authToken')
  },

  getUserId() {
    return localStorage.getItem('userId')
  }
}

export default authService

export {
  AuthCommand,
  LoginCommand,
  RegisterCommand,
  LogoutCommand,
  ValidateTokenCommand,
  AuthCommandInvoker
}
