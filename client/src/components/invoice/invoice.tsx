import { useRef } from "react";

import { FaCheck } from "react-icons/fa6";

const Invoice = ({ orderInfo, setShowInvoice }: any) => {
  console.log(orderInfo);
  const invoiceRef = useRef<HTMLDivElement>(null);
  const handlePrint = () => {
    if (!invoiceRef.current) return;

    const printContent = invoiceRef.current.innerHTML;
    const WinPrint = window.open("", "", "width=900,height=650");

    if (WinPrint) {
      WinPrint.document.write(`
   <html>
    <head>
      <title>Order Receipt</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
          color: #333;
        }
        .title {
          text-align: center;
          font-weight: bold;
          font-size: 20px;
          margin-bottom: 10px;
        }
        .section {
          margin-top: 15px;
          border-top: 1px solid #ccc;
          padding-top: 10px;
        }
        .item {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      ${printContent}
    </body>
  </html>
    `);

      WinPrint.document.close();
      WinPrint.focus();

      setTimeout(() => {
        WinPrint.print();
        WinPrint.close();
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black z-0 opacity-90"></div>
      <div className="bg-white p-4 rounded-lg shadow-lg w-[400px] z-50">
        {/* Receipt Content for Printing */}

        <div ref={invoiceRef} className="p-4">
          {/* Receipt Header */}
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 border-8 border-green-500 rounded-full flex items-center justify-center shadow-lg bg-green-500">
              <span className="text-2xl">
                <FaCheck className="text-white" />
              </span>
            </div>
          </div>

          <h2 className="text-xl font-bold text-center mb-2">Order Receipt</h2>
          <p className="text-gray-600 text-center">Thank you for your order!</p>

          {/* Order Details */}

          <div className="mt-4 border-t pt-4 text-sm text-gray-700">
            <p>
              <strong>Order ID:</strong>{" "}
              {Math.floor(new Date(orderInfo.orderDate).getTime())}
            </p>
            <p>
              <strong>Name:</strong>{" "}
              {orderInfo?.customerDetails?.name
                ? orderInfo.customerDetails.name
                : "User outside"}
            </p>
            <p>
              {/* <strong>Phone:</strong> {orderInfo.customerDetails.phone} */}
            </p>
            <p>
              {/* <strong>Guests:</strong> {orderInfo.customerDetails.guests} */}
            </p>
          </div>

          {/* Items Summary */}

          <div className="mt-4 border-t pt-4">
            <h3 className="text-sm font-semibold">Items Ordered</h3>
            <ul className="text-sm text-gray-700">
              {orderInfo?.items?.map((item: any, index: number) => (
                <li
                  key={index}
                  className="flex justify-between items-center text-xs"
                >
                  <span>
                    {item?.name} x{item?.quantity}
                  </span>
                  <span>${item?.price?.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bills Summary */}

          <div className="mt-4 border-t pt-4 text-sm">
            <p>
              <strong>Subtotal:</strong> ${orderInfo?.bills?.total.toFixed(2)}
            </p>
            <p>
              <strong>Tax:</strong> ${orderInfo?.bills?.tax.toFixed(2)}
            </p>
            <p className="text-md font-semibold">
              <strong>Grand Total:</strong> $
              {orderInfo?.bills?.totalWithTax?.toFixed(2)}
            </p>
          </div>

          {/* Payment Details */}
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrint}
            className="text-blue-500 cursor-pointer hover:underline text-xs px-4 py-2 rounded-lg"
          >
            Print Receipt
          </button>
          <button
            onClick={() => {
              setShowInvoice(false);

              window.location.reload();
            }}
            className="text-red-500 cursor-pointer hover:underline text-xs px-4 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
