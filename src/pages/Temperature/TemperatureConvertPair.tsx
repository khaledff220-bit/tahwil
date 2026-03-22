import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { TEMPERATURE_UNITS, getUnitName, getUnitSymbol, getUnitIcon, formatNumber } from './TemperatureUnits';
import { convertTemperature, ConversionResult, CRITICAL_TEMPERATURES } from './TemperatureLogic';

// ==========================================
// مصفوفة الروابط الداخلية (20 صفحة)
// ==========================================
const QUICK_PAIRS = [
  // أزواج ذهبية (الأكثر طلباً)
  { from: 'celsius', to: 'fahrenheit', name: 'سيلزيوس → فهرنهايت', icon: '🌡️', category: 'gold' },
  { from: 'fahrenheit', to: 'celsius', name: 'فهرنهايت → سيلزيوس', icon: '🔥', category: 'gold' },
  { from: 'celsius', to: 'kelvin', name: 'سيلزيوس → كلفن', icon: '🌡️', category: 'gold' },
  { from: 'kelvin', to: 'celsius', name: 'كلفن → سيلزيوس', icon: '🔬', category: 'gold' },

  // أزواج فضية (علمية)
  { from: 'celsius', to: 'rankine', name: 'سيلزيوس → رنكين', icon: '🌡️', category: 'silver' },
  { from: 'rankine', to: 'celsius', name: 'رنكين → سيلزيوس', icon: '⚙️', category: 'silver' },
  { from: 'fahrenheit', to: 'kelvin', name: 'فهرنهايت → كلفن', icon: '🔥', category: 'silver' },
  { from: 'kelvin', to: 'fahrenheit', name: 'كلفن → فهرنهايت', icon: '🔬', category: 'silver' },

  // أزواج برونزية (تاريخية)
  { from: 'celsius', to: 'reaumur', name: 'سيلزيوس → ريومور', icon: '🌡️', category: 'bronze' },
  { from: 'reaumur', to: 'celsius', name: 'ريومور → سيلزيوس', icon: '📜', category: 'bronze' },
  { from: 'celsius', to: 'romer', name: 'سيلزيوس → رومر', icon: '🌡️', category: 'bronze' },
  { from: 'romer', to: 'celsius', name: 'رومر → سيلزيوس', icon: '🏛️', category: 'bronze' },
  { from: 'celsius', to: 'newton', name: 'سيلزيوس → نيوتن', icon: '🌡️', category: 'bronze' },
  { from: 'newton', to: 'celsius', name: 'نيوتن → سيلزيوس', icon: '🍎', category: 'bronze' },
  { from: 'celsius', to: 'delisle', name: 'سيلزيوس → ديليه', icon: '🌡️', category: 'bronze' },
  { from: 'delisle', to: 'celsius', name: 'ديليه → سيلزيوس', icon: '❄️', category: 'bronze' },
];

// ==========================================
// دوال المساعدة
// ==========================================

// دالة تنبيهات الوحدات الخاصة (ديليه، رومر، نيوتن)
const getSpecialUnitAlert = (unitId: string): string | null => {
  if (unitId === 'delisle') {
    return '⚠️ تنبيه: مقياس ديليه عكسي - يزداد الرقم كلما انخفضت الحرارة! 0°De = غليان الماء، 150°De = تجمد الماء.';
  }
  if (unitId === 'romer') {
    return '📜 معلومة: مقياس رومر هو أول مقياس عملي للحرارة، ابتكره أولي رومر عام 1701.';
  }
  if (unitId === 'newton') {
    return '🍎 ابتكر إسحاق نيوتن هذا المقياس عام 1700، ويعتمد على نقطة تجمد الماء 0°N وغليانه 33°N.';
  }
  return null;
};

// دالة التأثير البصري حسب درجة الحرارة
const getTemperatureEffect = (value: number, unitId: string): { icon: string; color: string; message: string } => {
  // تحويل إلى سيلزيوس للمقارنة
  let celsius = value;
  if (unitId === 'fahrenheit') celsius = (value - 32) * 5 / 9;
  if (unitId === 'kelvin') celsius = value - 273.15;
  if (unitId === 'rankine') celsius = (value - 491.67) * 5 / 9;
  if (unitId === 'reaumur') celsius = value * 1.25;
  if (unitId === 'romer') celsius = (value - 7.5) * 40 / 21;
  if (unitId === 'newton') celsius = value * 100 / 33;
  if (unitId === 'delisle') celsius = 100 - (value * 2 / 3);
  
  if (celsius >= 100) return { icon: '🔥', color: 'text-red-600 animate-pulse', message: 'درجة غليان الماء! 🔥' };
  if (celsius <= 0) return { icon: '❄️', color: 'text-blue-600', message: 'درجة تجمد الماء! ❄️' };
  if (celsius >= 36 && celsius <= 38) return { icon: '🌡️', color: 'text-orange-600 animate-pulse', message: 'حرارة الجسم الطبيعية 🌡️' };
  if (celsius <= -273) return { icon: '⚛️', color: 'text-purple-600', message: 'الصفر المطلق! ⚛️' };
  return { icon: '🌡️', color: 'text-gray-600', message: '' };
};

