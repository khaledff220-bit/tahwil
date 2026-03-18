import React from 'react';

interface SEOContentProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

const SEOContent: React.FC<SEOContentProps> = ({ title, description, children }) => {
  return (
    <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
      <p className="text-gray-600 mb-6">{description}</p>
      {children}
    </div>
  );
};

export default SEOContent;
