import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { LENGTH_UNITS, getUnitName, getUnitSymbol, getUnitIcon, formatNumber, getRealWorldComparison } from './LengthUnits';
import { convertLength, ConversionResult } from './LengthLogic';

// ==========================================
// المحتوى الذكي (Smart Content Templates)
// ==========================================

// دالة سياق الوحدات
const getUnitContextMessage = (fromId: string, toId: string): string => {
  const from = LENGTH_UNITS.find(u => u.id === fromId);
  const to = LENGTH_UNITS.find(u => u.id === toId);
  if (!from || !to) return 'تحويل دقيق بين وحدات الطول المختلفة.';

  // تحويل إمبراطوري → متري
  if (from.category === 'imperial' && to.category === 'metric') {
    return `يعد التحويل من النظام الإمبراطوري (المستخدم في أمريكا وبريطانيا) إلى النظام المتري الدولي أمراً ضرورياً في الدراسات العلمية والهندسية لضمان الدقة العالمية. ${from.name} (${from.symbol}) هي وحدة قياس إمبراطورية، بينما ${to.name} (${to.symbol}) هي الوحدة الأساسية في النظام المتري.`;
  }

  // تحويل متري → إمبراطوري
  if (from.category === 'metric' && to.category === 'imperial') {
    return `التحويل من النظام المتري إلى الإمبراطوري مفيد عند التعامل مع الخرائط والمواصفات الأمريكية والبريطانية. ${from.name} (${from.symbol}) هي وحدة قياس عالمية، بينما ${to.name} (${to.symbol}) تستخدم في العديد من التطبيقات الهندسية واليومية.`;
  }

  // تحويل فلكي → عادي
  if (from.category === 'astronomical' && (to.category === 'metric' || to.category === 'imperial')) {
    return `نحن الآن ننتقل من أبعاد كونية شاسعة إلى وحدات القياس البشرية. ${from.name} (${from.symbol}) هي وحدة فلكية تستخدم لقياس المسافات الهائلة بين النجوم والمجرات. المسافات الفلكية تُقاس عادةً بالزمن الذي يستغرقه الضوء لقطعها.`;
  }

  // تحويل تراثي → حديث
  if (from.category === 'arabic' && (to.category === 'metric' || to.category === 'imperial')) {
    return `الوحدات التراثية كـ ${from.name} (${from.symbol}) تعكس تاريخ القياس البشري المعتمد على أبعاد الجسم. تحويلها للوحدات الحديثة يساعد في فهم المخططات التاريخية والآثار والمخطوطات القديمة. ${to.name} (${to.symbol}) هي الوحدة المعيارية المستخدمة اليوم.`;
  }

  // تحويل حديث → تراثي
  if ((from.category === 'metric' || from.category === 'imperial') && to.category === 'arabic') {
    return `يمكنك الآن تحويل الوحدات الحديثة إلى وحدات تراثية عربية مثل ${to.name} (${to.symbol}). هذا مفيد جداً لفهم القياسات في النصوص التاريخية والمخطوطات القديمة، حيث كانت هذه الوحدات تستخدم في البناء والتجارة.`;
  }

  // تحويلات فلكية بينية
  if (from.category === 'astronomical' && to.category === 'astronomical') {
    return `كلا الوحدتين ${from.name} (${from.symbol}) و ${to.name} (${to.symbol}) تستخدمان في علم الفلك لقياس المسافات الكونية الهائلة. هذه القياسات ضرورية لفهم حجم الكون وتوزيع المجرات.`;
  }

  return `تحويل دقيق من ${from.name} (${from.symbol}) إلى ${to.name} (${to.symbol}) باستخدام المعادلات الرياضية المعتمدة عالمياً.`;
};

