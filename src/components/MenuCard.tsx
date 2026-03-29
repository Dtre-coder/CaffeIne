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
      <div
        className="bg-white rounded-[20px] overflow-hidden card-hover cursor-pointer"
        style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
        onClick={() => setModalOpen(true)}
      >
        {/* Illustration */}
        <div className="h-36 flex items-center justify-center relative" style={{ background: shop.bgColor }}>
          <FoodIllustration itemId={item.id} color={shop.color} size={96} />

          {/* Fav button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleFavorite({ shopId: shop.id, shopName: shop.name, itemId: item.id, itemName: item.name, itemNameRu: item.nameRu, price: item.price, emoji: item.emoji })
            }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center transition-all"
            style={fav ? { color: '#e05', borderColor: 'rgba(220,0,80,0.2)' } : { color: '#aaa' }}
          >
            <HeartIcon filled={fav} />
          </button>

          {/* Category pill */}
          <div
            className="absolute bottom-3 left-3 tag"
            style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(8px)', color: shop.color }}
          >
            {item.category === 'food' ? '🍽 Еда' : '☕ Напиток'}
          </div>
        </div>

        {/* Body */}
        <div className="p-4">
          <h3 className="font-extrabold text-[#1a1a2e] text-[15px] leading-tight" style={{ letterSpacing: '-0.02em' }}>
            {item.nameRu}
          </h3>
          <p className="text-xs text-gray-400 mt-1.5 line-clamp-2 leading-relaxed">{item.description}</p>
          <div className="flex items-center justify-between mt-4">
            <span className="text-base font-extrabold text-[#1a1a2e]">{item.price} ₽</span>
            <button
              onClick={(e) => { e.stopPropagation(); setModalOpen(true) }}
              className="btn-pill px-4 py-1.5 text-xs text-white font-700"
              style={{ background: shop.color }}
            >
              + В корзину
            </button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <ProductModal item={item} shop={shop} onClose={() => setModalOpen(false)} onCartOpen={onCartOpen} />
      )}
    </>
  )
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}
