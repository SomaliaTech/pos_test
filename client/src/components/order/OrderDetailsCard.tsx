import { formatDateAndTime } from "../../context";
import { useQuery } from "@tanstack/react-query";
import { axiosIntence } from "../../lib/axiosIntence";
import { useLocation } from "react-router-dom";

const OrderDetailsCard = () => {
  //   const orderInfo = {
  //     id: "#1909252",
  //     status: "Preparing",
  //     paymentStatus: "Paid",
  //     date: "09:00 PM, 19-09-2025",
  //     paymentType: "Cash",
  //     orderType: "Dining Table",
  //     deliveryTime: "19-09-2025 08:30 PM - 09:00 PM",
  //     tokenNo: "#0102",
  //     tableName: "Table 1",
  //     customer: {
  //       name: "Will Smith",
  //       email: "customer@example.com",
  //       phone: "+8801253333444",
  //     },
  //     items: [
  //       {
  //         name: "Vegan Hum-Burger With Cheese",
  //         size: "Regular",
  //         price: 2.5,
  //       },
  //       {
  //         name: "Mojito",
  //         price: 2.0,
  //       },
  //       {
  //         name: "French Fries",
  //         size: "Regular",
  //         price: 1.0,
  //       },
  //       {
  //         name: "Baked Potato",
  //         price: 1.5,
  //       },
  //     ],
  //   };

  //   const subtotal = orderInfo.items.reduce(
  //     (total, item) => total + item.price,
  //     0
  //   );

  //   const total = subtotal - discount;

  //   const orderInfo = useOrderDetailsStore((state) => state.items?.newItem);
  //   console.log(orderInfo);
  const { pathname } = useLocation();

  const orderId = pathname?.split("/")[2];
  const { data: orderInfo, isLoading } = useQuery({
    queryKey: ["order_detials"],
    queryFn: async () => {
      try {
        console.log("orderId", orderId);
        const res = await axiosIntence.get(`/api/orders/details/${orderId}`);

        return res?.data?.orders;
      } catch (err) {
        console.log(err);
      }
    },
  });
  console.log(orderInfo);
  return (
    <div className="min-h-screen bg-[#E9EAE7] py-8 px-4 sm:px-6 lg:px-8">
      {isLoading ? (
        <h1>loading....</h1>
      ) : (
        <>
          <div className="flex  flex-col-reverse justify-between gap-4 p-6 bg-white mb-6 ">
            <div className="grid grid-cols-2 text-[12px] gap-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <span className="text-blue-600">🕒</span>
                </div>
                <span className="text-gray-700">
                  {formatDateAndTime(orderInfo?.createdAt)}
                </span>
              </div>

              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <span className="text-blue-600">💳</span>
                </div>
                <span className="text-gray-700">
                  Payment Type: {orderInfo?.paymentMethod}
                </span>
              </div>

              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <span className="text-blue-600">🍽️</span>
                </div>
                <span className="text-gray-700">
                  Order Type: {formatDateAndTime(orderInfo?.orderDate)}
                </span>
              </div>

              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <span className="text-blue-600">📦</span>
                </div>
                <span className="text-gray-700">
                  Delivery Time: {orderInfo?.deliveryTime}
                </span>
              </div>

              {/* <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <span className="text-blue-600">🔢</span>
            </div>
            <span className="text-gray-700">Token No: {orderInfo?.tokenNo}</span>
          </div> */}

              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <span className="text-blue-600">🏷️</span>
                </div>
                {orderInfo?.tableName && (
                  <span className="text-gray-700">
                    Table Name: {orderInfo?.tableName}
                  </span>
                )}
              </div>
            </div>
            <div className="py-6 px-1 bg-gray-50 flex justify-between items-center">
              <div>
                <span className="inline-block bg-yellow-500 text-yellow-900 text-xs font-semibold px-2 py-1 rounded-md uppercase">
                  Order ID: {orderInfo?._id?.substring(0, 8)}
                </span>
              </div>
              <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg">
                Print Invoice
              </button>
            </div>
          </div>
          {/* Action Buttons */}
          {/* Order Items */}
          <div className="space-y-4">
            <div className="flex gap-12 items-ceter overflow-y-scroll justify-between">
              <div className="flex-1 p-6 -b bg-white shadow-lg  rounded-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Order Details
                </h2>

                <div className="space-y-4">
                  {orderInfo?.items?.map((item: any, index: number) => (
                    <div className="flex gap-2 border-b border-gray-100 pb-1">
                      <div className="relative">
                        <img
                          width={200}
                          height={200}
                          className="w-[70px] h-[70px] object-cover rounded-md"
                          src="https://d91ztyz4qy326.cloudfront.net/foodscan/51/conversions/vegan_hum-burger_with_cheese-thumb.png"
                        />
                        <span className="inline-block absolute top-2 left-1  bg-yellow-500 text-yellow-900 text-xs font-semibold px-2 py-1 rounded-md uppercase">
                          x{item.quantity}
                        </span>
                      </div>
                      <div
                        key={index}
                        className="flex flex-col gap- items-start py2"
                      >
                        <h3 className="font-medium text-gray-800">
                          {item.name}
                        </h3>
                        {item.size && (
                          <p className="text-sm text-gray-500 mt-1">
                            Size: {item.size}
                          </p>
                        )}
                        <span className="font-semibold text-gray-700">
                          ${item?.pricePerQuantity?.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pricing Summary */}
              </div>
              {/* subtotal */}
              <div className="flex-1 flex flex-col gap-4">
                <div className="  bg-white shadow-lg  rounded-md   p-4 borde border-gray-200 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-800">
                      ${orderInfo?.bills?.total.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium text-green-600">
                      ${orderInfo?.bills?.tax}
                    </span>
                  </div>

                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="text-lg font-semibold text-gray-800">
                      Total
                    </span>
                    <span className="text-lg font-bold text-blue-700">
                      ${orderInfo?.bills?.totalWithTax?.toFixed(2)}
                    </span>
                  </div>
                </div>
                {/* Customer Information */}
                <div className="bg-white shadow-lg  p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Delivery Information
                  </h2>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-bold text-lg text-gray-800">
                      {orderInfo?.customerDetails?.name}
                    </h3>
                    <a
                      href={`mailto:${orderInfo?.customerDetails?.email}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline block my-1"
                    >
                      hussein@gmial.com
                      {/* {orderInfo.customerDetails?.email} */}
                    </a>
                    <p className="text-gray-700">
                      {orderInfo?.customerDetails?.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {/* Order Information */}
    </div>
  );
};

export default OrderDetailsCard;
