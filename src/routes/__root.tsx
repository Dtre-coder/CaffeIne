import { HeadContent, Link, Scripts, createRootRoute } from '@tanstack/react-router'
import '../styles.css'
import { useState } from 'react'
import { useCart } from '@/lib/useCart'
import { CartDrawer } from '@/components/CartDrawer'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'КофеИн' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false)
  const { totalCount } = useCart()

  return (
    <html lang="ru">
      <head>
        <HeadContent />
      </head>
      <body>
        <nav className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5 font-bold text-gray-900 text-lg hover:opacity-80 transition-opacity">
              <img src="/logo.png" alt="КофеИн" className="h-9 w-9 object-contain" />
              <span>КофеИн</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors [&.active]:font-semibold [&.active]:text-gray-900"
              >
                Карта
              </Link>
              <Link
                to="/favorites"
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors [&.active]:font-semibold [&.active]:text-gray-900"
              >
                <span>❤️</span>
                <span>Избранное</span>
              </Link>
              <button
                onClick={() => setCartOpen(true)}
                className="relative flex items-center gap-1.5 bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-gray-700 transition-colors"
              >
                <span>🛒</span>
                <span>Предзаказ</span>
                {totalCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
                    {totalCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </nav>
        {children}
        <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        <Scripts />
      </body>
    </html>
  )
}
