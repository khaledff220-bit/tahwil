// ==========================================
// ثوابت الوحدات - تحويل الحرارة (إصدار 2026)
// ==========================================

export interface TemperatureUnit {
  id: string;
  name: string;
  nameEn: string;
  symbol: string;
  category: 'standard' | 'scientific' | 'historical';
  icon: string;
  description: string;
  importance: number;
  formula: string; // شرح المعادلة
}

export const TEMPERATURE_UNITS: TemperatureUnit[] = [
  // ========== الوحدات القياسية ==========
  {
    id: 'celsius',
    name: 'سيلزيوس',
    nameEn: 'Celsius',
    symbol: '°C',
    category: 'standard',
    icon: '🌡️',
    description: 'الوحدة الأساسية لقياس درجة الحرارة في معظم دول العالم. تعتمد على نقطة تجمد الماء (0°) ونقطة غليانه (100°).',
    importance: 100,
    formula: '(°F - 32) × 5/9'
  },
  {
    id: 'fahrenheit',
    name: 'فهرنهايت',
    nameEn: 'Fahrenheit',
    symbol: '°F',
    category: 'standard',
    icon: '🔥',
    description: 'المقياس المستخدم في الولايات المتحدة وبعض الدول. نقطة تجمد الماء 32°، ونقطة غليانه 212°.',
    importance: 98,
    formula: '(°C × 9/5) + 32'
  },
  {
    id: 'kelvin',
    name: 'كلفن',
    nameEn: 'Kelvin',
    symbol: 'K',
    category: 'scientific',
    icon: '🔬',
    description: 'الوحدة الأساسية في النظام الدولي (SI) للفيزياء والعلوم. يبدأ من الصفر المطلق (0 K) حيث تتوقف الحركة الجزيئية.',
    importance: 95,
    formula: '°C + 273.15'
  },

  // ========== وحدات علمية وتاريخية ==========
  {
    id: 'rankine',
    name: 'رنكين',
    nameEn: 'Rankine',
    symbol: '°R',
    category: 'scientific',
    icon: '⚙️',
    description: 'مقياس مطلق شبيه بكلفن لكن يعتمد على درجة فهرنهايت. يستخدم في الهندسة الحرارية.',
    importance: 70,
    formula: '°F + 459.67'
  },
  {
    id: 'reaumur',
    name: 'ريومور',
    nameEn: 'Réaumur',
    symbol: '°Ré',
    category: 'historical',
    icon: '📜',
    description: 'مقياس تاريخي ابتكر عام 1730، حيث نقطة تجمد الماء 0° ونقطة غليانه 80°.',
    importance: 65,
    formula: '°C × 0.8'
  },
  {
    id: 'romer',
    name: 'رومر',
    nameEn: 'Rømer',
    symbol: '°Rø',
    category: 'historical',
    icon: '🏛️',
    description: 'أول مقياس عملي للحرارة ابتكره العالم الدنماركي أولي رومر عام 1701. نقطة تجمد الماء 7.5° ونقطة غليانه 60°.',
    importance: 60,
    formula: '°C × 21/40 + 7.5'
  },
  {
    id: 'newton',
    name: 'نيوتن',
    nameEn: 'Newton',
    symbol: '°N',
    category: 'historical',
    icon: '🍎',
    description: 'ابتكره إسحاق نيوتن عام 1700، يعتمد على نقطة تجمد الماء 0° ونقطة غليان الماء 33°.',
    importance: 62,
    formula: '°C × 33/100'
  },
  {
    id: 'delisle',
    name: 'ديليه',
    nameEn: 'Delisle',
    symbol: '°De',
    category: 'historical',
    icon: '❄️',
    description: 'مقياس عكسي ابتكره جوزيف ديليه عام 1732، حيث نقطة غليان الماء 0° ونقطة تجمده 150°.',
    importance: 58,
    formula: '(100 - °C) × 1.5'
  }
];

// ==========================================
// دوال مساعدة
// ==========================================

export const getSortedTemperatureUnits = (): TemperatureUnit[] => {
  return [...TEMPERATURE_UNITS].sort((a, b) => b.importance - a.importance);
};

export const getUnitName = (id: string): string => {
  const unit = TEMPERATURE_UNITS.find(u => u.id === id);
  return unit?.name || id;
};

export const getUnitSymbol = (id: string): string => {
  const unit = TEMPERATURE_UNITS.find(u => u.id === id);
  return unit?.symbol || id;
};

export const getUnitIcon = (id: string): string => {
  const unit = TEMPERATURE_UNITS.find(u => u.id === id);
  return unit?.icon || '🌡️';
};

export const formatNumber = (value: number, decimals: number = 2): string => {
  return new Intl.NumberFormat('ar-EG', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
    useGrouping: true
  }).format(value);
};
