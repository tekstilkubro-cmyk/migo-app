import { create } from 'zustand';
import { CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  couponCode: string | null;
  discountAmount: number;
  setItems: (items: CartItem[]) => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  setCoupon: (code: string | null, discountAmount: number) => void;
  clearCart: () => void;
  totalCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  couponCode: null,
  discountAmount: 0,
  setItems: (items) => set({ items }),
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
          ),
        };
      }
      return { items: [...state.items, item] };
    }),
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
    })),
  setCoupon: (couponCode, discountAmount) => set({ couponCode, discountAmount }),
  clearCart: () => set({ items: [], couponCode: null, discountAmount: 0 }),
  totalCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
}));
