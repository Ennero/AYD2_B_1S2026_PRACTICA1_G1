import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ImageGallery, PropertyInfo, AgentCard } from '../../components/property'
import { ArrowLeft } from 'lucide-react'

/**
 * Container para el detalle de propiedad
 */
const PropertyDetailContainer = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)

  
  useEffect(() => {
   
    const mockProperty = {
      id: parseInt(id),
      title: 'Casa Moderna en Condominio El Naranjo',
      price: 2500000,
      location: 'Zona 16, Guatemala',
      zone: 'El Naranjo',
      propertyType: 'Casa',
      bedrooms: 4,
      bathrooms: 3,
      area: 280,
      description: 'Hermosa casa de 280 m² ubicada en el exclusivo Condominio El Naranjo, Zona 16. Esta propiedad cuenta con acabados de primera calidad, incluyendo pisos de madera natural en toda la casa, cocina integral con electrodomésticos de línea blanca, y amplios ventanales que permiten entrada de luz natural. El condominio ofrece seguridad 24/7, áreas verdes, gimnasio, piscina y salón de eventos.',
      features: [
        'Cocina integral equipada',
        'Pisos de madera natural',
        'Amplios ventanales',
        'Closets empotrados',
        'Jardín privado',
        'Garaje para 2 vehículos',
        'Sistema de seguridad',
        'Calentador solar'
      ],
      images: [
        '/images/home-background.png',
        '/images/login-background.jpg',
        '/images/register-background.jpg',
        '/images/client-background.png'
      ],
      agent: {
        name: 'María Andrade',
        title: 'Agente Inmobiliario',
        phone: '+502 1234-5678',
        email: 'maria.andrade@homefinder.com',
        avatar: '/images/logo-HomeFinder.png'
      },
      amenities: {
        parking: 2,
        floors: 2,
        yearBuilt: 2023,
        lotSize: 400
      }
    }

    
    setTimeout(() => {
      setProperty(mockProperty)
      setLoading(false)
    }, 500)
  }, [id])

  const handleRequestAppointment = () => {
    
    console.log('Solicitar cita para propiedad:', id)
    alert('Funcionalidad de solicitar cita en desarrollo')
  }

  const handleAddToFavorites = () => {
    console.log('Agregar a favoritos:', id)
    alert('Agregado a favoritos')
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
            onAddToFavorites={handleAddToFavorites}
          />
        </div>
      </div>
    </div>
  )
}

export default PropertyDetailContainer
