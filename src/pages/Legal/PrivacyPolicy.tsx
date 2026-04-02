import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    document.title = 'سياسة الخصوصية - تحويلاتي | خصوصية وأمان بياناتك';

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', 'https://tahwil-three.vercel.app/privacy');
      document.head.appendChild(canonical);
    } else {
      canonical.setAttribute('href', 'https://tahwil-three.vercel.app/privacy');
    }

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'سياسة الخصوصية في تحويلاتي: لا نجمع بياناتك الشخصية، جميع التحويلات تتم داخل متصفحك، نستخدم Google AdSense للإعلانات. خصوصيتك أمانة.');
  }, []);

  return (
    <div className="min-h-screen bg-white">

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-amber-100 rounded-full mb-6">
            <span className="text-5xl">🛡️</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">سياسة الخصوصية</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">في <strong>تحويلاتي</strong>، خصوصيتك هي أثمن ما نزن. كما كان أجدادنا يحرصون على دقة <strong className="text-amber-700">المثقال</strong> وأمانة <strong className="text-amber-700">الذراع</strong>، نحن في عام 2026 نعتبر بياناتك أمانة لا تقبل القسمة على اثنين.</p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 mb-12 border border-amber-200">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">⚖️</span>
            <h2 className="text-2xl font-bold text-amber-800">ميزان الخصوصية لدينا</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">أنت هنا لتحول الأرقام، ونحن هنا لنضمن أن رحلتك تبقى <strong>مجهولة الهوية تماماً</strong>. لا نطلب اسمك، لا نطلب بريدك الإلكتروني، لا نطلب رقم هاتفك. ما تحوله هو بينك وبين الأرقام فقط.</p>
        </div>

        <div className="space-y-8">
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-5 border-b border-blue-200">
              <div className="flex items-center gap-3">
                <span className="text-3xl">📊</span>
                <h2 className="text-xl font-bold text-blue-800">ما هي البيانات التي نجمعها؟</h2>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <span className="text-2xl block mb-2">📏</span>
                  <h3 className="font-bold text-gray-800 mb-1">بيانات التحويل</h3>
                  <p className="text-sm text-gray-600">القيم التي تدخلها في المحول (مثل: 10 دولار، 5 ذراع) لا تُخزن على خوادمنا. تبقى في متصفحك فقط.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <span className="text-2xl block mb-2">🍪</span>
                  <h3 className="font-bold text-gray-800 mb-1">ملفات تعريف الارتباط (Cookies)</h3>
                  <p className="text-sm text-gray-600">نستخدم ملفات تعريف الارتباط الأساسية لتحسين أداء الموقع، مثل تذكر إعداداتك خلال الجلسة. لا نستخدمها لتتبعك.</p>
                </div>
              </div>
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">✅</span>
                  <h3 className="font-bold text-amber-800">ما لا نجمعه</h3>
                </div>
                <p className="text-sm text-gray-700">لا نجمع: الاسم، البريد الإلكتروني، رقم الهاتف، العنوان، الصور، الموقع الجغرافي، أو أي بيانات شخصية تعريفية.</p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-5 border-b border-green-200">
              <div className="flex items-center gap-3">
                <span className="text-3xl">💰</span>
                <h2 className="text-xl font-bold text-green-800">إعلانات Google AdSense</h2>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700 leading-relaxed mb-4">لنساعد في الحفاظ على خدماتنا مجانية، نعرض إعلانات من خلال <strong>Google AdSense</strong>. هذه الإعلانات قد تستخدم ملفات تعريف الارتباط لعرض إعلانات ذات صلة باهتماماتك العامة.</p>
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><span>🔗</span> معرفة المزيد</h3>
                <p className="text-sm text-gray-600 mb-2">يمكنك الاطلاع على سياسة خصوصية Google من خلال الرابط التالي:</p>
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm break-all">https://policies.google.com/privacy</a>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-5 border-b border-purple-200">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🛡️</span>
                <h2 className="text-xl font-bold text-purple-800">حقوقك وأنت تتصفح</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex gap-3 items-start"><span className="text-green-500 text-xl">✓</span><p className="text-gray-700">يمكنك استخدام جميع أدواتنا <strong>دون تسجيل دخول</strong></p></div>
                <div className="flex gap-3 items-start"><span className="text-green-500 text-xl">✓</span><p className="text-gray-700">يمكنك مسح بيانات التصفح من متصفحك في أي وقت</p></div>
                <div className="flex gap-3 items-start"><span className="text-green-500 text-xl">✓</span><p className="text-gray-700">يمكنك تعطيل ملفات تعريف الارتباط من إعدادات متصفحك</p></div>
                <div className="flex gap-3 items-start"><span className="text-green-500 text-xl">✓</span><p className="text-gray-700">لن نطلب منك أبداً معلوماتك الشخصية</p></div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-5 border-b border-amber-200">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🔒</span>
                <h2 className="text-xl font-bold text-amber-800">كيف نحمي تجربتك</h2>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700 leading-relaxed mb-4">جميع التحويلات تتم داخل متصفحك. البيانات لا تُرسل إلى خوادمنا إلا في حالات محدودة (مثل أسعار العملات)، وكل هذه الاتصالات مشفرة بتقنية <strong>SSL/TLS</strong>.</p>
              <div className="flex flex-wrap gap-3 mt-4">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">✓ اتصال مشفر</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">✓ تحديثات أمنية مستمرة</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">✓ لا تخزين للتحويلات</span>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">📧</span>
              <h2 className="text-xl font-bold text-gray-800">كيف تتواصل معنا؟</h2>
            </div>
            <p className="text-gray-700 mb-4">إذا كان لديك أي سؤال حول سياسة الخصوصية أو كيفية تعاملنا مع البيانات، أو إذا كنت ترغب في الإبلاغ عن أي مشكلة تقنية، يمكنك التواصل معنا عبر:</p>
            <div className="bg-white rounded-xl p-4 text-center">
              <p className="text-gray-600"><span className="font-bold">البريد الإلكتروني:</span> <a href="mailto:khaledff220@gmail.com" className="text-blue-600 hover:underline font-mono">khaledff220@gmail.com</a></p>
              <p className="text-xs text-gray-400 mt-2">(نحرص على الرد خلال 48 ساعة عمل)</p>
            </div>
          </section>

          <div className="text-center text-sm text-gray-400 border-t border-gray-200 pt-6">
            <p>آخر تحديث: مارس 2026</p>
            <p className="mt-1">قد يتم تحديث هذه السياسة من وقت لآخر. سنقوم بإشعارك عبر الموقع عند وجود تغييرات جوهرية.</p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-3 justify-center">
          <Link to="/" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition">← العودة للرئيسية</Link>
          <Link to="/currency" className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition">تحويل العملات</Link>
          <Link to="/ancient" className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm hover:bg-amber-200 transition">المقاييس التراثية</Link>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
