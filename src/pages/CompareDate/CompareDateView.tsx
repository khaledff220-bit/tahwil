import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { monthsArabic, getYears, getDays } from './CompareDateLogic';

interface DateFields {
  day: number;
  month: number;
  year: number;
}

interface CompareDateViewProps {
  date1: DateFields;
  date2: DateFields;
  onDate1Change: (fields: DateFields) => void;
  onDate2Change: (fields: DateFields) => void;
  result: any;
  loading: boolean;
  error: string;
}

const DateSelector = ({ 
  label, 
  values, 
  onChange 
}: { 
  label: string; 
  values: DateFields; 
  onChange: (f: DateFields) => void;
}) => {
  const years = getYears();
  const days = getDays();

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition">
      <label className="block text-gray-700 font-bold mb-4 text-right text-lg border-b pb-2">
        {label}
      </label>
      
      <div className="grid grid-cols-3 gap-3" dir="rtl">
        {/* اختيار اليوم */}
        <div>
          <label className="block text-xs text-gray-500 mb-1 text-right">اليوم</label>
          <select 
            value={values.day}
            onChange={(e) => onChange({ ...values, day: parseInt(e.target.value) })}
            className="w-full p-3 bg-white border-2 border-gray-200 text-gray-900 text-sm rounded-xl 
                       focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition 
                       appearance-none cursor-pointer"
          >
            {days.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* اختيار الشهر */}
        <div>
          <label className="block text-xs text-gray-500 mb-1 text-right">الشهر</label>
          <select 
            value={values.month}
            onChange={(e) => onChange({ ...values, month: parseInt(e.target.value) })}
            className="w-full p-3 bg-white border-2 border-gray-200 text-gray-900 text-sm rounded-xl 
                       focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition
                       appearance-none cursor-pointer"
          >
            {monthsArabic.map((m, i) => (
              <option key={i} value={i + 1}>{m}</option>
            ))}
          </select>
        </div>

        {/* اختيار السنة */}
        <div>
          <label className="block text-xs text-gray-500 mb-1 text-right">السنة</label>
          <select 
            value={values.year}
            onChange={(e) => onChange({ ...values, year: parseInt(e.target.value) })}
            className="w-full p-3 bg-white border-2 border-gray-200 text-gray-900 text-sm rounded-xl 
                       focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition
                       appearance-none cursor-pointer max-h-60 overflow-y-auto"
          >
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

const CompareDateView: React.FC<CompareDateViewProps> = ({ 
  date1, 
  date2, 
  onDate1Change, 
  onDate2Change, 
  result, 
  loading,
  error
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (result) {
      const text = `الفرق بين التاريخين: ${result.years} سنة و ${result.months} شهر و ${result.days} يوم (إجمالي ${result.totalDays.toLocaleString()} يوم)`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // بيانات منظمة لتحسين SEO
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "مقارنة التواريخ",
    "description": "احسب الفرق بين تاريخين بالهجري والميلادي",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "inLanguage": "ar"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData).replace(/</g, '\\u003c') }}
      />

      <div className="max-w-4xl mx-auto p-4 font-cairo" dir="rtl">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm mb-6 text-gray-500 bg-white p-3 rounded-lg shadow-sm">
          <Link to="/" className="hover:text-orange-600 transition">الرئيسية</Link>
          <span>/</span>
          <Link to="/date" className="hover:text-orange-600 transition">تحويل التاريخ</Link>
          <span>/</span>
          <span className="text-orange-700 font-bold">مقارنة تواريخ</span>
        </nav>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-gradient-to-l from-orange-500 to-red-600 p-8 text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              مقارنة التواريخ بدقة
            </h1>
            <p className="opacity-90 text-lg">
              احسب الفرق بين تاريخين بالسنوات والأشهر والأيام والساعات
            </p>
          </div>

          <div className="p-8 space-y-8">
            {/* التاريخ الأول */}
            <DateSelector 
              label="التاريخ الأول (الأقدم غالباً)" 
              values={date1} 
              onChange={onDate1Change} 
            />

            {/* أيقونة المقارنة */}
            <div className="flex justify-center relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-0.5 bg-gradient-to-l from-orange-200 to-red-200"></div>
              </div>
              <div className="relative bg-white p-3 rounded-full shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
            </div>

            {/* التاريخ الثاني */}
            <DateSelector 
              label="التاريخ الثاني (الأحدث غالباً)" 
              values={date2} 
              onChange={onDate2Change} 
            />

            {/* رسالة الخطأ */}
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center border border-red-200">
                {error}
              </div>
            )}

            {/* حالة التحميل */}
            {loading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                <p className="mt-4 text-orange-600 font-bold">جاري الحساب وجلب التواريخ الهجرية...</p>
              </div>
            )}

            {/* النتائج */}
            {result && !loading && (
              <div className="mt-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* النتيجة الرئيسية */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-gradient-to-b from-orange-50 to-white p-6 rounded-2xl border border-orange-100 shadow-sm">
                    <span className="block text-4xl font-black text-orange-600">{result.years}</span>
                    <span className="text-sm text-gray-600">سنة</span>
                  </div>
                  <div className="bg-gradient-to-b from-orange-50 to-white p-6 rounded-2xl border border-orange-100 shadow-sm">
                    <span className="block text-4xl font-black text-orange-600">{result.months}</span>
                    <span className="text-sm text-gray-600">شهر</span>
                  </div>
                  <div className="bg-gradient-to-b from-orange-50 to-white p-6 rounded-2xl border border-orange-100 shadow-sm">
                    <span className="block text-4xl font-black text-orange-600">{result.days}</span>
                    <span className="text-sm text-gray-600">يوم</span>
                  </div>
                </div>

                {/* إحصائيات إضافية */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                  <h3 className="font-bold text-gray-800 mb-4 text-lg border-b pb-2">تفاصيل إضافية</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-gray-800">{result.totalDays.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">يوم</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-800">{result.totalWeeks.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">أسبوع</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-800">{result.totalHours.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">ساعة</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-800">{result.totalMinutes.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">دقيقة</div>
                    </div>
                  </div>
                </div>

                {/* عرض التاريخين بالهجري */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-white p-5 rounded-2xl border border-blue-200">
                    <h4 className="text-sm text-blue-700 font-bold mb-2">التاريخ الأول</h4>
                    <p className="text-lg font-bold text-gray-800">{result.date1Formatted}</p>
                    <p className="text-sm text-blue-600 mt-2 border-t border-blue-200 pt-2">{result.dayOfWeek1}</p>
                    {result.hijriDate1 && (
                      <p className="text-xs text-gray-600 mt-2 bg-white p-2 rounded-lg">{result.hijriDate1}</p>
                    )}
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-white p-5 rounded-2xl border border-green-200">
                    <h4 className="text-sm text-green-700 font-bold mb-2">التاريخ الثاني</h4>
                    <p className="text-lg font-bold text-gray-800">{result.date2Formatted}</p>
                    <p className="text-sm text-green-600 mt-2 border-t border-green-200 pt-2">{result.dayOfWeek2}</p>
                    {result.hijriDate2 && (
                      <p className="text-xs text-gray-600 mt-2 bg-white p-2 rounded-lg">{result.hijriDate2}</p>
                    )}
                  </div>
                </div>

                {/* رسالة إذا كان التاريخ الأول في المستقبل */}
                {result.isFuture && (
                  <div className="bg-yellow-50 text-yellow-700 p-4 rounded-xl text-center border border-yellow-200">
                    * التاريخ الأول في المستقبل بالنسبة للثاني
                  </div>
                )}

                {/* زر النسخ */}
                <button
                  onClick={handleCopy}
                  className="w-full bg-gray-800 text-white py-4 rounded-xl hover:bg-black transition-all flex items-center justify-center gap-2 text-lg font-bold"
                >
                  <span>📋</span>
                  {copied ? '✅ تم نسخ النتيجة' : 'نسخ ملخص المقارنة'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* روابط سريعة */}
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link to="/date" className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition">
            تحويل التاريخ
          </Link>
          <Link to="/date/today" className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200 transition">
            تاريخ اليوم
          </Link>
          <Link to="/date/age-calculator" className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200 transition">
            حساب العمر
          </Link>
        </div>
      </div>
    </>
  );
};

export default CompareDateView;
