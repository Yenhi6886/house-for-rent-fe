import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Button } from '../ui/button';

const BackButton = ({ to, children = "Quay lại", className = "" }) => {
  return (
    <Button variant="ghost" size="sm" asChild className={className}>
      <Link to={to} className="flex items-center space-x-2">
        <FiArrowLeft className="h-4 w-4" />
        <span>{children}</span>
      </Link>
    </Button>
  );
};

export default BackButton;
