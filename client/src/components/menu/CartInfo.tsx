import { useEffect, useRef } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";

import useItemStore from "../../lib/store";

const CartInfo = () => {
  const scrolLRef = useRef<HTMLDivElement>(null);
  const cartData = useItemStore((state) => state.items);
  const removeItem = useItemStore((state) => state.removeItem);
  useEffect(() => {
    if (scrolLRef.current) {
      scrolLRef.current.scrollTo({
        top: scrolLRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  const handleRemove = (itemId: string) => {
    removeItem(itemId);
  };

  return (
    <div className="px-4 py-2">
      <h1 className="text-lg text-[#000] font-semibold tracking-wide">
        Order Details
      </h1>
      <div
        className="mt-4 overflow-y-scroll scrollbar-hide h-[380px]"
        ref={scrolLRef as any}
      >
        {cartData?.length === 0 ? (
          <p className="text-[#000] text-sm flex justify-center items-center h-[380px]">
            Your cart is empty. Start adding items!
          </p>
        ) : (
          cartData?.map((item) => {
            return (
              <div
                key={item._id}
                className="bg-[#F9FBFA] shadow-lg rounded-lg px-4 py-4 mb-2"
              >
                <div className="flex items-center justify-between">
                  <h1 className="text-[#000] font-semibold tracling-wide text-md">
                    {item.name}
                  </h1>
                  <p className="text-[#000] font-semibold">x{item.quantity}</p>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div
                    onClick={() => handleRemove(item._id)}
                    className="flex items-center cursor-pointer gap-3 bg-red-500 text-white  py-1 px-2 rounded-md"
                  >
                    <RiDeleteBin6Fill className="text-[#fff] " size={20} />
                    <span>Delete</span>
                  </div>
                  <p className="text-[#000000] text-md font-bold">
                    ${item.price}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CartInfo;
