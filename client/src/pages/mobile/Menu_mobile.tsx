import { useState } from "react";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { BsPersonFill } from "react-icons/bs";
import { MdRequestQuote } from "react-icons/md";
import { FaX } from "react-icons/fa6";

function TestedMobile() {
  const [showModel, setShowModel] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  console.log("mode", showModel);
  const handleChange = (e: { target: { name: string; value: string } }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };
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

  const handleCreateOrder = () => {
    setIsModalOpen(false);
    toast.success("you can reservered postion now", { position: "top-right" });
  };

  return (
    <>
      <div className="h-screen bg-[#E4E7E6]">
        <div className="flex items-center justify-end mx-6  gap-5 py-12">
          <div className="flex items-center justify-center cursor-pointer text-white bg-red-500 px-8 py-2 rounded-sm">
            Skipe
          </div>
          <div className="flex items-center justify-center text-white cursor-pointer bg-green-500 px-8 py-2 rounded-sm">
            <BsPersonFill />
            Login
          </div>
        </div>
        <div className="flex flex-col justify-center items-center h-[60vh] gap-16 mx-6">
          <div
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-3 text-3xl justify-start w-full text-white cursor-pointer bg-green-500 px-2 py-4 rounded-sm"
          >
            <MdRequestQuote />
            Dalbo Raashin
          </div>
          <div
            onClick={() => {
              setShowModel("contect");
              console.log("hello world");
            }}
            className="flex items-center gap-3 text-3xl justify-start w-full text-white cursor-pointer bg-green-500 px-2 py-4 rounded-sm"
          >
            <MdRequestQuote />
            Cabsho | Codsi
          </div>
        </div>
      </div>
      {showModel === "contect" && (
        <div className="min-h-screen z-[999] bg-white fixed top-0 bottom-0 left-0 right-0 py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mx-1  gap-2 py-12">
            <div
              onClick={() => setShowModel("")}
              className=" md:hidden  text-white cursor-pointer  bg-red-500 p-3 rounded-full "
            >
              <BiArrowBack size={16} />
            </div>
            <div className="flex gap-2">
              <div className="flex items-center justify-center cursor-pointer text-white bg-red-500 px-8 py-2 rounded-sm">
                Skipe
              </div>
              <div className="flex items-center justify-center text-white cursor-pointer bg-green-500 px-8 py-2 rounded-sm">
                <BsPersonFill />
                Login
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Send us a Message
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Phone or Email
              </label>
              <input
                type=""
                id="email"
                name=""
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                placeholder="Phone or Email"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-gray-700 font-medium mb-2"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                placeholder="Type your message here..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Send Message
            </button>
          </form>
        </div>
      )}
      {isModalOpen && (
        <div className="reltive inset-0  z-10  bg-[#e9eae775] opacity-99  backdrop-blur-lg flex-col  flex justify-center items-center  top-0 ">
          <div className="flex items-center justify-between mx-1  gap-2  mb-12">
            <div
              onClick={() => setShowModel("")}
              className=" md:hidden  text-white cursor-pointer  bg-red-500 p-3 rounded-full "
            >
              <BiArrowBack size={16} />
            </div>
            <div className="flex gap-2">
              <div className="flex items-center justify-center cursor-pointer text-white bg-red-500 px-8 py-2 rounded-sm">
                Skipe
              </div>
              <div className="flex items-center justify-center text-white cursor-pointer bg-green-500 px-8 py-2 rounded-sm">
                <BsPersonFill />
                Login
              </div>
            </div>
          </div>
          <div className="bg-[#ffffff]   rounded-lg shadow-l w-full max-w-lg mx-4">
            <div className="flex justify-between items-center px-6 py-4 border-b border-b-[#333]">
              <h2 className="text-xl text-[#000] font-semibold">{"title"}</h2>
              <button
                className="text-gray-500 cursor-pointer text-2xl hover:text-gray-800"
                // onClick={onClose}
              >
                <FaX />
              </button>
            </div>
            <div className="p-6">
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
                  <button
                    onClick={decrement}
                    className="text-yellow-500 text-2xl"
                  >
                    &minus;
                  </button>
                  <span className="text-white">{guestCount} Person</span>
                  <button
                    onClick={increment}
                    className="text-yellow-500 text-2xl"
                  >
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default TestedMobile;
