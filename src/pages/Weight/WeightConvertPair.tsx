import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { WEIGHT_UNITS, getUnitName, getUnitSymbol, getUnitIcon, formatNumber } from './WeightUnits';
import { convertWeight, ConversionResult } from './WeightLogic';

// ==========================================
// مصفوفة الروابط الداخلية (أزواج الوزن الأكثر طلباً)
// ==========================================
const QUICK_PAIRS = [
  // عالمية
  { from: 'kg', to: 'lb', name: 'كيلوجرام → رطل', icon: '⚖️', category: 'standard' },
  { from: 'lb', to: 'kg', name: 'رطل → كيلوجرام', icon: '⚖️', category: 'standard' },
  { from: 'kg', to: 'g', name: 'كيلوجرام → جرام', icon: '⚖️', category: 'standard' },
  { from: 'ton', to: 'kg', name: 'طن → كيلوجرام', icon: '🚛', category: 'standard' },

  // ذهب
  { from: 'gold_oz', to: 'g', name: 'أونصة ذهب → جرام', icon: '👑', category: 'precious' },
  { from: 'mithqal', to: 'g', name: 'مثقال → جرام', icon: '💎', category: 'precious' },
  { from: 'carat', to: 'g', name: 'قيراط → جرام', icon: '💍', category: 'precious' },
  { from: 'tola', to: 'g', name: 'تولة → جرام', icon: '📿', category: 'precious' },

  // مطبخ
  { from: 'cup', to: 'tbsp', name: 'كوب → ملعقة كبيرة', icon: '🥛', category: 'kitchen' },
  { from: 'tbsp', to: 'tsp', name: 'ملعقة كبيرة → ملعقة صغيرة', icon: '🥄', category: 'kitchen' },
  { from: 'cup', to: 'ml', name: 'كوب → مليلتر', icon: '💧', category: 'kitchen' },
  { from: 'g', to: 'tbsp', name: 'جرام → ملعقة (للدقيق)', icon: '🍞', category: 'kitchen' },

  // تاريخية/خليجية (سر التفوق)
  { from: 'mann', to: 'kg', name: 'من → كيلوجرام', icon: '🏺', category: 'historical' },
  { from: 'gulf_lb', to: 'kg', name: 'رطل سعودي → كيلوجرام', icon: '🇸🇦', category: 'historical' },
  { from: 'dirham', to: 'g', name: 'درهم → جرام', icon: '🪙', category: 'historical' },
  { from: 'ratl', to: 'kg', name: 'رطل عربي → كيلوجرام', icon: '📦', category: 'historical' },
  { from: 'oka', to: 'kg', name: 'أوقة → كيلوجرام', icon: '🏺', category: 'historical' },
];

