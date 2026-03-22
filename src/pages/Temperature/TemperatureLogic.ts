import { TEMPERATURE_UNITS, formatNumber } from './TemperatureUnits';
import { ConversionResult } from './TemperatureTypes';

// ==========================================
// ملف المنطق - TemperatureLogic.ts
// ==========================================

// دوال التحويل الأساسية
const convertToCelsius = (value: number, fromUnit: string): number => {
  switch (fromUnit) {
    case 'celsius': return value;
    case 'fahrenheit': return (value - 32) * 5 / 9;
    case 'kelvin': return value - 273.15;
    case 'rankine': return (value - 491.67) * 5 / 9;
    case 'reaumur': return value * 1.25;
    case 'romer': return (value - 7.5) * 40 / 21;
    case 'newton': return value * 100 / 33;
    case 'delisle': return 100 - (value * 2 / 3);
    default: return value;
  }
};

const convertFromCelsius = (celsius: number, toUnit: string): number => {
  switch (toUnit) {
    case 'celsius': return celsius;
    case 'fahrenheit': return celsius * 9 / 5 + 32;
    case 'kelvin': return celsius + 273.15;
    case 'rankine': return (celsius + 273.15) * 9 / 5;
    case 'reaumur': return celsius * 0.8;
    case 'romer': return celsius * 21 / 40 + 7.5;
    case 'newton': return celsius * 33 / 100;
    case 'delisle': return (100 - celsius) * 1.5;
    default: return celsius;
  }
};

export const convertTemperature = (
  amount: number,
  fromUnitId: string,
  toUnitId: string
): ConversionResult | null => {
  try {
    if (!amount && amount !== 0) return null;

    if (fromUnitId === toUnitId) {
      const unit = TEMPERATURE_UNITS.find(u => u.id === fromUnitId);
      return {
        fromAmount: amount,
        fromUnit: fromUnitId,
        toAmount: amount,
        toUnit: toUnitId,
        factor: 1,
        lastUpdate: new Date().toLocaleString('ar-EG'),
        formattedFromAmount: formatNumber(amount, 2),
        formattedToAmount: formatNumber(amount, 2),
        formattedFactor: formatNumber(1, 2)
      };
    }

    const celsius = convertToCelsius(amount, fromUnitId);
    const toAmount = convertFromCelsius(celsius, toUnitId);

    return {
      fromAmount: amount,
      fromUnit: fromUnitId,
      toAmount,
      toUnit: toUnitId,
      factor: toAmount / amount,
      lastUpdate: new Date().toLocaleString('ar-EG'),
      formattedFromAmount: formatNumber(amount, 2),
      formattedToAmount: formatNumber(toAmount, 2),
      formattedFactor: formatNumber(toAmount / amount, 4)
    };
  } catch (error) {
    console.error('خطأ في تحويل الحرارة:', error);
    return null;
  }
};

// مبالغ ثابتة للجداول (درجات حرارة مهمة)
export const CRITICAL_TEMPERATURES = [
  { name: 'تجمد الماء', celsius: 0, fahrenheit: 32, kelvin: 273.15 },
  { name: 'غليان الماء', celsius: 100, fahrenheit: 212, kelvin: 373.15 },
  { name: 'حرارة جسم الإنسان', celsius: 37, fahrenheit: 98.6, kelvin: 310.15 },
  { name: 'الصفر المطلق', celsius: -273.15, fahrenheit: -459.67, kelvin: 0 },
];

export const FIXED_AMOUNTS = [0, 10, 20, 25, 30, 37, 50, 75, 100, 200];

// كلمات مفتاحية للـ SEO
export const TEMPERATURE_KEYWORDS = [
  'تحويل الحرارة',
  'تحويل درجة الحرارة',
  'سيلزيوس إلى فهرنهايت',
  'فهرنهايت إلى سيلزيوس',
  'كلفن إلى سيلزيوس',
  'وحدة قياس الحرارة',
  'مقياس الحرارة',
  'تحويل درجات الحرارة'
];

export const HISTORICAL_KEYWORDS = [
  'مقياس رومر',
  'مقياس ريومور',
  'مقياس نيوتن',
  'مقياس ديليه',
  'وحدات حرارة تاريخية'
];
