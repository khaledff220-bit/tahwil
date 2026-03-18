import { Currency, ExchangeRate, CacheData, ConversionResult } from './CurrencyTypes';

// ==========================================
// قائمة الـ 50 عملة كاملة مع الأعلام
// ==========================================
export const CURRENCIES: Currency[] = [
  // الكبرى (10)
  { code: 'USD', name: 'الدولار الأمريكي', nameEn: 'US Dollar', symbol: '$', importance: 100, isArabic: false, flag: '🇺🇸' },
  { code: 'EUR', name: 'اليورو الأوروبي', nameEn: 'Euro', symbol: '€', importance: 99, isArabic: false, flag: '🇪🇺' },
  { code: 'GBP', name: 'الجنيه الإسترليني', nameEn: 'British Pound', symbol: '£', importance: 98, isArabic: false, flag: '🇬🇧' },
  { code: 'JPY', name: 'الين الياباني', nameEn: 'Japanese Yen', symbol: '¥', importance: 97, isArabic: false, flag: '🇯🇵' },
  { code: 'CNY', name: 'اليوان الصيني', nameEn: 'Chinese Yuan', symbol: '¥', importance: 96, isArabic: false, flag: '🇨🇳' },
  { code: 'CHF', name: 'الفرنك السويسري', nameEn: 'Swiss Franc', symbol: 'CHF', importance: 95, isArabic: false, flag: '🇨🇭' },
  { code: 'CAD', name: 'الدولار الكندي', nameEn: 'Canadian Dollar', symbol: 'C$', importance: 94, isArabic: false, flag: '🇨🇦' },
  { code: 'AUD', name: 'الدولار الأسترالي', nameEn: 'Australian Dollar', symbol: 'A$', importance: 93, isArabic: false, flag: '🇦🇺' },
  { code: 'INR', name: 'الروبية الهندية', nameEn: 'Indian Rupee', symbol: '₹', importance: 92, isArabic: false, flag: '🇮🇳' },
  { code: 'RUB', name: 'الروبل الروسي', nameEn: 'Russian Ruble', symbol: '₽', importance: 91, isArabic: false, flag: '🇷🇺' },

  // العربية (20)
  { code: 'SAR', name: 'الريال السعودي', nameEn: 'Saudi Riyal', symbol: 'ر.س', importance: 90, isArabic: true, flag: '🇸🇦' },
  { code: 'AED', name: 'الدرهم الإماراتي', nameEn: 'UAE Dirham', symbol: 'د.إ', importance: 89, isArabic: true, flag: '🇦🇪' },
  { code: 'EGP', name: 'الجنيه المصري', nameEn: 'Egyptian Pound', symbol: 'ج.م', importance: 88, isArabic: true, flag: '🇪🇬' },
  { code: 'KWD', name: 'الدينار الكويتي', nameEn: 'Kuwaiti Dinar', symbol: 'د.ك', importance: 87, isArabic: true, flag: '🇰🇼' },
  { code: 'QAR', name: 'الريال القطري', nameEn: 'Qatari Riyal', symbol: 'ر.ق', importance: 86, isArabic: true, flag: '🇶🇦' },
  { code: 'OMR', name: 'الريال العماني', nameEn: 'Omani Rial', symbol: 'ر.ع', importance: 85, isArabic: true, flag: '🇴🇲' },
  { code: 'BHD', name: 'الدينار البحريني', nameEn: 'Bahraini Dinar', symbol: 'د.ب', importance: 84, isArabic: true, flag: '🇧🇭' },
  { code: 'JOD', name: 'الدينار الأردني', nameEn: 'Jordanian Dinar', symbol: 'د.ا', importance: 83, isArabic: true, flag: '🇯🇴' },
  { code: 'LBP', name: 'الليرة اللبنانية', nameEn: 'Lebanese Pound', symbol: 'ل.ل', importance: 82, isArabic: true, flag: '🇱🇧' },
  { code: 'IQD', name: 'الدينار العراقي', nameEn: 'Iraqi Dinar', symbol: 'د.ع', importance: 81, isArabic: true, flag: '🇮🇶' },
  { code: 'LYD', name: 'الدينار الليبي', nameEn: 'Libyan Dinar', symbol: 'د.ل', importance: 80, isArabic: true, flag: '🇱🇾' },
  { code: 'TND', name: 'الدينار التونسي', nameEn: 'Tunisian Dinar', symbol: 'د.ت', importance: 79, isArabic: true, flag: '🇹🇳' },
  { code: 'MAD', name: 'الدرهم المغربي', nameEn: 'Moroccan Dirham', symbol: 'د.م', importance: 78, isArabic: true, flag: '🇲🇦' },
  { code: 'DZD', name: 'الدينار الجزائري', nameEn: 'Algerian Dinar', symbol: 'د.ج', importance: 77, isArabic: true, flag: '🇩🇿' },
  { code: 'YER', name: 'الريال اليمني', nameEn: 'Yemeni Rial', symbol: 'ر.ي', importance: 76, isArabic: true, flag: '🇾🇪' },
  { code: 'SYP', name: 'الليرة السورية', nameEn: 'Syrian Pound', symbol: 'ل.س', importance: 75, isArabic: true, flag: '🇸🇾' },
  { code: 'SDG', name: 'الجنيه السوداني', nameEn: 'Sudanese Pound', symbol: 'ج.س', importance: 74, isArabic: true, flag: '🇸🇩' },
  { code: 'MRU', name: 'الأوقية الموريتانية', nameEn: 'Mauritanian Ouguiya', symbol: 'أ.م', importance: 73, isArabic: true, flag: '🇲🇷' },
  { code: 'SOS', name: 'الشلن الصومالي', nameEn: 'Somali Shilling', symbol: 'ش.س', importance: 72, isArabic: true, flag: '🇸🇴' },
  { code: 'DJF', name: 'الفرنك الجيبوتي', nameEn: 'Djiboutian Franc', symbol: 'ف.ج', importance: 71, isArabic: true, flag: '🇩🇯' },

  // إضافية (20)
  { code: 'TRY', name: 'الليرة التركية', nameEn: 'Turkish Lira', symbol: '₺', importance: 70, isArabic: false, flag: '🇹🇷' },
  { code: 'PKR', name: 'الروبية الباكستانية', nameEn: 'Pakistani Rupee', symbol: '₨', importance: 69, isArabic: false, flag: '🇵🇰' },
  { code: 'IDR', name: 'الروبية الإندونيسية', nameEn: 'Indonesian Rupiah', symbol: 'Rp', importance: 68, isArabic: false, flag: '🇮🇩' },
  { code: 'MYR', name: 'الرينغيت الماليزي', nameEn: 'Malaysian Ringgit', symbol: 'RM', importance: 67, isArabic: false, flag: '🇲🇾' },
  { code: 'THB', name: 'البات التايلندي', nameEn: 'Thai Baht', symbol: '฿', importance: 66, isArabic: false, flag: '🇹🇭' },
  { code: 'MXN', name: 'البيزو المكسيكي', nameEn: 'Mexican Peso', symbol: '$', importance: 65, isArabic: false, flag: '🇲🇽' },
  { code: 'BRL', name: 'الريال البرازيلي', nameEn: 'Brazilian Real', symbol: 'R$', importance: 64, isArabic: false, flag: '🇧🇷' },
  { code: 'ZAR', name: 'الراند الجنوب أفريقي', nameEn: 'South African Rand', symbol: 'R', importance: 63, isArabic: false, flag: '🇿🇦' },
  { code: 'NGN', name: 'النايرا النيجيري', nameEn: 'Nigerian Naira', symbol: '₦', importance: 62, isArabic: false, flag: '🇳🇬' },
  { code: 'KES', name: 'الشلن الكيني', nameEn: 'Kenyan Shilling', symbol: 'KSh', importance: 61, isArabic: false, flag: '🇰🇪' },
  { code: 'GHS', name: 'السيدي الغاني', nameEn: 'Ghanaian Cedi', symbol: '₵', importance: 60, isArabic: false, flag: '🇬🇭' },
  { code: 'ARS', name: 'البيزو الأرجنتيني', nameEn: 'Argentine Peso', symbol: '$', importance: 59, isArabic: false, flag: '🇦🇷' },
  { code: 'PHP', name: 'البيزو الفلبيني', nameEn: 'Philippine Peso', symbol: '₱', importance: 58, isArabic: false, flag: '🇵🇭' },
  { code: 'VND', name: 'الدونغ الفيتنامي', nameEn: 'Vietnamese Dong', symbol: '₫', importance: 57, isArabic: false, flag: '🇻🇳' },
  { code: 'CLP', name: 'البيزو التشيلي', nameEn: 'Chilean Peso', symbol: '$', importance: 56, isArabic: false, flag: '🇨🇱' },
  { code: 'COP', name: 'البيزو الكولومبي', nameEn: 'Colombian Peso', symbol: '$', importance: 55, isArabic: false, flag: '🇨🇴' },
  { code: 'PLN', name: 'الزلوتي البولندي', nameEn: 'Polish Zloty', symbol: 'zł', importance: 54, isArabic: false, flag: '🇵🇱' },
  { code: 'SEK', name: 'الكرونة السويدية', nameEn: 'Swedish Krona', symbol: 'kr', importance: 53, isArabic: false, flag: '🇸🇪' },
  { code: 'NOK', name: 'الكرونة النرويجية', nameEn: 'Norwegian Krone', symbol: 'kr', importance: 52, isArabic: false, flag: '🇳🇴' },
  { code: 'DKK', name: 'الكرونة الدنماركية', nameEn: 'Danish Krone', symbol: 'kr', importance: 51, isArabic: false, flag: '🇩🇰' },
];

