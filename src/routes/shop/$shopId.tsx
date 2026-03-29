import { Link, createFileRoute } from '@tanstack/react-router'
import coffeeShops from '@/data/coffeeShops'
import { MenuCard } from '@/components/MenuCard'
import { useState } from 'react'

export const Route = createFileRoute('/shop/$shopId')({
  component: ShopPage,
  loader: ({ params }) => {
    const shop = coffeeShops.find((s) => s.id === params.shopId)
    if (!shop) throw new Error('Coffee shop not found')
    return shop
  },
})

function ShopPage() {
  const shop = Route.useLoaderData()
  const [tab, setTab] = useState<'all' | 'coffee' | 'food'>('all')
  const filtered = tab === 'all' ? shop.menu : shop.menu.filter((i) => i.category === tab)

  return (
    <div className="min-h-screen" style={{ background: '#f5f4f2' }}>
      {/* Hero header */}
      <div className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${shop.color} 0%, ${shop.color}cc 100%)` }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, white, transparent 60%)' }} />
        <div className="max-w-4xl mx-auto px-4 pt-8 pb-10 relative">
          <Link to="/" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-600 mb-6 transition-colors">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Все кофейни
          </Link>
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-4xl font-extrabold text-white mb-1" style={{ letterSpacing: '-0.03em' }}>{shop.name}</h1>
              <p className="text-white/70 text-sm font-500">{shop.address}</p>
              <p className="text-white/55 text-sm mt-2 max-w-md leading-relaxed">{shop.description}</p>
            </div>
            <div className="hidden md:flex flex-col items-end gap-1">
              <span className="text-white/40 text-xs font-600 uppercase tracking-wide">Позиций</span>
              <span className="text-white text-3xl font-extrabold">{shop.menu.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky tab bar */}
      <div className="sticky top-[60px] z-30 glass border-b border-white/40">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-2">
          {(['all', 'coffee', 'food'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="btn-pill px-5 py-2 text-sm transition-all"
              style={
                tab === t
                  ? { background: '#1a1a2e', color: 'white' }
                  : { background: 'rgba(0,0,0,0.06)', color: '#555' }
              }
            >
              {t === 'all' ? 'Всё' : t === 'coffee' ? '☕ Напитки' : '🍽 Завтраки'}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((item, i) => (
            <div key={item.id} className={`fade-up fade-up-${Math.min(i % 3 + 1, 3)}`}>
              <MenuCard item={item} shop={shop} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
