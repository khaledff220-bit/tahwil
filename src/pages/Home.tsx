import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const tools = [
  { name: 'تحويل العملات', href: '/currency', desc: 'حوّل بين 20+ عملة عالمية', icon: '💰', color: 'blue' },
  { name: 'تحويل التاريخ', href: '/date', desc: 'هجري ⇄ ميلادي بأسماء الشهور', icon: '📅', color: 'green' },
  { name: 'تحويل الوزن', href: '/weight', desc: 'كجم، رطل، طن، أوقية', icon: '⚖️', color: 'yellow' },
  { name: 'تحويل الطول', href: '/length', desc: 'متر، قدم، إنش، ياردة', icon: '📏', color: 'purple' },
  { name: 'تحويل الحرارة', href: '/temperature', desc: 'سيليزي، فهرنهايت، كلفن', icon: '🌡️', color: 'red' },
]

export default function Home() {
  useEffect(() => {
    document.title = 'تحويلاتي - أدوات تحويل سريعة ودقيقة'
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          مرحباً بك في <span className="text-blue-600">تحويلاتي</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          أدوات تحويل سريعة ودقيقة مع معلومات مفيدة. اختر الأداة التي تريدها وابدأ التحويل الآن!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            to={tool.href}
            className={`bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-b-4 border-${tool.color}-500`}
          >
            <div className="text-5xl mb-4">{tool.icon}</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{tool.name}</h2>
            <p className="text-gray-600">{tool.desc}</p>
          </Link>
        ))}
      </div>

      <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          لماذا تختار تحويلاتي؟
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-bold text-xl mb-2">سرعة فائقة</h3>
            <p className="text-gray-600">نتائج فورية دون انتظار</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-bold text-xl mb-2">دقة عالية</h3>
            <p className="text-gray-600">حسابات دقيقة حتى 6 أرقام عشرية</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="font-bold text-xl mb-2">متوافق مع الجوال</h3>
            <p className="text-gray-600">صمم خصيصاً للاستخدام على الهاتف</p>
          </div>
        </div>
      </div>
    </div>
  )
}
