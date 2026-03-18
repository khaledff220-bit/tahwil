import React, { useState, useEffect } from 'react';
import TodayDateView from './TodayDateView';
import { getDetailedDate, DateData } from './TodayDateLogic';
import Footer from '@/components/layout/Footer';

const TodayDatePage: React.FC = () => {
  const [dateData, setDateData] = useState<DateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // 1. تحديث عنوان الصفحة
    document.title = 'تاريخ اليوم هجري وميلادي - دقيق ومحدث';

    // 2. إدارة وصف الميتا بطريقة آمنة ✅
    let metaDescription = document.querySelector('meta[name="description"]');
    
    if (!metaDescription) {
      // إذا لم يكن موجوداً، أنشئ واحداً جديداً
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    
    metaDescription.setAttribute('content', 'تعرف على تاريخ اليوم بالهجري والميلادي بدقة عالية. عرض محدث يومياً مع تفاصيل اليوم والشهر والسنة.');

    // 3. إضافة كلمات مفتاحية ✅
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'تاريخ اليوم, تاريخ اليوم هجري, تاريخ اليوم ميلادي, التقويم الهجري, التقويم الميلادي, كم التاريخ اليوم');

    // 4. إضافة meta للأداء (يفضل أن تكون في index.html لكن نضيفها احتياطاً)
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.setAttribute('name', 'viewport');
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
      document.head.appendChild(viewport);
    }

    // جلب البيانات
    const fetchDate = async () => {
      try {
        const data = await getDetailedDate();
        setDateData(data);
      } catch (err) {
        setError('حدث خطأ في تحميل البيانات');
      } finally {
        setLoading(false);
      }
    };

    fetchDate();
  }, []);

  const handleCopy = () => {
    if (dateData) {
      const text = `تاريخ اليوم: الهجري ${dateData.hijriDate} | الميلادي ${dateData.gregorianDate}`;
      navigator.clipboard.writeText(text);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <main className="py-12 flex justify-center items-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">جاري تحميل التاريخ...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !dateData) {
    return (
      <div className="min-h-screen bg-white">
        <main className="py-12">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-red-50 p-8 rounded-2xl text-center">
              <p className="text-red-600">{error || 'حدث خطأ غير متوقع'}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700"
              >
                إعادة المحاولة
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="py-8">
        <TodayDateView data={dateData} onCopy={handleCopy} />
      </main>
      <Footer />
    </div>
  );
};

export default TodayDatePage;
