interface IllustrationProps {
  itemId: string
  color?: string
  size?: number
}

export function FoodIllustration({ itemId, color = '#8B6F47', size = 80 }: IllustrationProps) {
  const s = size
  const c = color

  // Coffee cup illustration
  const CoffeeCup = () => (
    <svg width={s} height={s} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="40" cy="62" rx="22" ry="5" fill={c} opacity="0.3" />
      <rect x="18" y="32" width="36" height="28" rx="4" fill={c} opacity="0.9" />
      <path d="M54 38 Q66 38 66 46 Q66 54 54 54" stroke={c} strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="36" cy="32" rx="18" ry="6" fill="white" opacity="0.6" />
      <path d="M30 22 Q32 16 30 12" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M38 20 Q40 14 38 10" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M46 22 Q48 16 46 12" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
    </svg>
  )

  // Oatmeal bowl illustration
  const OatmealBowl = () => (
    <svg width={s} height={s} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="40" cy="64" rx="24" ry="5" fill={c} opacity="0.25" />
      <path d="M16 38 Q16 62 40 62 Q64 62 64 38 Z" fill={c} opacity="0.85" />
      <rect x="14" y="34" width="52" height="8" rx="4" fill={c} />
      <ellipse cx="40" cy="34" rx="26" ry="6" fill={c} opacity="0.4" />
      {/* berries */}
      <circle cx="30" cy="30" r="4" fill="white" opacity="0.7" />
      <circle cx="40" cy="27" r="5" fill="white" opacity="0.6" />
      <circle cx="50" cy="30" r="4" fill="white" opacity="0.7" />
      <circle cx="35" cy="24" r="3" fill="white" opacity="0.5" />
      <circle cx="45" cy="24" r="3" fill="white" opacity="0.5" />
    </svg>
  )

  // Omelette / fried egg illustration
  const Omelette = () => (
    <svg width={s} height={s} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="40" cy="64" rx="24" ry="5" fill={c} opacity="0.25" />
      {/* plate */}
      <ellipse cx="40" cy="54" rx="28" ry="10" fill={c} opacity="0.2" />
      {/* egg white */}
      <ellipse cx="40" cy="44" rx="24" ry="14" fill="white" opacity="0.95" />
      <ellipse cx="36" cy="46" rx="18" ry="10" fill="white" opacity="0.85" />
      {/* yolk */}
      <circle cx="40" cy="42" r="8" fill={c} opacity="0.9" />
      <circle cx="38" cy="40" r="3" fill="white" opacity="0.5" />
      {/* herbs */}
      <line x1="28" y1="50" x2="24" y2="46" stroke={c} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <line x1="52" y1="48" x2="56" y2="44" stroke={c} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    </svg>
  )

  // Avocado toast illustration
  const AvocadoToast = () => (
    <svg width={s} height={s} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="40" cy="66" rx="26" ry="5" fill={c} opacity="0.2" />
      {/* toast */}
      <rect x="14" y="46" width="52" height="20" rx="6" fill={c} opacity="0.8" />
      <rect x="18" y="50" width="44" height="12" rx="4" fill={c} opacity="0.4" />
      {/* avocado */}
      <ellipse cx="40" cy="40" rx="18" ry="14" fill={c} opacity="0.9" />
      <ellipse cx="40" cy="40" rx="12" ry="9" fill="white" opacity="0.7" />
      <ellipse cx="40" cy="41" rx="6" ry="7" fill={c} opacity="0.6" />
      {/* sesame seeds */}
      <circle cx="26" cy="54" r="2" fill="white" opacity="0.8" />
      <circle cx="34" cy="56" r="2" fill="white" opacity="0.8" />
      <circle cx="46" cy="54" r="2" fill="white" opacity="0.8" />
      <circle cx="54" cy="56" r="2" fill="white" opacity="0.8" />
    </svg>
  )

  // Croissant illustration
  const Croissant = () => (
    <svg width={s} height={s} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="40" cy="66" rx="26" ry="5" fill={c} opacity="0.2" />
      <path d="M12 52 Q20 28 40 32 Q60 28 68 52 Q56 44 40 46 Q24 44 12 52 Z" fill={c} opacity="0.9" />
      <path d="M16 50 Q22 32 40 35 Q58 32 64 50" stroke="white" strokeWidth="2" fill="none" opacity="0.4" strokeLinecap="round" />
      <path d="M22 48 Q28 36 40 38 Q52 36 58 48" stroke="white" strokeWidth="1.5" fill="none" opacity="0.3" strokeLinecap="round" />
      {/* shine */}
      <ellipse cx="32" cy="38" rx="6" ry="3" fill="white" opacity="0.3" transform="rotate(-20 32 38)" />
    </svg>
  )

  // Pancakes illustration
  const Pancakes = () => (
    <svg width={s} height={s} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="40" cy="66" rx="26" ry="5" fill={c} opacity="0.2" />
      {/* stack of 3 pancakes */}
      <ellipse cx="40" cy="60" rx="24" ry="7" fill={c} opacity="0.9" />
      <ellipse cx="40" cy="54" rx="22" ry="6" fill={c} opacity="0.8" />
      <ellipse cx="40" cy="48" rx="20" ry="6" fill={c} opacity="0.7" />
      <ellipse cx="40" cy="43" rx="18" ry="5" fill={c} opacity="0.9" />
      {/* syrup drip */}
      <path d="M50 43 Q54 46 52 52" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" />
      <path d="M30 43 Q26 47 28 52" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5" />
      {/* berry on top */}
      <circle cx="38" cy="40" r="4" fill="white" opacity="0.8" />
      <circle cx="44" cy="41" r="3" fill="white" opacity="0.7" />
    </svg>
  )

  // Buckwheat / porridge
  const Porridge = () => (
    <svg width={s} height={s} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="40" cy="64" rx="24" ry="5" fill={c} opacity="0.25" />
      <path d="M16 40 Q16 64 40 64 Q64 64 64 40 Z" fill={c} opacity="0.85" />
      <rect x="14" y="36" width="52" height="8" rx="4" fill={c} />
      <ellipse cx="40" cy="36" rx="26" ry="6" fill={c} opacity="0.4" />
      {/* grain texture */}
      {[28, 34, 40, 46, 52].map((x, i) => (
        <ellipse key={i} cx={x} cy={30 + (i % 2) * 4} rx="3" ry="2" fill="white" opacity="0.55" />
      ))}
      <ellipse cx="35" cy="38" rx="3" ry="2" fill="white" opacity="0.4" />
      <ellipse cx="45" cy="38" rx="3" ry="2" fill="white" opacity="0.4" />
    </svg>
  )

  // Scrambled eggs
  const ScrambledEggs = () => (
    <svg width={s} height={s} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="40" cy="66" rx="26" ry="5" fill={c} opacity="0.2" />
      {/* plate */}
      <ellipse cx="40" cy="56" rx="28" ry="10" fill={c} opacity="0.15" />
      {/* egg blobs */}
      <ellipse cx="36" cy="46" rx="16" ry="10" fill="white" opacity="0.9" />
      <ellipse cx="46" cy="48" rx="14" ry="9" fill="white" opacity="0.85" />
      <circle cx="33" cy="43" r="5" fill={c} opacity="0.7" />
      <circle cx="44" cy="44" r="4" fill={c} opacity="0.6" />
      {/* herbs */}
      <line x1="30" y1="52" x2="26" y2="48" stroke={c} strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <line x1="50" y1="50" x2="54" y2="46" stroke={c} strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <line x1="40" y1="54" x2="40" y2="50" stroke={c} strokeWidth="2" strokeLinecap="round" opacity="0.8" />
    </svg>
  )

  // Berry oatmeal
  const BerryOatmeal = () => (
    <svg width={s} height={s} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="40" cy="64" rx="24" ry="5" fill={c} opacity="0.25" />
      <path d="M16 38 Q16 62 40 62 Q64 62 64 38 Z" fill={c} opacity="0.85" />
      <rect x="14" y="34" width="52" height="8" rx="4" fill={c} />
      <ellipse cx="40" cy="34" rx="26" ry="6" fill={c} opacity="0.4" />
      {/* blueberries cluster */}
      <circle cx="32" cy="28" r="5" fill="white" opacity="0.8" />
      <circle cx="40" cy="25" r="5" fill="white" opacity="0.75" />
      <circle cx="48" cy="28" r="5" fill="white" opacity="0.8" />
      <circle cx="36" cy="22" r="4" fill="white" opacity="0.65" />
      <circle cx="44" cy="22" r="4" fill="white" opacity="0.65" />
      {/* chia seeds */}
      <circle cx="30" cy="36" r="1.5" fill="white" opacity="0.5" />
      <circle cx="50" cy="36" r="1.5" fill="white" opacity="0.5" />
    </svg>
  )

  // Veggie omelette
  const VeggieOmelette = () => (
    <svg width={s} height={s} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="40" cy="66" rx="26" ry="5" fill={c} opacity="0.2" />
      <ellipse cx="40" cy="56" rx="28" ry="10" fill={c} opacity="0.15" />
      {/* folded omelette */}
      <path d="M14 48 Q16 34 40 34 Q64 34 66 48 Q64 56 40 58 Q16 56 14 48 Z" fill="white" opacity="0.9" />
      <path d="M18 46 Q20 38 40 37 Q60 38 62 46" stroke={c} strokeWidth="1.5" fill="none" opacity="0.3" />
      {/* veggies inside */}
      <circle cx="30" cy="46" r="4" fill={c} opacity="0.6" />
      <circle cx="40" cy="44" r="4" fill={c} opacity="0.5" />
      <circle cx="50" cy="46" r="4" fill={c} opacity="0.6" />
      {/* herbs on top */}
      <line x1="26" y1="54" x2="22" y2="50" stroke={c} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <line x1="54" y1="52" x2="58" y2="48" stroke={c} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    </svg>
  )

  const map: Record<string, React.FC> = {
    'sc-latte': CoffeeCup,
    'sc-cappuccino': CoffeeCup,
    'sc-raf': CoffeeCup,
    'duo-latte': CoffeeCup,
    'duo-cappuccino': CoffeeCup,
    'duo-raf': CoffeeCup,
    'dr-latte': CoffeeCup,
    'dr-cappuccino': CoffeeCup,
    'dr-raf': CoffeeCup,
    'sc-oatmeal': OatmealBowl,
    'sc-omelet': Omelette,
    'sc-toast': AvocadoToast,
    'duo-porridge': Porridge,
    'duo-eggs': ScrambledEggs,
    'duo-croissant': Croissant,
    'dr-oatmeal': BerryOatmeal,
    'dr-omelet-veg': VeggieOmelette,
    'dr-pancakes': Pancakes,
  }

  const Illustration = map[itemId] ?? CoffeeCup
  return <Illustration />
}
