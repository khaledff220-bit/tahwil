// حساب الجدول الديناميكي
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TemperatureUnit, ConversionResult } from './TemperatureTypes';
import { getUnitName, getUnitSymbol, getUnitIcon, TEMPERATURE_UNITS } from './TemperatureUnits';
import { convertTemperature, CRITICAL_TEMPERATURES } from './TemperatureLogic';

interface TemperatureViewProps {
  units: TemperatureUnit[];
  result: ConversionResult | null;
  fromAmount: string;
  toAmount: string;
  fromUnit: string;
  toUnit: string;
  onFromAmountChange: (value: string) => void;
  onFromUnitChange: (value: string) => void;
  onToUnitChange: (value: string) => void;
  onSwapUnits: () => void;
  onConvert: () => void;
  loading: boolean;
  lastUpdate?: string;
}

const TemperatureView: React.FC<TemperatureViewProps> = ({
  units,
  result,
  fromAmount,
  toAmount,
  fromUnit,
  toUnit,
  onFromAmountChange,
  onFromUnitChange,
  onToUnitChange,
  onSwapUnits,
  onConvert,
  loading,
  lastUpdate
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (result) {
      const text = `${result.formattedFromAmount} ${getUnitName(result.fromUnit)} = ${result.formattedToAmount} ${getUnitName(result.toUnit)}`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // مبالغ ثابتة للجدول
  const fixedAmounts = [0, 10, 20, 25, 30, 37, 50, 75, 100];

    // حساب الجدول الديناميكي (باستخدام دالة التحويل الصحيحة)
  const conversionTable = result ? fixedAmounts.map(amt => {
    const calculatedValue = convertTemperature(amt, fromUnit, toUnit);
    return {
      from: amt,
      fromFormatted: amt.toString(),
      to: calculatedValue?.toAmount || 0,
      toFormatted: calculatedValue?.formattedToAmount || "0"
    };
  }) : [];

  // بيانات منظمة للـ SEO
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "حاسبة تحويل الحرارة",
    "description": "أداة دقيقة لتحويل جميع وحدات الحرارة بما فيها الوحدات التاريخية (ريومور، رومر، نيوتن، ديليه)",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "inLanguage": "ar"
  };

  // تصنيف الوحدات للعرض
  const standardUnits = TEMPERATURE_UNITS.filter(u => u.category === 'standard');
  const scientificUnits = TEMPERATURE_UNITS.filter(u => u.category === 'scientific');
  const historicalUnits = TEMPERATURE_UNITS.filter(u => u.category === 'historical');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData).replace(/</g, '\\u003c') }}
      />

      <div className="max-w-4xl mx-auto px-4 py-6 font-cairo" dir="rtl">
        {/* Breadcrumbs */}
        <h1 className="sr-only">محول درجات الحرارة</h1>
        <nav className="flex items-center gap-2 text-sm mb-6 text-gray-500 bg-white p-3 rounded-lg shadow-sm">
          <Link to="/" className="hover:text-orange-600 transition">الرئيسية</Link>
          <span>/</span>
          <span className="text-orange-700 font-bold">تحويل الحرارة</span>
        </nav>

        {/* Glassmorphism Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          <div className="bg-gradient-to-l from-orange-600 to-red-600 p-8 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              تحويل الحرارة
            </h2>
            <p className="opacity-90 text-lg">
              حوّل بين 8 وحدات حرارة مختلفة - من سيلزيوس إلى كلفن، ومن ريومور إلى نيوتن
            </p>
          </div>

          <div className="p-8">
            {/* حقل المبلغ */}
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2 text-right">
                القيمة
              </label>
              <input
                type="number"
                value={fromAmount}
                onChange={(e) => onFromAmountChange(e.target.value)}
                className="w-full p-4 text-2xl border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition active:scale-95"
                placeholder="أدخل القيمة"
                step="any"
              />
            </div>

            {/* وحدة المصدر */}
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2 text-right">
                من
              </label>
              <select
                value={fromUnit}
                onChange={(e) => onFromUnitChange(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition bg-white"
              >
                {units.map(unit => (
                  <option key={unit.id} value={unit.id}>
                    {unit.icon} {unit.name} ({unit.symbol})
                  </option>
                ))}
              </select>
            </div>

            {/* زر التبديل */}
            <div className="flex justify-center my-4">
              <button
                onClick={onSwapUnits}
                className="bg-orange-100 hover:bg-orange-200 text-orange-600 p-4 rounded-full transition transform hover:rotate-180 duration-500 active:scale-95 active:ring-2 active:ring-orange-300"
                title="تبديل الوحدات"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </button>
            </div>

            {/* وحدة الهدف */}
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2 text-right">
                إلى
              </label>
              <select
                value={toUnit}
                onChange={(e) => onToUnitChange(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition bg-white"
              >
                {units.map(unit => (
                  <option key={unit.id} value={unit.id}>
                    {unit.icon} {unit.name} ({unit.symbol})
                  </option>
                ))}
              </select>
            </div>

            {/* زر التحويل */}
            <button
              onClick={onConvert}
              disabled={loading}
              className="w-full bg-gradient-to-l from-orange-600 to-red-600 text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all duration-200 hover:-translate-y-1 active:scale-95 active:bg-orange-700 disabled:opacity-50"
            >
              {loading ? 'جاري التحويل...' : 'تحويل'}
            </button>

            {/* النتيجة */}
            {result && !loading && (
              <div className="mt-6 bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-100">
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-600">
                    {result.formattedToAmount} {getUnitSymbol(result.toUnit)}
                  </div>
                  <div className="text-gray-600 mt-2">
                    {result.formattedFromAmount} {getUnitSymbol(result.fromUnit)} = {result.formattedToAmount} {getUnitSymbol(result.toUnit)}
                  </div>
                  {lastUpdate && (
                    <div className="text-xs text-gray-400 mt-4">
                      آخر تحديث: {lastUpdate}
                    </div>
                  )}
                </div>

                <button
                  onClick={handleCopy}
                  className={`w-full mt-4 py-3 rounded-xl transition flex items-center justify-center gap-2 active:scale-95 ${
                    copied
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-800 text-white hover:bg-black'
                  }`}
                >
                  <span>📋</span>
                  {copied ? '✅ تم النسخ!' : 'نسخ النتيجة'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ========== جدول التحويلات الشائعة ========== */}
        {result && conversionTable.length > 0 && (
          <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              جدول تحويل {getUnitName(fromUnit)} إلى {getUnitName(toUnit)}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {conversionTable.slice(0, 10).map((item, idx) => (
                <div key={idx} className="bg-gray-50 p-3 rounded-xl text-center hover:bg-orange-50 transition">
                  <div className="text-sm text-gray-500">{item.fromFormatted} {getUnitSymbol(fromUnit)}</div>
                  <div className="font-bold text-gray-800">=</div>
                  <div className="text-orange-600 font-bold">{item.toFormatted} {getUnitSymbol(toUnit)}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========== مقدمة الصفحة ========== */}
        <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold text-orange-700 mb-4 flex items-center gap-2">
            <span>🌡️</span> لماذا نحتاج مقاييس حرارة متعددة؟
          </h2>
          <p className="text-gray-700 leading-relaxed">
            في عالمنا المعاصر، نتعامل مع درجات حرارة تتراوح بين <strong className="text-blue-600">❄️ صقيع القطبين</strong> و <strong className="text-red-600">🔥 حرارة المحركات النفاثة</strong>. 
            مقياس <strong>سيلزيوس</strong> مثالي للطقس والحياة اليومية، بينما <strong>كلفن</strong> هو لغة الفيزياء والفضاء. 
            أما <strong>فهرنهايت</strong> فلا يزال مستخدماً في أمريكا، والمقاييس التاريخية كـ <strong>ريومور</strong> و <strong>نيوتن</strong> تحمل إرثاً علمياً عريقاً.
          </p>
          <p className="text-gray-700 leading-relaxed mt-3">
            أداتنا توفر لك <strong className="text-orange-600">دقة لحظية</strong> للتحويل بين 8 مقاييس مختلفة، سواء كنت طالباً في الفيزياء، مهندساً، أو مسافراً يتفقد الطقس.
          </p>
        </div>

        {/* ========== دليل الوحدات الثمانية ========== */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            دليل وحدات الحرارة
          </h2>

          {/* الوحدات القياسية */}
          <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span>📊</span> الوحدات القياسية
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {standardUnits.map(unit => (
              <div key={unit.id} className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200 shadow-sm hover:shadow-md transition">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{unit.icon}</span>
                  <h4 className="font-bold text-blue-800 text-lg">{unit.name}</h4>
                </div>
                <p className="text-sm text-gray-700">{unit.description}</p>
                <p className="text-xs text-gray-500 mt-2">المعادلة: {unit.formula}</p>
              </div>
            ))}
          </div>

          {/* الوحدات العلمية */}
          <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span>🔬</span> الوحدات العلمية
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {scientificUnits.map(unit => (
              <div key={unit.id} className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200 shadow-sm hover:shadow-md transition">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{unit.icon}</span>
                  <h4 className="font-bold text-purple-800 text-lg">{unit.name}</h4>
                </div>
                <p className="text-sm text-gray-700">{unit.description}</p>
                <p className="text-xs text-gray-500 mt-2">المعادلة: {unit.formula}</p>
              </div>
            ))}
          </div>

          {/* الوحدات التاريخية */}
          <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span>📜</span> الوحدات التاريخية
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {historicalUnits.map(unit => (
              <div key={unit.id} className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-xl border border-amber-200 shadow-sm hover:shadow-md transition">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{unit.icon}</span>
                  <h4 className="font-bold text-amber-800 text-lg">{unit.name}</h4>
                </div>
                <p className="text-sm text-gray-700">{unit.description}</p>
                <p className="text-xs text-gray-500 mt-2">المعادلة: {unit.formula}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ========== درجات الحرارة الحرجة ========== */}
        <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>⚠️</span> درجات الحرارة الحرجة
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CRITICAL_TEMPERATURES.map((temp, idx) => (
              <div key={idx} className="text-center p-3 bg-gray-50 rounded-xl">
                <div className="font-bold text-gray-800">{temp.name}</div>
                <div className="text-sm text-blue-600">{temp.celsius}°C</div>
                <div className="text-sm text-orange-600">{temp.fahrenheit}°F</div>
                <div className="text-sm text-purple-600">{temp.kelvin} K</div>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4 text-center">
            💡 نصيحة للمسافرين: عند السفر إلى الولايات المتحدة، تذكر أن 32°F = 0°C (تجمد الماء)، و 98.6°F = 37°C (حرارة الجسم الطبيعية).
          </p>
        </div>

        {/* ========== أسئلة شائعة ========== */}
        <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            أسئلة شائعة عن تحويل الحرارة
          </h2>
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-bold text-gray-800 mb-2">ما الفرق الجوهري بين الكلفن والسيلزيوس؟</h3>
              <p className="text-gray-600">الكلفن يبدأ من الصفر المطلق (0 K = -273.15°C)، حيث تتوقف الحركة الجزيئية تماماً. بينما السيلزيوس يعتمد على نقطتي تجمد وغليان الماء. يستخدم الكلفن في الفيزياء والفضاء، بينما السيلزيوس في الحياة اليومية.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-bold text-gray-800 mb-2">هل لا تزال وحدات مثل ريومور ونيوتن مستخدمة اليوم؟</h3>
              <p className="text-gray-600">نادراً، لكنها تظهر في النصوص التاريخية والمخطوطات العلمية القديمة. توفرها أداتنا للمهتمين بالتاريخ العلمي وللباحثين.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-bold text-gray-800 mb-2">كيف تضمن أداتنا دقة التحويل بين 8 وحدات مختلفة؟</h3>
              <p className="text-gray-600">نعتمد على معادلات رياضية دقيقة معتمدة من المنظمات الدولية للمقاييس، مع تقريب حتى 6 أرقام عشرية لضمان أعلى دقة ممكنة.</p>
            </div>
            <div className="pb-4">
              <h3 className="font-bold text-gray-800 mb-2">ما هي أسهل طريقة لتحويل فهرنهايت إلى سيلزيوس؟</h3>
              <p className="text-gray-600">اطرح 32 من درجة الفهرنهايت، ثم اقسم الناتج على 1.8. مثال: 98.6°F - 32 = 66.6، 66.6 ÷ 1.8 = 37°C.</p>
            </div>
          </div>
        </div>

        {/* روابط سريعة لأدوات أخرى */}
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link to="/weight" className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200 transition active:scale-95">
            تحويل الوزن
          </Link>
          <Link to="/length" className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition active:scale-95">
            تحويل الطول
          </Link>
          <Link to="/currency" className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm hover:bg-yellow-200 transition active:scale-95">
            تحويل العملات
          </Link>
          <Link to="/date" className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200 transition active:scale-95">
            تحويل التاريخ
          </Link>
        </div>
      </div>
    </>
  );
};

export default TemperatureView;
