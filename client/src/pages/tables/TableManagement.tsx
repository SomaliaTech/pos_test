import React, { useState, useEffect } from "react";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import LeftMenu from "../../components/shared/LeftMenu";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/shared/Modal";
import { axiosIntence } from "../../lib/axiosIntence";

import toast from "react-hot-toast";
import TableCards from "../../components/table/TableCards";

const TablesMenagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guestCount, setGuestCount] = useState(1);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const increment = () => {
    if (guestCount >= 6) return;
    setGuestCount((prev) => prev + 1);
  };
  const decrement = () => {
    if (guestCount <= 0) return;
    setGuestCount((prev) => prev - 1);
  };
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "POS | Tables";
  }, []);

  const {
    data: resData,

    isLoading,
  } = useQuery({
    queryKey: ["tables"],
    queryFn: async () => {
      try {
        const res = await axiosIntence.get("api/table/");

        return res.data?.data;
      } catch (err) {
        console.log(err);
      }
    },
    placeholderData: keepPreviousData,
  });

  const handleCreateOrder = () => {
    setIsModalOpen(false);
    toast.success("you can reservered postion now", { position: "top-right" });
  };

  return (
    <>
      <section className="bg-[#E8EAE7] w-full flex h-screen overflow-hidden">
        <div className="w-20 md:w-64 flex-shrink-0">
          <LeftMenu />
        </div>

        {isLoading ? (
          <h1>loading...</h1>
        ) : (
          <div className="flex-1">
            <TableCards
              name={name}
              phone={phone}
              guests={guestCount}
              tableData={resData}
              setIsModalOpen={setIsModalOpen}
            />
          </div>
        )}
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Order"
      >
        <div>
          <label className="block text-[#ababab] mb-2 text-sm font-medium">
            Customer Name
          </label>
          <div className="flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]">
            <input
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              type="text"
              name=""
              placeholder="Enter customer name"
              id=""
              className="bg-transparent flex-1 text-white focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
            Customer Phone
          </label>
          <div className="flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]">
            <input
              value={phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPhone(e.target.value)
              }
              type="number"
              name=""
              placeholder="+91-9999999999"
              id=""
              className="bg-transparent flex-1 text-white focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="block mb-2 mt-3 text-sm font-medium text-[#ababab]">
            Guest
          </label>
          <div className="flex items-center justify-between bg-[#1f1f1f] px-4 py-3 rounded-lg">
            <button onClick={decrement} className="text-yellow-500 text-2xl">
              &minus;
            </button>
            <span className="text-white">{guestCount} Person</span>
            <button onClick={increment} className="text-yellow-500 text-2xl">
              &#43;
            </button>
          </div>
        </div>
        <button
          onClick={handleCreateOrder}
          className="w-full bg-[#343434] text-[#f5f5f5] cursor-pointer rounded-lg py-3 mt-8 hover:bg-yellow-700"
        >
          Create Order
        </button>
      </Modal>
    </>
  );
};

export default TablesMenagement;
