import { AncientUnit } from './AncientTypes';

export const ANCIENT_UNITS: AncientUnit[] = [
  // ========== وحدات الطول التراثية ==========
  {
    id: 'cubit',
    name: 'ذراع',
    symbol: 'ذراع',
    factor: 0.462,      // 1 ذراع = 0.462 متر
    category: 'length',
    icon: '🕌',
    description: 'وحدة قياس تاريخية، طول ذراع الإنسان من المرفق إلى طرف الأصابع (46-50 سم).'
  },
  {
    id: 'span',
    name: 'شبر',
    symbol: 'شبر',
    factor: 0.231,      // 1 شبر = 0.231 متر (نصف ذراع)
    category: 'length',
    icon: '🖐️',
    description: 'المسافة بين طرف الإبهام وطرف الخنصر عند بسط اليد (حوالي 23 سم).'
  },
  {
    id: 'fathom',
    name: 'قامة / باع',
    symbol: 'قامة',
    factor: 1.848,      // 1 قامة = 1.848 متر
    category: 'length',
    icon: '🙌',
    description: 'المسافة بين اليدين الممدودتين (حوالي 1.85 متر).'
  },
  {
    id: 'league',
    name: 'فرسخ',
    symbol: 'فرسخ',
    factor: 5544,       // 1 فرسخ = 5.544 كيلومتر
    category: 'length',
    icon: '🐫',
    description: 'وحدة مسافة تاريخية = 5.544 كيلومتر.'
  },

  // ========== وحدات الوزن التراثية ==========
  {
    id: 'mann',
    name: 'من',
    symbol: 'من',
    factor: 0.8,        // 1 من = 800 جرام = 0.8 كجم
    category: 'weight',
    icon: '🏺',
    description: 'وحدة وزن تاريخية خليجية، تساوي حوالي 800 جرام.'
  },
  {
    id: 'gulf_lb',
    name: 'رطل سعودي',
    symbol: 'رطل س',
    factor: 0.4536,     // 1 رطل سعودي = 0.4536 كجم
    category: 'weight',
    icon: '🇸🇦',
    description: 'وحدة وزن تستخدم في الأسواق السعودية والخليجية.'
  },
  {
    id: 'dirham',
    name: 'درهم',
    symbol: 'درهم',
    factor: 0.00297,    // 1 درهم = 2.97 جرام
    category: 'weight',
    icon: '🪙',
    description: 'وحدة وزن للذهب والمجوهرات، تساوي 2.97 جرام.'
  },
  {
    id: 'mithqal',
    name: 'مثقال',
    symbol: 'مثقال',
    factor: 0.00425,    // 1 مثقال = 4.25 جرام
    category: 'weight',
    icon: '💎',
    description: 'وحدة وزن للذهب، تساوي 4.25 جرام.'
  },

  // ========== الوحدات الحديثة ==========
  {
    id: 'meter',
    name: 'متر',
    symbol: 'م',
    factor: 1,
    category: 'length',
    icon: '📏',
    description: 'الوحدة الأساسية للطول في النظام الدولي.'
  },
  {
    id: 'kilometer',
    name: 'كيلومتر',
    symbol: 'كم',
    factor: 1000,
    category: 'length',
    icon: '🏃',
    description: '1000 متر.'
  },
  {
    id: 'centimeter',
    name: 'سنتيمتر',
    symbol: 'سم',
    factor: 0.01,
    category: 'length',
    icon: '📏',
    description: '0.01 متر.'
  },
  {
    id: 'kilogram',
    name: 'كيلوجرام',
    symbol: 'كجم',
    factor: 1,
    category: 'weight',
    icon: '⚖️',
    description: 'الوحدة الأساسية للوزن في النظام الدولي.'
  },
  {
    id: 'gram',
    name: 'جرام',
    symbol: 'جم',
    factor: 0.001,
    category: 'weight',
    icon: '⚖️',
    description: '0.001 كيلوجرام.'
  }
];

export const getSortedAncientUnits = (): AncientUnit[] => {
  return [...ANCIENT_UNITS].sort((a, b) => {
    // ترتيب حسب الفئة أولاً، ثم حسب الاسم
    if (a.category !== b.category) {
      return a.category === 'length' ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  });
};

export const getUnitById = (id: string): AncientUnit | undefined => {
  return ANCIENT_UNITS.find(u => u.id === id);
};

export const getUnitsByCategory = (category: 'length' | 'weight'): AncientUnit[] => {
  return ANCIENT_UNITS.filter(u => u.category === category);
};

export const formatNumber = (value: number, decimals: number = 4): string => {
  return new Intl.NumberFormat('ar-EG', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
    useGrouping: true
  }).format(value);
};
