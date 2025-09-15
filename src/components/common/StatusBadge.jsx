import React from 'react';
import { Badge } from '../ui/badge';

const StatusBadge = ({ 
  status, 
  activeText = "Đang hoạt động", 
  inactiveText = "Đã khóa",
  className = "" 
}) => {
  const isActive = status === true || status === 'active';
  
  return (
    <Badge 
      variant={isActive ? "default" : "destructive"}
      className={`${isActive 
        ? "bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200" 
        : "bg-red-100 text-red-800 border-red-200 hover:bg-red-200"
      } ${className}`}
    >
      <div className={`w-2 h-2 rounded-full mr-1 ${isActive ? "bg-emerald-500" : "bg-red-500"}`} />
      {isActive ? activeText : inactiveText}
    </Badge>
  );
};

export default StatusBadge;
