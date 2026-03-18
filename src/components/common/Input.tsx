import React from 'react';

interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'number';
  placeholder?: string;
  color?: 'green' | 'blue' | 'gray';
  min?: number;
  max?: number;
  className?: string;
}

const colorClasses = {
  green: 'focus:ring-green-500 focus:border-green-500',
  blue: 'focus:ring-blue-500 focus:border-blue-500',
  gray: 'focus:ring-gray-500 focus:border-gray-500'
};

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  color = 'gray',
  min,
  max,
  className = ''
}) => {
  return (
    <div className={className}>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        min={min}
        max={max}
        className={`w-full p-3 border border-gray-300 rounded-lg 
                   focus:outline-none focus:ring-2 transition duration-200
                   ${colorClasses[color]}`}
      />
    </div>
  );
};

export default Input;
