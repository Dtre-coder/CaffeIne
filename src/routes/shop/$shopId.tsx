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

  const tabBtn = (value: typeof tab, label: string) => (
    <button
      key={value}
      onClick={() => setTab(value)}
      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
        tab === value ? 'text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
      style={tab === value ? { backgroundColor: shop.color } : {}}
    >
      {label}
    </button>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Shop header */}
      <div className="text-white" style={{ backgroundColor: shop.color }}>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center gap-1 text-white opacity-80 hover:opacity-100 text-sm mb-4">
            ← Все кофейни
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">{shop.name}</h1>
          <p className="opacity-80 mt-1">{shop.address}</p>
          <p className="opacity-70 text-sm mt-2 max-w-lg">{shop.description}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-800">Меню</h2>
          <div className="flex gap-2">
            {tabBtn('all', 'Всё')}
            {tabBtn('coffee', '☕ Напитки')}
            {tabBtn('food', '🍽 Завтраки')}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <MenuCard key={item.id} item={item} shop={shop} />
          ))}
        </div>
      </div>
    </div>
  )
}
