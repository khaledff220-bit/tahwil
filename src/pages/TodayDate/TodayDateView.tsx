import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DateData } from './TodayDateLogic';

interface Props {
  data: DateData;
  onCopy: () => void;
}

const TodayDateView: React.FC<Props> = ({ data, onCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // بيانات منظمة لتحسين SEO
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "تاريخ اليوم هجري وميلادي",
    "description": "تعرف على تاريخ اليوم بالهجري والميلادي مع تفاصيل دقيقة",
    "datePublished": new Date().toISOString().split('T')[0],
    "dateModified": new Date().toISOString().split('T')[0],
    "inLanguage": "ar"
  };

  return (
    <>
      {/* إضافة البيانات المنظمة بالطريقة الصحيحة */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData).replace(/</g, '\\u003c') }}
      />

      <div className="max-w-4xl mx-auto px-4">
        {/* فتات الخبز (Breadcrumbs) لتحسين SEO */}
        <nav className="text-sm mb-4 text-gray-500">
          <Link to="/" className="hover:text-primary">الرئيسية</Link> /
          <Link to="/date" className="hover:text-primary mx-1">تحويل التاريخ</Link> /
          <span className="text-gray-800 mr-1">تاريخ اليوم</span>
        </nav>

        {/* البطاقة الرئيسية */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-l from-green-600 to-blue-600 p-8 text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              تاريخ اليوم هجري وميلادي
            </h1>
            <p className="opacity-90 text-lg">
              عرض دقيق للتاريخ حسب تقويم أم القرى والتقويم الميلادي
            </p>
          </div>
          
          <div className="p-8">
            {/* ✅ عرض اليوم مع تحويل الرقم إلى نص */}
            <div className="text-center mb-8">
              <span className="text-7xl font-black text-blue-600 block mb-2">
                {data.dayNumber.toString()}
              </span>
              <span className="text-3xl text-gray-700 font-bold block mb-1">
                {data.dayName}
              </span>
              <span className="text-xl text-gray-500">
                {data.monthName} {data.year.toString()} م
              </span>
            </div>

            {/* بطاقات التاريخ */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 p-8 rounded-2xl border border-blue-200 text-center hover:shadow-xl transition">
                <h2 className="text-blue-800 font-bold text-xl mb-3">التاريخ الميلادي</h2>
                <p className="text-2xl text-blue-900 font-semibold">{data.gregorianDate}</p>
                <p className="text-blue-600 mt-2">
                  اليوم {data.dayNumber.toString()} من {data.monthName}
                </p>
              </div>
              
              <div className="bg-green-50 p-8 rounded-2xl border border-green-200 text-center hover:shadow-xl transition">
                <h2 className="text-green-800 font-bold text-xl mb-3">التاريخ الهجري</h2>
                <p className="text-2xl text-green-900 font-semibold">{data.hijriDate}</p>
                <p className="text-green-600 mt-2">
                  اليوم {data.hijriDay.toString()} من {data.hijriMonth}
                </p>
              </div>
            </div>

            {/* ✅ إضافة أوقات الصلاة إذا كانت موجودة (اختياري) */}
            {data.prayerTimes && (
              <div className="mb-8 bg-gray-50 p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">أوقات الصلاة اليوم</h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2 text-center">
                  <div className="bg-white p-2 rounded-lg">
                    <div className="text-sm text-gray-500">الفجر</div>
                    <div className="font-bold">{data.prayerTimes.fajr}</div>
                  </div>
                  <div className="bg-white p-2 rounded-lg">
                    <div className="text-sm text-gray-500">الشروق</div>
                    <div className="font-bold">{data.prayerTimes.sunrise}</div>
                  </div>
                  <div className="bg-white p-2 rounded-lg">
                    <div className="text-sm text-gray-500">الظهر</div>
                    <div className="font-bold">{data.prayerTimes.dhuhr}</div>
                  </div>
                  <div className="bg-white p-2 rounded-lg">
                    <div className="text-sm text-gray-500">العصر</div>
                    <div className="font-bold">{data.prayerTimes.asr}</div>
                  </div>
                  <div className="bg-white p-2 rounded-lg">
                    <div className="text-sm text-gray-500">المغرب</div>
                    <div className="font-bold">{data.prayerTimes.maghrib}</div>
                  </div>
                  <div className="bg-white p-2 rounded-lg">
                    <div className="text-sm text-gray-500">العشاء</div>
                    <div className="font-bold">{data.prayerTimes.isha}</div>
                  </div>
                </div>
              </div>
            )}

            {/* أزرار التفاعل */}
            <div className="flex flex-wrap gap-4 justify-center">
              <button 
                onClick={handleCopy}
                className="bg-gray-800 text-white px-8 py-3 rounded-full hover:bg-black transition-all flex items-center gap-2"
              >
                <span>📋</span>
                {copied ? 'تم النسخ!' : 'نسخ التاريخ'}
              </button>
              
              <Link 
                to="/date"
                className="bg-white text-gray-700 border-2 border-gray-200 px-8 py-3 rounded-full hover:border-blue-500 transition-all flex items-center gap-2"
              >
                <span>🔄</span>
                تحويل تاريخ آخر
              </Link>
            </div>
          </div>
        </div>

        {/* محتوى SEO غني */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          {/* معلومات عن التقويم الهجري */}
          <section className="bg-white p-6 rounded-2xl shadow-lg border-r-4 border-green-500">
            <h2 className="text-xl font-bold text-gray-800 mb-3">التقويم الهجري</h2>
            <p className="text-gray-600 leading-relaxed">
              التقويم الهجري هو تقويم قمري يعتمد على دورة القمر. بدأ بهجرة النبي محمد ﷺ من مكة إلى المدينة. 
              يتكون من 12 شهراً: محرم، صفر، ربيع الأول، ربيع الآخر، جمادى الأولى، جمادى الآخرة، 
              رجب، شعبان، رمضان، شوال، ذو القعدة، ذو الحجة.
            </p>
            <div className="mt-3 text-sm text-gray-500">
              اليوم: {data.hijriDay.toString()} {data.hijriMonth} {data.hijriYear.toString()} هـ
            </div>
          </section>

          {/* معلومات عن التقويم الميلادي */}
          <section className="bg-white p-6 rounded-2xl shadow-lg border-r-4 border-blue-500">
            <h2 className="text-xl font-bold text-gray-800 mb-3">التقويم الميلادي</h2>
            <p className="text-gray-600 leading-relaxed">
              التقويم الميلادي هو تقويم شمسي يعتمد على دورة الشمس. يبدأ بميلاد السيد المسيح عليه السلام. 
              يتكون من 12 شهراً: يناير، فبراير، مارس، أبريل، مايو، يونيو، يوليو، أغسطس، سبتمبر، أكتوبر، نوفمبر، ديسمبر.
            </p>
            <div className="mt-3 text-sm text-gray-500">
              اليوم: {data.dayNumber.toString()} {data.monthName} {data.year.toString()} م
            </div>
          </section>
        </div>

        {/* أسئلة شائعة (FAQ) */}
        <section className="mt-12 bg-gray-50 p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            أسئلة شائعة عن تاريخ اليوم
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-2">ما هو تاريخ اليوم بالهجري؟</h3>
              <p className="text-gray-600">تاريخ اليوم بالهجري هو: {data.hijriDate}</p>
            </div>
            
            <div className="bg-white p-4 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-2">ما هو تاريخ اليوم بالميلادي؟</h3>
              <p className="text-gray-600">تاريخ اليوم بالميلادي هو: {data.gregorianDate}</p>
            </div>
            
            <div className="bg-white p-4 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-2">كم باقي على رمضان؟</h3>
              <p className="text-gray-600">يمكنك استخدام أداة تحويل التاريخ لمعرفة ذلك.</p>
            </div>
            
            <div className="bg-white p-4 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-2">هل هذه التواريخ دقيقة؟</h3>
              <p className="text-gray-600">نعم، نعتمد على تقويم أم القرى الرسمي (طريقة 4) وتقويم غريغوري الدقيق.</p>
            </div>
          </div>
        </section>

        {/* روابط سريعة لأدوات أخرى */}
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link to="/date" className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200">
            تحويل التاريخ
          </Link>
          <Link to="/date/today" className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200">
            تاريخ اليوم
          </Link>
          <Link to="/date/compare" className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200">
            مقارنة تواريخ
          </Link>
          <Link to="/date/age-calculator" className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm hover:bg-yellow-200">
            حساب العمر
          </Link>
        </div>
      </div>
    </>
  );
};

export default TodayDateView;
