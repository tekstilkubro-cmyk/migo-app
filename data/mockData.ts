export interface MockBanner {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  bgTop: string;
  bgBottom: string;
  emoji: string;
}

export interface MockCategory {
  id: string;
  name: string;
  emoji: string;
  bgColor: string;
}

export interface MockProduct {
  id: string;
  name: string;
  price_sale: number;
  price_original: number;
  rating_avg: number;
  rating_count: number;
  bgColor: string;
  emoji: string;
  tag?: string;
  sold?: string;
}

export const BANNERS: MockBanner[] = [
  {
    id: '1',
    title: 'MEGA SALE',
    subtitle: 'Up to 90% off — Today only!',
    cta: 'Shop Now',
    bgTop: '#FF6B00',
    bgBottom: '#CC3300',
    emoji: '🔥',
  },
  {
    id: '2',
    title: 'FREE SHIPPING',
    subtitle: 'On all orders over $29',
    cta: 'Explore',
    bgTop: '#6C47FF',
    bgBottom: '#3B1FA8',
    emoji: '📦',
  },
  {
    id: '3',
    title: 'NEW ARRIVALS',
    subtitle: 'Fresh styles added daily',
    cta: 'See New',
    bgTop: '#00B37E',
    bgBottom: '#007A52',
    emoji: '✨',
  },
  {
    id: '4',
    title: 'FLASH DEALS',
    subtitle: 'Limited stock — grab it fast',
    cta: 'Get Deal',
    bgTop: '#E6006E',
    bgBottom: '#9B004A',
    emoji: '⚡',
  },
];

export const CATEGORIES: MockCategory[] = [
  { id: '1', name: "Women's", emoji: '👗', bgColor: '#FFF0F5' },
  { id: '2', name: 'Electronics', emoji: '📱', bgColor: '#EFF4FF' },
  { id: '3', name: 'Home', emoji: '🏠', bgColor: '#F0FFF4' },
  { id: '4', name: 'Toys', emoji: '🧸', bgColor: '#FFFBF0' },
  { id: '5', name: 'Beauty', emoji: '💄', bgColor: '#FFF0FB' },
  { id: '6', name: 'Sports', emoji: '⚽', bgColor: '#F0F8FF' },
  { id: '7', name: "Men's", emoji: '👔', bgColor: '#F0F4FF' },
  { id: '8', name: 'Baby', emoji: '🍼', bgColor: '#FFFBF0' },
  { id: '9', name: 'Jewelry', emoji: '💍', bgColor: '#FDF0FF' },
  { id: '10', name: 'Garden', emoji: '🌿', bgColor: '#F0FFF0' },
];

export const FLASH_DEAL_PRODUCTS: MockProduct[] = [
  { id: 'f1', name: 'BT Earbuds', price_sale: 4.99, price_original: 29.99, rating_avg: 4.7, rating_count: 8421, bgColor: '#1E293B', emoji: '🎧', sold: '8.4K sold' },
  { id: 'f2', name: 'LED Strip 5m', price_sale: 2.99, price_original: 18.99, rating_avg: 4.5, rating_count: 5312, bgColor: '#0F172A', emoji: '💡', sold: '5.3K sold' },
  { id: 'f3', name: 'Silk Pyjamas', price_sale: 7.99, price_original: 39.99, rating_avg: 4.8, rating_count: 3102, bgColor: '#BE185D', emoji: '👘', sold: '3.1K sold' },
  { id: 'f4', name: 'Smart Watch', price_sale: 12.99, price_original: 69.99, rating_avg: 4.6, rating_count: 9870, bgColor: '#064E3B', emoji: '⌚', sold: '9.9K sold' },
  { id: 'f5', name: 'Phone Case', price_sale: 1.99, price_original: 12.99, rating_avg: 4.4, rating_count: 14200, bgColor: '#7C3AED', emoji: '📱', sold: '14K sold' },
  { id: 'f6', name: 'Yoga Mat', price_sale: 5.99, price_original: 24.99, rating_avg: 4.7, rating_count: 6540, bgColor: '#047857', emoji: '🧘', sold: '6.5K sold' },
];

export const BEST_SELLERS: MockProduct[] = [
  { id: 'b1', name: 'Wireless Earbuds Active Noise Cancelling', price_sale: 8.99, price_original: 45.99, rating_avg: 4.8, rating_count: 32410, bgColor: '#1E293B', emoji: '🎧', tag: 'Best Seller', sold: '50K+ sold' },
  { id: 'b2', name: 'Floral Summer Midi Dress', price_sale: 11.99, price_original: 52.99, rating_avg: 4.6, rating_count: 18760, bgColor: '#DB2777', emoji: '👗', sold: '20K+ sold' },
  { id: 'b3', name: 'Portable Power Bank 20000mAh', price_sale: 14.99, price_original: 59.99, rating_avg: 4.7, rating_count: 24300, bgColor: '#0F172A', emoji: '🔋', tag: 'Top Rated' },
  { id: 'b4', name: 'Non-stick Frying Pan Set 3pc', price_sale: 16.99, price_original: 64.99, rating_avg: 4.5, rating_count: 8920, bgColor: '#78350F', emoji: '🍳' },
  { id: 'b5', name: 'Stainless Steel Water Bottle', price_sale: 3.99, price_original: 19.99, rating_avg: 4.9, rating_count: 41200, bgColor: '#0369A1', emoji: '🧴', tag: 'Best Seller' },
  { id: 'b6', name: 'Cute Plush Toy Bunny 30cm', price_sale: 6.99, price_original: 24.99, rating_avg: 4.8, rating_count: 7650, bgColor: '#9D174D', emoji: '🐰' },
  { id: 'b7', name: 'LED Desk Lamp USB Dimmable', price_sale: 9.99, price_original: 34.99, rating_avg: 4.6, rating_count: 12400, bgColor: '#1D4ED8', emoji: '💡' },
  { id: 'b8', name: 'Canvas Sneakers Low-top', price_sale: 13.99, price_original: 49.99, rating_avg: 4.5, rating_count: 9830, bgColor: '#374151', emoji: '👟' },
  { id: 'b9', name: 'Moisturising Face Serum Vit C', price_sale: 5.99, price_original: 28.99, rating_avg: 4.7, rating_count: 19200, bgColor: '#D97706', emoji: '✨', tag: 'Top Rated' },
  { id: 'b10', name: 'Adjustable Dumbbell Set 10kg', price_sale: 22.99, price_original: 79.99, rating_avg: 4.8, rating_count: 5430, bgColor: '#065F46', emoji: '🏋️' },
];
