import { Link, createFileRoute } from '@tanstack/react-router'
import coffeeShops from '@/data/coffeeShops'
import { CoffeeMap } from '@/components/CoffeeMap'

export const Route = createFileRoute('/')({\n  component: HomePage,
})

function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: '#f5f4f2' }}>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)' }}>
        {/* Decorative blobs */}
        <div className="absolute top-[-60px] right-[-60px] w-64 h-64 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #e8c547, transparent 70%)' }} />
        <div className="absolute bottom-[-40px] left-[-40px] w-48 h-48 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #4fc3f7, transparent 70%)' }} />

        <div className="max-w-5xl mx-auto px-4 pt-12 pb-14 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-700 mb-5 fade-up"
               style={{ background: 'rgba(232,197,71,0.18)', color: '#e8c547', border: '1px solid rgba(232,197,71,0.3)' }}>
            ☕ Предзаказ и доставка
          </div>
          <div className="flex items-center justify-center gap-4 mb-4 fade-up fade-up-1">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <img src="/logo.png" alt="КофеИн" className="w-12 h-12 object-contain" style={{ mixBlendMode: 'screen' }} />
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white" style={{ letterSpacing: '-0.04em' }}>КофеИн</h1>
          </div>
          <p className="text-base text-white/60 max-w-sm mx-auto fade-up fade-up-2" style={{ fontWeight: 500 }}>
            Лучшие кофейни города — напитки и завтраки. Кликни на метку, выбери, оформи предзаказ.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Map card */}
        <div className="mb-10 fade-up">
          <div className="rounded-3xl overflow-hidden shadow-xl">
            <CoffeeMap shops={coffeeShops} />
          </div>
        </div>

        {/* Shop cards */}
        <h2 className="text-xl font-extrabold mb-5 fade-up" style={{ letterSpacing: '-0.02em', color: '#1a1a2e' }}>Кофейни</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {coffeeShops.map((shop, i) => (
            <Link
              key={shop.id}
              to="/shop/$shopId"
              params={{ shopId: shop.id }}
              className={`block bg-white rounded-[20px] overflow-hidden card-hover fade-up fade-up-${Math.min(i+1,3)}`}
              style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.07)' }}
            >
              {/* Color strip */}
              <div className="h-2 w-full" style={{ background: shop.color }} />
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-base shrink-0"
                    style={{ background: shop.color }}
                  >
                    ☕
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[#1a1a2e] text-base leading-tight" style={{ letterSpacing: '-0.02em' }}>{shop.name}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{shop.address}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{shop.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="tag" style={{ background: shop.bgColor, color: shop.color }}>
                    {shop.menu.filter(m => m.category === 'coffee').length} напитков
                  </span>
                  <span className="text-xs text-gray-400">
                    {shop.menu.filter(m => m.category === 'food').length} блюд →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
