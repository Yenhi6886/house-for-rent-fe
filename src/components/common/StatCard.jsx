import React from 'react';
import { Card, CardContent } from '../ui/card';

const StatCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  color = "blue",
  trend,
  className = "" 
}) => {
  const colorClasses = {
    blue: "from-blue-50 to-blue-100 text-blue-600 border-blue-200",
    purple: "from-purple-50 to-purple-100 text-purple-600 border-purple-200",
    green: "from-green-50 to-green-100 text-green-600 border-green-200",
    orange: "from-orange-50 to-orange-100 text-orange-600 border-orange-200",
    red: "from-red-50 to-red-100 text-red-600 border-red-200"
  };

  return (
    <Card className={`border ${colorClasses[color].split(' ')[3]} ${className}`}>
      <CardContent className={`p-6 bg-gradient-to-br ${colorClasses[color].split(' ')[0]} ${colorClasses[color].split(' ')[1]}`}>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className={`text-2xl font-bold ${colorClasses[color].split(' ')[2]}`}>{value}</p>
            {subtitle && (
              <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
            )}
            {trend && (
              <div className="flex items-center mt-2">
                <span className={`text-xs font-medium ${
                  trend.type === 'up' ? 'text-green-600' : 
                  trend.type === 'down' ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {trend.value}
                </span>
                <span className="text-xs text-gray-500 ml-1">{trend.label}</span>
              </div>
            )}
          </div>
          {Icon && (
            <div className={`p-3 rounded-full bg-white/50`}>
              <Icon className={`h-6 w-6 ${colorClasses[color].split(' ')[2]}`} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
