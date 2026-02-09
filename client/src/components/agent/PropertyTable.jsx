import { Eye, Edit3, Trash2 } from 'lucide-react'

/**
 * Componente presentacional - Tabla de Propiedades del Agente
 * Muestra la lista de propiedades en formato tabla con acciones
 * @param {Array} properties - Lista de propiedades a mostrar
 * @param {Function} onView - Callback al presionar ver detalle
 * @param {Function} onEdit - Callback al presionar editar
 * @param {Function} onDelete - Callback al presionar eliminar
 */
const PropertyTable = ({ properties = [], onView, onEdit, onDelete }) => {
  const getStatusBadge = (status) => {
    const styles = {
      'Disponible': 'bg-emerald-100 text-emerald-700 border-emerald-300',
      'No Disponible': 'bg-amber-100 text-amber-700 border-amber-300',
      'Vendido': 'bg-red-100 text-red-700 border-red-300',
    }
    return styles[status] || 'bg-gray-100 text-gray-700 border-gray-300'
  }

  const formatPrice = (price) => {
    return `Q ${price.toLocaleString('es-GT')}`
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-sky-200 shadow-xl bg-white/80 backdrop-blur-sm animate-fadeInUp" style={{ transformStyle: 'preserve-3d' }}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-sky-500 to-sky-600 text-white">
              <th className="px-3 py-3.5 text-left text-xs font-bold uppercase tracking-wider">Id</th>
              <th className="px-3 py-3.5 text-center text-xs font-bold uppercase tracking-wider">Imagen</th>
              <th className="px-3 py-3.5 text-left text-xs font-bold uppercase tracking-wider">Título</th>
              <th className="px-3 py-3.5 text-left text-xs font-bold uppercase tracking-wider">Tipo</th>
              <th className="px-3 py-3.5 text-left text-xs font-bold uppercase tracking-wider">Zona</th>
              <th className="px-3 py-3.5 text-left text-xs font-bold uppercase tracking-wider">Dirección</th>
              <th className="px-3 py-3.5 text-right text-xs font-bold uppercase tracking-wider">Precio</th>
              <th className="px-3 py-3.5 text-center text-xs font-bold uppercase tracking-wider">Estado</th>
              <th className="px-3 py-3.5 text-center text-xs font-bold uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sky-100">
            {properties.map((property, index) => (
              <tr
                key={property.id}
                className="hover:bg-sky-50/60 transition-all duration-300 group"
                style={{
                  animationDelay: `${index * 80}ms`,
                  animation: 'fadeInUp 0.5s ease-out forwards',
                  opacity: 0,
                }}
              >
                <td className="px-3 py-3.5">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-sky-100 text-sky-700 font-bold text-sm">
                    {property.id}
                  </span>
                </td>
                <td className="px-3 py-3.5 text-center">
                  <div className="flex justify-center">
                    <img
                      src={property.images?.[0] || '/images/logo-HomeFinder.png'}
                      alt={property.title}
                      className="w-11 h-11 rounded-xl object-cover border-2 border-sky-200 shadow-md transform transition-all duration-300 group-hover:scale-110 group-hover:border-sky-400"
                    />
                  </div>
                </td>
                <td className="px-3 py-3.5 text-sm text-gray-900 font-semibold max-w-[220px] truncate">{property.title}</td>
                <td className="px-3 py-3.5 text-sm text-gray-700 font-medium">{property.propertyType}</td>
                <td className="px-3 py-3.5 text-sm text-gray-700">{property.zone}</td>
                <td className="px-3 py-3.5 text-sm text-gray-600 max-w-[200px] truncate">{property.address}</td>
                <td className="px-3 py-3.5 text-sm text-gray-900 font-bold text-right whitespace-nowrap">{formatPrice(property.price)}</td>
                <td className="px-3 py-3.5 text-center">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(property.status)}`}>
                    {property.status}
                  </span>
                </td>
                <td className="px-3 py-3.5">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onView(property)}
                      className="p-2 rounded-xl bg-sky-50 text-sky-600 hover:bg-sky-500 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 active:scale-95 shadow-md hover:shadow-lg"
                      title="Ver detalle"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEdit(property)}
                      className="p-2 rounded-xl bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 active:scale-95 shadow-md hover:shadow-lg"
                      title="Editar propiedad"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(property)}
                      className="p-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 active:scale-95 shadow-md hover:shadow-lg"
                      title="Eliminar propiedad"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer informativo */}
      <div className="px-6 py-3 bg-sky-50/50 border-t border-sky-100">
        <p className="text-xs text-sky-600 font-medium text-center">
          Todas las propiedades publicadas por tu usuario*
        </p>
      </div>
    </div>
  )
}

export default PropertyTable