export const getSortedCurrencies = (): Currency[] => [...CURRENCIES].sort((a, b) => b.importance - a.importance);

const CACHE_DURATION = 3600000; // ساعة

export const getCachedRates = (base: string): ExchangeRate | null => {
  try {
    const cached = localStorage.getItem(`tahwil_rates_${base}`);
    if (!cached) return null;
    const data: CacheData = JSON.parse(cached);
    if (Date.now() - data.timestamp < CACHE_DURATION) return data.rates;
    return null;
  } catch { return null; }
};

export const fetchExchangeRates = async (baseCurrency: string = 'USD'): Promise<ExchangeRate | null> => {
  try {
    const cached = getCachedRates(baseCurrency);
    if (cached) return cached;
    const response = await fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`);
    if (!response.ok) throw new Error();
    const data = await response.json();
    const rates: ExchangeRate = { base: data.base_code, rates: data.rates, timestamp: Date.now(), date: data.time_last_update_utc };
    localStorage.setItem(`tahwil_rates_${baseCurrency}`, JSON.stringify({ rates, timestamp: Date.now() }));
    return rates;
  } catch { return null; }
};

export const convertCurrency = async (amount: number, fromCurrency: string, toCurrency: string): Promise<ConversionResult | null> => {
  if (!amount || amount <= 0) return null;
  if (fromCurrency === toCurrency) return { fromAmount: amount, fromCurrency, toAmount: amount, toCurrency, rate: 1, lastUpdate: new Date().toLocaleString('ar-EG') };
  const rates = await fetchExchangeRates(fromCurrency);
  if (!rates || !rates.rates[toCurrency]) return null;
  const rate = rates.rates[toCurrency];
  return { fromAmount: amount, fromCurrency, toAmount: amount * rate, toCurrency, rate, lastUpdate: new Date().toLocaleString('ar-EG') };
};

export const getCurrencyName = (code: string): string => CURRENCIES.find(c => c.code === code)?.name || code;
export const getCurrencySymbol = (code: string): string => CURRENCIES.find(c => c.code === code)?.symbol || code;

export const generateMetaDescription = (from: string, to: string, rate?: number): string => {
  if (rate) return `1 ${from} = ${rate.toFixed(4)} ${to}. حول العملات بأسعار اليوم.`;
  return "أداة تحويل العملات بأسعار محدثة ولحظية.";
};
