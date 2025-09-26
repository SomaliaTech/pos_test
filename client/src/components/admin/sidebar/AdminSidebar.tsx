import { FaUsers, FaUserShield } from "react-icons/fa";
import { AiFillHome, AiOutlineForm } from "react-icons/ai";
import { FaSkyatlas } from "react-icons/fa6";
import { MdAnalytics } from "react-icons/md";
import { TiVideo } from "react-icons/ti";
import { MdQuiz } from "react-icons/md";

import { GrAnalytics } from "react-icons/gr";
import { SiApostrophe } from "react-icons/si";
import { Link } from "react-router-dom";

function AdminSidebar() {
  const logout = () => {
    throw new Error("Function not implemented.");
  };

  // const [logout, { isSuccess, error, data }] = useLogoutMutation();

  // useEffect(() => {
  //   if (isSuccess) {
  //     const message = data?.message || "logout sucessfully Well done 🤗🤗🤗";
  //     toast.success(message);
  //     redirect("/");
  //   }
  //   if (error) {
  //     if ("data" in error) {
  //       const errorMessage = error as any;
  //       toast.error(
  //         errorMessage.data.message || "Please Enter valid Password 😜😜😜"
  //       );
  //     }
  //   }
  // }, [isSuccess, error, data]);
  return (
    <div className="bg-[#e9eae7] px-6 py-4 fixed top-0 bottom-0 overflow-auto  left-0  h-full">
      <Link
        to={"/"}
        className="h-[34px] flex items-center hover:bg-gray-200 py-2 rounded  cursor-pointer"
      >
        {/* <img width={40} height={40} src={logo} alt="/logo" /> */}
        <p className="text-black  font-semibold text-2xl leading-[40px]">
          Haldoor
        </p>
      </Link>
      <div className="flex flex-col gap-2 px-4 mt-4">
        <Link
          to={"/admin"}
          className="flex items-center cursor-pointer hover:bg-gray-200 py-2 rounded gap-2"
        >
          <AiFillHome className="w-[22px] h-[22px] text-gray-500" />
          <span>Dashbord</span>
        </Link>
        <h4 className="text-gray-500 my-2">Data</h4>
        <Link
          to={"/admin/all-users"}
          className="flex items-center cursor-pointer hover:bg-gray-200 py-2 rounded gap-2"
        >
          <FaUsers className="w-[22px] h-[22px] text-gray-500" />
          <span>Users</span>
        </Link>
        <Link
          to={"/admin/transections"}
          className="flex items-center cursor-pointer hover:bg-gray-200 py-2 rounded gap-2 mt-2"
        >
          <AiOutlineForm className="w-[22px] h-[22px] text-gray-500" />
          <span>Transections</span>
        </Link>
        <h4 className="text-gray-500 my-2">Content</h4>
        <Link
          to={"/admin/create-dishes"}
          className="flex items-center cursor-pointer hover:bg-gray-200 py-2 rounded gap-2"
        >
          <TiVideo className="w-[22px] h-[22px] text-gray-500" />
          <p>Create Dishes</p>
        </Link>

        <Link
          to={"/admin/table"}
          className="flex items-center cursor-pointer hover:bg-gray-200 py-2 rounded gap-2 mt-2"
        >
          <SiApostrophe className="w-[22px] h-[22px] text-gray-500" />
          <span>Create Table</span>
        </Link>

        <h4 className="text-gray-500 my-2">Analytics</h4>
        <Link
          to={"/admin/user-analytics"}
          className="flex items-center cursor-pointer hover:bg-gray-200 py-2 rounded gap-2 mt-2"
        >
          <FaUserShield className="w-[22px] h-[22px] text-gray-500" />
          <span>Users Analytics</span>
        </Link>

        <Link
          to={"/admin/orders-analytics"}
          className="flex items-center cursor-pointer hover:bg-gray-200 py-2 rounded gap-2 mt-2"
        >
          <MdAnalytics className="w-[22px] h-[22px] text-gray-500" />
          <span>Orders Analytics</span>
        </Link>

        <h4 className="text-gray-500 my-2">Controllers</h4>
        <Link
          to={"/admin/members"}
          className="flex items-center cursor-pointer hover:bg-gray-200 py-2 rounded gap-2 mb-4"
        >
          <TiVideo className="w-[22px] h-[22px] text-gray-500" />
          <span>Manage Employees</span>
        </Link>
        <Link
          to={"/admin/course-analytics"}
          className="flex items-center cursor-pointer hover:bg-gray-200 py-2 rounded gap-2"
        >
          <GrAnalytics className="w-[22px] h-[22px] text-gray-500" />
          <span>Create Categories</span>
        </Link>
        <h4 className="text-gray-500 my-2">System</h4>
        <Link
          to={"mailto:info@kasmal.com"}
          className="flex items-center cursor-pointer hover:bg-gray-200 py-2 rounded gap-2"
        >
          <FaSkyatlas className="w-[22px] h-[22px] text-gray-500" />
          <span>Report to email</span>
        </Link>
        <div
          onClick={logout}
          className="flex items-center cursor-pointer hover:bg-gray-200 py-2 rounded gap-2 mt-2"
        >
          <MdQuiz className="w-[22px] h-[22px] text-gray-500" />
          <span>Logut</span>
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;
