import { useState } from "react";
import { MdOutlineReport, MdTableRestaurant } from "react-icons/md";
import { BiLogOut, BiUser } from "react-icons/bi";
import { FaAlignRight, FaChartPie, FaHistory } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import useUserStore from "../../lib/userStore";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { SiBoardgamegeek, SiPrestashop } from "react-icons/si";

const LeftMenu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const navigator = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "Dashboard", icon: <RxDashboard size={24} /> },
    { path: "/menu", label: "Menus", icon: <FaChartPie size={24} /> },
    {
      path: "/tables",
      label: "Manage Table",
      icon: <MdTableRestaurant size={24} />,
    },
    {
      path: "/orders-management",
      label: "Orders",
      icon: <FaAlignRight size={24} />,
    },
    {
      path: "/order-history",
      label: "Order History",
      icon: <FaHistory size={24} />,
    },
    { path: "/report", label: "Report", icon: <MdOutlineReport size={24} /> },
  ];

  const handleItemClick = (path: string) => {
    navigator(path);

    // In a real app, you would also navigate using useNavigate from react-router-dom
  };

  return (
    <div className="flex h-screen  ">
      {/* Left Menu */}
      <div className="w-64 bg-white shadow-lg flex flex-col justify-between py-6">
        {/* Logo */}
        <div className="flex items-center justify-around gap-4">
          <div className="flex items-center gap-3 cursor-pointer">
            <SiPrestashop className="text-[#00CA3B] text-4xl" />
            <div className="flex flex-col items-start">
              <h1 className="text-md text-[#000] font-semibold tracking-wide">
                {"Haldoor Restaurant"}
              </h1>
              <p className="text-xs text-[#ababab] font-medium">
                Mogadisho Somalia
              </p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 mt-8">
          <ul className="space-y-2 px-4">
            {menuItems.map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => handleItemClick(item.path)}
                  className={`w-full flex items-center px-4 cursor-pointer py-3 rounded-xl transition-colors ${
                    location.pathname === item.path
                      ? "bg-green-500 text-white"
                      : "text-gray-700 hover:bg-green-100 hover:text-green-600"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* User Section */}
        <div className="px-4 py-6 border-t border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-semibold">
                  {user?.name.charAt(0)}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500">{user?.role}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => {
                navigator("/login");
              }}
              className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <BiLogOut size={20} />
            </button>
            <button
              className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              onClick={() => setIsModalOpen(true)}
            >
              <BiUser size={20} />
            </button>
          </div>
          {user?.role === "admin" && (
            <Link
              to={"/admin"}
              className="bg-green-500 text-white rounded-md cursor-pointer py-2 px-12  flex items-center gap-2 mt-5"
            >
              <SiBoardgamegeek />
              Board
            </Link>
          )}
        </div>
      </div>

      {/* Main Content */}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96">
            <h3 className="text-xl font-bold mb-4">User Profile</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  defaultValue="Gladina Samantha"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  defaultValue="Waiters"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftMenu;
