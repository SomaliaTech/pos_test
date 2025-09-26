import { FaCheckDouble, FaLongArrowAltRight } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import { formatDateAndTime } from "../../context";

const OrderCard = ({ key, order }: { key: any; order: any }) => {
  console.log(order);
  return (
    <div key={key} className=" w-full bg-[#fff] p-4 rounded-lg mb-4">
      <div className="flex items-center gap-5">
        <button className="bg-[#000] text-white p-3 text-2xl font-bold rounded-full w-[40px] h-[40px] flex justify-center items-center">
          {/* {getAvatarName(order.customerDetails.name)} */}H
        </button>
        <div className="flex items-center justify-between w-[100%]">
          <div className="flex flex-col items-start gap-1">
            <h1 className="text-[#000] text-lg font-semibold tracking-wide">
              {/* {order.customerDetails.name} */}
              Hussein Kuneen
            </h1>
            <p className="text-[#ababab] text-sm">
              #{order._id?.toString()?.substring(0, 8)}
            </p>
            <p className="text-[#ababab] text-sm">
              Table{" "}
              <FaLongArrowAltRight className="text-[#ababab] ml-2 inline" />{" "}
              {/* {order.table.tableNo} */}
              N/A
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            {order.orderStatus === "Ready" ? (
              <>
                <p className="text-green-600 bg-[#000] px-2 py-1 rounded-lg">
                  <FaCheckDouble className="inline mr-2" /> {order.orderStatus}
                </p>
                <p className="text-[#000] text-sm">
                  <FaCircle className="inline mr-2 text-green-600" /> Ready to
                  serve
                </p>
              </>
            ) : (
              <>
                <select className="text-yellow-600  outline-0  px-2 py-1 rounded-lg bg-transparent">
                  <option className="bg-transparent" value="">
                    {order.orderStatus}
                  </option>
                  <option className="bg-transparent" value="">
                    Booked
                  </option>
                  <option className="bg-transparent" value="">
                    Available
                  </option>
                </select>
                {/* <p className="text-yellow-600 bg-[#4a452e] px-2 py-1 rounded-lg">
                  <FaCircle className="inline mr-2" /> {order.orderStatus}
                </p> */}
                <p className="text-[#ababab] text-sm">
                  <FaCircle className="inline mr-2 text-yellow-600" /> Preparing
                  your order
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4 text-[#ababab]">
        <p>{formatDateAndTime(order.orderDate)}</p>

        <p>{order?.items?.length} Items</p>
      </div>
      <hr className="w-full mt-4 border-t-1 border-gray-100" />
      <div className="flex items-center justify-between mt-4">
        <h1 className="text-[#000] text-lg font-semibold">Total</h1>
        <p className="text-[#000] text-lg font-semibold">
          ${order?.bills?.totalWithTax.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default OrderCard;
