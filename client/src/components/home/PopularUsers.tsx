import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { axiosIntence } from "../../lib/axiosIntence";
import { useQuery } from "@tanstack/react-query";
import itemUserStore, { type IUser } from "../../lib/itemUserStore";
import { useNavigate } from "react-router-dom";

const PopularUsers = () => {
  const [search, setSearch] = useState("");
  const dispatch = itemUserStore((state: any) => state.addUser);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { data, isLoading } = useQuery({
    queryKey: ["users_gas"],
    queryFn: async () => {
      try {
        const res = await axiosIntence.get("/api/user/");

        return res?.data?.users;
      } catch (err) {
        console.log(err);
      }
    },
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && search.length >= 2) {
      const selected = data.filter((user: any) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredUsers(selected);
    } else {
      setFilteredUsers(data);
    }
  }, [search, data, isLoading]);
  // console.log("filter", filteredUsers);

  const handleUser = (user: IUser) => {
    dispatch(user);
    navigate("/menu");
  };
  return (
    <div className="mt-6 pr-6">
      <div className=" bg-[#F9FBFA] w-full rounded-lg">
        <div className="flex justify-between items-center px-6 py-4">
          <h1 className="text-[#000] text-lg font-semibold tracking-wide">
            Popular Customers
          </h1>
        </div>
        <div className="flex items-center gap-4 bg-[#E7E7E7] rounded-[15px] px-6 py-4 mx-6">
          <FaSearch className="text-[#000]" />
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search recent orders"
            className="bg-[#] outline-none text-[#000]"
          />
        </div>
        {isLoading ? (
          <h1>loading...</h1>
        ) : (
          <div className="overflow-y-scroll h-[680px] scrollbar-hide">
            {filteredUsers?.map((user: any) => {
              return (
                <div
                  key={user?._id}
                  onClick={() => handleUser(user)}
                  className="flex items-center cursor-pointer gap-4 bg-[#E7E7E7] rounded-[15px] px-6 py-4 mt-4 mx-6"
                >
                  {user?.image ? (
                    <img
                      src={user?.image}
                      // alt={user?.name}
                      className="w-[50px] h-[50px] rounded"
                    />
                  ) : (
                    <div
                      className="w-[50px] h-[50px] rounded-full bg-white flex justify-center
                    items-center text-3xl"
                    >
                      {user.name?.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h1 className="text-[#000] font-semibold tracking-wide">
                      {user?.name}
                    </h1>
                    <p className="text-[#000] text-sm font-semibold mt-1">
                      <span className="text-[#ababab]">ID Number: </span>#
                      {user._id?.toString().substring(2, 8) as string}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PopularUsers;
