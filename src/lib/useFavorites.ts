import { useState, useEffect } from 'react'

export interface FavoriteItem {
  shopId: string
  shopName: string
  itemId: string
  itemName: string
  itemNameRu: string
  price: number
  emoji: string
}

const STORAGE_KEY = 'coffee-favorites'

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch {
      // ignore
    }
  }, [favorites])

  const isFavorite = (itemId: string) =>
    favorites.some((f) => f.itemId === itemId)

  const toggleFavorite = (item: FavoriteItem) => {
    setFavorites((prev) =>
      prev.some((f) => f.itemId === item.itemId)
        ? prev.filter((f) => f.itemId !== item.itemId)
        : [...prev, item],
    )
  }

  const removeFavorite = (itemId: string) => {
    setFavorites((prev) => prev.filter((f) => f.itemId !== itemId))
  }

  return { favorites, isFavorite, toggleFavorite, removeFavorite }
}
