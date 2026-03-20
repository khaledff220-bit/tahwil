import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const NotFoundPage: React.FC = () => {
  const location = useLocation();
  // تحديث عنوان الصفحة لتحسين SEO
  useEffect(() => {
    document.title = 'الصفحة غير موجودة - 404 - تحويلاتي';
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'عذراً، الصفحة التي تبحث عنها غير موجودة. استخدم روابط التنقل للوصول إلى أدوات تحويل التاريخ والعملات.');
  }, []);

  // بيانات منظمة لتحسين SEO
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "404 - الصفحة غير موجودة",
    "description": "صفحة الخطأ 404 - المحتوى غير موجود",
    "inLanguage": "ar"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData).replace(/</g, '\\u003c') }}
      />
      
      <div className="min-h-screen bg-white">
        <Header />
        <main className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 text-center">
            {/* أيقونة 404 كبيرة */}
            <div className="mb-8">
              <span className="text-9xl font-black text-gray-200">404</span>
            </div>
            
            {/* عنوان الصفحة */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              عذراً! الصفحة غير موجودة
            </h1>
            
            {/* وصف الخطأ */}
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          <div className="bg-red-50 p-4 rounded text-red-600 font-mono mt-4">المسار الذي تبحث عنه: {location.pathname}</div>
              الصفحة التي تبحث عنها ربما تم نقلها أو حذفها، أو أن الرابط الذي استخدمته غير صحيح.
            </p>
            
            {/* روابط مساعدة */}
            <div className="space-y-6">
              <Link 
                to="/" 
                className="inline-block bg-gradient-to-l from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg transition transform hover:scale-105"
              >
                العودة إلى الرئيسية
              </Link>
              
              <div className="flex flex-wrap gap-3 justify-center mt-8">
                <Link to="/date" className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition">
                  تحويل التاريخ
                </Link>
                <Link to="/date/today" className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200 transition">
                  تاريخ اليوم
                </Link>
                <Link to="/date/age-calculator" className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200 transition">
                  حساب العمر
                </Link>
                <Link to="/currency" className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm hover:bg-yellow-200 transition">
                  تحويل العملات
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default NotFoundPage;
