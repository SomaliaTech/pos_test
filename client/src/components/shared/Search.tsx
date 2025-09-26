import { FaSearch } from "react-icons/fa";
import { axiosIntence } from "../../lib/axiosIntence";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import itemUserStore from "../../lib/itemUserStore";

type ISearch = {
  setIsModalOpen: any;
  setSelectedUser: any;
  filteredUsers: any;
  setFilteredUsers: any;
};
function Search({
  setIsModalOpen,
  setSelectedUser,
  filteredUsers,
  setFilteredUsers,
}: ISearch) {
  const [search, setSearch] = useState("");

  const dispatchUser = itemUserStore((state: any) => state.addUser);

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
                      //   setDateTime(new Date());
                    }}
                    key={order._id}
                    className="w-full bg-[#0c0a0a] text-white rounded-sm px-2 py-1 mt-2 cursor-pointer"
                  >
                    <h1>{order?.name}</h1>
                  </div>
                );
              })
            ) : (
              <p className="col-span-3 text-gray-500">No orders available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Search;
