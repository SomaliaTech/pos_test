import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { axiosIntence } from "../../lib/axiosIntence";
import useUserStore from "../../lib/userStore";

const Login = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };

  const loginMutation = useMutation({
    mutationKey: ["register_user"],
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      try {
        const res = await axiosIntence.post("/api/user/login", {
          email,
          password,
        });
        navigate("/");
        localStorage.setItem("user", JSON.stringify(res.data.user));
        useUserStore.getState().addUser(res.data.user);
        // dispatch(res.data.user);
      } catch (err: any) {
        console.log(err);
        enqueueSnackbar(err?.response?.data.message, { variant: "error" });
      }
    },
    onSuccess: async (res) => {
      const { data }: any = res;
      console.log("success", data);
      // const { _id, name, email, phone, role } = data.data;
      //   dispatch(setUser({ _id, name, email, phone, role }));

      navigate("/");
    },
    onError: (error) => {
      const { response }: any = error;
      console.log("response", response.data.message);
      enqueueSnackbar(response.data.message, { variant: "error" });
    },
  });

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
            Employee Email
          </label>
          <div className="flex item-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter employee email"
              className="bg-transparent flex-1 text-white focus:outline-none"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
            Password
          </label>
          <div className="flex item-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="bg-transparent flex-1 text-white focus:outline-none"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full rounded-lg cursor-pointer mt-6 py-3 text-lg bg-[#37D162] text-white font-bold"
        >
          {loginMutation.isPending ? "Login..." : "Log in"}
        </button>
      </form>
    </div>
  );
};

export default Login;
