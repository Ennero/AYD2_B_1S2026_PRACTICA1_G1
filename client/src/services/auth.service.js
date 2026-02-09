const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const authService = {
  login: async (email, password) => {
    try {
      console.log('[AUTH] Intentando login con:', { email, password })
      console.log('[AUTH] URL:', `${API_URL}/auth/login`)
      
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
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
          email: user?.email || email,
          token: token,
          type: user?.type
        },
        message: data.message
      }
    } catch (error) {
      console.log('[AUTH] Error catch login:', error)
      throw error
    }
  },

  register: async (userData) => {
    try {
      console.log('[AUTH] Datos originales del formulario:', userData)
      
      // Transformar datos del formulario al formato del backend
      const backendData = {
        name: userData.firstName,
        last_name: userData.lastName,
        gender: userData.gender === 'male' ? 1 : 0, // 1 = hombre, 0 = mujer (numérico como espera el backend)
        phone: userData.phone.replace(/\D/g, '').slice(-9), // String de solo dígitos, máximo 9 caracteres
        email: userData.email,
        password: userData.password
      }
      
      console.log('[AUTH] Datos transformados para backend:', backendData)

      // Si hay foto, convertirla a base64 y separar el MIME type
      if (userData.photo instanceof File) {
        console.log('[AUTH] Convirtiendo foto a base64')
        const reader = new FileReader()
        const base64Promise = new Promise((resolve) => {
          reader.onloadend = () => resolve(reader.result)
          reader.readAsDataURL(userData.photo)
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

      console.log('[AUTH] Enviando registro a:', `${API_URL}/auth/register`)
      const response = await fetch(`${API_URL}/auth/register`, {
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
  },

  logout: async () => {
    try {
      // Limpiar localStorage
      localStorage.removeItem('authToken')
      localStorage.removeItem('userId')
      
      return { success: true }
    } catch (error) {
      throw new Error('Error al cerrar sesión')
    }
  },

  validateToken: async (token) => {
    try {
      // Solo verificar si existe el token localmente
      if (!token) {
        return { success: false, valid: false }
      }

      return {
        success: true,
        valid: true
      }
    } catch (error) {
      return { success: false, valid: false }
    }
  },

  getToken: () => {
    return localStorage.getItem('authToken')
  },

  getUserId: () => {
    return localStorage.getItem('userId')
  }
}

export default authService
