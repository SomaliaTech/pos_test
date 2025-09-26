import { useRef, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Modal } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { axiosIntence } from "../../../lib/axiosIntence";
import { BsEye } from "react-icons/bs";
import { BiPrinter } from "react-icons/bi";
import { formatDateAndTime } from "../../../context";
import { useNavigate } from "react-router-dom";
import useOrderDetailsStore from "../../../lib/order-details-store";
function OrderHistoryCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["orders_gas"],
    queryFn: async () => {
      const res = await axiosIntence.get("/api/orders");
      return res?.data?.orders;
    },
  });

  const [selectedUserOrders, setSelectedUserOrders] = useState([]);
  const [selectedUserName, setSelectedUserName] = useState("");
  const [selectedUserDebt, setSelectedUserDebt] = useState(0);
  const [open, setOpen] = useState(false);
  const dispatchItem = useOrderDetailsStore((state) => state.addItem);
  const [printData, setPrintData] = useState<{
    orders: any[];
    name: string;
    debt: number;
  } | null>(null);

  const invoiceRef = useRef<HTMLDivElement>(null);

  // Create handlePrint with proper ref dependency
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // Trigger print when printData is available
  useEffect(() => {
    if (printData && invoiceRef.current) {
      // Use setTimeout to ensure the DOM is updated before printing
      setTimeout(() => {
        handlePrint();
        setPrintData(null); // Reset print data after printing
      }, 100);
    }
  }, [printData, handlePrint]);

  const handleViewOrders = async (userId: string) => {
    setOpen(true);
    try {
      const res = await axiosIntence.get(`/api/orders/${userId}`);
      const userOrders = res.data.orders;
      setSelectedUserOrders(userOrders);
      setSelectedUserName(res.data.customerDetails?.name || "Unknown");
      setSelectedUserDebt(res.data.totalDebt || 0);
    } catch (err) {
      console.error(err);
    }
  };
  const navigator = useNavigate();
  const handlePrintOrders = async (userId: string) => {
    try {
      const res = await axiosIntence.get(`/api/orders/details/${userId}`);
      const userOrders = res.data.orders;
      // Set data for printing
      setPrintData({
        orders: userOrders,
        name: res.data.customerDetails?.name || "Unknown",
        debt: res.data?.totalDebt || 0,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const columns: GridColDef[] = [
    { field: "shortId", headerName: "Number ID", flex: 0.2 },
    { field: "date", headerName: "Date Time", flex: 0.3 },
    { field: "customer", headerName: "Customer", flex: 0.3 },
    { field: "amount", headerName: "Amount", flex: 0.1 },
    { field: "payment_mode", headerName: "Payment Mode", flex: 0.1 },
    {
      field: "view_orders",
      headerName: "View Orders",
      flex: 0.1,
      renderCell: (params: any) => (
        <div
          onClick={() => handleViewOrders(params.row.shortId)}
          className="h-full flex items-center justify-center cursor-pointer"
        >
          <BsEye size={17} color="red" className="ml-2 text-center" />
        </div>
      ),
    },
    {
      field: "print",
      headerName: "Print",
      flex: 0.1,
      renderCell: (params: any) => (
        <div
          onClick={() => handlePrintOrders(params.row.shortId)}
          className="h-full flex items-center justify-center cursor-pointer"
        >
          <BiPrinter size={17} color="green" className="ml-2 text-center" />
        </div>
      ),
    },
  ];

  interface IRows {
    id: string;
    customer: string;
    amount: number;
    payment_mode: string;
    date: Date | string;
    shortId: string;
  }

  const rows: IRows[] = [];

  data?.map((item: any) =>
    rows.push({
      id: item._id,
      shortId: item?.customerDetails?.userId
        ? item?.customerDetails?.userId
        : "3131",
      customer: item.customerDetails?.name,
      amount: item.bills.totalWithTax,
      payment_mode: item.paymentMethod,
      date: formatDateAndTime(item.orderDate),
    })
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center bg-red-500 h-full w-full text-4xl text-white rounded-md">
        <h1>Loading...</h1>
      </div>
    );
  }

  const handleUserOrder = (order: any) => {
    console.log(order);
    navigator(`/orders-details/${order?.customerDetails?.userId}`);
    dispatchItem(order);
  };
  return (
    <>
      <div className="w-[100%] h-[100%] ml12 bg-gray-100">
        <Box
          sx={{
            height: "100%",
            width: "96%",
            "&>.MuiDataGrid-main": {
              "&>.MuiDataGrid-columnHeaders": { borderBottom: "none" },
              "& div div div div >.MuiDataGrid-cell": { borderBottom: "none" },
            },
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel: { pageSize: 12 } } }}
            checkboxSelection
            disableRowSelectionOnClick
          />

          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-[90vw] max-w-4xl p-6 rounded-md shadow-md">
                <h1 className="text-2xl font-bold mb-4 text-center">
                  User Order Details
                </h1>

                <div className="mb-4">
                  <p>
                    <strong>Name:</strong> {selectedUserName}
                  </p>
                  <p>
                    <strong>Total Debt:</strong> ${selectedUserDebt.toFixed(2)}
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm border border-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border px-3 py-2">Order ID</th>
                        <th className="border px-3 py-2">Date</th>
                        <th className="border px-3 py-2">Amount</th>
                        <th className="border px-3 py-2">Payment Mode</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedUserOrders?.length > 0 ? (
                        selectedUserOrders?.map((order: any) => (
                          <tr
                            className=""
                            onClick={() => handleUserOrder(order)}
                            key={order._id}
                          >
                            <td className="border px-3 py-2">
                              #{order._id.substring(0, 6)}
                            </td>
                            <td className="border px-3 py-2">
                              {formatDateAndTime(order.orderDate)}
                            </td>
                            <td className="border px-3 py-2">
                              ${order.bills.total}
                            </td>
                            <td className="border px-3 py-2">
                              {order.paymentMethod}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            className="border px-3 py-2 text-center"
                            colSpan={4}
                          >
                            No orders found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setOpen(false)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Close
                  </button>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      </div>

      {/* Printable Section - Always rendered but hidden */}
      <div
        ref={invoiceRef}
        className="hidden print:block p-6 bg-white text-black"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">
          User Order Details
        </h1>
        <div className="mb-4">
          <p>
            <strong>Name:</strong> {printData?.name || selectedUserName}
          </p>
          <p>
            <strong>Total Debt:</strong> ${printData?.debt || selectedUserDebt}
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2">Order ID</th>
                <th className="border px-3 py-2">Date</th>
                <th className="border px-3 py-2">Amount</th>
                <th className="border px-3 py-2">Payment Mode</th>
              </tr>
            </thead>
            <tbody>
              {(printData?.orders || selectedUserOrders).length > 0 ? (
                (printData?.orders || selectedUserOrders).map((order: any) => (
                  <tr key={order._id}>
                    <td className="border px-3 py-2">
                      #{order._id.substring(0, 6)}
                    </td>
                    <td className="border px-3 py-2">
                      {formatDateAndTime(order.orderDate)}
                    </td>
                    <td className="border px-3 py-2">${order.bills.total}</td>
                    <td className="border px-3 py-2">{order.paymentMethod}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="border px-3 py-2 text-center" colSpan={4}>
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default OrderHistoryCard;
