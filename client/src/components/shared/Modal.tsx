import React from "react";
import { FaX } from "react-icons/fa6";

type IModal = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

const Modal = ({ isOpen, onClose, title, children }: IModal) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10  bg-[#e9eae775] opacity-99  backdrop-blur-lg  flex justify-center items-center ">
      <div className="bg-[#ffffff]   rounded-lg shadow-l w-full max-w-lg mx-4">
        <div className="flex justify-between items-center px-6 py-4 border-b border-b-[#333]">
          <h2 className="text-xl text-[#000] font-semibold">{title}</h2>
          <button
            className="text-gray-500 cursor-pointer text-2xl hover:text-gray-800"
            onClick={onClose}
          >
            <FaX />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
