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

  const handleAddToCart = () => {
    const cartId = isCoffee ? `${item.id}-${volume}-${syrup}-${milk}` : `${item.id}-plain`
    addItem({
      id: cartId,
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
    }, 1000)
  }

  const OptionGroup = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div>
      <p className="text-xs font-700 text-gray-400 uppercase tracking-widest mb-2">{label}</p>
      <div className="flex gap-2">{children}</div>
    </div>
  )

  const Chip = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button
      onClick={onClick}
      className="flex-1 py-2.5 rounded-2xl text-sm font-700 transition-all border-2"
      style={
        active
          ? { background: shop.color, color: 'white', borderColor: shop.color }
          : { background: 'transparent', color: '#555', borderColor: '#e8e8e8' }
      }
    >
      {children}
    </button>
  )

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      style={{ background: 'rgba(10,10,20,0.55)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="bg-white w-full sm:max-w-md rounded-t-[28px] sm:rounded-[28px] overflow-hidden"
        style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.25)' }}
      >
        {/* Drag handle (mobile) */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        {/* Illustration strip */}
        <div className="relative flex items-center justify-center py-6" style={{ background: shop.bgColor }}>
          <FoodIllustration itemId={item.id} color={shop.color} size={110} />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full glass flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors text-lg"
          >
            ×
          </button>
          <button
            onClick={() => toggleFavorite({ shopId: shop.id, shopName: shop.name, itemId: item.id, itemName: item.name, itemNameRu: item.nameRu, price: item.price, emoji: item.emoji })}
            className="absolute top-4 left-4 w-9 h-9 rounded-full glass flex items-center justify-center transition-all"
            style={fav ? { color: '#e05' } : { color: '#bbb' }}
          >
            <HeartIcon filled={fav} size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 pt-4 pb-6 space-y-4">
          <div>
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-2xl font-extrabold text-[#1a1a2e] leading-tight" style={{ letterSpacing: '-0.03em' }}>
                {item.nameRu}
              </h2>
              <span className="text-2xl font-extrabold text-[#1a1a2e] shrink-0">{totalPrice} ₽</span>
            </div>
            <p className="text-sm text-gray-400 mt-1 leading-relaxed">{item.description}</p>
            <p className="text-xs font-700 mt-1" style={{ color: shop.color }}>{shop.name}</p>
          </div>

          {isCoffee && (
            <>
              <OptionGroup label="Объём">
                {(['0.2', '0.3', '0.4'] as Volume[]).map((v) => (
                  <Chip key={v} active={volume === v} onClick={() => setVolume(v)}>{v} л</Chip>
                ))}
              </OptionGroup>

              <OptionGroup label="Сироп">
                {([['none', 'Без сиропа'], ['vanilla', 'Ваниль'], ['caramel', 'Карамель']] as [Syrup, string][]).map(([v, l]) => (
                  <Chip key={v} active={syrup === v} onClick={() => setSyrup(v)}>{l}</Chip>
                ))}
              </OptionGroup>

              <OptionGroup label="Молоко">
                {([['regular', 'Обычное'], ['oat', 'Овсяное +60₽']] as [Milk, string][]).map(([v, l]) => (
                  <Chip key={v} active={milk === v} onClick={() => setMilk(v)}>{l}</Chip>
                ))}
              </OptionGroup>
            </>
          )}

          <div>
            <p className="text-xs font-700 text-gray-400 uppercase tracking-widest mb-2">Комментарий</p>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Без лука, не острое…"
              className="w-full px-4 py-3 rounded-2xl text-sm outline-none transition-all"
              style={{ background: '#f5f4f2', border: '2px solid transparent' }}
              onFocus={e => (e.target.style.borderColor = shop.color)}
              onBlur={e => (e.target.style.borderColor = 'transparent')}
            />
          </div>

          <button
            onClick={handleAddToCart}
            className="btn-pill w-full py-4 text-base text-white font-800 transition-all"
            style={{ background: added ? '#22c55e' : shop.color }}
          >
            {added ? '✓ Добавлено в корзину!' : `В корзину · ${totalPrice} ₽`}
          </button>
        </div>
      </div>
    </div>
  )
}

function HeartIcon({ filled, size = 18 }: { filled: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}
