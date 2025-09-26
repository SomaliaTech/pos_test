import { useEffect } from "react";

import OrderManagementCard from "../../components/order/OrderManagmentCard";
import LeftMenu from "../../components/shared/LeftMenu";
const OrderManagement = () => {
  useEffect(() => {
    document.title = "POS | Menu";
  }, []);

  //   const customerData = useSelector((state) => state.customer);

  return (
    <section className="bg-[#E7EAE7]  h-screen tex- overflow-hidden flex gap-3">
      <div className="w-20 md:w-64 flex-shrink-0">
        <LeftMenu />
      </div>
      {/* Left Div */}
      <div className="flex-3 ">
        <OrderManagementCard />
      </div>
    </section>
  );
};

export default OrderManagement;
