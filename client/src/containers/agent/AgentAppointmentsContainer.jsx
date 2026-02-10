import { useState, useEffect, useMemo } from 'react'
import AgentAppointmentCard from '../../components/agent/AgentAppointmentCard'
import AgentAppointmentTabs from '../../components/agent/AgentAppointmentTabs'
import AgentAppointmentService from '../../services/agent/appointment.service'
import { AgentAppointmentContext } from '../../context'
import { CalendarDays } from 'lucide-react'
import toast from 'react-hot-toast'

// Container principal
const AgentAppointmentsContainer = () => {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('todos')

  // Carga las citas
  useEffect(() => {
    loadAppointments()
  }, [])

  const loadAppointments = async () => {
    try {
      setLoading(true)
      const data = await AgentAppointmentService.getAppointments()
      setAppointments(data)
    } catch (error) {
      toast.error('Error al cargar las citas')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // Filtrar citas según la pestaña activa
  const filteredAppointments = useMemo(() => {
    if (activeTab === 'todos') {
      // Ordenar por fecha de creación, más recientes primero
      return [...appointments].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }
    return appointments.filter((apt) => {
      const ctx = new AgentAppointmentContext(apt)
      return ctx.getTabKey() === activeTab
    })
  }, [appointments, activeTab])

  // Contador por tab
  const tabCounts = useMemo(() => {
    const counts = { todos: appointments.length, nuevas: 0, confirmadas: 0, canceladas: 0 }
    appointments.forEach((apt) => {
      const ctx = new AgentAppointmentContext(apt)
      const tab = ctx.getTabKey()
      if (counts[tab] !== undefined) counts[tab]++
    })
    return counts
  }, [appointments])

  // Form de propuesta
  const handlePropose = async (appointmentId, proposalData) => {
    try {
      console.log('📤 Enviando propuesta para invitación:', appointmentId)
      console.log('📋 Datos de la propuesta:', proposalData)
      
      const result = await AgentAppointmentService.proposeDateTime(appointmentId, proposalData)
      
      if (result.success) {
        setAppointments(prev =>
          prev.map(a =>
            a.id === appointmentId
              ? { ...a, ...result.appointment, status: 'confirmada' }
              : a
          )
        )
        toast.success(result.message || '¡Propuesta enviada exitosamente!')
      }
    } catch (error) {
      console.error('❌ Error al proponer fecha:', error)
      toast.error(error.message || 'Error al enviar la propuesta')
    }
  }

  return (
    <div
      className="h-screen flex flex-col relative bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/images/agent-background.png')" }}
    >
      {/* Overlay sutil */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>

      {/* Burbujas flotantes 3D */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)',
            top: '5%', left: '-10%',
            animation: 'float-up-down 15s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-80 h-80 rounded-full opacity-20"
          style={{
            background: 'linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)',
            top: '10%', right: '-8%',
            animation: 'float-up-down 18s ease-in-out infinite 2s',
          }}
        />
        <div
          className="absolute w-72 h-72 rounded-full opacity-15"
          style={{
            background: 'linear-gradient(135deg, #38bdf8 0%, #7dd3fc 100%)',
            bottom: '15%', left: '-6%',
            animation: 'float-up-down 20s ease-in-out infinite 4s',
          }}
        />
        <div
          className="absolute w-64 h-64 rounded-full opacity-15"
          style={{
            background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
            bottom: '8%', right: '-5%',
            animation: 'float-up-down 16s ease-in-out infinite 6s',
          }}
        />
      </div>

      {/* ════════ Navbar placeholder (ocupa espacio del navbar fijo) ════════ */}
      <div className="h-24 flex-shrink-0" />

      {/* ════════ Header fijo: Título + Párrafo + Tabs ════════ */}
      <div className="relative z-10 flex-shrink-0 px-44 lg:px-64 pt-10 pb-8">
        {/* Título */}
        <div className="flex items-center gap-4 mb-2 animate-fadeInUp">
          <div className="p-3 bg-sky-100 rounded-2xl shadow-lg">
            <CalendarDays className="w-10 h-10 text-sky-600" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              Gestión de Citas
            </h1>
          </div>
        </div>
        <p className="text-gray-500 text-base mt-2 mb-5 max-w-3xl animate-fadeInUp" style={{ animationDelay: '50ms' }}>
          Administra las solicitudes de visita de tus clientes. Puedes proponer horarios, dar seguimiento
          a las citas en espera y revisar el historial de citas confirmadas o canceladas.
        </p>

        {/* Tabs */}
        <div className="animate-fadeInUp" style={{ animationDelay: '100ms' }}>
          <AgentAppointmentTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            counts={tabCounts}
          />
        </div>
      </div>

      {/* ════════ Lista de citas (scrollable) ════════ */}
      <div className="relative z-10 flex-1 overflow-y-auto px-32 pb-8 pt-6">
        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-24 animate-fadeIn">
            <div className="text-center">
              <div className="inline-block p-6">
                <div className="w-12 h-12 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 font-semibold">Cargando citas...</p>
              </div>
            </div>
          </div>
        )}

        {/* Sin resultados */}
        {!loading && filteredAppointments.length === 0 && (
          <div className="flex items-center justify-center py-24 animate-fadeInUp">
            <div className="text-center inline-block p-10 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl">
              <CalendarDays className="w-16 h-16 text-sky-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-semibold mb-1">No hay citas en esta categoría</p>
              <p className="text-gray-400 text-sm">Las solicitudes nuevas aparecerán aquí automáticamente.</p>
            </div>
          </div>
        )}

        {/* Listado */}
        {!loading && filteredAppointments.length > 0 && (
          <div className="space-y-5 max-w-[1400px] mx-auto">
            {filteredAppointments.map((apt, idx) => (
              <AgentAppointmentCard
                key={apt.id}
                appointment={apt}
                index={idx}
                onPropose={handlePropose}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AgentAppointmentsContainer
