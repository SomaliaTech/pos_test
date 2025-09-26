import { create } from "zustand";

export interface IUser {
  name: string;
  _id: string;
  phone: string;
  email: string;
  role: string;
}

interface UserStore {
  user: IUser | null;
  addUser: (user: IUser) => void;
  removeUser: () => void;
}

const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  addUser: (newUser) => {
    const existingUser = get().user;

    // Only set if the user is different or null
    if (!existingUser || existingUser._id !== newUser._id) {
      set({ user: newUser });
    }
    // Otherwise, do nothing
  },
  removeUser: () => set({ user: null }),
}));

export default useUserStore;
