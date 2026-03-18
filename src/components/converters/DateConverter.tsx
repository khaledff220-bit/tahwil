import React, { useState } from 'react';
import HijriToGregorian from './HijriToGregorian';
import GregorianToHijri from './GregorianToHijri';

const DateConverter: React.FC = () => {
  const [lastResult, setLastResult] = useState('');

  return (
    <div className="space-y-6">
      {lastResult && (
        <div className="bg-gray-100 p-3 rounded-lg text-center text-gray-600">
          آخر نتيجة: {lastResult}
        </div>
      )}
      <div className="grid md:grid-cols-2 gap-8">
        <HijriToGregorian onResult={setLastResult} />
        <GregorianToHijri onResult={setLastResult} />
      </div>
    </div>
  );
};

export default DateConverter;
