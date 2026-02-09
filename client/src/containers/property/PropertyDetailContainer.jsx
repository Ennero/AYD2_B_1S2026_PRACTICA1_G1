import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ImageGallery, PropertyInfo, AgentCard } from '../../components/property'
import { propertyService } from '../../services'
import { ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'

/**
 * Container para el detalle de propiedad
 */
const PropertyDetailContainer = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPropertyDetail()
  }, [id])

  const loadPropertyDetail = async () => {
    try {
      setLoading(true)
      const result = await propertyService.getPropertyById(id)
      
      if (result.success) {
        setProperty(result.property)
      }
    } catch (error) {
      toast.error(error.message || 'Error al cargar la propiedad')
      setProperty(null)
    } finally {
      setLoading(false)
    }
  }

  const handleRequestAppointment = () => {
    
    console.log('Solicitar cita para propiedad:', id)
    toast.info('Funcionalidad de solicitar cita en desarrollo')
  }

  const handleAddToFavorites = async () => {
    try {
      const result = await propertyService.toggleFavorite(id)
      
      if (result.success) {
        const newFavoriteState = !result.shouldRemove
        
        setProperty(prev => ({
          ...prev,
          isFavorite: newFavoriteState
        }))
        
        toast.success(newFavoriteState ? 'Agregado a favoritos' : 'Eliminado de favoritos')
      }
    } catch (error) {
      toast.error(error.message || 'Error al actualizar favorito')
    }
  }

  const handleGoBack = () => {
    navigate('/search')
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-28 pb-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-600 border-solid mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando detalles de la propiedad...</p>
        </div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen pt-28 pb-12 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Propiedad no encontrada</h2>
          <button
            onClick={handleGoBack}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all duration-300"
          >
            Volver al buscador
          </button>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="min-h-screen pt-28 pb-12 relative bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('/images/client-background.png')",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Botón Volver */}
        <button
          onClick={handleGoBack}
          className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors duration-300 mb-6 group animate-fadeIn"
        >
          <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-semibold">Volver al buscador</span>
        </button>

        {/* Galería con agente y miniaturas */}
        <div className="animate-fadeInUp mb-8">
          <ImageGallery 
            images={property.images} 
            title={property.title}
            agentCard={
              <AgentCard
                agent={property.agent}
                price={property.price}
                onRequestAppointment={handleRequestAppointment}
              />
            }
          />
        </div>

        {/* Información completa de la propiedad */}
        <div className="animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          <PropertyInfo
            title={property.title}
            location={property.location}
            zone={property.zone}
            price={property.price}
            bedrooms={property.bedrooms}
            bathrooms={property.bathrooms}
            area={property.area}
            propertyType={property.propertyType}
            description={property.description}
            features={property.features}
            amenities={property.amenities}
            isFavorite={property.isFavorite}
            onAddToFavorites={handleAddToFavorites}
          />
        </div>
      </div>
    </div>
  )
}

export default PropertyDetailContainer
