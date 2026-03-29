import { useState } from 'react'
import type { MenuItem, CoffeeShop } from '@/data/coffeeShops'
import { useFavorites } from '@/lib/useFavorites'
import { ProductModal } from './ProductModal'
import { FoodIllustration } from './FoodIllustration'

interface MenuCardProps {
  item: MenuItem
  shop: CoffeeShop
  onCartOpen?: () => void
}

export function MenuCard({ item, shop, onCartOpen }: MenuCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const [modalOpen, setModalOpen] = useState(false)
  const fav = isFavorite(item.id)

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
        {/* Illustration area */}
        <div
          className="h-32 flex items-center justify-center relative"
          style={{ backgroundColor: shop.bgColor }}
        >
          <FoodIllustration itemId={item.id} color={shop.color} size={88} />
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleFavorite({
                shopId: shop.id,
                shopName: shop.name,
                itemId: item.id,
                itemName: item.name,
                itemNameRu: item.nameRu,
                price: item.price,
                emoji: item.emoji,
              })
            }}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-sm ${
              fav
                ? 'bg-red-50 text-red-500 border border-red-200'
                : 'bg-white text-gray-400 border border-gray-200 hover:text-red-400'
            }`}
            title={fav ? 'Удалить из избранного' : 'В избранное'}
          >
            <HeartIcon filled={fav} />
          </button>
          {item.category === 'food' && (
            <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm rounded-full px-2 py-0.5 text-xs font-medium text-gray-600">
              🍽 Еда
            </div>
          )}
        </div>

        {/* Card body */}
        <div className="p-4">
          <h3 className="font-bold text-gray-900 text-base">{item.nameRu}</h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
          <div className="flex items-center justify-between mt-3">
            <span className="text-lg font-bold text-gray-900">{item.price} ₽</span>
            <button
              onClick={() => setModalOpen(true)}
              className="px-4 py-1.5 rounded-xl text-white text-sm font-medium transition-transform hover:scale-105 active:scale-95"
              style={{ backgroundColor: shop.color }}
            >
              Выбрать
            </button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <ProductModal
          item={item}
          shop={shop}
          onClose={() => setModalOpen(false)}
          onCartOpen={onCartOpen}
        />
      )}
    </>
  )
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}
