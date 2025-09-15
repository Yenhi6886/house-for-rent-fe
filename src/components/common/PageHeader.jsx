import React from 'react';
import { Separator } from '../ui/separator';

const PageHeader = ({ 
  title, 
  subtitle, 
  leftContent,
  rightContent,
  className = "" 
}) => {
  return (
    <div className={`flex items-center justify-between mb-8 ${className}`}>
      <div className="flex items-center space-x-4">
        {leftContent}
        {leftContent && <Separator orientation="vertical" className="h-6" />}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
        </div>
      </div>
      {rightContent && (
        <div className="flex items-center space-x-2">
          {rightContent}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
