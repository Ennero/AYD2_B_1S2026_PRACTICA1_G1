import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  onClick, 
  type = "button", 
  variant = "primary",
  disabled = false,
  fullWidth = false,
  icon = null,
  className = "",
  loading = false
}) => {
  const baseStyles = "px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95";
  
  const variants = {
    primary: "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white focus:ring-emerald-300 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:shadow-emerald-200/50 relative overflow-hidden group",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400 disabled:opacity-50 shadow-md hover:shadow-lg",
    google: "bg-white border-2 border-gray-200 hover:bg-gray-50 text-gray-700 focus:ring-gray-300 shadow-md hover:shadow-lg",
    outline: "border-2 border-blue-500 text-blue-600 hover:bg-blue-50 focus:ring-blue-400 hover:border-blue-600"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className} ${loading ? 'cursor-wait' : ''}`}
      whileHover={{ scale: loading ? 1 : 1.02 }}
      whileTap={{ scale: loading ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {/* Efecto shimmer para botón primary */}
      {variant === 'primary' && !loading && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" 
               style={{ backgroundSize: '200% 100%' }}></div>
        </div>
      )}
      
      <div className="relative z-10 flex items-center gap-2">
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Procesando...</span>
          </>
        ) : (
          <>
            {icon && <span className="text-xl">{icon}</span>}
            {children}
          </>
        )}
      </div>
    </motion.button>
  );
};

export default Button;
