import { useEffect } from "react";
import restaurant from "../../assets/images/bg.jpg";
import Login from "../../components/auth/login";
import { BiArrowBack } from "react-icons/bi";

const Auth = () => {
  useEffect(() => {
    document.title = "POS | Auth";
  }, []);

  return (
    <div className="flex relative h-[100vh] flex-row-reverse w-full">
      {/* Left Section */}

      <div className=" md:flex w-1/2 relative hidden  items-center justify-center bg-cover">
        {/* BG Image */}

        <img
          className="w-full h-full object-cover"
          src={restaurant}
          alt="Restaurant Image"
        />

        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black opacity-10 "></div>

        {/* Quote at bottom */}
        {/* <blockquote className="absolute bottom-10 px-8 mb-10 text-2xl italic text-white">
          `Haldoor waa muqayad uga wayn somalia waxayna bixsaa service aad u
          wangsan waxad ka heli karta wax wablo aad ugu bahan tahay raashin `
          <br />
          <span className="block mt-4 text-yellow-400">Haldoor</span>
        </blockquote> */}
      </div>
      <div className=" md:hidden absolute text-white cursor-pointer top-12 left-4 bg-red-500 p-5 rounded-full ">
        <BiArrowBack size={22} />
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 min-h-screen flex flex-col justify-center items-cente bg-[#FFFFFF] p-10">
        <h2 className="text-5xl text-black mt-1 font-semibold  mb-5">
          Welcome back!
        </h2>
        <h2 className="text-3xl text- mt-1 font-semibold text-gray-400 mb-5">
          Haldor Resutrant
        </h2>
        <span className="text-xl text-gray-200 mb-10">
          Nice to see you again
        </span>

        {/* Components */}
        <div className="md:mr-42 md:mt-12 mx-2">
          <Login />
        </div>

        <div className=" absolute bottom-2 flex justify-center mt-6">
          <p className="text-sm text-[#000]">
            <a
              className="text-[#37D162] font-semibold hover:underline"
              href="#"
            >
              {"Report  haldoor"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