// ==========================================
// المكون الرئيسي
// ==========================================
const WeightConvertPair: React.FC = () => {
  const { from, to } = useParams<{ from: string; to: string }>();
  const navigate = useNavigate();

  // ✅ تنظيف وتحويل الأحرف - نفس طريقة العملات
  const cleanFrom = from?.split('-to')[0]?.toUpperCase();
  const cleanTo = to?.toUpperCase();

  // تحويل إلى lowercase لأن معرفات الوحدات في WEIGHT_UNITS كلها lowercase
  const lowerFrom = cleanFrom?.toLowerCase();
  const lowerTo = cleanTo?.toLowerCase();

  const [amount, setAmount] = useState('1');
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>();
  const [copied, setCopied] = useState(false);

  // الحصول على معلومات الوحدات باستخدام القيم المنظفة
  const fromUnit = useMemo(() => WEIGHT_UNITS.find(u => u.id === lowerFrom), [lowerFrom]);
  const toUnit = useMemo(() => WEIGHT_UNITS.find(u => u.id === lowerTo), [lowerTo]);

  // التحقق من صحة الوحدات
  useEffect(() => {
    if (!fromUnit || !toUnit) {
      navigate('/weight', { replace: true });
    }
  }, [fromUnit, toUnit, navigate]);

  // تحديث عنوان الصفحة للـ SEO
  useEffect(() => {
    if (fromUnit && toUnit) {
      document.title = `تحويل ${fromUnit.name} إلى ${toUnit.name} | حاسبة الوزن الدقيقة`;

      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content',
        `احصل على سعر تحويل ${fromUnit.name} (${fromUnit.symbol}) إلى ${toUnit.name} (${toUnit.symbol}) بدقة عالية. أداة مجانية وسريعة.`
      );
    }
  }, [fromUnit, toUnit]);

  // دالة التحويل
  const handleConvert = async () => {
    if (!lowerFrom || !lowerTo || !amount) return;

    setLoading(true);

    setTimeout(() => {
      const conversion = convertWeight(parseFloat(amount), lowerFrom, lowerTo);
      if (conversion) {
        setResult(conversion);
        setLastUpdate(conversion.lastUpdate);
      }
      setLoading(false);
    }, 300);
  };

  // تحويل تلقائي عند التغيير
  useEffect(() => {
    handleConvert();
  }, [amount, lowerFrom, lowerTo]);

  const handleCopy = () => {
    if (result) {
      const text = `${result.formattedFromAmount} ${getUnitName(lowerFrom)} = ${result.formattedToAmount} ${getUnitName(lowerTo)}`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // مبالغ ثابتة للجدول
  const fixedAmounts = [1, 5, 10, 25, 50, 100, 250, 500, 750, 1000];

  // حساب الجدول الديناميكي
  const conversionTable = useMemo(() => {
    if (!result) return [];
    return fixedAmounts.map(amt => ({
      from: amt,
      fromFormatted: formatNumber(amt, 0),
      to: amt * result.factor,
      toFormatted: formatNumber(amt * result.factor, 4)
    }));
  }, [result]);

  if (!fromUnit || !toUnit) {
    return null;
  }

  // أسئلة شائعة حسب نوع التحويل
  const getFaqItems = () => {
    const baseFaq = [
      { q: `كم يساوي 1 ${fromUnit.name} بالـ ${toUnit.name}؟`, a: `1 ${fromUnit.name} = ${result?.formattedFactor || '...'} ${toUnit.name}.` },
      { q: `كيف أحول ${fromUnit.name} إلى ${toUnit.name}؟`, a: `استخدم الأداة أعلاه: أدخل القيمة بالـ ${fromUnit.name}، وستظهر النتيجة فوراً بالـ ${toUnit.name}.` },
    ];

    // أسئلة خاصة بالذهب
    if (fromUnit.category === 'precious' || toUnit.category === 'precious') {
      baseFaq.push({
        q: 'هل سعر الذهب يؤثر على التحويل؟',
        a: 'لا، تحويل الوزن يختلف عن سعر الذهب. هذه الأداة تحسب الوزن فقط. لمعرفة سعر الذهب، استخدم حاسبة الذهب.'
      });
    }

    // أسئلة خاصة بالمطبخ
    if (fromUnit.category === 'kitchen' || toUnit.category === 'kitchen') {
      baseFaq.push({
        q: 'هل هذا التحويل دقيق لجميع المواد؟',
        a: 'التحويل دقيق للماء والسوائل. للدقيق والسكر، تختلف الكثافة. ننصح باستخدام ميزان المطبخ للدقة.'
      });
    }

    // أسئلة خاصة بالوحدات الخليجية
    if (fromUnit.category === 'historical' || toUnit.category === 'historical') {
      baseFaq.push({
        q: 'ما هو أصل وحدة "المن"؟',
        a: '"المن" وحدة وزن تاريخية كانت تستخدم في شبه الجزيرة العربية والخليج، وتساوي تقريباً 2.56 كيلوجرام.'
      });
    }

    return baseFaq;
  };

  const faqItems = getFaqItems();

  // تصنيف الروابط الداخلية حسب الفئة
  const categorizedQuickPairs = {
    standard: QUICK_PAIRS.filter(p => p.category === 'standard'),
    precious: QUICK_PAIRS.filter(p => p.category === 'precious'),
    kitchen: QUICK_PAIRS.filter(p => p.category === 'kitchen'),
    historical: QUICK_PAIRS.filter(p => p.category === 'historical'),
  };

  const categoryLabels = {
    standard: { label: '🌍 تحويلات عالمية', icon: '🌍' },
    precious: { label: '👑 تحويلات الذهب والمجوهرات', icon: '👑' },
    kitchen: { label: '🍳 تحويلات المطبخ', icon: '🍳' },
    historical: { label: '🏺 تحويلات تاريخية وخليجية', icon: '🏺' },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 font-cairo" dir="rtl">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm mb-6 text-gray-500 bg-white p-3 rounded-lg shadow-sm">
        <Link to="/" className="hover:text-green-600 transition">الرئيسية</Link>
        <span>/</span>
        <Link to="/weight" className="hover:text-green-600 transition">تحويل الوزن</Link>
        <span>/</span>
        <span className="text-green-700 font-bold">
          {fromUnit.name} → {toUnit.name}
        </span>
      </nav>

      {/* البطاقة الرئيسية */}
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">
        <div className="bg-gradient-to-l from-green-600 to-emerald-600 p-8 text-center text-white">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-5xl">{getUnitIcon(lowerFrom)}</span>
            <span className="text-3xl">→</span>
            <span className="text-5xl">{getUnitIcon(lowerTo)}</span>
          </div>
          <h1 className="sr-only">محول الأوزان: تحويل الكيلو، الجرام، الباوند، الأوقية، والمثقال بدقة</h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            تحويل {fromUnit.name} إلى {toUnit.name}
          </h2>
          <p className="opacity-90 text-lg">
            1 {fromUnit.symbol} = {result?.formattedFactor || '...'} {toUnit.symbol}
          </p>
        </div>

        <div className="p-8">
          {/* حقل المبلغ */}
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2 text-right">
              القيمة بالـ {fromUnit.name}
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-4 text-2xl border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition active:scale-95"
              placeholder={`أدخل القيمة بالـ ${fromUnit.symbol}`}
              step="any"
              min="0"
            />
          </div>

          {/* عرض الوحدتين */}
          <div className="flex items-center justify-between gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{getUnitIcon(lowerFrom)}</span>
              <div>
                <div className="font-bold text-gray-800">{fromUnit.name}</div>
                <div className="text-sm text-gray-500">{fromUnit.symbol}</div>
              </div>
            </div>
            <span className="text-2xl text-green-600 animate-pulse">⇆</span>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="font-bold text-gray-800">{toUnit.name}</div>
                <div className="text-sm text-gray-500">{toUnit.symbol}</div>
              </div>
              <span className="text-4xl">{getUnitIcon(lowerTo)}</span>
            </div>
          </div>

          {/* زر التحويل */}
          <button
            onClick={handleConvert}
            disabled={loading}
            className="w-full bg-gradient-to-l from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold hover:shadow-xl transition disabled:opacity-50 active:scale-95 active:ring-2 active:ring-green-300"
          >
            {loading ? 'جاري التحويل...' : 'تحويل'}
          </button>

          {/* النتيجة */}
          {result && !loading && (
            <div className="mt-6 bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600">
                  {result.formattedToAmount} {toUnit.symbol}
                </div>
                <div className="text-gray-600 mt-2">
                  {result.formattedFromAmount} {fromUnit.symbol} = {result.formattedToAmount} {toUnit.symbol}
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

      {/* جدول التحويلات الشائعة */}
      {result && conversionTable.length > 0 && (
        <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            جدول تحويل {fromUnit.name} إلى {toUnit.name}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {conversionTable.slice(0, 10).map((item, idx) => (
              <div key={idx} className="bg-gray-50 p-3 rounded-xl text-center hover:bg-green-50 transition">
                <div className="text-sm text-gray-500">{item.fromFormatted} {fromUnit.symbol}</div>
                <div className="font-bold text-gray-800">=</div>
                <div className="text-green-600 font-bold">{item.toFormatted} {toUnit.symbol}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* أسئلة شائعة */}
      <div className="mt-8 bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          أسئلة شائعة عن تحويل {fromUnit.name} إلى {toUnit.name}
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

      {/* الروابط الداخلية - مصفوفة الروابط السريعة (مقسمة حسب الفئة) */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          تحويلات سريعة أخرى
        </h2>

        {Object.entries(categorizedQuickPairs).map(([category, pairs]) => (
          pairs.length > 0 && (
            <div key={category} className="mb-8">
              <h3 className="text-xl font-bold text-gray-700 mb-4 flex items-center gap-2">
                <span>{categoryLabels[category as keyof typeof categoryLabels]?.icon || '📦'}</span>
                <span>{categoryLabels[category as keyof typeof categoryLabels]?.label || category}</span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {pairs.map(pair => (
                  <Link
                    key={`${pair.from}-${pair.to}`}
                    to={`/weight/convert/${pair.from}/${pair.to}`}
                    className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-md hover:-translate-y-1 transition-all duration-200 text-center group"
                  >
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-200">{pair.icon}</span>
                      <span className="text-gray-400">→</span>
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-200">{pair.icon}</span>
                    </div>
                    <div className="font-bold text-gray-800 text-sm group-hover:text-green-600">
                      {pair.name}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )
        ))}
      </div>

      {/* روابط سريعة لأدوات أخرى */}
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
  );
};

export default WeightConvertPair;
