import { Link, createFileRoute } from '@tanstack/react-router'
import coffeeShops from '@/data/coffeeShops'
import { CoffeeMap } from '@/components/CoffeeMap'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <img src="/logo.png" alt="КофеИн" className="h-14 w-14 object-contain" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">КофеИн</h1>
          </div>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Лучшие кофейни города — напитки и завтраки с предзаказом. Нажмите на метку, чтобы увидеть меню.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Map */}
        <div className="mb-10">
          <CoffeeMap shops={coffeeShops} />
        </div>

        {/* Shop cards */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">Все кофейни</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {coffeeShops.map((shop) => (
            <Link
              key={shop.id}
              to="/shop/$shopId"
              params={{ shopId: shop.id }}
              className="block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5 group"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mb-3 text-lg"
                style={{ backgroundColor: shop.color }}
              >
                ☕
              </div>
              <h3 className="font-bold text-gray-900 text-lg group-hover:underline">
                {shop.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{shop.address}</p>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {shop.description}
              </p>
              <div className="mt-3 text-sm font-medium" style={{ color: shop.color }}>
                {shop.menu.length} напитка →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
