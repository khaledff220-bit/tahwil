import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AncientUnit, AncientViewProps } from './AncientTypes';
import { ANCIENT_UNITS, getUnitsByCategory, formatNumber } from './AncientUnits';

const AncientView: React.FC<AncientViewProps> = ({
  amount,
  setAmount,
  fromUnit,
  setFromUnit,
  toUnit,
  setToUnit,
  result,
  loading = false,
  lastUpdate
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const fromUnitObj = ANCIENT_UNITS.find(u => u.id === fromUnit);
    const toUnitObj = ANCIENT_UNITS.find(u => u.id === toUnit);
    if (fromUnitObj && toUnitObj) {
      const text = `${formatNumber(amount)} ${fromUnitObj.name} = ${formatNumber(result)} ${toUnitObj.name}`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // الحصول على فئة الوحدة المصدر
  const selectedFromUnit = ANCIENT_UNITS.find(u => u.id === fromUnit);
  const fromCategory = selectedFromUnit?.category || 'length';

  // فلترة الوحدات حسب الفئة
  const lengthUnits = getUnitsByCategory('length');
  const weightUnits = getUnitsByCategory('weight');

  // عند تغيير الوحدة المصدر، تأكد أن الوحدة الهدف من نفس الفئة
  useEffect(() => {
    const currentToUnit = ANCIENT_UNITS.find(u => u.id === toUnit);
    if (currentToUnit && currentToUnit.category !== fromCategory) {
      const firstUnitOfCategory = ANCIENT_UNITS.find(u => u.category === fromCategory);
      if (firstUnitOfCategory) {
        setToUnit(firstUnitOfCategory.id);
      }
    }
  }, [fromUnit, fromCategory, toUnit, setToUnit]);

  // القيم الثابتة للجدول
  const fixedAmounts = [1, 2, 5, 10, 25, 50, 100, 250, 500];
  const fromUnitObj = ANCIENT_UNITS.find(u => u.id === fromUnit);
  const toUnitObj = ANCIENT_UNITS.find(u => u.id === toUnit);

  const conversionTable = fromUnitObj && toUnitObj ? fixedAmounts.map(amt => ({
    from: amt,
    fromFormatted: formatNumber(amt, 0),
    to: (amt * fromUnitObj.factor) / toUnitObj.factor,
    toFormatted: formatNumber((amt * fromUnitObj.factor) / toUnitObj.factor, 4)
  })) : [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 font-cairo" dir="rtl">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm mb-6 text-gray-500 bg-white p-3 rounded-lg shadow-sm">
        <Link to="/" className="hover:text-amber-600 transition">الرئيسية</Link>
        <span>/</span>
        <span className="text-amber-700 font-bold">المقاييس التراثية</span>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-l from-amber-600 to-orange-600 rounded-3xl p-8 text-center text-white mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          المقاييس التراثية العربية
        </h1>
        <p className="opacity-90 text-lg">
          وحدات القياس التي استخدمها أجدادنا: الذراع، الشبر، المن، المثقال
        </p>
      </div>

      {/* Glassmorphism Card */}
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">
        <div className="bg-gradient-to-l from-amber-600 to-orange-600 p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">تحويل الوحدات التراثية</h2>
          <p className="opacity-90">حوّل بين وحدات الطول والوزن التراثية والحديثة بدقة</p>
        </div>

        <div className="p-8">
          {/* حقل القيمة */}
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2 text-right">
              القيمة
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              className="w-full p-4 text-2xl border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition active:scale-95"
              placeholder="أدخل القيمة"
              step="any"
              min="0"
            />
          </div>

          {/* قائمة "من" */}
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2 text-right">
              من
            </label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition bg-white"
            >
              <optgroup label="📏 وحدات الطول التراثية">
                {lengthUnits.map(unit => (
                  <option key={unit.id} value={unit.id}>
                    {unit.icon} {unit.name} ({unit.symbol})
                  </option>
                ))}
              </optgroup>
              <optgroup label="⚖️ وحدات الوزن التراثية">
                {weightUnits.map(unit => (
                  <option key={unit.id} value={unit.id}>
                    {unit.icon} {unit.name} ({unit.symbol})
                  </option>
                ))}
              </optgroup>
              <optgroup label="📏 وحدات الطول الحديثة">
                <option value="meter">📏 متر (م)</option>
                <option value="kilometer">🏃 كيلومتر (كم)</option>
                <option value="centimeter">📏 سنتيمتر (سم)</option>
              </optgroup>
              <optgroup label="⚖️ وحدات الوزن الحديثة">
                <option value="kilogram">⚖️ كيلوجرام (كجم)</option>
                <option value="gram">⚖️ جرام (جم)</option>
              </optgroup>
            </select>
          </div>

          {/* زر التبديل */}
          <div className="flex justify-center my-4">
            <button
              onClick={() => {
                setFromUnit(toUnit);
                setToUnit(fromUnit);
              }}
              className="bg-amber-100 hover:bg-amber-200 text-amber-600 p-4 rounded-full transition transform hover:rotate-180 duration-500 active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </button>
          </div>

          {/* قائمة "إلى" - فقط وحدات من نفس الفئة */}
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2 text-right">
              إلى
            </label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition bg-white"
            >
              {fromCategory === 'length' ? (
                <>
                  <optgroup label="📏 وحدات الطول التراثية">
                    {lengthUnits.map(unit => (
                      <option key={unit.id} value={unit.id}>
                        {unit.icon} {unit.name} ({unit.symbol})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="📏 وحدات الطول الحديثة">
                    <option value="meter">📏 متر (م)</option>
                    <option value="kilometer">🏃 كيلومتر (كم)</option>
                    <option value="centimeter">📏 سنتيمتر (سم)</option>
                  </optgroup>
                </>
              ) : (
                <>
                  <optgroup label="⚖️ وحدات الوزن التراثية">
                    {weightUnits.map(unit => (
                      <option key={unit.id} value={unit.id}>
                        {unit.icon} {unit.name} ({unit.symbol})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="⚖️ وحدات الوزن الحديثة">
                    <option value="kilogram">⚖️ كيلوجرام (كجم)</option>
                    <option value="gram">⚖️ جرام (جم)</option>
                  </optgroup>
                </>
              )}
            </select>
          </div>

          {/* زر التحويل */}
          <button
            onClick={() => {}} // التحويل تلقائي بسبب useMemo
            disabled={loading}
            className="w-full bg-gradient-to-l from-amber-600 to-orange-600 text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all duration-200 hover:-translate-y-1 active:scale-95 disabled:opacity-50"
          >
            {loading ? 'جاري التحويل...' : 'تحويل'}
          </button>

          {/* النتيجة */}
          {result > 0 && (
            <div className="mt-6 bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-100">
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-600">
                  {formatNumber(result)} {toUnitObj?.symbol}
                </div>
                <div className="text-gray-600 mt-2">
                  {formatNumber(amount)} {fromUnitObj?.name} = {formatNumber(result)} {toUnitObj?.name}
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
            جدول تحويل {fromUnitObj?.name} إلى {toUnitObj?.name}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {conversionTable.slice(0, 10).map((item, idx) => (
              <div key={idx} className="bg-gray-50 p-3 rounded-xl text-center hover:bg-amber-50 transition">
                <div className="text-sm text-gray-500">{item.fromFormatted} {fromUnitObj?.symbol}</div>
                <div className="font-bold text-gray-800">=</div>
                <div className="text-amber-600 font-bold">{item.toFormatted} {toUnitObj?.symbol}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* محتوى SEO غني */}
      <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold text-amber-700 mb-4">عن المقاييس التراثية العربية</h2>
        <p className="text-gray-700 leading-relaxed">
          وحدات القياس التراثية العربية كانت تعتمد على أبعاد جسم الإنسان والبيئة المحيطة.
          <strong>الذراع</strong> هو طول الساعد من المرفق إلى طرف الأصابع (≈ 46 سم)، 
          <strong>الشبر</strong> هو المسافة بين طرف الإبهام والخنصر (≈ 23 سم)،
          <strong>القامة</strong> هي المسافة بين اليدين الممدودتين (≈ 1.85 متر)، 
          و<strong>الفرسخ</strong> كان يستخدم للمسافات الطويلة (≈ 5.5 كم).
          <br /><br />
          <strong className="text-amber-800">العلاقة بين الوحدات:</strong> الذراع ≈ 2 شبر، القامة ≈ 4 أذرع، الفرسخ ≈ 12,000 ذراع.
        </p>
        <p className="text-gray-700 leading-relaxed mt-2">
          أما أوزان الذهب والمجوهرات فكانت تقاس بـ <strong>المثقال</strong> (4.25 جرام) و <strong>الدرهم</strong> (2.97 جرام)،
          بينما استخدم <strong>المن</strong> (800 جرام) و <strong>الرطل السعودي</strong> (453 جرام) في الأسواق المحلية.
        </p>
      </div>

      {/* روابط سريعة */}
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

export default AncientView;
