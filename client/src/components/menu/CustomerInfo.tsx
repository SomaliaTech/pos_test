import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { axiosIntence } from "../../lib/axiosIntence";
import { useQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import itemUserStore from "../../lib/itemUserStore";
import { formatDateAndTime } from "../../context";

const CustomerInfo = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const dispatchUser = itemUserStore((state: any) => state.addUser);
  const item = itemUserStore((state: any) => state.user);

  const [selectedUser, setSelectedUser] = useState(item);

  const { data, isLoading } = useQuery({
    queryKey: ["users_ga"],
    queryFn: async () => {
      try {
        const res = await axiosIntence.get("/api/user/");

        return res?.data?.users;
      } catch (err) {
        console.log(err);
      }
    },
  });

  useEffect(() => {
    if (!isLoading && search.length >= 2) {
      const selected = data.filter((user: any) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredUsers(selected);
    } else {
      setFilteredUsers([]);
    }
  }, [search, data, isLoading]);

  return (
    <>
      {selectedUser ? (
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex flex-col items-start">
            <h1 className="text-md text-[#000] font-semibold tracking-wide">
              {selectedUser?.name || "Customer Name"}
            </h1>

            <p className="text-xs text-[#ababab] font-medium mt-1">
              #
              {item._id?.toString()?.substring(2, 8) ||
                uuidv4().toString()?.substring(2, 8) ||
                "N/A"}
            </p>
            <p className="text-xs text-[#ababab] font-medium mt-2">
              {formatDateAndTime(dateTime)}
            </p>
          </div>
          <button
            onClick={() => {
              setIsModalOpen(true);

              setFilteredUsers([]);
            }}
            className="bg-[#00ca3b] cursor-pointer p-3 text-xl text-white font-bold rounded-lg"
          >
            RN
          </button>
        </div>
      ) : (
        <div className="w-full  mt- px-2 mb-5">
          <div className="flex items-center gap-4 bg-[#E7E7E7] rounded-md px-4 py-2 ">
            <FaSearch className="text-[#000]" />
            <input
              onClick={() => setIsModalOpen(true)}
              type="text"
              placeholder="Search recent orders"
              className="bg-[#] outline-none text-[#000]"
            />
          </div>
        </div>
      )}
      {isModalOpen && (
        <div className="fixed flex items-center justify-center top-0 bottom-0 right-0 left-0 inset-0">
          {/* Background with opacity */}
          <div
            className="absolute inset-0 bg-black opacity-90"
            onClick={() => setIsModalOpen(false)}
          ></div>

          {/* Modal content without opacity */}
          <div className="relative z-50 flex flex-col items-center bg-[#F9FBFA] w-[450px] rounded-lg py-6 px-4">
            <div className="flex justify-between items-center  w-full">
              <h1 className="text-[#000] text-lg font-semibold tracking-wide">
                Search Users
              </h1>
              <div
                onClick={() => setIsModalOpen(false)}
                className="text-[#ca0f02] cursor-pointer text-xl font-semibold"
              >
                X
              </div>
            </div>

            <div className="w-full  mt-4">
              <div className="flex items-center gap-4 bg-[#E7E7E7] rounded-md px-6 py-2 ">
                <FaSearch className="text-[#000]" />
                <input
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search recent orders "
                  className="bg-[#] outline-none w-full text-[#000]"
                />
              </div>

              {/* Order list */}
              <div className="mt-4 overflow-y-scroll h-[300px] scrollbar-hide">
                {filteredUsers?.length > 0 ? (
                  filteredUsers.map((order: any) => {
                    return (
                      <div
                        onClick={() => {
                          dispatchUser(order);
                          setSelectedUser(order);
                          setIsModalOpen(false);
                          setDateTime(new Date());
                        }}
                        key={order._id}
                        className="w-full bg-[#0c0a0a] text-white rounded-sm px-2 py-1 mt-2 cursor-pointer"
                      >
                        <h1>{order?.name}</h1>
                      </div>
                    );
                  })
                ) : (
                  <p className="col-span-3 text-gray-500">
                    No orders available
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerInfo;
