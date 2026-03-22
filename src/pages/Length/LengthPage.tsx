import React, { useState, useEffect, useCallback } from 'react';
import LengthView from './LengthView';
import { LENGTH_UNITS, getSortedLengthUnits } from './LengthUnits';
import { convertLength, ConversionResult, LENGTH_KEYWORDS, ARABIC_LENGTH_KEYWORDS, ASTRONOMICAL_KEYWORDS } from './LengthLogic';

const LengthPage: React.FC = () => {
  const [units] = useState(getSortedLengthUnits());
  const [fromAmount, setFromAmount] = useState('1');
  const [toAmount, setToAmount] = useState('');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('ft');
  const [activeTab, setActiveTab] = useState('metric');
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>();

  // تحسين SEO: تحديث meta tags
  useEffect(() => {
    document.title = 'تحويل الطول - حاسبة المسافات الدقيقة مع وحدات تراثية وفلكية | تحويلاتي';

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content',
      'حوّل بين جميع وحدات الطول بدقة عالية: متر، قدم، كيلومتر، ميل، بالإضافة إلى وحدات تراثية (ذراع، باع، شبر) وفلكية (سنة ضوئية، وحدة فلكية).'
    );

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', [...LENGTH_KEYWORDS, ...ARABIC_LENGTH_KEYWORDS, ...ASTRONOMICAL_KEYWORDS].join(', '));
  }, []);

  const handleConvert = useCallback(async () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) return;

    setLoading(true);
    
    setTimeout(() => {
      const conversion = convertLength(parseFloat(fromAmount), fromUnit, toUnit);
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

  // تحديث التبويب عند تغيير الوحدات
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // يمكن إضافة منطق لتصفية الوحدات حسب التبويب
  };

  return (
    <LengthView
      units={units}
      result={result}
      fromAmount={fromAmount}
      toAmount={toAmount}
      fromUnit={fromUnit}
      toUnit={toUnit}
      activeTab={activeTab}
      onFromAmountChange={setFromAmount}
      onFromUnitChange={setFromUnit}
      onToUnitChange={setToUnit}
      onSwapUnits={handleSwapUnits}
      onConvert={handleConvert}
      onTabChange={handleTabChange}
      loading={loading}
      lastUpdate={lastUpdate}
    />
  );
};

export default LengthPage;
