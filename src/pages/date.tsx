import React, { useEffect, useState } from 'react';
import DateConverter from '@/components/converters/DateConverter';
import SEOContent from '@/components/seo/SEOContent';
import FAQ from '@/components/seo/FAQ';
import { getTodayHijri } from '@/lib/dateUtils';
import { SITE_URL } from '@/lib/constants';

interface FAQItem {
  question: string;
  answer: string;
}

const DatePage: React.FC = () => {
  const [todayHijri, setTodayHijri] = useState('جاري التحميل...');

  useEffect(() => {
    // تحديث عنوان الصفحة
    document.title = 'تحويل التاريخ الهجري إلى ميلادي والعكس - أداة دقيقة مع أسماء الشهور';
    
    // تحميل تاريخ اليوم
    getTodayHijri().then(setTodayHijri);
    
    // إضافة البيانات المنظمة لتحسين SEO
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "محول التاريخ الهجري والميلادي",
      "description": "أداة دقيقة لتحويل التاريخ بين الهجري والميلادي مع أسماء الشهور العربية",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "All",
      "url": `${SITE_URL}/date`,
      "inLanguage": "ar",
      "datePublished": "2026-01-01",
      "dateModified": new Date().toISOString().split('T')[0],
      "author": {
        "@type": "Organization",
        "name": "تحويلاتي"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "SAR"
      }
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const faqItems: FAQItem[] = [
    {
      question: 'كيف يمكنني تحويل التاريخ الهجري إلى ميلادي؟',
      answer: 'لتحويل التاريخ الهجري إلى ميلادي، كل ما عليك هو اختيار اليوم من القائمة المنسدلة، ثم اختيار الشهر الهجري (مثل محرم، صفر، رمضان...)، ثم إدخال السنة الهجرية. بعد الضغط على زر "تحويل إلى ميلادي"، ستحصل على التاريخ الميلادي الموافق بدقة عالية.'
    },
    {
      question: 'كيف يمكنني تحويل التاريخ الميلادي إلى هجري؟',
      answer: 'لتحويل التاريخ الميلادي إلى هجري، اختر اليوم ثم الشهر الميلادي (يناير، فبراير، مارس...) ثم أدخل السنة الميلادية. سيظهر لك التاريخ الهجري الموافق مع اسم الشهر الهجري والسنة الهجرية.'
    },
    {
      question: 'ما هو تاريخ اليوم بالهجري؟',
      answer: `تاريخ اليوم بالهجري هو: ${todayHijri}`
    },
    {
      question: 'لماذا تختلف التواريخ المحولة بين موقع وآخر؟',
      answer: 'يعود الاختلاف إلى طريقة الحساب المستخدمة. هناك عدة طرق لحساب بداية الأشهر الهجرية: الحساب الفلكي، رؤية الهلال، أو تقويم أم القرى. موقعنا يعتمد على الحسابات الفلكية الأكثر دقة والمعتمدة في معظم الدول العربية.'
    },
    {
      question: 'ما الفرق بين التقويم الهجري والميلادي؟',
      answer: 'التقويم الهجري هو تقويم قمري يعتمد على دورة القمر حول الأرض، ومدته 354 أو 355 يوماً. يبدأ بهجرة النبي محمد ﷺ من مكة إلى المدينة. أما التقويم الميلادي فهو تقويم شمسي يعتمد على دورة الشمس، ومدته 365 أو 366 يوماً، ويبدأ بميلاد السيد المسيح عليه السلام.'
    },
    {
      question: 'كم عدد أيام السنة الهجرية؟',
      answer: 'السنة الهجرية تتكون من 354 أو 355 يوماً، أي أقل من السنة الميلادية بحوالي 10-12 يوماً. هذا هو السبب في أن الشهر الهجري يتقدم حوالي 10 أيام كل سنة ميلادية.'
    },
    {
      question: 'هل يمكن تحويل التواريخ القديمة جداً؟',
      answer: 'نعم، أداتنا تدعم تحويل التواريخ الهجرية من 1000 هـ إلى 1500 هـ، والتواريخ الميلادية من 1900 م إلى 2100 م. هذا يغطي معظم الاحتياجات اليومية.'
    },
    {
      question: 'لماذا نستخدم أسماء الشهور بدل الأرقام؟',
      answer: 'نحن في موقع تحويلاتي نحرص على توفير تجربة استخدام سهلة وطبيعية للمستخدم العربي. لذلك نستخدم أسماء الشهور العربية (محرم، صفر، رمضان...) للتقويم الهجري، وأسماء الشهور الميلادية العربية (يناير، فبراير، مارس...) للتقويم الميلادي.'
    },
    {
      question: 'ما هو شهر رمضان بالهجري؟',
      answer: 'شهر رمضان هو الشهر التاسع في التقويم الهجري. يأتي بعد شهر شعبان وقبل شهر شوال. وهو شهر الصوم عند المسلمين.'
    },
    {
      question: 'كم عدد أيام شهر رمضان؟',
      answer: 'شهر رمضان إما 29 أو 30 يوماً، حسب رؤية الهلال. وهو نفس عدد أيام باقي الأشهر الهجرية.'
    },
    {
      question: 'ما هو شهر يناير بالميلادي؟',
      answer: 'يناير هو أول شهر في التقويم الميلادي، ويقابله في التقويم الهجري شهر محرم تقريباً. يتكون من 31 يوماً.'
    },
    {
      question: 'كيف أعرف برجي من تاريخ ميلادي؟',
      answer: 'يمكنك معرفة برجك من تاريخ ميلادك الميلادي: الحمل (21 مارس-19 أبريل)، الثور (20 أبريل-20 مايو)، الجوزاء (21 مايو-20 يونيو)، السرطان (21 يونيو-22 يوليو)، الأسد (23 يوليو-22 أغسطس)، العذراء (23 أغسطس-22 سبتمبر)، الميزان (23 سبتمبر-22 أكتوبر)، العقرب (23 أكتوبر-21 نوفمبر)، القوس (22 نوفمبر-21 ديسمبر)، الجدي (22 ديسمبر-19 يناير)، الدلو (20 يناير-18 فبراير)، الحوت (19 فبراير-20 مارس).'
    },
    {
      question: 'هل تدعم الأداة تحويل التاريخ مع الوقت؟',
      answer: 'حالياً، أداتنا تدعم تحويل التاريخ فقط دون الوقت. لكننا نعمل على إضافة ميزة تحويل التاريخ مع الوقت في الإصدارات القادمة.'
    },
    {
      question: 'ما هي أشهر المناسبات الدينية التي تحتاج تحويل تاريخ؟',
      answer: 'أشهر المناسبات التي يحتاج فيها المستخدمون لتحويل التاريخ: شهر رمضان (يحدد بدايته ونهايته بالهجري)، عيد الفطر (1 شوال)، عيد الأضحى (10 ذو الحجة)، رأس السنة الهجرية (1 محرم)، المولد النبوي (12 ربيع الأول).'
    },
    {
      question: 'هل موقع تحويلاتي مجاني؟',
      answer: 'نعم، موقع تحويلاتي مجاني تماماً ولا يحتاج إلى تسجيل أو اشتراك. جميع أدوات التحويل متاحة للجميع بدون أي مقابل.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* عنوان الصفحة المحسن */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          تحويل التاريخ الهجري إلى ميلادي والعكس
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          أداة دقيقة لتحويل التاريخ بين التقويم الهجري والميلادي. 
          اختر اليوم والشهر بالاسم (محرم، رمضان، يناير...) للحصول على نتيجة دقيقة فورية.
        </p>
      </div>

      {/* أداة التحويل */}
      <DateConverter />

      {/* محتوى SEO غني */}
      <SEOContent
        title="كل ما تريد معرفته عن تحويل التاريخ الهجري والميلادي"
        description="تعرف على الفروقات بين التقويم الهجري القمري والميلادي الشمسي، وكيفية التحويل بينهما بدقة."
      >
        <div className="prose prose-lg max-w-none text-gray-700">
          <p>
            <strong>تحويل التاريخ الهجري إلى ميلادي</strong> من أكثر الخدمات طلباً في العالم العربي، 
            خاصة مع قرب المناسبات الدينية مثل <strong>شهر رمضان المبارك</strong>، <strong>عيد الفطر</strong>، 
            و<strong>عيد الأضحى</strong>. في موقع تحويلاتي، نوفر لك أداة سهلة ودقيقة تمكنك من التحويل بين 
            التقويمين بكل سهولة.
          </p>
          
          <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">ما هو التقويم الهجري؟</h3>
          <p>
            التقويم الهجري، أو التقويم الإسلامي، هو تقويم قمري يعتمد على دورة القمر حول الأرض. 
            يتكون من 12 شهراً، تبدأ بمحرم وتنتهي بذي الحجة. مدته 354 أو 355 يوماً، أي أقل من 
            التقويم الميلادي بحوالي 10-12 يوماً. يبدأ التقويم الهجري بهجرة النبي محمد ﷺ من 
            مكة إلى المدينة عام 622 ميلادية.
          </p>
          
          <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">ما هو التقويم الميلادي؟</h3>
          <p>
            التقويم الميلادي، أو التقويم الغريغوري، هو تقويم شمسي يعتمد على دورة الشمس حول الأرض. 
            يتكون من 12 شهراً، مدتها 365 يوماً في السنة البسيطة و366 يوماً في السنة الكبيسة. 
            يبدأ التقويم الميلادي بميلاد السيد المسيح عليه السلام، وتم تطويره من التقويم اليولياني 
            عام 1582 على يد البابا غريغوري الثالث عشر.
          </p>
          
          <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">الفرق بين التقويمين</h3>
          <ul className="list-disc pr-6 space-y-2">
            <li><strong>الأساس:</strong> الهجري قمري (القمر)، الميلادي شمسي (الشمس)</li>
            <li><strong>عدد الأيام في السنة:</strong> الهجري 354-355 يوم، الميلادي 365-366 يوم</li>
            <li><strong>الفرق السنوي:</strong> حوالي 10-12 يوم (يتقدم الهجري كل سنة)</li>
            <li><strong>البداية:</strong> الهجري: 622 م (الهجرة النبوية)، الميلادي: 1 م (ميلاد المسيح)</li>
            <li><strong>الاستخدام:</strong> الهجري للمناسبات الدينية، الميلادي للمعاملات المدنية والدولية</li>
          </ul>
          
          <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">الأشهر الهجرية بالترتيب</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-gray-50 p-6 rounded-xl">
            <div>1. محرم</div>
            <div>2. صفر</div>
            <div>3. ربيع الأول</div>
            <div>4. ربيع الآخر</div>
            <div>5. جمادى الأولى</div>
            <div>6. جمادى الآخرة</div>
            <div>7. رجب</div>
            <div>8. شعبان</div>
            <div>9. رمضان</div>
            <div>10. شوال</div>
            <div>11. ذو القعدة</div>
            <div>12. ذو الحجة</div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">الأشهر الميلادية بالترتيب</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-gray-50 p-6 rounded-xl">
            <div>1. يناير (31 يوم)</div>
            <div>2. فبراير (28/29 يوم)</div>
            <div>3. مارس (31 يوم)</div>
            <div>4. أبريل (30 يوم)</div>
            <div>5. مايو (31 يوم)</div>
            <div>6. يونيو (30 يوم)</div>
            <div>7. يوليو (31 يوم)</div>
            <div>8. أغسطس (31 يوم)</div>
            <div>9. سبتمبر (30 يوم)</div>
            <div>10. أكتوبر (31 يوم)</div>
            <div>11. نوفمبر (30 يوم)</div>
            <div>12. ديسمبر (31 يوم)</div>
          </div>
        </div>
      </SEOContent>

      {/* الأسئلة الشائعة الموسعة */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          أسئلة شائعة عن تحويل التاريخ الهجري والميلادي
        </h2>
        <FAQ items={faqItems} title="" />
      </div>

      {/* قسم الروابط الداخلية */}
      <div className="mt-12 bg-gradient-to-l from-blue-50 to-green-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          أدوات مفيدة أخرى
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/currency" className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
            تحويل العملات
          </a>
          <a href="/weight" className="px-6 py-3 bg-yellow-600 text-white rounded-full hover:bg-yellow-700 transition">
            تحويل الوزن
          </a>
          <a href="/length" className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition">
            تحويل الطول
          </a>
          <a href="/temperature" className="px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition">
            تحويل الحرارة
          </a>
        </div>
      </div>
    </div>
  );
};

export default DatePage;
