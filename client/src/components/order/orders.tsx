import { useState, useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import { enqueueSnackbar } from "notistack";
import OrderCard from "./orderCard";
import { axiosIntence } from "../../lib/axiosIntence";

const Orders = () => {
  const [status, setStatus] = useState("all");

  useEffect(() => {
    document.title = "POS | Orders";
  }, []);

  const { data: resData, isError } = useQuery({
    queryKey: ["orders_gas"],
    queryFn: async () => {
      try {
        const res = await axiosIntence.get("/api/orders/");

        return res?.data?.orders;
      } catch (err) {
        console.log(err);
      }
    },
  });

  if (isError) {
    enqueueSnackbar("Something went wrong!", { variant: "error" });
  }

  return (
    // <section className="bg-[#1f1f1f]  h-[calc(100vh-5rem)] overflow-hidden">
    <>
      <div className="flex items-center justify-between px-10 py-4">
        <div className="flex items-center justify-around gap-4">
          <button
            onClick={() => setStatus("all")}
            className={`text-[#ababab] text-lg ${
              status === "all" && "bg-[#383838] rounded-lg px-5 py-2"
            }  rounded-lg px-5 py-2 font-semibold`}
          >
            All
          </button>
          <button
            onClick={() => setStatus("progress")}
            className={`text-[#ababab] text-lg ${
              status === "progress" && "bg-[#383838] rounded-lg px-5 py-2"
            }  rounded-lg px-5 py-2 font-semibold`}
          >
            In Progress
          </button>
          <button
            onClick={() => setStatus("ready")}
            className={`text-[#ababab] text-lg ${
              status === "ready" && "bg-[#383838] rounded-lg px-5 py-2"
            }  rounded-lg px-5 py-2 font-semibold`}
          >
            Ready
          </button>
          <button
            onClick={() => setStatus("completed")}
            className={`text-[#ababab] text-lg ${
              status === "completed" && "bg-[#383838] rounded-lg px-5 py-2"
            }  rounded-lg px-5 py-2 font-semibold`}
          >
            Completed
          </button>
        </div>
      </div>

      <div className=" w-full grid grid-cols-3 gap-4 px-6 py-4 overflow-y-scroll scrollbar-hidden">
        {resData?.length > 0 ? (
          resData?.map((order: any) => {
            return <OrderCard key={order._id} order={order} />;
          })
        ) : (
          <p className="col-span-3 text-gray-500">No orders available</p>
        )}
      </div>
    </>
  );
};

export default Orders;
