import { useState, useEffect, useMemo } from 'react'
import { AppointmentCard, AppointmentFilters, RejectModal } from '../../components/appointments'
import appointmentService from '../../services/appointment.service'
import toast from 'react-hot-toast'

/**
 * Container para gestión de citas
 */
const AppointmentsContainer = () => {
  const [appointments, setAppointments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null)
  const [rejectionReason, setRejectionReason] = useState('')

  useEffect(() => {
    loadAppointments()
  }, [])

  const loadAppointments = async () => {
    try {
      setIsLoading(true)
      const data = await appointmentService.getAppointments()
      setAppointments(data)
    } catch (error) {
      toast.error('Error al cargar las citas')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  // Filtrar citas según el filtro activo
  const filteredAppointments = useMemo(() => {
    if (activeFilter === 'all') {
      return appointments
    }
    
    if (activeFilter === 'pending') {
      return appointments.filter(a => a.status === 'pending_agent' || a.status === 'pending_user')
    }
    
    if (activeFilter === 'pending_user') {
      return appointments.filter(a => a.status === 'pending_user')
    }
    
    if (activeFilter === 'finalized') {
      return appointments.filter(a => a.status === 'confirmed' || a.status === 'rejected')
    }
    
    return appointments
  }, [appointments, activeFilter])

  // Calcular contadores para los filtros
  const filterCounts = useMemo(() => {
    return {
      all: appointments.length,
      pending: appointments.filter(a => a.status === 'pending_agent' || a.status === 'pending_user').length,
      pending_user: appointments.filter(a => a.status === 'pending_user').length,
      finalized: appointments.filter(a => a.status === 'confirmed' || a.status === 'rejected').length
    }
  }, [appointments])

  // Aceptar cita
  const handleAcceptAppointment = async (appointmentId) => {
    try {
      const result = await appointmentService.acceptAppointment(appointmentId)
      
      if (result.success) {
        toast.success(result.message || '¡Cita confirmada exitosamente!')
        // Recargar citas para obtener datos actualizados del backend
        await loadAppointments()
      }
    } catch (error) {
      toast.error(error.message || 'Error al confirmar la cita')
      console.error(error)
    }
  }

  // Abrir modal de rechazo
  const handleOpenRejectModal = (appointmentId) => {
    setSelectedAppointmentId(appointmentId)
    setRejectionReason('')
    setIsRejectModalOpen(true)
  }

  // Cerrar modal de rechazo
  const handleCloseRejectModal = () => {
    setIsRejectModalOpen(false)
    setSelectedAppointmentId(null)
    setRejectionReason('')
  }

  // Confirmar rechazo
  const handleConfirmReject = async () => {
    if (!rejectionReason.trim()) {
      toast.error('Debes proporcionar un motivo')
      return
    }

    try {
      const result = await appointmentService.rejectAppointment(
        selectedAppointmentId,
        rejectionReason
      )
      
      if (result.success) {
        toast.success(result.message || 'Cita rechazada')
        handleCloseRejectModal()
        // Recargar citas para obtener datos actualizados del backend
        await loadAppointments()
      }
    } catch (error) {
      toast.error(error.message || 'Error al rechazar la cita')
      console.error(error)
    }
  }

  if (isLoading) {
    return (
        
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
      </div>
    )
  }

  return (
    <div>
        
      {/* Filtros */}
      <AppointmentFilters
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        counts={filterCounts}
      />

      {/* Lista de citas */}
      <div className="space-y-6">
        {filteredAppointments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No tienes citas en esta categoría</p>
          </div>
        ) : (
          filteredAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onAccept={handleAcceptAppointment}
              onReject={handleOpenRejectModal}
            />
          ))
        )}
      </div>

      {/* Modal de rechazo */}
      <RejectModal
        isOpen={isRejectModalOpen}
        onClose={handleCloseRejectModal}
        onConfirm={handleConfirmReject}
        reason={rejectionReason}
        setReason={setRejectionReason}
      />
    </div>
  )
}

export default AppointmentsContainer
