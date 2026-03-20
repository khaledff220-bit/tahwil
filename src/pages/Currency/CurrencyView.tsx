import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Currency, ConversionResult } from './CurrencyTypes';
import { getCurrencySymbol, getCurrencyName } from './CurrencyLogic';

interface CurrencyViewProps {
  currencies: Currency[];
  result: ConversionResult | null;
  fromAmount: string;
  toAmount: string;
  fromCurrency: string;
  toCurrency: string;
  onFromAmountChange: (value: string) => void;
  onFromCurrencyChange: (value: string) => void;
  onToCurrencyChange: (value: string) => void;
  onSwapCurrencies: () => void;
  onConvert: () => void;
  loading: boolean;
  lastUpdate?: string;
}

const CurrencyView: React.FC<CurrencyViewProps> = ({
  currencies,
  result,
  fromAmount,
  toAmount,
  fromCurrency,
  toCurrency,
  onFromAmountChange,
  onFromCurrencyChange,
  onToCurrencyChange,
  onSwapCurrencies,
  onConvert,
  loading,
  lastUpdate
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (result) {
      const text = `${result.fromAmount} ${getCurrencyName(result.fromCurrency)} = ${result.toAmount.toFixed(2)} ${getCurrencyName(result.toCurrency)} (سعر الصرف: ${result.rate.toFixed(4)})`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // بيانات منظمة للـ SEO
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ExchangeRateSpecification",
    "name": "محول العملات",
    "description": "تحويل العملات بين جميع العملات العربية والعالمية",
    "currency": currencies.map(c => c.code),
    "provider": {
      "@type": "Organization",
      "name": "تحويلاتي",
      "url": "https://tahwilati.com"
    }
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
          <span className="text-blue-700 font-bold">تحويل العملات</span>
        </nav>

        {/* Glassmorphism Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          {/* Header */}
          <div className="bg-gradient-to-l from-blue-600 to-cyan-600 p-8 text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              تحويل العملات
            </h1>
            <p className="opacity-90 text-lg">
              حول بين أكثر من 50 عملة عربية وعالمية بأسعار محدثة
            </p>
          </div>

          <div className="p-8">
            {/* حقل المبلغ */}
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2 text-right">
                المبلغ
              </label>
              <input
                type="number"
                value={fromAmount}
                onChange={(e) => onFromAmountChange(e.target.value)}
                className="w-full p-4 text-2xl border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                placeholder="أدخل المبلغ"
                step="any"
                min="0"
              />
            </div>

            {/* عملة المصدر */}
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2 text-right">
                من
              </label>
              <select
                value={fromCurrency}
                onChange={(e) => onFromCurrencyChange(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition bg-white"
              >
                {currencies.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.flag} {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>

            {/* زر التبديل */}
            <div className="flex justify-center my-4">
              <button
                onClick={onSwapCurrencies}
                className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-4 rounded-full transition transform hover:rotate-180 duration-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </button>
            </div>

            {/* عملة الهدف */}
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2 text-right">
                إلى
              </label>
              <select
                value={toCurrency}
                onChange={(e) => onToCurrencyChange(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition bg-white"
              >
                {currencies.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.flag} {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>

            {/* زر التحويل */}
            <button
              onClick={onConvert}
              disabled={loading || !fromAmount}
              className="w-full bg-gradient-to-l from-blue-600 to-cyan-600 text-white py-4 rounded-xl font-bold hover:shadow-lg transition disabled:opacity-50 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? 'جاري التحويل...' : 'تحويل'}
            </button>

            {/* النتيجة */}
            {result && !loading && (
              <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-100">
                  <div className="text-center mb-4">
                    <span className="text-sm text-gray-500">النتيجة</span>
                    <div className="text-3xl md:text-4xl font-bold text-blue-600 mt-2">
                      {toAmount} {getCurrencySymbol(toCurrency)}
                    </div>
                    <div className="text-gray-600 mt-2">
                      1 {getCurrencySymbol(fromCurrency)} = {result.rate.toFixed(4)} {getCurrencySymbol(toCurrency)}
                    </div>
                  </div>

                  {lastUpdate && (
                    <div className="text-xs text-gray-400 text-center mt-4">
                      آخر تحديث: {lastUpdate}
                    </div>
                  )}

                  <button
                    onClick={handleCopy}
                    className="w-full mt-4 bg-gray-800 text-white py-3 rounded-xl hover:bg-black transition flex items-center justify-center gap-2"
                  >
                    <span>📋</span>
                    {copied ? '✅ تم النسخ' : 'نسخ النتيجة'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* محتوى SEO - العملات العربية */}
        <div className="mt-12 bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            العملات العربية المدعومة
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {currencies.filter(c => c.isArabic).map(c => (
              <Link
                key={c.code}
                to={`/currency/convert/${c.code.toLowerCase()}/egp`}
                className="bg-white p-4 rounded-xl text-center shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-500 hover:bg-blue-50 transition-all flex flex-col items-center justify-center"
              >
                <span className="text-3xl mb-2">{c.flag || "🏁"}</span>
                <div className="font-bold text-gray-800">{c.code}</div>
                <div className="text-xs text-gray-500">{c.name}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* أسئلة شائعة - فريدة تماماً */}
        <div className="mt-8 bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            أسئلة شائعة عن تحويل العملات
          </h2>
          
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-bold text-gray-800 mb-2">
                كيف يمكنني تحويل الدولار إلى ريال سعودي في تحويلاتي؟
              </h3>
              <p className="text-gray-600">
                كل ما عليك هو اختيار الدولار الأمريكي (USD) من القائمة الأولى، والريال السعودي (SAR) من القائمة الثانية، ثم إدخال المبلغ الذي تريد تحويله. النتيجة ستظهر فوراً مع سعر الصرف المحدث.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-bold text-gray-800 mb-2">
                كم عدد العملات المدعومة في أداة تحويل العملات؟
              </h3>
              <p className="text-gray-600">
                تدعم أداة تحويل العملات في تحويلاتي أكثر من 50 عملة مختلفة، تشمل جميع العملات العربية الرئيسية (الريال السعودي، الدرهم الإماراتي، الدينار الكويتي...) والعملات العالمية الكبرى (الدولار، اليورو، الجنيه الإسترليني...).
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-bold text-gray-800 mb-2">
                هل أسعار العملات محدثة بشكل لحظي؟
              </h3>
              <p className="text-gray-600">
                نعم، يتم تحديث الأسعار كل ساعة من مصادر موثوقة. كما نقوم بتخزين الأسعار في متصفحك لتتمكن من استخدام الأداة حتى بدون إنترنت (آخر الأسعار المخزنة).
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-bold text-gray-800 mb-2">
                ما هو سعر الدولار مقابل الريال السعودي اليوم؟
              </h3>
              <p className="text-gray-600">
                يمكنك معرفة سعر الدولار مقابل الريال السعودي اليوم مباشرة باستخدام الأداة أعلاه. فقط اختر USD إلى SAR وستظهر لك النتيجة مع سعر الصرف المحدث.
              </p>
            </div>

            <div className="pb-4">
              <h3 className="font-bold text-gray-800 mb-2">
                كيف أحول الدينار الكويتي إلى دولار؟
              </h3>
              <p className="text-gray-600">
                لتحويل الدينار الكويتي (KWD) إلى الدولار الأمريكي (USD)، اختر KWD في القائمة الأولى و USD في القائمة الثانية، ثم أدخل المبلغ. ستظهر لك النتيجة فوراً مع سعر الصرف.
              </p>
            </div>
          </div>
        </div>

        {/* روابط سريعة */}
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
    </>
  );
};

export default CurrencyView;
