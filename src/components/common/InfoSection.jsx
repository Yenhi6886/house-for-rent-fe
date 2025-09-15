import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const InfoSection = ({ 
  title, 
  icon: Icon, 
  children, 
  className = "",
  headerAction
}) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-lg">
            {Icon && <Icon className="h-5 w-5" />}
            <span>{title}</span>
          </CardTitle>
          {headerAction}
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default InfoSection;
