import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ANCIENT_UNITS, getUnitById, formatNumber } from './AncientUnits';
import { convertAncient } from './AncientLogic';

// ==========================================
// مصفوفة الروابط الداخلية (أزواج المقاييس التراثية)
// ==========================================
const QUICK_PAIRS = [
  // وحدات الطول التراثية
  { from: 'cubit', to: 'meter', name: 'ذراع → متر', icon: '🕌', category: 'length' },
  { from: 'meter', to: 'cubit', name: 'متر → ذراع', icon: '📏', category: 'length' },
  { from: 'span', to: 'centimeter', name: 'شبر → سم', icon: '🖐️', category: 'length' },
  { from: 'centimeter', to: 'span', name: 'سم → شبر', icon: '📏', category: 'length' },
  { from: 'fathom', to: 'meter', name: 'قامة → متر', icon: '🙌', category: 'length' },
  { from: 'meter', to: 'fathom', name: 'متر → قامة', icon: '📏', category: 'length' },
  { from: 'league', to: 'kilometer', name: 'فرسخ → كيلومتر', icon: '🐫', category: 'length' },
  { from: 'kilometer', to: 'league', name: 'كيلومتر → فرسخ', icon: '🏃', category: 'length' },

  // وحدات الوزن التراثية
  { from: 'mann', to: 'kilogram', name: 'من → كيلوجرام', icon: '🏺', category: 'weight' },
  { from: 'kilogram', to: 'mann', name: 'كيلوجرام → من', icon: '⚖️', category: 'weight' },
  { from: 'mithqal', to: 'gram', name: 'مثقال → جرام', icon: '💎', category: 'weight' },
  { from: 'gram', to: 'mithqal', name: 'جرام → مثقال', icon: '⚖️', category: 'weight' },
  { from: 'dirham', to: 'gram', name: 'درهم → جرام', icon: '🪙', category: 'weight' },
  { from: 'gram', to: 'dirham', name: 'جرام → درهم', icon: '⚖️', category: 'weight' },
  { from: 'gulf_lb', to: 'kilogram', name: 'رطل سعودي → كيلوجرام', icon: '🇸🇦', category: 'weight' },
  { from: 'kilogram', to: 'gulf_lb', name: 'كيلوجرام → رطل سعودي', icon: '⚖️', category: 'weight' },
];

