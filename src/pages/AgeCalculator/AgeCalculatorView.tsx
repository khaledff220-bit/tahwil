import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AgeResult } from './AgeCalculatorLogic';
import { GREGORIAN_MONTHS } from '@/lib/constants'; // ✅ استخدام الثوابت من المشروع

interface Props {
  ageResult: AgeResult | null;
  day: string;
  month: string;
  year: string;
  onDayChange: (val: string) => void;
  onMonthChange: (val: string) => void;
  onYearChange: (val: string) => void;
  onCalculate: () => void;
  isLoading: boolean;
  error: string;
}

const AgeCalculatorView: React.FC<Props> = ({
  ageResult,
  day,
  month,
  year,
  onDayChange,
  onMonthChange,
  onYearChange,
  onCalculate,
  isLoading,
  error
}) => {
  const [copied, setCopied] = useState(false);

  // بيانات منظمة لتحسين SEO
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "حاسبة العمر بالهجري والميلادي",
    "description": "احسب عمرك بدقة بالهجري والميلادي مع تفاصيل دقيقة",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "inLanguage": "ar",
    "keywords": "حساب العمر, حساب العمر بالهجري, حاسبة العمر, كم عمري"
  };

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData).replace(/</g, '\\u003c') }}
      />

      <div className="max-w-4xl mx-auto px-4 py-6 font-cairo" dir="rtl">
        {/* Breadcrumbs في أعلى الصفحة (وليس في الفوتر) */}
        <nav className="flex items-center gap-2 text-sm mb-6 text-gray-500 bg-white p-3 rounded-lg shadow-sm">
          <Link to="/" className="hover:text-purple-600 transition">الرئيسية</Link>
          <span>/</span>
          <Link to="/date" className="hover:text-purple-600 transition">تحويل التاريخ</Link>
          <span>/</span>
          <span className="text-purple-700 font-bold">حساب العمر</span>
        </nav>

        {/* البطاقة الرئيسية */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-gradient-to-l from-purple-600 to-pink-600 p-8 text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              حساب العمر بالهجري والميلادي
            </h1>
            <p className="opacity-90 text-lg">
              أدخل تاريخ ميلادك بالتفصيل لمعرفة عمرك بكل الصيغ
            </p>
          </div>

          {/* حقول الإدخال - قوائم منفصلة كما طلبت */}
          <div className="p-8 border-b border-gray-100">
            <div className="max-w-xl mx-auto">
              <label className="block text-gray-700 font-bold mb-4 text-center">
                تاريخ ميلادك (يوم / شهر / سنة)
              </label>
              
              <div className="flex flex-col md:flex-row gap-3 mb-4">
                {/* قائمة الأيام */}
                <select 
                  value={day} 
                  onChange={(e) => onDayChange(e.target.value)} 
                  className="flex-1 p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none bg-gray-50"
                >
                  {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>

                {/* قائمة الأشهر - باستخدام GREGORIAN_MONTHS من constants.ts */}
                <select 
                  value={month} 
                  onChange={(e) => onMonthChange(e.target.value)} 
                  className="flex-[2] p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none bg-gray-50"
                >
                  {GREGORIAN_MONTHS.map((monthName, index) => (
                    <option key={index} value={index + 1}>{monthName}</option>
                  ))}
                </select>

                {/* حقل السنة - حر بدون قيود */}
                <input 
                  type="text" 
                  inputMode="numeric"
                  value={year} 
                  onChange={(e) => onYearChange(e.target.value)} 
                  placeholder="أدخل السنة 1976"
                  className="flex-[1.5] p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none bg-gray-50 text-center"
                  dir="rtl"
                />
              </div>

              <button
                onClick={onCalculate}
                disabled={isLoading || !year}
                className="w-full bg-gradient-to-l from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold hover:shadow-xl transition disabled:opacity-50 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? 'جاري الحساب...' : 'احسب عمري الآن'}
              </button>

              {error && (
                <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center border border-red-100">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* النتائج */}
          {ageResult && !isLoading && (
            <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* العمر الأساسي */}
              <div className="text-center mb-8">
                <span className="text-7xl font-black text-purple-600 block mb-2">
                  {ageResult.years}
                </span>
                <span className="text-2xl text-gray-700">
                  سنة و {ageResult.months} شهر و {ageResult.days} يوم
                </span>
              </div>

              {/* بطاقات المعلومات السريعة */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-purple-50 p-4 rounded-xl text-center border border-purple-100">
                  <div className="text-lg font-bold text-purple-700">{ageResult.zodiacSign}</div>
                  <div className="text-xs text-gray-500">البرج</div>
                </div>
                <div className="bg-green-50 p-4 rounded-xl text-center border border-green-100">
                  <div className="text-lg font-bold text-green-700">{ageResult.season}</div>
                  <div className="text-xs text-gray-500">فصل الميلاد</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl text-center border border-blue-100">
                  <div className="text-lg font-bold text-blue-700">{ageResult.dayOfWeek}</div>
                  <div className="text-xs text-gray-500">يوم الميلاد</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-xl text-center border border-orange-100">
                  <div className="text-lg font-bold text-orange-700">{ageResult.nextBirthdayDays}</div>
                  <div className="text-xs text-gray-500">يوم لعيد ميلادك</div>
                </div>
              </div>

              {/* التاريخ الهجري */}
              <div className="p-5 bg-gradient-to-l from-purple-100 to-pink-100 rounded-2xl mb-8">
                <div className="flex items-center justify-between">
                  <span className="text-purple-700 font-bold">تاريخ الميلاد بالهجري:</span>
                  <span className="text-gray-800 font-bold">{ageResult.hijriBirthDate}</span>
                </div>
              </div>

              {/* إحصائيات الوقت */}
              <div className="grid grid-cols-3 gap-3 mb-8 text-center">
                <div className="bg-gray-50 p-3 rounded-xl">
                  <div className="text-sm text-gray-500">إجمالي الأيام</div>
                  <div className="text-xl font-bold text-gray-800">{ageResult.totalDays.toLocaleString()}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl">
                  <div className="text-sm text-gray-500">إجمالي الساعات</div>
                  <div className="text-xl font-bold text-gray-800">{ageResult.totalHours.toLocaleString()}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl">
                  <div className="text-sm text-gray-500">إجمالي الدقائق</div>
                  <div className="text-xl font-bold text-gray-800">{ageResult.totalMinutes.toLocaleString()}</div>
                </div>
              </div>

              {/* زر النسخ */}
              <button
                onClick={() => {
                  const text = `عمري هو ${ageResult.years} سنة و ${ageResult.months} شهر. احسب عمرك هنا: ${window.location.href}`;
                  navigator.clipboard.writeText(text);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="w-full bg-gray-800 text-white py-3 rounded-xl hover:bg-black transition flex items-center justify-center gap-2"
              >
                <span>📋</span>
                {copied ? '✅ تم النسخ' : 'نسخ ملخص العمر'}
              </button>
            </div>
          )}
        </div>

        {/* محتوى SEO غني */}
        <div className="mt-12 bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            كل ما تريد معرفته عن حساب العمر بالهجري والميلادي
          </h2>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              <strong>حساب العمر بالهجري والميلادي</strong> من أكثر الخدمات طلباً في العالم العربي،
              خاصة في دول الخليج مثل <strong>السعودية والكويت والإمارات</strong>. نقدم لك أداة دقيقة
              لحساب عمرك باليوم والشهر والسنة، مع تفاصيل الأيام والساعات والدقائق التي عشتها.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-3">الفرق بين السنة الهجرية والميلادية في حساب العمر</h3>
            <p>
              السنة الهجرية تعتمد على دورة القمر وتتكون من 354 أو 355 يوماً، بينما السنة الميلادية
              تعتمد على دورة الشمس وتتكون من 365 أو 366 يوماً. لذلك فإن عمرك بالهجري يكون أكبر
              بحوالي 3% من عمرك بالميلادي.
            </p>
          </div>
        </div>

        {/* روابط سريعة */}
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link to="/date" className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200">
            تحويل التاريخ
          </Link>
          <Link to="/date/today" className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200">
            تاريخ اليوم
          </Link>
          <Link to="/date/compare" className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm hover:bg-orange-200">
            مقارنة تواريخ
          </Link>
        </div>
      </div>
    </>
  );
};

export default AgeCalculatorView;
