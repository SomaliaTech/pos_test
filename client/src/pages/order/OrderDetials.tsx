import { useEffect } from "react";

import LeftMenu from "../../components/shared/LeftMenu";
import OrderDetailsCard from "../../components/order/OrderDetailsCard";
const OrderDetails = () => {
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
        <OrderDetailsCard />
      </div>
    </section>
  );
};

export default OrderDetails;
