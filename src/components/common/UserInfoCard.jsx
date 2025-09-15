import React from 'react';
import { Card, CardContent } from '../ui/card';

const UserInfoCard = ({ label, value, icon: Icon, className = "" }) => {
  return (
    <Card className={`hover:shadow-md transition-shadow ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          {Icon && (
            <div className="flex-shrink-0">
              <Icon className="h-5 w-5 text-muted-foreground" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="text-lg font-semibold text-foreground truncate">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfoCard;
