import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '@/components/layout/Footer';

const tools = [
  { name: 'تحويل العملات', href: '/currency', desc: 'حوّل بين 50+ عملة عالمية وعربية', icon: '💰', color: 'emerald', gradient: 'from-emerald-500 to-teal-500' },
  { name: 'تحويل الوزن', href: '/weight', desc: 'كجم، رطل، أوقية ذهب، مثقال، من، كوب', icon: '⚖️', color: 'blue', gradient: 'from-blue-500 to-indigo-500' },
  { name: 'تحويل الطول', href: '/length', desc: 'متر، قدم، كيلومتر، ذراع، سنة ضوئية', icon: '📏', color: 'purple', gradient: 'from-purple-500 to-pink-500' },
  { name: 'تحويل الحرارة', href: '/temperature', desc: 'سيلزيوس، فهرنهايت، كلفن، ريومور، نيوتن', icon: '🌡️', color: 'orange', gradient: 'from-orange-500 to-red-500' },
  { name: 'تحويل التاريخ', href: '/date', desc: 'هجري ↔ ميلادي مع أسماء الشهور', icon: '📅', color: 'cyan', gradient: 'from-cyan-500 to-blue-500' },
  { name: 'المقاييس التراثية', href: '/ancient', desc: 'ذراع، شبر، قامة، من، مثقال، درهم', icon: '🏺', color: 'amber', gradient: 'from-amber-500 to-orange-500' },
];

// حقائق سريعة للشريط المتحرك
const facts = [
  '📏 1 ميل = 1.609 كيلومتر',
  '⚖️ 1 كيلوجرام = 2.2046 رطل',
  '🌡️ 0°C = 32°F = 273.15K',
  '💰 1 أونصة ذهب = 31.1035 جرام',
  '📅 1 رمضان 1445 هـ = 11 مارس 2024 م',
  '⚖️ 1 مثقال = 4.25 جرام',
  '📏 1 ذراع = 0.462 متر',
  '🏺 1 من = 800 جرام',
  '🌡️ الصفر المطلق = -273.15°C',
];

