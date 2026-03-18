// ============================================
// ملف المنطق - CompareDateLogic.ts
// المسؤول: حساب الفرق بين تاريخين
// ============================================

export interface CompareResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalHours: number;
  totalMinutes: number;
  isFuture: boolean; // هل التاريخ الأول في المستقبل؟
  date1Formatted: string;
  date2Formatted: string;
  hijriDate1: string;
  hijriDate2: string;
  dayOfWeek1: string;
  dayOfWeek2: string;
}

// ============ حساب الفرق بين تاريخين بدقة ============
const calculateDateDifference = (date1: Date, date2: Date) => {
  // ترتيب التواريخ (الأصغر أولاً)
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

  // حساب إجمالي الأيام والساعات والدقائق
  const diffMs = Math.abs(date2.getTime() - date1.getTime());
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const totalWeeks = Math.floor(totalDays / 7);

  return {
    years,
    months,
    days,
    totalDays,
    totalWeeks,
    totalHours,
    totalMinutes,
    isFuture: date1 > date2
  };
};

// ============ جلب التاريخ الهجري من API ============
const fetchHijriDate = async (date: Date): Promise<string> => {
  try {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    
    const response = await fetch(
      `https://api.aladhan.com/v1/gToH/${day}-${month}-${year}`
    );
    const data = await response.json();
    
    if (data.code === 200) {
      const h = data.data.hijri;
      return `${h.day} ${h.month.ar} ${h.year} هـ`;
    }
    return 'غير متوفر';
  } catch (e) {
    console.error('فشل جلب التاريخ الهجري');
    return 'غير متوفر';
  }
};

// ============ الدالة الرئيسية ============
export const compareDates = async (date1Str: string, date2Str: string): Promise<CompareResult | null> => {
  try {
    const date1 = new Date(date1Str);
    const date2 = new Date(date2Str);

    // التحقق من صحة التواريخ
    if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
      throw new Error('تاريخ غير صحيح');
    }

    // حساب الفرق
    const difference = calculateDateDifference(date1, date2);

    // تنسيق التواريخ
    const date1Formatted = date1.toLocaleDateString('ar-SA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const date2Formatted = date2.toLocaleDateString('ar-SA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // جلب التواريخ الهجرية
    const [hijriDate1, hijriDate2] = await Promise.all([
      fetchHijriDate(date1),
      fetchHijriDate(date2)
    ]);

    // أيام الأسبوع
    const dayOfWeek1 = date1.toLocaleDateString('ar-SA', { weekday: 'long' });
    const dayOfWeek2 = date2.toLocaleDateString('ar-SA', { weekday: 'long' });

    return {
      ...difference,
      date1Formatted,
      date2Formatted,
      hijriDate1,
      hijriDate2,
      dayOfWeek1,
      dayOfWeek2
    };
  } catch (error) {
    console.error('خطأ في مقارنة التواريخ:', error);
    return null;
  }
};

// ============ دوال مساعدة ============
export const getTodayDateString = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

export const getDefaultDate = (daysAgo: number = 0): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
};
