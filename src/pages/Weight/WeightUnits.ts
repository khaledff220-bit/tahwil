// ==========================================
// ثوابت الوحدات - تحويل الوزن (نسخة 2026 الاحترافية)
// مع تصنيفات كاملة ومعاملات تحويل دقيقة
// ==========================================

export interface WeightUnit {
  id: string;
  name: string;
  nameEn: string;
  symbol: string;
  factor: number;      // عامل التحويل إلى الكيلوجرام
  category: 'standard' | 'precious' | 'kitchen' | 'historical' | 'shipping';
  icon: string;
  importance: number;
}

// ==========================================
// الوحدات مقسمة حسب الفئة (لتحسين تجربة المستخدم)
// ==========================================

export const WEIGHT_UNITS: WeightUnit[] = [
  // ========== الفئة 1: الأوزان العالمية (Standard) ==========
  { id: 'kg', name: 'كيلوجرام', nameEn: 'Kilogram', symbol: 'كجم', factor: 1, category: 'standard', icon: '⚖️', importance: 100 },
  { id: 'g', name: 'جرام', nameEn: 'Gram', symbol: 'جم', factor: 1000, category: 'standard', icon: '🔬', importance: 99 },
  { id: 'mg', name: 'مليجرام', nameEn: 'Milligram', symbol: 'مجم', factor: 1000000, category: 'standard', icon: '💊', importance: 80 },
  { id: 'ton', name: 'طن متري', nameEn: 'Metric Ton', symbol: 'طن', factor: 0.001, category: 'standard', icon: '🚛', importance: 85 },
  { id: 'lb', name: 'رطل (باوند)', nameEn: 'Pound', symbol: 'رطل', factor: 2.20462262185, category: 'standard', icon: '🏋️', importance: 95 },
  { id: 'oz', name: 'أوقية', nameEn: 'Ounce', symbol: 'أونصة', factor: 35.2739619496, category: 'standard', icon: '⚖️', importance: 90 },
  { id: 'stone', name: 'حجر', nameEn: 'Stone', symbol: 'حجر', factor: 0.1574730444, category: 'standard', icon: '🪨', importance: 70 },

  // ========== الفئة 2: الأوزان الثمينة (الذهب والمجوهرات) ==========
  { id: 'gold_oz', name: 'أونصة ذهب', nameEn: 'Gold Ounce', symbol: 'أونصة ذهب', factor: 32.1507465686, category: 'precious', icon: '👑', importance: 98 },
  { id: 'mithqal', name: 'مثقال', nameEn: 'Mithqal', symbol: 'مثقال', factor: 4.25, category: 'precious', icon: '💎', importance: 92 },
  { id: 'carat', name: 'قيراط', nameEn: 'Carat', symbol: 'قيراط', factor: 5000, category: 'precious', icon: '💍', importance: 88 },
  { id: 'tola', name: 'تولة', nameEn: 'Tola', symbol: 'تولة', factor: 11.6638038, category: 'precious', icon: '📿', importance: 75 },
  { id: 'dwt', name: 'بنس وِيت', nameEn: 'Pennyweight', symbol: 'dwt', factor: 643.014931, category: 'precious', icon: '⚜️', importance: 65 },

  // ========== الفئة 3: أوزان المطبخ (الطهي) ==========
  { id: 'cup', name: 'كوب', nameEn: 'Cup', symbol: 'كوب', factor: 4.2267528377, category: 'kitchen', icon: '🥛', importance: 85 },
  { id: 'tbsp', name: 'ملعقة كبيرة', nameEn: 'Tablespoon', symbol: 'ملعقة ك', factor: 67.628045317, category: 'kitchen', icon: '🥄', importance: 82 },
  { id: 'tsp', name: 'ملعقة صغيرة', nameEn: 'Teaspoon', symbol: 'ملعقة ص', factor: 202.884136211, category: 'kitchen', icon: '🥄', importance: 80 },
  { id: 'glass', name: 'كأس', nameEn: 'Glass', symbol: 'كأس', factor: 4.0, category: 'kitchen', icon: '🥤', importance: 75 },
  { id: 'ml', name: 'مليلتر (للسوائل)', nameEn: 'Milliliter', symbol: 'مل', factor: 1000, category: 'kitchen', icon: '💧', importance: 78 },

  // ========== الفئة 4: الأوزان التاريخية/الخليجية (سر التفوق) ==========
  { id: 'gulf_lb', name: 'الرطل السعودي', nameEn: 'Gulf Pound', symbol: 'رطل س', factor: 2.20462262185, category: 'historical', icon: '🇸🇦', importance: 93 },
  { id: 'mann', name: 'من', nameEn: 'Mann', symbol: 'من', factor: 2.56, category: 'historical', icon: '🏺', importance: 78 },
  { id: 'dirham', name: 'درهم', nameEn: 'Dirham', symbol: 'درهم', factor: 3.0, category: 'historical', icon: '🪙', importance: 76 },
  { id: 'ratl', name: 'رطل عربي', nameEn: 'Arabic Ratl', symbol: 'رطل ع', factor: 2.5, category: 'historical', icon: '📦', importance: 74 },
  { id: 'oka', name: 'أوقة (Oka)', nameEn: 'Oka', symbol: 'أوقة', factor: 1.282, category: 'historical', icon: '🏺', importance: 68 },
  { id: 'rotl', name: 'رطل عثماني', nameEn: 'Ottoman Rotl', symbol: 'رطل عث', factor: 1.282, category: 'historical', icon: '🕌', importance: 66 },

  // ========== الفئة 5: أوزان الشحن ==========
  { id: 'us_ton', name: 'طن أمريكي', nameEn: 'US Ton', symbol: 'طن أم', factor: 0.00110231131, category: 'shipping', icon: '🚢', importance: 65 },
  { id: 'uk_ton', name: 'طن بريطاني', nameEn: 'UK Ton', symbol: 'طن بر', factor: 0.0009842065276, category: 'shipping', icon: '⛴️', importance: 64 },
  { id: 'cwt', name: 'قنطار', nameEn: 'Hundredweight', symbol: 'قنطار', factor: 0.022046226218, category: 'shipping', icon: '📦', importance: 60 },
  { id: 'lb_shipping', name: 'رطل شحن', nameEn: 'Shipping Pound', symbol: 'رطل ش', factor: 2.20462262185, category: 'shipping', icon: '✈️', importance: 62 },
];

