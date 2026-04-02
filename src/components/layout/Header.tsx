import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_NAME } from '@/lib/constants';

const colorClasses: Record<string, string> = {
  blue: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
  green: 'bg-green-50 text-green-600 hover:bg-green-100',
  teal: 'bg-teal-50 text-teal-600 hover:bg-teal-100',
  purple: 'bg-purple-50 text-purple-600 hover:bg-purple-100',
  yellow: 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100',
  red: 'bg-red-50 text-red-600 hover:bg-red-100',
};

const navItems = [
  { href: '/currency', label: 'عملات', icon: '💰', color: 'blue' },
  { href: '/date', label: 'تاريخ', icon: '📅', color: 'green' },
  { href: '/date/today', label: 'تاريخ اليوم', icon: '🌙', color: 'teal' },
  { href: '/date/age-calculator', label: 'حساب العمر', icon: '🎂', color: 'purple' },
  { href: '/weight', label: 'وزن', icon: '⚖️', color: 'yellow' },
  { href: '/length', label: 'طول', icon: '📏', color: 'purple' },
  { href: '/temperature', label: 'حرارة', icon: '🌡️', color: 'red' },
];

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition"
          >
            {SITE_NAME} ✨
          </Link>

          <nav className="flex gap-2 overflow-x-auto pb-2 max-w-[70%] hide-scrollbar">
            {navItems.map(({ href, label, icon, color }) => (
              <Link
                key={href}
                to={href}
                className={`px-3 py-1 text-sm rounded-full whitespace-nowrap hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-1 ${colorClasses[color] || 'bg-gray-50 text-gray-600'}`}
              >
                <span>{icon}</span>
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
