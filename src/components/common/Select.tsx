import React from 'react';

interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  color?: 'green' | 'blue' | 'gray';
  className?: string;
}

const colorClasses = {
  green: 'focus:ring-green-500 focus:border-green-500',
  blue: 'focus:ring-blue-500 focus:border-blue-500',
  gray: 'focus:ring-gray-500 focus:border-gray-500'
};

const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  color = 'gray',
  className = ''
}) => {
  return (
    <div className={className}>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full p-3 border border-gray-300 rounded-lg 
                   focus:outline-none focus:ring-2 transition duration-200
                   ${colorClasses[color]}`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