// ==========================================
// دوال مساعدة
// ==========================================

export const getSortedWeightUnits = (): WeightUnit[] => {
  return [...WEIGHT_UNITS].sort((a, b) => b.importance - a.importance);
};

// الحصول على الوحدات حسب الفئة (للقوائم المجمعة)
export const getUnitsByCategory = (category: WeightUnit['category']): WeightUnit[] => {
  return WEIGHT_UNITS.filter(u => u.category === category);
};

// جميع الفئات مع وحداتها (مرتبة حسب الأهمية)
export const getCategorizedUnits = () => {
  const order: WeightUnit['category'][] = ['standard', 'precious', 'kitchen', 'historical', 'shipping'];
  const result: Record<string, WeightUnit[]> = {};
  
  for (const cat of order) {
    result[cat] = WEIGHT_UNITS.filter(u => u.category === cat).sort((a, b) => b.importance - a.importance);
  }
  
  return result;
};

// دوال مساعدة للعرض
export const getUnitName = (id: string): string => {
  const unit = WEIGHT_UNITS.find(u => u.id === id);
  return unit?.name || id;
};

export const getUnitSymbol = (id: string): string => {
  const unit = WEIGHT_UNITS.find(u => u.id === id);
  return unit?.symbol || id;
};

export const getUnitIcon = (id: string): string => {
  const unit = WEIGHT_UNITS.find(u => u.id === id);
  return unit?.icon || '⚖️';
};

export const getUnitCategory = (id: string): string => {
  const unit = WEIGHT_UNITS.find(u => u.id === id);
  return unit?.category || 'standard';
};

// تنسيق الأرقام (إضافة فاصلة الآلاف وتقريب الكسور)
export const formatNumber = (value: number, decimals: number = 6): string => {
  return new Intl.NumberFormat('ar-EG', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
    useGrouping: true
  }).format(value);
};