// دالة المقدمة (الإجابة المباشرة لـ Featured Snippet)
const getDirectAnswer = (value: number, fromUnit: string, toUnit: string, resultValue: number): string => {
  return `${value} ${fromUnit} تساوي ${resultValue.toFixed(2)} ${toUnit}.`;
};

// دالة المقدمة التفصيلية
const getIntroduction = (fromUnit: string, toUnit: string): string => {
  const from = TEMPERATURE_UNITS.find(u => u.id === fromUnit);
  const to = TEMPERATURE_UNITS.find(u => u.id === toUnit);
  if (!from || !to) return '';

  if (from.id === 'celsius' && to.id === 'fahrenheit') {
    return `تحويل سيلزيوس إلى فهرنهايت من أكثر عمليات تحويل الحرارة طلباً في العالم، خاصة للمسافرين بين الدول التي تستخدم النظام المتري (مثل دول الخليج وأوروبا) والدول التي تستخدم النظام الإمبراطوري (مثل الولايات المتحدة).`;
  }
  if (from.id === 'celsius' && to.id === 'kelvin') {
    return `تحويل سيلزيوس إلى كلفن هو أساس الفيزياء الحديثة. يستخدم كلفن في المعامل العلمية ووكالات الفضاء لقياس درجات الحرارة المطلقة.`;
  }
  if (from.id === 'celsius' && (to.id === 'reaumur' || to.id === 'romer' || to.id === 'newton' || to.id === 'delisle')) {
    return `تحويل سيلزيوس إلى ${to.name} يفتح لك نافذة على تاريخ علم القياس. ${to.name} هو أحد المقاييس التاريخية التي ابتكرت قبل اعتماد النظام المتري عالمياً.`;
  }
  
  return `تحويل ${from.name} إلى ${to.name} أداة دقيقة للمهتمين بالعلوم والفيزياء والهندسة.`;
};

// دالة المعلومات عن الوحدتين
const getUnitInfo = (unitId: string): { history: string; usage: string; reference: string } => {
  const unit = TEMPERATURE_UNITS.find(u => u.id === unitId);
  if (!unit) return { history: '', usage: '', reference: '' };

  const info: Record<string, { history: string; usage: string; reference: string }> = {
    celsius: {
      history: 'ابتكرها العالم السويدي أندرس سيلزيوس عام 1742.',
      usage: 'يستخدم في جميع دول العالم لقياس الطقس ودرجات الحرارة اليومية.',
      reference: '0°C = تجمد الماء، 100°C = غليان الماء.'
    },
    fahrenheit: {
      history: 'ابتكرها العالم الألماني دانيال فهرنهايت عام 1724.',
      usage: 'يستخدم في الولايات المتحدة وبعض الدول الكاريبية.',
      reference: '32°F = تجمد الماء، 212°F = غليان الماء، 98.6°F = حرارة الجسم.'
    },
    kelvin: {
      history: 'ابتكرها الفيزيائي البريطاني اللورد كلفن عام 1848.',
      usage: 'يستخدم في الفيزياء والفضاء والمعامل العلمية.',
      reference: '0 K = الصفر المطلق، 273.15 K = تجمد الماء، 373.15 K = غليان الماء.'
    },
    rankine: {
      history: 'ابتكرها المهندس الاسكتلندي وليام رانكين عام 1859.',
      usage: 'يستخدم في الهندسة الحرارية وبعض التطبيقات الصناعية.',
      reference: '0°R = الصفر المطلق، 491.67°R = تجمد الماء.'
    },
    reaumur: {
      history: 'ابتكرها العالم الفرنسي رينيه ريومور عام 1730.',
      usage: 'استخدمت تاريخياً في أوروبا لقياس الحرارة الصناعية.',
      reference: '0°Ré = تجمد الماء، 80°Ré = غليان الماء.'
    },
    romer: {
      history: 'ابتكرها العالم الدنماركي أولي رومر عام 1701، وهو أول مقياس عملي للحرارة.',
      usage: 'نادر الاستخدام حالياً، لكنه مهم تاريخياً.',
      reference: '7.5°Rø = تجمد الماء، 60°Rø = غليان الماء.'
    },
    newton: {
      history: 'ابتكرها العالم الإنجليزي إسحاق نيوتن عام 1700.',
      usage: 'نادر الاستخدام، لكنه يظهر في النصوص التاريخية.',
      reference: '0°N = تجمد الماء، 33°N = غليان الماء.'
    },
    delisle: {
      history: 'ابتكرها الفلكي الفرنسي جوزيف ديليه عام 1732.',
      usage: 'مقياس عكسي نادر الاستخدام.',
      reference: '0°De = غليان الماء، 150°De = تجمد الماء.'
    }
  };
  return info[unitId] || { history: '', usage: '', reference: '' };
};

