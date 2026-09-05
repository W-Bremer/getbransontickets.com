import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DiscountType } from '@/lib/adjustments';

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
  /** Mirror of the show's BOGO 50% flag for client display; server re-derives from the catalog. */
  bogo50?: boolean;
  imageUrl?: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  /** Order-level senior/military selection; single scalar so discounts can never stack. */
  discountType: DiscountType;
  addItem: (item: CartItem) => void;
  removeItem: (id: string, date: string) => void;
  updateItem: (id: string, date: string, updates: Partial<CartItem>) => void;
  setDiscountType: (discountType: DiscountType) => void;
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
      discountType: 'none',

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

      setDiscountType: (discountType) => set({ discountType }),

      clearCart: () => set({ items: [], discountType: 'none' }),

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
      // Old persisted blobs lack discountType; zustand merges it in from the
      // default above, so no version bump is needed.
      partialize: (state) => ({ items: state.items, discountType: state.discountType }),
    }
  )
);
