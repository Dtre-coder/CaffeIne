import { useState, useEffect, createContext, useContext } from 'react'

export interface CartItem {
  id: string
  shopId: string
  shopName: string
  shopColor: string
  itemId: string
  itemNameRu: string
  emoji: string
  price: number
  quantity: number
  volume?: string
  syrup?: string
  milk?: string
  comment?: string
}

const STORAGE_KEY = 'coffeein-cart-v2'

// Singleton state so all hooks share the same array
let _items: CartItem[] = []
let _listeners: Array<() => void> = []

function loadFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const s = localStorage.getItem(STORAGE_KEY)
    return s ? JSON.parse(s) : []
  } catch { return [] }
}

function saveToStorage(items: CartItem[]) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)) } catch {}
}

function setItems(next: CartItem[]) {
  _items = next
  saveToStorage(next)
  _listeners.forEach(fn => fn())
}

// Initialise once
if (typeof window !== 'undefined') {
  _items = loadFromStorage()
}

export function useCart() {
  const [, forceRender] = useState(0)

  useEffect(() => {
    const rerender = () => forceRender(n => n + 1)
    _listeners.push(rerender)
    return () => { _listeners = _listeners.filter(fn => fn !== rerender) }
  }, [])

  const totalCount = _items.reduce((s, i) => s + i.quantity, 0)
  const totalPrice = _items.reduce((s, i) => s + i.price * i.quantity, 0)

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    const existing = _items.find(x => x.id === item.id)
    if (existing) {
      setItems(_items.map(x => x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x))
    } else {
      setItems([..._items, { ...item, quantity: 1 }])
    }
  }

  const removeItem = (id: string) => setItems(_items.filter(x => x.id !== id))

  const changeQty = (id: string, delta: number) =>
    setItems(_items.map(x => x.id === id ? { ...x, quantity: x.quantity + delta } : x).filter(x => x.quantity > 0))

  const clearCart = () => setItems([])

  return { items: _items, totalCount, totalPrice, addItem, removeItem, changeQty, clearCart }
}
