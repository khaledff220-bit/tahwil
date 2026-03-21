import React, { useState, useEffect, useCallback } from 'react';
import WeightView from './WeightView';
import { WEIGHT_UNITS, getSortedWeightUnits } from './WeightUnits';
import { convertWeight, ConversionResult, WEIGHT_KEYWORDS, GULF_WEIGHT_KEYWORDS } from './WeightLogic';

const WeightPage: React.FC = () => {
  const [units] = useState(getSortedWeightUnits());
  const [fromAmount, setFromAmount] = useState('1');
  const [toAmount, setToAmount] = useState('');
  const [fromUnit, setFromUnit] = useState('kg');
  const [toUnit, setToUnit] = useState('lb');
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>();

  // تحسين SEO: تحديث meta tags
  useEffect(() => {
    document.title = 'تحويل الوزن - حاسبة الوزن الدقيقة مع وحدات خليجية وذهب | تحويلاتي';

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content',
      'حول بين جميع وحدات الوزن بدقة عالية: كيلوجرام، رطل، أوقية، أونصة ذهب، مثقال، كوب، ملعقة. دعم خاص للوحدات الخليجية وحاسبة الذهب.'
    );

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', [...WEIGHT_KEYWORDS, ...GULF_WEIGHT_KEYWORDS].join(', '));
  }, []);

  const handleConvert = useCallback(async () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) return;

    setLoading(true);
    
    // محاكاة تأخير بسيط
    setTimeout(() => {
      const conversion = convertWeight(parseFloat(fromAmount), fromUnit, toUnit);
      if (conversion) {
        setResult(conversion);
        setToAmount(conversion.toAmount.toFixed(6));
        setLastUpdate(conversion.lastUpdate);
      }
      setLoading(false);
    }, 300);
  }, [fromAmount, fromUnit, toUnit]);

  // تحويل تلقائي عند تغيير أي قيمة (Live Calculation)
  useEffect(() => {
    handleConvert();
  }, [fromAmount, fromUnit, toUnit]);

  const handleSwapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  return (
    <WeightView
      units={units}
      result={result}
      fromAmount={fromAmount}
      toAmount={toAmount}
      fromUnit={fromUnit}
      toUnit={toUnit}
      onFromAmountChange={setFromAmount}
      onFromUnitChange={setFromUnit}
      onToUnitChange={setToUnit}
      onSwapUnits={handleSwapUnits}
      onConvert={handleConvert}
      loading={loading}
      lastUpdate={lastUpdate}
    />
  );
};

export default WeightPage;
