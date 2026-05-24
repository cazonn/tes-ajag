import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  name: string;
  price: number;
  resellerPrice: number;
  quantity: number;
  image: string;
  shopId: string;
}

interface CartState {
  items: CartItem[];
  isReseller: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  setResellerMode: (status: boolean) => void;
  getCartTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isReseller: false,
      addItem: (item) => set((state) => {
        const existingIndex = state.items.findIndex((i) => i.id === item.id);
        if (existingIndex > -1) {
          const newItems = [...state.items];
          newItems[existingIndex].quantity += 1;
          return { items: newItems };
        }
        return { items: [...state.items, item] };
      }),
      removeItem: (id) => set((state) => ({
        items: state.items.filter((item) => item.id !== id)
      })),
      clearCart: () => set({ items: [] }),
      setResellerMode: (status) => set({ isReseller: status }),
      getCartTotal: () => {
        const { items, isReseller } = get();
        return items.reduce((total, item) => {
          const activePrice = isReseller ? item.resellerPrice : item.price;
          return total + activePrice * item.quantity;
        }, 0);
      }
    }),
    { name: 'nexus-premium-cart-storage' }
  )
);