import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LengthUnit, ConversionResult } from './LengthTypes';
import { getUnitNameById, getUnitSymbolById } from './LengthLogic';
import { getCategorizedLengthUnits } from './LengthUnits';

// ==========================================
// مكون القائمة المنسدلة مع التصنيفات
// ==========================================
interface CategorizedSelectProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  color: string;
}

const CategorizedSelect: React.FC<CategorizedSelectProps> = ({ value, onChange, label, color }) => {
  const categorized = getCategorizedLengthUnits();

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
        {Object.entries(categorized).map(([category, { label: categoryLabel, icon, units }]) => (
          units.length > 0 && (
            <optgroup key={category} label={`${icon} ${categoryLabel}`}>
              {units.map(unit => (
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
// مكون التبويبات الذكية
// ==========================================
interface TabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'metric', label: '📏 النظام المتري', icon: '📏' },
    { id: 'imperial', label: '🇬🇧 النظام الإمبراطوري', icon: '🇬🇧' },
    { id: 'arabic', label: '🏺 الوحدات التراثية', icon: '🏺' },
    { id: 'astronomical', label: '🌌 الوحدات الفلكية', icon: '🌌' },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-2">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeTab === tab.id
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

// ==========================================
// المكون الرئيسي
// ==========================================
interface LengthViewProps {
  units: LengthUnit[];
  result: ConversionResult | null;
  fromAmount: string;
  toAmount: string;
  fromUnit: string;
  toUnit: string;
  activeTab: string;
  onFromAmountChange: (value: string) => void;
  onFromUnitChange: (value: string) => void;
  onToUnitChange: (value: string) => void;
  onSwapUnits: () => void;
  onConvert: () => void;
  onTabChange: (tab: string) => void;
  loading: boolean;
  lastUpdate?: string;
}

const LengthView: React.FC<LengthViewProps> = ({
  result,
  fromAmount,
  toAmount,
  fromUnit,
  toUnit,
  activeTab,
  onFromAmountChange,
  onFromUnitChange,
  onToUnitChange,
  onSwapUnits,
  onConvert,
  onTabChange,
  loading,
  lastUpdate
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (result) {
      const text = `${result.formattedFromAmount} ${getUnitNameById(result.fromUnit)} = ${result.formattedToAmount} ${getUnitNameById(result.toUnit)}`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // مبالغ ثابتة للجدول
  const fixedAmounts = [1, 5, 10, 25, 50, 100, 250, 500, 750, 1000];

  // حساب الجدول الديناميكي
  const conversionTable = result ? fixedAmounts.map(amt => ({
    from: amt,
    fromFormatted: new Intl.NumberFormat('ar-EG').format(amt),
    to: amt * result.factor,
    toFormatted: new Intl.NumberFormat('ar-EG').format(amt * result.factor)
  })) : [];

  // بيانات منظمة للـ SEO
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "حاسبة تحويل الطول",
    "description": "أداة دقيقة لتحويل جميع وحدات الطول بما فيها الوحدات التراثية العربية والفلكية",
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

      <div className="max-w-4xl mx-auto px-4 py-6 font-cairo" dir="rtl">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm mb-6 text-gray-500 bg-white p-3 rounded-lg shadow-sm">
          <Link to="/" className="hover:text-blue-600 transition">الرئيسية</Link>
          <span>/</span>
          <span className="text-blue-700 font-bold">تحويل الطول</span>
        </nav>

        {/* التبويبات الذكية */}
        <Tabs activeTab={activeTab} onTabChange={onTabChange} />

        {/* Glassmorphism Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          <div className="bg-gradient-to-l from-blue-600 to-cyan-600 p-8 text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              تحويل الطول
            </h1>
            <p className="opacity-90 text-lg">
              حوّل بين جميع وحدات الطول بدقة عالية - مترية، إمبراطورية، تراثية، فلكية
            </p>
          </div>

          <div className="p-8">
            {/* حقل القيمة */}
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2 text-right">
                القيمة
              </label>
              <input
                type="number"
                value={fromAmount}
                onChange={(e) => onFromAmountChange(e.target.value)}
                className="w-full p-4 text-2xl border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition active:scale-95"
                placeholder="أدخل القيمة"
                step="any"
                min="0"
              />
            </div>

            {/* وحدة المصدر */}
            <CategorizedSelect
              value={fromUnit}
              onChange={onFromUnitChange}
              label="من"
              color="blue"
            />

            {/* زر التبديل */}
            <div className="flex justify-center my-4">
              <button
                onClick={onSwapUnits}
                className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-4 rounded-full transition-all duration-200 transform hover:rotate-180 hover:scale-105 active:scale-95 active:ring-2 active:ring-blue-300"
                title="تبديل الوحدات"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </button>
            </div>

            {/* وحدة الهدف */}
            <CategorizedSelect
              value={toUnit}
              onChange={onToUnitChange}
              label="إلى"
              color="blue"
            />

            {/* زر التحويل */}
            <button
              onClick={onConvert}
              disabled={loading || !fromAmount}
              className="w-full bg-gradient-to-l from-blue-600 to-cyan-600 text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all duration-200 hover:-translate-y-1 active:scale-95 active:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'جاري التحويل...' : 'تحويل'}
            </button>

            {/* النتيجة مع المقارنة الواقعية */}
            {result && !loading && (
              <div className="mt-6 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-100">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600">
                    {result.formattedToAmount} {getUnitSymbolById(result.toUnit)}
                  </div>
                  <div className="text-gray-600 mt-2">
                    {result.formattedFromAmount} {getUnitSymbolById(result.fromUnit)} = {result.formattedToAmount} {getUnitSymbolById(result.toUnit)}
                  </div>

                  {/* المقارنة الواقعية */}
                  <div className="mt-4 p-3 bg-orange-100/70 rounded-xl border border-orange-200">
                    <p className="text-orange-700 text-sm font-medium flex items-center justify-center gap-2">
                      <span>📊</span>
                      <span>{result.realWorldComparison}</span>
                    </p>
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
                      ? 'bg-blue-600 text-white'
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

        {/* جدول التحويلات الشائعة */}
        {result && conversionTable.length > 0 && (
          <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              جدول تحويل {getUnitNameById(fromUnit)} إلى {getUnitNameById(toUnit)}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {conversionTable.slice(0, 10).map((item, idx) => (
                <div key={idx} className="bg-gray-50 p-3 rounded-xl text-center hover:bg-blue-50 transition">
                  <div className="text-sm text-gray-500">{item.fromFormatted} {getUnitSymbolById(fromUnit)}</div>
                  <div className="font-bold text-gray-800">=</div>
                  <div className="text-blue-600 font-bold">{item.toFormatted} {getUnitSymbolById(toUnit)}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========== بطاقات معلومات الوحدات ========== */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            معلومات عن وحدات الطول
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* بطاقة النظام المتري */}
            <div className="bg-white p-5 rounded-2xl shadow-md border-r-4 border-blue-500 hover:shadow-xl transition">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">📏</span>
                <h3 className="text-lg font-bold text-blue-700">النظام المتري</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                المتر هو الوحدة الأساسية. يستخدم في جميع أنحاء العالم. يشمل: كيلومتر (كم)، متر (م)، سنتيمتر (سم)، مليمتر (مم).
              </p>
            </div>

            {/* بطاقة النظام الإمبراطوري */}
            <div className="bg-white p-5 rounded-2xl shadow-md border-r-4 border-green-500 hover:shadow-xl transition">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🇬🇧</span>
                <h3 className="text-lg font-bold text-green-700">النظام الإمبراطوري</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                يستخدم في الولايات المتحدة وبريطانيا. يشمل: ميل (mi)، ياردة (yd)، قدم (ft)، بوصة (in).
              </p>
            </div>

            {/* بطاقة الوحدات التراثية */}
            <div className="bg-white p-5 rounded-2xl shadow-md border-r-4 border-amber-500 hover:shadow-xl transition">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🏺</span>
                <h3 className="text-lg font-bold text-amber-700">وحدات تراثية عربية</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                وحدات قياس قديمة: الذراع (≈ 0.5 م)، الشبر (≈ 22.9 سم)، القامة (≈ 1.8 م)، الفرسخ (≈ 5.5 كم).
              </p>
            </div>

            {/* بطاقة الوحدات الفلكية */}
            <div className="bg-white p-5 rounded-2xl shadow-md border-r-4 border-purple-500 hover:shadow-xl transition">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🌌</span>
                <h3 className="text-lg font-bold text-purple-700">وحدات فلكية</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                لقياس المسافات الكونية: السنة الضوئية (≈ 9.46 تريليون كم)، الوحدة الفلكية (≈ 149.6 مليون كم).
              </p>
            </div>

            {/* بطاقة التطبيقات العملية */}
            <div className="bg-white p-5 rounded-2xl shadow-md border-r-4 border-teal-500 hover:shadow-xl transition">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🏗️</span>
                <h3 className="text-lg font-bold text-teal-700">التطبيقات العملية</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                الهندسة: استخدام المتر والقدم في البناء. السفر: الكيلومتر والميل للمسافات. العلوم: المليمتر والميكرون للقياسات الدقيقة.
              </p>
            </div>

            {/* بطاقة تحويلات شائعة */}
            <div className="bg-white p-5 rounded-2xl shadow-md border-r-4 border-orange-500 hover:shadow-xl transition">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🔄</span>
                <h3 className="text-lg font-bold text-orange-700">تحويلات شائعة</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                1 متر = 3.28 قدم، 1 كيلومتر = 0.62 ميل، 1 بوصة = 2.54 سم، 1 ذراع = 0.5 متر.
              </p>
            </div>
          </div>
        </div>

        {/* ========== أسئلة شائعة ========== */}
        <div className="mt-12 bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            أسئلة شائعة عن تحويل الطول
          </h2>
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-bold text-gray-800 mb-2">كيف أحول من متر إلى قدم؟</h3>
              <p className="text-gray-600">اضرب القيمة في 3.28084. مثال: 5 متر × 3.28084 = 16.4042 قدم.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-bold text-gray-800 mb-2">ما هو الذراع؟ كم يساوي بالمتر؟</h3>
              <p className="text-gray-600">الذراع وحدة قياس عربية قديمة، يساوي تقريباً 0.5 متر (50 سم).</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-bold text-gray-800 mb-2">ما هي السنة الضوئية؟</h3>
              <p className="text-gray-600">المسافة التي يقطعها الضوء في سنة واحدة، وتساوي حوالي 9.46 تريليون كيلومتر.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-bold text-gray-800 mb-2">كم يساوي الميل بالكيلومتر؟</h3>
              <p className="text-gray-600">1 ميل = 1.60934 كيلومتر.</p>
            </div>
            <div className="pb-4">
              <h3 className="font-bold text-gray-800 mb-2">ما الفرق بين الذراع والشبر؟</h3>
              <p className="text-gray-600">الذراع = طول الساعد من المرفق إلى الأصابع (≈ 50 سم)، الشبر = المسافة بين طرف الإبهام والخنصر (≈ 22.9 سم).</p>
            </div>
          </div>
        </div>

        {/* ========== هل تعلم؟ ========== */}
        <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-200">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">💡</span>
            <h3 className="text-xl font-bold text-amber-800">هل تعلم؟</h3>
          </div>
          <div className="space-y-2 text-gray-700">
            <p>• الذراع استخدم في بناء الكعبة المشرفة قديماً.</p>
            <p>• الميل البحري (1852 متر) أطول من الميل البري (1609 متر).</p>
            <p>• أقرب نجم إلينا (بروكسيما سنتوري) يبعد 4.2 سنة ضوئية.</p>
            <p>• الضوء يقطع المسافة من الشمس إلى الأرض في 8 دقائق و20 ثانية.</p>
            <p>• البوصة كانت تعتمد على عرض إبهام الإنسان قديماً.</p>
          </div>
        </div>

        {/* روابط سريعة لأدوات أخرى */}
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link to="/weight" className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200 transition active:scale-95">
            تحويل الوزن
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

export default LengthView;
