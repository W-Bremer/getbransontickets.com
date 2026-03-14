import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  type: 'show' | 'attraction' | 'package';
  id: string;
  name: string;
  date: string;
  time?: string;
  adults: number;
  children: number;
  childAges: number[];
  seatingTier?: string;
  pricePerAdult: number;
  pricePerChild: number;
  imageUrl?: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: string, date: string) => void;
  updateItem: (id: string, date: string, updates: Partial<CartItem>) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getItemCount: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) =>
        set((state) => ({
          items: [...state.items, item],
        })),

      removeItem: (id, date) =>
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.id === id && item.date === date)
          ),
        })),

      updateItem: (id, date, updates) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id && item.date === date
              ? { ...item, ...updates }
              : item
          ),
        })),

      clearCart: () => set({ items: [] }),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      openCart: () => set({ isOpen: true }),

      closeCart: () => set({ isOpen: false }),

      getItemCount: () => get().items.length,

      getTotal: () =>
        get().items.reduce(
          (total, item) =>
            total +
            item.adults * item.pricePerAdult +
            item.children * item.pricePerChild,
          0
        ),
    }),
    {
      name: 'branson-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
