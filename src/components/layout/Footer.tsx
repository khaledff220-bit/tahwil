import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_NAME } from '@/lib/constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: '💰 تحويل العملات',
      links: [
        { name: 'دولار → ريال', path: '/currency/convert/usd/sar' },
        { name: 'دولار → جنيه', path: '/currency/convert/usd/egp' },
        { name: 'دولار → درهم', path: '/currency/convert/usd/aed' },
        { name: 'يورو → جنيه', path: '/currency/convert/eur/egp' },
        { name: 'دينار كويتي → دولار', path: '/currency/convert/kwd/usd' },
      ]
    },
    {
      title: '⚖️ تحويل الوزن',
      links: [
        { name: 'كيلو → رطل', path: '/weight/convert/kg/lb' },
        { name: 'رطل → كيلو', path: '/weight/convert/lb/kg' },
        { name: 'أونصة ذهب → جرام', path: '/weight/convert/gold-oz/g' },
        { name: 'مثقال → جرام', path: '/weight/convert/mithqal/g' },
        { name: 'من → كيلو', path: '/weight/convert/mann/kg' },
        { name: 'كوب → ملعقة', path: '/weight/convert/cup/tbsp' },
      ]
    },
    {
      title: '📏 تحويل الطول',
      links: [
        { name: 'متر → قدم', path: '/length/convert/m/ft' },
        { name: 'كيلو → ميل', path: '/length/convert/km/mi' },
        { name: 'سم → بوصة', path: '/length/convert/cm/in' },
        { name: 'ذراع → متر', path: '/length/convert/cubit/m' },
        { name: 'سنة ضوئية → كيلو', path: '/length/convert/ly/km' },
      ]
    },
    {
      title: '🌡️ تحويل الحرارة',
      links: [
        { name: 'سيلزيوس → فهرنهايت', path: '/temperature/convert/celsius/fahrenheit' },
        { name: 'فهرنهايت → سيلزيوس', path: '/temperature/convert/fahrenheit/celsius' },
        { name: 'سيلزيوس → كلفن', path: '/temperature/convert/celsius/kelvin' },
        { name: 'سيلزيوس → ريومور', path: '/temperature/convert/celsius/reaumur' },
        { name: 'سيلزيوس → نيوتن', path: '/temperature/convert/celsius/newton' },
      ]
    },
    {
      title: '📅 تحويل التاريخ',
      links: [
        { name: 'تحويل التاريخ', path: '/date' },
        { name: 'تاريخ اليوم', path: '/date/today' },
        { name: 'حساب العمر', path: '/date/age-calculator' },
        { name: 'مقارنة تواريخ', path: '/date/compare' },
      ]
    },
    {
  title: '🏺 مقاييس تراثية',
  links: [
    { name: 'ذراع → متر', path: '/ancient/convert/cubit/meter' },
    { name: 'شبر → سم', path: '/ancient/convert/span/centimeter' },
    { name: 'من → كيلو', path: '/ancient/convert/mann/kilogram' },
    { name: 'مثقال → جرام', path: '/ancient/convert/mithqal/gram' },
    { name: 'قامة → متر', path: '/ancient/convert/fathom/meter' },
    { name: 'فرسخ → كيلو', path: '/ancient/convert/league/kilometer' },
    { name: 'درهم → جرام', path: '/ancient/convert/dirham/gram' },
    { name: 'رطل سعودي → كيلو', path: '/ancient/convert/gulf_lb/kilogram' },
  ]
},
  ];

  return (
    <footer className="bg-slate-900 text-slate-400 pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Fat Footer - روابط سريعة */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-bold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-sm hover:text-emerald-400 transition">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* خط فاصل */}
        <div className="border-t border-slate-800 my-6"></div>

        {/* حقوق الملكية */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <p>جميع الحقوق محفوظة © {currentYear} {SITE_NAME}</p>
          <p className="mt-2 md:mt-0">
            🚀 تعمل بأحدث معايير القياس العالمية (BIPM)
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
