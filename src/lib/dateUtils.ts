import { HIJRI_MONTHS, GREGORIAN_MONTHS } from './constants';

// ==================== دوال مساعدة ====================
export const getDaysArray = (count: number): number[] => {
  return Array.from({ length: count }, (_, i) => i + 1);
};

export const getDaysInGregorianMonth = (monthName: string, year: number): number => {
  const monthIndex = GREGORIAN_MONTHS.indexOf(monthName);
  if (monthIndex === -1) return 31;
  return new Date(year, monthIndex + 1, 0).getDate();
};

// ==================== API الدقيق للتحويل (Aladhan API) ====================
const ALADHAN_API = 'http://api.aladhan.com/v1';

// تحويل هجري → ميلادي
export const convertHijriToGregorian = async (day: number, monthName: string, year: number) => {
  try {
    // 1. التحقق من صحة المدخلات
    if (!day || !monthName || !year) {
      throw new Error('جميع الحقول مطلوبة');
    }
    
    const monthIndex = HIJRI_MONTHS.indexOf(monthName) + 1;
    if (monthIndex === 0) {
      throw new Error('الشهر الهجري غير صحيح');
    }

    // 2. تنسيق التاريخ الهجري (dd-mm-yyyy)
    const hijriDate = `${day}-${monthIndex}-${year}`;
    
    // 3. استدعاء API
    const response = await fetch(`${ALADHAN_API}/hToG?date=${hijriDate}`);
    
    if (!response.ok) {
      throw new Error('فشل الاتصال بالخادم');
    }
    
    const data = await response.json();
    
    // 4. التحقق من نجاح الاستجابة
    if (data.code !== 200) {
      throw new Error('التاريخ غير صحيح');
    }
    
    // 5. استخراج التاريخ الميلادي
    const gregorianDate = data.data.gregorian.date.split('-');
    const gDay = parseInt(gregorianDate[0]);
    const gMonth = parseInt(gregorianDate[1]) - 1; // المصفوفة تبدأ من 0
    const gYear = parseInt(gregorianDate[2]);
    
    return {
      success: true,
      result: `${gDay} ${GREGORIAN_MONTHS[gMonth]} ${gYear}`
    };
  } catch (error: any) {
    console.error('خطأ في تحويل هجري→ميلادي:', error);
    return { 
      success: false, 
      result: '', 
      error: error.message || 'فشل التحويل إلى ميلادي' 
    };
  }
};

// تحويل ميلادي → هجري
export const convertGregorianToHijri = async (day: number, monthName: string, year: number) => {
  try {
    // 1. التحقق من صحة المدخلات
    if (!day || !monthName || !year) {
      throw new Error('جميع الحقول مطلوبة');
    }
    
    const monthIndex = GREGORIAN_MONTHS.indexOf(monthName) + 1;
    if (monthIndex === 0) {
      throw new Error('الشهر الميلادي غير صحيح');
    }

    // 2. تنسيق التاريخ الميلادي (dd-mm-yyyy)
    const gregorianDate = `${day}-${monthIndex}-${year}`;
    
    // 3. استدعاء API
    const response = await fetch(`${ALADHAN_API}/gToH?date=${gregorianDate}`);
    
    if (!response.ok) {
      throw new Error('فشل الاتصال بالخادم');
    }
    
    const data = await response.json();
    
    // 4. التحقق من نجاح الاستجابة
    if (data.code !== 200) {
      throw new Error('التاريخ غير صحيح');
    }
    
    // 5. استخراج التاريخ الهجري
    const hijriDate = data.data.hijri.date.split('-');
    const hDay = parseInt(hijriDate[0]);
    const hMonth = parseInt(hijriDate[1]) - 1; // المصفوفة تبدأ من 0
    const hYear = parseInt(hijriDate[2]);
    
    return {
      success: true,
      result: `${hDay} ${HIJRI_MONTHS[hMonth]} ${hYear} هـ`
    };
  } catch (error: any) {
    console.error('خطأ في تحويل ميلادي→هجري:', error);
    return { 
      success: false, 
      result: '', 
      error: error.message || 'فشل التحويل إلى هجري' 
    };
  }
};

// ==================== الحصول على تاريخ اليوم ====================
export const getTodayHijri = async (): Promise<string> => {
  try {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    
    const response = await fetch(`${ALADHAN_API}/gToH?date=${day}-${month}-${year}`);
    const data = await response.json();
    
    if (data.code === 200) {
      const hijriDate = data.data.hijri.date.split('-');
      const hDay = parseInt(hijriDate[0]);
      const hMonth = parseInt(hijriDate[1]) - 1;
      const hYear = parseInt(hijriDate[2]);
      return `${hDay} ${HIJRI_MONTHS[hMonth]} ${hYear} هـ`;
    }
    
    return 'غير متوفر';
  } catch (error) {
    return 'غير متوفر';
  }
};
