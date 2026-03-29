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
        {/* Nav */}
        <nav className="sticky top-0 z-40 glass border-b border-white/40 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 h-[60px] flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 font-extrabold text-[#1a1a2e] text-[18px] hover:opacity-75 transition-opacity">
              {/* Logo with mix-blend to remove bg */}
              <span
                className="w-9 h-9 flex items-center justify-center rounded-xl overflow-hidden"
                style={{ background: 'transparent' }}
              >
                <img
                  src="/logo.png"
                  alt="КофеИн"
                  className="w-8 h-8 object-contain"
                  style={{ mixBlendMode: 'multiply' }}
                />
              </span>
              <span style={{ letterSpacing: '-0.03em' }}>КофеИн</span>
            </Link>

            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="hidden sm:flex text-sm font-600 text-gray-500 hover:text-[#1a1a2e] transition-colors px-3 py-1.5 rounded-full [&.active]:text-[#1a1a2e] [&.active]:bg-black/5"
              >
                Карта
              </Link>
              <Link
                to="/favorites"
                className="hidden sm:flex items-center gap-1 text-sm font-600 text-gray-500 hover:text-[#1a1a2e] transition-colors px-3 py-1.5 rounded-full [&.active]:text-[#1a1a2e] [&.active]:bg-black/5"
              >
                ❤️ Избранное
              </Link>
              <button
                onClick={() => setCartOpen(true)}
                className="relative flex items-center gap-2 btn-pill text-sm px-5 py-2.5 text-white"
                style={{ background: '#1a1a2e' }}
              >
                <CartIcon />
                <span className="font-700">Предзаказ</span>
                {totalCount > 0 && (
                  <span
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-xs flex items-center justify-center font-800 text-[#1a1a2e]"
                    style={{ background: '#e8c547' }}
                  >
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

function CartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  )
}