// دالة النصائح العملية
const getPracticalTips = (fromUnit: string, toUnit: string): string => {
  const from = TEMPERATURE_UNITS.find(u => u.id === fromUnit);
  const to = TEMPERATURE_UNITS.find(u => u.id === toUnit);
  if (!from || !to) return '';

  if (from.id === 'celsius' && to.id === 'fahrenheit') {
    return `💡 نصيحة للمسافرين: عند السفر إلى الولايات المتحدة، اضرب درجة الحرارة بالسيلزيوس في 1.8 ثم أضف 32. مثال: 25°C × 1.8 + 32 = 77°F.`;
  }
  if (from.id === 'fahrenheit' && to.id === 'celsius') {
    return `💡 نصيحة للمسافرين: لتحويل الفهرنهايت إلى سيلزيوس، اطرح 32 ثم اقسم على 1.8. مثال: 77°F - 32 = 45 ÷ 1.8 = 25°C.`;
  }
  if (from.id === 'celsius' && to.id === 'kelvin') {
    return `💡 نصيحة للعلماء: الكلفن يستخدم في قياس درجات الحرارة المطلقة. أضف 273.15 للتحويل من سيلزيوس إلى كلفن.`;
  }
  if (from.id === 'celsius' && (to.id === 'reaumur' || to.id === 'romer' || to.id === 'newton' || to.id === 'delisle')) {
    return `💡 نصيحة للمهتمين بالتاريخ: هذه الوحدة التاريخية قد تظهر في المخطوطات العلمية القديمة. استخدمها للبحث والدراسة.`;
  }
  
  return `💡 نصيحة عملية: استخدم أداة التحويل أعلاه للحصول على نتائج فورية ودقيقة.`;
};

// دالة الأسئلة الشائعة (4 أسئلة)
const getFAQ = (fromUnit: string, toUnit: string): { q: string; a: string }[] => {
  const from = TEMPERATURE_UNITS.find(u => u.id === fromUnit);
  const to = TEMPERATURE_UNITS.find(u => u.id === toUnit);
  if (!from || !to) return [];

  const formula = from.id === 'celsius' && to.id === 'fahrenheit' ? '°F = (°C × 9/5) + 32' :
                  from.id === 'fahrenheit' && to.id === 'celsius' ? '°C = (°F - 32) × 5/9' :
                  from.id === 'celsius' && to.id === 'kelvin' ? 'K = °C + 273.15' :
                  from.id === 'kelvin' && to.id === 'celsius' ? '°C = K - 273.15' : '';

  const example = from.id === 'celsius' && to.id === 'fahrenheit' ? 'مثال: 25°C × 9/5 + 32 = 77°F' :
                  from.id === 'fahrenheit' && to.id === 'celsius' ? 'مثال: 77°F - 32 = 45 ÷ 1.8 = 25°C' : '';

  return [
    {
      q: `كيف أحول ${from.name} إلى ${to.name} يدوياً؟`,
      a: formula ? `استخدم المعادلة: ${formula}. ${example}` : `استخدم الأداة أعلاه للحصول على نتيجة فورية.`
    },
    {
      q: `ما الفرق بين ${from.name} و ${to.name}؟`,
      a: `${from.name} ${from.id === 'celsius' ? 'يعتمد على نقطتي تجمد وغليان الماء' : from.id === 'kelvin' ? 'يبدأ من الصفر المطلق' : from.id === 'delisle' ? 'مقياس عكسي' : 'مقياس حراري'}، بينما ${to.name} ${to.id === 'fahrenheit' ? 'يستخدم في الولايات المتحدة' : to.id === 'kelvin' ? 'يستخدم في الفيزياء' : to.id === 'delisle' ? 'عكسي' : 'مقياس آخر'}.`
    },
    {
      q: `أين يستخدم ${from.name} بشكل أساسي؟`,
      a: getUnitInfo(from.id).usage
    },
    {
      q: `أين يستخدم ${to.name} بشكل أساسي؟`,
      a: getUnitInfo(to.id).usage
    }
  ];
};

