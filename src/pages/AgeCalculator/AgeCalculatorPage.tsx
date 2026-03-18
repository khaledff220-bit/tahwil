import React, { useState, useCallback, useEffect } from 'react';
import AgeCalculatorView from './AgeCalculatorView';
import { calculateDetailedAge, AgeResult, GULF_KEYWORDS } from './AgeCalculatorLogic';

const AgeCalculatorPage: React.FC = () => {
  const [day, setDay] = useState('1');
  const [month, setMonth] = useState('1');
  const [year, setYear] = useState('');
  const [ageResult, setAgeResult] = useState<AgeResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // تحسين SEO: تحديث meta tags
  useEffect(() => {
    document.title = 'حساب العمر بالهجري والميلادي - حاسبة العمر الدقيقة';

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content',
      'احسب عمرك بالهجري والميلادي بدقة عالية. حاسبة العمر توفر لك عمرك بالسنوات والأشهر والأيام مع تفاصيل الأبراج والفصول.'
    );

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', GULF_KEYWORDS.join(', '));
  }, []);

  const handleCalculate = useCallback(async () => {
    if (!year || isNaN(Number(year))) {
      setError('الرجاء إدخال سنة ميلاد صحيحة (مثال: 1976)');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // دمج التاريخ في صيغة YYYY-MM-DD ليقبلها محرك التواريخ
      const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      const result = await calculateDetailedAge(formattedDate);

      if (result) {
        setAgeResult(result);
      } else {
        setError('تاريخ غير صحيح. تأكد من عدد أيام الشهر.');
      }
    } catch (err) {
      setError('حدث خطأ غير متوقع');
    } finally {
      setIsLoading(false);
    }
  }, [day, month, year]);

  return (
    <AgeCalculatorView
      ageResult={ageResult}
      day={day}
      month={month}
      year={year}
      onDayChange={setDay}
      onMonthChange={setMonth}
      onYearChange={setYear}
      onCalculate={handleCalculate}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default AgeCalculatorPage;
