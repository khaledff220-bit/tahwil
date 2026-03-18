export interface CompareResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  date1Formatted: string;
  date2Formatted: string;
  dayOfWeek1: string;
  dayOfWeek2: string;
  hijriDate1?: string;
  hijriDate2?: string;
  isFuture: boolean; // هل التاريخ الأول في المستقبل؟
}

// ============ توليد السنوات (من 1900 إلى 2100) ============
export const getYears = () => {
  const years = [];
  for (let i = 2100; i >= 1900; i--) {
    years.push(i);
  }
  return years;
};

// ============ مصفوفة الشهور العربية ============
export const monthsArabic = [
  "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
];

// ============ توليد أيام الشهر (1-31) ============
export const getDays = () => {
  return Array.from({ length: 31 }, (_, i) => i + 1);
};

// ============ الحصول على تاريخ افتراضي ============
export const getDefaultDate = (daysAgo: number = 0) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear()
  };
};

// ============ حساب الفرق بدقة بين تاريخين ============
const calculateDifference = (date1: Date, date2: Date) => {
  // ترتيب التواريخ (الأصغر أولاً) للحساب
  const [start, end] = date1 <= date2 ? [date1, date2] : [date2, date1];
  
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  // تصحيح الأيام السالبة
  if (days < 0) {
    months--;
    const lastMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += lastMonth.getDate();
  }

  // تصحيح الشهور السالبة
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
};

// ============ جلب التاريخ الهجري من API ============
const fetchHijriDate = async (date: Date): Promise<string | undefined> => {
  try {
    const response = await fetch(
      `https://api.aladhan.com/v1/gToH/${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    );
    const data = await response.json();
    if (data.code === 200) {
      const h = data.data.hijri;
      return `${h.day} ${h.month.ar} ${h.year} هـ`;
    }
    return undefined;
  } catch (e) {
    console.error('فشل جلب التاريخ الهجري');
    return undefined;
  }
};

// ============ الدالة الرئيسية للمقارنة ============
export const compareDates = async (d1: any, d2: any): Promise<CompareResult | null> => {
  try {
    // التحقق من صحة المدخلات
    if (!d1.day || !d1.month || !d1.year || !d2.day || !d2.month || !d2.year) {
      throw new Error('جميع الحقول مطلوبة');
    }

    const date1 = new Date(d1.year, d1.month - 1, d1.day);
    const date2 = new Date(d2.year, d2.month - 1, d2.day);

    // التحقق من صحة التواريخ
    if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
      throw new Error('تاريخ غير صحيح');
    }

    // حساب الفرق
    const diff = Math.abs(date2.getTime() - date1.getTime());
    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(diff / (1000 * 60 * 60));
    const totalMinutes = Math.floor(diff / (1000 * 60));
    const totalSeconds = Math.floor(diff / 1000);
    const totalWeeks = Math.floor(totalDays / 7);

    // حساب الفرق بالسنوات والشهور والأيام (مع الترتيب الصحيح)
    const difference = calculateDifference(date1, date2);
    
    // هل التاريخ الأول في المستقبل؟
    const isFuture = date1 > date2;

    // تنسيق التواريخ للعرض
    const formatDate = (d: Date) => d.toLocaleDateString('ar-EG', { 
      weekday: 'long',
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
    
    const getDayName = (d: Date) => d.toLocaleDateString('ar-EG', { weekday: 'long' });

    // جلب التواريخ الهجرية
    const [hijriDate1, hijriDate2] = await Promise.all([
      fetchHijriDate(date1),
      fetchHijriDate(date2)
    ]);

    return {
      years: difference.years,
      months: difference.months,
      days: difference.days,
      totalDays,
      totalWeeks,
      totalHours,
      totalMinutes,
      totalSeconds,
      date1Formatted: formatDate(date1),
      date2Formatted: formatDate(date2),
      dayOfWeek1: getDayName(date1),
      dayOfWeek2: getDayName(date2),
      hijriDate1,
      hijriDate2,
      isFuture
    };
  } catch (e) {
    console.error('خطأ في مقارنة التواريخ:', e);
    return null;
  }
};
