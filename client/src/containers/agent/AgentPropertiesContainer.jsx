import { useState, useEffect, useCallback } from 'react'
import {
  PropertyTable,
  PropertyFilterPanel,
  PropertyFormModal,
  PropertyDetailModal,
  PropertyDeleteModal,
} from '../../components/agent'
import { AgentPropertyService } from '../../services/agent'
import toast from 'react-hot-toast'
import { Building2, Plus, X } from 'lucide-react'

// Container principal
const AgentPropertiesContainer = () => {
  const [properties, setProperties] = useState([])
  const [filteredProperties, setFilteredProperties] = useState([])
  const [activeFilters, setActiveFilters] = useState([])
  const [currentFilters, setCurrentFilters] = useState({})
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)

  // Estado de modales
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)

  // Cargar propiedades al montar (Command: GetPropertiesCommand)
  const loadProperties = useCallback(async (filters = {}) => {
    try {
      setLoading(true)
      const data = await AgentPropertyService.getProperties(filters)
      // Delay artificial para mejorar la experiencia visual del skeleton
      await new Promise(resolve => setTimeout(resolve, 400))
      setProperties(data)
      setFilteredProperties(data)
    } catch (error) {
      toast.error('Error al cargar las propiedades')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProperties()
  }, [loadProperties])

  // Abrir modal de creación
  const handleOpenCreate = () => {
    setSelectedProperty(null)
    setIsFormModalOpen(true)
  }

  // Abrir modal de edición
  const handleOpenEdit = (property) => {
    setSelectedProperty(property)
    setIsFormModalOpen(true)
  }

  // Abrir modal de detalle
  const handleOpenDetail = (property) => {
    setSelectedProperty(property)
    setIsDetailModalOpen(true)
  }

  // Abrir modal de eliminación
  const handleOpenDelete = (property) => {
    setSelectedProperty(property)
    setIsDeleteModalOpen(true)
  }

  // Cerrar modales
  const handleCloseModals = () => {
    setIsFormModalOpen(false)
    setIsDetailModalOpen(false)
    setIsDeleteModalOpen(false)
    setSelectedProperty(null)
  }

  // Aplicar filtros - ahora recarga desde el backend
  const handleApplyFilters = async (filters, activeFiltersArray) => {
    setCurrentFilters(filters)
    setActiveFilters(activeFiltersArray || [])
    await loadProperties(filters)
  }

  // Remover un filtro individual
  const handleRemoveFilter = (filterKey) => {
    // Falta logica para remover el filtro específico y volver a aplicar los filtros restantes
  }

  // Enviar formulario de creación o edición
  const handleFormSubmit = async (formData) => {
    setActionLoading(true)
    try {
      if (selectedProperty) {
        // Editar propiedad (Command: UpdatePropertyCommand)
        const updatedProperty = await AgentPropertyService.updateProperty(selectedProperty.id, formData)
        setProperties(prev =>
          prev.map(p => (p.id === selectedProperty.id ? { ...p, ...formData, ...updatedProperty } : p))
        )
        setFilteredProperties(prev =>
          prev.map(p => (p.id === selectedProperty.id ? { ...p, ...formData, ...updatedProperty } : p))
        )
        toast.success(
          `Propiedad editada exitosamente — ID: ${selectedProperty.id}, ${formData.title}`,
          { duration: 4000 }
        )
      } else {
        // Crear propiedad (Command: CreatePropertyCommand)
        const newProperty = await AgentPropertyService.createProperty(formData, properties)
        setProperties(prev => [...prev, newProperty])
        setFilteredProperties(prev => [...prev, newProperty])
        toast.success(
          `Propiedad creada exitosamente — ${formData.title}`,
          { duration: 4000 }
        )
      }
      handleCloseModals()
    } catch (error) {
      toast.error(selectedProperty ? 'Error al editar la propiedad' : 'Error al crear la propiedad')
    } finally {
      setActionLoading(false)
    }
  }

  // Confirmar eliminación (Command: DeletePropertyCommand)
  const handleConfirmDelete = async (propertyId) => {
    setActionLoading(true)
    try {
      await AgentPropertyService.deleteProperty(propertyId)
      const deletedProperty = properties.find(p => p.id === propertyId)
      setProperties(prev => prev.filter(p => p.id !== propertyId))
      setFilteredProperties(prev => prev.filter(p => p.id !== propertyId))
      toast.success(
        `Propiedad eliminada exitosamente — ID: ${propertyId}, ${deletedProperty?.title}`,
        { duration: 4000 }
      )
      handleCloseModals()
    } catch (error) {
      toast.error('Error al eliminar la propiedad')
    } finally {
      setActionLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen pt-28 pb-12 relative bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('/images/agent-background.png')",
      }}
    >
      {/* Overlay sutil */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>

      {/* Burbujas flotantes 3D */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Burbuja 1 - Arriba izquierda */}
        <div
          className="absolute w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)',
            top: '5%',
            left: '-10%',
            animation: 'float-up-down 15s ease-in-out infinite',
          }}
        ></div>

        {/* Burbuja 2 - Arriba derecha */}
        <div
          className="absolute w-80 h-80 rounded-full opacity-20"
          style={{
            background: 'linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)',
            top: '10%',
            right: '-8%',
            animation: 'float-up-down 18s ease-in-out infinite 2s',
          }}
        ></div>

        {/* Burbuja 3 - Abajo izquierda */}
        <div
          className="absolute w-72 h-72 rounded-full opacity-15"
          style={{
            background: 'linear-gradient(135deg, #38bdf8 0%, #7dd3fc 100%)',
            bottom: '15%',
            left: '-6%',
            animation: 'float-up-down 20s ease-in-out infinite 4s',
          }}
        ></div>

        {/* Burbuja 4 - Abajo derecha */}
        <div
          className="absolute w-64 h-64 rounded-full opacity-15"
          style={{
            background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
            bottom: '8%',
            right: '-5%',
            animation: 'float-up-down 16s ease-in-out infinite 6s',
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-[1800px] mx-auto px-4 pt-8">

        {/* Layout principal: Filtros izquierda + (Título/Botón + Tabla) derecha */}
        <div className="flex gap-4">
          {/* Panel de filtros fijo a la izquierda */}
          <div className="w-[260px] flex-shrink-0 animate-slideInLeft">
            <PropertyFilterPanel
              onApplyFilters={handleApplyFilters}
            />
          </div>

          {/* Contenido principal derecho */}
          <div className="flex-1 min-w-0">
            {/* Header: Título + Botón crear */}
            <div className="flex items-center justify-between mx-10 mb-8 animate-fadeInUp">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-sky-100 rounded-xl shadow-md">
                  <Building2 className="w-12 h-12 text-sky-600" />
                </div>
                <div>
                  <h1 className="text-4xl font-black text-gray-900 tracking-tight px-6">
                    Propiedades
                  </h1>
                  <p className="text-gray-500 text-ms px-6 py-2">
                    Gestiona las propiedades inmobiliarias de la plataforma.
                  </p>
                </div>
              </div>

              <button
                onClick={handleOpenCreate}
                className="flex items-center gap-2 px-8 py-6 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-2xl font-bold text-base transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 active:scale-95 shadow-xl hover:shadow-2xl relative overflow-hidden group animate-slideInRight"
                style={{ transformStyle: 'preserve-3d', boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)' }}
              >
                <span className="relative z-10 flex items-center gap-2 text-lg">
                  <Plus className="w-7 h-7" />
                  Ingresa una Propiedad
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
            </div>

            {/* Filtros activos */}
            {activeFilters.length > 0 && (
              <div className="mb-5 animate-fadeIn">
                <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-sky-500">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-bold text-gray-700">Filtros aplicados ({activeFilters.length})</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeFilters.map((filter, index) => (
                      <div
                        key={index}
                        className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-sky-200 shadow-sm hover:shadow-md transition-all"
                      >
                        <span className="font-semibold">{filter.label}:</span>
                        <span>{filter.value}</span>
                        <button
                          onClick={() => filter.onRemove && filter.onRemove()}
                          className="ml-1 hover:bg-sky-200 rounded-full p-1 transition-colors"
                          title="Remover filtro"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tabla */}
            <div className="animate-fadeIn mx-10">
              {loading ? (
                <div className="flex items-center justify-center py-24">
                  <div className="text-center">
                    <div className="inline-block p-6">
                      <div className="w-12 h-12 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-gray-600 font-semibold">Cargando propiedades...</p>
                    </div>
                  </div>
                </div>
              ) : filteredProperties.length === 0 ? (
                <div className="text-center py-24">
                  <div className="inline-block p-10 bg-white rounded-3xl shadow-xl transform transition-all duration-500 hover:scale-105">
                    <Building2 className="w-16 h-16 text-sky-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg mb-2">No hay propiedades que coincidan con los filtros.</p>
                    <p className="text-gray-400 text-sm">Prueba cambiar los criterios de búsqueda.</p>
                  </div>
                </div>
              ) : (
                <PropertyTable
                  properties={filteredProperties}
                  onView={handleOpenDetail}
                  onEdit={handleOpenEdit}
                  onDelete={handleOpenDelete}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modales */}
      <PropertyFormModal
        isOpen={isFormModalOpen}
        onClose={handleCloseModals}
        onSubmit={handleFormSubmit}
        property={selectedProperty}
        isLoading={actionLoading}
      />

      <PropertyDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseModals}
        property={selectedProperty}
      />

      <PropertyDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModals}
        onConfirm={handleConfirmDelete}
        property={selectedProperty}
        isLoading={actionLoading}
      />
    </div>
  )
}

export default AgentPropertiesContainer