// دالة الأسئلة الشائعة الديناميكية
const getDynamicFAQ = (fromId: string, toId: string): { q: string; a: string }[] => {
  const from = LENGTH_UNITS.find(u => u.id === fromId);
  const to = LENGTH_UNITS.find(u => u.id === toId);
  if (!from || !to) return [];

  const factor = to.factor / from.factor;

  const faqs = [
    {
      q: `كم يساوي 1 ${from.name} بالـ ${to.name}؟`,
      a: `1 ${from.name} = ${factor.toFixed(6)} ${to.name}.`
    },
    {
      q: `هل ${from.name} أكبر أم ${to.name}؟`,
      a: factor > 1
        ? `${from.name} هو الوحدة الأكبر، حيث أن 1 ${from.name} يساوي ${factor.toFixed(4)} ${to.name}.`
        : `${to.name} هو الوحدة الأكبر، حيث أن 1 ${to.name} يساوي ${(1/factor).toFixed(4)} ${from.name}.`
    },
    {
      q: `أين يستخدم ${from.name} حالياً؟`,
      a: `وحدة ${from.name} تستخدم في ${from.category === 'metric' ? 'جميع دول العالم' : from.category === 'imperial' ? 'الولايات المتحدة وبريطانيا' : from.category === 'arabic' ? 'الدراسات التاريخية والتراثية' : 'علم الفلك'} لقياس المسافات.`
    },
    {
      q: `أين يستخدم ${to.name} حالياً؟`,
      a: `وحدة ${to.name} تستخدم في ${to.category === 'metric' ? 'جميع دول العالم' : to.category === 'imperial' ? 'الولايات المتحدة وبريطانيا' : to.category === 'arabic' ? 'الدراسات التاريخية والتراثية' : 'علم الفلك'} لقياس المسافات.`
    }
  ];

  // إضافة سؤال إضافي للوحدات الفلكية
  if (from.category === 'astronomical' || to.category === 'astronomical') {
    faqs.push({
      q: `ما هي المسافة التي يقطعها الضوء؟`,
      a: `الضوء يقطع ${from.category === 'astronomical' ? from.name : to.name} في ${from.category === 'astronomical' ? (from.id === 'ly' ? 'سنة كاملة' : from.id === 'au' ? 'حوالي 8 دقائق و20 ثانية' : '3.26 سنة') : (to.id === 'ly' ? 'سنة كاملة' : to.id === 'au' ? 'حوالي 8 دقائق و20 ثانية' : '3.26 سنة')}.`
    });
  }

  // إضافة سؤال إضافي للوحدات التراثية
  if (from.category === 'arabic' || to.category === 'arabic') {
    faqs.push({
      q: `ما هو أصل وحدة ${from.category === 'arabic' ? from.name : to.name}؟`,
      a: `وحدة ${from.category === 'arabic' ? from.name : to.name} هي وحدة قياس تراثية عربية قديمة، كانت تستخدم في البناء والتجارة وقياس الأقمشة. تعتمد على أبعاد جسم الإنسان.`
    });
  }

  return faqs;
};

// ==========================================
// مصفوفة الروابط الداخلية (أزواج الطول الأكثر طلباً - 30 صفحة)
// ==========================================
const QUICK_PAIRS = [
  // عالمية (14)
  { from: 'm', to: 'ft', name: 'متر → قدم', icon: '📏', category: 'standard' },
  { from: 'ft', to: 'm', name: 'قدم → متر', icon: '👟', category: 'standard' },
  { from: 'm', to: 'yd', name: 'متر → ياردة', icon: '📏', category: 'standard' },
  { from: 'yd', to: 'm', name: 'ياردة → متر', icon: '🏈', category: 'standard' },
  { from: 'km', to: 'mi', name: 'كيلومتر → ميل', icon: '🏃', category: 'standard' },
  { from: 'mi', to: 'km', name: 'ميل → كيلومتر', icon: '🏎️', category: 'standard' },
  { from: 'cm', to: 'in', name: 'سنتيمتر → بوصة', icon: '📏', category: 'standard' },
  { from: 'in', to: 'cm', name: 'بوصة → سنتيمتر', icon: '📺', category: 'standard' },
  { from: 'm', to: 'km', name: 'متر → كيلومتر', icon: '📏', category: 'standard' },
  { from: 'km', to: 'm', name: 'كيلومتر → متر', icon: '🏃', category: 'standard' },
  { from: 'nmi', to: 'km', name: 'ميل بحري → كيلومتر', icon: '⛵', category: 'standard' },
  { from: 'km', to: 'nmi', name: 'كيلومتر → ميل بحري', icon: '🏃', category: 'standard' },
  { from: 'mm', to: 'in', name: 'مليمتر → بوصة', icon: '🔬', category: 'standard' },
  { from: 'in', to: 'mm', name: 'بوصة → مليمتر', icon: '📺', category: 'standard' },

  // فلكية (6)
  { from: 'ly', to: 'km', name: 'سنة ضوئية → كيلومتر', icon: '⭐', category: 'astronomical' },
  { from: 'km', to: 'ly', name: 'كيلومتر → سنة ضوئية', icon: '🏃', category: 'astronomical' },
  { from: 'au', to: 'km', name: 'وحدة فلكية → كيلومتر', icon: '🌍', category: 'astronomical' },
  { from: 'km', to: 'au', name: 'كيلومتر → وحدة فلكية', icon: '🏃', category: 'astronomical' },
  { from: 'pc', to: 'ly', name: 'فرسخ فلكي → سنة ضوئية', icon: '🌌', category: 'astronomical' },
  { from: 'ly', to: 'pc', name: 'سنة ضوئية → فرسخ فلكي', icon: '⭐', category: 'astronomical' },

  // تراثية (10)
  { from: 'cubit', to: 'm', name: 'ذراع → متر', icon: '🕌', category: 'arabic' },
  { from: 'm', to: 'cubit', name: 'متر → ذراع', icon: '📏', category: 'arabic' },
  { from: 'span', to: 'cm', name: 'شبر → سنتيمتر', icon: '🖐️', category: 'arabic' },
  { from: 'cm', to: 'span', name: 'سنتيمتر → شبر', icon: '📏', category: 'arabic' },
  { from: 'fathom', to: 'm', name: 'قامة → متر', icon: '🙌', category: 'arabic' },
  { from: 'm', to: 'fathom', name: 'متر → قامة', icon: '📏', category: 'arabic' },
  { from: 'league', to: 'km', name: 'فرسخ → كيلومتر', icon: '🐫', category: 'arabic' },
  { from: 'km', to: 'league', name: 'كيلومتر → فرسخ', icon: '🏃', category: 'arabic' },
  { from: 'cubit', to: 'cm', name: 'ذراع → سنتيمتر', icon: '🕌', category: 'arabic' },
  { from: 'cm', to: 'cubit', name: 'سنتيمتر → ذراع', icon: '📏', category: 'arabic' },
];

