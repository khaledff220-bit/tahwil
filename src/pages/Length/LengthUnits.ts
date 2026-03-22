// ==========================================
// ثوابت الوحدات - تحويل الطول (إصدار 2026)
// ==========================================

export interface LengthUnit {
  id: string;
  name: string;
  nameEn: string;
  symbol: string;
  factor: number;      // عدد الوحدات في المتر الواحد
  category: 'metric' | 'imperial' | 'arabic' | 'astronomical';
  icon: string;
  context?: string;
  importance: number;
}

export const LENGTH_UNITS: LengthUnit[] = [
  // ========== النظام المتري (Metric) ==========
  { id: 'nm', name: 'نانومتر', nameEn: 'Nanometer', symbol: 'نانومتر', factor: 1e9, category: 'metric', icon: '🔬', importance: 70, context: 'أصغر من سمك شعرة الإنسان بـ 80,000 مرة' },
  { id: 'µm', name: 'ميكرون', nameEn: 'Micrometer', symbol: 'ميكرون', factor: 1e6, category: 'metric', icon: '🔬', importance: 72, context: 'سمك شعرة الإنسان = 100 ميكرون' },
  { id: 'mm', name: 'مليمتر', nameEn: 'Millimeter', symbol: 'مم', factor: 1000, category: 'metric', icon: '📏', importance: 85, context: 'سمك بطاقة الائتمان = 0.76 مليمتر' },
  { id: 'cm', name: 'سنتيمتر', nameEn: 'Centimeter', symbol: 'سم', factor: 100, category: 'metric', icon: '📏', importance: 90, context: 'عرض إصبع الإنسان = 1.5-2 سم' },
  { id: 'm', name: 'متر', nameEn: 'Meter', symbol: 'م', factor: 1, category: 'metric', icon: '📏', importance: 100, context: 'طول خطوة الإنسان العادي = 0.75-1 متر' },
  { id: 'km', name: 'كيلومتر', nameEn: 'Kilometer', symbol: 'كم', factor: 0.001, category: 'metric', icon: '🏃', importance: 95, context: 'ملعب كرة قدم = 0.1 كم، برج خليفة = 0.828 كم' },

  // ========== النظام الإمبراطوري (Imperial) ==========
  { id: 'in', name: 'بوصة', nameEn: 'Inch', symbol: 'بوصة', factor: 39.3701, category: 'imperial', icon: '📺', importance: 88, context: 'حجم شاشة الهاتف = 6-7 بوصات' },
  { id: 'ft', name: 'قدم', nameEn: 'Foot', symbol: 'قدم', factor: 3.28084, category: 'imperial', icon: '👟', importance: 92, context: 'طول الإنسان العادي = 5-6 أقدام' },
  { id: 'yd', name: 'ياردة', nameEn: 'Yard', symbol: 'ياردة', factor: 1.09361, category: 'imperial', icon: '🏈', importance: 80, context: 'ملعب كرة القدم الأمريكية = 100 ياردة' },
  { id: 'mi', name: 'ميل', nameEn: 'Mile', symbol: 'ميل', factor: 0.000621371, category: 'imperial', icon: '🏎️', importance: 85, context: 'ماراثون = 26.2 ميل' },
  { id: 'nmi', name: 'ميل بحري', nameEn: 'Nautical Mile', symbol: 'ميل بحري', factor: 0.000539957, category: 'imperial', icon: '⛵', importance: 75, context: 'المسافة بين خطوط الطول = 1 ميل بحري' },

  // ========== الوحدات التراثية العربية (معاملات مصححة) ==========
  // ملاحظة: factor = عدد الوحدات في المتر الواحد
  // 1 متر = 2 ذراع (تقريباً)
  { id: 'cubit', name: 'ذراع', nameEn: 'Cubit', symbol: 'ذراع', factor: 2, category: 'arabic', icon: '🕌', importance: 78, context: 'وحدة قياس تاريخية، طول ذراع الإنسان من المرفق إلى طرف الأصابع' },
  { id: 'span', name: 'شبر', nameEn: 'Span', symbol: 'شبر', factor: 4.374, category: 'arabic', icon: '🖐️', importance: 76, context: 'المسافة بين طرف الإبهام والخنصر (حوالي 22.86 سم)' },
  { id: 'fathom', name: 'قامة / باع', nameEn: 'Fathom', symbol: 'قامة', factor: 0.5468, category: 'arabic', icon: '🙌', importance: 74, context: 'المسافة بين اليدين الممدودتين (حوالي 1.8288 متر)' },
  { id: 'league', name: 'فرسخ', nameEn: 'League', symbol: 'فرسخ', factor: 0.0001818, category: 'arabic', icon: '🐫', importance: 70, context: 'وحدة مسافة تاريخية = 5.5 كيلومتر (حوالي 3.4 ميل)' },

  // ========== الوحدات الفلكية (معاملات مصححة) ==========
  // 1 وحدة فلكية = 149,597,870,700 متر
  { id: 'au', name: 'وحدة فلكية', nameEn: 'Astronomical Unit', symbol: 'AU', factor: 6.6846e-12, category: 'astronomical', icon: '🌍', importance: 65, context: 'المسافة بين الأرض والشمس ≈ 149.6 مليون كيلومتر' },
  // 1 سنة ضوئية = 9.461 × 10^15 متر
  { id: 'ly', name: 'سنة ضوئية', nameEn: 'Light Year', symbol: 'سنة ضوئية', factor: 1.057e-16, category: 'astronomical', icon: '⭐', importance: 68, context: 'المسافة التي يقطعها الضوء في سنة واحدة ≈ 9.46 تريليون كيلومتر' },
  // 1 فرسخ فلكي = 3.086 × 10^16 متر
  { id: 'pc', name: 'فرسخ فلكي', nameEn: 'Parsec', symbol: 'pc', factor: 3.24e-17, category: 'astronomical', icon: '🌌', importance: 60, context: 'وحدة فلكية تستخدم لقياس المسافات بين النجوم = 3.26 سنة ضوئية' },
];

