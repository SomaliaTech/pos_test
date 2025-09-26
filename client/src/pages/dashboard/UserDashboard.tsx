import { useEffect } from "react";

import LeftMenu from "../../components/shared/LeftMenu";
import Greetings from "../../components/home/Greetings";
import MiniCard from "../../components/cards/MiniCard";
import RecentOrders from "../../components/home/RecentOrders";
import PopularUsers from "../../components/home/PopularUsers";
import { IoCheckmark } from "react-icons/io5";

const UserderDashboad = () => {
  useEffect(() => {
    document.title = "POS | Home";
  }, []);

  return (
    <section className="bg-[#E8EAE7] w-full   h-screen  overflow-hidden flex gap-3">
      {/* Left Div */}
      <div className="w-20 md:w-64 flex-shrink-0">
        <LeftMenu />
      </div>
      <div className="flex-1">
        <Greetings />
        <div className="flex items-center w-full gap-3 px-8 mt-8">
          <MiniCard
            title="Total  Orders"
            icon={<IoCheckmark />}
            number={13}
            footerNum={1.6}
            descriptions="Enjoy life is short 👋"
          />
        </div>
        <RecentOrders />
      </div>
      {/* Right Div */}
      <div className="w-1/3">
        <PopularUsers />
      </div>
    </section>
  );
};

export default UserderDashboad;
