import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';

const UserAvatar = ({ 
  src, 
  alt, 
  username, 
  fullName, 
  size = "lg",
  className = "" 
}) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12", 
    lg: "h-32 w-32",
    xl: "h-40 w-40"
  };

  const getInitials = (name) => {
    if (!name) return username?.charAt(0)?.toUpperCase() || "U";
    return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase().slice(0, 2);
  };

  return (
    <Avatar className={`${sizeClasses[size]} ${className}`}>
      <AvatarImage 
        src={src || `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName || username || 'User')}&background=random`} 
        alt={alt || "User avatar"} 
      />
      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
        {getInitials(fullName)}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
