import { IoNotificationsOutline } from "react-icons/io5";

import { format } from "timeago.js";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { axiosIntence } from "../../lib/axiosIntence";
import { useState } from "react";

// const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || "";

// const socketId = SocketIO(ENDPOINT, { transports: ["websocket"] });

function DashboardHeader() {
  const [open, setOpen] = useState(false);
  const [notifactions, setNotfications] = useState([]);

  // const [updatenotification, { isSuccess, isLoading }] =

  // const [sound] = useState(
  //   new Audio(
  //     "https://res.cloudinary.com/kuneen/video/upload/v1722784652/sound/irxgmazaquip1pynntps.mp3"
  //   )
  // );

  // const playerNotifcationSound = () => {
  //   sound.play();
  // };

  // useEffect(() => {
  //   if (data) {
  //     setNotfications(data);
  //   }

  //   if (isSuccess) {
  //     toast.success("Notfication has deleted here");
  //     // refetch();
  //   }
  //   sound.load();
  // }, [data, isSuccess, refetch, sound]);
  // useEffect(() => {
  //   socketId.on("newNotification", (data) => {
  //     playerNotifcationSound();
  //     // refetch();
  //   });
  // }, []);

  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const res = await axiosIntence.get("/api/user");
        return res.data;
      } catch (err) {
        console.log(err);
      }
    },
  });
  return (
    <div className="w-full flex  justify-end p-6  text-white">
      <div className="relative">
        <div
          onClick={() => setOpen(!open)}
          className="flex items-center cursor-pointer justify-center relative"
        >
          <IoNotificationsOutline className="w-[26px] h-[26px] text-black" />
          <span className="absolute -top-1 right-0 w-[15px] flex text-center items-center justify-center  h-[15px] rounded-full bg-pink-400 text-[10px]">
            {notifactions.length}
          </span>
        </div>
        {open && (
          <div className="absolute w-[380px] right-0  z-10 bg-[#efefef] overflow-y-auto rounded px-4 py-4 top-11 max-h-[87vh]  shadow-xl ">
            <h5 className="text-center text-[20px] font-semibold text-gray-600 mb-4 leading-normal">
              Notifications
            </h5>
            {notifactions.map((item: any, index) => (
              <div
                key={index}
                className="bg-gray-600 w-full p-1 border-b border-pink-200 mb-2"
              >
                <div className="flex items-center justify-between">
                  <p className="text-gray-200 max-w-[200px]">{item.title} </p>
                  <p
                    onClick={() => setNotfications(item._id)}
                    className="cursor-pointer"
                  >
                    "Read"
                    {/* {isLoading ? "Deleting..." : "Mark as read"} */}
                  </p>
                </div>
                <p className="text-gray-300 text-sm mt-2">{item.message}</p>
                <p className="text-gray-300 text-sm mt-2">
                  {format(item.createdAt)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <Link
        to={"/profile"}
        className="flex items-center w-[32px] h-[32px] justify-center bg-pink-400 rounded-full ml-5 cursor-pointer uppercase text-xl text-white"
      >
        {data?.users?.avator ? (
          <img
            src={data?.users?.avator?.url}
            alt="user/profile"
            width={32}
            height={32}
            className="rounded-full object-contain"
          />
        ) : (
          <p>{data?.users?.name?.charAt(0)}</p>
        )}
      </Link>
    </div>
  );
}

export default DashboardHeader;