// دوال مساعدة (بدون تغيير)
export const getSortedLengthUnits = (): LengthUnit[] => {
  return [...LENGTH_UNITS].sort((a, b) => b.importance - a.importance);
};

export const getUnitsByCategory = (category: LengthUnit['category']): LengthUnit[] => {
  return LENGTH_UNITS.filter(u => u.category === category);
};

export const getCategorizedLengthUnits = () => {
  const order: LengthUnit['category'][] = ['metric', 'imperial', 'arabic', 'astronomical'];
  const categoryLabels: Record<string, { label: string; icon: string }> = {
    metric: { label: '📏 النظام المتري (Metric)', icon: '📏' },
    imperial: { label: '🇬🇧 النظام الإمبراطوري (Imperial)', icon: '🇬🇧' },
    arabic: { label: '🏺 الوحدات التراثية العربية', icon: '🏺' },
    astronomical: { label: '🌌 الوحدات الفلكية', icon: '🌌' },
  };
  
  const result: Record<string, { label: string; icon: string; units: LengthUnit[] }> = {};
  
  for (const cat of order) {
    result[cat] = {
      label: categoryLabels[cat].label,
      icon: categoryLabels[cat].icon,
      units: LENGTH_UNITS.filter(u => u.category === cat).sort((a, b) => b.importance - a.importance)
    };
  }
  
  return result;
};

export const getUnitName = (id: string): string => {
  const unit = LENGTH_UNITS.find(u => u.id === id);
  return unit?.name || id;
};

export const getUnitSymbol = (id: string): string => {
  const unit = LENGTH_UNITS.find(u => u.id === id);
  return unit?.symbol || id;
};

export const getUnitIcon = (id: string): string => {
  const unit = LENGTH_UNITS.find(u => u.id === id);
  return unit?.icon || '📏';
};

export const getUnitContext = (id: string): string => {
  const unit = LENGTH_UNITS.find(u => u.id === id);
  return unit?.context || '';
};

export const formatNumber = (value: number, decimals: number = 6): string => {
  return new Intl.NumberFormat('ar-EG', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
    useGrouping: true
  }).format(value);
};

// ============ دالة المقارنة الواقعية (الوصف النصي أسفل النتيجة) ============
export const getRealWorldComparison = (meters: number, unitId?: string): string => {
  
  // ===== 1. مقارنات خاصة بالوحدات الفلكية =====
  
  // إذا كانت الوحدة هي "سنة ضوئية"
  if (unitId === 'ly') {
    const lightYears = meters / 9.461e15;
    if (lightYears < 1) return `⭐ ${lightYears.toFixed(2)} سنة ضوئية - مسافة نجمية`;
    if (lightYears < 4.5) return `⭐ المسافة إلى أقرب نجم (بروكسيما سنتوري ≈ 4.2 سنة ضوئية)`;
    if (lightYears < 1000) return `🌌 داخل مجرة درب التبانة (قطرها 100,000 سنة ضوئية)`;
    return `🌠 مسافة بين المجرات - هائلة جداً`;
  }
  
  // إذا كانت الوحدة هي "فرسخ فلكي"
  if (unitId === 'pc') {
    const parsec = meters / 3.086e16;
    if (parsec < 1) return `🌌 ${parsec.toFixed(2)} فرسخ فلكي - مسافة نجمية`;
    return `🌠 مسافة بين المجرات`;
  }
  
  // إذا كانت الوحدة هي "وحدة فلكية"
  if (unitId === 'au') {
    const au = meters / 1.496e11;
    if (au < 1) return `🌍 ${au.toFixed(2)} وحدة فلكية - داخل النظام الشمسي`;
    if (au < 5) return `🪐 المسافة إلى المشتري ≈ 5.2 وحدة فلكية`;
    return `🌠 خارج النظام الشمسي`;
  }
  
  // ===== 2. مقارنات للوحدات العادية (متر، كيلومتر، قدم، ذراع... الخ) =====
  
  if (meters < 0.000001) return '🔬 أضيق من سمك جزيء DNA';
  if (meters < 0.0001) return '🦠 أصغر من سمك شعرة الإنسان';
  if (meters < 0.001) return '📏 أرق من بطاقة الائتمان';
  if (meters < 0.01) return '✏️ أصغر من سمك قلم الرصاص';
  if (meters < 0.1) return '🖊️ أقل من طول قلم الحبر';
  if (meters < 0.5) return '📱 يعادل طول هاتف ذكي';
  if (meters < 1) return '👞 يقارب طول قدم الإنسان';
  if (meters < 2) return '🚪 يعادل ارتفاع باب غرفتك';
  if (meters < 5) return '🚗 طول سيارة صغيرة';
  if (meters < 10) return '🚌 طول حافلة مدرسية';
  if (meters < 50) return '🏊 طول حوض سباحة أولمبي (50 م)';
  if (meters < 100) return '🏟️ عرض ملعب كرة قدم (100 م)';
  if (meters < 828) return '🏗️ أقل من ارتفاع برج خليفة (828 م)';
  if (meters < 1000) return '🗼 يقارب ارتفاع برج خليفة';
  if (meters < 10000) return '🏔️ ارتفاع جبل إيفرست (8,848 م)';
  if (meters < 40000000) return '🌍 محيط الأرض (40,075 كم)';
  if (meters < 150000000000) return '🌍 المسافة إلى الشمس (149.6 مليون كم)';
  
  return '🚀 مسافة فضائية هائلة';
};
