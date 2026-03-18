// استخدام API دقيق لتقويم أم القرى (نفس المستخدم في صفحة التحويل)
const ALADHAN_API = 'https://api.aladhan.com/v1';

export interface DateData {
  dayName: string;
  gregorianDate: string;
  hijriDate: string;
  dayNumber: number;
  monthName: string;
  year: number;
  hijriDay: number;
  hijriMonth: string;
  hijriYear: number;
  nextPrayer?: string;
}

export const getDetailedDate = async (): Promise<DateData> => {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  try {
    // جلب التاريخ الهجري الدقيق من API
    const response = await fetch(`${ALADHAN_API}/gToH/${day}-${month}-${year}`);
    const data = await response.json();
    
    let hijriDay = day;
    let hijriMonth = '';
    let hijriYear = year;
    
    if (data.code === 200) {
      const hijri = data.data.hijri;
      hijriDay = parseInt(hijri.day);
      hijriMonth = hijri.month.ar;
      hijriYear = parseInt(hijri.year);
    }

    // خيارات التنسيق
    const gregorianOptions: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    return {
      dayName: now.toLocaleDateString('ar-SA', { weekday: 'long' }),
      gregorianDate: now.toLocaleDateString('ar-SA', gregorianOptions),
      hijriDate: `${hijriDay} ${hijriMonth} ${hijriYear} هـ`,
      dayNumber: day,
      monthName: now.toLocaleDateString('ar-SA', { month: 'long' }),
      year: year,
      hijriDay: hijriDay,
      hijriMonth: hijriMonth,
      hijriYear: hijriYear
    };
  } catch (error) {
    // Fallback في حالة فشل API
    return {
      dayName: now.toLocaleDateString('ar-SA', { weekday: 'long' }),
      gregorianDate: now.toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      hijriDate: 'غير متوفر حالياً',
      dayNumber: day,
      monthName: now.toLocaleDateString('ar-SA', { month: 'long' }),
      year: year,
      hijriDay: day,
      hijriMonth: '',
      hijriYear: year
    };
  }
};
