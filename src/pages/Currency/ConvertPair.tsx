import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CURRENCIES, convertCurrency } from './CurrencyLogic';
import { getCurrencySymbol, getCurrencyName } from './CurrencyLogic';

// ==========================================
// قالب المحتوى النصي الديناميكي - تحويل العملات
// ==========================================

// دالة المقدمة
const getCurrencyIntroduction = (fromCurrency: string, toCurrency: string, rate?: number): string => {
  return `
    <p class="text-gray-700 leading-relaxed">
      ${fromCurrency} مقابل ${toCurrency} من أكثر عمليات تحويل العملات طلباً في العالم، سواء للتجارة أو السفر أو الاستثمار.
      في هذه الصفحة، نقدم لك <strong>سعر الصرف المباشر والمحدث</strong> بناءً على أحدث بيانات التداول العالمية.
      ${rate ? `حالياً، 1 ${fromCurrency} يساوي ${rate.toFixed(4)} ${toCurrency}.` : ''}
    </p>
    <p class="text-gray-700 leading-relaxed mt-2">
      تتغير الأسعار بشكل لحظي تبعاً لتحركات السوق العالمية، لذلك نحرص على تحديث بياناتنا باستمرار لنضمن لك <strong>دقة لا مثيل لها</strong> عند التحويل.
    </p>
  `;
};

// دالة النصائح المالية
const getCurrencySmartTips = (): string => {
  return `
    <div class="grid md:grid-cols-2 gap-4 mt-6">
      <div class="bg-blue-50 p-4 rounded-xl border border-blue-200">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-xl">⏰</span>
          <h4 class="font-bold text-blue-800">توقيت التحويل</h4>
        </div>
        <p class="text-sm text-gray-700">
          أسواق العملات العالمية تغلق في عطلة نهاية الأسبوع (السبت والأحد)، مما قد يؤدي لثبات الأسعار بشكل وهمي.
          يُفضل إجراء التحويلات خلال أيام الأسبوع للحصول على أحدث الأسعار.
        </p>
      </div>
      <div class="bg-green-50 p-4 rounded-xl border border-green-200">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-xl">🏛️</span>
          <h4 class="font-bold text-green-800">سعر الشراء vs سعر البيع</h4>
        </div>
        <p class="text-sm text-gray-700">
          الأداة أعلاه تعرض <strong>سعر السوق المتوسط (Mid-market rate)</strong>، وهو السعر العادل بين البنوك.
          تختلف أسعار محلات الصرافة بإضافة عمولة أو هامش ربح، لذا استخدم سعرنا كمرجع للتفاوض.
        </p>
      </div>
    </div>
  `;
};

// دالة الأسئلة الشائعة
const getCurrencyDynamicFAQ = (fromCurrency: string, toCurrency: string): { q: string; a: string }[] => {
  return [
    {
      q: `كيف أحصل على أفضل سعر عند تحويل ${fromCurrency} إلى ${toCurrency}؟`,
      a: `لمراقبة أفضل سعر، يفضل متابعة التذبذبات اليومية للعملة واستخدام السعر المباشر كمرجع. يمكنك أيضاً ضبط تنبيهات السعر (قريباً) لمعرفة متى يصل السعر إلى المستوى الذي تريده.`
    },
    {
      q: `ما الذي يؤثر على سعر صرف ${fromCurrency} اليوم؟`,
      a: `تتأثر أسعار العملات بعدة عوامل: قرارات البنوك المركزية (مثل رفع أو خفض الفائدة)، التضخم، الاستقرار السياسي، ومؤشرات الاقتصاد الكلي. كل هذه العوامل تنعكس مباشرة على سعر ${fromCurrency} مقابل ${toCurrency}.`
    },
    {
      q: `هل السعر المعروض في الأداة هو نفسه في البنوك ومكاتب الصرافة؟`,
      a: `السعر المعروض هو <strong>سعر السوق المتوسط (Mid-market rate)</strong>، وهو السعر الذي تتعامل به البنوك فيما بينها. قد تختلف أسعار البنوك ومكاتب الصرافة بإضافة عمولة أو هامش ربح، لذا يُنصح باستخدام سعرنا كمرجع أساسي قبل التعامل.`
    },
    {
      q: `كم مرة يتم تحديث أسعار الصرف في الموقع؟`,
      a: `نقوم بتحديث الأسعار بشكل دوري (كل ساعة) من خلال مزود بيانات موثوق، لضمان حصولك على أحدث الأسعار المتاحة في الأسواق العالمية.`
    }
  ];
};

