import { useState } from 'react'
import type { MenuItem, CoffeeShop } from '@/data/coffeeShops'
import { useFavorites } from '@/lib/useFavorites'
import { useCart } from '@/lib/useCart'
import { FoodIllustration } from './FoodIllustration'

interface ProductModalProps {
  item: MenuItem
  shop: CoffeeShop
  onClose: () => void
  onCartOpen?: () => void
}

type Volume = '0.2' | '0.3' | '0.4'
type Syrup = 'none' | 'vanilla' | 'caramel'
type Milk = 'regular' | 'oat'

export function ProductModal({ item, shop, onClose, onCartOpen }: ProductModalProps) {
  const [volume, setVolume] = useState<Volume>('0.3')
  const [syrup, setSyrup] = useState<Syrup>('none')
  const [milk, setMilk] = useState<Milk>('regular')
  const [comment, setComment] = useState('')
  const [added, setAdded] = useState(false)

  const { isFavorite, toggleFavorite } = useFavorites()
  const { addItem } = useCart()
  const fav = isFavorite(item.id)

  const isCoffee = item.category === 'coffee'
  const volumePrices: Record<Volume, number> = { '0.2': -30, '0.3': 0, '0.4': 40 }
  const syrupPrices: Record<Syrup, number> = { none: 0, vanilla: 50, caramel: 50 }
  const milkPrices: Record<Milk, number> = { regular: 0, oat: 60 }

  const totalPrice = isCoffee
    ? item.price + volumePrices[volume] + syrupPrices[syrup] + milkPrices[milk]
    : item.price

  const buildCartId = () =>
    isCoffee
      ? `${item.id}-${volume}-${syrup}-${milk}`
      : `${item.id}-plain`

  const handleAddToCart = () => {
    addItem({
      id: buildCartId(),
      shopId: shop.id,
      shopName: shop.name,
      shopColor: shop.color,
      itemId: item.id,
      itemNameRu: item.nameRu,
      emoji: item.emoji,
      price: totalPrice,
      volume: isCoffee ? volume : undefined,
      syrup: isCoffee ? syrup : undefined,
      milk: isCoffee ? milk : undefined,
      comment: comment.trim() || undefined,
    })
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
      onClose()
      onCartOpen?.()
    }, 1200)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
        {/* Header */}
        <div
          className="p-6 text-white relative"
          style={{ backgroundColor: shop.color }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white opacity-70 hover:opacity-100 text-2xl leading-none"
          >
            ×
          </button>
          {/* Illustration */}
          <div className="flex justify-center mb-3">
            <FoodIllustration itemId={item.id} color="rgba(255,255,255,0.25)" size={90} />
          </div>
          <h2 className="text-2xl font-bold">{item.nameRu}</h2>
          <p className="text-sm opacity-80 mt-1">{shop.name}</p>
          <p className="text-sm opacity-70 mt-1">{item.description}</p>
        </div>

        <div className="p-6 space-y-4">
          {isCoffee && (
            <>
              {/* Volume */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Объём</label>
                <div className="flex gap-2">
                  {(['0.2', '0.3', '0.4'] as Volume[]).map((v) => (
                    <button
                      key={v}
                      onClick={() => setVolume(v)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium border-2 transition-colors ${
                        volume === v ? 'text-white border-transparent' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                      }`}
                      style={volume === v ? { backgroundColor: shop.color, borderColor: shop.color } : {}}
                    >
                      {v} л
                    </button>
                  ))}
                </div>
              </div>

              {/* Syrup */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Сироп</label>
                <div className="flex gap-2">
                  {([{ value: 'none', label: 'Без сиропа' }, { value: 'vanilla', label: 'Ваниль' }, { value: 'caramel', label: 'Карамель' }] as { value: Syrup; label: string }[]).map((s) => (
                    <button
                      key={s.value}
                      onClick={() => setSyrup(s.value)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium border-2 transition-colors ${
                        syrup === s.value ? 'text-white border-transparent' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                      }`}
                      style={syrup === s.value ? { backgroundColor: shop.color, borderColor: shop.color } : {}}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Milk */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Молоко</label>
                <div className="flex gap-2">
                  {([{ value: 'regular', label: 'Обычное' }, { value: 'oat', label: 'Овсяное +60₽' }] as { value: Milk; label: string }[]).map((m) => (
                    <button
                      key={m.value}
                      onClick={() => setMilk(m.value)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium border-2 transition-colors ${
                        milk === m.value ? 'text-white border-transparent' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                      }`}
                      style={milk === m.value ? { backgroundColor: shop.color, borderColor: shop.color } : {}}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Comment */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Комментарий к заказу</label>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Например: не острое, без лука…"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-gray-400 transition-colors"
            />
          </div>

          {/* Price + actions */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="text-2xl font-bold text-gray-900">{totalPrice} ₽</div>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  toggleFavorite({
                    shopId: shop.id,
                    shopName: shop.name,
                    itemId: item.id,
                    itemName: item.name,
                    itemNameRu: item.nameRu,
                    price: item.price,
                    emoji: item.emoji,
                  })
                }
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors ${
                  fav ? 'bg-red-50 border-red-300 text-red-500' : 'bg-white border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-400'
                }`}
                title={fav ? 'Удалить из избранного' : 'В избранное'}
              >
                <HeartIcon filled={fav} />
              </button>
              <button
                onClick={handleAddToCart}
                className="px-6 py-2 rounded-xl text-white font-semibold transition-all hover:scale-105 active:scale-95"
                style={{ backgroundColor: shop.color }}
              >
                {added ? '✓ Добавлено!' : 'В корзину'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}
