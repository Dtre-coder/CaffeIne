import { useCart } from '@/lib/useCart'
import { useState } from 'react'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, totalPrice, totalCount, removeItem, changeQty, clearCart } = useCart()
  const [step, setStep] = useState<'cart' | 'form' | 'done'>('cart')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [time, setTime] = useState('asap')

  const handleOrder = () => {
    if (!name.trim()) return
    setStep('done')
    setTimeout(() => {
      clearCart()
      setName('')
      setPhone('')
      setTime('asap')
      setStep('cart')
      onClose()
    }, 3000)
  }

  const reset = () => { setStep('cart') }

  const syrupLabel = (s?: string) => s === 'vanilla' ? 'ваниль' : s === 'caramel' ? 'карамель' : null
  const milkLabel = (m?: string) => m === 'oat' ? 'овсяное' : null

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          style={{ background: 'rgba(10,10,20,0.45)', backdropFilter: 'blur(4px)' }}
          onClick={onClose}
        />
      )}

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] z-50 flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ background: '#f5f4f2' }}
      >
        {/* Header */}
        <div className="glass border-b border-white/40 px-5 py-4 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-lg font-extrabold text-[#1a1a2e]" style={{ letterSpacing: '-0.02em' }}>
              {step === 'form' ? 'Оформление' : '🛒 Предзаказ'}
            </h2>
            {totalCount > 0 && step === 'cart' && (
              <p className="text-xs text-gray-400 mt-0.5">{totalCount} позиц. · {totalPrice} ₽</p>
            )}
          </div>
          <button
            onClick={step === 'form' ? reset : onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors"
            style={{ background: 'rgba(0,0,0,0.06)' }}
          >
            {step === 'form' ? '←' : '✕'}
          </button>
        </div>

        {/* ── DONE ── */}
        {step === 'done' ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center px-8">
              <div className="text-7xl mb-5">🎉</div>
              <div className="text-2xl font-extrabold text-[#1a1a2e]" style={{ letterSpacing: '-0.03em' }}>
                Предзаказ принят!
              </div>
              <div className="text-sm text-gray-400 mt-2 leading-relaxed">
                Мы свяжемся с вами для подтверждения
              </div>
            </div>
          </div>

        /* ── FORM ── */
        ) : step === 'form' ? (
          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-3">
            <p className="text-sm text-gray-400">Укажите имя и мы перезвоним для подтверждения</p>

            <label className="block">
              <span className="text-xs font-700 text-gray-400 uppercase tracking-widest block mb-1.5">Ваше имя *</span>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Иван"
                className="w-full px-4 py-3 rounded-2xl text-sm outline-none border-2 border-transparent bg-white transition-all"
                style={{ fontFamily: 'Manrope, sans-serif' }}
                onFocus={e => (e.target.style.borderColor = '#1a1a2e')}
                onBlur={e => (e.target.style.borderColor = 'transparent')}
              />
            </label>

            <label className="block">
              <span className="text-xs font-700 text-gray-400 uppercase tracking-widest block mb-1.5">Телефон</span>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+7 (___) ___-__-__"
                className="w-full px-4 py-3 rounded-2xl text-sm outline-none border-2 border-transparent bg-white transition-all"
                style={{ fontFamily: 'Manrope, sans-serif' }}
                onFocus={e => (e.target.style.borderColor = '#1a1a2e')}
                onBlur={e => (e.target.style.borderColor = 'transparent')}
              />
            </label>

            <label className="block">
              <span className="text-xs font-700 text-gray-400 uppercase tracking-widest block mb-1.5">Время</span>
              <select
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl text-sm bg-white outline-none border-2 border-transparent"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                <option value="asap">Как можно скорее</option>
                <option value="15">Через 15 минут</option>
                <option value="30">Через 30 минут</option>
                <option value="60">Через 1 час</option>
              </select>
            </label>

            {/* Order summary */}
            <div className="bg-white rounded-2xl p-4 space-y-1.5">
              <p className="text-xs font-700 text-gray-400 uppercase tracking-widest mb-2">Ваш заказ</p>
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-700 truncate mr-2">{item.emoji} {item.itemNameRu} ×{item.quantity}</span>
                  <span className="font-700 text-[#1a1a2e] shrink-0">{item.price * item.quantity} ₽</span>
                </div>
              ))}
              <div className="border-t border-gray-100 pt-2 mt-2 flex justify-between font-extrabold text-[#1a1a2e]">
                <span>Итого</span>
                <span>{totalPrice} ₽</span>
              </div>
            </div>

            <button
              onClick={handleOrder}
              disabled={!name.trim()}
              className="btn-pill w-full py-4 text-base text-white font-800 mt-2"
              style={{ background: name.trim() ? '#1a1a2e' : '#ccc', color: 'white' }}
            >
              Подтвердить предзаказ
            </button>
          </div>

        /* ── CART ── */
        ) : items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <div className="text-6xl mb-4">🛒</div>
              <p className="font-700 text-gray-500">Корзина пуста</p>
              <p className="text-sm mt-1">Добавьте позиции из меню кофейни</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {items.map(item => {
                const opts = [
                  item.volume && `${item.volume} л`,
                  syrupLabel(item.syrup),
                  milkLabel(item.milk),
                  item.comment,
                ].filter(Boolean)

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl p-3.5 flex items-center gap-3"
                    style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}
                  >
                    {/* color dot */}
                    <div className="w-1 self-stretch rounded-full shrink-0" style={{ background: item.shopColor }} />

                    <span className="text-2xl shrink-0">{item.emoji}</span>

                    <div className="flex-1 min-w-0">
                      <p className="font-700 text-[#1a1a2e] text-sm leading-tight truncate">{item.itemNameRu}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.shopName}</p>
                      {opts.length > 0 && (
                        <p className="text-xs text-gray-400 mt-0.5">{opts.join(' · ')}</p>
                      )}
                    </div>

                    {/* Qty stepper */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => changeQty(item.id, -1)}
                        className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-700 hover:bg-gray-200 text-sm transition-colors"
                      >−</button>
                      <span className="w-5 text-center text-sm font-800 text-[#1a1a2e]">{item.quantity}</span>
                      <button
                        onClick={() => changeQty(item.id, 1)}
                        className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-700 hover:bg-gray-200 text-sm transition-colors"
                      >+</button>
                    </div>

                    <div className="text-sm font-800 text-[#1a1a2e] shrink-0 w-14 text-right">
                      {item.price * item.quantity} ₽
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="shrink-0 text-gray-300 hover:text-red-400 transition-colors ml-0.5"
                    >✕</button>
                  </div>
                )
              })}
            </div>

            {/* Footer */}
            <div className="shrink-0 px-4 py-4 glass border-t border-white/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-base font-extrabold text-[#1a1a2e]" style={{ letterSpacing: '-0.02em' }}>
                  Итого: {totalPrice} ₽
                </span>
                <button onClick={clearCart} className="text-xs text-gray-400 hover:text-red-400 transition-colors">
                  Очистить
                </button>
              </div>
              <button
                onClick={() => setStep('form')}
                className="btn-pill w-full py-4 text-base text-white font-800"
                style={{ background: '#1a1a2e' }}
              >
                Оформить предзаказ →
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
