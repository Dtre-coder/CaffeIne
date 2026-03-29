import { Link } from '@tanstack/react-router'
import type { CoffeeShop } from '@/data/coffeeShops'

interface CoffeeMapProps {
  shops: CoffeeShop[]
}

export function CoffeeMap({ shops }: CoffeeMapProps) {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-lg bg-[#e8e0d5]" style={{ paddingBottom: '56%' }}>
      {/* Map background SVG */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 800 450"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Base */}
        <rect width="800" height="450" fill="#e8e0d5" />

        {/* Parks */}
        <ellipse cx="120" cy="80" rx="80" ry="55" fill="#c8dbb0" opacity="0.7" />
        <ellipse cx="680" cy="380" rx="70" ry="50" fill="#c8dbb0" opacity="0.7" />
        <rect x="540" y="60" width="90" height="70" rx="10" fill="#c8dbb0" opacity="0.6" />

        {/* Water */}
        <path d="M 0 200 Q 150 180 300 210 Q 450 240 600 215 Q 700 200 800 220 L 800 260 Q 700 240 600 255 Q 450 280 300 250 Q 150 220 0 240 Z" fill="#b8d4e8" opacity="0.6" />

        {/* Major roads */}
        <line x1="0" y1="150" x2="800" y2="150" stroke="#fff" strokeWidth="8" opacity="0.8" />
        <line x1="0" y1="300" x2="800" y2="300" stroke="#fff" strokeWidth="8" opacity="0.8" />
        <line x1="200" y1="0" x2="200" y2="450" stroke="#fff" strokeWidth="8" opacity="0.8" />
        <line x1="600" y1="0" x2="600" y2="450" stroke="#fff" strokeWidth="8" opacity="0.8" />
        <line x1="400" y1="0" x2="400" y2="450" stroke="#fff" strokeWidth="6" opacity="0.6" />
        <line x1="0" y1="225" x2="800" y2="225" stroke="#fff" strokeWidth="6" opacity="0.6" />

        {/* Minor roads */}
        <line x1="100" y1="0" x2="100" y2="450" stroke="#fff" strokeWidth="3" opacity="0.5" />
        <line x1="300" y1="0" x2="300" y2="450" stroke="#fff" strokeWidth="3" opacity="0.5" />
        <line x1="500" y1="0" x2="500" y2="450" stroke="#fff" strokeWidth="3" opacity="0.5" />
        <line x1="700" y1="0" x2="700" y2="450" stroke="#fff" strokeWidth="3" opacity="0.5" />
        <line x1="0" y1="75" x2="800" y2="75" stroke="#fff" strokeWidth="3" opacity="0.5" />
        <line x1="0" y1="375" x2="800" y2="375" stroke="#fff" strokeWidth="3" opacity="0.5" />

        {/* Diagonal roads */}
        <line x1="0" y1="0" x2="400" y2="300" stroke="#fff" strokeWidth="4" opacity="0.4" />
        <line x1="800" y1="0" x2="400" y2="300" stroke="#fff" strokeWidth="4" opacity="0.4" />

        {/* City blocks */}
        <rect x="210" y="160" width="80" height="60" rx="3" fill="#d4c9bc" opacity="0.5" />
        <rect x="310" y="160" width="80" height="60" rx="3" fill="#d4c9bc" opacity="0.5" />
        <rect x="410" y="160" width="80" height="60" rx="3" fill="#d4c9bc" opacity="0.5" />
        <rect x="510" y="160" width="80" height="60" rx="3" fill="#d4c9bc" opacity="0.5" />
        <rect x="210" y="235" width="80" height="60" rx="3" fill="#d4c9bc" opacity="0.5" />
        <rect x="310" y="235" width="80" height="60" rx="3" fill="#d4c9bc" opacity="0.5" />
        <rect x="410" y="235" width="80" height="60" rx="3" fill="#d4c9bc" opacity="0.5" />
        <rect x="510" y="235" width="80" height="60" rx="3" fill="#d4c9bc" opacity="0.5" />
        <rect x="610" y="160" width="80" height="60" rx="3" fill="#d4c9bc" opacity="0.5" />
        <rect x="610" y="235" width="80" height="60" rx="3" fill="#d4c9bc" opacity="0.5" />
        <rect x="110" y="160" width="80" height="60" rx="3" fill="#d4c9bc" opacity="0.5" />
        <rect x="110" y="235" width="80" height="60" rx="3" fill="#d4c9bc" opacity="0.5" />
        <rect x="210" y="80" width="80" height="60" rx="3" fill="#d4c9bc" opacity="0.5" />
        <rect x="310" y="80" width="80" height="60" rx="3" fill="#d4c9bc" opacity="0.5" />
        <rect x="410" y="80" width="80" height="60" rx="3" fill="#d4c9bc" opacity="0.5" />
        <rect x="510" y="80" width="80" height="60" rx="3" fill="#d4c9bc" opacity="0.5" />
        <rect x="210" y="310" width="80" height="60" rx="3" fill="#d4c9bc" opacity="0.5" />
        <rect x="310" y="310" width="80" height="60" rx="3" fill="#d4c9bc" opacity="0.5" />
        <rect x="410" y="310" width="80" height="60" rx="3" fill="#d4c9bc" opacity="0.5" />
        <rect x="510" y="310" width="80" height="60" rx="3" fill="#d4c9bc" opacity="0.5" />
        <rect x="610" y="310" width="80" height="60" rx="3" fill="#d4c9bc" opacity="0.5" />
      </svg>

      {/* Shop pins */}
      {shops.map((shop) => (
        <Link
          key={shop.id}
          to="/shop/$shopId"
          params={{ shopId: shop.id }}
          className="absolute group"
          style={{
            left: `${shop.mapX}%`,
            top: `${shop.mapY}%`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          {/* Pin */}
          <div className="relative flex flex-col items-center">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg transition-transform group-hover:scale-110 group-hover:-translate-y-1 border-2 border-white"
              style={{ backgroundColor: shop.color }}
            >
              ☕
            </div>
            <div
              className="w-3 h-3 -mt-1 rotate-45 border-r-2 border-b-2 border-white"
              style={{ backgroundColor: shop.color }}
            />
          </div>
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 hidden group-hover:block z-10 pointer-events-none">
            <div className="bg-white rounded-lg px-3 py-2 shadow-xl text-center whitespace-nowrap border border-gray-100">
              <div className="font-bold text-sm" style={{ color: shop.color }}>
                {shop.name}
              </div>
              <div className="text-xs text-gray-500">{shop.address}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
