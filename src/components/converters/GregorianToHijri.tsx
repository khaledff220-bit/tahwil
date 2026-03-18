import React, { useState, useEffect } from 'react';
import { GREGORIAN_MONTHS } from '@/lib/constants';
import { convertGregorianToHijri, getDaysArray, getDaysInGregorianMonth } from '@/lib/dateUtils';
import Select from '@/components/common/Select';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';

interface GregorianToHijriProps {
  onResult?: (result: string) => void;
}

const GregorianToHijri: React.FC<GregorianToHijriProps> = ({ onResult }) => {
  const [day, setDay] = useState('1');
  const [month, setMonth] = useState(GREGORIAN_MONTHS[0]);
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [isConverting, setIsConverting] = useState(false);

  // تحديث أيام الشهر ديناميكياً
  useEffect(() => {
    const yearNum = parseInt(year) || 2024;
    const daysCount = getDaysInGregorianMonth(month, yearNum);
    const currentDay = parseInt(day);
    if (currentDay > daysCount) {
      setDay(daysCount.toString());
    }
  }, [month, year]);

  const handleConvert = async () => {
    setError('');
    setResult('');
    setIsConverting(true);
    
    try {
      const dayNum = parseInt(day);
      const yearNum = parseInt(year);

      // التحقق من صحة المدخلات
      if (isNaN(dayNum) || dayNum < 1 || dayNum > 31) {
        throw new Error('اليوم يجب أن يكون بين 1 و 31');
      }

      if (isNaN(yearNum) || yearNum < 1900 || yearNum > 2100) {
        throw new Error('السنة يجب أن تكون بين 1900 و 2100');
      }

      // استدعاء API للتحويل
      const res = await convertGregorianToHijri(dayNum, month, yearNum);
      
      if (res.success) {
        setResult(res.result);
        if (onResult) onResult(res.result);
      } else {
        throw new Error(res.error || 'فشل التحويل');
      }
    } catch (err: any) {
      setError(err.message || 'حدث خطأ غير متوقع');
    } finally {
      setIsConverting(false);
    }
  };

  const daysCount = getDaysInGregorianMonth(month, parseInt(year) || 2024);

  return (
    <Card title="من ميلادي إلى هجري" color="blue">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select 
            label="اليوم" 
            value={day} 
            onChange={setDay} 
            options={getDaysArray(daysCount).map(String)} 
            color="blue"
          />
          <Select 
            label="الشهر الميلادي" 
            value={month} 
            onChange={setMonth} 
            options={GREGORIAN_MONTHS} 
            color="blue"
          />
          <Input 
            label="السنة" 
            value={year} 
            onChange={setYear} 
            type="number" 
            placeholder="2024"
            color="blue"
            min={1900}
            max={2100}
          />
        </div>

        <Button 
          onClick={handleConvert} 
          color="blue" 
          fullWidth
          disabled={isConverting}
        >
          {isConverting ? 'جاري التحويل...' : 'تحويل إلى هجري'}
        </Button>

        {error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        {result && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
            <p className="text-sm text-blue-600 mb-1">النتيجة:</p>
            <p className="text-xl font-bold text-blue-900">{result}</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default GregorianToHijri;
