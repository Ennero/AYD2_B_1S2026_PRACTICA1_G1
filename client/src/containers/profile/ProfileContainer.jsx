import { useState, useEffect } from 'react'
import { ProfileHeader, PersonalInfoForm, SecurityForm, ProfileActions } from '../../components/profile'
import { profileService } from '../../services'
import toast from 'react-hot-toast'

const ProfileContainer = () => {
 
  const [personalInfo, setPersonalInfo] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    genero: '',
    telefono: '',
    foto: null
  })

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const result = await profileService.getProfile()
      if (result.success) {
        setPersonalInfo(result.profile)
      }
    } catch (error) {
      toast.error('Error al cargar perfil')
    }
  }

 
  const [passwords, setPasswords] = useState({
    nuevaContrasena: '',
    confirmarContrasena: ''
  })

 
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    symbol: false
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

 
  const validatePassword = (password) => {
    setPasswordValidation({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    })
  }

  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }))
  }

  const handlePasswordChange = (field, value) => {
    setPasswords(prev => ({ ...prev, [field]: value }))
    
    // Validar cuando se escribe en nueva contraseña
    if (field === 'nuevaContrasena') {
      validatePassword(value)
    }
  }

  const handlePhotoChange = (file) => {
    if (file) {
      
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      if (!validTypes.includes(file.type)) {
        toast.error('Formato de imagen no válido. Usa JPG, PNG o WebP')
        return
      }

      
      if (file.size > 5 * 1024 * 1024) {
        toast.error('La imagen es muy grande. Máximo 5MB')
        return
      }

      setPersonalInfo(prev => ({ ...prev, foto: file }))
      toast.success('Foto cargada correctamente')
    }
  }

  const handleCancel = () => {
    loadProfile()
    setPasswords({
      nuevaContrasena: '',
      confirmarContrasena: ''
    })
    setPasswordValidation({
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      symbol: false
    })
    toast.info('Cambios descartados')
  }

  const handleSave = async () => {
    
    if (!personalInfo.nombre.trim()) {
      toast.error('El nombre es obligatorio')
      return
    }

    if (!personalInfo.apellido.trim()) {
      toast.error('El apellido es obligatorio')
      return
    }

    if (!personalInfo.telefono.trim()) {
      toast.error('El teléfono es obligatorio')
      return
    }

   
    if (passwords.nuevaContrasena || passwords.confirmarContrasena) {
   
      if (!passwords.nuevaContrasena || !passwords.confirmarContrasena) {
        toast.error('Completa ambos campos de contraseña')
        return
      }

   
      if (passwords.nuevaContrasena !== passwords.confirmarContrasena) {
        toast.error('Las contraseñas no coinciden')
        return
      }

      
      const allValid = Object.values(passwordValidation).every(v => v === true)
      if (!allValid) {
        toast.error('La contraseña no cumple todos los requisitos')
        return
      }
    }

    setIsSubmitting(true)

    
    try {
      await profileService.updatePersonalInfo(personalInfo)
      
      if (passwords.nuevaContrasena) {
        await profileService.updatePassword('Test1234', passwords.nuevaContrasena)
      }

      toast.success('Perfil actualizado correctamente')
      
    
      setPasswords({
        nuevaContrasena: '',
        confirmarContrasena: ''
      })
      setPasswordValidation({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        symbol: false
      })
    } catch (error) {
      toast.error('Error al actualizar el perfil')
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div 
      className="min-h-screen pt-28 pb-12 relative bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('/images/client-background.png')",
      }}
    >
   
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-orange-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-to-br from-cyan-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-orange-400/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '500ms' }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
      
        <div className="animate-fadeInUp mb-10">
          <ProfileHeader nombre={personalInfo.nombre} />
        </div>

        {/* Formulario principal */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-10 mb-8 animate-fadeInUp border border-gray-200/50 relative overflow-hidden" style={{ animationDelay: '100ms', transformStyle: 'preserve-3d', perspective: '1000px' }}>
          {/* Efecto de brillo superior */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
          
          {/* Información Personal */}
          <PersonalInfoForm
            personalInfo={personalInfo}
            onPersonalInfoChange={handlePersonalInfoChange}
            onPhotoChange={handlePhotoChange}
          />

          {/* Seguridad */}
          <SecurityForm
            passwords={passwords}
            passwordValidation={passwordValidation}
            onPasswordChange={handlePasswordChange}
          />
        </div>

        {/* Acciones */}
        <div className="animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          <ProfileActions
            onCancel={handleCancel}
            onSave={handleSave}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  )
}

export default ProfileContainer
