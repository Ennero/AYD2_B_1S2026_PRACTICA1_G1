import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Input = ({ 
  label, 
  type = "text", 
  name, 
  value, 
  onChange, 
  placeholder, 
  required = false,
  error = null,
  hints = null, // Array de hints para mostrar al hacer focus
  Icon = null // Componente de icono para mostrar dentro del input
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div 
      className="mb-5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {label && (
        <label htmlFor={name} className="block text-gray-700 text-sm font-medium mb-2 transition-all duration-200">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {/* Icono dentro del input */}
        {Icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none z-10">
            <Icon size={20} />
          </div>
        )}
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-3.5 border-2 rounded-xl focus:outline-none transition-all duration-300 bg-white transform hover:scale-[1.01] ${
            error 
              ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100 focus:shadow-lg focus:shadow-red-100/50' 
              : 'border-gray-300 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 focus:shadow-lg focus:shadow-emerald-100/50 hover:border-gray-400'
          }`}
          required={required}
        />
        
        {/* Hints que aparecen al hacer focus */}
        <AnimatePresence>
          {hints && hints.length > 0 && isFocused && (
            <motion.div 
              className="absolute left-0 right-0 mt-2 p-3 bg-gradient-to-r from-emerald-50 to-emerald-100 border-2 border-emerald-200 rounded-xl shadow-md z-10"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
            <div className="flex items-start gap-2">
              <span className="text-emerald-600  flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </span>
              <div>
                <p className="text-emerald-800 font-semibold text-xs mb-1.5">Tu contraseña debe contener:</p>
                <ul className="space-y-1">
                  {hints.map((hint, index) => (
                    <li key={index} className="flex items-start gap-1.5 text-xs text-emerald-700">
                      <span className="text-emerald-500 font-bold flex-shrink-0">•</span>
                      <span>{hint}</span>
                    </li>
                  ))}
                </ul>
              </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p 
            className="text-red-500 text-xs mt-1.5"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Input;
