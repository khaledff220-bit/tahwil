import React, { useState, useEffect, useCallback } from 'react';
import TemperatureView from './TemperatureView';
import { TEMPERATURE_UNITS, getSortedTemperatureUnits } from './TemperatureUnits';
import { convertTemperature, ConversionResult, TEMPERATURE_KEYWORDS, HISTORICAL_KEYWORDS } from './TemperatureLogic';

const TemperaturePage: React.FC = () => {
  const [units] = useState(getSortedTemperatureUnits());
  const [fromAmount, setFromAmount] = useState('37');
  const [toAmount, setToAmount] = useState('');
  const [fromUnit, setFromUnit] = useState('celsius');
  const [toUnit, setToUnit] = useState('fahrenheit');
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>();

  // تحسين SEO: تحديث meta tags
  useEffect(() => {
    document.title = 'تحويل درجات الحرارة | حاسبة دقيقة وشاملة';

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content',
      'حوّل بين 8 وحدات حرارة مختلفة: سيلزيوس، فهرنهايت، كلفن، رنكين، ريومور، رومر، نيوتن، ديليه. أداة دقيقة مع محتوى تعليمي غني.'
    );

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', [...TEMPERATURE_KEYWORDS, ...HISTORICAL_KEYWORDS].join(', '));
  }, []);

  const handleConvert = useCallback(async () => {
    if (!fromAmount) return;

    setLoading(true);
    
    setTimeout(() => {
      const conversion = convertTemperature(parseFloat(fromAmount), fromUnit, toUnit);
      if (conversion) {
        setResult(conversion);
        setToAmount(conversion.formattedToAmount);
        setLastUpdate(conversion.lastUpdate);
      }
      setLoading(false);
    }, 300);
  }, [fromAmount, fromUnit, toUnit]);

  // تحويل تلقائي عند تغيير أي قيمة
  useEffect(() => {
    handleConvert();
  }, [fromAmount, fromUnit, toUnit]);

  const handleSwapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  return (
    <TemperatureView
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

export default TemperaturePage;
