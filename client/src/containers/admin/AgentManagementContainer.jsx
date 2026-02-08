import { useState, useEffect, useCallback } from 'react'
import { AgentTable, AgentFormModal, DeleteConfirmModal } from '../../components/admin'
import { AgentService } from '../../services'
import toast from 'react-hot-toast'
import { UserPlus, Users, Shield } from 'lucide-react'

/**
 * Container que maneja la lógica de negocio del CRUD de agentes
 * Aplica patrón Command a través de AgentService
 * Separa lógica (container) de presentación (components)
 */
const AgentManagementContainer = () => {
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)

  // Estado de modales
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState(null)

  // Cargar agentes al montar (Command: GetAgentsCommand)
  const loadAgents = useCallback(async () => {
    try {
      setLoading(true)
      const data = await AgentService.getAgents()
      setAgents(data)
    } catch (error) {
      toast.error('Error al cargar los agentes')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadAgents()
  }, [loadAgents])

  // Abrir modal de creación
  const handleOpenCreate = () => {
    setSelectedAgent(null)
    setIsFormModalOpen(true)
  }

  // Abrir modal de edición
  const handleOpenEdit = (agent) => {
    setSelectedAgent(agent)
    setIsFormModalOpen(true)
  }

  // Abrir modal de eliminación
  const handleOpenDelete = (agent) => {
    setSelectedAgent(agent)
    setIsDeleteModalOpen(true)
  }

  // Cerrar modales
  const handleCloseModals = () => {
    setIsFormModalOpen(false)
    setIsDeleteModalOpen(false)
    setSelectedAgent(null)
  }

  // Enviar formulario de creación o edición (Command: CreateAgentCommand / UpdateAgentCommand)
  const handleFormSubmit = async (formData) => {
    setActionLoading(true)
    try {
      if (selectedAgent) {
        // Editar agente - Command: UpdateAgentCommand
        const updatedAgent = await AgentService.updateAgent(selectedAgent.id, formData)
        setAgents(prev =>
          prev.map(a => (a.id === selectedAgent.id ? { ...a, ...formData, ...updatedAgent } : a))
        )
        toast.success(
          `Agente editado exitosamente — ID: ${selectedAgent.id}, ${formData.firstName} ${formData.lastName}`,
          { duration: 4000 }
        )
      } else {
        // Crear agente - Command: CreateAgentCommand
        const newAgent = await AgentService.createAgent(formData)
        setAgents(prev => [...prev, newAgent])
        toast.success(
          `Agente creado exitosamente — ${formData.firstName} ${formData.lastName} (${formData.email})`,
          { duration: 4000 }
        )
      }
      handleCloseModals()
    } catch (error) {
      toast.error(selectedAgent ? 'Error al editar el agente' : 'Error al crear el agente')
    } finally {
      setActionLoading(false)
    }
  }

  // Confirmar eliminación (Command: DeleteAgentCommand)
  const handleConfirmDelete = async (agentId) => {
    setActionLoading(true)
    try {
      await AgentService.deleteAgent(agentId)
      const deletedAgent = agents.find(a => a.id === agentId)
      setAgents(prev => prev.filter(a => a.id !== agentId))
      toast.success(
        `Agente eliminado exitosamente — ID: ${agentId}, ${deletedAgent?.firstName} ${deletedAgent?.lastName}`,
        { duration: 4000 }
      )
      handleCloseModals()
    } catch (error) {
      toast.error('Error al eliminar el agente')
    } finally {
      setActionLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen pt-44 pb-12 relative bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('/images/admin-background.png')",
      }}
    >
      {/* Overlay sutil */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header de sección */}
        <div className="mb-20 animate-fadeInUp">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Título y descripción */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-rose-100 rounded-2xl shadow-md">
                  <Users className="w-8 h-8 text-rose-700" />
                </div>
                <h1 className="text-4xl font-black text-gray-900 tracking-tight">
                  Agentes Inmobiliarios
                </h1>
              </div>
              <p className="text-gray-600 text-lg max-w-xl leading-relaxed">
                Ten el manejo de los Agentes Inmobiliarios que estén dentro de la plataforma, siéntete
                libre de poder crear, editar o eliminar algún usuario.
              </p>
            </div>

            {/* Botón crear */}
            <div className="flex flex-col items-end gap-2 animate-slideInRight">
              <p className="text-sm font-semibold text-gray-700">¿Tienes un nuevo agente?</p>
              <button
                onClick={handleOpenCreate}
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-2xl font-bold text-lg transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 active:scale-95 shadow-xl hover:shadow-2xl relative overflow-hidden group"
                style={{ transformStyle: 'preserve-3d', boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)' }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <UserPlus className="w-5 h-5" />
                  Crea un Nuevo Agente
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Tabla / Contenido */}
        {loading ? (
          <div className="flex items-center justify-center py-24 animate-fadeIn">
            <div className="text-center">
              <div className="inline-block p-6 bg-white rounded-2xl shadow-xl">
                <div className="w-12 h-12 border-4 border-rose-200 border-t-rose-700 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 font-semibold">Cargando agentes...</p>
              </div>
            </div>
          </div>
        ) : agents.length === 0 ? (
          <div className="text-center py-24 animate-fadeInUp">
            <div className="inline-block p-10 bg-white rounded-3xl shadow-xl transform transition-all duration-500 hover:scale-105">
              <Shield className="w-16 h-16 text-rose-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">No hay agentes registrados.</p>
              <p className="text-gray-400 text-sm">Crea el primer agente inmobiliario para comenzar.</p>
            </div>
          </div>
        ) : (
          <AgentTable
            agents={agents}
            onEdit={handleOpenEdit}
            onDelete={handleOpenDelete}
          />
        )}
      </div>

      {/* Modales */}
      <AgentFormModal
        isOpen={isFormModalOpen}
        onClose={handleCloseModals}
        onSubmit={handleFormSubmit}
        agent={selectedAgent}
        isLoading={actionLoading}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModals}
        onConfirm={handleConfirmDelete}
        agent={selectedAgent}
        isLoading={actionLoading}
      />
    </div>
  )
}

export default AgentManagementContainer
