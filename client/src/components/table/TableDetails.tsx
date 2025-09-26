import { useQuery } from "@tanstack/react-query";
import QRCode from "react-qr-code";
import { useLocation } from "react-router-dom";
import { axiosIntence } from "../../lib/axiosIntence";
import { MdEventSeat } from "react-icons/md";

const TableDetails = () => {
  const restaurantInfo = {
    phone: "+252 615328654",
    address: "House : 25, Road No: 2, Block A, Mogadishu, Somalia",

    message: "Please scan & send quick order\nThank You",
  };
  const PUBLIC_DOMAIN = import.meta.env.VITE_API_PUBLIC_DOMAIN;

  const { pathname } = useLocation();

  const orderId = pathname?.split("/")[2];
  const { data: tableInfo } = useQuery({
    queryKey: ["order_detials"],
    queryFn: async () => {
      try {
        console.log("orderId", orderId);
        const res = await axiosIntence.get(`/api/table/details/${orderId}`);

        return res?.data?.data;
      } catch (err) {
        console.log(err);
      }
    },
  });
  const qrValue = `${PUBLIC_DOMAIN}/${tableInfo?._id}`;
  console.log(tableInfo);
  return (
    <div className="bg-gradient-to-br  h-full w-full to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-m w-full  h-full bg-white p-6 rounded-2xl shadow-xl overflow-hidden flex flex-col">
        {/* Header Section - Using Flexbox */}

        <div className="py-6 px-1 bg-gray-50 flex justify-between items-center">
          <div className="flex flex-ol gap-2 items-center text-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <p className="text-lg font-semibold text-gray-800">
              {restaurantInfo.phone}
            </p>
          </div>
          <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg">
            Print Invoice
          </button>
        </div>
        {/* Restaurant Info - Using Grid */}
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-1  gap-6">
            {/* Phone Info - Using Flexbox */}

            {/* Address Info - Using Flexbox */}
            <div className="flex  items-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <p className="text-gray-600">{restaurantInfo.address}</p>
            </div>
          </div>
        </div>

        {/* QR Code Section - Using Grid and Flexbox */}
        <div className="p-6 border-b border-gray-200">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 grid grid-cols-1 gap-4">
            {/* Table Info - Using Flexbox */}
            <div className="flex items-center gap-15">
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-blue-600 text-2xl text-white flex items-center justify-center mb-2">
                  <MdEventSeat />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Seats {tableInfo?.seats}
                </h2>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Table {tableInfo?.tableNo}
                </h2>
              </div>
            </div>

            {/* QR Code - Using Flexbox */}
            <div className="flex justify-center">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <QRCode
                  value={qrValue}
                  size={200}
                  level="H"
                  fgColor="#1e40af"
                  bgColor="#ffffff"
                />
              </div>
            </div>

            {/* Message - Using Flexbox */}
            <div className="flex justify-center">
              <p className="text-gray-600 text-center whitespace-pre-line">
                {restaurantInfo.message}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableDetails;
