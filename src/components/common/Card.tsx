import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  color?: 'green' | 'blue' | 'yellow' | 'purple' | 'red' | 'gray';
  className?: string;
}

const colorClasses = {
  green: 'border-green-500 bg-green-50',
  blue: 'border-blue-500 bg-blue-50',
  yellow: 'border-yellow-500 bg-yellow-50',
  purple: 'border-purple-500 bg-purple-50',
  red: 'border-red-500 bg-red-50',
  gray: 'border-gray-500 bg-gray-50'
};

const titleColorClasses = {
  green: 'text-green-700',
  blue: 'text-blue-700',
  yellow: 'text-yellow-700',
  purple: 'text-purple-700',
  red: 'text-red-700',
  gray: 'text-gray-700'
};

const Card: React.FC<CardProps> = ({ children, title, color = 'gray', className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 border-r-4 ${colorClasses[color]} ${className}`}>
      {title && (
        <h2 className={`text-2xl font-bold ${titleColorClasses[color]} mb-4`}>
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};

export default Card;
