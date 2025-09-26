// hooks/useLoadUserFromLocalStorage.ts

import useUserStore, { type IUser } from "../lib/userStore";

const useLoadUserFromLocalStorage = () => {
  const addUser = useUserStore((state) => state.addUser);

  return () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser: IUser = JSON.parse(storedUser);
        addUser(parsedUser);
      } catch (err) {
        console.error("Failed to parse user from localStorage", err);
      }
    }
  };
};

export default useLoadUserFromLocalStorage;
