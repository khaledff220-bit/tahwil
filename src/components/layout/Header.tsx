import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_NAME } from '@/lib/constants';

const navItems = [
  { href: '/currency', label: 'عملات', icon: '💰', color: 'blue' },
  { href: '/date', label: 'تاريخ', icon: '📅', color: 'green' },
  { href: '/date/today', label: 'تاريخ اليوم', icon: '🌙', color: 'teal' }, // ✅ emerald → teal
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
                className={`px-3 py-1 text-sm bg-${color}-50 text-${color}-600 rounded-full whitespace-nowrap
                           hover:shadow-md transition duration-200 flex items-center gap-1`}
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
