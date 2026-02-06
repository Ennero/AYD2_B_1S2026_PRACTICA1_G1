const InfoBox = ({ title, items, variant = "info" }) => {
  const variants = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    success: "bg-green-50 border-green-200 text-green-800"
  };

  return (
    <div className={`p-4 rounded-lg border ${variants[variant]} mb-4`}>
      {title && <p className="font-medium mb-2 text-sm">{title}</p>}
      {items && items.length > 0 && (
        <ul className="text-xs space-y-1">
          {items.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InfoBox;
