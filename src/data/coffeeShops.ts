export interface MenuItem {
  id: string
  name: string
  nameRu: string
  price: number
  description: string
  emoji: string
  category: 'coffee' | 'food'
}

export interface CoffeeShop {
  id: string
  name: string
  address: string
  description: string
  mapX: number
  mapY: number
  color: string
  bgColor: string
  menu: MenuItem[]
}

const coffeeShops: CoffeeShop[] = [
  {
    id: 'simple-coffee',
    name: 'Simple Coffee',
    address: 'ул. Пушкина, 10',
    description: 'Уютная кофейня с минималистичным интерьером и фокусом на качестве зерна.',
    mapX: 28,
    mapY: 58,
    color: '#8B6F47',
    bgColor: '#FDF6EE',
    menu: [
      { id: 'sc-latte', name: 'Latte', nameRu: 'Латте', price: 280, description: 'Нежный кофе с бархатистым молоком и мягкой пенкой', emoji: '☕', category: 'coffee' },
      { id: 'sc-cappuccino', name: 'Cappuccino', nameRu: 'Капучино', price: 260, description: 'Классический капучино с воздушной молочной пенкой', emoji: '🥛', category: 'coffee' },
      { id: 'sc-raf', name: 'Raf', nameRu: 'Раф', price: 320, description: 'Ванильный раф со взбитыми сливками — наш фирменный рецепт', emoji: '✨', category: 'coffee' },
      { id: 'sc-oatmeal', name: 'Oatmeal', nameRu: 'Овсяная каша', price: 220, description: 'Тёплая овсянка с ягодами, мёдом и орехами', emoji: '🥣', category: 'food' },
      { id: 'sc-omelet', name: 'Omelette', nameRu: 'Омлет с сыром', price: 280, description: 'Пышный омлет с моцареллой, свежей зеленью и тостом', emoji: '🍳', category: 'food' },
      { id: 'sc-toast', name: 'Avocado Toast', nameRu: 'Тост с авокадо', price: 340, description: 'Ржаной тост с авокадо, яйцом пашот и кунжутом', emoji: '🥑', category: 'food' },
    ],
  },
  {
    id: 'duo',
    name: 'DUO',
    address: 'пр. Ленина, 5',
    description: 'Концептуальное двойное пространство: кофейня и вино-бар в одном месте.',
    mapX: 62,
    mapY: 62,
    color: '#2C3E50',
    bgColor: '#EEF2F7',
    menu: [
      { id: 'duo-latte', name: 'Latte', nameRu: 'Латте', price: 300, description: 'Авторский латте с карамелизированным молоком', emoji: '☕', category: 'coffee' },
      { id: 'duo-cappuccino', name: 'Cappuccino', nameRu: 'Капучино', price: 280, description: 'Двойной эспрессо с идеальной молочной пенкой DUO', emoji: '🥛', category: 'coffee' },
      { id: 'duo-raf', name: 'Raf', nameRu: 'Раф', price: 340, description: 'Фирменный раф DUO с нотками тёмного шоколада', emoji: '✨', category: 'coffee' },
      { id: 'duo-porridge', name: 'Buckwheat Porridge', nameRu: 'Гречневая каша', price: 200, description: 'Рассыпчатая гречка с маслом и грибным соусом', emoji: '🫕', category: 'food' },
      { id: 'duo-eggs', name: 'Scrambled Eggs', nameRu: 'Яичница-болтунья', price: 240, description: 'Нежная болтунья с зелёным луком, беконом и хлебом', emoji: '🍳', category: 'food' },
      { id: 'duo-croissant', name: 'Croissant', nameRu: 'Круассан с ветчиной', price: 290, description: 'Хрустящий круассан с ветчиной и сыром, запечённый в печи', emoji: '🥐', category: 'food' },
    ],
  },
  {
    id: 'drinkit',
    name: 'Drinkit',
    address: 'ул. Садовая, 22',
    description: 'Современная кофейня с акцентом на растительное молоко и авторские напитки.',
    mapX: 50,
    mapY: 28,
    color: '#C0392B',
    bgColor: '#FEF0EF',
    menu: [
      { id: 'dr-latte', name: 'Latte', nameRu: 'Латте', price: 290, description: 'Латте на овсяном молоке — лёгкий и питательный', emoji: '☕', category: 'coffee' },
      { id: 'dr-cappuccino', name: 'Cappuccino', nameRu: 'Капучино', price: 270, description: 'Капучино на растительном молоке с нежной пенкой', emoji: '🥛', category: 'coffee' },
      { id: 'dr-raf', name: 'Raf', nameRu: 'Раф', price: 330, description: 'Раф с лавандой и тоником — наш хит сезона', emoji: '✨', category: 'coffee' },
      { id: 'dr-oatmeal', name: 'Berry Oatmeal', nameRu: 'Каша с ягодами', price: 230, description: 'Овсянка на растительном молоке с черникой и семенами чиа', emoji: '🫐', category: 'food' },
      { id: 'dr-omelet-veg', name: 'Veggie Omelette', nameRu: 'Омлет с овощами', price: 260, description: 'Омлет со шпинатом, помидорами черри и фетой', emoji: '🥗', category: 'food' },
      { id: 'dr-pancakes', name: 'Pancakes', nameRu: 'Панкейки', price: 310, description: 'Пышные панкейки с кленовым сиропом и свежими фруктами', emoji: '🥞', category: 'food' },
    ],
  },
]

export default coffeeShops
