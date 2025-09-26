import { useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import {
  MdTableRestaurant,
  MdEventAvailable,
  MdOutlineEventBusy,
  MdOutlineDashboardCustomize,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { format } from "timeago.js";
import itemUserStore from "../../lib/itemUserStore";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa6";
import { BiSearch } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import { formatDateAndTime } from "../../context";
import { FiDelete } from "react-icons/fi";

const TableCards = ({
  setIsModalOpen,
  tableData,
  setSelectedUser,
  selectedUser,
  name,
  phone,
  guests,
  setIsModalOpenUser,
  setFilteredUsers,
}: {
  setIsModalOpen: (open: boolean) => void;
  name: string;
  phone: number | string;
  guests: number;
  tableData: any;
  selectedUser: any;
  setIsModalOpenUser: any;
  setSelectedUser: any;
  setFilteredUsers: any;
}) => {
  const [activeTab, setActiveTab] = useState("available");
  // const customerData = itemUserStore((state: any) => state.user);
  // const [tableId, setTableId] = useState("");
  // Sample table data
  console.log("tableData", tableData);
  const dispatch = itemUserStore((state: any) => state.addUser);
  const filteredTables = tableData?.filter((table: any) => {
    if (activeTab === "available") return table.status === "available";
    if (activeTab === "reserved") return table.status === "reserved";
    if (activeTab === "on-dine") return table.status === "on-dine";
    return true;
  });
  const navigate = useNavigate();

  const handleBooke = (id: string) => {
    if (name) {
      navigate("/menu");
      dispatch({ name, phone, guests, table: { tableId: id } });
      toast.success("Now you can add menu");
    } else if (selectedUser) {
      navigate("/menu");
      dispatch({
        name: selectedUser.name,
        phone: selectedUser.phone,
        guests: 1,
        table: { tableId: id },
      });
      toast.success("Now you can add menu");
    } else {
      toast.error("Please first choose user or create");
    }
  };

  const handleClickedTable = (table: any) => {
    navigate(`/table-details/${table?._id}`);
  };
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md flex flex-col">
        {selectedUser ? (
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex flex-col items-start">
              <h1 className="text-md text-[#000] font-semibold tracking-wide">
                {selectedUser?.name || "Customer Name"}
              </h1>

              <p className="text-xs text-[#ababab] font-medium mt-1">
                #
                {selectedUser._id?.toString()?.substring(2, 8) ||
                  uuidv4().toString()?.substring(2, 8) ||
                  "N/A"}
              </p>
              <p className="text-xs text-[#ababab] font-medium mt-2">
                {formatDateAndTime(Date.now())}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setSelectedUser(null);
                  setFilteredUsers([]);
                }}
                className="bg-[#00ca3b] cursor-pointer p-2 text-sm text-white font-bold rounded-lg"
              >
                <FiDelete />
              </button>
              <button
                onClick={() => {
                  setIsModalOpenUser(true);

                  setFilteredUsers([]);
                }}
                className="bg-[#00ca3b] cursor-pointer  p-3 text-sm text-white font-bold rounded-lg"
              >
                RN
              </button>
            </div>
          </div>
        ) : (
          <div
            className="w-full  gap-2 flex px-2 py-2
        "
          >
            <button
              onClick={() => {
                setIsModalOpen(true);
              }}
              className="  w-full cursor-pointer gap-2 bg-[#00C951] hover:text-white  justify-center text-center flex text-[#fff] rounded-md py-2 text-xs px-2 items-center"
            >
              <BsPlusCircle size={17} />
              <p>New Reservation</p>
            </button>
            <div
              onClick={() => {
                setIsModalOpenUser(true);
                console.log("hello world");
              }}
              className="  text-xs cursor-pointer  bg-[#00C951] hover:text-white  justify-center text-center flex text-[#fff] rounded-md py-2 px-2 items-center"
            >
              <BiSearch />
              Search
            </div>
          </div>
        )}

        <div className="p-4">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Dashboard
            </h2>
            <ul>
              <li className="mb-2">
                <button className="flex items-center w-full p-2 rounded-lg text-green-600 bg-green-50">
                  <MdTableRestaurant className="mr-3" /> Manage Tables
                </button>
              </li>
              <li className="mb-2">
                <button className="flex items-center w-full p-2 rounded-lg text-gray-600 hover:bg-gray-100">
                  <MdEventAvailable className="mr-3" /> Reservations
                </button>
              </li>
              <li className="mb-2">
                <button className="flex items-center w-full p-2 rounded-lg text-gray-600 hover:bg-gray-100">
                  <MdOutlineEventBusy className="mr-3" /> Booking History
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Quick Stats
            </h2>
            <div className="bg-green-50 p-3 rounded-lg mb-3">
              <p className="text-sm text-green-700">Total Tables</p>
              <p className="text-2xl font-bold text-green-800">
                {tableData?.length}
              </p>
            </div>

            <div className="bg-orange-50 p-3 rounded-lg">
              <p className="text-sm text-orange-700">Reservations Today</p>
              <p className="text-2xl font-bold text-orange-800">12</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Manage Tables</h1>
          <p className="text-gray-600">
            View and manage table availability and reservations
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b mb-6">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "available"
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("available")}
          >
            Available
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "reserved"
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("reserved")}
          >
            Reserved
          </button>
          {/* <button
            className={`px-4 py-2 font-medium ${
              activeTab === "on-dine"
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("on-dine")}
          >
            On Dine
          </button> */}
        </div>

        {/* Table Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTables.map((table: any) => (
            <div
              key={table.id}
              className="bg-[#DCFCE6] rounded-xl shadow-sm overflow-hidden border border-white"
            >
              <div className="bg-green-20 flex items-center justify-between px-2 py-6">
                <h1>Actions</h1>
                <div className="flex items-center gap-2">
                  <div
                    title="download"
                    className="bg-gray-100 p-1 rounded-sm cursor-pointer w-fit"
                  >
                    <MdOutlineDashboardCustomize size={18} />
                  </div>
                  <div
                    onClick={() => handleClickedTable(table)}
                    title="view"
                    className="bg-gray-100 p-1 rounded-sm cursor-pointer w-fit"
                  >
                    <FaEye size={18} />
                  </div>
                  {/* <div
                    title="edit"
                    className="bg-gray-100 p-1 rounded-sm cursor-pointer w-fit"
                  >
                    <FaRegEdit size={18} />
                  </div> */}
                </div>
              </div>
              <div
                className={`p-4 ${
                  table.status?.toLowerCase() === "available"
                    ? "bg-green-100"
                    : table.status.toLowerCase() === "reserved"
                    ? "bg-blue-100"
                    : "bg-orange-100"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{format(table.time)}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      table.status === "available"
                        ? "bg-green-200 text-green-800"
                        : table.status === "reserved"
                        ? "bg-blue-200 text-blue-800"
                        : "bg-orange-200 text-orange-800"
                    }`}
                  >
                    {table.status === "available"
                      ? "Available"
                      : table.status === "reserved"
                      ? "Reserved"
                      : null}
                  </span>
                </div>
              </div>

              <div className="p-4">
                {table?.currentOrder && (
                  <h3 className="font-bold text-lg mb-2">
                    {table?.currentOrder?.customerDetails?.name}
                  </h3>
                )}
                <h3 className="font-bold text-lg mb-2">Table #{table.seats}</h3>
                {table?.currentOrder && (
                  <div className="flex items-center text-gray-600 mb-2">
                    <span className="mr-2">👥</span>
                    <span>
                      {table?.currentOrder?.customerDetails.guests} Guests
                    </span>
                  </div>
                )}

                {table.currentOrder && (
                  <div className="flex items-center text-gray-600 mb-4">
                    <span className="mr-2">📞</span>
                    <span>{table?.currentOrder?.customerDetails?.phone}</span>
                  </div>
                )}

                <div className="flex space-x-2 mt-4">
                  {table.status.toLowerCase() === "available" ? (
                    <button
                      onClick={() => handleBooke(table?._id)}
                      className="flex-1 cursor-pointer bg-green-600 text-white py-2 rounded-lg text-sm font-medium"
                    >
                      Reserve
                    </button>
                  ) : table.status?.toLowerCase() === "reserved" ? (
                    <>
                      <button className="flex-1 cursor-pointer bg-green-600 text-white py-2 rounded-lg text-sm font-medium">
                        Check In
                      </button>
                      <button className="flex-1 cursor-pointer bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium">
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button className="flex-1 cursor-pointer bg-green-600 text-white py-2 rounded-lg text-sm font-medium">
                      Check Out
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableCards;
