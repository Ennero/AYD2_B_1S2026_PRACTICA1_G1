const Button = ({ 
  children, 
  onClick, 
  type = "button", 
  variant = "primary",
  disabled = false,
  fullWidth = false,
  icon = null,
  className = ""
}) => {
  const baseStyles = "px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500 disabled:bg-gray-300 disabled:cursor-not-allowed",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400 disabled:opacity-50",
    google: "bg-white border-2 border-gray-200 hover:bg-gray-50 text-gray-700 focus:ring-gray-300",
    outline: "border-2 border-blue-500 text-blue-600 hover:bg-blue-50 focus:ring-blue-400"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
    >
      {icon && <span className="text-xl">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
