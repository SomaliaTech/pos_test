import { FaCheckDouble, FaLongArrowAltRight } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";

const OrderList = ({ key, order }: { key: number; order: any }) => {
  return (
    <div key={key} className="flex items-center gap-5 mb-3">
      {order?.customerDetails && (
        <button className="bg-[#00C951] p-3 h-[40px] w-[40px] text-2xl font-bold rounded-full flex items-center justify-center ">
          {order.customerDetails.name?.charAt(0)}
        </button>
      )}
      <div className="flex items-center justify-between w-[100%]">
        {order?.customerDetails && (
          <div className="flex flex-col items-start gap-1">
            <h1 className="text-[#00000096] text-lg font-semibold tracking-wide">
              {order.customerDetails.name}
            </h1>
            <p className="text-[#000] text-sm">{order.items.length} Items</p>
          </div>
        )}
        {order?.table && (
          <h1 className="text-[#00C951] font-semibold border border-[#00C951] rounded-lg p-1">
            Table <FaLongArrowAltRight className="text-[#000] ml-2 inline" />{" "}
            {/* {order.table.tableNo} */}
            "N/A"
          </h1>
        )}
        {order?.customor == "outside" && (
          <div className="flex flex-col items-end gap-2">
            {order.orderStatus === "Ready" ? (
              <div>
                <p className="text-green-600 bg-[#2e4a40] px-2 py-1 rounded-lg">
                  <FaCheckDouble className="inline mr-2" /> {order.orderStatus}
                </p>
              </div>
            ) : (
              <div>
                <p className="text-yellow-600 bg-[#4a452e] px-2 py-1 rounded-lg">
                  <FaCircle className="inline mr-2" /> {order.orderStatus}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderList;
