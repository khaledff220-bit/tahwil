import React, { useState } from 'react';
import { HIJRI_MONTHS } from '@/lib/constants';
import { convertHijriToGregorian, getDaysArray } from '@/lib/dateUtils';
import Select from '@/components/common/Select';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';

interface HijriToGregorianProps {
  onResult?: (result: string) => void;
}

const HijriToGregorian: React.FC<HijriToGregorianProps> = ({ onResult }) => {
  const [day, setDay] = useState('1');
  const [month, setMonth] = useState(HIJRI_MONTHS[0]);
  const [year, setYear] = useState('1445');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [isConverting, setIsConverting] = useState(false);

  const handleConvert = async () => {
    setError('');
    setResult('');
    setIsConverting(true);
    
    try {
      const dayNum = parseInt(day);
      const yearNum = parseInt(year);

      // التحقق من صحة المدخلات
      if (isNaN(dayNum) || dayNum < 1 || dayNum > 30) {
        throw new Error('اليوم يجب أن يكون بين 1 و 30');
      }

      if (isNaN(yearNum) || yearNum < 1000 || yearNum > 1500) {
        throw new Error('السنة يجب أن تكون بين 1000 و 1500');
      }

      // استدعاء API للتحويل
      const res = await convertHijriToGregorian(dayNum, month, yearNum);
      
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

  return (
    <Card title="من هجري إلى ميلادي" color="green">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select 
            label="اليوم" 
            value={day} 
            onChange={setDay} 
            options={getDaysArray(30).map(String)} 
            color="green"
          />
          <Select 
            label="الشهر الهجري" 
            value={month} 
            onChange={setMonth} 
            options={HIJRI_MONTHS} 
            color="green"
          />
          <Input 
            label="السنة" 
            value={year} 
            onChange={setYear} 
            type="number" 
            placeholder="1445"
            color="green"
            min={1000}
            max={1500}
          />
        </div>

        <Button 
          onClick={handleConvert} 
          color="green" 
          fullWidth
          disabled={isConverting}
        >
          {isConverting ? 'جاري التحويل...' : 'تحويل إلى ميلادي'}
        </Button>

        {error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        {result && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-center">
            <p className="text-sm text-green-600 mb-1">النتيجة:</p>
            <p className="text-xl font-bold text-green-900">{result}</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default HijriToGregorian;
