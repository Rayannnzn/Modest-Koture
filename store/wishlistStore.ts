import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistStore {
  items: string[]; // List of product IDs
  toggleItem: (productId: string) => void;
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  hasItem: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      toggleItem: (productId) => {
        set((state) => {
          const exists = state.items.includes(productId);
          if (exists) {
            return { items: state.items.filter((id) => id !== productId) };
          } else {
            return { items: [...state.items, productId] };
          }
        });
      },

      addItem: (productId) => {
        set((state) => {
          if (state.items.includes(productId)) return state;
          return { items: [...state.items, productId] };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((id) => id !== productId),
        }));
      },

      hasItem: (productId) => {
        return get().items.includes(productId);
      },

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "mk-wishlist",
    }
  )
);
