import React, { useState, useEffect, useCallback } from 'react';
import CurrencyView from './CurrencyView';
import {
  getSortedCurrencies,
  convertCurrency,
  fetchExchangeRates,
  generateMetaDescription
} from './CurrencyLogic';
import { ConversionResult } from './CurrencyTypes';

const CurrencyPage: React.FC = () => {
  const [currencies] = useState(getSortedCurrencies());
  const [fromAmount, setFromAmount] = useState('1');
  const [toAmount, setToAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('SAR');
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>();

  // تحسين SEO - تحديث meta tags ديناميكياً
  useEffect(() => {
    const fromName = currencies.find(c => c.code === fromCurrency)?.name || fromCurrency;
    const toName = currencies.find(c => c.code === toCurrency)?.name || toCurrency;

    document.title = `تحويل ${fromName} إلى ${toName} - سعر الصرف اليوم`;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }

    const description = result
      ? generateMetaDescription(fromName, toName, result.rate)
      : generateMetaDescription(fromName, toName);

    metaDescription.setAttribute('content', description);

    // كلمات مفتاحية خليجية
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content',
      'تحويل العملات, سعر الدولار, سعر الريال, سعر اليورو, الدينار الكويتي, الدرهم الإماراتي, صرف العملات, تحويل عملات'
    );
  }, [fromCurrency, toCurrency, result]);

  // تحديث الأسعار عند تغيير العملات
  useEffect(() => {
    const performConversion = async () => {
      if (!fromAmount || parseFloat(fromAmount) <= 0) return;

      setLoading(true);
      try {
        const conversion = await convertCurrency(
          parseFloat(fromAmount),
          fromCurrency,
          toCurrency
        );

        if (conversion) {
          setResult(conversion);
          setToAmount(conversion.toAmount.toFixed(2));
          setLastUpdate(conversion.lastUpdate);
        }
      } catch (error) {
        console.error('خطأ في التحويل:', error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(performConversion, 300);
    return () => clearTimeout(timeoutId);
  }, [fromAmount, fromCurrency, toCurrency]);

  // تحميل الأسعار الأولية
  useEffect(() => {
    const loadInitialRates = async () => {
      const rates = await fetchExchangeRates('USD');
      if (rates) {
        setLastUpdate(new Date(rates.timestamp).toLocaleString('ar-EG'));
      }
    };
    loadInitialRates();
  }, []);

  const handleSwapCurrencies = useCallback(() => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }, [fromCurrency, toCurrency]);

  return (
    <>
      <link rel="canonical" href="https://tahwil-three.vercel.app/currency" />
      
      <CurrencyView
        currencies={currencies}
        result={result}
        fromAmount={fromAmount}
        toAmount={toAmount}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        onFromAmountChange={setFromAmount}
        onFromCurrencyChange={setFromCurrency}
        onToCurrencyChange={setToCurrency}
        onSwapCurrencies={handleSwapCurrencies}
        onConvert={() => {}}
        loading={loading}
        lastUpdate={lastUpdate}
      />
    </>
  );
};

export default CurrencyPage;
