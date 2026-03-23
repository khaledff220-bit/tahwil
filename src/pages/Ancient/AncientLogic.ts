import { ANCIENT_UNITS, formatNumber } from './AncientUnits';
import { ConversionResult } from './AncientTypes';

export const convertAncient = (
  amount: number,
  fromUnitId: string,
  toUnitId: string
): ConversionResult | null => {
  try {
    if (!amount || amount <= 0) return null;

    if (fromUnitId === toUnitId) {
      const unit = ANCIENT_UNITS.find(u => u.id === fromUnitId);
      return {
        fromAmount: amount,
        fromUnit: fromUnitId,
        toAmount: amount,
        toUnit: toUnitId,
        factor: 1,
        lastUpdate: new Date().toLocaleString('ar-EG'),
        formattedFromAmount: formatNumber(amount, 2),
        formattedToAmount: formatNumber(amount, 6),
        formattedFactor: formatNumber(1, 6)
      };
    }

    const fromUnit = ANCIENT_UNITS.find(u => u.id === fromUnitId);
    const toUnit = ANCIENT_UNITS.find(u => u.id === toUnitId);

    if (!fromUnit || !toUnit) return null;

    // التحويل: (amount / fromUnit.factor) * toUnit.factor
    const toAmount = (amount / fromUnit.factor) * toUnit.factor;

    return {
      fromAmount: amount,
      fromUnit: fromUnitId,
      toAmount,
      toUnit: toUnitId,
      factor: toUnit.factor / fromUnit.factor,
      lastUpdate: new Date().toLocaleString('ar-EG'),
      formattedFromAmount: formatNumber(amount, 2),
      formattedToAmount: formatNumber(toAmount, 6),
      formattedFactor: formatNumber(toUnit.factor / fromUnit.factor, 6)
    };
  } catch (error) {
    console.error('خطأ في تحويل الوحدات التراثية:', error);
    return null;
  }
};

export const FIXED_AMOUNTS = [1, 5, 10, 25, 50, 100, 250, 500];

export const getUnitNameById = (id: string): string => {
  const unit = ANCIENT_UNITS.find(u => u.id === id);
  return unit?.name || id;
};

export const getUnitSymbolById = (id: string): string => {
  const unit = ANCIENT_UNITS.find(u => u.id === id);
  return unit?.symbol || id;
};

export const getUnitIconById = (id: string): string => {
  const unit = ANCIENT_UNITS.find(u => u.id === id);
  return unit?.icon || '🏺';
};
