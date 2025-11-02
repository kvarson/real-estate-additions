// Reusable Card component

import React from 'react';
import { CardProps } from '@/types/components';
import { cn } from '@/utils';

const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false,
  padding = 'md'
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };

  const cardClasses = cn(
    'bg-white border border-gray-200 rounded-lg shadow-sm',
    hover && 'hover:shadow-md transition-shadow duration-200',
    paddingClasses[padding],
    className
  );

  return (
    <div className={cardClasses}>
      {children}
    </div>
  );
};

export default Card;