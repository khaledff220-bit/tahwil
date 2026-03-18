import React, { useState, useCallback, useEffect } from 'react';
import CompareDateView from './CompareDateView';
import { compareDates, CompareResult, getDefaultDate } from './CompareDateLogic';

const CompareDatePage: React.FC = () => {
  // تعيين قيم افتراضية: تاريخ اليوم وتاريخ قبل 30 يوماً
  const [date1, setDate1] = useState<string>(getDefaultDate(30));
  const [date2, setDate2] = useState<string>(getDefaultDate(0));
  const [result, setResult] = useState<CompareResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // تحسين SEO: تحديث meta tags
  useEffect(() => {
    document.title = 'مقارنة التواريخ - حساب الفرق بين تاريخين بالهجري والميلادي';

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content',
      'احسب الفرق بين تاريخين بالهجري والميلادي. أداة دقيقة لحساب المدة بين تاريخين بالسنوات والأشهر والأيام والأسابيع والساعات.'
    );

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 
      'مقارنة تواريخ, الفرق بين تاريخين, حساب المدة بين تاريخين, فرق التاريخ, كم مضى على تاريخ'
    );
  }, []);

  const handleCompare = useCallback(async () => {
    if (!date1 || !date2) {
      setError('الرجاء إدخال التاريخين');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const comparison = await compareDates(date1, date2);
      
      if (comparison) {
        setResult(comparison);
      } else {
        setError('حدث خطأ في المقارنة. تأكد من صحة التواريخ.');
      }
    } catch (err) {
      setError('حدث خطأ غير متوقع');
    } finally {
      setIsLoading(false);
    }
  }, [date1, date2]);

  // تشغيل مقارنة تلقائية عند تحميل الصفحة
  useEffect(() => {
    handleCompare();
  }, []);

  return (
    <CompareDateView
      result={result}
      date1={date1}
      date2={date2}
      onDate1Change={setDate1}
      onDate2Change={setDate2}
      onCompare={handleCompare}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default CompareDatePage;
