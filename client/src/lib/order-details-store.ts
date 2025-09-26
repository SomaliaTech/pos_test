// useItemStore.ts
import { create } from "zustand";

export interface ICart {
  bills: object;
  createdAt: number;
  customer: string;
  _id: string;
  customerDetails: number;
  items: [];
  orderDate: string;
  paymentMethod: string;
  orderStatus: string;
}

interface ItemStore {
  items: any;
  addItem: (item: {
    bills: object;
    createdAt: number;
    customer: string;
    _id: string;
    customerDetails: number;
    items: [];
    orderDate: string;
    paymentMethod: string;
    orderStatus: string;
  }) => void;
  removeItem: (id: string) => void;
  clearItems: () => void;
}

const useOrderDetailsStore = create<ItemStore>((set) => ({
  items: null,

  addItem: ({
    bills,
    customer,
    customerDetails,
    paymentMethod,
    _id,
    orderDate,
    createdAt,
    items,
    orderStatus,
  }) => {
    const newItem: ICart = {
      bills,
      customer,
      customerDetails,
      paymentMethod,
      _id,
      orderDate,
      createdAt,
      items,
      orderStatus,
    };

    set((state) => {
      const alreadyExists = state.items?.some((item: any) => item._id === _id);
      if (alreadyExists) return state;

      return {
        items: { ...state.items, newItem },
      };
    });
  },

  removeItem: (id: string) => {
    set((state) => ({
      items: state.items.filter((item: any) => item._id !== id),
    }));
  },

  clearItems: () => set({ items: [] }),
}));

export default useOrderDetailsStore;
