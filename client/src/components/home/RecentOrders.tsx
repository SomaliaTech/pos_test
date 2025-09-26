import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
// import OrderList from "./OrderList";
import { useQuery } from "@tanstack/react-query";

import OrderList from "./OrderList";
import { axiosIntence } from "../../lib/axiosIntence";
// import { getOrders } from "../../https/index";

const RecentOrders = () => {
  // if (isError) {
  //   enqueueSnackbar("Something went wrong!", { variant: "error" });
  // }
  const [search, setSearch] = useState("");
  // const [selectedOrder, setSelectedOrder] = useState(null);
  const [filteredOrders, setFilteredOrders] = useState([]);

  // const customerData = useSelector((state) => state.customer);

  const { data, isLoading } = useQuery({
    queryKey: ["orders_gas"],
    queryFn: async () => {
      try {
        const res = await axiosIntence.get("/api/orders");

        return res?.data?.orders;
      } catch (err) {
        console.log(err);
      }
    },
  });

  useEffect(() => {
    if (!isLoading && search.length > 2) {
      const selected = data.filter((order: any) =>
        order.customer.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredOrders(selected);
    } else {
      setFilteredOrders(data);
    }
  }, [search, data, isLoading]);

  return (
    <div className="px-8 mt-6">
      <div className="bg-[#F9FBFA] w-full h-[450px] rounded-lg">
        <div className="flex justify-between items-center px-6 py-4">
          <h1 className="text-[#000] text-lg font-semibold tracking-wide">
            Recent Orders
          </h1>
          <a href="" className="text-[#025cca] text-sm font-semibold">
            View all
          </a>
        </div>

        <div className="flex items-center gap-4 bg-[#E7E7E7] rounded-[15px] px-6 py-4 mx-6">
          <FaSearch className="text-[#000]" />
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search recent orders"
            className="bg-[#] outline-none text-[#000]"
          />
        </div>

        {/* Order list */}
        <div className="mt-4 px-6 overflow-y-scroll h-[300px] scrollbar-hide">
          {filteredOrders?.length > 0 ? (
            filteredOrders.map((order, index) => {
              return <OrderList key={index} order={order} />;
            })
          ) : (
            <p className="col-span-3 text-gray-500">No orders available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
