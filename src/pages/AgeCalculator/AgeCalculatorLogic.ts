// ============================================
// ملف المنطق - AgeCalculatorLogic.ts
// المسؤول: جميع العمليات الحسابية والتحويلات
// ============================================

export interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  nextBirthdayDays: number;
  dayOfWeek: string;
  zodiacSign: string;
  zodiacSignEn: string; // للإضافة للـ Schema
  season: string;
  hijriBirthDate: string; // تاريخ الميلاد بالهجري
  hijriAge: string; // العمر بالهجري (نص)
  hijriYears: number; // العمر بالهجري (رقم)
  birthDateGregorian: string;
  birthDateHijri: string;
}

// ============ ثوابت الأبراج الفلكية الدقيقة ============
const ZODIAC_SIGNS = [
  { name: 'الجدي', nameEn: 'Capricorn', start: [12, 22], end: [1, 19] },
  { name: 'الدلو', nameEn: 'Aquarius', start: [1, 20], end: [2, 18] },
  { name: 'الحوت', nameEn: 'Pisces', start: [2, 19], end: [3, 20] },
  { name: 'الحمل', nameEn: 'Aries', start: [3, 21], end: [4, 19] },
  { name: 'الثور', nameEn: 'Taurus', start: [4, 20], end: [5, 20] },
  { name: 'الجوزاء', nameEn: 'Gemini', start: [5, 21], end: [6, 20] },
  { name: 'السرطان', nameEn: 'Cancer', start: [6, 21], end: [7, 22] },
  { name: 'الأسد', nameEn: 'Leo', start: [7, 23], end: [8, 22] },
  { name: 'العذراء', nameEn: 'Virgo', start: [8, 23], end: [9, 22] },
  { name: 'الميزان', nameEn: 'Libra', start: [9, 23], end: [10, 22] },
  { name: 'العقرب', nameEn: 'Scorpio', start: [10, 23], end: [11, 21] },
  { name: 'القوس', nameEn: 'Sagittarius', start: [11, 22], end: [12, 21] }
];

// ============ دوال مساعدة ============
const getZodiacSign = (day: number, month: number): { name: string; nameEn: string } => {
  for (const sign of ZODIAC_SIGNS) {
    const [startMonth, startDay] = sign.start;
    const [endMonth, endDay] = sign.end;
    
    if (
      (month === startMonth && day >= startDay) ||
      (month === endMonth && day <= endDay) ||
      (startMonth > endMonth && (month === startMonth || month === endMonth))
    ) {
      return { name: sign.name, nameEn: sign.nameEn };
    }
  }
  return { name: 'غير معروف', nameEn: 'Unknown' };
};

const getSeason = (month: number): string => {
  if (month >= 3 && month <= 5) return 'الربيع';
  if (month >= 6 && month <= 8) return 'الصيف';
  if (month >= 9 && month <= 11) return 'الخريف';
  return 'الشتاء';
};

// ============ حساب العمر بالميلادي بدقة ============
const calculateGregorianAge = (birth: Date, now: Date) => {
  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();

  // تصحيح الأيام السالبة
  if (days < 0) {
    months--;
    const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += lastMonth.getDate();
  }

  // تصحيح الشهور السالبة
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
};

// ============ الدالة الرئيسية ============
export const calculateDetailedAge = async (birthDate: string): Promise<AgeResult | null> => {
  try {
    const birth = new Date(birthDate);
    const now = new Date();

    // ✅ التحقق من صحة التاريخ
    if (isNaN(birth.getTime())) {
      throw new Error('تاريخ غير صحيح');
    }

    // ✅ منع التواريخ المستقبلية
    if (birth > now) {
      throw new Error('تاريخ الميلاد لا يمكن أن يكون في المستقبل');
    }

    // 1. حساب العمر بالميلادي
    const { years, months, days } = calculateGregorianAge(birth, now);

    // 2. إحصائيات الوقت
    const diffMs = now.getTime() - birth.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const totalSeconds = Math.floor(diffMs / 1000);

    // 3. العد التنازلي لعيد الميلاد القادم
    let nextBDay = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBDay < now) {
      nextBDay.setFullYear(now.getFullYear() + 1);
    }
    const nextBirthdayDays = Math.ceil((nextBDay.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    // 4. معلومات إضافية
    const { name: zodiacSign, nameEn: zodiacSignEn } = getZodiacSign(birth.getDate(), birth.getMonth() + 1);
    const season = getSeason(birth.getMonth() + 1);
    const dayOfWeek = birth.toLocaleDateString('ar-SA', { weekday: 'long' });

    // 5. جلب التاريخ الهجري من API
    let hijriBirthDate = '';
    let hijriAge = '';
    let hijriYears = 0;

    try {
      const response = await fetch(
        `https://api.aladhan.com/v1/gToH/${birth.getDate()}-${birth.getMonth() + 1}-${birth.getFullYear()}`
      );
      const data = await response.json();
      
      if (data.code === 200) {
        const h = data.data.hijri;
        hijriBirthDate = `${h.day} ${h.month.ar} ${h.year} هـ`;
        
        // حساب العمر الهجري (تقريبي)
        const hijriYear = parseInt(h.year);
        const currentHijriYear = await getCurrentHijriYear();
        hijriYears = currentHijriYear - hijriYear;
        hijriAge = `${hijriYears} سنة هجرية`;
      }
    } catch (e) {
      console.error('فشل جلب التاريخ الهجري:', e);
      hijriBirthDate = 'غير متوفر';
      hijriAge = 'غير متوفر';
    }

    return {
      years,
      months,
      days,
      totalDays,
      totalHours,
      totalMinutes,
      totalSeconds,
      nextBirthdayDays,
      dayOfWeek,
      zodiacSign,
      zodiacSignEn,
      season,
      hijriBirthDate,
      hijriAge,
      hijriYears,
      birthDateGregorian: birth.toLocaleDateString('ar-SA'),
      birthDateHijri: hijriBirthDate
    };
  } catch (error) {
    console.error('خطأ في حساب العمر:', error);
    return null;
  }
};

// ============ دالة مساعدة لجلب السنة الهجرية الحالية ============
const getCurrentHijriYear = async (): Promise<number> => {
  try {
    const now = new Date();
    const response = await fetch(
      `https://api.aladhan.com/v1/gToH/${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`
    );
    const data = await response.json();
    if (data.code === 200) {
      return parseInt(data.data.hijri.year);
    }
    return 1445; // قيمة افتراضية
  } catch {
    return 1445;
  }
};

// ============ كلمات مفتاحية خاصة بدول الخليج ============
export const GULF_KEYWORDS = [
  'حساب العمر في السعودية',
  'حساب العمر في الكويت',
  'حساب العمر في الإمارات',
  'حساب العمر في قطر',
  'حساب العمر في البحرين',
  'حساب العمر في عمان',
  'عمرك بالهجري',
  'كم عمرك بالهجري',
  'حاسبة العمر الدقيقة'
];
