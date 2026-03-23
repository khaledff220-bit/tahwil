export interface AncientUnit {
  id: string;
  name: string;
  symbol: string;
  factor: number;      // القيمة بالوحدة الأساسية (متر أو كيلوجرام)
  category: 'length' | 'weight';
  icon: string;
  description: string;
}

export interface AncientViewProps {
  amount: number;
  setAmount: (value: number) => void;
  fromUnit: string;
  setFromUnit: (value: string) => void;
  toUnit: string;
  setToUnit: (value: string) => void;
  result: number;
  loading?: boolean;
  lastUpdate?: string;
}
