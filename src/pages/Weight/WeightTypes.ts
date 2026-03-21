export interface WeightUnit {
  id: string;
  name: string;
  nameEn: string;
  symbol: string;
  factor: number;
  category: 'standard' | 'precious' | 'kitchen' | 'historical' | 'shipping';
  icon: string;
  importance: number;
}

export interface ConversionResult {
  fromAmount: number;
  fromUnit: string;
  toAmount: number;
  toUnit: string;
  factor: number;
  lastUpdate: string;
}

export interface WeightViewProps {
  units: WeightUnit[];
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