const Home: React.FC = () => {
  // تأثير Scroll Reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.title = 'تحويلاتي - أدوات تحويل سريعة ودقيقة';
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <h1 className="sr-only">تحويلاتي - أدوات تحويل العملات، الأوزان، الأطوال، الحرارة، والتواريخ</h1>
      
      <main>
        {/* Hero Section - العنوان الرئيسي */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30" />
          
          <div className="relative container mx-auto px-4 text-center">
            <div className="reveal">
              <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                تحويلاتي
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
                منصة القياس العربية الأولى. حوّل بدقة، وتعلّم بذكاء.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/currency" className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-medium hover:shadow-xl transition-all hover:-translate-y-1">
                  ابدأ التحويل الآن
                </Link>
                <a href="#about" className="px-8 py-3 bg-white border border-gray-200 rounded-full font-medium hover:bg-gray-50 transition-all">
                  تعرّف علينا
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* أدوات التحويل - بطاقات Glassmorphism */}
        <section className="py-16 container mx-auto px-4">
          <div className="reveal text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              أدوات تحويل دقيقة
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              أكثر من 50 أداة تحويل في مكان واحد، مع دعم خاص للوحدات التراثية العربية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tools.map((tool, idx) => (
              <Link
                key={tool.href}
                to={tool.href}
                className="group glass-card rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className={`text-5xl mb-4 bg-gradient-to-r ${tool.gradient} bg-clip-text text-transparent`}>
                  {tool.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-amber-600 transition">
                  {tool.name}
                </h3>
                <p className="text-gray-500 text-sm">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ========== قسم "عالم القياس" (Knowledge Hub) ========== */}
        <section id="about" className="py-16 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="reveal">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                عالم القياس: من الذراع إلى النانو
              </h2>
              <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
                <p>
                  منذ فجر التاريخ، سعى الإنسان لقياس العالم من حوله. استخدم <strong className="text-amber-700">الذراع</strong> و <strong className="text-amber-700">الشبر</strong> 
                  لبناء المعابد والمساكن. ثم جاءت الحضارة الإسلامية وأضافت وحدات مثل <strong className="text-amber-700">القامة</strong> و <strong className="text-amber-700">الفرسخ</strong>.
                </p>
                <p>
                  اليوم، نقيس المسافات بـ <strong className="text-blue-700">النانومتر</strong> و <strong className="text-blue-700">السنة الضوئية</strong>، 
                  ونحول العملات بسرعات البرق، ونتعامل مع حرارة النجوم وأعماق المحيطات. في <strong>تحويلاتي</strong>، نجمع هذا الإرث العريق مع أحدث 
                  المعايير الدولية (BIPM) لنقدم لك أداة دقيقة وسهلة.
                </p>
                <p className="bg-amber-50 p-4 rounded-xl border-r-4 border-amber-500 mt-4">
                  🏺 <strong className="text-amber-800">جديد:</strong> اكتشف <Link to="/ancient" className="text-amber-600 underline font-bold">المقاييس التراثية العربية</Link> - حوّل الذراع، الشبر، المن، المثقال إلى وحدات حديثة بدقة.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* شريط المعلومات المتحرك (Ticker) */}
        <div className="ticker">
          <div className="ticker-content">
            {facts.map((fact, i) => (
              <span key={i}>{fact}</span>
            ))}
            {facts.map((fact, i) => (
              <span key={`dup-${i}`}>{fact}</span>
            ))}
          </div>
        </div>

        {/* Trust Bar (مصداقية الموقع) */}
        <div className="bg-slate-900 py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span> معايير BIPM الدولية
              </span>
              <span className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span> تحديث أسعار فوري
              </span>
              <span className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span> دقة حتى 6 أرقام عشرية
              </span>
              <span className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span> أكثر من 50 أداة تحويل
              </span>
              <span className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span> وحدات تراثية عربية
              </span>
            </div>
          </div>
        </div>

        {/* ========== الأسئلة الشائعة الذكية (Accordion) ========== */}
        <section className="py-16 container mx-auto px-4 max-w-3xl">
          <div className="reveal">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              أسئلة شائعة
            </h2>
            <div className="space-y-4">
              {[
                { q: 'كيف يتم حساب فرق التوقيت بدقة في السنوات الكبيسة؟', a: 'نعتمد على معادلات فلكية دقيقة تحسب السنوات الكبيسة وفق التقويم الميلادي والهجري، مع مراعاة فروق التوقيت العالمي (UTC).' },
                { q: 'ما هو الفرق بين الأوقية العادية وأوقية الذهب (Troy Ounce)؟', a: 'الأوقية العادية (avoirdupois) = 28.3495 جرام، بينما أوقية الذهب (troy) = 31.1035 جرام. أوقية الذهب أثقل بحوالي 10%.' },
                { q: 'لماذا نستخدم السيلزيوس في الوطن العربي والفهرنهايت في أمريكا؟', a: 'السيلزيوس يعتمد على نقاط تجمد وغليان الماء (0-100) وهو النظام المتري المعتمد عالمياً. الفهرنهايت نظام تاريخي لا يزال مستخدماً في أمريكا وبعض الدول.' },
                { q: 'ما هي الوحدات التراثية العربية المتوفرة في الموقع؟', a: 'نوفر وحدات طول: الذراع (≈ 0.462 م)، الشبر (≈ 23 سم)، القامة (≈ 1.85 م)، الفرسخ (≈ 5.5 كم). ووحدات وزن: المن (≈ 800 جم)، المثقال (≈ 4.25 جم)، الدرهم (≈ 2.97 جم)، الرطل السعودي (≈ 453 جم).' },
                { q: 'هل التحويلات في موقعكم تعتمد على الأسعار الحية؟', a: 'نعم، أسعار العملات تُحدث كل ساعة من مصادر موثوقة، مع تخزين الكاش لتجربة سريعة.' },
              ].map((item, idx) => (
                <details key={idx} className="group glass-card rounded-xl p-4">
                  <summary className="font-bold text-gray-800 cursor-pointer list-none flex justify-between items-center">
                    {item.q}
                    <span className="text-amber-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="text-gray-600 mt-3 pr-4">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
