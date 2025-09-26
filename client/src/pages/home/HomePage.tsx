import { useEffect } from "react";

import Bill from "../../components/menu/Bill";
import CustomerInfo from "../../components/menu/CustomerInfo";
import CartInfo from "../../components/menu/CartInfo";
import MenuContainer from "../../components/menu/MenuContainer";
import LeftMenu from "../../components/shared/LeftMenu";
const Menu = () => {
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
        <div className="flex items-center justify-between px-10 py-4">
          <div className="flex items-center justify-around gap-4"></div>
        </div>

        <MenuContainer />
      </div>
      {/* Right Div */}
      <div className="flex-1 bg-[#fff] mt-4 mr-3 h-full rounded-lg pt-2">
        {/* Customer Info */}
        <CustomerInfo />
        <hr className="border-[#2a2a2a2c] border-t-2" />
        {/* Cart Items */}
        <CartInfo />
        <hr className="border-[#2a2a2a21] border-t-2" />
        {/* Bills */}
        <Bill />
      </div>
    </section>
  );
};

export default Menu;
