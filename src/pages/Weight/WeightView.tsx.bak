import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { WeightUnit, ConversionResult } from './WeightTypes';
import { WEIGHT_KEYWORDS, getUnitNameById, getUnitSymbolById, getUnitIconById } from './WeightLogic';
import { getCategorizedUnits, formatNumber } from './WeightUnits';

// ==========================================
// مكون القائمة المنسدلة مع التصنيفات
// ==========================================
interface CategorizedSelectProps {
  value: string;
  onChange: (value: string) => void;
  units: WeightUnit[];
  label: string;
  color: string;
}

const CategorizedSelect: React.FC<CategorizedSelectProps> = ({ value, onChange, units, label, color }) => {
  const categorized = getCategorizedUnits();

  const categoryLabels: Record<string, { label: string; icon: string }> = {
    standard: { label: '⚖️ أوزان عالمية', icon: '⚖️' },
    precious: { label: '👑 أوزان الذهب والمجوهرات', icon: '👑' },
    kitchen: { label: '🍳 أوزان المطبخ والطهي', icon: '🍳' },
    historical: { label: '🏺 أوزان تاريخية وخليجية', icon: '🏺' },
    shipping: { label: '🚢 أوزان الشحن', icon: '🚢' }
  };

  return (
    <div className="mb-6">
      <label className="block text-gray-700 font-bold mb-2 text-right">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full p-4 border-2 border-gray-200 rounded-xl focus:border-${color}-500 focus:ring-2 focus:ring-${color}-200 transition bg-white appearance-none cursor-pointer active:scale-95`}
      >
        {Object.entries(categorized).map(([category, categoryUnits]) => (
          categoryUnits.length > 0 && (
            <optgroup key={category} label={categoryLabels[category]?.label || category}>
              {categoryUnits.map(unit => (
                <option key={unit.id} value={unit.id}>
                  {unit.icon} {unit.name} ({unit.symbol})
                </option>
              ))}
            </optgroup>
          )
        ))}
      </select>
    </div>
  );
};

// ==========================================
// المكون الرئيسي
// ==========================================
interface WeightViewProps {
  units: WeightUnit[];
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

const WeightView: React.FC<WeightViewProps> = ({
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
  const [activeRow, setActiveRow] = useState<number | null>(null);

  const handleCopy = () => {
    if (result) {
      const text = `${result.formattedFromAmount} ${getUnitNameById(result.fromUnit)} = ${result.formattedToAmount} ${getUnitNameById(result.toUnit)}`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // مبالغ ثابتة للجداول
  const fixedAmounts = [1, 5, 10, 25, 50, 100, 250, 500, 750, 1000];

  // حساب الجدول الديناميكي مع التنسيق الذكي
  const conversionTable = useMemo(() => {
    if (!result) return [];
    return fixedAmounts.map(amt => {
      const converted = amt * result.factor;
      return {
        from: amt,
        fromFormatted: formatNumber(amt, 0),
        to: converted,
        toFormatted: formatNumber(converted, 4)
      };
    });
  }, [result]);

  // تحديد السطر الحالي
  const currentAmount = parseFloat(fromAmount);
  const currentRow = useMemo(() => {
    if (!currentAmount) return null;
    // البحث عن أقرب قيمة في الجدول
    const closest = fixedAmounts.reduce((prev, curr) => {
      return Math.abs(curr - currentAmount) < Math.abs(prev - currentAmount) ? curr : prev;
    });
    return fixedAmounts.indexOf(closest);
  }, [currentAmount]);

  // أسئلة شائعة خاصة بالوزن
  const faqItems = [
    { q: 'كم يساوي الكيلوجرام بالرطل؟', a: '1 كيلوجرام = 2.20462 رطل (باوند).' },
    { q: 'كم يساوي الرطل بالكيلوجرام؟', a: '1 رطل = 0.453592 كيلوجرام.' },
    { q: 'أوقية الذهب كم جرام؟', a: '1 أونصة ذهب = 31.1035 جرام.' },
    { q: 'المثقال كم جرام؟', a: '1 مثقال = 4.25 جرام.' },
    { q: 'كيف أحول من كوب إلى جرام؟', a: '1 كوب = 236.588 جرام (للماء والسوائل).' },
    { q: 'الرطل السعودي كم كيلو؟', a: 'الرطل السعودي يساوي تقريباً 0.453 كيلوجرام.' },
    { q: 'كم جرام في الملعقة الكبيرة؟', a: '1 ملعقة كبيرة = 14.7868 جرام (للماء).' },
    { q: 'ما هو الفرق بين الرطل السعودي والرطل الأمريكي؟', a: 'الرطل السعودي يساوي نفس قيمة الرطل الأمريكي تقريباً (0.453 كيلوجرام)، لكنه يُستخدم بشكل شائع في الأسواق المحلية.' },
  ];

  // بيانات منظمة للـ SEO
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "حاسبة تحويل الوزن",
    "description": "أداة دقيقة لتحويل جميع وحدات الوزن بما فيها الخليجية والذهب",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "inLanguage": "ar",
    "keywords": WEIGHT_KEYWORDS ? WEIGHT_KEYWORDS.join(', ') : 'تحويل الوزن'
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData).replace(/</g, '\\u003c') }}
      />

      <div className="max-w-4xl mx-auto px-4 py-6 font-cairo" dir="rtl">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm mb-6 text-gray-500 bg-white p-3 rounded-lg shadow-sm">
          <Link to="/" className="hover:text-green-600 transition">الرئيسية</Link>
          <span>/</span>
          <span className="text-green-700 font-bold">تحويل الوزن</span>
        </nav>

        {/* Glassmorphism Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          <div className="bg-gradient-to-l from-green-600 to-emerald-600 p-8 text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              تحويل الوزن
            </h1>
            <p className="opacity-90 text-lg">
              حوّل بين جميع وحدات الوزن بدقة عالية - عالمية، خليجية، ذهب، مطبخ
            </p>
          </div>

          <div className="p-8">
            {/* حقل المبلغ مع تأثير live calculation */}
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2 text-right">
                المبلغ
              </label>
              <input
                type="number"
                value={fromAmount}
                onChange={(e) => onFromAmountChange(e.target.value)}
                className="w-full p-4 text-2xl border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition active:scale-95"
                placeholder="أدخل المبلغ"
                step="any"
                min="0"
              />
            </div>

            {/* وحدة المصدر مع تصنيفات */}
            <CategorizedSelect
              value={fromUnit}
              onChange={onFromUnitChange}
              units={units}
              label="من"
              color="green"
            />

            {/* زر التبديل مع تأثير */}
            <div className="flex justify-center my-4">
              <button
                onClick={onSwapUnits}
                className="bg-green-100 hover:bg-green-200 text-green-600 p-4 rounded-full transition transform hover:rotate-180 duration-500 active:scale-95 active:ring-2 active:ring-green-300"
                title="تبديل الوحدات"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </button>
            </div>

            {/* وحدة الهدف مع تصنيفات */}
            <CategorizedSelect
              value={toUnit}
              onChange={onToUnitChange}
              units={units}
              label="إلى"
              color="green"
            />

            {/* زر التحويل */}
            <button
              onClick={onConvert}
              disabled={loading || !fromAmount}
              className="w-full bg-gradient-to-l from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold hover:shadow-lg transition disabled:opacity-50 active:scale-95 active:ring-2 active:ring-green-300"
            >
              {loading ? 'جاري التحويل...' : 'تحويل'}
            </button>

            {/* النتيجة مع تنسيق الأرقام */}
            {result && !loading && (
              <div className="mt-6 bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600">
                    {result.formattedToAmount} {getUnitSymbolById(result.toUnit)}
                  </div>
                  <div className="text-gray-600 mt-2">
                    1 {getUnitSymbolById(result.fromUnit)} = {result.formattedFactor} {getUnitSymbolById(result.toUnit)}
                  </div>
                  {lastUpdate && (
                    <div className="text-xs text-gray-400 mt-4">
                      آخر تحديث: {lastUpdate}
                    </div>
                  )}
                </div>

                {/* زر النسخ مع تفاعل "تم النسخ" */}
                <button
                  onClick={handleCopy}
                  className={`w-full mt-4 py-3 rounded-xl transition flex items-center justify-center gap-2 active:scale-95 ${
                    copied 
                      ? 'bg-green-600 text-white' 
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

        {/* جدول التحويلات الشائعة مع تسليط الضوء */}
        {result && conversionTable.length > 0 && (
          <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              جدول تحويل {getUnitNameById(fromUnit)} إلى {getUnitNameById(toUnit)}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {conversionTable.map((item, idx) => (
                <div 
                  key={idx} 
                  onMouseEnter={() => setActiveRow(idx)}
                  onMouseLeave={() => setActiveRow(null)}
                  className={`p-3 rounded-xl text-center transition cursor-pointer ${
                    currentRow === idx 
                      ? 'bg-green-100 border-2 border-green-500 shadow-md' 
                      : activeRow === idx
                      ? 'bg-green-50 border border-green-300'
                      : 'bg-gray-50 hover:bg-green-50'
                  }`}
                >
                  <div className="text-sm text-gray-500">{item.fromFormatted} {getUnitSymbolById(fromUnit)}</div>
                  <div className="font-bold text-gray-800">=</div>
                  <div className="text-green-600 font-bold">{item.toFormatted} {getUnitSymbolById(toUnit)}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 text-center mt-4">
              * الجدول يتحدث تلقائياً عند تغيير الوحدات
            </p>
          </div>
        )}

        {/* أسئلة شائعة */}
        <div className="mt-8 bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            أسئلة شائعة عن تحويل الوزن
          </h2>
          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <div key={idx} className="border-b border-gray-200 pb-4">
                <h3 className="font-bold text-gray-800 mb-2">{item.q}</h3>
                <p className="text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* روابط سريعة */}
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link to="/date" className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition active:scale-95">
            تحويل التاريخ
          </Link>
          <Link to="/currency" className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm hover:bg-yellow-200 transition active:scale-95">
            تحويل العملات
          </Link>
          <Link to="/date/today" className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200 transition active:scale-95">
            تاريخ اليوم
          </Link>
          <Link to="/date/age-calculator" className="px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm hover:bg-pink-200 transition active:scale-95">
            حساب العمر
          </Link>
        </div>
      </div>
    </>
  );
};

export default WeightView;
