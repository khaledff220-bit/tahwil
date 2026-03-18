import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  color?: 'green' | 'blue' | 'gray';
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}

const colorClasses = {
  green: 'bg-green-600 hover:bg-green-700 focus:ring-green-500 disabled:bg-green-300',
  blue: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-300',
  gray: 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 disabled:bg-gray-300'
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  color = 'gray',
  fullWidth = true,
  disabled = false,
  className = ''
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${fullWidth ? 'w-full' : ''} 
                 ${colorClasses[color]} 
                 text-white font-bold py-3 px-4 rounded-lg 
                 transition duration-300 transform hover:scale-105
                 focus:outline-none focus:ring-2 focus:ring-offset-2
                 disabled:cursor-not-allowed
                 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
