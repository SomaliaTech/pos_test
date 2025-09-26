import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import useItemStore from "../../lib/store";
import itemUserStore from "../../lib/itemUserStore";
import { axiosIntence } from "../../lib/axiosIntence";
import Invoice from "../invoice/invoice";
import toast from "react-hot-toast";

const Bill = () => {
  const customerData = itemUserStore((state: any) => state.user);
  const items = useItemStore((state) => state.items);

  const total = items.reduce((sum, item) => {
    const price = Number(item.pricePerQuantity);
    const quantity = Number(item.quantity) || 1;
    return sum + price * quantity;
  }, 0);
  console.log(items);
  const taxRate = 5.25;
  const tax = (total * taxRate) / 100;
  const totalPriceWithTax = total + tax;
  console.log("customer", customerData);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [showInvoice, setShowInvoice] = useState(false);
  const [orderInfo, setOrderInfo] = useState();
  const [customer, setCustomer] = useState("outside");

  const orderMutation = useMutation({
    mutationKey: ["order_create"],
    mutationFn: async (data: any) => {
      const res = await axiosIntence.post("/api/orders/create", data);
      return res.data;
    },
    onSuccess: (order) => {
      if (order.data) {
        setOrderInfo(order.data); // store full order info once
      }
      setShowInvoice(true); // show the invoice

      setTimeout(() => {
        if (order.data) {
          setOrderInfo(order.data); // store full order info once
        }
        const tableData = {
          status: "reserved",
          orderId: order.data._id,
          tableId: order.data.table,
        };
        tableMutate.mutate(tableData);
      }, 1500); // delay table update by 1.5 seconds
    },
    onError: () => {
      toast.error("Failed to place order");
    },
  });
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
    onSuccess: (order) => {
      setOrderInfo(order.data);
      setShowInvoice(true);
    },
    onError: (err) => {
      console.log(err);
      toast.error("Failed to place order");
    },
  });
  const handlePlaceOrder = () => {
    if (!paymentMethod) {
      toast.success("Please select a payment method!");
      return;
    }

    const orderDatas: any = {
      customer,
      orderStatus: "In Progress",
      items,
      bills: {
        total,
        tax,
        totalWithTax: totalPriceWithTax,
      },
      paymentMethod,
    };

    if (!customerData?.table) {
      setCustomer("inside");
      const orderData = {
        ...orderDatas,
        customerDetails: {
          name: customerData.name,
          phone: customerData.phone,
          userId: customerData._id,
        },
      };
      orderMutation.mutate(orderData);
    } else {
      setCustomer("outside");
      const orderData = {
        ...orderDatas,
        table: customerData.table.tableId,
        customerDetails: {
          name: customerData.name,
          phone: customerData.phone,
          userId: customerData._id,
          guests: customerData.guests,
        },
      };

      orderMutation.mutate(orderData);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">Items Total</p>
        <h1 className="text-[#000] text-md font-bold">${total.toFixed(2)}</h1>
      </div>

      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">
          Tax ({taxRate}%)
        </p>
        <h1 className="text-[#000] text-md font-bold">${tax.toFixed(2)}</h1>
      </div>

      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">
          Total With Tax
        </p>
        <h1 className="text-[#000] text-md font-bold">
          ${totalPriceWithTax.toFixed(2)}
        </h1>
      </div>

      <div className="flex items-center gap-3 px-5 mt-4">
        <button
          onClick={() => setPaymentMethod("Cash")}
          className={`px-4 py-3 w-full rounded-lg font-semibold ${
            paymentMethod === "Cash"
              ? "bg-[#00CA3B] text-white"
              : "bg-[#F8FBFA] text-[#000]"
          }`}
        >
          Cash
        </button>
        <button
          onClick={() => setPaymentMethod("Online")}
          className={`px-4 py-3 w-full rounded-lg font-semibold ${
            paymentMethod === "Online"
              ? "bg-[#00CA3B] text-white"
              : "bg-[#F8FBFA] text-[#000]"
          }`}
        >
          Online
        </button>
      </div>

      <div className="flex items-center gap-3 px-5 mt-4">
        <button className="bg-[#025cca] px-4 py-3 w-full rounded-lg text-white font-semibold text-sm">
          Print Receipt
        </button>
        <button
          disabled={orderMutation.isPending}
          onClick={handlePlaceOrder}
          className="bg-[#f6b100] px-4 py-3 w-full rounded-lg text-[#1f1f1f] font-semibold text-sm disabled:opacity-60"
        >
          {orderMutation.isPending ? "Creating..." : "Place Order"}
        </button>
      </div>

      {showInvoice && (
        <Invoice orderInfo={orderInfo} setShowInvoice={setShowInvoice} />
      )}
    </>
  );
};

export default Bill;
