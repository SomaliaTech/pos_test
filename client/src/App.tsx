import { RouterProvider } from "react-router-dom";
import router from "./router";
import { useEffect, useState } from "react";
import useUserStore from "./lib/userStore";
import { axiosIntence } from "./lib/axiosIntence";

const App = () => {
  const addUser = useUserStore((state) => state.addUser);
  const user = useUserStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const localUser = localStorage.getItem("user");

      if (localUser) {
        setIsLoading(true);
        const parsed = JSON.parse(localUser);
        if (parsed._id) {
          console.log("existed user", parsed);
          addUser(parsed);
          setIsLoading(false);
          return; // Exit early
        }
      }

      // Only reach here if no valid localUser
      try {
        const { data } = await axiosIntence.get("/api/user/me");
        localStorage.setItem("user", JSON.stringify(data.data));
        console.log("added user", data.data);
        addUser(data.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [addUser]);
  console.log(user);
  if (isLoading) return <h1>loading...</h1>;

  return <RouterProvider router={router} />;
};

export default App;
