import { Link, createFileRoute } from '@tanstack/react-router'
import { useFavorites } from '@/lib/useFavorites'
import { useState } from 'react'
import coffeeShops from '@/data/coffeeShops'
import { ProductModal } from '@/components/ProductModal'
import type { MenuItem, CoffeeShop } from '@/data/coffeeShops'

export const Route = createFileRoute('/favorites')({
  component: FavoritesPage,
})

function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites()
  const [selected, setSelected] = useState<{ item: MenuItem; shop: CoffeeShop } | null>(null)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-800 text-sm mb-4">
            ← На карту
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">❤️ Избранное</h1>
          <p className="text-gray-500 mt-1">
            {favorites.length === 0
              ? 'Пока пусто — добавьте напитки из меню кофеен'
              : `${favorites.length} ${pluralize(favorites.length, 'напиток', 'напитка', 'напитков')}`}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {favorites.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-6xl mb-4">☕</div>
            <p className="text-lg font-medium">Список избранного пуст</p>
            <p className="text-sm mt-2">Нажмите ❤️ на карточке напитка, чтобы сохранить его</p>
            <Link
              to="/"
              className="inline-block mt-6 px-6 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-700 transition-colors"
            >
              Открыть карту
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {favorites.map((fav) => {
              const shop = coffeeShops.find((s) => s.id === fav.shopId)
              const item = shop?.menu.find((m) => m.id === fav.itemId)

              return (
                <div
                  key={fav.itemId}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                >
                  <div
                    className="h-24 flex items-center justify-center text-4xl relative"
                    style={{ backgroundColor: shop?.bgColor ?? '#f5f5f5' }}
                  >
                    {fav.emoji}
                    <button
                      onClick={() => removeFavorite(fav.itemId)}
                      className="absolute top-3 right-3 w-7 h-7 rounded-full bg-red-50 border border-red-200 text-red-400 flex items-center justify-center hover:bg-red-100 transition-colors"
                      title="Удалить из избранного"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <div
                      className="text-xs font-medium mb-1"
                      style={{ color: shop?.color }}
                    >
                      {fav.shopName}
                    </div>
                    <h3 className="font-bold text-gray-900">{fav.itemNameRu}</h3>
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-bold text-gray-900">{fav.price} ₽</span>
                      {shop && item && (
                        <button
                          onClick={() => setSelected({ item, shop })}
                          className="px-4 py-1.5 rounded-xl text-white text-sm font-medium transition-transform hover:scale-105"
                          style={{ backgroundColor: shop.color }}
                        >
                          Заказать
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {selected && (
        <ProductModal
          item={selected.item}
          shop={selected.shop}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  )
}

function pluralize(n: number, one: string, few: string, many: string) {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod100 >= 11 && mod100 <= 19) return many
  if (mod10 === 1) return one
  if (mod10 >= 2 && mod10 <= 4) return few
  return many
}
