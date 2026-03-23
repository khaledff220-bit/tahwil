import React, { useState, useMemo, useEffect } from 'react';
import { ANCIENT_UNITS, getUnitById } from './AncientUnits';
import AncientView from './AncientView';

const AncientPage: React.FC = () => {
  const [amount, setAmount] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState<string>('cubit'); // ذراع
  const [toUnit, setToUnit] = useState<string>('meter');    // متر
  const [lastUpdate, setLastUpdate] = useState<string>(new Date().toLocaleString('ar-EG'));

  // تحديث وقت آخر تحديث
  useEffect(() => {
    setLastUpdate(new Date().toLocaleString('ar-EG'));
  }, [amount, fromUnit, toUnit]);

  // الحصول على كائنات الوحدات المختارة
  const fromUnitObj = useMemo(() => getUnitById(fromUnit), [fromUnit]);
  const toUnitObj = useMemo(() => getUnitById(toUnit), [toUnit]);

  // ✅ الحساب الصحيح: (القيمة × قيمة الوحدة المصدر) ÷ قيمة الوحدة الهدف
  const result = useMemo(() => {
    if (!fromUnitObj || !toUnitObj) return 0;
    return (amount * fromUnitObj.factor) / toUnitObj.factor;
  }, [amount, fromUnit, toUnit, fromUnitObj, toUnitObj]);

  return (
    <AncientView
      amount={amount}
      setAmount={setAmount}
      fromUnit={fromUnit}
      setFromUnit={setFromUnit}
      toUnit={toUnit}
      setToUnit={setToUnit}
      result={result}
      lastUpdate={lastUpdate}
    />
  );
};

export default AncientPage;
