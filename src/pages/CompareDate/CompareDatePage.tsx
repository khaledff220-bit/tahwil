import React, { useState, useEffect } from 'react';
import CompareDateView from './CompareDateView';
import { compareDates, CompareResult, getDefaultDate } from './CompareDateLogic';

const CompareDatePage: React.FC = () => {
  // استخدام الكائنات لضمان التوافق مع الـ View والـ Logic
  const [date1, setDate1] = useState(getDefaultDate(30)); 
  const [date2, setDate2] = useState(getDefaultDate(0));
  const [result, setResult] = useState<CompareResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // تحسين SEO: تحديث meta tags
  useEffect(() => {
    document.title = 'مقارنة التواريخ - حساب الفرق بين تاريخين بالهجري والميلادي';
  }, []);

  // المحرك الرئيسي: يراقب date1 و date2 ويعيد الحساب فوراً
  useEffect(() => {
    const performComparison = async () => {
      if (!date1 || !date2) return;

      setIsLoading(true);
      setError('');

      try {
        const comparison = await compareDates(date1, date2);
        if (comparison) {
          setResult(comparison);
        } else {
          setError('يرجى التأكد من صحة التواريخ');
        }
      } catch (err) {
        setError('حدث خطأ أثناء الحساب');
      } finally {
        setIsLoading(false);
      }
    };

    performComparison();
  }, [date1, date2]); // التحديث التلقائي اللحظي هنا!

  return (
    <CompareDateView
      date1={date1}
      date2={date2}
      onDate1Change={setDate1}
      onDate2Change={setDate2}
      result={result}
      loading={isLoading}
      error={error}
    />
  );
};

export default CompareDatePage;
