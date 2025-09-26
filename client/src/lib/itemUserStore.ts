import { create } from "zustand";

export interface IUser {
  name: string;
  _id: string;
  phone: string;
  email: string;
  table: object;
  role: string;
  guests: number;
}

const itemUserStore = create((set) => ({
  user: null,
  addUser: ({
    name,
    _id,
    phone,
    email,
    role,
    table,
    guests,
  }: {
    name: string;
    _id: string;
    phone: string;
    email: string;
    role: string;
    table: object;
    guests: number;
  }) => {
    const newUser = {
      name,
      _id,
      phone,
      email,
      role,
      guests,
      table,
    };
    set({ user: newUser });
  },
}));

export default itemUserStore;
