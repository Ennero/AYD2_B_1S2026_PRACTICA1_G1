const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const MOCK_USER = {
  id: 1,
  nombre: 'Juan Carlos',
  apellido: 'Pérez García',
  correo: 'juan.perez@mail.com',
  genero: 'masculino',
  telefono: '+502 1234-5678',
  foto: null,
  createdAt: '2025-01-15T10:30:00'
}

const profileService = {
  getProfile: async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      
      return {
        success: true,
        profile: MOCK_USER
      }
    } catch (error) {
      throw new Error('Error al cargar perfil')
    }
  },

  updatePersonalInfo: async (personalData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const updatedProfile = {
        ...MOCK_USER,
        ...personalData
      }
      
      return {
        success: true,
        profile: updatedProfile
      }
    } catch (error) {
      throw new Error('Error al actualizar información personal')
    }
  },

  updatePassword: async (currentPassword, newPassword) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      if (currentPassword !== 'Test1234') {
        throw new Error('Contraseña actual incorrecta')
      }
      
      if (newPassword.length < 8) {
        throw new Error('La nueva contraseña debe tener al menos 8 caracteres')
      }
      
      return {
        success: true,
        message: 'Contraseña actualizada exitosamente'
      }
    } catch (error) {
      throw error
    }
  },

  uploadProfilePhoto: async (photoFile) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const mockPhotoUrl = URL.createObjectURL(photoFile)
      
      return {
        success: true,
        photoUrl: mockPhotoUrl
      }
    } catch (error) {
      throw new Error('Error al subir foto de perfil')
    }
  },

  deleteAccount: async (password) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      if (password !== 'Test1234') {
        throw new Error('Contraseña incorrecta')
      }
      
      return {
        success: true,
        message: 'Cuenta eliminada exitosamente'
      }
    } catch (error) {
      throw error
    }
  }
}

export default profileService
