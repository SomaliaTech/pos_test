import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { axiosIntence } from "../../lib/axiosIntence";
import { formatDateAndTime } from "../../context";
import toast from "react-hot-toast";

export default function OrderManagementCard() {
  const [tab, setTab] = useState("all");
  const { data: ordetInfo } = useQuery({
    queryKey: ["orders_gas"],
    queryFn: async () => {
      const res = await axiosIntence.get("/api/orders");
      return res?.data?.orders;
    },
  });

  console.log("ordetInfo", ordetInfo);
  // Mock orders

  const takeawayOrders = [
    {
      id: "#1909254",
      token: "0104",
      time: "09:00 PM, 19-09-2025",
      status: "Done",
    },
    {
      id: "#1909253",
      token: "0103",
      time: "09:00 PM, 19-09-2025",
      status: "Done",
    },
  ];

  const itemsBoard = [
    "Vegan Hum-burger with Cheese",
    "Mojito",
    "French Fries",
    "Baked Potato",
    "Homemade Mashed Potato",
  ];

  // Status badge UI
  const StatusBadge = ({ status, order }: { status: string; order: any }) => {
    const [statusState, setStutusState] = useState(
      status === "In Progress"
        ? "Preparing"
        : status != "Preparing"
        ? status
        : status
    );
    const styles: Record<string, string> = {
      Finished: "bg-green-100 text-green-600",
      Preparing: "bg-yellow-100 text-yellow-600",
      Confirmed: "bg-blue-100 text-blue-600",
    };
    const tableData = {
      status: "reserved",
      orderId: order.data._id,
      tableId: order.data.table,
    };
    const tableMutate = useMutation({
      mutationKey: ["update_table"],
      mutationFn: async (data: any) => {
        console.log("data", data);
        const res = await axiosIntence.put(
          `/api/table/update-table/${data.tableId}`,
          data
        );
        return res.data;
      },
      onSuccess: () => {
        // clearItems();
      },
      onError: (err) => {
        console.log(err);
        toast.error("Failed to place order");
      },
    });
    return (
      <span
        onClick={() => {
          setStutusState((prev) =>
            prev === "Preparing" ? "Confirmed" : "Finished"
          );
          tableMutate.mutate(tableData);
        }}
        className={`px-4 py-2 text-sm font-medium cursor-pointer rounded-full ${styles[statusState]}`}
      >
        {statusState}
      </span>
    );
  };

  return (
    <div className="p-6 bg-[#E5E8E5] h-screen flex flex-col">
      {/* Tabs & Search */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-2">
          {[
            { key: "all", label: "All Orders" },
            { key: "confirmed", label: "Confirmed" },
            { key: "preparing", label: "Preparing" },
            { key: "done", label: "Done" },
          ].map(({ key, label }) => (
            <button
              key={key}
              className={`px-4 py-2 rounded-lg text-sm font-medium border border-gray-500 transition ${
                tab === key
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => setTab(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Items Board */}
        <div className="col-span-3 bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold mb-3">Items Board</h2>
          <ul className="space-y-2">
            {itemsBoard.map((item, i) => (
              <li
                key={i}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium text-sm">{item}</p>
                  <p className="text-xs text-gray-500">Size: Regular</p>
                </div>
                <span className="bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  1
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Dine-In Orders */}
        <div className="col-span-6 h-[calc(100vh-9rem)]  space-y-2 overflow-y-auto bg-white rounded-xl shadow p-4">
          {" "}
          <h2 className="font-semibold mb-3">Dine-In Orders</h2>
          {ordetInfo?.map((order: any, idx: number) => (
            <div
              key={idx}
              className=" border border-gray-200 rounded-lg p-4 bg-blue-50/30 hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="text-blue-600 font-medium">
                  #{order._id?.substring(0, 9)}
                </p>
                <StatusBadge
                  order={order}
                  status={
                    order.orderStatus == "In Progress"
                      ? "Preparing"
                      : order.orderStatus
                  }
                />
              </div>
              <p className="text-sm text-gray-700">
                <span className="font-medium">{order.table?.charAt(0)}</span> —
                Token No: {order.token}
              </p>
              <p className="text-xs text-gray-500 mb-2">
                {formatDateAndTime(order.orderDate).substring(22)}
              </p>
              {order.items.length > 0 && (
                <ul className="text-sm space-y-1">
                  {order.items.map((item: any, i: number) => (
                    <li key={i}>
                      1x {item.name}{" "}
                      {item.size && (
                        <span className="text-xs text-gray-500">
                          (Size: {item.size})
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Takeaway */}
        <div className="col-span-3 bg-white rounded-xl shadow p-4 space-y-4">
          <h2 className="font-semibold mb-3">Takeaway</h2>
          {takeawayOrders.map((order, idx) => (
            <div
              key={idx}
              className="border rounded-lg p-3 bg-purple-50/40 hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="text-purple-600 font-medium">{order.id}</p>
                <StatusBadge order={order} status={order.status} />
              </div>
              <p className="text-sm text-gray-700">Token No: {order.token}</p>
              <p className="text-xs text-gray-500">{order.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
