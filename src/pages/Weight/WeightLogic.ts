import { WEIGHT_UNITS, formatNumber } from './WeightUnits';

// ==========================================
// ملف المنطق - WeightLogic.ts
// ==========================================

export interface ConversionResult {
  fromAmount: number;
  fromUnit: string;
  toAmount: number;
  toUnit: string;
  factor: number;
  lastUpdate: string;
  formattedFromAmount: string;
  formattedToAmount: string;
  formattedFactor: string;
}

// ============ دالة التحويل الأساسية ============
export const convertWeight = (
  amount: number,
  fromUnitId: string,
  toUnitId: string
): ConversionResult | null => {
  try {
    if (!amount || amount <= 0) return null;
    
    if (fromUnitId === toUnitId) {
      return {
        fromAmount: amount,
        fromUnit: fromUnitId,
        toAmount: amount,
        toUnit: toUnitId,
        factor: 1,
        lastUpdate: new Date().toLocaleString('ar-EG'),
        formattedFromAmount: formatNumber(amount, 2),
        formattedToAmount: formatNumber(amount, 6),
        formattedFactor: formatNumber(1, 6)
      };
    }

    const fromUnit = WEIGHT_UNITS.find(u => u.id === fromUnitId);
    const toUnit = WEIGHT_UNITS.find(u => u.id === toUnitId);

    if (!fromUnit || !toUnit) return null;

    // التحويل: amount / fromUnit.factor * toUnit.factor
    const toAmount = (amount / fromUnit.factor) * toUnit.factor;
    const factor = toUnit.factor / fromUnit.factor;

    return {
      fromAmount: amount,
      fromUnit: fromUnitId,
      toAmount,
      toUnit: toUnitId,
      factor,
      lastUpdate: new Date().toLocaleString('ar-EG'),
      formattedFromAmount: formatNumber(amount, 2),
      formattedToAmount: formatNumber(toAmount, 6),
      formattedFactor: formatNumber(factor, 6)
    };
  } catch (error) {
    console.error('خطأ في تحويل الوزن:', error);
    return null;
  }
};

// ============ مبالغ ثابتة للجداول ============
export const FIXED_AMOUNTS = [1, 5, 10, 25, 50, 100, 250, 500, 750, 1000];

// ============ دوال مساعدة ============
export const getUnitNameById = (id: string): string => {
  const unit = WEIGHT_UNITS.find(u => u.id === id);
  return unit?.name || id;
};

export const getUnitSymbolById = (id: string): string => {
  const unit = WEIGHT_UNITS.find(u => u.id === id);
  return unit?.symbol || id;
};

export const getUnitIconById = (id: string): string => {
  const unit = WEIGHT_UNITS.find(u => u.id === id);
  return unit?.icon || '⚖️';
};

// ============ كلمات مفتاحية للـ SEO ============
export const WEIGHT_KEYWORDS = [
  'تحويل الوزن',
  'الكيلو كم رطل',
  'الرطل كم كيلو',
  'تحويل الكيلو إلى رطل',
  'تحويل الرطل إلى كيلو',
  'الأوقية كم جرام',
  'الطن كم كيلو',
  'تحويل المقادير',
  'أوقية الذهب كم جرام',
  'المثقال كم جرام',
  'حاسبة الوزن',
  'تحويل الوزن في السعودية',
  'تحويل الوزن في الكويت',
  'تحويل الوزن في الإمارات',
  'وزن الشحن',
  'حساب الوزن الحجمي',
  'الرطل السعودي كم كيلو',
  'سعر أوقية الذهب',
  'المثقال كم جرام ذهب',
  'تحويل المن إلى كيلو',
  'الدرهم كم جرام',
  'وزن الذهب في السعودية',
  'حاسبة الذهب'
];

export const GULF_WEIGHT_KEYWORDS = [
  'الرطل السعودي',
  'أوقية الذهب اليوم',
  'سعر أوقية الذهب',
  'المثقال كم جرام',
  'تحويل المن',
  'الدرهم كم جرام',
  'وزن الذهب',
  'حاسبة الذهب',
  'تحويل المقادير بالكوب',
  'كم جرام في الملعقة'
];
