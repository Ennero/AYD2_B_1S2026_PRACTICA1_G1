const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

/**
 * PATRÓN COMMAND - GESTIÓN DE PERFIL
 * Encapsula cada operación como un objeto Command independiente
 */

// Clase base Command
class ProfileCommand {
  execute() {
    throw new Error('El método execute() debe ser implementado')
  }
}

// Comando: Obtener perfil
class GetProfileCommand extends ProfileCommand {
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

      const response = await fetch(`${this.apiUrl}/client/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Error al cargar perfil')
      }

      // Transformar datos del backend al formato del frontend
      const profile = {
        id: data.id_user,
        nombre: data.name,
        apellido: data.last_name || data.lastname,
        correo: data.email,
        genero: data.gender === 'Male' || data.gender === true ? 'masculino' : 'femenino',
        telefono: data.phone,
        foto: data.url_img || data.img || null,
        password: data.password // Viene hasheado del backend
      }

      return {
        success: true,
        profile: profile
      }
    } catch (error) {
      console.error('[PROFILE] Error al cargar perfil:', error)
      throw new Error(error.message || 'Error al cargar perfil')
    }
  }
}

// Comando: Actualizar información personal
class UpdatePersonalInfoCommand extends ProfileCommand {
  constructor(apiUrl, personalData) {
    super()
    this.apiUrl = apiUrl
    this.personalData = personalData
  }

  async execute() {
    try {
      const token = localStorage.getItem('authToken')
      if (!token) {
        throw new Error('No hay sesión activa')
      }

      // El backend requiere TODOS estos campos como obligatorios
      const requestBody = {
        name: this.personalData.nombre || '',
        last_name: this.personalData.apellido || '',
        phone: this.personalData.telefono || '',
        email: this.personalData.correo || ''
      }

      // Convertir género de español a inglés
      if (this.personalData.genero) {
        requestBody.gender = this.personalData.genero === 'masculino' ? 'Male' : 'Female'
      } else {
        requestBody.gender = ''
      }

      // Manejar foto: si es un File, convertir a base64
      if (this.personalData.foto !== undefined && this.personalData.foto !== null) {
        if (this.personalData.foto instanceof File) {
          // Convertir File a base64
          requestBody.url_img = await this.convertToBase64(this.personalData.foto)
        } else if (typeof this.personalData.foto === 'string' && this.personalData.foto.length > 0) {
          // Ya es string (base64 o URL)
          requestBody.url_img = this.personalData.foto
        }
      }

      console.log('[PROFILE] Datos enviados al backend:', requestBody)

      const response = await fetch(`${this.apiUrl}/client/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
      })

      const data = await response.json()
      console.log('[PROFILE] Respuesta del backend:', data)

      if (!response.ok) {
        console.error('[PROFILE] Error del backend:', data)
        console.error('[PROFILE] Detalles del error:', JSON.stringify(data.details, null, 2))
        throw new Error(data.message || 'Error al actualizar información personal')
      }

      return {
        success: true,
        message: data.message || 'Perfil actualizado exitosamente'
      }
    } catch (error) {
      console.error('[PROFILE] Error al actualizar perfil:', error)
      throw new Error(error.message || 'Error al actualizar información personal')
    }
  }

  convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })
  }
}

// Comando: Actualizar contraseña
class UpdatePasswordCommand extends ProfileCommand {
  constructor(apiUrl, newPassword) {
    super()
    this.apiUrl = apiUrl
    this.newPassword = newPassword
  }

  async execute() {
    try {
      const token = localStorage.getItem('authToken')
      if (!token) {
        throw new Error('No hay sesión activa')
      }

      if (this.newPassword.length < 8) {
        throw new Error('La nueva contraseña debe tener al menos 8 caracteres')
      }

      // Primero obtener el perfil actual para tener todos los campos
      const getProfileCommand = new GetProfileCommand(this.apiUrl)
      const profileResult = await getProfileCommand.execute()
      
      if (!profileResult.success) {
        throw new Error('No se pudo obtener el perfil actual')
      }

      const profile = profileResult.profile

      // Enviar todos los campos requeridos + la nueva contraseña
      const requestBody = {
        name: profile.nombre || '',
        last_name: profile.apellido || '',
        phone: profile.telefono || '',
        email: profile.correo || '',
        gender: profile.genero === 'masculino' ? 'Male' : 'Female',
        password: this.newPassword
      }

      // Incluir foto si existe
      if (profile.foto) {
        requestBody.url_img = profile.foto
      }

      const response = await fetch(`${this.apiUrl}/client/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Error al actualizar contraseña')
      }

      return {
        success: true,
        message: data.message || 'Contraseña actualizada exitosamente'
      }
    } catch (error) {
      console.error('[PROFILE] Error al actualizar contraseña:', error)
      throw error
    }
  }
}

// Comando: Subir foto de perfil
class UploadProfilePhotoCommand extends ProfileCommand {
  constructor(apiUrl, photoFile) {
    super()
    this.apiUrl = apiUrl
    this.photoFile = photoFile
  }

  async execute() {
    try {
      // Convertir imagen a base64
      const base64Photo = await this.convertToBase64(this.photoFile)

      const token = localStorage.getItem('authToken')
      if (!token) {
        throw new Error('No hay sesión activa')
      }

      const response = await fetch(`${this.apiUrl}/client/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          url_img: base64Photo
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Error al subir foto de perfil')
      }

      return {
        success: true,
        photoUrl: base64Photo
      }
    } catch (error) {
      console.error('[PROFILE] Error al subir foto:', error)
      throw new Error(error.message || 'Error al subir foto de perfil')
    }
  }

  convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })
  }
}

// Invoker con historial de comandos
class ProfileCommandInvoker {
  constructor() {
    this.history = []
  }

  async executeCommand(command) {
    const result = await command.execute()
    this.history.push({
      command: command.constructor.name,
      timestamp: new Date().toISOString(),
      params: command
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
const profileService = {
  invoker: new ProfileCommandInvoker(),

  async getProfile() {
    const command = new GetProfileCommand(API_URL)
    return await this.invoker.executeCommand(command)
  },

  async updatePersonalInfo(personalData) {
    const command = new UpdatePersonalInfoCommand(API_URL, personalData)
    return await this.invoker.executeCommand(command)
  },

  async updatePassword(currentPassword, newPassword) {
    // El backend no valida la contraseña actual, solo actualiza con la nueva
    const command = new UpdatePasswordCommand(API_URL, newPassword)
    return await this.invoker.executeCommand(command)
  },

  async uploadProfilePhoto(photoFile) {
    const command = new UploadProfilePhotoCommand(API_URL, photoFile)
    return await this.invoker.executeCommand(command)
  },

  // deleteAccount no tiene endpoint en el backend, dejamos mock o comentado
  async deleteAccount(password) {
    throw new Error('Funcionalidad no disponible en el backend')
  }
}

export default profileService

export {
  ProfileCommand,
  GetProfileCommand,
  UpdatePersonalInfoCommand,
  UpdatePasswordCommand,
  UploadProfilePhotoCommand,
  ProfileCommandInvoker
}
