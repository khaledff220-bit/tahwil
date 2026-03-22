export interface LengthUnit {
  id: string;
  name: string;
  nameEn: string;
  symbol: string;
  factor: number;
  category: 'metric' | 'imperial' | 'arabic' | 'astronomical';
  icon: string;
  context?: string;
  importance: number;
}

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
  realWorldComparison: string;  // المقارنة الواقعية
}

export interface LengthViewProps {
  units: LengthUnit[];
  result: ConversionResult | null;
  fromAmount: string;
  toAmount: string;
  fromUnit: string;
  toUnit: string;
  activeTab: string;
  onFromAmountChange: (value: string) => void;
  onFromUnitChange: (value: string) => void;
  onToUnitChange: (value: string) => void;
  onSwapUnits: () => void;
  onConvert: () => void;
  onTabChange: (tab: string) => void;
  loading: boolean;
  lastUpdate?: string;
}
