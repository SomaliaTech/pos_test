import { useEffect, useState } from "react";
import { GrRadialSelected } from "react-icons/gr";
import imageTest from "../../assets/images/food_bg.jpg";
import { BiMinus, BiPlus } from "react-icons/bi";
import useItemStore from "../../lib/store";
import { MdRadioButtonChecked } from "react-icons/md";
import { GoCheckCircleFill } from "react-icons/go";
import { useQuery } from "@tanstack/react-query";
import { axiosIntence } from "../../lib/axiosIntence";
const MenuContainer = () => {
  const { data: menus, isLoading } = useQuery({
    queryKey: ["get-menus"],
    queryFn: async () => {
      try {
        const res = await axiosIntence.get("/api/menus");
        return res.data.menu;
      } catch (err) {
        console.log(err);
      }
    },
  });

  const [selected, setSelected] = useState<any>();
  const [itemCount, setItemCount] = useState(0);

  const [itemId, setItemId] = useState("");
  const addItem = useItemStore((state: any) => state.addItem);

  const items = useItemStore((state: any) => state.items);
  useEffect(() => {
    if (isLoading) return;
    setSelected(menus?.[0]);
  }, [isLoading, menus]);

  const increment = (id: string) => {
    setItemId(id);
    if (itemCount >= 4) return;
    setItemCount((prev) => prev + 1);
  };

  const decrement = (id: string) => {
    setItemId(id);
    if (itemCount <= 0) return;
    setItemCount((prev) => prev - 1);
  };

  const handleAddToCart = (item: any) => {
    if (itemCount === 0) return;

    const { name, price }: { name: string; price: number } = item;

    const aleartItem = items.some((cartItem: any) => cartItem._id === item._id);
    if (aleartItem) {
      console.log("already existed");
    } else {
      addItem({ name, price, itemCount, id: item._id });
    }

    setItemCount(0);
  };

  return (
    <>
      <div className="grid xl:grid-cols-4 sm:grid-cols-3 gap-4 px-10 py-4  w-[100%]">
        {isLoading ? (
          <div>loadding...</div>
        ) : (
          <>
            {menus?.map((menu: any) => {
              return (
                <div
                  key={menu._id}
                  className="flex flex-col items-start justify-between p-4 rounded-lg h-[100px] cursor-pointer"
                  style={{ backgroundColor: "#F8FBFA" }}
                  onClick={() => {
                    setSelected(menu);
                    setItemId("");
                    setItemCount(0);
                  }}
                >
                  <div className="flex items-center justify-between w-full">
                    <h1 className="text-[#000] text-lg font-semibold">
                      {menu.icon} {menu.name}
                    </h1>
                    {selected?._id === menu._id && (
                      <GrRadialSelected className="text-red" size={20} />
                    )}
                  </div>
                  <p className="text-[#000] text-sm font-semibold">
                    {menu?.items.length} Items
                  </p>
                </div>
              );
            })}
          </>
        )}
      </div>

      <hr className="border-[#2a2a2a18] border-t-2 mt-4" />

      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-4 px-7  py-4 w-[100%]">
        {isLoading ? (
          <>loaidng...</>
        ) : (
          <>
            {selected?.items &&
              selected?.items.map((item: any) => {
                return (
                  <div
                    key={item._id}
                    className={`flex flex-col items-start w-full justify-between p-2  rounded-lg h-[150px]  hover:bg-[#f56f02]

                   ${
                     items.some((cartItem: any) => cartItem._id === item._id)
                       ? "bg-[#02ca3a] "
                       : "bg-[#F5B102]"
                   }
                      `}
                  >
                    <div className="flex items-start justify-between w-full">
                      <div className="h-[20px]">
                        <p className="text-[#f5f5f5] text-xl font-bold">
                          ${item?.price}
                        </p>
                        <h1 className="text-[#f5f5f5] text-lg font-semibold">
                          {item?.name}
                        </h1>
                      </div>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="bg-[#2e4a40] cursor-pointer p-2 rounded-lg"
                      >
                        {items?.some(
                          (cartItem: any) => cartItem._id === item._id
                        ) ? (
                          <GoCheckCircleFill
                            className="text-[#02ca3a] "
                            size={20}
                          />
                        ) : (
                          <MdRadioButtonChecked
                            className="text-white"
                            size={20}
                          />
                        )}
                      </button>
                    </div>
                    <div className="flex items-end justify-between w-full h-[80px]">
                      <div>
                        <img
                          src={imageTest}
                          className="w-[70px] h-[70px] rounded-md object-cover"
                        />
                      </div>
                      <div className="flex items-center justify-between bg-[#BE3D40] px- py-3 rounded-lg gap-1 overflow-x-hidden w-[50%]">
                        <button
                          onClick={() => decrement(item?._id)}
                          className="text-yellow-500 cursor-pointer text-2xl"
                        >
                          <BiMinus />
                        </button>
                        <span className="text-white ">
                          {itemId == item?._id ? itemCount : "0"}
                        </span>
                        <button
                          onClick={() => increment(item?._id)}
                          className="text-yellow-500 cursor-pointer text-2xl"
                        >
                          <BiPlus />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </>
        )}
      </div>
    </>
  );
};

export default MenuContainer;
