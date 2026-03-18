import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CompareResult } from './CompareDateLogic';

interface Props {
  result: CompareResult | null;
  date1: string;
  date2: string;
  onDate1Change: (date: string) => void;
  onDate2Change: (date: string) => void;
  onCompare: () => void;
  isLoading: boolean;
  error: string;
}

const CompareDateView: React.FC<Props> = ({
  result,
  date1,
  date2,
  onDate1Change,
  onDate2Change,
  onCompare,
  isLoading,
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
    "inLanguage": "ar",
    "keywords": "مقارنة تواريخ, الفرق بين تاريخين, حساب المدة بين تاريخين"
  };

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData).replace(/</g, '\\u003c') }}
      />

      <div className="max-w-4xl mx-auto px-4 py-6 font-cairo" dir="rtl">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm mb-6 text-gray-500 bg-white p-3 rounded-lg shadow-sm">
          <Link to="/" className="hover:text-orange-600 transition">الرئيسية</Link>
          <span>/</span>
          <Link to="/date" className="hover:text-orange-600 transition">تحويل التاريخ</Link>
          <span>/</span>
          <span className="text-orange-700 font-bold">مقارنة تواريخ</span>
        </nav>

        {/* البطاقة الرئيسية */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-gradient-to-l from-orange-500 to-red-500 p-8 text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              مقارنة بين تاريخين
            </h1>
            <p className="opacity-90 text-lg">
              احسب الفرق بين تاريخين بالهجري والميلادي مع تفاصيل دقيقة
            </p>
          </div>

          {/* حقول الإدخال */}
          <div className="p-8 border-b border-gray-100">
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  التاريخ الأول
                </label>
                <input
                  type="date"
                  value={date1}
                  onChange={(e) => onDate1Change(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  التاريخ الثاني
                </label>
                <input
                  type="date"
                  value={date2}
                  onChange={(e) => onDate2Change(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                />
              </div>
            </div>

            <div className="text-center mt-6">
              <button
                onClick={onCompare}
                disabled={isLoading || !date1 || !date2}
                className="bg-gradient-to-l from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg transition disabled:opacity-50 transform hover:scale-105"
              >
                {isLoading ? 'جاري المقارنة...' : 'قارن بين التاريخين'}
              </button>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center border border-red-100">
                {error}
              </div>
            )}
          </div>

          {/* النتائج */}
          {result && !isLoading && (
            <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* عرض التاريخين */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-orange-50 p-5 rounded-2xl border border-orange-100">
                  <h3 className="font-bold text-orange-800 mb-3 text-lg">التاريخ الأول</h3>
                  <p className="text-gray-800 font-bold">{result.date1Formatted}</p>
                  <p className="text-sm text-gray-600 mt-1">{result.dayOfWeek1}</p>
                  {result.hijriDate1 && (
                    <p className="text-sm text-orange-600 mt-2 border-t border-orange-200 pt-2">
                      {result.hijriDate1}
                    </p>
                  )}
                </div>
                
                <div className="bg-red-50 p-5 rounded-2xl border border-red-100">
                  <h3 className="font-bold text-red-800 mb-3 text-lg">التاريخ الثاني</h3>
                  <p className="text-gray-800 font-bold">{result.date2Formatted}</p>
                  <p className="text-sm text-gray-600 mt-1">{result.dayOfWeek2}</p>
                  {result.hijriDate2 && (
                    <p className="text-sm text-red-600 mt-2 border-t border-red-200 pt-2">
                      {result.hijriDate2}
                    </p>
                  )}
                </div>
              </div>

              {/* نتيجة المقارنة الرئيسية */}
              <div className="bg-gradient-to-l from-orange-100 to-red-100 p-8 rounded-2xl text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">الفرق بين التاريخين</h2>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="text-3xl font-bold text-orange-600">{result.years}</div>
                    <div className="text-gray-600">سنة</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="text-3xl font-bold text-red-600">{result.months}</div>
                    <div className="text-gray-600">شهر</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="text-3xl font-bold text-orange-600">{result.days}</div>
                    <div className="text-gray-600">يوم</div>
                  </div>
                </div>

                <div className="space-y-2 text-gray-700">
                  <p>إجمالي الأيام: <strong className="text-gray-900">{result.totalDays.toLocaleString()}</strong> يوم</p>
                  <p>إجمالي الأسابيع: <strong className="text-gray-900">{result.totalWeeks.toLocaleString()}</strong> أسبوع</p>
                  <p>إجمالي الساعات: <strong className="text-gray-900">{result.totalHours.toLocaleString()}</strong> ساعة</p>
                  <p>إجمالي الدقائق: <strong className="text-gray-900">{result.totalMinutes.toLocaleString()}</strong> دقيقة</p>
                </div>

                {result.isFuture && (
                  <div className="mt-4 p-3 bg-yellow-100 text-yellow-800 rounded-lg text-sm">
                    * التاريخ الأول في المستقبل بالنسبة للثاني
                  </div>
                )}
              </div>

              {/* زر النسخ */}
              <button
                onClick={handleCopy}
                className="w-full bg-gray-800 text-white py-4 rounded-xl hover:bg-black transition flex items-center justify-center gap-2 text-lg font-bold"
              >
                <span>📋</span>
                {copied ? '✅ تم نسخ النتيجة' : 'نسخ ملخص المقارنة'}
              </button>
            </div>
          )}
        </div>

        {/* محتوى SEO غني */}
        <div className="mt-12 bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            كل ما تريد معرفته عن مقارنة التواريخ
          </h2>
          
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              <strong>مقارنة التواريخ</strong> أو حساب الفرق بين تاريخين من الخدمات المهمة في الحياة اليومية. 
              سواء كنت تريد معرفة كم مضى على حدث معين، أو كم تبقى على مناسبة مهمة، أو حساب مدة مشروع أو عقد.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-3">استخدامات مقارنة التواريخ</h3>
            <ul className="list-disc pr-6 space-y-2">
              <li>حساب عمر شخص ما بدقة</li>
              <li>معرفة المدة بين تاريخين (مثل تاريخ الزواج)</li>
              <li>حساب مدة مشروع أو خطة عمل</li>
              <li>معرفة الأيام المتبقية على مناسبة</li>
              <li>حساب الفرق بين تاريخين هجريين أو ميلاديين</li>
            </ul>

            <h3 className="text-xl font-bold mt-6 mb-3">كيفية استخدام الأداة</h3>
            <ol className="list-decimal pr-6 space-y-2">
              <li>اختر التاريخ الأول من القائمة</li>
              <li>اختر التاريخ الثاني من القائمة</li>
              <li>اضغط على زر "قارن بين التاريخين"</li>
              <li>ستظهر لك النتيجة بالسنوات والأشهر والأيام</li>
              <li>يمكنك أيضاً رؤية الفرق بالأسابيع والساعات والدقائق</li>
            </ol>
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
