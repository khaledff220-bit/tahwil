export interface TemperatureUnit {
  id: string;
  name: string;
  nameEn: string;
  symbol: string;
  category: 'standard' | 'scientific' | 'historical';
  icon: string;
  description: string;
  importance: number;
  formula: string;
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
}

export interface TemperatureViewProps {
  units: TemperatureUnit[];
  result: ConversionResult | null;
  fromAmount: string;
  toAmount: string;
  fromUnit: string;
  toUnit: string;
  onFromAmountChange: (value: string) => void;
  onFromUnitChange: (value: string) => void;
  onToUnitChange: (value: string) => void;
  onSwapUnits: () => void;
  onConvert: () => void;
  loading: boolean;
  lastUpdate?: string;
}
