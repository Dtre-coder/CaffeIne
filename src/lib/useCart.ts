import { useState, useEffect } from 'react'

export interface CartItem {
  id: string // unique key: itemId + options
  shopId: string
  shopName: string
  shopColor: string
  itemId: string
  itemNameRu: string
  emoji: string
  price: number
  quantity: number
  // options
  volume?: string
  syrup?: string
  milk?: string
  comment?: string
}

const STORAGE_KEY = 'coffeein-cart'

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return []
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {}
  }, [items])

  const totalCount = items.reduce((s, i) => s + i.quantity, 0)
  const totalPrice = items.reduce((s, i) => s + i.price * i.quantity, 0)

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    setItems((prev) => {
      const existing = prev.find((x) => x.id === item.id)
      if (existing) {
        return prev.map((x) =>
          x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((x) => x.id !== id))
  }

  const changeQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((x) => (x.id === id ? { ...x, quantity: x.quantity + delta } : x))
        .filter((x) => x.quantity > 0)
    )
  }

  const clearCart = () => setItems([])

  return { items, totalCount, totalPrice, addItem, removeItem, changeQty, clearCart }
}