// ==========================================
// المكون الرئيسي
// ==========================================
const TemperatureConvertPair: React.FC = () => {
  const { from, to } = useParams<{ from: string; to: string }>();
  const navigate = useNavigate();

  const cleanFrom = from?.toLowerCase();
  const cleanTo = to?.toLowerCase();

  const [amount, setAmount] = useState('37');
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>();
  const [copied, setCopied] = useState(false);

  const fromUnit = useMemo(() => TEMPERATURE_UNITS.find(u => u.id === cleanFrom), [cleanFrom]);
  const toUnit = useMemo(() => TEMPERATURE_UNITS.find(u => u.id === cleanTo), [cleanTo]);

  // التحقق من صحة الوحدات
  useEffect(() => {
    if (!fromUnit || !toUnit) {
      navigate('/temperature', { replace: true });
    }
  }, [fromUnit, toUnit, navigate]);

  // تحديث عنوان الصفحة للـ SEO
  useEffect(() => {
    if (fromUnit && toUnit) {
      let dynamicTitle = `تحويل ${fromUnit.name} إلى ${toUnit.name}`;
      if (fromUnit.id === 'celsius' && toUnit.id === 'fahrenheit') {
        dynamicTitle = `تحويل سيلزيوس إلى فهرنهايت | حرارة دقيقة`;
      } else if (fromUnit.category === 'historical' || toUnit.category === 'historical') {
        dynamicTitle = `تحويل ${fromUnit.name} إلى ${toUnit.name} | وحدات حرارة تاريخية`;
      }
      document.title = `${dynamicTitle} | تحويلاتي`;

      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content',
        `احصل على تحويل دقيق من ${fromUnit.name} إلى ${toUnit.name}. 1 ${fromUnit.symbol} = ${result?.formattedToAmount || '...'} ${toUnit.symbol}. أداة مجانية وسريعة.`
      );
    }
  }, [fromUnit, toUnit, result]);

  // دالة التحويل
  const handleConvert = async () => {
    if (!cleanFrom || !cleanTo || !amount) return;

    setLoading(true);
    setTimeout(() => {
      const conversion = convertTemperature(parseFloat(amount), cleanFrom, cleanTo);
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
      const text = `${result.formattedFromAmount} ${getUnitName(result.fromUnit)} = ${result.formattedToAmount} ${getUnitName(result.toUnit)}`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const fixedAmounts = [0, 10, 20, 25, 30, 37, 50, 75, 100];

  // حساب الجدول الديناميكي
  const conversionTable = useMemo(() => {
    if (!result) return [];
    return fixedAmounts.map(amt => {
      const calculated = convertTemperature(amt, cleanFrom, cleanTo);
      return {
        from: amt,
        fromFormatted: amt.toString(),
        to: calculated?.toAmount || 0,
        toFormatted: calculated?.formattedToAmount || '0'
      };
    });
  }, [result, cleanFrom, cleanTo]);

  if (!fromUnit || !toUnit) {
    return null;
  }

  // تصنيف الروابط الداخلية
  const categorizedPairs = {
    gold: QUICK_PAIRS.filter(p => p.category === 'gold'),
    silver: QUICK_PAIRS.filter(p => p.category === 'silver'),
    bronze: QUICK_PAIRS.filter(p => p.category === 'bronze'),
  };

  const categoryLabels = {
    gold: { label: '🥇 تحويلات الأكثر طلباً', icon: '🥇' },
    silver: { label: '🥈 تحويلات علمية وهندسية', icon: '🥈' },
    bronze: { label: '🥉 تحويلات تاريخية ونادرة', icon: '🥉' },
  };

  // الحصول على الإجابة المباشرة (لـ Featured Snippet)
  const directAnswer = result ? getDirectAnswer(parseFloat(amount), fromUnit.name, toUnit.name, result.toAmount) : '';

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 font-cairo" dir="rtl">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm mb-6 text-gray-500 bg-white p-3 rounded-lg shadow-sm">
        <Link to="/" className="hover:text-orange-600 transition">الرئيسية</Link>
        <span>/</span>
        <Link to="/temperature" className="hover:text-orange-600 transition">تحويل الحرارة</Link>
        <span>/</span>
        <span className="text-orange-700 font-bold">
          {fromUnit.name} → {toUnit.name}
        </span>
      </nav>

      {/* الإجابة المباشرة (لـ Featured Snippet) */}
      {result && (
        <div className="mb-4 p-3 bg-orange-50 border-r-4 border-orange-500 rounded-lg text-center">
          <p className="text-lg font-bold text-orange-800">{directAnswer}</p>
        </div>
      )}

      {/* البطاقة الرئيسية */}
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">
        <div className="bg-gradient-to-l from-orange-600 to-red-600 p-8 text-center text-white">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-5xl">{getUnitIcon(cleanFrom)}</span>
            <span className="text-3xl">→</span>
            <span className="text-5xl">{getUnitIcon(cleanTo)}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            تحويل {fromUnit.name} إلى {toUnit.name}
          </h1>
          <p className="opacity-90 text-lg">
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
              className="w-full p-4 text-2xl border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition active:scale-95"
              placeholder={`أدخل القيمة بالـ ${fromUnit.symbol}`}
              step="any"
            />
          </div>

          {/* تنبيهات للوحدات الخاصة */}
          {(getSpecialUnitAlert(cleanFrom) || getSpecialUnitAlert(cleanTo)) && (
            <div className="mb-4 p-3 bg-amber-100 border-r-4 border-amber-500 rounded-lg text-sm text-amber-800">
              {getSpecialUnitAlert(cleanFrom) || getSpecialUnitAlert(cleanTo)}
            </div>
          )}

          <div className="flex items-center justify-between gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{getUnitIcon(cleanFrom)}</span>
              <div>
                <div className="font-bold text-gray-800">{fromUnit.name}</div>
                <div className="text-sm text-gray-500">{fromUnit.symbol}</div>
              </div>
            </div>
            <span className="text-2xl text-orange-600 animate-pulse">⇆</span>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="font-bold text-gray-800">{toUnit.name}</div>
                <div className="text-sm text-gray-500">{toUnit.symbol}</div>
              </div>
              <span className="text-4xl">{getUnitIcon(cleanTo)}</span>
            </div>
          </div>

          <button
            onClick={handleConvert}
            disabled={loading}
            className="w-full bg-gradient-to-l from-orange-600 to-red-600 text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all duration-200 hover:-translate-y-1 active:scale-95 active:bg-orange-700 disabled:opacity-50"
          >
            {loading ? 'جاري التحويل...' : 'تحويل'}
          </button>

          {/* النتيجة مع التأثير البصري */}
          {result && !loading && (
            <div className="mt-6 bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-100">
              <div className="text-center">
                <div className={`text-4xl font-bold ${getTemperatureEffect(result.toAmount, cleanTo).color} flex items-center justify-center gap-2`}>
                  <span className="text-5xl">{getTemperatureEffect(result.toAmount, cleanTo).icon}</span>
                  {result.formattedToAmount} {toUnit.symbol}
                </div>
                {getTemperatureEffect(result.toAmount, cleanTo).message && (
                  <p className="text-sm text-gray-500 mt-1">{getTemperatureEffect(result.toAmount, cleanTo).message}</p>
                )}
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

      {/* جدول التحويلات الشائعة */}
      {result && conversionTable.length > 0 && (
        <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            جدول تحويل {fromUnit.name} إلى {toUnit.name}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {conversionTable.slice(0, 10).map((item, idx) => (
              <div key={idx} className="bg-gray-50 p-3 rounded-xl text-center hover:bg-orange-50 transition">
                <div className="text-sm text-gray-500">{item.fromFormatted} {fromUnit.symbol}</div>
                <div className="font-bold text-gray-800">=</div>
                <div className="text-orange-600 font-bold">{item.toFormatted} {toUnit.symbol}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========== الروابط الداخلية (20 رابطاً) ========== */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          تحويلات حرارة سريعة
        </h2>

        {Object.entries(categorizedPairs).map(([category, pairs]) => (
          pairs.length > 0 && (
            <div key={category} className="mb-6">
              <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
                <span>{categoryLabels[category as keyof typeof categoryLabels]?.icon || '📦'}</span>
                <span>{categoryLabels[category as keyof typeof categoryLabels]?.label || category}</span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {pairs.map(pair => (
                  <Link
                    key={`${pair.from}-${pair.to}`}
                    to={`/temperature/convert/${pair.from}/${pair.to}`}
                    className="bg-white/70 backdrop-blur-sm p-3 rounded-xl border border-gray-200 hover:border-orange-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 text-center group"
                  >
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span className="text-xl">{pair.icon}</span>
                      <span className="text-gray-400">→</span>
                      <span className="text-xl">{pair.icon}</span>
                    </div>
                    <div className="font-bold text-gray-800 text-xs group-hover:text-orange-600">
                      {pair.name}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )
        ))}
      </div>

      {/* ========== محتوى SEO الغني ========== */}
      <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold text-orange-700 mb-4 flex items-center gap-2">
          <span>🌡️</span> معلومات عن تحويل {fromUnit.name} إلى {toUnit.name}
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          {getIntroduction(cleanFrom, cleanTo)}
        </p>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
              <span>📊</span> عن {fromUnit.name}
            </h3>
            <p className="text-sm text-gray-700">{getUnitInfo(cleanFrom).history}</p>
            <p className="text-sm text-gray-700 mt-2">{getUnitInfo(cleanFrom).usage}</p>
            <p className="text-xs text-gray-500 mt-2">{getUnitInfo(cleanFrom).reference}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-xl border border-green-200">
            <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2">
              <span>📊</span> عن {toUnit.name}
            </h3>
            <p className="text-sm text-gray-700">{getUnitInfo(cleanTo).history}</p>
            <p className="text-sm text-gray-700 mt-2">{getUnitInfo(cleanTo).usage}</p>
            <p className="text-xs text-gray-500 mt-2">{getUnitInfo(cleanTo).reference}</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
          <h3 className="font-bold text-amber-800 mb-2 flex items-center gap-2">
            <span>🔥</span> مقارنات حرارية من الواقع
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div><span className="font-bold">🌞 سطح الشمس:</span> 5,500°C</div>
            <div><span className="font-bold">❄️ أبرد مكان:</span> -89°C</div>
            <div><span className="font-bold">👤 جسم الإنسان:</span> 37°C</div>
            <div><span className="font-bold">💧 غليان الماء:</span> 100°C</div>
            <div><span className="font-bold">🧊 تجمد الماء:</span> 0°C</div>
            <div><span className="font-bold">☕ قهوة مثالية:</span> 60-70°C</div>
            <div><span className="font-bold">🍞 خبز الفرن:</span> 200°C</div>
            <div><span className="font-bold">🔬 الصفر المطلق:</span> -273°C</div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-xl">
          <p className="text-gray-700 text-sm leading-relaxed">
            {getPracticalTips(cleanFrom, cleanTo)}
          </p>
        </div>
      </div>

      {/* ========== أسئلة شائعة ========== */}
      <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          أسئلة شائعة عن تحويل {fromUnit.name} إلى {toUnit.name}
        </h2>
        <div className="space-y-4">
          {getFAQ(cleanFrom, cleanTo).map((item, idx) => (
            <div key={idx} className="border-b border-gray-200 pb-4">
              <h3 className="font-bold text-gray-800 mb-2">{item.q}</h3>
              <p className="text-gray-600">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ========== روابط بين الأقسام (Cross-Linking) ========== */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-200">
        <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
          <span>🔗</span> قد تحتاج أيضاً إلى:
        </h3>
        <div className="flex flex-wrap gap-3">
          <Link to="/weight/convert/kg/g" className="px-4 py-2 bg-white rounded-full text-sm shadow-sm hover:shadow-md transition">
            ⚖️ تحويل الكيلو إلى جرام
          </Link>
          <Link to="/length/convert/m/ft" className="px-4 py-2 bg-white rounded-full text-sm shadow-sm hover:shadow-md transition">
            📏 تحويل المتر إلى قدم
          </Link>
          <Link to="/currency/convert/usd/sar" className="px-4 py-2 bg-white rounded-full text-sm shadow-sm hover:shadow-md transition">
            💰 تحويل الدولار إلى ريال
          </Link>
          <Link to="/date/age-calculator" className="px-4 py-2 bg-white rounded-full text-sm shadow-sm hover:shadow-md transition">
            🎂 حساب العمر
          </Link>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          💡 نصيحة: هل تطبخ الآن؟ حوّل مقاديرك من الجرام إلى الكوب <Link to="/weight/convert/g/cup" className="text-blue-600 underline">هنا</Link>
        </p>
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

export default TemperatureConvertPair;
