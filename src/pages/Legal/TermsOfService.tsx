import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const TermsOfService: React.FC = () => {
  useEffect(() => {
    document.title = 'اتفاقية الاستخدام - تحويلاتي | الشروط والأحكام';

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', 'https://tahwil-three.vercel.app/terms');
      document.head.appendChild(canonical);
    } else {
      canonical.setAttribute('href', 'https://tahwil-three.vercel.app/terms');
    }

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'اتفاقية استخدام تحويلاتي: إخلاء مسؤولية، حقوق ملكية فكرية، وسلوك المستخدم. منصة تجمع بين المقاييس التراثية وأحدث المعايير العالمية.');
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-amber-100 rounded-full mb-6">
            <span className="text-5xl">📜</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">اتفاقية الاستخدام</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">بين <strong>أمانة الموازين القديمة</strong> و<strong>دقة الخوارزميات الحديثة</strong>، نقدم لك منصة تحويلية تجمع الإرث مع الابتكار.</p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 mb-12 border border-amber-200">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">⚖️</span>
            <h2 className="text-2xl font-bold text-amber-800">بين الذراع والخوارزمية</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">مرحباً بك في <strong>تحويلاتي</strong>. باستخدامك لهذه المنصة، فإنك توافق على الالتزام بهذه الاتفاقية. نحن هنا لنقدم لك أدوات تحويل دقيقة تجمع بين <strong>أمانة المقاييس التراثية</strong> (كالذراع والمثقال) و<strong>دقة الخوارزميات الحديثة</strong> المعتمدة على معايير المكتب الدولي للأوزان والمقاييس (BIPM).</p>
        </div>

        <div className="space-y-8">
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-red-50 to-red-100 p-5 border-b border-red-200">
              <div className="flex items-center gap-3">
                <span className="text-3xl">⚠️</span>
                <h2 className="text-xl font-bold text-red-800">إخلاء المسؤولية</h2>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-gray-700 leading-relaxed"><strong>جميع الخدمات المقدمة في موقع تحويلاتي هي لأغراض معلوماتية واسترشادية فقط.</strong> نحن نبذل قصارى جهدنا لضمان دقة التحويلات، ولكن:</p>
              <ul className="space-y-3 list-disc pr-6 text-gray-700">
                <li>لا نتحمل أي مسؤولية عن الأخطاء الحسابية الناتجة عن تحديثات الأسعار أو اختلاف المصادر.</li>
                <li>المستخدم هو المسؤول الوحيد عن التحقق من الأرقام قبل اتخاذ أي <strong>قرار مالي أو إنشائي أو قانوني</strong> بناءً عليها.</li>
                <li>أسعار العملات تتغير لحظياً، وقد يكون هناك تأخير بسيط في التحديث.</li>
                <li>التحويلات التراثية (كالذراع والمثقال) تستند إلى مراجع تاريخية موثقة، ولكنها قد تختلف قليلاً بين المدارس الفقهية والتاريخية.</li>
              </ul>
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 mt-2">
                <p className="text-sm text-amber-800">💡 <strong>نصيحة:</strong> للمعاملات المالية الكبرى أو المشاريع الهندسية الدقيقة، يُنصح بالاستعانة بمصادر رسمية متعددة.</p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-5 border-b border-blue-200">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🏺</span>
                <h2 className="text-xl font-bold text-blue-800">حقوق الملكية الفكرية</h2>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700 leading-relaxed mb-4">جميع محتويات موقع <strong>تحويلاتي</strong>، بما فيها:</p>
              <ul className="space-y-2 list-disc pr-6 text-gray-700 mb-4">
                <li>الأكواد البرمجية (المصممة خصيصاً للمقاييس التراثية).</li>
                <li>الواجهات البصرية (UI/UX) والنصوص الإبداعية.</li>
                <li>قواعد البيانات الخاصة بمعاملات التحويل (كالذراع والمثقال).</li>
                <li>الخوارزميات الحسابية الفريدة.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">هي <strong>ملكية فكرية حصرية</strong> للمنصة، ولا يُسمح بنسخها أو إعادة استخدامها أو توزيعها لأغراض تجارية دون الحصول على إذن خطي مسبق. انتهاك هذا الحق يعرض المخالف للمساءلة القانونية.</p>
              <div className="bg-gray-50 p-4 rounded-xl mt-4">
                <p className="text-sm text-gray-600">🔒 للاستفسارات التجارية أو الترخيص، يرجى التواصل عبر البريد الإلكتروني المذكور في نهاية هذه الصفحة.</p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-5 border-b border-green-200">
              <div className="flex items-center gap-3">
                <span className="text-3xl">👤</span>
                <h2 className="text-xl font-bold text-green-800">سلوك المستخدم</h2>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700 leading-relaxed mb-4">باستخدامك للموقع، فإنك توافق على:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex gap-3 items-start"><span className="text-green-500">✓</span><p className="text-gray-700">استخدام الأدوات لأغراض مشروعة فقط</p></div>
                <div className="flex gap-3 items-start"><span className="text-green-500">✓</span><p className="text-gray-700">عدم محاولة اختراق أو تعطيل خدمات الموقع</p></div>
                <div className="flex gap-3 items-start"><span className="text-green-500">✓</span><p className="text-gray-700">عدم تحميل أو نقل برامج ضارة عبر المنصة</p></div>
                <div className="flex gap-3 items-start"><span className="text-green-500">✓</span><p className="text-gray-700">احترام حقوق الملكية الفكرية للموقع</p></div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-5 border-b border-purple-200">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🔄</span>
                <h2 className="text-xl font-bold text-purple-800">تعديلات الخدمة والإيقاف</h2>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700 leading-relaxed">نحتفظ بالحق في تعديل أو تحديث أو إيقاف أي من خدمات الموقع في أي وقت دون إشعار مسبق، وذلك بهدف تحسين تجربة المستخدم أو تطوير الأدوات. كما يجوز لنا تعديل هذه الاتفاقية من وقت لآخر، وسيصبح الاستمرار في استخدام الموقع موافقة ضمنية على التعديلات.</p>
            </div>
          </section>

          <section className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">📧</span>
              <h2 className="text-xl font-bold text-gray-800">للاستفسارات القانونية</h2>
            </div>
            <p className="text-gray-700 mb-4">إذا كان لديك أي استفسار حول هذه الاتفاقية، أو ترغب في الحصول على إذن لاستخدام محتوى أو كود من الموقع، أو إذا كنت تمثل جهة رسمية ولديك طلب قانوني، يمكنك التواصل عبر:</p>
            <div className="bg-white rounded-xl p-4 text-center">
              <p className="text-gray-600"><span className="font-bold">البريد الإلكتروني:</span> <a href="mailto:khaledff220@gmail.com" className="text-blue-600 hover:underline font-mono">khaledff220@gmail.com</a></p>
              <p className="text-xs text-gray-400 mt-2">(نحرص على الرد خلال 48 ساعة عمل)</p>
            </div>
          </section>

          <div className="text-center text-sm text-gray-400 border-t border-gray-200 pt-6">
            <p>آخر تحديث: مارس 2026</p>
            <p className="mt-1">باستمرارك في استخدام الموقع، فإنك توافق على هذه الاتفاقية.</p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-3 justify-center">
          <Link to="/" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition">← العودة للرئيسية</Link>
          <Link to="/privacy" className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition">سياسة الخصوصية</Link>
          <Link to="/ancient" className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm hover:bg-amber-200 transition">المقاييس التراثية</Link>
        </div>
      </main>
    </div>
  );
};

export default TermsOfService;