const ConvertPair: React.FC = () => {
  const navigate = useNavigate();
  const { from, to } = useParams<{ from: string; to: string }>();
  const cleanFrom = from?.toUpperCase();
  const cleanTo = to?.toUpperCase();

  const [amount, setAmount] = useState('1');
  const [result, setResult] = useState<number | null>(null);
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>();
  const [error, setError] = useState('');

  const fromCurrency = useMemo(() =>
    CURRENCIES.find(c => c.code === cleanFrom), [cleanFrom]
  );

  const toCurrency = useMemo(() =>
    CURRENCIES.find(c => c.code === cleanTo), [cleanTo]
  );

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      document.title = `تحويل ${fromCurrency.name} إلى ${toCurrency.name} | سعر الصرف اليوم`;

      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content',
        `احصل على سعر تحويل ${fromCurrency.name} (${fromCurrency.code}) إلى ${toCurrency.name} (${toCurrency.code}) الآن. أسعار محدثة لحظياً من موقع تحويلاتي.`
      );
    }
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (!fromCurrency || !toCurrency) {
      navigate('/currency', { replace: true });
    }
  }, [fromCurrency, toCurrency, navigate]);

  const quickPairs = [
    { from: 'USD', to: 'SAR', name: 'دولار / ريال سعودي' },
    { from: 'USD', to: 'EGP', name: 'دولار / جنيه مصري' },
    { from: 'USD', to: 'AED', name: 'دولار / درهم إماراتي' },
    { from: 'EUR', to: 'EGP', name: 'يورو / جنيه مصري' },
    { from: 'GBP', to: 'EGP', name: 'جنيه إسترليني / جنيه مصري' },
    { from: 'SAR', to: 'EGP', name: 'ريال سعودي / جنيه مصري' },
    { from: 'AED', to: 'EGP', name: 'درهم إماراتي / جنيه مصري' },
    { from: 'KWD', to: 'USD', name: 'دينار كويتي / دولار' },
    { from: 'SAR', to: 'USD', name: 'ريال سعودي / دولار' },
    { from: 'AED', to: 'USD', name: 'درهم إماراتي / دولار' },
    { from: 'TRY', to: 'USD', name: 'ليرة تركية / دولار' },
    { from: 'EUR', to: 'USD', name: 'يورو / دولار' },
    { from: 'GBP', to: 'USD', name: 'جنيه إسترليني / دولار' },
    { from: 'JPY', to: 'USD', name: 'ين ياباني / دولار' },
    { from: 'CNY', to: 'USD', name: 'يوان صيني / دولار' },
    { from: 'KWD', to: 'SAR', name: 'دينار كويتي / ريال' },
    { from: 'OMR', to: 'USD', name: 'ريال عماني / دولار' },
    { from: 'BHD', to: 'USD', name: 'دينار بحريني / دولار' },
    { from: 'QAR', to: 'USD', name: 'ريال قطري / دولار' },
    { from: 'JOD', to: 'USD', name: 'دينار أردني / دولار' },
  ];

  const handleConvert = async () => {
    if (!cleanFrom || !cleanTo || !amount) return;

    setLoading(true);
    setError('');

    try {
      const conversion = await convertCurrency(parseFloat(amount), cleanFrom, cleanTo);

      if (conversion) {
        setResult(conversion.toAmount);
        setRate(conversion.rate);
        setLastUpdate(conversion.lastUpdate);
      } else {
        setError('حدث خطأ في التحويل');
      }
    } catch (err) {
      setError('حدث خطأ غير متوقع');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cleanFrom && cleanTo) {
      handleConvert();
    }
  }, [cleanFrom, cleanTo]);

  if (!fromCurrency || !toCurrency) {
    return null;
  }

  const fixedAmounts = [1, 5, 10, 50, 100, 500, 1000];

  const getFlag = (code: string): string => {
    const flags: Record<string, string> = {
      USD: '🇺🇸', EUR: '🇪🇺', GBP: '🇬🇧', JPY: '🇯🇵', CNY: '🇨🇳',
      SAR: '🇸🇦', AED: '🇦🇪', EGP: '🇪🇬', KWD: '🇰🇼', QAR: '🇶🇦',
      OMR: '🇴🇲', BHD: '🇧🇭', JOD: '🇯🇴', TRY: '🇹🇷', CHF: '🇨🇭',
      CAD: '🇨🇦', AUD: '🇦🇺', INR: '🇮🇳', RUB: '🇷🇺', LBP: '🇱🇧',
      IQD: '🇮🇶', LYD: '🇱🇾', TND: '🇹🇳', MAD: '🇲🇦', DZD: '🇩🇿',
      YER: '🇾🇪', SYP: '🇸🇾', SDG: '🇸🇩', MRU: '🇲🇷', SOS: '🇸🇴',
      DJF: '🇩🇯', PKR: '🇵🇰', IDR: '🇮🇩', MYR: '🇲🇾', THB: '🇹🇭',
      VND: '🇻🇳', PHP: '🇵🇭', NGN: '🇳🇬', ZAR: '🇿🇦', KES: '🇰🇪',
      GHS: '🇬🇭', TZS: '🇹🇿', UGX: '🇺🇬', XOF: '🏁', XAF: '🏁',
      MXN: '🇲🇽', BRL: '🇧🇷', ARS: '🇦🇷', CLP: '🇨🇱', COP: '🇨🇴'
    };
    return flags[code] || '🏁';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 font-cairo" dir="rtl">
      <nav className="flex items-center gap-2 text-sm mb-6 text-gray-500 bg-white p-3 rounded-lg shadow-sm">
        <Link to="/" className="hover:text-blue-600">الرئيسية</Link>
        <span>/</span>
        <Link to="/currency" className="hover:text-blue-600">تحويل العملات</Link>
        <span>/</span>
        <span className="text-blue-700 font-bold">
          {fromCurrency.code} إلى {toCurrency.code}
        </span>
      </nav>

      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">
        <div className="bg-gradient-to-l from-blue-600 to-cyan-600 p-8 text-center text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            تحويل {fromCurrency.name} إلى {toCurrency.name}
          </h1>
          <p className="opacity-90 text-lg">
            سعر الصرف اليوم: 1 {fromCurrency.code} = {rate?.toFixed(4) || '...'} {toCurrency.code}
          </p>
        </div>

        <div className="p-8">
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2 text-right">
              المبلغ بالـ {fromCurrency.code}
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-4 text-2xl border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              placeholder={`أدخل المبلغ`}
              step="any"
              min="0"
            />
          </div>

          <div className="flex items-center justify-between gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{getFlag(fromCurrency.code)}</span>
              <div>
                <div className="font-bold text-gray-800">{fromCurrency.code}</div>
                <div className="text-sm text-gray-500">{fromCurrency.name}</div>
              </div>
            </div>
            <span className="text-2xl text-blue-600 animate-pulse">⇆</span>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="font-bold text-gray-800">{toCurrency.code}</div>
                <div className="text-sm text-gray-500">{toCurrency.name}</div>
              </div>
              <span className="text-4xl">{getFlag(toCurrency.code)}</span>
            </div>
          </div>

          <button
            onClick={handleConvert}
            disabled={loading}
            className="w-full bg-gradient-to-l from-blue-600 to-cyan-600 text-white py-4 rounded-xl font-bold hover:shadow-lg transition disabled:opacity-50"
          >
            {loading ? 'جاري التحويل...' : 'تحويل'}
          </button>

          {result !== null && rate !== null && !loading && (
            <div className="mt-6 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-100">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600">
                  {result.toFixed(2)} {toCurrency.symbol}
                </div>
                <div className="text-gray-600 mt-2">
                  1 {fromCurrency.code} = {rate.toFixed(4)} {toCurrency.code}
                </div>
                {lastUpdate && (
                  <div className="text-xs text-gray-400 mt-4">
                    آخر تحديث: {lastUpdate}
                  </div>
                )}
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 bg-red-50 text-red-600 p-4 rounded-xl text-center border border-red-100">
              {error}
            </div>
          )}
        </div>
      </div>

      {rate && (
        <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            تحويل {fromCurrency.name} إلى {toCurrency.name}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {fixedAmounts.map(amt => (
              <div key={amt} className="bg-gray-50 p-3 rounded-xl text-center">
                <div className="text-sm text-gray-500">{amt} {fromCurrency.code}</div>
                <div className="font-bold text-gray-800">=</div>
                <div className="text-blue-600 font-bold">{(amt * rate).toFixed(2)} {toCurrency.code}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========== محتوى SEO الغني ========== */}
      <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          معلومات عن تحويل {fromCurrency.name} إلى {toCurrency.name}
        </h2>
        <div dangerouslySetInnerHTML={{ __html: getCurrencyIntroduction(fromCurrency.name, toCurrency.name, rate || undefined) }} />
        
        {/* النصائح المالية */}
        <div dangerouslySetInnerHTML={{ __html: getCurrencySmartTips() }} />
      </div>

      {/* ========== أسئلة شائعة ========== */}
      <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          أسئلة شائعة عن تحويل {fromCurrency.name} إلى {toCurrency.name}
        </h2>
        <div className="space-y-4">
          {getCurrencyDynamicFAQ(fromCurrency.name, toCurrency.name).map((item, idx) => (
            <div key={idx} className="border-b border-gray-200 pb-4">
              <h3 className="font-bold text-gray-800 mb-2">{item.q}</h3>
              <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: item.a }} />
            </div>
          ))}
        </div>
      </div>

      {/* ✅ قسم الأعلام الجديد - العملات العربية */}
      <div className="mt-12 bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          تحويلات سريعة
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CURRENCIES.filter(c => c.isArabic).map(c => (
            <Link
              key={c.code}
              to={`/currency/convert/${c.code.toLowerCase()}/egp`}
              className="bg-white p-4 rounded-xl text-center shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-500 hover:bg-blue-50 active:scale-95 active:ring-2 active:ring-blue-100 transition-all flex flex-col items-center justify-center"
            >
              <span className="text-3xl mb-2">{getFlag(c.code)}</span>
              <div className="font-bold text-gray-800">{c.code}</div>
              <div className="text-xs text-gray-500">{c.name}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* ✅ قسم الروابط السريعة المصفوفة (التنسيق الصحيح) */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          أزواج العملات الأكثر طلباً
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickPairs.map(pair => (
            <Link
              key={`${pair.from}-${pair.to}`}
              to={`/currency/convert/${pair.from.toLowerCase()}/${pair.to.toLowerCase()}`}
              className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition text-center group"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-2xl">{getFlag(pair.from)}</span>
                <span className="text-gray-400">→</span>
                <span className="text-2xl">{getFlag(pair.to)}</span>
              </div>
              <div className="font-bold text-gray-800 text-sm group-hover:text-blue-600">
                {pair.name}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* روابط سريعة لأدوات أخرى */}
      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        <Link to="/date" className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200 transition">
          تحويل التاريخ
        </Link>
        <Link to="/date/today" className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition">
          تاريخ اليوم
        </Link>
        <Link to="/date/age-calculator" className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200 transition">
          حساب العمر
        </Link>
        <Link to="/date/compare" className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm hover:bg-orange-200 transition">
          مقارنة تواريخ
        </Link>
      </div>
    </div>
  );
};

export default ConvertPair;
