import { useCart } from '@/lib/useCart'
import { useState } from 'react'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, totalPrice, totalCount, removeItem, changeQty, clearCart } = useCart()
  const [ordered, setOrdered] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [time, setTime] = useState('asap')

  const handleOrder = () => {
    if (!name.trim()) return
    setOrdered(true)
    setTimeout(() => {
      setOrdered(false)
      clearCart()
      setName('')
      setPhone('')
      setTime('asap')
      onClose()
    }, 3000)
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md z-50 bg-white shadow-2xl flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900">🛒 Предзаказ</h2>
            {totalCount > 0 && (
              <p className="text-sm text-gray-500">{totalCount} позиц.</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
          >
            ✕
          </button>
        </div>

        {ordered ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center px-8">
              <div className="text-6xl mb-4">🎉</div>
              <div className="text-xl font-bold text-gray-900">Предзаказ принят!</div>
              <div className="text-sm text-gray-500 mt-2">
                Мы свяжемся с вами для подтверждения
              </div>
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <div className="text-5xl mb-3">🛒</div>
              <p className="font-medium">Корзина пуста</p>
              <p className="text-sm mt-1">Добавьте позиции из меню</p>
            </div>
          </div>
        ) : (
          <>
            {/* Items list */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 bg-gray-50 rounded-xl p-3"
                >
                  <span className="text-2xl shrink-0">{item.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 text-sm truncate">
                      {item.itemNameRu}
                    </div>
                    <div className="text-xs text-gray-500">{item.shopName}</div>
                    {(item.volume || item.syrup !== 'none' || item.milk !== 'regular') && (
                      <div className="text-xs text-gray-400 mt-0.5">
                        {[
                          item.volume && `${item.volume} л`,
                          item.syrup && item.syrup !== 'none' && item.syrup === 'vanilla' ? 'ваниль' : item.syrup === 'caramel' ? 'карамель' : null,
                          item.milk === 'oat' ? 'овсяное' : null,
                        ]
                          .filter(Boolean)
                          .join(' · ')}
                      </div>
                    )}
                    {item.comment && (
                      <div className="text-xs text-gray-400 italic mt-0.5">
                        {item.comment}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => changeQty(item.id, -1)}
                      className="w-7 h-7 rounded-full bg-white border border-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-100 text-sm"
                    >
                      −
                    </button>
                    <span className="w-5 text-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => changeQty(item.id, 1)}
                      className="w-7 h-7 rounded-full bg-white border border-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-100 text-sm"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-sm font-bold text-gray-900 shrink-0 ml-1 w-16 text-right">
                    {item.price * item.quantity} ₽
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="shrink-0 text-gray-300 hover:text-red-400 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Order form */}
            <div className="px-5 py-4 border-t border-gray-100 space-y-3">
              <div className="flex items-center justify-between text-base font-bold text-gray-900">
                <span>Итого</span>
                <span>{totalPrice} ₽</span>
              </div>

              <input
                type="text"
                placeholder="Ваше имя *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-gray-400 transition-colors"
              />
              <input
                type="tel"
                placeholder="Телефон"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-gray-400 transition-colors"
              />
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-gray-400 bg-white transition-colors"
              >
                <option value="asap">Как можно скорее</option>
                <option value="15">Через 15 минут</option>
                <option value="30">Через 30 минут</option>
                <option value="60">Через 1 час</option>
              </select>

              <button
                onClick={handleOrder}
                disabled={!name.trim()}
                className="w-full py-3 rounded-xl bg-gray-900 text-white font-semibold text-sm hover:bg-gray-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Оформить предзаказ
              </button>
              <button
                onClick={clearCart}
                className="w-full text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                Очистить корзину
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
