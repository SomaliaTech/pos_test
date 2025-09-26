// useItemStore.ts
import { create } from "zustand";

export interface ICart {
  quantity: number;
  pricePerQuantity: number;
  name: string;
  _id: string;
  price: number;
  category: string;
}

interface ItemStore {
  items: ICart[];
  addItem: (item: {
    name: string;
    price: number;
    itemCount: number;
    id: string;
    category: string;
  }) => void;
  removeItem: (id: string) => void;
  clearItems: () => void;
}

const useItemStore = create<ItemStore>((set) => ({
  items: [],

  addItem: ({ name, price, itemCount, id, category }) => {
    const newItem: ICart = {
      name,
      _id: id,
      category,
      quantity: itemCount,
      pricePerQuantity: price,
      price: price * itemCount,
    };

    set((state) => {
      const alreadyExists = state.items.some((item) => item._id === id);
      if (alreadyExists) return state;

      return {
        items: [...state.items, newItem],
      };
    });
  },

  removeItem: (id: string) => {
    set((state) => ({
      items: state.items.filter((item) => item._id !== id),
    }));
  },

  clearItems: () => set({ items: [] }),
}));

export default useItemStore;
