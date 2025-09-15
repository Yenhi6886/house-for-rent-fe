import React from 'react';

const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  action,
  className = "" 
}) => {
  return (
    <div className={`text-center py-12 ${className}`}>
      {Icon && <Icon className="h-16 w-16 text-gray-300 mx-auto mb-4" />}
      <h3 className="text-lg font-semibold text-gray-500 mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-gray-400 mb-4">
          {description}
        </p>
      )}
      {action}
    </div>
  );
};

export default EmptyState;
