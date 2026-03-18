export interface Currency {
  code: string;
  name: string;
  nameEn: string;
  symbol: string;
  flag?: string;
  importance: number; // 1-100
  isArabic: boolean; // عملة عربية أم لا
}

export interface ExchangeRate {
  base: string;
  rates: Record<string, number>;
  timestamp: number;
  date: string;
}

export interface ConversionResult {
  fromAmount: number;
  fromCurrency: string;
  toAmount: number;
  toCurrency: string;
  rate: number;
  lastUpdate: string;
}

export interface CacheData {
  rates: ExchangeRate;
  timestamp: number;
}

export interface CurrencyOption {
  value: string;
  label: string;
  symbol: string;
}
