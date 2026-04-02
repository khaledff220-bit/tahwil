import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  useEffect(() => {
    document.title = 'من نحن - تحويلاتي | منصة القياس العربية الأولى';

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', 'https://tahwil-three.vercel.app/about');
      document.head.appendChild(canonical);
    } else {
      canonical.setAttribute('href', 'https://tahwil-three.vercel.app/about');
    }

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'تعرف على قصة تحويلاتي، المنصة التي تجمع بين المقاييس التراثية العربية (الذراع، الشبر، المثقال) وأحدث المعايير العالمية (BIPM). أكثر من 50 أداة تحويل دقيقة.');
  }, []);

  return (
    <div className="min-h-screen bg-white">

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-amber-100 rounded-full mb-6">
            <span className="text-5xl">🏺</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">من نحن</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto"><strong>تحويلاتي</strong> ليست مجرد أداة تحويل. نحن <strong>جسر بين حضارة الماضي وذكاء المستقبل</strong>.</p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 mb-12 border border-amber-200">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">👁️</span>
            <h2 className="text-2xl font-bold text-amber-800">رؤيتنا</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">نحن لا نقدم مجرد أرقام. نسعى لـ <strong>رقمنة التراث القياسي العربي</strong> وجمعه مع أدق المعايير العالمية المعاصرة، ليكون مرجعاً <strong>جيلاً بعد جيل</strong>. نريد أن يكون <strong>الذراع</strong> و<strong>المثقال</strong> حاضرين في العالم الرقمي كما كانا حاضرين في بناء الحضارات.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-5 border-b border-blue-200">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📖</span>
              <h2 className="text-xl font-bold text-blue-800">قصتنا</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-gray-700 leading-relaxed">لاحظنا فجوة كبيرة: بين <strong>المقاييس القديمة</strong> التي كانت أساس الحضارة العربية والإسلامية (كالذراع، الشبر، المثقال، الصاع)، وبين <strong>الفوضى الرقمية</strong> الحالية حيث يصعب العثور على أداة واحدة تجمع هذا الإرث مع أحدث المعايير العالمية.</p>
            <p className="text-gray-700 leading-relaxed">فجاءت <strong>تحويلاتي</strong> كحل لهذه المعادلة: منصة واحدة تجمع <strong>أمانة الموازين القديمة</strong> و<strong>دقة الخوارزميات الحديثة</strong>. هنا، يلتقي <strong>الذراع</strong> مع <strong>النانومتر</strong>، و<strong>المثقال</strong> مع <strong>الجرام</strong>، و<strong>الفرسخ</strong> مع <strong>السنة الضوئية</strong>.</p>
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
              <p className="text-amber-800 text-sm font-medium">💡 "نحن نؤمن أن معرفة المقاييس القديمة لا تقل أهمية عن معرفة أحدث التقنيات. التراث ليس مجرد ماضٍ، بل هو جسر إلى المستقبل."</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-2xl text-center">
            <div className="text-3xl font-bold text-blue-700">50+</div>
            <div className="text-sm text-gray-600">وحدة تحويل</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-2xl text-center">
            <div className="text-3xl font-bold text-green-700">100%</div>
            <div className="text-sm text-gray-600">دقة حسابية</div>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-2xl text-center">
            <div className="text-3xl font-bold text-amber-700">8</div>
            <div className="text-sm text-gray-600">وحدات تراثية</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-2xl text-center">
            <div className="text-3xl font-bold text-purple-700">24/7</div>
            <div className="text-sm text-gray-600">تحديث لحظي</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-5 border-b border-green-200">
            <div className="flex items-center gap-3">
              <span className="text-3xl">⚖️</span>
              <h2 className="text-xl font-bold text-green-800">قيمنا</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-2">🎯</div>
                <h3 className="font-bold text-gray-800 mb-1">الدقة المطلقة</h3>
                <p className="text-sm text-gray-600">نعتمد معايير BIPM الدولية</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🛡️</div>
                <h3 className="font-bold text-gray-800 mb-1">الأمانة في النقل</h3>
                <p className="text-sm text-gray-600">ننقل التراث بأمانة وشفافية</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🌍</div>
                <h3 className="font-bold text-gray-800 mb-1">سهولة الوصول</h3>
                <p className="text-sm text-gray-600">مجاني وسهل للجميع</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-5 border-b border-purple-200">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🧠</span>
              <h2 className="text-xl font-bold text-purple-800">خبرتنا</h2>
            </div>
          </div>
          <div className="p-6">
            <p className="text-gray-700 leading-relaxed mb-4">خلف <strong>تحويلاتي</strong> يقف شغف تقني يجمع بين:</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex gap-3 items-start"><span className="text-blue-500">⚡</span><p className="text-gray-700">برمجة حديثة باستخدام React و TypeScript</p></div>
              <div className="flex gap-3 items-start"><span className="text-amber-500">📚</span><p className="text-gray-700">بحث تاريخي دقيق في المصادر التراثية</p></div>
              <div className="flex gap-3 items-start"><span className="text-green-500">🔬</span><p className="text-gray-700">التزام بمعايير المكتب الدولي للأوزان (BIPM)</p></div>
              <div className="flex gap-3 items-start"><span className="text-purple-500">🎨</span><p className="text-gray-700">تصميم يراعي تجربة المستخدم العربية</p></div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🌱</span>
            <h2 className="text-xl font-bold text-gray-800">في تطور مستمر</h2>
          </div>
          <p className="text-gray-700 mb-4"><strong>تحويلاتي</strong> في رحلة دائمة للتطور. نعمل حالياً على إضافة المزيد من المقاييس التراثية (المكاييل النبوية، الأوزان التاريخية النادرة) وتوسيع قاعدة الوحدات الحديثة. هدفنا أن نكون <strong>المرجع العربي الأول</strong> في عالم القياس والتحويل.</p>

          <div className="border-t border-gray-200 my-6"></div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-2xl">📧</span>
              <h3 className="font-bold text-gray-800">تواصل معنا</h3>
            </div>
            <p className="text-gray-600 mb-2">لأي استفسار أو اقتراح، نحن هنا نسمعك:</p>
            <a href="mailto:khaledff220@gmail.com" className="inline-block bg-white px-6 py-3 rounded-xl text-blue-600 hover:text-blue-700 font-mono shadow-sm hover:shadow-md transition">khaledff220@gmail.com</a>
            <p className="text-xs text-gray-400 mt-3">(نحرص على الرد خلال 48 ساعة عمل)</p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-3 justify-center">
          <Link to="/" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition">← العودة للرئيسية</Link>
          <Link to="/privacy" className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition">سياسة الخصوصية</Link>
          <Link to="/terms" className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200 transition">اتفاقية الاستخدام</Link>
          <Link to="/ancient" className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm hover:bg-amber-200 transition">المقاييس التراثية</Link>
        </div>
      </main>
    </div>
  );
};

export default About;