// ==========================================
// المكون الرئيسي
// ==========================================
const LengthConvertPair: React.FC = () => {
  const { from, to } = useParams<{ from: string; to: string }>();
  const navigate = useNavigate();

  // تنظيف وتحويل الأحرف
  const cleanFrom = from?.toLowerCase();
  const cleanTo = to?.toLowerCase();

  const [amount, setAmount] = useState('1');
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>();
  const [copied, setCopied] = useState(false);

  // الحصول على معلومات الوحدات
  const fromUnit = useMemo(() => LENGTH_UNITS.find(u => u.id === cleanFrom), [cleanFrom]);
  const toUnit = useMemo(() => LENGTH_UNITS.find(u => u.id === cleanTo), [cleanTo]);

  // التحقق من صحة الوحدات
  useEffect(() => {
    if (!fromUnit || !toUnit) {
      navigate('/length', { replace: true });
    }
  }, [fromUnit, toUnit, navigate]);

  // تحديث عنوان الصفحة للـ SEO
  useEffect(() => {
    if (fromUnit && toUnit) {
      let dynamicTitle = `تحويل ${fromUnit.name} إلى ${toUnit.name}`;
      if (fromUnit.category === 'astronomical' || toUnit.category === 'astronomical') {
        dynamicTitle = `رحلة في الفضاء: تحويل ${fromUnit.name} إلى ${toUnit.name}`;
      } else if (fromUnit.category === 'arabic' || toUnit.category === 'arabic') {
        dynamicTitle = `من تراثنا: تحويل ${fromUnit.name} إلى ${toUnit.name}`;
      }
      document.title = `${dynamicTitle} | تحويلاتي`;

      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content',
        `احصل على تحويل دقيق من ${fromUnit.name} إلى ${toUnit.name}. 1 ${fromUnit.symbol} = ${result?.formattedFactor || '...'} ${toUnit.symbol}. أداة مجانية وسريعة.`
      );
    }
  }, [fromUnit, toUnit, result]);

  // دالة التحويل
  const handleConvert = async () => {
    if (!cleanFrom || !cleanTo || !amount) return;

    setLoading(true);

    setTimeout(() => {
      const conversion = convertLength(parseFloat(amount), cleanFrom, cleanTo);
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
  }, [amount, cleanFrom, cleanTo]);

  const handleCopy = () => {
    if (result) {
      const text = `${result.formattedFromAmount} ${getUnitName(cleanFrom)} = ${result.formattedToAmount} ${getUnitName(cleanTo)}`;
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

  // تصنيف الروابط الداخلية حسب الفئة
  const categorizedQuickPairs = {
    standard: QUICK_PAIRS.filter(p => p.category === 'standard'),
    astronomical: QUICK_PAIRS.filter(p => p.category === 'astronomical'),
    arabic: QUICK_PAIRS.filter(p => p.category === 'arabic'),
  };

  const categoryLabels = {
    standard: { label: '🌍 تحويلات عالمية', icon: '🌍' },
    astronomical: { label: '🌌 تحويلات فلكية', icon: '🌌' },
    arabic: { label: '🏺 تحويلات تراثية', icon: '🏺' },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 font-cairo" dir="rtl">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm mb-6 text-gray-500 bg-white p-3 rounded-lg shadow-sm">
        <Link to="/" className="hover:text-blue-600 transition">الرئيسية</Link>
        <span>/</span>
        <Link to="/length" className="hover:text-blue-600 transition">تحويل الطول</Link>
        <span>/</span>
        <span className="text-blue-700 font-bold">
          {fromUnit.name} → {toUnit.name}
        </span>
      </nav>

      {/* البطاقة الرئيسية */}
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">
        <div className="bg-gradient-to-l from-blue-600 to-cyan-600 p-8 text-center text-white">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-5xl">{getUnitIcon(cleanFrom)}</span>
            <span className="text-3xl">→</span>
            <span className="text-5xl">{getUnitIcon(cleanTo)}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            تحويل {fromUnit.name} إلى {toUnit.name}
          </h1>
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
              className="w-full p-4 text-2xl border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition active:scale-95"
              placeholder={`أدخل القيمة بالـ ${fromUnit.symbol}`}
              step="any"
              min="0"
            />
          </div>

          {/* عرض الوحدتين */}
          <div className="flex items-center justify-between gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{getUnitIcon(cleanFrom)}</span>
              <div>
                <div className="font-bold text-gray-800">{fromUnit.name}</div>
                <div className="text-sm text-gray-500">{fromUnit.symbol}</div>
              </div>
            </div>
            <span className="text-2xl text-blue-600 animate-pulse">⇆</span>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="font-bold text-gray-800">{toUnit.name}</div>
                <div className="text-sm text-gray-500">{toUnit.symbol}</div>
              </div>
              <span className="text-4xl">{getUnitIcon(cleanTo)}</span>
            </div>
          </div>

          {/* زر التحويل */}
          <button
            onClick={handleConvert}
            disabled={loading}
            className="w-full bg-gradient-to-l from-blue-600 to-cyan-600 text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all duration-200 hover:-translate-y-1 active:scale-95 active:bg-blue-700 active:ring-2 active:ring-blue-300 disabled:opacity-50"
          >
            {loading ? 'جاري التحويل...' : 'تحويل'}
          </button>

          {/* النتيجة */}
          {result && !loading && (
            <div className="mt-6 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-100">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600">
                  {result.formattedToAmount} {toUnit.symbol}
                </div>
                <div className="text-gray-600 mt-2">
                  {result.formattedFromAmount} {fromUnit.symbol} = {result.formattedToAmount} {toUnit.symbol}
                </div>

                {/* المقارنة الواقعية */}
                <div className="mt-4 p-3 bg-orange-100/70 rounded-xl border border-orange-200">
                  <p className="text-orange-700 text-sm font-medium flex items-center justify-center gap-2">
                    <span>📊</span>
                    <span>{getRealWorldComparison(result.toAmount * (LENGTH_UNITS.find(u => u.id === toUnit.id)?.factor || 1), toUnit.id)}</span>
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
            جدول تحويل {fromUnit.name} إلى {toUnit.name}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {conversionTable.slice(0, 10).map((item, idx) => (
              <div key={idx} className="bg-gray-50 p-3 rounded-xl text-center hover:bg-blue-50 transition">
                <div className="text-sm text-gray-500">{item.fromFormatted} {fromUnit.symbol}</div>
                <div className="font-bold text-gray-800">=</div>
                <div className="text-blue-600 font-bold">{item.toFormatted} {toUnit.symbol}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========== القسم 1: سياق الوحدات ========== */}
      {fromUnit && toUnit && (
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
          <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
            <span>📖</span> سياق التحويل: {fromUnit.name} ↔ {toUnit.name}
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {getUnitContextMessage(fromUnit.id, toUnit.id)}
          </p>
        </div>
      )}

      {/* ========== القسم 2: أسئلة شائعة ========== */}
      {fromUnit && toUnit && (
        <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            أسئلة شائعة عن تحويل {fromUnit.name} إلى {toUnit.name}
          </h2>
          <div className="space-y-4">
            {getDynamicFAQ(fromUnit.id, toUnit.id).map((item, idx) => (
              <div key={idx} className="border-b border-gray-200 pb-4">
                <h3 className="font-bold text-gray-800 mb-2">{item.q}</h3>
                <p className="text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* الروابط الداخلية - مصفوفة الروابط السريعة */}
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
                    to={`/length/convert/${pair.from}/${pair.to}`}
                    className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 text-center group"
                  >
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-2xl">{pair.icon}</span>
                      <span className="text-gray-400">→</span>
                      <span className="text-2xl">{pair.icon}</span>
                    </div>
                    <div className="font-bold text-gray-800 text-sm group-hover:text-blue-600">
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
  );
};

export default LengthConvertPair;
