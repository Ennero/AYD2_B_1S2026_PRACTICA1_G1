const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const authService = {
  login: async (email, password) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      if (email === 'test@test.com' && password === 'Test1234') {
        return {
          success: true,
          user: {
            id: 1,
            email: email,
            nombre: 'Usuario',
            apellido: 'Test',
            token: 'mock-jwt-token-123456'
          }
        }
      } else {
        throw new Error('Credenciales incorrectas')
      }
    } catch (error) {
      throw error
    }
  },

  register: async (userData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      return {
        success: true,
        user: {
          id: Date.now(),
          email: userData.email,
          nombre: userData.nombre,
          apellido: userData.apellido,
          genero: userData.genero,
          telefono: userData.telefono
        }
      }
    } catch (error) {
      throw new Error('Error al crear la cuenta')
    }
  },

  logout: async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      return { success: true }
    } catch (error) {
      throw new Error('Error al cerrar sesión')
    }
  },

  validateToken: async (token) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      return {
        success: true,
        valid: true
      }
    } catch (error) {
      throw new Error('Token inválido')
    }
  }
}

export default authService
