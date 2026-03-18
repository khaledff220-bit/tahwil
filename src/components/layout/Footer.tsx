import React from 'react';
import { SITE_NAME } from '@/lib/constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-12">
      <div className="container mx-auto px-4 text-center text-gray-600">
        <p>جميع الحقوق محفوظة © {currentYear} {SITE_NAME}</p>
      </div>
    </footer>
  );
};

export default Footer;