// ==========================================
// المكون الرئيسي
// ==========================================
const AncientConvertPair: React.FC = () => {
  const { from, to } = useParams<{ from: string; to: string }>();
  const navigate = useNavigate();

  // تنظيف وتحويل الأحرف
  const cleanFrom = from?.toLowerCase();
  const cleanTo = to?.toLowerCase();

  const [amount, setAmount] = useState('1');
  const [result, setResult] = useState<number | null>(null);
  const [factor, setFactor] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>();
  const [copied, setCopied] = useState(false);

  // الحصول على معلومات الوحدات
  const fromUnit = useMemo(() => getUnitById(cleanFrom || ''), [cleanFrom]);
  const toUnit = useMemo(() => getUnitById(cleanTo || ''), [cleanTo]);

  // التحقق من صحة الوحدات
  useEffect(() => {
    if (!fromUnit || !toUnit) {
      navigate('/ancient', { replace: true });
    }
  }, [fromUnit, toUnit, navigate]);

  // تحديث عنوان الصفحة للـ SEO
  useEffect(() => {
    if (fromUnit && toUnit) {
      let dynamicTitle = `تحويل ${fromUnit.name} إلى ${toUnit.name}`;
      if (fromUnit.category === 'length' && toUnit.category === 'length') {
        dynamicTitle = `تحويل وحدات الطول التراثية: ${fromUnit.name} إلى ${toUnit.name}`;
      } else if (fromUnit.category === 'weight' && toUnit.category === 'weight') {
        dynamicTitle = `تحويل أوزان الذهب والمجوهرات: ${fromUnit.name} إلى ${toUnit.name}`;
      }
      document.title = `${dynamicTitle} | تحويلاتي`;

      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content',
        `احصل على تحويل دقيق من ${fromUnit.name} إلى ${toUnit.name}. 1 ${fromUnit.symbol} = ${factor?.toFixed(6) || '...'} ${toUnit.symbol}. أداة مجانية وسريعة.`
      );
    }
  }, [fromUnit, toUnit, factor]);

  // دالة التحويل
  const handleConvert = async () => {
    if (!cleanFrom || !cleanTo || !amount) return;

    setLoading(true);

    setTimeout(() => {
      const conversion = convertAncient(parseFloat(amount), cleanFrom, cleanTo);
      if (conversion) {
        setResult(conversion.toAmount);
        setFactor(conversion.factor);
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
    if (result !== null && fromUnit && toUnit) {
      const text = `${formatNumber(parseFloat(amount))} ${fromUnit.name} = ${formatNumber(result)} ${toUnit.name}`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // مبالغ ثابتة للجدول
  const fixedAmounts = [1, 2, 5, 10, 25, 50, 100, 250, 500];

  // حساب الجدول الديناميكي
  const conversionTable = useMemo(() => {
    if (result === null || !factor || !fromUnit || !toUnit) return [];
    return fixedAmounts.map(amt => ({
      from: amt,
      fromFormatted: formatNumber(amt, 0),
      to: amt * factor,
      toFormatted: formatNumber(amt * factor, 4)
    }));
  }, [result, factor, fromUnit, toUnit]);

  if (!fromUnit || !toUnit) {
    return null;
  }

  // تصنيف الروابط الداخلية
  const categorizedPairs = {
    length: QUICK_PAIRS.filter(p => p.category === 'length'),
    weight: QUICK_PAIRS.filter(p => p.category === 'weight'),
  };

  const categoryLabels = {
    length: { label: '📏 تحويلات الطول التراثية', icon: '📏' },
    weight: { label: '⚖️ تحويلات الوزن التراثية', icon: '⚖️' },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 font-cairo" dir="rtl">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm mb-6 text-gray-500 bg-white p-3 rounded-lg shadow-sm">
        <Link to="/" className="hover:text-amber-600 transition">الرئيسية</Link>
        <span>/</span>
        <Link to="/ancient" className="hover:text-amber-600 transition">المقاييس التراثية</Link>
        <span>/</span>
        <span className="text-amber-700 font-bold">
          {fromUnit.name} → {toUnit.name}
        </span>
      </nav>

      {/* البطاقة الرئيسية */}
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">
        <div className="bg-gradient-to-l from-amber-600 to-orange-600 p-8 text-center text-white">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-5xl">{fromUnit.icon}</span>
            <span className="text-3xl">→</span>
            <span className="text-5xl">{toUnit.icon}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            تحويل {fromUnit.name} إلى {toUnit.name}
          </h1>
          <p className="opacity-90 text-lg">
            1 {fromUnit.symbol} = {factor?.toFixed(6) || '...'} {toUnit.symbol}
          </p>
        </div>

        <div className="p-8">
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2 text-right">
              القيمة بالـ {fromUnit.name}
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-4 text-2xl border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition active:scale-95"
              placeholder={`أدخل القيمة بالـ ${fromUnit.symbol}`}
              step="any"
              min="0"
            />
          </div>

          <div className="flex items-center justify-between gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{fromUnit.icon}</span>
              <div>
                <div className="font-bold text-gray-800">{fromUnit.name}</div>
                <div className="text-sm text-gray-500">{fromUnit.symbol}</div>
              </div>
            </div>
            <span className="text-2xl text-amber-600 animate-pulse">⇆</span>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="font-bold text-gray-800">{toUnit.name}</div>
                <div className="text-sm text-gray-500">{toUnit.symbol}</div>
              </div>
              <span className="text-4xl">{toUnit.icon}</span>
            </div>
          </div>

          <button
            onClick={handleConvert}
            disabled={loading}
            className="w-full bg-gradient-to-l from-amber-600 to-orange-600 text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all duration-200 hover:-translate-y-1 active:scale-95 active:ring-2 active:ring-amber-300 disabled:opacity-50"
          >
            {loading ? 'جاري التحويل...' : 'تحويل'}
          </button>

          {result !== null && factor !== null && !loading && (
            <div className="mt-6 bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-100">
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-600">
                  {formatNumber(result)} {toUnit.symbol}
                </div>
                <div className="text-gray-600 mt-2">
                  {formatNumber(parseFloat(amount))} {fromUnit.symbol} = {formatNumber(result)} {toUnit.symbol}
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
                    ? 'bg-amber-600 text-white'
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
      {conversionTable.length > 0 && (
        <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            جدول تحويل {fromUnit.name} إلى {toUnit.name}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {conversionTable.slice(0, 10).map((item, idx) => (
              <div key={idx} className="bg-gray-50 p-3 rounded-xl text-center hover:bg-amber-50 transition">
                <div className="text-sm text-gray-500">{item.fromFormatted} {fromUnit.symbol}</div>
                <div className="font-bold text-gray-800">=</div>
                <div className="text-amber-600 font-bold">{item.toFormatted} {toUnit.symbol}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* الروابط الداخلية */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          تحويلات سريعة أخرى
        </h2>

        {Object.entries(categorizedPairs).map(([category, pairs]) => (
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
                    to={`/ancient/convert/${pair.from}/${pair.to}`}
                    className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-gray-200 hover:border-amber-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 text-center group"
                  >
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-2xl">{pair.icon}</span>
                      <span className="text-gray-400">→</span>
                      <span className="text-2xl">{pair.icon}</span>
                    </div>
                    <div className="font-bold text-gray-800 text-sm group-hover:text-amber-600">
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
  );
};

export default AncientConvertPair;
