
import { LENGTH_UNITS, formatNumber, getRealWorldComparison, getUnitName, getUnitSymbol } from './LengthUnits';
import { ConversionResult } from './LengthTypes';

// ==========================================
// ملف المنطق - LengthLogic.ts
// ==========================================

// ============ دالة التحويل الأساسية ============
export const convertLength = (
  amount: number,
  fromUnitId: string,
  toUnitId: string
): ConversionResult | null => {
  try {
    if (!amount || amount <= 0) return null;
    
    // إذا كانت الوحدات متطابقة (مثل متر إلى متر)
if (fromUnitId === toUnitId) {
  const unit = LENGTH_UNITS.find(u => u.id === fromUnitId);
  return {
    // ... باقي البيانات ...
    realWorldComparison: getRealWorldComparison(amount * (unit?.factor || 1), fromUnitId)
    // ✅ الآن الدالة تستقبل المعامل الثاني (نوع الوحدة)
  };
}

    const fromUnit = LENGTH_UNITS.find(u => u.id === fromUnitId);
    const toUnit = LENGTH_UNITS.find(u => u.id === toUnitId);

    if (!fromUnit || !toUnit) return null;

    // التحويل إلى متر أولاً ثم إلى الوحدة المطلوبة
    const meters = amount / fromUnit.factor;
    const toAmount = meters * toUnit.factor;

    return {
      fromAmount: amount,
      fromUnit: fromUnitId,
      toAmount,
      toUnit: toUnitId,
      factor: toUnit.factor / fromUnit.factor,
      lastUpdate: new Date().toLocaleString('ar-EG'),
      formattedFromAmount: formatNumber(amount, 2),
      formattedToAmount: formatNumber(toAmount, 6),
      formattedFactor: formatNumber(toUnit.factor / fromUnit.factor, 6),
      realWorldComparison: getRealWorldComparison(toAmount * (LENGTH_UNITS.find(u => u.id === toUnitId)?.factor || 1) , toUnitId)
    };
  } catch (error) {
    console.error('خطأ في تحويل الطول:', error);
    return null;
  }
};

// ============ مبالغ ثابتة للجداول ============
export const FIXED_AMOUNTS = [1, 5, 10, 25, 50, 100, 250, 500, 750, 1000];

// ============ دوال مساعدة ============
export const getUnitNameById = (id: string): string => getUnitName(id);
export const getUnitSymbolById = (id: string): string => getUnitSymbol(id);

// ============ كلمات مفتاحية للـ SEO ============
export const LENGTH_KEYWORDS = [
  'تحويل الطول',
  'متر إلى قدم',
  'قدم إلى متر',
  'كيلومتر إلى ميل',
  'ميل إلى كيلومتر',
  'بوصة إلى سم',
  'سم إلى بوصة',
  'الذراع كم متر',
  'الباع كم متر',
  'السنة الضوئية',
  'وحدة فلكية',
  'تحويل المسافات',
  'حاسبة الطول',
  'تحويل الطول في السعودية'
];

export const ARABIC_LENGTH_KEYWORDS = [
  'الذراع كم متر',
  'الباع كم متر',
  'الشبر كم سم',
  'الفرسخ كم كيلومتر',
  'وحدات القياس القديمة',
  'وحدات الطول التراثية'
];

export const ASTRONOMICAL_KEYWORDS = [
  'السنة الضوئية كم كيلومتر',
  'الوحدة الفلكية',
  'المسافة بين الأرض والشمس',
  'الفرسخ الفلكي'
];
