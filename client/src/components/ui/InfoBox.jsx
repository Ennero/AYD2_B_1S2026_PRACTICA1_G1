import { Info, AlertTriangle, CheckCircle } from 'lucide-react';

const InfoBox = ({ title, items, variant = "info" }) => {
  const variantConfig = {
    info: {
      bg: "bg-gradient-to-r from-blue-50 to-blue-100",
      border: "border-blue-300",
      text: "text-blue-800",
      Icon: Info,
      iconBg: "bg-blue-500",
      checkmark: "text-blue-600"
    },
    warning: {
      bg: "bg-gradient-to-r from-yellow-50 to-yellow-100",
      border: "border-yellow-300",
      text: "text-yellow-800",
      Icon: AlertTriangle,
      iconBg: "bg-yellow-500",
      checkmark: "text-yellow-600"
    },
    success: {
      bg: "bg-gradient-to-r from-green-50 to-green-100",
      border: "border-green-300",
      text: "text-green-800",
      Icon: CheckCircle,
      iconBg: "bg-green-500",
      checkmark: "text-green-600"
    }
  };

  const currentVariant = variantConfig[variant];
  const IconComponent = currentVariant.Icon;

  return (
    <div className={`relative overflow-hidden p-5 rounded-2xl border-2 ${currentVariant.bg} ${currentVariant.border} mb-4 shadow-sm transition-all duration-300 hover:shadow-md animate-fadeInUp`}>
      {/* Patrón decorativo de fondo */}
      <div className="absolute inset-0 opacity-5">
        <div className="pattern-diagonal-lines w-full h-full"></div>
      </div>
      
      <div className="relative z-10">
        {title && (
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-8 h-8 rounded-lg ${currentVariant.iconBg} flex items-center justify-center text-white shadow-md`}>
              <IconComponent size={16} />
            </div>
            <p className={`font-semibold text-sm ${currentVariant.text}`}>{title}</p>
          </div>
        )}
        {items && items.length > 0 && (
          <ul className="text-xs space-y-2 ml-11">
            {items.map((item, index) => (
              <li 
                key={index} 
                className="flex items-start gap-2 transition-all duration-200 hover:translate-x-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className={`${currentVariant.checkmark} font-bold text-base flex-shrink-0 mt-0.5`}>•</span>
                <span className={currentVariant.text}>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Brillo decorativo */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full blur-2xl"></div>
    </div>
  );
};

export default InfoBox;
